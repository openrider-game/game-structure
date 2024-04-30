import EventHandler from "../../interface/EventHandler";
import LifeCycle from "../../interface/LifeCycle";
import Layer from "../../state/layer/Layer";
import UiAnimation from "../animation/UiAnimation";
import UiElementOptions, { UiElementEvents } from "./UiElementOptions";

export default abstract class UiElement<T extends UiElement<T>> implements LifeCycle, EventHandler {
    public layer: Layer;

    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public hovered: boolean;
    public focused: boolean;
    public events: UiElementEvents | undefined;
    public animation?: UiAnimation<T>;

    public constructor(layer: Layer, options?: UiElementOptions) {
        this.layer = layer;

        this.x = options?.x || 0;
        this.y = options?.y || 0;
        this.width = options?.width || 0;
        this.height = options?.height || 0;

        this.hovered = false;
        this.focused = false;

        this.events = options?.events;
    }

    protected abstract intersects(): boolean;

    public abstract onEnter(): void;
    public abstract onLeave(): void;

    private focus(on: boolean): void {
        if(this.focused === on) return;

        this.focused = on;

        if(on && this.events?.focusOn) {
            this.events.focusOn();
        } else if(this.events?.focusOff) {
            this.events.focusOff();
        }
    }

    private hover(on: boolean) {
        if(this.hovered === on) return;

        this.hovered = on;

        if(on && this.events?.hoverOn) {
            this.events.hoverOn();
        } else if(this.events?.hoverOff) {
            this.events.hoverOff();
        }
    }

    public onMouseDown(e: MouseEvent): boolean {
        let intersects = this.intersects();

        if (e.button === 0 && intersects) {
            this.focus(true);
        }

        return !intersects;
    }

    public onMouseUp(_e: MouseEvent): boolean {
        let intersects = this.intersects();

        if (intersects && this.focused) {
            this.focus(false);

            if(this.events?.click) {
                this.events.click();
            }
        }

        return !intersects;
    }

    public onMouseMove(_e: MouseEvent): boolean {
        let intersects = this.intersects();
        this.hover(intersects);

        if (!intersects && this.focused) {
            this.focus(false);
        }

        return !intersects;
    }

    public abstract onScroll(e: WheelEvent): boolean;
    public abstract onMouseEnter(e: MouseEvent): void;

    public onMouseOut(_e: MouseEvent): void {
        this.focus(false);
        this.hover(false);
    }

    public abstract onContextMenu(e: MouseEvent): boolean;
    public abstract onVisibilityChange(): void;
    public abstract onKeyDown(e: KeyboardEvent): void;
    public abstract onKeyUp(e: KeyboardEvent): void;
    public abstract onKeyboardDown(e: CustomEventInit<any>): void;
    public abstract onKeyboardUp(e: CustomEventInit<any>): void;

    public update(_progress: number, delta: number): void {
        this.animation?.update(delta);

        if(this.animation?.done) {
            this.animation = undefined;
        }
    };

    public abstract fixedUpdate(): void;
    public abstract render(ctx: CanvasRenderingContext2D): void;
}