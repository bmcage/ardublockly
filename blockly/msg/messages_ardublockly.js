/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview  Ardublockly specific English strings.
 *
 * After modifying this file, either run "build.py" from the blockly directory,
 * or run (from this directory):
 * ../i18n/js_to_json.py
 * to regenerate json/{en,qqq,synonyms}.json.
 *
 * To convert all of the json files to .js files, run:
 * ../i18n/create_messages.py json/*.json
 */
'use strict';

goog.provide('Blockly.Msg.en');

goog.require('Blockly.Msg');


/**
 * Due to the frequency of long strings, the 80-column wrap rule need not apply
 * to message files.
 */

/**
 * Each message is preceded with a triple-slash comment that becomes the
 * message descriptor.  The build process extracts these descriptors, adds
 * them to msg/json/qqq_ardublockly.json, and they show up in the translation
 * console.
 * Note the strings have to be surrounded by single quotation marks: ''
 */

/**
 * Blockly4Arduino Website Messages
 */

/// Message when Chrome is not used
Blockly.Msg.B4A_NO_CHROME = 'You need to use Google Chrome to use this Upload functionality';
/// Message when Chrome extension is not available
Blockly.Msg.B4A_NO_EXTENSION = 'Chrome Extension is not installed';
/// Verify the code failed
Blockly.Msg.B4A_VERIFY_FAIL = 'Verify failed. Chrome Extension is not installed';
/// Uploading the code failed
Blockly.Msg.B4A_UPLOAD_FAIL = 'Upload failed. Chrome Extension is not installed';
/// Message on error on upload or verify
Blockly.Msg.B4A_ERROR = 'ERROR!';
/// Message on success on upload or verify
Blockly.Msg.B4A_SUCCESS = 'SUCCESS!';
/// Indication flashing in progress to Arduino
Blockly.Msg.B4A_FLASHING = 'Flashing to device';
/// Indication of error with compiler returning empty file
Blockly.Msg.B4A_COMPILE_EMPTY = 'Compiler returned empty file - Device not flashed';
/// Dialog box message requesting IP address
Blockly.Msg.B4A_SET_IP_COMPILER = 'New IP Address Compiler';
/// Notify user of return message of the chrome extension
Blockly.Msg.B4A_MSG_EXTENSION = 'Message from extension: ';

/**
 * Ardublockly Types
 */
/// Arduino Types - Character C type char
Blockly.Msg.ARD_TYPE_CHAR = 'Character';
/// Arduino Types - Text C type String
Blockly.Msg.ARD_TYPE_TEXT = 'Text';
/// Arduino Types - Boolean type
Blockly.Msg.ARD_TYPE_BOOL = 'Boolean';
/// Arduino Types - Short number C type char
Blockly.Msg.ARD_TYPE_SHORT = 'Short Number';
/// Arduino Types - Number C type integer
Blockly.Msg.ARD_TYPE_NUMBER = 'Number';
/// Arduino Types - Large number C type long integer
Blockly.Msg.ARD_TYPE_LONG = 'Large Number';
/// Arduino Types - Decimal number C type floating point
Blockly.Msg.ARD_TYPE_DECIMAL = 'Decimal';
/// Arduino Types - Array
Blockly.Msg.ARD_TYPE_ARRAY = 'Array';
/// Arduino Types - Null C type void
Blockly.Msg.ARD_TYPE_NULL = 'Null';
/// Arduino Types - Undefined type
Blockly.Msg.ARD_TYPE_UNDEF = 'Undefined';
/// Arduino Types - Place holder value, indicates block with type not connected
Blockly.Msg.ARD_TYPE_CHILDBLOCKMISSING = 'ChildBlockMissing';

/// Arduino Blocks
Blockly.Msg.ARD_HIGH = 'HIGH';
Blockly.Msg.ARD_LOW = 'LOW';
Blockly.Msg.ARD_ANALOGREAD = 'read analog pin#';
Blockly.Msg.ARD_ANALOGREAD_TIP = 'Return value between 0 and 1024';
Blockly.Msg.ARD_ANALOGWRITE = 'set analog pin#';
Blockly.Msg.ARD_ANALOGWRITE_ERROR = 'The analogue value set must be between 0 and 255';
Blockly.Msg.ARD_ANALOGWRITE_TIP = 'Write analog value between 0 and 255 to a specific PWM Port';
Blockly.Msg.ARD_HIGHLOW_TIP = 'Set a pin state logic High or Low.';
Blockly.Msg.ARD_DIGITALREAD = 'read digital pin#';
Blockly.Msg.ARD_DIGITALREAD_TIP = 'Read digital value on a pin: HIGH or LOW';
Blockly.Msg.ARD_DIGITALWRITE = 'set digitial pin#';
Blockly.Msg.ARD_WRITE_TO = 'to';
Blockly.Msg.ARD_DIGITALWRITE_TIP = 'Write digital value HIGH or LOW to a specific Port';
Blockly.Msg.ARD_BUILTIN_LED = 'set built-in LED';
Blockly.Msg.ARD_BUILTIN_LED_TIP = 'Light on or off for the built-in LED of the Arduino';
Blockly.Msg.ARD_DEFINE = 'Define';
Blockly.Msg.ARD_TONE_PIN = 'Tone PIN#';
Blockly.Msg.ARD_TONE_FREQ = 'frequency';
Blockly.Msg.ARD_TONE_PIN_TIP = 'Generate audio tones on a pin';
Blockly.Msg.ARD_NOTONE_PIN = 'No tone PIN#';
Blockly.Msg.ARD_NOTONE_PIN_TIP = 'Stop generating a tone on a pin';
Blockly.Msg.ARD_MAP = 'Map';
Blockly.Msg.ARD_MAP_VAL = 'value to [0-';
Blockly.Msg.ARD_MAP_TIP = 'Re-maps a number from [0-1024] to another.';
Blockly.Msg.ARD_FUN_RUN_SETUP = 'Arduino run first:';
Blockly.Msg.ARD_FUN_RUN_LOOP = 'Arduino loop forever:';
Blockly.Msg.ARD_FUN_RUN_TIP = 'Defines the Arduino setup() and loop() functions.';
Blockly.Msg.ARD_PIN_WARN1 = 'Pin %1 is needed for %2 as pin %3. Already used as %4.';
Blockly.Msg.ARD_SERIAL_SETUP = 'Setup';
Blockly.Msg.ARD_SERIAL_SPEED = ':  speed to';
Blockly.Msg.ARD_SERIAL_BPS = 'bps';
Blockly.Msg.ARD_SERIAL_SETUP_TIP = 'Selects the speed for a specific Serial peripheral';
Blockly.Msg.ARD_SERIAL_PRINT = 'print';
Blockly.Msg.ARD_SERIAL_PRINT_NEWLINE = 'add new line';
Blockly.Msg.ARD_SERIAL_PRINT_TIP = 'Prints data to the console/serial port as human-readable ASCII text.';
Blockly.Msg.ARD_SERIAL_PRINT_WARN = 'A setup block for %1 must be added to the workspace to use this block!';
Blockly.Msg.ARD_SERVO_WRITE = 'set SERVO from Pin';
Blockly.Msg.ARD_SERVO_WRITE_TO = 'to';
Blockly.Msg.ARD_SERVO_WRITE_DEG_180 = 'Degrees (0~180)';
Blockly.Msg.ARD_SERVO_WRITE_TIP = 'Set a Servo to an specified angle';
Blockly.Msg.ARD_SERVO_READ = 'read SERVO from PIN#';
Blockly.Msg.ARD_SERVO_READ_TIP = 'Read a Servo angle';
Blockly.Msg.ARD_SPI_SETUP = 'Setup';
Blockly.Msg.ARD_SPI_SETUP_CONF = 'configuration:';
Blockly.Msg.ARD_SPI_SETUP_SHIFT = 'data shift';
Blockly.Msg.ARD_SPI_SETUP_MSBFIRST = 'MSBFIRST';
Blockly.Msg.ARD_SPI_SETUP_LSBFIRST = 'LSBFIRST';
Blockly.Msg.ARD_SPI_SETUP_DIVIDE = 'clock divide';
Blockly.Msg.ARD_SPI_SETUP_MODE = 'SPI mode (idle - edge)';
Blockly.Msg.ARD_SPI_SETUP_MODE0 = '0 (Low - Falling)';
Blockly.Msg.ARD_SPI_SETUP_MODE1 = '1 (Low - Rising)';
Blockly.Msg.ARD_SPI_SETUP_MODE2 = '2 (High - Falling)';
Blockly.Msg.ARD_SPI_SETUP_MODE3 = '3 (High - Rising)';
Blockly.Msg.ARD_SPI_SETUP_TIP = 'Configures the SPI peripheral.';
Blockly.Msg.ARD_SPI_TRANS_NONE = 'none';
Blockly.Msg.ARD_SPI_TRANS_VAL = 'transfer';
Blockly.Msg.ARD_SPI_TRANS_SLAVE = 'to slave pin';
Blockly.Msg.ARD_SPI_TRANS_TIP = 'Send a SPI message to an specified slave device.';
Blockly.Msg.ARD_SPI_TRANS_WARN1 = 'A setup block for %1 must be added to the workspace to use this block!';
Blockly.Msg.ARD_SPI_TRANS_WARN2 = 'Old pin value %1 is no longer available.';
Blockly.Msg.ARD_SPI_TRANSRETURN_TIP = 'Send a SPI message to an specified slave device and get data back.';
Blockly.Msg.ARD_STEPPER_SETUP = 'Setup stepper motor';
Blockly.Msg.ARD_STEPPER_MOTOR = 'stepper motor:';
Blockly.Msg.ARD_STEPPER_DEFAULT_NAME = 'MyStepper';
Blockly.Msg.ARD_STEPPER_NUMBER_OF_PINS = 'Number of pins';
Blockly.Msg.ARD_STEPPER_TWO_PINS = '2';
Blockly.Msg.ARD_STEPPER_FOUR_PINS = '4';
Blockly.Msg.ARD_STEPPER_PIN1 = 'pin1#';
Blockly.Msg.ARD_STEPPER_PIN2 = 'pin2#';
Blockly.Msg.ARD_STEPPER_PIN3 = 'pin3#';
Blockly.Msg.ARD_STEPPER_PIN4 = 'pin4#';
Blockly.Msg.ARD_STEPPER_REVOLVS = 'how many steps per revolution';
Blockly.Msg.ARD_STEPPER_SPEED = 'set speed (rpm) to';
Blockly.Msg.ARD_STEPPER_SETUP_TIP = 'Configures a stepper motor pinout and other settings.';
Blockly.Msg.ARD_STEPPER_STEP = 'move stepper';
Blockly.Msg.ARD_STEPPER_STEPS = 'steps';
Blockly.Msg.ARD_STEPPER_STEP_TIP = 'Turns the stepper motor a specific number of steps.';
Blockly.Msg.ARD_STEPPER_COMPONENT = 'stepper';
Blockly.Msg.ARD_COMPONENT_WARN1 = 'A %1 configuration block with the same %2 name must be added to use this block!';
Blockly.Msg.ARD_TIME_DELAY = 'wait';
Blockly.Msg.ARD_TIME_MS = 'milliseconds';
Blockly.Msg.ARD_TIME_DELAY_TIP = 'Wait specific time in milliseconds';
Blockly.Msg.ARD_TIME_DELAY_MICROS = 'microseconds';
Blockly.Msg.ARD_TIME_DELAY_MICRO_TIP = 'Wait specific time in microseconds';
Blockly.Msg.ARD_TIME_MILLIS = 'current elapsed Time (milliseconds)';
Blockly.Msg.ARD_TIME_MILLIS_TIP = 'Returns the number of milliseconds since the Arduino board began running the current program. Has to be stored in a positive long integer';
Blockly.Msg.ARD_TIME_MICROS = 'current elapsed Time (microseconds)';
Blockly.Msg.ARD_TIME_MICROS_TIP = 'Returns the number of microseconds since the Arduino board began running the current program. Has to be stored in a positive long integer';
Blockly.Msg.ARD_TIME_INF = 'wait forever (end program)';
Blockly.Msg.ARD_TIME_INF_TIP = 'Wait indefinitely, stopping the program.';
Blockly.Msg.ARD_VAR_AS = 'as';
Blockly.Msg.ARD_VAR_AS_TIP = 'Sets a value to a specific type';
/// IO blocks - pulseIn - Block for function pulseIn(), it measure a pulse duration in a given pin.
Blockly.Msg.ARD_PULSE_READ = 'measure %1 pulse on pin #%2';
/// IO blocks - pulseIn - Block similar to ARD_PULSE_READ, but it adds a time-out in microseconds.
Blockly.Msg.ARD_PULSE_READ_TIMEOUT = 'measure %1 pulse on pin #%2 (timeout after %3 μs)';
/// IO blocks - pulseIn - Tooltip for pulseIn() block.
Blockly.Msg.ARD_PULSE_TIP = 'Measures the duration of a pulse on the selected pin.';
/// IO blocks - pulseIn - Tooltip for pulseIn() block when it uses the optional argument for time-out.
Blockly.Msg.ARD_PULSETIMEOUT_TIP = 'Measures the duration of a pulse on the selected pin, if it is within the time-out in microseconds.';
Blockly.Msg.ARD_SETTONE = 'Set tone on pin #';
Blockly.Msg.ARD_TONEFREQ = 'at frequency';
Blockly.Msg.ARD_TONE_TIP = 'Sets tone on pin to specified frequency within range 31 - 65535';
Blockly.Msg.ARD_TONE_WARNING = 'Frequency must be in range 31 - 65535';
Blockly.Msg.ARD_NOTONE = 'Turn off tone on pin #';
Blockly.Msg.ARD_NOTONE_TIP = 'Turns the tone off on the selected pin';

/**
 * Ardublockly instances
 */
/// Instances - Menu item to indicate that it will create a new instance
Blockly.Msg.NEW_INSTANCE = 'New instance...';
/// Instances - Menu item to rename an instance name
Blockly.Msg.RENAME_INSTANCE = 'Rename instance...';
/// Instances - Menu item to create a new instance name and apply it to that block
Blockly.Msg.NEW_INSTANCE_TITLE = 'New instance name:';
/// Instances - Confirmation message that a number of instances will be renamed to a new name
Blockly.Msg.RENAME_INSTANCE_TITLE = 'Rename all "%1" instances to:';

/**
 * Blockly4Arduino extras
 */


/// Arduino Blocks
Blockly.Msg.ARD_TYPE_CHILDBLOCKMISSING = 'ChildBlockMissing';
Blockly.Msg.ARD_BOARD = 'Board';
Blockly.Msg.ARD_BOARD_WARN = 'This block requires as board %1, but or a duplicate block is present or another block is present that requires another Arduino board!';
Blockly.Msg.ARD_VALUE = "value";
Blockly.Msg.ARD_FUN_RUN_DECL = 'Arduino define up front:';
Blockly.Msg.ARD_FUN_RUN_DECL_TIP = 'Code you want to declare up front (use this e.g. for variables you need in setup)';
Blockly.Msg.ARD_SERVOHUB = 'Servo motor';
Blockly.Msg.ARD_SERVO_DEFAULT_NAME = 'Servo1';
Blockly.Msg.ARD_SERVO_TYPE = 'Type:';
Blockly.Msg.ARD_180SERVO = '0~180 degree Servo (angle)';
Blockly.Msg.ARD_360SERVO = '0~360 degree Servo (rotation)';
Blockly.Msg.ARD_SERVOHUB_TIP = 'Servo Motor Connection, which can attach to a PWM pin. You have to give the servo a name, and what type it is (a 180 degree servo or a 360 degree servo.)';
Blockly.Msg.ARD_STEPPER_SPEED_TIP = 'Sets speed of the stepper motor. The steps are set at the speed needed to have the set RPM speed based on the given steps per revolution in the constructor.';
Blockly.Msg.ARD_STEPPER_ROTATE = 'Rotate';
Blockly.Msg.ARD_STEPPER_DEGREES = 'degrees';
Blockly.Msg.ARD_STEPPER_ROTATE_TIP = 'Rotate the stepper motor over a number of degrees in a non-blocking way. This block must be called in the loop. When finished the stepper is blocked, and a call to restart movement is needed for the block to cause a next movement.';
Blockly.Msg.ARD_STEPPER_RESTART = 'Get';
Blockly.Msg.ARD_STEPPER_RESTART_AFTER = 'ready';
Blockly.Msg.ARD_STEPPER_RESTART_TIP = 'Reset the motor ready after a rotation block has finished, so as to be able to rotate again';
Blockly.Msg.ARD_STEPPER_ISROTATING = 'in movement';
Blockly.Msg.ARD_STEPPER_ISROTATING_TIP = 'Returns true if the stepper is moving.';
Blockly.Msg.ARD_SERVO_COMPONENT = 'servo';
Blockly.Msg.ARD_SERVO_ROTATE360 = 'Rotate 360 degree Servo';
Blockly.Msg.ARD_SERVO_ROTATESPEED = 'with speed';
Blockly.Msg.ARD_SERVO_ROTATEPERC = '% (-100 to 100)';
Blockly.Msg.ARD_SERVO_ROTATE_TIP = 'Turn a Servo with a specific speed';
Blockly.Msg.ARD_SERVOHUB_WRITE = 'set 180 degree Servo ';
Blockly.Msg.ARD_SERVOHUB_READ = 'read Servo ';

Blockly.Msg.REPLACE_EXISTING_BLOCKS = 'Replace existing blocks? "Cancel" will merge.';

//Arduino blocks define as a specific type
Blockly.Msg.ARD_AS_BOOL_NUMBER = 'as boolean';
//Arduino blocks define as a specific type
Blockly.Msg.ARD_AS_INTEGER_NUMBER = 'as integer number';
//Arduino blocks define as a specific type
Blockly.Msg.ARD_AS_UINT_NUMBER = 'as positive integer number';
//Arduino blocks define as a specific type
Blockly.Msg.ARD_AS_LONG_NUMBER = 'as long integer number';
//Arduino blocks define as a specific type
Blockly.Msg.ARD_AS_ULONG_NUMBER = 'as long positive integer number';
//Arduino blocks define as a specific type
Blockly.Msg.ARD_AS_FLOAT_NUMBER = 'as decimal number';
Blockly.Msg.ARD_AS_BOOL_NUMBER_TIP = 'Declare a variable as boolean with value true or false';
//Arduino blocks define as a specific type tip
Blockly.Msg.ARD_AS_INTEGER_NUMBER_TIP = 'Declare a variable as integer, -32768 to 32767';
//Arduino blocks define as a specific type tip
Blockly.Msg.ARD_AS_UINT_NUMBER_TIP = 'Declare a variable as a positive integer, 0 to 65535';
//Arduino blocks define as a specific type tip
Blockly.Msg.ARD_AS_LONG_NUMBER_TIP = 'Declare a variable as a long integer, -2,147,483,648 to 2,147,483,647';
//Arduino blocks define as a specific type tip
Blockly.Msg.ARD_AS_ULONG_NUMBER_TIP = 'Declare a variable as a long positive integer, 0 to 4,294,967,295';
//Arduino blocks define as a specific type tip
Blockly.Msg.ARD_AS_FLOAT_NUMBER_TIP = 'Declare a variable as a decimal number, eg 3.6 or 5e4 or -3.14';

Blockly.Msg.ARD_AS_DIGINPUT_PIN = 'as digital input';
Blockly.Msg.ARD_AS_DIGINPUT_PIN_TIP = 'Declare a variable as a digital input pin';
Blockly.Msg.ARD_AS_DIGOUTPUT_PIN = 'as digital output';
Blockly.Msg.ARD_AS_DIGOUTPUT_PIN_TIP = 'Declare a variable as a digital output pin';
Blockly.Msg.ARD_AS_ANAINPUT_PIN = 'as analog input';
Blockly.Msg.ARD_AS_ANAINPUT_PIN_TIP = 'Declare a variable as a analog input pin';
Blockly.Msg.ARD_AS_ANAOUTPUT_PIN = 'as analg output';
Blockly.Msg.ARD_AS_ANAOUTPUT_PIN_TIP = 'Declare a variable as a analog PWM output pin';


Blockly.Msg.ARD_DIGITALWRITEVAR_TIP = 'Write digital value to a Port, the value and port can be computed variables';

Blockly.Msg.ARD_PIN_AN = 'analog pin';
Blockly.Msg.ARD_PIN_DIG = 'digital pin';
Blockly.Msg.ARD_PIN_PWM = 'PWM pin';
Blockly.Msg.ARD_PIN_AN_TIP = 'One of the analog pins of the Arduino Board';
Blockly.Msg.ARD_PIN_DIG_TIP = 'One of the digital pins of the Arduino Board';
Blockly.Msg.ARD_PIN_PWM_TIP = 'One of the Pulse Width Modeling (PWM) pins of the Arduino Board';
Blockly.Msg.ARD_PULSEREAD = 'Read';
Blockly.Msg.ARD_PULSEON = 'pulse on pin #';
Blockly.Msg.ARD_PULSETIMEOUT = 'timeout after';
Blockly.Msg.ARD_PULSETIMEOUT_MS = '';
Blockly.Msg.ARD_PULSE_TIP = 'Measures the duration of a pulse on the selected pin.';
Blockly.Msg.ARD_PULSETIMEOUT_TIP = 'Measures the duration of a pulse on the selected pin, if it is within the timeout.';

Blockly.Msg.ARD_LEDLEG_COMPONENT = 'LED';
Blockly.Msg.ARD_LEDLEG_DEFAULT_NAME = 'Led1';
Blockly.Msg.ARD_LEDLEG = 'LED';
Blockly.Msg.ARD_LEDLEGPOL = 'leg polarity';
Blockly.Msg.ARD_LEDLEGPOS = 'plus';
Blockly.Msg.ARD_LEDLEGNEG = 'minus';
Blockly.Msg.ARD_LEDLEG_TIP = 'A LED light, on of the legs (the positive or negative) is connected to the Arduino. Can be ON or OFF.';
Blockly.Msg.ARD_LEDLEG_SET = 'Set LED';
Blockly.Msg.ARD_LEDLEG_ON = 'ON';
Blockly.Msg.ARD_LEDLEG_OFF = 'OFF';
Blockly.Msg.ARD_NEOPIXEL = 'NeoPixel LED light';
Blockly.Msg.ARD_NEOPIXEL_STRIP = 'Strip with';
Blockly.Msg.ARD_NEOPIXEL_PIXELS = 'Pixels.';
Blockly.Msg.ARD_NEOPIXEL_HZ = 'Frequency:';
Blockly.Msg.ARD_NEOPIXEL_TYPE = 'Type:';
Blockly.Msg.ARD_NEOPIXEL_TIP = 'A NEOPIXEL LED light or a strip with multiple neopixels.';
Blockly.Msg.ARD_NEOPIXEL_SET = 'Set Neopixel';
Blockly.Msg.ARD_NEOPIXEL_PIXEL = 'pixel';
Blockly.Msg.ARD_NEOPIXEL_ONCOLOUR = 'on colour';
Blockly.Msg.ARD_NEOPIXEL_BRIGHTNESS = ' brightness (%)';
Blockly.Msg.ARD_NEOPIXEL_ONCOLOURVALRED = 'on colour (0-255) red:';
Blockly.Msg.ARD_NEOPIXEL_ONCOLOURVALGREEN = 'green:';
Blockly.Msg.ARD_NEOPIXEL_ONCOLOURVALBLUE = 'blue:';
Blockly.Msg.ARD_NEOPIXEL_COMPONENT = 'Neopixel strip';
Blockly.Msg.ARD_NEOPIXEL_DEFAULT_NAME = 'NeoPixel1';
Blockly.Msg.ARD_BLOCKS = 'You have this block twice on the canvas. That is once too many!';
Blockly.Msg.ARD_BUTTON_COMPONENT = 'Push Button';
Blockly.Msg.ARD_BUTTON_DEFAULT_NAME = 'PushButton1';
Blockly.Msg.ARD_BUTTON_IFPUSHED = 'If pushed we measure value';
Blockly.Msg.ARD_BUTTON_TIP = 'A push button which can be ON or OFF, connected to the Arduino with 3 wires: GND, 5V over resisotor, and a digital pin';
Blockly.Msg.ARD_BUTTON_READ = 'Read value button';
Blockly.Msg.ARD_BUTTON_INPUT_IF = 'If button';
Blockly.Msg.ARD_BUTTON_INPUT_CLICK = ' is clicked';
Blockly.Msg.ARD_BUTTON_INPUT_THEN = 'do';
Blockly.Msg.ARD_BUTTON_INPUT_LONGCLICK = 'is undergoing a long click';
Blockly.Msg.ARD_BUTTON_INPUT_PRESSED = 'is being pressed';
Blockly.Msg.ARD_BUTTON_INPUT_WAIT = 'wait for a click to happen';
Blockly.Msg.ARD_BUTTON_INPUT_TIP = 'Check the input received on a button, and react to it. This function does not block your program if you do not check the checkbox to wait for a click. A click is a press and a release of the button, a long press a click and holding long time before you release, press is active as soon as the button is pressed down.';
Blockly.Msg.ARD_BUTTON_INPUT_PULLUP_COMPONENT = 'Pushbutton 2-wire no resistor';
Blockly.Msg.ARD_BUTTON_INPUT_PULLUP_TIP = 'A push button which can be ON or OFF, connected to the Arduino with 2 wires: GND, and a digital pin';
Blockly.Msg.ARD_ANASENSOR = 'Analog Sensor';
Blockly.Msg.ARD_ANASENSOR_TIP = 'Connect an analog sensor to an analog pin, so as to read its value. On an Arduino UNO a value between 0 and 1024 is returned, corresponding to a measured value between 0 and 5V. Eg.: an LDR sensor, a potmeter, ...';
Blockly.Msg.ARD_ANASENSOR_DEFAULT_NAME = 'AnaSensor1';
Blockly.Msg.ARD_ANASENSOR_READ = 'Read analog sensor';
Blockly.Msg.ARD_ANASENSOR_COMPONENT = 'Analog Sensor';
Blockly.Msg.ARD_DIGINPUT = 'Digital input';
Blockly.Msg.ARD_DIGINPUT_TIP = 'Connect a digital input to a digital pin, so as to read its value. The digital state can then be read, corresponding to 0V or 5V on the pin for an Arduino UNO.';
Blockly.Msg.ARD_DIGINPUT_DEFAULT_NAME = 'DigInput1';
Blockly.Msg.ARD_DIGINPUT_READ = 'Read digital input';
Blockly.Msg.ARD_DIGINPUT_COMPONENT = 'Digital Input';
Blockly.Msg.ARD_DIGOUTPUT = 'Digital output';
Blockly.Msg.ARD_DIGOUTPUT_TIP = 'Connect a generic digital ouput to a digital pin, so as to write to that pin. The digital state can be set to LOW or HIGH, corresponding to 0V and 5V on the pin for an Arduino UNO.';
Blockly.Msg.ARD_DIGOUTPUT_DEFAULT_NAME = 'DigOutput1';
Blockly.Msg.ARD_DIGOUTPUT_WRITE = 'Write to digital output';
Blockly.Msg.ARD_DIGOUTPUT_COMPONENT = 'Digital Output';
Blockly.Msg.ARD_PWMOUTPUT = 'PWM output';
Blockly.Msg.ARD_PWMOUTPUT_TIP = 'Connect a generic PWM (Pulse Width Modulation) ouput to a pwm pin, so as to write an analog value to that pin. The value written should be a number between 0 and 255, and will generate a block pulse over this pin.';
Blockly.Msg.ARD_PWMOUTPUT_DEFAULT_NAME = 'PWMOutput1';
Blockly.Msg.ARD_PWMOUTPUT_WRITE = 'Write to PWM output';
Blockly.Msg.ARD_PWMOUTPUT_COMPONENT = 'PWM Output';
Blockly.Msg.ARD_OUTPUT_WRITE_TO = 'value';

//effect block
Blockly.Msg.ARD_CONTROLS_EFFECT_TOOLTIP_1 = 'At the start of an effect, do some statements';
Blockly.Msg.ARD_CONTROLS_EFFECT_TOOLTIP_2 = 'At the start of an effect, do some statements, and at the end of the effect too';
Blockly.Msg.ARD_CONTROLS_EFFECT_TOOLTIP_3 = 'At the start of an effect, do some statements, if the effect time becomes larger than the given time, do the next statements.';
Blockly.Msg.ARD_CONTROLS_EFFECT_TOOLTIP_4 = 'At the start of an effect, do some statements, if the effect time becomes larger than the given time, do the next statements. Ath end of the effect the final statements are done.';
Blockly.Msg.ARD_CONTROLS_EFFECT_MSG_FIRST1 = 'Effect';
Blockly.Msg.ARD_CONTROLS_EFFECT_MSG_FIRST2 = 'with total duration (ms) =';
Blockly.Msg.ARD_CONTROLS_EFFECT_MSG_IF = 'at the start do';
Blockly.Msg.ARD_CONTROLS_EFFECT_MSG_ELSEIF = 'if effect time becomes greater than';
Blockly.Msg.ARD_CONTROLS_EFFECT_MSG_ELSE = 'at the end do';
Blockly.Msg.ARD_CONTROLS_EFFECT_MSG_THEN = Blockly.Msg.CONTROLS_REPEAT_INPUT_DO;
Blockly.Msg.ARD_CONTROLS_EFFECT_IF_TITLE_IF = Blockly.Msg.ARD_CONTROLS_EFFECT_MSG_IF;
Blockly.Msg.ARD_CONTROLS_EFFECT_IF_TOOLTIP = Blockly.Msg.CONTROLS_IF_IF_TOOLTIP;
Blockly.Msg.ARD_CONTROLS_EFFECT_ELSEIF_TITLE_ELSEIF = Blockly.Msg.ARD_CONTROLS_EFFECT_MSG_ELSEIF;
Blockly.Msg.ARD_CONTROLS_EFFECT_ELSEIF_TOOLTIP = 'Add an extra effect time at which statements must be done';
Blockly.Msg.ARD_CONTROLS_EFFECT_ELSE_TITLE_ELSE = Blockly.Msg.ARD_CONTROLS_EFFECT_MSG_ELSE;
Blockly.Msg.ARD_CONTROLS_EFFECT_ELSE_TOOLTIP = 'Add a block for statements when the effect is finished.';
Blockly.Msg.ARD_COMPONENT_BOARD = 'a specific Arduino Board';
Blockly.Msg.ARD_COMPONENT_BOARD_TIP = 'Set which Arduino board you work with, and connect components to the pins.';
Blockly.Msg.ARD_COMPONENT_BOARD_HUB_TIP = 'Set the Arduino board you work with, and to what it connects';
Blockly.Msg.ARD_PIN_DIGDIG = 'digital pin1 and pin2';
Blockly.Msg.ARD_PIN_DIGDIG_TIP = 'Component requiring two digital pins, pin1 and pin2';
Blockly.Msg.ARD_PIN_DIGDIG1 = 'digital pin1#';
Blockly.Msg.ARD_PIN_DIGDIG2 = 'pin2#';

//GUI specific translations
Blockly.Msg.UPLOAD_CLICK_1 = 'To Upload your code to Arduino:';
Blockly.Msg.UPLOAD_CLICK_2 = '  1. click on the Arduino tab';
Blockly.Msg.UPLOAD_CLICK_3 = '  2. select all the code, and copy (CTRL+A and CTRL+C)';
Blockly.Msg.UPLOAD_CLICK_4 = '  3. In the Arduino IDE or in a http://codebender.cc sketch, paste the code (CTRL+V)';
Blockly.Msg.UPLOAD_CLICK_5 = '  4. Upload to your connected Arduino';

//MICRODUINO BLOCKS
Blockly.Msg.ARD_MD_COOKIEBUTTON_COMPONENT = 'Microduino MCookie CoreUSB';
Blockly.Msg.ARD_MD_NOSERVO = 'Geen Servo gekoppeld';
Blockly.Msg.ARD_MD_180SERVO = '0~180 degree Servo';
Blockly.Msg.ARD_MD_360SERVO = '0~360 degree Servo';
Blockly.Msg.ARD_MD_SERVOTYPE_TIP = 'Select the type of Servo you attach to the Servo connnector'
Blockly.Msg.ARD_MD_SERVOCON = 'Servo Motor Connector.';
Blockly.Msg.ARD_MD_SERVOCON_TOP = 'Define top Servo';
Blockly.Msg.ARD_MD_SERVOCON_BOTTOM = 'Define bottom Servo';
Blockly.Msg.ARD_MD_SERVOCON_TYPE = 'Type:';
Blockly.Msg.ARD_MD_SERVOCON_TIP = 'Servo Motor Connector, can control two Servo (top and bottom). You have to give the servo a name, and what type it is (no servo attached, a 180 degree servo or a 360 degree servo.';
Blockly.Msg.ARD_MD_SERVO_STEP_WARN1 = 'A Servo configuration block must be added to the hub to use this block!';
Blockly.Msg.ARD_MD_SERVO_STEP_WARN2 = 'A Name input must be added to the Servo configuration block!';
Blockly.Msg.ARD_MD_SERVO_STEP_WARN3 = 'Selected servo does not exist any more, please select a new one.';
Blockly.Msg.ARD_MD_SERVO_WRITE = 'set 180 degree Servo ';
Blockly.Msg.ARD_MD_SERVO_READ = 'read Servo ';
Blockly.Msg.ARD_MD_CRASHBUTTON_COMPONENT = 'Microduino Crash Button';
Blockly.Msg.ARD_MD_CRASHBUTTON_DEFAULT_NAME = 'Crashbutton1';
Blockly.Msg.ARD_MD_CRASHBUTTON_TIP = 'The microduino crash-button with which you can detect if you hit something, or that you can use as a push button.';
Blockly.Msg.ARD_MD_SERVOTOP_DEFAULT_NAME = 'TopServo1';
Blockly.Msg.ARD_MD_SERVOBOT_DEFAULT_NAME = 'BottomServo1';
Blockly.Msg.ARD_MD_BLOCKS = 'Microduino blocks: ';
Blockly.Msg.ARD_MD_COREBLOCK = 'Brain (CoreUSB)';
Blockly.Msg.ARD_MD_COREBLOCK_TIP = 'The Brain of your construction, the MCookie-CoreUSB';
Blockly.Msg.ARD_MD_HUBBLOCK = 'The Cable holder (Sensor Hub)';
Blockly.Msg.ARD_MD_HUBBLOCK01 = 'connected to pins:   IIC';
Blockly.Msg.ARD_MD_HUBBLOCK_TIP = 'The Hub allows to connect up to 12 sensors to your Microduino';
Blockly.Msg.ARD_MD_AAABLOCK = 'AAA 3V Battery module';
Blockly.Msg.ARD_MD_AAABLOCK_TIP = 'The battery block for Microduino';
Blockly.Msg.ARD_MD_AUDIOBLOCK = 'Sound modules (Audio). Mode:';
Blockly.Msg.ARD_MD_AUDIOBLOCK_TIP = 'Audio Function Module, Choose a mode and a volume';
Blockly.Msg.ARD_MD_AUDIO_REP1 = 'Repeat everything';
Blockly.Msg.ARD_MD_AUDIO_REP2 = 'Play everything 1 time';
Blockly.Msg.ARD_MD_AUDIO_REP3 = 'Repeat  1 track';
Blockly.Msg.ARD_MD_AUDIO_REP4 = 'Play 1 track';
Blockly.Msg.ARD_MD_COREWARN = 'A Brain (CoreUSB) module must be added to your blocks';
Blockly.Msg.ARD_MD_AAASOUNDWARN = 'A AAA Battery module must be added to your blocks if you work with sound';
Blockly.Msg.ARD_MD_AMPWARN = 'An Amplifier module must be added to your blocks';
Blockly.Msg.ARD_MD_AUDIOAMPWARN = 'An Audio module must be added to your blocks if you work with an amplifier';
Blockly.Msg.ARD_MD_AUDIOSOUNDWARN = 'An Audio module must be added to your blocks to be able to work with music.';
Blockly.Msg.ARD_MD_AMPBLOCK = 'Loudspeaker (Amplifier) Module';
Blockly.Msg.ARD_MD_AMPBLOCK_TIP = 'Amplifier module, connect the loudspeaker to it to hear sound.';
Blockly.Msg.ARD_MD_AUDIO_PLAYNR = 'Play sound fragment';
Blockly.Msg.ARD_MD_AUDIO_PLAY = '';
Blockly.Msg.ARD_MD_AUDIO_PLAY_TIP = 'Write the number of the sound fragment you want to play. On the this number corresponds to the order in which files have been copied to the SD Card. Best: 1/Empty the SD card 2/copy files to SD card in the order you want to play them 3/it is easier if you name the files 001.mp3, 002.mp3, ... and copy them one after the other to the card!';
Blockly.Msg.ARD_MD_AUDIO_PAUSE = 'Pause sound fragment';
Blockly.Msg.ARD_MD_AUDIO_PAUSE_TIP = 'Pause the sound fragment that is playing';

Blockly.Msg.ARD_LEDUP_HUB = 'LedUpKidz, destination: ';
Blockly.Msg.ARD_LEDUP_HUB_TIP = 'LedUpKidz is a gadget with 6 LED that you can program. There is a big prototype connected to an Arduino UNO, choose "prototype" for code destined for this. The gadget itself works on a small attiny85 microchip, for code with that destination, select destination "gadget"';
Blockly.Msg.ARD_LEDUP_LED0 = 'LED 0';
Blockly.Msg.ARD_LEDUP_LED1 = 'LED 1';
Blockly.Msg.ARD_LEDUP_LED2 = 'LED 2';
Blockly.Msg.ARD_LEDUP_LED3 = 'LED 3';
Blockly.Msg.ARD_LEDUP_LED4 = 'LED 4';
Blockly.Msg.ARD_LEDUP_LED5 = 'LED 5';
Blockly.Msg.ARD_LEDUP_GADGET = 'Gadget LedUpKidz';
Blockly.Msg.ARD_LEDUP_PROTO = 'Prototype Arduino UNO';
Blockly.Msg.ARD_LEDUP_LED_ONOFF1 = 'Put LedUp LED';
Blockly.Msg.ARD_LEDUP_LED_ONOFF2 = 'on? True/False:';
Blockly.Msg.ARD_LEDUP_LED_ONOFF_TIP = 'Set a given LedUpKidz light to on or off using variable blocks';
/// AllBot strings
Blockly.Msg.ARD_NO_ALLBOT = 'No AllBot present';
Blockly.Msg.ARD_ALLBOT_SERVOHUB = 'AllBot Servo motor';
Blockly.Msg.ARD_ALLBOT_HIPLEFT = 'hipLeft';
Blockly.Msg.ARD_ALLBOT_HIPRIGHT = 'hipRight';
Blockly.Msg.ARD_ALLBOT_ANKLELEFT = 'ankleLeft';
Blockly.Msg.ARD_ALLBOT_ANKLERIGHT = 'ankleRight';
Blockly.Msg.ARD_ALLBOT_HIPFRONTRIGHT = 'hipFrontRight';
Blockly.Msg.ARD_ALLBOT_HIPFRONTLEFT = 'hipFrontLeft';
Blockly.Msg.ARD_ALLBOT_HIPMIDDLERIGHT = 'hipMiddleRight';
Blockly.Msg.ARD_ALLBOT_HIPMIDDLELEFT = 'hipMiddleLeft';
Blockly.Msg.ARD_ALLBOT_HIPREARRIGHT = 'hipRearRight';
Blockly.Msg.ARD_ALLBOT_HIPREARLEFT = 'hipRearLeft';
Blockly.Msg.ARD_ALLBOT_KNEEFRONTRIGHT = 'kneeFrontRight';
Blockly.Msg.ARD_ALLBOT_KNEEFRONTLEFT = 'kneeFrontLeft';
Blockly.Msg.ARD_ALLBOT_KNEEMIDDLERIGHT = 'kneeMiddleRight';
Blockly.Msg.ARD_ALLBOT_KNEEMIDDLELEFT = 'kneeMiddleLeft';
Blockly.Msg.ARD_ALLBOT_KNEEREARRIGHT = 'kneeRearRight';
Blockly.Msg.ARD_ALLBOT_KNEEREARLEFT = 'kneeRearLeft';
Blockly.Msg.ARD_ALLBOT_ANKLEFRONTRIGHT = 'ankleFrontRight';
Blockly.Msg.ARD_ALLBOT_ANKLEFRONTLEFT = 'ankleFrontLeft';
Blockly.Msg.ARD_ALLBOT_ANKLEMIDDLERIGHT = 'ankleMiddleRight';
Blockly.Msg.ARD_ALLBOT_ANKLEMIDDLELEFT = 'ankleMiddleLeft';
Blockly.Msg.ARD_ALLBOT_ANKLEREARRIGHT = 'ankleRearRight';
Blockly.Msg.ARD_ALLBOT_ANKLEREARLEFT = 'ankleRearLeft';
              
Blockly.Msg.ARD_UNKNOWN_ALLBOTJOINT = 'The old joint value %1 is no longer available';
Blockly.Msg.ARD_ALLBOT_FORWARD = 'AllBot Forward:';
Blockly.Msg.ARD_ALLBOT_BACKWARD = 'AllBot Backward:';
Blockly.Msg.ARD_ALLBOT_LEFT = 'AllBot Left:';
Blockly.Msg.ARD_ALLBOT_RIGHT = 'AllBot Right:';
Blockly.Msg.ARD_ALLBOT_STEPS = 'steps, stepspeed';
Blockly.Msg.ARD_ALLBOT_WALK_TIP = 'Make the allbot move a number of steps with the given speed (ms) for one step';
Blockly.Msg.ARD_ALLBOT_LOOKLEFT = 'AllBot Look Left, speed (ms):';
Blockly.Msg.ARD_ALLBOT_LOOKRIGHT = 'AllBot Look Right, speed (ms):';
Blockly.Msg.ARD_ALLBOT_LOOK_TIP = 'Make the allbot look towards a specific direction with the given speed (ms)';
Blockly.Msg.ARD_ALLBOT_CHIRP = 'AllBot Chirp:';
Blockly.Msg.ARD_ALLBOT_CHIRPSPEED = 'beeps, beepspeed';
Blockly.Msg.ARD_ALLBOT_CHIRP_TIP = 'Make the allbot chirp a number of beeps at the given speed (delay in microseconds, use 1 to 255)';
Blockly.Msg.ARD_ALLBOT_SCARED = 'AllBot Look Scared:';
Blockly.Msg.ARD_ALLBOT_SCAREDBEEPS = 'shakes, beeps:';
Blockly.Msg.ARD_ALLBOT_SCARED_TIP = 'Make the allbot shake the given number of shakes, and beep the given number of beeps ';
Blockly.Msg.ARD_ALLBOTSERVO_WRITE = 'Set AllBot Servo ';
Blockly.Msg.ARD_ALLBOT_ANIMATE = 'Animate AllBot';
Blockly.Msg.ARD_ALLBOT_ANIMATESERVOS = 'Servos';
Blockly.Msg.ARD_ALLBOT_ANIMATESPEED = 'Animation duration (ms):';
Blockly.Msg.ARD_ALLBOT_ANIMATE_TIP = 'Animate the allbot by moving different servos at the same time. Total duration of this animation can be set. A servo may have only one movement block present.';
Blockly.Msg.ARD_ALLBOTSERVO_ANIMATE = 'Move AllBot Servo ';
Blockly.Msg.ARD_ALLBOTSERVO_ANIMATE_TIP = 'Move Servo to a specified angle gradually over the animation duration. You can combine this with other servo movements';
Blockly.Msg.ARD_ALLBOT_RC = 'AllBot Remote Control Handling';
Blockly.Msg.ARD_ALLBOT_RCCOMMANDS = 'Commands ';
Blockly.Msg.ARD_ALLBOT_RCSERIAL = 'Use Serial to view Commands';
Blockly.Msg.ARD_ALLBOT_RC_TIP = 'A block to react to the AllBot Remote Control App on your smarthphone. Check Serial to see in the serial monitor what commands are received. Note: Your AllBot shield must be switched to RECEIVE after programming it.';
Blockly.Msg.ARD_ALLBOT_RCCOMMAND = 'On receiving command ';
Blockly.Msg.ARD_ALLBOT_RCDO = 'Do ';
Blockly.Msg.ARD_ALLBOT_RCCOMMAND_SINGLE = 'This block must be inside an AllBot Remote Control block ';
Blockly.Msg.ARD_ALLBOT_RCCOMMAND_TIP = 'Set the actions the AllBot must do on receiving a command.';
Blockly.Msg.ARD_ALLBOT_RC_SPEED = 'RC Speed';
Blockly.Msg.ARD_ALLBOT_RC_SPEED_TIP = 'The speed as set in the Remote Control App';
Blockly.Msg.ARD_ALLBOT_RC_TIMES = 'RC Times';
Blockly.Msg.ARD_ALLBOT_RC_TIMES_TIP = 'The times (number of steps) as set in the Remote Control App';
Blockly.Msg.ARD_BUZZEROUTPUT = 'Buzzer/Speaker';
Blockly.Msg.ARD_BUZOUTPUT_TIP = 'This component is a Buzzer or a Loudspeaker. You can connect it to a digital pin of the Arduino.';
Blockly.Msg.ARD_BUZNOTONE = 'No tone on buzzer';
Blockly.Msg.ARD_BUZOUTPUT_DEFAULT_NAME = 'MyBuzzer1';
Blockly.Msg.ARD_BUZNOTONE_TIP = 'Stop generating a tone on the buzzer';
Blockly.Msg.ARD_BUZOUTPUT_COMPONENT = 'Buzzer/Speaker';
Blockly.Msg.ARD_BUZSETTONE = 'Set tone on buzzer';
Blockly.Msg.ARD_TONEDURATION = 'and duration (ms)';
Blockly.Msg.ARD_TONEDURATION_TIP = 'Sets tone on a buzzer to the specified frequency within range 31 - 65535 and given duration in milliseconds. Careful: a durations continues, also during delays, a new tone can only be given if a previous tone is terminated!';
Blockly.Msg.ARD_TONE_WARNING2 = 'A duration must be positive (>0)';
Blockly.Msg.ARD_BUZSETPITCH = 'with pitch';
Blockly.Msg.ARD_TONEPITCH_TIP = 'Sets tone on a buzzer to the specified pitch and given duration in milliseconds. Careful: a durations continues, also during delays, a new tone can only be given if a previous tone is terminated!';
Blockly.Msg.ARD_BUZSELECTPITCH = 'Pitch';
Blockly.Msg.ARD_BUZSELECTPITCH_TIP = 'Select the pitch you want. This block returns a number which is the frequency of the selected pitch.';

/// Diorama strings
Blockly.Msg.ARD_DIORAMA_BOARD_TIP = 'The Ingegno Diorama board - See manual for info';
Blockly.Msg.ARD_DIO_BOARD_MISSING = 'No Diorama board present. Add it to the canvas!';
Blockly.Msg.ARD_DIORAMA_BTN_TIP = 'Diorama button code, executed in a loop once the button has been pressed';
Blockly.Msg.ARD_DIO_STOPBTN = 'Pushbutton 8: stop';
Blockly.Msg.ARD_DIO_SOUND_TIP = 'Change sound output of the Diorama board. If louder or quieter, we stop processing the button after the call.';
Blockly.Msg.ARD_DIO_LOUDER = 'Diorama: louder output';
Blockly.Msg.ARD_DIO_LESSLOUD = 'Diorama: less loud output';
Blockly.Msg.ARD_DIO_SETLOUDNESS = 'Diorama: set volume to (0-10):';
Blockly.Msg.ARD_DIO_SOUND_WARNING = 'Volume must be between 0 and 10!';
Blockly.Msg.ARD_DIO_PLAYTRACK = 'Play track number ';
Blockly.Msg.ARD_DIO_TRACK_TIP = 'If number 1, then play a track stored on SD card as "track001.mp3"';
Blockly.Msg.ARD_DIO_STOPTRACK = 'Stop playing';
Blockly.Msg.ARD_DIO_STOPTRACK_TIP = 'Immediately stop playing the track that is playing';
Blockly.Msg.ARD_DIO_TRACK_WARNING = 'Track must be a number between 1 and 100!';
Blockly.Msg.ARD_DIO_DISPLAYTEXT = 'Show on display: ';
Blockly.Msg.ARD_DIO_DISPLAYTEXT_TIP = 'Give a text of 8 characters to show on the diorama display';
Blockly.Msg.ARD_DIO_DISPLAYTEXT_WARNING = 'Text can only be 8 long, not longer!';
Blockly.Msg.ARD_DIO_TRACKPLAYING = 'track is playing';
Blockly.Msg.ARD_DIO_TRACKPLAYING_TIP = 'Return true if a track is still playing, false otherwise';
Blockly.Msg.ARD_DIO_RESETBTN = 'stop buttons';
Blockly.Msg.ARD_DIO_RESETBTN_TIP = 'Reset the buttons, so no button is considered pressed.';
Blockly.Msg.ARD_DIO_RESETBTNNR_TIP = 'Stop action of the given button.';
Blockly.Msg.ARD_COMMENT = 'Comment';
Blockly.Msg.ARD_COMMENT_TIP = 'Add the given text as comment to the Arduino code';
Blockly.Msg.ARD_DHTHUB = 'Temperature and humidity sensor';
Blockly.Msg.ARD_DHT_DEFAULT_NAME = 'TempRH_Sensor';
Blockly.Msg.ARD_DHTHUB_TIP= 'Block to assign to an Arduino pin a DHT type sensor';
Blockly.Msg.ARD_DHTHUB_READTEMP = '°C temperature at';
Blockly.Msg.ARD_DHT_READTEMP_TIP = 'Obtain the temperature in degree Celcius of a DHT sensor';
Blockly.Msg.ARD_DHTHUB_READRH = 'Relative Humidity at';
Blockly.Msg.ARD_DHT_READRH_TIP = 'Obtain the RH (Relative Humidity in %) as a value from 0 to 100 a DHT sensor';
Blockly.Msg.ARD_DHTHUB_READHEATINDEX = 'Heat Index at';
Blockly.Msg.ARD_DHT_READHEATINDEX_TIP = 'Obtain the Heat Index ( human-perceived equivalent temperature in °C) of a DHT sensor';
Blockly.Msg.ARD_DHT_COMPONENT = 'DHT sensor';
Blockly.Msg.ARD_7SEGMENT_COMPONENT = '7-Segment Display';
Blockly.Msg.ARD_7SEGMENT_COMPONENT_TIP = '7-Segment LED Display can be used to show numbers and some characters. It has 7 segments and 1 dot, requiring 8 digital pins on the Arduino to use.';
Blockly.Msg.ARD_7SEGMENT_COMPONENT_WARN = 'Pin used in segment %1 is also present in one of the other segments! Change the pin number.';
Blockly.Msg.ARD_7SEGMENT_WRITE = 'show number';
Blockly.Msg.ARD_7SEGMENT_WRITE_TIP = 'Write a specific number to the 7-segment display. Number must be between 0 and 9, otherwise nothing is shown.';
Blockly.Msg.ARD_7SEGMENT_WRITESEG = 'Set segment';
Blockly.Msg.ARD_7SEGMENT_WRITESEG_TIP = 'Set a specific segment of the 7-Segment display high';
Blockly.Msg.ARD_TFT_COMPONENT = 'TFT-Scherm';
Blockly.Msg.ARD_TFT_COMPONENT_TIP = 'The ST7735 1.8” Color TFT scherm. Scherm is 128x160 pixels.';
Blockly.Msg.COLOUR_RGB255_TOOLTIP = 'Create a colour with the specified amount of red, green, and blue. All values must be between 0 and 255. See https://www.google.be/search?q=color+picker';
Blockly.Msg.ARD_TFT_TEXT_WRITE = 'Write text';
Blockly.Msg.ARD_TFT_TEXT_COLOUR = 'Colour of the text';
Blockly.Msg.ARD_TFT_TEXT_SIZE = 'Size';
Blockly.Msg.ARD_TFT_TEXT_XPOS = 'X Position';
Blockly.Msg.ARD_TFT_TEXT_YPOS = 'Y Position';
Blockly.Msg.ARD_TFT_TEXT_TIP = 'Write a text to the screen in the given colour at the given position.';
Blockly.Msg.ARD_TFT_BG_COLOUR = 'Color of the background';
Blockly.Msg.ARD_TFT_BG_TIP = 'Fill the entire screen with the given colour';
Blockly.Msg.ARD_TFT_SPRITE_NAME = 'Sprite named';
Blockly.Msg.ARD_TFT_MAKE_LINE = 'Draw Line';
Blockly.Msg.ARD_TFT_LINE_COLOUR = 'Colour';
Blockly.Msg.ARD_TFT_LINE_XPOSBEGIN = 'X Position Start';
Blockly.Msg.ARD_TFT_LINE_YPOSBEGIN = 'Y Position Start';
Blockly.Msg.ARD_TFT_LINE_XPOSEND = 'X Position End';
Blockly.Msg.ARD_TFT_LINE_YPOSEND = 'Y Position End';
Blockly.Msg.ARD_TFT_LINE_TIP = 'Draw a line on the screen with the given coordinates in the given colour.';
Blockly.Msg.ARD_TFT_MAKE_RECT = 'Draw Rectangle';
Blockly.Msg.ARD_TFT_RECT_COLOUR = 'Colour';
Blockly.Msg.ARD_TFT_RECT_XPOSBEGIN = 'X Position Top Left';
Blockly.Msg.ARD_TFT_RECT_YPOSBEGIN = 'Y Position Top Left';
Blockly.Msg.ARD_TFT_RECT_WIDTH = 'Width';
Blockly.Msg.ARD_TFT_RECT_HEIGHT = 'Height';
Blockly.Msg.ARD_TFT_FILLED = 'Fill the drawing'
Blockly.Msg.ARD_TFT_RECT_TIP = 'Draw a rectangle on the screen with the given coordinates in the given colour. If Filled is checked the rectangle is filled, otherwise only an outline';
Blockly.Msg.ARD_TFT_MAKE_CIRC = 'Draw Circle';
Blockly.Msg.ARD_TFT_CIRC_XPOS = 'X Position Center';
Blockly.Msg.ARD_TFT_CIRC_YPOS = 'Y Position Center';
Blockly.Msg.ARD_TFT_CIRC_RADIUS = 'Radius';
Blockly.Msg.ARD_TFT_CIRC_HEIGHT = 'Height';
Blockly.Msg.ARD_TFT_CIRC_TIP = 'Draw a circle on the screen with the given coordinates in the given colour. If Filled is checked the circle is filled, otherwise only an outline';
Blockly.Msg.ARD_OLED_INIT = 'OLED Initialise';
Blockly.Msg.ARD_OLED_DEFAULT_NAME = 'OLED1';
Blockly.Msg.ARD_OLED_RESOLUTIE = 'with resolution';
Blockly.Msg.ARD_OLED = 'OLED';
Blockly.Msg.ARD_OLED_CONFIG_TIP = 'Define a display of the given resolution to use to write text to';
Blockly.Msg.ARD_OLED_CURSORX = 'set cursor position X';
Blockly.Msg.ARD_OLED_CURSORY = 'Y';
Blockly.Msg.ARD_OLED_PRINT = 'print text';
Blockly.Msg.ARD_OLED_PRINT_NUMBER = 'print number';
Blockly.Msg.ARD_OLED_PRINT_NUMBER_DIGITS = 'with #digits:';
Blockly.Msg.ARD_OLED_PRINT = 'print';
Blockly.Msg.ARD_OLED_FONT_SIZE = 'choose font size';
Blockly.Msg.ARD_OLED_FONT_TIP = 'Select the font size to use to write text from now on';
Blockly.Msg.ARD_OLED_PRINT_TIP = 'Prepare to show the given text on the display in the given size. You need to use the write block to actually see it!';
Blockly.Msg.ARD_OLED_WRITE = 'write to display';
Blockly.Msg.ARD_OLED_WRITE_TIP = 'After you have printed text on the display, use this block to actually show the text.';
Blockly.Msg.ARD_OLED_CLEAR = 'clear display';
Blockly.Msg.ARD_OLED_CLEAR_TIP = 'Before writing new text to the display, use this block to clear it first.';
Blockly.Msg.ARD_ARRAY_DEFAULT_NAME = 'Array1';
Blockly.Msg.ARD_ARRAY_CREATE_WITH_TOOLTIP = 'Create an array with any number of items';
Blockly.Msg.ARD_ARRAY_CREATE_TITLE0 = 'Create';
Blockly.Msg.ARD_ARRAY_CREATE_TITLE = 'array';
Blockly.Msg.ARD_ARRAY_CREATE_TITLE2 = 'with values';
Blockly.Msg.ARD_ARRAY_CREATE_LENGTH = 'of length';
Blockly.Msg.ARD_ARRAY_CREATE_LENGTH_TOOLTIP = 'Create an array containing the given number of elements';
Blockly.Msg.ARD_ARRAY_CREATE_WITH_INPUT_WITH = 'Create array with';
Blockly.Msg.ARD_ARRAY_CREATE_WITH_ITEM_TITLE = 'item';
Blockly.Msg.ARD_ARRAY_CREATE_WITH_ITEM_TOOLTIP = 'Add an item to the array.';
Blockly.Msg.ARD_ARRAY_CREATE_WITH_CONTAINER_TITLE_ADD = 'array';
Blockly.Msg.ARD_ARRAY_CREATE_WITH_CONTAINER_TOOLTIP = 'Add, remove, or reorder sections to reconfigure this array block.';
Blockly.Msg.ARD_ARRAY_NOT_INT = 'One of the values is not an integer';
Blockly.Msg.ARD_ARRAY_NOT_FLOAT = 'One of the values is not a numeric value';
Blockly.Msg.ARD_ARRAY_NOT_KNOWN = 'Unknown type of array given';
Blockly.Msg.ARD_ARRAY_NOT_NUMBER = 'Only assign numbers, not variables when defining an array!';
Blockly.Msg.ARD_ARRAY_LEN_ERR1 = 'Length of array must be 1 or more';
Blockly.Msg.ARD_ARRAY_LEN_ERR2 = 'Length of array must be an integer number';
Blockly.Msg.ARD_ARRAY_LEN_ERR3 = 'Length of array must be a number, not a variable';
Blockly.Msg.ARD_ARRAY_GETINDEX_ITEM = 'in Array variable';
Blockly.Msg.ARD_ARRAY_GETINDEX_AT = 'get element with index';
Blockly.Msg.ARD_ARRAY_GETINDEX_TOOLTIP = 'Obtain element in the array at given index. Index must be a number from 0 to the length minus 1!';
Blockly.Msg.ARD_ARRAY_IND_ERR1 = 'Index must be number >= 0';
Blockly.Msg.ARD_ARRAY_IND_ERR2 = 'Index must be number < length array';
Blockly.Msg.ARD_ARRAY_SETINDEX_ITEM = 'Set in Array variable';
Blockly.Msg.ARD_ARRAY_SETINDEX_AT = 'the element with index';
Blockly.Msg.ARD_ARRAY_SETINDEX_VALUE = 'to the value';
Blockly.Msg.ARD_ARRAY_SETINDEX_TOOLTIP = 'Set an element in the array at given index equal to the given value. Index must be a number from 0 to the length minus 1!';
