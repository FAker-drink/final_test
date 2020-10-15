$(document).ready(function() {




	//对注册功能的操作

	//1、给用户名文本框绑定失去焦点事件
	$("[name='clientname']").blur(function(){
		//验证用户名输入
		var clientname = $(this).val();
		if(!clientname){
			return;
		}

		var namereg=/^[A-Za-z]{3,12}$/;
		if(!(namereg.test(clientname))){
			$("#loginUserName2").show().css("color","green").html("用户名请在3-12位之间且由字母组成").fadeOut(3000);
			$("#clientname").focus();
               return;
		}
		//ajax操作
		$.post("/boot/checkclientname",$(this).serialize(),function(data){
			if(data == "true"){
				//用户名可用
				$("#loginUserName2").show().css("color","green").html("该用户名可用").fadeOut(3000);
			}
			else{
				//用户名不可用
				$("#loginUserName2").show().css("color","red").html("该用户名重复").fadeOut(3000);
			}
		},"text");


	});

	$("#regBtn").click(function() {
		var clientname = $("#loginUserName").val();
		var clientpwd = $("#loginUserPassword").val();
		var conpwd = $("#conloginUserPassword").val();
		var clientemail = $("#loginUserEmail").val();


		var loginreg  = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
		if(!(loginreg.test(clientpwd) && clientpwd)){
			alert("密码格式请在6-16位由字母数字组成");
			$("#clientpwd ").focus();
			return;
		}


			if (!clientname) {
			alert("请填写用户名");
			$("#clientname").focus();
			return;
		}

		if (!clientemail) {
			alert("请填写邮箱");
			$("#clientemail").focus();
			return;
		}
		if (!clientpwd) {
			alert("请填写密码");
			return;
		}
		if (!conpwd) {
			alert("请填写确认密码");
			return;
		}

		if (clientpwd != conpwd) {
			alert("两次密码不一致")
			return;
		}



// xxxxxxxxxx@xxxxx.com[.cn/.net]
// 		/^(\w|(\.\w+))+@([a-zA-Z0-9_-]+\.)+(com|org|cn|net){2,9}+$/;
		var myReg=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+")){2,18}@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


    if(myReg.test(clientemail)){
        $.post("/boot/clientreg",  "clientname=" + clientname + "&clientpwd=" + clientpwd+ "&clientemail=" + clientemail+ "&clientright=0" +  "&logintime=0", function(data) {
            if (data == "true") {
                alert("注册成功");
                window.location.href = "page-login.html";
            } else {
                alert("用户重复，请重试");

            }

        }, "text");
    }else{
        alert("邮箱格式不正确！");
    }



});

});


