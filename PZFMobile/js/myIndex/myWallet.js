myWalletData(1);
let loading = false;
let MyWalletPageIndex = 1;
let myWalletDataList = "";
function myWalletData(myWalletPageIndex) { //获取我的钱包数据
	if(loading){
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
				setTimeout(function(){
					loading = false;
					MyWalletPageIndex = parseInt(MyWalletPageIndex + 1);
					if(myWalletDataList.length < 10) {
						mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
						MyWalletPageIndex = 1;
					} else {
						mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
					}
				},500);
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
		mui('#pullrefresh').pullRefresh().endPulldownToRefresh(false);
		mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
		mui('#pullrefresh').pullRefresh().refresh(true);
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
	getWebData("landlord", "findAuctionByPage", METHOD_POST, DATA, function(data) {
		if(data.code == 200){
			layer.open({
			content: "充值成功",
			skin: 'msg',
			time: 2 //2秒后自动关闭
		});
		setTimeout(function() {
				mui.openWindow({
					url: 'myWallet.html',
				});
			}, 1500)
		}else{
			layer.open({
			content: data.code + data.msg,
			skin: 'msg',
			time: 2 //2秒后自动关闭
		});
		}
	});
}

function CashWithdrawal(){//点击我的钱包提现传参
	let CashWithdrawalMoney = $("#myWalletMoney").html();
	localStorage.setItem('CashWithdrawal', CashWithdrawalMoney);
	mui.openWindow({
		//TODO 这里写正确的URL
		url: 'cashWithdrawal.html'
	});
}
CashWithdrawalPoundage();//调用提现页面获取手续费的接口
function CashWithdrawalPoundage(){//获取提现页面手续费
	let DATA = new Object();
	DATA.usid = 1;
	getWebData("landlord", "findAuctionByPage", METHOD_POST, DATA, function(data) {
		if(data.code == 200){
			let poundageData = data.data;
			$("#poundage").append(poundageData.poundage);
		}
	});
}

function CashWithdrawalAll(){//点击提现页面全部的方法
	const CashWithdrawalMoney = localStorage.getItem('CashWithdrawal');
	$("#cashwithdrawNum").val(CashWithdrawalMoney);
}

function CashWithdrawalOk(){//点击提现页面 确定按钮
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
		if(data.code == 200){
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
		}else{
			layer.open({
			content: data.code + data.msg,
			skin: 'msg',
			time: 2 //2秒后自动关闭
		});
		}
	});
}

