"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentWithDebug = void 0;
class ComponentWithDebug extends BaseScriptComponent {
    printDebug(message) {
        if (this.printDebugStatements) {
            print(this.name + " - " + message);
        }
    }
    printWarning(message) {
        if (this.printWarningStatements) {
            print(this.name + " - WARNING, " + message);
        }
    }
}
exports.ComponentWithDebug = ComponentWithDebug;
