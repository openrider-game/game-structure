import UiElement from "../../ui/basic/UiElement";
import State from "../State";
import Layer from "./Layer";

export default abstract class UiLayer extends Layer {
    public uiElements: Array<UiElement<any>>;

    public constructor(state: State) {
        super(state);

        this.uiElements = new Array<UiElement<any>>();
    }

    public onLeave(): void {
        this.uiElements = [];
    }

    public render(ctx: CanvasRenderingContext2D): void {
        for(let uiElement of this.uiElements) {
            uiElement.render(ctx);
        }
    }

    public onMouseDown(e: MouseEvent): boolean {
        for(let uiElement of this.uiElements) {
            if(!uiElement.onMouseDown(e)) {
                return false;
            }
        }

        return true;
    }

    public onMouseUp(e: MouseEvent): boolean {
        for(let uiElement of this.uiElements) {
            if(!uiElement.onMouseUp(e)) {
                return false;
            }
        }

        return true;
    }

    public onMouseMove(e: MouseEvent): boolean {
        for(let uiElement of this.uiElements) {
            if(!uiElement.onMouseMove(e)) {
                return false;
            }
        }

        return true;
    }

    public onMouseOut(e: MouseEvent): void {
        for(let uiElement of this.uiElements) {
            uiElement.onMouseOut(e);
        }
    }

    public onContextMenu(e: MouseEvent): boolean {
        for(let uiElement of this.uiElements) {
            if(!uiElement.onContextMenu(e)) {
                return false;
            }
        }

        return true;
    }

    public update(_progress: number, delta: number): void {
        this.uiElements.forEach(uiElement => uiElement.animation?.update(delta));
    }
}