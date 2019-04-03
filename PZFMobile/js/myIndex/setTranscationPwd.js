/*修改交易密码全局变量*/
var setPwdphone = null;
$(function() { //获取当前绑定手机号
	var DATA = new Object();
	DATA.userId = getUserData("id");
	getWebData("user", "getPhoneNo", METHOD_GET, DATA, function(data) {
		if(data.code == 200) {
			var data = data.data;
			$("#currentPhone").empty();
			setPwdphone = data.phone;
			var currentPhoneInterceptNew = setPwdphone.substr(0, 3) + "****" + setPwdphone.substr(8, 11);
			$("#currentPhone").html(currentPhoneInterceptNew);

		} else {
			layer.open({
				content: data.code+data.msg,
				skin: 'msg',
				time: 2 //2秒后自动关闭
			});
		}

	});
})

function transcationPwd() {//验证码
	var obj = $("#setTranPwd");
	settime(obj);
	var DATA = new Object();
	DATA.phone = setPwdphone;
	DATA.type = 2;
	getWebData("code", "sendCode", METHOD_POST, DATA, function(data) {
		if(data.code == 200) {
			layer.open({
				content: data.msg,
				skin: 'msg',
				time: 2 //2秒后自动关闭
			});
		} else {
			layer.open({
				content: data.code+data.msg,
				skin: 'msg',
				time: 2 //2秒后自动关闭
			});
		}

	});
}

function setTranscationPwd() {//修改交易密码
	var setPwdCode = $("input[name='setPwdCode']").val();
	var tranPwd = $("input[name='tranPwd']").val();
	var tranPwdAgain = $("input[name='tranPwdAgain']").val();
	if(setPwdCode == '') {
		layer.open({
			content: "验证码不能为空",
			skin: 'msg',
			time: 2 //2秒后自动关闭
		});
	} else {
		if(tranPwd == '') {
			layer.open({
				content: "请输入交易密码",
				skin: 'msg',
				time: 2 //2秒后自动关闭
			});
		} else {
				if(tranPwdAgain == '') {
					layer.open({
						content: "请再次输入交易密码",
						skin: 'msg',
						time: 2 //2秒后自动关闭
					});
				}else if(tranPwdAgain != tranPwd){
					layer.open({
						content: "两次输入交易密码不一致，请重新输入",
						skin: 'msg',
						time: 2 //2秒后自动关闭
					});
				}
		}
	}
	var DATA = new Object();
	DATA.userId = getUserData("id");
	DATA.payPwd = tranPwdAgain;
	DATA.code = setPwdCode;
	getWebData("user", "updatePayPwd", METHOD_POST, DATA, function(data) {
		if(data.code == 200) {
			layer.open({
				content: "修改交易密码成功",
				skin: 'msg',
				time: 2 //2秒后自动关闭
			});
		} else {
			layer.open({
				content: data.msg,
				skin: 'msg',
				time: 2 //2秒后自动关闭
			});
		}

	});
}