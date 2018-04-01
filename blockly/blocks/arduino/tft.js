/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Blocks for TFT Screen.
 */


'use strict';

goog.provide('Blockly.Blocks.tft');

goog.require('Blockly.Blocks');

/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.tft.HUE = 350;


Blockly.Blocks['tft_config'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_TFT_COMPONENT)
        .appendField(
            new Blockly.FieldInstance('tft', 'TFT1', true, true, false), 'TFTNAME')                      
    this.setColour(350);
    this.setPreviousStatement(false, "MD_BLOCK");
    this.setNextStatement(false, "MD_BLOCK");
    this.setTooltip(Blockly.Msg.ARD_7SEGMENT_COMPONENT_TIP);
    this.setHelpUrl("https://docs.google.com/document/d/1rd5WztljQ4R-4YQH1UzbRDuTeg8SeEte_eZYg9qlx8Y/edit?usp=sharing");
  }
,
  /**
   * Gets the variable type required.
   * @param {!string} varName Name of the variable selected in this block to
   *     check.
   * @return {string} String to indicate the variable type.
   */
  getVarType: function(varName) {
    return Blockly.Types.STRING;
  },
  /**
  * Called whenever anything on the workspace changes.
  * It checks/warns if the selected stepper instance has a config block.
  * @this Blockly.Block
  */
  onchange: function(event) {
      if (!this.workspace || event.type == Blockly.Events.MOVE ||
          event.type == Blockly.Events.UI) {
          return;  // Block deleted or irrelevant event
      }
  },
};

Blockly.Blocks['tft_text'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_TFT_COMPONENT)
        .appendField(
            new Blockly.FieldInstance('tft', 'TFT1', true, true, false), 'TFTNAME') ;
    this.appendValueInput("TFT_TEXT")
        .appendField("Schrijf tekst")
        .setCheck(Blockly.Types.TEXT.output)
        .setAlign(Blockly.ALIGN_RIGHT);
    //var colour = new Blockly.FieldColour('#ff0000');
    //colour.setColours(['rgb(255,0,0)', 'rgb(0,255,0)', 'rgb(0,0,255)', 'rgb(255,255,0)', 'rgb(255,0,179)', 'rgb(255,102,0)', 'rgb(210,0,255)', 'rgb(255,255,255)', 'rgb(0,0,0)']).setColumns(3);
    this.appendValueInput('TFT_COL')
        .appendField("Kleur van de tekst")
        .setCheck("Colour")
        .setAlign(Blockly.ALIGN_RIGHT);
    this.appendDummyInput()
        .appendField("Grootte")
        .appendField(
            new Blockly.FieldDropdown([['1', '1'], ['2', '2'], ['3', '3']]),
           'TFT_SIZE')
        .setAlign(Blockly.ALIGN_RIGHT);
    this.appendValueInput('TFT_X')
        .appendField("X positie")
        .setCheck(Blockly.Types.NUMBER.checkList)
        .setAlign(Blockly.ALIGN_RIGHT);
    this.appendValueInput('TFT_Y')
        .appendField("Y positie")
        .setCheck(Blockly.Types.NUMBER.checkList)
        .setAlign(Blockly.ALIGN_RIGHT);
    this.setInputsInline(false);
    this.setPreviousStatement(true, 'ARD_BLOCK');
    this.setNextStatement(true, 'ARD_BLOCK');
    this.setColour(350);
    this.setTooltip("Write a text to the screen in the given colour at the given position. ");
    this.setHelpUrl("https://docs.google.com/document/d/1rd5WztljQ4R-4YQH1UzbRDuTeg8SeEte_eZYg9qlx8Y/edit?usp=sharing");
  },
    /**
    * Called whenever anything on the workspace changes.
    * It checks/warns if the selected stepper instance has a config block.
    * @this Blockly.Block
    */
    onchange: function(event) {
        if (!this.workspace || event.type == Blockly.Events.MOVE ||
            event.type == Blockly.Events.UI) {
            return;  // Block deleted or irrelevant event
        }

        var instanceName = this.getFieldValue('TFTNAME')
        if (Blockly.Instances.isInstancePresent(instanceName, 'tft', this)) {
          this.setWarningText(null);
        } else {
          // Set a warning to select a valid tft config block
          this.setWarningText(
            Blockly.Msg.ARD_COMPONENT_WARN1.replace(
                '%1', Blockly.Msg.ARD_TFT_COMPONENT).replace(
                    '%2', instanceName).replace(
                    '%1', instanceName));
        }
    },
    /**
    * Gets the variable type required.
    * @param {!string} varName Name of the variable selected in this block to
    *     check.
    * @return {string} String to indicate the variable type.
    */
    getVarType: function(varName) {
        return Blockly.Types.STRING;
    }
};

Blockly.Blocks['tft_backgroundcolor'] = {
  init: function() {        
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_TFT_COMPONENT)
        .appendField(
            new Blockly.FieldInstance('tft', 'TFT1', true, true, false), 'TFTNAME') ;
    this.appendValueInput('TFT_COL')
        .appendField("Kleur van de achtergrond")
        .setCheck("Colour")
        .setAlign(Blockly.ALIGN_RIGHT);
    this.setPreviousStatement(true, 'ARD_BLOCK');
    this.setNextStatement(true, 'ARD_BLOCK');
    this.setColour(350);
   this.setTooltip("Fill the entire screen with the given colour");
   this.setHelpUrl("https://docs.google.com/document/d/1rd5WztljQ4R-4YQH1UzbRDuTeg8SeEte_eZYg9qlx8Y/edit?usp=sharing");
  },
    /**
    * Called whenever anything on the workspace changes.
    * It checks/warns if the selected stepper instance has a config block.
    * @this Blockly.Block
    */
    onchange: function(event) {
        if (!this.workspace || event.type == Blockly.Events.MOVE ||
            event.type == Blockly.Events.UI) {
            return;  // Block deleted or irrelevant event
        }

        var instanceName = this.getFieldValue('TFTNAME')
        if (Blockly.Instances.isInstancePresent(instanceName, 'tft', this)) {
          this.setWarningText(null);
        } else {
          // Set a warning to select a valid tft config block
          this.setWarningText(
            Blockly.Msg.ARD_COMPONENT_WARN1.replace(
                '%1', Blockly.Msg.ARD_TFT_COMPONENT).replace(
                    '%2', instanceName).replace(
                    '%1', instanceName));
        }
    },
    /**
    * Gets the variable type required.
    * @param {!string} varName Name of the variable selected in this block to
    *     check.
    * @return {string} String to indicate the variable type.
    */
    getVarType: function(varName) {
        return Blockly.Types.STRING;
    }
};
