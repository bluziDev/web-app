import {Line} from './Line.js';

export function Snap(_ctx){
    var ctx = _ctx;
    var snapRad = 10;
    var x;
    var y;
    var free = true;
    this.set = function (sX,sY,f){
        x = sX;
        y = sY;
        free = f;
    }
    this.draw = function (){
        if (!free){
            ctx.moveTo(x+snapRad, y); 
            ctx.arc(x, y, snapRad, 0, 2*Math.PI);
        }
    }
    this.end = function (l){
        l.end(x,y);
    }
    this.newLine = function (){
        return (new Line(x,y,ctx,this));
    }
}