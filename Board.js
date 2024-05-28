import {Line} from './Line.js';
import {Snap} from './Snap.js';

export function Board(_canvas,_ctx){
    var canvas = _canvas;
    var ctx = _ctx;
    var mX = 0;
    var mY = 0;
    //lines
    var maxLines = 1000;
    var maxUndos = 5;
    var lines = [];
    var isDrawing = false;
    var drawing;
    var snapRad = 10;
    var snap = new Snap(ctx);
    this.draw = function(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.beginPath();
        snap.set(mX,mY,true);
        lines.forEach(element => {
            element.draw();
            element.snap(mX,mY,drawing,isDrawing);
        });
        if (isDrawing){
            snap.end(drawing);
            drawing.draw();
        }
        snap.draw();
        ctx.stroke();
    }
    this.handleClick = function(e){
        if (isDrawing){
            lines.push(drawing);
            isDrawing=false;
        }
        else{
            drawing = snap.newLine();
            isDrawing=true;
        }
    }
    this.handleMouseMove = function(e){
        mX = e.offsetX;
        mY = e.offsetY;
    }
}