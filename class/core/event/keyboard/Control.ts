import { NONE } from "./KeyboardConstants";

export default class Control {
    public codes: Array<string>;
    public modifiers: number;
    public fireOnce: boolean;

    public constructor(keyCodes: string | Array<string>, modifiers = NONE, fireOnce = false) {
        if (!Array.isArray(keyCodes)) {
            keyCodes = [keyCodes];
        }

        this.codes = keyCodes;
        this.modifiers = modifiers;
        this.fireOnce = fireOnce;
    }
}