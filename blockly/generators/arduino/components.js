/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Generating Microduino code for procedure (function) blocks.
 *
 */
'use strict';

goog.provide('Blockly.Arduino.components');

goog.require('Blockly.Arduino');


/**
 * The default arduino Hub block
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['core_hub_component'] = function(block) {
  
  function parseInput(block, name, connectors) {
    var targetBlock = block.getInputTargetBlock(name);
    if (targetBlock) {
      targetBlock.setHubConnector(connectors);
    }
    var code = Blockly.Arduino.blockToCode(targetBlock);
    if (!goog.isString(code)) {
      throw 'Expecting code from statement block "' + targetBlock.type + '".';
    }
    if (code) {
      // blocks should only init data ... 
      console.log('Unexpected code in core_hub_component', code)
    }
    return code;
  }

  //set to which pin a block connects
  for (var i = 1; i <= this.digCount_; i++) {
    var pin = block.getFieldValue('PIND' + i);
    parseInput(block, 'DIG' + i, [pin]);
  }
  for (var i = 1; i <= this.anaCount_; i++) {
    var pin = block.getFieldValue('PINA' + i);
    parseInput(block, 'ANA' + i, [pin]);
  }
  for (var i = 1; i <= this.pwmCount_; i++) {
    var pin = block.getFieldValue('PINP' + i);
    parseInput(block, 'PWM' + i, [pin]);
  }
  for (var i = 1; i <= this.digdigCount_; i++) {
    var pin1 = block.getFieldValue('PINDD1_' + i);
    var pin2 = block.getFieldValue('PINDD2_' + i);
    parseInput(block, 'DIGDIG' + i, [pin1, pin2]);
  }

  var board = block.getBoardName();
  if (board.startsWith("allbot")) {
    // the allbot board is present! We need servo library, and allbot library 
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
    void write(int servo, int angle){
      // go to angle immediately
      _servo[servo].write(angle);
    };
    void move(int servo, int angle){
      // set an intended angle to move to
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

int sounderPin = 13;  // Declaring what pin the sounder on the VRSSM is connected to
`
    Blockly.Arduino.addInclude('allbot0', allbotclassinclude);
    // we reserve the sounderPin on the VRSSM shield
    var pin = 13;
    Blockly.Arduino.reservePin(
        block, pin, Blockly.Arduino.PinTypes.OUTPUT, 'Tone Pin');
    var pinSetupCode = 'pinMode(sounderPin, OUTPUT);\n';
    Blockly.Arduino.addSetup('io_' + pin, pinSetupCode, false);
  }
  return '';
};
