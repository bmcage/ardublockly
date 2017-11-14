/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Generating Microduino code for procedure (function) blocks.
 *
 */
'use strict';

goog.provide('Blockly.Arduino.component_diorama');

goog.require('Blockly.Arduino');


/**
 * The default diorama Hub block
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['diorama_hub_component'] = function(block) {
  
  function parseInput(block, name, connectors) {
    var targetBlock = block.getInputTargetBlock(name);
    if (targetBlock) {
      targetBlock.setHubConnector(connectors);
    }
    var code = Blockly.Arduino.blockToCode(targetBlock);
    if (!goog.isString(code)) {
      throw 'Expecting code from statement block "' + targetBlock.type + '".';
    }
    if (code) {
      // blocks should only init data ... 
      console.log('Unexpected code in core_hub_component', code)
    }
    return code;
  }

  //set to which pin a block connects
  for (var i = 1; i <= this.digCount_; i++) {
    var pin = block.getFieldValue('PIND' + i);
    parseInput(block, 'DIG' + i, [pin]);
  }
  for (var i = 1; i <= this.anaCount_; i++) {
    var pin = block.getFieldValue('PINA' + i);
    parseInput(block, 'ANA' + i, [pin]);
  }
  for (var i = 1; i <= this.pwmCount_; i++) {
    var pin = block.getFieldValue('PINP' + i);
    parseInput(block, 'PWM' + i, [pin]);
  }
  for (var i = 1; i <= this.digdigCount_; i++) {
    var pin1 = block.getFieldValue('PINDD1_' + i);
    var pin2 = block.getFieldValue('PINDD2_' + i);
    parseInput(block, 'DIGDIG' + i, [pin1, pin2]);
  }
  
  
  var code = `
void DOIvolLouder() {
  if (DIOvolume >= 10)
  {
    DIOvolume = DIOvolume - 10;
  } else { 
    DIOvolume = 0;
  }
  DIOMP3player.setVolume(DIOvolume, DIOvolume);
}
`
  //generate missing functions
  Blockly.Arduino.addFunction('DIObtn_S1_fun', "void DIObtn_S1_fun() {}");
  Blockly.Arduino.addFunction('DIObtn_S2_fun', "void DIObtn_S2_fun() {}");
  Blockly.Arduino.addFunction('DIObtn_S3_fun', "void DIObtn_S3_fun() {}");
  Blockly.Arduino.addFunction('DIObtn_S4_fun', "void DIObtn_S4_fun() {}");
  Blockly.Arduino.addFunction('DIObtn_S5_fun', "void DIObtn_S5_fun() {}");
  Blockly.Arduino.addFunction('DIObtn_S6_fun', "void DIObtn_S6_fun() {}");
  Blockly.Arduino.addFunction('DIObtn_S7_fun', "void DIObtn_S7_fun() {}");
  var code8 = `void DIObtn_S8_fun() {
  DIOLastBtnPushed = 0;
  DIOBtn1Running = false;
  DIOBtn2Running = false;
  DIOBtn3Running = false;
  DIOBtn4Running = false;
  DIOBtn5Running = false;
  DIOBtn6Running = false;
  DIOBtn7Running = false;
  DIOBtn8Running = false;
  if (DIOMP3player.isPlaying()) {DIOMP3player.stopTrack();}
  DIOmodule.setDisplayToString("stop    ");
}
`
  Blockly.Arduino.addFunction('DIObtn_S8_fun', code8);
  var coderunning = `void DIObtn_stoprunning() {
  if (DIOLastBtnPushed == 1) {DIOBtn1Running = false;}
  else if (DIOLastBtnPushed == 2) {DIOBtn2Running = false;}
  else if (DIOLastBtnPushed == 3) {DIOBtn3Running = false;}
  else if (DIOLastBtnPushed == 4) {DIOBtn4Running = false;}
  else if (DIOLastBtnPushed == 5) {DIOBtn5Running = false;}
  else if (DIOLastBtnPushed == 6) {DIOBtn6Running = false;}
  else if (DIOLastBtnPushed == 7) {DIOBtn7Running = false;}
  else if (DIOLastBtnPushed == 8) {DIOBtn8Running = false;}

  DIOLastBtnPushed = 0;
}
`
  Blockly.Arduino.addFunction('DIObtn_stoprunning', coderunning);
  
  // the allbot board is present! We need servo library, and allbot library 
  Blockly.Arduino.addInclude('tm1638',      '#include <TM1638.h>       // TM1638 bibliotheek');
  Blockly.Arduino.addInclude('spi',         '#include <SPI.h>          // SPI library');
  Blockly.Arduino.addInclude('sdfat',       '#include <SdFat.h>        // SDFat Library');
  Blockly.Arduino.addInclude('sfempshield', '#include <SFEMP3Shield.h> // Mp3 Shield Library');
  var DIO_IN1 = 31;
  var DIO_IN2 = 33;
  var DIO_IN3 = 35;
  var DIO_IN4 = 37;
  var dioramainclude = `
TM1638 DIOmodule(45, 43, 41);   // Sets up TM1638 Diorama module, verbonden met pinnen D2 (DIO), D5 (CLK), en D1 (STB)
uint8_t DIOLastBtnPushed = 0; // 8 buttons, from 1 to 8
bool DIOBtn1Running = false;
bool DIOBtn2Running = false;
bool DIOBtn3Running = false;
bool DIOBtn4Running = false;
bool DIOBtn5Running = false;
bool DIOBtn6Running = false;
bool DIOBtn7Running = false;
bool DIOBtn8Running = false;

// Variables used in base code for the diorama
SdFat sd; // Create object to handle SD functions

SFEMP3Shield DIOMP3player; // Create Mp3 library object
// These variables are used in the MP3 initialization to set up
// some stereo options:
uint8_t DIOvolume = 40; // MP3 Player volume 0=max, 255=lowest (off)
const uint16_t DIOmonoMode = 1;  // Mono setting 0=off, 3=max
int DIOtracknrplaying = 0;

// initSD() initializes the SD card and checks for an error.
void DIOinitSD()
{
  //Initialize the SdCard.
  if (!sd.begin(SD_SEL, SPI_HALF_SPEED))
    sd.initErrorHalt();
  if (!sd.chdir("/"))
    sd.errorHalt("sd.chdir");
}

// DIOinitMP3Player() sets up all of the initialization for the
// MP3 Player Shield. It runs the begin() function, checks
// for errors, applies a patch if found, and sets the volume/
// stero mode.
void DIOinitMP3Player()
{
  uint8_t result = DIOMP3player.begin(); // init the mp3 player shield
  if (result != 0) // check result, see readme for error codes.
  {
    // Error checking can go here!
  }
  DIOMP3player.setVolume(DIOvolume, DIOvolume);
  DIOMP3player.setMonoMode(DIOmonoMode);
}

`
  Blockly.Arduino.addInclude('diorama0', dioramainclude);
  
  var dioramaSetupCode = `

  DIOinitSD();  // Initialize the SD card
  DIOinitMP3Player(); // Initialize the MP3 Shield

  for (int x = 0; x < 5; x++)
  {
    DIOmodule.setDisplayToString("diorama");  // toon tekst
    delay(600);
    DIOmodule.setDisplayToString("ingegno ");  // toon tekst
    delay(600);
  }

  DIOmodule.setDisplayToString("start   ");  // toon tekst
`
  Blockly.Arduino.addSetup('diorama', dioramaSetupCode, true);
  
  var pinType = Blockly.Arduino.PinTypes.STEPPER;
  var stepperName = block.getFieldValue('STEPPER_NAME');
  var stepperSteps = Blockly.Arduino.valueToCode(block, 'STEPPER_STEPS',
      Blockly.Arduino.ORDER_ATOMIC) || '360';
  var stepperSpeed = Blockly.Arduino.valueToCode(block, 'STEPPER_SPEED',
      Blockly.Arduino.ORDER_ATOMIC) || '5';
  
  //stepper is a variable containing the used pins
  Blockly.Arduino.addVariable(stepperName,
      'int ' + stepperName + '[4] = {' + DIO_IN1 + ', ' + DIO_IN3 + ', ' + DIO_IN2 +', ' + DIO_IN4 +'};', true);
  stepperName = 'stepper_' + stepperName
  Blockly.Arduino.reservePin(block, DIO_IN1, pinType, 'Stepper');
  Blockly.Arduino.reservePin(block, DIO_IN2, pinType, 'Stepper');
  Blockly.Arduino.reservePin(block, DIO_IN3, pinType, 'Stepper');
  Blockly.Arduino.reservePin(block, DIO_IN4, pinType, 'Stepper');

  Blockly.Arduino.addInclude('stepper', '#include <Stepper.h>\n#define DIO_IN1  31\n#define DIO_IN2  33\n#define DIO_IN3  35\n#define DIO_IN4  37');

  var globalCode = 'Stepper ' + stepperName + '(' + stepperSteps + ', DIO_IN1, DIO_IN3, DIO_IN2, DIO_IN4);';
  Blockly.Arduino.addDeclaration(stepperName, globalCode);

  var setupCode = stepperName + '.setSpeed(' + stepperSpeed + ');';
  Blockly.Arduino.addSetup(stepperName, setupCode, true);
  
  var dioramacode = `
// DIOmodule.getButtons() geeft het nummer van de ingedrukte drukknoppen.
// S1 = 1, S2 = 2, S3 = 4 .... S8 = 128
// worden drukknoppen S1 en S3 ingedrukt dan is het resultaat = 5
byte DIOdrukknoppen = DIOmodule.getButtons();  // bewaar het nummer van de ingedrukte knoppen in DIOdruknoppen

if (bitRead(DIOdrukknoppen, 0)) {
  DIOLastBtnPushed = 1; DIOBtn1Running = true;
} else if (bitRead(DIOdrukknoppen, 1)) {
  DIOLastBtnPushed = 2; DIOBtn2Running = true;
} else if (bitRead(DIOdrukknoppen, 2)) {
  DIOLastBtnPushed = 3; DIOBtn3Running = true;
} else if (bitRead(DIOdrukknoppen, 3)) {
  DIOLastBtnPushed = 4; DIOBtn4Running = true;
} else if (bitRead(DIOdrukknoppen, 4)) {
  DIOLastBtnPushed = 5; DIOBtn5Running = true;
} else if (bitRead(DIOdrukknoppen, 5)) {
  DIOLastBtnPushed = 6; DIOBtn6Running = true;
} else if (bitRead(DIOdrukknoppen, 6)){
  DIOLastBtnPushed = 7; DIOBtn7Running = true;
} else if (bitRead(DIOdrukknoppen, 7)) {
  DIOLastBtnPushed = 8; DIOBtn8Running = true;
}

DIOmodule.setLEDs(DIOdrukknoppen);  // doe led branden boven de drukknop

// we execute the commands as desired by the last button press
if (DIOLastBtnPushed == 1) {  DIObtn_S1_fun();}
if (DIOLastBtnPushed == 2) {  DIObtn_S2_fun();}
if (DIOLastBtnPushed == 3) {  DIObtn_S3_fun();}
if (DIOLastBtnPushed == 4) {  DIObtn_S4_fun();}
if (DIOLastBtnPushed == 5) {  DIObtn_S5_fun();}
if (DIOLastBtnPushed == 6) {  DIObtn_S6_fun();}
if (DIOLastBtnPushed == 7) {  DIObtn_S7_fun();}
if (DIOLastBtnPushed == 8) {  DIObtn_S8_fun();}
if (DIOBtn1Running && DIOLastBtnPushed != 1) {  DIObtn_S1_fun();}
if (DIOBtn2Running && DIOLastBtnPushed != 2) {  DIObtn_S2_fun();}
if (DIOBtn3Running && DIOLastBtnPushed != 3) {  DIObtn_S3_fun();}
if (DIOBtn4Running && DIOLastBtnPushed != 4) {  DIObtn_S4_fun();}
if (DIOBtn5Running && DIOLastBtnPushed != 5) {  DIObtn_S5_fun();}
if (DIOBtn6Running && DIOLastBtnPushed != 6) {  DIObtn_S6_fun();}
if (DIOBtn7Running && DIOLastBtnPushed != 7) {  DIObtn_S7_fun();}
if (DIOBtn8Running && DIOLastBtnPushed != 8) {  DIObtn_S8_fun();}
`
  
  return dioramacode;
};

/**
 * Function to set the code to execute once a button is pressed
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['diorama_button_declaration'] = function(block) {
  var pshbtnSx = Blockly.Arduino.statementToCode(block, 'BUTTONCODE');
  var nr = block.getFieldValue('BUTTON');
  Blockly.Arduino.addFunction('DIObtn_S%1_fun'.replace('%1', nr), 
                              "void DIObtn_S%1_fun() {\n ".replace('%1', nr) + pshbtnSx + "\n}", true);
  return '';
};
