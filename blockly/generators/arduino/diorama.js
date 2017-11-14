/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Generating Microduino code for procedure (function) blocks.
 *
 */
'use strict';

goog.provide('Blockly.Arduino.diorama');

goog.require('Blockly.Arduino');

/**
 * Function setting volume on diorama louder.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['dio_louder'] = function(block) {
  var code = `
void DOIvolLouder() {
  if (DIOvolume >= 10)
  {
    DIOvolume = DIOvolume - 10;
  } else { 
    DIOvolume = 0;
  }
  DIOMP3player.setVolume(DIOvolume, DIOvolume);
}
`
  Blockly.Arduino.addFunction('DIOvolLouder', code);
  return 'DOIvolLouder();\nDIObtn_stoprunning();\n';
};

/**
 * Function setting volume on diorama less loud.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['dio_quieter'] = function(block) {
  var code = `
void DOIvolQuieter() {
  if (DIOvolume < 245)
  {
    DIOvolume = DIOvolume + 10;
  } else { 
    DIOvolume = 255;
  }
  DIOMP3player.setVolume(DIOvolume, DIOvolume);
}
`
  Blockly.Arduino.addFunction('DOIvolQuieter', code);
  return 'DOIvolQuieter();\nDIObtn_stoprunning();\n';
};

/**
 * Function setting volume on diorama less loud.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['dio_setvolume'] = function(block) {
  var volume = Blockly.Arduino.valueToCode(
      block, 'VOLUME', Blockly.Arduino.ORDER_ATOMIC) || '7';
  volume = 255 - volume*25;
  return 'DIOvolume = ' + volume + '; DIOMP3player.setVolume(DIOvolume, DIOvolume);\n';
};

/**
 * Function for playing a track number.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['dio_playtrack'] = function(block) {
  var track = Blockly.Arduino.valueToCode(
      block, 'TRACK', Blockly.Arduino.ORDER_ATOMIC) || '1';
  var code = `if (DIOtracknrplaying != %1)  { //!DIOMP3player.isPlaying() ||
  DIOMP3player.stopTrack();
  uint8_t result = DIOMP3player.playTrack(%1);
}
DIOtracknrplaying = %1;
`
  return code.replace('%1', track).replace('%1', track).replace('%1', track);
};

/**
 * Function to stop playing a track number.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['dio_stoptrack'] = function(block) {
  return 'if (DIOMP3player.isPlaying()) {DIOMP3player.stopTrack();}\n';
};

/**
 * Function to determine if a track is playing
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['dio_trackplaying'] = function(block) {
  return 'DIOMP3player.isPlaying()';
};

/**
 * Function to reset the button presses
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['dio_resetbtnpress'] = function(block) {
  return 'DIObtn_stoprunning();\n';
};

/**
 * Function to stop a button press
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['dio_resetbtnnrpress'] = function(block) {
  var nr = block.getFieldValue('BUTTON');
  var code = `if (DIOLastBtnPushed == %1) {DIOLastBtnPushed = 0;}
DIOBtn%1Running = false;
`
  return code.replace('%1', nr).replace('%1', nr);
};
/**
 * Function for displaying text on the display.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['dio_displaytext'] = function(block) {
  var text = Blockly.Arduino.valueToCode(
      block, 'TEXT', Blockly.Arduino.ORDER_ATOMIC) || 'no text';
  return 'DIOmodule.setDisplayToString(' + text + ');\n';
};

