import Control from "../../../core/event/keyboard/Control";
import { KEYS } from "../../../core/event/keyboard/KeyCode";
import Keyboard from "../../../core/event/keyboard/Keyboard";
import { CTRL } from "../../../core/event/keyboard/KeyboardConstants";
import State from "../../../core/state/State";
import UiLayer from "../../../core/state/layer/UiLayer";
import UiButton from "../../../core/ui/basic/button/UiButton";

export default class DemoEventLayer extends UiLayer {
    private lastEvents: Array<string>;
    private fixedUpdateCount: number;
    private lastFixedUpdate: string;
    private updateCount: number;
    private lastUpdate: string;

    public constructor(state: State) {
        super(state);

        this.lastEvents = new Array<string>();
        this.fixedUpdateCount = 0;
        this.lastFixedUpdate = '';
        this.updateCount = 0;
        this.lastUpdate = '';

        this.uiElements.push(new UiButton(this, () => this.pushEvent('Hello!'), {
            x: 200,
            y: 5,
            width: 50,
            height: 20,
            label: 'Hello'
        }));

        Keyboard.registerControl('democtrl', new Control(KEYS, CTRL));
    }

    private pushEvent(event: string) {
        this.lastEvents.push(event);

        if (this.lastEvents.length > 10) {
            this.lastEvents.shift();
        }
    }

    public onEnter(): void {
        this.pushEvent('onEnter');
    }

    public onLeave(): void {
        this.pushEvent('onLeave');
    }

    public onMouseDown(e: MouseEvent): boolean {
        this.pushEvent(`onMouseDown ${e.clientX}, ${e.clientY}`);

        return super.onMouseDown(e);
    }

    public onMouseUp(e: MouseEvent): boolean {
        this.pushEvent(`onMouseUp ${e.clientX}, ${e.clientY}`);

        return super.onMouseUp(e);
    }

    public onMouseMove(e: MouseEvent): boolean {
        this.pushEvent(`onMouseMove ${e.clientX}, ${e.clientY}`);

        return super.onMouseMove(e);
    }

    public onScroll(e: WheelEvent): boolean {
        this.pushEvent(`onScroll ${-Math.sign(e.deltaY)}`);

        return true;
    }

    public onMouseEnter(e: MouseEvent): void {
        this.pushEvent(`onMouseEnter ${e.clientX}, ${e.clientY}`);
    }

    public onMouseOut(e: MouseEvent): void {
        this.pushEvent(`onMouseOut ${e.clientX}, ${e.clientY}`);

        super.onMouseOut(e);
    }

    public onContextMenu(e: MouseEvent): boolean {
        this.pushEvent(`onContextMenu ${e.clientX}, ${e.clientY}`);

        return super.onContextMenu(e);
    }

    public onVisibilityChange(): void {
        this.pushEvent('visibilitychange');
    }

    public onKeyDown(e: KeyboardEvent): void {
        this.pushEvent(`onKeyDown ${e.code}`);
    }

    public onKeyUp(e: KeyboardEvent): void {
        this.pushEvent(`onKeyUp ${e.code}`);
    }

    public onKeyboardDown(e: CustomEventInit<any>): void {
        this.pushEvent(`onKeyboardDown ${e.detail}`);
    }

    public onKeyboardUp(e: CustomEventInit<any>): void {
        this.pushEvent(`onKeyboardUp ${e.detail}`);
    }

    public fixedUpdate(): void {
        this.lastFixedUpdate = `Fixed update ${(this.fixedUpdateCount++).toString().padStart(6, '0')}`;
    }

    public update(progress: number, delta: number): void {
        this.lastUpdate = `Update ${(this.updateCount++).toString().padStart(6, '0')} - progress: ${progress.toFixed(4)}, delta: ${delta}`;
    }

    public render(ctx: CanvasRenderingContext2D): void {
        ctx.fillText(this.lastFixedUpdate, 20, 20);
        ctx.fillText(this.lastUpdate, 20, 40);
        ctx.fillText(`Last events:`, 20, 60);

        for (let i = 0; i < this.lastEvents.length; i++) {
            ctx.fillText(this.lastEvents[i], 30, 80 + 20 * i);
        }

        super.render(ctx);
    }
}