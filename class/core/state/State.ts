import EventHandler from "../interface/EventHandler";
import LifeCycle from "../interface/LifeCycle";
import Layer from "./layer/Layer";
import StateManager from "./StateManager";

export type StateConstructor<T extends State> = {
    new(manager: StateManager): T;
}

export default abstract class State implements LifeCycle, EventHandler {
    public manager: StateManager;
    public layers: Map<string, Layer>;
    protected layerStack: Array<Layer>;

    public constructor(manager: StateManager) {
        this.manager = manager;

        this.layerStack = new Array<Layer>();

        this.layers = this.initLayers();
        this.layerStack.push(...this.layers.values());
    }

    protected abstract initLayers(): Map<string, Layer>;

    public onEnter(): void {
        this.layerStack.forEach(layer => layer.onEnter());
    }

    public onLeave(): void {
        this.layerStack.forEach(layer => layer.onLeave());
    }

    public onMouseDown(e: MouseEvent): boolean {
        for (var i = this.layerStack.length - 1; i >= 0; i--) {
            if (!this.layerStack[i].onMouseDown(e)) {
                break;
            }
        }

        return true;
    }

    public onMouseUp(e: MouseEvent): boolean {
        for (var i = this.layerStack.length - 1; i >= 0; i--) {
            if (!this.layerStack[i].onMouseUp(e)) {
                break;
            }
        }

        return true;
    }

    public onMouseMove(e: MouseEvent): boolean {
        for (var i = this.layerStack.length - 1; i >= 0; i--) {
            if (!this.layerStack[i].onMouseMove(e)) {
                break;
            }
        }

        return true;
    }

    public onScroll(e: WheelEvent): boolean {
        for (var i = this.layerStack.length - 1; i >= 0; i--) {
            if (!this.layerStack[i].onScroll(e)) {
                break;
            }
        }

        return true;
    }

    public onMouseEnter(e: MouseEvent): void {
        this.layerStack.forEach(layer => layer.onMouseEnter(e));
    }

    public onMouseOut(e: MouseEvent): void {
        this.layerStack.forEach(layer => layer.onMouseOut(e));
    }

    public onContextMenu(e: MouseEvent): boolean {
        for (var i = this.layerStack.length - 1; i >= 0; i--) {
            if (!this.layerStack[i].onContextMenu(e)) {
                break;
            }
        }

        return true;
    }

    public onVisibilityChange(): void {
        this.layerStack.forEach(layer => layer.onVisibilityChange());
    }

    public onKeyDown(e: KeyboardEvent): void {
        this.layerStack.forEach(layer => layer.onKeyDown(e));
    }

    public onKeyUp(e: KeyboardEvent): void {
        this.layerStack.forEach(layer => layer.onKeyUp(e));
    }

    public onKeyboardDown(e: CustomEventInit<any>): void {
        this.layerStack.forEach(layer => layer.onKeyboardDown(e));
    }

    public onKeyboardUp(e: CustomEventInit<any>): void {
        this.layerStack.forEach(layer => layer.onKeyboardUp(e));
    }

    public fixedUpdate(): void {
        this.layerStack.forEach(layer => layer.fixedUpdate());
    }

    public update(progress: number, delta: number): void {
        this.layerStack.forEach(layer => layer.update(progress, delta));
    }

    public render(ctx: CanvasRenderingContext2D): void {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        this.layerStack.forEach(layer => layer.render(ctx));
    }
}