import State from "../core/state/State";
import StateManager from "../core/state/StateManager";
import DemoScene from "../scenes/demo/DemoScene";

export default class DemoState extends State {
    public constructor(stateManager: StateManager) {
        super(stateManager);

        this.scenes.set('demoscene', new DemoScene(this));
        this.currentScene = this.scenes.get('demoscene');
    }
}