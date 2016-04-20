/**
 * Created by lenovo on 2016-3-30.
 */
var EventUtil={
    addHandler:function(element,event,handler){
        if(event.addEventListener)
        {

            element.addEventListener(event,handler,false);
        }else if(event.attachEvent)
        {
            element.attachEvent("on"+event,handler);
        }else
        {
            element["on"+event]=handler;

        }
    },
    getEvent:function(event){
      return  event?event:window.event;
    },
    getTarget:function(event){
        return event.target||event.srcElement;
    }
}

var data=new Array();

var queue=document.querySelector('.queue');
var buttons=document.getElementsByTagName('button');
function init(){

    for (var i=0;i<buttons.length;i++)
    {
        EventUtil.addHandler(buttons[i],'click',function(){
                operation(this);
        });
    }
}

function operation(button) {
    var numStr=document.querySelector('input').value;
    var text = parseInt(numStr);
    if (/[^0-9]+?/.test(text))
    {
        alert("请输入数字！");
        document.querySelector('input').focus();
    }else {
        var button1=button.getAttribute('class');

        if (button1 === "left-in-button") {
            data.unshift(text);//在数组前端添加任意个项
            show();

        }
        if (button1 === "right-in-button") {
            data.push(text);//在数组末端添加任意个项
            show();
        }
        if (button1 === "left-out-button") {
           var remove= data.shift();
            show();
            alert(remove);
        }
        if (button1 === "right-out-button") {
           var remove= data.pop();
            show();
            alert(remove);
        }
    }
}

function show(){
    var len=data.length;
    var queueHTML="";
    for(var i=0;i<len;i++)
    {
        queueHTML+='<div>'+data[i]+'</div>';
    }
    document.querySelector('.queue').innerHTML=queueHTML;
}

function deal(func){
    var args=[].slice.call(arguments,1);
        try {
            var e=EventUtil.getEvent(event);
            var arg=args.map(function(item){
                return item==='function'?item(e):item;

            });
            func.apply(data,arg);
        }
        catch(ex){
            alert(ex.message);
        }
       show();

}

function getClickIndex(event){
    var target=EventUtil.getTarget(event);
    return [].indexOf.call(target.parentNode.children,target);
}
EventUtil.addHandler(queue,'click',function(){
 deal([].splice,getClickIndex, 1);


});

init();