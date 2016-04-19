/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Generating Microduino code for procedure (function) blocks.
 *
 */
'use strict';

goog.provide('Blockly.Arduino.md_control');

goog.require('Blockly.Arduino');

/**
 * The button setup block
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['mcookie_button_setup'] = function(block) {
  var btnNames = block.getbtnSetupInstance();
  
  //the hub saved the connector in the attached block
  var hubconnector = block['connector']
  //compute the pins, normally only possible to attach at valid pins
  var pintop = (parseInt(hubconnector,10) -3) *2;
  var pinbottom = pintop + 1;
  // the analog pins can be configured as digital input:
  if (hubconnector == '10') {
    pintop = 'A6'; pinbottom = 'A7';
  } else if (hubconnector == '11') {
    pintop = 'A2'; pinbottom = 'A3';
  } else if (hubconnector == '12') {
    pintop = 'A0'; pinbottom = 'A1';
  }
  
  Blockly.Arduino.reservePin(
      block, pintop, Blockly.Arduino.PinTypes.INPUT, 'Digital Read');

  var btnName = 'myBtn_' + btnNames[0];
  Blockly.Arduino.addDeclaration('btn_' + btnName, 'int ' + btnName + ' = ' + pintop +';');
  var pinSetupCode = 'pinMode(' + btnName + ', INPUT);';
  Blockly.Arduino.addSetup('io_' + pintop, pinSetupCode, false);

  return '';
};

/**
 * Function for reading a button.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['mcookie_button_digitalread'] = function(block) {
  var btnName = block.getFieldValue('BUTTONNAME');
  
  var code = 'digitalRead(myBtn_' + btnName + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

/**
 * Function for waiting on an input of a button.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['mcookie_button_input'] = function(block) {
  var MDClickBranch = Blockly.Arduino.statementToCode(block, 'CLICKINPUT');
  var MDLongPressBranch = Blockly.Arduino.statementToCode(block, 'LONGPRESSINPUT');
  var MDPressBranch = Blockly.Arduino.statementToCode(block, 'PRESSINPUT');

  var btnName = block.getFieldValue('BUTTONNAME');
  var checkbox_name = (block.getFieldValue('WAIT_INPUT') == 'TRUE');
  
  if (checkbox_name) {
    var whilecode_start = '    while (myBtn_' + btnName + 'PressType == myBtn_' + btnName + 'NOPRESS) { \n';
    var whilecode_end = '    }\n';
  } else {
    var whilecode_start = '';
    var whilecode_end = '';
  }

  var decl_code = '' +
'long myBtn_' + btnName + 'buttonTimer = 0;\n' +
'long myBtn_' + btnName + 'longPressTime = 250;\n' +
'boolean myBtn_' + btnName + 'buttonActive = false;\n' +
'boolean myBtn_' + btnName + 'longPressActive = false;\n' +
'#define myBtn_' + btnName + 'NOPRESS    0\n' +
'#define myBtn_' + btnName + 'SHORTPRESS 1\n' +
'#define myBtn_' + btnName + 'LONGPRESS  2\n' +
'int myBtn_' + btnName + 'PressType = myBtn_' + btnName + 'NOPRESS;';

  Blockly.Arduino.addDeclaration('btn_' + btnName + '_button_input', decl_code);
  
  var code = whilecode_start +
'	if (digitalRead(myBtn_' + btnName + ') == HIGH) {\n'+
'		if (myBtn_' + btnName + 'buttonActive == false) {\n'+
'			myBtn_' + btnName + 'buttonActive = true;\n'+
'			myBtn_' + btnName + 'buttonTimer = millis();\n'+
'		}\n'+
'		if ((millis() - myBtn_' + btnName + 'buttonTimer > myBtn_' + btnName + 'longPressTime) && (myBtn_' + btnName + 'longPressActive == false)) {\n'+
'			myBtn_' + btnName + 'longPressActive = true;\n'+
'			myBtn_' + btnName + 'PressType = myBtn_' + btnName + 'LONGPRESS;\n'+
'		}\n'+
'	} else {\n'+
'		if (myBtn_' + btnName + 'buttonActive == true) {\n'+
'			if (myBtn_' + btnName + 'longPressActive == true) {\n'+
'				myBtn_' + btnName + 'longPressActive = false;\n'+
'			} else {\n'+
'			myBtn_' + btnName + 'PressType = myBtn_' + btnName + 'SHORTPRESS;\n'+
'			}\n'+
'			myBtn_' + btnName + 'buttonActive = false;\n'+
'		}\n'+
'	}\n' + whilecode_end +
  //we now have code to poll the status of the button
  //Execute the code block for the status found
'\n' +
'  if (myBtn_' + btnName + 'PressType == myBtn_' + btnName + 'SHORTPRESS) {\n' +
'  //START STATEMENTS SHORT PRESS \n' +
    MDClickBranch +
'  //END  STATEMENTS SHORT PRESS \n' +
'    myBtn_' + btnName + 'PressType = myBtn_' + btnName + 'NOPRESS;\n' +
'  } else if (myBtn_' + btnName + 'PressType == myBtn_' + btnName + 'LONGPRESS) {\n' +
'  //START STATEMENTS LONG PRESS \n' +
    MDLongPressBranch +
'  //END  STATEMENTS LONG PRESS \n' +
'    myBtn_' + btnName + 'PressType = myBtn_' + btnName + 'NOPRESS;\n' +
'  } else if (digitalRead(myBtn_' + btnName + ') == HIGH) {\n' +
'  //START STATEMENTS PRESS \n' +
    MDPressBranch +
'  //END  STATEMENTS PRESS \n' +
'  }';
  
  return code;
};


