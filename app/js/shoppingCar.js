/**
 * Created by Administrator on 2016/8/7.
 */
$(function(){
    $(".add").click(function(){
        var t=$(this).parent().find('input[class*=text_box]');
        t.val(parseInt(t.val())+1);
        setTotal();
    });
    $(".min").click(function(){
        var t=$(this).parent().find('input[class*=text_box]');
        t.val(parseInt(t.val())-1);
        if(parseInt(t.val())<0){
            t.val(0);
        }
        setTotal();
    });
    function setTotal(){
        var s=0;
        $("#tab td").each(function(){
            s+=parseInt($(this).find('input[class*=text_box]').val())*parseFloat($(this).find('span[class*=price]').text());
        });
        $("#total").html(s.toFixed(2));
    }
    setTotal();

})