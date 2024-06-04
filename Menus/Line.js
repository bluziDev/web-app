import {Button} from '../Button.js';

export function Menu(div,board,sel){
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
function Remove(btn,btnO,board,line,sel,menu){
    btnO.set('Remove','LineMenu');
    this.action = function(){
        board.removeLine(line);
        sel.toggle(menu);
        sel.free();
    }
    this.pose = function(line){
        let top = (line.a.y + line.b.y)/2;
        let left = (line.a.x + line.b.x)/2;
        btn.style.top = top.toString() + 'px';
        btn.style.left = left.toString() + 'px';
    }
}