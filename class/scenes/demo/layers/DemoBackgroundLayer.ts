import Scene from "../../../core/scene/Scene";
import Layer from "../../../core/scene/layer/Layer";

export default class DemoBackgroundLayer extends Layer {
    focused: boolean;

    public constructor(scene: Scene) {
        super(scene);

        this.focused = false;
    }

    public onMouseDown(_e: MouseEvent): boolean {
        this.focused = true;

        return true;
    }

    public onMouseUp(_e: MouseEvent): boolean {
        this.focused = false;

        return true;
    }

    public onMouseOut(_e: MouseEvent): void {
        this.focused = false;
    }

    public render(ctx: CanvasRenderingContext2D): void {
        ctx.save();

        ctx.fillStyle = this.focused ? '#cba' : '#abc';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        ctx.restore();
    }
}