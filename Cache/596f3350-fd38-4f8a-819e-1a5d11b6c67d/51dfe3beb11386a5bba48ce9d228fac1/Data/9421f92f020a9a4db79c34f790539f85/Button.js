"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = void 0;
var __selfType = requireType("./Button");
function component(target) { target.getTypeName = function () { return __selfType; }; }
/**
 * Button
 * Version 0.0.13
 *
 * Description: Sets up the button and allows to fit the label and icon with the background.
 * Triggers events by pressing the button.
 *
 * API:
 *
 * isPressed(): boolean - returns whether the button is pressed at the moment.
 * isActive(): boolean - returns whether the button is active at the moment.
 * enableInteractable(): void - enables button's InteractionComponent.
 * disableInteractable(): void - disables button's InteractionComponent.
 * setTransformType(type: number, defaultValue, pressedValue, disabledValue) - sets transform animation type. Types: 0 - Offset Position, 1 - Anchor Position, 2 - Rotation, 3 - Scale.
 * (readonly) textComponent - TextComponent of label.
 * (readonly) screenTransform - Parent ScreenTransform.
 * (readonly) backgroundScreenTransform - ScreenTransform of background.
 * defaultBackgroundColor: vec4 - background's color in default state.
 * pressedBackgroundColor: vec4 - background's color in pressed state.
 * disabledBackgroundColor: vec4 - background's color in disabled state.
 * defaultLabelColor: vec4 - label's color in default state.
 * pressedBackgroundColor: vec4 - label's color in pressed state.
 * disabledBackgroundColor: vec4 - label's color in disabled state.
 * animationType: number - animation type. 0 - None. 1 - Bounce. 2 - Squish. 3 - Transform.
 * renderOrder: number - button's render order.
 * textSize: number - size of the TextComponent.
 * buttonCenter: vec2 - button's center position.
 * buttonScale: number - button's scale ratio.
 * backgroundEnabled: boolean - whether the background is enabled.
 *
 * Events:
 *
 * onEnabledInteractable
 * onDisabledInteractable
 * onPressUp
 * onPressDown
 * onPress
 *
 * Events Usage:
 *
 * script.onEnabledInteractable.add(callback);
 * script.onPress.add(callback);
 */
const DestructionHelper_1 = require("./Modules/Scene/DestructionHelper");
const PropertyAnimator_1 = require("./Modules/Animation/PropertyAnimator");
const PassHelper_1 = require("./Modules/Scene/PassHelper");
const Easing_1 = require("./Modules/Animation/Easing");
const SceneEventHelper_1 = require("./Modules/Scene/SceneEventHelper");
const ScreenTransformHelper_1 = require("./Modules/Scene/ScreenTransformHelper");
const Event_1 = require("./Modules/Event/Event");
const BehaviorEventCallbacks_1 = require("./Modules/BehaviorSupport/BehaviorEventCallbacks");
const ComponentWithDebug_1 = require("./Modules/Debug/ComponentWithDebug");
var Scale;
(function (Scale) {
    Scale[Scale["ExtraSmall"] = 0.5] = "ExtraSmall";
    Scale[Scale["Small"] = 0.75] = "Small";
    Scale[Scale["Medium"] = 1] = "Medium";
    Scale[Scale["Large"] = 1.25] = "Large";
    Scale[Scale["Custom"] = 0] = "Custom";
})(Scale || (Scale = {}));
var TransitionState;
(function (TransitionState) {
    TransitionState["Default"] = "default";
    TransitionState["Pressed"] = "pressed";
    TransitionState["Disabled"] = "disabled";
})(TransitionState || (TransitionState = {}));
var ButtonContent;
(function (ButtonContent) {
    ButtonContent[ButtonContent["Label"] = 0] = "Label";
    ButtonContent[ButtonContent["Icon"] = 1] = "Icon";
    ButtonContent[ButtonContent["LabelWithIcon"] = 2] = "LabelWithIcon";
})(ButtonContent || (ButtonContent = {}));
var IconAlignment;
(function (IconAlignment) {
    IconAlignment[IconAlignment["Right"] = 0] = "Right";
    IconAlignment[IconAlignment["Left"] = 1] = "Left";
})(IconAlignment || (IconAlignment = {}));
var AnimationType;
(function (AnimationType) {
    AnimationType[AnimationType["None"] = 0] = "None";
    AnimationType[AnimationType["Bounce"] = 1] = "Bounce";
    AnimationType[AnimationType["Squish"] = 2] = "Squish";
    AnimationType[AnimationType["Transform"] = 3] = "Transform";
})(AnimationType || (AnimationType = {}));
var TransformAnimationType;
(function (TransformAnimationType) {
    TransformAnimationType[TransformAnimationType["Offset"] = 0] = "Offset";
    TransformAnimationType[TransformAnimationType["Anchor"] = 1] = "Anchor";
    TransformAnimationType[TransformAnimationType["Rotation"] = 2] = "Rotation";
    TransformAnimationType[TransformAnimationType["Scale"] = 3] = "Scale";
})(TransformAnimationType || (TransformAnimationType = {}));
var ButtonColor;
(function (ButtonColor) {
    ButtonColor[ButtonColor["Default"] = 0] = "Default";
    ButtonColor[ButtonColor["Disabled"] = 1] = "Disabled";
    ButtonColor[ButtonColor["Primary"] = 2] = "Primary";
    ButtonColor[ButtonColor["Secondary"] = 3] = "Secondary";
    ButtonColor[ButtonColor["Custom"] = 4] = "Custom";
})(ButtonColor || (ButtonColor = {}));
let Button = class Button extends ComponentWithDebug_1.ComponentWithDebug {
    onAwake() {
        this.buttonState = (this.interactable) ? TransitionState.Default : TransitionState.Disabled;
        this.so = this.getSceneObject();
        this.initialize();
    }
    set defaultBackgroundColor(color) {
        this._defaultBackgroundColor = color;
        if (this.buttonState == TransitionState.Default && this.initialized) {
            this.setBackgroundColor(color);
        }
    }
    get defaultBackgroundColor() {
        return this._defaultBackgroundColor;
    }
    set pressedBackgroundColor(color) {
        this._pressedBackgroundColor = color;
        if (this.buttonState == TransitionState.Pressed && this.initialized) {
            this.setBackgroundColor(color);
        }
    }
    get pressedBackgroundColor() {
        return this._pressedBackgroundColor;
    }
    set disabledBackgroundColor(color) {
        this._disabledBackgroundColor = color;
        if (this.buttonState == TransitionState.Disabled && this.initialized) {
            this.setBackgroundColor(color);
        }
    }
    get disabledBackgroundColor() {
        return this._disabledBackgroundColor;
    }
    set defaultLabelColor(color) {
        this._defaultLabelColor = color;
        if (this.buttonState == TransitionState.Default && this.initialized) {
            this.setLabelColor(color);
        }
    }
    get defaultLabelColor() {
        return this._defaultLabelColor;
    }
    set pressedLabelColor(color) {
        this._pressedLabelColor = color;
        if (this.buttonState == TransitionState.Pressed && this.initialized) {
            this.setLabelColor(color);
        }
    }
    get pressedLabelColor() {
        return this._pressedLabelColor;
    }
    set disabledLabelColor(color) {
        this._disabledLabelColor = color;
        if (this.buttonState == TransitionState.Disabled && this.initialized) {
            this.setLabelColor(color);
        }
    }
    get disabledLabelColor() {
        return this._disabledLabelColor;
    }
    set animationType(type) {
        this._animationType = type;
        this.initializeAnimations();
    }
    get animationType() {
        return this._animationType;
    }
    set renderOrder(order) {
        this._renderOrder = order;
        this.setRenderOrder();
    }
    get renderOrder() {
        return this._renderOrder;
    }
    set textSize(size) {
        if (this.labelText) {
            this.labelText.size = size;
        }
        else {
            this.printWarning("trying to set size to the invalid Label Text!");
        }
        if (this.baseHeightText) {
            this.baseHeightText.size = size;
        }
        if (this.content == ButtonContent.Label && this.initialized) {
            if (this.setupTransform || this.fitBackground) {
                this.fitBgWithLabel();
            }
        }
        if (this.content == ButtonContent.LabelWithIcon && this.initialized) {
            this.fitBgWithTextAndIcon();
        }
    }
    get textSize() {
        if (this.labelText) {
            return this.labelText.size;
        }
        else {
            this.printWarning("trying to get size of the invalid Label Text!");
        }
    }
    set backgroundEnabled(enabling) {
        if (this.backgroundImage) {
            this.backgroundImage.enabled = enabling;
        }
        else {
            this.printWarning("trying to set enabled to the invalid Button's Image!");
        }
    }
    get backgroundEnabled() {
        if (this.backgroundImage) {
            return this.backgroundImage.enabled;
        }
        else {
            this.printWarning("trying to get enabled of the invalid Button's Image!");
        }
    }
    set buttonCenter(center) {
        if (this.st) {
            this.st.anchors.setCenter(center);
        }
        else {
            this.printWarning("trying to set center to the invalid Button's ScreenTransform!");
        }
    }
    get buttonCenter() {
        if (this.st) {
            return this.st.anchors.getCenter();
        }
        else {
            this.printWarning("trying to get center of the invalid Button's ScreenTransform!");
        }
    }
    set buttonScale(scale) {
        this.scale = scale;
        if (this.content == ButtonContent.Icon) {
            if (this.setupTransform || this.fitBackground) {
                this.iconST.anchors.setSize(this.DEFAULT_SIZE.uniformScale(this.scale));
                this.fitBgWithIcon();
            }
            else {
                this.printWarning("use the Custom Component's ScreenTransform to adjust the size of button!");
            }
        }
        else {
            this.textSize = this.DEFAULT_TEXT_SIZE * this.scale;
        }
    }
    get buttonScale() {
        return this.scale;
    }
    get textComponent() {
        return this.labelText;
    }
    get screenTransform() {
        return this.st;
    }
    get backgroundScreenTransform() {
        return this.backgroundST;
    }
    /**
     * Returns whether the button is pressed.
     */
    isPressed() {
        return this.pressed;
    }
    /**
     * Returns whether the button is active.
     */
    isActive() {
        return this.interactable;
    }
    /**
     * Enables Interactable and invokes animations for the new button's state.
     */
    enableInteractable() {
        if (this.interactable)
            return;
        this.interactable = true;
        this.buttonState = (this.pressed) ? TransitionState.Pressed : TransitionState.Default;
        this.invokeVisualTransition();
        this.invokeAnimation(this._animationType);
        this.onEnabledInteractable.trigger();
        this.printDebug("Enabled!");
    }
    /**
     * Disables Interactable and invokes animations for the new button's state.
     */
    disableInteractable() {
        if (!this.interactable)
            return;
        this.interactable = false;
        this.buttonState = TransitionState.Disabled;
        this.invokeVisualTransition();
        this.invokeAnimation(this._animationType);
        this.onDisabledInteractable.trigger();
        this.printDebug("Disabled!");
    }
    /**
     * Sets a new type for transform animation.
     * @param transformType - New Animation Type.
     * @param defaultValue - Value when the button is active, but is not pressed.
     * @param pressedValue - Value when the button is pressed.
     * @param disabledValue - Value when the button is inactive.
     */
    setTransformType(transformType, defaultValue, pressedValue, disabledValue) {
        this.transformType = transformType;
        this.defaultTransformValue = defaultValue;
        this.pressedTransformValue = pressedValue;
        this.disabledTransformValue = disabledValue;
        if (this._animationType == AnimationType.Transform) {
            this.initializeAnimations();
        }
        this.invokeAnimation(this._animationType);
    }
    /**
     * Initializes button.
     * @private
     */
    initialize() {
        this.initializeAnimators();
        this.initializeST();
        this.initializeScale();
        this.parseLabelText();
        this.initializePrefabs();
        this.initializeColors();
        this.initializeAnimations();
        this.initializeEvent();
        this.initializeTouches();
        this.initializeDestroy();
        this.destructionHelper.setRenderLayerRecursively(this.so, this.so.layer);
        this.transitionAnimationHelperBackground.configureForMeshVisualColor([this.backgroundImage]);
        this.transitionAnimationHelperLabel.configureForTextFillColor([this.labelText]);
        this.initializeEventCallbacks();
    }
    /**
     * Initializes instances of PropertyAnimator.
     * @private
     */
    initializeAnimators() {
        this.buttonAnimation = {
            default: 0.0,
            pressed: 0.0,
            disabled: 0.0,
            currentAnimationState: TransitionState.Default
        };
        const TRANSITION_TIME = 0.15;
        const easingFunction = Easing_1.Easing.Back.Out;
        this.transitionAnimationHelperBackground = new PropertyAnimator_1.PropertyAnimator({
            scriptComponent: this,
            defaultDuration: TRANSITION_TIME,
            easing: easingFunction
        });
        this.transitionAnimationHelperLabel = new PropertyAnimator_1.PropertyAnimator({
            scriptComponent: this,
            defaultDuration: TRANSITION_TIME,
            easing: easingFunction
        });
        this.transformAnimationHelper = new PropertyAnimator_1.PropertyAnimator({
            scriptComponent: this,
            defaultDuration: TRANSITION_TIME,
            easing: easingFunction
        });
    }
    initializeScale() {
        if (this.scale == Scale.Custom) {
            this.scale = this.customScale;
        }
    }
    /**
     * Creates or gets the main ScreenTransform.
     * @private
     */
    initializeST() {
        if (this.setupTransform) {
            this.st = this.destructionHelper.addOrOverrideComponent(this.so, "ScreenTransform");
            this.st.anchors.setCenter(this.center);
        }
        else {
            this.st = this.destructionHelper.getOrAddComponent(this.so, "ScreenTransform");
        }
    }
    /**
     * Instantiates prefabs and places them on the scene.
     * @private
     */
    initializePrefabs() {
        switch (this.content) {
            case ButtonContent.Icon:
                this.setupIconOnly();
                break;
            case ButtonContent.Label:
                this.setupLabelOnly();
                break;
            case ButtonContent.LabelWithIcon:
                this.setupLabelWithIcon();
                break;
        }
        this.setRenderOrder();
        this.showWithFrameDelay();
    }
    /**
     * Initializes colors of the label and background.
     * @private
     */
    initializeColors() {
        switch (this.buttonColor) {
            case ButtonColor.Default:
                this._defaultBackgroundColor = this.DEFAULT_BACKGROUND_COLOR;
                this._pressedBackgroundColor = PassHelper_1.PassHelper.copyColorWithDifferentAlpha(this.DEFAULT_BACKGROUND_COLOR, this.DEFAULT_PRESSED_ALPHA);
                this._disabledBackgroundColor = this.DISABLED_BACKGROUND_COLOR;
                this._defaultLabelColor = this.DEFAULT_LABEL_COLOR;
                this._pressedLabelColor = PassHelper_1.PassHelper.copyColorWithDifferentAlpha(this.DEFAULT_LABEL_COLOR, this.DEFAULT_PRESSED_ALPHA);
                this._disabledLabelColor = this.DISABLED_LABEL_COLOR;
                break;
            case ButtonColor.Disabled:
                this._defaultBackgroundColor = this.DISABLED_BACKGROUND_COLOR;
                this._pressedBackgroundColor = PassHelper_1.PassHelper.copyColorWithDifferentAlpha(this.DISABLED_BACKGROUND_COLOR, this.DEFAULT_PRESSED_ALPHA);
                this._disabledBackgroundColor = this.DISABLED_BACKGROUND_COLOR;
                this._defaultLabelColor = this.DISABLED_LABEL_COLOR;
                this._pressedLabelColor = PassHelper_1.PassHelper.copyColorWithDifferentAlpha(this.DISABLED_LABEL_COLOR, this.DEFAULT_PRESSED_ALPHA);
                this._disabledLabelColor = this.DISABLED_LABEL_COLOR;
                break;
            case ButtonColor.Primary:
                this._defaultBackgroundColor = this.PRIMARY_BACKGROUND_COLOR;
                this._pressedBackgroundColor = PassHelper_1.PassHelper.copyColorWithDifferentAlpha(this.PRIMARY_BACKGROUND_COLOR, this.DEFAULT_PRESSED_ALPHA);
                this._disabledBackgroundColor = this.DISABLED_BACKGROUND_COLOR;
                this._defaultLabelColor = this.PRIMARY_LABEL_COLOR;
                this._pressedLabelColor = PassHelper_1.PassHelper.copyColorWithDifferentAlpha(this.PRIMARY_LABEL_COLOR, this.DEFAULT_PRESSED_ALPHA);
                this._disabledLabelColor = this.DISABLED_LABEL_COLOR;
                break;
            case ButtonColor.Secondary:
                this._defaultBackgroundColor = this.SECONDARY_BACKGROUND_COLOR;
                this._pressedBackgroundColor = PassHelper_1.PassHelper.copyColorWithDifferentAlpha(this.SECONDARY_BACKGROUND_COLOR, this.DEFAULT_PRESSED_ALPHA);
                this._disabledBackgroundColor = this.DISABLED_BACKGROUND_COLOR;
                this._defaultLabelColor = this.SECONDARY_LABEL_COLOR;
                this._pressedLabelColor = PassHelper_1.PassHelper.copyColorWithDifferentAlpha(this.SECONDARY_LABEL_COLOR, this.DEFAULT_PRESSED_ALPHA);
                this._disabledLabelColor = this.DISABLED_LABEL_COLOR;
                break;
            case ButtonColor.Custom:
                this._defaultBackgroundColor = this.backgroundColor;
                this._pressedBackgroundColor = this.backgroundColor;
                this._disabledBackgroundColor = this.backgroundColor;
                if (this.content == ButtonContent.Label) {
                    this._defaultLabelColor = this.labelColorInLabelOnly;
                    this._pressedLabelColor = this.labelColorInLabelOnly;
                    this._disabledLabelColor = this.labelColorInLabelOnly;
                }
                else {
                    this._defaultLabelColor = this.labelColorInLabelWithIcon;
                    this._pressedLabelColor = this.labelColorInLabelWithIcon;
                    this._disabledLabelColor = this.labelColorInLabelWithIcon;
                }
                break;
        }
    }
    /**
     * Initializes animations.
     * @private
     */
    initializeAnimations() {
        switch (this._animationType) {
            case AnimationType.Bounce:
                this.buttonAnimation.default = this.st.scale;
                this.buttonAnimation.pressed = this.buttonAnimation.default.uniformScale(this.BOUNCE_UNIFORM_SCALE);
                this.buttonAnimation.disabled = this.buttonAnimation.default;
                this.transformAnimationHelper.configureForScreenTransformScale(this.st);
                break;
            case AnimationType.Squish:
                this.buttonAnimation.default = this.st.scale;
                this.buttonAnimation.pressed = this.buttonAnimation.default.scale(this.SQUISH_SCALE);
                this.buttonAnimation.disabled = this.buttonAnimation.default;
                this.transformAnimationHelper.configureForScreenTransformScale(this.st);
                break;
            case AnimationType.Transform:
                this.buttonAnimation.default = this.defaultTransformValue;
                this.buttonAnimation.pressed = this.pressedTransformValue;
                this.buttonAnimation.disabled = this.disabledTransformValue;
                switch (this.transformType) {
                    case TransformAnimationType.Offset:
                        this.transformAnimationHelper.configureForScreenTransformOffsetPosition(this.st);
                        break;
                    case TransformAnimationType.Anchor:
                        this.transformAnimationHelper.configureForScreenTransformAnchorPosition(this.st);
                        break;
                    case TransformAnimationType.Rotation:
                        this.transformAnimationHelper.configureForScreenTransformRotation(this.st);
                        break;
                    case TransformAnimationType.Scale:
                        this.transformAnimationHelper.configureForScreenTransformScale(this.st);
                }
            case AnimationType.None:
                break;
            default:
                this.printWarning("trying to change the animation type to an invalid animation!");
                break;
        }
        this.buttonAnimation.currentAnimationState = TransitionState.Default;
    }
    /**
     * Initializes UpdateEvent for button's animations.
     * @private
     */
    initializeEvent() {
        this.updateEvent = this.createEvent("UpdateEvent");
        this.updateEvent.bind(() => this.onUpdate());
        this.updateEvent.enabled = false;
    }
    /**
     * Initializes InteractionComponent.
     * @private
     */
    initializeTouches() {
        this.interactionC = this.destructionHelper.getOrAddComponent(this.backgroundSO, "InteractionComponent");
        this.interactionC.onTouchStart.add((e) => this.touchStart(e));
        this.interactionC.onTouchMove.add((e) => this.touchMove(e));
        this.interactionC.onTouchEnd.add((e) => this.touchEnd(e));
    }
    initializeDestroy() {
        this.createEvent("OnDestroyEvent").bind(() => {
            for (const object of this.destructionHelper.destroyObjects) {
                if (!isNull(object) && !isNull(object.destroy)) {
                    object.destroy();
                }
            }
            this.transformAnimationHelper = null;
            this.transitionAnimationHelperBackground = null;
            this.transitionAnimationHelperLabel = null;
        });
    }
    initializeEventCallbacks() {
        if (this.eventCallbacks && this.callbackType !== BehaviorEventCallbacks_1.CallbackType.None) {
            this.onPressUp.add(BehaviorEventCallbacks_1.BehaviorEventCallbacks.invokeCallbackFromInputs(this, "onPressUp"));
            this.onPressDown.add(BehaviorEventCallbacks_1.BehaviorEventCallbacks.invokeCallbackFromInputs(this, "onPressDown"));
            this.onPress.add(BehaviorEventCallbacks_1.BehaviorEventCallbacks.invokeCallbackFromInputs(this, "onPress"));
        }
    }
    parseLabelText() {
        if (this.content == ButtonContent.Label) {
            this.labelTextString = this.labelInOnlyLabel;
        }
        if (this.content == ButtonContent.LabelWithIcon) {
            this.labelTextString = this.labelInLabelWithIcon;
        }
        this.labelTextString = this.labelTextString.replace(/\\n/g, "\n");
    }
    /**
     * Controls pressing time.
     * @private
     */
    onUpdate() {
        if (this.pressed) {
            const time = getTime();
            if (time - (this.lastPressTime + getDeltaTime()) > this.FRAME_DELAY) {
                this.pressUp();
                return;
            }
            this.lastPressTime = time;
            this.press();
        }
    }
    /**
     * Processes TouchStart event.
     * @param eventData - TouchStart event data.
     * @private
     */
    touchStart(eventData) {
        if (!this.interactable) {
            return;
        }
        this.pressDown();
    }
    /**
     * Processes TouchMove event.
     * @param eventData - TouchMove event data.
     * @private
     */
    touchMove(eventData) {
        if (!this.interactable) {
            return;
        }
        this.touchOffBoundsCheck(eventData);
    }
    /**
     * Processes TouchEnd event.
     * @param eventData - TouchEnd event data.
     * @private
     */
    touchEnd(eventData) {
        if (!this.interactable) {
            return;
        }
        this.pressUp();
    }
    /**
     * Handles pressing up and invokes animations.
     * @private
     */
    pressUp() {
        this.updateEvent.enabled = false;
        if (!this.interactable || (this.initialTrigger && !this.pressed)) {
            this.pressed = false;
            return;
        }
        this.pressed = false;
        this.initialTrigger = true;
        this.buttonState = TransitionState.Default;
        this.invokeVisualTransition();
        this.invokeAnimation(this._animationType);
        this.onPressUp.trigger();
        this.printDebug("Press Up Event!");
    }
    /**
     * Handles pressing down and invokes animations.
     * @private
     */
    pressDown() {
        if (!this.interactable || (this.initialTrigger && this.pressed)) {
            return;
        }
        this.updateEvent.enabled = true;
        this.pressed = true;
        this.initialTrigger = true;
        this.lastPressTime = getTime();
        this.buttonState = TransitionState.Pressed;
        this.invokeVisualTransition();
        this.invokeAnimation(this._animationType);
        this.onPressDown.trigger();
        this.printDebug("Press Down Event!");
    }
    /**
     * Handles pressing and emits event.
     * @private
     */
    press() {
        if (!this.interactable) {
            return;
        }
        this.onPress.trigger();
        this.printDebug("Press Event!");
    }
    /**
     * Starts transition animations for background and label.
     * @private
     */
    invokeVisualTransition() {
        const endStateBackground = this["_" + this.buttonState + "BackgroundColor"];
        this.transitionAnimationHelperBackground.startAnimation(endStateBackground);
        if (this.labelSO && this.labelText) {
            const endStateLabel = this["_" + this.buttonState + "LabelColor"];
            this.transitionAnimationHelperLabel.startAnimation(endStateLabel);
        }
    }
    /**
     * Starts transforms animation.
     * @param animationType
     * @private
     */
    invokeAnimation(animationType) {
        switch (animationType) {
            case AnimationType.Bounce:
            case AnimationType.Squish:
            case AnimationType.Transform:
                const endState = this.buttonAnimation[this.buttonState];
                if (endState !== undefined) {
                    this.transformAnimationHelper.startAnimation(endState);
                }
                break;
        }
    }
    /**
     * Handles touch off case.
     * @param eventData - touch event data.
     * @private
     */
    touchOffBoundsCheck(eventData) {
        if (!this.backgroundST.containsScreenPoint(eventData.position)) {
            this.pressUp();
        }
    }
    /**
     * Shows button with slight delay to avoid flickering.
     * @private
     */
    showWithFrameDelay() {
        this.setBackgroundColor(this.TRANSPARENT);
        if (this.labelText) {
            this.setLabelColor(this.TRANSPARENT);
        }
        this.sceneEventHelper.delayCb(() => {
            this.setBackgroundColor((this.interactable) ? this._defaultBackgroundColor : this._disabledBackgroundColor);
            if (this.labelText) {
                this.setLabelColor((this.interactable) ? this._defaultLabelColor : this._disabledLabelColor);
            }
            this.initialized = true;
        }, this.FRAME_DELAY);
    }
    /**
     * Sets up button in "Icon Only" mode.
     * @private
     */
    setupIconOnly() {
        this.initializeIcon(this.so);
        this.iconImage.mainPass.baseTex = this.iconInOnlyIcon;
        if (this.setupTransform) {
            this.iconST.anchors.setSize(this.DEFAULT_SIZE.uniformScale(this.scale));
            this.fitBgWithIcon();
        }
        else {
            if (this.fitBackground) {
                this.fitBgWithIcon();
            }
            else {
                this.initializeBackground(this.so);
            }
            this.iconImage.stretchMode = StretchMode.Fit;
            this.backgroundImage.stretchMode = StretchMode.Stretch;
        }
    }
    /**
     * Sets up button in "Label Only" mode.
     * @private
     */
    setupLabelOnly() {
        this.initializeLabel(this.so);
        this.labelText.text = this.labelTextString;
        this.initializeBackground(this.labelSO);
        if (this.setupTransform) {
            this.labelText.size = this.DEFAULT_TEXT_SIZE * this.scale;
            this.initializeBaseHeight(this.labelSO);
            this.fitBgWithLabel();
        }
        else {
            this.initializeBaseHeight(this.labelSO);
            if (this.fitBackground) {
                this.fitBgWithLabel();
            }
            this.backgroundImage.stretchMode = StretchMode.Stretch;
        }
    }
    /**
     * Sets up button in "Label With Icon" mode.
     * @private
     */
    setupLabelWithIcon() {
        this.initializeLabel(this.so);
        this.initializeBackground(this.labelSO);
        this.initializeIcon(this.labelSO);
        this.iconImage.mainPass.baseTex = this.iconInLabelWithIcon;
        this.labelText.text = this.labelTextString;
        if (this.setupTransform) {
            this.labelText.size = this.DEFAULT_TEXT_SIZE * this.scale;
        }
        this.initializeBaseHeight(this.labelSO);
        this.fitBgWithTextAndIcon();
    }
    /**
     * Fits background to icon's size.
     * @private
     */
    fitBgWithIcon() {
        const iconExtentsSO = this.destructionHelper.createExtentsTarget(this.iconSO, this.iconImage, "Icon Extents");
        this.initializeBackground(iconExtentsSO);
        this.backgroundST.anchors.setSize(this.backgroundST.anchors.getSize().uniformScale(this.ICON_RATIO));
    }
    /**
     * Fits background to label's size.
     * @private
     */
    fitBgWithLabel() {
        this.sceneEventHelper.delayCb(() => {
            this.alignText();
        }, this.FRAME_DELAY);
    }
    /**
     * Fits background to the size of label with icon.
     * @private
     */
    fitBgWithTextAndIcon() {
        this.sceneEventHelper.delayCb(() => {
            this.alignTextWithIcon();
            if (this.setupTransform) {
                this.centralizeButton();
            }
        }, this.FRAME_DELAY);
    }
    /**
     * Aligns the icon with the text to ensure the desired size and position of the icons.
     * @private
     */
    alignTextWithIcon() {
        this.alignText();
        const baseHeight = this.baseHeightExtentsST.anchors.getSize().y;
        let iconSize = this.iconST.anchors.getSize();
        iconSize.x = baseHeight;
        iconSize.y = baseHeight;
        this.iconST.anchors.setSize(iconSize);
        const iconOffset = iconSize.x * this.ICON_RATIO * (this.st.anchors.getSize().y / this.st.anchors.getSize().x);
        let center = this.iconST.anchors.getCenter();
        center.x = this.labelExtentsST.anchors.getCenter().x + (this.labelExtentsST.anchors.getSize().x / 2 + iconOffset) *
            ((this.iconAlignment == IconAlignment.Right) ? 1 : -1);
        this.iconST.anchors.setCenter(center);
        if (this.iconAlignment == IconAlignment.Right) {
            this.backgroundST.anchors.right = this.backgroundST.anchors.right + iconOffset + iconSize.x / 2;
        }
        else {
            this.backgroundST.anchors.left = this.backgroundST.anchors.left - iconOffset - iconSize.x / 2;
        }
    }
    /**
     * Aligns the text with the background.
     * @private
     */
    alignText() {
        if (this.setupTransform || this.fitBackground) {
            const labelExtentsSize = this.labelExtentsST.anchors.getSize();
            const ratio = this.baseHeightExtentsST.anchors.getSize().y / labelExtentsSize.y;
            const baseHeight = labelExtentsSize.y * ratio;
            const offsetX = baseHeight * (this.st.anchors.getSize().y / this.st.anchors.getSize().x) * this.LABEL_HEIGHT_RATIO;
            const offsetY = baseHeight;
            this.backgroundST.anchors.setSize(labelExtentsSize);
            ScreenTransformHelper_1.ScreenTransformHelper.expandRectSidePositions(this.backgroundST.anchors, offsetX, offsetX, offsetY * this.BACKGROUND_HEIGHT_RATIO, offsetY * this.BACKGROUND_HEIGHT_RATIO);
        }
    }
    /**
     * Places button in the center.
     * @private
     */
    centralizeButton() {
        const buttonScreenCenter = this.backgroundST.localPointToScreenPoint(this.backgroundST.anchors.getCenter());
        this.labelST.anchors.setCenter(this.labelST.anchors.getCenter().sub(this.labelST.screenPointToParentPoint(buttonScreenCenter).uniformScale(0.5)));
    }
    /**
     * Sets needed render order.
     * @private
     */
    setRenderOrder() {
        let renderOrderIncrement = this._renderOrder;
        if (this.backgroundImage) {
            this.backgroundImage.renderOrder = renderOrderIncrement++;
        }
        if (this.labelText) {
            this.labelText.renderOrder = renderOrderIncrement;
        }
        if (this.iconImage) {
            this.iconImage.renderOrder = renderOrderIncrement;
        }
    }
    /**
     * Sets background's color and icon's alpha.
     * @param color - new color.
     * @private
     */
    setBackgroundColor(color) {
        if (this.backgroundImage) {
            this.backgroundImage.mainPass.baseColor = color;
        }
        else {
            this.printWarning("trying to change color in the invalid Background Image!");
        }
        if (this.iconImage) {
            PassHelper_1.PassHelper.setBaseColorAlpha(this.iconImage.mainPass, color.a);
        }
    }
    /**
     * Sets label's color.
     * @param color - new color.
     * @private
     */
    setLabelColor(color) {
        if (this.labelText) {
            this.labelText.textFill.color = color;
        }
        else {
            this.printWarning("trying to change color in the invalid Label Text!");
        }
    }
    /**
     * Initializes Label.
     * @param parent - parent SceneObject.
     * @private
     */
    initializeLabel(parent) {
        this.labelSO = this.destructionHelper.findRecursivelyOrInstantiate(this.so, "Label", this.textPrefab);
        this.labelText = this.destructionHelper.getOrAddComponent(this.labelSO, "Text");
        this.labelST = this.destructionHelper.getOrAddComponent(this.labelSO, "ScreenTransform");
        this.labelExtentsSO = this.destructionHelper.createExtentsTarget(this.labelSO, this.labelText, "Label Extents");
        this.labelExtentsST = this.destructionHelper.getOrAddComponent(this.labelExtentsSO, "ScreenTransform");
    }
    /**
     * Initializes BaseHeight - text with one stroke.
     * @param parent - parent SceneObject.
     * @private
     */
    initializeBaseHeight(parent) {
        this.baseHeightSO = this.destructionHelper.findRecursivelyOrInstantiate(this.so, "Base Height", this.textPrefab);
        this.baseHeightText = this.destructionHelper.getOrAddComponent(this.baseHeightSO, "Text");
        this.baseHeightText.text = "I";
        this.baseHeightText.size = this.labelText.size;
        this.baseHeightText.textFill.color = this.TRANSPARENT;
        this.baseHeightExtentsSO = this.destructionHelper.createExtentsTarget(this.baseHeightSO, this.baseHeightText, "Base Height Extents");
        this.baseHeightExtentsST = this.destructionHelper.getOrAddComponent(this.baseHeightExtentsSO, "ScreenTransform");
    }
    /**
     * Initializes Background.
     * @param parent - parent SceneObject.
     * @private
     */
    initializeBackground(parent) {
        this.backgroundSO = this.destructionHelper.findRecursivelyOrInstantiate(parent, "Background", this.backgroundPrefab);
        this.backgroundST = this.destructionHelper.getOrAddComponent(this.backgroundSO, "ScreenTransform");
        this.backgroundImage = this.destructionHelper.getOrAddComponent(this.backgroundSO, "Image");
        PassHelper_1.PassHelper.cloneAndReplaceMaterial(this.backgroundImage);
    }
    /**
     * Initializes Icon.
     * @param parent - parent SceneObject.
     * @private
     */
    initializeIcon(parent) {
        this.iconSO = this.destructionHelper.findRecursivelyOrInstantiate(parent, "Icon", this.iconPrefab);
        this.iconST = this.destructionHelper.getOrAddComponent(this.iconSO, "ScreenTransform");
        this.iconImage = this.destructionHelper.getOrAddComponent(this.iconSO, "Image");
        PassHelper_1.PassHelper.cloneAndReplaceMaterial(this.iconImage);
    }
    __initialize() {
        super.__initialize();
        this.onEnabledInteractable = new Event_1.Event();
        this.onDisabledInteractable = new Event_1.Event();
        this.onPressUp = new Event_1.Event();
        this.onPressDown = new Event_1.Event();
        this.onPress = new Event_1.Event();
        this.DEFAULT_BACKGROUND_COLOR = new vec4(0.95, 0.95, 0.95, 1.0);
        this.DEFAULT_PRESSED_ALPHA = 0.8;
        this.DEFAULT_LABEL_COLOR = new vec4(0.0, 0.0, 0.0, 1.0);
        this.DISABLED_BACKGROUND_COLOR = new vec4(0.25, 0.25, 0.25, 1.0);
        this.DISABLED_LABEL_COLOR = new vec4(0.5, 0.5, 0.5, 1.0);
        this.PRIMARY_BACKGROUND_COLOR = new vec4(1.0, 1.0, 0.0, 1.0);
        this.PRIMARY_LABEL_COLOR = new vec4(0.0, 0.0, 0.0, 1.0);
        this.SECONDARY_BACKGROUND_COLOR = new vec4(0.15, 0.15, 0.15, 1.0);
        this.SECONDARY_LABEL_COLOR = new vec4(1.0, 1.0, 1.0, 1.0);
        this.BOUNCE_UNIFORM_SCALE = 0.8;
        this.SQUISH_SCALE = new vec3(1.1, 0.8, 1.0);
        this.ICON_RATIO = 1.5;
        this.DEFAULT_SIZE = new vec2(0.1, 0.1);
        this.DEFAULT_TEXT_SIZE = 24;
        this.FRAME_DELAY = 0.1;
        this.BACKGROUND_HEIGHT_RATIO = 0.5;
        this.LABEL_HEIGHT_RATIO = 1.5;
        this.TRANSPARENT = new vec4(0.0, 0.0, 0.0, 0.0);
        this.destructionHelper = new DestructionHelper_1.DestructionHelper();
        this.sceneEventHelper = new SceneEventHelper_1.SceneEventHelper(this);
        this.initialized = false;
        this._animationType = AnimationType.Bounce;
        this.labelTextString = "";
        this.pressed = false;
        this.initialTrigger = false;
    }
};
Button = __decorate([
    component
], Button);
exports.Button = Button;
