$(function(){

    $.post("/boot/getcuruser",$("[name]").serialize(),function(data){
      console.log("aaaaaaaaaaaaaaa")
      $("#clientname").html(data.clientname);
    });
    $.post("/boot/getcuruser",$("[name]").serialize(),function(data){
          console.log("bbbbbbbbbbbbb")
          $("#clientname01").html(data.clientname);
          console.log(data)
        },'json');
    $.post("/boot/getcuruser",$("[name]").serialize(),function(data){
          console.log("ccccccccccccc")
          $("#clientemail").html(data.clientemail);
    });

    $.post("/boot/getcuruser",$("[name]").serialize(),function(data){
        console.log("ddddddddddd")
        $("#logintime").html(data.logintime);
    });

    $.post("/boot/getcuruser",$("[name]").serialize(),function(data){
        console.log("eeeeeeeeeee")
        $("#settingsUserName").html(data.clientname);
    });
    $.post("/boot/getcuruser",$("[name]").serialize(),function(data){
        console.log("ffffffffff")
        $("#settingsUserEmail").html(data.clientemail);
    });
    $.post("/boot/getcuruser",$("[name]").serialize(),function(data){
        console.log("gggggggggg")
        $("#settingsUserPassword").html(data.clientpwd);
    });
    $.post("/boot/getcuruser",$("[name]").serialize(),function(data){
        console.log("hhhhhhhhhh")
        $("#clientid").html(data.clientid);
    });
    $.post("/boot/getcuruser",$("[name]").serialize(),function(data){
        console.log("iiiiiiiiiii")
        $("#clientpwd").html(data.clientpwd);
    });
    $.post("/boot/getcuruser",$("[name]").serialize(),function(data){
        console.log("11111111111")
        $("#settingsUserclientid").html(data.clientid);
    });
    $.post("/boot/getcuruser",$("[name]").serialize(),function(data){
        console.log("22222222222222")
        $("#settingsUserlogintime").html(data.logintime);
    });
    $.post("/boot/getcuruser",$("[name]").serialize(),function(data){
        console.log("eeeeeeeeeee")
        $("#settingsUserName01").html(data.clientname);
    });
    $.post("/boot/getcuruser",$("[name]").serialize(),function(data){
        console.log("33333333")
        $("#clientright").html(data.clientright);
    });

    $("#clientpwd").hide();
    $("#clientpwd01").hide();
    $("#settingsUserclientid").hide();
    $("#settingsUserlogintime").hide();
    $("#settingsUserName01").hide();




//添加修改按钮
    //生成修改按钮并将它填到单元格
    $("#modBtn").click(function(){
        if($(this).val() == "修改" ){
            //如果当按钮上的文字是确定，用户点击的是确定功能
            //1、进行页面验证
            //1.1验证用户名是否填写
            //获取到当前行第二个单元格中的文本框对象
            console.log("jjjjjjjjjj")
            var clientemail = $("#settingsUserEmail").val();
            // var oText2 = document.getElementById("settingsUserEmail").innerText;
            // var settingsUserEmail = oText2.val();
            if(!clientemail){
                alert("请输入您想修改的绑定邮箱");
                // oText2.focus();
                return;
            }
            console.log("123456")
            //1.2验证密码是否填写



            var myReg=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+")){2,18}@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(!(myReg.test(clientemail))){
                alert("邮箱格式不正确");
                // oText2.focus();
                return;
            }

            var clientpwd = $("#settingsUserPassword").val();

            /*var oText3 = document.getElementById("settingsUserPassword").innerText;
            var settingsUserPassword = oText3;*/
            if(!clientpwd){
                alert("请输入您想修改的密码");
                // oText3.focus();
                return;
            }
            var reg  = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
            if(!(reg.test(clientpwd))){
                alert("密码由6-16位字母数字组成");
                // oText3.focus();
                return;
            }

            var clientid = document.getElementById("clientid").innerText;
            var clientname = document.getElementById("clientname01").innerText;
            var logintime = document.getElementById("logintime").innerText;
            var clientright = 1;

            console.log(clientid)
            console.log(clientname)
            console.log(clientpwd)
            console.log(clientemail)
            console.log(clientright)
            console.log(logintime)

            var oBtn = $(this);
            $.post("/boot/modclient",{
                clientid : parseInt(clientid),
                clientname : clientname,
                clientpwd : clientpwd,
                clientemail : clientemail,
                clientright : "1",
                logintime : logintime
            },function(data){
                console.log(data)
                if(data){
                    // console.log("kkkkkkkkkkkkk")
                    alert("修改成功");
                    window.location.href = "http://localhost:8088/boot/page-login.html";
                }else{
                    //修改失败
                    alert("修改失败");
                }

            },"json");

        }

    }).appendTo(oTd);



});

/*
//修改信息产生提示
$(function(){


    //2、给注册按钮绑定点击事件
    $("#modBtn").click(function(){
        //1.1页面的验证
        //验证用户名
        var clientemail = $("#settingsUserEmail").val();
        if(!clientemail){
            //没写用户名
            alert("请输入要修改的绑定邮箱");
            //光标进入用户名文本框
            $("#settingsUserEmail").focus();
            return;
        }


        var clientpwd = $("#settingsUserPassword").val();
        if(!clientpwd){
            //没写用户名
            alert("请输入要修改的密码");
            //光标进入用户名文本框
            $("#settingsUserPassword").focus();
            return;
        }


    });
});
*/
