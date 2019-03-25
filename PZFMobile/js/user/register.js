mui.init();

function nextPage(ele) {
	var page = ele.getAttribute("data-page");
	mui.openWindow({
		url: page
	});
}

mui.plusReady(function() {
	refreshData();
});

//得到焦点
function onInputFocus(ele) {
	var type = ele.getAttribute('data-type');
	ele.setAttribute('placeholder', '');
	document.getElementById(type + '_label').style.display = "block";
	isWebEnabled();
}

//失去焦点
function onInputBlur(ele) {
	var type = ele.getAttribute('data-type');
	var holder = ele.getAttribute('holder');
	ele.setAttribute('placeholder', holder);
	document.getElementById(type + '_label').style.display = "none";
}

function isWebEnabled() {
	var phone = document.getElementById('phone_edit').value;
	var password = document.getElementById('password_edit').value;
	var secrity = document.getElementById('secrity_edit').value;
	var button = document.getElementById('phone_register');
	var temp;
	if(null != phone && null != password && null != secrity && secrity.length > 0 && phone.length > 0 && password.length > 0) {
		temp = button.className.replace('mui-btn-disabled', 'mui-btn-primary');
		button.removeAttribute('disabled');
	} else {
		temp = button.className.replace('mui-btn-primary', 'mui-btn-disabled');
		button.setAttribute('disabled', true);
	}
	button.className = temp;
}

function refreshData() {
	var countryName = window.localStorage.getItem('select_country_name');
	if(null == countryName || countryName.length < 1) {
		window.localStorage.setItem('select_country_name', '中国');
		window.localStorage.setItem('select_country_code', '86');
		$('#country_name').html('中国');
	} else {
		$('#country_name').html(countryName);
	}
}

var sms;
//获取手机验证码
function getSMS() {
	var code = window.localStorage.getItem('select_country_code');
	var phone = $("#phone_edit").val();
	if(null == code || code.length < 1) {
		code = "86";
	}

	if(!isPhoneNum()) {
		//		mui.toast('请输入正确的手机号码');
		layer.open({
			content: '请输入正确的手机号码',
			skin: 'msg',
			time: 2 //2秒后自动关闭
		});
		return;
	}
	if((code == "86") && (!checkMobile(phone))) {
		//		mui.toast('请输入正确的手机号码');
		layer.open({
			content: '请输入正确的手机号码',
			skin: 'msg',
			time: 2 //2秒后自动关闭
		});
		return;
	}
	if($('#security_code').attr('disabled')) {
		return;
	}

	var phone = $('#phone_edit').val();
	var DATA = new Object();
	DATA.MSGID = "1005";

	DATA.VeriflyTypeID = 1; //验证类型ID(1:注册验证 2:绑定手机号验证)
	DATA.AreaCode = code;
	DATA.Phone = phone;

	getWebData(BIZ_USER, METHOD_GET, DATA, function(data) {
		if(!data.boolResult) {
			//			mui.toast('短信发送失败 请检查手机号码或国家代码')
			layer.open({
				content: '短信发送失败 请检查手机号码或国家代码',
				skin: 'msg',
				time: 2 //2秒后自动关闭
			});
		} else {
			//			mui.toast('验证码已发送 请注意查收');
			layer.open({
				content: '验证码已发送 请注意查收',
				skin: 'msg',
				time: 2 //2秒后自动关闭
			});
			sms = data.returnMsg;
		}
	});
	setTime(document.getElementById('security_code'));
}

function verifySMS() {
	if(!isPhoneNum()) {
		//		mui.toast('请输入正确的手机号码');
		layer.open({
			content: '请输入正确的手机号码',
			skin: 'msg',
			time: 2 //2秒后自动关闭
		});
		return;
	}
	var phone = $("#phone_edit").val();
	var security = $("#secrity_edit").val();
	if(null == security || security.length != 6) {
		//		mui.toast('请输入正确的验证码');
		layer.open({
			content: '请输入正确的验证码',
			skin: 'msg',
			time: 2 //2秒后自动关闭
		});
		return;
	}
	if(sms == null || security != sms) {
		//		mui.toast('短信验证码错误 请重新获取');
		layer.open({
			content: '短信验证码错误 请重新获取',
			skin: 'msg',
			time: 2 //2秒后自动关闭
		});
		return;
	}

	//注册
	var DATA = new Object();
	DATA.MSGID = "1009";
	DATA.VeriflyTypeID = 1;
	DATA.Phone = phone;
	DATA.SmsCode = security;

	getWebData(BIZ_USER, METHOD_GET, DATA, function(data) {
		console.log(JSON.stringify(data));
		if(data.boolResult) {
			register();
		} else {
			//			mui.toast(data.returnMsg);
			layer.open({
				content: data.returnMsg,
				skin: 'msg',
				time: 2 //2秒后自动关闭
			});
		}
	});
}

function isPhoneNum() {
	var phone = $("#phone_edit").val();
	if(null == phone || phone.length < 1) {
		//		mui.toast('请输入正确的手机号');
		layer.open({
			content: '请输入正确的手机号',
			skin: 'msg',
			time: 2 //2秒后自动关闭
		});
		return false;
	} else if(!$.isNumeric(phone)) {　　　　
		//		mui.toast('请输入正确的手机号');
		layer.open({
			content: '请输入正确的手机号',
			skin: 'msg',
			time: 2 //2秒后自动关闭
		});　　　　
		return false;　　
	} else {
		return true;
	}
}

//注册方法
function register() {
	if(!isPhoneNum()) {
		return;
	}
	var phone = $("#phone_edit").val();
	var password = $("#password_edit").val();

	if(null == password || password.length < 8 || password.length > 20) {
//		mui.toast('请输入正确的密码 长度在8-20位之间');
		layer.open({
			content: '请输入正确的密码 长度在8-20位之间',
			skin: 'msg',
			time: 2 //2秒后自动关闭
		});
		return;
	}
	//注册
	var DATA = new Object();
	DATA.MSGID = "1003";
	var id = window.localStorage.getItem('select_country_id');
	if(null == id || id.length < 1) {
		id = "16";
	}
	DATA.AreaID = id;
	DATA.Phone = phone;
	DATA.Password = password;

	getWebData(BIZ_USER, METHOD_POST, DATA, function(data) {
		console.log(JSON.stringify(data));
		if(data.boolResult) {
			//			mui.toast('注册成功 请先登录');
			layer.open({
				content: '注册成功 请先登录',
				skin: 'msg',
				time: 2 //2秒后自动关闭
			});
			mui.openWindow({
				url: "sign-in.html"
			});
		} else {
			//			mui.toast(data.returnMsg);
			layer.open({
				content: data.returnMsg,
				skin: 'msg',
				time: 2 //2秒后自动关闭
			});
		}
	});
}

var time = 60 * 1000;

function setTime(ele) {
	if(time > 1000) {
		time = time - 1000;
		ele.innerText = "获取中" + (time / 1000) + "s";
		ele.setAttribute('disabled', true);
		setTimeout(function() {
			setTime(ele);
		}, 1000)
	} else {
		ele.innerText = '获取验证码';
		ele.removeAttribute('disabled');
		time = 60 * 1000;
	}
}