
$(document).ready(function () {
    $("#btn-secondarylogin").click(function(){



        var clientname=$("#loginUserName").val();
        if(!clientname){
            alert("请输入用户名")
            return;
        }
        var clientpwd=$("#loginUserPassword").val();
        if(!clientpwd){
            alert("请输入密码")
            return;
        }

        /*var clientright=$("#loginUserRight").val();
        if(!clientright){
            alert("请选择用户权限")
            return;
        }*/

        $.post("/boot/clientlogin",$("[name]").serialize(),function(data){
            if(data.clientname=="long" && data.clientpwd=="123"){

                window.location.href = "admin.html"

            }else{

                if(data.clientid){
                    window.location.href = "page-single-user.html"
                }else{
                    alert("用户名密码输入错误");
                }

            }



        },"json");

    });




});