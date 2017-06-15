/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Blocks for Arduino Tone generation
 *     The Arduino function syntax can be found at
 *     https://www.arduino.cc/en/Reference/tone
 *
 */
'use strict';

goog.provide('Blockly.Blocks.tone');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.tone.HUE = 250;

Blockly.Blocks['io_tone'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_SETTONE)
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.digitalPins), "TONEPIN");
    this.appendValueInput("FREQUENCY")
        .setCheck(Blockly.Types.NUMBER.checkList)
        .appendField(Blockly.Msg.ARD_TONEFREQ);
    this.setInputsInline(true);
    this.setPreviousStatement(true, 'ARD_BLOCK');
    this.setNextStatement(true, 'ARD_BLOCK');
    this.setColour(Blockly.Blocks.tone.HUE);
    this.setTooltip(Blockly.Msg.ARD_TONE_TIP);
    this.setHelpUrl('https://www.arduino.cc/en/Reference/tone');
  },
  onchange: function() {
    var freq = Blockly.Arduino.valueToCode(this, "FREQUENCY", Blockly.Arduino.ORDER_ATOMIC)
    if (freq < 31 || freq > 65535) {
      this.setWarningText(Blockly.Msg.ARD_TONE_WARNING, 'io_tone');
    } else {
      this.setWarningText(null, 'io_tone');
    }
  },
  /** @return {!string} The type of input value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  }
};

Blockly.Blocks['io_notone'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_NOTONE)
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.digitalPins), "TONEPIN");
    this.setPreviousStatement(true, 'ARD_BLOCK');
    this.setNextStatement(true,'ARD_BLOCK');
    this.setColour(Blockly.Blocks.tone.HUE);
    this.setTooltip(Blockly.Msg.ARD_NOTONE_TIP);
    this.setHelpUrl('https://www.arduino.cc/en/Reference/noTone');
  },
    /** @return {!string} The type of input value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  }
};

/** Attach a buzzer or speaker to the hub*/
Blockly.Blocks['buzzer_config_hub'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_BUZZEROUTPUT)
        .appendField(
            new Blockly.FieldInstance('BuzzerOutput',
                                      Blockly.Msg.ARD_BUZOUTPUT_DEFAULT_NAME,
                                      true, true, false),
            'OUTPUTNAME');
    this.setOutput(true, 'HUB_DIGOUT');
    this.setColour(Blockly.Blocks.io.HUE);
    this.setTooltip(Blockly.Msg.ARD_BUZOUTPUT_TIP);
    this.setHelpUrl('https://www.arduino.cc/en/Reference/tone');
  },
  /**
   * Set the connection pins that the component connects to
   * @param {array} array of the connections (as string, eg '1', 'SDA', 'A1', ...
   * @this Blockly.Block
   */
  setHubConnector: function(connector) {
    this['connector'] = connector;
  },
  /**
   * Gets the variable type required.
   * @param {!string} varName Name of the variable selected in this block to
   *     check.
   * @return {string} String to indicate the variable type.
   */
  getVarType: function(varName) {
    return Blockly.Types.NUMBER;
  }
};


Blockly.Blocks['io_notone_buz'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_BUZNOTONE)
        .appendField(
            new Blockly.FieldInstance('BuzzerOutput',
                                      Blockly.Msg.ARD_BUZOUTPUT_DEFAULT_NAME,
                                      false, true, false),
            'OUTPUTNAME');
    this.setPreviousStatement(true, 'ARD_BLOCK');
    this.setNextStatement(true,'ARD_BLOCK');
    this.setColour(Blockly.Blocks.tone.HUE);
    this.setTooltip(Blockly.Msg.ARD_BUZNOTONE_TIP);
    this.setHelpUrl('https://www.arduino.cc/en/Reference/noTone');
  },
    /** @return {!string} The type of input value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  },
  /**
   * Called whenever anything on the workspace changes.
   * It checks the instances of buzzer output config and attaches a warning to this
   * block if not valid data is found.
   * @this Blockly.Block
   */
  onchange: function() {
    if (!this.workspace) return;  // Block has been deleted.

    var instanceName = this.getFieldValue('OUTPUTNAME')
    if (Blockly.Instances.isInstancePresent(instanceName, 'BuzzerOutput', this)) {
      this.setWarningText(null);
    } else {
      // Set a warning to select a valid config block
      this.setWarningText(
        Blockly.Msg.ARD_COMPONENT_WARN1.replace(
            '%1', Blockly.Msg.ARD_BUZOUTPUT_COMPONENT).replace(
                '%2', instanceName));
    }
  }
};

Blockly.Blocks['io_tone_buz'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_BUZSETTONE)
        .appendField(
            new Blockly.FieldInstance('BuzzerOutput',
                                      Blockly.Msg.ARD_BUZOUTPUT_DEFAULT_NAME,
                                      false, true, false),
            'OUTPUTNAME');
    this.appendValueInput("FREQUENCY")
        .setCheck(Blockly.Types.NUMBER.checkList)
        .appendField(Blockly.Msg.ARD_TONEFREQ);
    this.setInputsInline(true);
    this.setPreviousStatement(true, 'ARD_BLOCK');
    this.setNextStatement(true, 'ARD_BLOCK');
    this.setColour(Blockly.Blocks.tone.HUE);
    this.setTooltip(Blockly.Msg.ARD_TONE_TIP);
    this.setHelpUrl('https://www.arduino.cc/en/Reference/tone');
  },
  onchange: function() {
    if (!this.workspace) return;  // Block has been deleted.

    var instanceName = this.getFieldValue('OUTPUTNAME')
    var freq = Blockly.Arduino.valueToCode(this, "FREQUENCY", Blockly.Arduino.ORDER_ATOMIC)
    if (freq < 31 || freq > 65535) {
      this.setWarningText(Blockly.Msg.ARD_TONE_WARNING, 'io_tone');
    } else if (!Blockly.Instances.isInstancePresent(instanceName, 'BuzzerOutput', this)) {
      // Set a warning to select a valid config block
      this.setWarningText(
        Blockly.Msg.ARD_COMPONENT_WARN1.replace(
            '%1', Blockly.Msg.ARD_BUZOUTPUT_COMPONENT).replace(
                '%2', instanceName), 'io_tone');
    } else {
      this.setWarningText(null, 'io_tone');
    }
  },
  /** @return {!string} The type of input value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  }
};
/** Send a tone to a buzzer with a set duration **/
Blockly.Blocks['io_toneduration'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_BUZSETTONE)
        .appendField(
            new Blockly.FieldInstance('BuzzerOutput',
                                      Blockly.Msg.ARD_BUZOUTPUT_DEFAULT_NAME,
                                      false, true, false),
            'OUTPUTNAME');
    this.appendValueInput("FREQUENCY")
        .setCheck(Blockly.Types.NUMBER.checkList)
        .appendField(Blockly.Msg.ARD_TONEFREQ);
    this.appendValueInput("DURATION")
        .setCheck(Blockly.Types.NUMBER.checkList)
        .appendField(Blockly.Msg.ARD_TONEDURATION);
    this.setInputsInline(true);
    this.setPreviousStatement(true, 'ARD_BLOCK');
    this.setNextStatement(true, 'ARD_BLOCK');
    this.setColour(Blockly.Blocks.tone.HUE);
    this.setTooltip(Blockly.Msg.ARD_TONEDURATION_TIP);
    this.setHelpUrl('https://www.arduino.cc/en/Reference/tone');
  },
  onchange: function() {
    if (!this.workspace) return;  // Block has been deleted.

    var instanceName = this.getFieldValue('OUTPUTNAME')
    var freq = Blockly.Arduino.valueToCode(this, "FREQUENCY", Blockly.Arduino.ORDER_ATOMIC)
    var duration = Blockly.Arduino.valueToCode(this, "DURATION", Blockly.Arduino.ORDER_ATOMIC)
    if (freq < 31 || freq > 65535) {
      this.setWarningText(Blockly.Msg.ARD_TONE_WARNING, 'io_toneduration');
    } else if (duration < 1) {
      this.setWarningText(Blockly.Msg.ARD_TONE_WARNING2, 'io_toneduration');
    } else if (!Blockly.Instances.isInstancePresent(instanceName, 'BuzzerOutput', this)) {
      // Set a warning to select a valid config block
      this.setWarningText(
        Blockly.Msg.ARD_COMPONENT_WARN1.replace(
            '%1', Blockly.Msg.ARD_BUZOUTPUT_COMPONENT).replace(
                '%2', instanceName), 'io_toneduration');
    } else {
      this.setWarningText(null, 'io_toneduration');
    }
  },
  /** @return {!string} The type of input value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  }
};

Blockly.Blocks['io_pitch'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_BUZSELECTPITCH)
        .appendField(new Blockly.FieldDropdown(
            [['DO (C4)', '262'],  ['RE (D4)' , '294'],  ['MI (E4)', '330'],  ['FA (F4)', '349'],  ['SOL (G4)', '392'],  ['LA (A4)', '440'],  ['SI (B4)', '494'],  ['DO (C5)', '523'], ['B0', '31'],  ['C1', '33'],  ['CS1', '35'],  ['D1', '37'],  ['DS1', '39'],  ['E1', '41'],  ['F1', '44'],  ['FS1', '46'],  ['G1', '49'],  ['GS1', '52'],  ['A1', '55'],  ['AS1', '58'],  ['B1', '62'],  ['C2', '65'],  ['CS2', '69'],  ['D2', '73'],  ['DS2', '78'],  ['E2', '82'],  ['F2', '87'],  ['FS2', '93'],  ['G2', '98'],  ['GS2', '104'],  ['A2', '110'],  ['AS2', '117'],  ['B2', '123'],  ['C3', '131'],  ['CS3', '139'],  ['D3', '147'],  ['DS3', '156'],  ['E3', '165'],  ['F3', '175'],  ['FS3', '185'],  ['G3', '196'],  ['GS3', '208'],  ['A3', '220'],  ['AS3', '233'],  ['B3', '247'],  ['C4', '262'],  ['CS4', '277'],  ['D4', '294'],  ['DS4', '311'],  ['E4', '330'],  ['F4', '349'],  ['FS4', '370'],  ['G4', '392'],  ['GS4', '415'],  ['A4', '440'],  ['AS4', '466'],  ['B4', '494'],  ['C5', '523'],  ['CS5', '554'],  ['D5', '587'],  ['DS5', '622'],  ['E5', '659'],  ['F5', '698'],  ['FS5', '740'],  ['G5', '784'],  ['GS5', '831'],  ['A5', '880'],  ['AS5', '932'],  ['B5', '988'],  ['C6', '1047'],  ['CS6', '1109'],  ['D6', '1175'],  ['DS6', '1245'],  ['E6', '1319'],  ['F6', '1397'],  ['FS6', '1480'],  ['G6', '1568'],  ['GS6', '1661'],  ['A6', '1760'],  ['AS6', '1865'],  ['B6', '1976'],  ['C7', '2093'],  ['CS7', '2217'],  ['D7', '2349'],  ['DS7', '2489'],  ['E7', '2637'],  ['F7', '2794'],  ['FS7', '2960'],  ['G7', '3136'],  ['GS7', '3322'],  ['A7', '3520'],  ['AS7', '3729'],  ['B7', '3951'],  ['C8', '4186'],  ['CS8', '4435'],  ['D8', '4699'],  ['DS8', '4978']]), "TONEPITCH");
    this.setInputsInline(true);
    this.setOutput(true, Blockly.Types.NUMBER.output);
    this.setColour(Blockly.Blocks.tone.HUE);
    this.setTooltip(Blockly.Msg.ARD_BUZSELECTPITCH_TIP);
    this.setHelpUrl('https://www.arduino.cc/en/Tutorial/ToneMelody');
  },
  /** @return {!string} The type of input value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  }
};

Blockly.Blocks['io_tonepitch'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_BUZSETTONE)
        .appendField(
            new Blockly.FieldInstance('BuzzerOutput',
                                      Blockly.Msg.ARD_BUZOUTPUT_DEFAULT_NAME,
                                      false, true, false),
            'OUTPUTNAME');
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_BUZSETPITCH)
        .appendField(new Blockly.FieldDropdown(
            [['DO (C4)', '262'],  ['RE (D4)' , '294'],  ['MI (E4)', '330'],  ['FA (F4)', '349'],  ['SOL (G4)', '392'],  ['LA (A4)', '440'],  ['SI (B4)', '494'],  ['DO (C5)', '523'], ['B0', '31'],  ['C1', '33'],  ['CS1', '35'],  ['D1', '37'],  ['DS1', '39'],  ['E1', '41'],  ['F1', '44'],  ['FS1', '46'],  ['G1', '49'],  ['GS1', '52'],  ['A1', '55'],  ['AS1', '58'],  ['B1', '62'],  ['C2', '65'],  ['CS2', '69'],  ['D2', '73'],  ['DS2', '78'],  ['E2', '82'],  ['F2', '87'],  ['FS2', '93'],  ['G2', '98'],  ['GS2', '104'],  ['A2', '110'],  ['AS2', '117'],  ['B2', '123'],  ['C3', '131'],  ['CS3', '139'],  ['D3', '147'],  ['DS3', '156'],  ['E3', '165'],  ['F3', '175'],  ['FS3', '185'],  ['G3', '196'],  ['GS3', '208'],  ['A3', '220'],  ['AS3', '233'],  ['B3', '247'],  ['C4', '262'],  ['CS4', '277'],  ['D4', '294'],  ['DS4', '311'],  ['E4', '330'],  ['F4', '349'],  ['FS4', '370'],  ['G4', '392'],  ['GS4', '415'],  ['A4', '440'],  ['AS4', '466'],  ['B4', '494'],  ['C5', '523'],  ['CS5', '554'],  ['D5', '587'],  ['DS5', '622'],  ['E5', '659'],  ['F5', '698'],  ['FS5', '740'],  ['G5', '784'],  ['GS5', '831'],  ['A5', '880'],  ['AS5', '932'],  ['B5', '988'],  ['C6', '1047'],  ['CS6', '1109'],  ['D6', '1175'],  ['DS6', '1245'],  ['E6', '1319'],  ['F6', '1397'],  ['FS6', '1480'],  ['G6', '1568'],  ['GS6', '1661'],  ['A6', '1760'],  ['AS6', '1865'],  ['B6', '1976'],  ['C7', '2093'],  ['CS7', '2217'],  ['D7', '2349'],  ['DS7', '2489'],  ['E7', '2637'],  ['F7', '2794'],  ['FS7', '2960'],  ['G7', '3136'],  ['GS7', '3322'],  ['A7', '3520'],  ['AS7', '3729'],  ['B7', '3951'],  ['C8', '4186'],  ['CS8', '4435'],  ['D8', '4699'],  ['DS8', '4978']]), "TONEPITCH");
    this.appendValueInput("DURATION")
        .setCheck(Blockly.Types.NUMBER.checkList)
        .appendField(Blockly.Msg.ARD_TONEDURATION);
    this.setInputsInline(true);
    this.setPreviousStatement(true, 'ARD_BLOCK');
    this.setNextStatement(true, 'ARD_BLOCK');
    this.setColour(Blockly.Blocks.tone.HUE);
    this.setTooltip(Blockly.Msg.ARD_TONEPITCH_TIP);
    this.setHelpUrl('https://www.arduino.cc/en/Tutorial/ToneMelody');
  },
  onchange: function() {
    if (!this.workspace) return;  // Block has been deleted.

    var instanceName = this.getFieldValue('OUTPUTNAME')
    var duration = Blockly.Arduino.valueToCode(this, "DURATION", Blockly.Arduino.ORDER_ATOMIC)
    if (duration < 1) {
      this.setWarningText(Blockly.Msg.ARD_TONE_WARNING2, 'io_tonepitch');
    } else if (!Blockly.Instances.isInstancePresent(instanceName, 'BuzzerOutput', this)) {
      // Set a warning to select a valid config block
      this.setWarningText(
        Blockly.Msg.ARD_COMPONENT_WARN1.replace(
            '%1', Blockly.Msg.ARD_BUZOUTPUT_COMPONENT).replace(
                '%2', instanceName), 'io_tonepitch');
    } else {
      this.setWarningText(null, 'io_tonepitch');
    }
  },
  /** @return {!string} The type of input value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  }
};
