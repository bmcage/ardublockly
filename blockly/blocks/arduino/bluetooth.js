/**
 * @fileoverview Arduino blocks for bluetooth.
 *
 */
'use strict';

goog.provide('Blockly.Blocks.bluetooth');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');


/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.sensor.HUE = 250;


Blockly.Blocks['BT_config_hub'] = {
  /**
   * Block for adding a Bluetooth sensor to a hub.
   * @this Blockly.Block
   */
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("media/arduino/bluetooth2.png", 60, 20, "*"))
        .appendField(Blockly.Msg.ARD_BTHUB)
        .appendField(
            new Blockly.FieldInstance('BT',
                                      Blockly.Msg.ARD_BT_DEFAULT_NAME,
                                      true, true, false),
            'NAMEBT')
    this.setOutput(true, "HUB_DIGDIG");
    this.setColour(Blockly.Blocks.sensor.HUE);
    this.setTooltip(Blockly.Msg.ARD_BTHUB_TIP);
    this.setHelpUrl('https://classes.engineering.wustl.edu/ese205/core/index.php?title=Bluetooth_Module_(HC-06)_%2B_Arduino');
  }, //https://classes.engineering.wustl.edu/ese205/core/index.php?title=Bluetooth_Module_(HC-06)_%2B_Arduino
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

Blockly.Blocks['BT_readCodeFromApp'] = {
		  /**
		   * Block for reading the code from an BT-Receiver.
		   * @this Blockly.Block
		   */
		  init: function() {
		    this.setColour(Blockly.Blocks.sensor.HUE);
		    this.appendDummyInput()
		        .appendField(Blockly.Msg.ARD_BT_READCODEFROM)
		        .appendField(
		            new Blockly.FieldInstance('BT',
		                                      Blockly.Msg.ARD_BT_DEFAULT_NAME,
		                                      false, true, false),
		            'BT_NAME');
		    this.setOutput(true, Blockly.Types.TEXT.getoutput());
		    this.setTooltip(Blockly.Msg.ARD_BT_READCODEAPP_TIP);
		  },
		  /** @return {string} The type of return value for the block, a STRING. */
		  getBlockType: function() {
		    return Blockly.Types.TEXT;
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
		   * It checks the instances of dhts and attaches a warning to this
		   * block if not valid data is found.
		   * @this Blockly.Block
		   */
		  onchange: function(event) {
		    if (!this.workspace || event.type == Blockly.Events.MOVE ||
		        event.type == Blockly.Events.UI) {
		        return;  // Block deleted or irrelevant event
		    }

		    var instanceName = this.getFieldValue('BT_NAME');
		    if (Blockly.Instances.isInstancePresent(instanceName, 'BT', this)) {
		      this.setWarningText(null);
		    } else {
		      // Set a warning to select a valid config
		      this.setWarningText(Blockly.Msg.ARD_COMPONENT_WARN1.replace('%1', Blockly.Msg.ARD_BT_COMPONENT).replace('%2', Blockly.Msg.ARD_BT_COMPONENT));
		    }
		  }
		};

Blockly.Blocks['text_isColour'] = {
		  /**
		   * Block for is the string a colour code from the App?
		   * @this Blockly.Block
		   */
		  init: function() {
			    this.jsonInit({
			    	"message0": Blockly.Msg.ARD_BT_TEXT_ISCOLOUR_TITLE,
			    	"args0": [
			        {
			          "type": "input_value",
			          "name": "VALUE",
			          "check": Blockly.Types.TEXT.getcheckList().concat('Array'),
			        }
			      ],
			      "output": Blockly.Types.BOOLEAN.getoutput(),
			      "colour": Blockly.Blocks.sensor.HUE,
			      "tooltip": Blockly.Msg.ARD_BT_TEXT_ISCOLOUR_TOOLTIP,
			     // "helpUrl": Blockly.Msg.TEXT_ARD_BT_ISEMPTY_HELPURL
			    });
			  },
		  /** @return {!string} Type of the block, check always returns a boolean. */
		  getBlockType: function() {
		    return Blockly.Types.BOOLEAN;
		  }
		};

Blockly.Blocks['text_isBrightness'] = {
		  /**
		   * Block for is the string a colour code from the App?
		   * @this Blockly.Block
		   */
		  init: function() {
			    this.jsonInit({
			    	"message0": Blockly.Msg.ARD_BT_TEXT_ISBRIGHTNESS_TITLE,
			    	"args0": [
			        {
			          "type": "input_value",
			          "name": "VALUE",
			          "check": Blockly.Types.TEXT.getcheckList().concat('Array'),
			        }
			      ],
			      "output": Blockly.Types.BOOLEAN.getoutput(),
			      "colour": Blockly.Blocks.sensor.HUE,
			      "tooltip": Blockly.Msg.ARD_BT_TEXT_ISBRIGHTNESS_TOOLTIP,
			     // "helpUrl": Blockly.Msg.TEXT_ARD_BT_ISEMPTY_HELPURL
			    });
			  },
		  /** @return {!string} Type of the block, check always returns a boolean. */
		  getBlockType: function() {
		    return Blockly.Types.BOOLEAN;
		  }
		};

Blockly.Blocks['colour_RGB_extractor'] = {
		  /**
		   * Block extracting the R , G, or B value from a given RGB value in the format xxx.xxx.xxx
		   */
		  init: function() {
		    var PROPERTIES =
		        [[Blockly.Msg.COLOUR_RGB_RED, 'ROOD'],
		         [Blockly.Msg.COLOUR_RGB_GREEN, 'GROEN'],
		         [Blockly.Msg.COLOUR_RGB_BLUE, 'BLAUW'],
		         [Blockly.Msg.ARD_NEOPIXEL_BRIGHTNESS,'HELDERHEID']];
		         
		    this.setColour(Blockly.Blocks.sensor.HUE);
		    this.appendValueInput('COLOUR_TO_CHECK')
		        .setCheck(Blockly.Types.TEXT.getcheckList());
		    var dropdown = new Blockly.FieldDropdown(PROPERTIES);
		    this.appendDummyInput()
		        .appendField(dropdown, 'PROPERTY');
		    this.setInputsInline(true);
		    this.setOutput(true, Blockly.Types.NUMBER.getoutput());
		    this.setTooltip(Blockly.Msg.ARD_BT_COLOUR_TOOLTIP);
		  },
		  getBlockType: function() {
		    return Blockly.Types.NUMBER;
		  }
		};

Blockly.Blocks['effect_extractor'] = {
	  /**
	   * Block extracting the effect type
	   */
	  init: function() {
	    var PROPERTIES =
	        [[Blockly.Msg.ARD_BT_EFFECT1, 'EFF1'],
	         [Blockly.Msg.ARD_BT_EFFECT2, 'EFF2'],
	         [Blockly.Msg.ARD_BT_EFFECT3, 'EFF3'],
	         [Blockly.Msg.ARD_BT_EFFECT4, 'EFF4'],
	         [Blockly.Msg.ARD_BT_EFFECT5, 'EFF5'],
	         [Blockly.Msg.ARD_BT_EFFECT6, 'EFF6'],
	         [Blockly.Msg.ARD_BT_EFFECT7, 'EFF7'],
	         [Blockly.Msg.ARD_BT_EFFECT8, 'EFF8']];
	         
	    this.setColour(Blockly.Blocks.sensor.HUE);
	    this.appendValueInput('EFFECT_TO_CHECK')
	        .setCheck(Blockly.Types.TEXT.getcheckList());
	    var dropdown = new Blockly.FieldDropdown(PROPERTIES);
	    this.appendDummyInput()
	        .appendField(dropdown, 'PROPERTY');
	    this.setInputsInline(true);
	    this.setOutput(true, Blockly.Types.BOOLEAN.getoutput());
	    this.setTooltip(Blockly.Msg.ARD_BT_EFFECT_TOOLTIP);
	  },
	  getBlockType: function() {
	    return Blockly.Types.BOOLEAN;
	  }
	};

	
Blockly.Blocks['BT_isAvailable'] = {
	  /**
	   * Block for testing if there's data waiting on the input?
	   * @this Blockly.Block
	   */

	  init: function() {
//	    this.setHelpUrl('https://learn.adafruit.com/ir-sensor');
	    this.setColour(Blockly.Blocks.sensor.HUE);
	    this.appendDummyInput()
	        .appendField(
	            new Blockly.FieldInstance('BT',
	                                      Blockly.Msg.ARD_BT_DEFAULT_NAME,
	                                      false, true, false),
	            'BT_NAME')
//	        .appendField("heeft een code ontvangen");
	    	.appendField(Blockly.Msg.ARD_BT_RECEIVED);
	    this.setOutput(true, Blockly.Types.BOOLEAN.getoutput());
	    this.setTooltip(Blockly.Msg.ARD_BT_RECEIVED_TIP);
	  },
	  /** @return {string} The type of return value for the block, a long. */
	  getBlockType: function() {
	    return Blockly.Types.BOOLEAN;
	  }// ,
	  /**
	   * Gets the variable type required.
	   * @param {!string} varName Name of the variable selected in this block to
	   *     check.
	   * @return {string} String to indicate the variable type.
	   */
	/*  getVarType: function(varName) {
	    return Blockly.Types.NUMBER;
	  },*/
	  /**
	   * Called whenever anything on the workspace changes.
	   * It checks the instances of dhts and attaches a warning to this
	   * block if not valid data is found.
	   * @this Blockly.Block
	   */
	/*  onchange: function(event) {
	    if (!this.workspace || event.type == Blockly.Events.MOVE ||
	        event.type == Blockly.Events.UI) {
	        return;  // Block deleted or irrelevant event
	    }

	    var instanceName = this.getFieldValue('BT_NAME');
	    if (Blockly.Instances.isInstancePresent(instanceName, 'BT', this)) {
	      this.setWarningText(null);
	    } else {
	      // Set a warning to select a valid config
	      this.setWarningText(Blockly.Msg.ARD_COMPONENT_WARN1.replace('%1', Blockly.Msg.ARD_BT_COMPONENT).replace('%2', Blockly.Msg.ARD_BT_COMPONENT));
		}
	  }*/
};
