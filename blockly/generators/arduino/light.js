/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Generating Microduino code for procedure (function) blocks.
 *
 */
'use strict';

goog.provide('Blockly.Arduino.light');

goog.require('Blockly.Arduino');


function hexToRgb(hex) {
  if (hex.lastIndexOf('rgb', 0) === 0) {
    var rgb = hex.substring(4, hex.length-1)
         .replace(/ /g, '')
         .split(',');
    return {r: parseInt(rgb[0], 10),
            g: parseInt(rgb[1], 10),
            b: parseInt(rgb[2], 10)
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
 * The led setup block
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['led_config_hub'] = function(block) {
  var LEDName = block.getFieldValue('LEDNAME');
  var polarity = block.getFieldValue('POLARITY');
  var LEDon = 'HIGH';
  if (polarity == 'neg') {
    LEDon = 'LOW';
  }
  //the hub saved the connector in the attached block
  var hubconnector = block['connector'] || ['0', '1']
  //compute the pins, normally only possible to attach at valid pins
  var pin = hubconnector[0];

  Blockly.Arduino.reservePin(
      block, pin, Blockly.Arduino.PinTypes.OUTPUT, 'Digital Write to LED');

  //LEDName is a variable containing the used pins
  Blockly.Arduino.addVariable(LEDName,
      'int ' + LEDName + ' = ' + pin + 
      ';\nboolean ' + LEDName + '_ON = ' + LEDon + ';', true);
  
  var pinSetupCode = 'pinMode(' + LEDName + ', OUTPUT);';
  Blockly.Arduino.addSetup('io_' + LEDName, pinSetupCode, false);

  return '';
};

/**
 * Function for writing a LED.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['led_digitalwrite'] = function(block) {
  var LEDName = block.getFieldValue('LEDNAME');
  var stateOutput = Blockly.Arduino.valueToCode(
      block, 'STATE', Blockly.Arduino.ORDER_ATOMIC) || 'LOW';
  
  var code = 'digitalWrite(' + LEDName + ', ' + stateOutput + ');\n';
  return code;
};


/**
 * Function for writing a LED.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['led_digitalwrite_onoff'] = function(block) {
  var LEDName = block.getFieldValue('LEDNAME');
  var stateOutput = block.getFieldValue('STATE');
  var stateval = LEDName + '_ON';
  if (stateOutput == 'off') {
    stateval = '! (' + stateval + ')';
  }
  
  var code = 'digitalWrite(' + LEDName + ', ' + stateval + ');\n';
  return code;
};

/**
 * The neopixel setup block
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['neopixel_config_hub'] = function(block) {
  var NeoPixelName = block.getFieldValue('LEDNAME');
  var number = Blockly.Arduino.valueToCode(
      block, 'NUMBER', Blockly.Arduino.ORDER_ATOMIC) || '1';
  var KHz = block.getFieldValue('KHZ');
  var NeoType = block.getFieldValue('NEOPIXEL_TYPE');
  
  //the hub saved the connector in the attached block
  var hubconnector = block['connector'] || ['0', '1']
  //compute the pins, normally only possible to attach at valid pins
  var pin = hubconnector[0];

  Blockly.Arduino.reservePin(
      block, pin, Blockly.Arduino.PinTypes.OUTPUT, 'Digital Write to Neopixel');

  //NeoPixelName is a variable containing the used pins
  Blockly.Arduino.addVariable(NeoPixelName,
      'int ' + NeoPixelName + ' = ' + pin + ';', true);
  
  var NeoName = 'myNeo_' + NeoPixelName;
  
  var decl_code = '#include <Adafruit_NeoPixel.h>\n' +
        'Adafruit_NeoPixel ' + NeoName + ' = Adafruit_NeoPixel(' + number +
        ', ' +pin + ', ' + NeoType + ' + ' + KHz + ');';
        
  Blockly.Arduino.addDeclaration(NeoName, decl_code);
  
  var setupCode = NeoName + '.begin();\n' +
                  '  ' + NeoName + '.show();';
  Blockly.Arduino.addSetup('io_' + NeoName, setupCode, false);
  
  return '';

};

/**
 * Function for writing to a neopixel strip.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['neopixel_write'] = function(block) {
  var LEDName = block.getFieldValue('NEONAME');
  var LEDPixel = Blockly.Arduino.valueToCode(
      block, 'LEDPIXEL', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var Red = Blockly.Arduino.valueToCode(
      block, 'RED', Blockly.Arduino.ORDER_ATOMIC) || '255';
  var Green = Blockly.Arduino.valueToCode(
      block, 'GREEN', Blockly.Arduino.ORDER_ATOMIC) || '255';
  var Blue = Blockly.Arduino.valueToCode(
      block, 'BLUE', Blockly.Arduino.ORDER_ATOMIC) || '255';

  var code = 'myNeo_' + LEDName + '.setPixelColor(' + LEDPixel + '-1, myNeo_' + LEDName + '.Color(' + Red + ',' + Green + ',' + Blue + '));\n';
  code += 'myNeo_' + LEDName + '.show();\n';

  return code;
};

/**
 * Function for writing to a neopixel strip.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['neopixel_colourpick_write'] = function(block) {
  var LEDName = block.getFieldValue('NEONAME');
  var LEDPixel = Blockly.Arduino.valueToCode(
      block, 'LEDPIXEL', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var Colour = block.getFieldValue('COLOUR');
  //Colour = Colour.substring(4, Colour.length-1)
  //               .replace(/ /g, '')
  //               .split(',');
  Colour = hexToRgb(Colour);
  var Red = Colour.r;
  var Green = Colour.g;
  var Blue = Colour.b;

  var code = 'myNeo_' + LEDName + '.setPixelColor(' + LEDPixel + '-1, myNeo_' + LEDName + '.Color(' + Red + ',' + Green + ',' + Blue + '));\n';
  code += 'myNeo_' + LEDName + '.show();\n';

  return code;
};

/**
 * Function for writing to a neopixel strip.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['neopixel_HSVcolourpick_write'] = function(block) {
  var LEDName = block.getFieldValue('NEONAME');
  var LEDPixel = Blockly.Arduino.valueToCode(
      block, 'LEDPIXEL', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var Colour = block.getFieldValue('COLOUR');
  //Colour = Colour.substring(4, Colour.length-1)
  //               .replace(/ /g, '')
  //               .split(',');
  Colour = hexToRgb(Colour);
  var Red = Colour.r;
  var Green = Colour.g;
  var Blue = Colour.b;

  var code = 'myNeo_' + LEDName + '.setPixelColor(' + LEDPixel + '-1, myNeo_' + LEDName + '.Color(' + Red + ',' + Green + ',' + Blue + '));\n';
  code += 'myNeo_' + LEDName + '.show();\n';

  return code;
};

/**
 * Function for writing to a neopixel strip.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['neopixel_colourpick_dim_write'] = function(block) {
  var LEDName = block.getFieldValue('NEONAME');
  var LEDPixel = Blockly.Arduino.valueToCode(
      block, 'LEDPIXEL', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var Brightness = Blockly.Arduino.valueToCode(
      block, 'BRIGHTNESS', Blockly.Arduino.ORDER_ATOMIC) || '100';
  
  var Colour = block.getFieldValue('COLOUR');
  //Colour = Colour.substring(4, Colour.length-1)
  //               .replace(/ /g, '')
  //               .split(',');
  Colour = hexToRgb(Colour);
  var Red = Colour.r;
  var Green = Colour.g;
  var Blue = Colour.b;

  var code = 'myNeo_' + LEDName + '.setPixelColor(' + LEDPixel + '-1, myNeo_' + LEDName + '.Color(constrain(int(' + Red   + '*'+Brightness+'/100.0),0,255), ' + 
                   'constrain(int(' + Green + '*'+Brightness+'/100.0),0,255), ' + 
                   'constrain(int(' + Blue  + '*'+Brightness+'/100.0),0,255) ));\n';
  code += 'myNeo_' + LEDName + '.show();\n';

  return code;
};

/**
 * Function for dimming a neopixel strip.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['neopixel_dim_write'] = function(block) {
  var NeoPixelName = block.getFieldValue('NEONAME');
  var NeoName = 'myNeo_' + NeoPixelName;
  var Brightness = Blockly.Arduino.valueToCode(
      block, 'BRIGHTNESS', Blockly.Arduino.ORDER_ATOMIC) || '100';
  
//  var setupCode = NeoName + '.setBrightness(' +Brightness+') ;\n'; 
//  Blockly.Arduino.addSetup('io_' + NeoName, setupCode, false);

  var code = NeoName + '.setBrightness(constrain(' +Brightness+',0,255)) ;\n';
  code += NeoName + '.show();\n';

  return code;
};

/**
 * Function for setting the hue neopixel strip.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['neopixel_hue_write'] = function(block) {
  var NeoPixelName = block.getFieldValue('NEONAME');
  var NeoName = 'myNeo_' + NeoPixelName;
  var LEDPixel = Blockly.Arduino.valueToCode(
	      block, 'LEDPIXEL', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var hue = Blockly.Arduino.valueToCode(
      block, 'HUE', Blockly.Arduino.ORDER_ATOMIC) || '100';
  var sat = Blockly.Arduino.valueToCode(
	      block, 'SATURATION', Blockly.Arduino.ORDER_ATOMIC) || '100';
  var val = Blockly.Arduino.valueToCode(
	      block, 'VALUE', Blockly.Arduino.ORDER_ATOMIC) || '100';
 
  
  var code = NeoName + '.setPixelColor(' + LEDPixel +'-1 , ' + NeoName + '.gamma32(' + NeoName + '.ColorHSV(' + hue +','+ sat + ',' + val + ')));\n';
  code += NeoName + '.show();\n';

  return code;
};

/**
 * Function for writing to a neopixel strip.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['neopixel_fill'] = function(block) {
  var LEDName = block.getFieldValue('NEONAME');
  var Red = Blockly.Arduino.valueToCode(
      block, 'RED', Blockly.Arduino.ORDER_ATOMIC) || '255';
  var Green = Blockly.Arduino.valueToCode(
      block, 'GREEN', Blockly.Arduino.ORDER_ATOMIC) || '255';
  var Blue = Blockly.Arduino.valueToCode(
      block, 'BLUE', Blockly.Arduino.ORDER_ATOMIC) || '255';

  var code = 'myNeo_' + LEDName + '.fill(myNeo_' + LEDName + '.Color(' + Red + ',' + Green + ',' + Blue + '));\n';
  code += 'myNeo_' + LEDName + '.show();\n';

  return code;
};

/**
 * Function for clearing a neopixel strip.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['neopixel_clear'] = function(block) {
  var NeoPixelName = block.getFieldValue('NEONAME');
  var NeoName = 'myNeo_' + NeoPixelName;
  var checkbox_name = (block.getFieldValue('DIRECT') == 'TRUE');
 
  var code = NeoName + '.clear();\n';
  if (checkbox_name) {
	  code += NeoName + '.show();\n';
  }
  return code;
};

Blockly.Arduino['neopixel_rainbow'] = function(block) {
	  var NeoPixelName = block.getFieldValue('NEONAME');
	  var NeoName = 'myNeo_' + NeoPixelName;
	  var value_delay = Blockly.Arduino.valueToCode(block, 'delay', Blockly.Arduino.ORDER_ATOMIC);
	  
	  var code = '// rainbow effect\n';
	  code += 'for(long firstPixelHue = 0; firstPixelHue < 65536; firstPixelHue += 256) {\n';
	  code += '   for(int i=0; i<'+NeoName+'.numPixels(); i++) {\n';
	  code += '   int pixelHue = firstPixelHue + (i * 65536L / '+NeoName+'.numPixels());\n';
	  code += '   '+NeoName+'.setPixelColor(i, '+NeoName+'.gamma32('+NeoName+'.ColorHSV(pixelHue)));\n}\n';
	  code += NeoName+'.show();\n';
	  code += 'delay('+value_delay+');\n}\n'; 
	  
	  
	  return code;
};

Blockly.Arduino['neopixel_theaterchaserainbow'] = function(block) {
	  var NeoPixelName = block.getFieldValue('NEONAME');
	  var NeoName = 'myNeo_' + NeoPixelName;
	  var value_delay = Blockly.Arduino.valueToCode(block, 'delay', Blockly.Arduino.ORDER_ATOMIC);
	  
	  var code = '// theaterchaserainbow effect\n';
	    
	  code += 'int red, green, blue;';
	  code += 'int colorPosition = 0;';		 
	  code += 'for (int j=0; j < 256; j++) {     // cycle all 256 colors in the wheel\n';
	  code += '   for (int q=0; q < 3; q++) {\n';
	  code += '   '+NeoName+'.clear();         //   Set all pixels in RAM to 0 (off)\n';
	  code += '      for (int i=0; i < '+NeoName+'.numPixels(); i=i+3) {\n';
	  code += '         colorPosition = (i+j) % 255;\n';
	  code += '      	if(colorPosition < 85) {\n';
	  code += '            red=colorPosition * 3;\n';
 	  code += '            green=255 - colorPosition * 3;\n';
	  code += '            blue=0;\n';
	  code += '         } else if(colorPosition < 170) {\n';
	  code += '            colorPosition -= 85;\n';
	  code += '            red=255 - colorPosition * 3;\n';
	  code += '            green=0;\n';
	  code += '            blue=colorPosition * 3;\n';
	  code += '         } else {\n';
	  code += '            colorPosition -= 170;\n';
	  code += '            red=0;\n';
	  code += '            green=colorPosition * 3;\n';
	  code += '            blue=255 - colorPosition * 3;\n';
	  code += '         }\n';
	  code += '         '+NeoName+'.setPixelColor(i+q, red, green, blue);    //turn every third pixel on\n';
	  code += '      }\n';
	  code += '		 '+NeoName+'.show();\n';
	  code += '      delay('+value_delay+');\n';
      code += '   }\n';
	  code += '}\n';
	  return code;
	};

Blockly.Arduino['neopixel_colorwipe'] = function(block) {
	  var NeoPixelName = block.getFieldValue('NEONAME');
	  var NeoName = 'myNeo_' + NeoPixelName;
	  var value_r = Blockly.Arduino.valueToCode(block, 'RED', Blockly.Arduino.ORDER_ATOMIC);
	  var value_g = Blockly.Arduino.valueToCode(block, 'GREEN', Blockly.Arduino.ORDER_ATOMIC);
	  var value_b = Blockly.Arduino.valueToCode(block, 'BLUE', Blockly.Arduino.ORDER_ATOMIC);
	  var value_delay = Blockly.Arduino.valueToCode(block, 'delay', Blockly.Arduino.ORDER_ATOMIC);
	  
	  var code = '// colorwipe effect\n';
	  code +='for(int i=0; i<'+NeoName+'.numPixels(); i++) { \n';
	  code +='  '+NeoName+'.setPixelColor(i, '+NeoName+'.Color('+value_r+',   '+value_g+',   '+value_b+'));\n';
	  code += '  '+NeoName+'.show();\n';
	  code += '  delay('+value_delay+');\n}\n';
	  code += 'for(int i=0; i<'+NeoName+'.numPixels(); i++) { \n';
	  code +='  '+NeoName+'.setPixelColor(i, '+NeoName+'.Color(0,0,0));\n';
	  code += '  '+NeoName+'.show();\n';
	  code += '  delay('+value_delay+');\n}\n';
	  code += '  delay(100);\n';
	  
	  return code;
	};

Blockly.Arduino['neopixel_theaterchase'] = function(block) {
	  var NeoPixelName = block.getFieldValue('NEONAME');
	  var NeoName = 'myNeo_' + NeoPixelName;
	  var value_r = Blockly.Arduino.valueToCode(block, 'RED', Blockly.Arduino.ORDER_ATOMIC);
	  var value_g = Blockly.Arduino.valueToCode(block, 'GREEN', Blockly.Arduino.ORDER_ATOMIC);
	  var value_b = Blockly.Arduino.valueToCode(block, 'BLUE', Blockly.Arduino.ORDER_ATOMIC);
	  
	  var code = '// theaterchase effect\n';
	  code += 'for(int a=0; a<10; a++) {  // Repeat 10 times...\n';
	  code += '  for(int b=0; b<3; b++) { // b counts from 0 to 2...\n';
	  code += '    '+NeoName+'.clear();         //   Set all pixels in RAM to 0 (off)\n';
	  code += '    for(int c=b; c<'+NeoName+'.numPixels(); c += 3) {\n';
	  code += '      '+NeoName+'.setPixelColor(c, '+NeoName+'.Color('+value_r+',   '+value_g+',   '+value_b+')); // Set pixel c  to value  color\n';
	  code += '    }\n';
	  code += '    '+NeoName+'.show();\n';
	  code += '    delay(50);\n';
	  code += '   }\n  }\n';
	  
	  return code;
	};
	
	Blockly.Arduino['neopixel_effects'] = function(block) {
		  var NeoPixelName = block.getFieldValue('NEONAME');
		  var NeoName = 'myNeo_' + NeoPixelName;
		  var value_delay = Blockly.Arduino.valueToCode(block, 'delay', Blockly.Arduino.ORDER_ATOMIC);
		  var dropdown_type = this.getFieldValue('PROPERTY');
		  var code = '';
		  if (dropdown_type == "colorwipe" ) {
			  var value_r = Blockly.Arduino.valueToCode(block, 'RED', Blockly.Arduino.ORDER_ATOMIC);
			  var value_g = Blockly.Arduino.valueToCode(block, 'GREEN', Blockly.Arduino.ORDER_ATOMIC);
			  var value_b = Blockly.Arduino.valueToCode(block, 'BLUE', Blockly.Arduino.ORDER_ATOMIC);
			  code = '// colorwipe effect\n';
			  code +='for(int i=0; i<'+NeoName+'.numPixels(); i++) { \n';
			  code +='  '+NeoName+'.setPixelColor(i, '+NeoName+'.Color('+value_r+',   '+value_g+',   '+value_b+'));\n';
			  code += '  '+NeoName+'.show();\n';
			  code += '  delay('+value_delay+');\n}\n';
			  code += 'for(int i=0; i<'+NeoName+'.numPixels(); i++) { \n';
			  code +='  '+NeoName+'.setPixelColor(i, '+NeoName+'.Color(0,0,0));\n';
			  code += '  '+NeoName+'.show();\n';
			  code += '  delay('+value_delay+');\n}\n';
			  code += '  delay(100);\n';
		  } else if (dropdown_type == "theaterchase") {
			  var value_r = Blockly.Arduino.valueToCode(block, 'RED', Blockly.Arduino.ORDER_ATOMIC);
			  var value_g = Blockly.Arduino.valueToCode(block, 'GREEN', Blockly.Arduino.ORDER_ATOMIC);
			  var value_b = Blockly.Arduino.valueToCode(block, 'BLUE', Blockly.Arduino.ORDER_ATOMIC);
			  var code = '// theaterchase effect\n';
			  code += 'for(int a=0; a<10; a++) {  // Repeat 10 times...\n';
			  code += '  for(int b=0; b<3; b++) { // b counts from 0 to 2...\n';
			  code += '    '+NeoName+'.clear();         //   Set all pixels in RAM to 0 (off)\n';
			  code += '    for(int c=b; c<'+NeoName+'.numPixels(); c += 3) {\n';
			  code += '      '+NeoName+'.setPixelColor(c, '+NeoName+'.Color('+value_r+',   '+value_g+',   '+value_b+')); // Set pixel c  to value  color\n';
			  code += '    }\n';
			  code += '    '+NeoName+'.show();\n';
			  code += '    delay('+value_delay+');\n';
			  code += '   }\n  }\n';
		  } else if (dropdown_type == "rainbow") {
			  code = '// rainbow effect\n';
			  code += 'for(long firstPixelHue = 0; firstPixelHue < 65536; firstPixelHue += 256) {\n';
			  code += '   for(int i=0; i<'+NeoName+'.numPixels(); i++) {\n';
			  code += '   int pixelHue = firstPixelHue + (i * 65536L / '+NeoName+'.numPixels());\n';
			  code += '   '+NeoName+'.setPixelColor(i, '+NeoName+'.gamma32('+NeoName+'.ColorHSV(pixelHue)));\n}\n';
			  code += NeoName+'.show();\n';
			  code += 'delay('+value_delay+');\n}\n'; 			  
		  } else if (dropdown_type == "theaterchaserainbow") {
			  var value_r = Blockly.Arduino.valueToCode(block, 'RED', Blockly.Arduino.ORDER_ATOMIC);
			  var value_g = Blockly.Arduino.valueToCode(block, 'GREEN', Blockly.Arduino.ORDER_ATOMIC);
			  var value_b = Blockly.Arduino.valueToCode(block, 'BLUE', Blockly.Arduino.ORDER_ATOMIC);
			  var code = '// theaterchaserainbow effect\n';			    
			  code += 'int red, green, blue;\n';
			  code += 'int colorPosition = 0;\n';		 
			  code += 'for (int j=0; j < 256; j++) {     // cycle all 256 colors in the wheel\n';
			  code += '   for (int q=0; q < 3; q++) {\n';
			  code += '   '+NeoName+'.clear();         //   Set all pixels in RAM to 0 (off)\n';
			  code += '      for (int i=0; i < '+NeoName+'.numPixels(); i=i+3) {\n';
			  code += '         colorPosition = (i+j) % 255;\n';
			  code += '      	if(colorPosition < 85) {\n';
			  code += '            red=colorPosition * 3;\n';
		 	  code += '            green=255 - colorPosition * 3;\n';
			  code += '            blue=0;\n';
			  code += '         } else if(colorPosition < 170) {\n';
			  code += '            colorPosition -= 85;\n';
			  code += '            red=255 - colorPosition * 3;\n';
			  code += '            green=0;\n';
			  code += '            blue=colorPosition * 3;\n';
			  code += '         } else {\n';
			  code += '            colorPosition -= 170;\n';
			  code += '            red=0;\n';
			  code += '            green=colorPosition * 3;\n';
			  code += '            blue=255 - colorPosition * 3;\n';
			  code += '         }\n';
			  code += '         '+NeoName+'.setPixelColor(i+q, red, green, blue);    //turn every third pixel on\n';
			  code += '      }\n';
			  code += '		 '+NeoName+'.show();\n';
			  code += '      delay('+value_delay+');\n';
		      code += '   }\n';
			  code += '}\n';
		  } else if (dropdown_type == "meteoor") {
			  var code = '// meteoor effect\n';			    
			  var value_count = Blockly.Arduino.valueToCode(block, 'COUNT', Blockly.Arduino.ORDER_ATOMIC);
			  var value_endDelay = Blockly.Arduino.valueToCode(block, 'ENDDELAY', Blockly.Arduino.ORDER_ATOMIC);
			  code += 'int NUMLEDS = '+NeoName+'.numPixels();\n';
			  code += 'int startDelay = random(5,'+value_delay+');\n';
			  code += 'uint32_t oldColor;\n';			  
			  code += 'uint8_t r, g, b;\n';			  
			  code += 'for(int i = 0; i < NUMLEDS*3; i++) {\n';			  
			  code += '	for(int j=0; j<NUMLEDS; j++) {\n';			  
			  code += '		if( random(10)>5 ) {\n';			  
			  code += '        oldColor = '+NeoName+'.getPixelColor(j);\n';			  
			  code += '        if (oldColor > 0) {\n';			  
			  code += '	        r = (oldColor & 0x00ff0000UL) >> 16;\n';			  
			  code += '	        g = (oldColor & 0x0000ff00UL) >> 8;\n';			  
			  code += '	        b = (oldColor & 0x000000ffUL);\n';			  
			  code += '	        r=(r<=10)? 0 : (int) r-(r*64/256);\n';			  
			  code += '         g=(g<=10)? 0 : (int) g-(g*64/256);\n';			  
			  code += '         b=(b<=10)? 0 : (int) b-(b*64/256);\n';			  
			  code += '         '+NeoName+'.setPixelColor(j, r,g,b);\n';			  
			  code += '		   }\n';			  
			  code += '		 }\n';			  
			  code += '	}\n';			  
			  code += '	for(int j = 0; j < '+value_count+'; j++) {\n';			  
			  code += '		if( ( i-j <NUMLEDS) && (i-j>=0) ) {\n';			  
			  code += '			'+NeoName+'.setPixelColor(i-j, 255, 255, 255);\n';			  
			  code += '		}\n';			  
			  code += '	}\n';			  
			  code += '	'+NeoName+'.show();\n';
			  code += '	if (i % 2) { startDelay++;}\n';			  
			  code += '	delay(startDelay);\n';			  
			  code += '}\n';			  
			  code += 'delay('+value_endDelay+');\n';	
			//  code += '}\n';			  
		  } else if (dropdown_type == "strobe") {
			  var value_r = Blockly.Arduino.valueToCode(block, 'RED', Blockly.Arduino.ORDER_ATOMIC);
			  var value_g = Blockly.Arduino.valueToCode(block, 'GREEN', Blockly.Arduino.ORDER_ATOMIC);
			  var value_b = Blockly.Arduino.valueToCode(block, 'BLUE', Blockly.Arduino.ORDER_ATOMIC);
			  var value_count = Blockly.Arduino.valueToCode(block, 'COUNT', Blockly.Arduino.ORDER_ATOMIC);
			  var code = '// stroboscoop effect\n';			    
			  code += 'for (int count=0; count < '+value_count+'; count++) {\n';
			  code += '    '+NeoName+'.fill('+NeoName+'.Color('+value_r+',   '+value_g+',   '+value_b+')); // Set strip to value  color\n';
			  code += '    '+NeoName+'.show();\n';
			  code += '      delay('+value_delay+');\n';
			  code += '    '+NeoName+'.clear();\n';
			  code += '    '+NeoName+'.show();\n';
			  code += '      delay('+value_delay+');\n';
			  code += '}\n';
		  } else if (dropdown_type == "scanner") {
			  var value_r = Blockly.Arduino.valueToCode(block, 'RED', Blockly.Arduino.ORDER_ATOMIC);
			  var value_g = Blockly.Arduino.valueToCode(block, 'GREEN', Blockly.Arduino.ORDER_ATOMIC);
			  var value_b = Blockly.Arduino.valueToCode(block, 'BLUE', Blockly.Arduino.ORDER_ATOMIC);			  
			  var value_fade = (block.getFieldValue('FADE') == 'TRUE');
			  var readRed = 'uint8_t getRed(uint32_t color)\n';
			  readRed += '{\n';
			  readRed += '    return (color >> 16) & 0xFF;\n';
			  readRed += '}\n';
			  Blockly.Arduino.addFunction("getRed", readRed);		  
			  var readGreen = 'uint8_t getGreen(uint32_t color)\n';
			  readGreen += '{\n';
			  readGreen += '    return (color >> 8) & 0xFF;\n';
			  readGreen += '}\n';
			  Blockly.Arduino.addFunction("getGreen", readGreen);		  
			  var readBlue = 'uint8_t getBlue(uint32_t color)\n';
			  readBlue += '{\n';
			  readBlue += '    return color & 0xFF;\n';
			  readBlue += '}\n';
			  Blockly.Arduino.addFunction("getBlue", readBlue);
				var code = '// scanner effect\n';	
				code += 'uint32_t dimColor;\n';
				code += 'int totalSteps = ('+NeoName+'.numPixels() - 1) * 2;\n';
				code += 'int index = 0;\n';
				code += 'for ( int count = 0; count < totalSteps; count++ ){\n';
			    code += '  for (int i = 0; i < '+NeoName+'.numPixels(); i++)\n';
			    code += '    {\n';
			    code += '        if (i == index)  // Scan Pixel to the right\n';
			    code += '        {\n'
			    code += '           '+NeoName+'.setPixelColor(i, '+NeoName+'.Color('+value_r+','+value_g+','+value_b+'));\n';
			    code += '        }\n';
			    code += '       else if (i == totalSteps - index) // Scan Pixel to the left\n';
			    code += '        {\n';
			    code += '           '+NeoName+'.setPixelColor(i, '+NeoName+'.Color('+value_r+','+value_g+','+value_b+'));\n';
			    code += '       }\n';
			    code += '        else // Fading tail\n';
			    code += '        {\n';
				code += '			dimColor = '+NeoName+'.Color(getRed('+NeoName+'.getPixelColor(i)) >> 1, getGreen('+NeoName+'.getPixelColor(i)) >> 1, getBlue('+NeoName+'.getPixelColor(i)) >> 1);\n';
			    code += '           '+NeoName+'.setPixelColor(i, dimColor);\n';
			    code += '        }\n';
			    code += '    }\n';
			    code += '   '+NeoName+'.show();\n';
				code += '   delay('+value_delay+');\n';
				code += '	index++;\n';
			    code += '    if (index >= totalSteps)\n';
			    code += '      {\n';
			    code += '        index = 0;\n';
			    code += '      }\n';
	//			code += '	}\n';
			    code += '}\n';			  
		  } else if (dropdown_type == "snow") {
			  var value_r = Blockly.Arduino.valueToCode(block, 'RED', Blockly.Arduino.ORDER_ATOMIC);
			  var value_g = Blockly.Arduino.valueToCode(block, 'GREEN', Blockly.Arduino.ORDER_ATOMIC);
			  var value_b = Blockly.Arduino.valueToCode(block, 'BLUE', Blockly.Arduino.ORDER_ATOMIC);			  
//			  var value_fade = (block.getFieldValue('FADE') == 'TRUE');
			  var value_count = Blockly.Arduino.valueToCode(block, 'COUNT', Blockly.Arduino.ORDER_ATOMIC);
			  var mathRandomInt = 'int mathRandomInt(int min, int max) {\n';
			  mathRandomInt += '   if (min > max) {\n';
			  mathRandomInt += '      // Swap min and max to ensure min is smaller.\n';
			  mathRandomInt += '      int temp = min;\n';
			  mathRandomInt += '      min = max;\n';
			  mathRandomInt += '      max = temp;\n';
			  mathRandomInt += '   }\n';
			  mathRandomInt += '   return min + (rand() % (max - min + 1));\n';
			  mathRandomInt += '}\n';
			  Blockly.Arduino.addFunction("mathRandomInt", mathRandomInt);	  
			  var code = '// snow effect\n';
			  code += NeoName+'.fill('+NeoName+'.Color(int('+value_r+'/10),int('+value_g+'/10),int('+value_r+'/10)));\n';
		      code += NeoName+'.show();\n';
			  code += 'int pix1,pix2,pix3;\n';
		      code += 'int vorigpix1 = 1;\n'
		      code += 'int vorigpix2 = 1;\n'
		      code += 'int vorigpix3 = 1;\n'
			  code += 'for (int count = 0; count <= '+value_count+';count++) {\n';
		      code += 'for (int loop = 1; loop <= 5;loop++) {\n';
			  code += '	pix1 = mathRandomInt(1, '+NeoName+'.numPixels());\n';
			  code += '		for (int n = 25; n <= 99; n += 10) {\n';
			  code += '			'+NeoName+'.setPixelColor(vorigpix1-1, '+NeoName+'.Color(constrain(int('+value_r+'*(100 - n)/100.0),0,255), constrain(int('+value_g+'*(100 - n)/100.0),0,255), constrain(int('+value_b+'*(100 - n)/100.0),0,255) ));\n';
		      code += '			'+NeoName+'.show();\n';
			  code += '			'+NeoName+'.setPixelColor(pix1-1, '+NeoName+'.Color(constrain(int('+value_r+'*n/100.0),0,255), constrain(int('+value_g+'*n/100.0),0,255), constrain(int('+value_b+'*n/100.0),0,255) ));\n';
		      code += '			'+NeoName+'.show();\n';
			  code += '			delay('+value_delay+');\n';
			  code += '		}\n';
			  code += '	vorigpix1 = pix1;\n';
			  code += '	delay(mathRandomInt(100, 400));\n';
			  code += '\n';
			  code += '	pix2 = mathRandomInt(1, '+NeoName+'.numPixels());\n';
			  code += '		for (int n = 25; n <= 99; n += 10) {\n';
			  code += '			'+NeoName+'.setPixelColor(vorigpix2-1, '+NeoName+'.Color(constrain(int('+value_r+'*(100 - n)/100.0),0,255), constrain(int('+value_g+'*(100 - n)/100.0),0,255), constrain(int('+value_b+'*(100 - n)/100.0),0,255) ));\n';
		      code += '			'+NeoName+'.show();\n';
			  code += '			'+NeoName+'.setPixelColor(pix2-1, '+NeoName+'.Color(constrain(int('+value_r+'*n/100.0),0,255), constrain(int('+value_g+'*n/100.0),0,255), constrain(int('+value_b+'*n/100.0),0,255) ));\n';
		      code += '			'+NeoName+'.show();\n';
			  code += '			delay('+value_delay+');\n';
			  code += '		}\n';
			  code += '	vorigpix2 = pix2;\n';
			  code += '	delay(mathRandomInt(100, 400));\n';
			  code += '\n';
			  code += '	pix3 = mathRandomInt(1, '+NeoName+'.numPixels());\n';
			  code += '		for (int n = 25; n <= 99; n += 10) {\n';
			  code += '			'+NeoName+'.setPixelColor(vorigpix3-1, '+NeoName+'.Color(constrain(int('+value_r+'*(100 - n)/100.0),0,255), constrain(int('+value_g+'*(100 - n)/100.0),0,255), constrain(int('+value_b+'*(100 - n)/100.0),0,255) ));\n';
		      code += '			'+NeoName+'.show();\n';
			  code += '			'+NeoName+'.setPixelColor(pix3-1, '+NeoName+'.Color(constrain(int('+value_r+'*n/100.0),0,255), constrain(int('+value_g+'*n/100.0),0,255), constrain(int('+value_b+'*n/100.0),0,255) ));\n';
		      code += '			'+NeoName+'.show();\n';
			  code += '			delay('+value_delay+');\n';
			  code += '		}\n';
			  code += '	vorigpix3 = pix3;\n';
			  code += '	delay(mathRandomInt(100, 400));\n';
			  code += '}\n';
			  code += '}\n';
			  
		  } else if (dropdown_type == "snake") {
			  var value_r = Blockly.Arduino.valueToCode(block, 'RED', Blockly.Arduino.ORDER_ATOMIC);
			  var value_g = Blockly.Arduino.valueToCode(block, 'GREEN', Blockly.Arduino.ORDER_ATOMIC);
			  var value_b = Blockly.Arduino.valueToCode(block, 'BLUE', Blockly.Arduino.ORDER_ATOMIC);			  
			  var value_fade = (block.getFieldValue('FADE') == 'TRUE');
			  var f1,f2,f3,f4,f5;
			  if (value_fade) {
				  f1 = 1.0;
				  f2 = 0.8;
				  f3 = 0.6;
				  f4 = 0.4;
				  f5 = 0.2;
			  } else {
				  f1 = 1.0;
				  f2 = 1.0;
				  f3 = 1.0;
				  f4 = 1.0;
				  f5 = 1.0;				  
			  }
			  var code = '// snake effect\n';	
			  code += 'int lus1 = 4;\n';
		      code += 'int lus2 = 3;\n';
		      code += 'int lus3 = 2;\n';
		      code += 'int lus4 = 1;\n';
			  code += 'int lus5 = 0;\n';
			  code += 'for(int i=1; i<'+NeoName+'.numPixels(); i++) {\n';
		      code += '    '+NeoName+'.setPixelColor(lus1,'+NeoName+'.Color(constrain(int('+value_r+'*'+f1+'),0,255), constrain(int('+value_g+'*'+f1+'),0,255), constrain(int('+value_b+'*'+f1+'),0,255)));\n';
		      code += '    '+NeoName+'.show();\n';
		      code += '    '+NeoName+'.setPixelColor(lus2,'+NeoName+'.Color(constrain(int('+value_r+'*'+f2+'),0,255), constrain(int('+value_g+'*'+f2+'),0,255), constrain(int('+value_b+'*'+f2+'),0,255)));\n';
		      code += '    '+NeoName+'.show();\n';
		      code += '    '+NeoName+'.setPixelColor(lus3,'+NeoName+'.Color(constrain(int('+value_r+'*'+f3+'),0,255), constrain(int('+value_g+'*'+f3+'),0,255), constrain(int('+value_b+'*'+f3+'),0,255)));\n';
		      code += '    '+NeoName+'.show();\n';
		      code += '    '+NeoName+'.setPixelColor(lus4,'+NeoName+'.Color(constrain(int('+value_r+'*'+f4+'),0,255), constrain(int('+value_g+'*'+f4+'),0,255), constrain(int('+value_b+'*'+f4+'),0,255)));\n';
		      code += '    '+NeoName+'.show();\n';
		      code += '    '+NeoName+'.setPixelColor(lus5,'+NeoName+'.Color(constrain(int('+value_r+'*'+f5+'),0,255), constrain(int('+value_g+'*'+f5+'),0,255), constrain(int('+value_b+'*'+f5+'),0,255)));\n';
		      code += '    '+NeoName+'.show();\n';
		      code += '    delay(100);\n';
		      code += '    '+NeoName+'.clear();\n';
		      code += '    lus1 += 1;\n';
		      code += '    lus2 += 1;\n';
		      code += '    lus3 += 1;\n';
		      code += '    lus4 += 1;\n';
		      code += '    lus5 += 1;\n';
		      code += '    if (lus1 >= '+NeoName+'.numPixels()) {\n';
		      code += '      lus1 = 0;\n';
		      code += '    }\n';
		      code += '    if (lus2 >= '+NeoName+'.numPixels()) {\n';
		      code += '      lus2 = 0;\n';
		      code += '    }\n';
		      code += '    if (lus3 >= '+NeoName+'.numPixels()) {\n';
		      code += '      lus3 = 0;\n';
		      code += '    }\n';
		      code += '    if (lus4 >= '+NeoName+'.numPixels()) {\n';
		      code += '      lus4 = 0;\n';
		      code += '    }\n';
		      code += '    if (lus5 >= '+NeoName+'.numPixels()) {\n';
		      code += '      lus5 = 0;\n';
		      code += '    }\n';
		      code += '}\n';
		  }
		  return code;	
	}
	
	/**
	 * Function for writing to a neopixel strip.
	 * @param {!Blockly.Block} block Block to generate the code from.
	 * @return {array} Completed code with order of operation.
	 */
	Blockly.Arduino['neopixel_write_dimmed'] = function(block) {
	  var LEDName = block.getFieldValue('NEONAME');
	  var LEDPixel = Blockly.Arduino.valueToCode(
	      block, 'LEDPIXEL', Blockly.Arduino.ORDER_ATOMIC) || '0';
	  var Red = Blockly.Arduino.valueToCode(
	      block, 'RED', Blockly.Arduino.ORDER_ATOMIC) || '255';
	  var Green = Blockly.Arduino.valueToCode(
	      block, 'GREEN', Blockly.Arduino.ORDER_ATOMIC) || '255';
	  var Blue = Blockly.Arduino.valueToCode(
	      block, 'BLUE', Blockly.Arduino.ORDER_ATOMIC) || '255';
	  var Brightness = Blockly.Arduino.valueToCode(
		      block, 'BRIGHTNESS', Blockly.Arduino.ORDER_ATOMIC) || '100';

	/*  var code = 'myNeo_' + LEDName + '.setPixelColor(' + LEDPixel + '-1, myNeo_' + LEDName + '.Color(' + Red + ',' + Green + ',' + Blue + '));\n';
	  code += 'myNeo_' + LEDName + '.show();\n';
*/
	  var code = 'myNeo_' + LEDName + '.setPixelColor(' + LEDPixel + '-1, myNeo_' + LEDName + '.Color(constrain(int(' + Red   + '*'+Brightness+'/100.0),0,255), ' + 
      'constrain(int(' + Green + '*'+Brightness+'/100.0),0,255), ' + 
      'constrain(int(' + Blue  + '*'+Brightness+'/100.0),0,255) ));\n';
	  code += 'myNeo_' + LEDName + '.show();\n';

	  return code;
	};

	Blockly.Arduino['neopixel_get_numpixels'] = function(block) {
		  var LEDName = block.getFieldValue('NEONAME');
		  var code = 'myNeo_' + LEDName + '.numPixels();\n';
		  return [code, Blockly.Arduino.ORDER_ATOMIC];
	}
