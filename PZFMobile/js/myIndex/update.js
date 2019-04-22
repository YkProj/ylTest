function update() { //点击账号登录下一步
	var accountPhoneModefy = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/; //验证手机号11位
	var accountPhone = $("#accountPhone").val();
	var VerificationCode = $("#VerificationCode").val();
	if(accountPhone == "") {
		layer.open({
			content: "手机号不能为空",
			skin: 'msg',
			time: 2 //2秒后自动关闭
		});
	} else if(!accountPhoneModefy.test(accountPhone)) {
		layer.open({
			content: "请输入正确手机号",
			skin: 'msg',
			time: 2 //2秒后自动关闭
		});
	} else {
		if(VerificationCode == '') {
			layer.open({
				content: "验证码不能为空",
				skin: 'msg',
				time: 2 //2秒后自动关闭
			});
		} else {
			var DATA = new Object();
			DATA.phone = accountPhone;
			window.localStorage.setItem("phone",accountPhone);
			DATA.code = VerificationCode;
			getWebData("wuser", "loginByPhone", METHOD_POST, DATA, function(data) {
				if(data.code == 200) {
					var inviteLoginData = data.data;
					layer.open({
						content: data.msg,
						skin: 'msg',
						time: 2 //2秒后自动关闭
					});
					setTimeout(function() {
						mui.openWindow({
							url: 'updateNext.html',
						});
					}, 1500)
				}
			});
		}
	}
}

function updateOk() {
	var updatePwdReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,18}$/; //验证密码8-18位字母和数字组合
	var updateNumReg = /^\d{6}$/; //检验6位数字
	var updateAccountPwd = $("#updateAccountPwd").val();
	var updateAccountPwdEncryption = escape(updateAccountPwd);
	var updateAccountTranscationPwd = $("#updateAccountTranscationPwd").val();
	var accountTranscationPwdEncryption = escape(updateAccountTranscationPwd);
	if(updateAccountPwd == "") {
		layer.open({
			content: "登录密码不能为空",
			skin: 'msg',
			time: 2 //2秒后自动关闭
		});
	} else if(!updatePwdReg.test(updateAccountPwd)) {
		layer.open({
			content: "密码由8-18位字母和数字的组合，请正确输入",
			skin: 'msg',
			time: 2 //2秒后自动关闭
		});
	} else {
		if(updateAccountTranscationPwd == "") {
			layer.open({
				content: "交易密码不能为空",
				skin: 'msg',
				time: 2 //2秒后自动关闭
			});
		} else if(!updateNumReg.test(updateAccountTranscationPwd)) {
			layer.open({
				content: "交易密码由6位数字组成，请正确输入",
				skin: 'msg',
				time: 2 //2秒后自动关闭
			});
		} else {
			phone = window.localStorage.getItem("phone");
			var DATA = new Object();
			DATA.loginPassword = updateAccountPwd;
			DATA.payPassword = updateAccountTranscationPwd;
			DATA.phone = phone;
			getWebData("wuser", "setUserInfo", METHOD_POST, DATA, function(data) {
				if(data.code == 200) {
					var inviteUserData = data.data;
					saveUserData(inviteUserData);
					layer.open({
						content: data.msg,
						skin: 'msg',
						time: 2 //2秒后自动关闭
					});
					setTimeout(function() {
						mui.openWindow({
							url: '../main/homeIndex.html',
						});
						getData(1);
					}, 1500)
				}
			});
		}
	}
}