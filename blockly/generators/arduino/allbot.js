/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Arduino code generator for the Allbot Servo library blocks.
 *     The Arduino Servo library docs: http://arduino.cc/en/reference/servo
 *     Allbot: allbot.eu
 *
 */
'use strict';

goog.provide('Blockly.Arduino.allbot');

goog.require('Blockly.Arduino');


/**
 * The servo setup block
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['allbotservo_config_hub'] = function(block) {
  var servo = block.getFieldValue('NAMESERVO');
  
  //the hub saved the connector in the attached block
  var hubconnector = block['connector'] || ['2']
  //compute the pins, normally only possible to attach at valid pins
  var pin = hubconnector[0];

  //servo is a variable containing the used pins
  Blockly.Arduino.addVariable(servo,
    'int ' + servo + ' = ' + pin + ';', true);
  
  Blockly.Arduino.addInclude('servo', '#include <Servo.h>');
  var allbotclassinclude = `
/* ALLBOT library
 * Copyright (C) 2014 Velleman nv
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 *
 */
#include <Arduino.h>

class ALLBOT_Servo {
  public:
    ALLBOT_Servo():_flipped(false){};
    void attach(int pin){
      _servo.attach(pin);
    };
    void flipped(bool flipped){
      _flipped = flipped;
    };
    void offset(int offset){
      _offset = offset;
    };
    void write(int angle){
      _angle = angle;
      if (_flipped) angle = 180 - angle;
      angle += (_flipped ? -_offset : _offset);
    _servo.write(angle);
    };
    ALLBOT_Servo& operator=(int angle){
      write(angle);
    };
  protected:
    int _angle;
    bool _flipped;
    int _offset;
    Servo _servo;
};

class ALLBOT_AsyncServo : public ALLBOT_Servo {
  public:
    ALLBOT_AsyncServo():ALLBOT_Servo() { };
    void reset(){
      _to_angle = _angle;
    };
    void move(int to_angle){
      // save the target angle
      _to_angle = to_angle;
    };
    void prepare(int speed){
      // calculate the absolute value of the angle difference
      int angle_diff = _to_angle - _angle;
      if (angle_diff < 0)
        angle_diff *= -1;
      if (angle_diff == 0) {
        _step = 0;
        _steps = 0;
        return;
      }
      // number of degrees to move with each 1ms step
      _step_angle = (double)angle_diff / speed;
      _cur_angle = _angle;
      // stepping
      _step = 0;
      _steps = angle_diff / _step_angle;
      // 180°->0° = count downwards
      if (_to_angle < _angle)
        _step_angle *= -1;
    };
    boolean tick(){
      if (_step < _steps) {
        _cur_angle += _step_angle;
        write(_cur_angle);
        _step++;
      }
      return (_step >= _steps);
    };
  protected:
  private:
    int _to_angle;
    double _step_angle;
    double _cur_angle;
    int _step;
    int _steps;
};

class ALLBOT {
  public:
    ALLBOT(int count):_count(count) {
      _servo = new ALLBOT_AsyncServo[count];
    };
    ~ALLBOT(){
      delete[] _servo;
    };
    ALLBOT_AsyncServo& operator[](int i){
      return _servo[i];
    };
    void attach(int servo, int pin, int angle, bool flipped, int offset){
      ALLBOT_AsyncServo &s = _servo[servo];
      
      s.flipped(flipped);
      s.offset(offset);
      	
      s.attach(pin);
      s.write(angle);
      s.reset();
    };
    void move(int servo, int angle){
      _servo[servo].move(angle);
    };
    void animate(int speed){
      for (int i=0; i<_count; i++) {
        _servo[i].prepare(speed);
      }
      bool done;
      do {
        done = true;
        for (int i=0; i<_count; i++) {
          done &= _servo[i].tick();
        }
        delay(1);
      }
      while(!done);
    };
  protected:
  private:
    ALLBOT_AsyncServo *_servo;
    int _count;
};
`
  Blockly.Arduino.addInclude('allbot', allbotclassinclude);
  
  // find type of allbot
  var allbot = Blockly.Arduino.Boards.selected;
  var jointselected = -1;
  if (allbot['joints'] !== undefined) {
    for (var jointnr in allbot.joints.name) {
      if (allbot.joints.name[jointnr][1] == servo) {
        jointselected = jointnr;
      }
    }
    if (jointselected > -1) {
      var allbotdecl = 'ALLBOT BOT(' + allbot.joints.initangle.length + ');   // Number of motors);\n\n'
        + 'enum MotorName {\n';
      for (var jointnr in allbot.joints.name) {
        allbotdecl += '  ' + allbot.joints.name[jointnr][1] + ',\n';
      }
      allbotdecl += '};\n'
      Blockly.Arduino.addInclude('allbotdecl', allbotdecl);
      Blockly.Arduino.reservePin(block, pin, Blockly.Arduino.PinTypes.SERVO, 'Servo Write');
      
      var setupCode = 'BOT.attach(' + servo + ', ' + pin + ', ' + allbot.joints.initangle[jointselected] + ', ' + allbot.joints.flipped[jointselected] + ', 0);';
      Blockly.Arduino.addSetup('allbot1_' + servo, setupCode, true);
      Blockly.Arduino.addSetup('allbot2_all', '  // Wait for joints to be initialized\n' +
                               '  delay(500);', true);
    } else {
      Blockly.Arduino.addDeclaration('// Unknown AllBot joint selected');
    }
    
  } else {
    Blockly.Arduino.addDeclaration('// No AllBot on the workspace. Add it to generate code');
  }
  
  return '';
};
