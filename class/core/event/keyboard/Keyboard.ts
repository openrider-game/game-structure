import { ALT, CTRL, NONE, SHIFT } from "./KeyboardConstants";
import Control from "./Control";

export default abstract class Keyboard {
    private static controls: Map<string, Control> = new Map<string, Control>();
    private static holding: Map<string, boolean> = new Map<string, boolean>();
    private static firedOnce: Map<string, boolean> = new Map<string, boolean>();

    public static registerControl(name: string, control: Control): void {
        Keyboard.controls.set(name, control);
    }

    public static isDown(name: string): boolean {
        let holding = !!Keyboard.holding.get(name);
        let fireOnce = Keyboard.controls.get(name)?.fireOnce;
        let firedOnce = !!Keyboard.firedOnce.get(name);

        if (fireOnce && !firedOnce && holding) {
            Keyboard.firedOnce.set(name, true);
            return true;
        }

        return holding && (!fireOnce || !firedOnce);
    }

    private static test(control: Control, e: KeyboardEvent): boolean {
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

    public static onKeyDown(e: KeyboardEvent): void {
        Keyboard.controls.forEach((control, key) => {
            if (Keyboard.test(control, e)) {
                e.preventDefault();
                if (!Keyboard.holding.get(key)) {
                    Keyboard.holding.set(key, true);
                    document.dispatchEvent(new CustomEvent('keyboarddown', { detail: key }));
                }
            }
        });
    }

    public static onKeyUp(e: KeyboardEvent): void {
        Keyboard.controls.forEach((control, key) => {
            if (Keyboard.test(control, e)) {
                e.preventDefault();
                if (Keyboard.holding.get(key)) {
                    Keyboard.holding.set(key, false);
                    Keyboard.firedOnce.set(key, false);
                    document.dispatchEvent(new CustomEvent('keyboardup', { detail: key }));
                }
            }
        });
    }
}