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

goog.provide('Blockly.Blocks.colour2');

goog.require('Blockly.Blocks');


Blockly.Blocks['colour_rgb255'] = {
  /**
   * Block for composing a colour from RGB components.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg.COLOUR_RGB_HELPURL);
    this.setColour(Blockly.Blocks.colour.HUE);
    this.appendValueInput('RED')
        .setCheck(Blockly.Types.NUMBER.checkList)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.COLOUR_RGB_TITLE)
        .appendField(Blockly.Msg.COLOUR_RGB_RED);
    this.appendValueInput('GREEN')
        .setCheck(Blockly.Types.NUMBER.checkList)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.COLOUR_RGB_GREEN);
    this.appendValueInput('BLUE')
        .setCheck(Blockly.Types.NUMBER.checkList)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.COLOUR_RGB_BLUE);
    this.setOutput(true, 'Colour');
    this.setTooltip(Blockly.Msg.COLOUR_RGB255_TOOLTIP);
  }
};
