@component
export class WebRequest extends BaseScriptComponent {
  @input remoteServiceModule: RemoteServiceModule;
  @input remoteMediaModule: RemoteMediaModule;
  @input imageMaterial: Material;

  private scenceObj: SceneObject;

  onAwake() {
    // this.createEvent("OnStartEvent").bind(() => this.onStart());
  }

  onStart() {
    const imageUrl =
      "https://xqcxapescjjgidskqnhw.supabase.co/storage/v1/object/public/pics/IMG_2590.mov?t=2024-10-13T14%3A14%3A59.629Z";
    const resource = this.remoteServiceModule.makeResourceFromUrl(imageUrl);
    this.remoteMediaModule.loadResourceAsVideoTexture(
      resource,
      (texture) => {
        const provider = texture.control as VideoTextureProvider;
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
      },
      (error) => {
        print("REMOTE MEDIA ERROR: " + error);
      }
    );
  }
}
