export default class Interpolation {
    private constructor() { /* static class */ }

    public static linear(startValue: number, endValue: number, progress: number) {
        return startValue + (endValue - startValue) * progress;
    }

    public static easeIn(progress: number) {
        return progress * progress;
    }

    public static flip(value: number) {
        return 1 - value;
    }

    public static easeOut(progress: number) {
        return this.flip(this.easeIn(this.flip(progress)));
    }

    public static easeInOut(progress: number) {
        return this.linear(this.easeIn(progress), this.easeOut(progress), progress);
    }
}