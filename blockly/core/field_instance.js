/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Instances input field.
 */
'use strict';

goog.provide('Blockly.FieldInstance');

goog.require('Blockly.FieldDropdown');
goog.require('Blockly.Instances');
goog.require('Blockly.Msg');
goog.require('Blockly.utils');
goog.require('Blockly.utils.object');
goog.require('Blockly.utils.string');


/**
 * Class for a specific type of instances' dropdown field.
 * @param {?string} instanceName The default name for the instance. If null,
 *     a unique instance name will be generated.
 * @param {!string} instanceType The type of instances for the dropdown.
 * @param {boolean} uniqueName
 * @param {boolean=} opt_lockNew Indicates a special case in which this
 *     dropdown can only rename the current name and each new block will always
 *     have a unique name.
 * @param {boolean=} opt_lockRename
 * @param {Function=} opt_validator A function that is executed when a new
 *     option is selected.  Its sole argument is the new option value.
 * @extends {Blockly.FieldDropdown}
 * @constructor
 */
Blockly.FieldInstance = function(
    instanceType, instanceName, uniqueName, opt_lockNew, opt_lockRename,
    opt_editDropdownData, opt_validator) {
  
  
  this.instanceType_ = instanceType;
  this.instanceName_ = instanceName;
  
  this.uniqueName_ = (uniqueName === true);
  
  this.lockNew_ = (opt_lockNew === true);
  
  this.lockRename_ = (opt_lockRename === true);
  
  this.editDropdownData = (opt_editDropdownData instanceof Function) ?
      opt_editDropdownData : null;
  
  // Call parent's constructor.
  Blockly.FieldInstance.superClass_.constructor.call(this,
      this.dropdownCreate, opt_validator);
  
  Blockly.FieldInstance.superClass_.setValue.call(this, instanceName);
};
Blockly.utils.object.inherits(Blockly.FieldInstance, Blockly.FieldDropdown);

/**
 * Construct a FieldInstance from a JSON arg object.
 * @param {!Object} options A JSON object with options (options).
 * @return {!Blockly.FieldInstance} The new field instance.
 * @package
 * @nocollapse
 */
Blockly.FieldInstance.fromJson = function(options) {
  return new Blockly.FieldInstance(options['options'], undefined, undefined, options);
};

/**
 * Sets a new change handler for instance field.
 * @param {Function} handler New change handler, or null.
 */
Blockly.FieldInstance.prototype.setValidator = function(handler) {
  var wrappedHandler;
  if (handler) {
    // Wrap the user's change handler together with the instance rename handler.
    wrappedHandler = function(value) {
      var v1 = handler.call(this, value);
      if (v1 === null) {
        var v2 = v1;
      } else {
        if (v1 === undefined) {
          v1 = value;
        }
        var v2 = Blockly.FieldInstance.dropdownChange.call(this, v1);
        if (v2 === undefined) {
          v2 = v1;
        }
      }
      return v2 === value ? undefined : v2;
    };
  } else {
    wrappedHandler = Blockly.FieldInstance.dropdownChange;
  }
  Blockly.FieldInstance.superClass_.setValidator.call(this, wrappedHandler);
};

/**
 * Install this dropdown on a block.
 */
Blockly.FieldInstance.prototype.init = function() {
  // Nothing to do if the dropdown has already been initialised once.
  if (this.fieldGroup_) return;

  Blockly.FieldInstance.superClass_.init.call(this);

  var workspace = this.sourceBlock_.isInFlyout ?
      this.sourceBlock_.workspace.targetWorkspace : this.sourceBlock_.workspace;

  if (!this.getValue()) {
    // Instances without names get uniquely named for this workspace.
    Blockly.FieldInstance.superClass_.setValue.call(this, Blockly.Instances.generateUniqueName(workspace));
  } else {
      if (this.uniqueName_) {
        // Ensure the given name is unique in the workspace, but not in flyout
        if (!this.sourceBlock_.isInFlyout && !document.getElementById('load').value) {
          Blockly.Instances.convertToUniqueNameBlock(this.getValue(), this.sourceBlock_);
          Blockly.FieldInstance.superClass_.setValue.call(this, 
               Blockly.Instances.convertToUniqueNameBlock(this.getValue(), this.sourceBlock_));
        }
      } else {
        // Pick an existing name from the workspace if needed and any exists
        var instanceList = Blockly.Instances.allInstancesOf(this.instanceType_,
                                         this.sourceBlock_.workspace);
        if (instanceList.indexOf(this.getValue()) == -1) {
          var existingName =
              Blockly.Instances.getAnyInstanceOf(this.instanceType_ , workspace);
          if (existingName) this.setValue(existingName);
        }
      }
  }
};

/**
 * Get the instance's name (use a variableDB to convert into a real name).
 * Unlike a regular dropdown, instances are literal and have no neutral value.
 * @return {string} Current text.
 */
//Blockly.FieldInstance.prototype.getValue = function() {
//  return this.getText();
//};

Blockly.FieldInstance.prototype.getInstanceTypeValue = function(instanceType) {
  return (instanceType === this.instanceType_) ? this.getText() : undefined;
};

/**
 * Return a sorted list of instance names for instance dropdown menus.
 * If editDropdownData has been defined it passes this list to the 
 * @return {!Array.<string>} Array of instance names.
 */
Blockly.FieldInstance.prototype.dropdownCreate = function() {
  if (this.sourceBlock_ && this.sourceBlock_.workspace) {
    var instanceList =
        Blockly.Instances.allInstancesOf(this.instanceType_,
                                         this.sourceBlock_.workspace);
  } else {
    var instanceList = [];
  }
  // Ensure that the currently selected instance is an option.
  var name = this.getText();
  // If still undefined, then add instancename 
  if (name === undefined || name === "undefined") {
    name = this.instanceName_;
  }
  if (name && instanceList.indexOf(name) == -1) {
    instanceList.push(name);
  }
  // current block must be in the list
  if (instanceList.indexOf(this.instanceName_) == -1) {
    instanceList.push(this.instanceName_);
  }
  instanceList.sort(Blockly.utils.string.caseInsensitiveCompare);
  if (!this.lockRename_) {
    instanceList.push(Blockly.Msg.RENAME_INSTANCE);
  }
  if (!this.lockNew_) {
    instanceList.push(Blockly.Msg.NEW_INSTANCE);
  }

  // If configured, pass data to external handler for additional processing
  var options = this.editDropdownData ? this.editDropdownData(options) : [];

  // Instances are not language specific, so use for display and internal name
  for (var i = 0; i < instanceList.length; i++) {
    options[i] = [instanceList[i], instanceList[i]];
  }

  return options;
};


/**
 * Handle the selection of an item in the dropdown menu.
 * @param {!Blockly.Menu} menu The Menu component clicked.
 * @param {!Blockly.MenuItem} menuItem The MenuItem selected within menu.
 * @protected
 */
Blockly.FieldInstance.prototype.onItemSelected_ = function(menu, menuItem) {
  
  function promptName(promptText, defaultText, callback) {
    Blockly.hideChaff();
    var newVar = Blockly.prompt(promptText, defaultText, function(newVar) {
      // Merge runs of whitespace.  Strip leading and trailing whitespace.
      // Beyond this, all names are legal.
      if (newVar) {
        newVar = newVar.replace(/[\s\xa0]+/g, ' ').replace(/^ | $/g, '');
        if (newVar == Blockly.Msg.RENAME_INSTANCE ||
            newVar == Blockly.Msg.NEW_INSTANCE) {
          newVar = null;  // Ok, not ALL names are legal...
        }
      }
      callback(newVar);
    });
  }
  var text = menuItem.getValue();
  var workspace = this.sourceBlock_.workspace;
  if (text == Blockly.Msg.RENAME_INSTANCE) {
    var oldInstance = this.instanceName_;
    var thisFieldInstance = this;
    var callbackRename = function(text) {
      if (text) {
        thisFieldInstance.instanceName_ = text;
        thisFieldInstance.setValue(text);
        
        Blockly.Instances.renameInstance(
            oldInstance, text, thisFieldInstance.instanceType_, workspace);
      }
    };
    promptName(Blockly.Msg.RENAME_INSTANCE_TITLE.replace('%1', oldInstance),
               oldInstance, callbackRename);
    // no return, callback does rename
  } else if (text == Blockly.Msg.NEW_INSTANCE) {
    //TODO: this return needs to be replaced with an asynchronous callback
    this.instanceName_ = Blockly.Instances.generateUniqueName(workspace);
    this.setValue(text);
  } else {
    this.instanceName_ = text;
    //standard behavior
    //Blockly.FieldInstance.superClass_.onItemSelected_.call(this, menuItem);
    this.setValue(menuItem.getValue());
  }
};

/**
 * Event handler for a change in instance name.
 * Special case the 'New instance...' and 'Rename instance...' options.
 * In both of these special cases, prompt the user for a new name.
 * @param {string} text The selected dropdown menu option.
 * @return {null|undefined|string} An acceptable new instance name, or null if
 *     change is to be either aborted (cancel button) or has been already
 *     handled (rename), or undefined if an existing instance was chosen.
 * @this {!Blockly.FieldInstance}
 */
Blockly.FieldInstance.prototype.dropdownChange = function(text) {
  function promptName(promptText, defaultText, callback) {
    Blockly.hideChaff();
    var newVar = Blockly.prompt(promptText, defaultText, function(newVar) {
      // Merge runs of whitespace.  Strip leading and trailing whitespace.
      // Beyond this, all names are legal.
      if (newVar) {
        newVar = newVar.replace(/[\s\xa0]+/g, ' ').replace(/^ | $/g, '');
        if (newVar == Blockly.Msg.RENAME_INSTANCE ||
            newVar == Blockly.Msg.NEW_INSTANCE) {
          newVar = null;  // Ok, not ALL names are legal...
        }
      }
      callback(newVar);
    });
  }
  var workspace = this.sourceBlock_.workspace;
  if (text == Blockly.Msg.RENAME_INSTANCE) {
    var oldInstance = this.getText();
    var thisFieldInstance = this;
    var callbackRename = function(text) {
      if (text) {
        Blockly.Instances.renameInstance(
            oldInstance, text, thisFieldInstance.instanceType_, workspace);
      }
    };
    promptName(Blockly.Msg.RENAME_INSTANCE_TITLE.replace('%1', oldInstance),
               oldInstance, callbackRename);
    return null;
  } else if (text == Blockly.Msg.NEW_INSTANCE) {
    //TODO: this return needs to be replaced with an asynchronous callback
    return Blockly.Instances.generateUniqueName(workspace);
  }
  return undefined;
};

/**
 * Sets the field's value based on the given XML element. Should only be
 * called by Blockly.Xml.
 * @param {!Element} fieldElement The element containing info about the
 *    field's state.
 * @package
 */
Blockly.FieldInstance.prototype.fromXml = function(fieldElement) {
  this.instanceName_ = fieldElement.textContent;
  return Blockly.FieldInstance.superClass_.fromXml.call(this, fieldElement);
};

/**
 * Subclasses should override doClassValidation_ and doValueUpdate_ rather
 * than setValue
 */
/**
 * Ensure that the input value is a valid language-neutral option.
 * @param {*=} opt_newValue The input value.
 * @return {?string} A valid language-neutral option, or null if invalid.
 * @protected
 */
Blockly.FieldInstance.prototype.doClassValidation_ = function(opt_newValue) {
  //Instance fields can always change their value 
  this.instanceName_ = opt_newValue;
  //if (this.sourceBlock_ && Blockly.Events.isEnabled()) {
  //  Blockly.Events.fire(new Blockly.Events.Change(
  //      this.sourceBlock_, 'field', this.name, this.value_, opt_newValue));
  //}
    
  return Blockly.FieldInstance.superClass_.doClassValidation_.call(this, opt_newValue);
  
  //return /** @type {string} */ (opt_newValue);
};

/**
 * Update the value of this dropdown field.
 * @param {*} newValue The value to be saved. The default validator guarantees
 * that this is one of the valid dropdown options.
 * @protected
 */
Blockly.FieldInstance.prototype.doValueUpdate_ = function(newValue) {
  Blockly.FieldInstance.superClass_.doValueUpdate_.call(this, newValue);
};

// Blockly needs to know the JSON name of this field. Usually this is
// registered at the bottom of the field class.
Blockly.fieldRegistry.register('field_instance', Blockly.FieldInstance);
