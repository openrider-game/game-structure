import EventHandler from "../../interface/EventHandler";
import LifeCycle from "../../interface/LifeCycle";

export default abstract class Layer implements LifeCycle, EventHandler {
    onEnter(): void {}
    onLeave(): void {}
    onMouseDown(_e: MouseEvent): boolean { return true; }
    onMouseUp(_e: MouseEvent): boolean { return true; }
    onMouseMove(_e: MouseEvent): boolean { return true; }
    onScroll(_e: WheelEvent): boolean { return true; }
    onMouseEnter(_e: MouseEvent): void {}
    onMouseOut(_e: MouseEvent): void {}
    onContextMenu(_e: MouseEvent): boolean { return true; }
    onVisibilityChange(): void {}
    onKeyDown(_e: KeyboardEvent): void {}
    onKeyUp(_e: KeyboardEvent): void {}

    fixedUpdate() {};
    update(_progress: number, _delta: number) {}

    abstract render(ctx: CanvasRenderingContext2D): void;
}