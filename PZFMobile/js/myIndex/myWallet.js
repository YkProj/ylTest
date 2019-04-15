//myWalletData(1);
var loading = false;
var MyWalletPageIndex = 1;
var myWalletDataList = "";

var CashWithdrawlAmount = getUserData("amount");
$("#myWalletMoney").html(CashWithdrawlAmount +"￥");
function myWalletData(myWalletPageIndex) { //获取交易记录
	if(loading) {
		loading = false;
	}
	loading = true;
	var DATA = new Object();
	DATA.userId = getUserData("id");
	DATA.pageNo = myWalletPageIndex;
	DATA.type = 1;
	getWebData("pay", "findUserTransactionByPage", METHOD_POST, DATA, function(data) {
		if(data.code == 200) {
			var myWalletData = data.data;
			myWalletDataList = myWalletData.transactionLogList;
			if(myWalletDataList.length > 0) {
//				$("#myWalletContent").empty();
				let myWalletList = "";
				for(let i = 0; i < myWalletDataList.length; i++) {
					myWalletList = `<div class="publicList transactionRecordList">
									if(myWalletDataList[i].status==1){
										<div class="transactionRecordListLeft">
										<img src="${myWalletDataList[i].img}" alt="" />
										<span>
											<div>充值</div>
											<div>${myWalletDataList[i].creatTime}</div>
										</span>
									</div>
									<div class="transactionRecordListRight">
										<div>+${myWalletDataList[i].num}</div>
										if(myWalletDataList[i].orderStatus == 1){
											<div>处理中</div>
										}else if(myWalletDataList[i].orderStatus == 2){
											<div>已完成</div>
										}
									</div>
									}
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



//function CashWithdrawalOk() { //点击提现页面 确定按钮
//	let CashWithdrawalNum = $("#cashwithdrawNum").val();
//	if(CashWithdrawalNum == "") {
//		layer.open({
//			content: "请先输入提现金额",
//			skin: 'msg',
//			time: 2 //2秒后自动关闭
//		});
//	}
//	let DATA = new Object();
//	DATA.useid = 1;
//	getWebData("landlord", "findAuctionByPage", METHOD_POST, DATA, function(data) {
//		if(data.code == 200) {
//			layer.open({
//				content: "提现成功",
//				skin: 'msg',
//				time: 2 //2秒后自动关闭
//			});
//			setTimeout(function() {
//				mui.openWindow({
//					url: 'Recharge.html',
//				});
//			}, 1500)
//		} else {
//			layer.open({
//				content: data.code + data.msg,
//				skin: 'msg',
//				time: 2 //2秒后自动关闭
//			});
//		}
//	});
//}