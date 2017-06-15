/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Code generator for Arduino Digital and Analogue input/output.
 *     Arduino built in function docs: http://arduino.cc/en/Reference/HomePage
 */
'use strict';

goog.provide('Blockly.Arduino.tone');

goog.require('Blockly.Arduino');


/**
 * Function for turning the tone library on on a given pin (X).
 * Arduino code: setup { pinMode(X, OUTPUT) }
 *               loop  { tone(X, frequency) }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */

Blockly.Arduino['io_tone'] = function(block) {
  var pin = block.getFieldValue('TONEPIN');
  var freq = Blockly.Arduino.valueToCode(block, 'FREQUENCY', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.reservePin(
      block, pin, Blockly.Arduino.PinTypes.OUTPUT, 'Tone Pin');

  var pinSetupCode = 'pinMode(' + pin + ', OUTPUT);\n';
  Blockly.Arduino.addSetup('io_' + pin, pinSetupCode, false);

  var code = 'tone(' + pin + ',' + freq + ');\n';
  return code;
};

Blockly.Arduino['io_notone'] = function(block) {
  var pin = block.getFieldValue("TONEPIN");
  Blockly.Arduino.reservePin(
      block, pin, Blockly.Arduino.PinTypes.OUTPUT, 'Tone Pin');
  
  var pinSetupCode = 'pinMode(' + pin + ', OUTPUT);\n';
  Blockly.Arduino.addSetup('io_' + pin, pinSetupCode, false);

  var code = 'noTone(' + pin + ');\n';
  return code;
};

Blockly.Arduino['buzzer_config_hub'] = function(block) {
  var OutputName = block.getFieldValue('OUTPUTNAME');
  //the hub saved the connector in the attached block
  var hubconnector = block['connector'] || ['0', '1']
  //compute the pins, normally only possible to attach at valid pins
  var pin = hubconnector[0];

  Blockly.Arduino.reservePin(
      block, pin, Blockly.Arduino.PinTypes.OUTPUT, 'Tone Pin');

  //OutputName is a variable containing the used pins
  Blockly.Arduino.addVariable(OutputName,
      'int ' + OutputName + ' = ' + pin + ';', true);
  
  var pinSetupCode = 'pinMode(' + OutputName + ', OUTPUT);';
  Blockly.Arduino.addSetup('io_' + OutputName, pinSetupCode, false);

  return '';
};

Blockly.Arduino['io_tone_buz'] = function(block) {
  var pin = block.getFieldValue('OUTPUTNAME');
  var freq = Blockly.Arduino.valueToCode(block, 'FREQUENCY', Blockly.Arduino.ORDER_ATOMIC);

  var code = 'tone(' + pin + ', ' + freq + ');\n';
  return code;
};

Blockly.Arduino['io_notone_buz'] = function(block) {
  var pin = block.getFieldValue('OUTPUTNAME');

  var code = 'noTone(' + pin + ');\n';
  return code;
};

Blockly.Arduino['io_toneduration'] = function(block) {
  var pin = block.getFieldValue('OUTPUTNAME');
  var freq = Blockly.Arduino.valueToCode(block, 'FREQUENCY', Blockly.Arduino.ORDER_ATOMIC);
  var duration = Blockly.Arduino.valueToCode(block, 'DURATION', Blockly.Arduino.ORDER_ATOMIC);

  var code = 'tone(' + pin + ', ' + freq + ', ' + duration +');\n';
  return code;
};

Blockly.Arduino['io_pitch'] = function(block) {
  var code = block.getFieldValue('TONEPITCH');
  
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['io_tonepitch'] = function(block) {
  var pin = block.getFieldValue('OUTPUTNAME');
  var pitch = block.getFieldValue('TONEPITCH');
  var duration = Blockly.Arduino.valueToCode(block, 'DURATION', Blockly.Arduino.ORDER_ATOMIC);

  var code = 'tone(' + pin + ', ' + pitch + ', ' + duration +'); // pitch ' + block.getField('TONEPITCH').getText() + '\n';
  return code;
};
