export default class Interpolation {
    private constructor() { /* static class */ }

    public static linear(startValue: number, endValue: number, progress: number) {
        return startValue + (endValue - startValue) * progress;
    }

    public static flip(value: number) {
        return 1 - value;
    }

    public static easeIn(progress: number) {
        return progress * progress;
    }

    public static easeOut(progress: number) {
        return this.flip(this.easeIn(this.flip(progress)));
    }

    public static easeInOut(progress: number) {
        return this.linear(this.easeIn(progress), this.easeOut(progress), progress);
    }

    public static easeInCubic(progress: number) {
        return progress * progress * progress;
    }

    public static easeOutCubic(progress: number) {
        return this.flip(this.easeInCubic(this.flip(progress)));
    }

    public static easeInOutCubic(progress: number) {
        return this.linear(this.easeInCubic(progress), this.easeOutCubic(progress), progress);
    }
}