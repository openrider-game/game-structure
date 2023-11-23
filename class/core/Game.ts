import { GAME_UPS } from "../constants/GameConstants";
import { DEMO_STATE } from "../constants/StateConstants";
import EventManager from "./event/EventManager";
import StateManager from "./state/StateManager";

export default class Game {
    public ctx: CanvasRenderingContext2D;
    public stateManager: StateManager;
    public eventManager: EventManager;
    public frameDuration: number;
    private lastTime: number;
    private progress: number;

    public constructor(canvas: HTMLCanvasElement) {
        this.ctx = canvas.getContext('2d')!;

        this.stateManager = new StateManager(this);
        this.stateManager.push(DEMO_STATE);

        this.eventManager = new EventManager(this);
        this.eventManager.attach();

        this.lastTime = performance.now();
        this.frameDuration = 1000 / GAME_UPS;
        this.progress = 0;
    }

    public run() {
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
            this.progress--;
        }

        this.stateManager.update(this.progress, delta);
        this.stateManager.render(this.ctx);
    }
}