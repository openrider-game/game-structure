import EventHandler from "../interface/EventHandler";
import LifeCycle from "../interface/LifeCycle";
import State from "../state/State";
import Layer from "./layer/Layer";

export default abstract class Scene implements LifeCycle, EventHandler {
    public state: State;
    public layers: Map<string, Layer>;
    protected layerStack: Array<Layer>;

    public constructor(state: State) {
        this.state = state;

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

    public fixedUpdate(): void {
        this.layerStack.forEach(layer => layer.fixedUpdate());
    }

    public update(progress: number, delta: number): void {
        this.layerStack.forEach(layer => layer.update(progress, delta));
    }

    public render(ctx: CanvasRenderingContext2D): void {
        this.layerStack.forEach(layer => layer.render(ctx));
    }
}