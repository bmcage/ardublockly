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
        .appendField("Microduino blokken: ");
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
  onchange: function() {
    if (!this.workspace) { return; }  // Block has been deleted.

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
    
    // Get the Board instance from this block
    var board = Blockly.Arduino.Boards.selected;

    if (!(board['name'] == 'Microduino CoreUSB 32U4' || 
        board['name'] == 'MCookie-CoreUSB')) {
      //this.setWarningText('You need to select board MD-CoreUSB to use MD components', 'md_board');
      this.setWarningText('Je moet chip MD-CoreUSB kiezen in de settings om Microduino componenten te gebruiken.', 'md_modules');
    } else if (blockInstanceTwicePresent) {
      this.setWarningText('Je hebt twee keer dit blok staan. Dat is 1 keer teveel!', 'md_modules');
    } else {
      this.setWarningText(null, 'md_modules');
    }
  },
};

// The core block
Blockly.Blocks['mcookie_coreusb'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("../media/MD/MDCoreUsb.png", 19, 19, "*"))
        .appendField("Brein (CoreUSB)");
    this.setPreviousStatement(true, 'MD_BLOCK');
    this.setNextStatement(true, 'MD_BLOCK');
    this.setColour('#F20D33');
    this.setTooltip('Het Brein van je constructie, de MCookie-CoreUSB');
    this.setHelpUrl('https://wiki.microduino.cc/index.php/MCookie-CoreUSB');
  },
  /**
   * Returns the MD block name.
   * @return {!string} MD block name.
   * @this Blockly.Block
   */
  getMDBlockName: function() {
    return 'mcookie_coreusb';
  }
};

// The Hub block
Blockly.Blocks['mcookie_hub'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("../media/MD/MDSensorHub.png", 19, 19, "*"))
        .appendField("De kabelhouder (Sensor Hub)");
    this.appendValueInput("HUB01-IIC")
        .setCheck("MD_IIC")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("verbonden met ingang:   IIC"); //1
    this.appendValueInput("HUB02-IIC")
        .setCheck("MD_IIC")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("IIC (2)"); //2
    this.appendValueInput("HUB03-0/1")
        .setCheck(["MD_HUB_DIG", "MD_HUB_DIGOUT"])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("0/ 1"); //3
    this.appendValueInput("HUB04-2/3")
        .setCheck(["MD_HUB_DIG", "MD_HUB_DIGOUT"])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("2/ 3"); //4
    this.appendValueInput("HUB05-4/5")
        .setCheck(["MD_HUB_DIG","MD_SERVO", "MD_HUB_DIGOUT"])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("4/ 5"); //5
    this.appendValueInput("HUB06-6/7")
        .setCheck(["MD_HUB_DIG","MD_SERVO", "MD_HUB_DIGOUT"])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("6/ 7"); //6
    this.appendValueInput("HUB07-8/9")
        .setCheck(["MD_HUB_DIG","MD_SERVO", "MD_HUB_DIGOUT"])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("8/ 9"); //7
    this.appendValueInput("HUB08-10/11")
        .setCheck(["MD_HUB_DIG", "MD_HUB_DIGOUT"])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("10/11"); //8
    this.appendValueInput("HUB09-12/13")
        .setCheck(["MD_HUB_DIG", "MD_HUB_DIGOUT"])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("12/13"); //9
    this.appendValueInput("HUB10-A6/A7")
        .setCheck(["MD_HUB_DIG", "MD_HUB_ANA"])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("A6/A7"); //10
    this.appendValueInput("HUB11-A2/A3")
        .setCheck(["MD_HUB_DIG", "MD_HUB_ANA"])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("A2/A3"); //11
    this.appendValueInput("HUB12-A0/A1")
        .setCheck(["MD_HUB_DIG", "MD_HUB_ANA"])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("A0/A1"); //12
    this.setPreviousStatement(true, "MD_BLOCK");
    this.setNextStatement(true, "MD_BLOCK");
    this.setColour('#47EBCF');
    this.setTooltip('De Hub laat je toe 12 sensoren te koppelen aan je Microduino');
    this.setHelpUrl('http://www.example.com/');
  }
};

//the power block
Blockly.Blocks['mcookie_power'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("../media/MD/MDBatteryModule.png", 19, 19, "*"))
        .appendField("AAA Batterij module");
    this.setPreviousStatement(true, "MD_BLOCK");
    this.setNextStatement(true, "MD_BLOCK");
    this.setColour('#47EBCF');
    this.setTooltip('De batterij Microduino, ');
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
        .appendField(new Blockly.FieldImage("../media/MD/MDAudioModule.png", 15, 19, "*"))
        .appendField("Geluidsmodules (Audio). Mode:")
        .appendField(new Blockly.FieldDropdown([
	    ["Loop all the time", "MODE_ALL"], 
	    ["Loop once",         "MODE_FOL"], 
	    ["Single cycle",      "MODE_ONE"], 
	    ["Play once",         "MODE_ONE_STOP"]]), "MODE")
        .appendField("Volume:");
    this.appendValueInput('VOLUME')
        .setCheck(Blockly.Types.NUMBER.checkList);
    this.setInputsInline(true);
    this.setPreviousStatement(true, "MD_BLOCK");
    this.setNextStatement(true, "MD_BLOCK");
    this.setColour('#D9D926');
    this.setTooltip('Audio Functie Module, kies een mode en een volume');
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
  onchange: function() {
    if (!this.workspace) { return; }  // Block has been deleted.

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
      this.setWarningText('Een Brein (CoreUSB) module moet toegevoegd worden aan je blokken', 'mcookie_audio_setup');
    } else if (!BMInstancePresent) {
      this.setWarningText('Een AAA Batterij module moet toegevoegd worden aan je blokken als je met geluid werkt', 'mcookie_audio_setup');
    } else if (!amplifierInstancePresent) {
      this.setWarningText('Een Luidspreker module (Amplifier) moet toegevoegd worden aan je blokken', 'mcookie_audio_setup');
    } else {
      this.setWarningText(null, 'mcookie_audio_setup');
    }
  }
};

//speaker block
Blockly.Blocks['mcookie_audio_amplifier'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("../media/MD/MDAudioSpeaker.png", 19, 19, "*"))
        .appendField("Luidspreker (Amplifier Module)");
    this.setPreviousStatement(true, "MD_BLOCK");
    this.setNextStatement(true, "MD_BLOCK");
    this.setColour('#47EBCF');
    this.setTooltip('Amplifier module, koppel de luidspreker aan deze module om geluid te horen.');
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
  onchange: function() {
    if (!this.workspace) { return; }  // Block has been deleted.

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
      this.setWarningText('Een Brein (CoreUSB) module moet toegevoegd worden aan je blokken', 'mcookie_audio_setup');
    } else if (!audioInstancePresent) {
      this.setWarningText('Een Audio module moet toegevoegd worden aan je blokken om met de luidspreker te werken', 'mcookie_audio_setup');
    } else if (!BMInstancePresent) {
      this.setWarningText('Een AAA Batterij module moet toegevoegd worden aan je blokken als je met geluid werkt', 'mcookie_audio_setup');
    } else {
      this.setWarningText(null, 'mcookie_audio_setup');
    }
  }
};