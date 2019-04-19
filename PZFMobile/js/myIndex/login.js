function modifyAccount() { //获取验证码
	var accountPhoneModefy = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/; //验证手机号11位
	var accountPhone = $("#accountPhone").val();
	if(accountPhone == '') {
		layer.open({
			content: "请输入手机号",
			skin: 'msg',
			time: 2 //2秒后自动关闭
		});
	} else if(!accountPhoneModefy.test(accountPhone)) {
		layer.open({
			content: "请正确输入手机号",
			skin: 'msg',
			time: 2 //2秒后自动关闭
		});
	} else {
		var obj = $("#accountModify");
		if(countdown == 60) {
			settime(obj);
			var DATA = new Object();
			DATA.phone = accountPhone;
			DATA.type = 1;
			getWebData("code", "sendCode", METHOD_POST, DATA, function(data) {
				if(data.code == 200) {
					layer.open({
						content: data.msg,
						skin: 'msg',
						time: 2 //2秒后自动关闭
					});
				} else {
					layer.open({
						content: data.code + data.msg,
						skin: 'msg',
						time: 2 //2秒后自动关闭
					});
				}
			});
		} else {
			layer.open({
				content: "验证码已发送",
				skin: 'msg',
				time: 2 //2秒后自动关闭
			});
		}
	}
}

$("input").blur(function() {
	var accountPhoneModefy = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/; //验证手机号11位
	var pwdReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,18}$/; //验证密码8-18位字母和数字组合
	var numReg = /^\d{6}$/; //检验6位数字
	var codeReg = /^\d{6}$/; //检验验证码6位数字
	var accountPhone = $("#accountPhone").val();
	var accountPwd = $("#accountPwd").val();
	var accountTranscationPwd = $("#accountTranscationPwd").val();
	var VerificationCode = $("#VerificationCode").val();
	if(!accountPhoneModefy.test(accountPhone)) {
		layer.open({
			content: "请输入正确手机号",
			skin: 'msg',
			time: 2 //2秒后自动关闭
		});
	} else if(!pwdReg.test(accountPwd)) {
		layer.open({
			content: "密码由8-18位字母和数字的组合，请正确输入",
			skin: 'msg',
			time: 2 //2秒后自动关闭
		});
	} else if(!numReg.test(accountTranscationPwd)) {
		layer.open({
			content: "交易密码由6位数字组成，请正确输入",
			skin: 'msg',
			time: 2 //2秒后自动关闭
		});
	}else if(!codeReg.test(VerificationCode)){
		layer.open({
			content: "请正确输入验证码",
			skin: 'msg',
			time: 2 //2秒后自动关闭
		});
	}
})

function accountOk() { //点击确认提交信息
	var accountPhoneModefy = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/; //验证手机号11位
	var pwdReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,18}$/; //验证密码8-18位字母和数字组合
	var numReg = /^\d{6}$/; //检验6位数字
	var houseId = localStorage.getItem("AuctionListId");
	var userId = localStorage.getItem("userId");
	var accountPhone = $("#accountPhone").val();
	var VerificationCode = $("#VerificationCode").val();
	var accountPwd = $("#accountPwd").val();
	var accountPwdEncryption = escape(accountPwd);
	var accountTranscationPwd = $("#accountTranscationPwd").val();
	var accountTranscationPwdEncryption = escape(accountTranscationPwd);
	localStorage.setItem('tranPwd', accountTranscationPwdEncryption);
	if(accountPhone == '') {
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
			if(accountPwd == '') {
				layer.open({
					content: "登录密码不能为空",
					skin: 'msg',
					time: 2 //2秒后自动关闭
				});
			} else if(!pwdReg.test(accountPwd)) {
				layer.open({
					content: "密码由8-18位字母和数字的组合，请正确输入",
					skin: 'msg',
					time: 2 //2秒后自动关闭
				});
			} else {
				if(accountTranscationPwd == '') {
					layer.open({
						content: "交易密码不能为空",
						skin: 'msg',
						time: 2 //2秒后自动关闭
					});
				} else if(!numReg.test(accountTranscationPwd)) {
					layer.open({
						content: "交易密码由6位数字组成，请正确输入",
						skin: 'msg',
						time: 2 //2秒后自动关闭
					});
				} else {
					var DATA = new Object();
					DATA.userId = userId;
					DATA.phone = accountPhone;
					DATA.code = VerificationCode;
					DATA.payPassword = accountTranscationPwdEncryption;
					DATA.loginPassword = accountPwdEncryption;
					getWebData("wuser", "setUserInfo", METHOD_POST, DATA, function(data) {
						if(data.code == 200) {
							layer.open({
								content: "设置成功",
								skin: 'msg',
								time: 2 //2秒后自动关闭
							});
							setTimeout(function() {
								mui.back();
								//								mui.openWindow({
								//									url: '../auctionHall/auctionHallDetail.html',
								//								});
								//								auctionDetail(houseId);
							}, 1500)
						} else {
							layer.open({
								content: data.code + data.msg,
								skin: 'msg',
								time: 2 //2秒后自动关闭
							});
						}
					});
				}
			}
		}
	}
}