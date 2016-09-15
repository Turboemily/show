/**
 * Created by mac on 16/8/24.
 */
window.onload=function(){
    var oTxt=document.getElementById("index_input");
    var oUl=document.getElementById("list");
    oTxt.onkeyup=function(){
        var oScript=document.createElement("script");
        oScript.type='text/javascript';
        oScript.src='https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd='+oTxt.value+'&cb=box';
        document.getElementsByTagName("head")[0].appendChild(oScript);
        document.getElementsByTagName("head")[0].removeChild(oScript);
    }
};
function box(str){
    var oUl=document.getElementById("list");
    //alert(str.s.length);
    if(str.s.length){
        oUl.style.display='block';
        oUl.innerHTML='';
        for(var i=0;i<str.s.length;i++){
            var oLi=document.createElement("li");
            oLi.innerHTML='<a href="https://www.baidu.com/s?wd='+str.s[i]+'"target"=_blank">'+str.s[i]+'</a>';
            oUl.appendChild(oLi);
        }
    }else{
        oUl.style.display='none';
    }
    document.onclick=function(){
        oUl.style.display='none';
    }
}
