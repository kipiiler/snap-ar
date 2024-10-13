"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BehaviorEventCallbacks = exports.CallbackType = void 0;
var CallbackType;
(function (CallbackType) {
    CallbackType[CallbackType["None"] = 0] = "None";
    CallbackType[CallbackType["Behavior"] = 1] = "Behavior";
    CallbackType[CallbackType["BehaviorCustom"] = 2] = "BehaviorCustom";
    CallbackType[CallbackType["CustomFunction"] = 3] = "CustomFunction";
})(CallbackType = exports.CallbackType || (exports.CallbackType = {}));
class BehaviorEventCallbacks {
    static invokeCallbackFromInputs(script, eventName) {
        const callbackType = script["callbackType"];
        if (isNull(callbackType)) {
            print("Warning: Wrong Callback Type input.");
        }
        switch (callbackType) {
            case CallbackType.Behavior:
                return () => {
                    var _a, _b;
                    const behaviors = script[eventName + "Behaviors"];
                    if (!behaviors) {
                        print("Warning: No event with name: " + eventName);
                        return;
                    }
                    for (const behavior of behaviors) {
                        (_b = (_a = behavior === null || behavior === void 0 ? void 0 : behavior.api) === null || _a === void 0 ? void 0 : _a.trigger) === null || _b === void 0 ? void 0 : _b.call(_a);
                    }
                };
            case CallbackType.BehaviorCustom:
                return () => {
                    if (!global.behaviorSystem) {
                        print("The global behavior system has not been instantiated yet! Make sure a Behavior script is present somewhere!");
                        return;
                    }
                    const triggerNames = script[eventName + "CustomTriggers"];
                    for (const triggerName of triggerNames) {
                        if (triggerName.length == 0) {
                            print("You are trying to send an empty string custom trigger!");
                            continue;
                        }
                        global.behaviorSystem.sendCustomTrigger(triggerName);
                    }
                };
            case CallbackType.CustomFunction:
                return (eventData) => {
                    const listenerScript = script["customFunctionScript"];
                    if (!listenerScript) {
                        print("Does not have a Script Component with custom functions assigned, but you are trying to invoke custom callbacks!");
                        return;
                    }
                    const functionNames = script[eventName + "Functions"];
                    for (const functionName of functionNames) {
                        if (functionName.length == 0) {
                            print("You are trying to invoke an empty string function!");
                            continue;
                        }
                        if (!listenerScript.api[functionName] && !listenerScript[functionName]) {
                            print("Cannot find the " + functionName + " function in the assigned Script Component!");
                            continue;
                        }
                        if (listenerScript.api[functionName]) {
                            listenerScript.api[functionName](eventData);
                        }
                        else {
                            listenerScript[functionName](eventData);
                        }
                    }
                };
        }
    }
}
exports.BehaviorEventCallbacks = BehaviorEventCallbacks;
