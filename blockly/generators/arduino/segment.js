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
    /*//the hub saved the connector in the attached block
    var hubconnector = block['connector'] || ['0', '1', '2', '3', '4', '5', '6']
    var segA = hubconnector[0];
    var segB = hubconnector[1];
    var segC = hubconnector[2];
    var segD = hubconnector[3];
    var segE = hubconnector[4];
    var segF = hubconnector[5];
    var segG = hubconnector[6];

    var segmentName = block.getFieldValue('SEG_NAME');
    //segment is a variable containing the used pins
    Blockly.Arduino.addVariable(segmentName,
        'int ' + segmentName + '[7] = {' + segA + ', ' + segB + ', ' + segC + ', ' + segD
                                + ', ' + segE + ', ' + segF + ', ' + segG + '};', true);
    segmentName = 'segment_' + segmentName;

    Blockly.Arduino.reservePin(block, segA, Blockly.Arduino.PinTypes.SEGMENT, 'Segment');
    Blockly.Arduino.reservePin(block, segB, Blockly.Arduino.PinTypes.SEGMENT, 'Segment');
    Blockly.Arduino.reservePin(block, segC, Blockly.Arduino.PinTypes.SEGMENT, 'Segment');
    Blockly.Arduino.reservePin(block, segD, Blockly.Arduino.PinTypes.SEGMENT, 'Segment');
    Blockly.Arduino.reservePin(block, segE, Blockly.Arduino.PinTypes.SEGMENT, 'Segment');
    Blockly.Arduino.reservePin(block, segF, Blockly.Arduino.PinTypes.SEGMENT, 'Segment');
    Blockly.Arduino.reservePin(block, segG, Blockly.Arduino.PinTypes.SEGMENT, 'Segment');*/

    /*var globalCode = "TEST";
    Blockly.Arduino.addDeclaration(segmentName, globalCode);
    var setupCode = segmentName + '.attach(' + pin + ');';
    Blockly.Arduino.addSetup(segmentName, setupCode, true);*/

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
            console.log('Unexpected code in segment_hub', code);
        }
        return code;
    }

    var code = '';
    var nr;
    var blockinputs = [["SEG-A", ['0']], ["SEG-B", ['1']], ["SEG-C", ['2']], ["SEG-D", ['3']],
        ["SEG-E", ['4']], ["SEG-F", ['5']], ["SEG-G", ['6']]];
    for (nr in blockinputs) {
        parseInput(block, blockinputs[nr][0], blockinputs[nr][1]);
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
    var hubconnector = block['connector'] || ['0', '1']
    //compute the pins, normally only possible to attach at valid pins
    var test = hubconnector[0];

    Blockly.Arduino.reservePin(
        block, pin, Blockly.Arduino.PinTypes.OUTPUT, 'Digital Write');
    
    var pinSetupCode = 'pinMode(' + pin + ', OUTPUT);';
    Blockly.Arduino.addSetup('segment_' + pin, pinSetupCode, false);
    Blockly.Arduino.addSetup('test_' + test, test, false);

    return '';
};

/**
 * Code generator to set a number on the 7-segment
 */
Blockly.Arduino['segment_write_number'] = function (block) {
    var name = block.getFieldValue('SEG_NAME');

    // Find the segment_hub to get the pin values for each segment (eg. segA = digital pin 1)
    var blocks = block.workspace.getAllBlocks();
    var hub, vars, varname;
    for (var i = 0; i < blocks.length; i++) {
        vars = blocks[0].getVars();
        if (vars) {
            for (var j = 0; j < vars.length; j++) {
                varname = vars[j];
                if (Blockly.Names.equals(varname, name)) {
                    hub = blocks[i];
                }
            }
        }
    }
    return 'length: ' + blocks.length + '\nblocks: ' + blocks + 
        '\nvarsLength: ' + vars.length + '\nvars: ' + vars + '\nvarname: ' + '\nhub: ' + hub;
    /*var pin = 0;

    // Get the number value from the block
    var stateOutput = Blockly.Arduino.valueToCode(
      block, 'SEG_VAL', Blockly.Arduino.ORDER_ATOMIC) || '0';
    
    if(stateOutput == 0) { // A, B, C, D, E, F 
        var code = 'digitalWrite(' + segA + ', ' + 1 + ')\n'
            + 'digitalWrite(' + segB + ', ' + 1 + ')\n'
            + 'digitalWrite(' + segC + ', ' + 1 + ')\n'
            + 'digitalWrite(' + segD + ', ' + 1 + ')\n'
            + 'digitalWrite(' + segE + ', ' + 1 + ')\n'
            + 'digitalWrite(' + segF + ', ' + 1 + ')\n'
            + 'digitalWrite(' + segG + ', ' + 0 + ')\n';
        return code;
    } else {
        return 'Not yet implemented for: (' + stateOutput + ')';   
    }*/
};

