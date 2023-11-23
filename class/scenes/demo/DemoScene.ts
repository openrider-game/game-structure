import Scene from "../../core/scene/Scene";
import DemoBackgroundLayer from "./layers/DemoBackgroundLayer";
import DemoEventLayer from "./layers/DemoEventLayer";

export default class DemoScene extends Scene {
    protected initLayers(): void {
        this.layers.push(new DemoBackgroundLayer());
        this.layers.push(new DemoEventLayer());
    }
}