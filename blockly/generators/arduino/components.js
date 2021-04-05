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
    if (!(typeof code == 'string')) {
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
    var allbotclassinclude = '/* ALLBOT library\n';
    allbotclassinclude += '* Copyright (C) 2014 Velleman nv\n';
    allbotclassinclude += ' *\n';
    allbotclassinclude += ' * This software may be modified and distributed under the terms\n';
    allbotclassinclude += ' * of the MIT license.  See the LICENSE file for details.\n';
    allbotclassinclude += ' *\n';
    allbotclassinclude += ' */\n';
    allbotclassinclude += '#include <Arduino.h>\n';
    allbotclassinclude += '\n';
    allbotclassinclude += 'class ALLBOT_Servo {\n';
    allbotclassinclude += '  public:\n';
    allbotclassinclude += '    ALLBOT_Servo():_flipped(false){};\n';
    allbotclassinclude += '    void attach(int pin){\n';
    allbotclassinclude += '      _servo.attach(pin);\n';
    allbotclassinclude += '    };\n';
    allbotclassinclude += '    void flipped(bool flipped){\n';
    allbotclassinclude += '      _flipped = flipped;\n';
    allbotclassinclude += '    };\n';
    allbotclassinclude += '    void offset(int offset){\n';
    allbotclassinclude += '      _offset = offset;\n';
    allbotclassinclude += '    };\n';
    allbotclassinclude += '    void write(int angle){\n';
    allbotclassinclude += '      _angle = angle;\n';
    allbotclassinclude += '      if (_flipped) angle = 180 - angle;\n';
    allbotclassinclude += '      angle += (_flipped ? -_offset : _offset);\n';
    allbotclassinclude += '    _servo.write(angle);\n';
    allbotclassinclude += '    };\n';
    allbotclassinclude += '    ALLBOT_Servo& operator=(int angle){\n';
    allbotclassinclude += '      write(angle);\n';
    allbotclassinclude += '    };\n';
    allbotclassinclude += '  protected:\n';
    allbotclassinclude += '    int _angle;\n';
    allbotclassinclude += '    bool _flipped;\n';
    allbotclassinclude += '    int _offset;\n';
    allbotclassinclude += '    Servo _servo;\n';
    allbotclassinclude += '};\n';
    allbotclassinclude += '\n';
    allbotclassinclude += 'class ALLBOT_AsyncServo : public ALLBOT_Servo {\n';
    allbotclassinclude += '  public:\n';
    allbotclassinclude += '    ALLBOT_AsyncServo():ALLBOT_Servo() { };\n';
    allbotclassinclude += '    void reset(){\n';
    allbotclassinclude += '      _to_angle = _angle;\n';
    allbotclassinclude += '    };\n';
    allbotclassinclude += '    void move(int to_angle){\n';
    allbotclassinclude += '      // save the target angle\n';
    allbotclassinclude += '      _to_angle = to_angle;\n';
    allbotclassinclude += '    };\n';
    allbotclassinclude += '    void prepare(int speed){\n';
    allbotclassinclude += '      // calculate the absolute value of the angle difference\n';
    allbotclassinclude += '      int angle_diff = _to_angle - _angle;\n';
    allbotclassinclude += '      if (angle_diff < 0)\n';
    allbotclassinclude += '        angle_diff *= -1;\n';
    allbotclassinclude += '      if (angle_diff == 0) {\n';
    allbotclassinclude += '        _step = 0;\n';
    allbotclassinclude += '        _steps = 0;\n';
    allbotclassinclude += '        return;\n';
    allbotclassinclude += '      }\n';
    allbotclassinclude += '      // number of degrees to move with each 1ms step\n';
    allbotclassinclude += '      _step_angle = (double)angle_diff / speed;\n';
    allbotclassinclude += '      _cur_angle = _angle;\n';
    allbotclassinclude += '      // stepping\n';
    allbotclassinclude += '      _step = 0;\n';
    allbotclassinclude += '      _steps = angle_diff / _step_angle;\n';
    allbotclassinclude += '      // 180°->0° = count downwards\n';
    allbotclassinclude += '      if (_to_angle < _angle)\n';
    allbotclassinclude += '        _step_angle *= -1;\n';
    allbotclassinclude += '    };\n';
    allbotclassinclude += '    boolean tick(){\n';
    allbotclassinclude += '      if (_step < _steps) {\n';
    allbotclassinclude += '        _cur_angle += _step_angle;\n';
    allbotclassinclude += '        write(_cur_angle);\n';
    allbotclassinclude += '        _step++;\n';
    allbotclassinclude += '      }\n';
    allbotclassinclude += '      return (_step >= _steps);\n';
    allbotclassinclude += '    };\n';
    allbotclassinclude += '  protected:\n';
    allbotclassinclude += '  private:\n';
    allbotclassinclude += '    int _to_angle;\n';
    allbotclassinclude += '    double _step_angle;\n';
    allbotclassinclude += '    double _cur_angle;\n';
    allbotclassinclude += '    int _step;\n';
    allbotclassinclude += '    int _steps;\n';
    allbotclassinclude += '};\n';
    allbotclassinclude += '\n';
    allbotclassinclude += 'class ALLBOT {\n';
    allbotclassinclude += '  public:\n';
    allbotclassinclude += '    ALLBOT(int count):_count(count) {\n';
    allbotclassinclude += '      _servo = new ALLBOT_AsyncServo[count];\n';
    allbotclassinclude += '    };\n';
    allbotclassinclude += '    ~ALLBOT(){\n';
    allbotclassinclude += '      delete[] _servo;\n';
    allbotclassinclude += '    };\n';
    allbotclassinclude += '    ALLBOT_AsyncServo& operator[](int i){\n';
    allbotclassinclude += '      return _servo[i];\n';
    allbotclassinclude += '    };\n';
    allbotclassinclude += '    void attach(int servo, int pin, int angle, bool flipped, int offset){\n';
    allbotclassinclude += '      ALLBOT_AsyncServo &s = _servo[servo];\n';
    allbotclassinclude += '      \n';
    allbotclassinclude += '      s.flipped(flipped);\n';
    allbotclassinclude += '      s.offset(offset);\n';
    allbotclassinclude += '      	\n';
    allbotclassinclude += '      s.attach(pin);\n';
    allbotclassinclude += '      s.write(angle);\n';
    allbotclassinclude += '      s.reset();\n';
    allbotclassinclude += '    };\n';
    allbotclassinclude += '    void write(int servo, int angle){\n';
    allbotclassinclude += '      // go to angle immediately\n';
    allbotclassinclude += '      _servo[servo].write(angle);\n';
    allbotclassinclude += '    };\n';
    allbotclassinclude += '    void move(int servo, int angle){\n';
    allbotclassinclude += '      // set an intended angle to move to\n';
    allbotclassinclude += '      _servo[servo].move(angle);\n';
    allbotclassinclude += '    };\n';
    allbotclassinclude += '    void animate(int speed){\n';
    allbotclassinclude += '      for (int i=0; i<_count; i++) {\n';
    allbotclassinclude += '        _servo[i].prepare(speed);\n';
    allbotclassinclude += '      }\n';
    allbotclassinclude += '      bool done;\n';
    allbotclassinclude += '      do {\n';
    allbotclassinclude += '        done = true;\n';
    allbotclassinclude += '        for (int i=0; i<_count; i++) {\n';
    allbotclassinclude += '          done &= _servo[i].tick();\n';
    allbotclassinclude += '        }\n';
    allbotclassinclude += '        delay(1);\n';
    allbotclassinclude += '      }\n';
    allbotclassinclude += '      while(!done);\n';
    allbotclassinclude += '    };\n';
    allbotclassinclude += '  protected:\n';
    allbotclassinclude += '  private:\n';
    allbotclassinclude += '    ALLBOT_AsyncServo *_servo;\n';
    allbotclassinclude += '    int _count;\n';
    allbotclassinclude += '};\n';
    allbotclassinclude += '\n';
    allbotclassinclude += 'int sounderPin = 13;  // Declaring what pin the sounder on the VRSSM is connected to\n';

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

/**
 * Code generator for block for setting the filename .
 * Arduino code: nothing 
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code.
 */
Blockly.Arduino['file_setup'] = function(block) {
  var fileName = block.getFieldValue('TEXT');
  var fileName = Blockly.Arduino.valueToCode(
	      block, 'TEXT', Blockly.Arduino.ORDER_ATOMIC) || '0';
  if ( fileName) {
	  fileName = fileName.replace(/^"|"$/g, '');
	  var fileSetupCode = '\n\t/**********************\n\t** generated from ardublockly << '+fileName+'.xml >>\n\t**********************/';
	  Blockly.Arduino.addSetup('fileNameForSave' , fileSetupCode, true);
  }
  var code = '';
  return code;
};
