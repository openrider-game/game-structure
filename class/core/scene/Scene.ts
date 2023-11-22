import EventHandler from "../interface/EventHandler";
import LifeCycle from "../interface/LifeCycle";
import Layer from "./layer/Layer";

export default abstract class Scene implements LifeCycle, EventHandler {
    layers: Array<Layer>;

    constructor() {
        this.layers = new Array();

        this.initLayers();
    }

    abstract initLayers(): void;

    onEnter(): void {
        this.layers.forEach(layer => layer.onEnter());
    }

    onLeave(): void {
        this.layers.forEach(layer => layer.onLeave());
    }

    onMouseDown(e: MouseEvent): boolean {
        for (var i = this.layers.length - 1; i >= 0; i--) {
            if(!this.layers[i].onMouseDown(e)) {
                break;
            }
        }

        return true;
    }

    onMouseUp(e: MouseEvent): boolean {
        for (var i = this.layers.length - 1; i >= 0; i--) {
            if(!this.layers[i].onMouseUp(e)) {
                break;
            }
        }

        return true;
    }

    onMouseMove(e: MouseEvent): boolean {
        for (var i = this.layers.length - 1; i >= 0; i--) {
            if(!this.layers[i].onMouseMove(e)) {
                break;
            }
        }

        return true;
    }

    onScroll(e: WheelEvent): boolean {
        for (var i = this.layers.length - 1; i >= 0; i--) {
            if(!this.layers[i].onScroll(e)) {
                break;
            }
        }

        return true;
    }

    onMouseEnter(e: MouseEvent): void {
        this.layers.forEach(layer => layer.onMouseEnter(e));
    }

    onMouseOut(e: MouseEvent): void {
        this.layers.forEach(layer => layer.onMouseOut(e));
    }

    onContextMenu(e: MouseEvent): boolean {
        for (var i = this.layers.length - 1; i >= 0; i--) {
            if(!this.layers[i].onContextMenu(e)) {
                break;
            }
        }

        return true;
    }

    onVisibilityChange(): void {
        this.layers.forEach(layer => layer.onVisibilityChange());
    }

    onKeyDown(e: KeyboardEvent): void {
        this.layers.forEach(layer => layer.onKeyDown(e));
    }

    onKeyUp(e: KeyboardEvent): void {
        this.layers.forEach(layer => layer.onKeyUp(e));
    } 

    fixedUpdate(): void {
        this.layers.forEach(layer => layer.fixedUpdate());
    }

    update(progress: number, delta: number): void {
        this.layers.forEach(layer => layer.update(progress, delta));
    }

    render(ctx: CanvasRenderingContext2D): void {
        this.layers.forEach(layer => layer.render(ctx));
    }
}