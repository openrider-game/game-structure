export default interface UiElementOptions {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    events?: UiElementEvents;
}

export interface UiElementEvents {
    hoverOn?: Function;
    hoverOff?: Function;
    focusOn?: Function;
    focusOff?: Function;
    click?: Function;
}