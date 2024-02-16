import Game from "../Game";
import Vector from "../math/Vector";
import WorldVector from "./WorldVector";

export default abstract class World {
    public camera: Vector;
    public zoomFactor: number;

    constructor() {
        this.camera = new Vector();
        this.zoomFactor = 1;
    }

    public zoom(pos: Vector, direction: number, min: number, max: number) {
        let px = WorldVector.toPixel(Game.ctx, this, pos);
        this.zoomFactor = Math.min(max, Math.max(min, Math.round((this.zoomFactor + 0.2 * direction) * 100) / 100));
        this.camera.x = pos.x - (px.x - Game.ctx.canvas.width / 2) / this.zoomFactor;
        this.camera.y = pos.y - (px.y - Game.ctx.canvas.height / 2) / this.zoomFactor;
    }
}