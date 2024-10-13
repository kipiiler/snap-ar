if (script.onAwake) {
	script.onAwake();
	return;
};
function checkUndefined(property, showIf, showIfValue){
   if (showIf && script[showIf] != showIfValue){
       return;
   }
   if (script[property] == undefined){
       throw new Error('Input ' + property + ' was not provided for the object ' + script.getSceneObject().name);
   }
}
// @input bool editDebugSettings
checkUndefined("editDebugSettings", undefined, undefined);
// @ui {"widget":"group_start", "label":"Debug Statements", "showIf":"editDebugSettings"}
// @input bool printDebugStatements = "false" {"label":"Print Info"}
checkUndefined("printDebugStatements", undefined, undefined);
// @input bool printWarningStatements = "true" {"label":"Print Warnings"}
checkUndefined("printWarningStatements", undefined, undefined);
// @ui {"widget":"group_end"}
// @ui {"widget":"separator"}
// @input bool interactable
checkUndefined("interactable", undefined, undefined);
// @ui {"widget":"separator"}
// @input bool setupTransform
checkUndefined("setupTransform", undefined, undefined);
// @input bool fitBackground {"showIf":"setupTransform", "showIfValue":false}
checkUndefined("fitBackground", "setupTransform", false);
// @ui {"widget":"group_start", "label":"Button Transform", "showIf":"setupTransform"}
// @input vec2 center
checkUndefined("center", undefined, undefined);
// @input float scale = 1.0 {"widget":"combobox", "values":[{"label":"Extra Small", "value":0.5}, {"label":"Small", "value":0.75}, {"label":"Medium", "value":1}, {"label":"Large", "value":1.25}, {"label":"Custom", "value":0}]}
checkUndefined("scale", undefined, undefined);
// @input float customScale = 1.0 {"showIf":"scale", "showIfValue":0}
checkUndefined("customScale", "scale", 0);
// @ui {"widget":"group_end"}
// @ui {"widget":"separator"}
// @input int content {"widget":"combobox", "values":[{"label":"Only Label", "value":0}, {"label":"Only Icon", "value":1}, {"label":"Label with Icon", "value":2}]}
checkUndefined("content", undefined, undefined);
// @input string labelInOnlyLabel {"label":"Label", "showIf":"content", "showIfValue":0}
checkUndefined("labelInOnlyLabel", "content", 0);
// @input Asset.Texture iconInOnlyIcon {"label":"Icon", "showIf":"content", "showIfValue":1}
checkUndefined("iconInOnlyIcon", "content", 1);
// @input string labelInLabelWithIcon {"label":"Label", "showIf":"content", "showIfValue":2}
checkUndefined("labelInLabelWithIcon", "content", 2);
// @input Asset.Texture iconInLabelWithIcon {"label":"Icon", "showIf":"content", "showIfValue":2}
checkUndefined("iconInLabelWithIcon", "content", 2);
// @input int iconAlignment {"widget":"combobox", "values":[{"label":"Right", "value":0}, {"label":"Left", "value":1}], "showIf":"content", "showIfValue":2}
checkUndefined("iconAlignment", "content", 2);
// @ui {"widget":"separator"}
// @input int buttonColor {"widget":"combobox", "values":[{"label":"Default", "value":0}, {"label":"Disabled", "value":1}, {"label":"Primary", "value":2}, {"label":"Secondary", "value":3}, {"label":"Custom", "value":4}]}
checkUndefined("buttonColor", undefined, undefined);
// @ui {"widget":"group_start", "label":"Custom Color", "showIf":"buttonColor", "showIfValue":4}
// @input vec4 labelColorInLabelOnly {"label":"Label Color", "widget":"color", "showIf":"content", "showIfValue":0}
checkUndefined("labelColorInLabelOnly", "content", 0);
// @input vec4 labelColorInLabelWithIcon = "{1.0, 1.0, 1.0, 1.0}" {"label":"Label Color", "widget":"color", "showIf":"content", "showIfValue":2}
checkUndefined("labelColorInLabelWithIcon", "content", 2);
// @input vec4 backgroundColor = "{0.0, 0.0, 0.0, 1.0}" {"widget":"color"}
checkUndefined("backgroundColor", undefined, undefined);
// @ui {"widget":"group_end"}
// @ui {"widget":"separator"}
// @input int _renderOrder {"hint":"This Render Order will be applied to the background. A +1 will be used for text/icons."}
checkUndefined("_renderOrder", undefined, undefined);
// @ui {"widget":"separator"}
// @input bool eventCallbacks
checkUndefined("eventCallbacks", undefined, undefined);
// @ui {"widget":"group_start", "label":"Event Callbacks", "showIf":"eventCallbacks"}
// @input int callbackType = "0" {"widget":"combobox", "values":[{"label":"None", "value":0}, {"label":"Behavior Script", "value":1}, {"label":"Behavior Custom", "value":2}, {"label":"Custom Function", "value":3}]}
checkUndefined("callbackType", undefined, undefined);
// @input Component.ScriptComponent[] onPressDownBehaviors {"showIf":"callbackType", "showIfValue":1}
checkUndefined("onPressDownBehaviors", "callbackType", 1);
// @ui {"widget":"separator", "showIf":"callbackType", "showIfValue":1}
// @input Component.ScriptComponent[] onPressUpBehaviors {"showIf":"callbackType", "showIfValue":1}
checkUndefined("onPressUpBehaviors", "callbackType", 1);
// @ui {"widget":"separator", "showIf":"callbackType", "showIfValue":1}
// @input Component.ScriptComponent[] onPressBehaviors {"showIf":"callbackType", "showIfValue":1}
checkUndefined("onPressBehaviors", "callbackType", 1);
// @input string[] onPressDownCustomTriggers {"showIf":"callbackType", "showIfValue":2}
checkUndefined("onPressDownCustomTriggers", "callbackType", 2);
// @ui {"widget":"separator", "showIf":"callbackType", "showIfValue":2}
// @input string[] onPressUpCustomTriggers {"showIf":"callbackType", "showIfValue":2}
checkUndefined("onPressUpCustomTriggers", "callbackType", 2);
// @ui {"widget":"separator", "showIf":"callbackType", "showIfValue":2}
// @input string[] onPressCustomTriggers {"showIf":"callbackType", "showIfValue":2}
checkUndefined("onPressCustomTriggers", "callbackType", 2);
// @input Component.ScriptComponent customFunctionScript {"showIf":"callbackType", "showIfValue":3}
// @ui {"widget":"separator", "showIf":"callbackType", "showIfValue":3}
// @input string[] onPressDownFunctions {"showIf":"callbackType", "showIfValue":3}
checkUndefined("onPressDownFunctions", "callbackType", 3);
// @ui {"widget":"separator", "showIf":"callbackType", "showIfValue":3}
// @input string[] onPressUpFunctions {"showIf":"callbackType", "showIfValue":3}
checkUndefined("onPressUpFunctions", "callbackType", 3);
// @ui {"widget":"separator", "showIf":"callbackType", "showIfValue":3}
// @input string[] onPressFunctions {"showIf":"callbackType", "showIfValue":3}
checkUndefined("onPressFunctions", "callbackType", 3);
// @ui {"widget":"group_end"}
// @input Asset.ObjectPrefab textPrefab
checkUndefined("textPrefab", undefined, undefined);
// @input Asset.ObjectPrefab iconPrefab
checkUndefined("iconPrefab", undefined, undefined);
// @input Asset.ObjectPrefab backgroundPrefab
checkUndefined("backgroundPrefab", undefined, undefined);
var scriptPrototype = Object.getPrototypeOf(script);
if (!global.BaseScriptComponent){
   function BaseScriptComponent(){}
   global.BaseScriptComponent = BaseScriptComponent;
   global.BaseScriptComponent.prototype = scriptPrototype;
   global.BaseScriptComponent.prototype.__initialize = function(){};
   global.BaseScriptComponent.getTypeName = function(){ 
       throw new Error("Cannot get type name from the class, not decorated with @component");
   }
}
var Module = require("../../Modules/Src/Button");
Object.setPrototypeOf(script, Module.Button.prototype);
script.__initialize();
if (script.onAwake) {
   script.onAwake();
}