"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebRequest = void 0;
var __selfType = requireType("./VideoTranscribe");
function component(target) { target.getTypeName = function () { return __selfType; }; }
let WebRequest = class WebRequest extends BaseScriptComponent {
    onAwake() {
        // this.createEvent("OnStartEvent").bind(() => this.onStart());
    }
    onStart() {
        const imageUrl = "https://xqcxapescjjgidskqnhw.supabase.co/storage/v1/object/public/pics/IMG_2590.mov?t=2024-10-13T14%3A14%3A59.629Z";
        const resource = this.remoteServiceModule.makeResourceFromUrl(imageUrl);
        this.remoteMediaModule.loadResourceAsVideoTexture(resource, (texture) => {
            const provider = texture.control;
            provider.play(2);
            provider.onPlaybackReady.add(() => {
                this.scenceObj = global.scene.createSceneObject("RemoteImage");
                const image = this.scenceObj.createComponent("Image");
                image.addMaterial(this.imageMaterial);
                image.mainMaterial.mainPass.baseTex = texture;
                this.scenceObj.getTransform().setWorldPosition(new vec3(0, 0, -100));
                this.scenceObj.getTransform().setWorldScale(new vec3(50, 50, 1));
            });
            provider.onPlaybackDone.add(() => {
                print("Playback finished");
                // remove the scene object
                this.scenceObj.destroy();
            });
        }, (error) => {
            print("REMOTE MEDIA ERROR: " + error);
        });
    }
};
exports.WebRequest = WebRequest;
exports.WebRequest = WebRequest = __decorate([
    component
], WebRequest);
//# sourceMappingURL=VideoTranscribe.js.map