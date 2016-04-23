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

goog.provide('Blockly.Blocks.md_light');

goog.require('Blockly.Blocks');

Blockly.Blocks.md_light.noInstance = 'No_Instances';
Blockly.Blocks.md_light.noName = 'Empty_input_name';

/**
 * Finds all user-created instances of the LED block config.
 * @return {!Array.<string>} Array of instance names.
 */
Blockly.Blocks.md_light.LEDInstances = function() {
    return Blockly.Blocks.DropdownListInstances('getLEDSetupInstance');
}
/**
 * Return a sorted list of instances names for set dropdown menu.
 * @return {!Array.<string>} Array of LED instances names.
 */
Blockly.Blocks.md_light.LEDDropdownList = function() {
    return Blockly.Blocks.DropdownList('getLEDSetupInstance');
}
/**
 * Class for a variable's dropdown field.
 * @extends {Blockly.FieldDropdown}
 * @constructor
 */
Blockly.Blocks.md_light.FieldLEDInstance = function() {
  Blockly.Blocks.md_light.FieldLEDInstance.superClass_.constructor
      .call(this, Blockly.Blocks.md_light.LEDDropdownList);
};
goog.inherits(
    Blockly.Blocks.md_light.FieldLEDInstance, Blockly.FieldDropdown);

// same now for NeoPixel
Blockly.Blocks.md_light.NeoPixelInstances = function() {
    return Blockly.Blocks.DropdownListInstances('getNeoPixelSetupInstance');
}
Blockly.Blocks.md_light.NeoPixelDropdownList = function() {
    return Blockly.Blocks.DropdownList('getNeoPixelSetupInstance');
}
Blockly.Blocks.md_light.FieldNeoPixelInstance = function() {
  Blockly.Blocks.md_light.FieldNeoPixelInstance.superClass_.constructor
      .call(this, Blockly.Blocks.md_light.NeoPixelDropdownList);
};
goog.inherits(
    Blockly.Blocks.md_light.FieldNeoPixelInstance, Blockly.FieldDropdown);


/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.md_light.HUE = 512;


/** Attach a LED block to the hub*/
Blockly.Blocks['mcookie_led_setup'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("../media/MD/MDLed.png", 19, 19, "*"))
        .appendField("LED licht")
        .appendField(new Blockly.FieldTextInput("LED1"), "LEDNAME");
    this.setOutput(true, 'MD_HUB_DIGOUT');
    this.setColour(Blockly.Blocks.md_light.HUE);
    this.setTooltip('Een LED licht welke AAN of UIT kan zijn.');
    this.setHelpUrl('https://wiki.microduino.cc/index.php/Microduino_Sensor_Series');
  },
  /**
   * Returns the led instance names, defined in the 'LEDNAME' input
   * String block attached to this block.
   * @return {!string} List with the instance name.
   * @this Blockly.Block
   */
  getLEDSetupInstance: function() {
    var InstanceName = this.getFieldValue('LEDNAME');
    if (!InstanceName) {
      InstanceName = Blockly.Blocks.md_light.noName;
    }
    // Replace all spaces with underscores
    return [InstanceName.replace(/ /g, '_')];
  },
  setHubConnector: function(connector) {
    this['connector'] = connector;
  }
};

/** Attach a LED block to the hub*/
Blockly.Blocks['mcookie_neopixel_setup'] = {
  init: function() {
    this.appendValueInput('NUMBER')
        .appendField(new Blockly.FieldImage("../media/MD/MDLed.png", 19, 19, "*"))
        .appendField("NeoPixel LED licht")
        .appendField(new Blockly.FieldTextInput("NeoPixel1"), "LEDNAME")
        .appendField("Strip met");
    this.appendDummyInput()
        .appendField("Pixels");
    this.setOutput(true, 'MD_HUB_DIGOUT');
    this.setColour(Blockly.Blocks.md_light.HUE);
    this.setTooltip('Een LED licht welke AAN of UIT kan zijn.');
    this.setHelpUrl('https://wiki.microduino.cc/index.php/Microduino_Sensor_Series');
  },
  /**
   * Returns the neopixel instance names, defined in the 'LEDNAME' input
   * String block attached to this block.
   * @return {!string} List with the instance name.
   * @this Blockly.Block
   */
  getNeoPixelSetupInstance: function() {
    var InstanceName = this.getFieldValue('LEDNAME');
    if (!InstanceName) {
      InstanceName = Blockly.Blocks.md_light.noName;
    }
    // Replace all spaces with underscores
    return [InstanceName.replace(/ /g, '_')];
  },
  setHubConnector: function(connector) {
    this['connector'] = connector;
  }
};


Blockly.Blocks['mcookie_led_digitalwrite'] = {
  /**
   * Block for creating a 'set pin' to a state.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/DigitalWrite');
    this.setColour(Blockly.Blocks.md_light.HUE);
    this.appendValueInput('STATE')
        .appendField('Zet LED')
        .appendField(new Blockly.Blocks.md_light.FieldLEDInstance(),
            'LEDNAME')
        .setCheck(Blockly.Types.BOOLEAN.checkList);
    this.setInputsInline(false);
    this.setPreviousStatement(true, 'ARD_BLOCK');
    this.setNextStatement(true, 'ARD_BLOCK');
    this.setTooltip(Blockly.Msg.ARD_DIGITALWRITE_TIP);
  },
  /**
   * Called whenever anything on the workspace changes.
   * It checks the instances of leds and attaches a warning to this
   * block if not valid data is found.
   * @this Blockly.Block
   */
  onchange: function() {
    if (!this.workspace) { return; }  // Block has been deleted.

    var currentDropdown = this.getFieldValue('LEDNAME');
    var instances = Blockly.Blocks.md_light.LEDDropdownList();

    // Check for configuration block presence
    if (instances[0][0] === Blockly.Blocks.md_light.noInstance) {
      // Ensure dropdown menu says there is no config block
      if (currentDropdown !== Blockly.Blocks.md_light.noInstance) {
        this.setFieldValue(Blockly.Blocks.md_light.noInstance, 'LEDNAME');
      }
      this.setWarningText(Blockly.Msg.ARD_MD_SERVO_STEP_WARN1);
    } else {
      // Configuration blocks present, check if any selected and contains name
      var existingConfigSelected = false;
      for (var x = 0; x < instances.length; x++) {
        // Check if any of the config blocks does not have a name
        if (instances[x][0] === Blockly.Blocks.md_light.noName) {
          // If selected config has no name either, set warning and exit func
          if (currentDropdown === Blockly.Blocks.md_light.noName) {
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
        if ((currentDropdown === Blockly.Blocks.md_light.noName) ||
            (currentDropdown === Blockly.Blocks.md_light.noInstance)) {
          // Just pick the first config block
          this.setFieldValue(instances[0][0], 'LEDNAME');
          this.setWarningText(null);
        } else {
          // Al this point just set a warning to select a valid LED config
          this.setWarningText(Blockly.Msg.ARD_MD_SERVO_STEP_WARN3);
        }
      }
    }
  }
};



/**
 * The neopixel set block
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Blocks['mcookie_neopixel_write'] = {
  init: function() {
    this.setColour(Blockly.Blocks.md_light.HUE);
    this.appendDummyInput("")
        .appendField('Zet Neopixel')
        .appendField(new Blockly.Blocks.md_light.FieldNeoPixelInstance(),
            'NEONAME')
        .appendField('pixel')
    this.appendValueInput("LEDPIXEL")
        .setCheck(Blockly.Types.NUMBER.checkList)
        .setAlign(Blockly.ALIGN_RIGHT)
    this.appendValueInput("RED")
        .setCheck(Blockly.Types.NUMBER.checkList)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField('op kleur (0-255) rood:');
    this.appendValueInput("GREEN")
        .setCheck(Blockly.Types.NUMBER.checkList)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField('groen:');
    this.appendValueInput("BLUE")
        .setCheck(Blockly.Types.NUMBER.checkList)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField('blauw:');

    this.setInputsInline(true);
    this.setPreviousStatement(true, 'ARD_BLOCK');
    this.setNextStatement(true, 'ARD_BLOCK');
    this.setTooltip(Blockly.Msg.ARD_DIGITALWRITE_TIP);
    this.setHelpUrl('http://arduino.cc/en/Reference/DigitalWrite');

    },
};

