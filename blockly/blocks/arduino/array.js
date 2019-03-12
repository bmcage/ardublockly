// Copyright 2012 Google Inc.  Apache License 2.0

'use strict';

goog.provide('Blockly.Blocks.array');

goog.require('Blockly.Blocks');

Blockly.Blocks.array={};

Blockly.Blocks.array.HUE=260;

Blockly.Blocks['array_create_with'] = {
  init:function(){
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_ARRAY_CREATE_TITLE)
        .appendField(
            new Blockly.FieldInstance('IntArray',
                                      Blockly.Msg.ARD_INTARRAY_DEFAULT_NAME,
                                      true, true, false),
            'INTARRAYNAME')
        .appendField(Blockly.Msg.ARD_ARRAY_CREATE_TITLE2);
    this.setHelpUrl( 'https://www.arduino.cc/reference/en/language/variables/data-types/array/');
    this.setColour(Blockly.Blocks.array.HUE);
    this.itemCount_=3;
    this.updateShape_();
    this.setOutput(true, Blockly.Types.NUMBER.output);
    this.setMutator(new Blockly.Mutator(["array_create_with_item"]));
    this.setTooltip(Blockly.Msg.ARD_ARRAY_CREATE_WITH_TOOLTIP);
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
  /** @return {!string} The type of return value for the block, an integer. */
  getBlockType: function() {
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
    //if (this.getInput("EMPTY")) 
    //  this.removeInput("EMPTY");
    
    for(var a=0;this.getInput("ADD"+a);) 
      this.removeInput("ADD"+a),a++;
    if(0<this.itemCount_) 
     // this.appendDummyInput("EMPTY").appendField(Blockly.Msg.ARD_ARRAY_CREATE_EMPTY_TITLE);
    //else 
      for(a=0;a<this.itemCount_;a++){
        var b=this.appendValueInput("ADD"+a); 
        //0==a&&b.appendField(Blockly.Msg.ARD_ARRAY_CREATE_WITH_INPUT_WITH)
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

Blockly.Blocks['array_getIndex'] = {
  init:function(){
    this.setHelpUrl('https://www.arduino.cc/reference/en/language/variables/data-types/array/');
    this.setColour(Blockly.Blocks.array.HUE);
    this.appendValueInput("ITEM")
        .setCheck(Blockly.Types.NUMBER.output)
        .appendField(Blockly.Msg.ARD_ARRAY_GETINDEX_ITEM);
    this.appendValueInput("AT")
        .setCheck(Blockly.Types.NUMBER.output)
        .appendField(Blockly.Msg.ARD_ARRAY_GETINDEX_AT);
    this.setInputsInline(!0);
    this.setOutput(true, Blockly.Types.NUMBER.output);
    this.setTooltip(Blockly.Msg.ARD_ARRAY_GETINDEX_TOOLTIP)
  },
  /** @return {!string} The type of return value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  }
};