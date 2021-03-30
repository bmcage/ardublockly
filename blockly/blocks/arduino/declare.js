/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Fred Lin.
 * https://github.com/gasolin/BlocklyDuino
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Helper functions for generating Arduino blocks.
 * @author gasolin@gmail.com (Fred Lin)
 */
'use strict';

//To support syntax defined in http://arduino.cc/en/Reference/HomePage

goog.provide('Blockly.Blocks.declare');

goog.require('Blockly.Blocks');


Blockly.Blocks['declare_var_bool'] = {
  helpUrl: 'https://www.arduino.cc/en/Reference/Boolean',
  init: function() {
    this.setColour(Blockly.Msg["VARIABLES_HUE"]);
    this.appendValueInput("NUM")
        .appendField(Blockly.Msg.ARD_DEFINE)
        .appendField(new Blockly.FieldVariable("item"), "NAME")
        .appendField(Blockly.Msg.ARD_AS_BOOL_NUMBER)
        .setCheck(Blockly.Types.BOOLEAN.check);
    this.setInputsInline(false);
    this.setPreviousStatement(true, 'ARD_BLOCK');
    this.setNextStatement(true, 'ARD_BLOCK');
    this.setTooltip(Blockly.Msg.ARD_AS_BOOL_NUMBER_TIP);
  },
  /**
   * Return all variables referenced by this block.
   * @return {!Array.<string>} List of variable names.
   * @this Blockly.Block
   */
  getVars: function() {
    return [this.getFieldValue('NAME')];
  },
  /**
   * Notification that a variable is renaming.
   * If the name matches one of this block's variables, rename it.
   * @param {string} oldName Previous name of variable.
   * @param {string} newName Renamed variable.
   * @this Blockly.Block
   */
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('NAME'))) {
      this.setFieldValue(newName, 'NAME');
    }
  },
  /**
   * Gets the variable type selected in the drop down, always an integer.
   * @param {!string} varName Name of the variable selected in this block to
   *     check.
   * @return {string} String to indicate the variable type.
   */
  getVarType: function(varName) {
    return Blockly.Types.BOOLEAN;
  }
};

Blockly.Blocks['declare_var_int'] = {
  helpUrl: 'https://www.arduino.cc/en/Reference/Int',
  init: function() {
    this.setColour(Blockly.Msg["VARIABLES_HUE"]);
    this.appendValueInput("NUM")
        .appendField(Blockly.Msg.ARD_DEFINE)
        .appendField(new Blockly.FieldVariable("item"), "NAME")
        .appendField(Blockly.Msg.ARD_AS_INTEGER_NUMBER)
        .setCheck(Blockly.Types.NUMBER.getcheckList());
    this.setInputsInline(false);
    this.setPreviousStatement(true, 'ARD_BLOCK');
    this.setNextStatement(true, 'ARD_BLOCK');
    this.setTooltip(Blockly.Msg.ARD_AS_INTEGER_NUMBER_TIP);
  },
  /**
   * Return all variables referenced by this block.
   * @return {!Array.<string>} List of variable names.
   * @this Blockly.Block
   */
  getVars: function() {
    return [this.getFieldValue('NAME')];
  },
  /**
   * Notification that a variable is renaming.
   * If the name matches one of this block's variables, rename it.
   * @param {string} oldName Previous name of variable.
   * @param {string} newName Renamed variable.
   * @this Blockly.Block
   */
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('NAME'))) {
      this.setFieldValue(newName, 'NAME');
    }
  },
  /**
   * Gets the variable type selected in the drop down, always an integer.
   * @param {!string} varName Name of the variable selected in this block to
   *     check.
   * @return {string} String to indicate the variable type.
   */
  getVarType: function(varName) {
    return Blockly.Types.NUMBER;
  }
};

Blockly.Blocks['declare_var_float'] = {
  helpUrl: 'https://www.arduino.cc/en/Reference/Float',
  init: function() {
    this.setColour(Blockly.Msg["VARIABLES_HUE"]);
    this.appendValueInput("NUM")
        .appendField(Blockly.Msg.ARD_DEFINE)
        .appendField(new Blockly.FieldVariable("item"), "NAME")
        .appendField(Blockly.Msg.ARD_AS_FLOAT_NUMBER)
        .setCheck(Blockly.Types.NUMBER.getcheckList());
    this.setInputsInline(false);
    this.setPreviousStatement(true, 'ARD_BLOCK');
    this.setNextStatement(true, 'ARD_BLOCK');
    this.setTooltip(Blockly.Msg.ARD_AS_FLOAT_NUMBER_TIP);
  },
  /**
   * Return all variables referenced by this block.
   * @return {!Array.<string>} List of variable names.
   * @this Blockly.Block
   */
  getVars: function() {
    return [this.getFieldValue('NAME')];
  },
  /**
   * Notification that a variable is renaming.
   * If the name matches one of this block's variables, rename it.
   * @param {string} oldName Previous name of variable.
   * @param {string} newName Renamed variable.
   * @this Blockly.Block
   */
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('NAME'))) {
      this.setFieldValue(newName, 'NAME');
    }
  },
  /**
   * Gets the variable type selected in the drop down, always an integer.
   * @param {!string} varName Name of the variable selected in this block to
   *     check.
   * @return {string} String to indicate the variable type.
   */
  getVarType: function(varName) {
    return Blockly.Types.DECIMAL;
  }
};

Blockly.Blocks['declare_var_long'] = {
  helpUrl: 'https://www.arduino.cc/en/Reference/Long',
  init: function() {
    this.setColour(Blockly.Msg["VARIABLES_HUE"]);
    this.appendValueInput("NUM")
        .appendField(Blockly.Msg.ARD_DEFINE)
        .appendField(new Blockly.FieldVariable("item"), "NAME")
        .appendField(Blockly.Msg.ARD_AS_LONG_NUMBER)
        .setCheck(Blockly.Types.NUMBER.getcheckList());
    this.setInputsInline(false);
    this.setPreviousStatement(true, 'ARD_BLOCK');
    this.setNextStatement(true, 'ARD_BLOCK');
    this.setTooltip(Blockly.Msg.ARD_AS_LONG_NUMBER_TIP);
  },
  /**
   * Return all variables referenced by this block.
   * @return {!Array.<string>} List of variable names.
   * @this Blockly.Block
   */
  getVars: function() {
    return [this.getFieldValue('NAME')];
  },
  /**
   * Notification that a variable is renaming.
   * If the name matches one of this block's variables, rename it.
   * @param {string} oldName Previous name of variable.
   * @param {string} newName Renamed variable.
   * @this Blockly.Block
   */
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('NAME'))) {
      this.setFieldValue(newName, 'NAME');
    }
  },
  /**
   * Gets the variable type selected in the drop down, always an integer.
   * @param {!string} varName Name of the variable selected in this block to
   *     check.
   * @return {string} String to indicate the variable type.
   */
  getVarType: function(varName) {
    return Blockly.Types.NUMBER;
  }
};

Blockly.Blocks['declare_var_uint'] = {
  helpUrl: 'https://www.arduino.cc/en/Reference/UnsignedInt',
  init: function() {
    this.setColour(Blockly.Msg["VARIABLES_HUE"]);
    this.appendValueInput("NUM")
        .appendField(Blockly.Msg.ARD_DEFINE)
        .appendField(new Blockly.FieldVariable("item"), "NAME")
        .appendField(Blockly.Msg.ARD_AS_UINT_NUMBER)
        .setCheck(Blockly.Types.NUMBER.getcheckList());
    this.setInputsInline(false);
    this.setPreviousStatement(true, 'ARD_BLOCK');
    this.setNextStatement(true, 'ARD_BLOCK');
    this.setTooltip(Blockly.Msg.ARD_AS_UINT_NUMBER_TIP);
  },
  /**
   * Return all variables referenced by this block.
   * @return {!Array.<string>} List of variable names.
   * @this Blockly.Block
   */
  getVars: function() {
    return [this.getFieldValue('NAME')];
  },
  /**
   * Notification that a variable is renaming.
   * If the name matches one of this block's variables, rename it.
   * @param {string} oldName Previous name of variable.
   * @param {string} newName Renamed variable.
   * @this Blockly.Block
   */
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('NAME'))) {
      this.setFieldValue(newName, 'NAME');
    }
  },
  /**
   * Gets the variable type selected in the drop down, always an integer.
   * @param {!string} varName Name of the variable selected in this block to
   *     check.
   * @return {string} String to indicate the variable type.
   */
  getVarType: function(varName) {
    return Blockly.Types.NUMBER;
  }
};

Blockly.Blocks['declare_var_ulong'] = {
  helpUrl: 'https://www.arduino.cc/en/Reference/UnsignedLong',
  init: function() {
    this.setColour(Blockly.Msg["VARIABLES_HUE"]);
    this.appendValueInput("NUM")
        .appendField(Blockly.Msg.ARD_DEFINE)
        .appendField(new Blockly.FieldVariable("item"), "NAME")
        .appendField(Blockly.Msg.ARD_AS_ULONG_NUMBER)
        .setCheck(Blockly.Types.NUMBER.getcheckList());
    this.setInputsInline(false);
    this.setPreviousStatement(true, 'ARD_BLOCK');
    this.setNextStatement(true, 'ARD_BLOCK');
    this.setTooltip(Blockly.Msg.ARD_AS_ULONG_NUMBER_TIP);
  },
  /**
   * Return all variables referenced by this block.
   * @return {!Array.<string>} List of variable names.
   * @this Blockly.Block
   */
  getVars: function() {
    return [this.getFieldValue('NAME')];
  },
  /**
   * Notification that a variable is renaming.
   * If the name matches one of this block's variables, rename it.
   * @param {string} oldName Previous name of variable.
   * @param {string} newName Renamed variable.
   * @this Blockly.Block
   */
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('NAME'))) {
      this.setFieldValue(newName, 'NAME');
    }
  },
  /**
   * Gets the variable type selected in the drop down, always an integer.
   * @param {!string} varName Name of the variable selected in this block to
   *     check.
   * @return {string} String to indicate the variable type.
   */
  getVarType: function(varName) {
    return Blockly.Types.NUMBER;
  }
};

Blockly.Blocks['declare_var_digin'] = {
  helpUrl: 'http://arduino.cc/en/Reference/DigitalRead',
  init: function() {
    this.setColour(Blockly.Blocks.io.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_DEFINE)
        .appendField(new Blockly.FieldVariable("item"), "NAME")
        .appendField(Blockly.Msg.ARD_AS_DIGINPUT_PIN)
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.digitalPins), 'PIN')
    this.setInputsInline(false);
    this.setPreviousStatement(true, 'ARD_BLOCK');
    this.setNextStatement(true, 'ARD_BLOCK');
    this.setTooltip(Blockly.Msg.ARD_AS_DIGINPUT_PIN_TIP);
  },
  /**
   * Return all variables referenced by this block.
   * @return {!Array.<string>} List of variable names.
   * @this Blockly.Block
   */
  getVars: function() {
    return [this.getFieldValue('NAME')];
  },
  /**
   * Notification that a variable is renaming.
   * If the name matches one of this block's variables, rename it.
   * @param {string} oldName Previous name of variable.
   * @param {string} newName Renamed variable.
   * @this Blockly.Block
   */
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('NAME'))) {
      this.setFieldValue(newName, 'NAME');
    }
  },
  /**
   * Gets the variable type selected in the drop down, always an integer.
   * @param {!string} varName Name of the variable selected in this block to
   *     check.
   * @return {string} String to indicate the variable type.
   */
  getVarType: function(varName) {
    return Blockly.Types.NUMBER;
  }
};

Blockly.Blocks['declare_var_digout'] = {
  helpUrl: 'http://arduino.cc/en/Reference/DigitalWrite',
  init: function() {
    this.setColour(Blockly.Blocks.io.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_DEFINE)
        .appendField(new Blockly.FieldVariable("item"), "NAME")
        .appendField(Blockly.Msg.ARD_AS_DIGOUTPUT_PIN)
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.digitalPins), 'PIN')
    this.setInputsInline(false);
    this.setPreviousStatement(true, 'ARD_BLOCK');
    this.setNextStatement(true, 'ARD_BLOCK');
    this.setTooltip(Blockly.Msg.ARD_AS_DIGOUTPUT_PIN_TIP);
  },
  /**
   * Return all variables referenced by this block.
   * @return {!Array.<string>} List of variable names.
   * @this Blockly.Block
   */
  getVars: function() {
    return [this.getFieldValue('NAME')];
  },
  /**
   * Notification that a variable is renaming.
   * If the name matches one of this block's variables, rename it.
   * @param {string} oldName Previous name of variable.
   * @param {string} newName Renamed variable.
   * @this Blockly.Block
   */
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('NAME'))) {
      this.setFieldValue(newName, 'NAME');
    }
  },
  /**
   * Gets the variable type selected in the drop down, always an integer.
   * @param {!string} varName Name of the variable selected in this block to
   *     check.
   * @return {string} String to indicate the variable type.
   */
  getVarType: function(varName) {
    return Blockly.Types.NUMBER;
  }
};

Blockly.Blocks['declare_var_anain'] = {
  helpUrl: 'http://arduino.cc/en/Reference/AnalogRead',
  init: function() {
    this.setColour(Blockly.Blocks.io.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_DEFINE)
        .appendField(new Blockly.FieldVariable("item"), "NAME")
        .appendField(Blockly.Msg.ARD_AS_ANAINPUT_PIN)
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.analogPins), 'PIN')
    this.setInputsInline(false);
    this.setPreviousStatement(true, 'ARD_BLOCK');
    this.setNextStatement(true, 'ARD_BLOCK');
    this.setTooltip(Blockly.Msg.ARD_AS_ANAINPUT_PIN_TIP);
  },
  /**
   * Return all variables referenced by this block.
   * @return {!Array.<string>} List of variable names.
   * @this Blockly.Block
   */
  getVars: function() {
    return [this.getFieldValue('NAME')];
  },
  /**
   * Notification that a variable is renaming.
   * If the name matches one of this block's variables, rename it.
   * @param {string} oldName Previous name of variable.
   * @param {string} newName Renamed variable.
   * @this Blockly.Block
   */
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('NAME'))) {
      this.setFieldValue(newName, 'NAME');
    }
  },
  /**
   * Gets the variable type selected in the drop down, always an integer.
   * @param {!string} varName Name of the variable selected in this block to
   *     check.
   * @return {string} String to indicate the variable type.
   */
  getVarType: function(varName) {
    return Blockly.Types.NUMBER;
  }
};

Blockly.Blocks['declare_var_anaout'] = {
  helpUrl: 'http://arduino.cc/en/Reference/AnalogWrite',
  init: function() {
    this.setColour(Blockly.Blocks.io.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_DEFINE)
        .appendField(new Blockly.FieldVariable("item"), "NAME")
        .appendField(Blockly.Msg.ARD_AS_ANAOUTPUT_PIN)
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.pwmPins), 'PIN')
    this.setInputsInline(false);
    this.setPreviousStatement(true, 'ARD_BLOCK');
    this.setNextStatement(true, 'ARD_BLOCK');
    this.setTooltip(Blockly.Msg.ARD_AS_ANAOUTPUT_PIN_TIP);
  },
  /**
   * Return all variables referenced by this block.
   * @return {!Array.<string>} List of variable names.
   * @this Blockly.Block
   */
  getVars: function() {
    return [this.getFieldValue('NAME')];
  },
  /**
   * Notification that a variable is renaming.
   * If the name matches one of this block's variables, rename it.
   * @param {string} oldName Previous name of variable.
   * @param {string} newName Renamed variable.
   * @this Blockly.Block
   */
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('NAME'))) {
      this.setFieldValue(newName, 'NAME');
    }
  },
  /**
   * Gets the variable type selected in the drop down, always an integer.
   * @param {!string} varName Name of the variable selected in this block to
   *     check.
   * @return {string} String to indicate the variable type.
   */
  getVarType: function(varName) {
    return Blockly.Types.NUMBER;
  }
};
