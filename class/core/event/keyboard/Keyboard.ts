import { ALT, CTRL, NONE, SHIFT } from "./KeyboardConstants";
import Control from "./Control";

export default class Keyboard {
    private controls: Map<string, Control>;
    private holding: Map<string, boolean>;
    private firedOnce: Map<string, boolean>;

    public constructor() {
        this.controls = new Map<string, Control>();
        this.holding = new Map<string, boolean>();
        this.firedOnce = new Map<string, boolean>();
    }

    public registerControl(name: string, control: Control): void {
        this.controls.set(name, control);
    }

    public isDown(name: string): boolean {
        let holding = !!this.holding.get(name);
        let fireOnce = this.controls.get(name)?.fireOnce;
        let firedOnce = !!this.firedOnce.get(name);

        if (fireOnce && !firedOnce && holding) {
            this.firedOnce.set(name, true);
            return true;
        }

        return holding && (!fireOnce || !firedOnce);
    }

    private test(control: Control, e: KeyboardEvent): boolean {
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

    public onKeyDown(e: KeyboardEvent): void {
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

    public onKeyUp(e: KeyboardEvent): void {
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