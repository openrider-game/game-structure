import Game from "../Game";
import EventHandler from "../interface/EventHandler";
import Vector from "../math/Vector";
import { OBJ_WORLD } from "../world/WorldConstants";
import WorldVector from "../world/WorldVector";
import Keyboard from "./keyboard/Keyboard";
import Mouse from "./mouse/Mouse";

export default class EventManager implements EventHandler {
    public attach(): void {
        Game.ctx.canvas.addEventListener('mousedown', e => this.onMouseDown(e));
        Game.ctx.canvas.addEventListener('mouseup', e => this.onMouseUp(e));
        Game.ctx.canvas.addEventListener('mousemove', e => this.onMouseMove(e));
        Game.ctx.canvas.addEventListener('wheel', e => this.onScroll(e));

        Game.ctx.canvas.addEventListener('mouseenter', e => this.onMouseEnter(e));
        Game.ctx.canvas.addEventListener('mouseout', e => this.onMouseOut(e));

        Game.ctx.canvas.addEventListener('contextmenu', e => this.onContextMenu(e));

        document.addEventListener('visibilitychange', () => this.onVisibilityChange());

        document.addEventListener('keydown', e => this.onKeyDown(e));
        document.addEventListener('keyup', e => this.onKeyUp(e));
        document.addEventListener('keyboarddown', e => this.onKeyboardDown(e));
        document.addEventListener('keyboardup', e => this.onKeyboardUp(e));
    }

    public onEnter(): void {}
    public onLeave(): void {}

    public onMouseDown(e: MouseEvent): boolean {
        e.preventDefault();
        Game.ctx.canvas.focus();

        this.setMousePos(e);
        Mouse.lastClick.set(Mouse.mousePos);

        Game.stateManager.getCurrent()?.onMouseDown(e);

        return true;
    }

    public onMouseUp(e: MouseEvent): boolean {
        Game.stateManager.getCurrent()?.onMouseUp(e);

        return true;
    }

    public onMouseMove(e: MouseEvent): boolean {
        this.setMousePos(e);

        Game.stateManager.getCurrent()?.onMouseMove(e);

        return true;
    }

    public onScroll(e: WheelEvent): boolean {
        e.preventDefault();

        Game.stateManager.getCurrent()?.onScroll(e);

        return true;
    }

    public onMouseEnter(e: MouseEvent): void {
        Game.stateManager.getCurrent()?.onMouseEnter(e);
    }

    public onMouseOut(e: MouseEvent): void {
        Game.stateManager.getCurrent()?.onMouseOut(e);
    }

    public onContextMenu(e: MouseEvent): boolean {
        e.preventDefault();

        Game.stateManager.getCurrent()?.onContextMenu(e);

        return true;
    }

    public onVisibilityChange(): void {
        Game.stateManager.getCurrent()?.onVisibilityChange();
    }

    public onKeyDown(e: KeyboardEvent): void {
        if (document.activeElement === Game.ctx.canvas) {
            e.preventDefault();
            Game.stateManager.getCurrent()?.onKeyDown(e);
            Keyboard.onKeyDown(e);
        }
    }

    public onKeyUp(e: KeyboardEvent): void {
        if (document.activeElement === Game.ctx.canvas) {
            e.preventDefault();
            Game.stateManager.getCurrent()?.onKeyUp(e);
            Keyboard.onKeyUp(e);
        }
    }

    public onKeyboardDown(e: CustomEventInit<any>): void {
        Game.stateManager.getCurrent()?.onKeyboardDown(e);
    }

    public onKeyboardUp(e: CustomEventInit<any>): void {
        Game.stateManager.getCurrent()?.onKeyboardUp(e);
    }

    private setMousePos(e: MouseEvent): void {
        let world = Game.objects.get(OBJ_WORLD);

        if(world) {
            let canvasRect = Game.ctx.canvas.getBoundingClientRect();
            Mouse.mousePos.set(WorldVector.normalizeToCanvas(Game.ctx, world, new Vector(
                e.clientX - canvasRect.left + window.scrollX,
                e.clientY - canvasRect.top + window.scrollY
            )));
        }
    }
}