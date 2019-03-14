/**
 * @license
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Generating Arduino for list blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Arduino.array');

goog.require('Blockly.Arduino');

Blockly.Arduino['array_create_with'] = function(block) {
  // Create a list with any number of elements of any type.
  var arrayName = block.getFieldValue('ARRAYNAME');
  var typenumber = block.getFieldValue('NUMBER_TYPE') || 'int';
  var code = new Array(block.itemCount_);
  var error = 0;
  for (var n = 0; n < block.itemCount_; n++) {
    
    code[n] = Blockly.Arduino.valueToCode(block, 'ADD' + n,
                                             Blockly.Arduino.ORDER_ATOMIC) || '0';
    if ((code[n]<=0 || code[n] >0)) {
      // input is a number, not a variable
      if (typenumber == 'int') {
        if (!Number.isInteger(code[n]/1)) error = 1;
      } else if (typenumber == 'float') {
        if (!Number.isFinite(code[n]/1)) error = 2;
      } else error = -1
    } else {
      error = 3;
    }
  }
  
  // Warn if the input values do not fit the type!
  if (error == 0) {
    block.setWarningText(null, 'nbr_value');
  } else if (error == 1) {
    block.setWarningText(Blockly.Msg.ARD_ARRAY_NOT_INT, 'nbr_value');
  } else if (error == 2) {
    block.setWarningText(Blockly.Msg.ARD_ARRAY_NOT_FLOAT, 'nbr_value');
  } else if (error == 3) {
    block.setWarningText(Blockly.Msg.ARD_ARRAY_NOT_NUMBER, 'nbr_value');
  } else if (error == -1) {
    block.setWarningText(Blockly.Msg.ARD_ARRAY_NOT_KNOWN, 'nbr_value');
  }
  
  code = typenumber + ' ' + arrayName + '[] = {' + code.join(', ') + '};';
  
  Blockly.Arduino.addDeclaration(arrayName, code);
  
  return '';
};

Blockly.Arduino['array_create_with_length'] = function(block) {
  // Create a list with any number of elements of any type.
  var arrayName = block.getFieldValue('ARRAYNAME');
  var typenumber = block.getFieldValue('NUMBER_TYPE') || 'int';
  var arrayLength = Blockly.Arduino.valueToCode(block, 'LENGTH',
                                             Blockly.Arduino.ORDER_ATOMIC) || '3';

  if ((arrayLength<=0 || arrayLength >0)) {
    // input is a number, not a variable
    if (arrayLength <= 0) {
      block.setWarningText(Blockly.Msg.ARD_ARRAY_LEN_ERR1, 'length_value');
    } else if (!Number.isInteger(arrayLength/1)) {
      block.setWarningText(Blockly.Msg.ARD_ARRAY_LEN_ERR2, 'length_value');
    } else {
      block.setWarningText(null, 'length_value');
    }
  } else {
    // input is a variable. Not allowed, must be const!
    block.setWarningText(Blockly.Msg.ARD_ARRAY_LEN_ERR3, 'length_value');
  }
  
  var code = typenumber + ' ' + arrayName + '[' + arrayLength + '];';
  
  Blockly.Arduino.addDeclaration(arrayName, code);
  
  return '';
};

Blockly.Arduino['array_getIndex'] = function(block) {
  var at = Blockly.Arduino.valueToCode(block, 'AT',
                                          Blockly.Arduino.ORDER_ATOMIC) || '0';
  var arrayName = block.getFieldValue('ARRAYNAME');

  var code = arrayName + '[' + at + ']';
  
  // give an error if at is a number, and not 0 to n-1 !
  if (at<=0 || at >0) {
    // input is a number, not a variable, check with the length. Obtain length first:
    // Iterate through top level blocks to find array instance
    var blocks = Blockly.mainWorkspace.getAllBlocks();
    var setupInstancePresent = false;
    var arlength = 0;
    for (var x = 0; x < blocks.length; x++) {
      var func = blocks[x].getArrayInstance;
      if (func) {
        var setupBlockInstanceName = func.call(blocks[x]);
        if (arrayName == setupBlockInstanceName) {
          setupInstancePresent = true;
          arlength = blocks[x].getLengthArrayInstance();
          break;
        }
      }
    }
    if (setupInstancePresent) {
      if (at/1 < 0) {
        // Not allowed, must be >= 0!
        block.setWarningText(Blockly.Msg.ARD_ARRAY_IND_ERR1, 'toosmall');
        block.setWarningText(null, 'toobig');
      } else if (at/1 >= arlength/1)  {
        // Not allowed, must be <= length!
        block.setWarningText(Blockly.Msg.ARD_ARRAY_IND_ERR2, 'toobig');
        block.setWarningText(null, 'toosmall');
      } else {
        block.setWarningText(null, 'toosmall');
        block.setWarningText(null, 'toobig');
      }
    }
  } else {
    block.setWarningText(null, 'toosmall');
    block.setWarningText(null, 'toobig');
  }
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['array_setIndex'] = function(block) {
  var at = Blockly.Arduino.valueToCode(block, 'AT',
                                          Blockly.Arduino.ORDER_ATOMIC) || '0';
  var arrayName = block.getFieldValue('ARRAYNAME');
  var value = Blockly.Arduino.valueToCode(block, 'VALUE',
                                          Blockly.Arduino.ORDER_ATOMIC) || '0';

  var code = arrayName + '[' + at + '] = ' + value + ';\n';
  
  // give an error if at is a number, and not 0 to n-1 !
  if (at<=0 || at >0) {
    // input is a number, not a variable, check with the length. Obtain length first:
    // Iterate through top level blocks to find array instance
    var blocks = Blockly.mainWorkspace.getAllBlocks();
    var setupInstancePresent = false;
    var arlength = 0;
    for (var x = 0; x < blocks.length; x++) {
      var func = blocks[x].getArrayInstance;
      if (func) {
        var setupBlockInstanceName = func.call(blocks[x]);
        if (arrayName == setupBlockInstanceName) {
          setupInstancePresent = true;
          arlength = blocks[x].getLengthArrayInstance();
          break;
        }
      }
    }
    if (setupInstancePresent) {
      if (at/1 < 0) {
        // Not allowed, must be >= 0!
        block.setWarningText(Blockly.Msg.ARD_ARRAY_IND_ERR1, 'toosmall');
        block.setWarningText(null, 'toobig');
      } else if (at/1 >= arlength/1)  {
        // Not allowed, must be <= length!
        block.setWarningText(Blockly.Msg.ARD_ARRAY_IND_ERR2, 'toobig');
        block.setWarningText(null, 'toosmall');
      } else {
        block.setWarningText(null, 'toosmall');
        block.setWarningText(null, 'toobig');
      }
    }
  } else {
    block.setWarningText(null, 'toosmall');
    block.setWarningText(null, 'toobig');
  }
  return code;
};

Blockly.Arduino['array_getLength'] = function(block) {
  var arrayName = block.getFieldValue('ARRAYNAME');
  
  // Search for the length of the array
  // Iterate through top level blocks to find array instance
  var blocks = Blockly.mainWorkspace.getAllBlocks();
  var setupInstancePresent = false;
  var arlength = 0;
  for (var x = 0; x < blocks.length; x++) {
    var func = blocks[x].getArrayInstance;
    if (func) {
      var setupBlockInstanceName = func.call(blocks[x]);
      if (arrayName == setupBlockInstanceName) {
        setupInstancePresent = true;
        arlength = blocks[x].getLengthArrayInstance();
        break;
      }
    }
  }
  
  return [arlength, Blockly.Arduino.ORDER_ATOMIC];
};
