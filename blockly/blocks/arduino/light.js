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

goog.provide('Blockly.Blocks.light');

goog.require('Blockly.Blocks');


/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.light.HUE = 512;


/** Attach a LED block to the hub*/
Blockly.Blocks['led_config_hub'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("media/arduino/Led.png", 19, 19, "*"))
        .appendField(Blockly.Msg.ARD_LEDLEG)
        .appendField(
            new Blockly.FieldInstance('LedLeg',
                                      Blockly.Msg.ARD_LEDLEG_DEFAULT_NAME,
                                      true, true, false),
            'LEDNAME')
        .appendField(Blockly.Msg.ARD_LEDLEGPOL)
        .appendField(
            new Blockly.FieldDropdown(
                [[Blockly.Msg.ARD_LEDLEGPOS, 'pos'],
                 [Blockly.Msg.ARD_LEDLEGNEG, 'neg']
                ]), 'POLARITY');
    this.setOutput(true, 'HUB_DIGOUT');
    this.setColour(Blockly.Blocks.light.HUE);
    this.setTooltip(Blockly.Msg.ARD_LEDLEG_TIP);
    this.setHelpUrl('https://www.arduino.cc/en/tutorial/blink');
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

/** Attach a LED block to the hub*/
Blockly.Blocks['neopixel_config_hub'] = {
  init: function() {
    this.appendValueInput('NUMBER')
        .appendField(new Blockly.FieldImage("media/arduino/Led.png", 19, 19, "*"))
        .appendField(Blockly.Msg.ARD_NEOPIXEL)
        .appendField(
            new Blockly.FieldInstance('LedStrip',
                                      Blockly.Msg.ARD_NEOPIXEL_DEFAULT_NAME,
                                      true, true, false),
            'LEDNAME')
        .appendField(Blockly.Msg.ARD_NEOPIXEL_STRIP);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_NEOPIXEL_PIXELS)
        .appendField(Blockly.Msg.ARD_NEOPIXEL_HZ)
        .appendField(
            new Blockly.FieldDropdown(
                [['800 KHz', 'NEO_KHZ800'],
                 ['400 KHz', 'NEO_KHZ400']
                ]), 'KHZ')
        .appendField(Blockly.Msg.ARD_NEOPIXEL_TYPE)
        .appendField(
            new Blockly.FieldDropdown(
                [['GRB', 'NEO_GRB'],
                 ['RGB', 'NEO_RGB'],
                 ['GRB+White', 'NEO_GRBW'],
                 ['RGB+White', 'NEO_RGBW']
                ]), 'NEOPIXEL_TYPE');
    this.setOutput(true, 'HUB_DIGOUT');
    this.setColour(Blockly.Blocks.light.HUE);
    this.setTooltip(Blockly.Msg.ARD_NEOPIXEL_TIP);
    this.setHelpUrl('https://learn.adafruit.com/adafruit-neopixel-uberguide/neopixel-strips');
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


Blockly.Blocks['led_digitalwrite'] = {
  /**
   * Block for creating a 'set pin' to a state.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/DigitalWrite');
    this.setColour(Blockly.Blocks.light.HUE);
    this.appendValueInput('STATE')
        .appendField(Blockly.Msg.ARD_LEDLEG_SET)
        .appendField(
            new Blockly.FieldInstance('LedLeg',
                                      Blockly.Msg.ARD_LEDLEG_DEFAULT_NAME,
                                      false, true, false),
            'LEDNAME')
        .setCheck(Blockly.Types.BOOLEAN.getcheckList());
    this.setInputsInline(false);
    this.setPreviousStatement(true, 'ARD_BLOCK');
    this.setNextStatement(true, 'ARD_BLOCK');
    this.setTooltip(Blockly.Msg.ARD_DIGITALWRITE_TIP);
  },
  /**
   * Gets the variable type required.
   * @param {!string} varName Name of the variable selected in this block to
   *     check.
   * @return {string} String to indicate the variable type.
   */
  getVarType: function(varName) {
    return Blockly.Types.NUMBER;
  },
  /**
   * Called whenever anything on the workspace changes.
   * It checks the instances of ledleg config and attaches a warning to this
   * block if not valid data is found.
   * @this Blockly.Block
   */
  onchange: function(event) {
    if (!this.workspace || event.type == Blockly.Events.MOVE ||
        event.type == Blockly.Events.UI) {
        return;  // Block deleted or irrelevant event
    }

    var instanceName = this.getFieldValue('LEDNAME')
    if (Blockly.Instances.isInstancePresent(instanceName, 'LedLeg', this)) {
      this.setWarningText(null);
    } else {
      // Set a warning to select a valid config block
      this.setWarningText(
        Blockly.Msg.ARD_COMPONENT_WARN1.replace(
            '%1', Blockly.Msg.ARD_LEDLEG_COMPONENT).replace(
                '%2', instanceName));
    }
  }
};

Blockly.Blocks['led_digitalwrite_onoff'] = {
  /**
   * Block for setting led to on or off.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/DigitalWrite');
    this.setColour(Blockly.Blocks.light.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_LEDLEG_SET)
        .appendField(
            new Blockly.FieldInstance('LedLeg',
                                      Blockly.Msg.ARD_LEDLEG_DEFAULT_NAME,
                                      false, true, false),
            'LEDNAME')
        .appendField(
            new Blockly.FieldDropdown(
                [[Blockly.Msg.ARD_LEDLEG_ON, 'on'],
                 [Blockly.Msg.ARD_LEDLEG_OFF, 'off']
                ]), 'STATE');
    this.setInputsInline(false);
    this.setPreviousStatement(true, 'ARD_BLOCK');
    this.setNextStatement(true, 'ARD_BLOCK');
    this.setTooltip(Blockly.Msg.ARD_DIGITALWRITE_TIP);
  },
  /**
   * Gets the variable type required.
   * @param {!string} varName Name of the variable selected in this block to
   *     check.
   * @return {string} String to indicate the variable type.
   */
  getVarType: function(varName) {
    return Blockly.Types.NUMBER;
  },
  /**
   * Called whenever anything on the workspace changes.
   * It checks the instances of ledleg config and attaches a warning to this
   * block if not valid data is found.
   * @this Blockly.Block
   */
  onchange: function(event) {
    if (!this.workspace || event.type == Blockly.Events.MOVE ||
        event.type == Blockly.Events.UI) {
        return;  // Block deleted or irrelevant event
    }

    var instanceName = this.getFieldValue('LEDNAME')
    if (Blockly.Instances.isInstancePresent(instanceName, 'LedLeg', this)) {
      this.setWarningText(null);
    } else {
      // Set a warning to select a valid config block
      this.setWarningText(
        Blockly.Msg.ARD_COMPONENT_WARN1.replace(
            '%1', Blockly.Msg.ARD_LEDLEG_COMPONENT).replace(
                '%2', instanceName));
    }
  }
};

/**
 * The neopixel set block with dropdown of HSVcolor to show
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Blocks['neopixel_HSVcolourpick_write'] = {
  init: function() {
    this.setColour(Blockly.Blocks.light.HUE);
    this.appendDummyInput("")
        .appendField(Blockly.Msg.ARD_NEOPIXEL_SET)
        .appendField(
            new Blockly.FieldInstance('LedStrip',
                                      Blockly.Msg.ARD_NEOPIXEL_DEFAULT_NAME,
                                      false, true, false),
            'NEONAME')
        .appendField(Blockly.Msg.ARD_NEOPIXEL_PIXEL)
    
    this.appendValueInput("LEDPIXEL")
        .setCheck(Blockly.Types.NUMBER.getcheckList())
        .setAlign(Blockly.ALIGN_RIGHT)
    
    var colour = new Blockly.FieldHSVColour('#ff0000');
    this.appendDummyInput("")
        .appendField(Blockly.Msg.ARD_NEOPIXEL_ONHSVCOLOUR)
        .appendField(colour, 'COLOUR');

    this.setInputsInline(true);
    this.setPreviousStatement(true, 'ARD_BLOCK');
    this.setNextStatement(true, 'ARD_BLOCK');
    this.setTooltip(Blockly.Msg.ARD_DIGITALWRITE_TIP);
    this.setHelpUrl('http://arduino.cc/en/Reference/DigitalWrite');
    },
  /**
   * Gets the variable type required.
   * @param {!string} varName Name of the variable selected in this block to
   *     check.
   * @return {string} String to indicate the variable type.
   */
  getVarType: function(varName) {
    return Blockly.Types.NUMBER;
  },
  /**
   * Called whenever anything on the workspace changes.
   * It checks the instances of neopixel config and attaches a warning to this
   * block if not valid data is found.
   * @this Blockly.Block
   */
  onchange: function(event) {
    if (!this.workspace || event.type == Blockly.Events.MOVE ||
        event.type == Blockly.Events.UI) {
        return;  // Block deleted or irrelevant event
    }

    var instanceName = this.getFieldValue('NEONAME')
    if (Blockly.Instances.isInstancePresent(instanceName, 'LedStrip', this)) {
      this.setWarningText(null);
    } else {
      // Set a warning to select a valid config block
      this.setWarningText(
        Blockly.Msg.ARD_COMPONENT_WARN1.replace(
            '%1', Blockly.Msg.ARD_NEOPIXEL_COMPONENT).replace(
                '%2', instanceName));
    }
  }
};

/**
 * The neopixel set block with dropdown of color to show
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Blocks['neopixel_colourpick_write'] = {
  init: function() {
    this.setColour(Blockly.Blocks.light.HUE);
    this.appendDummyInput("")
        .appendField(Blockly.Msg.ARD_NEOPIXEL_SET)
        .appendField(
            new Blockly.FieldInstance('LedStrip',
                                      Blockly.Msg.ARD_NEOPIXEL_DEFAULT_NAME,
                                      false, true, false),
            'NEONAME')
        .appendField(Blockly.Msg.ARD_NEOPIXEL_PIXEL)
    
    this.appendValueInput("LEDPIXEL")
        .setCheck(Blockly.Types.NUMBER.getcheckList())
        .setAlign(Blockly.ALIGN_RIGHT)
    
    var colour = new Blockly.FieldColour('#ff0000');
    colour.setColours(['rgb(255,0,0)', 'rgb(0,255,0)', 'rgb(0,0,255)', 'rgb(255,255,0)', 'rgb(255,0,179)', 'rgb(255,102,0)', 'rgb(210,0,255)', 'rgb(255,255,255)', 'rgb(0,0,0)']).setColumns(3);
    
 
    this.appendDummyInput("")
        .appendField(Blockly.Msg.ARD_NEOPIXEL_ONCOLOUR)
        .appendField(colour, 'COLOUR');

    this.setInputsInline(true);
    this.setPreviousStatement(true, 'ARD_BLOCK');
    this.setNextStatement(true, 'ARD_BLOCK');
    this.setTooltip(Blockly.Msg.ARD_DIGITALWRITE_TIP);
    this.setHelpUrl('http://arduino.cc/en/Reference/DigitalWrite');
    },
  /**
   * Gets the variable type required.
   * @param {!string} varName Name of the variable selected in this block to
   *     check.
   * @return {string} String to indicate the variable type.
   */
  getVarType: function(varName) {
    return Blockly.Types.NUMBER;
  },
  /**
   * Called whenever anything on the workspace changes.
   * It checks the instances of neopixel config and attaches a warning to this
   * block if not valid data is found.
   * @this Blockly.Block
   */
  onchange: function(event) {
    if (!this.workspace || event.type == Blockly.Events.MOVE ||
        event.type == Blockly.Events.UI) {
        return;  // Block deleted or irrelevant event
    }

    var instanceName = this.getFieldValue('NEONAME')
    if (Blockly.Instances.isInstancePresent(instanceName, 'LedStrip', this)) {
      this.setWarningText(null);
    } else {
      // Set a warning to select a valid config block
      this.setWarningText(
        Blockly.Msg.ARD_COMPONENT_WARN1.replace(
            '%1', Blockly.Msg.ARD_NEOPIXEL_COMPONENT).replace(
                '%2', instanceName));
    }
  }
};

/**
 * The neopixel set block with dropdown of color to show and dim value
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Blocks['neopixel_colourpick_dim_write'] = {
  init: function() {
    this.setColour(Blockly.Blocks.light.HUE);
    this.appendDummyInput("")
        .appendField(Blockly.Msg.ARD_NEOPIXEL_SET)
        .appendField(
            new Blockly.FieldInstance('LedStrip',
                                      Blockly.Msg.ARD_NEOPIXEL_DEFAULT_NAME,
                                      false, true, false),
            'NEONAME')
        .appendField(Blockly.Msg.ARD_NEOPIXEL_PIXEL)
    
    this.appendValueInput("LEDPIXEL")
        .setCheck(Blockly.Types.NUMBER.getcheckList())
        .setAlign(Blockly.ALIGN_RIGHT)
    
    var colour = new Blockly.FieldColour('#ff0000');
    colour.setColours(['rgb(255,0,0)', 'rgb(0,255,0)', 'rgb(0,0,255)', 'rgb(255,255,0)', 'rgb(255,0,179)', 'rgb(255,102,0)', 'rgb(210,0,255)', 'rgb(255,255,255)', 'rgb(0,0,0)']).setColumns(3);
  
    this.appendDummyInput("")
        .appendField(Blockly.Msg.ARD_NEOPIXEL_ONCOLOUR)
        .appendField(colour, 'COLOUR');
    this.appendValueInput("BRIGHTNESS")
        .setCheck(Blockly.Types.NUMBER.getcheckList())
        .appendField(Blockly.Msg.ARD_NEOPIXEL_BRIGHTNESS)

    this.setInputsInline(true);
    this.setPreviousStatement(true, 'ARD_BLOCK');
    this.setNextStatement(true, 'ARD_BLOCK');
    this.setTooltip(Blockly.Msg.ARD_DIGITALWRITE_TIP);
    this.setHelpUrl('http://arduino.cc/en/Reference/DigitalWrite');
    },
  /**
   * Gets the variable type required.
   * @param {!string} varName Name of the variable selected in this block to
   *     check.
   * @return {string} String to indicate the variable type.
   */
  getVarType: function(varName) {
    return Blockly.Types.NUMBER;
  },
  /**
   * Called whenever anything on the workspace changes.
   * It checks the instances of neopixel config and attaches a warning to this
   * block if not valid data is found.
   * @this Blockly.Block
   */
  onchange: function(event) {
    if (!this.workspace || event.type == Blockly.Events.MOVE ||
        event.type == Blockly.Events.UI) {
        return;  // Block deleted or irrelevant event
    }

    var instanceName = this.getFieldValue('NEONAME')
    if (Blockly.Instances.isInstancePresent(instanceName, 'LedStrip', this)) {
      this.setWarningText(null);
    } else {
      // Set a warning to select a valid config block
      this.setWarningText(
        Blockly.Msg.ARD_COMPONENT_WARN1.replace(
            '%1', Blockly.Msg.ARD_NEOPIXEL_COMPONENT).replace(
                '%2', instanceName));
    }
  }
};

/**
 * The neopixel set block with full control
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Blocks['neopixel_write'] = {
  init: function() {
    this.setColour(Blockly.Blocks.light.HUE);
    this.appendDummyInput("")
        .appendField(Blockly.Msg.ARD_NEOPIXEL_SET)
        .appendField(
            new Blockly.FieldInstance('LedStrip',
                                      Blockly.Msg.ARD_NEOPIXEL_DEFAULT_NAME,
                                      false, true, false),
            'NEONAME')
        .appendField(Blockly.Msg.ARD_NEOPIXEL_PIXEL)
    this.appendValueInput("LEDPIXEL")
        .setCheck(Blockly.Types.NUMBER.getcheckList())
        .setAlign(Blockly.ALIGN_RIGHT)
    this.appendValueInput("RED")
        .setCheck(Blockly.Types.NUMBER.getcheckList())
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.ARD_NEOPIXEL_ONCOLOURVALRED);
    this.appendValueInput("GREEN")
        .setCheck(Blockly.Types.NUMBER.getcheckList())
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.ARD_NEOPIXEL_ONCOLOURVALGREEN);
    this.appendValueInput("BLUE")
        .setCheck(Blockly.Types.NUMBER.getcheckList())
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.ARD_NEOPIXEL_ONCOLOURVALBLUE);

    this.setInputsInline(true);
    this.setPreviousStatement(true, 'ARD_BLOCK');
    this.setNextStatement(true, 'ARD_BLOCK');
    this.setTooltip(Blockly.Msg.ARD_DIGITALWRITE_TIP);
    this.setHelpUrl('http://arduino.cc/en/Reference/DigitalWrite');
    },
  /**
   * Gets the variable type required.
   * @param {!string} varName Name of the variable selected in this block to
   *     check.
   * @return {string} String to indicate the variable type.
   */
  getVarType: function(varName) {
    return Blockly.Types.NUMBER;
  },
  /**
   * Called whenever anything on the workspace changes.
   * It checks the instances of neopixel config and attaches a warning to this
   * block if not valid data is found.
   * @this Blockly.Block
   */
  onchange: function(event) {
    if (!this.workspace || event.type == Blockly.Events.MOVE ||
        event.type == Blockly.Events.UI) {
        return;  // Block deleted or irrelevant event
    }
    var instanceName = this.getFieldValue('NEONAME')
    if (Blockly.Instances.isInstancePresent(instanceName, 'LedStrip', this)) {
      this.setWarningText(null);
    } else {
      // Set a warning to select a valid config block
      this.setWarningText(
        Blockly.Msg.ARD_COMPONENT_WARN1.replace(
            '%1', Blockly.Msg.ARD_NEOPIXEL_COMPONENT).replace(
                '%2', instanceName));
    }
  }
};

/**
 * The neopixel set block to dim value
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Blocks['neopixel_dim_write'] = {
  init: function() {
    this.setColour(Blockly.Blocks.light.HUE);
    this.appendDummyInput("")
        .appendField(Blockly.Msg.ARD_NEOPIXEL_SET)
        .appendField(
            new Blockly.FieldInstance('LedStrip',
                                      Blockly.Msg.ARD_NEOPIXEL_DEFAULT_NAME,
                                      false, true, false),
            'NEONAME')
    this.appendValueInput("BRIGHTNESS")
        .setCheck(Blockly.Types.NUMBER.getcheckList())
        .appendField(Blockly.Msg.ARD_NEOPIXEL_BRIGHTNESS)

    this.setInputsInline(true);
    this.setPreviousStatement(true, 'ARD_BLOCK');
    this.setNextStatement(true, 'ARD_BLOCK');
//    this.setTooltip(Blockly.Msg.ARD_DIGITALWRITE_TIP);
 //   this.setHelpUrl('http://arduino.cc/en/Reference/DigitalWrite');
    },
  /**
   * Gets the variable type required.
   * @param {!string} varName Name of the variable selected in this block to
   *     check.
   * @return {string} String to indicate the variable type.
   */
  getVarType: function(varName) {
    return Blockly.Types.NUMBER;
  },
  /**
   * Called whenever anything on the workspace changes.
   * It checks the instances of neopixel config and attaches a warning to this
   * block if not valid data is found.
   * @this Blockly.Block
   */
  onchange: function(event) {
    if (!this.workspace || event.type == Blockly.Events.MOVE ||
        event.type == Blockly.Events.UI) {
        return;  // Block deleted or irrelevant event
    }

    var instanceName = this.getFieldValue('NEONAME')
    if (Blockly.Instances.isInstancePresent(instanceName, 'LedStrip', this)) {
      this.setWarningText(null);
    } else {
      // Set a warning to select a valid config block
      this.setWarningText(
        Blockly.Msg.ARD_COMPONENT_WARN1.replace(
            '%1', Blockly.Msg.ARD_NEOPIXEL_COMPONENT).replace(
                '%2', instanceName));
    }
  }
};

/**
 * The neopixel set block to fill with a hue
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Blocks['neopixel_hue_write'] = {
		  init: function() {
		    this.setColour(Blockly.Blocks.light.HUE);
		    this.appendDummyInput("")
		        .appendField(Blockly.Msg.ARD_NEOPIXEL_SET)
		        .appendField(
		            new Blockly.FieldInstance('LedStrip',
		                                      Blockly.Msg.ARD_NEOPIXEL_DEFAULT_NAME,
		                                      false, true, false),
		            'NEONAME')
				.appendField(Blockly.Msg.ARD_NEOPIXEL_PIXEL)
		    this.appendValueInput("LEDPIXEL")
		        .setCheck(Blockly.Types.NUMBER.getcheckList())
		        .setAlign(Blockly.ALIGN_RIGHT)
		    this.appendValueInput("HUE")
		        .setCheck(Blockly.Types.UNSIGNED_NUMBER.getcheckList())
				.setAlign(Blockly.ALIGN_RIGHT)							  
		        //.appendField("met tint (-32767 --> +32767)");
	        	//.appendField("met tint (0 --> 65535)");
				.appendField(Blockly.Msg.ARD_NEOPIXEL_HUE_RANGE);
		    this.appendValueInput("SATURATION")
	        	.setCheck(Blockly.Types.NUMBER.getcheckList())
	        	.setAlign(Blockly.ALIGN_RIGHT)							  
	        	//.appendField("verzadiging (0 --> 255)");
				.appendField(Blockly.Msg.ARD_NEOPIXEL_SAT_RANGE);
		    this.appendValueInput("VALUE")
		    	.setCheck(Blockly.Types.NUMBER.getcheckList())
		    	.setAlign(Blockly.ALIGN_RIGHT)							  
		    	//.appendField("waarde(helderheid) (0 --> 255)");
				.appendField(Blockly.Msg.ARD_NEOPIXEL_BRIGHTNESS_RANGE);
		    this.setInputsInline(true);
		    this.setPreviousStatement(true, 'ARD_BLOCK');
		    this.setNextStatement(true, 'ARD_BLOCK');
//		    this.setTooltip(Blockly.Msg.ARD_DIGITALWRITE_TIP);
//		    this.setHelpUrl('http://arduino.cc/en/Reference/DigitalWrite');
		    },
		  /**
		   * Gets the variable type required.
		   * @param {!string} varName Name of the variable selected in this block to
		   *     check.
		   * @return {string} String to indicate the variable type.
		   */
		  getVarType: function(varName) {
		    return Blockly.Types.NUMBER;
		  },
		  /**
		   * Called whenever anything on the workspace changes.
		   * It checks the instances of neopixel config and attaches a warning to this
		   * block if not valid data is found.
		   * @this Blockly.Block
		   */
		  onchange: function(event) {
		    if (!this.workspace || event.type == Blockly.Events.MOVE ||
		        event.type == Blockly.Events.UI) {
		        return;  // Block deleted or irrelevant event
		    }

		    var instanceName = this.getFieldValue('NEONAME')
		    if (Blockly.Instances.isInstancePresent(instanceName, 'LedStrip', this)) {
		      this.setWarningText(null);
		    } else {
		      // Set a warning to select a valid config block
		      this.setWarningText(
		        Blockly.Msg.ARD_COMPONENT_WARN1.replace(
		            '%1', Blockly.Msg.ARD_NEOPIXEL_COMPONENT).replace(
		                '%2', instanceName));
		    }
		  }
		};

/**
 * The neopixel set block at once
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Blocks['neopixel_fill'] = {
  init: function() {
    this.setColour(Blockly.Blocks.light.HUE);
    this.appendDummyInput("")
        .appendField(Blockly.Msg.ARD_NEOPIXEL_SET)
        .appendField(
            new Blockly.FieldInstance('LedStrip',
                                      Blockly.Msg.ARD_NEOPIXEL_DEFAULT_NAME,
                                      false, true, false),
            'NEONAME')
    this.appendValueInput("RED")
        .setCheck(Blockly.Types.NUMBER.getcheckList())
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.ARD_NEOPIXEL_ONCOLOURVALRED);
    this.appendValueInput("GREEN")
        .setCheck(Blockly.Types.NUMBER.getcheckList())
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.ARD_NEOPIXEL_ONCOLOURVALGREEN);
    this.appendValueInput("BLUE")
        .setCheck(Blockly.Types.NUMBER.getcheckList())
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.ARD_NEOPIXEL_ONCOLOURVALBLUE);

    this.setInputsInline(true);
    this.setPreviousStatement(true, 'ARD_BLOCK');
    this.setNextStatement(true, 'ARD_BLOCK');
    this.setTooltip(Blockly.Msg.ARD_DIGITALWRITE_TIP);
    this.setHelpUrl('http://arduino.cc/en/Reference/DigitalWrite');
    },
  /**
   * Gets the variable type required.
   * @param {!string} varName Name of the variable selected in this block to
   *     check.
   * @return {string} String to indicate the variable type.
   */
  getVarType: function(varName) {
    return Blockly.Types.NUMBER;
  },
  /**
   * Called whenever anything on the workspace changes.
   * It checks the instances of neopixel config and attaches a warning to this
   * block if not valid data is found.
   * @this Blockly.Block
   */
  onchange: function(event) {
    if (!this.workspace || event.type == Blockly.Events.MOVE ||
        event.type == Blockly.Events.UI) {
        return;  // Block deleted or irrelevant event
    }
    var instanceName = this.getFieldValue('NEONAME')
    if (Blockly.Instances.isInstancePresent(instanceName, 'LedStrip', this)) {
      this.setWarningText(null);
    } else {
      // Set a warning to select a valid config block
      this.setWarningText(
        Blockly.Msg.ARD_COMPONENT_WARN1.replace(
            '%1', Blockly.Msg.ARD_NEOPIXEL_COMPONENT).replace(
                '%2', instanceName));
    }
  }
};

/**
 * The neopixel set block to clear
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Blocks['neopixel_clear'] = {
  init: function() {
    this.setColour(Blockly.Blocks.light.HUE);
    this.appendDummyInput("")
        .appendField(Blockly.Msg.ARD_NEOPIXEL_CLEAR)
        .appendField(
            new Blockly.FieldInstance('LedStrip',
                                      Blockly.Msg.ARD_NEOPIXEL_DEFAULT_NAME,
                                      false, true, false),
            'NEONAME')
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_NEOPIXEL_DIRECT)
        .appendField(new Blockly.FieldCheckbox('TRUE'), 'DIRECT');
    this.setInputsInline(true);
    this.setPreviousStatement(true, 'ARD_BLOCK');
    this.setNextStatement(true, 'ARD_BLOCK');
    this.setTooltip(Blockly.Msg.ARD_DIGITALWRITE_TIP);
    this.setHelpUrl('http://arduino.cc/en/Reference/DigitalWrite');
    },
  /**
   * Gets the variable type required.
   * @param {!string} varName Name of the variable selected in this block to
   *     check.
   * @return {string} String to indicate the variable type.
   
  getVarType: function(varName) {
    return Blockly.Types.NUMBER;
  },*/
  /**
   * Called whenever anything on the workspace changes.
   * It checks the instances of neopixel config and attaches a warning to this
   * block if not valid data is found.
   * @this Blockly.Block
   */
  onchange: function(event) {
    if (!this.workspace || event.type == Blockly.Events.MOVE ||
        event.type == Blockly.Events.UI) {
        return;  // Block deleted or irrelevant event
    }

    var instanceName = this.getFieldValue('NEONAME')
    if (Blockly.Instances.isInstancePresent(instanceName, 'LedStrip', this)) {
      this.setWarningText(null);
    } else {
      // Set a warning to select a valid config block
      this.setWarningText(
        Blockly.Msg.ARD_COMPONENT_WARN1.replace(
            '%1', Blockly.Msg.ARD_NEOPIXEL_COMPONENT).replace(
                '%2', instanceName));
    }
  }
};

Blockly.Blocks['neopixel_rainbow'] = {
	  init: function() {
	    this.appendDummyInput()
	    .appendField(Blockly.Msg.ARD_NEOPIXEL)
        .appendField(
            new Blockly.FieldInstance('LedStrip',
                                      Blockly.Msg.ARD_NEOPIXEL_DEFAULT_NAME,
                                      false, true, false),
            'NEONAME')
		this.appendDummyInput()
			.appendField(Blockly.Msg.ARD_NEOPIXEL_EFF_RAINBOW)
	    this.appendValueInput("delay")
	        .setCheck(Blockly.Types.NUMBER.getcheckList())
	        .appendField(Blockly.Msg.ARD_TIME_DELAY);
	    this.setPreviousStatement(true, null);
	    this.setNextStatement(true, null);
	    this.setColour(Blockly.Blocks.light.HUE);
	    this.setInputsInline(true);

	 this.setTooltip("");
	 this.setHelpUrl("");
	  }
};

Blockly.Blocks['neopixel_theaterchaserainbow'] = {
		  init: function() {
		    this.appendDummyInput()
		    .appendField(Blockly.Msg.ARD_NEOPIXEL)
	        .appendField(
	            new Blockly.FieldInstance('LedStrip',
	                                      Blockly.Msg.ARD_NEOPIXEL_DEFAULT_NAME,
	                                      false, true, false),
	            'NEONAME')
		    this.appendDummyInput()
		 		.appendField(Blockly.Msg.ARD_NEOPIXEL_EFF_THEATERCHASERAINBOW)
		    this.appendValueInput('delay')
		        .setCheck(Blockly.Types.NUMBER.getcheckList())
		        .appendField(Blockly.Msg.ARD_TIME_DELAY);
		    this.setPreviousStatement(true, null);
		    this.setNextStatement(true, null);
		    this.setColour(Blockly.Blocks.light.HUE);
		    this.setInputsInline(true);

		 this.setTooltip("");
		 this.setHelpUrl("");
		  }
	};

Blockly.Blocks['neopixel_colorwipe'] = {
	  init: function() {
		this.setColour(Blockly.Blocks.light.HUE);
	    this.appendDummyInput("")
	    	.appendField(Blockly.Msg.ARD_NEOPIXEL)
	    	.appendField(
		            new Blockly.FieldInstance('LedStrip',
		                                      Blockly.Msg.ARD_NEOPIXEL_DEFAULT_NAME,
		                                      false, true, false),
		            'NEONAME')
		this.appendDummyInput()
		 	.appendField(Blockly.Msg.ARD_NEOPIXEL_EFF_COLORWIPE)
	    this.appendValueInput("RED")
	        .setCheck(Blockly.Types.NUMBER.getcheckList())
	        .setAlign(Blockly.ALIGN_RIGHT)
	        .appendField(Blockly.Msg.ARD_NEOPIXEL_ONCOLOURVALRED);
	    this.appendValueInput("GREEN")
	        .setCheck(Blockly.Types.NUMBER.getcheckList())
	        .setAlign(Blockly.ALIGN_RIGHT)
	        .appendField(Blockly.Msg.ARD_NEOPIXEL_ONCOLOURVALGREEN);
	    this.appendValueInput("BLUE")
	        .setCheck(Blockly.Types.NUMBER.getcheckList())
	        .setAlign(Blockly.ALIGN_RIGHT)
	        .appendField(Blockly.Msg.ARD_NEOPIXEL_ONCOLOURVALBLUE);
	    this.appendValueInput("delay")
	        .setCheck(Blockly.Types.NUMBER.getcheckList())
	        .appendField(Blockly.Msg.ARD_TIME_DELAY);
	    this.setInputsInline(true);
	    this.setPreviousStatement(true, null);
	    this.setNextStatement(true, null);
	    this.setTooltip(Blockly.Msg.ARD_DIGITALWRITE_TIP);
	    this.setHelpUrl('http://arduino.cc/en/Reference/DigitalWrite');
	  }
	};

Blockly.Blocks['neopixel_theaterchase'] = {
	  init: function() {
		this.setColour(Blockly.Blocks.light.HUE);
	    this.appendDummyInput("")
    	.appendField(Blockly.Msg.ARD_NEOPIXEL)
    	.appendField(
	            new Blockly.FieldInstance('LedStrip',
	                                      Blockly.Msg.ARD_NEOPIXEL_DEFAULT_NAME,
	                                      false, true, false),
	            'NEONAME')
	this.appendDummyInput()
		 .appendField(Blockly.Msg.ARD_NEOPIXEL_EFF_THEATERCHASE)
    this.appendValueInput("RED")
        .setCheck(Blockly.Types.NUMBER.getcheckList())
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.ARD_NEOPIXEL_ONCOLOURVALRED);
    this.appendValueInput("GREEN")
        .setCheck(Blockly.Types.NUMBER.getcheckList())
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.ARD_NEOPIXEL_ONCOLOURVALGREEN);
    this.appendValueInput("BLUE")
        .setCheck(Blockly.Types.NUMBER.getcheckList())
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.ARD_NEOPIXEL_ONCOLOURVALBLUE);
	    this.setInputsInline(true);
	    this.setPreviousStatement(true, null);
	    this.setNextStatement(true, null);
	    this.setTooltip(Blockly.Msg.ARD_DIGITALWRITE_TIP);
	    this.setHelpUrl('http://arduino.cc/en/Reference/DigitalWrite');
	  }
	};

/**
 * The neopixel set block with full control
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Blocks['neopixel_write_dimmed'] = {
  init: function() {
    this.setColour(Blockly.Blocks.light.HUE);
    this.appendDummyInput("")
        .appendField(Blockly.Msg.ARD_NEOPIXEL_SET)
        .appendField(
            new Blockly.FieldInstance('LedStrip',
                                      Blockly.Msg.ARD_NEOPIXEL_DEFAULT_NAME,
                                      false, true, false),
            'NEONAME')
        .appendField(Blockly.Msg.ARD_NEOPIXEL_PIXEL)
    this.appendValueInput("LEDPIXEL")
        .setCheck(Blockly.Types.NUMBER.getcheckList())
        .setAlign(Blockly.ALIGN_RIGHT)
    this.appendValueInput("RED")
        .setCheck(Blockly.Types.NUMBER.getcheckList())
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.ARD_NEOPIXEL_ONCOLOURVALRED);
    this.appendValueInput("GREEN")
        .setCheck(Blockly.Types.NUMBER.getcheckList())
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.ARD_NEOPIXEL_ONCOLOURVALGREEN);
    this.appendValueInput("BLUE")
        .setCheck(Blockly.Types.NUMBER.getcheckList())
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.ARD_NEOPIXEL_ONCOLOURVALBLUE);
    this.appendValueInput("BRIGHTNESS")
    	.setCheck(Blockly.Types.NUMBER.getcheckList())
    	.appendField(Blockly.Msg.ARD_NEOPIXEL_BRIGHTNESS)

    this.setInputsInline(true);
    this.setPreviousStatement(true, 'ARD_BLOCK');
    this.setNextStatement(true, 'ARD_BLOCK');
    this.setTooltip(Blockly.Msg.ARD_DIGITALWRITE_TIP);
    this.setHelpUrl('http://arduino.cc/en/Reference/DigitalWrite');
    },
  /**
   * Gets the variable type required.
   * @param {!string} varName Name of the variable selected in this block to
   *     check.
   * @return {string} String to indicate the variable type.
   */
  getVarType: function(varName) {
    return Blockly.Types.NUMBER;
  },
  /**
   * Called whenever anything on the workspace changes.
   * It checks the instances of neopixel config and attaches a warning to this
   * block if not valid data is found.
   * @this Blockly.Block
   */
  onchange: function(event) {
    if (!this.workspace || event.type == Blockly.Events.MOVE ||
        event.type == Blockly.Events.UI) {
        return;  // Block deleted or irrelevant event
    }
    var instanceName = this.getFieldValue('NEONAME')
    if (Blockly.Instances.isInstancePresent(instanceName, 'LedStrip', this)) {
      this.setWarningText(null);
    } else {
      // Set a warning to select a valid config block
      this.setWarningText(
        Blockly.Msg.ARD_COMPONENT_WARN1.replace(
            '%1', Blockly.Msg.ARD_NEOPIXEL_COMPONENT).replace(
                '%2', instanceName));
    }
  }
};

/**
 * The neopixel get number of pixels block
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Blocks['neopixel_get_numpixels'] = {
  init: function() {
    this.setColour(Blockly.Blocks.light.HUE);
    this.appendDummyInput("")
        .appendField(Blockly.Msg.ARD_NEOPIXEL_COUNT_PIXELS)
        .appendField(
            new Blockly.FieldInstance('LedStrip',
                                      Blockly.Msg.ARD_NEOPIXEL_DEFAULT_NAME,
                                      false, true, false),
            'NEONAME');
    this.setOutput(true, Blockly.Types.NUMBER.getoutput());
//    this.setPreviousStatement(true, 'ARD_BLOCK');
//    this.setNextStatement(true, 'ARD_BLOCK');
    this.setTooltip(Blockly.Msg.ARD_NEOPIXEL_COUNT_PIXELS_TIP);
//    this.setHelpUrl('http://arduino.cc/en/Reference/DigitalWrite');
    },
  /**
   * Gets the variable type required.
   * @param {!string} varName Name of the variable selected in this block to
   *     check.
   * @return {string} String to indicate the variable type.
   */
  getVarType: function(varName) {
    return Blockly.Types.NUMBER;
  },
  getBlockType: function() {
	    return Blockly.Types.NUMBER;
  },

  /**
   * Called whenever anything on the workspace changes.
   * It checks the instances of neopixel config and attaches a warning to this
   * block if not valid data is found.
   * @this Blockly.Block
   */
  onchange: function(event) {
    if (!this.workspace || event.type == Blockly.Events.MOVE ||
        event.type == Blockly.Events.UI) {
        return;  // Block deleted or irrelevant event
    }
    var instanceName = this.getFieldValue('NEONAME')
    if (Blockly.Instances.isInstancePresent(instanceName, 'LedStrip', this)) {
      this.setWarningText(null);
    } else {
      // Set a warning to select a valid config block
      this.setWarningText(
        Blockly.Msg.ARD_COMPONENT_WARN1.replace(
            '%1', Blockly.Msg.ARD_NEOPIXEL_COMPONENT).replace(
                '%2', instanceName));
    }
  }
};

Blockly.Blocks['neopixel_effects'] = {
		  /**
		   * Block for choosing some predefined effects.
		   * @this Blockly.Block
		   */
		  init: function() {
		    var PROPERTIES =
		        [[Blockly.Msg.ARD_NEOPIXEL_EFF_COLORWIPE, 'colorwipe'],
		        [Blockly.Msg.ARD_NEOPIXEL_EFF_RAINBOW, 'rainbow'],
		        [Blockly.Msg.ARD_NEOPIXEL_EFF_THEATERCHASE, 'theaterchase'],
		        [Blockly.Msg.ARD_NEOPIXEL_EFF_THEATERCHASERAINBOW, 'theaterchaserainbow'],
		        [Blockly.Msg.ARD_NEOPIXEL_EFF_SNAKE, 'snake'],
		        [Blockly.Msg.ARD_NEOPIXEL_EFF_SCANNER, 'scanner'],
		        [Blockly.Msg.ARD_NEOPIXEL_EFF_SNOW, 'snow'],
		        [Blockly.Msg.ARD_NEOPIXEL_EFF_METEOOR, 'meteoor'],
		        [Blockly.Msg.ARD_NEOPIXEL_EFF_STROBE, 'strobe']];
		    var effect_props = new Map();
		    effect_props.set('colorwipe', {colours: true, enddelay: false, count: true, fade: false});
		    effect_props.set('rainbow', {colours: false, enddelay: false, count: false, fade: false});
		    effect_props.set('theaterchase', {colours: true, enddelay: false, count: false, fade: false});
		    effect_props.set('theaterchaserainbow', {colours: false, enddelay: false, count: false, fade: false});
		    effect_props.set('snake', {colours: true, enddelay: false, count: false, fade: true});
		    effect_props.set('scanner', {colours: true, enddelay: false, count: false, fade: true});
		    effect_props.set('snow', {colours: true, enddelay: false, count: true, fade: false});
		    effect_props.set('meteoor', {colours: false, enddelay: true, count: true, fade: false});
		    effect_props.set('strobe', {colours: true, enddelay: false, count: true, fade: false});
		    this.EFFECT_FIELDS = effect_props;
		    this.setColour(Blockly.Blocks.light.HUE);
		    this.appendDummyInput("")
	    	.appendField(Blockly.Msg.ARD_NEOPIXEL)
	    	.appendField(
		            new Blockly.FieldInstance('LedStrip',
		            		Blockly.Msg.ARD_NEOPIXEL_DEFAULT_NAME,
		            		false, true, false),
		            'NEONAME')
		    this.appendDummyInput()
		        .appendField('effect')
            .appendField(new Blockly.FieldDropdown(PROPERTIES, this.handleTypeSelection.bind(this)), 'PROPERTY');
	        this.effectType = this.getFieldValue('PROPERTY');
		    this.appendValueInput('delay')
		        .setCheck(Blockly.Types.NUMBER.getcheckList())
		        .appendField(Blockly.Msg.ARD_TIME_DELAY);
		    this.setInputsInline(true);
		    this.setPreviousStatement(true, null);
		    this.setNextStatement(true, null);
		    this.updateShape_();
		    this.setTooltip(Blockly.Msg.ARD_DIGITALWRITE_TIP);
		    this.setHelpUrl('http://arduino.cc/en/Reference/DigitalWrite');
		  },
	    /**
	     * This function runs each time you select a new value in your type selection dropdown field.
	     * @param {string} newType This is the new value that the field will be set to.
	     * 
	     * Important note: this function will run BEFORE the field's value is updated. This means that if you call
	     * this.getFieldValue('typeSelector') within here, it will reflect the OLD value.
	     * 
	     */
	    handleTypeSelection: function (newType) {
	        // Avoid unnecessary updates if someone clicks the same field twice
	        if(this.effectType !== newType) {
	            // Update this.columnType to the new value
	            this.effectType = newType;
	            // Add or remove fields as appropriate
	            this.updateShape_();
	        }
	    },

		  getVars: function() {
		    return [this.getFieldValue('NEONAME')];
		  },
		  renameVar: function(oldName, newName) {
		    if (Blockly.Names.equals(oldName, this.getFieldValue('NEONAME'))) {
		      this.setTitleValue(newName, 'NEONAME');
		    }
		  },
		  /**
		   * Create XML to represent whether the 'colourInput' should be present.
		   * @return {Element} XML storage element.
		   * @this Blockly.Block
		   */
		  mutationToDom: function() {
		    var container = document.createElement('mutation');
	        container.setAttribute('effect_type', this.effectType);
	        // ALWAYS return container; this will be the input for domToMutation.
		    return container;
		  },
		  /**
		   * Parse XML to restore the 'divisorInput'.
		   * @param {!Element} xmlElement XML storage element.
		   * @this Blockly.Block
		   */
		  domToMutation: function(xmlElement) {
	        // This attribute should match the one you used in mutationToDom
	        var effectType = xmlElement.getAttribute('effect_type');
	        // If, for whatever reason, you try to save an undefined value in effect_type, it will actually be saved as the string 'undefined'
	        // If this is not an acceptable value, filter it out
	        if(effectType && effectType !== 'undefined') {
	            this.effectType = effectType;
	        }
	        // Run updateShape to append block values as needed
	        this.updateShape_();
		  },
		  /**
		   * Modify this block to have (or not have) an input for 'is divisible by'.
		   * @param {boolean} divisorInput True if this block has a divisor input.
		   * @private
		   * @this Blockly.Block
		   */
		  updateShape_: function() {
		    // Add or remove a Value Input.
			var choosenEffect =  this.effectType;
			var effectprops = this.EFFECT_FIELDS.get(choosenEffect);
		    var colourExists = this.getInput('RED');
		    var countExists = this.getInput('COUNT');
		    var enddelayExists = this.getInput('ENDDELAY');
		    var fadeExists = this.getField('FADE');
			if (effectprops["colours"])  { // show the colour fields if not already present
			    if (!colourExists) {
			  	    this.appendValueInput('RED')
			        .setCheck(Blockly.Types.NUMBER.getcheckList())
			        .setAlign(Blockly.ALIGN_RIGHT)
			        .appendField(Blockly.Msg.ARD_NEOPIXEL_ONCOLOURVALRED);
			  	    this.appendValueInput('GREEN')
			        .setCheck(Blockly.Types.NUMBER.getcheckList())
			        .setAlign(Blockly.ALIGN_RIGHT)
			        .appendField(Blockly.Msg.ARD_NEOPIXEL_ONCOLOURVALGREEN);
			  	    this.appendValueInput('BLUE')
			        .setCheck(Blockly.Types.NUMBER.getcheckList())
			        .setAlign(Blockly.ALIGN_RIGHT)
			        .appendField(Blockly.Msg.ARD_NEOPIXEL_ONCOLOURVALBLUE);
			    }
		    } else if (colourExists) {
		      this.removeInput('RED');
		      this.removeInput('GREEN');
		      this.removeInput('BLUE');
		    }
			if (effectprops["count"])  { // show the count field if not already present
			    if (!countExists) {
			  	    this.appendValueInput('COUNT')
			        .setCheck(Blockly.Types.NUMBER.getcheckList())
			        .setAlign(Blockly.ALIGN_RIGHT)
			        .appendField(Blockly.Msg.ARD_NEOPIXEL_NUMBER);
			    }
		    } else if (countExists) {
		      this.removeInput('COUNT');
		    } 
			if (effectprops["enddelay"])  { // show the enddelay field if not already present
			    if (!enddelayExists) {
			  	    this.appendValueInput('ENDDELAY')
			        .setCheck(Blockly.Types.NUMBER.getcheckList())
			        .setAlign(Blockly.ALIGN_RIGHT)
			        .appendField(Blockly.Msg.ARD_NEOPIXEL_PAUSE);
			    }
		    } else if (enddelayExists) {
		      this.removeInput('ENDDELAY');
		    } 
			if (effectprops["fade"])  { // show the fade field if not already present
			    if (!fadeExists) {
			        this.appendDummyInput('FADECB')
			        .appendField(Blockly.Msg.ARD_NEOPIXEL_FADE)
			        .appendField(new Blockly.FieldCheckbox('TRUE'), 'FADE');
			    }
		    } else if (fadeExists) {
		    	this.removeInput('FADECB');
		    } 			  
		  } 
		};
