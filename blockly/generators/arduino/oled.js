/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Arduino code generator for the 7segment library blocks.
 */
'use strict';

goog.provide('Blockly.Arduino.oled');

goog.require('Blockly.Arduino');

/**
 * The OLED config block
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['oled_config'] = function(block) {

  var oledName = block.getFieldValue('OLED_NAME');
  var oledResolution = block.getFieldValue('OLED_RES')

  var i2cPins = Blockly.Arduino.Boards.selected.i2cPins['Wire'];

  // Reserve I2C pins SDA and SCL
  if (i2cPins.length >=2) {
    for (var i = 0; i < 2; i++) {
      Blockly.Arduino.reservePin(block, i2cPins[i][1],
            Blockly.Arduino.PinTypes.I2C, 'I2C ' + i2cPins[i][0]);
    }
  }
    
  var includeCode = `#include <U8g2lib.h>
#ifdef U8X8_HAVE_HW_SPI
#include <SPI.h>
#endif
#ifdef U8X8_HAVE_HW_I2C
#include <Wire.h>
#endif`

  Blockly.Arduino.addInclude('oled', includeCode);
    
  var declarationCode = '';
  /**
   * Each resolution needs another setup!!
   * If other resolution screen are used,
   * Add them with if-else
   */

  if (i2cPins.length >=2) {
    declarationCode += '// Connect display to ' + i2cPins[0][0] + ' = ' + i2cPins[0][1]
                      + ' and ' + i2cPins[1][0] + ' = ' + i2cPins[1][1] + '\n'
  }
  if(oledResolution == '128x32') {
    declarationCode += 'U8G2_SSD1306_128X32_UNIVISION_F_SW_I2C u8g2(U8G2_R0, /* clock=*/ SCL, /* data=*/ SDA, /* reset=*/ U8X8_PIN_NONE);'
  }
  Blockly.Arduino.addDeclaration(oledName, declarationCode);
    
  var setupCode = 'u8g2.begin();';
  Blockly.Arduino.addSetup(oledName, setupCode, true);
    
  var returnCode = '';
  return returnCode;
};

/**
 * The OLED Font block
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['oled_font'] = function(block) {
    var fontSize = block.getFieldValue('OLED_FONT_SIZE')
    
    var returnCode = 'u8g2.setFont(u8g2_font_ncenB' + fontSize + '_tr); // choose a suitable font\n';
    return returnCode;
};

/**
 * The OLED print block
 * Sets the x -and y-position of the cursor
 * Prints the given text
 */
Blockly.Arduino['oled_print'] = function(block) {
    var xpos = Blockly.Arduino.valueToCode(block, 'OLED_X', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var ypos = Blockly.Arduino.valueToCode(block, 'OLED_Y', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var txt = Blockly.Arduino.valueToCode(block, 'OLED_PRINT', Blockly.Arduino.ORDER_ATOMIC) || '';
    var code = 'u8g2.drawStr(' + xpos + ',' + ypos + ',' + txt + ');\n';
    
    return code;
};

/**
 * The OLED clear block
 * empties the display
 */
Blockly.Arduino['oled_clear'] = function(block) {
    return 'u8g2.clearBuffer(); // clear internal memory';
};

/**
 * The OLED show block
 * Puts the internal memory on the display
 */
Blockly.Arduino['oled_show'] = function(block) {
    return 'u8g2.sendBuffer();';
};