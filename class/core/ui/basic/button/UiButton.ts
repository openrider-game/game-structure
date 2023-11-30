import Vector from "../../../math/Vector";
import Layer from "../../../state/layer/Layer";
import UiElement from "../UiElement";
import UiButtonOptions from "./UiButtonOptions";

export default class UiButton extends UiElement {
    label: string;

    color: string | CanvasGradient | CanvasPattern;
    hoveredColor: string | CanvasGradient | CanvasPattern;
    focusedColor: string | CanvasGradient | CanvasPattern;
    textColor: string | CanvasGradient | CanvasPattern;

    callback: () => void;

    constructor(layer: Layer, callback: () => void, options?: UiButtonOptions) {
        super(layer, options);

        this.callback = callback;

        this.label = options?.label || 'Button';

        this.color = options?.color || '#fff';
        this.hoveredColor = options?.hoveredColor || '#ddd';
        this.focusedColor = options?.focusedColor || '#bbb';
        this.textColor = options?.textColor || '#000';
    }

    protected intersects(pos: Vector): boolean {
        let ctx = this.layer.state.manager.game.ctx;
        let canvasRect = ctx.canvas.getBoundingClientRect();
        let mousePos = new Vector(pos.x - canvasRect.left + window.scrollX, pos.y - canvasRect.top + window.scrollY);

        return mousePos.x > this.x &&
            mousePos.y > this.y &&
            mousePos.x < this.x + this.width &&
            mousePos.y < this.y + this.height;
    }

    protected onClick(): void {
        this.callback();
    }

    public onEnter(): void { }
    public onLeave(): void { }
    public onScroll(_e: WheelEvent): boolean { return true; }
    public onMouseEnter(_e: MouseEvent): void { }
    public onContextMenu(_e: MouseEvent): boolean { return true; }
    public onVisibilityChange(): void { }
    public onKeyDown(_e: KeyboardEvent): void { }
    public onKeyUp(_e: KeyboardEvent): void { }
    public fixedUpdate(): void { }
    public update(_progress: number, _delta: number): void { }

    public render(ctx: CanvasRenderingContext2D): void {
        ctx.save();

        ctx.lineWidth = 2;

        ctx.strokeRect(this.x, this.y, this.width, this.height);

        let labelMetrics = ctx.measureText(this.label);
        let labelWidth = labelMetrics.width;
        let labelHeight = labelMetrics.actualBoundingBoxAscent + labelMetrics.actualBoundingBoxDescent;

        ctx.fillStyle = this.hovered ? (this.focused ? this.focusedColor : this.hoveredColor) : this.color;

        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fill();

        ctx.fillStyle = this.textColor;

        ctx.fillText(this.label, this.x + (this.width - labelWidth) / 2, this.y + (this.height + labelHeight) / 2);

        ctx.restore();
    }
}