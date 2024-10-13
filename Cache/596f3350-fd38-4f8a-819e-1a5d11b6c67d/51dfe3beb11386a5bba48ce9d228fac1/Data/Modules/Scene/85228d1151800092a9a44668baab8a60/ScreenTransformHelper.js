"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScreenTransformHelper = void 0;
class ScreenTransformHelper {
    static expandRectSidePositions(rect, right, left, top, bottom) {
        rect.right = rect.right + right;
        rect.left = rect.left - left;
        rect.top = rect.top + top;
        rect.bottom = rect.bottom - bottom;
    }
    static setRectSidePositions(rect, right, left, top, bottom) {
        rect.right = right;
        rect.left = left;
        rect.top = top;
        rect.bottom = bottom;
    }
}
exports.ScreenTransformHelper = ScreenTransformHelper;
