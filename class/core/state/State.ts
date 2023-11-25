import EventHandler from "../interface/EventHandler";
import LifeCycle from "../interface/LifeCycle";
import Scene from "../scene/Scene";
import StateManager from "./StateManager";

export default abstract class State implements LifeCycle, EventHandler {
    public manager: StateManager;
    public scene: Scene;
    protected currentScene: Scene | undefined;

    public constructor(manager: StateManager) {
        this.manager = manager;

        this.scene = this.initScene();
    }

    protected abstract initScene(): Scene;

    public onEnter(): void {
        this.scene.onEnter();
    }

    public onLeave(): void {
        this.scene.onLeave();
    }

    public onMouseDown(e: MouseEvent): boolean {
        this.scene.onMouseDown(e);

        return true;
    }

    public onMouseUp(e: MouseEvent): boolean {
        this.scene.onMouseUp(e);

        return true;
    }

    public onMouseMove(e: MouseEvent): boolean {
        this.scene.onMouseMove(e);

        return true;
    }

    public onScroll(e: WheelEvent): boolean {
        this.scene.onScroll(e);

        return true;
    }

    public onMouseEnter(e: MouseEvent): void {
        this.scene.onMouseEnter(e);
    }

    public onMouseOut(e: MouseEvent): void {
        this.scene.onMouseOut(e);
    }

    public onContextMenu(e: MouseEvent): boolean {
        this.scene.onContextMenu(e);

        return true;
    }

    public onVisibilityChange(): void {
        this.scene.onVisibilityChange();
    }

    public onKeyDown(e: KeyboardEvent): void {
        this.scene.onKeyDown(e);
    }

    public onKeyUp(e: KeyboardEvent): void {
        this.scene.onKeyUp(e);
    }

    public fixedUpdate(): void {
        this.scene.fixedUpdate();
    }

    public update(progress: number, delta: number): void {
        this.scene.update(progress, delta);
    }

    public render(ctx: CanvasRenderingContext2D) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        this.scene.render(ctx);
    };
}