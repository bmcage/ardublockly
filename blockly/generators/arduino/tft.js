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
  var col = Blockly.Arduino.colour2RGB(colour)
  var colR = col.red;
  var colG = col.green;
  var colB = col.blue;
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
  var col = Blockly.Arduino.colour2RGB(colour)
  var colR = col.red;
  var colG = col.green;
  var colB = col.blue;
  
  return tftName + '.fillScreen(' + tftName + '.Color565(' + colR + ', ' + colG + ', ' + colB + ') );\n';
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
      codesprite += tftName + '.Color565(' + colR + ', ' + colG + ', ' + colB + '), '
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
  var codedrawpixel = `
// ---------------
// draw pixel
// ---------------
// faster drawPixel method by inlining calls and using setAddrWindow and pushColor
// using macro to force inlining
#define MYTFTdrawPixel(a, b, c) MYTFT.setAddrWindow(a, b, a, b); MYTFT.pushColor(c)

// temporary x and y var
static short MYTFTtmpx, MYTFTtmpy, MYTFTtmps1, MYTFTtmps2;

`
  Blockly.Arduino.addDeclaration(spriteName, codesprite);
  Blockly.Arduino.addDeclaration(tftName + 'drawpixel', codedrawpixel.replace(new RegExp('MYTFT', 'g'), tftName));
  
  var codedraw = `
// draw sprite
// ---------------
MYTFTtmpx = SPRITEW - 1; //width sprite
do {
  SPRITEpx = XPOS + SIZE * MYTFTtmpx;
  // draw SPRITE at new position
  MYTFTtmpy = SPRITEH - 1;
  do {
    SPRITEpy = YPOS + SIZE * MYTFTtmpy ;
    MYTFTtmps1 = SIZE - 1; //scale
    do {
      MYTFTtmps2 = SIZE - 1; //scale
      do {
        MYTFTdrawPixel(SPRITEpx + MYTFTtmps1, SPRITEpy + MYTFTtmps2, SPRITE8x8[MYTFTtmpx + (MYTFTtmpy * SPRITEW)]);
        } while (MYTFTtmps2--);
    } while (MYTFTtmps1--);
  } while (MYTFTtmpy--);
} while (MYTFTtmpx--);

`
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
      codesprite += tftName + '.Color565(' + colR + ', ' + colG + ', ' + colB + '), '
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
  var codedrawpixel = `
// ---------------
// draw pixel
// ---------------
// faster drawPixel method by inlining calls and using setAddrWindow and pushColor
// using macro to force inlining
#define MYTFTdrawPixel(a, b, c) MYTFT.setAddrWindow(a, b, a, b); MYTFT.pushColor(c)

// temporary x and y var
static short MYTFTtmpx, MYTFTtmpy, MYTFTtmps1, MYTFTtmps2;

`
  Blockly.Arduino.addDeclaration(spriteName, codesprite);
  Blockly.Arduino.addDeclaration(tftName + 'drawpixel', codedrawpixel.replace(new RegExp('MYTFT', 'g'), tftName));
  
  var codedraw = `
// draw sprite
// ---------------
MYTFTtmpx = SPRITEW - 1; //width sprite
do {
  SPRITEpx = XPOS + SIZE * MYTFTtmpx;
  // draw SPRITE at new position
  MYTFTtmpy = SPRITEH - 1;
  do {
    SPRITEpy = YPOS + SIZE * MYTFTtmpy ;
    MYTFTtmps1 = SIZE - 1; //scale
    do {
      MYTFTtmps2 = SIZE - 1; //scale
      do {
        MYTFTdrawPixel(SPRITEpx + MYTFTtmps1, SPRITEpy + MYTFTtmps2, SPRITE16x16[MYTFTtmpx + (MYTFTtmpy * SPRITEW)]);
        } while (MYTFTtmps2--);
    } while (MYTFTtmps1--);
  } while (MYTFTtmpy--);
} while (MYTFTtmpx--);

`
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
    
  var code = `
void MYTFTdrawline(uint16_t color, int x1, int y1, int x2, int y2) {
  if (x1 == x2) {
    //horizontal line 
    MYTFT.drawFastHLine(x1, y1, y2-y1, color);
  } else if (y1 == y2) {
    //vertical line 
    MYTFT.drawFastVLine(x1, y1, x2-x1, color);
  } else {
    MYTFT.drawLine(x1, y1, x2, y2, color);
  }
}
`
  Blockly.Arduino.addDeclaration(tftName + '_line', code.replace(new RegExp('MYTFT', 'g'), tftName));
  return tftName + 'drawline(' + tftName + '.Color565(' + colR + ', ' + colG + ', ' + colB + '), ' + xpos1 + ', ' + ypos1 + ', ' + xpos2 + ', ' + ypos2 + ');\n';
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
    code = tftName + '.fillRect(' + xpos1 + ', ' + ypos1 + ', ' + width + ', ' + height + ', ' + tftName + '.Color565(' + colR + ', ' + colG + ', ' + colB + '));\n';
  } else {
    code = tftName + '.drawRect(' + xpos1 + ', ' + ypos1 + ', ' + width + ', ' + height + ', ' + tftName + '.Color565(' + colR + ', ' + colG + ', ' + colB + '));\n';
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
    code = tftName + '.fillCircle(' + xpos1 + ', ' + ypos1 + ', ' + radius + ', ' + tftName + '.Color565(' + colR + ', ' + colG + ', ' + colB + '));\n';
  } else {
    code = tftName + '.drawCircle(' + xpos1 + ', ' + ypos1 + ', ' + radius + ', ' + tftName + '.Color565(' + colR + ', ' + colG + ', ' + colB + '));\n';
  }
      
  return code;
};
