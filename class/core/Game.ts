import { GAME_UPS } from "./constants/GameConstants";
import { MAIN_STATE } from "../states/constants/StateConstants";
import EventManager from "./event/EventManager";
import StateManager from "./state/StateManager";

export default abstract class Game {
    public static ctx: CanvasRenderingContext2D;

    public static stateManager: StateManager;
    public static eventManager: EventManager;
    public static objects: Map<string, any>;

    public static frameDuration: number;
    private static lastTime: number;
    private static progress: number;

    public static init(canvas: HTMLCanvasElement, options: Map<string, any>) {
        Game.ctx = canvas.getContext('2d')!;

        Game.objects = options;

        Game.stateManager = new StateManager();
        Game.stateManager.push(MAIN_STATE);

        Game.eventManager = new EventManager();
        Game.eventManager.attach();

        Game.lastTime = performance.now();
        Game.frameDuration = 1000 / GAME_UPS;
        Game.progress = 0;
    }

    public static run() {
        requestAnimationFrame(() => Game.run());

        let now = performance.now();
        let delta = now - Game.lastTime;

        if (delta > 1000) {
            delta = Game.frameDuration;
        }

        Game.progress += delta / Game.frameDuration;
        Game.lastTime = now;

        while (Game.progress >= 1) {
            Game.stateManager.fixedUpdate();
            Game.progress--;
        }

        Game.stateManager.update(Game.progress, delta);
        Game.stateManager.render(Game.ctx);
    }
}