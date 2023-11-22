import Layer from "../../../core/scene/layer/Layer";

export default class DemoBackgroundLayer extends Layer {
    // this is never called because propagation of onMouseDown is stopped in DemoEventLayer
    onMouseDown(e: MouseEvent): boolean {
        console.log(e);

        return true;
    }

    render(ctx: CanvasRenderingContext2D): void {
        ctx.save();

        ctx.fillStyle = '#abc';
        ctx.fillRect(0, 0, 500, 300);

        ctx.restore();
    }
}