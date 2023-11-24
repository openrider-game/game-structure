import UiElementOptions from "../UiElementOptions";

export default interface UiButtonOptions extends UiElementOptions {
    label?: string;
    color?: string | CanvasGradient | CanvasPattern;
    hoveredColor?: string | CanvasGradient | CanvasPattern;
    focusedColor?: string | CanvasGradient | CanvasPattern;
    textColor?: string | CanvasGradient | CanvasPattern;
}