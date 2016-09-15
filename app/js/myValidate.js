/**
 * Created by mac on 16/8/4.
 */
// $.validator.setDefaults({
//     submitHandler: function() {
//
//
//     }
// });

$().ready(function() {
    // 提交时验证表单
    var validator = $("#form1").validate({
        errorPlacement: function(error, element) {
            // Append error within linked label
            $( element )
                .closest( "form" )
                .find( "label[for='" + element.attr( "id" ) + "']" )
                .append( error );
        },
        errorElement: "span",
        rules:{

            passwordAgain:{
                required: true,
                equalTo: "#password"
            }
        },
        messages: {
            user: {
                required: "账户不能为空",
                minlength: " 账号名不能少于 3 个字母"
            },
            password: {
                required: " 密码不能为空",
                minlength: " 字母不能少于 5 个且不能大于 12 个",
                maxlength: " 字母不能少于 5 个且不能大于 12 个"
            },
            passwordAgain:{
                required: "请输入密码",
                equalTo:"密码不一致"
            }
        }
    });

    $(".cancel").click(function() {
        validator.resetForm();
    });
});

$(".submit").bind("click", function () {
    var user = getUser();
    $.get("http://datainfo.duapp.com/shopdata/userinfo.php",{
        status:"register",
        userID:user.userID,
        passsword:user.passsword,

    },function (data) {
        if(data == 0){
            alert("重名");
        }else{
            alert("注册成功!");
            location.href ="login.html";
        }
    })

})
///获取用户信息,返回json数据/
function getUser() {
    var user = {
        userID:$("#user").val(),
        password:$("#password").val()
    }
    return user;
    // var p = $("<p>昵称 ： "+userID+"</p>");
    // $(".show_right").append(p);
}

$(".submit1").bind("click", function () {
    console.log('11')
    var user = getUser();
    $.get("http://datainfo.duapp.com/shopdata/userinfo.php",{
        status:"login",
        userID:user.userID,
        passsword:user.passsword,

    },function (data) {
        if(data == 0){
            alert("用户不存在");
        }else if(data == 2){
            alert("用户密码不符!");
        }else {
            alert("用户登录成功!");
            if(typeof(Storage)!=="undefined")
            {
                localStorage.userID=user.userID;
            }
            else
            {
                document.getElementById("result").innerHTML="Sorry, your browser does not support web storage...";
            }
            location.href ="myShow.html";
        }
    })

})