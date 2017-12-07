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
Blockly.Blocks.segment.HUE = 350;

/** Attach a 7SEGMENT block to the hub */
Blockly.Blocks['segment_config_hub'] = {
    /**
    * Block for adding a 7segment display to a hub.
    * @this Blockly.Block
    */
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.ARD_7SEGMENT_COMPONENT)
            .appendField(new Blockly.FieldInstance('Segment', 'Segment1', true, true, false), 'SEG_NAME');
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("media/arduino/7Segment.png", 126, 146, "*"))
            .setAlign(Blockly.ALIGN_CENTRE);
        this.appendDummyInput()
            .appendField('A pin:')
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField(new Blockly.FieldDropdown(
             Blockly.Arduino.Boards.selected.digitalPins), 'SEG_A')
            .appendField('B pin:')
            .appendField(new Blockly.FieldDropdown(
             Blockly.Arduino.Boards.selected.digitalPins), 'SEG_B')
            .appendField('C pin:')
            .appendField(new Blockly.FieldDropdown(
             Blockly.Arduino.Boards.selected.digitalPins), 'SEG_C');
        this.appendDummyInput()
            .appendField('D pin:')
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField(new Blockly.FieldDropdown(
             Blockly.Arduino.Boards.selected.digitalPins), 'SEG_D')
            .appendField('E pin:')
            .appendField(new Blockly.FieldDropdown(
             Blockly.Arduino.Boards.selected.digitalPins), 'SEG_E')
            .appendField('F pin:')
            .appendField(new Blockly.FieldDropdown(
             Blockly.Arduino.Boards.selected.digitalPins), 'SEG_F');
        this.appendDummyInput()
            .appendField('G pin:')
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField(new Blockly.FieldDropdown(
             Blockly.Arduino.Boards.selected.digitalPins), 'SEG_G')
            .appendField('DP pin:')
            .appendField(new Blockly.FieldDropdown(
             Blockly.Arduino.Boards.selected.digitalPins), 'SEG_DP');
        this.setColour(Blockly.Blocks.segment.HUE);
        this.setPreviousStatement(false, "MD_BLOCK");
        this.setNextStatement(false, "MD_BLOCK");
        this.setInputsInline(false);
        this.setTooltip(Blockly.Msg.ARD_7SEGMENT_COMPONENT_TIP);
        this.setHelpUrl("http://www.instructables.com/id/7-Segment-Display-On-Arduino/");
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


/** Write data to the 7SEGMENT block */
Blockly.Blocks['segment_write_number'] = {
    init: function () {
        this.setColour(Blockly.Blocks.segment.HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.ARD_7SEGMENT_COMPONENT)
            .appendField(
                new Blockly.FieldInstance('Segment', 'Segment1', false, true, false), 'SEG_NAME');
        this.appendValueInput('SEG_VAL')
            .appendField(Blockly.Msg.ARD_7SEGMENT_WRITE)
            .setCheck(Blockly.Types.NUMBER.checkList);
        this.setInputsInline(true);
        this.setPreviousStatement(true, 'ARD_BLOCK');
        this.setNextStatement(true, 'ARD_BLOCK');
        this.setTooltip(Blockly.Msg.ARD_7SEGMENT_WRITE_TIP);
        this.setHelpUrl("http://www.instructables.com/id/7-Segment-Display-On-Arduino/");
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

        var instanceName = this.getFieldValue('SEG_NAME')
        if (Blockly.Instances.isInstancePresent(instanceName, 'Segment', this)) {
          this.setWarningText(null);
        } else {
          // Set a warning to select a valid stepper config block
          this.setWarningText(
            Blockly.Msg.ARD_COMPONENT_WARN1.replace(
                '%1', Blockly.Msg.ARD_7SEGMENT_COMPONENT).replace(
                    '%2', instanceName).replace(
                    '%1', instanceName));
        console.log(instanceName);
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

/** Set a single segment on or off*/
Blockly.Blocks['segment_write_singleSeg'] = {
  init: function () {
      this.setColour(Blockly.Blocks.segment.HUE);
      this.appendDummyInput()
            .appendField(Blockly.Msg.ARD_7SEGMENT_COMPONENT)
            .appendField(
                new Blockly.FieldInstance('Segment', 'Segment1', false, true, false), 'SEG_NAME');
      this.appendDummyInput()
            .appendField(Blockly.Msg.ARD_7SEGMENT_WRITESEG)
            .appendField(
                new Blockly.FieldDropdown(
                        [['A', 'A'], //msg, state
                         ['B', 'B'],
                         ['C', 'C'],
                         ['D', 'D'],
                         ['E', 'E'],
                         ['F', 'F'],
                         ['G', 'G'],
                         ['DP', 'DP']
                        ]), 'SEG_TYPE')
            .appendField(' ');
      this.appendDummyInput()
            .appendField(
                new Blockly.FieldDropdown(
                    [[Blockly.Msg.ARD_LEDLEG_ON, 'on'], //msg, state
                     [Blockly.Msg.ARD_LEDLEG_OFF, 'off']
                    ]), 'STATE');
      this.setInputsInline(true);
      this.setPreviousStatement(true, 'ARD_BLOCK');
      this.setNextStatement(true, 'ARD_BLOCK');
      this.setTooltip(Blockly.Msg.ARD_7SEGMENT_WRITESEG_TIP);
      this.setHelpUrl("http://www.instructables.com/id/7-Segment-Display-On-Arduino/");
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

        var instanceName = this.getFieldValue('SEG_NAME')
        if (Blockly.Instances.isInstancePresent(instanceName, 'Segment', this)) {
          this.setWarningText(null);
        } else {
          // Set a warning to select a valid stepper config block
          this.setWarningText(
            Blockly.Msg.ARD_COMPONENT_WARN1.replace(
                '%1', Blockly.Msg.ARD_7SEGMENT_COMPONENT).replace(
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