/**
 * Created by lenovo on 2016-4-9.
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

/*获取所有节点元素*/
var parent=document.getElementById("parent");
var child1=document.querySelector('.child1');
var child2=document.querySelector('.child2');
var child3=document.querySelector('.child3');
var child4=document.querySelector('.child4');
var pre=document.querySelector(".pre");
var middle=document.querySelector(".in");
var post=document.querySelector(".post");
var select=document.querySelector('select');
/*获取下拉列表中的文本值*/
function seclectedValue(){
    for(var i=0;i<select.length;i++)
    {
        if(select[i].selected===true)
        {
            var speed=select[i].innerText;
            if(speed==="快速")
            {
                return 500;
                //setTimeout(node.data.style.backgroundColor = "#F125C2",1000);
                //node.data.style.backgroundColor = "#ffffff";
            }else if (speed==="正常")
            {
                return 1000;
                //setTimeout(node.data.setAttribute("style","background:blue"),2000);
            }else(speed==="慢速")
            {
                return 1500;
                //setTimeout(node.setAttribute("style","background:blue"),3000);
            }
        }
    }
}

/*二叉树*/
function  Node(data){
    this.data=data;
    this.m_pLeft=null;
    this.m_pRight=null;
}
function Tree(data)
{
    var node=new Node(data);
    this._root=node;
}

var tree=new Tree(parent);
createTree(tree._root);

/*构建二叉树*/
function createTree(rootNode)
{

    if(rootNode.data.firstElementChild!==null)
    {
        rootNode.m_pLeft=new Node(rootNode.data.firstElementChild);
        rootNode.m_pRight=new Node(rootNode.data.lastElementChild);
        createTree(rootNode.m_pLeft);
        createTree( rootNode.m_pRight);
    }

}
function show(){
    var speed= seclectedValue();
    treeElement[0].data.style.backgroundColor= "#F125C2";
    var i=0;
   var timer=setInterval(function(){
           if(i===treeElement.length)
           {
               treeElement[i].data.style.backgroundColor="#FFFFFFF";
               clearInterval(timer);
           }else {
               i++;
               treeElement[i-1].data.style.backgroundColor= "#FFFFFF";
               treeElement[i].data.style.backgroundColor= "#F125C2";

           }
   },speed);
}
var treeElement=[];
/*先序排列*/
function preOrder(node){
    if(!(node=== null))
    {
        treeElement.push(node);
        preOrder(node.m_pLeft);
        preOrder(node.m_pRight);
    }
}
/*中序排列*/
function inOrder(node){
    if(!(node===null))
    {
        inOrder(node.m_pLeft);
        treeElement.push(node);
        inOrder(node.m_pRight);
    }
}
/*后序排列*/
function postOrder(node){
    if(!(node===null))
    {
        postOrder(node.m_pLeft);
        postOrder(node.m_pRight);
        treeElement.push(node);
    }
}
function init(){
    EventUtil.addHandler(pre,'click',function(){
        treeElement=[];
        preOrder(tree._root);
        show();
    });
    EventUtil.addHandler(middle,'click',function(){
        treeElement=[];
        inOrder(tree._root);
        show();
    });
    EventUtil.addHandler(post,'click',function(){
        treeElement=[];
        postOrder(tree._root);
        show();
    });
}
init();
















