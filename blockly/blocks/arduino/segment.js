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

/** Set up a 7SEGMENT block */
Blockly.Blocks['segment_config'] = {
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
      this.setPreviousStatement(true, "ARD_COMP_BLOCK");
      this.setNextStatement(true, 'ARD_COMP_BLOCK');
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
  },
  /**
   * Updates the content of the the pin related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'SEG_A', 'digitalPins');
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'SEG_B', 'digitalPins');
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'SEG_C', 'digitalPins');
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'SEG_D', 'digitalPins');
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'SEG_E', 'digitalPins');
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'SEG_F', 'digitalPins');
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'SEG_G', 'digitalPins');
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'SEG_DP', 'digitalPins');
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

      var SEG_A = this.getFieldValue('SEG_A')
      var SEG_B = this.getFieldValue('SEG_B')
      var SEG_C = this.getFieldValue('SEG_C')
      var SEG_D = this.getFieldValue('SEG_D')
      var SEG_E = this.getFieldValue('SEG_E')
      var SEG_F = this.getFieldValue('SEG_F')
      var SEG_G = this.getFieldValue('SEG_G')
      var SEG_DP = this.getFieldValue('SEG_DP')
      if (SEG_A == SEG_B || SEG_A == SEG_C || SEG_A == SEG_D
          || SEG_A == SEG_E || SEG_A == SEG_F || SEG_A == SEG_G
          || SEG_A == SEG_DP) {
        this.setWarningText(Blockly.Msg.ARD_7SEGMENT_COMPONENT_WARN
                            .replace('%1', "A"), 'equal_pins');
      } else if (SEG_B == SEG_C || SEG_B == SEG_D
          || SEG_B == SEG_E || SEG_B == SEG_F || SEG_B == SEG_G
          || SEG_B == SEG_DP) {
        this.setWarningText(Blockly.Msg.ARD_7SEGMENT_COMPONENT_WARN
                            .replace('%1', "B"), 'equal_pins');
      } else if (SEG_C == SEG_D
          || SEG_C == SEG_E || SEG_C == SEG_F || SEG_C == SEG_G
          || SEG_C == SEG_DP) {
        this.setWarningText(Blockly.Msg.ARD_7SEGMENT_COMPONENT_WARN
                            .replace('%1', "C"), 'equal_pins');
      } else if (SEG_D == SEG_E || SEG_D == SEG_F || SEG_D == SEG_G
          || SEG_D == SEG_DP) {
        this.setWarningText(Blockly.Msg.ARD_7SEGMENT_COMPONENT_WARN
                            .replace('%1', "D"), 'equal_pins');
      } else if (SEG_E == SEG_F || SEG_E == SEG_G || SEG_E == SEG_DP) {
        this.setWarningText(Blockly.Msg.ARD_7SEGMENT_COMPONENT_WARN
                            .replace('%1', "E"), 'equal_pins');
      } else if (SEG_F == SEG_G || SEG_F == SEG_DP) {
        this.setWarningText(Blockly.Msg.ARD_7SEGMENT_COMPONENT_WARN
                            .replace('%1', "F"), 'equal_pins');
      } else if (SEG_G == SEG_DP) {
        this.setWarningText(Blockly.Msg.ARD_7SEGMENT_COMPONENT_WARN
                            .replace('%1', "G"), 'equal_pins');
      } else {
        this.setWarningText(null, 'equal_pins');
      }
  },
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
Blockly.Blocks['segment_write_singleseg'] = {
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