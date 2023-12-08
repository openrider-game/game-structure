import State from "../../core/state/State";
import StateManager from "../../core/state/StateManager";
import DemoState from "../demo/DemoState";

export const
    DEMO_STATE = 'DEMO_STATE',

    STATES = new Map<string, new (manager: StateManager) => State>([
        [DEMO_STATE, DemoState]
    ]),

    MAIN_STATE = DEMO_STATE;