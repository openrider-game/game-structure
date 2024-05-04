import Vector from "./Vector";

export default class Interpolation {
    private constructor() { /* static class */ }

    public static linear(startValue: number, endValue: number, progress: number): number {
        return startValue + (endValue - startValue) * progress;
    }

    public static flip(value: number): number {
        return 1 - value;
    }

    public static easeIn(progress: number): number {
        return progress * progress;
    }

    public static easeOut(progress: number): number {
        return this.flip(this.easeIn(this.flip(progress)));
    }

    public static easeInOut(progress: number): number {
        return this.linear(this.easeIn(progress), this.easeOut(progress), progress);
    }

    public static easeInCubic(progress: number): number {
        return progress * progress * progress;
    }

    public static easeOutCubic(progress: number): number {
        return this.flip(this.easeInCubic(this.flip(progress)));
    }

    public static easeInOutCubic(progress: number): number {
        return this.linear(this.easeInCubic(progress), this.easeOutCubic(progress), progress);
    }

    public static cubicBezier(progress: number, p1: number, p2: number, p3: number, p4: number): number {
        let point0 = new Vector(0, 0);
        let point1 = new Vector(p1, p2);
        let point2 = new Vector(p3, p4);
        let point3 = new Vector(1, 1);

        let resultingVector = point0.add
            (point0.scale(-3).add(point1.scale(3)).scale(progress)).add
            (point0.scale(3).add(point1.scale(-6)).add(point2.scale(3)).scale(progress * progress)).add
            (point0.scale(-1).add(point1.scale(3)).add(point2.scale(-3)).add(point3).scale(progress * progress * progress));

        return resultingVector.y;
    }
}