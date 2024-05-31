import {board} from './app.js';

export function Selection(ctx){
    var lineWidth = 4;
    var lineColor = 'Orchid';
    var free = true;
    var locked = false;
    var line;
    this.draw = function (){
        if (!free){
            line.drawSelection(lineWidth,lineColor);
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
    this.toggle = function(lMenu){
        if (!locked){
            if (!free){
                lMenu.open(line);
                locked = true;
            }
        }
        else{
            lMenu.close();
            locked = false;
        }
    }
}