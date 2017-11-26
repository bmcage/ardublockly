/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Arduino code generator for the Stepper library blocks.
 *     The Arduino Stepper library docs: http://arduino.cc/en/Reference/Stepper
 */
'use strict';

goog.provide('Blockly.Arduino.stepper');

goog.require('Blockly.Arduino');


/**
 * Code generator for the stepper generator configuration. Nothing is added
 * to the 'loop()' function. Sets the pins (X and Y), steps per revolution (Z),
 * speed(A) and instance name (B).
 * Arduino code: #include <Stepper.h>
 *               Stepper B(Z, X, Y);
 *               setup() { B.setSpeed(A); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Empty string as no code goes into 'loop()'.
 */
Blockly.Arduino['stepper_config'] = function(block) {
  var pinType = Blockly.Arduino.PinTypes.STEPPER;
  var stepperName = block.getFieldValue('STEPPER_NAME');
  var numberOfPins = block.getFieldValue('STEPPER_NUMBER_OF_PINS');
  var stepperSteps = Blockly.Arduino.valueToCode(block, 'STEPPER_STEPS',
      Blockly.Arduino.ORDER_ATOMIC) || '360';
  var stepperSpeed = Blockly.Arduino.valueToCode(block, 'STEPPER_SPEED',
      Blockly.Arduino.ORDER_ATOMIC) || '90';
  var pins = [block.getFieldValue('STEPPER_PIN1'),
              block.getFieldValue('STEPPER_PIN2')];
  if (numberOfPins === 'FOUR') {
    pins.push(block.getFieldValue('STEPPER_PIN3'));
    pins.push(block.getFieldValue('STEPPER_PIN4'));
  }

  var pinArray = 'int ' + stepperName + '[' + pins.length +'] = {';
  var globalCode = 'const int stepper_' + stepperName + '_steps = ' + stepperSteps
      + ';\n' 
      + 'Stepper stepper_' + stepperName + '(stepper_' + stepperName + '_steps, ';
  for (var i = 0; i < pins.length; i++) {
    Blockly.Arduino.reservePin(block, pins[i], pinType, 'Stepper');
    pinArray += pins[i] + ', ';
    globalCode += pins[i] + ', ';
  }
  pinArray = pinArray.slice(0, -2) + '};';
  globalCode = globalCode.slice(0, -2) + ');\n';
  
  //stepper is a variable containing the used pins
  Blockly.Arduino.addVariable(stepperName, pinArray, true);
  stepperName = 'stepper_' + stepperName;
  
  globalCode += 'bool ' + stepperName + '_rotating = false;\n'
      + 'unsigned int ' + stepperName + '_stepsdone = 0;\n'
      + 'bool ' + stepperName + '_finished = false;';

  Blockly.Arduino.addInclude('stepper', '#include <Stepper.h>');

  Blockly.Arduino.addDeclaration(stepperName, globalCode);

  var setupCode = 'int ' + stepperName + '_rpm = ' + stepperSpeed
      + ';\n'
      + stepperName + '.setSpeed(' + stepperName + '_rpm);';
  Blockly.Arduino.addSetup(stepperName, setupCode, true);

  var a2scode = `int STEPPERNAME_Angle2Steps(int angle) {
  return (angle * STEPPERNAME_steps) / 360;
}
`
  Blockly.Arduino.addFunction(stepperName+'Angle2Steps', a2scode.replace(new RegExp('STEPPERNAME', 'g'), stepperName));
  
  return '';
};

/**
 * Code generator for the stepper generator configuration. Nothing is added
 * to the 'loop()' function. Sets the pins (X and Y), steps per revolution (Z),
 * speed(A) and instance name (B).
 * Arduino code: #include <Stepper.h>
 *               Stepper B(Z, X, Y);
 *               setup() { B.setSpeed(A); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Empty string as no code goes into 'loop()'.
 */
Blockly.Arduino['stepper_config_hub'] = function(block) {
  
  //the hub saved the connector in the attached block
  var hubconnector = block['connector'] || ['0', '1']
  var pin1 = hubconnector[0];
  var pin2 = hubconnector[1];
  var pinType = Blockly.Arduino.PinTypes.STEPPER;
  var stepperName = block.getFieldValue('STEPPER_NAME');
  var stepperSteps = Blockly.Arduino.valueToCode(block, 'STEPPER_STEPS',
      Blockly.Arduino.ORDER_ATOMIC) || '360';
  var stepperSpeed = Blockly.Arduino.valueToCode(block, 'STEPPER_SPEED',
      Blockly.Arduino.ORDER_ATOMIC) || '90';
  
  //stepper is a variable containing the used pins
  Blockly.Arduino.addVariable(stepperName,
      'int ' + stepperName + '[2] = {' + pin1 + ', ' + pin2 + '};', true);
  stepperName = 'stepper_' + stepperName

  Blockly.Arduino.reservePin(block, pin1, pinType, 'Stepper');
  Blockly.Arduino.reservePin(block, pin2, pinType, 'Stepper');

  Blockly.Arduino.addInclude('stepper', '#include <Stepper.h>');

  var globalCode = 'const int ' + stepperName + '_steps = ' + stepperSteps
      + ';\n'
      + 'Stepper ' + stepperName + '(' + stepperName + '_steps, ' +
      pin1 + ', ' + pin2 + ');\n'
      + 'bool ' + stepperName + '_rotating = false;\n'
      + 'unsigned int ' + stepperName + '_stepsdone = 0;\n'
      + 'bool ' + stepperName + '_finished = false;';
  Blockly.Arduino.addDeclaration(stepperName, globalCode);

  var setupCode = 'int ' + stepperName + '_rpm = ' + stepperSpeed
      + ';\n  '
      + stepperName + '.setSpeed(' + stepperName + '_rpm);';
  Blockly.Arduino.addSetup(stepperName, setupCode, true);

  var a2scode = `int STEPPERNAME_Angle2Steps(int angle) {
  return (angle * STEPPERNAME_steps) / 360;
}
`
  Blockly.Arduino.addFunction(stepperName+'Angle2Steps', a2scode.replace(new RegExp('STEPPERNAME', 'g'), stepperName));
  
  return '';
};

/**
 * Code generator for moving the stepper instance (X) a number of steps (Y).
 * Library info in the setHelpUrl link.
 * This block requires the stepper_config block to be present.
 * Arduino code: loop { X.steps(Y) }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['stepper_step'] = function(block) {
  var stepperInstanceName = 'stepper_' + block.getFieldValue('STEPPER_NAME');
  var stepperSteps = Blockly.Arduino.valueToCode(block, 'STEPPER_STEPS',
      Blockly.Arduino.ORDER_ATOMIC) || '0';
  var code = stepperInstanceName + '.step(' + stepperSteps + ');\n';
  return code;
};

/**
 * Code generator for setting the speed of stepper instance (X)
 * Library info in the setHelpUrl link.
 * This block requires the stepper_config block to be present.
 * Arduino code: loop { X.steps(Y) }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['stepper_speed'] = function(block) {
  var stepperInstanceName = 'stepper_' + block.getFieldValue('STEPPER_NAME');
  var stepperRpm = Blockly.Arduino.valueToCode(block, 'STEPPER_SPEED',
      Blockly.Arduino.ORDER_ATOMIC) || '5';
  var code = stepperInstanceName + '.setSpeed(' + stepperRpm + ');\n';
  return code;
};

/**
 * Code generator for rotating the stepper instance (X) over a given angle
 * Library info in the setHelpUrl link.
 * This block requires the stepper_config block to be present.
 * Arduino code: loop { X.steps(Y) }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['stepper_rotate'] = function(block) {
  var stepperInstanceName = 'stepper_' + block.getFieldValue('STEPPER_NAME');
  var stepperAngle = block.getFieldValue('ANGLE');
  var stepperDirection = block.getFieldValue('DIRECTION')
  var code = `
if (!STEPPERNAME_finished) {
  // stepper should still rotate further
  STEPPERNAME_rotating = true;
  int steps2take = STEPPERNAME_Angle2Steps(%1);
  if (STEPPERNAME_stepsdone < steps2take) {
    //take an extra step
    STEPPERNAME.step(%2);
    STEPPERNAME_stepsdone += 1;
  } else {
    STEPPERNAME_finished = true;
    STEPPERNAME_rotating = false;
  }
}
`
  return code.replace(new RegExp('STEPPERNAME', 'g'), stepperInstanceName)
             .replace('%1', stepperAngle)
             .replace('%2', stepperDirection);
};

/**
 * Code generator for rotating the stepper instance (X) over a given angle
 * Library info in the setHelpUrl link.
 * This block requires the stepper_config block to be present.
 * Arduino code: loop { X.steps(Y) }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['stepper_restart'] = function(block) {
  var stepperInstanceName = 'stepper_' + block.getFieldValue('STEPPER_NAME');
  var code = stepperInstanceName + '_finished = false;\n' 
        + stepperInstanceName + '_rotating = false;\n'
        + stepperInstanceName + '_stepsdone = 0;\n';
  return code;
};

/**
 * Code generator for rotating the stepper instance (X) over a given angle
 * Library info in the setHelpUrl link.
 * This block requires the stepper_config block to be present.
 * Arduino code: loop { X.steps(Y) }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['stepper_isrotating'] = function(block) {
  var stepperInstanceName = 'stepper_' + block.getFieldValue('STEPPER_NAME');
  var code = stepperInstanceName + '_rotating';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
