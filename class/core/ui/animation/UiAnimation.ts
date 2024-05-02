import Interpolation from "../../math/Interpolation";
import UiElement from "../basic/UiElement";
import UiElementProperty, { UiElementPropertyDimension, UiElementPropertyType } from "../basic/UiElementProperty";

export interface UiAnimationDescription<T extends UiElement<T>> {
    targetProperty: UiElementProperty<T>,
    targetValue: string,
    animationType?: UiAnimationType,

    startPropertyValue?: UiElementProperty<T>,
    targetPropertyValue?: UiElementProperty<T>,
    dimension?: UiElementPropertyDimension
}

interface UiAnimationOptions {
    callback?: Function
}

export enum UiAnimationType {
    Linear,
    EaseIn,
    EaseOut,
    EaseInOut
}

export default class UiAnimation<T extends UiElement<T>> {
    private animationDescriptions: Array<UiAnimationDescription<T>>;

    private duration: number;

    private callback?: Function;

    private currentProgress: number;

    public done: boolean;

    public constructor(animationDescriptions: Array<UiAnimationDescription<T>>, duration: number, options: UiAnimationOptions) {
        if(duration === 0) {
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
        if(this.done) return;

        let percentProgress = this.currentProgress / this.duration;

        this.animationDescriptions.forEach(animationDescription => {
            let interpolationProgress: number = percentProgress;

            switch(animationDescription.animationType) {
                case UiAnimationType.EaseIn: {
                    interpolationProgress = Interpolation.easeIn(percentProgress);
                    break;
                }
                case UiAnimationType.EaseOut: {
                    interpolationProgress = Interpolation.easeOut(percentProgress);
                    break;
                }
                case UiAnimationType.EaseInOut: {
                    interpolationProgress = Interpolation.easeInOut(percentProgress);
                    break;
                }
            }

            let computedStartValue = animationDescription.startPropertyValue!.computeValue();
            let computedTargetValue = animationDescription.targetPropertyValue!.computeValue();

            let interpolatedValue = Interpolation.linear(computedStartValue, computedTargetValue, interpolationProgress);

            animationDescription.targetProperty.setValue(`${interpolatedValue}${UiElementPropertyType.Pixel}`);
        });

        this.currentProgress += delta;

        if(this.currentProgress > this.duration) {
            this.animationDescriptions.forEach(animationDescription => {
                animationDescription.targetProperty.setValue(animationDescription.targetValue);
            });

            this.done = true;

            if(this.callback) {
                this.callback();
            }
        }
    }
}