/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Arduino code generator for the Allbot Servo library blocks.
 *     The Arduino Servo library docs: http://arduino.cc/en/reference/servo
 *     Allbot: allbot.eu
 *
 */
'use strict';

goog.provide('Blockly.Arduino.allbot');

goog.require('Blockly.Arduino');


/**
 * The allbot servo setup block
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['allbotservo_config_hub'] = function(block) {
  var servo = block.getFieldValue('NAMESERVO');
  
  //the hub saved the connector in the attached block
  var hubconnector = block['connector'] || ['2']
  //compute the pins, normally only possible to attach at valid pins
  var pin = hubconnector[0];

  //servo is a variable containing the used pins
  Blockly.Arduino.addVariable(servo,
    'int pin' + servo + ' = ' + pin + ';', true);
  
  // find type of allbot
  var allbot = Blockly.Arduino.Boards.selected;
  var jointselected = -1;
  if (allbot['joints'] !== undefined) {
    for (var jointnr in allbot.joints.name) {
      if (allbot.joints.name[jointnr][1] == servo) {
        jointselected = jointnr;
      }
    }
    if (jointselected > -1) {
      var allbotdecl = 'ALLBOT BOT(' + allbot.joints.initangle.length + ');   // Number of motors);\n\n'
        + 'enum MotorName {\n';
      for (var jointnr in allbot.joints.name) {
        allbotdecl += '  ' + allbot.joints.name[jointnr][1] + ',\n';
      }
      allbotdecl += '};';
      Blockly.Arduino.addVariable('ALLBOT', allbotdecl, true);
      Blockly.Arduino.reservePin(block, pin, Blockly.Arduino.PinTypes.SERVO, 'Servo Write');
      
      var setupCode = 'BOT.attach(' + servo + ', ' + pin + ', ' + allbot.joints.initangle[jointselected] + ', ' + allbot.joints.flipped[jointselected] + ', 0);';
      Blockly.Arduino.addSetup('allbot1_' + servo, setupCode, true);
      Blockly.Arduino.addSetup('allbot2_all', '  // Wait for joints to be initialized\n' +
                               '  delay(500);', true);
    } else {
      Blockly.Arduino.addDeclaration('// Unknown AllBot joint selected');
    }
    
  } else {
    Blockly.Arduino.addDeclaration('// No AllBot on the workspace. Add it to generate code');
  }
  
  return '';
};


/** Object to contain all AllBot predefined functions. */
var allbotfunctions = new Object();
allbotfunctions.VR204 = {
  chirp: `
void chirp(int beeps, int speedms){

  for (int i = 0; i < beeps; i++){
    for (int i = 0; i < 255; i++){
      digitalWrite(sounderPin, HIGH);
      delayMicroseconds((355-i)+ (speedms*2));
      digitalWrite(sounderPin, LOW);
      delayMicroseconds((355-i)+ (speedms*2));
    }
     delay(30);
  }
}`,
  walkbackward: `
void walkbackward(int steps, int speedms){
    BOT.move(hipLeft, 130);
    BOT.move(hipRight, 40); 
    BOT.animate(speedms);

    for (int i = 0; i < steps; i++){
      BOT.move(ankleLeft, 135);
      BOT.animate(speedms*2);
  
      BOT.move(ankleRight, 45);
      BOT.animate(speedms*2);
  
      BOT.move(ankleLeft, 90);
      BOT.animate(speedms*2);
  
      BOT.move(ankleRight, 90);
      BOT.animate(speedms*2);
    }

    BOT.move(hipLeft, 90);
    BOT.move(hipRight, 90); 
    BOT.animate(speedms);
}`,
  walkforward: `
void walkforward(int steps, int speedms){
    BOT.move(hipLeft, 130);
    BOT.move(hipRight, 40); 
    BOT.animate(speedms);

    for (int i = 0; i < steps; i++){
      BOT.move(ankleLeft, 45);
      BOT.animate(speedms*2);
  
      BOT.move(ankleRight, 135);
      BOT.animate(speedms*2);
  
      BOT.move(ankleLeft, 90);
      BOT.animate(speedms*2);
  
      BOT.move(ankleRight, 90);
      BOT.animate(speedms*2);
    }

    BOT.move(hipLeft, 90);
    BOT.move(hipRight, 90); 
    BOT.animate(speedms);
}`,
  lookright: `
void lookright(int speedms){
    BOT.move(hipLeft, 45);
    BOT.move(hipRight, 135);
    BOT.animate(speedms);
    
    delay(speedms/2);
    
    BOT.move(hipLeft, 90);
    BOT.move(hipRight, 90);
    BOT.animate(speedms);
}`,
  lookleft: `
void lookleft(int speedms){
    BOT.move(hipLeft, 135);
    BOT.move(hipRight, 45);
    BOT.animate(speedms);
    
    delay(speedms/2);
    
    BOT.move(hipLeft, 90);
    BOT.move(hipRight, 90);
    BOT.animate(speedms);
}`,
  walkright: `
void walkright(int steps, int speedms){
  for (int i = 0; i < steps; i++){
    BOT.move(ankleRight, 45);
    BOT.animate(speedms);

    BOT.move(ankleLeft, 135);
    BOT.animate(speedms);

    BOT.move(ankleRight, 90);
    BOT.animate(speedms);

    BOT.move(ankleLeft, 90);
    BOT.animate(speedms);
  }
}`,
  walkleft: `
void walkleft(int steps, int speedms){
  for (int i = 0; i < steps; i++){
    BOT.move(ankleLeft, 45);
    BOT.animate(speedms);

    BOT.move(ankleRight, 135);
    BOT.animate(speedms);

    BOT.move(ankleLeft, 90);
    BOT.animate(speedms);

    BOT.move(ankleRight, 90);
    BOT.animate(speedms);
  }
}`,
  scared: `
void scared(int shakes, int beeps){
    
    for (int i = 0; i < shakes; i++){

      BOT.move(ankleLeft, 45);
      BOT.move(ankleRight, 45);
      BOT.animate(100);
      
      BOT.move(ankleLeft, 135);
      BOT.move(ankleRight, 135);
      BOT.animate(100);
    }    
    BOT.move(ankleLeft, 90);
    BOT.move(ankleRight, 90);
    BOT.animate(100);
    
    chirp(beeps, 0);
}`
}


/**
 * The allbot walk forward block
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['allbot_walkforward'] = function(block) {
  var steps = Blockly.Arduino.valueToCode(
      block, 'STEPS', Blockly.Arduino.ORDER_ATOMIC) || '1';
  var speed = Blockly.Arduino.valueToCode(
      block, 'SPEED', Blockly.Arduino.ORDER_ATOMIC) || '200';
  
  var code = '';
  // find type of allbot
  var allbot = Blockly.Arduino.Boards.selected;
  if (allbot['allbotname'] !== undefined) {
    var func = allbotfunctions[allbot.allbotname].walkforward;
    Blockly.Arduino.addFunction('walkforward', func)
    code = 'walkforward(' + steps + ', ' + speed + ');';
  } else {
    code = '// No AllBot on the workspace. Add it to generate code';
  }
  
  return code;
};
