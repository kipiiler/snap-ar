@component
export class RequestAPI extends BaseScriptComponent {
  @input remoteServiceModule: RemoteServiceModule;
  //   remoteServiceModule =
  // require("LensStudio:RemoteServiceModule") as RemoteServiceModule;
  @input remoteMediaModule: RemoteMediaModule;
  //   @input imageMaterial: Material;

  onAwake() {
    this.createEvent("OnStartEvent").bind(() => this.onStart());
  }

  onStart() {
    // var httpRequest = RemoteServiceHttpRequest.create();
    // httpRequest.url = "https://spectacles-taupe.vercel.app/api";
    // httpRequest.method = RemoteServiceHttpRequest.HttpRequestMethod.Get;
    // httpRequest.setHeader("accept", "application/json");
    // print("Sending request!");
    // this.remoteServiceModule.performHttpRequest(httpRequest, (response) => {
    //   print(`HTTP CODE ${response.statusCode}`);
    //   print(`Content-Type: ${response.contentType}`);
    //   print(`Headers: ${JSON.stringify(response.headers)}`);
    //   print(response.body);
    // });
  }
}
