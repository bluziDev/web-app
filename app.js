import {loop} from './loop.js';
import {Board} from './Board.js';

const div = document.getElementById("mainDiv");
//canvas setup
const canvas = document.getElementById("TheCanvas");
const ctx = canvas.getContext("2d");
canvas.setAttribute('width', canvas.parentNode.offsetWidth);
canvas.setAttribute('height', canvas.parentNode.offsetHeight);
export var board = new Board(canvas,ctx,div);
//mouse events
canvas.addEventListener('click', board.handleClick);
canvas.addEventListener("mousemove", board.handleMouseMove);
//loop
export var lastRender = 0;
export function updateRender(timestamp){
    lastRender = timestamp;
}
window.requestAnimationFrame(loop);