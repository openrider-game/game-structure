import { STATES } from "../../constants/StateConstants";
import Game from "../Game";
import LifeCycle from "../interface/LifeCycle";
import State from "./State";

export default class StateManager implements LifeCycle {
    public game: Game;
    private states: Map<string, State>;
    private stateStack: Array<State>;

    public constructor(game: Game) {
        this.game = game;

        this.states = new Map<string, State>();
        this.stateStack = new Array<State>();

        STATES.forEach((stateClass, name) => this.addState(stateClass, name));
    }

    public push(name: string) {
        let state = this.getState(name);

        if (state) {
            state.onEnter();
            this.stateStack.push(state);
        }
    }

    public pop() {
        if (this.stateStack.length) {
            this.getCurrent()?.onLeave();
            return this.stateStack.pop();
        }

        return null;
    }

    private addState(stateClass: new (manager: StateManager) => State, name: string) {
        let state = new stateClass(this);
        this.states.set(name, state);
    }

    public getState(name: string) {
        return this.states.get(name);
    }

    public fixedUpdate() {
        if (this.stateStack.length) {
            this.getCurrent()?.fixedUpdate();
        }
    }

    public update(progress: number, delta: number) {
        if (this.stateStack.length) {
            this.getCurrent()?.update(progress, delta);
        }
    }

    public render(ctx: CanvasRenderingContext2D) {
        if (this.stateStack.length) {
            this.getCurrent()?.render(ctx);
        }
    }

    public getCurrent() {
        if (this.stateStack.length) {
            return this.stateStack[this.stateStack.length - 1];
        }
    }
}