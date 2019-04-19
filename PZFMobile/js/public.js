
//function getWebData(weburl, paraTxt, callback) {
//	var method_name = 'POST';
//	mui.ajax({
//		//请求方式为get  
//		type: method_name,
//		data: {
//			paras:paraTxt
//		},
//		url: weburl,
//		//返回数据格式为json  
//		dataType: "json",
//		//请求成功完成后要执行的方法  
//		success: function(data) {
//			//返回值为{"code":200, "data":"[]", "msg"："success!"}
//			if(null != data && data.length>0 ){
//				if(data.code == 200){
//					var info = data.data;
//					callback(info);
//				}else{
////					mui.toast(data.msg);
//					layer.open({
//						content: data.msg,
//						skin: 'msg',
//						time: 2 //2秒后自动关闭
//					});
//				}
//			}else{
////				mui.toast('网络请求错误');
//				layer.open({
//						content: '网络请求错误',
//						skin: 'msg',
//						time: 2 //2秒后自动关闭
//					});
//			}
//		},
//		error: function(xhr, type, errorThrown) {
//			console.log(xhr.status);
//			console.log(xhr.readyState);
//			//异常处理；
//			console.log(type);
//		}
//	});
//}
function verifyPhone() {
	if(phone == '') {
		layer.open({
			content: '请输入手机号',
			skin: 'msg',
			time: 2 //2秒后自动关闭
		});
	} else if(!(/^1[3|4|5|8][0-9]\d{8}$/.test(phone))) {
		layer.open({
			content: '请输入正确手机号',
			skin: 'msg',
			time: 2 //2秒后自动关闭
		});
	}
}

//发送验证码倒计时
function settime(obj) { //发送验证码倒计时
	if(countdown == 0) {
		obj.attr('disabled', false);
		//obj.removeattr("disabled"); 
		obj.html("获取验证码");
		countdown = 60;
		return;
	} else {
		obj.attr('disabled', true);
		obj.html("获取验证码(" + countdown + ")");
		countdown--;
	}
	setTimeout(function() {
		settime(obj)
	}, 1000)
}

//验证输入手机号、交易密码、登录密码、验证码
$("input").blur(function() {
	var accountPhoneModefy = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/; //验证手机号11位
	var pwdReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,18}$/; //验证密码8-18位字母和数字组合
	var numReg = /^\d{6}$/; //检验6位数字
	var codeReg = /^\d{6}$/; //检验验证码6位数字
	var setPhone = $(["input[name='setPhone']"]).val();//修改手机号
	var setCode = $(["input[name='verifyCodeContent']"]).val();
	var setPwd = $(["input[name='verifyCodeContent']"]).val();
	var setLoginPwd = $(["input[name='currentLoginPwd']"]).val();//修改登陆密码
	var setNewPwd = $(["input[name='newLoginPwd']"]).val();
	var setNewAgainPwd = $(["input[name='confirmLoginPwdAgain']"]).val();
	var setTranCode = $("#setTranPwd").val();//修改交易密码
	var settranPwd = $(["input[name='tranPwd']"]).val();
	var settranPwdAgain = $(["input[name='tranPwdAgain']"]).val();
	if(!accountPhoneModefy.test(setPhone)) {
		layer.open({
			content: "请输入正确手机号",
			skin: 'msg',
			time: 2 //2秒后自动关闭
		});
	} else if(!pwdReg.test(setPwd || setLoginPwd || setNewPwd || setNewAgainPwd)) {
		layer.open({
			content: "密码由8-18位字母和数字的组合，请正确输入",
			skin: 'msg',
			time: 2 //2秒后自动关闭
		});
	} else if(setNewAgainPwd != setNewPwd){
		layer.open({
			content: "两次登陆密码不一致",
			skin: 'msg',
			time: 2 //2秒后自动关闭
		});
	}else if(!numReg.test(settranPwd || settranPwdAgain)) {
		layer.open({
			content: "交易密码由6位数字组成，请正确输入",
			skin: 'msg',
			time: 2 //2秒后自动关闭
		});
	}else if(settranPwdAgain != settranPwd){
		layer.open({
			content: "两次交易密码不一致",
			skin: 'msg',
			time: 2 //2秒后自动关闭
		});
	}else if(!codeReg.test(setCode || setTranCode)){
		layer.open({
			content: "请正确输入验证码",
			skin: 'msg',
			time: 2 //2秒后自动关闭
		});
	}
})