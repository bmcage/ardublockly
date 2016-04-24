/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Generating Arduino code for the logic blocks.
 */
'use strict';

goog.provide('Blockly.Arduino.logic');

goog.require('Blockly.Arduino');


/**
 * Code generator to create if/if else/else statement.
 * Arduino code: loop { if (X)/else if ()/else { X } }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['controls_if'] = function(block) {
  var n = 0;
  var argument = Blockly.Arduino.valueToCode(block, 'IF' + n,
      Blockly.Arduino.ORDER_NONE) || 'false';
  var branch = Blockly.Arduino.statementToCode(block, 'DO' + n);
  var code = 'if (' + argument + ') {\n' + branch + '}';
  for (n = 1; n <= block.elseifCount_; n++) {
    argument = Blockly.Arduino.valueToCode(block, 'IF' + n,
        Blockly.Arduino.ORDER_NONE) || 'false';
    branch = Blockly.Arduino.statementToCode(block, 'DO' + n);
    code += ' else if (' + argument + ') {\n' + branch + '}';
  }
  if (block.elseCount_) {
    branch = Blockly.Arduino.statementToCode(block, 'ELSE');
    code += ' else {\n' + branch + '}';
  }
  return code + '\n';
};

/**
 * Code generator for the comparison operator block.
 * Arduino code: loop { X operator Y }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['logic_compare'] = function(block) {
  var OPERATORS = {
    'EQ': '==',
    'NEQ': '!=',
    'LT': '<',
    'LTE': '<=',
    'GT': '>',
    'GTE': '>='
  };
  var operator = OPERATORS[block.getFieldValue('OP')];
  var order = (operator == '==' || operator == '!=') ?
      Blockly.Arduino.ORDER_EQUALITY : Blockly.Arduino.ORDER_RELATIONAL;
  var argument0 = Blockly.Arduino.valueToCode(block, 'A', order) || '0';
  var argument1 = Blockly.Arduino.valueToCode(block, 'B', order) || '0';
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

/**
 * Code generator for the logic operator block.
 * Arduino code: loop { X operator Y }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['logic_operation'] = function(block) {
  var operator = (block.getFieldValue('OP') == 'AND') ? '&&' : '||';
  var order = (operator == '&&') ? Blockly.Arduino.ORDER_LOGICAL_AND :
      Blockly.Arduino.ORDER_LOGICAL_OR;
  var argument0 = Blockly.Arduino.valueToCode(block, 'A', order) || 'false';
  var argument1 = Blockly.Arduino.valueToCode(block, 'B', order) || 'false';
  if (!argument0 && !argument1) {
    // If there are no arguments, then the return value is false.
    argument0 = 'false';
    argument1 = 'false';
  } else {
    // Single missing arguments have no effect on the return value.
    var defaultArgument = (operator == '&&') ? 'true' : 'false';
    if (!argument0) {
      argument0 = defaultArgument;
    }
    if (!argument1) {
      argument1 = defaultArgument;
    }
  }
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

/**
 * Code generator for the logic negate operator.
 * Arduino code: loop { !X }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['logic_negate'] = function(block) {
  var order = Blockly.Arduino.ORDER_UNARY_PREFIX;
  var argument0 = Blockly.Arduino.valueToCode(block, 'BOOL', order) || 'false';
  var code = '!' + argument0;
  return [code, order];
};

/**
 * Code generator for the boolean values true and false.
 * Arduino code: loop { true/false }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['logic_boolean'] = function(block) {
  var code = (block.getFieldValue('BOOL') == 'TRUE') ? 'true' : 'false';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

/**
 * Code generator for the null value.
 * Arduino code: loop { X ? Y : Z }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['logic_null'] = function(block) {
  var code = 'NULL';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

/**
 * Code generator for the ternary operator.
 * Arduino code: loop { NULL }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 *
 * TODO: Check types of THEN and ELSE blocks and add warning to this block if
 *       they are different from each other.
 */
Blockly.Arduino['logic_ternary'] = function(block) {
  var valueIf = Blockly.Arduino.valueToCode(block, 'IF',
      Blockly.Arduino.ORDER_CONDITIONAL) || 'false';
  var valueThen = Blockly.Arduino.valueToCode(block, 'THEN',
      Blockly.Arduino.ORDER_CONDITIONAL) || 'null';
  var valueElse = Blockly.Arduino.valueToCode(block, 'ELSE',
      Blockly.Arduino.ORDER_CONDITIONAL) || 'null';
  var code = valueIf + ' ? ' + valueThen + ' : ' + valueElse;
  return [code, Blockly.Arduino.ORDER_CONDITIONAL];
};


/**
 * Code generator to create effect statement.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['controls_effect'] = function(block) {
  
  var duration = Blockly.Arduino.valueToCode(
      block, 'EFFECTDURATION', Blockly.Arduino.ORDER_ATOMIC) || '1000';
  var effectnr = 0;
  while (Blockly.Arduino.hasDeclaration('ard_effect' + effectnr.toString())) {
    effectnr += 1;
  }
  var seffectnr = effectnr.toString();
  
  var code = 'ard_effect' + seffectnr + '();';
  
  var declare_effect_branch = '' +
'int ard_effect' + seffectnr + '_status = -1;\n' +
'unsigned long ard_effect' + seffectnr + '_start, ard_effect' + seffectnr + '_time;\n' +
'#define EFFECT' + seffectnr + '_PERIOD ' + duration + '\n';
  var declare_effect_function = '\n' + 
'void ard_effect' + seffectnr + '() {\n' +
'  ard_effect' + seffectnr + '_time = millis() - ard_effect' + seffectnr + '_start;\n';

  declare_effect_function +=
'  if (ard_effect' + seffectnr + '_time > EFFECT' + seffectnr + '_PERIOD) {\n' +
'    //end effect, make sure it restarts\n' +
'    ard_effect' + seffectnr + '_status = -1;\n';
  
  if (block.elseCount_) {
    branch = Blockly.Arduino.statementToCode(block, 'ELSE');
    declare_effect_function += '' +
'    //END STATEMENTS\n' +
'    ' + branch;
  }
  declare_effect_function +=  '  }\n' + 
'  if (ard_effect' + seffectnr + '_status == -1) {\n' +
'    ard_effect' + seffectnr + '_status = 0;\n' +
'    ard_effect' + seffectnr + '_start = ard_effect' + seffectnr + '_start + ard_effect' + seffectnr + '_time;\n' +
'    ard_effect' + seffectnr + '_time = 0;\n';


  var setupCode = 'ard_effect' + seffectnr + '_status = -1;\n' +
                '  ard_effect' + seffectnr + '_start = millis();\n'
  Blockly.Arduino.addSetup('ard_effect' + seffectnr, setupCode, false);
    
  var n = 0;
  var branch = Blockly.Arduino.statementToCode(block, 'DO' + n);
  declare_effect_function += branch + '  }\n';
  var extra = '  '
  for (n = 1; n <= block.elseifCount_; n++) {
    duration = Blockly.Arduino.valueToCode(block, 'IF' + n,
        Blockly.Arduino.ORDER_NONE) || duration;
    branch = Blockly.Arduino.statementToCode(block, 'DO' + n);
    declare_effect_branch += '#define EFFECT' + seffectnr + '_' + n + '_DURATION ' + duration + '\n';
    if (n != 1) {
      extra = '  } else ';
    }
    declare_effect_function += extra + 
'if (ard_effect' + seffectnr + '_time > EFFECT' + seffectnr + '_' + n + '_DURATION && ard_effect' + seffectnr + '_status < ' + n + ') {\n' +
'   ard_effect' + seffectnr + '_status = ' + n + ';\n' + branch;
  }
  
  //end reached of effect statements, finish up
  if (n != 1) {
    declare_effect_function += '  }\n'
  }
  declare_effect_function += '}\n';

  Blockly.Arduino.addDeclaration('ard_effect' + seffectnr, declare_effect_branch + declare_effect_function);
    
  return code + '\n';
};
