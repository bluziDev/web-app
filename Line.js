
import {nearestOnLine} from './nearestOnLine.js';

export function Line(x1,y1,ctx,snap,sel,snapRad){
    var x2=x1;
    var y2=y1;
    var selRad = 10;
    this.draw = function(mX,mY,div){
        ctx.moveTo(x1, y1); 
        ctx.lineTo(x2, y2);
        
    }
    this.canSnap = function(_x,_y){
        return (x1 != _x || y1 != _y);
    }
    this.snap = function(mX,mY,d,isD){
        var nearest = nearestOnLine(
                          {x: mX, y: mY}
                         ,{x: x1, y: y1}
                         ,{x: x2, y: y2}
                      );
        let mDis = Math.hypot(mX-nearest.x,mY-nearest.y);

        if (mDis<=snapRad && (d.canSnap(nearest.x,nearest.y)|| !isD)){
            snap.set(nearest.x,nearest.y,false);
            return true;
        }
        else{
            return false;
        }
    }
    this.select = function (mX,mY){
        var nearest = nearestOnLine(
            {x: mX, y: mY}
           ,{x: x1, y: y1}
           ,{x: x2, y: y2}
        );
        let mDis = Math.hypot(mX-nearest.x,mY-nearest.y);

        if (mDis<=selRad){
            sel.set(this);
            sel.draw({x: x1, y: y1},{x: x2, y: y2});
            return true;
        }
        else{
            return false;
        }
    }
    this.pose = function(actor){
        actor.pose({a:{x:x1, y:y1}, b:{x:x2, y:y2}});
    }
    this.end = function(sX,sY){
        x2 = sX;
        y2 = sY;
    }
}