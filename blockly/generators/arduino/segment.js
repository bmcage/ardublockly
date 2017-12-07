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
Blockly.Arduino['segment_config'] = function(block) {

    var code = '';
  
    var segmentName = block.getFieldValue('SEG_NAME');
    var blockInputs = [["SEG_A", block.getFieldValue('SEG_A'), 'HIGH'], 
                       ["SEG_B", block.getFieldValue('SEG_B'), 'HIGH'], 
                       ["SEG_C", block.getFieldValue('SEG_C'), 'HIGH'], 
                       ["SEG_D", block.getFieldValue('SEG_D'), 'HIGH'], 
                       ["SEG_E", block.getFieldValue('SEG_E'), 'HIGH'], 
                       ["SEG_F", block.getFieldValue('SEG_F'), 'HIGH'], 
                       ["SEG_G", block.getFieldValue('SEG_G'), 'HIGH'], 
                       ["SEG_DP", block.getFieldValue('SEG_DP'), 'HIGH']];
    
    for (var nr in blockInputs) {
        Blockly.Arduino.addVariable(segmentName + '_' + blockInputs[nr][0], 
                    'int ' + segmentName + '_' + blockInputs[nr][0] + ' = ' 
                           + blockInputs[nr][1] + ';\nboolean ' + segmentName + '_' 
                           + blockInputs[nr][0] + '_ON = ' + blockInputs[nr][2] + ';', true);
        Blockly.Arduino.reservePin(
            block, blockInputs[nr][1], Blockly.Arduino.PinTypes.OUTPUT, 'Digital Write to 7 Segment');
        var pinSetupCode = 'pinMode(' + segmentName + '_' + blockInputs[nr][0] + ', OUTPUT);';
        Blockly.Arduino.addSetup('io_' + segmentName + '_' + blockInputs[nr][0], pinSetupCode, false);
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
Blockly.Arduino['segment_write_singleseg'] = function(block) {
    var SEGType = block.getFieldValue('SEG_TYPE');
    var stateOutput = block.getFieldValue('STATE');
    var stateval = 'SEG_' + SEGType + '_ON';
    if (stateOutput == 'off') {
        stateval = '! (' + stateval + ')';
    }
    
    var code = 'digitalWrite(SEG_' + SEGType + ', ' + stateval + ');\n';
    return code;
};