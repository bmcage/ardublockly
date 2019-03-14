// Copyright 2012 Google Inc.  Apache License 2.0

'use strict';

goog.provide('Blockly.Blocks.array');

goog.require('Blockly.Blocks');

Blockly.Blocks.array={};

Blockly.Blocks.array.HUE=260;

Blockly.Blocks['array_create_with'] = {
  init:function(){
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_ARRAY_CREATE_TITLE0)
        .appendField(new Blockly.FieldDropdown(
          [[Blockly.Msg.ARD_TYPE_NUMBER, 'int'],
           [Blockly.Msg.ARD_TYPE_DECIMAL,'float']]), 'NUMBER_TYPE')
        .appendField(Blockly.Msg.ARD_ARRAY_CREATE_TITLE)
        .appendField(
            new Blockly.FieldInstance('Array',
                                      Blockly.Msg.ARD_ARRAY_DEFAULT_NAME,
                                      true, true, false),
            'ARRAYNAME')
        .appendField(Blockly.Msg.ARD_ARRAY_CREATE_TITLE2);
    this.setHelpUrl( 'https://www.arduino.cc/reference/en/language/variables/data-types/array/');
    this.setColour(Blockly.Blocks.array.HUE);
    this.itemCount_=3;
    this.updateShape_();
    this.setPreviousStatement(true, "ARD_COMP_BLOCK");
    this.setNextStatement(true, 'ARD_COMP_BLOCK');
    this.setMutator(new Blockly.Mutator(["array_create_with_item"]));
    this.setTooltip(Blockly.Msg.ARD_ARRAY_CREATE_WITH_TOOLTIP);
  },
  /**
   * Returns the array instance name.
   * @return {!string} Serial instance name.
   * @this Blockly.Block
   */
  getArrayInstance: function() {
    return this.getFieldValue('ARRAYNAME');
  },
  /**
   * Returns the length of this array instance.
   * @return {!string} Serial instance name.
   * @this Blockly.Block
   */
  getLengthArrayInstance: function() {
    return this.itemCount_;
  },
  /**
   * Gets the variable type required.
   * @param {!string} varName Name of the variable selected in this block to
   *     check.
   * @return {string} String to indicate the variable type.
   */
  getVarType: function(varName) {
    return Blockly.Types.NUMBER;
  },
  mutationToDom:function(){
    var a=document.createElement("mutation");
    a.setAttribute("items",this.itemCount_);
    return a
  },
  domToMutation:function(a){
    this.itemCount_=parseInt(a.getAttribute("items"),
10);
    this.updateShape_()
  },
  decompose:function(a){
    var b=Blockly.Block.obtain(a,"array_create_with_container");
    b.initSvg();
    for(var d=b.getInput("STACK").connection,c=0;c<this.itemCount_;c++){
      var e=Blockly.Block.obtain(a,"array_create_with_item");
      e.initSvg();
      d.connect(e.previousConnection);
      d=e.nextConnection
    }
    return b
  },
  compose:function(a){
    a=a.getInputTargetBlock("STACK");
    for(var b=[],d=0;a;)
      b[d]=a.valueConnection_, a=a.nextConnection&&a.nextConnection.targetBlock(), d++;
    this.itemCount_=d;
    this.updateShape_();
    for(d=0;d<this.itemCount_;d++)
      b[d]&&this.getInput("ADD"+d).connection.connect(b[d])
  },
  saveConnections:function(a){
    a=a.getInputTargetBlock("STACK");
    for(var b=0;a;){
      var d=this.getInput("ADD"+b);
      a.valueConnection_=d&&d.connection.targetConnection;
      b++;
      a=a.nextConnection&&a.nextConnection.targetBlock()
    }
  },
  updateShape_:function(){    
    for(var a=0;this.getInput("ADD"+a);) 
      this.removeInput("ADD"+a),a++;
    if(0<this.itemCount_) 
      for(a=0;a<this.itemCount_;a++){
        var b=this.appendValueInput("ADD"+a); 
      }
  }
};

Blockly.Blocks['array_create_with_item'] = {
  init:function(){
    this.setColour(Blockly.Blocks.array.HUE);
    this.appendDummyInput()
      .appendField(Blockly.Msg.ARD_ARRAY_CREATE_WITH_ITEM_TITLE);
    this.setPreviousStatement(!0);
    this.setNextStatement(!0);
    this.setTooltip(Blockly.Msg.ARD_ARRAY_CREATE_WITH_ITEM_TOOLTIP);
    this.contextMenu=!1
  }
};

Blockly.Blocks['array_create_with_container'] = {
  init:function(){
    this.setColour(Blockly.Blocks.array.HUE);
    this.appendDummyInput()
      .appendField(Blockly.Msg.ARD_ARRAY_CREATE_WITH_CONTAINER_TITLE_ADD);
    this.appendStatementInput("STACK");
    this.setTooltip(Blockly.Msg.ARD_ARRAY_CREATE_WITH_CONTAINER_TOOLTIP);
    this.contextMenu=!1
  }
};


Blockly.Blocks['array_create_with_length'] = {
  init:function(){
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_ARRAY_CREATE_TITLE0)
        .appendField(new Blockly.FieldDropdown(
          [[Blockly.Msg.ARD_TYPE_NUMBER, 'int'],
           [Blockly.Msg.ARD_TYPE_DECIMAL,'float']]), 'NUMBER_TYPE')
        .appendField(Blockly.Msg.ARD_ARRAY_CREATE_TITLE)
        .appendField(
            new Blockly.FieldInstance('Array',
                                      Blockly.Msg.ARD_ARRAY_DEFAULT_NAME,
                                      true, true, false),
            'ARRAYNAME')
        .appendField(Blockly.Msg.ARD_ARRAY_CREATE_LENGTH);
    this.appendValueInput('LENGTH')
        .setCheck(Blockly.Types.NUMBER.output);
    this.setInputsInline(true);
    this.setHelpUrl( 'https://www.arduino.cc/reference/en/language/variables/data-types/array/');
    this.setColour(Blockly.Blocks.array.HUE);
    this.setPreviousStatement(true, "ARD_COMP_BLOCK");
    this.setNextStatement(true, 'ARD_COMP_BLOCK');
    this.setTooltip(Blockly.Msg.ARD_ARRAY_CREATE_LENGTH_TOOLTIP);
  },
  /**
   * Returns the array instance name.
   * @return {!string} Serial instance name.
   * @this Blockly.Block
   */
  getArrayInstance: function() {
    return this.getFieldValue('ARRAYNAME');
  },
  /**
   * Returns the length of this array instance.
   * @return {!string} Serial instance name.
   * @this Blockly.Block
   */
  getLengthArrayInstance: function() {
    return Blockly.Arduino.valueToCode(this, 'LENGTH',
                                             Blockly.Arduino.ORDER_ATOMIC) || '3';
  },
  /**
   * Gets the variable type required.
   * @param {!string} varName Name of the variable selected in this block to
   *     check.
   * @return {string} String to indicate the variable type.
   */
  getVarType: function(varName) {
    return Blockly.Types.NUMBER;
  }
};

Blockly.Blocks['array_getIndex'] = {
  init:function(){
    this.setHelpUrl('https://www.arduino.cc/reference/en/language/variables/data-types/array/');
    this.setColour(Blockly.Blocks.array.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_ARRAY_GETINDEX_ITEM)
        .appendField(
            new Blockly.FieldInstance('Array',
                                      Blockly.Msg.ARD_ARRAY_DEFAULT_NAME,
                                      false, true, false),
            'ARRAYNAME');
    this.appendValueInput("AT")
        .setCheck(Blockly.Types.NUMBER.output)
        .appendField(Blockly.Msg.ARD_ARRAY_GETINDEX_AT);
    this.setInputsInline(true);
    this.setOutput(true, Blockly.Types.NUMBER.output);
    this.setTooltip(Blockly.Msg.ARD_ARRAY_GETINDEX_TOOLTIP);
  },
  /** @return {!string} The type of return value for the block, an integer. */
  getBlockType: function() {
    // type of block depends on selected type in the array defenition
    var instanceName = this.getFieldValue('ARRAYNAME');
    if (Blockly.Instances.isInstancePresent(instanceName, 'Array', this)) {
      // Iterate through top level blocks to find array instance
      var blocks = Blockly.mainWorkspace.getAllBlocks();
      var setupInstancePresent = false;
      var artype = 'int';
      for (var x = 0; x < blocks.length; x++) {
        var func = blocks[x].getArrayInstance;
        if (func) {
          var setupBlockInstanceName = func.call(blocks[x]);
          if (instanceName == setupBlockInstanceName) {
            //obtain type
            artype = blocks[x].getFieldValue('NUMBER_TYPE') || 'int';
            break;
          }
        }
      }
      if (artype == 'int') return Blockly.Types.NUMBER;
      else if (artype == 'float') return Blockly.Types.DECIMAL;
      else return Blockly.Types.NUMBER;
    } else {
      //not present, assume it will be number
      return Blockly.Types.NUMBER;
    }
  },
  /**
   * Gets the variable type required.
   * @param {!string} varName Name of the variable selected in this block to
   *     check.
   * @return {string} String to indicate the variable type.
   */
  getVarType: function(varName) {
    return Blockly.Types.NUMBER;
   
  },
  /**
   * Called whenever anything on the workspace changes.
   * It checks the instances of analogsensor config and attaches a warning to this
   * block if not valid data is found.
   * @this Blockly.Block
   */
  onchange: function(event) {
    if (!this.workspace || event.type == Blockly.Events.MOVE ||
        event.type == Blockly.Events.UI) {
        return;  // Block deleted or irrelevant event
    }
    
    //verify no two instances present
    var instanceName = this.getFieldValue('ARRAYNAME')
    if (Blockly.Instances.isInstancePresent(instanceName, 'Array', this)) {
      this.setWarningText(null, 'instance');
    } else {
      // Set a warning to select a valid config block
      this.setWarningText(
        Blockly.Msg.ARD_COMPONENT_WARN1.replace(
            '%1', Blockly.Msg.ARD_TYPE_ARRAY).replace(
                '%2', instanceName), 'instance');
    } 
  }
};


Blockly.Blocks['array_setIndex'] = {
  init:function(){
    this.setHelpUrl('https://www.arduino.cc/reference/en/language/variables/data-types/array/');
    this.setColour(Blockly.Blocks.array.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_ARRAY_SETINDEX_ITEM)
        .appendField(
            new Blockly.FieldInstance('Array',
                                      Blockly.Msg.ARD_ARRAY_DEFAULT_NAME,
                                      false, true, false),
            'ARRAYNAME');
    this.appendValueInput("AT")
        .setCheck(Blockly.Types.NUMBER.output)
        .appendField(Blockly.Msg.ARD_ARRAY_SETINDEX_AT);
    this.appendValueInput("VALUE")
        .setCheck(Blockly.Types.NUMBER.output)
        .appendField(Blockly.Msg.ARD_ARRAY_SETINDEX_VALUE);
    this.setPreviousStatement(true, "ARD_BLOCK");
    this.setNextStatement(true, 'ARD_BLOCK');
    this.setInputsInline(true);
    //this.setOutput(true, Blockly.Types.NUMBER.output);
    this.setTooltip(Blockly.Msg.ARD_ARRAY_SETINDEX_TOOLTIP);
  },
  /** @return {!string} The type of return value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  },
  /**
   * Gets the variable type required.
   * @param {!string} varName Name of the variable selected in this block to
   *     check.
   * @return {string} String to indicate the variable type.
   */
  getVarType: function(varName) {
    return Blockly.Types.NUMBER;
  },
  /**
   * Called whenever anything on the workspace changes.
   * It checks the instances of analogsensor config and attaches a warning to this
   * block if not valid data is found.
   * @this Blockly.Block
   */
  onchange: function(event) {
    if (!this.workspace || event.type == Blockly.Events.MOVE ||
        event.type == Blockly.Events.UI) {
        return;  // Block deleted or irrelevant event
    }

    var instanceName = this.getFieldValue('ARRAYNAME')
    if (Blockly.Instances.isInstancePresent(instanceName, 'Array', this)) {
      this.setWarningText(null, 'instance');
    } else {
      // Set a warning to select a valid config block
      this.setWarningText(
        Blockly.Msg.ARD_COMPONENT_WARN1.replace(
            '%1', Blockly.Msg.ARD_TYPE_ARRAY).replace(
                '%2', instanceName), 'instance');
    }
  }
};


Blockly.Blocks['array_getLength'] = {
  init:function(){
    this.setHelpUrl('https://www.arduino.cc/reference/en/language/variables/data-types/array/');
    this.setColour(Blockly.Blocks.array.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_ARRAY_GETLENGTH)
        .appendField(
            new Blockly.FieldInstance('Array',
                                      Blockly.Msg.ARD_ARRAY_DEFAULT_NAME,
                                      false, true, false),
            'ARRAYNAME');
    this.setInputsInline(true);
    this.setOutput(true, Blockly.Types.NUMBER.output);
    this.setTooltip(Blockly.Msg.ARD_ARRAY_GETLENGTH_TOOLTIP);
  },
  /** @return {!string} The type of return value for the block, an integer. */
  getBlockType: function() {
    //not present, assume it will be number
    return Blockly.Types.NUMBER;
  },
  /**
   * Gets the variable type required.
   * @param {!string} varName Name of the variable selected in this block to
   *     check.
   * @return {string} String to indicate the variable type.
   */
  getVarType: function(varName) {
    return Blockly.Types.NUMBER;
   
  },
  /**
   * Called whenever anything on the workspace changes.
   * It checks the instances of analogsensor config and attaches a warning to this
   * block if not valid data is found.
   * @this Blockly.Block
   */
  onchange: function(event) {
    if (!this.workspace || event.type == Blockly.Events.MOVE ||
        event.type == Blockly.Events.UI) {
        return;  // Block deleted or irrelevant event
    }
    
    //verify no two instances present
    var instanceName = this.getFieldValue('ARRAYNAME')
    if (Blockly.Instances.isInstancePresent(instanceName, 'Array', this)) {
      this.setWarningText(null, 'instance');
    } else {
      // Set a warning to select a valid config block
      this.setWarningText(
        Blockly.Msg.ARD_COMPONENT_WARN1.replace(
            '%1', Blockly.Msg.ARD_TYPE_ARRAY).replace(
                '%2', instanceName), 'instance');
    } 
  }
};

