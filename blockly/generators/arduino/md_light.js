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


function hexToRgb(hex) {
  if (hex.lastIndexOf('rgb', 0) === 0) {
    var rgb = hex.substring(4, hex.length-1)
         .replace(/ /g, '')
         .split(',');
    return {r: parseInt(rgb[0], 10),
            g: parseInt(rgb[1], 10),
            b: parseInt(rgb[2], 10),
           }
  } else {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : {
        r: 0,
        g: 0,
        b: 0
    };
  }
}


/**
 * The neopixel setup block
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['mcookie_neopixel_setup'] = function(block) {
  var NeoPixelName = block.getFieldValue('LEDNAME');
  var number = Blockly.Arduino.valueToCode(
      block, 'NUMBER', Blockly.Arduino.ORDER_ATOMIC) || '1';
  
  //the hub saved the connector in the attached block
  var hubconnector = block['connector'] || ['0', '1']
  //compute the pins, normally only possible to attach at valid pins
  var pintop = hubconnector[0];

  Blockly.Arduino.reservePin(
      block, pintop, Blockly.Arduino.PinTypes.OUTPUT, 'Digital Write');

  //NeoPixelName is a variable containing the used pins
  Blockly.Arduino.addVariable(NeoPixelName,
      'int ' + NeoPixelName + ' = ' + pintop + ';', true);
  
  var NeoName = 'myNeo_' + NeoPixelName;
  
  var decl_code = '#include <Adafruit_NeoPixel.h>\n' +
        'Adafruit_NeoPixel ' + NeoName + ' = Adafruit_NeoPixel(' + number +
        ', ' +pintop + ', NEO_GRB + NEO_KHZ800);';
        
  Blockly.Arduino.addDeclaration(NeoName, decl_code);
  
  var setupCode = NeoName + '.begin();\n' +
                  '  ' + NeoName + '.show();';
  Blockly.Arduino.addSetup('io_' + pintop, setupCode, false);
  
  return '';

};
