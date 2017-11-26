/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Block for the Ingegno Diorama functions.
 *     The Diorama is an Arduino Mega connected to 
 *     1. A TM1638 board
 *     2. SD Card shield
 *     3. Stepper Motor
 */
'use strict';

goog.provide('Blockly.Blocks.diorama');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');


/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.diorama.HUE = '#0066FF';

Blockly.Blocks['dio_louder'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_DIO_LOUDER);
    this.setInputsInline(true);
    this.setPreviousStatement(true, 'ARD_BLOCK');
    this.setNextStatement(true,'ARD_BLOCK');
    this.setColour(Blockly.Blocks.diorama.HUE);
    this.setTooltip(Blockly.Msg.ARD_DIO_SOUND_TIP);
    this.setHelpUrl('');
  },
  onchange: function(event) {
    if (!this.workspace || event.type == Blockly.Events.MOVE ||
        event.type == Blockly.Events.UI) {
        return;  // Block deleted or irrelevant event
    }

    // Iterate through top level blocks to find if diorama board is present
    var blocks = this.workspace.getAllBlocks();
    var dioPresent = false;
    for (var x = 0; x < blocks.length; x++) {
      var func = blocks[x].getBoardName;
      if (func) {
        var BoardName = func.call(blocks[x]);
        if (BoardName == "diorama") {
          dioPresent = true;
        }
      }
    }
    
    var warning = '';
    if (!dioPresent) {
      warning = Blockly.Msg.ARD_DIO_BOARD_MISSING;
    }
    
    if (warning) {
      // Set a warning to select a valid stepper config
      this.setWarningText(warning, 'dio_louder');
    } else {
      this.setWarningText(null, 'dio_louder');
    }
  }
};

Blockly.Blocks['dio_quieter'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_DIO_LESSLOUD);
    this.setInputsInline(true);
    this.setPreviousStatement(true, 'ARD_BLOCK');
    this.setNextStatement(true,'ARD_BLOCK');
    this.setColour(Blockly.Blocks.diorama.HUE);
    this.setTooltip(Blockly.Msg.ARD_DIO_SOUND_TIP);
    this.setHelpUrl('');
  },
  onchange: function(event) {
    if (!this.workspace || event.type == Blockly.Events.MOVE ||
        event.type == Blockly.Events.UI) {
        return;  // Block deleted or irrelevant event
    }

    // Iterate through top level blocks to find if diorama board is present
    var blocks = this.workspace.getAllBlocks();
    var dioPresent = false;
    for (var x = 0; x < blocks.length; x++) {
      var func = blocks[x].getBoardName;
      if (func) {
        var BoardName = func.call(blocks[x]);
        if (BoardName == "diorama") {
          dioPresent = true;
        }
      }
    }
    
    var warning = '';
    if (!dioPresent) {
      warning = Blockly.Msg.ARD_DIO_BOARD_MISSING;
    }
    
    if (warning) {
      // Set a warning to select a valid stepper config
      this.setWarningText(warning, 'dio_louder');
    } else {
      this.setWarningText(null, 'dio_louder');
    }
  }
};

Blockly.Blocks['dio_setvolume'] = {
  init: function() {
    this.appendValueInput('VOLUME')
        .setCheck(Blockly.Types.NUMBER.checkList)
        .appendField(Blockly.Msg.ARD_DIO_SETLOUDNESS);
    this.setInputsInline(true);
    this.setPreviousStatement(true, 'ARD_BLOCK');
    this.setNextStatement(true,'ARD_BLOCK');
    this.setColour(Blockly.Blocks.diorama.HUE);
    this.setTooltip(Blockly.Msg.ARD_DIO_SOUND_TIP);
    this.setHelpUrl('');
  },
  onchange: function(event) {
    if (!this.workspace || event.type == Blockly.Events.MOVE ||
        event.type == Blockly.Events.UI) {
        return;  // Block deleted or irrelevant event
    }

    // Iterate through top level blocks to find if diorama board is present
    var blocks = this.workspace.getAllBlocks();
    var dioPresent = false;
    for (var x = 0; x < blocks.length; x++) {
      var func = blocks[x].getBoardName;
      if (func) {
        var BoardName = func.call(blocks[x]);
        if (BoardName == "diorama") {
          dioPresent = true;
        }
      }
    }
    
    var warning = '';
    if (!dioPresent) {
      warning = Blockly.Msg.ARD_DIO_BOARD_MISSING;
    }
    
    var vol = Blockly.Arduino.valueToCode(this, "VOLUME", Blockly.Arduino.ORDER_ATOMIC);
    if (vol < 0 || vol > 10) {
      warning = Blockly.Msg.ARD_DIO_SOUND_WARNING;
    }
    
    if (warning) {
      // Set a warning to select a valid stepper config
      this.setWarningText(warning, 'dio_setvolume');
    } else {
      this.setWarningText(null, 'dio_setvolume');
    }
  },
};

Blockly.Blocks['dio_playtrack'] = {
  init: function() {
    this.appendValueInput('TRACK')
        .setCheck(Blockly.Types.NUMBER.checkList)
        .appendField(Blockly.Msg.ARD_DIO_PLAYTRACK);
    this.setInputsInline(true);
    this.setPreviousStatement(true, 'ARD_BLOCK');
    this.setNextStatement(true,'ARD_BLOCK');
    this.setColour(Blockly.Blocks.diorama.HUE);
    this.setTooltip(Blockly.Msg.ARD_DIO_TRACK_TIP);
    this.setHelpUrl('');
  },
  onchange: function(event) {
    if (!this.workspace || event.type == Blockly.Events.MOVE ||
        event.type == Blockly.Events.UI) {
        return;  // Block deleted or irrelevant event
    }

    // Iterate through top level blocks to find if diorama board is present
    var blocks = this.workspace.getAllBlocks();
    var dioPresent = false;
    for (var x = 0; x < blocks.length; x++) {
      var func = blocks[x].getBoardName;
      if (func) {
        var BoardName = func.call(blocks[x]);
        if (BoardName == "diorama") {
          dioPresent = true;
        }
      }
    }
    
    var warning = '';
    if (!dioPresent) {
      warning = Blockly.Msg.ARD_DIO_BOARD_MISSING;
    }
    
    var track = Blockly.Arduino.valueToCode(this, "TRACK", Blockly.Arduino.ORDER_ATOMIC);
    if (track < 0 || track > 100) {
      warning = Blockly.Msg.ARD_DIO_TRACK_WARNING;
    }
    if (warning) {
      // Set a warning to select a valid stepper config
      this.setWarningText(warning, 'dio_playtrack');
    } else {
      this.setWarningText(null, 'dio_playtrack');
    }
  },
};

Blockly.Blocks['dio_stoptrack'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_DIO_STOPTRACK);
    this.setInputsInline(true);
    this.setPreviousStatement(true, 'ARD_BLOCK');
    this.setNextStatement(true,'ARD_BLOCK');
    this.setColour(Blockly.Blocks.diorama.HUE);
    this.setTooltip(Blockly.Msg.ARD_DIO_STOPTRACK_TIP);
    this.setHelpUrl('');
  },
  onchange: function(event) {
    if (!this.workspace || event.type == Blockly.Events.MOVE ||
        event.type == Blockly.Events.UI) {
        return;  // Block deleted or irrelevant event
    }

    // Iterate through top level blocks to find if diorama board is present
    var blocks = this.workspace.getAllBlocks();
    var dioPresent = false;
    for (var x = 0; x < blocks.length; x++) {
      var func = blocks[x].getBoardName;
      if (func) {
        var BoardName = func.call(blocks[x]);
        if (BoardName == "diorama") {
          dioPresent = true;
        }
      }
    }
    
    var warning = '';
    if (!dioPresent) {
      warning = Blockly.Msg.ARD_DIO_BOARD_MISSING;
    }
    
    if (warning) {
      // Set a warning to select a valid stepper config
      this.setWarningText(warning, 'dio_stoptrack');
    } else {
      this.setWarningText(null, 'dio_stoptrack');
    }
  },
};

Blockly.Blocks['dio_trackplaying'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_DIO_TRACKPLAYING);
    this.setColour(Blockly.Blocks.diorama.HUE);
    this.setTooltip(Blockly.Msg.ARD_DIO_TRACKPLAYING_TIP);
    this.setOutput(true, Blockly.Types.BOOLEAN.output);
    this.setHelpUrl('');
  },
  onchange: function(event) {
    if (!this.workspace || event.type == Blockly.Events.MOVE ||
        event.type == Blockly.Events.UI) {
        return;  // Block deleted or irrelevant event
    }

    // Iterate through top level blocks to find if diorama board is present
    var blocks = this.workspace.getAllBlocks();
    var dioPresent = false;
    for (var x = 0; x < blocks.length; x++) {
      var func = blocks[x].getBoardName;
      if (func) {
        var BoardName = func.call(blocks[x]);
        if (BoardName == "diorama") {
          dioPresent = true;
        }
      }
    }
    
    var warning = '';
    if (!dioPresent) {
      warning = Blockly.Msg.ARD_DIO_BOARD_MISSING;
    }
    
    if (warning) {
      // Set a warning to select a valid stepper config
      this.setWarningText(warning, 'dio_trackplaying');
    } else {
      this.setWarningText(null, 'dio_trackplaying');
    }
  },
};

Blockly.Blocks['dio_resetbtnpress'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_DIO_RESETBTN);
    this.setColour(Blockly.Blocks.diorama.HUE);
    this.setPreviousStatement(true, 'ARD_BLOCK');
    this.setNextStatement(true,'ARD_BLOCK');
    this.setTooltip(Blockly.Msg.ARD_DIO_RESETBTN_TIP);
    this.setHelpUrl('');
  },
  onchange: function(event) {
    if (!this.workspace || event.type == Blockly.Events.MOVE ||
        event.type == Blockly.Events.UI) {
        return;  // Block deleted or irrelevant event
    }

    // Iterate through top level blocks to find if diorama board is present
    var blocks = this.workspace.getAllBlocks();
    var dioPresent = false;
    for (var x = 0; x < blocks.length; x++) {
      var func = blocks[x].getBoardName;
      if (func) {
        var BoardName = func.call(blocks[x]);
        if (BoardName == "diorama") {
          dioPresent = true;
        }
      }
    }
    
    var warning = '';
    if (!dioPresent) {
      warning = Blockly.Msg.ARD_DIO_BOARD_MISSING;
    }
    
    if (warning) {
      // Set a warning to select a valid stepper config
      this.setWarningText(warning, 'dio_resetbtnpress');
    } else {
      this.setWarningText(null, 'dio_resetbtnpress');
    }
  },
};

Blockly.Blocks['dio_resetbtnnrpress'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_DIO_RESETBTN)
        .appendField(
            new Blockly.FieldDropdown(
                [['1', '1'],
                 ['2', '2'],
                 ['3', '3'],
                 ['4', '4'],
                 ['5', '5'],
                 ['6', '6'],
                 ['7', '7'],
                ]), 'BUTTON')
    this.setInputsInline(true);
    this.setColour(Blockly.Blocks.diorama.HUE);
    this.setPreviousStatement(true, 'ARD_BLOCK');
    this.setNextStatement(true,'ARD_BLOCK');
    this.setTooltip(Blockly.Msg.ARD_DIO_RESETBTNNR_TIP);
    this.setHelpUrl('');
  },
  onchange: function(event) {
    if (!this.workspace || event.type == Blockly.Events.MOVE ||
        event.type == Blockly.Events.UI) {
        return;  // Block deleted or irrelevant event
    }

    // Iterate through top level blocks to find if diorama board is present
    var blocks = this.workspace.getAllBlocks();
    var dioPresent = false;
    for (var x = 0; x < blocks.length; x++) {
      var func = blocks[x].getBoardName;
      if (func) {
        var BoardName = func.call(blocks[x]);
        if (BoardName == "diorama") {
          dioPresent = true;
        }
      }
    }
    
    var warning = '';
    if (!dioPresent) {
      warning = Blockly.Msg.ARD_DIO_BOARD_MISSING;
    }
    
    if (warning) {
      // Set a warning to select a valid stepper config
      this.setWarningText(warning, 'dio_resetbtnpress');
    } else {
      this.setWarningText(null, 'dio_resetbtnpress');
    }
  },
};

Blockly.Blocks['dio_displaytext'] = {
  init: function() {
    this.appendValueInput('TEXT')
        .setCheck(Blockly.Types.TEXT.checkList)
        .appendField(Blockly.Msg.ARD_DIO_DISPLAYTEXT);
    this.setInputsInline(true);
    this.setPreviousStatement(true, 'ARD_BLOCK');
    this.setNextStatement(true,'ARD_BLOCK');
    this.setColour(Blockly.Blocks.diorama.HUE);
    this.setTooltip(Blockly.Msg.ARD_DIO_DISPLAYTEXT_TIP);
    this.setHelpUrl('');
  },
  onchange: function(event) {
    if (!this.workspace || event.type == Blockly.Events.MOVE ||
        event.type == Blockly.Events.UI) {
        return;  // Block deleted or irrelevant event
    }

    // Iterate through top level blocks to find if diorama board is present
    var blocks = this.workspace.getAllBlocks();
    var dioPresent = false;
    for (var x = 0; x < blocks.length; x++) {
      var func = blocks[x].getBoardName;
      if (func) {
        var BoardName = func.call(blocks[x]);
        if (BoardName == "diorama") {
          dioPresent = true;
        }
      }
    }
    
    var warning = '';
    if (!dioPresent) {
      warning = Blockly.Msg.ARD_DIO_BOARD_MISSING;
    }
    
    var txt = Blockly.Arduino.valueToCode(this, "TEXT", Blockly.Arduino.ORDER_ATOMIC);
    // if a string, then check if length is correct
    if (txt[0] == '"' && txt.length-2 > 8) {
      warning = Blockly.Msg.ARD_DIO_DISPLAYTEXT_WARNING;
    }
    if (warning) {
      // Set a warning to select a valid stepper config
      this.setWarningText(warning, 'dio_displaytext');
    } else {
      this.setWarningText(null, 'dio_displaytext');
    }
  },
};
