var walletAmount = getUserData("amount");

function CashWithdrawlAll() { //点击全部方法
	$("#cashwithdrawNum").val(walletAmount);
}

function CashWithdrawal() { //点击提现确认
	var cashWithdrawalAmount = $("#cashwithdrawNum").val();
	var userId = getUserData("id");
	var payPwd = getUserData("payPwd");
	if(cashWithdrawalAmount == "") {
		layer.open({
			content: "请先输入提现金额",
			skin: 'msg',
			time: 2 //2秒后自动关闭
		});
	} else if(cashWithdrawalAmount > walletAmount) {
		layer.open({
			content: "钱包金额不足，请重新输入小于或等于钱包金额",
			skin: 'msg',
			time: 2 //2秒后自动关闭
		});
	} else {
		var DATA = new Object();
		DATA.userId = userId;
		DATA.payPwd = payPwd;
		DATA.amount = cashWithdrawalAmount;
		getWebData("pay", "reflect", METHOD_POST, DATA, function(data) {
			if(data.code == 200) {
				useInformation();
				layer.open({
					content: "提现成功，等待商家处理",
					skin: 'msg',
					time: 2 //2秒后自动关闭
				});
				setTimeout(function(){
					mui.openWindow({
						url: 'myWallet.html'
					})
					$("#cashwithdrawNum").val("");
				},1000)
			} else {
				layer.open({
					content: data.code+data.msg,
					skin: 'msg',
					time: 2 //2秒后自动关闭
				});
			}
		});
	}
}

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

