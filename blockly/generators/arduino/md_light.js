/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Generating Microduino code for procedure (function) blocks.
 *
 */
'use strict';

goog.provide('Blockly.Arduino.md_light');

goog.require('Blockly.Arduino');

/**
 * The button setup block
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['mcookie_led_setup'] = function(block) {
  var LEDNames = block.getLEDSetupInstance();
  
  //the hub saved the connector in the attached block
  var hubconnector = block['connector']
  //compute the pins, normally only possible to attach at valid pins
  var pintop = (parseInt(hubconnector,10) -3) *2;
  var pinbottom = pintop + 1;

  Blockly.Arduino.reservePin(
      block, pintop, Blockly.Arduino.PinTypes.OUTPUT, 'Digital Write');

  var LEDName = 'myLED_' + LEDNames[0];
  Blockly.Arduino.addDeclaration('LED_' + LEDName, 'int ' + LEDName + ' = ' + pintop +';');
  var pinSetupCode = 'pinMode(' + LEDName + ', OUTPUT);';
  Blockly.Arduino.addSetup('io_' + pintop, pinSetupCode, false);

  return '';
};

/**
 * Function for writing a LED.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['mcookie_led_digitalwrite'] = function(block) {
  var LEDName = block.getFieldValue('LEDNAME');
  var stateOutput = Blockly.Arduino.valueToCode(
      block, 'STATE', Blockly.Arduino.ORDER_ATOMIC) || 'LOW';
  
  var code = 'digitalWrite(myLED_' + LEDName + ', ' + stateOutput + ');\n';
  return code;
};


/**
 * The neopixel setup block
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['mcookie_neopixel_setup'] = function(block) {
  var NeoPixelNames = block.getNeoPixelSetupInstance();
  var aantal = Blockly.Arduino.valueToCode(
      block, 'AANTAL', Blockly.Arduino.ORDER_ATOMIC) || '1';
  
  //the hub saved the connector in the attached block
  var hubconnector = block['connector']
  //compute the pins, normally only possible to attach at valid pins
  var pintop = (parseInt(hubconnector,10) -3) *2;
  var pinbottom = pintop + 1;

  Blockly.Arduino.reservePin(
      block, pintop, Blockly.Arduino.PinTypes.OUTPUT, 'Digital Write');

  var NeoName = 'myNeo_' + NeoPixelNames[0];
  
  var decl_code = '#include <Adafruit_NeoPixel.h>\n' +
        'Adafruit_NeoPixel ' + NeoName + ' = Adafruit_NeoPixel('+aantal+', '+pintop+', NEO_GRB + NEO_KHZ800);';
        
  Blockly.Arduino.addDeclaration(NeoName, decl_code);
  
  var setupCode = 'strip.begin();\n' +
                  '  strip.show();';
  Blockly.Arduino.addSetup('io_' + pintop, setupCode, false);
  
  return '';

};


/**
 * Function for writing to a neopixel strip.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['mcookie_neopixel_write'] = function(block) {
  var LEDName = block.getFieldValue('NEONAME');
  var LEDPixel = Blockly.Arduino.valueToCode(
      block, 'LEDPIXEL', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var Red = Blockly.Arduino.valueToCode(
      block, 'RED', Blockly.Arduino.ORDER_ATOMIC) || '255';
  var Green = Blockly.Arduino.valueToCode(
      block, 'GREEN', Blockly.Arduino.ORDER_ATOMIC) || '255';
  var Blue = Blockly.Arduino.valueToCode(
      block, 'BLUE', Blockly.Arduino.ORDER_ATOMIC) || '255';
  Blockly.Arduino.valueToCode(this, 'blue', Blockly.Arduino.ORDER_ATOMIC)

  var code = 'myNeo_' + LEDName + '.setPixelColor('+LEDPixel+'-1, strip.Color('+Red+','+Green+','+Blue+'));\n';
  code += 'strip.show();\n'

  return code;
};

