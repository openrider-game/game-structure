import LifeCycle from "../../interface/LifeCycle";

export default abstract class Layer implements LifeCycle {
    
    // Layers are mostly used to render so the fixedUpdate and update
    // functions are "implemented" with empty bodies to avoid duplication
    // in classes extending Layer
    
    fixedUpdate() {};
    update(_progress: number, _delta: number) {}

    abstract render(ctx: CanvasRenderingContext2D): void;
}