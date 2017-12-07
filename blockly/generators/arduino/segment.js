/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Arduino code generator for the 7segment library blocks.
 */
'use strict';

goog.provide('Blockly.Arduino.segment');

goog.require('Blockly.Arduino');

/**
 * The 7Segment setup block
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['segment_config_hub'] = function(block) {
    function parseInput(block, nr) {
        var targetBlock = block.getInputTargetBlock(blockInputs[nr][0]);
        if(targetBlock) {
            //var connectors = targetBlock['connector'] || ['0', '1'];
            blockInputs[nr][1] = targetBlock.getFieldValue('PIN');//connectors[0];
            blockInputs[nr][2] = targetBlock.getFieldValue('POLARITY');//connectors[1];
        }
        var code = Blockly.Arduino.blockToCode(targetBlock);
        if (!goog.isString(code)) {
            throw 'Expecting code from statement block "' + targetBlock.type + '".';
        }
        if (code) {
            // blocks should only init data ... 
            console.log('Unexpected code in segment_hub', code);
        }
        return code;   
    }

    var code = '';
    var blockInputs = [["SEG_A", '0', 'HIGH'], ["SEG_B", '1', 'HIGH'], ["SEG_C", '2', 'HIGH'], ["SEG_D", '3', 'HIGH'], ["SEG_E", '4', 'HIGH'], ["SEG_F", '5', 'HIGH'], ["SEG_G", '6', 'HIGH'], ["SEG_DP", '7', 'HIGH']];
    
    for (var nr in blockInputs) {
        parseInput(block, nr);
        Blockly.Arduino.addVariable(blockInputs[nr][0], 'int ' + blockInputs[nr][0] + ' = ' + blockInputs[nr][1] + ';\nboolean ' + blockInputs[nr][0] + '_ON = ' + blockInputs[nr][2] + ';', true);
    }

    return '';
};

/**
 * Code generator for config 7-segment PIN
 */
Blockly.Arduino['segment_pin'] = function(block) {
    var pin = block.getFieldValue('PIN');
    var polarity = block.getFieldValue('POLARITY');
    var SEGon = 'HIGH';
    if(polarity == 'neg') {
        SEGon = 'LOW';
    }
    //the hub saved the connector in the attached block
    //var hubconnector = block['connector'] || ['0', '1']
    //compute the pins, normally only possible to attach at valid pins
    //var test = hubconnector[1];
    //console.log(test);
    block.setHubConnector([pin, SEGon]);
    
    Blockly.Arduino.reservePin(
        block, pin, Blockly.Arduino.PinTypes.OUTPUT, 'Digital Write');
    
    var pinSetupCode = 'pinMode(' + pin + ', OUTPUT);';
    Blockly.Arduino.addSetup('segment_' + pin, pinSetupCode, false);

    this.workspace.render();
    return '';
};

/**
 * Code generator to set a number on the 7-segment
 */
Blockly.Arduino['segment_write_number'] = function (block) {
    var name = block.getFieldValue('SEG_NAME');
    var blockInputs = [["SEG_A", '0'], ["SEG_B", '1'], ["SEG_C", '2'], ["SEG_D", '3'],
        ["SEG_E", '4'], ["SEG_F", '5'], ["SEG_G", '6'], ["SEG_DP", '7']];
    
    // Find the segment_hub to get the pin values for each segment (eg. segA = digital pin 1)
    var blocks = block.workspace.getAllBlocks();
    var hub;
    for (var i = 0; i < blocks.length; i++) {
        var func = blocks[i].getSegmentInstance;
        if (func) {
            hub = blocks[i];
        }
    }
    var code = '';
    if (hub) {
        for (var hubNr in blockInputs) {
            var targetBlock = hub.getInputTargetBlock(blockInputs[hubNr][0]);
            if (targetBlock && targetBlock['connector'][0] != 'undefined') {
                blockInputs[hubNr][1] = targetBlock['connector'][0];
            }
        }
    }

    // Get the number value from the block
    var stateOutput = Blockly.Arduino.valueToCode(block, 'SEG_VAL', Blockly.Arduino.ORDER_ATOMIC) || '0';
    //Blockly.Arduino.addDeclaration('write_' + name, 'int ' + name + '_Nr = ' + stateOutput + ';\n');
    
    // Write the code for output
    var code = 'void WriteNumber(int Segment_Nr) {\n  ' +
        'if(Segment_Nr == 0) {\n      ' +
        'digitalWrite(' + blockInputs[0][0] + ', ' + blockInputs[0][0] + '_ON);\n      ' +
        'digitalWrite(' + blockInputs[1][0] + ', ' + blockInputs[1][0] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[2][0] + ', ' + blockInputs[2][0] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[3][0] + ', ' + blockInputs[3][0] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[4][0] + ', ' + blockInputs[4][0] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[5][0] + ', ' + blockInputs[5][0] + '_ON);\n      ' +
        'digitalWrite(' + blockInputs[6][0] + ', !' + blockInputs[6][0] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[7][0] + ', !' + blockInputs[7][0] + '_ON);\n  }';
    // == 1
    code += ' else if(Segment_Nr == 1) {\n      ' + 
        'digitalWrite(' + blockInputs[0][0] + ', !' + blockInputs[0][0] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[1][0] + ', ' + blockInputs[1][0] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[2][0] + ', ' + blockInputs[2][0] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[3][0] + ', !' + blockInputs[3][0] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[4][0] + ', !' + blockInputs[4][0] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[5][0] + ', !' + blockInputs[5][0] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[6][0] + ', !' + blockInputs[6][0] + '_ON);\n      ' +
        'digitalWrite(' + blockInputs[7][0] + ', !' + blockInputs[7][0] + '_ON);\n  }';
    // == 2
    code += ' else if(Segment_Nr == 2) {\n      ' + 
        'digitalWrite(' + blockInputs[0][0] + ', ' + blockInputs[0][0] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[1][0] + ', ' + blockInputs[1][0] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[2][0] + ', !' + blockInputs[2][0] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[3][0] + ', ' + blockInputs[3][0] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[4][0] + ', ' + blockInputs[4][0] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[5][0] + ', !' + blockInputs[5][0] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[6][0] + ', ' + blockInputs[6][0] + '_ON);\n      ' +
        'digitalWrite(' + blockInputs[7][0] + ', !' + blockInputs[7][0] + '_ON);\n  }';
    // == 3
    code += ' else if(Segment_Nr == 3) {\n      ' +
        'digitalWrite(' + blockInputs[0][0] + ', ' + blockInputs[0][0] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[1][0] + ', ' + blockInputs[1][0] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[2][0] + ', ' + blockInputs[2][0] + '_ON);\n      ' +
        'digitalWrite(' + blockInputs[3][0] + ', ' + blockInputs[3][0] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[4][0] + ', !' + blockInputs[4][0] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[5][0] + ', !' + blockInputs[5][0] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[6][0] + ', ' + blockInputs[6][0] + '_ON);\n      ' +
        'digitalWrite(' + blockInputs[7][0] + ', !' + blockInputs[7][0] + '_ON);\n  }';
    // == 4
    code += ' else if(Segment_Nr == 4) {\n      ' +
        'digitalWrite(' + blockInputs[0][0] + ', !' + blockInputs[0][0] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[1][0] + ', ' + blockInputs[1][0] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[2][0] + ', ' + blockInputs[2][0] + '_ON);\n      ' +
        'digitalWrite(' + blockInputs[3][0] + ', !' + blockInputs[3][0] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[4][0] + ', !' + blockInputs[4][0] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[5][0] + ', ' + blockInputs[5][0] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[6][0] + ', ' + blockInputs[6][0] + '_ON);\n      ' +
        'digitalWrite(' + blockInputs[7][0] + ', !' + blockInputs[7][0] + '_ON);\n  }';
    // == 5
    code += ' else if(Segment_Nr == 5) {\n      ' +
        'digitalWrite(' + blockInputs[0][0] + ', ' + blockInputs[0][0] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[1][0] + ', !' + blockInputs[1][0] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[2][0] + ', ' + blockInputs[2][0] + '_ON);\n      ' +
        'digitalWrite(' + blockInputs[3][0] + ', ' + blockInputs[3][0] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[4][0] + ', !' + blockInputs[4][0] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[5][0] + ', ' + blockInputs[5][0] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[6][0] + ', ' + blockInputs[6][0] + '_ON);\n      ' +
        'digitalWrite(' + blockInputs[7][0] + ', !' + blockInputs[7][0] + '_ON);\n  }';
    // == 6
    code += ' else if(Segment_Nr == 6) {\n      ' +
        'digitalWrite(' + blockInputs[0][0] + ', ' + blockInputs[0][0] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[1][0] + ', !' + blockInputs[1][0] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[2][0] + ', ' + blockInputs[2][0] + '_ON);\n      ' +
        'digitalWrite(' + blockInputs[3][0] + ', ' + blockInputs[3][0] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[4][0] + ', ' + blockInputs[4][0] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[5][0] + ', ' + blockInputs[5][0] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[6][0] + ', ' + blockInputs[6][0] + '_ON);\n      ' +
        'digitalWrite(' + blockInputs[7][0] + ', !' + blockInputs[7][0] + '_ON);\n  }';
    // == 7
    code += ' else if(Segment_Nr == 7) {\n      ' +
        'digitalWrite(' + blockInputs[0][0] + ', ' + blockInputs[0][0] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[1][0] + ', ' + blockInputs[1][0] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[2][0] + ', ' + blockInputs[2][0] + '_ON);\n      ' +
        'digitalWrite(' + blockInputs[3][0] + ', !' + blockInputs[3][0] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[4][0] + ', !' + blockInputs[4][0] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[5][0] + ', !' + blockInputs[5][0] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[6][0] + ', !' + blockInputs[6][0] + '_ON);\n      ' +
        'digitalWrite(' + blockInputs[7][0] + ', !' + blockInputs[7][0] + '_ON);\n  }';
    // == 8
    code += ' else if(Segment_Nr == 8) {\n      ' +
        'digitalWrite(' + blockInputs[0][0] + ', ' + blockInputs[0][0] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[1][0] + ', ' + blockInputs[1][0] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[2][0] + ', ' + blockInputs[2][0] + '_ON);\n      ' +
        'digitalWrite(' + blockInputs[3][0] + ', ' + blockInputs[3][0] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[4][0] + ', ' + blockInputs[4][0] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[5][0] + ', ' + blockInputs[5][0] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[6][0] + ', ' + blockInputs[6][0] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[7][0] + ', !' + blockInputs[7][0] + '_ON);\n  }';
    // == 9
    code += ' else if(Segment_Nr == 9) {\n      ' +
        'digitalWrite(' + blockInputs[0][0] + ', ' + blockInputs[0][0] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[1][0] + ', ' + blockInputs[1][0] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[2][0] + ', ' + blockInputs[2][0] + '_ON);\n      ' +
        'digitalWrite(' + blockInputs[3][0] + ', ' + blockInputs[3][0] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[4][0] + ', !' + blockInputs[4][0] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[5][0] + ', ' + blockInputs[5][0] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[6][0] + ', ' + blockInputs[6][0] + '_ON);\n      ' +
        'digitalWrite(' + blockInputs[7][0] + ', !' + blockInputs[7][0] + '_ON);\n  }';
    code += '\n }';
    Blockly.Arduino.addDeclaration('segment_write', code);
    return 'WriteNumber(' + stateOutput + ');\n';
};

/**
  * Code generator to turn a single segment on/off
  */
Blockly.Arduino['segment_write_singleSeg'] = function(block) {
    var SEGType = block.getFieldValue('SEG_TYPE');
    var stateOutput = block.getFieldValue('STATE');
    var stateval = 'SEG_' + SEGType + '_ON';
    if (stateOutput == 'off') {
        stateval = '! (' + stateval + ')';
    }
    
    var code = 'digitalWrite(SEG_' + SEGType + ', ' + stateval + ');\n';
    return code;
};