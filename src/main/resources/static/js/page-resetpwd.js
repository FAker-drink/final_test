$(document).ready(function() {

    $("#newpwd").blur(function () {
        var pwd = $("#newpwd").val();
        var cpwd = $("#confirmpwd").val();
        var reg  = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
        if(pwd!== cpwd) {
            $("#tip").css({"display":"inline-block"})
        } else {
            $("#tip").css({"display":"none"})
        }
        if(reg.test(pwd)) {
            $("#tip2").css({"display":"none"})
        } else {
            $("#tip2").css({"display":"inline-block"})
        }
    })

    $("#confirmpwd").blur(function () {
        var pwd = $("#newpwd").val();
        var cpwd = $("#confirmpwd").val();
        var reg  = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
        if(pwd!== cpwd) {
            $("#tip").css({"display":"inline-block"})
        } else {
            $("#tip").css({"display":"none"})
        }
        if(reg.test(pwd)) {
            $("#tip2").css({"display":"none"})
        } else {
            $("#tip2").css({"display":"inline-block"})
        }
    })

    var myReg=/^(\w|(\.\w+))+@([a-zA-Z0-9_-]+\.)+(com|org|cn|net)+$/;

    $("#getcheck").click(function() {
        var email = $("#email").val();
        console.log(email)
        if(email!=null) {
            if(!myReg.test(email)) {
                alert("邮箱格式错误");
                return false;
            } else {
                $.post("/boot/sendemail",{
                    "email" : email
                },function (data) {

                },'json')
            }
        } else {
            alert("请先输入邮箱");
            return false;
        }
    });

    $("#rebtn").click(function () {
        var pwd = $("#newpwd").val();
        var email = $("#email").val();
        var checkNum = $("#checknum").val();
        var reg  = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
        if(reg.test(pwd) && pwd) {
            $.post("/boot/resetpwd",{
                "pwd" : pwd,
                "email" : email,
                "checkNum" : parseInt(checkNum)
            },function (data) {
                alert("重设密码成功");
                window.location.href = "page-login.html";
            },'json')
        } else {
            alert("请更正密码格式")
            return false;
        }
    })

});