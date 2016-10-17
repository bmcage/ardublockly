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
        .setCheck(["HUB_DIG", "HUB_DIGOUT"])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.ARD_LEDUP_LED0); 
    this.appendValueInput("LED-1")
        .setCheck(["HUB_DIG", "HUB_DIGOUT"])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.ARD_LEDUP_LED1); 
    this.appendValueInput("LED-2")
        .setCheck(["HUB_DIG", "HUB_DIGOUT"])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.ARD_LEDUP_LED2); 
    this.appendValueInput("LED-3")
        .setCheck(["HUB_DIG", "HUB_DIGOUT"])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.ARD_LEDUP_LED3); 
    this.appendValueInput("LED-4")
        .setCheck(["HUB_DIG", "HUB_DIGOUT"])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.ARD_LEDUP_LED4); 
    this.appendValueInput("LED-5")
        .setCheck(["HUB_DIG", "HUB_DIGOUT"])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.ARD_LEDUP_LED5); 
    this.setPreviousStatement(false, "MD_BLOCK");
    this.setNextStatement(false, "MD_BLOCK");
    this.setColour('#70D65C');
    this.setTooltip(Blockly.Msg.ARD_LEDUP_HUB_TIP);
    this.setHelpUrl('http://ingegno.be/01-blockly-4-arduino/');
  },
  /** @return {!boolean} True if the block instance is in the workspace. */
  getLedUpKidzInstance: function() {
    return true;
  },
  /**
   * Returns the Arduino Board name that is required for this block.
   * @return {!string} Board name.
   * @this Blockly.Block
   */
  getBoardName: function() {
    var target = this.getFieldValue('TARGET');
    if (target == 'DEST_GADGET') {
        return 'attiny85';
    } else {
        return 'uno'
    }
  },
  /**
   * Called whenever anything on the workspace changes.
   * It checks if the board selected corresponds to what it should be
   * block if not valid data is found.
   * @this Blockly.Block
   */
  onchange: function() {
    if (!this.workspace) { return; }  // Block has been deleted.

    // Iterate through top level blocks to find if there are other board modules
    var blocks = this.workspace.getAllBlocks();
    var otherBoardPresent = false;
    for (var x = 0; x < blocks.length; x++) {
      var func = blocks[x].getBoardName;
      if (func) {
        var BoardName = func.call(blocks[x]);
        if (BoardName != this.getBoardName()) {
          otherBoardPresent = true;
        }
        if (this != blocks[x]) {
          // no two ledupkidx blocks allowed.
          otherBoardPresent = true;
        }
      }
    }
    
    if (otherBoardPresent) {
      // Set a warning to select a valid stepper config
      this.setWarningText(Blockly.Msg.ARD_BOARD_WARN.replace('%1', Blockly.Msg.ARD_COMPONENT_BOARD), 'board');
    } else {
      Blockly.Arduino.Boards.changeBoard(this.workspace, this.getBoardName());
      this.setWarningText(null, 'board');
    }
  },
};


Blockly.Blocks['ledupkidz_led_onoff']  = {
  /**
   * Block for setting a specific LED of LedUpKidz to a state.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/DigitalWrite');
    this.setColour(Blockly.Blocks.light.HUE);
    this.appendValueInput('LEDUPKIDZ_LEDNUMBER')
        .setCheck(Blockly.Types.NUMBER.checkList)
        .appendField(Blockly.Msg.ARD_LEDUP_LED_ONOFF1);
    this.appendValueInput('STATE')
        .appendField(Blockly.Msg.ARD_LEDUP_LED_ONOFF2)
        .setCheck(Blockly.Types.BOOLEAN.checkList);
    this.setInputsInline(true);
    this.setPreviousStatement(true, 'ARD_BLOCK');
    this.setNextStatement(true, 'ARD_BLOCK');
    this.setTooltip(Blockly.Msg.ARD_LEDUP_LED_ONOFF_TIP);
  }
};
