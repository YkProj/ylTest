mui.init({
	beforeback: function() {
		//获得列表界面的webview
		var i = mui.currentWebview.opener();
		if(i) {
			if(i.id.indexOf('setting.html') != -1) {
				//触发列表界面的自定义事件（refresh）,从而进行数据刷新
				i.evalJS("refreshLoginData()");
			}
		}
		return true;
	}
});

function login() {
	if(!isPhoneNum()) {
		return;
	}

	var password = $("#password_edit").val();
	if(null == password || password.length > 20) {
		//		mui.toast('密码错误');
		layer.open({
			content: '密码错误',
			skin: 'msg',
			time: 2 //2秒后自动关闭
		});
		return;
	}
	//登录
	var DATA = new Object();
	DATA.MSGID = "1001";
	DATA.LoginType = 1;
	var id = window.localStorage.getItem('select_country_id');
	if(null == id || id.length < 1) {
		id = "16";
	}
	DATA.AreaID = id;
	DATA.UserName = $("#phone_edit").val();
	DATA.Password = password;

	getWebData(BIZ_USER, METHOD_GET, DATA, function(data) {
		//console.log(JSON.stringify(data));
		//mui.toast(data.returnMsg);
		if(data.boolResult) {
			//填充登录后结果
			var returnData = data.returnData;
			saveUserData(returnData);
			var opener = mui.currentWebview.opener();
			if(opener.id.indexOf('setting.html') != -1) {
				mui.back();
			} else {
				plus.webview.getLaunchWebview().show();
			}
			saveStorageData('isLogin', true);
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
	} {
		return true;
	}
}

//得到焦点
function onInputFocus(ele) {
	console.log(ele.getAttribute('type'));
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
	var slideItem = document.getElementsByClassName('mui-slider-item mui-control-content mui-active')[0];
	if(slideItem.id == 'item1mobile') {
		var phone = document.getElementById('phone_edit').value;
		var password = document.getElementById('password_edit').value;
		var button = document.getElementById('phone_login');
		var temp;
		if(null != phone && null != password && phone.length > 0 && password.length > 0) {
			temp = button.className.replace('mui-btn-disabled', 'mui-btn-primary');
			button.removeAttribute('disabled');
		} else {
			temp = button.className.replace('mui-btn-primary', 'mui-btn-disabled');
			button.setAttribute('disabled', true);
		}
		button.className = temp;
	} else {
		var phone = document.getElementById('email_edit').value;
		var password = document.getElementById('pass_edit').value;
		var button = document.getElementById('email_login');
		var temp;
		if(null != phone && null != password && phone.length > 0 && password.length > 0) {
			temp = button.className.replace('mui-btn-disabled', 'mui-btn-primary');
			button.removeAttribute('disabled');
		} else {
			temp = button.className.replace('mui-btn-primary', 'mui-btn-disabled');
			button.setAttribute('disabled', true);
		}
		button.className = temp;
	}
}

//获取国家代码
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