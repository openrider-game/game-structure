import EventHandler from "../interface/EventHandler";
import LifeCycle from "../interface/LifeCycle";
import Scene from "../scene/Scene";
import StateManager from "./StateManager";

export default abstract class State implements LifeCycle, EventHandler {
    public manager: StateManager;
    public scenes: Map<string, Scene>;
    protected currentScene: Scene | undefined;

    public constructor(manager: StateManager) {
        this.manager = manager;

        this.scenes = new Map();
    }
    
    public onEnter(): void {
        this.currentScene?.onEnter();
    }
    
    public onLeave(): void {
        this.currentScene?.onLeave();
    }
    
    public onMouseDown(e: MouseEvent): boolean {
        this.currentScene?.onMouseDown(e);

        return true;
    }
    
    public onMouseUp(e: MouseEvent): boolean {
        this.currentScene?.onMouseUp(e);

        return true;
    }
    
    public onMouseMove(e: MouseEvent): boolean {
        this.currentScene?.onMouseMove(e);

        return true;
    }
    
    public onScroll(e: WheelEvent): boolean {
        this.currentScene?.onScroll(e);

        return true;
    }
    
    public onMouseEnter(e: MouseEvent): void {
        this.currentScene?.onMouseEnter(e);
    }
    
    public onMouseOut(e: MouseEvent): void {
        this.currentScene?.onMouseOut(e);
    }
    
    public onContextMenu(e: MouseEvent): boolean {
        this.currentScene?.onContextMenu(e);
        
        return true;
    }
    
    public onVisibilityChange(): void {
        this.currentScene?.onVisibilityChange();
    }
    
    public onKeyDown(e: KeyboardEvent): void {
        this.currentScene?.onKeyDown(e);
    }
    
    public onKeyUp(e: KeyboardEvent): void {
        this.currentScene?.onKeyUp(e);
    }
    
    public fixedUpdate(): void {
        this.currentScene?.fixedUpdate();
    }
    
    public update(progress: number, delta: number): void {
        this.currentScene?.update(progress, delta);
    }

    public render(ctx: CanvasRenderingContext2D) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        this.currentScene?.render(ctx);
    };
}