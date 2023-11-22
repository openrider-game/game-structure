import LifeCycle from "../interface/LifeCycle";
import Scene from "../scene/Scene";
import StateManager from "./StateManager";

export default abstract class GameState implements LifeCycle {
    manager: StateManager;
    scenes: Map<string, Scene>;
    currentScene: Scene | undefined;

    constructor(manager: StateManager) {
        this.manager = manager;

        this.scenes = new Map();
    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        this.currentScene?.render(ctx);        
    };

    abstract fixedUpdate(): void;
    abstract update(progress: number, delta: number): void;

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