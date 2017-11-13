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

goog.provide('Blockly.Blocks.md_core');

goog.require('Blockly.Blocks');


/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.md_core.HUE = 290;

Blockly.Blocks['md_modules'] = {
  /**
   * Extended Block for defining the Microduino specific blocks, 
   * listing the mcookies used
   * @this Blockly.Block
   */
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_MD_BLOCKS);
    this.appendStatementInput("MD_BLOCKS")
        .setCheck('MD_BLOCK');
    this.setInputsInline(false);
    this.setColour(Blockly.Blocks.md_core.HUE);
    this.setTooltip(Blockly.Msg.ARD_FUN_RUN_TIP);
    this.setHelpUrl('https://arduino.cc/en/Reference/Loop');
    this.contextMenu = false;
  },
  /**
   * Returns the MD block name.
   * @return {!string} MD block name.
   * @this Blockly.Block
   */
  getMDBlockName: function() {
    return 'md_modules';
  },
  /**
   * Called whenever anything on the workspace changes.
   * It checks the board and attaches a warning to this
   * block if not valid data is found.
   * @this Blockly.Block
   */
  onchange: function(event) {
    if (!this.workspace || event.type == Blockly.Events.MOVE ||
        event.type == Blockly.Events.UI) {
        return;  // Block deleted or irrelevant event
    }

    // Iterate through top level blocks to find Amplifier module
    var blocks = Blockly.mainWorkspace.getTopBlocks();
    var blockInstancePresent = false;
    var blockInstanceTwicePresent = false;
    for (var x = 0; x < blocks.length; x++) {
      var func = blocks[x].getMDBlockName;
      if (func) {
        var BlockInstanceName = func.call(blocks[x]);
        if (blockInstancePresent && BlockInstanceName == 'md_modules') {
          blockInstanceTwicePresent = true;
        } else if (BlockInstanceName == 'md_modules') {
          blockInstancePresent = true;
        }
      }
    }

    if (blockInstanceTwicePresent) {
      this.setWarningText(Blockly.Msg.ARD_BLOCKS, 'md_modules');
    } else {
      this.setWarningText(null, 'md_modules');
    }
  },
};

// The core block
Blockly.Blocks['mcookie_coreusb'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("media/MD/MDCoreUsb.png", 19, 19, "*"))
        .appendField(Blockly.Msg.ARD_MD_COREBLOCK);
    this.setPreviousStatement(true, 'MD_BLOCK');
    this.setNextStatement(true, 'MD_BLOCK');
    this.setColour('#F20D33');
    this.setTooltip(Blockly.Msg.ARD_MD_COREBLOCK_TIP);
    this.setHelpUrl('https://wiki.microduino.cc/index.php/MCookie-CoreUSB');
  },
  /**
   * Returns the Arduino Board name that is required for this block.
   * @return {!string} Board name.
   * @this Blockly.Block
   */
  getBoardName: function() {
    return 'mdcookiecoreusb';
  },
  /**
   * Returns the MD block name.
   * @return {!string} MD block name.
   * @this Blockly.Block
   */
  getMDBlockName: function() {
    return 'mcookie_coreusb';
  },
  /**
   * Called whenever anything on the workspace changes.
   * It checks if the board selected corresponds to the what it should be
   * block if not valid data is found.
   * @this Blockly.Block
   */
  onchange: function(event) {
    if (!this.workspace || event.type == Blockly.Events.MOVE ||
        event.type == Blockly.Events.UI) {
        return;  // Block deleted or irrelevant event
    }

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
      }
    }
    
    if (otherBoardPresent) {
      // Set a warning to select a valid stepper config
      this.setWarningText(Blockly.Msg.ARD_BOARD_WARN.replace('%1', Blockly.Msg.ARD_MD_COOKIEBUTTON_COMPONENT));
    } else {
      Blockly.Arduino.Boards.changeBoard(this.workspace, this.getBoardName());
      this.setWarningText(null);
    }
  }
};

// The Hub block
Blockly.Blocks['mcookie_hub'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("media/MD/MDSensorHub.png", 19, 19, "*"))
        .appendField(Blockly.Msg.ARD_MD_HUBBLOCK);
    this.appendValueInput("HUB01-IIC")
        .setCheck("MD_IIC")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.ARD_MD_HUBBLOCK01); //1
    this.appendValueInput("HUB02-IIC")
        .setCheck("MD_IIC")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("IIC (2)"); //2
    this.appendValueInput("HUB03-0/1")
        .setCheck(["HUB_DIG", "HUB_DIGOUT"])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("0/ 1"); //3
    this.appendValueInput("HUB04-2/3")
        .setCheck(["HUB_DIG", "HUB_DIGOUT"])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("2/ 3"); //4
    this.appendValueInput("HUB05-4/5")
        .setCheck(["HUB_DIG","HUB_PWM", "HUB_DIGOUT", "MD_HUB_PWM"])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("4/ 5"); //5
    this.appendValueInput("HUB06-6/7")
        .setCheck(["HUB_DIG","HUB_PWM", "HUB_DIGOUT", "MD_HUB_PWM"])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("6/ 7"); //6
    this.appendValueInput("HUB07-8/9")
        .setCheck(["HUB_DIG","HUB_PWM", "HUB_DIGOUT", "MD_HUB_PWM"])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("8/ 9"); //7
    this.appendValueInput("HUB08-10/11")
        .setCheck(["HUB_DIG", "HUB_DIGOUT"])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("10/11"); //8
    this.appendValueInput("HUB09-12/13")
        .setCheck(["HUB_DIG", "HUB_DIGOUT"])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("12/13"); //9
    this.appendValueInput("HUB10-A6/A7")
        .setCheck(["HUB_DIG", "MD_HUB_ANA"])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("A6/A7"); //10
    this.appendValueInput("HUB11-A2/A3")
        .setCheck(["HUB_DIG", "MD_HUB_ANA"])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("A2/A3"); //11
    this.appendValueInput("HUB12-A0/A1")
        .setCheck(["HUB_DIG", "MD_HUB_ANA"])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("A0/A1"); //12
    this.setPreviousStatement(true, "MD_BLOCK");
    this.setNextStatement(true, "MD_BLOCK");
    this.setColour('#47EBCF');
    this.setTooltip(Blockly.Msg.ARD_MD_HUBBLOCK_TIP);
    this.setHelpUrl('https://wiki.microduino.cc/index.php/MCookie-Hub');
  }
};

//the power block
Blockly.Blocks['mcookie_power'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("media/MD/MDBatteryModule.png", 19, 19, "*"))
        .appendField(Blockly.Msg.ARD_MD_AAABLOCK);
    this.setPreviousStatement(true, "MD_BLOCK");
    this.setNextStatement(true, "MD_BLOCK");
    this.setColour('#47EBCF');
    this.setTooltip(Blockly.Msg.ARD_MD_AAABLOCK_TIP);
    this.setHelpUrl('https://wiki.microduino.cc/index.php/MCookie-BM_shield');
  },
  /**
   * Returns the MD block name.
   * @return {!string} MD block name.
   * @this Blockly.Block
   */
  getMDBlockName: function() {
    return 'mcookie_power';
  }
};

//the audio blocks
Blockly.Blocks['mcookie_audio_setup'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("media/MD/MDAudioModule.png", 15, 19, "*"))
        .appendField(Blockly.Msg.ARD_MD_AUDIOBLOCK)
        .appendField(new Blockly.FieldDropdown([
	    [Blockly.Msg.ARD_MD_AUDIO_REP1, "MODE_ALL"], //Loop all the time
	    [Blockly.Msg.ARD_MD_AUDIO_REP2, "MODE_FOL"], //Loop once
	    [Blockly.Msg.ARD_MD_AUDIO_REP3, "MODE_ONE"], 
	    [Blockly.Msg.ARD_MD_AUDIO_REP4, "MODE_ONE_STOP"]]), "MODE")
        .appendField("Volume:");
    this.appendValueInput('VOLUME')
        .setCheck(Blockly.Types.NUMBER.checkList);
    this.setInputsInline(true);
    this.setPreviousStatement(true, "MD_BLOCK");
    this.setNextStatement(true, "MD_BLOCK");
    this.setColour('#D9D926');
    this.setTooltip(Blockly.Msg.ARD_MD_AUDIOBLOCK_TIP);
    this.setHelpUrl('https://wiki.microduino.cc/index.php/MCookie-Audio');
  },
  /**
   * Returns the MD block name.
   * @return {!string} MD block name.
   * @this Blockly.Block
   */
  getMDBlockName: function() {
    return 'mcookie_audio_setup';
  },
  /**
   * Called whenever anything on the workspace changes.
   * It checks the instances of MD blocks and attaches a warning to this
   * block if not valid data is found.
   * @this Blockly.Block
   */
  onchange: function(event) {
    if (!this.workspace || event.type == Blockly.Events.MOVE ||
        event.type == Blockly.Events.UI) {
        return;  // Block deleted or irrelevant event
    }

    // Iterate through top level blocks to find Amplifier module
    var blocks = Blockly.mainWorkspace.getAllBlocks();
    var amplifierInstancePresent = false;
    var BMInstancePresent = false;
    var CoreInstancePresent = false;
    for (var x = 0; x < blocks.length; x++) {
      var func = blocks[x].getMDBlockName;
      if (func) {
        var BlockInstanceName = func.call(blocks[x]);
        if (BlockInstanceName == 'mcookie_audio_amplifier') {
          amplifierInstancePresent = true;
        }
        else if (BlockInstanceName == 'mcookie_power') {
          BMInstancePresent = true;
        }
        else if (BlockInstanceName == 'mcookie_coreusb') {
          CoreInstancePresent = true;
        }
      }
    }

    if (!CoreInstancePresent) {
      this.setWarningText(Blockly.Msg.ARD_MD_COREWARN, 'mcookie_audio_setup');
    } else if (!BMInstancePresent) {
      this.setWarningText(Blockly.Msg.ARD_MD_AAASOUNDWARN, 'mcookie_audio_setup');
    } else if (!amplifierInstancePresent) {
      this.setWarningText(Blockly.Msg.ARD_MD_AMPWARN, 'mcookie_audio_setup');
    } else {
      this.setWarningText(null, 'mcookie_audio_setup');
    }
  }
};

//speaker block
Blockly.Blocks['mcookie_audio_amplifier'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("media/MD/MDAudioSpeaker.png", 19, 19, "*"))
        .appendField(Blockly.Msg.ARD_MD_AMPBLOCK);
    this.setPreviousStatement(true, "MD_BLOCK");
    this.setNextStatement(true, "MD_BLOCK");
    this.setColour('#47EBCF');
    this.setTooltip(Blockly.Msg.ARD_MD_AMPBLOCK_TIP);
    this.setHelpUrl('https://wiki.microduino.cc/index.php/MCookie-Amplifier');
  },
  /**
   * Returns the MD block name.
   * @return {!string} MD block name.
   * @this Blockly.Block
   */
  getMDBlockName: function() {
    return 'mcookie_audio_amplifier';
  },
  /**
   * Called whenever anything on the workspace changes.
   * It checks the instances of MD blocks and attaches a warning to this
   * block if not valid data is found.
   * @this Blockly.Block
   */
  onchange: function(event) {
    if (!this.workspace || event.type == Blockly.Events.MOVE ||
        event.type == Blockly.Events.UI) {
        return;  // Block deleted or irrelevant event
    }

    // Iterate through top level blocks to find Amplifier module
    var blocks = Blockly.mainWorkspace.getAllBlocks();
    var audioInstancePresent = false;
    var BMInstancePresent = false;
    var CoreInstancePresent = false;
    for (var x = 0; x < blocks.length; x++) {
      var func = blocks[x].getMDBlockName;
      if (func) {
        var BlockInstanceName = func.call(blocks[x]);
        if (BlockInstanceName == 'mcookie_audio_setup') {
          audioInstancePresent = true;
        }
        else if (BlockInstanceName == 'mcookie_power') {
          BMInstancePresent = true;
        }
        else if (BlockInstanceName == 'mcookie_coreusb') {
          CoreInstancePresent = true;
        }
      }
    }

    if (!CoreInstancePresent) {
      this.setWarningText(Blockly.Msg.ARD_MD_COREWARN, 'mcookie_audio_setup');
    } else if (!audioInstancePresent) {
      this.setWarningText(Blockly.Msg.ARD_MD_AUDIOAMPWARN, 'mcookie_audio_setup');
    } else if (!BMInstancePresent) {
      this.setWarningText(Blockly.Msg.ARD_MD_AAASOUNDWARN, 'mcookie_audio_setup');
    } else {
      this.setWarningText(null, 'mcookie_audio_setup');
    }
  }
};
