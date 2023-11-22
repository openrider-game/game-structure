import LifeCycle from "../interface/LifeCycle";
import Layer from "./layer/Layer";

export default abstract class Scene implements LifeCycle {
    layers: Map<string, Layer>;

    constructor() {
        this.layers = new Map();
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