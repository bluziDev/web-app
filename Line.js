import {board} from './app.js';

export function Line(_x1,_y1,_ctx,_snap){
    var x1=_x1;
    var x2=_x1;
    var y1=_y1;
    var y2=_y1;
    var ctx = _ctx;
    var snapO = _snap;
    var snapRad = 10;
    this.draw = function(){
        ctx.moveTo(x1, y1); 
        ctx.lineTo(x2, y2);
    }
    this.canSnap = function(_x,_y){
        return (x1 != _x || y1 != _y);
    }
    this.snap = function(mX,mY,d,isD){
        let mDis1 = Math.hypot(mX-x1,mY-y1);

        if (mDis1<=snapRad && (d.canSnap(x1,y1)|| !isD)){
            snapO.set(x1,y1,false);
        }
        else{
            let mDis2 = Math.hypot(mX-x2,mY-y2);
            if (mDis2<=snapRad && (d.canSnap(x2,y2) || !isD)){
                snapO.set(x2,y2,false);
            }
        }
    }
    this.end = function(sX,sY){
        x2 = sX;
        y2 = sY;
    }
}