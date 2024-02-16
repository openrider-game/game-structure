import EventHandler from "../../interface/EventHandler";
import LifeCycle from "../../interface/LifeCycle";
import State from "../State";
export default abstract class Layer implements LifeCycle, EventHandler {
    public state: State;

    public constructor(state: State) {
        this.state = state;
    }

    public onEnter(): void { }
    public onLeave(): void { }
    public onMouseDown(_e: MouseEvent): boolean { return true; }
    public onMouseUp(_e: MouseEvent): boolean { return true; }
    public onMouseMove(_e: MouseEvent): boolean { return true; }
    public onScroll(_e: WheelEvent): boolean { return true; }
    public onMouseEnter(_e: MouseEvent): void { }
    public onMouseOut(_e: MouseEvent): void { }
    public onContextMenu(_e: MouseEvent): boolean { return true; }
    public onVisibilityChange(): void { }
    public onKeyDown(_e: KeyboardEvent): void { }
    public onKeyUp(_e: KeyboardEvent): void { }
    public onKeyboardDown(_e: CustomEventInit<any>): void { }
    public onKeyboardUp(_e: CustomEventInit<any>): void { }

    public fixedUpdate() { };
    public update(_progress: number, _delta: number) { }

    public abstract render(ctx: CanvasRenderingContext2D): void;
}