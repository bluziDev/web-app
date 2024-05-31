export function Button(_actor,board,sel,menu){
    var btn = document.createElement("BUTTON");
    var actor;
    this.set = function(inner,style){
        btn.innerHTML=inner;
        btn.className = style;
    }
    this.attach = function(div,line){
        actor = new _actor(btn,this,board,line,sel,menu);
        btn.addEventListener('click',actor.action);
        div.appendChild(btn);
        line.pose(actor);
    }
    this.detach = function(div){
        div.removeChild(btn);
        btn.removeEventListener('click',actor.action);
    }
}
export function Remove(btn,btnO,board,line,sel,menu){
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