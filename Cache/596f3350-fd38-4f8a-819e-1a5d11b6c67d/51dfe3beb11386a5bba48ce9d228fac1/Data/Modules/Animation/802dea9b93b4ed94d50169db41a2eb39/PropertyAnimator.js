"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyAnimator = void 0;
class PropertyAnimator {
    constructor(options) {
        this.animationEvent = null;
        this.animationTime = 0.0;
        this.startValue = 0.0;
        this.endValue = 1.0;
        this.scriptC = options.scriptComponent;
        this.duration = options.defaultDuration;
        this.easing = options.easing || ((t) => t);
    }
    setupAnimation(getter, setter, lerp) {
        this.getter = getter;
        this.setter = setter;
        this.lerp = lerp;
    }
    setCallbackOnFinish(cb) {
        this.callbackOnFinish = cb;
    }
    configureForScreenTransformScale(st) {
        this.setupAnimation(() => st.scale, (value) => { st.scale = value; }, vec3.lerp);
    }
    configureForScreenTransformRotation(st) {
        this.setupAnimation(() => st.rotation.toEulerAngles().z * MathUtils.RadToDeg, (value) => { st.rotation = quat.fromEulerAngles(0.0, 0.0, value * MathUtils.DegToRad); }, MathUtils.lerp);
    }
    configureForScreenTransformAnchorPosition(st) {
        this.setupAnimation(() => st.anchors.getCenter(), (value) => { st.anchors.setCenter(value); }, vec2.lerp);
    }
    configureForScreenTransformOffsetPosition(st) {
        this.setupAnimation(() => st.offsets.getCenter(), (value) => { st.offsets.setCenter(value); }, vec2.lerp);
    }
    configureForMeshVisualColor(visual) {
        const isVisualArray = Array.isArray(visual);
        this.setupAnimation(() => {
            return isVisualArray ? visual[0].mainPass.baseColor : visual.mainPass.baseColor;
        }, (value) => {
            if (isVisualArray) {
                visual.forEach(v => v.mainPass.baseColor = value);
            }
            else {
                visual.mainPass.baseColor = value;
            }
        }, vec4.lerp);
    }
    configureForTextFillColor(visual) {
        const isVisualArray = Array.isArray(visual);
        this.setupAnimation(() => {
            return isVisualArray ? visual[0].textFill.color : visual.textFill.color;
        }, (value) => {
            if (isVisualArray) {
                visual.forEach(v => v.textFill.color = value);
            }
            else {
                visual.textFill.color = value;
            }
        }, vec4.lerp);
    }
    startAnimation(endValue, duration) {
        this.endValue = endValue;
        this.startValue = this.getter();
        this.duration = duration || this.duration;
        this.animationTime = 0;
        this.removeAnimationEvent();
        this.animationEvent = this.scriptC.createEvent("UpdateEvent");
        this.animationEvent.bind((ev) => this.update(ev));
    }
    update(eventData) {
        this.animationTime += eventData.getDeltaTime();
        const t = Math.min(this.animationTime / this.duration, 1);
        const easedT = this.easing(t);
        const value = this.lerp(this.startValue, this.endValue, easedT);
        this.setter(value);
        if (t >= 1) {
            this.removeAnimationEvent();
            this.callbackOnFinish && this.callbackOnFinish();
        }
    }
    removeAnimationEvent() {
        if (this.animationEvent) {
            this.scriptC.removeEvent(this.animationEvent);
            this.animationEvent.enabled = false;
            this.animationEvent = null;
        }
    }
}
exports.PropertyAnimator = PropertyAnimator;
