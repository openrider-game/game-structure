import Game from "./class/core/Game";

if (!document.createElement('canvas').getContext) {
    location.href = 'https://browsehappy.com/';
}

let canvas: HTMLCanvasElement = document.querySelector('[data-play=game]')!;
let options: Map<string, any> = new Map<string, any>();

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

function newGame() {
    Game.init(canvas);
    Game.objects = options;
    Game.run();
}

export const API = {
    'newGame': newGame,
    'options': options
}