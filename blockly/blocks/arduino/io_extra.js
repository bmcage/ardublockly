/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Blocks for Arduino Digital and Analogue input and output
 *     functions. The Arduino function syntax can be found at
 *     http://arduino.cc/en/Reference/HomePage
 *
 * TODO: maybe change this to a "PIN" BlocklyType
 */
'use strict';

goog.provide('Blockly.Blocks.io_extra');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

Blockly.Blocks['io_pin_dig'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_PIN_DIG)
        .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), "PIN");
    this.setOutput(true);
    this.setColour(Blockly.Blocks.io.HUE);
    this.setTooltip(Blockly.Msg.ARD_PIN_DIG_TIP);
    this.setHelpUrl('https://www.arduino.cc/en/Reference/Board');
  },
  /** @return {!string} The type of return value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  },
  /**
   * Updates the content of the the pin related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'PIN', 'digitalPins');
  }
};

Blockly.Blocks['io_pin_an'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_PIN_AN)
        .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.analogPins), "PIN");
    this.setOutput(true);
    this.setColour(Blockly.Blocks.io.HUE);
    this.setTooltip(Blockly.Msg.ARD_PIN_AN_TIP);
    this.setHelpUrl('https://www.arduino.cc/en/Reference/Board');
  },
  /** @return {!string} The type of return value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  },
  /**
   * Updates the content of the the pin related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'PIN', 'analogPins');
  }
};

Blockly.Blocks['io_pin_pwm'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_PIN_PWM)
        .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.pwmPins), "PIN");
    this.setOutput(true);
    this.setColour(Blockly.Blocks.io.HUE);
    this.setTooltip(Blockly.Msg.ARD_PIN_PWM_TIP);
    this.setHelpUrl('https://www.arduino.cc/en/Reference/Board');
  },
  /** @return {!string} The type of return value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  },
  /**
   * Updates the content of the the pin related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'PIN', 'pwmPins');
  }
};

Blockly.Blocks['io_digitalwrite_var'] = {
  /**
   * Block for creating a 'set pin' to a state.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/DigitalWrite');
    this.setColour(Blockly.Blocks.io.HUE);
    this.appendValueInput('STATE')
        .appendField(Blockly.Msg.ARD_DIGITALWRITE)
        .appendField(new Blockly.FieldVariable("item"), "PIN")
        .appendField(Blockly.Msg.ARD_WRITE_TO)
        .setCheck(Blockly.Types.BOOLEAN.check);
    this.setInputsInline(false);
    this.setPreviousStatement(true, 'ARD_BLOCK');
    this.setNextStatement(true, 'ARD_BLOCK');
    this.setTooltip(Blockly.Msg.ARD_DIGITALWRITEVAR_TIP);
  },
  /**
   * Return all variables referenced by this block.
   * @return {!Array.<string>} List of variable names.
   * @this Blockly.Block
   */
  getVars: function() {
    return [this.getFieldValue('PIN')];
  },
  /**
   * Notification that a variable is renaming.
   * If the name matches one of this block's variables, rename it.
   * @param {string} oldName Previous name of variable.
   * @param {string} newName Renamed variable.
   * @this Blockly.Block
   */
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('PIN'))) {
      this.setFieldValue(newName, 'PIN');
    }
  },
  /**
   * Gets the variable type required.
   * @param {!string} varName Name of the variable selected in this block to
   *     check.
   * @return {string} String to indicate the variable type.
   */
  getVarType: function(varName) {
    return Blockly.Types.NUMBER;
  }
};

Blockly.Blocks['io_digitalread_var'] = {
  /**
   * Block for creating a 'read pin'.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/DigitalRead');
    this.setColour(Blockly.Blocks.io.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_DIGITALREAD)
        .appendField(new Blockly.FieldVariable("item"), "PIN");
    this.setOutput(true, Blockly.Types.BOOLEAN.getoutput());
    this.setTooltip(Blockly.Msg.ARD_DIGITALREAD_TIP);
  },
  /** @return {!string} The type of return value for the block, a bool. */
  getBlockType: function() {
    return Blockly.Types.BOOLEAN;
  },
  /**
   * Return all variables referenced by this block.
   * @return {!Array.<string>} List of variable names.
   * @this Blockly.Block
   */
  getVars: function() {
    return [this.getFieldValue('PIN')];
  },
  /**
   * Notification that a variable is renaming.
   * If the name matches one of this block's variables, rename it.
   * @param {string} oldName Previous name of variable.
   * @param {string} newName Renamed variable.
   * @this Blockly.Block
   */
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('PIN'))) {
      this.setFieldValue(newName, 'PIN');
    }
  },
  /**
   * Gets the variable type required.
   * @param {!string} varName Name of the variable selected in this block to
   *     check.
   * @return {string} String to indicate the variable type.
   */
  getVarType: function(varName) {
    return Blockly.Types.NUMBER;
  }
};

Blockly.Blocks['io_analogwrite_var'] = {
  /**
   * Block for creating a 'set pin' to an analogue value.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/AnalogWrite');
    this.setColour(Blockly.Blocks.io.HUE);
    this.appendValueInput('NUM')
        .appendField(Blockly.Msg.ARD_ANALOGWRITE)
        .appendField(new Blockly.FieldVariable("item"), "PIN")
        .appendField(Blockly.Msg.ARD_WRITE_TO)
        .setCheck(Blockly.Types.NUMBER.getoutput());
    this.setInputsInline(false);
    this.setPreviousStatement(true, 'ARD_BLOCK');
    this.setNextStatement(true, 'ARD_BLOCK');
    this.setTooltip(Blockly.Msg.ARD_ANALOGWRITE_TIP);
  },
  /** @return {!string} The type of input value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  },
  /**
   * Return all variables referenced by this block.
   * @return {!Array.<string>} List of variable names.
   * @this Blockly.Block
   */
  getVars: function() {
    return [this.getFieldValue('PIN')];
  },
  /**
   * Notification that a variable is renaming.
   * If the name matches one of this block's variables, rename it.
   * @param {string} oldName Previous name of variable.
   * @param {string} newName Renamed variable.
   * @this Blockly.Block
   */
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('PIN'))) {
      this.setFieldValue(newName, 'PIN');
    }
  },
  /**
   * Gets the variable type required.
   * @param {!string} varName Name of the variable selected in this block to
   *     check.
   * @return {string} String to indicate the variable type.
   */
  getVarType: function(varName) {
    return Blockly.Types.NUMBER;
  }
};

Blockly.Blocks['io_analogread_var'] = {
  /**
   * Block for reading an analogue input.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/AnalogRead');
    this.setColour(Blockly.Blocks.io.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_ANALOGREAD)
        .appendField(new Blockly.FieldVariable("item"), "PIN");
    this.setOutput(true, Blockly.Types.NUMBER.getoutput());
    this.setTooltip(Blockly.Msg.ARD_ANALOGREAD_TIP);
  },
  /** @return {!string} The type of return value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  },
  /**
   * Return all variables referenced by this block.
   * @return {!Array.<string>} List of variable names.
   * @this Blockly.Block
   */
  getVars: function() {
    return [this.getFieldValue('PIN')];
  },
  /**
   * Notification that a variable is renaming.
   * If the name matches one of this block's variables, rename it.
   * @param {string} oldName Previous name of variable.
   * @param {string} newName Renamed variable.
   * @this Blockly.Block
   */
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('PIN'))) {
      this.setFieldValue(newName, 'PIN');
    }
  },
  /**
   * Gets the variable type required.
   * @param {!string} varName Name of the variable selected in this block to
   *     check.
   * @return {string} String to indicate the variable type.
   */
  getVarType: function(varName) {
    return Blockly.Types.NUMBER;
  }
};

Blockly.Blocks['io_pulsein_var'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_PULSEREAD);
    this.appendValueInput("PULSETYPE")
        .setCheck(Blockly.Types.BOOLEAN.check);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_PULSEON)
        .appendField(new Blockly.FieldVariable("item"), "PULSEPIN");
    this.setOutput(true);
    this.setInputsInline(true);
    this.setColour(Blockly.Blocks.io.HUE);
    this.setTooltip(Blockly.Msg.ARD_PULSE_TIP);
    this.setHelpUrl('https://www.arduino.cc/en/Reference/PulseIn');
  },
      /** @return {!string} The type of input value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  },
  /**
   * Return all variables referenced by this block.
   * @return {!Array.<string>} List of variable names.
   * @this Blockly.Block
   */
  getVars: function() {
    return [this.getFieldValue('PULSEPIN')];
  },
  /**
   * Notification that a variable is renaming.
   * If the name matches one of this block's variables, rename it.
   * @param {string} oldName Previous name of variable.
   * @param {string} newName Renamed variable.
   * @this Blockly.Block
   */
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('PULSEPIN'))) {
      this.setFieldValue(newName, 'PULSEPIN');
    }
  },
  /**
   * Gets the variable type required.
   * @param {!string} varName Name of the variable selected in this block to
   *     check.
   * @return {string} String to indicate the variable type.
   */
  getVarType: function(varName) {
    return Blockly.Types.NUMBER;
  }
};

Blockly.Blocks['io_pulsetimeout_var'] = {
  init: function () {
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_PULSEREAD);
    this.appendValueInput("PULSETYPE")
        .setCheck(Blockly.Types.BOOLEAN.check);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_PULSEON)
        .appendField(new Blockly.FieldVariable("item"), "PULSEPIN");
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_PULSETIMEOUT);
    this.appendValueInput('TIMEOUT')
        .setCheck(Blockly.Types.NUMBER.getoutput());
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_PULSETIMEOUT_MS);
    this.setOutput(true);
    this.setInputsInline(true);
    this.setColour(Blockly.Blocks.io.HUE);
    this.setTooltip(Blockly.Msg.ARD_PULSETIMEOUT_TIP);
    this.setHelpUrl('https://www.arduino.cc/en/Reference/PulseIn');
  },
        /** @return {!string} The type of input value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  },
  /**
   * Return all variables referenced by this block.
   * @return {!Array.<string>} List of variable names.
   * @this Blockly.Block
   */
  getVars: function() {
    return [this.getFieldValue('PULSEPIN')];
  },
  /**
   * Notification that a variable is renaming.
   * If the name matches one of this block's variables, rename it.
   * @param {string} oldName Previous name of variable.
   * @param {string} newName Renamed variable.
   * @this Blockly.Block
   */
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('PULSEPIN'))) {
      this.setFieldValue(newName, 'PULSEPIN');
    }
  },
  /**
   * Gets the variable type required.
   * @param {!string} varName Name of the variable selected in this block to
   *     check.
   * @return {string} String to indicate the variable type.
   */
  getVarType: function(varName) {
    return Blockly.Types.NUMBER;
  }
};
