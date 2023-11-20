import { GAME_UPS } from "../constants/GameConstants";
import { DEMO_STATE } from "../constants/StateConstants";
import EventManager from "./event/EventManager";
import StateManager from "./state/StateManager";

export default class Game {
    ctx: CanvasRenderingContext2D;
    stateManager: StateManager;
    eventManager: EventManager;
    lastTime: number;
    timer: number;
    frameDuration: number;
    progress: number;
    frames: number;
    updates: number;

    constructor(canvas: HTMLCanvasElement) {
        this.ctx = canvas.getContext('2d')!;

        this.stateManager = new StateManager(this);
        this.stateManager.push(DEMO_STATE);

        this.eventManager = new EventManager(this);
        this.eventManager.attach();

        this.lastTime = performance.now();
        this.timer = performance.now();
        this.frameDuration = 1000 / GAME_UPS;
        this.progress = 0;
        this.frames = 0;
        this.updates = 0;
    }

    run() {
        requestAnimationFrame(() => this.run());

        let now = performance.now();
        let delta = now - this.lastTime;

        if (delta > 1000) {
            delta = this.frameDuration;
        }

        this.progress += delta / this.frameDuration;
        this.lastTime = now;

        while (this.progress >= 1) {
            this.stateManager.fixedUpdate();
            this.updates++;
            this.progress--;
        }

        this.stateManager.update(this.progress, delta);
        this.stateManager.render(this.ctx);
        this.frames++;

        if (performance.now() - this.timer > 1000) {
            this.timer = performance.now();

            this.updates = 0;
            this.frames = 0;
        }
    }
}