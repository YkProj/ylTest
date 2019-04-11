myWalletData(1);
var loading = false;
var MyWalletPageIndex = 1;
var myWalletDataList = "";

function myWalletData(myWalletPageIndex) { //获取我的钱包数据
	if(loading) {
		loading = false;
	}
	loading = true;
	var DATA = new Object();
	DATA.useid = 1;
	DATA.pageNo = myWalletPageIndex;
	getWebData("landlord", "findAuctionByPage", METHOD_POST, DATA, function(data) {
		if(data.code == 200) {
			var myWalletData = data.data;
			$("#myWalletMoney").html(myWalletData.money);
			myWalletDataList = myWalletData.transcation;
			if(myWalletDataList.length > 0) {
				$("#myWalletContent").empty();
				let myWalletList = "";
				for(let i = 0; i < myWalletDataList.length; i++) {
					myWalletList = `<div class="publicList transactionRecordList">
									<div class="transactionRecordListLeft">
									<img src="${myWalletDataList[i].img}" alt="" />
									<span>
									if(myWalletDataList[i].status == 1){
										<div>充值</div>
									}else if(myWalletDataList[i].status == 2){
										<div>充值</div>
									}
									<div>${myWalletDataList[i].creattime}</div>
									</span>
									</div>
									<div class="transactionRecordListRight">
									if(myWalletDataList[i].status == 1){
										<div>+${myWalletDataList[i].num}￥</div>
									}else if(myWalletDataList[i].status == 2){
										<div>-${myWalletDataList[i].num}￥</div>
									}
									<div>处理中</div>
									</div>
									</div>
									`;
				}
				$("#myWalletContent").append(myWalletList);
				setTimeout(function() {
					loading = false;
					MyWalletPageIndex = parseInt(MyWalletPageIndex + 1);
					if(myWalletDataList.length < 10) {
						mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
						MyWalletPageIndex = 1;
					} else {
						mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
					}
				}, 500);
			}
		} else {
			layer.open({
				content: data.code + data.msg,
				skin: 'msg',
				time: 2 //2秒后自动关闭
			});
		}
	});
}

mui.init({
	pullRefresh: {
		container: '#pullrefresh',
		down: {
			style: 'circle',
			callback: pulldownRefresh
		},
		up: {
			auto: false,
			contentrefresh: '正在加载...',
			callback: pullupRefresh
		}
	}
});

//上拉加载
function pullupRefresh() {
	setTimeout(function() {
		//		myWalletData(MyWalletPageIndex) //获取数据
	}, 500)

};

//下拉刷新
function pulldownRefresh() {
	setTimeout(function() {
		//		$("#myWalletContent").empty();
		//		myWalletData(1) //获取数据
		mui.toast("已为您更新到最新数据");
		//		mui('#pullrefresh').pullRefresh().endPulldownToRefresh(false);
		//		mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
		//		mui('#pullrefresh').pullRefresh().refresh(true);
	}, 500);
};

function RechargeOk() { //充值接口
	const rechargeNum = $("input[name='rechargeInput']").val();
	if(rechargeNum == "") {
		layer.open({
			content: "请先输入充值金额",
			skin: 'msg',
			time: 2 //2秒后自动关闭
		});
	}
	let DATA = new Object();
	DATA.useid = 1;
	getWebData("landlord", "findAuctionByPage", METHOD_POST, DATA, function(Wxres) {
			if(!Wxres) {
				layer.open({
					content: "服务器拥堵，稍后访问",
					skin: 'msg',
					time: 2 //2秒后自动关闭
				});
			} else {
				console.log(Wxres);
				if(Wxres.data.respCode == 'fail') {
					$.alert(Wxres.data.respMsg);
				} else {
					//10 微信支付接口
					// 10.1 发起一个支付请求
					// 注意：此 Demo 使用 2.7 版本支付接口实现，建议使用此接口时参考微信支付相关最新文档。
					var param = Wxres.data;
					wx.config({
						debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
						appId: 'wxb17ce8f96907985a', // 必填，公众号的唯一标识
						timestamp: param.timestamp, // 必填，生成签名的时间戳
						nonceStr: param.noncestr, // 必填，生成签名的随机串
						signature: param.signJs, // 必填，调用js签名，
						jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，这里只写支付的
					});
					wx.chooseWXPay({
						timestamp: param.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
						nonceStr: param.noncestr, // 支付签名随机串，不长于 32 位
						package: "prepay_id=",// 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
						param.transNo, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
						signType: "MD5", // 签名方式，默认为´SHA1´，使用新版支付需传入´MD5´
						paySign: param.sign, // 支付签名
						success: function(res) {
							if(res.errMsg == "chooseWXPay:ok") {
								//alert("支付成功");
								window.location.href = "/hims/weixin/pages/Order_ok.html?access_token="
								getUrlParam("access_token");
							} else {
								alert(res.errMsg);
							}
						},
						cancel: function(res) {
							//alert(´取消支付´);
						}
					});
				}
			});
	}

	function CashWithdrawal() { //点击我的钱包提现传参
		let CashWithdrawalMoney = $("#myWalletMoney").html();
		localStorage.setItem('CashWithdrawal', CashWithdrawalMoney);
		mui.openWindow({
			//TODO 这里写正确的URL
			url: 'cashWithdrawal.html'
		});
	}
	CashWithdrawalPoundage(); //调用提现页面获取手续费的接口
	function CashWithdrawalPoundage() { //获取提现页面手续费
		let DATA = new Object();
		DATA.usid = 1;
		getWebData("landlord", "findAuctionByPage", METHOD_POST, DATA, function(data) {
			if(data.code == 200) {
				let poundageData = data.data;
				$("#poundage").append(poundageData.poundage);
			}
		});
	}

	function CashWithdrawalAll() { //点击提现页面全部的方法
		const CashWithdrawalMoney = localStorage.getItem('CashWithdrawal');
		$("#cashwithdrawNum").val(CashWithdrawalMoney);
	}

	function CashWithdrawalOk() { //点击提现页面 确定按钮
		let CashWithdrawalNum = $("#cashwithdrawNum").val();
		if(CashWithdrawalNum == "") {
			layer.open({
				content: "请先输入提现金额",
				skin: 'msg',
				time: 2 //2秒后自动关闭
			});
		}
		let DATA = new Object();
		DATA.useid = 1;
		getWebData("landlord", "findAuctionByPage", METHOD_POST, DATA, function(data) {
			if(data.code == 200) {
				layer.open({
					content: "提现成功",
					skin: 'msg',
					time: 2 //2秒后自动关闭
				});
				setTimeout(function() {
					mui.openWindow({
						url: 'Recharge.html',
					});
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