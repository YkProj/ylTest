//取ID
const homeIndexId = localStorage.getItem('homeIndexListID');
console.log(homeIndexId)

//input框自动聚焦下一位处理
var ipt = document.querySelector("#ipt");
var span = document.querySelectorAll(".passbox span");
document.querySelector(".passbox").onclick = function() {
	ipt.focus();
};
ipt.focus();
var num = new RegExp(/[0-9.]/);
ipt.oninput = function() {
	var valth = this.value.length;
	for(var k = 0; k < span.length; k++) {
		span[k].innerText = '';
	}
	for(var i = 0; i < valth; i++) {
		if(!num.test(ipt.value[i])) {
			ipt.value = ipt.value.substr(0, i);
			return false;
		}
		span[i].innerText = ipt.value[i];
	}
}

let depositPwd = "";
let out_trade_no = "";

function depositOk(IsIndexSub) {
	$("#deposit").css('display', 'none');
	depositPwdOld = getUserData("payPwd");
	var depositPwd = $("#ipt").val();
	depositPwd = depositPwd;
	if(depositPwd == "") {
		layer.open({
			content: "请输入交易密码",
			skin: 'msg',
			time: 2 //2秒后自动关闭
		});
	} else if(depositPwd != depositPwdOld) {
		layer.open({
			content: "请正确输入交易密码",
			skin: 'msg',
			time: 2 //2秒后自动关闭
		});
	} else {
		const openid = getUserData("openId");
		const totalFee = 300 * 100;
		var twosign = "";
		var t = parseInt(new Date().getTime() / 1000);
		var addressIp = returnCitySN["cip"];
		console.log("ip：" + addressIp);

		function onBridgeReady() {

			$.ajax({
				"url": "http://www.zukepai.com/server/pay/weChatPay",
				"data": {
					"totalFee": 1, //支付的钱、单位是分
					"openId": "oQu7K1cGW09XFUwE4h7tJ2vedOWg", //用户的openid
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
								if(IsIndexSub == 0){
									indexSignUp(0);
								}else{
									indexSignUp(1);
								}
							} else { //失败
								layer.open({
									content: "付款失败",
									skin: 'msg',
									time: 5 //2秒后自动关闭
								})
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

//用户支付成功之后调报名接口
function indexSignUp(isIndex) {
	var DATA = new Object();
	DATA.openId = getUserData("openId");
	DATA.userId = getUserData("id");
	DATA.houseId = homeIndexId;
	DATA.out_trade_no = out_trade_no;
	getWebData("landlord", "signUpHouse", METHOD_POST, DATA, function(data) {
		if(data.code == 200) {
			$("#ipt").val("");
			var signUpData = data.data;
			saveUserData(signUpData);
			layer.open({
				content: "报名成功",
				skin: 'msg',
				time: 5 //2秒后自动关闭
			})
			if(isIndex == 0) {
				setTimeout(function() {
					mui.openWindow({
						//TODO 这里写正确的URL
						url: '../auctionHall/auctionHallDetail.html'
					});
					auctionDetail(HomeIndexListId);
				}, 1000)
			} else {
				$("#isSignUp").html("出价");
			}

		} else {
			layer.open({
				content: data.code + data.msg,
				skin: 'msg',
				time: 5 //2秒后自动关闭
			})
		}
	});

}

function depositCancel() { //用户点击弹出框取消按钮
	$("#deposit").css('display', 'none');
}