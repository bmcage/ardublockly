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
    this.setOutput(true, "MD_HUB_PWM");
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
