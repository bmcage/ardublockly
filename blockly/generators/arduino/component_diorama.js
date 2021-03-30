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
  
  var stepperName = block.getFieldValue('STEPPER_NAME');
  function parseInput(block, name, connectors) {
    var targetBlock = block.getInputTargetBlock(name);
    if (targetBlock) {
      targetBlock.setHubConnector(connectors);
    }
    var code = Blockly.Arduino.blockToCode(targetBlock);
    if (!(typeof code == 'string')) {
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
  
  
  var code = '// void\n';
  code += ' DOIvolLouder() {\n';
  code += '  if (DIOvolume >= 10)\n';
  code += '  {\n';
  code += '    DIOvolume = DIOvolume - 10;  } else { \n';
  code += '\n';
  code += '    DIOvolume = 0;\n';
  code += '  }\n';
  code += '  DIOMP3player.setVolume(DIOvolume, DIOvolume);\n';
  code += '}\n';
  
  //generate missing functions\n';
  Blockly.Arduino.addFunction('DIObtn_S1_fun', "void DIObtn_S1_fun() {}");
  Blockly.Arduino.addFunction('DIObtn_S2_fun', "void DIObtn_S2_fun() {}");
  Blockly.Arduino.addFunction('DIObtn_S3_fun', "void DIObtn_S3_fun() {}");
  Blockly.Arduino.addFunction('DIObtn_S4_fun', "void DIObtn_S4_fun() {}");
  Blockly.Arduino.addFunction('DIObtn_S5_fun', "void DIObtn_S5_fun() {}");
  Blockly.Arduino.addFunction('DIObtn_S6_fun', "void DIObtn_S6_fun() {}");
  Blockly.Arduino.addFunction('DIObtn_S7_fun', "void DIObtn_S7_fun() {}");
  var code8 = 'void DIObtn_S8_fun() {\n';
  code8 += '  DIOLastBtnPushed = 0;\n';
  code8 += '  DIOBtn1Running = false;\n';
  code8 += '  DIOBtn2Running = false;\n';
  code8 += '  DIOBtn3Running = false;\n';
  code8 += '  DIOBtn4Running = false;\n';
  code8 += '  DIOBtn5Running = false;\n';
  code8 += '  DIOBtn6Running = false;\n';
  code8 += '  DIOBtn7Running = false;\n';
  code8 += '  DIOBtn8Running = false;\n';
  code8 += '  if (DIOMP3player.isPlaying()) {DIOMP3player.stopTrack();}\n';
  code8 += '  DIOmodule.setDisplayToString("stop    ");\n';
  code8 += '  //also the stepper is reset \n';
  code8 += '  STEPPERNAME_finished = false; \n';
  code8 += '  STEPPERNAME_rotating = false;\n';
  code8 += '  STEPPERNAME_stepsdone = 0;\n';
  code8 += '}\n';
  Blockly.Arduino.addFunction('DIObtn_S8_fun', code8.replace(new RegExp('STEPPERNAME', 'g'), 'stepper_' + stepperName));
  var coderunning = 'void DIObtn_stoprunning(bool stopall) {\n';
  coderunning += '  if (stopall) {\n';
  coderunning += '    DIOBtn1Running = false;\n';
  coderunning += '    DIOBtn2Running = false;\n';
  coderunning += '    DIOBtn3Running = false;\n';
  coderunning += '    DIOBtn4Running = false;\n';
  coderunning += '    DIOBtn5Running = false;\n';
  coderunning += '    DIOBtn6Running = false;\n';
  coderunning += '    DIOBtn7Running = false;\n';
  coderunning += '    DIOBtn8Running = false;\n';
  coderunning += '  } else {\n';
  coderunning += '    if (DIOLastBtnPushed == 1) {DIOBtn1Running = false;}\n';
  coderunning += '    else if (DIOLastBtnPushed == 2) {DIOBtn2Running = false;}\n';
  coderunning += '    else if (DIOLastBtnPushed == 3) {DIOBtn3Running = false;}\n';
  coderunning += '    else if (DIOLastBtnPushed == 4) {DIOBtn4Running = false;}\n';
  coderunning += '    else if (DIOLastBtnPushed == 5) {DIOBtn5Running = false;}\n';
  coderunning += '    else if (DIOLastBtnPushed == 6) {DIOBtn6Running = false;}\n';
  coderunning += '    else if (DIOLastBtnPushed == 7) {DIOBtn7Running = false;}\n';
  coderunning += '    else if (DIOLastBtnPushed == 8) {DIOBtn8Running = false;}\n';
  coderunning += '  }\n';
  coderunning += '\n';
  coderunning += '  DIOLastBtnPushed = 0;\n';
  coderunning += '}\n';

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
  var dioramainclude = 'TM1638 DIOmodule(45, 43, 41);   // Sets up TM1638 Diorama module, verbonden met pinnen D2 (DIO), D5 (CLK), en D1 (STB)\n';
  dioramainclude += 'uint8_t DIOLastBtnPushed = 0; // 8 buttons, from 1 to 8\n';
  dioramainclude += 'bool DIOBtn1Running = false;\n';
  dioramainclude += 'bool DIOBtn2Running = false;\n';
  dioramainclude += 'bool DIOBtn3Running = false;\n';
  dioramainclude += 'bool DIOBtn4Running = false;\n';
  dioramainclude += 'bool DIOBtn5Running = false;\n';
  dioramainclude += 'bool DIOBtn6Running = false;\n';
  dioramainclude += 'bool DIOBtn7Running = false;\n';
  dioramainclude += 'bool DIOBtn8Running = false;\n';
  dioramainclude += '\n';
  dioramainclude += '// Variables used in base code for the diorama\n';
  dioramainclude += 'SdFat sd; // Create object to handle SD functions\n';
  dioramainclude += '\n';
  dioramainclude += 'SFEMP3Shield DIOMP3player; // Create Mp3 library object\n';
  dioramainclude += '// These variables are used in the MP3 initialization to set up\n';
  dioramainclude += '// some stereo options:\n';
  dioramainclude += 'uint8_t DIOvolume = 40; // MP3 Player volume 0=max, 255=lowest (off)\n';
  dioramainclude += 'const uint16_t DIOmonoMode = 1;  // Mono setting 0=off, 3=max\n';
  dioramainclude += 'int DIOtracknrplaying = 0;\n';
  dioramainclude += '\n';
  dioramainclude += '// initSD() initializes the SD card and checks for an error.\n';
  dioramainclude += 'void DIOinitSD()\n';
  dioramainclude += '{\n';
  dioramainclude += '  //Initialize the SdCard.\n';
  dioramainclude += '  if (!sd.begin(SD_SEL, SPI_HALF_SPEED))\n';
  dioramainclude += '    sd.initErrorHalt();\n';
  dioramainclude += '  if (!sd.chdir("/"))\n';
  dioramainclude += '    sd.errorHalt("sd.chdir");\n';
  dioramainclude += '}\n';
  dioramainclude += '\n';
  dioramainclude += '// DIOinitMP3Player() sets up all of the initialization for the\n';
  dioramainclude += '// MP3 Player Shield. It runs the begin() function, checks\n';
  dioramainclude += '// for errors, applies a patch if found, and sets the volume/\n';
  dioramainclude += '// stereo mode.\n';
  dioramainclude += 'void DIOinitMP3Player()\n';
  dioramainclude += '{\n';
  dioramainclude += '  uint8_t result = DIOMP3player.begin(); // init the mp3 player shield\n';
  dioramainclude += '  if (result != 0) // check result, see readme for error codes.\n';
  dioramainclude += '  {\n';
  dioramainclude += '    // Error checking can go here!\n';
  dioramainclude += '  }\n';
  dioramainclude += '  DIOMP3player.setVolume(DIOvolume, DIOvolume);\n';
  dioramainclude += '  DIOMP3player.setMonoMode(DIOmonoMode);\n';
  dioramainclude += '}\n';
  dioramainclude += '\n';

  Blockly.Arduino.addInclude('diorama0', dioramainclude);
  
  var dioramaSetupCode = '\n';

  dioramaSetupCode += '  DIOinitSD();  // Initialize the SD card\n';
  dioramaSetupCode += '  DIOinitMP3Player(); // Initialize the MP3 Shield\n';
  dioramaSetupCode += '\n';
  dioramaSetupCode += '  for (int x = 0; x < 5; x++)\n';
  dioramaSetupCode += '  {\n';
  dioramaSetupCode += '    DIOmodule.setDisplayToString("diorama");  // toon tekst\n';
  dioramaSetupCode += '    delay(600);\n';
  dioramaSetupCode += '    DIOmodule.setDisplayToString("ingegno ");  // toon tekst\n';
  dioramaSetupCode += '    delay(600);\n';
  dioramaSetupCode += '  }\n';
  dioramaSetupCode += '\n';
  dioramaSetupCode += '  DIOmodule.setDisplayToString("start   ");  // toon tekst\n';

  Blockly.Arduino.addSetup('diorama', dioramaSetupCode, true);
  
  var pinType = Blockly.Arduino.PinTypes.STEPPER;
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
  
  var a2scode = 'unsigned long STEPPERNAME_Angle2Steps(int angle) {\n';
  a2scode += '  if (angle < 0) {\n';
  a2scode += '    // convert negative angle to a positive one\n';
  a2scode += '    angle = -angle;\n';
  a2scode += '  }\n';
  a2scode += '  return (angle * STEPPERNAME_steps) / 360;\n';
  a2scode += '}\n';

  Blockly.Arduino.addFunction(stepperName+'Angle2Steps', a2scode.replace(new RegExp('STEPPERNAME', 'g'), stepperName));
  
  var globalCode = 'const unsigned long ' + stepperName + '_steps = ' + stepperSteps
      + ';\n'
      + 'Stepper ' + stepperName + '(' + stepperName + '_steps, DIO_IN1, DIO_IN3, DIO_IN2, DIO_IN4);\n'
      + 'bool ' + stepperName + '_rotating = false;\n'
      + 'unsigned long ' + stepperName + '_stepsdone = 0;\n'
      + 'bool ' + stepperName + '_finished = false;';
  Blockly.Arduino.addDeclaration(stepperName, globalCode);

  var setupCode = 'int ' + stepperName + '_rpm = ' + stepperSpeed
      + ';\n'
      + stepperName + '.setSpeed(' + stepperName + '_rpm);';
  Blockly.Arduino.addSetup(stepperName, setupCode, true);

  var dioramacode = '// DIOmodule.getButtons() geeft het nummer van de ingedrukte drukknoppen.\n';
  dioramacode += '// S1 = 1, S2 = 2, S3 = 4 .... S8 = 128\n';
  dioramacode += '// worden drukknoppen S1 en S3 ingedrukt dan is het resultaat = 5\n';
  dioramacode += 'byte DIOdrukknoppen = DIOmodule.getButtons();  // bewaar het nummer van de ingedrukte knoppen in DIOdruknoppen\n';
  dioramacode += '\n';
  dioramacode += 'if (bitRead(DIOdrukknoppen, 0)) {\n';
  dioramacode += '  DIOLastBtnPushed = 1; DIOBtn1Running = true;\n';
  dioramacode += '} else if (bitRead(DIOdrukknoppen, 1)) {\n';
  dioramacode += '  DIOLastBtnPushed = 2; DIOBtn2Running = true;\n';
  dioramacode += '} else if (bitRead(DIOdrukknoppen, 2)) {\n';
  dioramacode += '  DIOLastBtnPushed = 3; DIOBtn3Running = true;\n';
  dioramacode += '} else if (bitRead(DIOdrukknoppen, 3)) {\n';
  dioramacode += '  DIOLastBtnPushed = 4; DIOBtn4Running = true;\n';
  dioramacode += '} else if (bitRead(DIOdrukknoppen, 4)) {\n';
  dioramacode += '  DIOLastBtnPushed = 5; DIOBtn5Running = true;\n';
  dioramacode += '} else if (bitRead(DIOdrukknoppen, 5)) {\n';
  dioramacode += '  DIOLastBtnPushed = 6; DIOBtn6Running = true;\n';
  dioramacode += '} else if (bitRead(DIOdrukknoppen, 6)){\n';
  dioramacode += '  DIOLastBtnPushed = 7; DIOBtn7Running = true;\n';
  dioramacode += '} else if (bitRead(DIOdrukknoppen, 7)) {\n';
  dioramacode += '  DIOLastBtnPushed = 8; DIOBtn8Running = true;\n';
  dioramacode += '}\n';
  dioramacode += '\n';
  dioramacode += 'DIOmodule.setLEDs(DIOdrukknoppen);  // doe led branden boven de drukknop\n';
  dioramacode += '\n';
  dioramacode += '// we execute the commands as desired by the last button press\n';
  dioramacode += 'if (DIOLastBtnPushed == 1) {  DIObtn_S1_fun();}\n';
  dioramacode += 'if (DIOLastBtnPushed == 2) {  DIObtn_S2_fun();}\n';
  dioramacode += 'if (DIOLastBtnPushed == 3) {  DIObtn_S3_fun();}\n';
  dioramacode += 'if (DIOLastBtnPushed == 4) {  DIObtn_S4_fun();}\n';
  dioramacode += 'if (DIOLastBtnPushed == 5) {  DIObtn_S5_fun();}\n';
  dioramacode += 'if (DIOLastBtnPushed == 6) {  DIObtn_S6_fun();}\n';
  dioramacode += 'if (DIOLastBtnPushed == 7) {  DIObtn_S7_fun();}\n';
  dioramacode += 'if (DIOLastBtnPushed == 8) {  DIObtn_S8_fun();}\n';
  dioramacode += 'if (DIOBtn1Running && DIOLastBtnPushed != 1) {  DIObtn_S1_fun();}\n';
  dioramacode += 'if (DIOBtn2Running && DIOLastBtnPushed != 2) {  DIObtn_S2_fun();}\n';
  dioramacode += 'if (DIOBtn3Running && DIOLastBtnPushed != 3) {  DIObtn_S3_fun();}\n';
  dioramacode += 'if (DIOBtn4Running && DIOLastBtnPushed != 4) {  DIObtn_S4_fun();}\n';
  dioramacode += 'if (DIOBtn5Running && DIOLastBtnPushed != 5) {  DIObtn_S5_fun();}\n';
  dioramacode += 'if (DIOBtn6Running && DIOLastBtnPushed != 6) {  DIObtn_S6_fun();}\n';
  dioramacode += 'if (DIOBtn7Running && DIOLastBtnPushed != 7) {  DIObtn_S7_fun();}\n';
  dioramacode += 'if (DIOBtn8Running && DIOLastBtnPushed != 8) {  DIObtn_S8_fun();}\n';

  
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
