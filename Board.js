import {Snap} from './Snap.js';
import { Selection } from './Selection.js';

export function Board(_canvas,_ctx,_div){
    var canvas = _canvas;
    var ctx = _ctx;
    var div = _div;
    var mX = 0;
    var mY = 0;
    //tool bar
    var tool = 'draw';
    //btn.style.top = '15px';
    //btn.id = 'button';
    var bDraw = document.getElementById('Draw');
    var bSel = document.getElementById('Select');
    var bRemove = document.getElementById('Remove');
    bDraw.addEventListener('click', () => {
        tool = 'draw';
    });
    bSel.addEventListener('click', () => {
        tool = 'select';
    });
    bRemove.addEventListener('click', () => {
        tool = 'remove';
    });
    //lines
    var maxLines = 1000;
    var maxUndos = 5;
    var lines = [];
    var isDrawing = false;
    var drawing;
    var snap = new Snap(ctx);
    var sel = new Selection(ctx,div,this);
    //var lMenu = new LineMenu(div, this, sel);
    this.draw = function(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.beginPath();
        snap.set(mX,mY,true);
        sel.free();
        let foundSnap = false;
        let foundSel = false;
        lines.forEach((element,index) => {
            if (!foundSnap && tool == 'draw'){
                foundSnap = element.snap(mX,mY,drawing,isDrawing);
            }else
            if(!foundSel && tool == 'select'){
                foundSel = element.select(mX,mY);
            }
            element.draw(mX,mY,div);
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
            sel.toggle();
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