import Game from "../Game";
import Keyboard from "./keyboard/Keyboard";

export default class EventManager {
    public keyboard: Keyboard;

    public constructor() {
        this.keyboard = new Keyboard();
    }

    public attach() {
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
    }

    private onMouseDown(e: MouseEvent): void {
        e.preventDefault();
        Game.ctx.canvas.focus();

        Game.stateManager.getCurrent()?.onMouseDown(e);
    }

    private onMouseUp(e: MouseEvent): void {
        Game.stateManager.getCurrent()?.onMouseUp(e);
    }

    private onMouseMove(e: MouseEvent): void {
        Game.stateManager.getCurrent()?.onMouseMove(e);
    }

    private onScroll(e: WheelEvent): void {
        e.preventDefault();

        Game.stateManager.getCurrent()?.onScroll(e);
    }

    private onMouseEnter(e: MouseEvent): void {
        Game.stateManager.getCurrent()?.onMouseEnter(e);
    }

    private onMouseOut(e: MouseEvent): void {
        Game.stateManager.getCurrent()?.onMouseOut(e);
    }

    private onContextMenu(e: MouseEvent): void {
        e.preventDefault();

        Game.stateManager.getCurrent()?.onContextMenu(e);
    }

    private onVisibilityChange(): void {
        Game.stateManager.getCurrent()?.onVisibilityChange();
    }

    private onKeyDown(e: KeyboardEvent): void {
        if (document.activeElement === Game.ctx.canvas) {
            e.preventDefault();
            Game.stateManager.getCurrent()?.onKeyDown(e);
        }
    }

    private onKeyUp(e: KeyboardEvent): void {
        if (document.activeElement === Game.ctx.canvas) {
            e.preventDefault();
            Game.stateManager.getCurrent()?.onKeyUp(e);
        }
    }
}