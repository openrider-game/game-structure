import Vector from "../math/Vector";
import Entity from "./Entity";

export default class Collider extends Entity {
    public constructor(pos: Vector) {
        super(pos);
    }

    public clone(): Collider {
        let clone = new Collider(this.pos.clone());
        clone.oldPos = this.oldPos.clone();
        clone.velocity = this.velocity.clone();
        clone.size = this.size;

        return clone;
    }
}