import EventHandler from "../../interface/EventHandler";
import LifeCycle from "../../interface/LifeCycle";
import Vector from "../../math/Vector";
import Layer from "../../state/layer/Layer";
import UiElementOptions from "./UiElementOptions";

export default abstract class UiElement implements LifeCycle, EventHandler {
    public layer: Layer;

    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public hovered: boolean;
    public focused: boolean;

    public constructor(layer: Layer, options?: UiElementOptions) {
        this.layer = layer;

        this.x = options?.x || 0;
        this.y = options?.y || 0;
        this.width = options?.width || 0;
        this.height = options?.height || 0;

        this.hovered = false;
        this.focused = false;
    }

    protected abstract intersects(pos: Vector): boolean;
    protected abstract onClick(): void;

    public abstract onEnter(): void;
    public abstract onLeave(): void;

    public onMouseDown(e: MouseEvent): boolean {
        let intersects = this.intersects(new Vector(e.clientX, e.clientY));

        if (e.button === 0 && intersects) {
            this.focused = true;
        }

        return !intersects;
    }

    public onMouseUp(e: MouseEvent): boolean {
        let intersects = this.intersects(new Vector(e.clientX, e.clientY));

        if (intersects && this.focused) {
            this.focused = false;
            this.onClick();
        }

        return !intersects;
    }

    public onMouseMove(e: MouseEvent): boolean {
        let intersects = this.intersects(new Vector(e.clientX, e.clientY));
        this.hovered = intersects;

        if (!intersects && this.focused) {
            this.focused = false;
        }

        return !intersects;
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
    public abstract onKeyboardDown(e: CustomEventInit<any>): void;
    public abstract onKeyboardUp(e: CustomEventInit<any>): void;

    public abstract fixedUpdate(): void;
    public abstract update(progress: number, delta: number): void;
    public abstract render(ctx: CanvasRenderingContext2D): void;
}