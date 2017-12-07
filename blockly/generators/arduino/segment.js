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
            block, blockInputs[nr][1], Blockly.Arduino.PinTypes.OUTPUT, '7 Segment ' + blockInputs[nr][0].slice(4));
        var pinSetupCode = 'pinMode(' + segmentName + '_' + blockInputs[nr][0] + ', OUTPUT);';
        Blockly.Arduino.addSetup('io_' + segmentName + '_' + blockInputs[nr][0], pinSetupCode, false);
    }

      return '';
};

/**
 * Code generator to set a number on the 7-segment
 */
Blockly.Arduino['segment_write_number'] = function (block) {
    var segmentName = block.getFieldValue('SEG_NAME');
    var blockInputs = [segmentName +'_SEG_A',
                       segmentName +'_SEG_B', 
                       segmentName +'_SEG_C', 
                       segmentName +'_SEG_D',
                       segmentName +'_SEG_E', 
                       segmentName +'_SEG_F',
                       segmentName +'_SEG_G', 
                       segmentName +'_SEG_DP'];
    
    // Get the number value from the block
    var number = Blockly.Arduino.valueToCode(block, 'SEG_VAL', Blockly.Arduino.ORDER_ATOMIC) || '0';
    
    // Write the code for output
    var code = 'void ' + segmentName + '_WriteNumber(int Segment_Nr) {\n  ' +
        'if(Segment_Nr == 0) {\n      ' +
        'digitalWrite(' + blockInputs[0] + ', ' + blockInputs[0] + '_ON);\n      ' +
        'digitalWrite(' + blockInputs[1] + ', ' + blockInputs[1] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[2] + ', ' + blockInputs[2] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[3] + ', ' + blockInputs[3] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[4] + ', ' + blockInputs[4] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[5] + ', ' + blockInputs[5] + '_ON);\n      ' +
        'digitalWrite(' + blockInputs[6] + ', !' + blockInputs[6] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[7] + ', !' + blockInputs[7] + '_ON);\n  }';
    // == 1
    code += ' else if(Segment_Nr == 1) {\n      ' + 
        'digitalWrite(' + blockInputs[0] + ', !' + blockInputs[0] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[1] + ', ' + blockInputs[1] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[2] + ', ' + blockInputs[2] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[3] + ', !' + blockInputs[3] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[4] + ', !' + blockInputs[4] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[5] + ', !' + blockInputs[5] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[6] + ', !' + blockInputs[6] + '_ON);\n      ' +
        'digitalWrite(' + blockInputs[7] + ', !' + blockInputs[7] + '_ON);\n  }';
    // == 2
    code += ' else if(Segment_Nr == 2) {\n      ' + 
        'digitalWrite(' + blockInputs[0] + ', ' + blockInputs[0] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[1] + ', ' + blockInputs[1] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[2] + ', !' + blockInputs[2] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[3] + ', ' + blockInputs[3] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[4] + ', ' + blockInputs[4] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[5] + ', !' + blockInputs[5] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[6] + ', ' + blockInputs[6] + '_ON);\n      ' +
        'digitalWrite(' + blockInputs[7] + ', !' + blockInputs[7] + '_ON);\n  }';
    // == 3
    code += ' else if(Segment_Nr == 3) {\n      ' +
        'digitalWrite(' + blockInputs[0] + ', ' + blockInputs[0] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[1] + ', ' + blockInputs[1] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[2] + ', ' + blockInputs[2] + '_ON);\n      ' +
        'digitalWrite(' + blockInputs[3] + ', ' + blockInputs[3] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[4] + ', !' + blockInputs[4] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[5] + ', !' + blockInputs[5] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[6] + ', ' + blockInputs[6] + '_ON);\n      ' +
        'digitalWrite(' + blockInputs[7] + ', !' + blockInputs[7] + '_ON);\n  }';
    // == 4
    code += ' else if(Segment_Nr == 4) {\n      ' +
        'digitalWrite(' + blockInputs[0] + ', !' + blockInputs[0] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[1] + ', ' + blockInputs[1] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[2] + ', ' + blockInputs[2] + '_ON);\n      ' +
        'digitalWrite(' + blockInputs[3] + ', !' + blockInputs[3] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[4] + ', !' + blockInputs[4] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[5] + ', ' + blockInputs[5] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[6] + ', ' + blockInputs[6] + '_ON);\n      ' +
        'digitalWrite(' + blockInputs[7] + ', !' + blockInputs[7] + '_ON);\n  }';
    // == 5
    code += ' else if(Segment_Nr == 5) {\n      ' +
        'digitalWrite(' + blockInputs[0] + ', ' + blockInputs[0] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[1] + ', !' + blockInputs[1] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[2] + ', ' + blockInputs[2] + '_ON);\n      ' +
        'digitalWrite(' + blockInputs[3] + ', ' + blockInputs[3] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[4] + ', !' + blockInputs[4] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[5] + ', ' + blockInputs[5] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[6] + ', ' + blockInputs[6] + '_ON);\n      ' +
        'digitalWrite(' + blockInputs[7] + ', !' + blockInputs[7] + '_ON);\n  }';
    // == 6
    code += ' else if(Segment_Nr == 6) {\n      ' +
        'digitalWrite(' + blockInputs[0] + ', ' + blockInputs[0] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[1] + ', !' + blockInputs[1] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[2] + ', ' + blockInputs[2] + '_ON);\n      ' +
        'digitalWrite(' + blockInputs[3] + ', ' + blockInputs[3] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[4] + ', ' + blockInputs[4] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[5] + ', ' + blockInputs[5] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[6] + ', ' + blockInputs[6] + '_ON);\n      ' +
        'digitalWrite(' + blockInputs[7] + ', !' + blockInputs[7] + '_ON);\n  }';
    // == 7
    code += ' else if(Segment_Nr == 7) {\n      ' +
        'digitalWrite(' + blockInputs[0] + ', ' + blockInputs[0] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[1] + ', ' + blockInputs[1] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[2] + ', ' + blockInputs[2] + '_ON);\n      ' +
        'digitalWrite(' + blockInputs[3] + ', !' + blockInputs[3] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[4] + ', !' + blockInputs[4] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[5] + ', !' + blockInputs[5] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[6] + ', !' + blockInputs[6] + '_ON);\n      ' +
        'digitalWrite(' + blockInputs[7] + ', !' + blockInputs[7] + '_ON);\n  }';
    // == 8
    code += ' else if(Segment_Nr == 8) {\n      ' +
        'digitalWrite(' + blockInputs[0] + ', ' + blockInputs[0] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[1] + ', ' + blockInputs[1] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[2] + ', ' + blockInputs[2] + '_ON);\n      ' +
        'digitalWrite(' + blockInputs[3] + ', ' + blockInputs[3] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[4] + ', ' + blockInputs[4] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[5] + ', ' + blockInputs[5] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[6] + ', ' + blockInputs[6] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[7] + ', !' + blockInputs[7] + '_ON);\n  }';
    // == 9
    code += ' else if(Segment_Nr == 9) {\n      ' +
        'digitalWrite(' + blockInputs[0] + ', ' + blockInputs[0] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[1] + ', ' + blockInputs[1] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[2] + ', ' + blockInputs[2] + '_ON);\n      ' +
        'digitalWrite(' + blockInputs[3] + ', ' + blockInputs[3] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[4] + ', !' + blockInputs[4] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[5] + ', ' + blockInputs[5] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[6] + ', ' + blockInputs[6] + '_ON);\n      ' +
        'digitalWrite(' + blockInputs[7] + ', !' + blockInputs[7] + '_ON);\n  }';
    // else, switch off! 
    code += ' else {\n      ' +
        'digitalWrite(' + blockInputs[0] + ', !' + blockInputs[0] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[1] + ', !' + blockInputs[1] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[2] + ', !' + blockInputs[2] + '_ON);\n      ' +
        'digitalWrite(' + blockInputs[3] + ', !' + blockInputs[3] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[4] + ', !' + blockInputs[4] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[5] + ', !' + blockInputs[5] + '_ON);\n      ' + 
        'digitalWrite(' + blockInputs[6] + ', !' + blockInputs[6] + '_ON);\n      ' +
        'digitalWrite(' + blockInputs[7] + ', !' + blockInputs[7] + '_ON);\n  }';
    code += '\n }';
    Blockly.Arduino.addDeclaration(segmentName + '_write_number', code);
    return segmentName + '_WriteNumber(' + number + ');\n';
};

/**
  * Code generator to turn a single segment on/off
  */
Blockly.Arduino['segment_write_singleseg'] = function(block) {
    var segmentName = block.getFieldValue('SEG_NAME');
    var SEGType = block.getFieldValue('SEG_TYPE');
    var stateOutput = block.getFieldValue('STATE');
    var stateval = segmentName + '_SEG_' + SEGType + '_ON';
    if (stateOutput == 'off') {
        stateval = '! (' + stateval + ')';
    }
    
    var code = 'digitalWrite(' + segmentName + '_SEG_' + SEGType + ', ' + stateval + ');\n';
    return code;
};