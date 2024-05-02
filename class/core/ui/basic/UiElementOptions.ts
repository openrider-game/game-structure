export default interface UiElementOptions {
    x?: string;
    y?: string;
    width?: string;
    height?: string;
    events?: UiElementEvents;
}

export interface UiElementEvents {
    hoverOn?: Function;
    hoverOff?: Function;
    focusOn?: Function;
    focusOff?: Function;
    click?: Function;
}