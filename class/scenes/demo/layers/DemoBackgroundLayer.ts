import Layer from "../../../core/scene/layer/Layer";

export default class DemoBackgroundLayer extends Layer {
    public render(ctx: CanvasRenderingContext2D): void {
        ctx.save();

        ctx.fillStyle = '#abc';
        ctx.fillRect(0, 0, 500, 300);

        ctx.restore();
    }
}