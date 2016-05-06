/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Block for the Microduino functions.
 *     The Arduino built in functions syntax can be found at:
 *     https://arduino.cc/en/Reference/HomePage
 */
'use strict';

goog.provide('Blockly.Blocks.md_actuator');

goog.require('Blockly.Blocks');

/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.md_actuator.HUE = 60;

Blockly.Blocks['mcookie_servo_type'] = {
  /**
   * Block for determining the type of servo attached to the MD block.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('https://wiki.microduino.cc/index.php/Servo');
    this.setColour(Blockly.Blocks.md_actuator.HUE);
    this.appendDummyInput()
        .appendField(
            new Blockly.FieldDropdown([[Blockly.Msg.ARD_MD_NOSERVO, 'NOSERVO'], 
                                       [Blockly.Msg.ARD_MD_180SERVO, '180SERVO'],
                                       [Blockly.Msg.ARD_MD_360SERVO, '360SERVO']
                                      ]),
           'SERVOTYPE');
    this.setOutput(true, 'SERVOTYPE');
    this.setTooltip(Blockly.Msg.ARD_MD_SERVOTYPE_TIP);
  },
  /** @return {!string} The type of return value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.BOOLEAN;
  }
};

Blockly.Blocks['mcookie_servo_setup'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("../media/MD/MDServo.png", 19, 19, "*"))
        .appendField(Blockly.Msg.ARD_MD_SERVOCON);
    this.appendValueInput("SERVOTOPTYPE")
        .setCheck("SERVOTYPE")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.ARD_MD_SERVOCON_TOP)
        .appendField(new Blockly.Blocks.ComponentFieldVariable(
        Blockly.Msg.ARD_MD_SERVOTOP_DEFAULT_NAME, 'Servo'), 'NAMETOPSERVO')
        .appendField(Blockly.Msg.ARD_MD_SERVOCON_TYPE);
    this.appendValueInput("SERVOBOTTOMTYPE")
        .setCheck("SERVOTYPE")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.ARD_MD_SERVOCON_BOTTOM)
        .appendField(new Blockly.Blocks.ComponentFieldVariable(
        Blockly.Msg.ARD_MD_SERVOBOT_DEFAULT_NAME, 'Servo'), 'NAMEBOTTOMSERVO')
        .appendField(Blockly.Msg.ARD_MD_SERVOCON_TYPE);
    this.setInputsInline(false);
    this.setOutput(true, "MD_SERVO");
    this.setColour(Blockly.Blocks.md_actuator.HUE);
    this.setTooltip(Blockly.Msg.ARD_MD_SERVOCON_TIP);
    this.setHelpUrl('https://wiki.microduino.cc/index.php/Servo');
  },
  /**
   * Set the connection pins that the component connects to
   * @param {array} array of the connections (as string, eg '1', 'SDA', 'A1', ...
   * @this Blockly.Block
   */
  setHubConnector: function(connector) {
    this['connector'] = connector;
  },
  /**
   * Return the name of the component defined in this block
   * @return {!<string>} The name of the component
   * @this Blockly.Block
   */
  getComponentName: function() {
    return 'Servo';
  },
  /**
   * Return all variables referenced by this block.
   * @return {!Array.<string>} List of variable names.
   * @this Blockly.Block
   */
  getVars: function() {
    return [this.getFieldValue('NAMETOPSERVO'), this.getFieldValue('NAMEBOTTOMSERVO')];
  },
  /**
   * Notification that a variable is renaming.
   * If the name matches one of this block's variables, rename it.
   * @param {string} oldName Previous name of variable.
   * @param {string} newName Renamed variable.
   * @this Blockly.Block
   */
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('NAMETOPSERVO'))) {
      this.setFieldValue(newName, 'NAMETOPSERVO');
    }
    if (Blockly.Names.equals(oldName, this.getFieldValue('NAMEBOTTOMSERVO'))) {
      this.setFieldValue(newName, 'NAMEBOTTOMSERVO');
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

Blockly.Blocks['mcookie_servo_write'] = {
  /**
   * Block for writing an angle value into a servo PWM pin.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/ServoWrite');
    this.setColour(Blockly.Blocks.md_actuator.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_MD_SERVO_WRITE)
        .appendField(new Blockly.Blocks.ComponentFieldVariable(
        Blockly.Msg.ARD_MD_SERVOTOP_DEFAULT_NAME, 'Servo'), 'SERVO_NAME');
    this.setInputsInline(false);
    this.appendValueInput('SERVO_ANGLE')
        .setCheck(Blockly.Types.NUMBER.checkList)
        .appendField(Blockly.Msg.ARD_SERVO_WRITE_TO);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_SERVO_WRITE_DEG_180);
    this.setInputsInline(true);
    this.setPreviousStatement(true, 'ARD_BLOCK');
    this.setNextStatement(true, 'ARD_BLOCK');
    this.setTooltip(Blockly.Msg.ARD_SERVO_WRITE_TIP);
  },
  /**
   * Return all variables referenced by this block.
   * @return {!Array.<string>} List of variable names.
   * @this Blockly.Block
   */
  getVars: function() {
    return [this.getFieldValue('SERVO_NAME')];
  },
  /**
   * Notification that a variable is renaming.
   * If the name matches one of this block's variables, rename it.
   * @param {string} oldName Previous name of variable.
   * @param {string} newName Renamed variable.
   * @this Blockly.Block
   */
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('SERVO_NAME'))) {
      this.setFieldValue(newName, 'SERVO_NAME');
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
  },
  /**
   * Called whenever anything on the workspace changes.
   * It checks the instances of servos and attaches a warning to this
   * block if not valid data is found.
   * @this Blockly.Block
   */
  onchange: function() {
    if (!this.workspace) { return; }  // Block has been deleted.

    var currentDropdown = this.getFieldValue('SERVO_NAME');
    if (Blockly.Blocks.ComponentFieldVariable.CheckSetupPresent(currentDropdown, 'Servo')) {
      this.setWarningText(null);
    } else {
      // Set a warning to select a valid config
      this.setWarningText(Blockly.Msg.ARD_COMPONENT_WARN1.replace('%1', Blockly.Msg.ARD_SERVO_COMPONENT).replace('%1', Blockly.Msg.ARD_SERVO_COMPONENT));
    }
  }
};

Blockly.Blocks['mcookie_servo_read'] = {
  /**
   * Block for reading an angle value of a servo PWM pin.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/ServoRead');
    this.setColour(Blockly.Blocks.md_actuator.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_MD_SERVO_READ)
        .appendField(new Blockly.Blocks.ComponentFieldVariable(
        Blockly.Msg.ARD_MD_SERVOTOP_DEFAULT_NAME, 'Servo'), 'SERVO_NAME');
    this.setOutput(true, Blockly.Types.NUMBER.output);
    this.setTooltip(Blockly.Msg.ARD_SERVO_READ_TIP);
  },
  /** @return {string} The type of return value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  },
  /**
   * Return all variables referenced by this block.
   * @return {!Array.<string>} List of variable names.
   * @this Blockly.Block
   */
  getVars: function() {
    return [this.getFieldValue('SERVO_NAME')];
  },
  /**
   * Notification that a variable is renaming.
   * If the name matches one of this block's variables, rename it.
   * @param {string} oldName Previous name of variable.
   * @param {string} newName Renamed variable.
   * @this Blockly.Block
   */
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('SERVO_NAME'))) {
      this.setFieldValue(newName, 'SERVO_NAME');
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
  },
  /**
   * Called whenever anything on the workspace changes.
   * It checks the instances of servos and attaches a warning to this
   * block if not valid data is found.
   * @this Blockly.Block
   */
  onchange: function() {
    if (!this.workspace) { return; }  // Block has been deleted.

    var currentDropdown = this.getFieldValue('SERVO_NAME');
    if (Blockly.Blocks.ComponentFieldVariable.CheckSetupPresent(currentDropdown, 'Servo')) {
      this.setWarningText(null);
    } else {
      // Set a warning to select a valid config
      this.setWarningText(Blockly.Msg.ARD_COMPONENT_WARN1.replace('%1', Blockly.Msg.ARD_SERVO_COMPONENT).replace('%1', Blockly.Msg.ARD_SERVO_COMPONENT));
    }
  }
};


Blockly.Blocks['mcookie_servo_write2'] = {
  /**
   * Block for writing an angle value into a servo PWM pin.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/ServoWrite');
    this.setColour(Blockly.Blocks.md_actuator.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_SERVO_ROTATE360)
        .appendField(new Blockly.Blocks.ComponentFieldVariable(
        Blockly.Msg.ARD_MD_SERVOTOP_DEFAULT_NAME, 'Servo'), 'SERVO_NAME');
    this.appendValueInput('SERVO_SPEED')
        .setCheck(Blockly.Types.NUMBER.checkList)
        .appendField(Blockly.Msg.ARD_SERVO_ROTATESPEED);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_SERVO_ROTATEPERC);
    this.setInputsInline(true);
    this.setPreviousStatement(true, 'ARD_BLOCK');
    this.setNextStatement(true, 'ARD_BLOCK');
    this.setTooltip(Blockly.Msg.ARD_SERVO_ROTATE_TIP);
  },
  /**
   * Return all variables referenced by this block.
   * @return {!Array.<string>} List of variable names.
   * @this Blockly.Block
   */
  getVars: function() {
    return [this.getFieldValue('SERVO_NAME')];
  },
  /**
   * Notification that a variable is renaming.
   * If the name matches one of this block's variables, rename it.
   * @param {string} oldName Previous name of variable.
   * @param {string} newName Renamed variable.
   * @this Blockly.Block
   */
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('SERVO_NAME'))) {
      this.setFieldValue(newName, 'SERVO_NAME');
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
  },
  /**
   * Called whenever anything on the workspace changes.
   * It checks the instances of servos and attaches a warning to this
   * block if not valid data is found.
   * @this Blockly.Block
   */
  onchange: function() {
    if (!this.workspace) { return; }  // Block has been deleted.

    var currentDropdown = this.getFieldValue('SERVO_NAME');
    if (Blockly.Blocks.ComponentFieldVariable.CheckSetupPresent(currentDropdown, 'Servo')) {
      this.setWarningText(null);
    } else {
      // Set a warning to select a valid config
      this.setWarningText(Blockly.Msg.ARD_COMPONENT_WARN1.replace('%1', Blockly.Msg.ARD_SERVO_COMPONENT).replace('%1', Blockly.Msg.ARD_SERVO_COMPONENT));
    }
  }
};