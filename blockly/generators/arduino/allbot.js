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
  chirp: '\n'+
'void chirp(int beeps, int speedms){\n'+
'\n'+
'  for (int i = 0; i < beeps; i++){\n'+
'    for (int i = 0; i < 255; i++){\n'+
'      digitalWrite(sounderPin, HIGH);\n'+
'      delayMicroseconds((355-i)+ (speedms*2));\n'+
'      digitalWrite(sounderPin, LOW);\n'+
'      delayMicroseconds((355-i)+ (speedms*2));\n'+
'    }\n'+
'     delay(30);\n'+
'  }\n'+
'}',
  walkbackward: '\n'+
'void walkbackward(int steps, int speedms){\n'+
'    BOT.move(hipLeft, 130);\n'+
'    BOT.move(hipRight, 40); \n'+
'    BOT.animate(speedms);\n'+
'\n'+
'    for (int i = 0; i < steps; i++){\n'+
'      BOT.move(ankleLeft, 135);\n'+
'      BOT.animate(speedms*2);\n'+
'  \n'+
'      BOT.move(ankleRight, 45);\n'+
'      BOT.animate(speedms*2);\n'+
'  \n'+
'      BOT.move(ankleLeft, 90);\n'+
'      BOT.animate(speedms*2);\n'+
'  \n'+
'      BOT.move(ankleRight, 90);\n'+
'      BOT.animate(speedms*2);\n'+
'    }\n'+
'\n'+
'    BOT.move(hipLeft, 90);\n'+
'    BOT.move(hipRight, 90); \n'+
'    BOT.animate(speedms);\n'+
'}',
  walkforward: '\n'+
'void walkforward(int steps, int speedms){\n'+
'    BOT.move(hipLeft, 130);\n'+
'    BOT.move(hipRight, 40); \n'+
'    BOT.animate(speedms);\n'+
'\n'+
'    for (int i = 0; i < steps; i++){\n'+
'      BOT.move(ankleLeft, 45);\n'+
'      BOT.animate(speedms*2);\n'+
'  \n'+
'      BOT.move(ankleRight, 135);\n'+
'      BOT.animate(speedms*2);\n'+
'  \n'+
'      BOT.move(ankleLeft, 90);\n'+
'      BOT.animate(speedms*2);\n'+
'  \n'+
'      BOT.move(ankleRight, 90);\n'+
'      BOT.animate(speedms*2);\n'+
'    }\n'+
'\n'+
'    BOT.move(hipLeft, 90);\n'+
'    BOT.move(hipRight, 90); \n'+
'    BOT.animate(speedms);\n'+
'}',
  lookright: '\n'+
'void lookright(int speedms){\n'+
'    BOT.move(hipLeft, 45);\n'+
'    BOT.move(hipRight, 135);\n'+
'    BOT.animate(speedms);\n'+
'  \n'+
'    delay(speedms/2);\n'+
'    \n'+
'    BOT.move(hipLeft, 90);\n'+
'    BOT.move(hipRight, 90);\n'+
'    BOT.animate(speedms);\n'+
'}',
  lookleft: '\n'+
'void lookleft(int speedms){\n'+
'    BOT.move(hipLeft, 135);\n'+
'    BOT.move(hipRight, 45);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    delay(speedms/2);\n'+
'    \n'+
'    BOT.move(hipLeft, 90);\n'+
'    BOT.move(hipRight, 90);\n'+
'    BOT.animate(speedms);\n'+
'}',
  walkright: 'void walkright(int steps, int speedms){\n'+
'  for (int i = 0; i < steps; i++){\n'+
'    BOT.move(ankleRight, 45);\n'+
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(ankleLeft, 135);\n'+
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(ankleRight, 90);\n'+
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(ankleLeft, 90);\n'+
'    BOT.animate(speedms);\n'+
'  }\n'+
'}',
  walkleft: 'void walkleft(int steps, int speedms){\n'+
'  for (int i = 0; i < steps; i++){\n'+
'    BOT.move(ankleLeft, 45);\n'+
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(ankleRight, 135);\n'+
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(ankleLeft, 90);\n'+
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(ankleRight, 90);\n'+
'    BOT.animate(speedms);\n'+
'  }\n'+
'}',
  scared: 'void scared(int shakes, int beeps){\n'+
'    \n'+
'    for (int i = 0; i < shakes; i++){\n'+
'\n'+
'      BOT.move(ankleLeft, 45);\n'+
'      BOT.move(ankleRight, 45);\n'+
'      BOT.animate(100);\n'+
'      \n'+
'      BOT.move(ankleLeft, 135);\n'+
'      BOT.move(ankleRight, 135);\n'+
'      BOT.animate(100);\n'+
'    }    \n'+
'    BOT.move(ankleLeft, 90);\n'+
'    BOT.move(ankleRight, 90);\n'+
'    BOT.animate(100);\n'+
'\n'+
'    chirp(beeps, 0);\n'+
'}'
}

//  VR408    *******************************************************
allbotfunctions.VR408 = {
  chirp: '\n'+
'void chirp(int beeps, int speedms){\n'+
'\n'+
'  for (int i = 0; i < beeps; i++){\n'+
'    for (int i = 0; i < 255; i++){\n'+
'      digitalWrite(sounderPin, HIGH);\n'+
'      delayMicroseconds((355-i)+ (speedms*2));\n'+
'      digitalWrite(sounderPin, LOW);\n'+
'      delayMicroseconds((355-i)+ (speedms*2));\n'+
'    }\n'+
'     delay(30);\n'+
'  }\n'+
'}',
  walkbackward: 'void walkbackward(int steps, int speedms){\n'+
'  for (int i = 0; i < steps; i++){\n'+
'    BOT.move(kneeRearRight, 80);\n'+
'    BOT.move(kneeFrontLeft, 80);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    BOT.move(hipRearRight, 20);\n'+
'    BOT.move(hipFrontLeft, 80);\n'+
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(kneeRearRight, 30);\n'+
'    BOT.move(kneeFrontLeft, 30);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    BOT.move(hipRearRight, 45);\n'+
'    BOT.move(hipFrontLeft, 45);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    BOT.move(kneeRearRight, 45);\n'+
'    BOT.move(kneeFrontLeft, 45);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    BOT.move(kneeRearLeft, 80);\n'+
'    BOT.move(kneeFrontRight, 80);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    BOT.move(hipRearLeft, 20);\n'+
'    BOT.move(hipFrontRight, 80);\n'+
'    BOT.animate(speedms);\n'+
'    BOT.move(kneeRearLeft, 30);\n'+
'    BOT.move(kneeFrontRight, 30);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    BOT.move(hipRearLeft, 45);\n'+
'    BOT.move(hipFrontRight, 45);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    BOT.move(kneeRearLeft, 45);\n'+
'    BOT.move(kneeFrontRight, 45);\n'+
'    BOT.animate(speedms);\n'+
'  }\n'+
'}',
  walkforward: 'void walkforward(int steps, int speedms){\n'+
'  for (int i = 0; i < steps; i++){\n'+
'    BOT.move(kneeRearRight, 80);\n'+
'    BOT.move(kneeFrontLeft, 80);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    BOT.move(hipRearRight, 80);\n'+
'    BOT.move(hipFrontLeft, 20);\n'+
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(kneeRearRight, 30);\n'+
'    BOT.move(kneeFrontLeft, 30);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    BOT.move(hipRearRight, 45);\n'+
'    BOT.move(hipFrontLeft, 45);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    BOT.move(kneeRearRight, 45);\n'+
'    BOT.move(kneeFrontLeft, 45);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    BOT.move(kneeRearLeft, 80);\n'+
'    BOT.move(kneeFrontRight, 80);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    BOT.move(hipRearLeft, 80);\n'+
'    BOT.move(hipFrontRight, 20);\n'+
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(kneeRearLeft, 30);\n'+
'    BOT.move(kneeFrontRight, 30);\n'+
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(hipRearLeft, 45);\n'+
'    BOT.move(hipFrontRight, 45);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'\n'+
'    BOT.move(kneeRearLeft, 45);\n'+
'    BOT.move(kneeFrontRight, 45);\n'+
'    BOT.animate(speedms);\n'+
'  }\n'+
'}',
  walkleft: 'void walkleft(int steps, int speedms){\n'+
'  for (int i = 0; i < steps; i++){\n'+
'    BOT.move(kneeRearRight, 80);\n'+
'    BOT.move(kneeFrontLeft, 80);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    BOT.move(hipRearRight, 0);\n'+
'    BOT.move(hipFrontLeft, 90);\n'+
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(kneeRearRight, 30);\n'+
'    BOT.move(kneeFrontLeft, 30);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    BOT.move(hipRearRight, 45);\n'+
'    BOT.move(hipFrontLeft, 45);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    BOT.move(kneeRearRight, 45);\n'+
'    BOT.move(kneeFrontLeft, 45);\n'+
'\n'+
'    BOT.animate(speedms);\n'+
'     \n'+
'    BOT.move(kneeRearLeft, 80);\n'+
'    BOT.move(kneeFrontRight, 80);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    BOT.move(hipRearLeft, 90);\n'+
'    BOT.move(hipFrontRight, 0);\n'+
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(kneeRearLeft, 30);\n'+
'    BOT.move(kneeFrontRight, 30);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    BOT.move(hipRearLeft, 45);\n'+
'    BOT.move(hipFrontRight, 45);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    BOT.move(kneeRearLeft, 45);\n'+
'    BOT.move(kneeFrontRight, 45);\n'+
'    BOT.animate(speedms);\n'+
'  }\n'+
'}',
  walkright: 'void walkright(int steps, int speedms){\n'+
'  for (int i = 0; i < steps; i++){\n'+
'    BOT.move(kneeRearLeft, 80);\n'+
'    BOT.move(kneeFrontRight, 80);\n'+
'    BOT.animate(speedms);\n'+
'\n'+    
'    BOT.move(hipRearLeft, 0);\n'+
'    BOT.move(hipFrontRight, 90);\n'+
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(kneeRearLeft, 30);\n'+
'    BOT.move(kneeFrontRight, 30);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    BOT.move(hipRearLeft, 45);\n'+
'    BOT.move(hipFrontRight, 45);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    BOT.move(kneeRearLeft, 45);\n'+
'    BOT.move(kneeFrontRight, 45);\n'+
'    BOT.animate(speedms);\n'+
'     \n'+
'    BOT.move(kneeRearRight, 80);\n'+
'    BOT.move(kneeFrontLeft, 80);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    BOT.move(hipRearRight, 90);\n'+
'    BOT.move(hipFrontLeft, 0);\n'+
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(kneeRearRight, 30);\n'+
'    BOT.move(kneeFrontLeft, 30);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    BOT.move(hipRearRight, 45);\n'+
'    BOT.move(hipFrontLeft, 45);\n'+
'    BOT.animate(speedms);\n'+
'\n'+    
'    BOT.move(kneeRearRight, 45);\n'+
'    BOT.move(kneeFrontLeft, 45);\n'+
'    BOT.animate(speedms);\n'+
'  }\n'+
'}',
  lookright: 'void lookright(int speedms){\n'+
'    BOT.move(hipRearRight, 80);\n'+
'    BOT.move(hipRearLeft, 10);\n'+
'    BOT.move(hipFrontRight, 10);\n'+
'    BOT.move(hipFrontLeft, 80);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    delay(speedms/2);\n'+
'    \n'+
'    BOT.move(hipRearRight, 45);\n'+
'    BOT.move(hipRearLeft, 45);\n'+
'    BOT.move(hipFrontRight, 45);\n'+
'    BOT.move(hipFrontLeft, 45);\n'+
'    BOT.animate(speedms);\n'+
'}',
  lookleft: 'void lookleft(int speedms){\n'+
'    BOT.move(hipRearLeft, 80);\n'+
'    BOT.move(hipRearRight, 10);\n'+
'    BOT.move(hipFrontLeft, 10);\n'+
'    BOT.move(hipFrontRight, 80);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    delay(speedms/2);\n'+
'    \n'+
'    BOT.move(hipRearRight, 45);\n'+
'    BOT.move(hipRearLeft, 45);\n'+
'    BOT.move(hipFrontRight, 45);\n'+
'    BOT.move(hipFrontLeft, 45);\n'+
'    BOT.animate(speedms);\n'+
'}',
  leanright: 'void leanright(int speedms){\n'+
'    BOT.move(kneeFrontRight, 90);\n'+
'    BOT.move(kneeRearRight, 90);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    delay(speedms/2);\n'+
'    \n'+
'    BOT.move(kneeFrontRight, 45);\n'+
'    BOT.move(kneeRearRight, 45);\n'+
'    BOT.animate(speedms);\n'+
'}',
  leanleft: 'void leanleft(int speedms){\n'+
'    BOT.move(kneeFrontLeft, 90);\n'+
'    BOT.move(kneeRearLeft, 90);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    delay(speedms/2);\n'+
'    \n'+
'    BOT.move(kneeFrontLeft, 45);\n'+
'    BOT.move(kneeRearLeft, 45);\n'+
'    BOT.animate(speedms);\n'+
'}',
  leanforward: 'void leanforward(int speedms){\n'+
'    BOT.move(kneeFrontLeft, 90);\n'+
'    BOT.move(kneeFrontRight, 90);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    delay(speedms/2);\n'+
'    \n'+
'    BOT.move(kneeFrontLeft, 45);\n'+
'    BOT.move(kneeFrontRight, 45);\n'+
'    BOT.animate(speedms);\n'+
'}',
  leanbackward: 'void leanbackward(int speedms){\n'+
'    BOT.move(kneeRearLeft, 90);\n'+
'    BOT.move(kneeRearRight, 90);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    delay(speedms/2);\n'+
'    \n'+
'    BOT.move(kneeRearLeft, 45);\n'+
'    BOT.move(kneeRearRight, 45);\n'+
'    BOT.animate(speedms);\n'+
'}',
  turnleft: 'void turnleft(int steps, int speedms){\n'+
'  for (int i = 0; i < steps; i++){\n'+
'    BOT.move(kneeRearRight, 80);\n'+
'    BOT.move(kneeFrontLeft, 80);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    BOT.move(hipRearRight, 90);\n'+
'    BOT.move(hipFrontLeft, 90);\n'+
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(kneeRearRight, 30);\n'+
'    BOT.move(kneeFrontLeft, 30);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    BOT.move(hipRearRight, 45);\n'+
'    BOT.move(hipFrontLeft, 45);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    BOT.move(kneeRearRight, 45);\n'+
'    BOT.move(kneeFrontLeft, 45);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    BOT.move(kneeRearLeft, 80);\n'+
'    BOT.move(kneeFrontRight, 80);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    BOT.move(hipRearLeft, 0);\n'+
'    BOT.move(hipFrontRight, 0);\n'+
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(kneeRearLeft, 30);\n'+
'    BOT.move(kneeFrontRight, 30);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    BOT.move(hipRearLeft, 45);\n'+
'    BOT.move(hipFrontRight, 45);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    BOT.move(kneeRearLeft, 45);\n'+
'    BOT.move(kneeFrontRight, 45);\n'+
'    BOT.animate(speedms);\n'+
'  }\n'+
'}',
  turnright: 'void turnright(int steps, int speedms){\n'+
'  for (int i = 0; i < steps; i++){\n'+
'    BOT.move(kneeRearRight, 80);\n'+
'    BOT.move(kneeFrontLeft, 80);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    BOT.move(hipRearRight, 0);\n'+
'    BOT.move(hipFrontLeft, 0);\n'+
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(kneeRearRight, 30);\n'+
'    BOT.move(kneeFrontLeft, 30);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    BOT.move(hipRearRight, 45);\n'+
'    BOT.move(hipFrontLeft, 45);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    BOT.move(kneeRearRight, 45);\n'+
'    BOT.move(kneeFrontLeft, 45);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    BOT.move(kneeRearLeft, 80);\n'+
'    BOT.move(kneeFrontRight, 80);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    BOT.move(hipRearLeft, 90);\n'+
'    BOT.move(hipFrontRight, 90);\n'+
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(kneeRearLeft, 30);\n'+
'    BOT.move(kneeFrontRight, 30);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    BOT.move(hipRearLeft, 45);\n'+
'    BOT.move(hipFrontRight, 45);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    BOT.move(kneeRearLeft, 45);\n'+
'    BOT.move(kneeFrontRight, 45);\n'+
'    BOT.animate(speedms);\n'+
'  }\n'+
'}',
  scared: 'void scared(int shakes, int beeps){\n'+
'    BOT.move(kneeFrontRight, 0);\n'+
'    BOT.move(kneeRearRight, 0);\n'+
'    BOT.move(kneeFrontLeft, 0);\n'+
'    BOT.move(kneeRearLeft, 0);\n'+
'    BOT.animate(50);\n'+
'    \n'+
'    for (int i = 0; i < shakes; i++){\n'+
' \n'+
'      BOT.move(hipRearRight, 80);\n'+
'      BOT.move(hipRearLeft, 10);\n'+
'      BOT.move(hipFrontRight, 10);\n'+
'      BOT.move(hipFrontLeft, 80);\n'+
'      BOT.animate(100);\n'+
'      \n'+
'      BOT.move(hipRearLeft, 80);\n'+
'      BOT.move(hipRearRight, 10);\n'+
'      BOT.move(hipFrontLeft, 10);\n'+
'      BOT.move(hipFrontRight, 80);\n'+
'      BOT.animate(50);\n'+
'    }\n'+
'    \n'+
'    BOT.move(hipRearRight, 45);\n'+
'    BOT.move(hipRearLeft, 45);\n'+
'    BOT.move(hipFrontRight, 45);\n'+
'    BOT.move(hipFrontLeft, 45);\n'+
'    BOT.animate(200);\n'+
'    \n'+
'    chirp(beeps, 0);\n'+
'    \n'+
'    BOT.move(kneeFrontRight, 45);\n'+
'    BOT.move(kneeRearRight, 45);\n'+
'    BOT.move(kneeFrontLeft, 45);\n'+
'    BOT.move(kneeRearLeft, 45);\n'+
'    BOT.animate(75);\n'+
'}'
}
//  VR412    *******************************************************
allbotfunctions.VR412 = {
  standup: 'void standup(){\n'+
'\n'+
'  BOT.move(kneeFrontLeft, 110);\n'+
'  BOT.move(kneeFrontRight, 110);\n'+
'  BOT.animate(500);\n'+
'\n'+
'  BOT.move(kneeRearLeft, 110);\n'+
'  BOT.move(kneeRearRight, 110);\n'+
'  BOT.animate(500);\n'+
'\n'+
'  BOT.move(kneeFrontLeft, 90);\n'+
'  BOT.animate(100);\n'+
'  BOT.move(ankleFrontLeft, 20);\n'+
'  BOT.animate(100);\n'+
'  BOT.move(kneeFrontLeft, 110);\n'+
'  BOT.animate(100);\n'+
'\n'+
'  BOT.move(kneeFrontRight, 90);\n'+
'  BOT.animate(100);\n'+
'  BOT.move(ankleFrontRight, 20);\n'+
'  BOT.animate(100);\n'+
'  BOT.move(kneeFrontRight, 110);\n'+
'  BOT.animate(100);\n'+
'\n'+
'  BOT.move(kneeRearLeft, 90);\n'+
'  BOT.animate(100);\n'+
'  BOT.move(ankleRearLeft, 20);\n'+
'  BOT.animate(100);\n'+
'  BOT.move(kneeRearLeft, 110);\n'+
'  BOT.animate(100);\n'+
'\n'+
'  BOT.move(kneeRearRight, 90);\n'+
'  BOT.animate(100);\n'+
'  BOT.move(ankleRearRight, 20);\n'+
'  BOT.animate(100);\n'+
'  BOT.move(kneeRearRight, 110);\n'+
'  BOT.animate(100);\n'+
'}',
  chirp: 'void chirp(int beeps, int speedms){\n'+
'\n'+
'  for (int i = 0; i < beeps; i++){\n'+
'    for (int i = 0; i < 255; i++){\n'+
'      digitalWrite(sounderPin, HIGH);\n'+
'      delayMicroseconds((355-i)+ (speedms*2));\n'+
'      digitalWrite(sounderPin, LOW);\n'+
'      delayMicroseconds((355-i)+ (speedms*2));\n'+
'    }\n'+
'     delay(30);\n'+
'  }\n'+
'}',
  walkbackward: 'void walkbackward(int steps, int speedms){\n'+
'  for (int i = 0; i < steps; i++){\n'+
'    BOT.move(kneeFrontRight, 80);\n'+
'    BOT.move(hipFrontRight, 80);\n'+
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(kneeFrontRight, 110);\n'+
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(kneeRearRight, 80);\n'+
'    BOT.move(hipRearRight, 10);\n'+
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(kneeRearRight, 110);\n'+
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(hipRearRight, 45);\n'+
'    BOT.move(hipFrontRight, 45);\n'+
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(kneeFrontLeft, 80);\n'+
'    BOT.move(hipFrontLeft, 80);\n'+
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(kneeFrontLeft, 110);\n'+
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(kneeRearLeft, 80);\n'+
'    BOT.move(hipRearLeft, 10);\n'+
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(kneeRearLeft, 110);\n'+
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(hipRearLeft, 45);\n'+
'    BOT.move(hipFrontLeft, 45);\n'+
'    BOT.animate(speedms);\n'+
'  }\n'+
'}',
  walkforward: 'void walkforward(int steps, int speedms){\n'+
'  for (int i = 0; i < steps; i++){ \n'+
'    BOT.move(kneeRearRight, 80);\n'+
'    BOT.move(hipRearRight, 80);\n'+
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(kneeRearRight, 110);\n'+
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(kneeFrontRight, 80);\n'+
'    BOT.move(hipFrontRight, 10);\n'+
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(kneeFrontRight, 110);\n'+
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(hipFrontRight, 45);\n'+
'    BOT.move(hipRearRight, 45);\n'+
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(kneeRearLeft, 80);\n'+
'    BOT.move(hipRearLeft, 80);\n'+
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(kneeRearLeft, 110);\n'+
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(kneeFrontLeft, 80);\n'+
'    BOT.move(hipFrontLeft, 10);\n'+
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(kneeFrontLeft, 110);\n'+
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(hipFrontLeft, 45);\n'+
'    BOT.move(hipRearLeft, 45);\n'+
'    BOT.animate(speedms);\n'+
'  }\n'+
'}',
  walkleft: 'void walkleft(int steps, int speedms){\n'+
'  for (int i = 0; i < steps; i++){\n'+
'    BOT.move(kneeRearRight, 80);\n'+
'    BOT.move(hipRearRight, 10);\n'+
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(kneeRearRight, 110);\n'+
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(kneeRearLeft, 80);\n'+
'    BOT.move(hipRearLeft, 80);\n'+
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(kneeRearLeft, 110);\n'+
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(hipRearLeft, 45);\n'+
'    BOT.move(hipRearRight, 45);\n'+
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(kneeFrontRight, 80);\n'+
'    BOT.move(hipFrontRight, 10);\n'+
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(kneeFrontRight, 110);\n'+
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(kneeFrontLeft, 80);\n'+
'    BOT.move(hipFrontLeft, 80);\n'+
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(kneeFrontLeft, 110);\n'+
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(hipFrontLeft, 45);\n'+
'    BOT.move(hipFrontRight, 45);\n'+
'    BOT.animate(speedms);\n'+
'  }\n'+
'}',
  walkright: 'void walkright(int steps, int speedms){\n'+
'  for (int i = 0; i < steps; i++){\n'+
'    BOT.move(kneeRearLeft, 80);\n'+
'    BOT.move(hipRearLeft, 10);\n'+
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(kneeRearLeft, 110);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    BOT.move(kneeRearRight, 80);\n'+
'    BOT.move(hipRearRight, 80);\n'+
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(kneeRearRight, 110);\n'+
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(hipRearLeft, 45);\n'+
'    BOT.move(hipRearRight, 45);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    BOT.move(kneeFrontLeft, 80);\n'+
'    BOT.move(hipFrontLeft, 10);\n'+
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(kneeFrontLeft, 110);\n'+
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(kneeFrontRight, 80);\n'+
'    BOT.move(hipFrontRight, 80);\n'+
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(kneeFrontRight, 110);\n'+
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(hipFrontLeft, 45);\n'+
'    BOT.move(hipFrontRight, 45);\n'+
'    BOT.animate(speedms);\n'+
'  }\n'+
'}',
  lookright: 'void lookright(int speedms){\n'+
'    BOT.move(hipRearRight, 80);\n'+
'    BOT.move(hipRearLeft, 10);\n'+
'    BOT.move(hipFrontRight, 10);\n'+
'    BOT.move(hipFrontLeft, 80);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    delay(speedms/2);\n'+
'    \n'+
'    BOT.move(hipRearRight, 45);\n'+
'    BOT.move(hipRearLeft, 45);\n'+
'    BOT.move(hipFrontRight, 45);\n'+
'    BOT.move(hipFrontLeft, 45);\n'+
'    BOT.animate(speedms);\n'+
'}',
  lookleft: 'void lookleft(int speedms){\n'+
'    BOT.move(hipRearLeft, 80);\n'+
'    BOT.move(hipRearRight, 10);\n'+
'    BOT.move(hipFrontLeft, 10);\n'+
'    BOT.move(hipFrontRight, 80);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    delay(speedms/2);\n'+
'    \n'+
'    BOT.move(hipRearRight, 45);\n'+
'    BOT.move(hipRearLeft, 45);\n'+
'    BOT.move(hipFrontRight, 45);\n'+
'    BOT.move(hipFrontLeft, 45);\n'+
'    BOT.animate(speedms);\n'+
'}',
  leanright: 'void leanright(int speedms){\n'+
'    BOT.move(kneeFrontRight, 80);\n'+
'    BOT.move(kneeRearRight, 80);\n'+
'    BOT.move(ankleFrontRight, 0);\n'+
'    BOT.move(ankleRearRight, 0);\n'+
'    BOT.animate(speedms*2);\n'+
'    \n'+
'    delay(speedms*3);\n'+
'\n'+
'    BOT.move(kneeFrontRight, 110);  \n'+
'    BOT.move(kneeRearRight, 110);\n'+
'    BOT.move(ankleFrontRight, 20);\n'+
'    BOT.move(ankleRearRight, 20);\n'+
'    BOT.animate(speedms*2);\n'+
'}',
  leanleft: 'void leanleft(int speedms){\n'+
'    BOT.move(kneeFrontLeft, 80);\n'+
'    BOT.move(kneeRearLeft, 80);\n'+
'    BOT.move(ankleFrontLeft, 0);\n'+
'    BOT.move(ankleRearLeft, 0);\n'+
'    BOT.animate(speedms*2);\n'+
'    \n'+
'    delay(speedms*3);\n'+
'\n'+
'    BOT.move(kneeFrontLeft, 110);  \n'+
'    BOT.move(kneeRearLeft, 110);\n'+
'    BOT.move(ankleFrontLeft, 20);\n'+
'    BOT.move(ankleRearLeft, 20);\n'+
'    BOT.animate(speedms*2);\n'+
'}',
  leanforward: 'void leanforward(int speedms){\n'+
'    BOT.move(kneeFrontLeft, 80);\n'+
'    BOT.move(kneeFrontRight, 80);\n'+
'    BOT.move(ankleFrontLeft, 0);\n'+
'    BOT.move(ankleFrontRight, 0);\n'+
'    BOT.animate(speedms*2);\n'+
'    \n'+
'    delay(speedms*3);\n'+
'\n'+
'    BOT.move(kneeFrontLeft, 110);\n'+
'    BOT.move(kneeFrontRight, 110);\n'+
'    BOT.move(ankleFrontLeft, 20);\n'+
'    BOT.move(ankleFrontRight, 20);\n'+
'    BOT.animate(speedms*2);\n'+
'}',
  leanbackward: 'void leanbackward(int speedms){\n'+
'    BOT.move(kneeRearLeft, 80);\n'+
'    BOT.move(kneeRearRight, 80);\n'+
'    BOT.move(ankleRearLeft, 0);\n'+
'    BOT.move(ankleRearRight, 0);\n'+
'    BOT.animate(speedms*2);\n'+
'    \n'+
'    delay(speedms*3);\n'+
'\n'+
'    BOT.move(kneeRearLeft, 110);\n'+
'    BOT.move(kneeRearRight, 110);\n'+
'    BOT.move(ankleRearLeft, 20);\n'+
'    BOT.move(ankleRearRight, 20);\n'+
'    BOT.animate(speedms*2);\n'+
'}',
  turnleft: 'void turnleft(int steps, int speedms){\n'+
'  for (int i = 0; i < steps; i++){\n'+
'    BOT.move(kneeRearLeft, 80);\n'+
'    BOT.move(hipRearLeft, 10);\n'+
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(kneeRearLeft, 110);\n'+
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(kneeRearRight, 80);\n'+
'    BOT.move(hipRearRight, 80);\n'+
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(kneeRearRight, 110);\n'+
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(kneeFrontRight, 80);\n'+
'    BOT.move(hipFrontRight, 10);\n'+
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(kneeFrontRight, 110);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    BOT.move(kneeFrontLeft, 80);\n'+
'    BOT.move(hipFrontLeft, 80);\n'+
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(kneeFrontLeft, 110);\n'+
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(hipFrontLeft, 45);\n'+
'    BOT.move(hipFrontRight, 45);\n'+
'    BOT.move(hipRearLeft, 45);\n'+
'    BOT.move(hipRearRight, 45);\n'+
'    BOT.animate(speedms);\n'+
'  }\n'+
'}',
  turnright: 'void turnright(int steps, int speedms){\n'+
'  for (int i = 0; i < steps; i++){\n'+
'    BOT.move(kneeRearRight, 80);\n'+
'    BOT.move(hipRearRight, 10);\n'+
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(kneeRearRight, 110);\n'+
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(kneeRearLeft, 80);\n'+
'    BOT.move(hipRearLeft, 80);\n'+
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(kneeRearLeft, 110);\n'+
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(kneeFrontLeft, 80);\n'+
'    BOT.move(hipFrontLeft, 10);\n'+
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(kneeFrontLeft, 110);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    BOT.move(kneeFrontRight, 80);\n'+
'    BOT.move(hipFrontRight, 80);\n'+
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(kneeFrontRight, 110);\n'+
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(hipFrontLeft, 45);\n'+
'    BOT.move(hipFrontRight, 45);\n'+
'    BOT.move(hipRearLeft, 45);\n'+
'    BOT.move(hipRearRight, 45);\n'+
'    BOT.animate(speedms);\n'+
'  }\n'+
'}',
  scared: 'void scared(int shakes, int beeps){\n'+
'    for (int i = 0; i < shakes; i++){\n'+
'      BOT.move(kneeFrontLeft, 80);\n'+
'      BOT.move(kneeFrontRight, 80);\n'+
'      BOT.move(kneeRearLeft, 80);\n'+
'      BOT.move(kneeRearRight, 80);\n'+
'      BOT.move(ankleFrontLeft, 0);\n'+
'      BOT.move(ankleFrontRight, 0);\n'+
'      BOT.move(ankleRearLeft, 0);\n'+
'      BOT.move(ankleRearRight, 0);\n'+
'      BOT.animate(30);\n'+
'  \n'+
'      BOT.move(kneeFrontLeft, 110);  \n'+
'      BOT.move(kneeFrontRight, 110); \n'+
'      BOT.move(kneeRearLeft, 110);\n'+
'      BOT.move(kneeRearRight, 110);\n'+
'      BOT.move(ankleFrontLeft, 20);\n'+
'      BOT.move(ankleFrontRight, 20);\n'+
'      BOT.move(ankleRearLeft, 20);\n'+
'      BOT.move(ankleRearRight, 20);\n'+
'      BOT.animate(30);\n'+
'    }\n'+
'    chirp(beeps, 0);\n'+
'}'
}

//  VR612    *******************************************************
allbotfunctions.VR612 = {
  chirp: 'void chirp(int beeps, int speedms){\n'+
'\n'+
'  for (int i = 0; i < beeps; i++){\n'+
'    for (int i = 0; i < 255; i++){\n'+
'      digitalWrite(sounderPin, HIGH);\n'+
'      delayMicroseconds((355-i)+ (speedms*2));\n'+
'      digitalWrite(sounderPin, LOW);\n'+
'      delayMicroseconds((355-i)+ (speedms*2));\n'+
'    }\n'+
'     delay(30);\n'+
'  }\n'+
'}',
  walkbackward: 'void walkbackward(int steps, int speedms){\n'+
'  \n'+
'    BOT.move(kneeFrontLeft, 50);\n'+
'    BOT.move(kneeRearLeft, 50);\n'+
'    BOT.move(hipFrontLeft, 15);\n'+
'    BOT.move(hipFrontRight, 75);\n'+
'    \n'+
'    BOT.move(hipFrontLeft, 80);\n'+
'    BOT.move(hipRearLeft, 5);\n'+
'    BOT.move(hipMiddleRight, 115);\n'+
'    BOT.animate(speedms);//\n'+
'  \n'+
'  for (int i = 0; i < steps; i++){\n'+
'    BOT.move(kneeFrontLeft, 10);\n'+
'    BOT.move(kneeRearLeft, 10);\n'+
'    BOT.move(kneeMiddleRight, 10);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    BOT.move(kneeFrontRight, 50);\n'+
'    BOT.move(kneeRearRight, 50);\n'+
'    BOT.move(kneeMiddleLeft, 50);\n'+
'    BOT.animate(speedms);//\n'+
'      \n'+
'    BOT.move(kneeFrontLeft, 20);\n'+
'    BOT.move(kneeRearLeft, 20);\n'+
'    BOT.move(kneeMiddleRight, 20);\n'+
'    BOT.move(hipFrontLeft, 45);\n'+
'    BOT.move(hipRearLeft, 45);\n'+
'    BOT.move(hipMiddleRight, 90);\n'+
'    BOT.move(hipFrontRight, 80);\n'+
'    BOT.move(hipRearRight, 5);\n'+
'    BOT.move(hipMiddleLeft, 115);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    BOT.move(kneeFrontRight, 10);\n'+
'    BOT.move(kneeRearRight, 10);\n'+
'    BOT.move(kneeMiddleLeft, 10);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    BOT.move(kneeFrontLeft, 50);\n'+
'    BOT.move(kneeRearLeft, 50);\n'+
'    BOT.move(kneeMiddleRight, 50);\n'+
'    BOT.animate(speedms);//\n'+
'    \n'+
'    BOT.move(kneeFrontRight, 20);\n'+
'    BOT.move(kneeRearRight, 20);\n'+
'    BOT.move(kneeMiddleLeft, 20);\n'+
'    BOT.move(hipFrontRight, 45);\n'+
'    BOT.move(hipRearRight, 45);\n'+
'    BOT.move(hipMiddleLeft, 90);\n'+
'    BOT.move(hipFrontLeft, 80);\n'+
'    BOT.move(hipRearLeft, 5);\n'+
'    BOT.move(hipMiddleRight, 115);\n'+
'    BOT.animate(speedms);\n'+
'\n'+
'  }\n'+
'    BOT.move(kneeFrontLeft, 10);\n'+
'    BOT.move(kneeRearLeft, 10);\n'+
'    BOT.move(kneeMiddleRight, 10);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    BOT.move(kneeFrontRight, 50);\n'+
'    BOT.move(kneeRearRight, 50);\n'+
'    BOT.move(kneeMiddleLeft, 50);\n'+
'    BOT.animate(speedms);//\n'+
'    \n'+
'    BOT.move(hipFrontLeft, 45);\n'+
'    BOT.move(hipRearLeft, 45);\n'+
'    BOT.move(hipMiddleRight, 90);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    BOT.move(kneeFrontRight, 20);\n'+
'    BOT.move(kneeRearRight, 20);\n'+
'    BOT.move(kneeMiddleLeft, 20);\n'+
'    BOT.move(kneeFrontLeft, 20);\n'+
'    BOT.move(kneeRearLeft, 20);\n'+
'    BOT.move(kneeMiddleRight, 20);\n'+
'    BOT.animate(speedms);//\n'+
'}',
  walkforward: 'void walkforward(int steps, int speedms){\n'+
'  \n'+
'    BOT.move(kneeRearLeft, 50);\n'+
'    BOT.move(kneeFrontLeft, 50);\n'+
'    BOT.move(kneeMiddleRight, 50);\n'+
'    BOT.animate(speedms); //\n'+
'    \n'+
'    BOT.move(hipRearLeft, 80);\n'+
'    BOT.move(hipFrontLeft, 5);\n'+
'    BOT.move(hipMiddleRight, 65);\n'+
'    BOT.animate(speedms);//\n'+
'  \n'+
'  for (int i = 0; i < steps; i++){\n'+
'    \n'+
'    BOT.move(kneeRearLeft, 10);\n'+
'    BOT.move(kneeFrontLeft, 10);\n'+
'    BOT.move(kneeMiddleRight, 10);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    BOT.move(kneeRearRight, 50);\n'+
'    BOT.move(kneeFrontRight, 50);\n'+
'    BOT.move(kneeMiddleLeft, 50);\n'+
'    BOT.animate(speedms);//\n'+
'      \n'+
'    BOT.move(kneeRearLeft, 20);\n'+
'    BOT.move(kneeFrontLeft, 20);\n'+
'    BOT.move(kneeMiddleRight, 20);\n'+
'    BOT.move(hipRearLeft, 45);\n'+
'    BOT.move(hipFrontLeft, 45);\n'+
'    BOT.move(hipMiddleRight, 90);\n'+
'    BOT.move(hipRearRight, 80);\n'+
'    BOT.move(hipFrontRight, 5);\n'+
'    BOT.move(hipMiddleLeft, 65);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    BOT.move(kneeRearRight, 10);\n'+
'    BOT.move(kneeFrontRight, 10);\n'+
'    BOT.move(kneeMiddleLeft, 10);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    BOT.move(kneeRearLeft, 50);\n'+
'    BOT.move(kneeFrontLeft, 50);\n'+
'    BOT.move(kneeMiddleRight, 50);\n'+
'    BOT.animate(speedms);//\n'+
'    \n'+
'    BOT.move(kneeRearRight, 20);\n'+
'    BOT.move(kneeFrontRight, 20);\n'+
'    BOT.move(kneeMiddleLeft, 20);\n'+
'    BOT.move(hipRearRight, 45);\n'+
'    BOT.move(hipFrontRight, 45);\n'+
'    BOT.move(hipMiddleLeft, 90);\n'+
'    BOT.move(hipRearLeft, 80);\n'+
'    BOT.move(hipFrontLeft, 5);\n'+
'    BOT.move(hipMiddleRight, 65);\n'+
'    BOT.animate(speedms);\n'+
'  }\n'+
'    BOT.move(kneeRearLeft, 10);\n'+
'    BOT.move(kneeFrontLeft, 10);\n'+
'    BOT.move(kneeMiddleRight, 10);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    BOT.move(kneeRearRight, 50);\n'+
'    BOT.move(kneeFrontRight, 50);\n'+
'    BOT.move(kneeMiddleLeft, 50);\n'+
'    BOT.animate(speedms);//\n'+
'    \n'+
'    BOT.move(hipRearLeft, 45);\n'+
'    BOT.move(hipFrontLeft, 45);\n'+
'    BOT.move(hipMiddleRight, 90);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    BOT.move(kneeRearRight, 20);\n'+
'    BOT.move(kneeFrontRight, 20);\n'+
'    BOT.move(kneeMiddleLeft, 20);\n'+
'    BOT.move(kneeRearLeft, 20);\n'+
'    BOT.move(kneeFrontLeft, 20);\n'+
'    BOT.move(kneeMiddleRight, 20);\n'+
'    BOT.animate(speedms);//\n'+
'}',
  walkleft: 'void walkleft(int steps, int speedms){\n'+
'  for (int i = 0; i < steps; i++){\n'+
'    \n'+
'    BOT.move(kneeFrontLeft, 50);\n'+
'    BOT.move(kneeRearRight, 50);\n'+
'    BOT.animate(speedms/2);\n'+
'    BOT.move(hipFrontLeft, 80);\n'+
'    BOT.move(hipRearRight, 10);\n'+
'    BOT.animate(speedms);\n'+
'    BOT.move(kneeFrontLeft, 20);\n'+
'    BOT.move(kneeRearRight, 20);\n'+
'    BOT.animate(speedms/2);\n'+
'    \n'+
'    BOT.move(kneeFrontRight, 50);\n'+
'    BOT.move(kneeRearLeft, 50);\n'+
'    BOT.animate(speedms/2);\n'+
'    BOT.move(hipFrontRight, 10);\n'+
'    BOT.move(hipRearLeft, 80);\n'+
'    BOT.animate(speedms);\n'+
'    BOT.move(kneeFrontRight, 20);\n'+
'    BOT.move(kneeRearLeft, 20);\n'+
'    BOT.animate(speedms/2);\n'+
'    \n'+
'    BOT.move(kneeMiddleRight, 50);\n'+
'    BOT.move(kneeMiddleLeft, 50);\n'+
'    BOT.animate(speedms/2);\n'+
'  \n'+
'    BOT.move(hipFrontLeft, 15);\n'+
'    BOT.move(hipFrontRight, 75);\n'+
'    BOT.move(hipRearLeft, 15);\n'+
'    BOT.move(hipRearRight, 75);\n'+
'    BOT.animate(speedms); \n'+
'    \n'+
'    BOT.move(kneeMiddleRight, 20);\n'+
'    BOT.move(kneeMiddleLeft, 20);\n'+
'    BOT.animate(speedms/2);\n'+
'    \n'+
'    BOT.move(kneeFrontLeft, 50);\n'+
'    BOT.move(kneeRearRight, 50);\n'+
'    BOT.animate(speedms/2);\n'+
'    BOT.move(hipFrontLeft, 45);\n'+
'    BOT.move(hipRearRight, 45);\n'+
'    BOT.animate(speedms);\n'+
'    BOT.move(kneeFrontLeft, 20);\n'+
'    BOT.move(kneeRearRight, 20);\n'+
'    BOT.animate(speedms/2);\n'+
'    \n'+
'    BOT.move(kneeFrontRight, 50);\n'+
'    BOT.move(kneeRearLeft, 50);\n'+
'    BOT.animate(speedms/2);\n'+
'    BOT.move(hipFrontRight, 45);\n'+
'    BOT.move(hipRearLeft, 45);\n'+
'    BOT.animate(speedms);\n'+
'    BOT.move(kneeFrontRight, 20);\n'+
'    BOT.move(kneeRearLeft, 20);\n'+
'    BOT.animate(speedms/2);\n'+
'    }\n'+
'  }',
  walkright: 'void walkright(int steps, int speedms){\n'+
'  for (int i = 0; i < steps; i++){\n'+
'    \n'+
'    BOT.move(kneeFrontLeft, 50);\n'+
'    BOT.move(kneeRearRight, 50);\n'+
'    BOT.animate(speedms/2);\n'+
'    BOT.move(hipFrontLeft, 10);\n'+
'    BOT.move(hipRearRight, 80);\n'+
'    BOT.animate(speedms);\n'+
'    BOT.move(kneeFrontLeft, 20);\n'+
'    BOT.move(kneeRearRight, 20);\n'+
'    BOT.animate(speedms/2);\n'+
'    \n'+
'    BOT.move(kneeFrontRight, 50);\n'+
'    BOT.move(kneeRearLeft, 50);\n'+
'    BOT.animate(speedms/2);\n'+
'    BOT.move(hipFrontRight, 80);\n'+
'    BOT.move(hipRearLeft, 10);\n'+
'    BOT.animate(speedms);\n'+
'    BOT.move(kneeFrontRight, 20);\n'+
'    BOT.move(kneeRearLeft, 20);\n'+
'    BOT.animate(speedms/2);\n'+
'    \n'+
'    BOT.move(kneeMiddleRight, 50);\n'+
'    BOT.move(kneeMiddleLeft, 50);\n'+
'    BOT.animate(speedms/2);\n'+
'  \n'+
'    BOT.move(hipFrontLeft, 75);\n'+
'    BOT.move(hipFrontRight, 15);\n'+
'    BOT.move(hipRearLeft, 75);\n'+
'    BOT.move(hipRearRight, 15);\n'+
'    BOT.animate(speedms); \n'+
'    \n'+
'    BOT.move(kneeMiddleRight, 20);\n'+
'    BOT.move(kneeMiddleLeft, 20);\n'+
'    BOT.animate(speedms/2);\n'+
'    \n'+
'    BOT.move(kneeFrontLeft, 50);\n'+
'    BOT.move(kneeRearRight, 50);\n'+
'    BOT.animate(speedms/2);\n'+
'    BOT.move(hipFrontLeft, 45);\n'+
'    BOT.move(hipRearRight, 45);\n'+
'    BOT.animate(speedms);\n'+
'    BOT.move(kneeFrontLeft, 20);\n'+
'    BOT.move(kneeRearRight, 20);\n'+
'    BOT.animate(speedms/2);\n'+
'    \n'+
'    BOT.move(kneeFrontRight, 50);\n'+
'    BOT.move(kneeRearLeft, 50);\n'+
'    BOT.animate(speedms/2);\n'+
'    BOT.move(hipFrontRight, 45);\n'+
'    BOT.move(hipRearLeft, 45);\n'+
'    BOT.animate(speedms);\n'+
'    BOT.move(kneeFrontRight, 20);\n'+
'    BOT.move(kneeRearLeft, 20);\n'+
'    BOT.animate(speedms/2);\n'+
'    }\n'+
'  }',
  lookright: 'void lookright(int speedms){\n'+
'    BOT.move(hipRearRight, 80);\n'+
'    BOT.move(hipRearLeft, 10);\n'+
'    BOT.move(hipFrontRight, 10);\n'+
'    BOT.move(hipFrontLeft, 80);\n'+
'    BOT.move(hipMiddleRight, 65);\n'+
'    BOT.move(hipMiddleLeft, 125);    \n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    delay(speedms/2);\n'+
'    \n'+
'    BOT.move(hipRearRight, 45);\n'+
'    BOT.move(hipRearLeft, 45);\n'+
'    BOT.move(hipFrontRight, 45);\n'+
'    BOT.move(hipFrontLeft, 45);\n'+
'    BOT.move(hipMiddleRight, 90);\n'+
'    BOT.move(hipMiddleLeft, 90);\n'+
'    BOT.animate(speedms);\n'+
'}',
  lookleft: 'void lookleft(int speedms){\n'+
'    BOT.move(hipRearLeft, 80);\n'+
'    BOT.move(hipRearRight, 10);\n'+
'    BOT.move(hipFrontLeft, 10);\n'+
'    BOT.move(hipFrontRight, 80);\n'+
'    BOT.move(hipMiddleRight, 125);\n'+
'    BOT.move(hipMiddleLeft, 65);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    delay(speedms/2);\n'+
'    \n'+
'    BOT.move(hipRearRight, 45);\n'+
'    BOT.move(hipRearLeft, 45);\n'+
'    BOT.move(hipFrontRight, 45);\n'+
'    BOT.move(hipFrontLeft, 45);\n'+
'    BOT.move(hipMiddleRight, 90);\n'+
'    BOT.move(hipMiddleLeft, 90);\n'+
'    BOT.animate(speedms);\n'+
'}',
  leanright: 'void leanright(int speedms){\n'+
'  \n'+
'    BOT.move(kneeRearRight, 10);\n'+
'    BOT.move(kneeFrontRight, 10);\n'+
'    BOT.move(kneeMiddleRight, 0);\n'+
'    BOT.move(kneeRearLeft, 90);\n'+
'    BOT.move(kneeFrontLeft, 90);\n'+
'    BOT.move(kneeMiddleLeft, 90);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    delay(speedms/2);\n'+
'    \n'+
'    BOT.move(kneeRearRight, 20);\n'+
'    BOT.move(kneeFrontRight, 20);\n'+
'    BOT.move(kneeMiddleRight, 20);\n'+
'    BOT.move(kneeRearLeft, 20);\n'+
'    BOT.move(kneeFrontLeft, 20);\n'+
'    BOT.move(kneeMiddleLeft, 20);\n'+
'    \n'+
'    BOT.animate(speedms);\n'+
'}',
  leanleft: 'void leanleft(int speedms){\n'+
'  \n'+
'    BOT.move(kneeRearRight, 90);\n'+
'    BOT.move(kneeFrontRight, 90);\n'+
'    BOT.move(kneeMiddleRight, 90);\n'+
'    BOT.move(kneeRearLeft, 10);\n'+
'    BOT.move(kneeFrontLeft, 10);\n'+
'    BOT.move(kneeMiddleLeft, 0);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    delay(speedms/2);\n'+
'    \n'+
'    BOT.move(kneeRearRight, 20);\n'+
'    BOT.move(kneeFrontRight, 20);\n'+
'    BOT.move(kneeMiddleRight, 20);\n'+
'    BOT.move(kneeRearLeft, 20);\n'+
'    BOT.move(kneeFrontLeft, 20);\n'+
'    BOT.move(kneeMiddleLeft, 20);\n'+
'    \n'+
'    BOT.animate(speedms);\n'+
'}',
  leanforward: 'void leanforward(int speedms){\n'+
'  \n'+
'    BOT.move(kneeFrontLeft, 90);\n'+
'    BOT.move(kneeFrontRight, 90);\n'+
'    BOT.move(kneeMiddleRight, 50);\n'+
'    BOT.move(kneeMiddleLeft, 50);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    delay(speedms/2);\n'+
'    \n'+
'    BOT.move(kneeFrontLeft, 20);\n'+
'    BOT.move(kneeFrontRight, 20);\n'+
'    BOT.move(kneeMiddleRight, 20);\n'+
'    BOT.move(kneeMiddleLeft, 20);\n'+
'    \n'+
'    BOT.animate(speedms);\n'+
'}',
  leanbackward: 'void leanbackward(int speedms){\n'+
'  \n'+
'    BOT.move(kneeRearLeft, 90);\n'+
'    BOT.move(kneeRearRight, 90);\n'+
'    BOT.move(kneeMiddleRight, 50);\n'+
'    BOT.move(kneeMiddleLeft, 50);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    delay(speedms/2);\n'+
'    \n'+
'    BOT.move(kneeRearLeft, 20);\n'+
'    BOT.move(kneeRearRight, 20);\n'+
'    BOT.move(kneeMiddleRight, 20);\n'+
'    BOT.move(kneeMiddleLeft, 20);\n'+
'    \n'+
'    BOT.animate(speedms);\n'+
'}',
  turnleft: 'void turnleft(int steps, int speedms){\n'+
'\n'+
'  for (int i = 0; i < steps; i++){\n'+
'\n'+
'    BOT.move(kneeFrontLeft, 50);\n'+
'    BOT.move(kneeRearLeft, 50);\n'+
'    BOT.move(kneeMiddleRight, 50); \n'+   
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(hipFrontLeft, 80);\n'+
'    BOT.move(hipRearLeft, 5);\n'+
'    BOT.move(hipMiddleRight, 65);\n'+    
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(kneeFrontLeft, 20);\n'+
'    BOT.move(kneeRearLeft, 20);\n'+
'    BOT.move(kneeMiddleRight, 20); \n'+   
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(kneeFrontRight, 50);\n'+
'    BOT.move(kneeRearRight, 50);\n'+
'    BOT.move(kneeMiddleLeft, 50);   \n'+ 
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(hipFrontRight, 5);\n'+
'    BOT.move(hipRearRight, 80);\n'+
'    BOT.move(hipMiddleLeft, 115);  \n'+ 
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(kneeFrontRight, 20);\n'+
'    BOT.move(kneeRearRight, 20);\n'+
'    BOT.move(kneeMiddleLeft, 20);   \n'+ 
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(hipFrontLeft, 45);\n'+
'    BOT.move(hipRearLeft, 45);\n'+
'    BOT.move(hipMiddleRight, 90);\n'+
'    BOT.move(hipFrontRight, 45);\n'+
'    BOT.move(hipRearRight, 45);\n'+
'    BOT.move(hipMiddleLeft, 90);   \n'+ 
'    BOT.animate(speedms);\n'+
'  }\n'+
'}',
  turnright: 'void turnright(int steps, int speedms){\n'+
'\n'+
'  for (int i = 0; i < steps; i++){\n'+
'\n'+
'    BOT.move(kneeFrontLeft, 50);\n'+
'    BOT.move(kneeRearLeft, 50);\n'+
'    BOT.move(kneeMiddleRight, 50); \n'+   
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(hipFrontLeft, 5);\n'+
'    BOT.move(hipRearLeft, 80);\n'+
'    BOT.move(hipMiddleRight, 115);\n'+    
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(kneeFrontLeft, 20);\n'+
'    BOT.move(kneeRearLeft, 20);\n'+
'    BOT.move(kneeMiddleRight, 20); \n'+   
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(kneeFrontRight, 50);\n'+
'    BOT.move(kneeRearRight, 50);\n'+
'    BOT.move(kneeMiddleLeft, 50);   \n'+ 
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(hipFrontRight, 80);\n'+
'    BOT.move(hipRearRight, 5);\n'+
'    BOT.move(hipMiddleLeft, 65);  \n'+  
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(kneeFrontRight, 20);\n'+
'    BOT.move(kneeRearRight, 20);\n'+
'    BOT.move(kneeMiddleLeft, 20);   \n'+ 
'    BOT.animate(speedms);\n'+
'\n'+
'    BOT.move(hipFrontLeft, 45);\n'+
'    BOT.move(hipRearLeft, 45);\n'+
'    BOT.move(hipMiddleRight, 90);\n'+
'    BOT.move(hipFrontRight, 45);\n'+
'    BOT.move(hipRearRight, 45);\n'+
'    BOT.move(hipMiddleLeft, 90);   \n'+ 
'    BOT.animate(speedms);\n'+
'  }\n'+
'}',
  scared: 'void scared(int shakes, int beeps){\n'+
'  \n'+
'    BOT.move(kneeFrontRight, 0);\n'+
'    BOT.move(kneeMiddleRight, 0);\n'+
'    BOT.move(kneeRearRight, 0);\n'+
'    BOT.move(kneeFrontLeft, 0);\n'+
'    BOT.move(kneeMiddleLeft, 0);\n'+
'    BOT.move(kneeRearLeft, 0); \n'+
'    BOT.animate(50);\n'+
'    \n'+
'    for (int i = 0; i < shakes; i++){\n'+
' \n'+
'      BOT.move(hipRearRight, 80);\n'+
'      BOT.move(hipMiddleRight, 65);\n'+
'      BOT.move(hipRearLeft, 5);\n'+
'      BOT.move(hipFrontRight, 5);\n'+
'      BOT.move(hipMiddleLeft, 115);\n'+
'      BOT.move(hipFrontLeft, 80);\n'+
'      BOT.animate(100);\n'+
'      \n'+
'      BOT.move(hipRearLeft, 80);\n'+
'      BOT.move(hipMiddleRight, 115);\n'+
'      BOT.move(hipRearRight, 5);\n'+
'      BOT.move(hipFrontLeft, 5);\n'+
'      BOT.move(hipMiddleLeft, 65);\n'+
'      BOT.move(hipFrontRight, 80);\n'+
'      BOT.animate(50);\n'+
'    }\n'+
'    \n'+
'    BOT.move(hipRearRight, 45);\n'+
'    BOT.move(hipMiddleRight, 90);\n'+
'    BOT.move(hipRearLeft, 45);\n'+
'    BOT.move(hipFrontRight, 45);\n'+
'    BOT.move(hipMiddleLeft, 90);\n'+
'    BOT.move(hipFrontLeft, 45);\n'+
'    BOT.animate(200);\n'+
'    \n'+
'    chirp(beeps, 0);\n'+
'    \n'+
'    BOT.move(kneeFrontRight, 20);\n'+
'    BOT.move(kneeMiddleRight, 20);\n'+
'    BOT.move(kneeRearRight, 20);\n'+
'    BOT.move(kneeFrontLeft, 20);\n'+
'    BOT.move(kneeMiddleLeft, 20);\n'+
'    BOT.move(kneeRearLeft, 20); \n'+
'    BOT.animate(75);\n'+
'}'
}

//  VR618    *******************************************************
allbotfunctions.VR618 = {
  chirp: 'void chirp(int beeps, int speedms){\n'+
'\n'+
'  for (int i = 0; i < beeps; i++){\n'+
'    for (int i = 0; i < 255; i++){\n'+
'      digitalWrite(sounderPin, HIGH);\n'+
'      delayMicroseconds((355-i)+ (speedms*2));\n'+
'      digitalWrite(sounderPin, LOW);\n'+
'      delayMicroseconds((355-i)+ (speedms*2));\n'+
'    }\n'+
'     delay(30);\n'+
'  }\n'+
'}',
  standup: 'void standup ()\n'+
'{\n'+
'  BOT.move(kneeFrontRight, 100);\n'+
'  BOT.move(kneeFrontLeft, 100);\n'+
'  BOT.move(kneeMiddleRight, 100);\n'+
'  BOT.move(kneeMiddleLeft, 100);\n'+
'  BOT.move(kneeRearRight, 100);\n'+
'  BOT.move(kneeRearLeft, 100);\n'+
'  BOT.animate(200);\n'+
'}',
  walkbackward: 'void walkbackward(int steps, int speedms)\n'+
'{\n'+
'  BOT.move(kneeFrontRight, 130);    //Lift 3a\n'+
'  BOT.move(kneeRearRight, 130);\n'+
'  BOT.move(kneeMiddleLeft, 130);\n'+
'  BOT.animate(speedms);\n'+
'  \n'+
'  BOT.move(hipFrontRight, 70);    //Swivel 3a backward\n'+
'  BOT.move(hipRearRight, 20);\n'+
'  BOT.move(hipMiddleLeft, 115);\n'+
'  BOT.animate(speedms);\n'+
'  \n'+
'  for (int i = 0; i < steps; i++){\n'+
'  \n'+
'  BOT.move(kneeFrontRight, 70);  //Drop 3a + small ankle movement\n'+
'  BOT.move(kneeRearRight, 70);\n'+
'  BOT.move(kneeMiddleLeft, 70);\n'+
 ' BOT.move(ankleFrontRight, 20);\n'+
'  BOT.move(ankleRearRight, 20);\n'+
'  BOT.move(ankleMiddleLeft, 20);\n'+
'  BOT.animate(speedms);\n'+
'  \n'+
'  BOT.move(hipFrontRight, 45);    //Swivel 3a back to center\n'+
'  BOT.move(hipRearRight, 45);\n'+
'  BOT.move(hipMiddleLeft, 90);\n'+
'  //\n'+
'  BOT.move(kneeFrontLeft, 130);    //Lift 3b\n'+
'  BOT.move(kneeRearLeft, 130);\n'+
'  BOT.move(kneeMiddleRight, 130);\n'+
'  BOT.animate(speedms);\n'+
'  \n'+
'  BOT.move(kneeFrontRight, 100);    //Normalize 3a\n'+
'  BOT.move(kneeRearRight, 100);\n'+
'  BOT.move(kneeMiddleLeft, 100);\n'+
'  BOT.move(ankleFrontRight, 0);\n'+
'  BOT.move(ankleRearRight, 0);\n'+
'  BOT.move(ankleMiddleLeft, 0);\n'+
'  //\n'+
'  BOT.move(hipFrontLeft, 70);    //Swivel 3b backward\n'+
'  BOT.move(hipRearLeft, 20);\n'+
'  BOT.move(hipMiddleRight, 115);\n'+
'  BOT.animate(speedms);\n'+
'  \n'+
'  BOT.move(kneeFrontLeft, 70);      //Drop 3b + small ankle movement\n'+
'  BOT.move(kneeRearLeft, 70);\n'+
'  BOT.move(kneeMiddleRight, 70);\n'+
'  BOT.move(ankleFrontLeft, 20);\n'+
'  BOT.move(ankleRearLeft, 20);\n'+
'  BOT.move(ankleMiddleRight, 20);\n'+
'  BOT.animate(speedms);\n'+
'  \n'+
'  BOT.move(hipFrontLeft, 45);    //Swivel 3b back to center\n'+
'  BOT.move(hipRearLeft, 45);\n'+
'  BOT.move(hipMiddleRight, 90);\n'+
'  //\n'+
'  BOT.move(kneeFrontRight, 130);    //Lift 3a\n'+
'  BOT.move(kneeRearRight, 130);\n'+
'  BOT.move(kneeMiddleLeft, 130);\n'+
'  BOT.animate(speedms);\n'+
'  \n'+
'  BOT.move(kneeFrontLeft, 100);    //Normalize 3b\n'+
'  BOT.move(kneeRearLeft, 100);\n'+
'  BOT.move(kneeMiddleRight, 100);\n'+
'  BOT.move(ankleFrontLeft, 0);\n'+
'  BOT.move(ankleRearLeft, 0);\n'+
'  BOT.move(ankleMiddleRight, 0);\n'+
'  //\n'+
'  BOT.move(hipFrontRight, 70);    //Swivel 3a backward\n'+
'  BOT.move(hipRearRight, 20);\n'+
'  BOT.move(hipMiddleLeft, 115);\n'+
'  BOT.animate(speedms);\n'+
'  \n'+
'  }\n'+
'  \n'+
'  BOT.move(kneeFrontRight, 70);  //Drop 3a + small ankle movement\n'+
'  BOT.move(kneeRearRight, 70);\n'+
'  BOT.move(kneeMiddleLeft, 70);\n'+
'  BOT.move(ankleFrontRight, 20);\n'+
'  BOT.move(ankleRearRight, 20);\n'+
'  BOT.move(ankleMiddleLeft, 20);\n'+
'  BOT.animate(speedms);\n'+
'  \n'+
'  BOT.move(hipFrontRight, 45);    //Swivel 3a back to center\n'+
'  BOT.move(hipRearRight, 45);\n'+
'  BOT.move(hipMiddleLeft, 90);\n'+
'  BOT.animate(speedms);\n'+
'  \n'+
'  BOT.move(kneeFrontRight, 100);    //Normalize 3a\n'+
'  BOT.move(kneeRearRight, 100);\n'+
'  BOT.move(kneeMiddleLeft, 100);\n'+
'  BOT.move(ankleFrontRight, 0);\n'+
'  BOT.move(ankleRearRight, 0);\n'+
'  BOT.move(ankleMiddleLeft, 0);\n'+
'  BOT.animate(speedms);\n'+
'}',
  walkforward: 'void walkforward(int steps, int speedms)\n'+
'{\n'+
'  BOT.move(kneeFrontRight, 130);    //Lift 3a\n'+
'  BOT.move(kneeRearRight, 130);\n'+
'  BOT.move(kneeMiddleLeft, 130);\n'+
'  BOT.animate(speedms);\n'+
'  \n'+
'  BOT.move(hipFrontRight, 20);    //Swivel 3a forward\n'+
'  BOT.move(hipRearRight, 70);\n'+
'  BOT.move(hipMiddleLeft, 65);\n'+
'  BOT.animate(speedms);\n'+
'  \n'+
'  for (int i = 0; i < steps; i++){\n'+
'  \n'+
'  BOT.move(kneeFrontRight, 70);  //Drop 3a + small ankle movement\n'+
'  BOT.move(kneeRearRight, 70);\n'+
'  BOT.move(kneeMiddleLeft, 70);\n'+
'  BOT.move(ankleFrontRight, 20);\n'+
'  BOT.move(ankleRearRight, 20);\n'+
'  BOT.move(ankleMiddleLeft, 20);\n'+
'  BOT.animate(speedms);\n'+
'  \n'+
'  BOT.move(hipFrontRight, 45);    //Swivel 3a back to center\n'+
'  BOT.move(hipRearRight, 45);\n'+
'  BOT.move(hipMiddleLeft, 90);\n'+
'  //\n'+
'  BOT.move(kneeFrontLeft, 130);    //Lift 3b\n'+
'  BOT.move(kneeRearLeft, 130);\n'+
'  BOT.move(kneeMiddleRight, 130);\n'+
'  BOT.animate(speedms);\n'+
'  \n'+
'  BOT.move(kneeFrontRight, 100);    //Normalize 3a\n'+
'  BOT.move(kneeRearRight, 100);\n'+
'  BOT.move(kneeMiddleLeft, 100);\n'+
'  BOT.move(ankleFrontRight, 0);\n'+
'  BOT.move(ankleRearRight, 0);\n'+
'  BOT.move(ankleMiddleLeft, 0);\n'+
'  //\n'+
'  BOT.move(hipFrontLeft, 20);    //Swivel 3b forward\n'+
'  BOT.move(hipRearLeft, 70);\n'+
'  BOT.move(hipMiddleRight, 65);\n'+
'  BOT.animate(speedms);\n'+
'  \n'+
'  BOT.move(kneeFrontLeft, 70);      //Drop 3b + small ankle movement\n'+
'  BOT.move(kneeRearLeft, 70);\n'+
'  BOT.move(kneeMiddleRight, 70);\n'+
'  BOT.move(ankleFrontLeft, 20);\n'+
'  BOT.move(ankleRearLeft, 20);\n'+
'  BOT.move(ankleMiddleRight, 20);\n'+
'  BOT.animate(speedms);\n'+
'  \n'+
'  BOT.move(hipFrontLeft, 45);    //Swivel 3b back to center\n'+
'  BOT.move(hipRearLeft, 45);\n'+
'  BOT.move(hipMiddleRight, 90);\n'+
'  //\n'+
'  BOT.move(kneeFrontRight, 130);    //Lift 3a\n'+
'  BOT.move(kneeRearRight, 130);\n'+
'  BOT.move(kneeMiddleLeft, 130);\n'+
'  BOT.animate(speedms);\n'+
'  \n'+
'  BOT.move(kneeFrontLeft, 100);    //Normalize 3b\n'+
'  BOT.move(kneeRearLeft, 100);\n'+
'  BOT.move(kneeMiddleRight, 100);\n'+
'  BOT.move(ankleFrontLeft, 0);\n'+
'  BOT.move(ankleRearLeft, 0);\n'+
'  BOT.move(ankleMiddleRight, 0);\n'+
'  //\n'+
'  BOT.move(hipFrontRight, 20);    //Swivel 3a forward\n'+
'  BOT.move(hipRearRight, 70);\n'+
'  BOT.move(hipMiddleLeft, 65);\n'+
'  BOT.animate(speedms);\n'+
'  \n'+
'  }\n'+
'  \n'+
'  BOT.move(kneeFrontRight, 70);  //Drop 3a + small ankle movement\n'+
'  BOT.move(kneeRearRight, 70);\n'+
'  BOT.move(kneeMiddleLeft, 70);\n'+
'  BOT.move(ankleFrontRight, 20);\n'+
'  BOT.move(ankleRearRight, 20);\n'+
'  BOT.move(ankleMiddleLeft, 20);\n'+
'  BOT.animate(speedms);\n'+
'  \n'+
'  BOT.move(hipFrontRight, 45);    //Swivel 3a back to center\n'+
'  BOT.move(hipRearRight, 45);\n'+
'  BOT.move(hipMiddleLeft, 90);\n'+
'  BOT.animate(speedms);\n'+
'  \n'+
'  BOT.move(kneeFrontRight, 100);    //Normalize 3a\n'+
'  BOT.move(kneeRearRight, 100);\n'+
'  BOT.move(kneeMiddleLeft, 100);\n'+
'  BOT.move(ankleFrontRight, 0);\n'+
'  BOT.move(ankleRearRight, 0);\n'+
'  BOT.move(ankleMiddleLeft, 0);\n'+
'  BOT.animate(speedms);\n'+
'}',
  walkleft: 'void walkleft(int steps, int speedms){\n'+
'  // TODO - No sequence implemented\n'+
'  }',
  walkright: 'void walkright(int steps, int speedms){\n'+
'  // TODO - No sequence implemented\n'+
'  }',
  lookright: 'void lookright(int speedms){\n'+
'    // TODO - No sequence implemented\n'+
'}',
  lookleft: 'void lookleft(int speedms){\n'+
'    // TODO - No sequence implemented\n'+
'}',
  leanright: 'void leanright (int speedms)\n'+
'{\n'+
'  BOT.move(kneeFrontRight, 50);\n'+
'  BOT.move(kneeMiddleRight, 50);\n'+
'  BOT.move(kneeRearRight, 50);\n'+
'  BOT.move(ankleFrontRight, 50);\n'+
'  BOT.move(ankleMiddleRight, 50);\n'+
'  BOT.move(ankleRearRight, 50);\n'+
'  //\n'+
'  BOT.move(kneeFrontLeft, 150);\n'+
'  BOT.move(kneeMiddleLeft, 150);\n'+
'  BOT.move(kneeRearLeft, 150);\n'+
'  BOT.move(ankleFrontLeft, 0);\n'+
'  BOT.move(ankleMiddleLeft, 0);\n'+
'  BOT.move(ankleRearLeft, 0);\n'+
'  BOT.animate(speedms);\n'+
'  //\n'+
'  BOT.move(kneeFrontRight, 100);\n'+
'  BOT.move(kneeMiddleRight, 100);\n'+
'  BOT.move(kneeRearRight, 100);\n'+
'  BOT.move(ankleFrontRight, 0);\n'+
'  BOT.move(ankleMiddleRight, 0);\n'+
'  BOT.move(ankleRearRight, 0);\n'+
'  //\n'+
'  BOT.move(kneeFrontLeft, 100);\n'+
'  BOT.move(kneeMiddleLeft, 100);\n'+
'  BOT.move(kneeRearLeft, 100);\n'+
'  BOT.move(ankleFrontLeft, 0);\n'+
'  BOT.move(ankleMiddleLeft, 0);\n'+
'  BOT.move(ankleRearLeft, 0);\n'+
'  BOT.animate(speedms);\n'+
'}',
  leanleft: 'void leanleft (int speedms)\n'+
'{\n'+
'  BOT.move(kneeFrontLeft, 50);\n'+
'  BOT.move(kneeMiddleLeft, 50);\n'+
'  BOT.move(kneeRearLeft, 50);\n'+
'  BOT.move(ankleFrontLeft, 50);\n'+
'  BOT.move(ankleMiddleLeft, 50);\n'+
'  BOT.move(ankleRearLeft, 50);\n'+
'  //\n'+
'  BOT.move(kneeFrontRight, 150);\n'+
'  BOT.move(kneeMiddleRight, 150);\n'+
'  BOT.move(kneeRearRight, 150);\n'+
'  BOT.move(ankleFrontRight, 0);\n'+
'  BOT.move(ankleMiddleRight, 0);\n'+
'  BOT.move(ankleRearRight, 0);\n'+
'  BOT.animate(speedms);\n'+
'  //\n'+
'  BOT.move(kneeFrontLeft, 100);\n'+
'  BOT.move(kneeMiddleLeft, 100);\n'+
'  BOT.move(kneeRearLeft, 100);\n'+
'  BOT.move(ankleFrontLeft, 0);\n'+
'  BOT.move(ankleMiddleLeft, 0);\n'+
'  BOT.move(ankleRearLeft, 0);\n'+
'  //\n'+
'  BOT.move(kneeFrontRight, 100);\n'+
'  BOT.move(kneeMiddleRight, 100);\n'+
'  BOT.move(kneeRearRight, 100);\n'+
'  BOT.move(ankleFrontRight, 0);\n'+
'  BOT.move(ankleMiddleRight, 0);\n'+
'  BOT.move(ankleRearRight, 0);\n'+
'  BOT.animate(speedms);\n'+
'}',
  leanforward: 'void leanforward(int speedms)\n'+
'{  \n'+
'  BOT.move(kneeRearRight, 50);\n'+
'  BOT.move(kneeRearLeft, 50);\n'+
'  BOT.move(ankleRearRight, 80);\n'+
'  BOT.move(ankleRearLeft, 80);\n'+
'  //\n'+
'  BOT.move(kneeFrontRight, 135);\n'+
'  BOT.move(kneeFrontLeft, 135);\n'+
'  BOT.move(ankleFrontRight, 0);\n'+
'  BOT.move(ankleFrontLeft, 0);\n'+
'  //\n'+
'  BOT.move(kneeMiddleRight, 110);\n'+
'  BOT.move(kneeMiddleLeft, 110);\n'+
'  BOT.animate(speedms);\n'+
'  \n'+
'  BOT.move(kneeFrontRight, 100);\n'+
'  BOT.move(kneeFrontLeft, 100);\n'+
'  BOT.move(ankleFrontRight, 0);\n'+
'  BOT.move(ankleFrontLeft, 0);\n'+
'  //\n'+
'  BOT.move(kneeRearRight, 100);\n'+
'  BOT.move(kneeRearLeft, 100);\n'+
'  BOT.move(ankleRearRight, 0);\n'+
'  BOT.move(ankleRearLeft, 0);\n'+
'  //\n'+
'  BOT.move(kneeMiddleRight, 100);\n'+
'  BOT.move(kneeMiddleLeft, 100);\n'+
'  BOT.animate(speedms);\n'+
'}',
  leanbackward: 'void leanbackward(int speedms)\n'+
'{  \n'+
'  BOT.move(kneeFrontRight, 50);\n'+
'  BOT.move(kneeFrontLeft, 50);\n'+
'  BOT.move(ankleFrontRight, 80);\n'+
'  BOT.move(ankleFrontLeft, 80);\n'+
'  //\n'+
'  BOT.move(kneeRearRight, 135);\n'+
'  BOT.move(kneeRearLeft, 135);\n'+
'  BOT.move(ankleRearRight, 0);\n'+
'  BOT.move(ankleRearLeft, 0);\n'+
'  //\n'+
'  BOT.move(kneeMiddleRight, 110);\n'+
'  BOT.move(kneeMiddleLeft, 110);\n'+
'  BOT.animate(speedms);\n'+
'  \n'+
'  BOT.move(kneeFrontRight, 100);\n'+
'  BOT.move(kneeFrontLeft, 100);\n'+
'  BOT.move(ankleFrontRight, 0);\n'+
'  BOT.move(ankleFrontLeft, 0);\n'+
'  //\n'+
'  BOT.move(kneeRearRight, 100);\n'+
'  BOT.move(kneeRearLeft, 100);\n'+
'  BOT.move(ankleRearRight, 0);\n'+
'  BOT.move(ankleRearLeft, 0);\n'+
'  //\n'+
'  BOT.move(kneeMiddleRight, 100);\n'+
'  BOT.move(kneeMiddleLeft, 100);\n'+
'  BOT.animate(speedms);\n'+
'}',
  turnleft: 'void turnleft (int steps, int speedms)\n'+
'{\n'+
'  for (int i = 0; i < steps; i++){\n'+
'    BOT.move(kneeFrontRight, 130);    //Lift 3a\n'+
'    BOT.move(kneeRearRight, 130);\n'+
'    BOT.move(kneeMiddleLeft, 130);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    BOT.move(hipFrontRight, 20);    //turn 3a left\n'+
'    BOT.move(hipRearRight, 70);\n'+
'    BOT.move(hipMiddleLeft, 115);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    BOT.move(kneeFrontRight, 100);  //Drop 3a\n'+
'    BOT.move(kneeRearRight, 100);\n'+
'    BOT.move(kneeMiddleLeft, 100);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    BOT.move(kneeFrontLeft, 130);    //Lift 3b\n'+
'    BOT.move(kneeRearLeft, 130);\n'+
'    BOT.move(kneeMiddleRight, 130);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    BOT.move(hipFrontLeft, 70);    //turn 3b left\n'+
'    BOT.move(hipRearLeft, 20);\n'+
'    BOT.move(hipMiddleRight, 65);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    BOT.move(kneeFrontLeft, 100);      //Drop 3b + small ankle movement\n'+
'    BOT.move(kneeRearLeft, 100);\n'+
'    BOT.move(kneeMiddleRight, 100);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    BOT.move(hipFrontRight, 45);    //Swivel 3a&b back to center\n'+
'    BOT.move(hipRearRight, 45);\n'+
'    BOT.move(hipMiddleLeft, 90);\n'+
'    BOT.move(hipFrontLeft, 45);    //turn 3b right\n'+
'    BOT.move(hipRearLeft, 45);\n'+
'    BOT.move(hipMiddleRight, 90);\n'+
'    BOT.animate(speedms);\n'+
'  }\n'+
'}',
  turnright: 'void turnright (int steps, int speedms)\n'+
'{\n'+
'  for (int i = 0; i < steps; i++){\n'+
'    BOT.move(kneeFrontRight, 130);    //Lift 3a\n'+
'    BOT.move(kneeRearRight, 130);\n'+
'    BOT.move(kneeMiddleLeft, 130);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    BOT.move(hipFrontRight, 70);    //turn 3a right\n'+
'    BOT.move(hipRearRight, 20);\n'+
'    BOT.move(hipMiddleLeft, 65);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    BOT.move(kneeFrontRight, 100);  //Drop 3a\n'+
'    BOT.move(kneeRearRight, 100);\n'+
'    BOT.move(kneeMiddleLeft, 100);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    BOT.move(kneeFrontLeft, 130);    //Lift 3b\n'+
'    BOT.move(kneeRearLeft, 130);\n'+
'    BOT.move(kneeMiddleRight, 130);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    BOT.move(hipFrontLeft, 20);    //turn 3b right\n'+
'    BOT.move(hipRearLeft, 70);\n'+
'    BOT.move(hipMiddleRight, 115);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    BOT.move(kneeFrontLeft, 100);      //Drop 3b + small ankle movement\n'+
'    BOT.move(kneeRearLeft, 100);\n'+
'    BOT.move(kneeMiddleRight, 100);\n'+
'    BOT.animate(speedms);\n'+
'    \n'+
'    BOT.move(hipFrontRight, 45);    //Swivel 3a&b back to center\n'+
'    BOT.move(hipRearRight, 45);\n'+
'    BOT.move(hipMiddleLeft, 90);\n'+
'    BOT.move(hipFrontLeft, 45);    //turn 3b right\n'+
'    BOT.move(hipRearLeft, 45);\n'+
'    BOT.move(hipMiddleRight, 90);\n'+
'    BOT.animate(speedms);\n'+
'  }\n'+
'}',
  scared: 'void scared(int shakes, int beeps){\n'+
'   // TODO - No sequence implemented\n'+
'}'
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
    
    Blockly.Arduino.addFunction('ALLBOTresetserial', 
'void ALLBOTresetserial (void)      // This clears any received IR commands that where received in the serial buffer while the robot was execution a command.\n'+
'{\n'+
'  //resetting all variables\n'+
'  ALLBOTrawcommand = "";\n'+
'  ALLBOTcommand = "";\n'+
'  ALLBOTtimes = 0;\n'+
'  ALLBOTspeedms = 0;\n'+
'  \n'+
'  //flushing the serial buffer (64 byte) so there are no stored movements that need to be handled (annoying)...\n'+
'  while (Serial.available()) {\n'+
'    Serial.read();\n'+
'  }\n'+
'}')
  } else {
    Blockly.Arduino.addVariable('ALLBOTreceivelog', 'boolean ALLBOTreceivelog = false; // Set this to true if you  want to see the serial messages for debugging the IR commands', true);
  }
  
  Blockly.Arduino.addVariable('ALLBOTrawcommand', 'String ALLBOTrawcommand;  // Global variable that stores the raw received IR command', true);
  Blockly.Arduino.addVariable('ALLBOTcommand', 'String ALLBOTcommand;     // Global variable that stores part of the decoded IR command', true);
  Blockly.Arduino.addVariable('ALLBOTtimes',      'int ALLBOTtimes = 1;          // Global variable that stores part the received IR command', true);
  Blockly.Arduino.addVariable('ALLBOTspeedms',      'int ALLBOTspeedms = 100;        // Global variable that stores part the received IR command', true);
  Blockly.Arduino.addVariable('ALLBOT_IRreceive',    'boolean ALLBOT_IRreceive = true; // Set this to false if you do not want to use the IR remote');

  var setupCode_Serial = '  // Starting the hardware UART, necessary for receiving IR\n';
  setupCode_Serial += '  if (ALLBOT_IRreceive == true) {   // Check if required (when Serial is started servo1 connector will not work!)\n';
  setupCode_Serial += '      Serial.begin(2400);\n';
  setupCode_Serial += '      Serial.setTimeout(100);\n';
  setupCode_Serial += '      Serial.println("serial communication started");\n';
  setupCode_Serial += '    }\n';

  Blockly.Arduino.addSetup('allbot_RC', setupCode_Serial, true);
  
  Blockly.Arduino.addFunction('ALLBOT_getcommand', 
'void ALLBOT_getcommand (void)                   // This is the routine that listens and decodes any IR commands. Decodes commands end up in the global vars.\n'+
'{ \n'+
'  int space1 = 0;\n'+
'  int space2 = 0;\n'+
'  \n'+
'  if (Serial.available()) {\n'+
'     ALLBOTrawcommand = Serial.readString();\n'+
'     if (ALLBOTreceivelog){\n'+
'        Serial.println("START " + ALLBOTrawcommand + " END" + "\\r\\n" + "Received string length = " + ALLBOTrawcommand.length() + "\\r\\n" + "End character > at index = " + ALLBOTrawcommand.indexOf(\'>\'));\n'+
'     }\n'+
'\n'+
'     //checking and deleting rubbish data at start of received command\n'+
"     if ((ALLBOTrawcommand.indexOf('<') != 0) && (ALLBOTrawcommand.indexOf('<') != -1))\n"+
'     {\n'+
'        //ALLBOTrawcommand.remove(0, ALLBOTrawcommand.indexOf('<'));\n'+
'        ALLBOTcommand = ALLBOTrawcommand.substring(ALLBOTrawcommand.indexOf('<'));//,ALLBOTrawcommand.length()-1);\n'+
'     }\n'+
'\n'+     
'     //check if received command is correct\n'+
"     if ((ALLBOTrawcommand.charAt(0) == '<') && (ALLBOTrawcommand.indexOf('>') <= 12) && (ALLBOTrawcommand.indexOf('>') != -1) && (ALLBOTrawcommand.length() > 7))\n"+
'     {\n'+
'       if (ALLBOTreceivelog){\n'+
'         Serial.println("Command is VALID"); \n'+
'       }\n'+      
'       //breakdown into chunks\n'+
'       //ALLBOTcommand\n'+
'       ALLBOTcommand = ALLBOTrawcommand.substring(1, 3);\n'+
'       \n'+
'       //finding the spaces to find the ALLBOTtimes and ALLBOTspeedms\n'+
'       for (int i=0; i <= ALLBOTrawcommand.length(); i ++)\n'+
'       {\n'+
"         if ((ALLBOTrawcommand.charAt(i) == ' ') && (space1 == 0))\n"+
'         {\n'+
'            space1 = i;\n'+
'         }\n'+
"         else if ((ALLBOTrawcommand.charAt(i) == ' ') && (space2 == 0))\n"+
'         {\n'+
'            space2 = i;\n'+
'         }\n'+
'       }\n'+
'\n'+
'       //Setting the command variables and checking if they are indeed a number (toInt()).\n'+
'       \n'+
'       //ALLBOTtimes\n'+
'       ALLBOTtimes = ALLBOTrawcommand.substring(space1+1, space2).toInt();\n'+
'       \n'+
'       //ALLBOTspeedms\n'+
'       ALLBOTspeedms = ALLBOTrawcommand.substring(space2+1, ALLBOTrawcommand.indexOf('>')).toInt();\n'+
'\n'+
'       if (ALLBOTreceivelog){\n'+
'         Serial.println("decoded commands are:");\n'+
'         Serial.flush();\n'+
'         Serial.println("command = " + ALLBOTcommand);\n'+
'         Serial.flush();\n'+
'         Serial.print("times = ");Serial.println(ALLBOTtimes);\n'+
'         Serial.flush();\n'+
'         Serial.print("speedms = ");Serial.println(ALLBOTspeedms);\n'+
'         Serial.flush();\n'+
'       }\n'+
'       \n'+
'     }\n'+
'     else\n'+
'     {\n'+
'       if (ALLBOTreceivelog){\n'+
'          Serial.println("Command is NOT valid");\n'+
'       }\n'+
'       ALLBOTresetserial();  \n'+
'     }\n'+
'  }\n'+
'}')
  
  var code = '  if (ALLBOT_IRreceive == true) {                 // Allow to switch off the IR part\n';
  code += '    ALLBOT_getcommand();                       // Listen for IR command\n';
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
