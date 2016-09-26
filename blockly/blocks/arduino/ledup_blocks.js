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

goog.provide('Blockly.Blocks.ledup_blocks');

goog.require('Blockly.Blocks');


// The Hub block
Blockly.Blocks['ledup_hub'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_LEDUP_HUB);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT) 
        .appendField(new Blockly.FieldDropdown([
	    [Blockly.Msg.ARD_LEDUP_GADGET, "DEST_GADGET"],   //For the attiny85 gadget
	    [Blockly.Msg.ARD_LEDUP_PROTO, "DEST_PROTOTYPE"], //For prototype on Arduino Uno
        ]), "TARGET");
    this.appendValueInput("LED-0")
        .setCheck(["HUB_DIG"])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.ARD_LEDUP_LED0); 
    this.appendValueInput("LED-1")
        .setCheck(["HUB_DIG"])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.ARD_LEDUP_LED1); 
    this.appendValueInput("LED-2")
        .setCheck(["HUB_DIG"])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.ARD_LEDUP_LED2); 
    this.appendValueInput("LED-3")
        .setCheck(["HUB_DIG"])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.ARD_LEDUP_LED3); 
    this.appendValueInput("LED-4")
        .setCheck(["HUB_DIG"])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.ARD_LEDUP_LED4); 
    this.appendValueInput("LED-5")
        .setCheck(["HUB_DIG"])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.ARD_LEDUP_LED5); 
    this.setPreviousStatement(false, "MD_BLOCK");
    this.setNextStatement(false, "MD_BLOCK");
    this.setColour('#70D65C');
    this.setTooltip(Blockly.Msg.ARD_LEDUP_HUB_TIP);
    this.setHelpUrl('http://ingegno.be/01-blockly-4-arduino/');
  }
};
