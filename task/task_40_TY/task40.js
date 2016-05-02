/**
 * Created by lenovo on 2016-4-29.
 */
EventUtil={
    addHandler:function(element,event,handler){
        if(element.addEventListener)
        {
            element.addEventListener(event,handler,false);
        }else if(element.attachEvent)
        {
            element.attachEvent(event,handler);
        }else {
            element["on"+event]=null;
        }
    }
};
function $(id)
{
    return document.getElementById(id);
};
var year = $('disYear');
var    month = $('disMonth');
var    yearMonth=$('myText');
var    table=$('myTable');
var value={
    yearVal:year.value,
    monthVal:month.value,
};
var showPage={

    //创建下拉列表
   selectSet: function() {

       var yearStr="";
       var monthStr="";
       var Month=["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"];
        for(var i=1948;i<=2049;i++)
        {
            var option=document.createElement('option');
            yearStr=String(i)+"年";
            option.setAttribute("value",yearStr);
            var textYear=document.createTextNode(yearStr);
            option.appendChild(textYear);
            year.appendChild(option);
        }
       for(var i=0;i<12;i++)
       {
            var option=document.createElement('option');
           monthStr=Month[i];
           option.setAttribute("value",monthStr);
           var textMonth=document.createTextNode(monthStr);
           option.appendChild(textMonth);
           month.appendChild(option);
       }
       //初始值设置为当前日期
       var date=new Date();
       year.value=String(date.getFullYear())+"年";
       month.value=String(date.getMonth()+1)+"月";
       yearMonth.value=String(date.getFullYear())+"年"+String(date.getMonth()+1)+"月";
   },
    createCalendar:function(){

        var thead=document.createElement('thead');
        var tr=document.createElement('tr');
        var week=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
        for(var i=0;i<7;i++)
        {
            var weekStr=week[i];
            var th=document.createElement('th');
            var text=document.createTextNode(weekStr);
            th.appendChild(text);
            tr.appendChild(th);
        }
        thead.appendChild(tr);
        table.appendChild(thead);
        var tbody=document.createElement('tbody');
        tbody.setAttribute('id','selectDate');
        for (var i=0;i<6;i++)
        {
            var tr=document.createElement('tr');
            for(var  j=0;j<7;j++)
            {
                var td=document.createElement('td');
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        }
        table.appendChild(tbody);
    },
    //确定某个月的第1天是星期几
    setDate:function(){
        var date=new Date();
        var yearGet=parseInt(year.value.match(/\d+/g));
        var monthGet=parseInt(month.value.match(/\d+/g));
        date.setFullYear(yearGet, monthGet,5);
        return date.getDay();
    },
    //计算每个月有多少天
    getDayNum:function() {
        var yearGet = parseInt(year.value.match(/\d+/g));
        var monthGet = parseInt(month.value.match(/\d+/g));
        if (monthGet === 1 || monthGet === 3 || monthGet === 5 || monthGet === 7 || monthGet === 8 || monthGet === 10 || monthGet === 12) {
            return 31;
        }
        else if (monthGet === 4 || monthGet === 6 || monthGet === 9 || monthGet === 11 )
        {
            return 30;
        }else
        {
            if ((yearGet%4===0&&yearGet%100!==0)||(yearGet%400===0))  //判断是否为闰年：能被四整除但是不能被400整除，或者能被400整除
            {
                return 28;
            }
            else {
                return 29;
            }
          }
        },
    //设置日历时间表
    buildCalendar:function(){
        var getDays=showPage.getDayNum(); //计算总天数
        var week=1;
        var trs=document.getElementsByTagName('td');
        var firstDay=showPage.setDate();//第一天是星期几
        for(var i=0;i<trs.length;i++)
        {
            if(trs[i].firstChild)
            {
                trs[i].removeChild(trs[i].firstChild);
                trs[i].removeAttribute("class");
            }
        }

        for(var j=0;j<getDays;j++)
        {
            var textNode=document.createTextNode(String(week));
            trs[firstDay].appendChild(textNode);
            trs[firstDay].setAttribute('class','tdClass');
            firstDay++;
            week++;
        }

    },
    //选取下拉列表时刷新日历主体与页面头部 "xxxx年xx月xx日" 字样
    freshCalendar:function(){
        var selected=$('selectBox');
       // var selected=document.getElementsByTagName('tbody');
        EventUtil.addHandler(selected,'click',function (e){
            var yearGet = year.value;
            var monthGet =parseInt(month.value.match(/^\d+/g)) +"月";
            //选取下拉列表时刷新日历主体
            showPage.buildCalendar();
            yearMonth.value=yearGet+monthGet
        });
    },
    //点击日历主体选取日期时刷新页面头部 "xxxx年xx月xx日" 字样
    freshDay:function() {

    $("selectDate").onclick = function (event) {

        var disYear = parseInt(year.value.match(/^\d+/g));
        var disMonth = parseInt(month.value.match(/^\d+/g)) + 1;

        disMonth = disMonth < 10 ? "0" + disMonth : disMonth;
        if (event.target.firstChild) {
            var disDate = event.target.firstChild.nodeValue;
            disDate = disDate < 10 ? "0" + disDate : disDate;
            $("myText").value = disYear + "年" + disMonth + "月" + disDate + "日";
        }
    }

}

};
window.onload=function(){
    showPage.selectSet();
showPage.createCalendar();
showPage.setDate();
showPage.getDayNum();
showPage.freshCalendar();
showPage.freshDay();

}

















