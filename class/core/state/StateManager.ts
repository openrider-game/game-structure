import { STATES } from "../../states/constants/StateConstants";
import LifeCycle from "../interface/LifeCycle";
import State, { StateConstructor } from "./State";

export default class StateManager implements LifeCycle {
    private states: Map<string, State>;
    private stateStack: Array<State>;

    public constructor() {

        this.states = new Map<string, State>();
        this.stateStack = new Array<State>();

        STATES.forEach((stateClass, name) => this.addState(stateClass, name));
    }

    public push(name: string): void {
        let state = this.getState(name);

        if (state) {
            state.onEnter();
            this.getCurrent()?.onLeave();
            this.stateStack.push(state);
        }
    }

    public pop(): State | null | undefined {
        if (this.stateStack.length) {
            this.getCurrent()?.onLeave();
            let poppedState = this.stateStack.pop();
            this.getCurrent()?.onEnter();
            return poppedState;
        }

        return null;
    }

    private addState<T extends State>(stateClass: StateConstructor<T>, name: string): void {
        let state = new stateClass(this);
        this.states.set(name, state);
    }

    public getState(name: string): State | undefined {
        return this.states.get(name);
    }

    public fixedUpdate(): void {
        if (this.stateStack.length) {
            this.getCurrent()?.fixedUpdate();
        }
    }

    public update(progress: number, delta: number): void {
        if (this.stateStack.length) {
            this.getCurrent()?.update(progress, delta);
        }
    }

    public render(ctx: CanvasRenderingContext2D): void {
        if (this.stateStack.length) {
            this.getCurrent()?.render(ctx);
        }
    }

    public getCurrent(): State | undefined {
        if (this.stateStack.length) {
            return this.stateStack[this.stateStack.length - 1];
        }
    }
}