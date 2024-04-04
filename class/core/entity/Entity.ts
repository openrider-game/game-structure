import Cloneable from "../interface/Cloneable";
import LifeCycle from "../interface/LifeCycle";
import Vector from "../math/Vector";

export default abstract class Entity implements LifeCycle, Cloneable<Entity> {
    public pos: Vector;
    public oldPos: Vector;
    public displayPos: Vector;
    public velocity: Vector;
    public size: number;

    public constructor(pos: Vector = new Vector(), vel: Vector = new Vector(), size: number = 10) {
        this.pos = pos.clone();
        this.oldPos = pos.clone();
        this.displayPos = pos.add(vel);
        this.velocity = vel.clone();
        this.size = size;
    }

    public fixedUpdate(): void {
        this.displayPos = this.pos;
    }

    public update(progress: number, _delta: number): void {
        this.displayPos = this.pos.add(this.velocity.scale(progress));
    }

    public render(_ctx: CanvasRenderingContext2D): void { };

    public abstract clone(): Entity;
}