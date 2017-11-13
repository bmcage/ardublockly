/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview XML toolbox embedded into a JavaScript text string.
 */
'use strict';

/** Create a namespace for the application. */
var Blockly4Arduino = Blockly4Arduino || {};


/**
 * Blockly main workspace.
 * @type Blockly.WorkspaceSvg
 */
Blockly4Arduino.workspace = null;

/**
 * List of tab names.
 * @private
 */
var TABS_ = ['blocks', 'codebender', 'xml'];

var selected = 'blocks';


/** @return {!boolean} Indicates if a block is currently being dragged. */
Blockly4Arduino.blocklyIsDragging = function() {
  return (Blockly.dragMode_ != 0) ? true : false;
};

/** Closes the toolbox block container sub-menu. */
Blockly4Arduino.blocklyCloseToolbox = function() {
  Blockly4Arduino.workspace.toolbox_.flyout_.hide();
};

/** @return {!integer} The width of the blockly workspace toolbox. */
Blockly4Arduino.blocklyToolboxWidth = function() {
  return Blockly4Arduino.workspace.toolbox_.width;
};

/**
 * Parses the XML from its argument input to generate and replace the blocks
 * in the Blockly workspace.
 * @param {!string} blocksXml String of XML code for the blocks.
 * @return {!boolean} Indicates if the XML into blocks parse was successful.
 */
Blockly4Arduino.replaceBlocksfromXml = function(blocksXml) {
  var xmlDom = null;
  try {
    xmlDom = Blockly.Xml.textToDom(blocksXml);
  } catch (e) {
    return false;
  }
  Blockly4Arduino.workspace.clear();
  var sucess = false;
  if (xmlDom) {
    sucess = Blockly4Arduino.loadBlocksfromXmlDom(xmlDom);
  }
  return sucess;
};


/** Binds the event listeners relevant to Blockly. */
Blockly4Arduino.bindBlocklyEventListeners = function() {
  Blockly4Arduino.workspace.addChangeListener(function(event) {
    if (event.type != Blockly.Events.UI) {
      Blockly4Arduino.renderContent();
    }
  });
  // Ensure the Blockly workspace resizes accordingly
  window.addEventListener('resize',
      function() { Blockly.asyncSvgResize(Blockly4Arduino.workspace); }, false);
};


/** Initialises all the design related JavaScript. */
Blockly4Arduino.designJsInit = function() {
  Blockly4Arduino.materializeJsInit();
  Blockly4Arduino.resizeToggleToolboxBotton();
};

/**
 * Initialises all required components from materialize framework.
 * The be executed on document ready.
 */
Blockly4Arduino.materializeJsInit = function() {

};

/** Binds the event listeners relevant to the page design. */
Blockly4Arduino.bindDesignEventListeners = function() {
  // Resize blockly workspace on window resize
  window.addEventListener(
      'resize', Blockly4Arduino.resizeBlocklyWorkspace, false);
  // Display/hide the XML load button when the XML collapsible header is clicked
  //document.getElementById('xml_collapsible_header').addEventListener(
  //    'click', Blockly4Arduino.buttonLoadXmlCodeDisplay);
};


/**
 * Sets the toolbox HTML element to be display or not and change the visibility
 * button to reflect the new state.
 * When the toolbox is visible it should display the "visibility-off" icon with
 * no background, and the opposite when toolbox is hidden.
 * @param {!boolean} show Indicates if the toolbox should be set visible.
 */
Blockly4Arduino.displayToolbox = function(show) {
  var toolbox = $('.blocklyToolboxDiv');
  var toolboxTree = $('.blocklyTreeRoot');
  var button = document.getElementById('button_toggle_toolbox');
  var buttonIcon = document.getElementById('button_toggle_toolbox_icon');

  // Because firing multiple clicks can confuse the animation, create an overlay
  // element to stop clicks (due to the materialize framework controlling the
  // event listeners is better to do it this way for easy framework update).
  var elLocation = $('#button_toggle_toolbox').offset();
  jQuery('<div/>', {
      id: 'toolboxButtonScreen',
      css: {
        position: 'fixed',
        top: elLocation.top,
        left: elLocation.left,
        height: $('#button_toggle_toolbox').height(),
        width: $('#button_toggle_toolbox').width(),
        cursor: 'pointer',
        zIndex: 12
      },
  }).appendTo('body');

  var classOn = 'button_toggle_toolbox_on';
  var classOff = 'button_toggle_toolbox_off';
  var visOn = 'mdi-action-visibility';
  var visOff = 'mdi-action-visibility-off';
  if (show) {
    toolbox.show();
    button.className = button.className.replace(classOn, classOff);
    buttonIcon.className = buttonIcon.className.replace(visOn, visOff);
    toolbox.animate(
        {height: document.getElementById('content_blocks').style.height}, 300,
        function() {
          toolboxTree.css('overflow-y', 'auto');
          window.dispatchEvent(new Event('resize'));
          $('#toolboxButtonScreen').remove();
        });
  } else {
    toolboxTree.css('overflow-y', 'hidden');
    buttonIcon.className = buttonIcon.className.replace(visOff, visOn);
    toolbox.animate({height: 38}, 300, function() {
      button.className = button.className.replace(classOff, classOn);
      toolbox.fadeOut(350, 'linear', function() {
          window.dispatchEvent(new Event('resize'));
        setTimeout(function() { toolbox.height(38); }, 100);
        $('#toolboxButtonScreen').remove();
      });
    });
  }
};


/**
 * Resizes the button to toggle the toolbox visibility to the width of the
 * toolbox.
 * The toolbox width does not change with workspace width, so safe to do once.
 */
Blockly4Arduino.resizeToggleToolboxBotton = function() {
  window.dispatchEvent(new Event('resize'));
  var button = $('#button_toggle_toolbox');
  // Sets the toolbox toggle button width to that of the toolbox
  if (Blockly4Arduino.isToolboxVisible() && Blockly4Arduino.blocklyToolboxWidth()) {
    // For some reason normal set style and getElementById didn't work
    button.width(Blockly4Arduino.blocklyToolboxWidth());
    /** TODO NOT WORKING 
    button[0].style.display = '';  */
  }
};

/** Resizes the container for the Blockly workspace. */
Blockly4Arduino.resizeBlocklyWorkspace = function() {
    /** NOT NEEDED 
    
  var contentBlocks = document.getElementById('content_blocks');
  var wrapperPanelSize =
      Blockly4Arduino.getBBox_(document.getElementById('blocks_panel'));

  contentBlocks.style.top = wrapperPanelSize.y + 'px';
  contentBlocks.style.left = wrapperPanelSize.x + 'px';
  // Height and width need to be set, read back, then set again to
  // compensate for scrollbars.
  contentBlocks.style.height = wrapperPanelSize.height + 'px';
  contentBlocks.style.height =
      (2 * wrapperPanelSize.height - contentBlocks.offsetHeight) + 'px';
  contentBlocks.style.width = wrapperPanelSize.width + 'px';
  contentBlocks.style.width =
      (2 * wrapperPanelSize.width - contentBlocks.offsetWidth) + 'px';
      */
};



/**
 * Switch the visible pane when a tab is clicked.
 * @param {string} clickedName Name of tab clicked.
 */
Blockly4Arduino.tabClick = function(clickedName) {
  // If the XML tab was open, save and render the content.

  if (document.getElementById('tab_xml').className == 'tabon') {
    var xmlTextarea = document.getElementById('content_xml');
    var xmlText = xmlTextarea.value;
    var xmlDom = null;
    try {
      xmlDom = Blockly.Xml.textToDom(xmlText);
    } catch (e) {
      var q =
          window.confirm('Error parsing XML:\n' + e + '\n\nAbandon changes?');
      if (!q) {
        // Leave the user on the XML tab.
        return;
      }
    }
    if (xmlDom) {
      Blockly.mainWorkspace.clear();
      Blockly.Xml.domToWorkspace(xmlDom, Blockly.mainWorkspace);
    }
  } 

  if (document.getElementById('tab_blocks').className == 'tabon') {
    Blockly.mainWorkspace.setVisible(false);
  }
  // Deselect all tabs and hide all panes.
  for (var i = 0; i < TABS_.length; i++) {
    var name = TABS_[i];
    document.getElementById('tab_' + name).className = 'taboff';
    document.getElementById('content_' + name).style.visibility = 'hidden';
  }
  document.getElementById('content_area').height="99%";

 // Select the active tab.
  selected = clickedName;
  document.getElementById('tab_' + clickedName).className = 'tabon';
  // Show the selected pane.
  document.getElementById('content_' + clickedName).style.visibility =
      'visible';
  Blockly4Arduino.renderContent();
  if (clickedName == 'blocks') {
    Blockly.mainWorkspace.setVisible(true);
    document.getElementById('content_ard_collapse').style.display =
      'block';
  }
  window.dispatchEvent(new Event('resize'));
}

/**
 * Private variable to save the previous version of the Arduino Code.
 * @type {!String}
 * @private
 */
Blockly4Arduino.PREV_ARDUINO_CODE_ = 'void setup() {\n\n}\n\n\nvoid loop() {\n\n}';

/**
 * Populate the Arduino Code and Blocks XML panels with content generated from
 * the blocks.
 */
Blockly4Arduino.renderSidebarContent = function() {
  // Only regenerate the code if a block is not being dragged
  if (Blockly4Arduino.blocklyIsDragging()) return;

  // Render Arduino Code with latest change highlight and syntax highlighting
  var arduinoCode = Blockly4Arduino.generateArduino();
  if (arduinoCode !== Blockly4Arduino.PREV_ARDUINO_CODE_) {
    var diff = JsDiff.diffWords(Blockly4Arduino.PREV_ARDUINO_CODE_, arduinoCode);
    var resultStringArray = [];
    for (var i = 0; i < diff.length; i++) {
      if (!diff[i].removed) {
        var escapedCode = diff[i].value.replace(/</g, "&lt;")
                                       .replace(/>/g, "&gt;");
        if (diff[i].added) {
          resultStringArray.push(
              '<span class="code_highlight_new">' + escapedCode + '</span>');
        } else {
          resultStringArray.push(escapedCode);
        }
      }
    }
    document.getElementById('content_arduino').innerHTML =
        prettyPrintOne(resultStringArray.join(''), 'cpp', false);
    Blockly4Arduino.PREV_ARDUINO_CODE_ = arduinoCode;
  }

  // Generate plain XML into element
  //document.getElementById('content_xml').value = Blockly4Arduino.generateXml();
};

/**
 * Populate the currently selected pane with content generated from the blocks.
 */
Blockly4Arduino.renderContent = function() {
  var content = document.getElementById('content_' + selected);
  // Initialize the pane.
  if (content.id == 'content_blocks') {
    // If the workspace was changed by the XML tab, Firefox will have performed
    // an incomplete rendering due to Blockly being invisible.  Rerender.
    Blockly.mainWorkspace.render();
    
    //sidebar with code
    Blockly4Arduino.renderSidebarContent();
  } else if (content.id == 'content_xml') {
    var xmlTextarea = document.getElementById('content_xml');
    var xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
    xmlTextarea.value = xmlText;
    xmlTextarea.focus();
  /*} else if (content.id == 'content_javascript') {
    content.innerHTML = Blockly.JavaScript.workspaceToCode();
  } else if (content.id == 'content_dart') {
    content.innerHTML = Blockly.Dart.workspaceToCode();
  } else if (content.id == 'content_python') {
    content.innerHTML = Blockly.Python.workspaceToCode();*/
  } else if (content.id == 'content_arduino') {
    //content.innerHTML = Blockly.Arduino.workspaceToCode();
    var arduinoTextarea = document.getElementById('content_arduino');
    arduinoTextarea.value = Blockly.Arduino.workspaceToCode(Blockly.mainWorkspace);
    arduinoTextarea.focus();
  } else if (content.id == 'content_codebender') {
    content.width = '100%';
  }
}

/**
 * Private variable to indicate if the toolbox is meant to be shown.
 * @type {!boolean}
 * @private
 */
Blockly4Arduino.TOOLBAR_SHOWING_ = true;

/**
 * Toggles the blockly toolbox and the Blockly4Arduino toolbox button On and Off.
 * Uses namespace member variable TOOLBAR_SHOWING_ to toggle state.
 */
Blockly4Arduino.toogleToolbox = function() {
  if (Blockly4Arduino.TOOLBAR_SHOWING_) {
    Blockly4Arduino.blocklyCloseToolbox();
    Blockly4Arduino.displayToolbox(false);
  } else {
    Blockly4Arduino.displayToolbox(true);
  }
  Blockly4Arduino.TOOLBAR_SHOWING_ = !Blockly4Arduino.TOOLBAR_SHOWING_;
};

/** @return {boolean} Indicates if the toolbox is currently visible. */
Blockly4Arduino.isToolboxVisible = function() {
  return Blockly4Arduino.TOOLBAR_SHOWING_;
};

/**
 * Controls the height of the block and collapsible content between 2 states
 * using CSS classes.
 * It's state is dependent on the state of the IDE output collapsible. The
 * collapsible functionality from Materialize framework adds the active class,
 * so this class is consulted to shrink or expand the content height.
 */
Blockly4Arduino.contentHeightToggle = function() {
  var outputHeader = document.getElementById('ide_output_collapsible_header');
  var blocks = document.getElementById('blocks_panel');
  var arduino = document.getElementById('content_arduino');
  //var xml = document.getElementById('content_xml');

  // Blockly doesn't resize with CSS3 transitions enabled, so do it manually
  var timerId = setInterval(function() {
    window.dispatchEvent(new Event('resize'));
  }, 15);
  setTimeout(function() {
    clearInterval(timerId);
  }, 400);

  // Apart from checking if the output is visible, do not bother to shrink in
  // small screens as the minimum height of the content will kick in and cause
  // the content to be behind the IDE output data anyway.
  if (!outputHeader.className.match('active') && $(window).height() > 800) {
    blocks.className = 'content height_transition blocks_panel_small';
    arduino.className = 'content height_transition content_arduino_small';
    //xml.className = 'content height_transition content_xml_small';
  } else {
    blocks.className = 'content height_transition blocks_panel_large';
    arduino.className = 'content height_transition content_arduino_large';
    //xml.className = 'content height_transition content_xml_large';
  }

  // If the height transition CSS is left then blockly does not resize
  setTimeout(function() {
    blocks.className = blocks.className.replace('height_transition', '');
    arduino.className = arduino.className.replace('height_transition', '');
    //xml.className = xml.className.replace('height_transition', '');
  }, 400);
};


/**
 * Compute the absolute coordinates and dimensions of an HTML element.
 * @param {!Element} element Element to match.
 * @return {!Object} Contains height, width, x, and y properties.
 * @private
 */
Blockly4Arduino.getBBox_ = function(element) {
  var height = element.offsetHeight;
  var width = element.offsetWidth;
  var x = 0;
  var y = 0;
  do {
    x += element.offsetLeft;
    y += element.offsetTop;
    element = element.offsetParent;
  } while (element);
  return {
    height: height,
    width: width,
    x: x,
    y: y
  };
}

/**
 * Initialize Blockly.  Called on page load.
 */
Blockly4Arduino.init = function() {
  //window.onbeforeunload = function() {
  //  return 'Leaving this page will result in the loss of your work.';
  //};

  var container = document.getElementById('content_area');
  var onresize = function(e) {
    var bBox = Blockly4Arduino.getBBox_(container);
    for (var i = 0; i < TABS_.length; i++) {
      var el = document.getElementById('content_' + TABS_[i]);
      el.style.top = bBox.y + 'px';
      el.style.left = bBox.x + 'px';
      // Height and width need to be set, read back, then set again to
      // compensate for scrollbars.
      el.style.height = bBox.height + 'px';
      el.style.height = (2 * bBox.height - el.offsetHeight) + 'px';
      el.style.width = bBox.width + 'px';
      el.style.width = (2 * bBox.width - el.offsetWidth) + 'px';
    }
    // Make the 'Blocks' tab line up with the toolbox.
    if (Blockly.mainWorkspace.toolbox_.width) {
      document.getElementById('tab_blocks').style.minWidth =
          (Blockly.mainWorkspace.toolbox_.width - 38) + 'px';
          // Account for the 19 pixel margin and on each side.
    }
  };
  window.addEventListener('resize', onresize, false);

  var toolbox = document.getElementById('toolbox');
  Blockly4Arduino.workspace = Blockly.inject(document.getElementById('content_blocks'), {
      collapse: true,
      comments: true,
      css: true,
      disable: true,
      grid: {
        spacing: 25,
        length: 3,
        colour: '#ccc',
        snap: true},
      maxBlocks: Infinity,
      media: 'media/',
      rtl: false,
      scrollbars: true,
      sounds: true,
      toolbox: toolbox,
      trashcan: true,
      zoom: {
        controls: true,
        wheel: false,
        startScale: 1.0,
        maxScale: 2,
        minScale: 0.2,
        scaleSpeed: 1.2
      }
  });
      
  Blockly4Arduino.designJsInit();

  Blockly4Arduino.bindDesignEventListeners();
  Blockly4Arduino.bindBlocklyEventListeners();
  
  auto_save_and_restore_blocks();

  //load from url parameter (single param)
  //http://stackoverflow.com/questions/2090551/parse-query-string-in-javascript
  var dest = unescape(location.search.replace(/^.*\=/, '')).replace(/\+/g, " ");
  if(dest){
    load_by_url(dest);
  }
}

/** Populate the workspace blocks with the XML written in the XML text area. */
Blockly4Arduino.XmlTextareaToBlocks = function() {
  var success = Blockly4Arduino.replaceBlocksfromXml(
      document.getElementById('content_xml').value);
  if (success) {
    Blockly4Arduino.renderContent();
  } else {
    Blockly4Arduino.alertMessage(
        'Invalid XML',
        'The XML inputted into the text area was not successfully parsed into' +
        'blocks. Please review the XML code and try again.',
        false);
  }
};

/** @return {!string} Generated Arduino code from the Blockly workspace. */
Blockly4Arduino.generateArduino = function() {
  return Blockly.Arduino.workspaceToCode(Blockly4Arduino.workspace);
};

/** @return {!string} Generated XML code from the Blockly workspace. */
Blockly4Arduino.generateXml = function() {
  var xmlDom = Blockly.Xml.workspaceToDom(Blockly4Arduino.workspace);
  return Blockly.Xml.domToPrettyText(xmlDom);
};

/** Binds functions to each of the buttons, nav links, and related. */
Blockly4Arduino.bindActionFunctions = function() {
  Blockly4Arduino.bindClick_('button_toggle_toolbox', Blockly4Arduino.toogleToolbox);
}

/** Informs the user that the selected function is not yet implemented. */
Blockly4Arduino.functionNotImplemented = function() {
  console.log('Not implemented function called');
  Blockly4Arduino.shortMessage('Function not yet implemented');
};
