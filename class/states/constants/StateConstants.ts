import State from "../../core/state/State";
import StateManager from "../../core/state/StateManager";
import DemoState from "../demo/DemoState";

export const
    STATE_DEMO = 'STATE_DEMO',

    STATES = new Map<string, new (manager: StateManager) => State>([
        [STATE_DEMO, DemoState]
    ]),

    MAIN_STATE = STATE_DEMO;