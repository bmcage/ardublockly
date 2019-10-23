/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Generating Microduino code for procedure (function) blocks.
 *
 */
'use strict';

goog.provide('Blockly.Arduino.ledup_blocks');

goog.require('Blockly.Arduino');


/**
 * The Hub block for LedUpKidz
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['ledup_hub'] = function(block) {
  
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
      console.log('Unexpected code in mcookie_hub', code);
    }
    return code;
  }
  
  var code = '';
  var nr;
  
  var target = block.getFieldValue('TARGET');
  
  if (target == "DEST_PROTOTYPE") {
    var blockinputs = [["LED-0", ['2']], ["LED-1", ['3']], ["LED-2", ['4']], ["LED-3", ['5']],
                       ["LED-4", ['6']], ["LED-5", ['7']] ];
    code += '// Attiny wiring of the LED0 to 5\n' +
              '/*' +
              'int LED0 = 5;// RESET\n' +
              'boolean LED0_ON = LOW;\n' +
              'int LED1 = 2;// SCK\n' +
              'boolean LED1_ON = LOW;\n' +
              'int LED2 = 1;// MISO\n' +
              'boolean LED2_ON = LOW;\n' +
              'int LED3 = 0;// MOSI\n' +
              'boolean LED3_ON = LOW;\n' +
              'int LED4 = 4;// PB4\n' +
              'boolean LED4_ON = LOW;\n' +
              'int LED5 = 3;// PB3\n' +
              'boolean LED5_ON = LOW;\n' +
              '*/\n';
  } else {
    var blockinputs = [["LED-0", ['5']], ["LED-1", ['2']], ["LED-2", ['1']], ["LED-3", ['0']],
                       ["LED-4", ['4']], ["LED-5", ['3']] ];
    code += '// Prototype wiring of the LED0 to 5\n' +
              '/*' +
              'int LED0 = 2;// RESET\n' +
              'boolean LED0_ON = LOW;\n' +
              'int LED1 = 3;// SCK\n' +
              'boolean LED1_ON = LOW;\n' +
              'int LED2 = 4;// MISO\n' +
              'boolean LED2_ON = LOW;\n' +
              'int LED3 = 5;// MOSI\n' +
              'boolean LED3_ON = LOW;\n' +
              'int LED4 = 6;// PB4\n' +
              'boolean LED4_ON = LOW;\n' +
              'int LED5 = 7;// PB3\n' +
              'boolean LED5_ON = LOW;\n' +
              '*/\n';
  }
  for (nr in blockinputs) {
    parseInput(block, blockinputs[nr][0], blockinputs[nr][1]);
  }

  Blockly.Arduino.addInclude('ledupkidz', code);

  return '';
};


/**
 * Function for setting a specific LED of LedUpKidz to a state.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['ledupkidz_led_onoff'] = function(block) {
  var LEDNumber = Blockly.Arduino.valueToCode(
      block, 'LEDUPKIDZ_LEDNUMBER', Blockly.Arduino.ORDER_ATOMIC) || '0';
  // Number goes from 0 to 5, for safety, we use remainder so always a number from 0 to 5 is obtained     
  var  stateOutput = Blockly.Arduino.valueToCode(
      block, 'STATE', Blockly.Arduino.ORDER_ATOMIC) || 'true';
  var  x,
    blockinputs = [["LED-0", '0'], ["LED-1", '1'], ["LED-2", '2'], ["LED-3", '3'], ["LED-4", '4'], ["LED-5", '5']],
    //find the ledupkidzhub
    blocks = block.workspace.getAllBlocks(),
    hub;
  for (x = 0; x < blocks.length; x++) {
    var func = blocks[x].getLedUpKidzInstance;
    if (func) {
      hub = blocks[x];
    }
  }
  var setfunc = 'void set_ledupkidz_onoff(int lednrin, boolean state) {\n  if (lednrin < 0) {\n    // negative number, shift to positive with multiple of 6\n    lednrin = lednrin + (lednrin/6-1) * (-6);\n  }\n  int lednr = int(lednrin) % 6; // should be number from 0 to 5!\n',
    LEDvar,
    hubblocknr,
    start = 'if';
  if (hub) {
    
    for (hubblocknr in blockinputs) {
      LEDvar = 'LED' + blockinputs[hubblocknr][1];
      var targetBlock = hub.getInputTargetBlock(blockinputs[hubblocknr][0]);
      if (targetBlock && targetBlock.getFieldValue && targetBlock.getFieldValue('LEDNAME')) {
        LEDvar = targetBlock.getFieldValue('LEDNAME');
      }
      setfunc += "  " + start + " (lednr == " + blockinputs[hubblocknr][1] + " && state)  { digitalWrite(" + LEDvar + ",  " + LEDvar + "_ON);}\n";
      start = "else if";
      setfunc += "  " + start + " (lednr == " + blockinputs[hubblocknr][1] + " && !state) { digitalWrite(" + LEDvar + ", !" + LEDvar + "_ON);}\n";
    }
  }
  setfunc += '}\n';
    
  Blockly.Arduino.addDeclaration('ledupkidz_onoff', setfunc);
  
  var code = 'set_ledupkidz_onoff(' + LEDNumber + ', ' + stateOutput + ');\n';
  return code;
}
