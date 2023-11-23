import Game from "../Game";
import Keyboard from "./keyboard/Keyboard";

export default class EventManager {
    public game: Game;
    public keyboard: Keyboard;

    public constructor(game: Game) {
        this.game = game;
        this.keyboard = new Keyboard();
    }

    public attach() {
        this.game.ctx.canvas.addEventListener('mousedown', e => this.onMouseDown(e));
        this.game.ctx.canvas.addEventListener('mouseup', e => this.onMouseUp(e));
        this.game.ctx.canvas.addEventListener('mousemove', e => this.onMouseMove(e));
        this.game.ctx.canvas.addEventListener('wheel', e => this.onScroll(e));

        this.game.ctx.canvas.addEventListener('mouseenter', e => this.onMouseEnter(e));
        this.game.ctx.canvas.addEventListener('mouseout', e => this.onMouseOut(e));

        this.game.ctx.canvas.addEventListener('contextmenu', e => this.onContextMenu(e));

        document.addEventListener('visibilitychange', () => this.onVisibilityChange());

        document.addEventListener('keydown', e => this.onKeyDown(e));
        document.addEventListener('keyup', e => this.onKeyUp(e));
    }

    private onMouseDown(e: MouseEvent): void {
        e.preventDefault();
        this.game.ctx.canvas.focus();

        this.game.stateManager.getCurrent()?.onMouseDown(e);
    }

    private onMouseUp(e: MouseEvent): void {
        this.game.stateManager.getCurrent()?.onMouseUp(e);
    }

    private onMouseMove(e: MouseEvent): void {
        this.game.stateManager.getCurrent()?.onMouseMove(e);
    }

    private onScroll(e: WheelEvent): void {
        e.preventDefault();

        this.game.stateManager.getCurrent()?.onScroll(e);
    }

    private onMouseEnter(e: MouseEvent): void {
        this.game.stateManager.getCurrent()?.onMouseEnter(e);
    }

    private onMouseOut(e: MouseEvent): void {
        this.game.stateManager.getCurrent()?.onMouseOut(e);
    }

    private onContextMenu(e: MouseEvent): void {
        e.preventDefault();

        this.game.stateManager.getCurrent()?.onContextMenu(e);
    }

    private onVisibilityChange(): void {
        this.game.stateManager.getCurrent()?.onVisibilityChange();
    }

    private onKeyDown(e: KeyboardEvent): void {
        if (document.activeElement === this.game.ctx.canvas) {
            e.preventDefault();
            this.game.stateManager.getCurrent()?.onKeyDown(e);
        }
    }

    private onKeyUp(e: KeyboardEvent): void {
        if (document.activeElement === this.game.ctx.canvas) {
            e.preventDefault();
            this.game.stateManager.getCurrent()?.onKeyUp(e);
        }
    }
}