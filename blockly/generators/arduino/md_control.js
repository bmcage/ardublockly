/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Generating Microduino code for procedure (function) blocks.
 *
 */
'use strict';

goog.provide('Blockly.Arduino.md_control');

goog.require('Blockly.Arduino');

/**
 * The microduino crashbutton setup block
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['mcookie_crashbutton_setup'] = function(block) {
  var btnName = block.getFieldValue('BUTTONNAME');
  //microduino crash button is HIGH when pressed
  var stateOutput = 'LOW';
  
  //the hub saved the connector in the attached block
  var hubconnector = block['connector'] || ['0', '1']
  //compute the pins, normally only possible to attach at valid pins
  var pintop = hubconnector[0];

  Blockly.Arduino.reservePin(
      block, pintop, Blockly.Arduino.PinTypes.INPUT, 'Digital Read');

  //btnName is a variable containing the used pins
  Blockly.Arduino.addVariable(btnName,
      'int ' + btnName + ' = ' + pintop + ';', true);

  Blockly.Arduino.addDeclaration(btnName, 'boolean ' + btnName + '_PRESSED = ' + stateOutput + ';\n');
  var pinSetupCode = 'pinMode(' + btnName + ', INPUT);';
  Blockly.Arduino.addSetup('io_' + pintop, pinSetupCode, false);

  return '';
};

/**
 * Function for reading a button.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['mcookie_button_digitalread'] = function(block) {
  var btnName = block.getFieldValue('BUTTONNAME');
  
  var code = 'digitalRead(' + btnName + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
