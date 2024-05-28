import {updateRender, lastRender} from './app.js';
import {draw} from './draw.js';

export function loop(timestamp) {
    var progress = timestamp - lastRender;
  
    //update(progress)
    draw();
  
    updateRender(timestamp);
    //lastRender = timestamp;
    window.requestAnimationFrame(loop);
}