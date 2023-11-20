import LifeCycle from "../interface/LifeCycle";
import StateManager from "./StateManager";

export default abstract class GameState implements LifeCycle {
    manager: StateManager;

    constructor(manager: StateManager) {
        this.manager = manager;
    }

    abstract fixedUpdate(): void;
    abstract update(progress: number, delta: number): void;
    abstract render(ctx: CanvasRenderingContext2D): void;

    abstract onEnter(): void;
    abstract onLeave(): void;

    abstract onMouseDown(e: MouseEvent): void;
    abstract onMouseUp(e: MouseEvent): void;
    abstract onMouseMove(e: MouseEvent): void;
    abstract onScroll(e: WheelEvent): void;

    abstract onMouseEnter(e: MouseEvent): void;
    abstract onMouseOut(e: MouseEvent): void;

    abstract onContextMenu(e: MouseEvent): void;
    
    abstract onVisibilityChange(): void;
    
    abstract onKeyDown(e: KeyboardEvent): void;
    abstract onKeyUp(e: KeyboardEvent): void;
}