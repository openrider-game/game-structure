import Game from "../../Game";
import EventHandler from "../../interface/EventHandler";
import LifeCycle from "../../interface/LifeCycle";
import Layer from "../../state/layer/Layer";
import UiAnimation from "../animation/UiAnimation";
import UiElementOptions, { UiElementEvents } from "./UiElementOptions";
import UiElementProperty, { UiElementPropertyDimension } from "./UiElementProperty";

export interface UiParentElement {
    width: string | number,
    height: string | number
}

export default abstract class UiElement<T extends UiElement<T>> implements LifeCycle, EventHandler {
    public layer: Layer;

    public parentElement: UiParentElement;
    public childrenElements: Array<UiElement<any>>;

    public x: UiElementProperty<T>;
    public y: UiElementProperty<T>;
    public width: UiElementProperty<T>;
    public height: UiElementProperty<T>;

    public hovered: boolean;
    public focused: boolean;
    public events: UiElementEvents | undefined;
    public animation?: UiAnimation<T>;

    public constructor(layer: Layer, options?: UiElementOptions, parentElement?: UiParentElement) {
        this.layer = layer;

        this.parentElement = parentElement || Game.ctx.canvas;
        this.childrenElements = new Array<UiElement<any>>();

        this.x = new UiElementProperty(this, options?.x || '0px', UiElementPropertyDimension.Width);
        this.y = new UiElementProperty(this, options?.y || '0px', UiElementPropertyDimension.Height);
        this.width = new UiElementProperty(this, options?.width || '0px', UiElementPropertyDimension.Width);
        this.height = new UiElementProperty(this, options?.height || '0px', UiElementPropertyDimension.Height);

        this.hovered = false;
        this.focused = false;

        this.events = options?.events;
    }

    protected abstract intersects(): boolean;

    public abstract onEnter(): void;
    public abstract onLeave(): void;

    private focus(on: boolean): void {
        this.childrenElements.forEach(childElement => childElement.focus(on));

        if(this.focused === on) return;

        this.focused = on;

        if(on && this.events?.focusOn) {
            this.events.focusOn();
        } else if(this.events?.focusOff) {
            this.events.focusOff();
        }
    }

    private hover(on: boolean) {
        this.childrenElements.forEach(childElement => childElement.hover(on));

        if(this.hovered === on) return;

        this.hovered = on;

        if(on && this.events?.hoverOn) {
            this.events.hoverOn();
        } else if(this.events?.hoverOff) {
            this.events.hoverOff();
        }
    }

    public onMouseDown(e: MouseEvent): boolean {
        for(let uiElement of this.childrenElements) {
            if(!uiElement.onMouseDown(e)) {
                return false;
            }
        }

        let intersects = this.intersects();

        if (e.button === 0 && intersects) {
            this.focus(true);
        }

        return !intersects;
    }

    public onMouseUp(_e: MouseEvent): boolean {
        for(let uiElement of this.childrenElements) {
            if(!uiElement.onMouseUp(_e)) {
                return false;
            }
        }

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
        for(let uiElement of this.childrenElements) {
            if(!uiElement.onMouseMove(_e)) {
                return false;
            }
        }

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
        this.childrenElements.forEach(childElement => childElement.onMouseOut(_e));

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

        this.childrenElements.forEach(childElement => childElement.update(_progress, delta));
    };

    public abstract fixedUpdate(): void;
    public abstract render(ctx: CanvasRenderingContext2D): void;
}