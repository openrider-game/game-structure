import { NONE } from "../../../constants/KeyboardConstants";

export default class Control {
    codes: Array<string>;
    modifiers: number;
    fireOnce: boolean;

    constructor(keyCodes: string | Array<string>, modifiers = NONE, fireOnce = false) {
        if (!Array.isArray(keyCodes)) {
            keyCodes = [keyCodes];
        }

        this.codes = keyCodes;
        this.modifiers = modifiers;
        this.fireOnce = fireOnce;
    }
}