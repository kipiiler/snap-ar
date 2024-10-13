export class SceneEventHelper {

    constructor(private readonly script: ScriptComponent) {}

    delayCb(cb: Function, delay: number): void {
        const delayEv: DelayedCallbackEvent = this.script.createEvent("DelayedCallbackEvent");
        delayEv.bind(() => {
            cb();
            this.script.removeEvent(delayEv);
        });
        delayEv.reset(delay);
    }

    tapEventOutsideExceptionAreas(cbObTap: Function, exceptionAreas: ScreenTransform[]): TapEvent {
        const tapEvent: TapEvent = this.script.createEvent("TapEvent");
        tapEvent.bind((data) => {
            if (!exceptionAreas.some(area => area.containsScreenPoint(data.getTapPosition()))) {
                cbObTap && cbObTap();
            }
        });
        return tapEvent;
    }
}