/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Blocks for TFT Screen.
 */


'use strict';

goog.provide('Blockly.Blocks.tft');

goog.require('Blockly.Blocks');

/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.tft.HUE = 350;


Blockly.Blocks['tft_config'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_TFT_COMPONENT)
        .appendField(
            new Blockly.FieldInstance('tft', 'TFT1', true, true, false), 'TFTNAME')                      
    this.setColour(350);
    this.setPreviousStatement(true, "ARD_COMP_BLOCK");
    this.setNextStatement(true, 'ARD_COMP_BLOCK');
    this.setTooltip(Blockly.Msg.ARD_7SEGMENT_COMPONENT_TIP);
    this.setHelpUrl("https://docs.google.com/document/d/1rd5WztljQ4R-4YQH1UzbRDuTeg8SeEte_eZYg9qlx8Y/edit?usp=sharing");
  }
,
  /**
   * Gets the variable type required.
   * @param {!string} varName Name of the variable selected in this block to
   *     check.
   * @return {string} String to indicate the variable type.
   */
  getVarType: function(varName) {
    return Blockly.Types.STRING;
  },
  /**
  * Called whenever anything on the workspace changes.
  * It checks/warns if the selected stepper instance has a config block.
  * @this Blockly.Block
  */
  onchange: function(event) {
      if (!this.workspace || event.type == Blockly.Events.MOVE ||
          event.type == Blockly.Events.UI) {
          return;  // Block deleted or irrelevant event
      }
  },
};

Blockly.Blocks['tft_text'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_TFT_COMPONENT)
        .appendField(
            new Blockly.FieldInstance('tft', 'TFT1', true, true, false), 'TFTNAME') ;
    this.appendValueInput("TFT_TEXT")
        .appendField("Schrijf tekst")
        .setCheck(Blockly.Types.TEXT.output)
        .setAlign(Blockly.ALIGN_RIGHT);
    //var colour = new Blockly.FieldColour('#ff0000');
    //colour.setColours(['rgb(255,0,0)', 'rgb(0,255,0)', 'rgb(0,0,255)', 'rgb(255,255,0)', 'rgb(255,0,179)', 'rgb(255,102,0)', 'rgb(210,0,255)', 'rgb(255,255,255)', 'rgb(0,0,0)']).setColumns(3);
    this.appendValueInput('TFT_COL')
        .appendField(Blockly.Msg.ARD_TFT_TEXT_COLOUR)
        .setCheck("Colour")
        .setAlign(Blockly.ALIGN_RIGHT);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_TFT_TEXT_SIZE)
        .appendField(
            new Blockly.FieldDropdown([['1', '1'], ['2', '2'], ['3', '3']]),
           'TFT_SIZE')
        .setAlign(Blockly.ALIGN_RIGHT);
    this.appendValueInput('TFT_X')
        .appendField(Blockly.Msg.ARD_TFT_TEXT_XPOS)
        .setCheck(Blockly.Types.NUMBER.checkList)
        .setAlign(Blockly.ALIGN_RIGHT);
    this.appendValueInput('TFT_Y')
        .appendField(Blockly.Msg.ARD_TFT_TEXT_YPOS)
        .setCheck(Blockly.Types.NUMBER.checkList)
        .setAlign(Blockly.ALIGN_RIGHT);
    this.setInputsInline(false);
    this.setPreviousStatement(true, 'ARD_BLOCK');
    this.setNextStatement(true, 'ARD_BLOCK');
    this.setColour(350);
    this.setTooltip(Blockly.Msg.ARD_TFT_TEXT_TIP);
    this.setHelpUrl("https://docs.google.com/document/d/1rd5WztljQ4R-4YQH1UzbRDuTeg8SeEte_eZYg9qlx8Y/edit?usp=sharing");
  },
    /**
    * Called whenever anything on the workspace changes.
    * It checks/warns if the selected stepper instance has a config block.
    * @this Blockly.Block
    */
    onchange: function(event) {
        if (!this.workspace || event.type == Blockly.Events.MOVE ||
            event.type == Blockly.Events.UI) {
            return;  // Block deleted or irrelevant event
        }

        var instanceName = this.getFieldValue('TFTNAME')
        if (Blockly.Instances.isInstancePresent(instanceName, 'tft', this)) {
          this.setWarningText(null);
        } else {
          // Set a warning to select a valid tft config block
          this.setWarningText(
            Blockly.Msg.ARD_COMPONENT_WARN1.replace(
                '%1', Blockly.Msg.ARD_TFT_COMPONENT).replace(
                    '%2', instanceName).replace(
                    '%1', instanceName));
        }
    },
    /**
    * Gets the variable type required.
    * @param {!string} varName Name of the variable selected in this block to
    *     check.
    * @return {string} String to indicate the variable type.
    */
    getVarType: function(varName) {
        return Blockly.Types.STRING;
    }
};

Blockly.Blocks['tft_backgroundcolor'] = {
  init: function() {        
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_TFT_COMPONENT)
        .appendField(
            new Blockly.FieldInstance('tft', 'TFT1', true, true, false), 'TFTNAME') ;
    this.appendValueInput('TFT_COL')
        .appendField(Blockly.Msg.ARD_TFT_BG_COLOUR)
        .setCheck("Colour")
        .setAlign(Blockly.ALIGN_RIGHT);
    this.setPreviousStatement(true, 'ARD_BLOCK');
    this.setNextStatement(true, 'ARD_BLOCK');
    this.setColour(350);
   this.setTooltip(Blockly.Msg.ARD_TFT_BG_TIP);
   this.setHelpUrl("https://docs.google.com/document/d/1rd5WztljQ4R-4YQH1UzbRDuTeg8SeEte_eZYg9qlx8Y/edit?usp=sharing");
  },
    /**
    * Called whenever anything on the workspace changes.
    * It checks/warns if the selected stepper instance has a config block.
    * @this Blockly.Block
    */
    onchange: function(event) {
        if (!this.workspace || event.type == Blockly.Events.MOVE ||
            event.type == Blockly.Events.UI) {
            return;  // Block deleted or irrelevant event
        }

        var instanceName = this.getFieldValue('TFTNAME')
        if (Blockly.Instances.isInstancePresent(instanceName, 'tft', this)) {
          this.setWarningText(null);
        } else {
          // Set a warning to select a valid tft config block
          this.setWarningText(
            Blockly.Msg.ARD_COMPONENT_WARN1.replace(
                '%1', Blockly.Msg.ARD_TFT_COMPONENT).replace(
                    '%2', instanceName).replace(
                    '%1', instanceName));
        }
    },
    /**
    * Gets the variable type required.
    * @param {!string} varName Name of the variable selected in this block to
    *     check.
    * @return {string} String to indicate the variable type.
    */
    getVarType: function(varName) {
        return Blockly.Types.STRING;
    }
};

Blockly.Blocks['tft_text'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_TFT_COMPONENT)
        .appendField(
            new Blockly.FieldInstance('tft', 'TFT1', true, true, false), 'TFTNAME') ;
    this.appendValueInput("TFT_TEXT")
        .appendField(Blockly.Msg.ARD_TFT_TEXT_WRITE)
        .setCheck(Blockly.Types.TEXT.output)
        .setAlign(Blockly.ALIGN_RIGHT);
    //var colour = new Blockly.FieldColour('#ff0000');
    //colour.setColours(['rgb(255,0,0)', 'rgb(0,255,0)', 'rgb(0,0,255)', 'rgb(255,255,0)', 'rgb(255,0,179)', 'rgb(255,102,0)', 'rgb(210,0,255)', 'rgb(255,255,255)', 'rgb(0,0,0)']).setColumns(3);
    this.appendValueInput('TFT_COL')
        .appendField(Blockly.Msg.ARD_TFT_TEXT_COLOUR)
        .setCheck("Colour")
        .setAlign(Blockly.ALIGN_RIGHT);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_TFT_TEXT_SIZE)
        .appendField(
            new Blockly.FieldDropdown([['1', '1'], ['2', '2'], ['3', '3']]),
           'TFT_SIZE')
        .setAlign(Blockly.ALIGN_RIGHT);
    this.appendValueInput('TFT_X')
        .appendField(Blockly.Msg.ARD_TFT_TEXT_XPOS)
        .setCheck(Blockly.Types.NUMBER.checkList)
        .setAlign(Blockly.ALIGN_RIGHT);
    this.appendValueInput('TFT_Y')
        .appendField(Blockly.Msg.ARD_TFT_TEXT_YPOS)
        .setCheck(Blockly.Types.NUMBER.checkList)
        .setAlign(Blockly.ALIGN_RIGHT);
    this.setInputsInline(false);
    this.setPreviousStatement(true, 'ARD_BLOCK');
    this.setNextStatement(true, 'ARD_BLOCK');
    this.setColour(350);
    this.setTooltip(Blockly.Msg.ARD_TFT_TEXT_TIP);
    this.setHelpUrl("https://docs.google.com/document/d/1rd5WztljQ4R-4YQH1UzbRDuTeg8SeEte_eZYg9qlx8Y/edit?usp=sharing");
  },
    /**
    * Called whenever anything on the workspace changes.
    * It checks/warns if the selected stepper instance has a config block.
    * @this Blockly.Block
    */
    onchange: function(event) {
        if (!this.workspace || event.type == Blockly.Events.MOVE ||
            event.type == Blockly.Events.UI) {
            return;  // Block deleted or irrelevant event
        }

        var instanceName = this.getFieldValue('TFTNAME')
        if (Blockly.Instances.isInstancePresent(instanceName, 'tft', this)) {
          this.setWarningText(null);
        } else {
          // Set a warning to select a valid tft config block
          this.setWarningText(
            Blockly.Msg.ARD_COMPONENT_WARN1.replace(
                '%1', Blockly.Msg.ARD_TFT_COMPONENT).replace(
                    '%2', instanceName).replace(
                    '%1', instanceName));
        }
    },
    /**
    * Gets the variable type required.
    * @param {!string} varName Name of the variable selected in this block to
    *     check.
    * @return {string} String to indicate the variable type.
    */
    getVarType: function(varName) {
        return Blockly.Types.STRING;
    }
};

Blockly.Blocks['tft_sprite8x8'] = {
  init: function() {
    this.appendValueInput('SPRITENAME')
        .setCheck(Blockly.Types.TEXT.output)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.ARD_TFT_COMPONENT)
        .appendField(
            new Blockly.FieldInstance('tft', 'TFT1', true, true, false), 'TFTNAME')
        .appendField(Blockly.Msg.ARD_TFT_SPRITE_NAME) ;
    this.appendDummyInput()
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0101')
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0102')
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0103')
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0104')
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0105') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0106') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0107') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0108');
    this.appendDummyInput()
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0201')
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0202')
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0203') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0204') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0205') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0206') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0207') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0208');
    this.appendDummyInput()
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0301')
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0302')
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0303') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0304') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0305') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0306') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0307') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0308');
    this.appendDummyInput()
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0401')
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0402')
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0403') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0404') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0405') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0406') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0407') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0408');
    this.appendDummyInput()
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0501')
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0502')
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0503') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0504') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0505') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0506') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0507') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0508');
    this.appendDummyInput()
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0601')
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0602')
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0603') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0604') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0605') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0606') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0607') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0608');
    this.appendDummyInput()
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0701')
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0702')
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0703') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0704') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0705') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0706') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0707') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0708');
    this.appendDummyInput()
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0801')
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0802')
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0803') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0804') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0805') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0806') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0807') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0808');
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_TFT_TEXT_SIZE)
        .appendField(
            new Blockly.FieldDropdown([['1', '1'], ['2', '2'], ['3', '3']]),
           'TFT_SIZE')
        .setAlign(Blockly.ALIGN_RIGHT);
    this.appendValueInput('TFT_X')
        .appendField(Blockly.Msg.ARD_TFT_TEXT_XPOS)
        .setCheck(Blockly.Types.NUMBER.checkList)
        .setAlign(Blockly.ALIGN_RIGHT);
    this.appendValueInput('TFT_Y')
        .appendField(Blockly.Msg.ARD_TFT_TEXT_YPOS)
        .setCheck(Blockly.Types.NUMBER.checkList)
        .setAlign(Blockly.ALIGN_RIGHT);
    this.setPreviousStatement(true, 'ARD_BLOCK');
    this.setNextStatement(true, 'ARD_BLOCK');
    this.setColour(350);
   this.setTooltip(Blockly.Msg.ARD_TFT_BG_TIP);
   this.setHelpUrl("https://docs.google.com/document/d/1rd5WztljQ4R-4YQH1UzbRDuTeg8SeEte_eZYg9qlx8Y/edit?usp=sharing");
  },
    /**
    * Called whenever anything on the workspace changes.
    * It checks/warns if the selected stepper instance has a config block.
    * @this Blockly.Block
    */
    onchange: function(event) {
        if (!this.workspace || event.type == Blockly.Events.MOVE ||
            event.type == Blockly.Events.UI) {
            return;  // Block deleted or irrelevant event
        }

        var instanceName = this.getFieldValue('TFTNAME')
        if (Blockly.Instances.isInstancePresent(instanceName, 'tft', this)) {
          this.setWarningText(null);
        } else {
          // Set a warning to select a valid tft config block
          this.setWarningText(
            Blockly.Msg.ARD_COMPONENT_WARN1.replace(
                '%1', Blockly.Msg.ARD_TFT_COMPONENT).replace(
                    '%2', instanceName).replace(
                    '%1', instanceName));
        }
    },
    /**
    * Gets the variable type required.
    * @param {!string} varName Name of the variable selected in this block to
    *     check.
    * @return {string} String to indicate the variable type.
    */
    getVarType: function(varName) {
        return Blockly.Types.STRING;
    }
};

Blockly.Blocks['tft_sprite16x16'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_TFT_COMPONENT)
        .appendField(
            new Blockly.FieldInstance('tft', 'TFT1', true, true, false), 'TFTNAME') ;
    this.appendDummyInput()
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0101')
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0102')
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0103')
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0104')
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0105') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0106') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0107') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0108') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0109') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0110') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0111') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0112') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0113') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0114') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0115') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0116') 
    this.appendDummyInput()
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0201')
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0202')
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0203') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0204') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0205') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0206') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0207') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0208') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0209') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0210') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0211') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0212') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0213') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0214') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0215') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0216');
    this.appendDummyInput()
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0301')
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0302')
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0303') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0304') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0305') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0306') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0307') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0308') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0309') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0310') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0311') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0312') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0313') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0314') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0315') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0316');
    this.appendDummyInput()
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0401')
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0402')
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0403') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0404') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0405') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0406') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0407') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0408') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0409') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0410') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0411') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0412') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0413') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0414') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0415') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0416');
    this.appendDummyInput()
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0501')
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0502')
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0503') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0504') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0505') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0506') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0507') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0508') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0509') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0510') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0511') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0512') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0513') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0514') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0515') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0516');
    this.appendDummyInput()
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0601')
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0602')
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0603') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0604') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0605') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0606') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0607') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0608') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0609') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0610') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0611') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0612') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0613') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0614') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0615') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0616');
    this.appendDummyInput()
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0701')
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0702')
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0703') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0704') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0705') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0706') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0707') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0708') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0709') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0710') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0711') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0712') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0713') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0714') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0715') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0716');
    this.appendDummyInput()
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0801')
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0802')
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0803') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0804') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0805') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0806') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0807') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0808') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0809') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0810') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0811') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0812') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0813') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0814') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0815') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0816');
    this.appendDummyInput()
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0901')
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0902')
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0903') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0904') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0905') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0906') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0907') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0908') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0909') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0910') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0911') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0912') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0913') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0914') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0915') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp0916');
    this.appendDummyInput()
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1001')
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1002')
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1003') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1004') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1005') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1006') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1007') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1008') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1009') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1010') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1011') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1012') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1013') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1014') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1015') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1016');
    this.appendDummyInput()
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1101')
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1102')
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1103') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1104') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1105') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1106') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1107') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1108') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1109') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1110') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1111') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1112') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1113') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1114') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1115') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1116');
    this.appendDummyInput()
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1201')
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1202')
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1203') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1204') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1205') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1206') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1207') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1208') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1209') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1210') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1211') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1212') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1213') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1214') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1215') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1216');
    this.appendDummyInput()
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1301')
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1302')
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1303') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1304') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1305') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1306') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1307') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1308') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1309') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1310') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1311') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1312') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1313') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1314') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1315') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1316');
    this.appendDummyInput()
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1401')
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1402')
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1403') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1404') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1405') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1406') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1407') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1408') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1409') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1410') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1411') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1412') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1413') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1414') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1415') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1416');
    this.appendDummyInput()
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1501')
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1502')
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1503') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1504') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1505') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1506') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1507') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1508') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1509') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1510') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1511') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1512') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1513') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1514') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1515') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1516');
    this.appendDummyInput()
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1601')
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1602')
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1603') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1604') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1605') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1606') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1607') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1608') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1609') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1610') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1611') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1612') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1613') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1614') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1615') 
        .appendField(new Blockly.FieldColour('#ff0000'), 'sp1616');
    this.setPreviousStatement(true, 'ARD_BLOCK');
    this.setNextStatement(true, 'ARD_BLOCK');
    this.setColour(350);
   this.setTooltip(Blockly.Msg.ARD_TFT_BG_TIP);
   this.setHelpUrl("https://docs.google.com/document/d/1rd5WztljQ4R-4YQH1UzbRDuTeg8SeEte_eZYg9qlx8Y/edit?usp=sharing");
  },
    /**
    * Called whenever anything on the workspace changes.
    * It checks/warns if the selected stepper instance has a config block.
    * @this Blockly.Block
    */
    onchange: function(event) {
        if (!this.workspace || event.type == Blockly.Events.MOVE ||
            event.type == Blockly.Events.UI) {
            return;  // Block deleted or irrelevant event
        }

        var instanceName = this.getFieldValue('TFTNAME')
        if (Blockly.Instances.isInstancePresent(instanceName, 'tft', this)) {
          this.setWarningText(null);
        } else {
          // Set a warning to select a valid tft config block
          this.setWarningText(
            Blockly.Msg.ARD_COMPONENT_WARN1.replace(
                '%1', Blockly.Msg.ARD_TFT_COMPONENT).replace(
                    '%2', instanceName).replace(
                    '%1', instanceName));
        }
    },
    /**
    * Gets the variable type required.
    * @param {!string} varName Name of the variable selected in this block to
    *     check.
    * @return {string} String to indicate the variable type.
    */
    getVarType: function(varName) {
        return Blockly.Types.STRING;
    }
};