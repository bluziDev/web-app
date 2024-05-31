import {Button , Remove} from './Button.js';

export function LineMenu(div,board,sel){
    var btns = [];
    btns.push(new Button(Remove,board,sel,this));
    this.open = function(line){
        btns.forEach(element => {
            element.attach(div,line);
        });
    }
    this.close = function(){
        btns.forEach(element =>{
            element.detach(div);
        });
    }
}