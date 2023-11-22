import EventHandler from "../interface/EventHandler";
import LifeCycle from "../interface/LifeCycle";
import Scene from "../scene/Scene";
import StateManager from "./StateManager";

export default abstract class State implements LifeCycle, EventHandler {
    manager: StateManager;
    scenes: Map<string, Scene>;
    currentScene: Scene | undefined;

    constructor(manager: StateManager) {
        this.manager = manager;

        this.scenes = new Map();
    }
    
    onEnter(): void {
        this.currentScene?.onEnter();
    }
    
    onLeave(): void {
        this.currentScene?.onLeave();
    }
    
    onMouseDown(e: MouseEvent): boolean {
        this.currentScene?.onMouseDown(e);

        return true;
    }
    
    onMouseUp(e: MouseEvent): boolean {
        this.currentScene?.onMouseUp(e);

        return true;
    }
    
    onMouseMove(e: MouseEvent): boolean {
        this.currentScene?.onMouseMove(e);

        return true;
    }
    
    onScroll(e: WheelEvent): boolean {
        this.currentScene?.onScroll(e);

        return true;
    }
    
    onMouseEnter(e: MouseEvent): void {
        this.currentScene?.onMouseEnter(e);
    }
    
    onMouseOut(e: MouseEvent): void {
        this.currentScene?.onMouseOut(e);
    }
    
    onContextMenu(e: MouseEvent): boolean {
        this.currentScene?.onContextMenu(e);
        
        return true;
    }
    
    onVisibilityChange(): void {
        this.currentScene?.onVisibilityChange();
    }
    
    onKeyDown(e: KeyboardEvent): void {
        this.currentScene?.onKeyDown(e);
    }
    
    onKeyUp(e: KeyboardEvent): void {
        this.currentScene?.onKeyUp(e);
    }
    
    fixedUpdate(): void {
        this.currentScene?.fixedUpdate();
    }
    
    update(progress: number, delta: number): void {
        this.currentScene?.update(progress, delta);
    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        this.currentScene?.render(ctx);
    };
}