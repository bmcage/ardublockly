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


Blockly.Blocks['tft'] = {
  init: function() {
    this.setNextStatement(true, null);
    this.appendDummyInput()
        .appendField("Definieer TFT-scherm")
        .appendField(
            new Blockly.FieldInstance('tft',
                                      'mijnTFT',
                                      true, true, false),
            'NAMETFT')                      
    this.setColour(350);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};



Blockly.Blocks['tft_tekst'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("tekst")
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
 this.setHelpUrl("");
  }
};


Blockly.Blocks['kleurachtergrond'] = {
  init: function() {
    var colour = new Blockly.FieldColour('#ff0000');
    colour.setColours(['rgb(255,0,0)', 'rgb(0,255,0)', 'rgb(0,0,255)', 'rgb(255,255,0)', 'rgb(255,0,179)', 'rgb(255,102,0)', 'rgb(210,0,255)', 'rgb(255,255,255)', 'rgb(0,0,0)']).setColumns(3);
        
    this.appendDummyInput()
        .appendField("Kleur van de achtergrond")
        .appendField(colour, "kleurAchtergrond");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(350);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};