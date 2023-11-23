import EventHandler from "../../interface/EventHandler";
import LifeCycle from "../../interface/LifeCycle";
import Vector from "../../math/Vector";

export default abstract class UiElement implements LifeCycle, EventHandler {
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public hovered: boolean;
    public focused: boolean;

    public constructor() {
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;

        this.hovered = false;
        this.focused = false;
    }

    protected abstract intersects(vec: Vector): boolean;
    protected abstract onClick(): void;

    public abstract onEnter(): void;
    public abstract onLeave(): void;

    public onMouseDown(e: MouseEvent): boolean {
        this.focused = this.intersects(new Vector(e.clientX, e.clientY));

        return !this.focused;
    }

    public onMouseUp(e: MouseEvent): boolean {
        let intersects = this.intersects(new Vector(e.clientX, e.clientY));

        if (intersects && this.focused) {
            this.focused = false;
            this.onClick();

            return false;
        }

        return true;
    }

    public onMouseMove(e: MouseEvent): boolean {
        let intersects = this.intersects(new Vector(e.clientX, e.clientY));
        this.hovered = intersects;

        if (!intersects && this.focused) {
            this.focused = false;
        }

        return true;
    }

    public abstract onScroll(e: WheelEvent): boolean;
    public abstract onMouseEnter(e: MouseEvent): void;

    public onMouseOut(_e: MouseEvent): void {
        this.focused = false;
        this.hovered = false;
    }

    public abstract onContextMenu(e: MouseEvent): boolean;
    public abstract onVisibilityChange(): void;
    public abstract onKeyDown(e: KeyboardEvent): void;
    public abstract onKeyUp(e: KeyboardEvent): void;

    public abstract fixedUpdate(): void;
    public abstract update(progress: number, delta: number): void;
    public abstract render(ctx: CanvasRenderingContext2D): void;
}