import EventHandler from "../interface/EventHandler";
import LifeCycle from "../interface/LifeCycle";
import State from "../state/State";
import Layer from "./layer/Layer";

export default abstract class Scene implements LifeCycle, EventHandler {
    public state: State;
    protected layers: Array<Layer>;

    public constructor(state: State) {
        this.state = state;

        this.layers = new Array();

        this.initLayers();
    }

    protected abstract initLayers(): void;

    public onEnter(): void {
        this.layers.forEach(layer => layer.onEnter());
    }

    public onLeave(): void {
        this.layers.forEach(layer => layer.onLeave());
    }

    public onMouseDown(e: MouseEvent): boolean {
        for (var i = this.layers.length - 1; i >= 0; i--) {
            if(!this.layers[i].onMouseDown(e)) {
                break;
            }
        }

        return true;
    }

    public onMouseUp(e: MouseEvent): boolean {
        for (var i = this.layers.length - 1; i >= 0; i--) {
            if(!this.layers[i].onMouseUp(e)) {
                break;
            }
        }

        return true;
    }

    public onMouseMove(e: MouseEvent): boolean {
        for (var i = this.layers.length - 1; i >= 0; i--) {
            if(!this.layers[i].onMouseMove(e)) {
                break;
            }
        }

        return true;
    }

    public onScroll(e: WheelEvent): boolean {
        for (var i = this.layers.length - 1; i >= 0; i--) {
            if(!this.layers[i].onScroll(e)) {
                break;
            }
        }

        return true;
    }

    public onMouseEnter(e: MouseEvent): void {
        this.layers.forEach(layer => layer.onMouseEnter(e));
    }

    public onMouseOut(e: MouseEvent): void {
        this.layers.forEach(layer => layer.onMouseOut(e));
    }

    public onContextMenu(e: MouseEvent): boolean {
        for (var i = this.layers.length - 1; i >= 0; i--) {
            if(!this.layers[i].onContextMenu(e)) {
                break;
            }
        }

        return true;
    }

    public onVisibilityChange(): void {
        this.layers.forEach(layer => layer.onVisibilityChange());
    }

    public onKeyDown(e: KeyboardEvent): void {
        this.layers.forEach(layer => layer.onKeyDown(e));
    }

    public onKeyUp(e: KeyboardEvent): void {
        this.layers.forEach(layer => layer.onKeyUp(e));
    } 

    public fixedUpdate(): void {
        this.layers.forEach(layer => layer.fixedUpdate());
    }

    public update(progress: number, delta: number): void {
        this.layers.forEach(layer => layer.update(progress, delta));
    }

    public render(ctx: CanvasRenderingContext2D): void {
        this.layers.forEach(layer => layer.render(ctx));
    }
}