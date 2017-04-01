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
      Blockly.Arduino.addSetup('allbot2_' + servo, '  // Wait for joints to be initialized\n' +
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

//  VR408    *******************************************************
allbotfunctions.VR408 = {
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
  for (int i = 0; i < steps; i++){
    BOT.move(kneeRearRight, 80);
    BOT.move(kneeFrontLeft, 80);
    BOT.animate(speedms);
    
    BOT.move(hipRearRight, 20);
    BOT.move(hipFrontLeft, 80);
    BOT.animate(speedms);

    BOT.move(kneeRearRight, 30);
    BOT.move(kneeFrontLeft, 30);
    BOT.animate(speedms);
    
    BOT.move(hipRearRight, 45);
    BOT.move(hipFrontLeft, 45);
    BOT.animate(speedms);
    
    BOT.move(kneeRearRight, 45);
    BOT.move(kneeFrontLeft, 45);
    BOT.animate(speedms);
    
    BOT.move(kneeRearLeft, 80);
    BOT.move(kneeFrontRight, 80);
    BOT.animate(speedms);
    
    BOT.move(hipRearLeft, 20);
    BOT.move(hipFrontRight, 80);
    BOT.animate(speedms);

    BOT.move(kneeRearLeft, 30);
    BOT.move(kneeFrontRight, 30);
    BOT.animate(speedms);
    
    BOT.move(hipRearLeft, 45);
    BOT.move(hipFrontRight, 45);
    BOT.animate(speedms);
    
    BOT.move(kneeRearLeft, 45);
    BOT.move(kneeFrontRight, 45);
    BOT.animate(speedms);
  }
}`,
  walkforward: `
void walkforward(int steps, int speedms){
  for (int i = 0; i < steps; i++){
    BOT.move(kneeRearRight, 80);
    BOT.move(kneeFrontLeft, 80);
    BOT.animate(speedms);
    
    BOT.move(hipRearRight, 80);
    BOT.move(hipFrontLeft, 20);
    BOT.animate(speedms);

    BOT.move(kneeRearRight, 30);
    BOT.move(kneeFrontLeft, 30);
    BOT.animate(speedms);
    
    BOT.move(hipRearRight, 45);
    BOT.move(hipFrontLeft, 45);
    BOT.animate(speedms);
    
    BOT.move(kneeRearRight, 45);
    BOT.move(kneeFrontLeft, 45);
    BOT.animate(speedms);
    
    BOT.move(kneeRearLeft, 80);
    BOT.move(kneeFrontRight, 80);
    BOT.animate(speedms);
    
    BOT.move(hipRearLeft, 80);
    BOT.move(hipFrontRight, 20);
    BOT.animate(speedms);

    BOT.move(kneeRearLeft, 30);
    BOT.move(kneeFrontRight, 30);
    BOT.animate(speedms);
    
    BOT.move(hipRearLeft, 45);
    BOT.move(hipFrontRight, 45);
    BOT.animate(speedms);
    
    BOT.move(kneeRearLeft, 45);
    BOT.move(kneeFrontRight, 45);
    BOT.animate(speedms);
  }
}`,
  walkleft: `
void walkleft(int steps, int speedms){
  for (int i = 0; i < steps; i++){
    BOT.move(kneeRearRight, 80);
    BOT.move(kneeFrontLeft, 80);
    BOT.animate(speedms);
    
    BOT.move(hipRearRight, 0);
    BOT.move(hipFrontLeft, 90);
    BOT.animate(speedms);

    BOT.move(kneeRearRight, 30);
    BOT.move(kneeFrontLeft, 30);
    BOT.animate(speedms);
    
    BOT.move(hipRearRight, 45);
    BOT.move(hipFrontLeft, 45);
    BOT.animate(speedms);
    
    BOT.move(kneeRearRight, 45);
    BOT.move(kneeFrontLeft, 45);
    BOT.animate(speedms);
     
    BOT.move(kneeRearLeft, 80);
    BOT.move(kneeFrontRight, 80);
    BOT.animate(speedms);
    
    BOT.move(hipRearLeft, 90);
    BOT.move(hipFrontRight, 0);
    BOT.animate(speedms);

    BOT.move(kneeRearLeft, 30);
    BOT.move(kneeFrontRight, 30);
    BOT.animate(speedms);
    
    BOT.move(hipRearLeft, 45);
    BOT.move(hipFrontRight, 45);
    BOT.animate(speedms);
    
    BOT.move(kneeRearLeft, 45);
    BOT.move(kneeFrontRight, 45);
    BOT.animate(speedms);
  }
}`,
  walkright: `
void walkright(int steps, int speedms){
  for (int i = 0; i < steps; i++){
    BOT.move(kneeRearLeft, 80);
    BOT.move(kneeFrontRight, 80);
    BOT.animate(speedms);
    
    BOT.move(hipRearLeft, 0);
    BOT.move(hipFrontRight, 90);
    BOT.animate(speedms);

    BOT.move(kneeRearLeft, 30);
    BOT.move(kneeFrontRight, 30);
    BOT.animate(speedms);
    
    BOT.move(hipRearLeft, 45);
    BOT.move(hipFrontRight, 45);
    BOT.animate(speedms);
    
    BOT.move(kneeRearLeft, 45);
    BOT.move(kneeFrontRight, 45);
    BOT.animate(speedms);
     
    BOT.move(kneeRearRight, 80);
    BOT.move(kneeFrontLeft, 80);
    BOT.animate(speedms);
    
    BOT.move(hipRearRight, 90);
    BOT.move(hipFrontLeft, 0);
    BOT.animate(speedms);

    BOT.move(kneeRearRight, 30);
    BOT.move(kneeFrontLeft, 30);
    BOT.animate(speedms);
    
    BOT.move(hipRearRight, 45);
    BOT.move(hipFrontLeft, 45);
    BOT.animate(speedms);
    
    BOT.move(kneeRearRight, 45);
    BOT.move(kneeFrontLeft, 45);
    BOT.animate(speedms);
  }
}`,
  lookright: `
void lookright(int speedms){
    BOT.move(hipRearRight, 80);
    BOT.move(hipRearLeft, 10);
    BOT.move(hipFrontRight, 10);
    BOT.move(hipFrontLeft, 80);
    BOT.animate(speedms);
    
    delay(speedms/2);
    
    BOT.move(hipRearRight, 45);
    BOT.move(hipRearLeft, 45);
    BOT.move(hipFrontRight, 45);
    BOT.move(hipFrontLeft, 45);
    BOT.animate(speedms);
}`,
  lookleft: `
void lookleft(int speedms){
    BOT.move(hipRearLeft, 80);
    BOT.move(hipRearRight, 10);
    BOT.move(hipFrontLeft, 10);
    BOT.move(hipFrontRight, 80);
    BOT.animate(speedms);
    
    delay(speedms/2);
    
    BOT.move(hipRearRight, 45);
    BOT.move(hipRearLeft, 45);
    BOT.move(hipFrontRight, 45);
    BOT.move(hipFrontLeft, 45);
    BOT.animate(speedms);
}`,
  leanright: `
void leanright(int speedms){
    BOT.move(kneeFrontRight, 90);
    BOT.move(kneeRearRight, 90);
    BOT.animate(speedms);
    
    delay(speedms/2);
    
    BOT.move(kneeFrontRight, 45);
    BOT.move(kneeRearRight, 45);
    BOT.animate(speedms);
}`,
  leanleft: `
void leanleft(int speedms){
    BOT.move(kneeFrontLeft, 90);
    BOT.move(kneeRearLeft, 90);
    BOT.animate(speedms);
    
    delay(speedms/2);
    
    BOT.move(kneeFrontLeft, 45);
    BOT.move(kneeRearLeft, 45);
    BOT.animate(speedms);
}`,
  leanforward: `
void leanforward(int speedms){
    BOT.move(kneeFrontLeft, 90);
    BOT.move(kneeFrontRight, 90);
    BOT.animate(speedms);
    
    delay(speedms/2);
    
    BOT.move(kneeFrontLeft, 45);
    BOT.move(kneeFrontRight, 45);
    BOT.animate(speedms);
}`,
  leanbackward: `
void leanbackward(int speedms){
    BOT.move(kneeRearLeft, 90);
    BOT.move(kneeRearRight, 90);
    BOT.animate(speedms);
    
    delay(speedms/2);
    
    BOT.move(kneeRearLeft, 45);
    BOT.move(kneeRearRight, 45);
    BOT.animate(speedms);
}`,
  turnleft: `
void turnleft(int steps, int speedms){
  for (int i = 0; i < steps; i++){
    BOT.move(kneeRearRight, 80);
    BOT.move(kneeFrontLeft, 80);
    BOT.animate(speedms);
    
    BOT.move(hipRearRight, 90);
    BOT.move(hipFrontLeft, 90);
    BOT.animate(speedms);

    BOT.move(kneeRearRight, 30);
    BOT.move(kneeFrontLeft, 30);
    BOT.animate(speedms);
    
    BOT.move(hipRearRight, 45);
    BOT.move(hipFrontLeft, 45);
    BOT.animate(speedms);
    
    BOT.move(kneeRearRight, 45);
    BOT.move(kneeFrontLeft, 45);
    BOT.animate(speedms);
    
    BOT.move(kneeRearLeft, 80);
    BOT.move(kneeFrontRight, 80);
    BOT.animate(speedms);
    
    BOT.move(hipRearLeft, 0);
    BOT.move(hipFrontRight, 0);
    BOT.animate(speedms);

    BOT.move(kneeRearLeft, 30);
    BOT.move(kneeFrontRight, 30);
    BOT.animate(speedms);
    
    BOT.move(hipRearLeft, 45);
    BOT.move(hipFrontRight, 45);
    BOT.animate(speedms);
    
    BOT.move(kneeRearLeft, 45);
    BOT.move(kneeFrontRight, 45);
    BOT.animate(speedms);
  }
}`,
  turnright: `
void turnright(int steps, int speedms){
  for (int i = 0; i < steps; i++){
    BOT.move(kneeRearRight, 80);
    BOT.move(kneeFrontLeft, 80);
    BOT.animate(speedms);
    
    BOT.move(hipRearRight, 0);
    BOT.move(hipFrontLeft, 0);
    BOT.animate(speedms);

    BOT.move(kneeRearRight, 30);
    BOT.move(kneeFrontLeft, 30);
    BOT.animate(speedms);
    
    BOT.move(hipRearRight, 45);
    BOT.move(hipFrontLeft, 45);
    BOT.animate(speedms);
    
    BOT.move(kneeRearRight, 45);
    BOT.move(kneeFrontLeft, 45);
    BOT.animate(speedms);
    
    BOT.move(kneeRearLeft, 80);
    BOT.move(kneeFrontRight, 80);
    BOT.animate(speedms);
    
    BOT.move(hipRearLeft, 90);
    BOT.move(hipFrontRight, 90);
    BOT.animate(speedms);

    BOT.move(kneeRearLeft, 30);
    BOT.move(kneeFrontRight, 30);
    BOT.animate(speedms);
    
    BOT.move(hipRearLeft, 45);
    BOT.move(hipFrontRight, 45);
    BOT.animate(speedms);
    
    BOT.move(kneeRearLeft, 45);
    BOT.move(kneeFrontRight, 45);
    BOT.animate(speedms);
  }
}`,
  scared: `
void scared(int shakes, int beeps){
    BOT.move(kneeFrontRight, 0);
    BOT.move(kneeRearRight, 0);
    BOT.move(kneeFrontLeft, 0);
    BOT.move(kneeRearLeft, 0);
    BOT.animate(50);
    
    for (int i = 0; i < shakes; i++){
 
      BOT.move(hipRearRight, 80);
      BOT.move(hipRearLeft, 10);
      BOT.move(hipFrontRight, 10);
      BOT.move(hipFrontLeft, 80);
      BOT.animate(100);
      
      BOT.move(hipRearLeft, 80);
      BOT.move(hipRearRight, 10);
      BOT.move(hipFrontLeft, 10);
      BOT.move(hipFrontRight, 80);
      BOT.animate(50);
    }
    
    BOT.move(hipRearRight, 45);
    BOT.move(hipRearLeft, 45);
    BOT.move(hipFrontRight, 45);
    BOT.move(hipFrontLeft, 45);
    BOT.animate(200);
    
    chirp(beeps, 0);
    
    BOT.move(kneeFrontRight, 45);
    BOT.move(kneeRearRight, 45);
    BOT.move(kneeFrontLeft, 45);
    BOT.move(kneeRearLeft, 45);
    BOT.animate(75);
}`
}
//  VR412    *******************************************************
allbotfunctions.VR412 = {
  standup: `
void standup(){

  BOT.move(kneeFrontLeft, 110);
  BOT.move(kneeFrontRight, 110);
  BOT.animate(500);

  BOT.move(kneeRearLeft, 110);
  BOT.move(kneeRearRight, 110);
  BOT.animate(500);

  BOT.move(kneeFrontLeft, 90);
  BOT.animate(100);
  BOT.move(ankleFrontLeft, 20);
  BOT.animate(100);
  BOT.move(kneeFrontLeft, 110);
  BOT.animate(100);

  BOT.move(kneeFrontRight, 90);
  BOT.animate(100);
  BOT.move(ankleFrontRight, 20);
  BOT.animate(100);
  BOT.move(kneeFrontRight, 110);
  BOT.animate(100);

  BOT.move(kneeRearLeft, 90);
  BOT.animate(100);
  BOT.move(ankleRearLeft, 20);
  BOT.animate(100);
  BOT.move(kneeRearLeft, 110);
  BOT.animate(100);

  BOT.move(kneeRearRight, 90);
  BOT.animate(100);
  BOT.move(ankleRearRight, 20);
  BOT.animate(100);
  BOT.move(kneeRearRight, 110);
  BOT.animate(100);
}`,
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
  for (int i = 0; i < steps; i++){
    BOT.move(kneeFrontRight, 80);
    BOT.move(hipFrontRight, 80);
    BOT.animate(speedms);

    BOT.move(kneeFrontRight, 110);
    BOT.animate(speedms);

    BOT.move(kneeRearRight, 80);
    BOT.move(hipRearRight, 10);
    BOT.animate(speedms);

    BOT.move(kneeRearRight, 110);
    BOT.animate(speedms);

    BOT.move(hipRearRight, 45);
    BOT.move(hipFrontRight, 45);
    BOT.animate(speedms);

    BOT.move(kneeFrontLeft, 80);
    BOT.move(hipFrontLeft, 80);
    BOT.animate(speedms);

    BOT.move(kneeFrontLeft, 110);
    BOT.animate(speedms);

    BOT.move(kneeRearLeft, 80);
    BOT.move(hipRearLeft, 10);
    BOT.animate(speedms);

    BOT.move(kneeRearLeft, 110);
    BOT.animate(speedms);

    BOT.move(hipRearLeft, 45);
    BOT.move(hipFrontLeft, 45);
    BOT.animate(speedms);
  }
}`,
  walkforward: `
void walkforward(int steps, int speedms){
  for (int i = 0; i < steps; i++){ 
    BOT.move(kneeRearRight, 80);
    BOT.move(hipRearRight, 80);
    BOT.animate(speedms);

    BOT.move(kneeRearRight, 110);
    BOT.animate(speedms);

    BOT.move(kneeFrontRight, 80);
    BOT.move(hipFrontRight, 10);
    BOT.animate(speedms);

    BOT.move(kneeFrontRight, 110);
    BOT.animate(speedms);

    BOT.move(hipFrontRight, 45);
    BOT.move(hipRearRight, 45);
    BOT.animate(speedms);

    BOT.move(kneeRearLeft, 80);
    BOT.move(hipRearLeft, 80);
    BOT.animate(speedms);

    BOT.move(kneeRearLeft, 110);
    BOT.animate(speedms);

    BOT.move(kneeFrontLeft, 80);
    BOT.move(hipFrontLeft, 10);
    BOT.animate(speedms);

    BOT.move(kneeFrontLeft, 110);
    BOT.animate(speedms);

    BOT.move(hipFrontLeft, 45);
    BOT.move(hipRearLeft, 45);
    BOT.animate(speedms);
  }
}`,
  walkleft: `
void walkleft(int steps, int speedms){
  for (int i = 0; i < steps; i++){
    BOT.move(kneeRearRight, 80);
    BOT.move(hipRearRight, 10);
    BOT.animate(speedms);

    BOT.move(kneeRearRight, 110);
    BOT.animate(speedms);

    BOT.move(kneeRearLeft, 80);
    BOT.move(hipRearLeft, 80);
    BOT.animate(speedms);

    BOT.move(kneeRearLeft, 110);
    BOT.animate(speedms);

    BOT.move(hipRearLeft, 45);
    BOT.move(hipRearRight, 45);
    BOT.animate(speedms);

    BOT.move(kneeFrontRight, 80);
    BOT.move(hipFrontRight, 10);
    BOT.animate(speedms);

    BOT.move(kneeFrontRight, 110);
    BOT.animate(speedms);

    BOT.move(kneeFrontLeft, 80);
    BOT.move(hipFrontLeft, 80);
    BOT.animate(speedms);

    BOT.move(kneeFrontLeft, 110);
    BOT.animate(speedms);

    BOT.move(hipFrontLeft, 45);
    BOT.move(hipFrontRight, 45);
    BOT.animate(speedms);
  }
}`,
  walkright: `
void walkright(int steps, int speedms){
  for (int i = 0; i < steps; i++){
    BOT.move(kneeRearLeft, 80);
    BOT.move(hipRearLeft, 10);
    BOT.animate(speedms);

    BOT.move(kneeRearLeft, 110);
    BOT.animate(speedms);
    
    BOT.move(kneeRearRight, 80);
    BOT.move(hipRearRight, 80);
    BOT.animate(speedms);

    BOT.move(kneeRearRight, 110);
    BOT.animate(speedms);

    BOT.move(hipRearLeft, 45);
    BOT.move(hipRearRight, 45);
    BOT.animate(speedms);
    
    BOT.move(kneeFrontLeft, 80);
    BOT.move(hipFrontLeft, 10);
    BOT.animate(speedms);

    BOT.move(kneeFrontLeft, 110);
    BOT.animate(speedms);

    BOT.move(kneeFrontRight, 80);
    BOT.move(hipFrontRight, 80);
    BOT.animate(speedms);

    BOT.move(kneeFrontRight, 110);
    BOT.animate(speedms);

    BOT.move(hipFrontLeft, 45);
    BOT.move(hipFrontRight, 45);
    BOT.animate(speedms);
  }
}`,
  lookright: `
void lookright(int speedms){
    BOT.move(hipRearRight, 80);
    BOT.move(hipRearLeft, 10);
    BOT.move(hipFrontRight, 10);
    BOT.move(hipFrontLeft, 80);
    BOT.animate(speedms);
    
    delay(speedms/2);
    
    BOT.move(hipRearRight, 45);
    BOT.move(hipRearLeft, 45);
    BOT.move(hipFrontRight, 45);
    BOT.move(hipFrontLeft, 45);
    BOT.animate(speedms);
}`,
  lookleft: `
void lookleft(int speedms){
    BOT.move(hipRearLeft, 80);
    BOT.move(hipRearRight, 10);
    BOT.move(hipFrontLeft, 10);
    BOT.move(hipFrontRight, 80);
    BOT.animate(speedms);
    
    delay(speedms/2);
    
    BOT.move(hipRearRight, 45);
    BOT.move(hipRearLeft, 45);
    BOT.move(hipFrontRight, 45);
    BOT.move(hipFrontLeft, 45);
    BOT.animate(speedms);
}`,
  leanright: `
void leanright(int speedms){
    BOT.move(kneeFrontRight, 80);
    BOT.move(kneeRearRight, 80);
    BOT.move(ankleFrontRight, 0);
    BOT.move(ankleRearRight, 0);
    BOT.animate(speedms*2);
    
    delay(speedms*3);

    BOT.move(kneeFrontRight, 110);  
    BOT.move(kneeRearRight, 110);
    BOT.move(ankleFrontRight, 20);
    BOT.move(ankleRearRight, 20);
    BOT.animate(speedms*2);
}`,
  leanleft: `
void leanleft(int speedms){
    BOT.move(kneeFrontLeft, 80);
    BOT.move(kneeRearLeft, 80);
    BOT.move(ankleFrontLeft, 0);
    BOT.move(ankleRearLeft, 0);
    BOT.animate(speedms*2);
    
    delay(speedms*3);

    BOT.move(kneeFrontLeft, 110);  
    BOT.move(kneeRearLeft, 110);
    BOT.move(ankleFrontLeft, 20);
    BOT.move(ankleRearLeft, 20);
    BOT.animate(speedms*2);
}`,
  leanforward: `
void leanforward(int speedms){
    BOT.move(kneeFrontLeft, 80);
    BOT.move(kneeFrontRight, 80);
    BOT.move(ankleFrontLeft, 0);
    BOT.move(ankleFrontRight, 0);
    BOT.animate(speedms*2);
    
    delay(speedms*3);

    BOT.move(kneeFrontLeft, 110);
    BOT.move(kneeFrontRight, 110);
    BOT.move(ankleFrontLeft, 20);
    BOT.move(ankleFrontRight, 20);
    BOT.animate(speedms*2);
}`,
  leanbackward: `
void leanbackward(int speedms){
    BOT.move(kneeRearLeft, 80);
    BOT.move(kneeRearRight, 80);
    BOT.move(ankleRearLeft, 0);
    BOT.move(ankleRearRight, 0);
    BOT.animate(speedms*2);
    
    delay(speedms*3);

    BOT.move(kneeRearLeft, 110);
    BOT.move(kneeRearRight, 110);
    BOT.move(ankleRearLeft, 20);
    BOT.move(ankleRearRight, 20);
    BOT.animate(speedms*2);

}`,
  turnleft: `
void turnleft(int steps, int speedms){
  for (int i = 0; i < steps; i++){
    BOT.move(kneeRearLeft, 80);
    BOT.move(hipRearLeft, 10);
    BOT.animate(speedms);

    BOT.move(kneeRearLeft, 110);
    BOT.animate(speedms);

    BOT.move(kneeRearRight, 80);
    BOT.move(hipRearRight, 80);
    BOT.animate(speedms);

    BOT.move(kneeRearRight, 110);
    BOT.animate(speedms);

    BOT.move(kneeFrontRight, 80);
    BOT.move(hipFrontRight, 10);
    BOT.animate(speedms);

    BOT.move(kneeFrontRight, 110);
    BOT.animate(speedms);
    
    BOT.move(kneeFrontLeft, 80);
    BOT.move(hipFrontLeft, 80);
    BOT.animate(speedms);

    BOT.move(kneeFrontLeft, 110);
    BOT.animate(speedms);

    BOT.move(hipFrontLeft, 45);
    BOT.move(hipFrontRight, 45);
    BOT.move(hipRearLeft, 45);
    BOT.move(hipRearRight, 45);
    BOT.animate(speedms);
  }
}`,
  turnright: `
void turnright(int steps, int speedms){
  for (int i = 0; i < steps; i++){
    BOT.move(kneeRearRight, 80);
    BOT.move(hipRearRight, 10);
    BOT.animate(speedms);

    BOT.move(kneeRearRight, 110);
    BOT.animate(speedms);

    BOT.move(kneeRearLeft, 80);
    BOT.move(hipRearLeft, 80);
    BOT.animate(speedms);

    BOT.move(kneeRearLeft, 110);
    BOT.animate(speedms);

    BOT.move(kneeFrontLeft, 80);
    BOT.move(hipFrontLeft, 10);
    BOT.animate(speedms);

    BOT.move(kneeFrontLeft, 110);
    BOT.animate(speedms);
    
    BOT.move(kneeFrontRight, 80);
    BOT.move(hipFrontRight, 80);
    BOT.animate(speedms);

    BOT.move(kneeFrontRight, 110);
    BOT.animate(speedms);

    BOT.move(hipFrontLeft, 45);
    BOT.move(hipFrontRight, 45);
    BOT.move(hipRearLeft, 45);
    BOT.move(hipRearRight, 45);
    BOT.animate(speedms);
  }
}`,
  scared: `
void scared(int shakes, int beeps){
    for (int i = 0; i < shakes; i++){
      BOT.move(kneeFrontLeft, 80);
      BOT.move(kneeFrontRight, 80);
      BOT.move(kneeRearLeft, 80);
      BOT.move(kneeRearRight, 80);
      BOT.move(ankleFrontLeft, 0);
      BOT.move(ankleFrontRight, 0);
      BOT.move(ankleRearLeft, 0);
      BOT.move(ankleRearRight, 0);
      BOT.animate(30);
  
      BOT.move(kneeFrontLeft, 110);  
      BOT.move(kneeFrontRight, 110); 
      BOT.move(kneeRearLeft, 110);
      BOT.move(kneeRearRight, 110);
      BOT.move(ankleFrontLeft, 20);
      BOT.move(ankleFrontRight, 20);
      BOT.move(ankleRearLeft, 20);
      BOT.move(ankleRearRight, 20);
      BOT.animate(30);
    }
    chirp(beeps, 0);
}`
}

//  VR612    *******************************************************
allbotfunctions.VR612 = {
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
  
    BOT.move(kneeFrontLeft, 50);
    BOT.move(kneeRearLeft, 50);
    BOT.move(hipFrontLeft, 15);
    BOT.move(hipFrontRight, 75);
    
    BOT.move(hipFrontLeft, 80);
    BOT.move(hipRearLeft, 5);
    BOT.move(hipMiddleRight, 115);
    BOT.animate(speedms);//
  
  for (int i = 0; i < steps; i++){
    BOT.move(kneeFrontLeft, 10);
    BOT.move(kneeRearLeft, 10);
    BOT.move(kneeMiddleRight, 10);
    BOT.animate(speedms);
    
    BOT.move(kneeFrontRight, 50);
    BOT.move(kneeRearRight, 50);
    BOT.move(kneeMiddleLeft, 50);
    BOT.animate(speedms);//
      
    BOT.move(kneeFrontLeft, 20);
    BOT.move(kneeRearLeft, 20);
    BOT.move(kneeMiddleRight, 20);
    BOT.move(hipFrontLeft, 45);
    BOT.move(hipRearLeft, 45);
    BOT.move(hipMiddleRight, 90);
    BOT.move(hipFrontRight, 80);
    BOT.move(hipRearRight, 5);
    BOT.move(hipMiddleLeft, 115);
    BOT.animate(speedms);
    
    BOT.move(kneeFrontRight, 10);
    BOT.move(kneeRearRight, 10);
    BOT.move(kneeMiddleLeft, 10);
    BOT.animate(speedms);
    
    BOT.move(kneeFrontLeft, 50);
    BOT.move(kneeRearLeft, 50);
    BOT.move(kneeMiddleRight, 50);
    BOT.animate(speedms);//
    
    BOT.move(kneeFrontRight, 20);
    BOT.move(kneeRearRight, 20);
    BOT.move(kneeMiddleLeft, 20);
    BOT.move(hipFrontRight, 45);
    BOT.move(hipRearRight, 45);
    BOT.move(hipMiddleLeft, 90);
    BOT.move(hipFrontLeft, 80);
    BOT.move(hipRearLeft, 5);
    BOT.move(hipMiddleRight, 115);
    BOT.animate(speedms);

  }
    BOT.move(kneeFrontLeft, 10);
    BOT.move(kneeRearLeft, 10);
    BOT.move(kneeMiddleRight, 10);
    BOT.animate(speedms);
    
    BOT.move(kneeFrontRight, 50);
    BOT.move(kneeRearRight, 50);
    BOT.move(kneeMiddleLeft, 50);
    BOT.animate(speedms);//
    
    BOT.move(hipFrontLeft, 45);
    BOT.move(hipRearLeft, 45);
    BOT.move(hipMiddleRight, 90);
    BOT.animate(speedms);
    
    BOT.move(kneeFrontRight, 20);
    BOT.move(kneeRearRight, 20);
    BOT.move(kneeMiddleLeft, 20);
    BOT.move(kneeFrontLeft, 20);
    BOT.move(kneeRearLeft, 20);
    BOT.move(kneeMiddleRight, 20);
    BOT.animate(speedms);//
}`,
  walkforward: `
void walkforward(int steps, int speedms){
  
    BOT.move(kneeRearLeft, 50);
    BOT.move(kneeFrontLeft, 50);
    BOT.move(kneeMiddleRight, 50);
    BOT.animate(speedms); //
    
    BOT.move(hipRearLeft, 80);
    BOT.move(hipFrontLeft, 5);
    BOT.move(hipMiddleRight, 65);
    BOT.animate(speedms);//
  
  for (int i = 0; i < steps; i++){
    
    BOT.move(kneeRearLeft, 10);
    BOT.move(kneeFrontLeft, 10);
    BOT.move(kneeMiddleRight, 10);
    BOT.animate(speedms);
    
    BOT.move(kneeRearRight, 50);
    BOT.move(kneeFrontRight, 50);
    BOT.move(kneeMiddleLeft, 50);
    BOT.animate(speedms);//
      
    BOT.move(kneeRearLeft, 20);
    BOT.move(kneeFrontLeft, 20);
    BOT.move(kneeMiddleRight, 20);
    BOT.move(hipRearLeft, 45);
    BOT.move(hipFrontLeft, 45);
    BOT.move(hipMiddleRight, 90);
    BOT.move(hipRearRight, 80);
    BOT.move(hipFrontRight, 5);
    BOT.move(hipMiddleLeft, 65);
    BOT.animate(speedms);
    
    BOT.move(kneeRearRight, 10);
    BOT.move(kneeFrontRight, 10);
    BOT.move(kneeMiddleLeft, 10);
    BOT.animate(speedms);
    
    BOT.move(kneeRearLeft, 50);
    BOT.move(kneeFrontLeft, 50);
    BOT.move(kneeMiddleRight, 50);
    BOT.animate(speedms);//
    
    BOT.move(kneeRearRight, 20);
    BOT.move(kneeFrontRight, 20);
    BOT.move(kneeMiddleLeft, 20);
    BOT.move(hipRearRight, 45);
    BOT.move(hipFrontRight, 45);
    BOT.move(hipMiddleLeft, 90);
    BOT.move(hipRearLeft, 80);
    BOT.move(hipFrontLeft, 5);
    BOT.move(hipMiddleRight, 65);
    BOT.animate(speedms);
  }
    BOT.move(kneeRearLeft, 10);
    BOT.move(kneeFrontLeft, 10);
    BOT.move(kneeMiddleRight, 10);
    BOT.animate(speedms);
    
    BOT.move(kneeRearRight, 50);
    BOT.move(kneeFrontRight, 50);
    BOT.move(kneeMiddleLeft, 50);
    BOT.animate(speedms);//
    
    BOT.move(hipRearLeft, 45);
    BOT.move(hipFrontLeft, 45);
    BOT.move(hipMiddleRight, 90);
    BOT.animate(speedms);
    
    BOT.move(kneeRearRight, 20);
    BOT.move(kneeFrontRight, 20);
    BOT.move(kneeMiddleLeft, 20);
    BOT.move(kneeRearLeft, 20);
    BOT.move(kneeFrontLeft, 20);
    BOT.move(kneeMiddleRight, 20);
    BOT.animate(speedms);//
}`,
  walkleft: `
void walkleft(int steps, int speedms){
  for (int i = 0; i < steps; i++){
    
    BOT.move(kneeFrontLeft, 50);
    BOT.move(kneeRearRight, 50);
    BOT.animate(speedms/2);
    BOT.move(hipFrontLeft, 80);
    BOT.move(hipRearRight, 10);
    BOT.animate(speedms);
    BOT.move(kneeFrontLeft, 20);
    BOT.move(kneeRearRight, 20);
    BOT.animate(speedms/2);
    
    BOT.move(kneeFrontRight, 50);
    BOT.move(kneeRearLeft, 50);
    BOT.animate(speedms/2);
    BOT.move(hipFrontRight, 10);
    BOT.move(hipRearLeft, 80);
    BOT.animate(speedms);
    BOT.move(kneeFrontRight, 20);
    BOT.move(kneeRearLeft, 20);
    BOT.animate(speedms/2);
    
    BOT.move(kneeMiddleRight, 50);
    BOT.move(kneeMiddleLeft, 50);
    BOT.animate(speedms/2);
  
    BOT.move(hipFrontLeft, 15);
    BOT.move(hipFrontRight, 75);
    BOT.move(hipRearLeft, 15);
    BOT.move(hipRearRight, 75);
    BOT.animate(speedms); 
    
    BOT.move(kneeMiddleRight, 20);
    BOT.move(kneeMiddleLeft, 20);
    BOT.animate(speedms/2);
    
    BOT.move(kneeFrontLeft, 50);
    BOT.move(kneeRearRight, 50);
    BOT.animate(speedms/2);
    BOT.move(hipFrontLeft, 45);
    BOT.move(hipRearRight, 45);
    BOT.animate(speedms);
    BOT.move(kneeFrontLeft, 20);
    BOT.move(kneeRearRight, 20);
    BOT.animate(speedms/2);
    
    BOT.move(kneeFrontRight, 50);
    BOT.move(kneeRearLeft, 50);
    BOT.animate(speedms/2);
    BOT.move(hipFrontRight, 45);
    BOT.move(hipRearLeft, 45);
    BOT.animate(speedms);
    BOT.move(kneeFrontRight, 20);
    BOT.move(kneeRearLeft, 20);
    BOT.animate(speedms/2);
    }
  }`,
  walkright: `
void walkright(int steps, int speedms){
  for (int i = 0; i < steps; i++){
    
    BOT.move(kneeFrontLeft, 50);
    BOT.move(kneeRearRight, 50);
    BOT.animate(speedms/2);
    BOT.move(hipFrontLeft, 10);
    BOT.move(hipRearRight, 80);
    BOT.animate(speedms);
    BOT.move(kneeFrontLeft, 20);
    BOT.move(kneeRearRight, 20);
    BOT.animate(speedms/2);
    
    BOT.move(kneeFrontRight, 50);
    BOT.move(kneeRearLeft, 50);
    BOT.animate(speedms/2);
    BOT.move(hipFrontRight, 80);
    BOT.move(hipRearLeft, 10);
    BOT.animate(speedms);
    BOT.move(kneeFrontRight, 20);
    BOT.move(kneeRearLeft, 20);
    BOT.animate(speedms/2);
    
    BOT.move(kneeMiddleRight, 50);
    BOT.move(kneeMiddleLeft, 50);
    BOT.animate(speedms/2);
  
    BOT.move(hipFrontLeft, 75);
    BOT.move(hipFrontRight, 15);
    BOT.move(hipRearLeft, 75);
    BOT.move(hipRearRight, 15);
    BOT.animate(speedms); 
    
    BOT.move(kneeMiddleRight, 20);
    BOT.move(kneeMiddleLeft, 20);
    BOT.animate(speedms/2);
    
    BOT.move(kneeFrontLeft, 50);
    BOT.move(kneeRearRight, 50);
    BOT.animate(speedms/2);
    BOT.move(hipFrontLeft, 45);
    BOT.move(hipRearRight, 45);
    BOT.animate(speedms);
    BOT.move(kneeFrontLeft, 20);
    BOT.move(kneeRearRight, 20);
    BOT.animate(speedms/2);
    
    BOT.move(kneeFrontRight, 50);
    BOT.move(kneeRearLeft, 50);
    BOT.animate(speedms/2);
    BOT.move(hipFrontRight, 45);
    BOT.move(hipRearLeft, 45);
    BOT.animate(speedms);
    BOT.move(kneeFrontRight, 20);
    BOT.move(kneeRearLeft, 20);
    BOT.animate(speedms/2);
    }
  }`,
  lookright: `
void lookright(int speedms){
    BOT.move(hipRearRight, 80);
    BOT.move(hipRearLeft, 10);
    BOT.move(hipFrontRight, 10);
    BOT.move(hipFrontLeft, 80);
    BOT.move(hipMiddleRight, 65);
    BOT.move(hipMiddleLeft, 125);    
    BOT.animate(speedms);
    
    delay(speedms/2);
    
    BOT.move(hipRearRight, 45);
    BOT.move(hipRearLeft, 45);
    BOT.move(hipFrontRight, 45);
    BOT.move(hipFrontLeft, 45);
    BOT.move(hipMiddleRight, 90);
    BOT.move(hipMiddleLeft, 90);
    BOT.animate(speedms);
}`,
  lookleft: `
void lookleft(int speedms){
    BOT.move(hipRearLeft, 80);
    BOT.move(hipRearRight, 10);
    BOT.move(hipFrontLeft, 10);
    BOT.move(hipFrontRight, 80);
    BOT.move(hipMiddleRight, 125);
    BOT.move(hipMiddleLeft, 65);
    BOT.animate(speedms);
    
    delay(speedms/2);
    
    BOT.move(hipRearRight, 45);
    BOT.move(hipRearLeft, 45);
    BOT.move(hipFrontRight, 45);
    BOT.move(hipFrontLeft, 45);
    BOT.move(hipMiddleRight, 90);
    BOT.move(hipMiddleLeft, 90);
    BOT.animate(speedms);
}`,
  leanright: `
void leanright(int speedms){
  
    BOT.move(kneeRearRight, 10);
    BOT.move(kneeFrontRight, 10);
    BOT.move(kneeMiddleRight, 0);
    BOT.move(kneeRearLeft, 90);
    BOT.move(kneeFrontLeft, 90);
    BOT.move(kneeMiddleLeft, 90);
    BOT.animate(speedms);
    
    delay(speedms/2);
    
    BOT.move(kneeRearRight, 20);
    BOT.move(kneeFrontRight, 20);
    BOT.move(kneeMiddleRight, 20);
    BOT.move(kneeRearLeft, 20);
    BOT.move(kneeFrontLeft, 20);
    BOT.move(kneeMiddleLeft, 20);
    
    BOT.animate(speedms);
}`,
  leanleft: `
void leanleft(int speedms){
  
    BOT.move(kneeRearRight, 90);
    BOT.move(kneeFrontRight, 90);
    BOT.move(kneeMiddleRight, 90);
    BOT.move(kneeRearLeft, 10);
    BOT.move(kneeFrontLeft, 10);
    BOT.move(kneeMiddleLeft, 0);
    BOT.animate(speedms);
    
    delay(speedms/2);
    
    BOT.move(kneeRearRight, 20);
    BOT.move(kneeFrontRight, 20);
    BOT.move(kneeMiddleRight, 20);
    BOT.move(kneeRearLeft, 20);
    BOT.move(kneeFrontLeft, 20);
    BOT.move(kneeMiddleLeft, 20);
    
    BOT.animate(speedms);
}`,
  leanforward: `
void leanforward(int speedms){
  
    BOT.move(kneeFrontLeft, 90);
    BOT.move(kneeFrontRight, 90);
    BOT.move(kneeMiddleRight, 50);
    BOT.move(kneeMiddleLeft, 50);
    BOT.animate(speedms);
    
    delay(speedms/2);
    
    BOT.move(kneeFrontLeft, 20);
    BOT.move(kneeFrontRight, 20);
    BOT.move(kneeMiddleRight, 20);
    BOT.move(kneeMiddleLeft, 20);
    
    BOT.animate(speedms);
}`,
  leanbackward: `
void leanbackward(int speedms){
  
    BOT.move(kneeRearLeft, 90);
    BOT.move(kneeRearRight, 90);
    BOT.move(kneeMiddleRight, 50);
    BOT.move(kneeMiddleLeft, 50);
    BOT.animate(speedms);
    
    delay(speedms/2);
    
    BOT.move(kneeRearLeft, 20);
    BOT.move(kneeRearRight, 20);
    BOT.move(kneeMiddleRight, 20);
    BOT.move(kneeMiddleLeft, 20);
    
    BOT.animate(speedms);
}`,
  turnleft: `
void turnleft(int steps, int speedms){

  for (int i = 0; i < steps; i++){

    BOT.move(kneeFrontLeft, 50);
    BOT.move(kneeRearLeft, 50);
    BOT.move(kneeMiddleRight, 50);    
    BOT.animate(speedms);

    BOT.move(hipFrontLeft, 80);
    BOT.move(hipRearLeft, 5);
    BOT.move(hipMiddleRight, 65);    
    BOT.animate(speedms);

    BOT.move(kneeFrontLeft, 20);
    BOT.move(kneeRearLeft, 20);
    BOT.move(kneeMiddleRight, 20);    
    BOT.animate(speedms);

    BOT.move(kneeFrontRight, 50);
    BOT.move(kneeRearRight, 50);
    BOT.move(kneeMiddleLeft, 50);    
    BOT.animate(speedms);

    BOT.move(hipFrontRight, 5);
    BOT.move(hipRearRight, 80);
    BOT.move(hipMiddleLeft, 115);   
    BOT.animate(speedms);

    BOT.move(kneeFrontRight, 20);
    BOT.move(kneeRearRight, 20);
    BOT.move(kneeMiddleLeft, 20);    
    BOT.animate(speedms);

    BOT.move(hipFrontLeft, 45);
    BOT.move(hipRearLeft, 45);
    BOT.move(hipMiddleRight, 90);
    BOT.move(hipFrontRight, 45);
    BOT.move(hipRearRight, 45);
    BOT.move(hipMiddleLeft, 90);    
    BOT.animate(speedms);
  }
}`,
  turnright: `
void turnright(int steps, int speedms){

  for (int i = 0; i < steps; i++){

    BOT.move(kneeFrontLeft, 50);
    BOT.move(kneeRearLeft, 50);
    BOT.move(kneeMiddleRight, 50);    
    BOT.animate(speedms);

    BOT.move(hipFrontLeft, 5);
    BOT.move(hipRearLeft, 80);
    BOT.move(hipMiddleRight, 115);    
    BOT.animate(speedms);

    BOT.move(kneeFrontLeft, 20);
    BOT.move(kneeRearLeft, 20);
    BOT.move(kneeMiddleRight, 20);    
    BOT.animate(speedms);

    BOT.move(kneeFrontRight, 50);
    BOT.move(kneeRearRight, 50);
    BOT.move(kneeMiddleLeft, 50);    
    BOT.animate(speedms);

    BOT.move(hipFrontRight, 80);
    BOT.move(hipRearRight, 5);
    BOT.move(hipMiddleLeft, 65);    
    BOT.animate(speedms);

    BOT.move(kneeFrontRight, 20);
    BOT.move(kneeRearRight, 20);
    BOT.move(kneeMiddleLeft, 20);    
    BOT.animate(speedms);

    BOT.move(hipFrontLeft, 45);
    BOT.move(hipRearLeft, 45);
    BOT.move(hipMiddleRight, 90);
    BOT.move(hipFrontRight, 45);
    BOT.move(hipRearRight, 45);
    BOT.move(hipMiddleLeft, 90);    
    BOT.animate(speedms);
  }
}`,
  scared: `
void scared(int shakes, int beeps){
    BOT.move(kneeFrontRight, 0);
    BOT.move(kneeMiddleRight, 0);
    BOT.move(kneeRearRight, 0);
    BOT.move(kneeFrontLeft, 0);
    BOT.move(kneeMiddleLeft, 0);
    BOT.move(kneeRearLeft, 0); 
    BOT.animate(50);
    
    for (int i = 0; i < shakes; i++){
 
      BOT.move(hipRearRight, 80);
      BOT.move(hipMiddleRight, 65);
      BOT.move(hipRearLeft, 5);
      BOT.move(hipFrontRight, 5);
      BOT.move(hipMiddleLeft, 115);
      BOT.move(hipFrontLeft, 80);
      BOT.animate(100);
      
      BOT.move(hipRearLeft, 80);
      BOT.move(hipMiddleRight, 115);
      BOT.move(hipRearRight, 5);
      BOT.move(hipFrontLeft, 5);
      BOT.move(hipMiddleLeft, 65);
      BOT.move(hipFrontRight, 80);
      BOT.animate(50);
    }
    
    BOT.move(hipRearRight, 45);
    BOT.move(hipMiddleRight, 90);
    BOT.move(hipRearLeft, 45);
    BOT.move(hipFrontRight, 45);
    BOT.move(hipMiddleLeft, 90);
    BOT.move(hipFrontLeft, 45);
    BOT.animate(200);
    
    chirp(beeps, 0);
    
    BOT.move(kneeFrontRight, 20);
    BOT.move(kneeMiddleRight, 20);
    BOT.move(kneeRearRight, 20);
    BOT.move(kneeFrontLeft, 20);
    BOT.move(kneeMiddleLeft, 20);
    BOT.move(kneeRearLeft, 20); 
    BOT.animate(75);
}`
}

//  VR618    *******************************************************
allbotfunctions.VR618 = {
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
  standup: `
void standup ()
{
  BOT.move(kneeFrontRight, 100);
  BOT.move(kneeFrontLeft, 100);
  BOT.move(kneeMiddleRight, 100);
  BOT.move(kneeMiddleLeft, 100);
  BOT.move(kneeRearRight, 100);
  BOT.move(kneeRearLeft, 100);
  BOT.animate(200);
}`,
  walkbackward: `
void walkbackward(int steps, int speedms)
{
  BOT.move(kneeFrontRight, 130);    //Lift 3a
  BOT.move(kneeRearRight, 130);
  BOT.move(kneeMiddleLeft, 130);
  BOT.animate(speedms);
  
  BOT.move(hipFrontRight, 70);    //Swivel 3a backward
  BOT.move(hipRearRight, 20);
  BOT.move(hipMiddleLeft, 115);
  BOT.animate(speedms);
  
  for (int i = 0; i < steps; i++){
  
  BOT.move(kneeFrontRight, 70);  //Drop 3a + small ankle movement
  BOT.move(kneeRearRight, 70);
  BOT.move(kneeMiddleLeft, 70);
  BOT.move(ankleFrontRight, 20);
  BOT.move(ankleRearRight, 20);
  BOT.move(ankleMiddleLeft, 20);
  BOT.animate(speedms);
  
  BOT.move(hipFrontRight, 45);    //Swivel 3a back to center
  BOT.move(hipRearRight, 45);
  BOT.move(hipMiddleLeft, 90);
  //
  BOT.move(kneeFrontLeft, 130);    //Lift 3b
  BOT.move(kneeRearLeft, 130);
  BOT.move(kneeMiddleRight, 130);
  BOT.animate(speedms);
  
  BOT.move(kneeFrontRight, 100);    //Normalize 3a
  BOT.move(kneeRearRight, 100);
  BOT.move(kneeMiddleLeft, 100);
  BOT.move(ankleFrontRight, 0);
  BOT.move(ankleRearRight, 0);
  BOT.move(ankleMiddleLeft, 0);
  //
  BOT.move(hipFrontLeft, 70);    //Swivel 3b backward
  BOT.move(hipRearLeft, 20);
  BOT.move(hipMiddleRight, 115);
  BOT.animate(speedms);
  
  BOT.move(kneeFrontLeft, 70);      //Drop 3b + small ankle movement
  BOT.move(kneeRearLeft, 70);
  BOT.move(kneeMiddleRight, 70);
  BOT.move(ankleFrontLeft, 20);
  BOT.move(ankleRearLeft, 20);
  BOT.move(ankleMiddleRight, 20);
  BOT.animate(speedms);
  
  BOT.move(hipFrontLeft, 45);    //Swivel 3b back to center
  BOT.move(hipRearLeft, 45);
  BOT.move(hipMiddleRight, 90);
  //
  BOT.move(kneeFrontRight, 130);    //Lift 3a
  BOT.move(kneeRearRight, 130);
  BOT.move(kneeMiddleLeft, 130);
  BOT.animate(speedms);
  
  BOT.move(kneeFrontLeft, 100);    //Normalize 3b
  BOT.move(kneeRearLeft, 100);
  BOT.move(kneeMiddleRight, 100);
  BOT.move(ankleFrontLeft, 0);
  BOT.move(ankleRearLeft, 0);
  BOT.move(ankleMiddleRight, 0);
  //
  BOT.move(hipFrontRight, 70);    //Swivel 3a backward
  BOT.move(hipRearRight, 20);
  BOT.move(hipMiddleLeft, 115);
  BOT.animate(speedms);
  
  }
  
  BOT.move(kneeFrontRight, 70);  //Drop 3a + small ankle movement
  BOT.move(kneeRearRight, 70);
  BOT.move(kneeMiddleLeft, 70);
  BOT.move(ankleFrontRight, 20);
  BOT.move(ankleRearRight, 20);
  BOT.move(ankleMiddleLeft, 20);
  BOT.animate(speedms);
  
  BOT.move(hipFrontRight, 45);    //Swivel 3a back to center
  BOT.move(hipRearRight, 45);
  BOT.move(hipMiddleLeft, 90);
  BOT.animate(speedms);
  
  BOT.move(kneeFrontRight, 100);    //Normalize 3a
  BOT.move(kneeRearRight, 100);
  BOT.move(kneeMiddleLeft, 100);
  BOT.move(ankleFrontRight, 0);
  BOT.move(ankleRearRight, 0);
  BOT.move(ankleMiddleLeft, 0);
  BOT.animate(speedms);
}`,
  walkforward: `
void walkforward(int steps, int speedms)
{
  BOT.move(kneeFrontRight, 130);    //Lift 3a
  BOT.move(kneeRearRight, 130);
  BOT.move(kneeMiddleLeft, 130);
  BOT.animate(speedms);
  
  BOT.move(hipFrontRight, 20);    //Swivel 3a forward
  BOT.move(hipRearRight, 70);
  BOT.move(hipMiddleLeft, 65);
  BOT.animate(speedms);
  
  for (int i = 0; i < steps; i++){
  
  BOT.move(kneeFrontRight, 70);  //Drop 3a + small ankle movement
  BOT.move(kneeRearRight, 70);
  BOT.move(kneeMiddleLeft, 70);
  BOT.move(ankleFrontRight, 20);
  BOT.move(ankleRearRight, 20);
  BOT.move(ankleMiddleLeft, 20);
  BOT.animate(speedms);
  
  BOT.move(hipFrontRight, 45);    //Swivel 3a back to center
  BOT.move(hipRearRight, 45);
  BOT.move(hipMiddleLeft, 90);
  //
  BOT.move(kneeFrontLeft, 130);    //Lift 3b
  BOT.move(kneeRearLeft, 130);
  BOT.move(kneeMiddleRight, 130);
  BOT.animate(speedms);
  
  BOT.move(kneeFrontRight, 100);    //Normalize 3a
  BOT.move(kneeRearRight, 100);
  BOT.move(kneeMiddleLeft, 100);
  BOT.move(ankleFrontRight, 0);
  BOT.move(ankleRearRight, 0);
  BOT.move(ankleMiddleLeft, 0);
  //
  BOT.move(hipFrontLeft, 20);    //Swivel 3b forward
  BOT.move(hipRearLeft, 70);
  BOT.move(hipMiddleRight, 65);
  BOT.animate(speedms);
  
  BOT.move(kneeFrontLeft, 70);      //Drop 3b + small ankle movement
  BOT.move(kneeRearLeft, 70);
  BOT.move(kneeMiddleRight, 70);
  BOT.move(ankleFrontLeft, 20);
  BOT.move(ankleRearLeft, 20);
  BOT.move(ankleMiddleRight, 20);
  BOT.animate(speedms);
  
  BOT.move(hipFrontLeft, 45);    //Swivel 3b back to center
  BOT.move(hipRearLeft, 45);
  BOT.move(hipMiddleRight, 90);
  //
  BOT.move(kneeFrontRight, 130);    //Lift 3a
  BOT.move(kneeRearRight, 130);
  BOT.move(kneeMiddleLeft, 130);
  BOT.animate(speedms);
  
  BOT.move(kneeFrontLeft, 100);    //Normalize 3b
  BOT.move(kneeRearLeft, 100);
  BOT.move(kneeMiddleRight, 100);
  BOT.move(ankleFrontLeft, 0);
  BOT.move(ankleRearLeft, 0);
  BOT.move(ankleMiddleRight, 0);
  //
  BOT.move(hipFrontRight, 20);    //Swivel 3a forward
  BOT.move(hipRearRight, 70);
  BOT.move(hipMiddleLeft, 65);
  BOT.animate(speedms);
  
  }
  
  BOT.move(kneeFrontRight, 70);  //Drop 3a + small ankle movement
  BOT.move(kneeRearRight, 70);
  BOT.move(kneeMiddleLeft, 70);
  BOT.move(ankleFrontRight, 20);
  BOT.move(ankleRearRight, 20);
  BOT.move(ankleMiddleLeft, 20);
  BOT.animate(speedms);
  
  BOT.move(hipFrontRight, 45);    //Swivel 3a back to center
  BOT.move(hipRearRight, 45);
  BOT.move(hipMiddleLeft, 90);
  BOT.animate(speedms);
  
  BOT.move(kneeFrontRight, 100);    //Normalize 3a
  BOT.move(kneeRearRight, 100);
  BOT.move(kneeMiddleLeft, 100);
  BOT.move(ankleFrontRight, 0);
  BOT.move(ankleRearRight, 0);
  BOT.move(ankleMiddleLeft, 0);
  BOT.animate(speedms);
}`,
  walkleft: `
void walkleft(int steps, int speedms){
  // TODO - No sequence implemented
  }`,
  walkright: `
void walkright(int steps, int speedms){
  // TODO - No sequence implemented
  }`,
  lookright: `
void lookright(int speedms){
    // TODO - No sequence implemented
}`,
  lookleft: `
void lookleft(int speedms){
    // TODO - No sequence implemented
}`,
  leanright: `
void leanright (int speedms)
{
  BOT.move(kneeFrontRight, 50);
  BOT.move(kneeMiddleRight, 50);
  BOT.move(kneeRearRight, 50);
  BOT.move(ankleFrontRight, 50);
  BOT.move(ankleMiddleRight, 50);
  BOT.move(ankleRearRight, 50);
  //
  BOT.move(kneeFrontLeft, 150);
  BOT.move(kneeMiddleLeft, 150);
  BOT.move(kneeRearLeft, 150);
  BOT.move(ankleFrontLeft, 0);
  BOT.move(ankleMiddleLeft, 0);
  BOT.move(ankleRearLeft, 0);
  BOT.animate(speedms);
  //
  BOT.move(kneeFrontRight, 100);
  BOT.move(kneeMiddleRight, 100);
  BOT.move(kneeRearRight, 100);
  BOT.move(ankleFrontRight, 0);
  BOT.move(ankleMiddleRight, 0);
  BOT.move(ankleRearRight, 0);
  //
  BOT.move(kneeFrontLeft, 100);
  BOT.move(kneeMiddleLeft, 100);
  BOT.move(kneeRearLeft, 100);
  BOT.move(ankleFrontLeft, 0);
  BOT.move(ankleMiddleLeft, 0);
  BOT.move(ankleRearLeft, 0);
  BOT.animate(speedms);
}`,
  leanleft: `
void leanleft (int speedms)
{
  BOT.move(kneeFrontLeft, 50);
  BOT.move(kneeMiddleLeft, 50);
  BOT.move(kneeRearLeft, 50);
  BOT.move(ankleFrontLeft, 50);
  BOT.move(ankleMiddleLeft, 50);
  BOT.move(ankleRearLeft, 50);
  //
  BOT.move(kneeFrontRight, 150);
  BOT.move(kneeMiddleRight, 150);
  BOT.move(kneeRearRight, 150);
  BOT.move(ankleFrontRight, 0);
  BOT.move(ankleMiddleRight, 0);
  BOT.move(ankleRearRight, 0);
  BOT.animate(speedms);
  //
  BOT.move(kneeFrontLeft, 100);
  BOT.move(kneeMiddleLeft, 100);
  BOT.move(kneeRearLeft, 100);
  BOT.move(ankleFrontLeft, 0);
  BOT.move(ankleMiddleLeft, 0);
  BOT.move(ankleRearLeft, 0);
  //
  BOT.move(kneeFrontRight, 100);
  BOT.move(kneeMiddleRight, 100);
  BOT.move(kneeRearRight, 100);
  BOT.move(ankleFrontRight, 0);
  BOT.move(ankleMiddleRight, 0);
  BOT.move(ankleRearRight, 0);
  BOT.animate(speedms);
}`,
  leanforward: `
void leanforward(int speedms)
{  
  BOT.move(kneeRearRight, 50);
  BOT.move(kneeRearLeft, 50);
  BOT.move(ankleRearRight, 80);
  BOT.move(ankleRearLeft, 80);
  //
  BOT.move(kneeFrontRight, 135);
  BOT.move(kneeFrontLeft, 135);
  BOT.move(ankleFrontRight, 0);
  BOT.move(ankleFrontLeft, 0);
  //
  BOT.move(kneeMiddleRight, 110);
  BOT.move(kneeMiddleLeft, 110);
  BOT.animate(speedms);
  
  BOT.move(kneeFrontRight, 100);
  BOT.move(kneeFrontLeft, 100);
  BOT.move(ankleFrontRight, 0);
  BOT.move(ankleFrontLeft, 0);
  //
  BOT.move(kneeRearRight, 100);
  BOT.move(kneeRearLeft, 100);
  BOT.move(ankleRearRight, 0);
  BOT.move(ankleRearLeft, 0);
  //
  BOT.move(kneeMiddleRight, 100);
  BOT.move(kneeMiddleLeft, 100);
  BOT.animate(speedms);
}`,
  leanbackward: `
void leanbackward(int speedms)
{  
  BOT.move(kneeFrontRight, 50);
  BOT.move(kneeFrontLeft, 50);
  BOT.move(ankleFrontRight, 80);
  BOT.move(ankleFrontLeft, 80);
  //
  BOT.move(kneeRearRight, 135);
  BOT.move(kneeRearLeft, 135);
  BOT.move(ankleRearRight, 0);
  BOT.move(ankleRearLeft, 0);
  //
  BOT.move(kneeMiddleRight, 110);
  BOT.move(kneeMiddleLeft, 110);
  BOT.animate(speedms);
  
  BOT.move(kneeFrontRight, 100);
  BOT.move(kneeFrontLeft, 100);
  BOT.move(ankleFrontRight, 0);
  BOT.move(ankleFrontLeft, 0);
  //
  BOT.move(kneeRearRight, 100);
  BOT.move(kneeRearLeft, 100);
  BOT.move(ankleRearRight, 0);
  BOT.move(ankleRearLeft, 0);
  //
  BOT.move(kneeMiddleRight, 100);
  BOT.move(kneeMiddleLeft, 100);
  BOT.animate(speedms);
}`,
  turnleft: `
void turnleft (int steps, int speedms)
{
  for (int i = 0; i < steps; i++){
    BOT.move(kneeFrontRight, 130);    //Lift 3a
    BOT.move(kneeRearRight, 130);
    BOT.move(kneeMiddleLeft, 130);
    BOT.animate(speedms);
    
    BOT.move(hipFrontRight, 20);    //turn 3a left
    BOT.move(hipRearRight, 70);
    BOT.move(hipMiddleLeft, 115);
    BOT.animate(speedms);
    
    BOT.move(kneeFrontRight, 100);  //Drop 3a
    BOT.move(kneeRearRight, 100);
    BOT.move(kneeMiddleLeft, 100);
    BOT.animate(speedms);
    
    BOT.move(kneeFrontLeft, 130);    //Lift 3b
    BOT.move(kneeRearLeft, 130);
    BOT.move(kneeMiddleRight, 130);
    BOT.animate(speedms);
    
    BOT.move(hipFrontLeft, 70);    //turn 3b left
    BOT.move(hipRearLeft, 20);
    BOT.move(hipMiddleRight, 65);
    BOT.animate(speedms);
    
    BOT.move(kneeFrontLeft, 100);      //Drop 3b + small ankle movement
    BOT.move(kneeRearLeft, 100);
    BOT.move(kneeMiddleRight, 100);
    BOT.animate(speedms);
    
    BOT.move(hipFrontRight, 45);    //Swivel 3a&b back to center
    BOT.move(hipRearRight, 45);
    BOT.move(hipMiddleLeft, 90);
    BOT.move(hipFrontLeft, 45);    //turn 3b right
    BOT.move(hipRearLeft, 45);
    BOT.move(hipMiddleRight, 90);
    BOT.animate(speedms);
  }
}`,
  turnright: `
void turnright (int steps, int speedms)
{
  for (int i = 0; i < steps; i++){
    BOT.move(kneeFrontRight, 130);    //Lift 3a
    BOT.move(kneeRearRight, 130);
    BOT.move(kneeMiddleLeft, 130);
    BOT.animate(speedms);
    
    BOT.move(hipFrontRight, 70);    //turn 3a right
    BOT.move(hipRearRight, 20);
    BOT.move(hipMiddleLeft, 65);
    BOT.animate(speedms);
    
    BOT.move(kneeFrontRight, 100);  //Drop 3a
    BOT.move(kneeRearRight, 100);
    BOT.move(kneeMiddleLeft, 100);
    BOT.animate(speedms);
    
    BOT.move(kneeFrontLeft, 130);    //Lift 3b
    BOT.move(kneeRearLeft, 130);
    BOT.move(kneeMiddleRight, 130);
    BOT.animate(speedms);
    
    BOT.move(hipFrontLeft, 20);    //turn 3b right
    BOT.move(hipRearLeft, 70);
    BOT.move(hipMiddleRight, 115);
    BOT.animate(speedms);
    
    BOT.move(kneeFrontLeft, 100);      //Drop 3b + small ankle movement
    BOT.move(kneeRearLeft, 100);
    BOT.move(kneeMiddleRight, 100);
    BOT.animate(speedms);
    
    BOT.move(hipFrontRight, 45);    //Swivel 3a&b back to center
    BOT.move(hipRearRight, 45);
    BOT.move(hipMiddleLeft, 90);
    BOT.move(hipFrontLeft, 45);    //turn 3b right
    BOT.move(hipRearLeft, 45);
    BOT.move(hipMiddleRight, 90);
    BOT.animate(speedms);
  }
}`,
  scared: `
void scared(int shakes, int beeps){
   // TODO - No sequence implemented
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
    code = 'walkforward(' + steps + ', ' + speed + ');\n';
  } else {
    code = '// No AllBot on the workspace. Add it to generate code\n';
  }
  
  return code;
};

/**
 * The allbot walk backward block
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['allbot_walkbackward'] = function(block) {
  var steps = Blockly.Arduino.valueToCode(
      block, 'STEPS', Blockly.Arduino.ORDER_ATOMIC) || '1';
  var speed = Blockly.Arduino.valueToCode(
      block, 'SPEED', Blockly.Arduino.ORDER_ATOMIC) || '200';
  
  var code = '';
  // find type of allbot
  var allbot = Blockly.Arduino.Boards.selected;
  if (allbot['allbotname'] !== undefined) {
    var func = allbotfunctions[allbot.allbotname].walkbackward;
    Blockly.Arduino.addFunction('walkbackward', func)
    code = 'walkbackward(' + steps + ', ' + speed + ');\n';
  } else {
    code = '// No AllBot on the workspace. Add it to generate code\n';
  }
  
  return code;
};

/**
 * The allbot walk left block
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['allbot_walkleft'] = function(block) {
  var steps = Blockly.Arduino.valueToCode(
      block, 'STEPS', Blockly.Arduino.ORDER_ATOMIC) || '1';
  var speed = Blockly.Arduino.valueToCode(
      block, 'SPEED', Blockly.Arduino.ORDER_ATOMIC) || '200';
  
  var code = '';
  // find type of allbot
  var allbot = Blockly.Arduino.Boards.selected;
  if (allbot['allbotname'] !== undefined) {
    var func = allbotfunctions[allbot.allbotname].walkleft;
    Blockly.Arduino.addFunction('walkleft', func)
    code = 'walkleft(' + steps + ', ' + speed + ');\n';
  } else {
    code = '// No AllBot on the workspace. Add it to generate code\n';
  }
  
  return code;
};

/**
 * The allbot walk right block
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['allbot_walkright'] = function(block) {
  var steps = Blockly.Arduino.valueToCode(
      block, 'STEPS', Blockly.Arduino.ORDER_ATOMIC) || '1';
  var speed = Blockly.Arduino.valueToCode(
      block, 'SPEED', Blockly.Arduino.ORDER_ATOMIC) || '200';
  
  var code = '';
  // find type of allbot
  var allbot = Blockly.Arduino.Boards.selected;
  if (allbot['allbotname'] !== undefined) {
    var func = allbotfunctions[allbot.allbotname].walkright;
    Blockly.Arduino.addFunction('walkright', func)
    code = 'walkright(' + steps + ', ' + speed + ');\n';
  } else {
    code = '// No AllBot on the workspace. Add it to generate code\n';
  }
  
  return code;
};

/**
 * The allbot look left block
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['allbot_lookleft'] = function(block) {
  var speed = Blockly.Arduino.valueToCode(
      block, 'SPEED', Blockly.Arduino.ORDER_ATOMIC) || '200';
  
  var code = '';
  // find type of allbot
  var allbot = Blockly.Arduino.Boards.selected;
  if (allbot['allbotname'] !== undefined) {
    var func = allbotfunctions[allbot.allbotname].lookleft;
    if (func !== undefined) {
      Blockly.Arduino.addFunction('lookleft', func)
      code = 'lookleft(' + speed + ');\n';
    } else {
      code = '// This AllBot has no lookleft function !!\n';
    }
  } else {
    code = '// No AllBot on the workspace. Add it to generate code\n';
  }
  
  return code;
};

/**
 * The allbot look right block
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['allbot_lookright'] = function(block) {
  var speed = Blockly.Arduino.valueToCode(
      block, 'SPEED', Blockly.Arduino.ORDER_ATOMIC) || '200';
  
  var code = '';
  // find type of allbot
  var allbot = Blockly.Arduino.Boards.selected;
  if (allbot['allbotname'] !== undefined) {
    var func = allbotfunctions[allbot.allbotname].lookright;
    if (func !== undefined) {
      Blockly.Arduino.addFunction('lookright', func)
      code = 'lookright(' + speed + ');\n';
    } else {
      code = '// This AllBot has no lookright function !!\n';
    }
  } else {
    code = '// No AllBot on the workspace. Add it to generate code\n';
  }
  
  return code;
};

/**
 * The allbot chirp block
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['allbot_chirp'] = function(block) {
  var beeps = Blockly.Arduino.valueToCode(
      block, 'BEEPS', Blockly.Arduino.ORDER_ATOMIC) || '1';
  var speed = Blockly.Arduino.valueToCode(
      block, 'SPEED', Blockly.Arduino.ORDER_ATOMIC) || '100';
  
  var code = '';
  // find type of allbot
  var allbot = Blockly.Arduino.Boards.selected;
  if (allbot['allbotname'] !== undefined) {
    var func = allbotfunctions[allbot.allbotname].chirp;
    Blockly.Arduino.addFunction('chirp', func)
    code = 'chirp(' + beeps + ', ' + speed + ');\n';
  } else {
    code = '// No AllBot on the workspace. Add it to generate code\n';
  }
  
  return code;
};

/**
 * The allbot look scared block
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['allbot_scared'] = function(block) {
  var beeps = Blockly.Arduino.valueToCode(
      block, 'BEEPS', Blockly.Arduino.ORDER_ATOMIC) || '3';
  var shakes = Blockly.Arduino.valueToCode(
      block, 'SHAKES', Blockly.Arduino.ORDER_ATOMIC) || '10';
  
  var code = '';
  // find type of allbot
  var allbot = Blockly.Arduino.Boards.selected;
  if (allbot['allbotname'] !== undefined) {
    var funcchirp = allbotfunctions[allbot.allbotname].chirp;
    Blockly.Arduino.addFunction('chirp', funcchirp);
    var func = allbotfunctions[allbot.allbotname].scared;
    Blockly.Arduino.addFunction('scared', func);
    code = 'scared(' + shakes + ', ' + beeps + ');\n';
  } else {
    code = '// No AllBot on the workspace. Add it to generate code\n';
  }
  
  return code;
};

/**
 * Code generator to set an angle (Y) value to an allbot servo pin (X).
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['servoallbot_write'] = function(block) {
  var servoInstanceName = block.getFieldValue('SERVO_NAME');
  var servoAngle = Blockly.Arduino.valueToCode(
      block, 'SERVO_ANGLE', Blockly.Arduino.ORDER_ATOMIC) || '90';

  var code = 'BOT.write(' + servoInstanceName + ', ' + servoAngle + ');\n';
  return code;
};

/**
 * Code generator to animate an allbot.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['allbot_animate'] = function(block) {
  var speed = Blockly.Arduino.valueToCode(
      block, 'SPEED', Blockly.Arduino.ORDER_ATOMIC) || '100';
  var movementBranch = Blockly.Arduino.statementToCode(block, 'SERVOMOVEMENTS');
  
  var code = movementBranch;
  code += '  BOT.animate(' + speed + ');\n';
  return code;
};

/**
 * Code generator for a movement block of the animate of an allbot.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['servoallbot_animate'] = function(block) {
  var servoInstanceName = block.getFieldValue('SERVO_NAME');
  var servoAngle = Blockly.Arduino.valueToCode(
      block, 'SERVO_ANGLE', Blockly.Arduino.ORDER_ATOMIC) || '90';

  var code = 'BOT.move(' + servoInstanceName + ', ' + servoAngle + ');\n';
  return code;
};

/**
 * Code generator for the allbot remote control block
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['allbot_remotecontrol'] = function(block) {
  
  var commandsBranch = Blockly.Arduino.statementToCode(block, 'RC_COMMANDS');
  
  var use_serial = (block.getFieldValue('RC_SERIAL') == 'TRUE');
  
  if (use_serial) {
    Blockly.Arduino.addVariable('ALLBOTreceivelog', 'boolean ALLBOTreceivelog = true; // Set this to false if you do not want to see the serial messages for debugging the IR commands', true);
    
    Blockly.Arduino.addFunction('ALLBOTresetserial', `
void ALLBOTresetserial (void)      // This clears any received IR commands that where received in the serial buffer while the robot was execution a command.
{
  //resetting all variables
  ALLBOTrawcommand = "";
  ALLBOTcommand = "";
  ALLBOTtimes = 0;
  ALLBOTspeedms = 0;
  
  //flushing the serial buffer (64 byte) so there are no stored movements that need to be handled (annoying)...
  while (Serial.available()) {
    Serial.read();
  }
}`)
  } else {
    Blockly.Arduino.addVariable('ALLBOTreceivelog', 'boolean ALLBOTreceivelog = false; // Set this to true if you  want to see the serial messages for debugging the IR commands', true);
  }
  
  Blockly.Arduino.addVariable('ALLBOTrawcommand', 'String ALLBOTrawcommand;  // Global variable that stores the raw received IR command', true);
  Blockly.Arduino.addVariable('ALLBOTcommand', 'String ALLBOTcommand;     // Global variable that stores part of the decoded IR command', true);
  Blockly.Arduino.addVariable('ALLBOTtimes',      'int ALLBOTtimes = 1;          // Global variable that stores part the received IR command', true);
  Blockly.Arduino.addVariable('ALLBOTspeedms',      'int ALLBOTspeedms = 100;        // Global variable that stores part the received IR command', true);
  Blockly.Arduino.addVariable('ALLBOT_IRreceive',    'boolean ALLBOT_IRreceive = true; // Set this to false if you do not want to use the IR remote');

  var setupCode_Serial = `
  // Starting the hardware UART, necessary for receiving IR
  if (ALLBOT_IRreceive == true) {   // Check if required (when Serial is started servo1 connector will not work!)
      Serial.begin(2400);
      Serial.setTimeout(100);
      Serial.println("serial communication started");
    }
`;
  Blockly.Arduino.addSetup('allbot_RC', setupCode_Serial, true);
  
  Blockly.Arduino.addFunction('ALLBOT_getcommand', `
void ALLBOT_getcommand (void)                   // This is the routine that listens and decodes any IR commands. Decodes commands end up in the global vars.
{ 
  int space1 = 0;
  int space2 = 0;
  
  if (Serial.available()) {
     ALLBOTrawcommand = Serial.readString();
     if (ALLBOTreceivelog){
        Serial.println("START " + ALLBOTrawcommand + " END" + "\\r\\n" + "Received string length = " + ALLBOTrawcommand.length() + "\\r\\n" + "End character > at index = " + ALLBOTrawcommand.indexOf('>'));
     }

     //checking and deleting rubbish data at start of received command
     if ((ALLBOTrawcommand.indexOf('<') != 0) && (ALLBOTrawcommand.indexOf('<') != -1))
     {
        //ALLBOTrawcommand.remove(0, ALLBOTrawcommand.indexOf('<'));
        ALLBOTcommand = ALLBOTrawcommand.substring(ALLBOTrawcommand.indexOf('<'));//,ALLBOTrawcommand.length()-1);
     }
     
     //check if received command is correct
     if ((ALLBOTrawcommand.charAt(0) == '<') && (ALLBOTrawcommand.indexOf('>') <= 12) && (ALLBOTrawcommand.indexOf('>') != -1) && (ALLBOTrawcommand.length() > 7))
     {
       if (ALLBOTreceivelog){
         Serial.println("Command is VALID"); 
       }      
       //breakdown into chunks
       //ALLBOTcommand
       ALLBOTcommand = ALLBOTrawcommand.substring(1, 3);
       
       //finding the spaces to find the ALLBOTtimes and ALLBOTspeedms
       for (int i=0; i <= ALLBOTrawcommand.length(); i ++)
       {
         if ((ALLBOTrawcommand.charAt(i) == ' ') && (space1 == 0))
         {
            space1 = i;
         }
         else if ((ALLBOTrawcommand.charAt(i) == ' ') && (space2 == 0))
         {
            space2 = i;
         }
       }

       //Setting the command variables and checking if they are indeed a number (toInt()).
       
       //ALLBOTtimes
       ALLBOTtimes = ALLBOTrawcommand.substring(space1+1, space2).toInt();
       
       //ALLBOTspeedms
       ALLBOTspeedms = ALLBOTrawcommand.substring(space2+1, ALLBOTrawcommand.indexOf('>')).toInt();

       if (ALLBOTreceivelog){
         Serial.println("decoded commands are:");
         Serial.flush();
         Serial.println("command = " + ALLBOTcommand);
         Serial.flush();
         Serial.print("times = ");Serial.println(ALLBOTtimes);
         Serial.flush();
         Serial.print("speedms = ");Serial.println(ALLBOTspeedms);
         Serial.flush();
       }
       
     }
     else
     {
       if (ALLBOTreceivelog){
          Serial.println("Command is NOT valid");
       }
       ALLBOTresetserial();  
     }
  }
}`)
  
  var code = `
  if (ALLBOT_IRreceive == true) {                 // Allow to switch off the IR part
      ALLBOT_getcommand();                       // Listen for IR command\n`;
  code += commandsBranch;  // add the commands given by user to process the IR input
  code += '\n    }\n';
  return code;
};

/**
 * Code generator for a allbot RC command block
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['allbot_remotecontroldo'] = function(block) {
  if (block.getParent() == undefined) return '';
  
  var commandRC = block.getFieldValue('RC_COMMAND');
  var executeBranch = Blockly.Arduino.statementToCode(block, 'RC_EXECUTE');
  
  var code = 'if (ALLBOTcommand == "' + commandRC + '") {\n';
  code += executeBranch + '\n    }\n';
  
  return code;
};

/**
 * Code generator for a allbot RC speed block
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['allbot_remotecontrol_speed'] = function(block) {
  
  Blockly.Arduino.addVariable('ALLBOTspeedms',      'int ALLBOTspeedms = 100;        // Global variable that stores part the received IR command', true);
  
  var code = 'ALLBOTspeedms';
  
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

/**
 * Code generator for a allbot RC times block
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['allbot_remotecontrol_times'] = function(block) {
  
  Blockly.Arduino.addVariable('ALLBOTtimes',      'int ALLBOTtimes = 1;          // Global variable that stores part the received IR command', true);
  
  var code = 'ALLBOTtimes';
  
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
