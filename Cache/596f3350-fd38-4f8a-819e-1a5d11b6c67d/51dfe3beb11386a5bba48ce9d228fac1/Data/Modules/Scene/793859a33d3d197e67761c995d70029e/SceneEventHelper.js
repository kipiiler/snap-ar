"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SceneEventHelper = void 0;
class SceneEventHelper {
    constructor(script) {
        this.script = script;
    }
    delayCb(cb, delay) {
        const delayEv = this.script.createEvent("DelayedCallbackEvent");
        delayEv.bind(() => {
            cb();
            this.script.removeEvent(delayEv);
        });
        delayEv.reset(delay);
    }
    tapEventOutsideExceptionAreas(cbObTap, exceptionAreas) {
        const tapEvent = this.script.createEvent("TapEvent");
        tapEvent.bind((data) => {
            if (!exceptionAreas.some(area => area.containsScreenPoint(data.getTapPosition()))) {
                cbObTap && cbObTap();
            }
        });
        return tapEvent;
    }
}
exports.SceneEventHelper = SceneEventHelper;
