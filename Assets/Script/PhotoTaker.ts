@component
export class PhotoTaker extends BaseScriptComponent {
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

  encodeImage(data: Uint8Array, width: number, height: number) {
    print(data.length);
    // for (let i = 0; i < 255; i++) {
    //   print(data[i]);
    // }
  }
}
