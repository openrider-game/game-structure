import Game from "./class/core/Game";

if (!document.createElement('canvas').getContext) {
    location.href = 'https://browsehappy.com/';
}

let canvas: HTMLCanvasElement = document.querySelector('[data-play=game]')!;

window.addEventListener('resize', (e) => setCanvasSize());
setCanvasSize();

/**
 * Sets the canvas dimensions to those of its parent
 * Also reloads the context properties (mainly for fonts)
 */
function setCanvasSize() {
    canvas.width = canvas.parentElement!.clientWidth;
    canvas.height = canvas.parentElement!.clientHeight;

    setContextProperties(canvas.getContext('2d')!);
}

function setContextProperties(ctx: CanvasRenderingContext2D) {
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.font = 'bold 15px monospace';
}

function newGame(options?: Map<string, any>) {
    Game.init(canvas, options || new Map<string, any>());
    Game.run();
}

export const API = {
    'newGame': newGame
}