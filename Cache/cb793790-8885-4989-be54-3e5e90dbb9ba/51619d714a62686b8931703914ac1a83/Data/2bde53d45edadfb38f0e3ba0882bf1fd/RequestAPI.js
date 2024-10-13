"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestAPI = void 0;
var __selfType = requireType("./RequestAPI");
function component(target) { target.getTypeName = function () { return __selfType; }; }
let RequestAPI = class RequestAPI extends BaseScriptComponent {
    //   @input imageMaterial: Material;
    onAwake() {
        this.createEvent("OnStartEvent").bind(() => this.onStart());
    }
    onStart() {
        var httpRequest = RemoteServiceHttpRequest.create();
        httpRequest.url = "https://spectacles-taupe.vercel.app/api";
        httpRequest.method = RemoteServiceHttpRequest.HttpRequestMethod.Get;
        httpRequest.setHeader("accept", "application/json");
        print("Sending request!");
        this.remoteServiceModule.performHttpRequest(httpRequest, (response) => {
            print(`HTTP CODE ${response.statusCode}`);
            print(`Content-Type: ${response.contentType}`);
            print(`Headers: ${JSON.stringify(response.headers)}`);
            print(response.body);
        });
    }
};
exports.RequestAPI = RequestAPI;
exports.RequestAPI = RequestAPI = __decorate([
    component
], RequestAPI);
//# sourceMappingURL=RequestAPI.js.map