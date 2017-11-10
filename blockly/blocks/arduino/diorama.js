/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Block for the Ingegno Diorama functions.
 *     The Diorama is an Arduino Mega connected to 
 *     1. A TM1638 board
 *     2. SD Card shield
 *     3. Stepper Motor
 */
'use strict';

goog.provide('Blockly.Blocks.diorama');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');


/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.diorama.HUE = '#0066FF';
