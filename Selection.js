//import {board} from './app.js';
import {Menu} from './Menus/Line.js';

export function Selection(ctx,div,board){
    var lineWidth = 4;
    var lineColor = 'Orchid';
    var free = true;
    var locked = false;
    var line;
    var menu = new Menu(div,board,this)
    this.draw = function(a,b,l){
        if (line == l){
            let prevLW = ctx.lineWidth;
            let prevLC = ctx.strokeStyle;
            ctx.stroke();
            ctx.lineWidth = lineWidth;
            ctx.strokeStyle = lineColor;
            ctx.beginPath();
            ctx.moveTo(a.x,a.y);
            ctx.lineTo(b.x,b.y);
            ctx.stroke();
            ctx.lineWidth = prevLW;
            ctx.strokeStyle = prevLC;
            ctx.beginPath();
        }
    }
    this.set = function(l){
        if (!locked){
            line = l;
            free = false;
        }
    }
    this.free = function(){
        if (!locked){
            free = true;
        }
    }
    /*this.removeLine = function(){
        if (!free){
            board.removeLine(line);
        }
    }*/
    this.toggle = function(){
        if (!locked){
            if (!free){
                menu.open(line);
                locked = true;
            }
        }
        else{
            menu.close();
            locked = false;
        }
        return locked;
    }
}