/**
 * Created by lenovo on 2016-3-29.
 */
/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
var cityInput=$('aqi-city-input');
var dataInput=$('aqi-value-input');

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function $(id){
    return document.getElementById(id);
}

function addAqiData() {
    var truevalue;
    truevalue=true;
    var keyRange = /^[\u4e00-\u9fa5a-zA-Z]+$/;
    var dataRange = /^[1-9]+$/;
   var city=cityInput.value.trim();
   var data=dataInput.value.trim();
    if(!keyRange.test(city)) {
        alert("请输入正确的字符！");
        $('aqi-city-input').focus();
        truevalue=false;
    }
    if (!dataRange.test(data))
    {
        alert("请输入数字！");
        $('aqi-value-input').focus();
        truevalue=false;
    }
   if (keyRange.test(city)&&dataRange.test(data))
    {
        truevalue=true;
    }
    if (truevalue)
    {
        aqiData[city]=data;
    }

   //var aqilist= createEle(name,data);
   // return aqilist;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var aqitable=$('aqi-table');
     var thead='<tr><td>城市</td>'+'<td>空气质量</td>'+'<td>操作</td></tr>';
        for(var city in aqiData)
        {
            thead+='<tr><td>'+city+'</td>'+'<td>'+ aqiData[city]+"</td><td><button data-city='"+city+"'>删除</button></td></tr>";
        }
    aqitable.innerHTML = city ? thead : "";

}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();

}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(city) {
    delete aqiData[city];
    renderAqiList();
}

function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    var addbtn=$('add-btn');
    var cancelbtn=$('aqi-table');
    var EventUtil={
        addHandler:function(element,event,handler)
        {
            if(element.addEventListener)
            {
                element.addEventListener(event,handler,false);
            }else if(element.attachEvent)
            {
                element.attachEvent("on"+event,handler);
            }else {
                element['on'+event]=handler;
            }
        },
        removeHandler:function(element,event,handler)
        {
            if (element.removeEventListener)
            {
                element.removeEventListener(event,handler,false);
            }else if(element.detachEvent)
            {
                element.detachEvent("on"+event,handler);
            }else
            {
                element['on'+event]=null;
            }
        }
    }
    EventUtil.addHandler(addbtn,'click',addBtnHandle);
    document.getElementById("aqi-table").addEventListener("click", function(event){
        alert( event.target.dataset.city);
        if(event.target.nodeName.toLowerCase() === 'button') delBtnHandle.call(null, event.target.dataset.city);
    });


}

//function ￥(element){
//    return document.createElement(element);
//}
init();
