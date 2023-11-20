import Game from "../Game";
import Keyboard from "./keyboard/Keyboard";

export default class EventManager {
    game: Game;
    keyboard: Keyboard;

    constructor(game: Game) {
        this.game = game;
        this.keyboard = new Keyboard();
    }

    attach() {
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

    onMouseDown(e: MouseEvent): void {
        e.preventDefault();

        this.game.stateManager.getCurrent()?.onMouseDown(e);
    }

    onMouseUp(e: MouseEvent): void {
        this.game.stateManager.getCurrent()?.onMouseUp(e);
    }

    onMouseMove(e: MouseEvent): void {
        this.game.stateManager.getCurrent()?.onMouseMove(e);
    }

    onScroll(e: WheelEvent): void {
        e.preventDefault();

        this.game.stateManager.getCurrent()?.onScroll(e);
    }

    onMouseEnter(e: MouseEvent): void {
        this.game.stateManager.getCurrent()?.onMouseEnter(e);
    }

    onMouseOut(e: MouseEvent): void {
        this.game.stateManager.getCurrent()?.onMouseOut(e);
    }

    onContextMenu(e: MouseEvent): void {
        e.preventDefault();

        this.game.stateManager.getCurrent()?.onContextMenu(e);
    }

    onVisibilityChange(): void {
        this.game.stateManager.getCurrent()?.onVisibilityChange();
    }

    onKeyDown(e: KeyboardEvent): void {
        this.game.stateManager.getCurrent()?.onKeyDown(e);
    }

    onKeyUp(e: KeyboardEvent): void {
        this.game.stateManager.getCurrent()?.onKeyUp(e);
    }

}