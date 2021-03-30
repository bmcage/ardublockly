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

/**
 * pad a number n to width with padding character z
 */
function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

Blockly.Arduino.colour2RGB = function(colour) {
  var outcolour = {red: 0, green: 0, blue: 0};
  var colR, colG, colB;
  if (colour[0] == '(') {
    var possplit1 = colour.indexOf(",");
    colR = colour.slice(1, possplit1);
    var possplit2 = possplit1+1 + colour.slice(possplit1+1, colour.length).indexOf(",");
    colG = colour.slice(possplit1+1, possplit2);
    colB = colour.slice(possplit2+1, colour.length-1);
  } else if (colour[0] == "'") {
    colR = '0x' + colour.slice(2, 4);
    colG = '0x' + colour.slice(4, 6);
    colB = '0x' + colour.slice(6, 8);
  } else {
    colR = '0x' + colour.slice(1, 3);
    colG = '0x' + colour.slice(3, 5);
    colB = '0x' + colour.slice(5, 7);
  }
  outcolour.red = colR;
  outcolour.green = colG;
  outcolour.blue = colB;
  return outcolour;
}
  
Blockly.Arduino['tft_config'] = function(block) {
  var tftName = block.getFieldValue('TFTNAME');
  Blockly.Arduino.addInclude('Adafruit_GFX', '#include <Adafruit_GFX.h> // version 1.3.6');
  Blockly.Arduino.addInclude('Adafruit_ST7735', '#include <Adafruit_ST7735.h> // version 1.2.7');
  Blockly.Arduino.addInclude('SPI', '#include <SPI.h>');

  var code = '// Connect TFT to Arduino Nano - Vcc & GND, LED to 3.3V,\n';
  code += '// SDA pin to NANO pin 11 (MOSI)\n';
  code += '// SDO pin to NANO pin 12 (MISO)\n';
  code += '// SCK pin to NANO pin 13 (SCK)\n';
  code += '#define TFT_CS     10 // CS pin to NANO pin 10\n';
  code += '#define TFT_RST    8  // RST (RESET) pin to NANO pin 8\n';
  code += '#define TFT_DC     9  // AO or D/C pin to NANO pin 9\n';
  code += '\n';
  code += 'Adafruit_ST7735 TFT = Adafruit_ST7735(TFT_CS,  TFT_DC, TFT_RST);\n';

  Blockly.Arduino.addDeclaration(tftName, code.replace(new RegExp('TFT', 'g'), tftName));

  Blockly.Arduino.addSetup(tftName, tftName + '.initR(INITR_BLACKTAB);', false);

  return '';
};

Blockly.Arduino['tft_text'] = function(block) {
  var tftName = block.getFieldValue('TFTNAME');
  var text = Blockly.Arduino.valueToCode(block, 'TFT_TEXT', Blockly.Arduino.ORDER_ATOMIC) || '"Test"'; 
  var colour = Blockly.Arduino.valueToCode(block, 'TFT_COL', Blockly.Arduino.ORDER_ATOMIC) || "'#000000'";
  var col = Blockly.Arduino.colour2RGB(colour)
  var colR = col.red;
  var colG = col.green;
  var colB = col.blue;
  var size = block.getFieldValue('TFT_SIZE');
  var xpos = Blockly.Arduino.valueToCode(block, 'TFT_X', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var ypos = Blockly.Arduino.valueToCode(block, 'TFT_Y', Blockly.Arduino.ORDER_ATOMIC) || '0';
    
  var code = 'void MYTFTdrawtext(String text, uint16_t color, int size, int x, int y) {\n';
  code += '  MYTFT.setCursor(x, y);\n';
  code += '  MYTFT.setTextColor(color);\n';
  code += '  MYTFT.setTextSize(size);\n';
  code += '  MYTFT.setTextWrap(true);\n';
  code += '  MYTFT.println(text);\n';
  code += '}\n';

  Blockly.Arduino.addDeclaration(tftName + '_text', code.replace(new RegExp('MYTFT', 'g'), tftName));
  return tftName + 'drawtext(' + text + ', ' + tftName + '.color565(' + colR + ', ' + colG + ', ' + colB + '), ' + size + ', ' + xpos + ', ' + ypos + ');\n';
};

Blockly.Arduino['tft_backgroundcolor'] = function(block) {
  var tftName = block.getFieldValue('TFTNAME'); 
  var colour = Blockly.Arduino.valueToCode(block, 'TFT_COL', Blockly.Arduino.ORDER_ATOMIC) || "'#000000'";
  var col = Blockly.Arduino.colour2RGB(colour)
  var colR = col.red;
  var colG = col.green;
  var colB = col.blue;
  
  return tftName + '.fillScreen(' + tftName + '.color565(' + colR + ', ' + colG + ', ' + colB + ') );\n';
};


Blockly.Arduino['tft_sprite8x8'] = function(block) {
  var tftName = block.getFieldValue('TFTNAME');
  var spriteName = Blockly.Arduino.valueToCode(block, 'SPRITENAME', Blockly.Arduino.ORDER_ATOMIC) || 'MySprite';
  if (spriteName[0] == '"') spriteName = spriteName.slice(1, spriteName.length-1);
  var size = block.getFieldValue('TFT_SIZE');
  var xpos = Blockly.Arduino.valueToCode(block, 'TFT_X', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var ypos = Blockly.Arduino.valueToCode(block, 'TFT_Y', Blockly.Arduino.ORDER_ATOMIC) || '0';
  // we loop through all pixels
  var codesprite = 'static unsigned int ' + spriteName + '8x8[] =\n{ ';
  for (var i=1; i<9; i++) {
    for (var j=1; j<9; j++) {
      var pixelname = 'sp' + pad(i, 2, '0') + pad(j, 2, '0');
      var colour = block.getFieldValue(pixelname) || "'#000000'";
      var col = Blockly.Arduino.colour2RGB(colour)
      var colR = col.red;
      var colG = col.green;
      var colB = col.blue;
      codesprite += tftName + '.color565(' + colR + ', ' + colG + ', ' + colB + '), '
    }
    codesprite += '\n';
  }
  codesprite = codesprite.slice(0, codesprite.length-3) + '\n};\n\n';
  codesprite += 
    '#define ' + spriteName + 'W            8     // sprite width\n' +
    '#define ' + spriteName + 'H            8     // mario height\n' +
    '#define ' + spriteName + 'W2           4     // half width\n' +
    '#define ' + spriteName + 'H2           4     // half height\n' +
    'unsigned char ' + spriteName + 'px, ' + spriteName + 'py;\n';
  var codedrawpixel = '// ----------------------\n';
  codedrawpixel += '// draw Sprites variables\n';
  codedrawpixel += '// ----------------------\n';
  codedrawpixel += '// temporary x and y var\n';
  codedrawpixel += 'static short MYTFTtmpx, MYTFTtmpy, MYTFTtmps1, MYTFTtmps2;\n';


  Blockly.Arduino.addDeclaration(spriteName, codesprite);
  Blockly.Arduino.addDeclaration(tftName + 'drawpixel', codedrawpixel.replace(new RegExp('MYTFT', 'g'), tftName));
  
  var codedraw = '// draw sprite\n';
  codedraw += '// ---------------\n';
  codedraw += 'MYTFTtmpx = SPRITEW - 1; //width sprite\n';
  codedraw += 'do {\n';
  codedraw += ' SPRITEpx = XPOS + SIZE * MYTFTtmpx;\n';
  codedraw += ' // draw SPRITE at new position\n';
  codedraw += ' MYTFTtmpy = SPRITEH - 1;\n';
  codedraw += ' do {\n';
  codedraw += '    SPRITEpy = YPOS + SIZE * MYTFTtmpy ;\n';
  codedraw += '    MYTFTtmps1 = SIZE - 1; //scale\n';
  codedraw += '    do {\n';
  codedraw += '      MYTFTtmps2 = SIZE - 1; //scale\n';
  codedraw += '      do {\n';
  codedraw += '        MYTFT.drawPixel(SPRITEpx + MYTFTtmps1, SPRITEpy + MYTFTtmps2, SPRITE8x8[MYTFTtmpx + (MYTFTtmpy * SPRITEW)]);\n';
  codedraw += '        } while (MYTFTtmps2--);\n';
  codedraw += '    } while (MYTFTtmps1--);\n';
  codedraw += '  } while (MYTFTtmpy--);\n';
  codedraw += '} while (MYTFTtmpx--);\n';
  
  return codedraw.replace(new RegExp('MYTFT', 'g'), tftName).replace(new RegExp('SPRITE', 'g'), spriteName).replace(new RegExp('XPOS', 'g'), xpos).replace(new RegExp('YPOS', 'g'), ypos).replace(new RegExp('SIZE', 'g'), size);
};


Blockly.Arduino['tft_sprite16x16'] = function(block) {
  var tftName = block.getFieldValue('TFTNAME');
  var spriteName = Blockly.Arduino.valueToCode(block, 'SPRITENAME', Blockly.Arduino.ORDER_ATOMIC) || 'MySprite16';
  if (spriteName[0] == '"') spriteName = spriteName.slice(1, spriteName.length-1);
  var size = block.getFieldValue('TFT_SIZE');
  var xpos = Blockly.Arduino.valueToCode(block, 'TFT_X', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var ypos = Blockly.Arduino.valueToCode(block, 'TFT_Y', Blockly.Arduino.ORDER_ATOMIC) || '0';
  // we loop through all pixels
  var codesprite = 'static unsigned int ' + spriteName + '16x16[] =\n{ ';
  for (var i=1; i<17; i++) {
    for (var j=1; j<17; j++) {
      var pixelname = 'sp' + pad(i, 2, '0') + pad(j, 2, '0');
      var colour = block.getFieldValue(pixelname) || "'#000000'";
      var col = Blockly.Arduino.colour2RGB(colour)
      var colR = col.red;
      var colG = col.green;
      var colB = col.blue;
      codesprite += tftName + '.color565(' + colR + ', ' + colG + ', ' + colB + '), '
    }
    codesprite += '\n';
  }
  codesprite = codesprite.slice(0, codesprite.length-3) + '\n};\n\n';
  codesprite += 
    '#define ' + spriteName + 'W           16     // sprite width\n' +
    '#define ' + spriteName + 'H           16     // mario height\n' +
    '#define ' + spriteName + 'W2           8     // half width\n' +
    '#define ' + spriteName + 'H2           8     // half height\n' +
    'unsigned char ' + spriteName + 'px, ' + spriteName + 'py;\n';
  var codedrawpixel = '// ----------------------\n';
  codedrawpixel += '// draw Sprites variables\n';
  codedrawpixel += '// ----------------------\n';
  codedrawpixel += '\n';
  codedrawpixel += '// temporary x and y var\n';
  codedrawpixel += 'static short MYTFTtmpx, MYTFTtmpy, MYTFTtmps1, MYTFTtmps2;\n';


  Blockly.Arduino.addDeclaration(spriteName, codesprite);
  Blockly.Arduino.addDeclaration(tftName + 'drawpixel', codedrawpixel.replace(new RegExp('MYTFT', 'g'), tftName));
  
  var codedraw = '// draw sprite\n';
  codedraw += '// ---------------\n';
  codedraw += 'MYTFTtmpx = SPRITEW - 1; //width sprite\n';
  codedraw += 'do {\n';
  codedraw += '  SPRITEpx = XPOS + SIZE * MYTFTtmpx;\n';
  codedraw += '  // draw SPRITE at new position\n';
  codedraw += '  MYTFTtmpy = SPRITEH - 1;\n';
  codedraw += '  do {\n';
  codedraw += '    SPRITEpy = YPOS + SIZE * MYTFTtmpy ;\n';
  codedraw += '    MYTFTtmps1 = SIZE - 1; //scale\n';
  codedraw += '    do {\n';
  codedraw += '      MYTFTtmps2 = SIZE - 1; //scale\n';
  codedraw += '      do {\n';
  codedraw += '        MYTFT.drawPixel(SPRITEpx + MYTFTtmps1, SPRITEpy + MYTFTtmps2, SPRITE16x16[MYTFTtmpx + (MYTFTtmpy * SPRITEW)]);\n';
  codedraw += '        } while (MYTFTtmps2--);\n';
  codedraw += '    } while (MYTFTtmps1--);\n';
  codedraw += '  } while (MYTFTtmpy--);\n';
  codedraw += '} while (MYTFTtmpx--);\n';
  
  return codedraw.replace(new RegExp('MYTFT', 'g'), tftName).replace(new RegExp('SPRITE', 'g'), spriteName).replace(new RegExp('XPOS', 'g'), xpos).replace(new RegExp('YPOS', 'g'), ypos).replace(new RegExp('SIZE', 'g'), size);
};


Blockly.Arduino['tft_line'] = function(block) {
  var tftName = block.getFieldValue('TFTNAME');
  var colour = Blockly.Arduino.valueToCode(block, 'TFT_COL', Blockly.Arduino.ORDER_ATOMIC) || "'#000000'";
  var col = Blockly.Arduino.colour2RGB(colour)
  var colR = col.red;
  var colG = col.green;
  var colB = col.blue;
  var xpos1 = Blockly.Arduino.valueToCode(block, 'TFT_X1', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var ypos1 = Blockly.Arduino.valueToCode(block, 'TFT_Y1', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var xpos2 = Blockly.Arduino.valueToCode(block, 'TFT_X2', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var ypos2 = Blockly.Arduino.valueToCode(block, 'TFT_Y2', Blockly.Arduino.ORDER_ATOMIC) || '0';
    
  
  var code = '// TFT draw line \n';
  code += 'void MYTFTdrawline(uint16_t color, int x1, int y1, int x2, int y2) {\n';
  code += '  if (x1 == x2) {\n';
  code += '    //horizontal line \n';
  code += '    MYTFT.drawFastVLine(x1, y1, y2-y1, color);\n';
  code += '  } else if (y1 == y2) {\n';
  code += '    //vertical line \n';
  code += '    MYTFT.drawFastHLine(x1, y1, x2-x1, color);\n';
  code += '  } else {\n';
  code += '    MYTFT.drawLine(x1, y1, x2, y2, color);\n';
  code += '  }\n';
  code += '}\n';

  Blockly.Arduino.addDeclaration(tftName + '_line', code.replace(new RegExp('MYTFT', 'g'), tftName));
  return tftName + 'drawline(' + tftName + '.color565(' + colR + ', ' + colG + ', ' + colB + '), ' + xpos1 + ', ' + ypos1 + ', ' + xpos2 + ', ' + ypos2 + ');\n';
};

Blockly.Arduino['tft_rect'] = function(block) {
  var tftName = block.getFieldValue('TFTNAME');
  var colour = Blockly.Arduino.valueToCode(block, 'TFT_COL', Blockly.Arduino.ORDER_ATOMIC) || "'#000000'";
  var col = Blockly.Arduino.colour2RGB(colour)
  var colR = col.red;
  var colG = col.green;
  var colB = col.blue;
  var xpos1 = Blockly.Arduino.valueToCode(block, 'TFT_X1', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var ypos1 = Blockly.Arduino.valueToCode(block, 'TFT_Y1', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var width = Blockly.Arduino.valueToCode(block, 'TFT_WIDTH', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var height = Blockly.Arduino.valueToCode(block, 'TFT_HEIGHT', Blockly.Arduino.ORDER_ATOMIC) || '0';
    
  var checkbox_name = (block.getFieldValue('TFT_FILLED') == 'TRUE');
  
  var code;
  if (checkbox_name) {
    code = tftName + '.fillRect(' + xpos1 + ', ' + ypos1 + ', ' + width + ', ' + height + ', ' + tftName + '.color565(' + colR + ', ' + colG + ', ' + colB + '));\n';
  } else {
    code = tftName + '.drawRect(' + xpos1 + ', ' + ypos1 + ', ' + width + ', ' + height + ', ' + tftName + '.color565(' + colR + ', ' + colG + ', ' + colB + '));\n';
  }
      
  return code;
};


Blockly.Arduino['tft_circ'] = function(block) {
  var tftName = block.getFieldValue('TFTNAME');
  var colour = Blockly.Arduino.valueToCode(block, 'TFT_COL', Blockly.Arduino.ORDER_ATOMIC) || "'#000000'";
  var col = Blockly.Arduino.colour2RGB(colour)
  var colR = col.red;
  var colG = col.green;
  var colB = col.blue;
  var xpos1 = Blockly.Arduino.valueToCode(block, 'TFT_X1', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var ypos1 = Blockly.Arduino.valueToCode(block, 'TFT_Y1', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var radius = Blockly.Arduino.valueToCode(block, 'TFT_RADIUS', Blockly.Arduino.ORDER_ATOMIC) || '0';
    
  var checkbox_name = (block.getFieldValue('TFT_FILLED') == 'TRUE');
  
  var code;
  if (checkbox_name) {
    code = tftName + '.fillCircle(' + xpos1 + ', ' + ypos1 + ', ' + radius + ', ' + tftName + '.color565(' + colR + ', ' + colG + ', ' + colB + '));\n';
  } else {
    code = tftName + '.drawCircle(' + xpos1 + ', ' + ypos1 + ', ' + radius + ', ' + tftName + '.color565(' + colR + ', ' + colG + ', ' + colB + '));\n';
  }
      
  return code;
};
