/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Arduino code generator for sensor components
 *
 */
'use strict';

goog.provide('Blockly.Arduino.sensor');

goog.require('Blockly.Arduino');


/**
 * The DHT setup block
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['DHT_config_hub'] = function(block) {
  var dht = block.getFieldValue('NAMEDHT');
  var dhtType = block.getFieldValue('DHTTYPE');
  
  //the hub saved the connector in the attached block
  var hubconnector = block['connector'] || ['0']
  //compute the pins, normally only possible to attach at valid pins
  var pin = hubconnector[0];

  var dhtName = 'myDHT' + dht;
  //dht is a variable containing the used pins
  Blockly.Arduino.addVariable(dht,
    'int ' + dht + ' = ' + pin + ';', true);
  
  Blockly.Arduino.addInclude('dht', '#include <DHT.h>');
  Blockly.Arduino.addDeclaration('dht_' + dhtName, 'DHT ' + dhtName + '(' + 
                                 dht + ', ' + dhtType + ');');
  Blockly.Arduino.reservePin(block, pin, Blockly.Arduino.PinTypes.INPUT, 'DHT Read');

  var setupCode = dhtName + '.begin();';
  Blockly.Arduino.addSetup('dht_' + dhtName, setupCode, true);

  return '';
};

/**
 * Code generator to read the temperature of a DHT.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['DHT_readTemp'] = function(block) {
  var dhtInstanceName = block.getFieldValue('DHT_NAME');
  var dhtName = 'myDHT' + dhtInstanceName;
  var dhtNameTemp = dhtName + 'Temp';
  var dhtNameTemptmp = dhtName + 'Temptmp';

  Blockly.Arduino.addDeclaration(dhtNameTemptmp, 'float ' + dhtNameTemptmp + ' = 200;');
  Blockly.Arduino.addDeclaration(dhtNameTemp, 'float ' + dhtNameTemp + ' = 200;');
  
  var readTcode = `float DHTNAME_readT() {
  DHTNAMETEMPTMP = DHTNAME.readTemperature();
  if (! isnan(DHTNAMETEMPTMP) ) {
    //override stored temperature only on good reading
    DHTNAMETEMP = DHTNAMETEMPTMP;
  }
  return DHTNAMETEMP;
}
`
  Blockly.Arduino.addFunction(dhtNameTemp, readTcode
        .replace(new RegExp('DHTNAMETEMPTMP', 'g'), dhtNameTemptmp)
        .replace(new RegExp('DHTNAMETEMP', 'g'), dhtNameTemp)
        .replace(new RegExp('DHTNAME', 'g'), dhtName)
                             );

  //var code = dhtName + '.readTemperature()';
  var code = dhtName + '_readT()'
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

