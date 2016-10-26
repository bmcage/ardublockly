/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Block for the AllBot functions.
 *     The AllBot examples can be found at:
 *     https://github.com/Velleman/ALLBOT-lib
 */
'use strict';

goog.provide('Blockly.Blocks.allbot');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');


/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.allbot.HUE = '#50E68E';

Blockly.Blocks['allbotservo_config_hub'] = {
  /**
   * Block for adding an allbot servo to a hub.
   * @this Blockly.Block
   */
  init: function() {
    var names = [];
    if (Blockly.Arduino.Boards.selected['joints'] !== undefined) {
        for (var nrname in Blockly.Arduino.Boards.selected.joints.name) {
            names.push(
                [Blockly.Msg[ Blockly.Arduino.Boards.selected.joints.name[nrname][0] ],
                 Blockly.Arduino.Boards.selected.joints.name[nrname][1]]);
        }
    } else {
        names = [[Blockly.Msg.ARD_NO_ALLBOT, 'noallbot']];
    }
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("media/arduino/Servo.png", 19, 19, "*"))
        .appendField(Blockly.Msg.ARD_ALLBOT_SERVOHUB)
        .appendField(new Blockly.FieldDropdown(names), 'NAMESERVO');
    this.setOutput(true, "HUB_DIGOUT");
    this.setColour(Blockly.Blocks.allbot.HUE);
    this.setTooltip(Blockly.Msg.ARD_SERVOHUB_TIP);
    this.setHelpUrl('https://www.arduino.cc/en/Reference/Servo');
  },
  /**
   * Set the connection pins that the component connects to
   * @param {array} array of the connections (as string, eg '1', 'SDA', 'A1', ...
   * @this Blockly.Block
   */
  setHubConnector: function(connector) {
    this['connector'] = connector;
  },
  /**
   * Gets the variable type required.
   * @param {!string} varName Name of the variable selected in this block to
   *     check.
   * @return {string} String to indicate the variable type.
   */
  getVarType: function(varName) {
    return Blockly.Types.NUMBER;
  },
  /**
   * Called whenever anything on the workspace changes.
   * It checks if the board selected is a valid allbot
   * @this Blockly.Block
   */
  onchange: function() {
    if (!this.workspace) { return; }  // Block has been deleted.

    // Iterate through top level blocks to find board module
    var blocks = Blockly.mainWorkspace.getAllBlocks();
    var allbotInstancePresent = false;
    for (var x = 0; x < blocks.length; x++) {
      var func = blocks[x].getBoardName;
      if (func) {
        var BlockInstanceName = func.call(blocks[x]);
        if (BlockInstanceName.startsWith("allbot")) {
          allbotInstancePresent = true;
        }
      }
    }

    if (!allbotInstancePresent) {
      this.setWarningText(Blockly.Msg.ARD_NO_ALLBOT, 'allbotservo_config_hub');
    } else {
      this.setWarningText(null, 'allbotservo_config_hub');
    }
  },
  /**
   * Updates the content of the allbot servomotor dropdown
   * @this Blockly.Block
   */
  updateFields: function() {
    // TODO BENNY 
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'PIN', 'digitalPins');
  }
};
};

Blockly.Blocks['allbot_forward'] = {
  init: function() {
    this.appendValueInput('STEPS')
        .setCheck(Blockly.Types.NUMBER.checkList)
        .appendField(Blockly.Msg.ARD_ALLBOT_FORWARD);
    this.appendValueInput('SPEED')
        .setCheck(Blockly.Types.NUMBER.checkList)
        .appendField(Blockly.Msg.ARD_ALLBOT_STEPS);
    this.setInputsInline(true);
    this.setPreviousStatement(true, 'ARD_BLOCK');
    this.setNextStatement(true,'ARD_BLOCK');
    this.setColour(Blockly.Blocks.allbot.HUE);
    this.setTooltip(Blockly.Msg.ARD_ALLBOT_WALK_TIP);
    this.setHelpUrl('https://www.allbot.eu');
  }
};
