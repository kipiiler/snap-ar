"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhotoTaker = void 0;
var __selfType = requireType("./PhotoTaker");
function component(target) { target.getTypeName = function () { return __selfType; }; }
let PhotoTaker = class PhotoTaker extends BaseScriptComponent {
    //@input cameraModule: CameraModule
    onAwake() {
        this.createEvent("OnStartEvent").bind(() => this.onStart());
    }
    onStart() {
        // const request = CameraModule.createCameraRequest();
        // request.cameraId = CameraModule.CameraId.Default_Color;
        // request.imageSmallerDimension = 756;
        // const cameraTexture = this.cameraModule.requestCamera(request);
        // const provider = cameraTexture.control as CameraTextureProvider;
        // provider.onNewFrame.add(() => {
        //   if (!this.textureCopy) {
        //     const width = cameraTexture.getWidth(); // 1008
        //     const height = cameraTexture.getHeight(); // 756
        //     this.textureCopy =
        //       ProceduralTextureProvider.createFromTexture(cameraTexture);
        //     const provider2 = this.textureCopy.control as ProceduralTextureProvider;
        //     const data = new Uint8Array(width * height * 4);
        //     print("h" + height);
        //     print("W" + width);
        //     provider2.getPixels(0, 0, width, height, data);
        //     this.encodeImage(data, width, height);
        //   }
        // });
        // this.sceneObject.getComponent("Image").mainPass.baseTex = cameraTexture;
    }
    encodeImage(data, width, height) {
        print(data.length);
        // for (let i = 0; i < 255; i++) {
        //   print(data[i]);
        // }
    }
};
exports.PhotoTaker = PhotoTaker;
exports.PhotoTaker = PhotoTaker = __decorate([
    component
], PhotoTaker);
//# sourceMappingURL=PhotoTaker.js.map