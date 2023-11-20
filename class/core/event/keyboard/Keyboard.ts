import { ALT, CTRL, NONE, SHIFT } from "../../../constants/KeyboardConstants";
import Control from "./Control";

export default class Keyboard {
    controls: Map<string, Control>;
    holding: Map<string, boolean>;
    firedOnce: Map<string, boolean>;

    constructor() {
        this.controls = new Map();
        this.holding = new Map();
        this.firedOnce = new Map();
    }

    registerControl(name: string, control: Control) {
        this.controls.set(name, control);
    }

    isDown(name: string) {
        let holding = !!this.holding.get(name);
        let fireOnce = this.controls.get(name)?.fireOnce;
        let firedOnce = !!this.firedOnce.get(name);

        if (fireOnce && !firedOnce && holding) {
            this.firedOnce.set(name, true);
            return true;
        }

        return holding && (!fireOnce || !firedOnce);
    }

    test(control: Control, e: KeyboardEvent) {
        console.log(e.code);

        let matches = control.codes.includes(e.code);
        if (matches && control.modifiers === NONE) {
            matches = !e.ctrlKey && !e.altKey && !e.shiftKey;
        }
        if (matches && (control.modifiers & CTRL)) {
            matches = e.ctrlKey;
        }
        if (matches && (control.modifiers & ALT)) {
            matches = e.altKey;
        }
        if (matches && (control.modifiers & SHIFT)) {
            matches = e.shiftKey;
        }
        return matches;
    }

    onKeyDown(e: KeyboardEvent) {
        this.controls.forEach((control, key) => {
            if (this.test(control, e)) {
                e.preventDefault();
                if (!this.holding.get(key)) {
                    this.holding.set(key, true);
                    document.dispatchEvent(new CustomEvent('keyboarddown', { detail: key }));
                }
            }
        });
    }

    onKeyUp(e: KeyboardEvent) {
        this.controls.forEach((control, key) => {
            if (this.test(control, e)) {
                e.preventDefault();
                if (this.holding.get(key)) {
                    this.holding.set(key, false);
                    this.firedOnce.set(key, false);
                    document.dispatchEvent(new CustomEvent('keyboardup', { detail: key }));
                }
            }
        });
    }
}