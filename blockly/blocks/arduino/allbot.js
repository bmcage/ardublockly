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

Blockly.Blocks.allbot.allbotJointsName = 
    function(block) {
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
  return names;
}

Blockly.Blocks.allbot.allbotJointonchange = 
    function(block, fieldname) {
  if (!block.workspace) { return; }  // Block has been deleted.

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

  //control if joint exists happens in updateFields 
  var currentValuePresent = true;
  if (block['currentJointPresent'] !== undefined && block['currentJointPresent'] !== null) {
    //joint selected not present in dropdown, check if dropdown changed, and 
    //redetermine if joint selected present already
    currentValuePresent = Blockly.Blocks.allbot.refreshBlockFieldAllbotJointsDropdown(
      block, fieldname);
  }

  if (!allbotInstancePresent) {
    block.setWarningText(Blockly.Msg.ARD_NO_ALLBOT, 'allbotservo_block');
  } else if (!currentValuePresent) {
    block.setWarningText(block['currentJointPresent'], 'allbotservo_block');
  } else {
    block.setWarningText(null, 'allbotservo_block');
  }
}

Blockly.Blocks.allbot.refreshBlockFieldAllbotJointsDropdown =
    function(block, fieldName) {
  var field = block.getField(fieldName);
  var fieldValue = field.getValue();
  var textValue = field.getText();
  
  // create the list for the dropdown
  var names = Blockly.Blocks.allbot.allbotJointsName(this);
  
  //set the dropdown list
  field.menuGenerator_ = names;
  
  //check if set value is a valid value
  var currentValuePresent = false;
  for (var i = 0; i < names.length; i++) {
    if (fieldValue == names[i][1]) {
      currentValuePresent = true;
      // reset it for translation update as at init translation was not known
      if (fieldValue == textValue) {
        // on reload, translation should be set after setting menuGenerator_
        field.setValue('dummy');
        field.setValue(fieldValue);
      }
    }
  }
  // If the old value is not present any more, add a warning to the block.
  if (!currentValuePresent) {
    //doing setWarningText here can lead to infinite recursion in onchange
    block.currentJointPresent = Blockly.Msg.ARD_UNKNOWN_ALLBOTJOINT.replace('%1', textValue);
  } else {
    block.currentJointPresent = null;
  }
  
  
  return currentValuePresent;
};


Blockly.Blocks['allbotservo_config_hub'] = {
  /**
   * Block for adding an allbot servo to a hub.
   * @this Blockly.Block
   */
  init: function() {
    var names = Blockly.Blocks.allbot.allbotJointsName(this);
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
    Blockly.Blocks.allbot.allbotJointonchange(this, 'NAMESERVO');
  },
  /**
   * Updates the content of the allbot servomotor dropdown
   * @this Blockly.Block
   */
  updateFields: function() {
    Blockly.Blocks.allbot.refreshBlockFieldAllbotJointsDropdown(
        this, 'NAMESERVO');
    
  }
};

Blockly.Blocks['allbot_walkforward'] = {
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

Blockly.Blocks['allbot_walkbackward'] = {
  init: function() {
    this.appendValueInput('STEPS')
        .setCheck(Blockly.Types.NUMBER.checkList)
        .appendField(Blockly.Msg.ARD_ALLBOT_BACKWARD);
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

Blockly.Blocks['allbot_walkleft'] = {
  init: function() {
    this.appendValueInput('STEPS')
        .setCheck(Blockly.Types.NUMBER.checkList)
        .appendField(Blockly.Msg.ARD_ALLBOT_LEFT);
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

Blockly.Blocks['allbot_walkright'] = {
  init: function() {
    this.appendValueInput('STEPS')
        .setCheck(Blockly.Types.NUMBER.checkList)
        .appendField(Blockly.Msg.ARD_ALLBOT_RIGHT);
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

Blockly.Blocks['allbot_lookleft'] = {
  init: function() {
    this.appendValueInput('SPEED')
        .setCheck(Blockly.Types.NUMBER.checkList)
        .appendField(Blockly.Msg.ARD_ALLBOT_LOOKLEFT);
    this.setInputsInline(true);
    this.setPreviousStatement(true, 'ARD_BLOCK');
    this.setNextStatement(true,'ARD_BLOCK');
    this.setColour(Blockly.Blocks.allbot.HUE);
    this.setTooltip(Blockly.Msg.ARD_ALLBOT_LOOK_TIP);
    this.setHelpUrl('https://www.allbot.eu');
  }
};

Blockly.Blocks['allbot_lookright'] = {
  init: function() {
    this.appendValueInput('SPEED')
        .setCheck(Blockly.Types.NUMBER.checkList)
        .appendField(Blockly.Msg.ARD_ALLBOT_LOOKRIGHT);
    this.setInputsInline(true);
    this.setPreviousStatement(true, 'ARD_BLOCK');
    this.setNextStatement(true,'ARD_BLOCK');
    this.setColour(Blockly.Blocks.allbot.HUE);
    this.setTooltip(Blockly.Msg.ARD_ALLBOT_LOOK_TIP);
    this.setHelpUrl('https://www.allbot.eu');
  }
};

Blockly.Blocks['allbot_chirp'] = {
  init: function() {
    this.appendValueInput('BEEPS')
        .setCheck(Blockly.Types.NUMBER.checkList)
        .appendField(Blockly.Msg.ARD_ALLBOT_CHIRP);
    this.appendValueInput('SPEED')
        .setCheck(Blockly.Types.NUMBER.checkList)
        .appendField(Blockly.Msg.ARD_ALLBOT_CHIRPSPEED);
    this.setInputsInline(true);
    this.setPreviousStatement(true, 'ARD_BLOCK');
    this.setNextStatement(true,'ARD_BLOCK');
    this.setColour(Blockly.Blocks.allbot.HUE);
    this.setTooltip(Blockly.Msg.ARD_ALLBOT_CHIRP_TIP);
    this.setHelpUrl('https://www.allbot.eu');
  }
};

Blockly.Blocks['allbot_scared'] = {
  init: function() {
    this.appendValueInput('SHAKES')
        .setCheck(Blockly.Types.NUMBER.checkList)
        .appendField(Blockly.Msg.ARD_ALLBOT_SCARED);
    this.appendValueInput('BEEPS')
        .setCheck(Blockly.Types.NUMBER.checkList)
        .appendField(Blockly.Msg.ARD_ALLBOT_SCAREDBEEPS);
    this.setInputsInline(true);
    this.setPreviousStatement(true, 'ARD_BLOCK');
    this.setNextStatement(true,'ARD_BLOCK');
    this.setColour(Blockly.Blocks.allbot.HUE);
    this.setTooltip(Blockly.Msg.ARD_ALLBOT_SCARED_TIP);
    this.setHelpUrl('https://www.allbot.eu');
  }
};

Blockly.Blocks['servoallbot_write'] = {
  /**
   * Block for writing an angle value into an allbot servo pin.
   * @this Blockly.Block
   */
  init: function() {
    var names = Blockly.Blocks.allbot.allbotJointsName(this);
    this.setHelpUrl('http://arduino.cc/en/Reference/ServoWrite');
    this.setColour(Blockly.Blocks.servo.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_ALLBOTSERVO_WRITE)
        .appendField(new Blockly.FieldDropdown(names), 'SERVO_NAME');
    this.setInputsInline(false);
    this.appendValueInput('SERVO_ANGLE')
        .setCheck(Blockly.Types.NUMBER.checkList)
        .appendField(Blockly.Msg.ARD_SERVO_WRITE_TO);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_SERVO_WRITE_DEG_180);
    this.setInputsInline(true);
    this.setPreviousStatement(true, 'ARD_BLOCK');
    this.setNextStatement(true, 'ARD_BLOCK');
    this.setTooltip(Blockly.Msg.ARD_SERVO_WRITE_TIP);
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
    Blockly.Blocks.allbot.allbotJointonchange(this, 'SERVO_NAME');
  },
  /**
   * Updates the content of the allbot servomotor dropdown
   * @this Blockly.Block
   */
  updateFields: function() {
    Blockly.Blocks.allbot.refreshBlockFieldAllbotJointsDropdown(
        this, 'SERVO_NAME');
    
  }
};

Blockly.Blocks['allbot_animate'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_ALLBOT_ANIMATE)
    this.appendStatementInput("SERVOMOVEMENTS")
        .setCheck('ALLBOT_SERVOMOVE')
        .appendField(Blockly.Msg.ARD_ALLBOT_ANIMATESERVOS);
    this.appendValueInput('SPEED')
        .setCheck(Blockly.Types.NUMBER.checkList)
        .appendField(Blockly.Msg.ARD_ALLBOT_ANIMATESPEED);
    this.setInputsInline(true);
    this.setPreviousStatement(true, 'ARD_BLOCK');
    this.setNextStatement(true, 'ARD_BLOCK');
    this.setColour(Blockly.Blocks.allbot.HUE);
    this.setTooltip(Blockly.Msg.ARD_ALLBOT_ANIMATE_TIP);
    this.setHelpUrl('https://www.allbot.eu');
  }
};


Blockly.Blocks['servoallbot_animate'] = {
  /**
   * Block for indicating an angle value that allbot servo pin should animate towards.
   * @this Blockly.Block
   */
  init: function() {
    var names = Blockly.Blocks.allbot.allbotJointsName(this);
    this.setHelpUrl('http://allbot.eu');
    this.setColour(Blockly.Blocks.servo.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_ALLBOTSERVO_ANIMATE)
        .appendField(new Blockly.FieldDropdown(names), 'SERVO_NAME');
    this.setInputsInline(false);
    this.appendValueInput('SERVO_ANGLE')
        .setCheck(Blockly.Types.NUMBER.checkList)
        .appendField(Blockly.Msg.ARD_SERVO_WRITE_TO);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_SERVO_WRITE_DEG_180);
    this.setInputsInline(true);
    this.setPreviousStatement(true, 'ALLBOT_SERVOMOVE');
    this.setNextStatement(true, 'ALLBOT_SERVOMOVE');
    this.setTooltip(Blockly.Msg.ARD_ALLBOTSERVO_ANIMATE_TIP);
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
    Blockly.Blocks.allbot.allbotJointonchange(this, 'SERVO_NAME');
  },
  /**
   * Updates the content of the allbot servomotor dropdown
   * @this Blockly.Block
   */
  updateFields: function() {
    Blockly.Blocks.allbot.refreshBlockFieldAllbotJointsDropdown(
        this, 'SERVO_NAME');
    
  }
};

Blockly.Blocks['allbot_remotecontrol'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_ALLBOT_RC)
    this.appendStatementInput("RC_COMMANDS")
        .setCheck('ALLBOT_RC_COMMANDS')
        .appendField(Blockly.Msg.ARD_ALLBOT_RCCOMMANDS);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(new Blockly.FieldCheckbox("TRUE"), "RC_SERIAL")
        .appendField(Blockly.Msg.ARD_ALLBOT_RCSERIAL);
    this.setInputsInline(true);
    this.setPreviousStatement(true, 'ARD_BLOCK');
    this.setNextStatement(true, 'ARD_BLOCK');
    this.setColour(Blockly.Blocks.allbot.HUE);
    this.setTooltip(Blockly.Msg.ARD_ALLBOT_RC_TIP);
    this.setHelpUrl('https://www.allbot.eu');
  }
};

Blockly.Blocks['allbot_remotecontroldo'] = {
  /**
   * Block for reacting to the allbot remote control app
   * @this Blockly.Block
   */
  init: function() {
    var commands = [
      ['WF', 'WF'],
      ['WB', 'WB'],
      ['WL', 'WL'],
      ['WR', 'WR'],
      ['TR', 'TR'],
      ['TL', 'TL'],
      ['LF', 'LF'],
      ['LB', 'LB'],
      ['LL', 'LL'],
      ['LR', 'LR'],
      ['FR', 'FR'],
      ['FL', 'FL'],
      ['RR', 'RR'],
      ['RL', 'RL'],
      ['SC', 'SC'],
      ['CH', 'CH'],
    ];
    this.setColour(Blockly.Blocks.logic.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_ALLBOT_RCCOMMAND)
        .appendField(new Blockly.FieldDropdown(commands), 'RC_COMMAND');
    this.appendStatementInput("RC_EXECUTE")
        .setCheck('ARD_BLOCK')
        .appendField(Blockly.Msg.ARD_ALLBOT_RCDO);
    this.setInputsInline(false);
    this.setInputsInline(true);
    this.setPreviousStatement(true, 'ALLBOT_RC_COMMANDS');
    this.setNextStatement(true, 'ALLBOT_RC_COMMANDS');
    this.setTooltip(Blockly.Msg.ARD_ALLBOT_RCCOMMAND_TIP);
    this.setHelpUrl('http://allbot.eu');
  },
  /**
   * Called whenever anything on the workspace changes.
   * It checks if the board selected is a valid allbot
   * @this Blockly.Block
   */
  onchange: function() {
    var parent = this.getParent();
    if (parent == undefined) {
      this.setWarningText(Blockly.Msg.ARD_ALLBOT_RCCOMMAND_SINGLE, 'allbot_remotecontroldo');
    } else {
      this.setWarningText(null, 'allbot_remotecontroldo');
    }
  }
      
};