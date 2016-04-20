/**
 * Created by lenovo on 2016-4-15.
 */
var EventUtil={
    addHandler:function(element ,event,handler){
        if(element.addEventListener)
        {
            return element.addEventListener(event,handler,false);
        }else if (element.attachEvent)
        {
            return element.attachEvent(event,handler);
        }else
        {
            return element["on"+event]=null;
        }
    },

    getEvent:function(event)
    {
        return event?event:window.event;
    },
    getTarget:function(event)
    {
        return event.target||event.srcElement;
    }
}

var inputs=document.getElementsByTagName("input");
var button=document.querySelector('button');
for(var i=0;i<inputs.length;i++)
{
    EventUtil.addHandler(inputs[i],"focus",function(e){
        var event=EventUtil.getEvent(e);
        var target=EventUtil.getTarget(event);
       target.parentElement.getElementsByTagName("span")[0].style. visibility='visible';

});
    EventUtil.addHandler(inputs[i],'blur',function(e){
        var event=EventUtil.getEvent(e);
        var target=EventUtil.getTarget(event);
        checkValue(target);
    });

}
EventUtil.addHandler(button,'click',function(e)
{
    var count=0;
    for(var i=0;i<inputs.length;i++)
    {
        checkValue(inputs[i]);
    }
    for(var x in result)
    {

        if (result[x]===true)
            count++;
    }
    if(count===5)
    {
        alert("提交成功！");
    }else{
        alert("提交失败！");
    }
});
var result={
    name1:false,
    password:false,
    repassword:false,
    email:false,
    phone:false
};
var key="";
function checkValue(ele){
    var name=ele.name;
    var addText=ele.parentElement.getElementsByTagName('span')[0];
    if (name==="name")
    {
        if (ele.value)
        {
            if (ele.value.length<=16&&ele.value.length>=6)
            {
                 result['name1']=true;
                addText.innerHTML="名称合法";
                key=ele.value;
                addText.style.color="green";
                ele.style.border="2px solid green";
            }else
            {
                 result['name1']=false;
                addText.innerHTML="长度不超过6-16个字符";
                addText.style.color="red";
                ele.style.border="2px solid red";
            }
        }else {
            result['name1']=false;
            addText.innerHTML="名称不能为空";
            ele.style.border="2px solid red";
            addText.style.color="red";
        }
    }
    if(ele.name==="password")
    {
        if (ele.value)
        {
            if (/^[a-zA-Z0-9]{6,16}$/.test(ele.value))
            {
                key=ele.value;
                result['password']=true;
                addText.innerHTML="密码格式正确";
                addText.style.color="#cbd2c5";
                ele.style.border="2px solid green";
            }else
            {
                result['password']=false;
                addText.innerHTML="长度不超过6-16个数字或者字母";
                addText.style.color="red";
                ele.style.border="2px solid red";
            }
        }else {
            result['password']=false;
            addText.innerHTML="请输入密码";
            ele.style.border="2px solid red";
            addText.style.color="red";
        }
    }
    if(ele.name==="repassword")
    {
        if (ele.value)
        {
            if (ele.value===key)
            {
                result['repassword']=true;
                addText.innerHTML="输入密码正确";
                addText.style.color="#cbd2c5";
                ele.style.border="2px solid green";
            }else
            {
                result['repassword']=false;
                addText.innerHTML="请输入与第一次一样的密码";
                addText.style.color="red";
                ele.style.border="2px solid red";
            }
        }else {
            result['repassword']=false;
            addText.innerHTML="请再次输入密码";
            ele.style.border="2px solid red";
            addText.style.color="red";
        }
    }
    if(ele.name==="email")
    {
        if (ele.value)
        {

            if (ele.value.match(/[(..)@(...)]/))
            {
                result['email']=true;
                addText.innerHTML="有效邮箱格式";
                addText.style.color="#cbd2c5";
                ele.style.border="2px solid green";
            }else
            {
                result['email']=false;
                addText.innerHTML="请输入正确的邮箱";
                addText.style.color="red";
                ele.style.border="2px solid red";
            }
        }else {
            result['email']=false;
            addText.innerHTML="邮箱不能为空";
            ele.style.border="2px solid red";
            addText.style.color="red";
        }
    }
    if(ele.name==="phone")
    {
        if (ele.value)
        {
            var len=ele.value.trim();
            if (ele.value.match(/^[0-9]/)&&len.length===11)
            {
                result['phone']=true;
                addText.innerHTML="有效电话号码";
                addText.style.color="#cbd2c5";
                ele.style.border="2px solid green";
            }else
            {
                result['phone']=false;
                addText.innerHTML="请输入有限电话号码";
                addText.style.color="red";
                ele.style.border="2px solid red";
            }
        }else {
            result['phone']=false;
            addText.innerHTML="电话不能为空";
            ele.style.border="2px solid red";
            addText.style.color="red";
        }
    }
}

function $(ele){
    return document.getElementById(ele);
}
function  $$(ele)
{
    return document.querySelector(ele);
}