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
  
  Blockly.Arduino.addInclude('dht', '#include <DHT.h>  // version 1.3.1');
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
  DHTNAMETEMPTMP = DHTNAME.readTemperature(false); //read Celsius
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


/**
 * Code generator to read the RH of a DHT.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['DHT_readRH'] = function(block) {
  var dhtInstanceName = block.getFieldValue('DHT_NAME');
  var dhtName = 'myDHT' + dhtInstanceName;
  var dhtNameRH = dhtName + 'RH';
  var dhtNameRHtmp = dhtName + 'RHtmp';

  Blockly.Arduino.addDeclaration(dhtNameRHtmp, 'float ' + dhtNameRHtmp + ' = 0.;');
  Blockly.Arduino.addDeclaration(dhtNameRH, 'float ' + dhtNameRH + ' = 0.;');
  
  var readTcode = `float DHTNAME_readRH() {
  DHTNAMERHTMP = DHTNAME.readHumidity();
  if (! isnan(DHTNAMERHTMP) ) {
    //override stored RH only on good reading
    DHTNAMERH = DHTNAMERHTMP;
  }
  return DHTNAMERH;
}
`
  Blockly.Arduino.addFunction(dhtNameRH, readTcode
        .replace(new RegExp('DHTNAMERHTMP', 'g'), dhtNameRHtmp)
        .replace(new RegExp('DHTNAMERH', 'g'), dhtNameRH)
        .replace(new RegExp('DHTNAME', 'g'), dhtName)
                             );

  //var code = dhtName + '.readTemperature()';
  var code = dhtName + '_readRH()'
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

/**
 * Code generator to read the Heat Index of a DHT.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['DHT_readHeatIndex'] = function(block) {
  var dhtInstanceName = block.getFieldValue('DHT_NAME');
  var dhtName = 'myDHT' + dhtInstanceName;
  var dhtNameHI = dhtName + 'HI';
  var dhtNameHItmp = dhtName + 'HItmp';

  Blockly.Arduino.addDeclaration(dhtNameHItmp, 'float ' + dhtNameHItmp + ' = 200;');
  Blockly.Arduino.addDeclaration(dhtNameHI, 'float ' + dhtNameHI + ' = 200;');
  
  var readTcode = `float DHTNAME_readHI() {
  DHTNAMEHITMP = DHTNAME.computeHeatIndex(DHTNAME.readTemperature(false), DHTNAME.readHumidity(), false);
  if (! isnan(DHTNAMEHITMP) ) {
    //override stored temperature only on good reading
    DHTNAMEHI = DHTNAMEHITMP;
  }
  return DHTNAMEHI;
}
`
  Blockly.Arduino.addFunction(dhtNameHI, readTcode
        .replace(new RegExp('DHTNAMEHITMP', 'g'), dhtNameHItmp)
        .replace(new RegExp('DHTNAMEHI', 'g'), dhtNameHI)
        .replace(new RegExp('DHTNAME', 'g'), dhtName)
                             );

  var code = dhtName + '_readHI()'
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

/**
 * The IRReceiver setup block
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['IR_config_hub'] = function(block) {
  var ir = block.getFieldValue('NAMEIR');
  
  //the hub saved the connector in the attached block
  var hubconnector = block['connector'] || ['0']
  //compute the pins, normally only possible to attach at valid pins
  var pin = hubconnector[0];
//IR myIRIR_Sensor(IR_Sensor);
  var irName = 'myIR' + ir;
  //ir is a variable containing the used pins
  Blockly.Arduino.addVariable(ir,
    'int ' + ir + ' = ' + pin + ';', true);
    
  Blockly.Arduino.addInclude('ir', '#include <IRremote.h>  // version 2.0.1');
  Blockly.Arduino.addDeclaration('ir_' + irName, 'IRrecv ' + irName + '(' + 
                                 ir + ');');
  Blockly.Arduino.reservePin(block, pin, Blockly.Arduino.PinTypes.INPUT, 'IR Read');

  var setupCode = irName + '.enableIRIn();';
  Blockly.Arduino.addSetup('ir_' + irName, setupCode, true);

  return '';
};

/**
 * Code generator to read the HEX value of a IR receiver.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['IR_readCode'] = function(block) {
  var irInstanceName = block.getFieldValue('IR_NAME');
  var irName = 'myIR' + irInstanceName;
  var irNameCode = irName + 'Code';

  //Blockly.Arduino.addDeclaration(irNameCode, 'unsigned long ' + irNameCode + ' = 200;');
  Blockly.Arduino.addDeclaration('result', 'decode_results ' + 'result;');
  
  var readTcode = `unsigned long IRNAME_readT() {
  while(!IRNAME.decode(&result)) {
	  delay(500);
  }
  unsigned long retCode = result.value;
  IRNAME.resume();
  return retCode;
}
`
  Blockly.Arduino.addFunction(irNameCode, readTcode
//        .replace(new RegExp('IRNAMECODE', 'g'), irNameCode)
        .replace(new RegExp('IRNAME', 'g'), irName)
                             );

  var code = irName + '_readT()'
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

