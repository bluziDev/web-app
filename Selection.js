import {board} from './app.js';

export function Selection(ctx){
    var lineWidth = 4;
    var lineColor = 'Orchid';
    var free = true;
    var line;
    this.draw = function (){
        if (!free){
            line.drawSelection(lineWidth,lineColor);
        }
    }
    this.set = function(l){
        line = l;
        free = false;
    }
    this.free = function(){
        free = true;
    }
    this.removeLine = function(){
        if (!free){
            board.removeLine(line);
        }
    }
}