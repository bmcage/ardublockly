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

goog.provide('Blockly.Blocks.md_audio');

goog.require('Blockly.Blocks');


/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.md_audio.HUE = 250;

Blockly.Blocks['mcookie_audio_play'] = {
  init: function() {
    this.appendValueInput("AUDIONAME")
        .appendField(new Blockly.FieldImage("../media/MD/MDAudioModule.png", 15, 19, "*"))
        .appendField(Blockly.Msg.ARD_MD_AUDIO_PLAYNR)
        .setCheck(Blockly.Types.NUMBER.checkList);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_MD_AUDIO_PLAY);
    this.setInputsInline(true);
    this.setPreviousStatement(true, 'ARD_BLOCK');
    this.setNextStatement(true, 'ARD_BLOCK');
    this.setColour(Blockly.Blocks.md_audio.HUE);
    this.setTooltip(Blockly.Msg.ARD_MD_AUDIO_PLAY_TIP);
    this.setHelpUrl('https://wiki.microduino.cc/index.php/MCookie-Audio');
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
    for (var x = 0; x < blocks.length; x++) {
      var func = blocks[x].getMDBlockName;
      if (func) {
        var BlockInstanceName = func.call(blocks[x]);
        if (BlockInstanceName == 'mcookie_audio_setup') {
          audioInstancePresent = true;
        }
      }
    }

    if (!audioInstancePresent) {
      this.setWarningText(Blockly.Msg.ARD_MD_AUDIOSOUNDWARN, 'mcookie_audio_play');
    } else {
      this.setWarningText(null, 'mcookie_audio_play');
    }
  }
};

Blockly.Blocks['mcookie_audio_pause'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("../media/MD/MDAudioModule.png", 15, 19, "*"))
        .appendField(Blockly.Msg.ARD_MD_AUDIO_PAUSE);
    this.setPreviousStatement(true, 'ARD_BLOCK');
    this.setNextStatement(true, 'ARD_BLOCK');
    this.setColour(Blockly.Blocks.md_audio.HUE);
    this.setTooltip(Blockly.Msg.ARD_MD_AUDIO_PAUSE_TIP);
    this.setHelpUrl('https://wiki.microduino.cc/index.php/MCookie-Audio');
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
    for (var x = 0; x < blocks.length; x++) {
      var func = blocks[x].getMDBlockName;
      if (func) {
        var BlockInstanceName = func.call(blocks[x]);
        if (BlockInstanceName == 'mcookie_audio_setup') {
          audioInstancePresent = true;
        }
      }
    }

    if (!audioInstancePresent) {
      this.setWarningText(Blockly.Msg.ARD_MD_AUDIOSOUNDWARN, 'mcookie_audio_pause');
    } else {
      this.setWarningText(null, 'mcookie_audio_pause');
    }
  }
};