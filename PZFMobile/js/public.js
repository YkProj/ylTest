//全局变量
var countdown = 60;

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
function verifyPhone(){
	if(phone == ''){
		layer.open({
			content: '请输入手机号',
			skin: 'msg',
			time: 2 //2秒后自动关闭
		});
	}else if(!(/^1[3|4|5|8][0-9]\d{8}$/.test(phone))){
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


