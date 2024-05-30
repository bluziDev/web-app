import {Snap} from './Snap.js';
import { Selection } from './Selection.js';

export function Board(_canvas,_ctx,_div){
    var canvas = _canvas;
    var ctx = _ctx;
    var div = _div;
    var mX = 0;
    var mY = 0;
    //test button
    var btn = document.createElement("BUTTON");
    div.appendChild(btn);
    var tool = 'draw';
    btn.innerHTML = 'tool: ' + tool;
    btn.id = 'button';
    btn.addEventListener('click', () => {
        if (tool == 'draw' && !isDrawing){
            tool = 'select';
        }else
        if (tool == 'select'){
            tool = 'draw';
        }
        btn.innerHTML = 'tool: ' + tool;
    });
    //lines
    var maxLines = 1000;
    var maxUndos = 5;
    var lines = [];
    var isDrawing = false;
    var drawing;
    var snap = new Snap(ctx);
    var sel = new Selection(ctx);
    this.draw = function(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.beginPath();
        sel.draw();
        snap.set(mX,mY,true);
        sel.free();
        let foundSnap = false;
        let foundSel = false;
        lines.forEach((element,index) => {
            element.draw(mX,mY,div);
            if (!foundSnap && tool == 'draw'){
                foundSnap = element.snap(mX,mY,drawing,isDrawing);
            }else
            if(!foundSel && tool == 'select'){
                foundSel = element.select(mX,mY);
            }
        });
        if (isDrawing){
            snap.end(drawing);
            drawing.draw();
        }
        snap.draw();
        ctx.stroke();
    }
    this.handleClick = function(e){
        if (tool == 'draw'){
            if (isDrawing){
                lines.push(drawing);
                isDrawing=false;
            }
            else{
                drawing = snap.newLine(sel);
                isDrawing=true;
            }
        }
        else{
            sel.removeLine();
        }
    }
    this.handleMouseMove = function(e){
        mX = e.offsetX;
        mY = e.offsetY;
    }
    this.removeLine = function(l){
        lines.splice(lines.indexOf(l),1);
    }
}