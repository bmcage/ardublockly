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

goog.provide('Blockly.Blocks.md_light');

goog.require('Blockly.Blocks');


/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.md_light.HUE = 512;


/** Attach a LED block to the hub*/
Blockly.Blocks['mcookie_led_setup'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("../media/MD/MDLed.png", 19, 19, "*"))
        .appendField(Blockly.Msg.ARD_LEDLEG)
        .appendField(new Blockly.Blocks.ComponentFieldVariable(
        Blockly.Msg.ARD_LEDLEG_DEFAULT_NAME, 'LedLeg'), 'LEDNAME');
    this.setOutput(true, 'MD_HUB_DIGOUT');
    this.setColour(Blockly.Blocks.md_light.HUE);
    this.setTooltip(Blockly.Msg.ARD_LEDLEG_TIP);
    this.setHelpUrl('https://wiki.microduino.cc/index.php/Microduino_Sensor_Series');
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
    return 'LedLeg';
  },
  /**
   * Return all variables referenced by this block.
   * @return {!Array.<string>} List of variable names.
   * @this Blockly.Block
   */
  getVars: function() {
    return [this.getFieldValue('LEDNAME')];
  },
  /**
   * Notification that a variable is renaming.
   * If the name matches one of this block's variables, rename it.
   * @param {string} oldName Previous name of variable.
   * @param {string} newName Renamed variable.
   * @this Blockly.Block
   */
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('LEDNAME'))) {
      this.setFieldValue(newName, 'LEDNAME');
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

/** Attach a LED block to the hub*/
Blockly.Blocks['mcookie_neopixel_setup'] = {
  init: function() {
    this.appendValueInput('NUMBER')
        .appendField(new Blockly.FieldImage("../media/MD/MDLed.png", 19, 19, "*"))
        .appendField(Blockly.Msg.ARD_NEOPIXEL)
        .appendField(new Blockly.Blocks.ComponentFieldVariable(
        Blockly.Msg.ARD_NEOPIXEL_DEFAULT_NAME, 'LedStrip'), 'LEDNAME')
        .appendField(Blockly.Msg.ARD_NEOPIXEL_STRIP);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_NEOPIXEL_PIXELS);
    this.setOutput(true, 'MD_HUB_DIGOUT');
    this.setColour(Blockly.Blocks.md_light.HUE);
    this.setTooltip(Blockly.Msg.ARD_NEOPIXEL_TIP);
    this.setHelpUrl('https://wiki.microduino.cc/index.php/Microduino_Sensor_Series');
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
    return 'LedStrip';
  },
  /**
   * Return all variables referenced by this block.
   * @return {!Array.<string>} List of variable names.
   * @this Blockly.Block
   */
  getVars: function() {
    return [this.getFieldValue('LEDNAME')];
  },
  /**
   * Notification that a variable is renaming.
   * If the name matches one of this block's variables, rename it.
   * @param {string} oldName Previous name of variable.
   * @param {string} newName Renamed variable.
   * @this Blockly.Block
   */
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('LEDNAME'))) {
      this.setFieldValue(newName, 'LEDNAME');
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


Blockly.Blocks['mcookie_led_digitalwrite'] = {
  /**
   * Block for creating a 'set pin' to a state.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/DigitalWrite');
    this.setColour(Blockly.Blocks.md_light.HUE);
    this.appendValueInput('STATE')
        .appendField(Blockly.Msg.ARD_LEDLEG_SET)
        .appendField(new Blockly.Blocks.ComponentFieldVariable(
        Blockly.Msg.ARD_LEDLEG_DEFAULT_NAME, 'LedLeg'), 'LEDNAME')
        .setCheck(Blockly.Types.BOOLEAN.checkList);
    this.setInputsInline(false);
    this.setPreviousStatement(true, 'ARD_BLOCK');
    this.setNextStatement(true, 'ARD_BLOCK');
    this.setTooltip(Blockly.Msg.ARD_DIGITALWRITE_TIP);
  },
  /**
   * Return all variables referenced by this block.
   * @return {!Array.<string>} List of variable names.
   * @this Blockly.Block
   */
  getVars: function() {
    return [this.getFieldValue('LEDNAME')];
  },
  /**
   * Notification that a variable is renaming.
   * If the name matches one of this block's variables, rename it.
   * @param {string} oldName Previous name of variable.
   * @param {string} newName Renamed variable.
   * @this Blockly.Block
   */
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('LEDNAME'))) {
      this.setFieldValue(newName, 'LEDNAME');
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
   * It checks the instances of stepper_config and attaches a warning to this
   * block if not valid data is found.
   * @this Blockly.Block
   */
  onchange: function() {
    if (!this.workspace) { return; }  // Block has been deleted.

    var currentDropdown = this.getFieldValue('LEDNAME');
    if (Blockly.Blocks.ComponentFieldVariable.CheckSetupPresent(currentDropdown, 'LedLeg')) {
      this.setWarningText(null);
    } else {
      // Set a warning to select a valid stepper config
      this.setWarningText(Blockly.Msg.ARD_COMPONENT_WARN1.replace('%1', Blockly.Msg.ARD_LEDLEG_COMPONENT).replace('%1', Blockly.Msg.ARD_LEDLEG_COMPONENT));
    }
  }
};

/**
 * The neopixel set block with dropdown of color to show
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Blocks['mcookie_neopixel_colourpick_write'] = {
  init: function() {
    this.setColour(Blockly.Blocks.md_light.HUE);
    this.appendDummyInput("")
        .appendField(Blockly.Msg.ARD_NEOPIXEL_SET)
        .appendField(new Blockly.Blocks.ComponentFieldVariable(
        Blockly.Msg.ARD_NEOPIXEL_DEFAULT_NAME, 'LedStrip'), 'NEONAME')
        .appendField(Blockly.Msg.ARD_NEOPIXEL_PIXEL)
    
    this.appendValueInput("LEDPIXEL")
        .setCheck(Blockly.Types.NUMBER.checkList)
        .setAlign(Blockly.ALIGN_RIGHT)
    
    var colour = new Blockly.FieldColour('#ff0000');
    colour.setColours(['rgb(255,0,0)', 'rgb(0,255,0)', 'rgb(0,0,255)', 'rgb(255,255,0)', 'rgb(255,0,179)', 'rgb(255,102,0)', 'rgb(210,0,255)', 'rgb(255,255,255)', 'rgb(0,0,0)']).setColumns(3);
    
    this.appendDummyInput("")
        .appendField(Blockly.Msg.ARD_NEOPIXEL_ONCOLOUR)
        .appendField(colour, 'COLOUR');

    this.setInputsInline(true);
    this.setPreviousStatement(true, 'ARD_BLOCK');
    this.setNextStatement(true, 'ARD_BLOCK');
    this.setTooltip(Blockly.Msg.ARD_DIGITALWRITE_TIP);
    this.setHelpUrl('http://arduino.cc/en/Reference/DigitalWrite');
    },
  /**
   * Return all variables referenced by this block.
   * @return {!Array.<string>} List of variable names.
   * @this Blockly.Block
   */
  getVars: function() {
    return [this.getFieldValue('NEONAME')];
  },
  /**
   * Notification that a variable is renaming.
   * If the name matches one of this block's variables, rename it.
   * @param {string} oldName Previous name of variable.
   * @param {string} newName Renamed variable.
   * @this Blockly.Block
   */
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('NEONAME'))) {
      this.setFieldValue(newName, 'NEONAME');
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
   * It checks the instances of stepper_config and attaches a warning to this
   * block if not valid data is found.
   * @this Blockly.Block
   */
  onchange: function() {
    if (!this.workspace) { return; }  // Block has been deleted.

    var currentDropdown = this.getFieldValue('NEONAME');
    if (Blockly.Blocks.ComponentFieldVariable.CheckSetupPresent(currentDropdown, 'LedStrip')) {
      this.setWarningText(null);
    } else {
      // Set a warning to select a valid stepper config
      this.setWarningText(Blockly.Msg.ARD_COMPONENT_WARN1.replace('%1', Blockly.Msg.ARD_NEOPIXEL_COMPONENT).replace('%1', Blockly.Msg.ARD_NEOPIXEL_COMPONENT));
    }
  }
};

/**
 * The neopixel set block with dropdown of color to show and dim value
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Blocks['mcookie_neopixel_colourpick_dim_write'] = {
  init: function() {
    this.setColour(Blockly.Blocks.md_light.HUE);
    this.appendDummyInput("")
        .appendField(Blockly.Msg.ARD_NEOPIXEL_SET)
        .appendField(new Blockly.Blocks.ComponentFieldVariable(
        Blockly.Msg.ARD_NEOPIXEL_DEFAULT_NAME, 'LedStrip'), 'NEONAME')
        .appendField(Blockly.Msg.ARD_NEOPIXEL_PIXEL)
    
    this.appendValueInput("LEDPIXEL")
        .setCheck(Blockly.Types.NUMBER.checkList)
        .setAlign(Blockly.ALIGN_RIGHT)
    
    var colour = new Blockly.FieldColour('#ff0000');
    colour.setColours(['rgb(255,0,0)', 'rgb(0,255,0)', 'rgb(0,0,255)', 'rgb(255,255,0)', 'rgb(255,0,179)', 'rgb(255,102,0)', 'rgb(210,0,255)', 'rgb(255,255,255)', 'rgb(0,0,0)']).setColumns(3);
    
    this.appendDummyInput("")
        .appendField(Blockly.Msg.ARD_NEOPIXEL_ONCOLOUR)
        .appendField(colour, 'COLOUR');
    this.appendValueInput("BRIGHTNESS")
        .setCheck(Blockly.Types.NUMBER.checkList)
        .appendField(Blockly.Msg.ARD_NEOPIXEL_BRIGHTNESS)

    this.setInputsInline(true);
    this.setPreviousStatement(true, 'ARD_BLOCK');
    this.setNextStatement(true, 'ARD_BLOCK');
    this.setTooltip(Blockly.Msg.ARD_DIGITALWRITE_TIP);
    this.setHelpUrl('http://arduino.cc/en/Reference/DigitalWrite');
    },
  /**
   * Return all variables referenced by this block.
   * @return {!Array.<string>} List of variable names.
   * @this Blockly.Block
   */
  getVars: function() {
    return [this.getFieldValue('NEONAME')];
  },
  /**
   * Notification that a variable is renaming.
   * If the name matches one of this block's variables, rename it.
   * @param {string} oldName Previous name of variable.
   * @param {string} newName Renamed variable.
   * @this Blockly.Block
   */
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('NEONAME'))) {
      this.setFieldValue(newName, 'NEONAME');
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
   * It checks the instances of stepper_config and attaches a warning to this
   * block if not valid data is found.
   * @this Blockly.Block
   */
  onchange: function() {
    if (!this.workspace) { return; }  // Block has been deleted.

    var currentDropdown = this.getFieldValue('NEONAME');
    if (Blockly.Blocks.ComponentFieldVariable.CheckSetupPresent(currentDropdown, 'LedStrip')) {
      this.setWarningText(null);
    } else {
      // Set a warning to select a valid stepper config
      this.setWarningText(Blockly.Msg.ARD_COMPONENT_WARN1.replace('%1', Blockly.Msg.ARD_NEOPIXEL_COMPONENT).replace('%1', Blockly.Msg.ARD_NEOPIXEL_COMPONENT));
    }
  }
};

/**
 * The neopixel set block with full control
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Blocks['mcookie_neopixel_write'] = {
  init: function() {
    this.setColour(Blockly.Blocks.md_light.HUE);
    this.appendDummyInput("")
        .appendField(Blockly.Msg.ARD_NEOPIXEL_SET)
        .appendField(new Blockly.Blocks.ComponentFieldVariable(
        Blockly.Msg.ARD_NEOPIXEL_DEFAULT_NAME, 'LedStrip'), 'NEONAME')
        .appendField('pixel')
    this.appendValueInput("LEDPIXEL")
        .setCheck(Blockly.Types.NUMBER.checkList)
        .setAlign(Blockly.ALIGN_RIGHT)
    this.appendValueInput("RED")
        .setCheck(Blockly.Types.NUMBER.checkList)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.ARD_NEOPIXEL_ONCOLOURVALRED);
    this.appendValueInput("GREEN")
        .setCheck(Blockly.Types.NUMBER.checkList)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.ARD_NEOPIXEL_ONCOLOURVALGREEN);
    this.appendValueInput("BLUE")
        .setCheck(Blockly.Types.NUMBER.checkList)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.ARD_NEOPIXEL_ONCOLOURVALBLUE);

    this.setInputsInline(true);
    this.setPreviousStatement(true, 'ARD_BLOCK');
    this.setNextStatement(true, 'ARD_BLOCK');
    this.setTooltip(Blockly.Msg.ARD_DIGITALWRITE_TIP);
    this.setHelpUrl('http://arduino.cc/en/Reference/DigitalWrite');
    },
  /**
   * Return all variables referenced by this block.
   * @return {!Array.<string>} List of variable names.
   * @this Blockly.Block
   */
  getVars: function() {
    return [this.getFieldValue('NEONAME')];
  },
  /**
   * Notification that a variable is renaming.
   * If the name matches one of this block's variables, rename it.
   * @param {string} oldName Previous name of variable.
   * @param {string} newName Renamed variable.
   * @this Blockly.Block
   */
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('NEONAME'))) {
      this.setFieldValue(newName, 'NEONAME');
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
   * It checks the instances of stepper_config and attaches a warning to this
   * block if not valid data is found.
   * @this Blockly.Block
   */
  onchange: function() {
    if (!this.workspace) { return; }  // Block has been deleted.

    var currentDropdown = this.getFieldValue('NEONAME');
    if (Blockly.Blocks.ComponentFieldVariable.CheckSetupPresent(currentDropdown, 'LedStrip')) {
      this.setWarningText(null);
    } else {
      // Set a warning to select a valid stepper config
      this.setWarningText(Blockly.Msg.ARD_COMPONENT_WARN1.replace('%1', Blockly.Msg.ARD_NEOPIXEL_COMPONENT).replace('%1', Blockly.Msg.ARD_NEOPIXEL_COMPONENT));
    }
  }
};
