import Interpolation from "../../math/Interpolation";
import UiElement from "../basic/UiElement";
import UiElementProperty, { UiElementPropertyDimension, UiElementPropertyType } from "../basic/UiElementProperty";

export interface UiAnimationDescription<T extends UiElement<T>> {
    targetProperty: UiElementProperty<T>,
    targetValue: string,
    animationType?: UiAnimationType,
    bezierPoints?: UiAnimationBezierPoints,

    startPropertyValue?: UiElementProperty<T>,
    targetPropertyValue?: UiElementProperty<T>,
    dimension?: UiElementPropertyDimension
}

interface UiAnimationBezierPoints {
    p1: number,
    p2: number,
    p3: number,
    p4: number
}

interface UiAnimationOptions {
    callback?: Function
}

export enum UiAnimationType {
    Linear,
    EaseIn,
    EaseOut,
    EaseInOut,
    EaseInCubic,
    EaseOutCubic,
    EaseInOutCubic,
    CubicBezier
}

export default class UiAnimation<T extends UiElement<T>> {
    private animationDescriptions: Array<UiAnimationDescription<T>>;

    private duration: number;

    private callback?: Function;

    private currentProgress: number;

    public done: boolean;

    public constructor(animationDescriptions: Array<UiAnimationDescription<T>>, duration: number, options: UiAnimationOptions) {
        if (duration === 0) {
            throw new Error('Duration cannot be 0');
        }

        this.animationDescriptions = animationDescriptions;
        this.animationDescriptions.forEach(animationDescription => {
            animationDescription.dimension = animationDescription.targetProperty.dimension;
            animationDescription.startPropertyValue = animationDescription.targetProperty.clone();
            animationDescription.targetPropertyValue = animationDescription.targetProperty.clone();
            animationDescription.targetPropertyValue.setValue(animationDescription.targetValue);
        });

        this.duration = duration;

        this.callback = options?.callback;

        this.currentProgress = 0;
        this.done = false;

    }

    public update(delta: number) {
        if (this.done) return;

        let percentProgress = this.currentProgress / this.duration;

        this.animationDescriptions.forEach(animationDescription => {
            let interpolationProgress = this.computeInterpolation(animationDescription, percentProgress);

            let computedStartValue = animationDescription.startPropertyValue!.computeValue();
            let computedTargetValue = animationDescription.targetPropertyValue!.computeValue();

            let interpolatedValue = Interpolation.linear(computedStartValue, computedTargetValue, interpolationProgress);

            animationDescription.targetProperty.setValue(`${interpolatedValue}${UiElementPropertyType.Pixel}`);
        });

        this.currentProgress += delta;

        if (this.currentProgress > this.duration) {
            this.animationDescriptions.forEach(animationDescription => {
                animationDescription.targetProperty.setValue(animationDescription.targetValue);
            });

            this.done = true;

            if (this.callback) {
                this.callback();
            }
        }
    }

    private computeInterpolation(animationDescription: UiAnimationDescription<T>, percentProgress: number): number {
        switch (animationDescription.animationType) {
            case UiAnimationType.EaseIn: {
                return Interpolation.easeIn(percentProgress);
            }
            case UiAnimationType.EaseOut: {
                return Interpolation.easeOut(percentProgress);
            }
            case UiAnimationType.EaseInOut: {
                return Interpolation.easeInOut(percentProgress);
            }
            case UiAnimationType.EaseInCubic: {
                return Interpolation.easeInCubic(percentProgress);
            }
            case UiAnimationType.EaseOutCubic: {
                return Interpolation.easeOutCubic(percentProgress);
            }
            case UiAnimationType.EaseInOutCubic: {
                return Interpolation.easeInOutCubic(percentProgress);
            }
            case UiAnimationType.CubicBezier: {
                if (!animationDescription.bezierPoints) {
                    throw new Error('No points set for bezier curve animation');
                }

                let points = animationDescription.bezierPoints;

                if (points.p1 < 0 || points.p1 > 1 || points.p3 < 0 || points.p3 > 1) {
                    throw new Error('Out of bounds bezier points');
                }

                return Interpolation.cubicBezier(percentProgress, points.p1, points.p2, points.p3, points.p4);
            }
            default: {
                return percentProgress;
            }
        }
    }
}