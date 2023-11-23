import Layer from "../../../core/scene/layer/Layer";

export default class DemoEventLayer extends Layer {
    private lastEvents: Array<string>;
    private fixedUpdateCount: number;
    private lastFixedUpdate: string;
    private updateCount: number;
    private lastUpdate: string;

    public constructor() {
        super();

        this.lastEvents = new Array();
        this.fixedUpdateCount = 0;
        this.lastFixedUpdate = '';
        this.updateCount = 0;
        this.lastUpdate = '';
    }

    private pushEvent(event: string) {
        this.lastEvents.push(event);
        
        if(this.lastEvents.length > 10) {
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

        return true;
    }

    public onMouseUp(e: MouseEvent): boolean {
        this.pushEvent(`onMouseUp ${e.clientX}, ${e.clientY}`);
        
        return true;
    }

    public onMouseMove(e: MouseEvent): boolean {
        this.pushEvent(`onMouseMove ${e.clientX}, ${e.clientY}`);

        return true;
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
    }

    public onContextMenu(e: MouseEvent): boolean {
        this.pushEvent(`onContextMenu ${e.clientX}, ${e.clientY}`);

        return true;
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

    public fixedUpdate(): void {
        this.lastFixedUpdate = `Fixed update ${this.fixedUpdateCount++}`;
    }

    public update(progress: number, delta: number): void {
        this.lastUpdate = `Update ${this.updateCount++} - progress: ${progress}, delta: ${delta}`;
    }

    public render(ctx: CanvasRenderingContext2D): void {
        ctx.fillText(this.lastFixedUpdate, 20, 20);
        ctx.fillText(this.lastUpdate, 20, 40);
        ctx.fillText(`Last events:`, 20, 60);

        for(let i = 0; i < this.lastEvents.length; i++) {
            ctx.fillText(this.lastEvents[i], 30, 80 + 20 * i);
        }
    }
}