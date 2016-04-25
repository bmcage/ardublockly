/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Block for the Microduino functions.
 *     The Arduino built in functions syntax can be found at:
 *     https://arduino.cc/en/Reference/HomePage
 */
'use strict';

goog.provide('Blockly.Blocks.md_actuator');

goog.require('Blockly.Blocks');

Blockly.Blocks.md_actuator.noInstance = 'No_Instances';
Blockly.Blocks.md_actuator.noName = 'Empty_input_name';

/**
 * Finds all user-created instances of the MDServo block config.
 * @return {!Array.<string>} Array of instance names.
 */
Blockly.Blocks.md_actuator.servoInstances = function() {
  var servoList = [];
  var blocks = Blockly.mainWorkspace.getAllBlocks();
  for (var x = 0; x < blocks.length; x++) {
    var getServoSetupInstance = blocks[x].getServoSetupInstance;
    if (getServoSetupInstance) {
      var servoInstances = getServoSetupInstance.call(blocks[x]);
        if (servoInstances) {
          if (servoInstances[0] != Blockly.Blocks.md_actuator.noName)
            servoList.push(servoInstances[0]);
          if (servoInstances[1] != Blockly.Blocks.md_actuator.noName)
            servoList.push(servoInstances[1]);
        }
    }
  }
  return servoList;
};

/**
 * Return a sorted list of instances names for set dropdown menu.
 * @return {!Array.<string>} Array of servo instances names.
 */
Blockly.Blocks.md_actuator.servoDropdownList = function() {
  var servoList = Blockly.Blocks.md_actuator.servoInstances();
  var options = [];
  if (servoList.length > 0) {
    servoList.sort(goog.string.caseInsensitiveCompare);
    // Variables are not language-specific, use the name as both the
    // user-facing text and the internal representation.
    for (var x = 0; x < servoList.length; x++) {
      options[x] = [servoList[x], servoList[x]];
    }
  } else {
    // There are no config blocks in the work area
    options[0] = [Blockly.Blocks.md_actuator.noInstance,
                  Blockly.Blocks.md_actuator.noInstance];
  }
  return options;
};

/**
 * Class for a variable's dropdown field.
 * @extends {Blockly.FieldDropdown}
 * @constructor
 */
Blockly.Blocks.md_actuator.FieldServoInstance = function() {
  Blockly.Blocks.md_actuator.FieldServoInstance.superClass_.constructor
      .call(this, Blockly.Blocks.md_actuator.servoDropdownList);
};
goog.inherits(
    Blockly.Blocks.md_actuator.FieldServoInstance, Blockly.FieldDropdown);


/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.md_actuator.HUE = 60;

Blockly.Blocks['mcookie_servo_type'] = {
  /**
   * Block for determining the type of servo attached to the MD block.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('https://wiki.microduino.cc/index.php/Servo');
    this.setColour(Blockly.Blocks.md_actuator.HUE);
    this.appendDummyInput()
        .appendField(
            new Blockly.FieldDropdown([[Blockly.Msg.ARD_MD_NOSERVO, 'NOSERVO'], 
                                       [Blockly.Msg.ARD_MD_180SERVO, '180SERVO'],
                                       [Blockly.Msg.ARD_MD_360SERVO, '360SERVO']
                                      ]),
           'SERVOTYPE');
    this.setOutput(true, 'SERVOTYPE');
    this.setTooltip(Blockly.Msg.ARD_MD_SERVOTYPE_TIP);
  },
  /** @return {!string} The type of return value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.BOOLEAN;
  }
};

Blockly.Blocks['mcookie_servo_setup'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("../media/MD/MDServo.png", 19, 19, "*"))
        .appendField(Blockly.Msg.ARD_MD_SERVOCON);
    this.appendValueInput("SERVOTOPTYPE")
        .setCheck("SERVOTYPE")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.ARD_MD_SERVOCON_TOP)
        .appendField(new Blockly.FieldTextInput("TopServo"), "NAMETOPSERVO")
        .appendField(Blockly.Msg.ARD_MD_SERVOCON_TYPE);
    this.appendValueInput("SERVOBOTTOMTYPE")
        .setCheck("SERVOTYPE")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.ARD_MD_SERVOCON_BOTTOM)
        .appendField(new Blockly.FieldTextInput("BodemServo"), "NAMEBOTTOMSERVO")
        .appendField(Blockly.Msg.ARD_MD_SERVOCON_TYPE);
    this.setInputsInline(false);
    this.setOutput(true, "MD_SERVO");
    this.setColour(Blockly.Blocks.md_actuator.HUE);
    this.setTooltip(Blockly.Msg.ARD_MD_SERVOCON_TIP);
    this.setHelpUrl('https://wiki.microduino.cc/index.php/Servo');
  },
  /**
   * Returns the servo instance names, defined in the 'NAMETOPSERVO' and 'NAMEBOTTOMSERVO' input
   * String block attached to this block.
   * @return {!string} List with the instance name.
   * @this Blockly.Block
   */
  getServoSetupInstance: function() {
    
    var topType = Blockly.Arduino.valueToCode(
      this, 'SERVOTOPTYPE', Blockly.Arduino.ORDER_ATOMIC) || 'NOSERVO';
    var bottomType = Blockly.Arduino.valueToCode(
      this, 'SERVOBOTTOMTYPE', Blockly.Arduino.ORDER_ATOMIC) || 'NOSERVO';
    var InstanceName1 = this.getFieldValue('NAMETOPSERVO');
    if (!InstanceName1 || topType == 'NOSERVO') {
      InstanceName1 = Blockly.Blocks.md_actuator.noName;
    }
    var InstanceName2 = this.getFieldValue('NAMEBOTTOMSERVO');
    if (!InstanceName2 || bottomType == 'NOSERVO') {
      InstanceName2 = Blockly.Blocks.md_actuator.noName;
    }
    // Replace all spaces with underscores
    return [InstanceName1.replace(/ /g, '_'), InstanceName2.replace(/ /g, '_')];
  },
  setHubConnector: function(connector) {
    this['connector'] = connector;
  }
};

Blockly.Blocks['mcookie_servo_write'] = {
  /**
   * Block for writing an angle value into a servo PWM pin.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/ServoWrite');
    this.setColour(Blockly.Blocks.md_actuator.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_MD_SERVO_WRITE)
        .appendField(new Blockly.Blocks.md_actuator.FieldServoInstance(),
            'SERVO_NAME');
    this.setInputsInline(false);
    this.appendValueInput('SERVO_ANGLE')
        .setCheck(Blockly.Types.NUMBER.checkList)
        .appendField(Blockly.Msg.ARD_SERVO_WRITE_TO);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_SERVO_WRITE_DEG_180);
    this.setInputsInline(true);
    this.setPreviousStatement(true, 'ARD_BLOCK');
    this.setNextStatement(true, 'ARD_BLOCK');
    this.setTooltip(Blockly.Msg.ARD_SERVO_WRITE_TIP);
  },
  /**
   * Called whenever anything on the workspace changes.
   * It checks the instances of servos and attaches a warning to this
   * block if not valid data is found.
   * @this Blockly.Block
   */
  onchange: function() {
    if (!this.workspace) { return; }  // Block has been deleted.

    var currentDropdown = this.getFieldValue('SERVO_NAME');
    var instances = Blockly.Blocks.md_actuator.servoDropdownList();

    // Check for configuration block presence
    if (instances[0][0] === Blockly.Blocks.md_actuator.noInstance) {
      // Ensure dropdown menu says there is no config block
      if (currentDropdown !== Blockly.Blocks.md_actuator.noInstance) {
        this.setFieldValue(Blockly.Blocks.md_actuator.noInstance, 'SERVO_NAME');
      }
      this.setWarningText(Blockly.Msg.ARD_MD_SERVO_STEP_WARN1);
    } else {
      // Configuration blocks present, check if any selected and contains name
      var existingConfigSelected = false;
      for (var x = 0; x < instances.length; x++) {
        // Check if any of the config blocks does not have a name
        if (instances[x][0] === Blockly.Blocks.md_actuator.noName) {
          // If selected config has no name either, set warning and exit func
          if (currentDropdown === Blockly.Blocks.md_actuator.noName) {
            this.setWarningText(Blockly.Msg.ARD_MD_SERVO_STEP_WARN2);
            return;
          }
        } else if (instances[x][0] === currentDropdown) {
          existingConfigSelected = true;
        }
      }

      // At this point select config has a name, check if it exist
      if (existingConfigSelected) {
        // All good, just remove any warnings and exit the function
        this.setWarningText(null);
      } else {
        if ((currentDropdown === Blockly.Blocks.md_actuator.noName) ||
            (currentDropdown === Blockly.Blocks.md_actuator.noInstance)) {
          // Just pick the first config block
          this.setFieldValue(instances[0][0], 'SERVO_NAME');
          this.setWarningText(null);
        } else {
          // Al this point just set a warning to select a valid servo config
          this.setWarningText(Blockly.Msg.ARD_MD_SERVO_STEP_WARN3);
        }
      }
    }
  }
};

Blockly.Blocks['mcookie_servo_read'] = {
  /**
   * Block for reading an angle value of a servo PWM pin.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/ServoRead');
    this.setColour(Blockly.Blocks.md_actuator.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_MD_SERVO_READ)
        .appendField(new Blockly.Blocks.md_actuator.FieldServoInstance(),
            'SERVO_NAME');;
    this.setOutput(true, Blockly.Types.NUMBER.output);
    this.setTooltip(Blockly.Msg.ARD_SERVO_READ_TIP);
  },
  /** @return {string} The type of return value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  },
  /**
   * Called whenever anything on the workspace changes.
   * It checks the instances of servos and attaches a warning to this
   * block if not valid data is found.
   * @this Blockly.Block
   */
  onchange: function() {
    if (!this.workspace) { return; }  // Block has been deleted.

    var currentDropdown = this.getFieldValue('SERVO_NAME');
    var instances = Blockly.Blocks.md_actuator.servoDropdownList();

    // Check for configuration block presence
    if (instances[0][0] === Blockly.Blocks.md_actuator.noInstance) {
      // Ensure dropdown menu says there is no config block
      if (currentDropdown !== Blockly.Blocks.md_actuator.noInstance) {
        this.setFieldValue(Blockly.Blocks.md_actuator.noInstance, 'SERVO_NAME');
      }
      this.setWarningText(Blockly.Msg.ARD_MD_SERVO_STEP_WARN1);
    } else {
      // Configuration blocks present, check if any selected and contains name
      var existingConfigSelected = false;
      for (var x = 0; x < instances.length; x++) {
        // Check if any of the config blocks does not have a name
        if (instances[x][0] === Blockly.Blocks.md_actuator.noName) {
          // If selected config has no name either, set warning and exit func
          if (currentDropdown === Blockly.Blocks.md_actuator.noName) {
            this.setWarningText(Blockly.Msg.ARD_MD_SERVO_STEP_WARN2);
            return;
          }
        } else if (instances[x][0] === currentDropdown) {
          existingConfigSelected = true;
        }
      }

      // At this point select config has a name, check if it exist
      if (existingConfigSelected) {
        // All good, just remove any warnings and exit the function
        this.setWarningText(null);
      } else {
        if ((currentDropdown === Blockly.Blocks.md_actuator.noName) ||
            (currentDropdown === Blockly.Blocks.md_actuator.noInstance)) {
          // Just pick the first config block
          this.setFieldValue(instances[0][0], 'SERVO_NAME');
          this.setWarningText(null);
        } else {
          // Al this point just set a warning to select a valid servo config
          this.setWarningText(Blockly.Msg.ARD_MD_SERVO_STEP_WARN3);
        }
      }
    }
  }
};


Blockly.Blocks['mcookie_servo_write2'] = {
  /**
   * Block for writing an angle value into a servo PWM pin.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/ServoWrite');
    this.setColour(Blockly.Blocks.md_actuator.HUE);
    this.appendDummyInput()
        .appendField('Roteer 360 graden Servo')
        .appendField(new Blockly.Blocks.md_actuator.FieldServoInstance(),
            'SERVO_NAME');
    this.appendValueInput('SERVO_SPEED')
        .setCheck(Blockly.Types.NUMBER.checkList)
        .appendField('met snelheid');
    this.appendDummyInput()
        .appendField('% (-100 tot 100)');
    this.setInputsInline(true);
    this.setPreviousStatement(true, 'ARD_BLOCK');
    this.setNextStatement(true, 'ARD_BLOCK');
    this.setTooltip('Draai een Servo aan een bepaalde snelheid');
  },
  /**
   * Called whenever anything on the workspace changes.
   * It checks the instances of servos and attaches a warning to this
   * block if not valid data is found.
   * @this Blockly.Block
   */
  onchange: function() {
    if (!this.workspace) { return; }  // Block has been deleted.

    var currentDropdown = this.getFieldValue('SERVO_NAME');
    var instances = Blockly.Blocks.md_actuator.servoDropdownList();

    // Check for configuration block presence
    if (instances[0][0] === Blockly.Blocks.md_actuator.noInstance) {
      // Ensure dropdown menu says there is no config block
      if (currentDropdown !== Blockly.Blocks.md_actuator.noInstance) {
        this.setFieldValue(Blockly.Blocks.md_actuator.noInstance, 'SERVO_NAME');
      }
      this.setWarningText(Blockly.Msg.ARD_MD_SERVO_STEP_WARN1);
    } else {
      // Configuration blocks present, check if any selected and contains name
      var existingConfigSelected = false;
      for (var x = 0; x < instances.length; x++) {
        // Check if any of the config blocks does not have a name
        if (instances[x][0] === Blockly.Blocks.md_actuator.noName) {
          // If selected config has no name either, set warning and exit func
          if (currentDropdown === Blockly.Blocks.md_actuator.noName) {
            this.setWarningText(Blockly.Msg.ARD_MD_SERVO_STEP_WARN2);
            return;
          }
        } else if (instances[x][0] === currentDropdown) {
          existingConfigSelected = true;
        }
      }

      // At this point select config has a name, check if it exist
      if (existingConfigSelected) {
        // All good, just remove any warnings and exit the function
        this.setWarningText(null);
      } else {
        if ((currentDropdown === Blockly.Blocks.md_actuator.noName) ||
            (currentDropdown === Blockly.Blocks.md_actuator.noInstance)) {
          // Just pick the first config block
          this.setFieldValue(instances[0][0], 'SERVO_NAME');
          this.setWarningText(null);
        } else {
          // Al this point just set a warning to select a valid servo config
          this.setWarningText(Blockly.Msg.ARD_MD_SERVO_STEP_WARN3);
        }
      }
    }
  }
};