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

goog.provide('Blockly.Blocks.md_control');

goog.require('Blockly.Blocks');

Blockly.Blocks.md_control.noInstance = 'No_Instances';
Blockly.Blocks.md_control.noName = 'Empty_input_name';

/**
 * Finds all user-created instances of the Button block config.
 * @return {!Array.<string>} Array of instance names.
 */
Blockly.Blocks.md_control.btnInstances = function() {
  var btnList = [];
  var blocks = Blockly.mainWorkspace.getAllBlocks();
  for (var x = 0; x < blocks.length; x++) {
    var getbtnSetupInstance = blocks[x].getbtnSetupInstance;
    if (getbtnSetupInstance) {
      var btnInstances = getbtnSetupInstance.call(blocks[x]);
        if (btnInstances) {
          if (btnInstances[0] != Blockly.Blocks.md_control.noName)
            btnList.push(btnInstances[0]);
        }
    }
  }
  return btnList;
};

/**
 * Return a sorted list of instances names for set dropdown menu.
 * @return {!Array.<string>} Array of btn instances names.
 */
Blockly.Blocks.md_control.btnDropdownList = function() {
  var btnList = Blockly.Blocks.md_control.btnInstances();
  var options = [];
  if (btnList.length > 0) {
    btnList.sort(goog.string.caseInsensitiveCompare);
    // Variables are not language-specific, use the name as both the
    // user-facing text and the internal representation.
    for (var x = 0; x < btnList.length; x++) {
      options[x] = [btnList[x], btnList[x]];
    }
  } else {
    // There are no config blocks in the work area
    options[0] = [Blockly.Blocks.md_control.noInstance,
                  Blockly.Blocks.md_control.noInstance];
  }
  return options;
};

/**
 * Class for a variable's dropdown field.
 * @extends {Blockly.FieldDropdown}
 * @constructor
 */
Blockly.Blocks.md_control.FieldbtnInstance = function() {
  Blockly.Blocks.md_control.FieldbtnInstance.superClass_.constructor
      .call(this, Blockly.Blocks.md_control.btnDropdownList);
};
goog.inherits(
    Blockly.Blocks.md_control.FieldbtnInstance, Blockly.FieldDropdown);


/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.md_control.HUE = 120;


/** Attach a button block to the hub*/
Blockly.Blocks['mcookie_button_setup'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("../media/MD/MDButton.png", 19, 19, "*"))
        .appendField("Drukknop")
        .appendField(new Blockly.FieldTextInput("Knop1"), "BUTTONNAME")
        .appendField("Als ingedrukt meten we waarde")
        .appendField(
            new Blockly.FieldDropdown([[Blockly.Msg.ARD_HIGH, 'HIGH'], [Blockly.Msg.ARD_LOW, 'LOW']]),
           'STATE');
    this.setOutput(true, 'MD_HUB_DIG');
    this.setColour(Blockly.Blocks.md_control.HUE);
    this.setTooltip('Een drukknop die AAN of UIT kan zijn');
    this.setHelpUrl('https://wiki.microduino.cc/index.php/Microduino_Sensor_Series');
  },
  /**
   * Returns the button instance names, defined in the 'BUTTONNAME' input
   * String block attached to this block.
   * @return {!string} List with the instance name.
   * @this Blockly.Block
   */
  getbtnSetupInstance: function() {
    var InstanceName = this.getFieldValue('BUTTONNAME');
    if (!InstanceName) {
      InstanceName = Blockly.Blocks.md_control.noName;
    }
    // Replace all spaces with underscores
    return [InstanceName.replace(/ /g, '_')];
  },
  setHubConnector: function(connector) {
    this['connector'] = connector;
  }
};


/** Attach a microduino crashbutton block to the hub*/
Blockly.Blocks['mcookie_crashbutton_setup'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("../media/MD/MDButton.png", 19, 19, "*"))
        .appendField("Microduino Crash-knop")
        .appendField(new Blockly.FieldTextInput("Knop1"), "BUTTONNAME");
    this.setOutput(true, 'MD_HUB_DIG');
    this.setColour(Blockly.Blocks.md_control.HUE);
    this.setTooltip('De microduino crash-knop waarmee je detecteert of je iets raakt, of die je als drukknop kunt gebruiken');
    this.setHelpUrl('https://wiki.microduino.cc/index.php/Microduino-Crash');
  },
  /**
   * Returns the button instance names, defined in the 'BUTTONNAME' input
   * String block attached to this block.
   * @return {!string} List with the instance name.
   * @this Blockly.Block
   */
  getbtnSetupInstance: function() {
    var InstanceName = this.getFieldValue('BUTTONNAME');
    if (!InstanceName) {
      InstanceName = Blockly.Blocks.md_control.noName;
    }
    // Replace all spaces with underscores
    return [InstanceName.replace(/ /g, '_')];
  },
  setHubConnector: function(connector) {
    this['connector'] = connector;
  }
};

Blockly.Blocks['mcookie_button_digitalread'] = {
  /**
   * Block for creating a 'read pin'.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/DigitalRead');
    this.setColour(Blockly.Blocks.md_control.HUE);
    this.appendDummyInput()
        .appendField('Lees waarde knop')
        .appendField(new Blockly.Blocks.md_control.FieldbtnInstance(),
            'BUTTONNAME');
    this.setOutput(true, Blockly.Types.BOOLEAN.output);
    this.setTooltip(Blockly.Msg.ARD_DIGITALREAD_TIP);
  },
  /** @return {!string} The type of return value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.BOOLEAN;
  },
  /**
   * Called whenever anything on the workspace changes.
   * It checks the instances of buttons and attaches a warning to this
   * block if not valid data is found.
   * @this Blockly.Block
   */
  onchange: function() {
    if (!this.workspace) { return; }  // Block has been deleted.

    var currentDropdown = this.getFieldValue('BUTTONNAME');
    var instances = Blockly.Blocks.md_control.btnDropdownList();

    // Check for configuration block presence
    if (instances[0][0] === Blockly.Blocks.md_control.noInstance) {
      // Ensure dropdown menu says there is no config block
      if (currentDropdown !== Blockly.Blocks.md_control.noInstance) {
        this.setFieldValue(Blockly.Blocks.md_control.noInstance, 'BUTTONNAME');
      }
      this.setWarningText(Blockly.Msg.ARD_MD_SERVO_STEP_WARN1);
    } else {
      // Configuration blocks present, check if any selected and contains name
      var existingConfigSelected = false;
      for (var x = 0; x < instances.length; x++) {
        // Check if any of the config blocks does not have a name
        if (instances[x][0] === Blockly.Blocks.md_control.noName) {
          // If selected config has no name either, set warning and exit func
          if (currentDropdown === Blockly.Blocks.md_control.noName) {
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
        if ((currentDropdown === Blockly.Blocks.md_control.noName) ||
            (currentDropdown === Blockly.Blocks.md_control.noInstance)) {
          // Just pick the first config block
          this.setFieldValue(instances[0][0], 'BUTTONNAME');
          this.setWarningText(null);
        } else {
          // Al this point just set a warning to select a valid btn config
          this.setWarningText(Blockly.Msg.ARD_MD_SERVO_STEP_WARN3);
        }
      }
    }
  }
};

Blockly.Blocks['mcookie_button_input'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Als knop")
        .appendField(new Blockly.Blocks.md_control.FieldbtnInstance(),
            'BUTTONNAME')
        .appendField(" geklikt wordt");
    this.appendStatementInput("CLICKINPUT")
        .setCheck('ARD_BLOCK')
        .appendField("dan");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("lang geklikt wordt");
    this.appendStatementInput("LONGPRESSINPUT")
        .setCheck('ARD_BLOCK')
        .appendField("dan");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("ingedrukt wordt");
    this.appendStatementInput("PRESSINPUT")
        .setCheck('ARD_BLOCK')
        .appendField("dan");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(new Blockly.FieldCheckbox("TRUE"), "WAIT_INPUT")
        .appendField("wacht tot een klik gebeurt");
    this.setPreviousStatement(true, 'ARD_BLOCK');
    this.setNextStatement(true, 'ARD_BLOCK');
    this.setColour(120);
    this.setTooltip('Controleer de input ontvangen op de knop, en reageer erop. Deze functie blokkeert je programma niet als je niet aanvinkt dat er moet gewacht worden op een klik. Klikken is drukken en loslaten, lang klikken is drukken en wat wachten voor loslaten, indrukken is zodra de knop ingedrukt is.');
    this.setHelpUrl('');
  },
  /**
   * Called whenever anything on the workspace changes.
   * It checks the instances of buttons and attaches a warning to this
   * block if not valid data is found.
   * @this Blockly.Block
   */
  onchange: function() {
    if (!this.workspace) { return; }  // Block has been deleted.

    var currentDropdown = this.getFieldValue('BUTTONNAME');
    var instances = Blockly.Blocks.md_control.btnDropdownList();

    // Check for configuration block presence
    if (instances[0][0] === Blockly.Blocks.md_control.noInstance) {
      // Ensure dropdown menu says there is no config block
      if (currentDropdown !== Blockly.Blocks.md_control.noInstance) {
        this.setFieldValue(Blockly.Blocks.md_control.noInstance, 'BUTTONNAME');
      }
      this.setWarningText(Blockly.Msg.ARD_MD_SERVO_STEP_WARN1);
    } else {
      // Configuration blocks present, check if any selected and contains name
      var existingConfigSelected = false;
      for (var x = 0; x < instances.length; x++) {
        // Check if any of the config blocks does not have a name
        if (instances[x][0] === Blockly.Blocks.md_control.noName) {
          // If selected config has no name either, set warning and exit func
          if (currentDropdown === Blockly.Blocks.md_control.noName) {
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
        if ((currentDropdown === Blockly.Blocks.md_control.noName) ||
            (currentDropdown === Blockly.Blocks.md_control.noInstance)) {
          // Just pick the first config block
          this.setFieldValue(instances[0][0], 'BUTTONNAME');
          this.setWarningText(null);
        } else {
          // Al this point just set a warning to select a valid btn config
          this.setWarningText(Blockly.Msg.ARD_MD_SERVO_STEP_WARN3);
        }
      }
    }
  }
};
