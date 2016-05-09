/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Generating Microduino code for procedure (function) blocks.
 *
 */
'use strict';

goog.provide('Blockly.Arduino.md_core');

goog.require('Blockly.Arduino');


/**
 * Code generator to define the used MD blocks.
 * Its use is not mandatory, but necessary to use the microduino blocks
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['md_modules'] = function(block) {
  var MDblocksBranch = Blockly.Arduino.statementToCode(block, 'MD_BLOCKS');
  if (MDblocksBranch) {
    // blocks should only init data ... 
    console.log('Unexpected code in MDblocksBranch', MDblocksBranch)
  }

  return '';
};


/**
 * The core MCookie block
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['mcookie_coreusb'] = function(block) {  
  var code = '';
  return code;
};

/**
 * The Hub MCookie block
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['mcookie_hub'] = function(block) {
  
  function parseInput(block, name, connectors) {
    var targetBlock = block.getInputTargetBlock(name);
    if (targetBlock) {
      targetBlock.setHubConnector(connectors);
    }
    var code = Blockly.Arduino.blockToCode(targetBlock);
    if (!goog.isString(code)) {
      throw 'Expecting code from statement block "' + targetBlock.type + '".';
    }
    if (code) {
      // blocks should only init data ... 
      console.log('Unexpected code in mcookie_hub', code)
    }
    return code;
  }
  
  var code = '';
  var blockinputs = [
          ["HUB01-IIC", ['SDA', 'SCL']],
          ["HUB02-IIC", ['SDA', 'SCL']],
          ["HUB03-0/1", ['0', '1']],
          ["HUB04-2/3", ['2', '3']],
          ["HUB05-4/5", ['4', '5']],
          ["HUB06-6/7", ['6', '7']],
          ["HUB07-8/9", ['8', '9']],
          ["HUB08-10/11", ['10', '11']],
          ["HUB09-12/13", ['12', '13']],
          ["HUB10-A6/A7", ['A6', 'A7']],
          ["HUB11-A2/A3", ['A2', 'A3']],
          ["HUB12-A0/A1", ['A0', 'A1']]
                    ];
  for (var nr in blockinputs) {
    parseInput(block, blockinputs[nr][0], blockinputs[nr][1]);
  }
  
  return '';
};

/**
 * The BM-shield MCookie block
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['mcookie_power'] = function(block) {
  //power only needs to be connected, no code needed
  var code = '';
  return code;
};

/**
 * The Audio setup MCookie block
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['mcookie_audio_setup'] = function(block) {
  //audio block setup code:
  var volume =  Blockly.Arduino.valueToCode(
      block, 'VOLUME', Blockly.Arduino.ORDER_ATOMIC) || '10';
  var mode = block.getFieldValue('MODE');
  var audio_setup_code = 
'AUDIO.init(DEVICE_TF, ' + mode + ', ' + volume + ');\n' +
'  AUDIO.choose(1);\n' +
'  AUDIO.pause();\n';
  
  Blockly.Arduino.addInclude('MD_softwareserial', '#include <SoftwareSerial.h>');
  Blockly.Arduino.addInclude('MD_audio', '#include "Microduino_Audio.h"');
  
  Blockly.Arduino.addDeclaration('MD_softwareserial', 'SoftwareSerial MDSerial(2, 3);');
  Blockly.Arduino.addDeclaration('MD_audio', 'JQ6500 AUDIO(&MDSerial);');

  Blockly.Arduino.addSetup('MD_audio', audio_setup_code, true);
  
  var code = '';
  return code;
};

/**
 * The Amplifier MCookie block
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['mcookie_audio_amplifier'] = function(block) {
  //power only needs to be connected, no code needed
  var code = '';
  return code;
};
