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
  var btnName = block.getFieldValue('BUTTONNAME');
  var stateOutput = block.getFieldValue('STATE');
  
  //the hub saved the connector in the attached block
  var hubconnector = block['connector'] || ['0', '1']
  //compute the pins, normally only possible to attach at valid pins
  var pintop = hubconnector[0];
  
  Blockly.Arduino.reservePin(
      block, pintop, Blockly.Arduino.PinTypes.INPUT, 'Digital Read');

  //btnName is a variable containing the used pins
  Blockly.Arduino.addVariable(btnName,
      'int ' + btnName + ' = ' + pintop + ';', true);
  
  Blockly.Arduino.addDeclaration(btnName, 'boolean ' + btnName + '_PRESSED = ' + stateOutput + ';\n');
  var pinSetupCode = 'pinMode(' + btnName + ', INPUT);';
  Blockly.Arduino.addSetup('io_' + pintop, pinSetupCode, false);

  return '';
};

/**
 * The microduino crashbutton setup block
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['mcookie_crashbutton_setup'] = function(block) {
  var btnName = block.getFieldValue('BUTTONNAME');
  //microduino crash button is HIGH when pressed
  var stateOutput = 'LOW';
  
  //the hub saved the connector in the attached block
  var hubconnector = block['connector'] || ['0', '1']
  //compute the pins, normally only possible to attach at valid pins
  var pintop = hubconnector[0];

  Blockly.Arduino.reservePin(
      block, pintop, Blockly.Arduino.PinTypes.INPUT, 'Digital Read');

  //btnName is a variable containing the used pins
  Blockly.Arduino.addVariable(btnName,
      'int ' + btnName + ' = ' + pintop + ';', true);

  Blockly.Arduino.addDeclaration(btnName, 'boolean ' + btnName + '_PRESSED = ' + stateOutput + ';\n');
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
  
  var code = 'digitalRead(' + btnName + ')';
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
    var whilecode_start = '    while (' + btnName + 'PressType == ' + btnName + 'NOPRESS) { \n';
    var whilecode_end = '    }\n';
  } else {
    var whilecode_start = '';
    var whilecode_end = '';
  }

  var decl_code = '' +
'long ' + btnName + 'buttonTimer = 0;\n' +
'#define ' + btnName + 'minShortPressTime 80\n' +
'#define ' + btnName + 'longPressTime 750\n' +
'boolean ' + btnName + 'buttonActive = false;\n' +
'boolean ' + btnName + 'longPressActive = false;\n' +
'#define ' + btnName + 'NOPRESS    0\n' +
'#define ' + btnName + 'SHORTPRESS 1\n' +
'#define ' + btnName + 'LONGPRESS  2\n' +
'int ' + btnName + 'PressType = ' + btnName + 'NOPRESS;';

  Blockly.Arduino.addDeclaration('btn_' + btnName + '_button_input', decl_code);
  
  //now a function to handle the button
  
  var decl_code_fun = '\nvoid handle' + btnName + 'Press() {\n' +
'  ' + btnName + 'PressType = ' + btnName + 'NOPRESS;\n' + 
    whilecode_start +
'      if (digitalRead(' + btnName + ') == ' + btnName + '_PRESSED) {\n'+
'        if (' + btnName + 'buttonActive == false) {\n'+
'          ' + btnName + 'buttonActive = true;\n'+
'          ' + btnName + 'buttonTimer = millis();\n'+
'        }\n'+
'        if ((millis() - ' + btnName + 'buttonTimer > ' + btnName + 'longPressTime) && (' + btnName + 'longPressActive == false)) {\n'+
'          ' + btnName + 'longPressActive = true;\n'+
'          ' + btnName + 'PressType = ' + btnName + 'LONGPRESS;\n'+
'        }\n'+
'      } else {\n'+
'        if (' + btnName + 'buttonActive == true) {\n'+
'          if (' + btnName + 'longPressActive == true) {\n'+
'            ' + btnName + 'longPressActive = false;\n'+
'          } else {\n'+
'            //avoid fast fluctuations to be identified as a click\n' +
'            if (millis() - ' + btnName + 'buttonTimer > ' + btnName + 'minShortPressTime)\n' +
'              ' + btnName + 'PressType = ' + btnName + 'SHORTPRESS;\n' +
'          }\n'+
'          ' + btnName + 'buttonActive = false;\n'+
'        }\n'+
'      }\n' + whilecode_end +
'}\n'
    Blockly.Arduino.userFunctions_['btn_' + btnName + '_handlefun'] = decl_code_fun;
  
  //we now have code to poll the status of the button
  //Execute the code block for the status found
  var code = 'handle' + btnName + 'Press();\n' + 
'\n' +
'if (' + btnName + 'PressType == ' + btnName + 'SHORTPRESS) {\n' +
'  //START STATEMENTS SHORT PRESS \n' +
    MDClickBranch +
'  //END  STATEMENTS SHORT PRESS \n' +
'} else if (' + btnName + 'PressType == ' + btnName + 'LONGPRESS) {\n' +
'  //START STATEMENTS LONG PRESS \n' +
    MDLongPressBranch +
'  //END  STATEMENTS LONG PRESS \n' +
'} else if (!' + btnName + 'longPressActive && digitalRead(' + btnName + ') == ' + btnName + '_PRESSED) {\n' +
'  //START STATEMENTS PRESS \n' +
    MDPressBranch +
'  //END  STATEMENTS PRESS \n' +
'}\n \n';
  
  return code;
};


