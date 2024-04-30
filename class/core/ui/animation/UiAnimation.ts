import Interpolation from "../../math/Interpolation";
import UiElement from "../basic/UiElement";
import { EASE_IN, EASE_IN_OUT, EASE_OUT } from "./UiAnimationConstants";

interface UiAnimationOptions {
    callback?: Function,
    animationType?: string
}

export default class UiAnimation<T extends UiElement<T>> {
    private uiElement: T;
    private property: keyof T;
    private targetValue: any;
    private duration: number;

    private callback?: Function;
    private animationType?: string;

    private startTime?: number;
    private startValue?: any;
    private currentProgress: number;

    public done: boolean;

    public constructor(uiElement: T, property: string, targetValue: any, duration: number, options?: UiAnimationOptions) {
        if(!uiElement.hasOwnProperty(property)) {
            throw new Error(`Invalid animation property: ${property}`);
        }

        if(duration === 0) {
            throw new Error('Duration cannot be 0');
        }

        this.uiElement = uiElement;
        this.property = property as keyof T;
        this.targetValue = targetValue;
        this.duration = duration;

        this.callback = options?.callback;
        this.animationType = options?.animationType;

        this.currentProgress = 0;
        this.done = false;

    }

    public update(delta: number) {
        if(this.done) return;

        if(!this.startTime) {
            this.startTime = performance.now();
            this.startValue = this.uiElement[this.property];
        }

        let percentProgress = this.currentProgress / this.duration;

        switch(this.animationType) {
            case EASE_IN: {
                percentProgress = Interpolation.easeIn(percentProgress);
                break;
            }
            case EASE_OUT: {
                percentProgress = Interpolation.easeOut(percentProgress);
                break;
            }
            case EASE_IN_OUT: {
                percentProgress = Interpolation.easeInOut(percentProgress);
                break;
            }
        }

        (this.uiElement as any)[this.property] = Interpolation.linear(this.startValue, this.targetValue, percentProgress);

        this.currentProgress += delta;

        if(this.currentProgress > this.duration) {
            (this.uiElement as any)[this.property] = this.targetValue;

            this.done = true;

            if(this.callback) {
                this.callback();
            }
        }
    }
}