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

Blockly.Arduino['tft_config'] = function(block) {
  var tftName = block.getFieldValue('TFTNAME');
  Blockly.Arduino.addInclude('Adafruit_GFX', '#include <Adafruit_GFX.h>');
  Blockly.Arduino.addInclude('Adafruit_ST7735', '#include <Adafruit_ST7735.h>');
  Blockly.Arduino.addInclude('SPI', '#include <SPI.h>');

  var code = `
// Connect TFT to Arduino Nano - Vcc & GND, LED to 3.3V,
// SDA pin to NANO pin 11 (MOSI)
// SDO pin to NANO pin 12 (MISO)
// SCK pin to NANO pin 13 (SCK)
#define TFT_CS     10 // CS pin to NANO pin 10
#define TFT_RST    8  // RST (RESET) pin to NANO pin 8
#define TFT_DC     9  // AO or D/C pin to NANO pin 9

Adafruit_ST7735 TFT = Adafruit_ST7735(TFT_CS,  TFT_DC, TFT_RST);
`
  Blockly.Arduino.addDeclaration(tftName, code.replace(new RegExp('TFT', 'g'), tftName));

  Blockly.Arduino.addSetup(tftName, tftName + '.initR(INITR_BLACKTAB);', false);

  return '';
};

Blockly.Arduino['tft_text'] = function(block) {
  var text_tekst = block.getFieldValue('tekst');
  var colour_kleurtekst = block.getFieldValue('kleurTekst');
  var number_xwaarde = block.getFieldValue('xWaarde');
  var number_ywaarde = block.getFieldValue('yWaarde');
    
  Blockly.Arduino.addSetup('tft2', 'test' ,false);
  
  return '';
};

Blockly.Arduino['tft_backgroundcolor'] = function(block) {
  var colour_kleurachtergrond = block.getFieldValue('kleurAchtergrond');
    
  Blockly.Arduino.addSetup('tft3', tftName + '.fillScreen('+colour_kleurachtergrond+');',false);
  
  return '';
};
