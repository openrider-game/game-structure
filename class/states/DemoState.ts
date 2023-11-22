import GameState from "../core/state/GameState";
import StateManager from "../core/state/StateManager";
import DemoScene from "../scenes/demo/DemoScene";

export default class DemoState extends GameState {
    lastEvents: Array<string>;
    fixedUpdateCount: number;
    lastFixedUpdate: string;
    updateCount: number;
    lastUpdate: string;

    constructor(stateManager: StateManager) {
        super(stateManager);

        this.scenes.set('demoscene', new DemoScene());
        this.currentScene = this.scenes.get('demoscene');

        this.lastEvents = new Array();
        this.fixedUpdateCount = 0;
        this.lastFixedUpdate = '';
        this.updateCount = 0;
        this.lastUpdate = '';
    }

    pushEvent(event: string) {
        this.lastEvents.push(event);

        if(this.lastEvents.length > 10) {
            this.lastEvents.shift();
        }
    }

    onEnter(): void {
        this.pushEvent('onEnter');
    }

    onLeave(): void {
        this.pushEvent('onLeave');
    }

    onMouseDown(e: MouseEvent): void {
        this.pushEvent(`onMouseDown ${e.clientX}, ${e.clientY}`);
    }

    onMouseUp(e: MouseEvent): void {
        this.pushEvent(`onMouseUp ${e.clientX}, ${e.clientY}`);
    }

    onMouseMove(e: MouseEvent): void {
        this.pushEvent(`onMouseMove ${e.clientX}, ${e.clientY}`);
    }

    onScroll(e: WheelEvent): void {
        this.pushEvent(`onScroll ${-Math.sign(e.deltaY)}`);
    }

    onMouseEnter(e: MouseEvent): void {
        this.pushEvent(`onMouseEnter ${e.clientX}, ${e.clientY}`);
    }

    onMouseOut(e: MouseEvent): void {
        this.pushEvent(`onMouseOut ${e.clientX}, ${e.clientY}`);
    }

    onContextMenu(e: MouseEvent): void {
        this.pushEvent(`onContextMenu ${e.clientX}, ${e.clientY}`);
    }

    onVisibilityChange(): void {
        this.pushEvent('visibilitychange');
    }

    onKeyDown(e: KeyboardEvent): void {
        this.pushEvent(`onKeyDown ${e.code}`);
    }

    onKeyUp(e: KeyboardEvent): void {
        this.pushEvent(`onKeyUp ${e.code}`);
    }

    fixedUpdate(): void {
        this.lastFixedUpdate = `Fixed update ${this.fixedUpdateCount++}`;
    }

    update(progress: number, delta: number): void {
        this.lastUpdate = `Update ${this.updateCount++} - progress: ${progress}, delta: ${delta}`;
    }

    render(ctx: CanvasRenderingContext2D): void {
        super.render(ctx);
        
        ctx.fillText(this.lastFixedUpdate, 20, 20);
        ctx.fillText(this.lastUpdate, 20, 40);
        ctx.fillText(`Last events:`, 20, 60);

        for(let i = 0; i < this.lastEvents.length; i++) {
            ctx.fillText(this.lastEvents[i], 30, 80 + 20 * i);
        }
    }

}