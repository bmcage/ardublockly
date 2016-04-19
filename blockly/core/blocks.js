/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2013 Google Inc.
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
 * @fileoverview Empty name space for the Blocks singleton.
 * @author spertus@google.com (Ellen Spertus)
 */
'use strict';

goog.provide('Blockly.Blocks');


Blockly.Blocks['noInstance'] = 'No_Instances';
Blockly.Blocks['noName'] = 'Empty_input_name';


/**
 * Finds all user-created instances of the LED block config.
 * @return {!Array.<string>} Array of instance names.
 */
Blockly.Blocks.DropdownListInstances = function(InstanceFunction) {
  var List = [];
  var blocks = Blockly.mainWorkspace.getAllBlocks();
  for (var x = 0; x < blocks.length; x++) {
    var getSetupInstance = blocks[x][InstanceFunction];
    console.log('test', x, getSetupInstance,InstanceFunction);
    if (getSetupInstance) {
      var Instances = getSetupInstance.call(blocks[x]);
        console.log('test2', Instances);
        if (Instances) {
          if (Instances[0] != Blockly.Blocks.noName)
            List.push(Instances[0]);
        }
    }
  }
  return List;
};

/**
 * Return a sorted list of instances names for set dropdown menu.
 * @return {!Array.<string>} Array of LED instances names.
 */
Blockly.Blocks.DropdownList = function(InstanceFunction) {
  var List = Blockly.Blocks.DropdownListInstances(InstanceFunction);
  var options = [];
  if (List.length > 0) {
    List.sort(goog.string.caseInsensitiveCompare);
    // Variables are not language-specific, use the name as both the
    // user-facing text and the internal representation.
    for (var x = 0; x < List.length; x++) {
      options[x] = [List[x], List[x]];
    }
  } else {
    // There are no config blocks in the work area
    options[0] = [Blockly.Blocks.noInstance,
                  Blockly.Blocks.noInstance];
  }
  return options;
};
