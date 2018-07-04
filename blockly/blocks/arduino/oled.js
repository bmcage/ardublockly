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

goog.provide('Blockly.Blocks.oled');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.oled.HUE = 350;

/** Initialise OLED Screen */
Blockly.Blocks['oled_config'] = {
    init: function () {
        this.setColour(Blockly.Blocks.oled.HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.ARD_OLED_INIT)
            .appendField(
                new Blockly.FieldInstance('OLED', Blockly.Msg.ARD_OLED_DEFAULT_NAME,
                                           false, true, false), 'OLED_NAME')
            .appendField(Blockly.Msg.ARD_OLED_RESOLUTIE)
            .appendField(new Blockly.FieldDropdown(
            [['128x32','128x32']]) // msg, state
                         , 'OLED_RES');
        this.setPreviousStatement(true, 'ARD_COMP_BLOCK');
        this.setNextStatement(true, 'ARD_COMP_BLOCK');
        this.setTooltip(Blockly.Msg.ARD_OLED_CONFIG_TIP);
        this.setHelpUrl('');
    }
};

/** Sets the font and font-size of the text */
Blockly.Blocks['oled_font'] = {
    init: function () {
        this.setColour(Blockly.Blocks.oled.HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.ARD_OLED)
            .appendField(
                new Blockly.FieldInstance('OLED', Blockly.Msg.ARD_OLED_DEFAULT_NAME, false, true, false), 'OLED_NAME')
            .appendField(Blockly.Msg.ARD_OLED_FONT_SIZE)
            .appendField(new Blockly.FieldDropdown(
            [['8px','08'],
            ['14px', '14'],
            ['24px', '24']]) // msg, state
                         , 'OLED_FONT_SIZE');
        this.setPreviousStatement(true, 'ARD_BLOCK');
        this.setNextStatement(true, 'ARD_BLOCK');
        this.setTooltip(Blockly.Msg.ARD_OLED_FONT_TIP);
        this.setHelpUrl('');
    }
};

/** Block to set cursor position on the screen and print given text */
Blockly.Blocks['oled_print'] = {
    init: function () {
        this.setColour(Blockly.Blocks.oled.HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.ARD_OLED)
            .appendField(
                new Blockly.FieldInstance('OLED', Blockly.Msg.ARD_OLED_DEFAULT_NAME, false, true, false), 'OLED_NAME');
        this.appendValueInput('OLED_X')
            .appendField(Blockly.Msg.ARD_OLED_CURSORX)
            .setCheck(Blockly.Types.NUMBER.checkList);
        this.appendValueInput('OLED_Y')
            .appendField(Blockly.Msg.ARD_OLED_CURSORY)
            .setCheck(Blockly.Types.NUMBER.checkList);
        this.appendValueInput('OLED_PRINT')
            .appendField(Blockly.Msg.ARD_OLED_PRINT);
        this.setInputsInline(true);
        this.setPreviousStatement(true, 'ARD_BLOCK');
        this.setNextStatement(true, 'ARD_BLOCK');
        this.setTooltip(Blockly.Msg.ARD_OLED_PRINT_TIP);
        this.setHelpUrl('');
    }
};

/** Block to clear everything to the display */
Blockly.Blocks['oled_clear'] = {
    init: function () {
        this.setColour(Blockly.Blocks.oled.HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.ARD_OLED)
            .appendField(
                new Blockly.FieldInstance('OLED', Blockly.Msg.ARD_OLED_DEFAULT_NAME,
                                          false, true, false), 'OLED_NAME')
            .appendField(Blockly.Msg.ARD_OLED_CLEAR);
        this.setInputsInline(false);
        this.setPreviousStatement(true, 'ARD_BLOCK');
        this.setNextStatement(true, 'ARD_BLOCK');
        this.setTooltip(Blockly.Msg.ARD_OLED_CLEAR_TIP);
        this.setHelpUrl('');
    }
};

/** Block to write everything to the display */
Blockly.Blocks['oled_show'] = {
    init: function () {
        this.setColour(Blockly.Blocks.oled.HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.ARD_OLED)
            .appendField(
                new Blockly.FieldInstance('OLED', Blockly.Msg.ARD_OLED_DEFAULT_NAME, false, true, false), 'OLED_NAME')
            .appendField(Blockly.Msg.ARD_OLED_WRITE);
        this.setInputsInline(false);
        this.setPreviousStatement(true, 'ARD_BLOCK');
        this.setNextStatement(true, 'ARD_BLOCK');
        this.setTooltip(Blockly.Msg.ARD_OLED_WRITE_TIP);
        this.setHelpUrl('');
    }
};