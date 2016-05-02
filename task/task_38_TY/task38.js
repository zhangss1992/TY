/**
 * Created by lenovo on 2016-4-26.
 */

var grade={
    name:["小明","小红","小亮"],
    Chinese:[80,90,60],
    Math:[90,60,100],
    English:[70,90,70],
    Total:[240,240,230],
    order:null,
    nameOrder:[],
    ChineseOrder:[],
    MathOrder:[],
    EnglishdOrder:[],
    TotalOrder:[],

};
var flag=true;
//升序、降序排序
var Order={
    ascend:function(before){
        grade.order=[];
        var data=[];
        for(var x in before)
        {
            data[x]=before[x];
        }
        data.sort(function(a,b){
            if( a>b)
                return 1;
            else
                return -1;
        });
        for(var i=0;i<data.length;i++)
        {
            grade.order[i]=before.indexOf(data[i]);
        }
        return data;
    },
    decend:function(before){
        grade.order=[];
        var data=[];
        for(var x in before)
        {
            data[x]=before[x];
        }
        data.sort(function(a,b){
            if( a<b)
                return 1;
            else
                return -1;
        });
        for(var i=0;i<data.length;i++)
        {
            grade.order[i]=before.indexOf(data[i]);
        }
        return data;
    },
    Sorting:function(before){
       if (flag===true)
       {
           Order.ascend(before);
       }
        else Order.decend(before);
        for(var i= 0;i<grade.order.length;i++)
        {
            grade.nameOrder[i]=grade.name[grade.order[i]];
            grade.ChineseOrder[i]=grade.Chinese[grade.order[i] ];
            grade.EnglishdOrder[i]=grade.English[ grade.order[i] ];
            grade.MathOrder[i]=grade.Math[ grade.order[i] ];
            grade.TotalOrder[i]=grade.Total[ grade.order[i] ];
        }

    }
};
function init(){
    var upOrder=document.getElementsByClassName("button1");
    var downOrder=document.getElementsByClassName('button2');
    show(0);
    for(var i=0;i<  upOrder.length;i++)
    {
         upOrder[i].addEventListener('click',function(e){
             var event=e||window.event;
             var target=event.target;
            flag=true;
             switch (target.parentElement.className)
             {
                 case"Chinese": Order.Sorting(grade.Chinese);
                     break;
                 case "Math":Order.Sorting(grade.Math);
                     break;
                 case  "English":Order.Sorting(grade.English);
                     break;
                 case "Total":Order.Sorting(grade.Total);
                     break;
             }

             show(1);
        },false);
    }
    for(var i=0;i<  downOrder.length;i++)
    {

        downOrder[i].addEventListener('click',function(e){
            var event=e||window.event;
            var target=event.target;
            flag=false;
            switch (target.parentElement.className)
            {
                case"Chinese": Order.Sorting(grade.Chinese);
                    break;
                case "Math":Order.Sorting(grade.Math);
                    break;
                case  "English":Order.Sorting(grade.English);
                    break;
                case "Total":Order.Sorting(grade.Total);
                    break;
            }
            show(1);
        },false);
    }
}
init();
//表格绘制统一接口
function show(val){
    var tr=document.querySelector('tbody').getElementsByTagName('tr') ;
    if((tr.length===3)&&(val===1))
    {
        for(var i=0;i<tr.length;i++)
        {
            tr[i].innerHTML='<td>'+grade.nameOrder[i]+'</td><td> '+grade.ChineseOrder[i]+'</td><td>'+grade.MathOrder[i]+'</td><td>'+grade.EnglishdOrder[i]+'</td><td>'+ grade.TotalOrder[i]+'</td>';

        }
    }else  if((tr.length===3)&&(val===0)){
        for(var i=0;i<tr.length;i++)
        {
            tr[i].innerHTML='<td>'+grade.name[i]+'</td><td> '+grade.Chinese[i]+'</td><td>'+grade.Math[i]+'</td><td>'+grade.English[i]+'</td><td>'+ grade.Total[i]+'</td>';

        }
    }
    else {
        alert("error!");
    }
}

