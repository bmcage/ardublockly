/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Arduino code generator for the Servo library blocks.
 *     The Arduino Servo library docs: http://arduino.cc/en/reference/servo
 *
 * 
 */
'use strict';

goog.provide('Blockly.Arduino.tft');

goog.require('Blockly.Arduino');
var tftName = 'myTFT';

Blockly.Arduino['tft'] = function(block) {
  
  Blockly.Arduino.addInclude('tft', '#include <Adafruit_GFX.h>\n#include <Adafruit_ST7735.h>\n#include <SPI.h>\nAdafruit_ST7735 ' + tftName + ' =  Adafruit_ST7735(10, 9, 8);');

  Blockly.Arduino.addSetup('tft1', tftName + '.initR(INITR_BLACKTAB);',false);

  return '';
};



Blockly.Arduino['tft_tekst'] = function(block) {
  var text_tekst = block.getFieldValue('tekst');
  var colour_kleurtekst = block.getFieldValue('kleurTekst');
  var number_xwaarde = block.getFieldValue('xWaarde');
  var number_ywaarde = block.getFieldValue('yWaarde');
    
  Blockly.Arduino.addSetup('tft2', 'test' ,false);
  
  return '';
};



Blockly.Arduino['kleurachtergrond'] = function(block) {
  var colour_kleurachtergrond = block.getFieldValue('kleurAchtergrond');
    
  Blockly.Arduino.addSetup('tft3', tftName + '.fillScreen('+colour_kleurachtergrond+');',false);
  
  return '';
};