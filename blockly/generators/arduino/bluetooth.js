/**
 * @fileoverview Arduino code generator for bluetooth HC06 component
 *
 */
'use strict';

goog.provide('Blockly.Arduino.bluetooth');

goog.require('Blockly.Arduino');



/**
 * The BTReceiver setup block
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['BT_config_hub'] = function(block) {
  var bt = block.getFieldValue('NAMEBT');
  
  //the hub saved the connector in the attached block
  var hubconnector = block['connector'] || ['0', '1']
  //compute the pins, normally only possible to attach at valid pins
  var pin1 = hubconnector[0];
  var pin2 = hubconnector[1];
  var btName = 'myBT' + bt;
  //bt is a variable containing the used pins
  Blockly.Arduino.addVariable(bt,
	      'int ' + bt + '[2] = {' + pin1 + ', ' + pin2 + '};', true);
   
  Blockly.Arduino.addInclude('bt', '#include <SoftwareSerial.h> ');
  Blockly.Arduino.addDeclaration('bt_' + btName, 'SoftwareSerial ' + btName + '(' + 
                                 pin1 + ',' + pin2 + ');');
  Blockly.Arduino.reservePin(block, pin1, Blockly.Arduino.PinTypes.INPUT, 'BT Read');
  Blockly.Arduino.reservePin(block, pin2, Blockly.Arduino.PinTypes.INPUT, 'BT Read');

  var setupCode = btName + '.begin(9600);';
  Blockly.Arduino.addSetup('bt_' + btName, setupCode, true);

  return '';
};

/**
 * Code generator to read the HEX value of a BlueTooth receiver.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['BT_readCodeFromApp'] = function(block) {
  var btInstanceName = block.getFieldValue('BT_NAME');
  var btName = 'myBT' + btInstanceName;
  var btNameCode = btName + 'Code';

  var readBTcode = 'String BTNAME_readCodeFromApp() {\n';
  readBTcode += '  //Serial.println("myBTBT_Sensor_readT()");\n';
  readBTcode += '  if (BTNAME.available() >0) {\n';
  readBTcode += '    String BT_receive_data = BTNAME.readStringUntil('|');\n';
  readBTcode += '    BTNAME.flush();\n';
  readBTcode += '    //Serial.print(" --> ");\n';
  readBTcode += '    //Serial.println(BT_receive_data);\n';
  readBTcode += '    if(BT_receive_data.length()<13) {\n';
  readBTcode += '      return BT_receive_data;\n';
  readBTcode += '    } else {\n';
  readBTcode += '      //Serial.println("te lang");\n';
  readBTcode += '      return "";\n';
  readBTcode += '    }\n';
  readBTcode += '  } else {\n';
  readBTcode += '    //Serial.println("not available");\n';
  readBTcode += '    return "";\n';
  readBTcode += '  }\n';
  readBTcode += '}\n';
  
  Blockly.Arduino.addFunction(btNameCode, readBTcode
//        .replace(new RegExp('IRNAMECODE', 'g'), irNameCode)
        .replace(new RegExp('BTNAME', 'g'), btName)
                             );

  var code = btName + '_readCodeFromApp()'
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

/**
 * Code generator to test if a string (X) represents a colour code from the app.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['text_isColour'] = function(block) {
  var func = [];
  func.push('boolean ' + Blockly.Arduino.DEF_FUNC_NAME + '(String msg) {');
  func.push('  return msg.startsWith("C");');
  func.push('}');
  var funcName = Blockly.Arduino.addFunction('isStringColour', func.join('\n'));
  var argument0 = Blockly.Arduino.valueToCode(block, 'VALUE',
      Blockly.Arduino.ORDER_UNARY_POSTFIX);
  if (argument0 == '') {
    argument0 = '""';
  } else {
    argument0 = 'String(' + argument0 + ')';
  }
  var code = funcName + '(' + argument0 + ')';
  return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
};

/**
 * Code generator to test if a string (X) represents the brightness level from the app.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['text_isBrightness'] = function(block) {
  var func = [];
  func.push('boolean ' + Blockly.Arduino.DEF_FUNC_NAME + '(String msg) {');
  func.push('  return msg.startsWith("H");');
  func.push('}');
  var funcName = Blockly.Arduino.addFunction('isBrightness', func.join('\n'));
  var argument0 = Blockly.Arduino.valueToCode(block, 'VALUE',
      Blockly.Arduino.ORDER_UNARY_POSTFIX);
  if (argument0 == '') {
    argument0 = '""';
  } else {
    argument0 = 'String(' + argument0 + ')';
  }
  var code = funcName + '(' + argument0 + ')';
  return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
};

/**
 * Generator for extracting the R , G or B value of a color given in the format xxx.xxx.xxx
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['colour_RGB_extractor'] = function(block) {
  var string_to_check = Blockly.Arduino.valueToCode(block, 'COLOUR_TO_CHECK',
      Blockly.Arduino.ORDER_MULTIPLICATIVE) || '0';
  var dropdown_property = block.getFieldValue('PROPERTY');
  var code;
  var retCode;
  var func = [
    	'int ' + Blockly.Arduino.DEF_FUNC_NAME + '(String data, char separator, int index ) {',
    	//'String getValue(String data, char separator, int index)',
    		'	int found = 0;',
    		'	String colour = "";',
    		'	data = data.substring(1);  // get rid of the leading \'C\'',
    		'	int strIndex[] = { 0, -1 };',
    		'	int maxIndex = data.length() - 1;',
    	
    		'	for (int i = 0; i <= maxIndex && found <= index; i++){',
    		'		if (data.charAt(i) == separator || i == maxIndex){',
    		'			found++;',
    		'			strIndex[0] = strIndex[1] + 1;',
    		'			strIndex[1] = (i == maxIndex) ? i + 1 : i;',
    		'		}',
    		'	}',
    		'	colour =  found > index ? data.substring(strIndex[0], strIndex[1]) : "";',
    		'	return colour.toInt();',
    	'}',
       	]
    var funcName = Blockly.Arduino.addFunction('getValue', func.join('\n'));
  
  switch (dropdown_property) {
    case 'ROOD':
        code = funcName + '(' + string_to_check + ','+'\'.\''+','+'0'    +')';
        //return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
        break;
    case 'GROEN':
        code = funcName + '(' + string_to_check + ','+'\'.\''+','+'1'    +')';
       // return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
        break;
    case 'BLAUW':
        code = funcName + '(' + string_to_check + ','+'\'.\''+','+'2'    +')';
       // return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
        break;
    case 'HELDERHEID':
        code = string_to_check +'.substring(1).toInt()';
       // return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
        break;

  }
  return [code, Blockly.Arduino.ORDER_EQUALITY];
};

/**
 * Generator for extracting the choosen effect
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['effect_extractor'] = function(block) {
  var string_to_check = Blockly.Arduino.valueToCode(block, 'EFFECT_TO_CHECK',
      Blockly.Arduino.ORDER_MULTIPLICATIVE) || '0';
  var dropdown_property = block.getFieldValue('PROPERTY');
  var code;
  code = string_to_check +'.equals("'+dropdown_property+'")';
  return [code, Blockly.Arduino.ORDER_EQUALITY];
};

/**
 * Generator for checking if the BT receiver has received something
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['BT_isAvailable'] = function(block) {
  var btInstanceName = block.getFieldValue('BT_NAME');
  var btName = 'myBT' + btInstanceName;
  var code;
  code = btName+ '.available() > 0';
  return [code, Blockly.Arduino.ORDER_EQUALITY];
};
