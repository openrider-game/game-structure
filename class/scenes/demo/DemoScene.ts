import Scene from "../../core/scene/Scene";
import DemoLayer from "./layers/DemoLayer";

export default class DemoScene extends Scene {
    constructor() {
        super();

        this.layers.set('demolayer', new DemoLayer());
    }
}