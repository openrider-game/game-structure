import { NONE } from "../../../constants/KeyboardConstants";

export default class Control {
    codes: string[];
    modifiers: number;
    fireOnce: boolean;

    constructor(keyCodes: string | string[], modifiers = NONE, fireOnce = false) {
        if (!Array.isArray(keyCodes)) {
            keyCodes = [keyCodes];
        }

        this.codes = keyCodes;
        this.modifiers = modifiers;
        this.fireOnce = fireOnce;
    }
}