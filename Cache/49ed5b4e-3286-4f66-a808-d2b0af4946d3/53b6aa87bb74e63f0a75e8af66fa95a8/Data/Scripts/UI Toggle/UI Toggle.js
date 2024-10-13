// UI Toggle.js
// Version: 6.0
// Event: On Awake
// Description: Trigger events and behaviors by switching on and off.
//
// ----- USAGE -----
// Attach this script to a Scene Object with a Screen Transform Component.
// Assign a Screen Image Object to the "Background Object" parameter.
// Assign a Scene Object with a UIButton Script Component to the "Button Object" parameter 
//
// ----- LOCAL API USAGE -----
// Valid Event Types: "onEnableInteractable", "onDisableInteractable", "onToggle", "onToggleOn", "onToggleOff"
//
// Adding callbacks
//
// Add or remove callback function to onEnableInteractable event
// script.onEnableInteractable.add(callback);
// script.onEnableInteractable.remove(callback);
//
// Add or remove callback function to onDisableInteractable event
// script.onDisableInteractable.add(callback);
// script.onDisableInteractable.remove(callback);
//
// Add or remove callback function to onToggleOn event
// script.onToggleOn.add(callback);
// script.onToggleOn.remove(callback);
//
// Add or remove callback function to onToggleOff event
// script.onToggleOff.add(callback);
// script.onToggleOff.remove(callback);
//
// Add or remove callback function to onToggle event
// script.onToggle.add(callback);
// script.onToggle.remove(callback);


// Api functions:
//
// Manually enable interactable
// script.enableInteractable()
//
// Manually disable interactable
// script.disableInteractable()

// True if interactable
// script.isInteractable()
//
// Enable touch events
// script.enableTouchEvents()
//
// Disable touch events
// script.disableTouchEvents()
//
// Returns true if toggle is in "On" state, false if toggle is in "Off" state
// script.getToggleValue()
//
// Manually switch off
// script.toggleOff()
//
// Manually switch on
// script.toggleOn()
//
// Manually switch to the opposite state
// script.toggle()
//
// -----------------

//@input bool interactable = true
//@input int renderOrderOverride = 0 {"label" : "Render Order"}
//@ui {"widget":"separator"}
//@input bool initialToggleValue = false {"label":"On By Default"}

//@ui {"widget":"separator"}

//@input bool editProperties = false
//@ui {"widget":"group_start", "label":"Properties", "showIf":"editProperties"}
//@input float startEndpoint = -0.8 {"widget":"slider", "min": -1.0, "max": 1.0, "step": 0.01, "label":"Start Anchor"}
//@input float endEndpoint = 0.8 {"widget":"slider", "min": -1.0, "max": 1.0, "step": 0.01, "label":"End Anchor"}
//@ui {"widget":"group_end"}

//@ui {"widget":"separator"}
//@input bool useColors = false 
//@ui {"widget":"group_start", "label":"Background Colors", "showIf":"useColors"}
//@input vec4 toggleOnColor = {1, 1, 1, 1} {"widget":"color"}
//@input vec4 toggleOffColor = {1, 1, 1, 1} {"widget":"color"}
//@input vec4 disabledColor = {1, 1, 1, 1} {"widget":"color"}
//@ui {"widget":"group_end"}

//@ui {"widget":"separator"}
//@input bool useTextures = false
//@ui {"widget":"group_start", "label":"Toggle Textures", "showIf":"useTextures"}
//@input Asset.Texture toggleOnTexture
//@input Asset.Texture toggleOffTexture
//@input Asset.Texture disabledTexture
//@ui {"widget":"group_end"}

//@ui {"widget":"separator"}
//@input bool editEventCallbacks = false
//@ui {"widget":"group_start", "label":"Event Callbacks", "showIf":"editEventCallbacks" }
//@input int callbackType = 0 {"widget":"combobox", "values":[{"label":"None", "value":0}, {"label":"Behavior Script", "value": 1}, {"label":"Behavior Custom Trigger", "value":2}, {"label":"Custom Function", "value":3}]}

//@input Component.ScriptComponent[] onToggleOffBehaviors {"label":"On Toggle Off Behaviors", "showIf":"callbackType", "showIfValue":1}
//@ui {"widget":"separator", "showIf":"callbackType", "showIfValue":1}
//@input Component.ScriptComponent[] onToggleOnBehaviors {"label":"On Toggle On Behaviors", "showIf":"callbackType", "showIfValue":1}
//@ui {"widget":"separator", "showIf":"callbackType", "showIfValue":1}
//@input Component.ScriptComponent[] onToggleBehaviors {"label":"On Toggle Behaviors", "showIf":"callbackType", "showIfValue":1}

//@input string[] onToggleOffGlobalBehaviors {"label":"On Toggle Off Custom Triggers", "showIf":"callbackType", "showIfValue":2}
//@ui {"widget":"separator", "showIf":"callbackType", "showIfValue":2}
//@input string[] onToggleOnGlobalBehaviors {"label":"On Toggle On Custom Triggers", "showIf":"callbackType", "showIfValue":2}
//@ui {"widget":"separator", "showIf":"callbackType", "showIfValue":2}
//@input string[] onToggleGlobalBehaviors {"label":"On Toggle Custom Triggers", "showIf":"callbackType", "showIfValue":2}

//@input Component.ScriptComponent customFunctionScript {"showIf":"callbackType", "showIfValue":3}
//@input string[] onToggleOffFunctionNames {"label":"On Toggle Off Functions", "showIf":"callbackType", "showIfValue":3}
//@ui {"widget":"separator", "showIf":"callbackType", "showIfValue":3}
//@input string[] onToggleOnFunctionNames {"label":"On Toggle On Functions", "showIf":"callbackType", "showIfValue":3}
//@ui {"widget":"separator", "showIf":"callbackType", "showIfValue":3}
//@input string[] onToggleFunctionNames {"label":"On Toggle Functions", "showIf":"callbackType", "showIfValue":3}
//@ui {"widget":"group_end"}

//@ui {"widget":"separator"}
//@input bool editConnections = false {"label" : "Customize"}
//@ui {"widget":"group_start", "label":"Prefabs", "showIf":"editConnections"}
//@input Asset.ObjectPrefab backgroundPrefab
//@input Asset.ObjectPrefab buttonPrefab
//@input string toggleTouchEvent = "TouchStartEvent" {"widget":"combobox", "values":[{"label":"Touch Start", "value":"TouchStartEvent"}, {"label":"Touch End", "value":"TouchEndEvent"}]}

//@ui {"widget":"group_end"}
//@input bool editDebugSettings = false
//@ui {"widget":"group_start", "label":"Debug Statements", "showIf":"editDebugSettings"}
//@input bool printDebugStatements = false {"label": "Print Info"}
//@input bool printWarningStatements = false {"label": "Print Warnings"}
//@input bool disableTouchEventsInput = false {"label": "Disable Touch"}
//@ui {"widget":"group_end"}


var events = require("Modules/EventModule_100");
var ui = require("Modules/UIWidgetsModule_120");
var DestructionHelper = require("Modules/DestructionHelper_120");
var manager = new DestructionHelper(script);

var onEnableInteractable = new events.EventWrapper();
var onDisableInteractable = new events.EventWrapper();

var onToggleOn = new events.EventWrapper();
var onToggleOff = new events.EventWrapper();
var onToggle = new events.EventWrapper(); 

var onTouchStart = new events.EventWrapper();
var onTouchMove = new events.EventWrapper();
var onTouchEnd = new events.EventWrapper();

// Local API
script.toggleOff = toggleOff;
script.toggleOn = toggleOn;
script.toggle = toggle;

script.getToggleValue = getToggleValue;
script.enableInteractable = enableInteractable;
script.disableInteractable = disableInteractable;
script.isInteractable = isInteractable;
script.enableTouchEvents = enableTouchEvents;
script.disableTouchEvents = disableTouchEvents;
script.initialized = false;
script.widgetType = ui.WidgetTypes.UIToggle;

script.ownerScript = null;

// touch api for control from parent widget
script.touchStart = touchStart;
script.touchEnd = touchEnd;
script.touchMove = touchMove;

script.onEnableInteractable = onEnableInteractable;
script.onDisableInteractable = onDisableInteractable;

script.onToggleOn = onToggleOn;
script.onToggleOff = onToggleOff;
script.onToggle = onToggle;

script.allowTouchEvents = !script.disableTouchEventsInputs;

script.acceptChildWidget = acceptChildWidget;
script.setOwner = setOwner;
script.notifyOnInitialize = notifyOnInitialize;



// Is this widget interactable?
var interactable = script.interactable;

// Relevant Components
var backgroundScreenTransform = null;
var backgroundImage = null;
var toggleScreenTransform = null;
var toggleImage = null;

// Anchor positions
var startPoint = new vec2(script.startEndpoint, 0.0);
var endPoint = new vec2(script.endEndpoint, 0.0);

// Stored animation states
var animations = {};
var animationTime = 0.15;
var transitionTime = 0.15;

var transformAnimationHelper = new ui.AnimationHelper(script, animationTime, null, null, null, null);

// Current toggle value
var toggleValue = script.initialToggleValue;

var sceneObject = script.getSceneObject();

var refreshHelper = new ui.RefreshHelper(initParams);

/**  */
function refresh() {
    refreshHelper.requestRefresh();
}
refresh();
/**
 * 
 * @param {ScriptComponent} widget 
 * @returns {boolean}
 */
function acceptChildWidget(widget) {
    if (!widget && !widget.ownerScript && widget.widgetType == ui.WidgetTypes.UIButton) {
        ui.politeCall(widget, "setOwner", [script]);
        widget = widget;
        updateWidgetInteractable(widget);
        // Disable auto-reset on the button so it doesn't reset its pressed state
        widget.setAutoResetEnabled(false);
        refresh();
        return true;
    }
    return false;
}

/**
 *  Initialize all parameters
 */

function initParams() {
    if (script.initialized) {
        return;
    }
    if (!initBackground() ||
        !initInputCallbacks() ||
        !initHandle() ||
        !initButtonAnimations() ||
        !initInteractable() ||
        !initRenderOrder()) {
        return;
    }

    ui.answerPoliteCalls(script, "notifyOnInitialize");

    checkOwner()
    initializeTouches();

    script.initialized = true;

}
/**
 * 
 */
function seekOwner() {
    ui.findScriptUpwards(sceneObject, "acceptChildWidget", function (scr) {
        return scr.acceptChildWidget(script);
    });
}
/**
 * 
 * @param {ScriptComponent} ownerScript 
 */
function setOwner(ownerScript) {
    script.ownerScript = ownerScript;
    refresh();
}

function checkOwner() {
    if (!script.ownerScript) {
        seekOwner();
    }
    return !!script.ownerScript;
}

function notifyOnInitialize(callback) {
    callback(script);
}
/**
 * Create touch events for this widget if it doesn't have a parent panel
 */
function initializeTouches() {
    // create touch events for this widget if it doesn't have a parent
    var interactionComponent = getOrAddComponent(script.backgroundObject, "InteractionComponent");

    // add both bg and circle 
    interactionComponent.addMeshVisual(backgroundImage);
    interactionComponent.addMeshVisual(toggleImage);

    interactionComponent.onTouchStart.add(touchStart);
    interactionComponent.onTouchMove.add(touchMove);
    interactionComponent.onTouchEnd.add(touchEnd);
}

/**
 * Initialize callbacks specified in script ui
 * @returns boolean
 */

function initInputCallbacks() {
    if (script.callbackType > 0) {
        onToggle.add(ui.callbackFromScriptInputs("onToggle", script));
        onToggleOn.add(ui.callbackFromScriptInputs("onToggleOn", script));
        onToggleOff.add(ui.callbackFromScriptInputs("onToggleOff", script));
    }
    return true;
}
/**
 * Initialize Background parameters
 * @returns boolean
 */
function initBackground() {

    script.backgroundObject = findOrInstantiate(sceneObject, "Background", script.backgroundPrefab);
    // Obtain Image Component from the background 
    backgroundImage = getOrAddComponent(script.backgroundObject, "Image");
    // Obtain Screen Transform Component from the Background
    backgroundScreenTransform = getOrAddComponent(script.backgroundObject, "ScreenTransform");
    // Set main material
    backgroundImage.mainMaterial = backgroundImage.mainMaterial.clone();
    return true;
}

// Initialize Button parameters
function initHandle() {
    var helperSo = manager.createSceneObject(script.backgroundObject);
    var helperSt = helperSo.createComponent("ScreenTransform");

    if (!script.buttonObject) {
        script.buttonObject = findOrInstantiate(sceneObject, "Handle", script.buttonPrefab);
    }
    toggleImage = script.buttonObject.getComponent("MaterialMeshVisual");
    if (!toggleImage) {
        printWarning("Toggle is missing an Image Component");
    }

    // Obtain Screen Transform Component from the Background
    toggleScreenTransform = script.buttonObject.getComponent("Component.ScreenTransform");
    if (!toggleScreenTransform) {
        printWarning("Toggle is missing a Screen Transform Component!");
        return false;
    }
    toggleImage.mainMaterial = toggleImage.mainMaterial.clone();
    //parent toggle to background so the
    script.buttonObject.setParent(helperSo);
    backgroundImage.extentsTarget = helperSt;
    return true;
}


// Change Background Color/Texture based on toggle state
function changeBackgroundVisuals(toggleState) {
    if (script.useTextures && script[toggleState + "Texture"]) {
        toggleImage.mainPass.baseTex = script[toggleState + "Texture"];
    }
    if (script.useColors) {
        backgroundImage.mainPass.baseColor = script[toggleState + "Color"];
    }
    var endState = animations[toggleState];
    if (endState === undefined) {
        print("ERROR: missing animation state: " + toggleState);
    } else {
        transformAnimationHelper.startAnimation(endState);
    }
}


// Change Button animations based on this toggle's parameters
function initButtonAnimations() {
    // Default easing curve used for animations
    const easingFunction = ui.EasingHelpers.easeOutBack;

    animations.toggleOn = endPoint;
    animations.toggleOff = startPoint;
    animations.disabled = startPoint;

    transformAnimationHelper.configureForScreenTransformAnchorPosition(toggleScreenTransform, easingFunction);

    return true;
}

// Initialize this Interactable
function initInteractable() {
    var state = (toggleValue) ? "toggleOn" : "toggleOff";

    // Disable if interactable is initially false
    if (!interactable) {
        changeBackgroundVisuals("disabled");
    } else {
        changeBackgroundVisuals(state);
    }
    return true;
}

// Disable touch event
function disableTouchEvents() {
    script.allowTouchEvents = false;
}

// Enable touch event
function enableTouchEvents() {
    script.allowTouchEvents = true;
}

// Called On Touch Start
function touchStart(eventData) {
    if (!interactable) {
        return;
    }
    if (script.toggleTouchEvent == "TouchStartEvent") {
        toggle();
    }
    onTouchStart.trigger(eventData);
}

// Called On Touch End
function touchEnd(eventData) {
    if (!interactable) {
        return;
    }
    if (script.toggleTouchEvent == "TouchEndEvent") {
        toggle();
    }
    onTouchEnd.trigger(eventData);
}

// Called On Touch Move
function touchMove(eventData) {
    if (!interactable) {
        return;
    }
    onTouchMove.trigger();
}

// Return true if toggle is currently being pressed, false otherwise
function getToggleValue() {
    return toggleValue;
}

// Return true if toggle is currently interactable, false otherwise
function isInteractable() {
    return interactable;
}

// Toggle Off function
function toggleOff() {
    if (!interactable || toggleValue == false) {
        return;
    }
    toggleValue = false;

    onToggleOff.trigger();
    onToggle.trigger(toggleValue);

    changeBackgroundVisuals("toggleOff");

    printDebug("Toggle Off Event!");
}

// Toggle On function
function toggleOn() {
    if (!interactable || toggleValue == true) {
        return;
    }
    toggleValue = true;

    onToggle.trigger(toggleValue);
    onToggleOn.trigger();

    changeBackgroundVisuals("toggleOn");
    printDebug("Toggle On Event!");
}

// Toggle function
function toggle() {
    if (!interactable) {
        return;
    }
    if (!toggleValue) {
        script.toggleOn();
    } else {
        script.toggleOff();
    }
}

function updateWidgetInteractable(widget) {
    if (widget) {
        if (interactable) {
            widget.enableInteractable();
        } else {
            widget.disableInteractable();
        }
    }
}

// Disable this toggle
function disableInteractable() {
    if (!interactable) {
        return;
    }
    interactable = false;

    changeBackgroundVisuals("disabled");

    onDisableInteractable.trigger();
    printDebug("Disabled!");
}

// Enable this toggle
function enableInteractable() {
    if (interactable) {
        return;
    }

    interactable = true;

    changeBackgroundVisuals((toggleValue) ? "toggleOn" : "toggleOff");

    callbackTracker.trigger("onEnableInteractable");

    printDebug("Enabled!");
}

/**
 * checks if specified input provided and safely instantiates default prefab if not
 * @param {SceneObject} parent 
 * @param {string} name 
 * @param {ObjectPrefab} prefab 
 * @returns SceneObject
 */
function findOrInstantiate(parent, name, prefab) {
    var obj = ui.findChildObjectWithName(parent, name);
    if (!obj) {
        obj = manager.instantiatePrefab(prefab, parent);
        ui.setRenderLayerRecursively(obj, parent.layer);
        obj.layer = parent.layer;
        obj.name = name;
    }
    return obj;
}

/**
 * set render order of all children visuals
 * @returns {boolean}
 */
function initRenderOrder() {
    ui.setRenderOrderRecursively(sceneObject, script.renderOrderOverride);
    return true;
}

/**
 * returns first component of type or safely creates new one
 * @param {SceneObject} obj 
 * @param {keyof ComponentNameMap} componentType 
 * @returns 
 */
function getOrAddComponent(obj, componentType) {
    var component = obj.getComponent(componentType);
    if (isNull(component)) {
        printDebug(componentType + " component is not found, creating new " + componentType);
        return manager.createComponent(obj, componentType);
    }
    return component;
}

// Print debug messages
function printDebug(message) {
    if (script.printDebugStatements) {
        print(sceneObject.name + " - " + message);
    }
}

// Print warning message
function printWarning(message) {
    if (script.printWarningStatements) {
        print(sceneObject.name + " - WARNING, " + message);
    }
}
