import Scene from "../core/scene/Scene";
import State from "../core/state/State";
import DemoScene from "../scenes/demo/DemoScene";

export default class DemoState extends State {
    protected initScene(): Scene {
        return new DemoScene(this);
    }
}