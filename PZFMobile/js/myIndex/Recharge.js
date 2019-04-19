let out_trade_no = "";

function RechargeOk() { //充值接口
	const openid = getUserData("openId");
	const rechargeNum = $("input[name='rechargeInput']").val();
	const totalFee = rechargeNum * 100;
	if(rechargeNum == "") {
		layer.open({
			content: "请先输入充值金额",
			skin: 'msg',
			time: 2 //2秒后自动关闭
		});
	} else {
		var twosign = "";
		var t = parseInt(new Date().getTime() / 1000);
		var addressIp = returnCitySN["cip"];
		console.log("ip：" + addressIp);

		function onBridgeReady() {

			$.ajax({
				"url": "http://www.zukepai.com/server/pay/weChatPay",
				"data": {
					"totalFee": totalFee, //支付的钱、单位是分
					"openId": getUserData("openId"), //用户的openid
					"addressIp": addressIp //当前设备的ip地址
				},
				"success": function(json) {
					out_trade_no = json.out_trade_no;
					getSign(json);

					//onBridgeReady();

					WeixinJSBridge.invoke(
						'getBrandWCPayRequest', {
							"appId": json.appid, //公众号名称，由商户传入     
							"timeStamp": t, //时间戳，自1970年以来的秒数     
							"nonceStr": json.nonce_str, //随机串     
							"package": "prepay_id=" + json.prepay_id,
							"signType": "MD5", //微信签名方式：   

							"paySign": twosign //微信签名 
						},
						function(res) {
							//							alert(JSON.stringify(res));
							if(res.err_msg == "get_brand_wcpay_request:ok") { //成功
								submitRechargeRecord();
							} else { //失败
								layer.open({
									content: "充值失败",
									skin: 'msg',
									time: 2 //2秒后自动关闭
								});
							}
						});

				},
				"error": function() {
					console.log("出错了");
				}
			});

		}
		if(typeof WeixinJSBridge == "undefined") {
			if(document.addEventListener) {
				document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
			} else if(document.attachEvent) {
				document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
				document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
			}
		} else {
			onBridgeReady();
		}

		function get_client_ip() {
			$cip = "unknown";
			if($_SERVER['REMOTE_ADDR']) {
				$cip = $_SERVER['REMOTE_ADDR'];

			} else if(getenv("REMOTE_ADDR")) {
				$cip = getenv("REMOTE_ADDR");
			}
			return $cip;

		}

		function getSign(json) { //获取二次签名
			var str = "appId=" + json.appid + "&nonceStr=" + json.nonce_str + "&package=prepay_id=" + json.prepay_id + "&signType=MD5&timeStamp=" + t + "&key=38d59457da75037ce7e5c1999143a3e4";
			console.log(str);
			twosign = $.md5(str).toUpperCase();
			console.log(twosign);
		}
	}

}

function submitRechargeRecord() {
	var openId = getUserData("openId");
	var DATA = new Object();
	DATA.openId = openId;
	DATA.out_trade_no = out_trade_no;
	getWebData("pay", "orderQueryRecharge", METHOD_POST, DATA, function(data) {
		if(data.code == 200) {
			useInformation();
			layer.open({
				content: data.data,
				skin: 'msg',
				time: 2 //2秒后自动关闭
			});
			setTimeout(function() {
				mui.openWindow({
					//TODO 这里写正确的URL
					url: 'myWallet.html'
				});
				$("input[name='rechargeInput']").val("");
			}, 500)
		}else{
			layer.open({
				content: data.code+data.msg+data.data,
				skin: 'msg',
				time: 2 //2秒后自动关闭
			});
		}
	})
}
useInformation();
function useInformation(){//获取用户信息
	var DATA = new Object();
	DATA.userId = getUserData("id");
	getWebData("wuser", "findUserById", METHOD_POST, DATA, function(data) {
		if(data.code == 200){
			var userData = data.data;
			saveUserData(userData);
			var UserPhone = getUserData("phone");
			if(UserPhone == "null"){
				saveStorageData("isLogin",false);
			}else{
				saveStorageData("isLogin",true);
			}
		}else{
			layer.open({
				content: data.msg,
				skin: 'msg',
				time: 2 //2秒后自动关闭
			});
		}
	});
}