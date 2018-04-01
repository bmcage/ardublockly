/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Generating Arduino code for colour blocks.
 *
 * TODO: These blocks do not really serve a purpose for Arduino code.
 */

'use strict';

goog.provide('Blockly.Arduino.colour');

goog.require('Blockly.Arduino');


Blockly.Arduino['colour_picker'] = function(block) {
  // Colour picker, return a value "'#RRGGBB'" where they are in hex form 
  var code = '\'' + block.getFieldValue('COLOUR') + '\'';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino['colour_random'] = function(block) {
  // Generate a random colour.
  var code = '(random(256), random(256), random(256))';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['colour_rgb255'] = function(block) {
  // Compose a colour from RGB components 
  var r = Blockly.Arduino.valueToCode(block, 'RED',
                                     Blockly.Arduino.ORDER_NONE) || 0;
  var g = Blockly.Arduino.valueToCode(block, 'GREEN',
                                     Blockly.Arduino.ORDER_NONE) || 0;
  var b = Blockly.Arduino.valueToCode(block, 'BLUE',
                                     Blockly.Arduino.ORDER_NONE) || 0;
  var code = '(' + r + ', ' + g + ', ' + b + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['colour_rgb'] = Blockly.Arduino.noGeneratorCodeInline;

Blockly.Arduino['colour_blend'] = Blockly.Arduino.noGeneratorCodeInline;

