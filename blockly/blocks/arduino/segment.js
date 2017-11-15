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

goog.provide('Blockly.Blocks.segment');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');


/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.segment.HUE = 120;

/** Attach a 7SEGMENT block to the hub */
Blockly.Blocks['segment_config_hub'] = {
    /**
    * Block for adding a 7segment display to a hub.
    * @this Blockly.Block
    */
    init: function () {
        this.appendDummyInput()
            .appendField('7-segment HUB')
            .appendField(new Blockly.FieldInstance('Segment', 'Segment1', true, true, false), 'SEG_NAME');
        this.appendValueInput("SEG_A")
            .setCheck(["HUB_DIG", "HUB_DIGOUT"])
            .setAlign(Blockly.ALIGN_RIGHT)
            //.appendField(Blockly.Msg.ARD_LEDUP_LED0); 
            .appendField('A');
        this.appendValueInput("SEG_B")
            .setCheck(["HUB_DIG", "HUB_DIGOUT"])
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('B');
        this.appendValueInput("SEG_C")
            .setCheck(["HUB_DIG", "HUB_DIGOUT"])
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('C');
        this.appendValueInput("SEG_D")
            .setCheck(["HUB_DIG", "HUB_DIGOUT"])
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('D');
        this.appendValueInput("SEG_E")
            .setCheck(["HUB_DIG", "HUB_DIGOUT"])
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('E');
        this.appendValueInput("SEG_F")
            .setCheck(["HUB_DIG", "HUB_DIGOUT"])
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('F');
        this.appendValueInput("SEG_G")
            .setCheck(["HUB_DIG", "HUB_DIGOUT"])
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('G');
        this.setColour(Blockly.Blocks.segment.HUE);
        this.setPreviousStatement(false, "MD_BLOCK");
        this.setNextStatement(false, "MD_BLOCK");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

/** 
 * Block for setting up a specific segment 
 * @this Blockly.Block
 */
Blockly.Blocks['segment_pin'] = {
    init: function() {
        this.setHelpUrl('http://arduino.cc/en/Reference/DigitalWrite');
        this.setColour(512);
        this.appendDummyInput()
            .appendField('Pin Nummer')
            .appendField(new Blockly.FieldDropdown(
                Blockly.Arduino.Boards.selected.digitalPins), 'PIN');
        this.appendDummyInput()
            .appendField('polariteit')
            .appendField(
                new Blockly.FieldDropdown(
                    [[Blockly.Msg.ARD_LEDLEGPOS, 'pos'],
                     [Blockly.Msg.ARD_LEDLEGNEG, 'neg']
                    ]), 'POLARITY');
        this.setOutput(true, 'HUB_DIGOUT');
        this.setInputsInline(true);
        this.setTooltip('');
    }
};

/** Write data to the 7SEGMENT block */
Blockly.Blocks['segment_write_number'] = {
    init: function () {
        this.setColour(Blockly.Blocks.segment.HUE);
        this.appendDummyInput()
            .appendField('7-Segment name')
            .appendField(
                new Blockly.FieldInstance('Segment', 'Segment1', false, true, false), 'SEG_NAME');
        this.appendValueInput('SEG_VAL')
            .appendField('write number')
            .setCheck(Blockly.Types.NUMBER.checkList);
        this.setInputsInline(true);
        this.setPreviousStatement(true, 'ARD_BLOCK');
        this.setNextStatement(true, 'ARD_BLOCK');
        this.setTooltip('Write a specific number to the 7-segment display');
        this.setHelpUrl('');
    },
    /**
    * Called whenever anything on the workspace changes.
    * It checks/warns if the selected stepper instance has a config block.
    * @this Blockly.Block
    */
    onchange: function() {
        if (!this.workspace) return; // Block has been deleted.
        var instanceName = this.getFieldValue('SEG_NAME');
        if (Blockly.Instances.isInstancePresent(instanceName, 'Segment', this)) {
            this.setWarningText(null);
        } else {
            // Set a warning to select a valid Segment config block
            this.setWarningText('CHOOSE A HUB!');
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