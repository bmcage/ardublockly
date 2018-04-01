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
  var tftName = block.getFieldValue('TFTNAME');
  var text = Blockly.Arduino.valueToCode(block, 'TFT_TEXT', Blockly.Arduino.ORDER_ATOMIC) || '"Test"'; 
  var colour = Blockly.Arduino.valueToCode(block, 'TFT_COL', Blockly.Arduino.ORDER_ATOMIC) || "'#000000'";
  var colR = '0x' + colour.slice(2, 4);
  var colG = '0x' + colour.slice(4, 6);
  var colB = '0x' + colour.slice(6, 8);
  if (colour[0] == '(') {
    var possplit1 = colour.indexOf(",");
    colR = colour.slice(1, possplit1);
    var possplit2 = possplit1+1 + colour.slice(possplit1+1, colour.length).indexOf(",");
    colG = colour.slice(possplit1+1, possplit2);
    colB = colour.slice(possplit2+1, colour.length-1);
  }
  var size = block.getFieldValue('TFT_SIZE');
  var xpos = Blockly.Arduino.valueToCode(block, 'TFT_X', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var ypos = Blockly.Arduino.valueToCode(block, 'TFT_Y', Blockly.Arduino.ORDER_ATOMIC) || '0';
    
  var code = `
void MYTFTdrawtext(String text, uint16_t color, int size, int x, int y) {
  MYTFT.setCursor(x, y);
  MYTFT.setTextColor(color);
  MYTFT.setTextSize(size);
  MYTFT.setTextWrap(true);
  MYTFT.println(text);
}
`
  Blockly.Arduino.addDeclaration(tftName + '_text', code.replace(new RegExp('MYTFT', 'g'), tftName));
  return tftName + 'drawtext(' + text + ', ' + tftName + '.Color565(' + colR + ', ' + colG + ', ' + colB + '), ' + size + ', ' + xpos + ', ' + ypos + ');\n';
};

Blockly.Arduino['tft_backgroundcolor'] = function(block) {
  var tftName = block.getFieldValue('TFTNAME'); 
  var colour = Blockly.Arduino.valueToCode(block, 'TFT_COL', Blockly.Arduino.ORDER_ATOMIC) || "'#000000'";
  var colR = '0x' + colour.slice(2, 4);
  var colG = '0x' + colour.slice(4, 6);
  var colB = '0x' + colour.slice(6, 8);
  if (colour[0] == '(') {
    var possplit1 = colour.indexOf(",");
    colR = colour.slice(1, possplit1);
    var possplit2 = possplit1+1 + colour.slice(possplit1+1, colour.length).indexOf(",");
    colG = colour.slice(possplit1+1, possplit2);
    colB = colour.slice(possplit2+1, colour.length-1);
  }
  
  return tftName + '.fillScreen(' + tftName + '.Color565(' + colR + ', ' + colG + ', ' + colB + ') );\n';
};
