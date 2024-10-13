"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DestructionHelper = void 0;
class DestructionHelper {
    constructor() {
        this.destroyObjects = [];
    }
    getOrAddComponent(so, componentType) {
        const component = so.getComponent(componentType);
        if (isNull(component)) {
            return this.createComponent(so, componentType);
        }
        return component;
    }
    addOrOverrideComponent(so, componentType) {
        const component = so.getComponent(componentType);
        if (!isNull(component)) {
            component.destroy();
        }
        return this.createComponent(so, componentType);
    }
    createSceneObject(parent, name) {
        const so = global.scene.createSceneObject(name ? name : "");
        so.setParent(parent ? parent : null);
        this.destroyObjects.push(so);
        return so;
    }
    createComponent(so, componentType) {
        const component = so.createComponent(componentType);
        this.destroyObjects.push(component);
        return component;
    }
    createExtentsTarget(parent, visual, name) {
        const extentsSO = global.scene.createSceneObject(name);
        const extentsST = extentsSO.createComponent("ScreenTransform");
        extentsSO.setParent(parent);
        visual.extentsTarget = extentsST;
        return extentsSO;
    }
    findRecursivelyOrInstantiate(parent, name, prefab) {
        let so = this.findChildObjectWithNameRecursively(parent, name);
        if (!so) {
            so = this.instantiatePrefab(prefab, parent);
            this.setRenderLayerRecursively(so, parent.layer);
            so.name = name;
        }
        return so;
    }
    findChildObjectWithNameRecursively(so, childName) {
        const childCount = so.getChildrenCount();
        for (let i = 0; i < childCount; i++) {
            const child = so.getChild(i);
            if (child.name == childName) {
                return child;
            }
            const result = this.findChildObjectWithNameRecursively(child, childName);
            if (result) {
                return result;
            }
        }
        return null;
    }
    instantiatePrefab(prefab, parent) {
        const so = prefab.instantiate(parent);
        this.destroyObjects.push(so);
        return so;
    }
    setRenderLayerRecursively(so, layer) {
        so.layer = layer;
        let child;
        for (let i = 0; i < so.getChildrenCount(); i++) {
            child = so.getChild(i);
            this.setRenderLayerRecursively(child, layer);
        }
    }
    setRenderOrderRecursively(so, renderOrder) {
        const visuals = so.getComponents("Visual");
        for (const visual of visuals) {
            visual.setRenderOrder(renderOrder);
        }
        for (let i = 0; i < so.getChildrenCount(); i++) {
            this.setRenderOrderRecursively(so.getChild(i), renderOrder);
        }
    }
    getComponentRecursively(so, componentType) {
        const component = so.getComponent(componentType);
        if (component) {
            return component;
        }
        const childCount = so.getChildrenCount();
        for (let i = 0; i < childCount; i++) {
            const result = this.getComponentRecursively(so.getChild(i), componentType);
            if (result) {
                return result;
            }
        }
        return null;
    }
    getCameraRenderOrder(so) {
        if (!so) {
            print("Warning! Please, add component to hierarchy within orthographic camera.");
            return -1;
        }
        const camera = so.getComponent("Component.Camera");
        if (camera) {
            return camera.renderOrder;
        }
        else {
            return this.getCameraRenderOrder(so.getParent());
        }
    }
}
exports.DestructionHelper = DestructionHelper;
