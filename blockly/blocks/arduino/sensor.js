/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Arduino blocks for sensors.
 *
 */
'use strict';

goog.provide('Blockly.Blocks.sensor');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');


/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.sensor.HUE = Blockly.Blocks.io.HUE;

Blockly.Blocks['DHT_config_hub'] = {
  /**
   * Block for adding a DHT sensor to a hub.
   * @this Blockly.Block
   */
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("media/arduino/DHT.png", 40, 20, "*"))
        .appendField(Blockly.Msg.ARD_DHTHUB)
        .appendField(
            new Blockly.FieldInstance('DHT',
                                      Blockly.Msg.ARD_DHT_DEFAULT_NAME,
                                      true, true, false),
            'NAMEDHT')
        .appendField(Blockly.Msg.ARD_SERVO_TYPE)
        .appendField(
            new Blockly.FieldDropdown([ 
                                       ['DHT11', 'DHT11'],
                                       ['DHT22', 'DHT22']
                                      ]),
           'DHTTYPE');
    this.setOutput(true, "HUB_DIGOUT");
    this.setColour(Blockly.Blocks.sensor.HUE);
    this.setTooltip(Blockly.Msg.ARD_DHTHUB_TIP);
    this.setHelpUrl('https://learn.adafruit.com/dht');
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