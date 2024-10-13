"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PictureButton = exports.arrayBufferToBase64 = void 0;
var __selfType = requireType("./PictureButton");
function component(target) { target.getTypeName = function () { return __selfType; }; }
const ContainerFrame_1 = require("SpectaclesInteractionKit/Components/UI/ContainerFrame/ContainerFrame");
function arrayBufferToBase64(bytes) {
    const encodings = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    let base64 = "";
    var byteRemainder = bytes.length % 3;
    var mainLength = bytes.length - byteRemainder;
    // Main loop deals with bytes in chunks of 3
    for (var i = 0; i < mainLength; i = i + 3) {
        // Combine the three bytes into a single integer
        var chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
        // Use bitmasks to extract 6-bit segments from the triplet
        var a = (chunk & 16515072) >> 18; // 16515072 = (2^6 - 1) << 18
        var b = (chunk & 258048) >> 12; // 258048   = (2^6 - 1) << 12
        var c = (chunk & 4032) >> 6; // 4032     = (2^6 - 1) << 6
        var d = chunk & 63; // 63       = 2^6 - 1
        // Convert the raw binary segments to the appropriate ASCII encoding
        base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d];
    }
    // Deal with the remaining bytes and padding
    if (byteRemainder === 1) {
        chunk = bytes[mainLength];
        const a = (chunk & 252) >> 2; // 252 = (2^6 - 1) << 2
        // Set the 4 least significant bits to zero
        const b = (chunk & 3) << 4; // 3   = 2^2 - 1
        base64 += encodings[a] + encodings[b] + "==";
    }
    else if (byteRemainder === 2) {
        chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1];
        a = (chunk & 64512) >> 10; // 64512 = (2^6 - 1) << 10
        b = (chunk & 1008) >> 4; // 1008  = (2^6 - 1) << 4
        // Set the 2 least significant bits to zero
        c = (chunk & 15) << 2; // 15    = 2^4 - 1
        base64 += encodings[a] + encodings[b] + encodings[c] + "=";
    }
    return base64;
}
exports.arrayBufferToBase64 = arrayBufferToBase64;
let PictureButton = class PictureButton extends BaseScriptComponent {
    onAwake() {
        this.createEvent("OnStartEvent").bind(() => this.onStart());
    }
    onStart() {
        this.sceneObject
            .getChild(0)
            .getComponent(ContainerFrame_1.ContainerFrame.getTypeName())
            .closeButton.onTrigger.add(() => {
            this.sceneObject.enabled = false;
        });
        this.sceneObject.enabled = false;
    }
    printSomething() {
        const request = CameraModule.createCameraRequest();
        request.cameraId = CameraModule.CameraId.Default_Color;
        request.imageSmallerDimension = 756;
        const cameraTexture = this.cameraModule.requestCamera(request);
        const provider = cameraTexture.control;
        this.done = false;
        provider.onNewFrame.add(() => {
            if (!this.done) {
                const width = cameraTexture.getWidth(); // 1008
                const height = cameraTexture.getHeight(); // 756
                this.textureCopy =
                    ProceduralTextureProvider.createFromTexture(cameraTexture);
                const provider2 = this.textureCopy.control;
                const data = new Uint8Array(width * height * 4);
                provider2.getPixels(0, 0, width, height, data);
                this.done = true;
                var image = this.imageDfs(this.sceneObject);
                if (image) {
                    image.mainPass.baseTex = this.textureCopy;
                }
                this.sceneObject.enabled = true;
            }
        });
    }
    imageDfs(node) {
        if (node == null)
            return null;
        if (node && node.getComponent("Image") && node.name === "ImageCapture") {
            return node.getComponent("Image");
        }
        for (const child of node.children) {
            const image = this.imageDfs(child);
            if (image) {
                return image;
            }
        }
        return null;
    }
    encodeImage(data, width, height) {
        var httpRequest = RemoteServiceHttpRequest.create();
        httpRequest.url = "https://nagelundhammerapi.onrender.com/matched";
        httpRequest.method = RemoteServiceHttpRequest.HttpRequestMethod.Post;
        httpRequest.setHeader("accept", "application/json");
        httpRequest.setHeader("Content-Type", "application/json");
        httpRequest.setHeader("Mutlipart", "form-data");
        httpRequest.body = JSON.stringify({
            image: data,
        });
        // let test_arr = new Uint8Array(4000);
        // for (let i = 0; i < 4000; i++) {
        //   test_arr[i] = data[i];
        // }
        // try {
        //   let text = arrayBufferToBase64(test_arr);
        //   print(text);
        // } catch (e) {
        //   print(e);
        // }
        // print(arrayBufferToBase64(data));
        // for (let i = 0; i < data.length; i++) {
        //   print(data[i]);
        // }
        //   JSON.stringify({
        // image: arrayBufferToBase64(data),
        //   })
        // );
        print("Sending to server");
        this.remoteServiceModule.performHttpRequest(httpRequest, (response) => {
            print(`HTTP CODE ${response.statusCode}`);
            print(`Content-Type: ${response.contentType}`);
            print(`Headers: ${JSON.stringify(response.headers)}`);
            print(response.body);
        });
    }
    __initialize() {
        super.__initialize();
        this.cameraModule = require("LensStudio:CameraModule");
        this.done = false;
    }
};
exports.PictureButton = PictureButton;
exports.PictureButton = PictureButton = __decorate([
    component
], PictureButton);
//# sourceMappingURL=PictureButton.js.map