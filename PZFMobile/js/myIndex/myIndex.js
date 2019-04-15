
//点击跳转至相应页面
document.getElementById("homeTab").addEventListener('tap', function() {
	mui.openWindow('homeIndex.html', 'homeTab');
})
document.getElementById("auctionTab").addEventListener('tap', function() {
	mui.openWindow('auctionHall.html', 'auctionTab');
})
document.getElementById("myTab").addEventListener('tap', function() {
	if(hasLogin()) {
		mui.openWindow('myIndex.html', 'myTab');
	} else {
		mui.openWindow({
			url: '../myIndex/login.html'
		});
	}
})
function setTranscationPwd() {
	phone = $("input[name='tranPhone']").val();
	verifyPhone(phone);
	var DATA = new Object();
	DATA.phone = phone;
	getWebData("sendSMS", "CodeForUpdatePayPwd", METHOD_GET, DATA, function(data) {
		if(data.code == 200) {
			layer.open({
				content: data.msg,
				skin: 'msg',
				time: 2 //2秒后自动关闭
			});
		}
	});
}

function verrifyCode() { //获取验证码
	phone = $("input[name='setPhone']").val();
	const accountPhoneModefy = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/; //验证手机号11位
	if(phone == "") {
		layer.open({
			content: "请先输入手机号",
			skin: 'msg',
			time: 2 //2秒后自动关闭
		});
	} else if(!accountPhoneModefy.test(phone)) {
		layer.open({
			content: "请输入正确手机号",
			skin: 'msg',
			time: 2 //2秒后自动关闭
		});
	} else {
		var obj = $("#verifyCode");
		settime(obj);
	}
	var DATA = new Object();
	DATA.phone = phone;
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
				content: data.code + data.msg,
				skin: 'msg',
				time: 2 //2秒后自动关闭
			});
		}

	});
}

function setPhoneOk() { //修改手机号
	phone = $("input[name='setPhone']").val();
	var verifyCodeContet = $("input[name='verifyCodeContent']").val();
	var setPhoneLoginPwd = $("input[name='setPhoneLoginPwd']").val();
	if(verifyCodeContet == '') {
		layer.open({
			content: '请先输入验证码',
			skin: 'msg',
			time: 2 //2秒后自动关闭
		});
	} else if(setPhoneLoginPwd == '') {
		layer.open({
			content: '请先输入登录密码',
			skin: 'msg',
			time: 2 //2秒后自动关闭
		});
	}
	var DATA = new Object();
	DATA.userId = getUserData("id");
	DATA.phone = phone;
	DATA.code = verifyCodeContet;
	DATA.loginPwd = setPhoneLoginPwd;
	getWebData("user", "updatePhoneNo", METHOD_POST, DATA, function(data) {
		if(data.code == 200) {
			layer.open({
				content: data.msg,
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

function setLoginPwdOk() { //修改登陆密码
	var currentLoginPwd = $("input[name='currentLoginPwd']").val();
	var newLoginPwd = $("input[name='newLoginPwd']").val();
	var confirmLoginPwdAgain = $("input[name='confirmLoginPwdAgain']").val();
	if(currentLoginPwd == '') {
		layer.open({
			content: '请输入当前登陆密码',
			skin: 'msg',
			time: 2 //2秒后自动关闭
		});
	} else {
		if(newLoginPwd == '') {
			layer.open({
				content: '请输入新的登陆密码',
				skin: 'msg',
				time: 2 //2秒后自动关闭
			});
		} else if(!(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,18}$/.test(newLoginPwd))) {
			layer.open({
				content: '登陆密码为8-18位字母和数字组合，请重新输入',
				skin: 'msg',
				time: 2 //2秒后自动关闭
			});
		} else {
			if(confirmLoginPwdAgain == '' || !(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,18}$/.test(newLoginPwd))) {
				layer.open({
					content: '请输入正确密码',
					skin: 'msg',
					time: 2 //2秒后自动关闭
				});
			} else if(confirmLoginPwdAgain != newLoginPwd) {
				layer.open({
					content: '两次输入密码不一致请重新输入',
					skin: 'msg',
					time: 2 //2秒后自动关闭
				});
			}
		}
	}
	var DATA = new Object();
	DATA.userId = getUserData("id");
	DATA.oldLoginPwd = currentLoginPwd;
	DATA.newLoginPwd = confirmLoginPwdAgain;
	getWebData("user", "updateLoginPwd", METHOD_POST, DATA, function(data) {
		if(data.code == 200) {
			layer.open({
				content: data.msg,
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

//我的首页数据
myIndex();

function myIndex() {
	const myIndexImg = getUserData("headImgUrl");
	const myNickName = getUserData("nickname");
	const myIndexWalletNum = getUserData("amount");
	$("#headImg").attr('src', myIndexImg);
	$("#myNickName").html(myNickName);
	$("#walletNum").html("￥"+myIndexWalletNum);
}
setInterval(function() {
	const badgeNum = localStorage.getItem("firstDataLength");
	$("#badgeNum").html(badgeNum)
}, 500)