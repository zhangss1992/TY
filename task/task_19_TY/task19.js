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
var count=0;
var queue=document.querySelector('.queue');
var buttons=document.getElementsByTagName('button');
function init(){

    initData(80,45);

    show();
    for (var i=0;i<buttons.length;i++)
    {
        EventUtil.addHandler(buttons[i],'click',function(){
            operation(this);
        });
    }
}

function operation(button) {
    var numStr=document.querySelector('input').value.trim();
    var text = parseInt(numStr);
    if (/[^0-9]+?/.test(text))
    {
        alert("请输入数字！");
        document.querySelector('input').focus();
    }else {
        if (text<10||text>100)
        {
            alert("请输入10-100的数字！");
            document.querySelector('input').focus();
            return;
        }
        var button1=button.getAttribute('class');

        if ((button1 === "left-in-button")&&(count<=60)) {
            data.unshift(text);//在数组前端添加任意个项
            count++;
            show();

        }
        if ((button1 === "right-in-button")&&(count<=60)) {
            data.push(text);//在数组末端添加任意个项
            count++;
            show();
        }
        if (button1 === "left-out-button") {
            var remove= data.shift();
            count--;
            show();
            alert(remove);
        }
        if (button1 === "right-out-button") {
            var remove= data.pop();
            count--;
            show();
            alert(remove);
        }
    }
}


function color(height){
    switch (true){
        case (height>=10)&&(height<=30):
            return '#D38805';
            break;
        case (height>30)&&(height<=60):
            return '#BAEFFA';
            break;
        case (height>60)&&(height<=100):
            return '#D21311';
            break;
        default:
            return '#454565';
            break;
    }
}
function  width(num){
    switch (true)
    {
        case (num>=10)&&(num<=30):
            return' 1.5em';
            break;
        case (num>30)&&(num<50):
            return '1.0em';
            break;
        case (num>=50):
            return '0.8em';
            break;
        default:
            return' 1em';
            break;
    }
}

function renderchart(){
    var queueHTML="";
    var len=data.length;
    for(var i=0;i<len;i++)
    {
       queueHTML+="<div style='height:"+data[i]*5+"px; line-height:"+data[i]+"px ;background-color:"+ color(data[i])+"; width:"+ width(len)+"'>"+data[i]+'</div>';
        document.querySelector('.queue').innerHTML=queueHTML;
    }
}
function show(){
    var len=data.length;
    var t=0;
    var maxlen=len;
    var maxNum=data[0];
    var index=0;
    renderchart();
    //for (var j=0;j<maxlen; maxlen--)
    //{      alert(data);
        t = setInterval("show.moveOne()",100);
        show.moveOne=function()
        {
                    for(var i=1;i<maxlen;i++)
                    {
                        if(data[i]<maxNum)                 //冒泡排序
                        {
                            maxNum=data[i];
                            index=i;
                        }
                    }
                    data.splice(index,1);
                    data.push(maxNum);
                    maxlen--;
                    maxNum=data[0];
                    index=0;
                  renderchart();
                if (maxlen===1)
                {
                    data.push(maxNum);
                    data.splice(index,1);
                    renderchart();
                    clearInterval(t);
                }

        //}

                    //alert(data);
        //setTimeout(" show.moveOne()",1000);
    }

}


function deal(func){
    var args=[].slice.call(arguments,1);
    try {
        var e=EventUtil.getEvent(event);
        var arg=args.map(function(item){
            return item==='function'?item(e):item;

        });
        func.apply(data,arg);
        count--;
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

function initData(seed,num)
{
    if (seed<10||seed>100||num<0||num>60){
        alert("data error！");
    }else {
        for(var i=0;i<num;i++)
        {
            data[i]=Math.ceil(Math.random()*(seed-10)+10);
        }

    }
}

init();/**
 * Created by lenovo on 2016-3-31.
 */
