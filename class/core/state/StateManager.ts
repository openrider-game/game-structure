import { STATES } from "../../constants/StateConstants";
import Game from "../Game";
import LifeCycle from "../interface/LifeCycle";
import State from "./State";

export default class StateManager implements LifeCycle {
    game: Game;
    states: Map<string, State>;
    stateStack: Array<State>;

    constructor(game: Game) {
        this.game = game;

        this.states = new Map();
        this.stateStack = new Array();

        STATES.forEach((stateClass, name) => this.addState(stateClass, name));
    }

    push(name: string) {
        let state = this.getState(name);
        
        if(state) {
            state.onEnter();
            this.stateStack.push(state);
        }
    }

    pop() {
        if (this.stateStack.length) {
            this.getCurrent()?.onLeave();
            return this.stateStack.pop();
        }

        return null;
    }

    addState(stateClass: new (manager: StateManager) => State, name: string) {
        let state = new stateClass(this);
        this.states.set(name, state);
    }

    getState(name: string) {
        return this.states.get(name);
    }

    fixedUpdate() {
        if (this.stateStack.length) {
            this.getCurrent()?.fixedUpdate();
        }
    }

    update(progress: number, delta: number) {
        if (this.stateStack.length) {
            this.getCurrent()?.update(progress, delta);
        }
    }

    render(ctx: CanvasRenderingContext2D) {
        if (this.stateStack.length) {
            this.getCurrent()?.render(ctx);
        }
    }

    getCurrent() {
        if(this.stateStack.length) {
            return this.stateStack[this.stateStack.length - 1];
        }
    }
}