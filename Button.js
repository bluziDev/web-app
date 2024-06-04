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