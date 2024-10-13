"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridContentCreator = void 0;
var __selfType = requireType("./GridContentCreator");
function component(target) { target.getTypeName = function () { return __selfType; }; }
const PinchButton_1 = require("../PinchButton/PinchButton");
let GridContentCreator = class GridContentCreator extends BaseScriptComponent {
    //   @input
    //   itemsCount: number = 10;
    onAwake() {
        // this.createEvent("OnStartEvent").bind(() => this.onStart());
        this.setData();
    }
    onStart() {
        this.setData();
    }
    populateGrid() {
        const itemsCount = this.data.length;
        if (!this.itemPrefab) {
            throw new Error("ItemPrefab is not wired in SceneObject:" + this.getSceneObject().name);
        }
        const yStart = 0;
        const yOffset = -5.4;
        for (let i = 0; i < itemsCount; i++) {
            const item = this.itemPrefab.instantiate(this.getSceneObject());
            const screenTransform = item.getComponent("Component.ScreenTransform");
            const name = item.getChild(0).getComponent("Component.Text");
            name.text = this.data[i].name;
            const details = item.getChild(1).getComponent("Component.Text");
            details.text = "Time: " + this.data[i].description;
            //   const timing = item.getChild(4);
            //   print(timing);
            item
                .getChild(4)
                .getComponent(PinchButton_1.PinchButton.getTypeName())
                .onButtonPinched.add(() => {
                //   print("Button " + this.data[i].imageMedia);
                if (this.scenceObj) {
                    this.scenceObj.destroy();
                }
                const imageUrl = this.data[i].imageMedia;
                // "https://xqcxapescjjgidskqnhw.supabase.co/storage/v1/object/public/pics/IMG_2590.mov?t=2024-10-13T14%3A14%3A59.629Z";
                const resource = this.remoteServiceModule.makeResourceFromUrl(imageUrl);
                this.remoteMediaModule.loadResourceAsVideoTexture(resource, (texture) => {
                    const provider = texture.control;
                    provider.play(2);
                    provider.onPlaybackReady.add(() => {
                        this.scenceObj = global.scene.createSceneObject("RemoteImage");
                        const image = this.scenceObj.createComponent("Image");
                        image.addMaterial(this.imageMaterial);
                        image.mainMaterial.mainPass.baseTex = texture;
                        this.scenceObj
                            .getTransform()
                            .setWorldPosition(new vec3(0, 0, -100));
                        this.scenceObj
                            .getTransform()
                            .setWorldScale(new vec3(50, 50, 1));
                    });
                    provider.onPlaybackDone.add(() => {
                        print("Playback finished");
                        // remove the scene object
                        if (this.scenceObj)
                            this.scenceObj.destroy();
                    });
                }, (error) => {
                    print("REMOTE MEDIA ERROR: " + error);
                });
            });
            screenTransform.offsets.setCenter(new vec2(0, yStart + yOffset * i));
            item.enabled = true;
        }
    }
    setData() {
        this.data = [
            {
                name: "Karaoke Kelsey",
                description: "4th October 2024",
                imageMedia: "https://xqcxapescjjgidskqnhw.supabase.co/storage/v1/object/public/pics/IMG_2590.mov?t=2024-10-13T14%3A14%3A59.629Z",
            },
            {
                name: "Sleeping with Hoang",
                description: "25th Sep 2024",
                imageMedia: "https://xqcxapescjjgidskqnhw.supabase.co/storage/v1/object/public/pics/IMG_2753.mov",
            },
            {
                name: "Hackathon with Hoang",
                description: "19th Sep 2024",
                imageMedia: "https://xqcxapescjjgidskqnhw.supabase.co/storage/v1/object/public/pics/IMG_3043.mov?t=2024-10-13T14%3A58%3A02.753Z",
            },
            {
                name: "Dinner with Micheal",
                description: "12th Sep 2024",
                imageMedia: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/av1/360/Big_Buck_Bunny_360_10s_1MB.mp4",
            },
            {
                name: "Karaoke Kelsey",
                description: "4th October 2024",
                imageMedia: "https://xqcxapescjjgidskqnhw.supabase.co/storage/v1/object/public/pics/IMG_3042.mov?t=2024-10-13T14%3A58%3A17.848Z",
            },
            {
                name: "Sleeping with Hoang",
                description: "25th Sep 2023",
                imageMedia: "https://xqcxapescjjgidskqnhw.supabase.co/storage/v1/object/public/pics/IMG_2590.mov?t=2024-10-13T14%3A14%3A59.629Z",
            },
            {
                name: "Hackathon with Hoang",
                description: "Description 3",
                imageMedia: "https://xqcxapescjjgidskqnhw.supabase.co/storage/v1/object/public/pics/IMG_2590.mov?t=2024-10-13T14%3A14%3A59.629Z",
            },
            {
                name: "Dinner with Micheal",
                description: "Description 4",
                imageMedia: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/av1/360/Big_Buck_Bunny_360_10s_1MB.mp4",
            },
        ];
        this.populateGrid();
    }
    __initialize() {
        super.__initialize();
        this.data = [];
        this.scenceObj = null;
    }
};
exports.GridContentCreator = GridContentCreator;
exports.GridContentCreator = GridContentCreator = __decorate([
    component
], GridContentCreator);
//# sourceMappingURL=GridContentCreator.js.map