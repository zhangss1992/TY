/**
 * Created by lenovo on 2016-4-22.
 */

// 创建eventUtil对象
var eventUtil = {
    // 添加
    addHandler: function(elt, type, handler) {
        if (elt.addEventListener) {
            elt.addEventListener(type, handler, false);
        } else if (elt.attachEvent) {
            elt.attachEvent("on" + type, handler);
        } else {
            elt["on" + type] = handler;
        }
    }
};

//元素获取
 function $(obj)
   {
       return document.getElementById(obj);
   }
var state={
    isDraging : false,

}

//浮出层的中心始终在屏幕正中
var screenMiddle={
    //居中
    center:function(el)
    {
        var screenHeight=document.documentElement.clientHeight;
        var screenWidth=document.documentElement.clientWidth;
        var scrollTop=screenMiddle.getScrollTop1();

        var offsetHeight=el.offsetHeight;
        var offsetWidth=el.offsetWidth;

        el.style.top=((screenHeight-offsetHeight)/2+scrollTop)+"px";
        el.style.left=(screenWidth-offsetWidth)/2+"px";

    },
    //获取滚动条高度
    getScrollTop1:function(){
        if ('pageYOffset' in window) {
            return window.pageYOffset;
        } else if (document.compatMode === "BackCompat") {
            return document.body.scrollTop;
        } else {
            return document.documentElement.scrollTop;
        }
    },
    middle:function(){
        screenMiddle.center($('loginBox'));
    }
}

//var time=setInterval(screenMiddle.middle,100);


//显示、关闭浮动层以及壁罩
var operation={
    closeBox:function(){
        $('loginBox').style.display="none";
        $('mask').style.display="none";
    },
    showBox:function(){
        $('loginBox').style.visibility=visible;
        $('mask').style.visibility=visible;
        //time=setInterval(screenMiddle.middle,50);
    },
    mousemove:function(e)
    {
        var e=e||window.event;
        mouseX= e.pageX;
        mouseY= e.pageY;
        if (state.isDraging===true)
        {
            var moveX=moveX-mouseOffX;
            var moveY=moveY-mouseOffY;

            $('loginBox').style.left=moveX;
            $('loginBox').style.left=moveY;
        }
    },
    mousedown:function(e){
        var e=e||window.event;
        ////鼠标点击点离浮出层左边框的距离
        //mouseOffX= e.pageX-$('loginBox').offsetLeft;
        ////鼠标点击点离付出层上边框的距离
        //mouseOffY= e.pageY-$('loginBox').offsetHeight;
       // 获得鼠标坐标，并记录当前坐标给变量
      var  mouseX= e.clientX;
      var mouseY= e.clientY;
        //获取对象相对于版面或由 offsetParent 属性指定的父坐标的计算位置
      var disX= mouseX-$('loginBox').offsetLeft;
      var  disY= mouseY-$('loginBox').offsetTop;

        //获取对象本身宽度和高度,因为本来是px的字符串，所以要取其中的整数值???不知为啥获取出的值为空
      var  dX=parseInt($('loginBox').style.width);
      var  dY=parseInt($('loginBox').style.height);


      document.onmousemove=function(e){
          var e=e||window.event;
          // //设置该层坐标等于原坐标加上鼠标移动的坐标
          $('loginBox').style.left= e.clientX+200-disX+"px";
          $('loginBox').style.top= e.clientY+100-disY+"px";
      };
        document.onmouseup = function() {
            document.onmousedown = null;
            document.onmousemove = null;
        };


    }
}
//添加响应函数
//点击X按钮时隐藏浮动层和避障
eventUtil.addHandler($('closeBtn'),'click',function(){
    operation.closeBox();
});
//点击标题栏的登录按钮，浮动层和避障显示出来
eventUtil.addHandler($('loginLink'),'click',function(){
    operation.showBox();
});
//点击浮动层以外的部分默认是关闭浮动层
eventUtil.addHandler($('mask'),'click',function(){
    operation.closeBox();
});
//鼠标至于浮动层标题栏时，其样式变化
eventUtil.addHandler($('loginBox'),'mousedown',function(e){
    operation.mousedown(e);
});

//$('loginBox').addEventListener("mousedown",function(e){
//    operation.mousedown(e);
//},false);
//
//document.addEventListener('mousemove',function(e){
//    operation.mousemove(e);
//},false);