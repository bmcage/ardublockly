/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Blocks for Arduino Stepper library.
 *     The Arduino Servo functions syntax can be found in the following URL:
 *     http://arduino.cc/en/Reference/Stepper
 *     Note that this block uses the Blockly.FieldInstance instead of
 *     Blockly.FieldDropdown which generates a unique instance per setup block
 *     in the workspace.
 */

/** 
 * TO DO
 * Msg maken voor default name
 *
 *
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
    this.appendDummyInput()
        .appendField("Schrijf tekst")
        .appendField(new Blockly.FieldTextInput(""), "tekst");
    var colour = new Blockly.FieldColour('#ff0000');
    colour.setColours(['rgb(255,0,0)', 'rgb(0,255,0)', 'rgb(0,0,255)', 'rgb(255,255,0)', 'rgb(255,0,179)', 'rgb(255,102,0)', 'rgb(210,0,255)', 'rgb(255,255,255)', 'rgb(0,0,0)']).setColumns(3);
    this.appendDummyInput()
        .appendField("kleur van de tekst")
        .appendField(colour, "kleurTekst");
    this.appendDummyInput()
        .appendField("positie van de tekst  x =")
        .appendField(new Blockly.FieldNumber(0, 0, 145), "xWaarde")
        .appendField("y =")
        .appendField(new Blockly.FieldNumber(0, 0, 145), "yWaarde");
    this.setPreviousStatement(true, null);
    this.setColour(350);
    this.setTooltip("");
    this.setHelpUrl("https://docs.google.com/document/d/1rd5WztljQ4R-4YQH1UzbRDuTeg8SeEte_eZYg9qlx8Y/edit?usp=sharing");
  }
};

Blockly.Blocks['tft_backgroundcolor'] = {
  init: function() {
    var colour = new Blockly.FieldColour('#ff0000');
    colour.setColours(['rgb(255,0,0)', 'rgb(0,255,0)', 'rgb(0,0,255)', 'rgb(255,255,0)', 'rgb(255,0,179)', 'rgb(255,102,0)', 'rgb(210,0,255)', 'rgb(255,255,255)', 'rgb(0,0,0)']).setColumns(3);
        
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_TFT_COMPONENT)
        .appendField(
            new Blockly.FieldInstance('tft', 'TFT1', true, true, false), 'TFTNAME') ;
    this.appendDummyInput()
        .appendField("Kleur van de achtergrond")
        .appendField(colour, "kleurAchtergrond");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(350);
 this.setTooltip("");
 this.setHelpUrl("https://docs.google.com/document/d/1rd5WztljQ4R-4YQH1UzbRDuTeg8SeEte_eZYg9qlx8Y/edit?usp=sharing");
  }
};
