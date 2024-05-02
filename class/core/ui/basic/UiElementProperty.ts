import Cloneable from "../../interface/Cloneable";
import UiElement from "./UiElement";

export enum UiElementPropertyDimension {
    Width = 'width',
    Height = 'height'
}

export enum UiElementPropertyType {
    Pixel = 'px',
    Percent = '%'
}

export default class UiElementProperty<T extends UiElement<T>> implements Cloneable<UiElementProperty<T>> {
    private uiElement: UiElement<T>;
    public dimension: UiElementPropertyDimension;

    private displayValue: string;

    private value!: number;
    private type!: UiElementPropertyType;

    public constructor(uiElement: UiElement<T>, displayValue: string, dimension: UiElementPropertyDimension) {
        this.uiElement = uiElement;
        this.displayValue = displayValue;
        this.dimension = dimension;

        this.setValue(displayValue);
    }

    public clone(): UiElementProperty<T> {
        return new UiElementProperty<T>(this.uiElement, this.displayValue, this.dimension);
    }

    public computeValue(): number {
        if(this.displayValue.endsWith('px')) {
            this.type = UiElementPropertyType.Pixel;
        } else if(this.displayValue.endsWith('%')) {
            this.type = UiElementPropertyType.Percent;
        } else {
            // TODO: keywords like 'centered'
            throw new Error('Invalid property value');
        }

        switch(this.type) {
            case UiElementPropertyType.Pixel: {
                return parseInt((this.displayValue as string));
            }
            case UiElementPropertyType.Percent: {
                return  parseInt(this.displayValue as string) *
                        parseInt(this.uiElement.parentElement[this.dimension] as string) / 100;
            }
        }
    }

    public setValue(displayValue : string): void {
        this.displayValue = displayValue;

        this.value = this.computeValue();
    }

    public getValue(): number {
        return this.value;
    }

    public getDisplayValue(): string {
        return this.displayValue;
    }
}