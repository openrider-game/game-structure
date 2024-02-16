import Vector from "../../math/Vector";

export default abstract class Mouse {
    public static mousePos: Vector = new Vector();
    public static lastClick: Vector = new Vector();
}