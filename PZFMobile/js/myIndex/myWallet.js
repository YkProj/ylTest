var loading = false;
var MyWalletPageIndex = 1;
var myWalletDataList = "";

var CashWithdrawlAmount = getUserData("amount");
$("#myWalletMoney").html(CashWithdrawlAmount + "￥");
myWalletData(1);

function myWalletData(myWalletPageIndex) { //获取交易记录
	var DATA = new Object();
	DATA.userId = getUserData("id");
	DATA.pageNo = myWalletPageIndex;
	getWebData("pay", "findUserTransactionByPage", METHOD_POST, DATA, function(data) {
		if(data.code == 200) {
			var myWalletData = data.data;
			myWalletDataList = myWalletData.transactionLogList;
			if(myWalletDataList.length > 0) {
				//				$("#myWalletContent").empty();
				let myWalletList = "";
				for(let i = 0; i < myWalletDataList.length; i++) {
					myWalletList += '<div class="publicList transactionRecordList">';
					if(myWalletDataList[i].type == 0) {
						myWalletList += '<div class="transactionRecordListLeft">';
						myWalletList += '<img src="../../images/myIndex/Recharge.png" alt="" />';
						myWalletList += '<span>';
						myWalletList += '<div>充值</div>';
						myWalletList += '<div>' + myWalletDataList[i].createTime + '</div>';
						myWalletList += '</span>';
						myWalletList += '</div>';
						myWalletList += '<div class="transactionRecordListRight">';
						myWalletList += '<div>' + "+" + myWalletDataList[i].amount + '</div>';
						myWalletList += '<div>已完成</div>';
						myWalletList += '</div>';
					} else {
						myWalletList += '<div class="transactionRecordListLeft">';
						myWalletList += '<img src="../../images/myIndex/CashWithdrawal.png" alt="" />';
						myWalletList += '<span>';
						myWalletList += '<div>提现</div>';
						myWalletList += '<div>' + myWalletDataList[i].createTime + '</div>';
						myWalletList += '</span>';
						myWalletList += '</div>';
						myWalletList += '<div class="transactionRecordListRight">';
						myWalletList += '<div>' + "+" + myWalletDataList[i].amount + '</div>';
						myWalletList += '<div>已完成</div>';
						myWalletList += '</div>';
					}
					myWalletList += '</div>';
				}
				$("#myWalletContent").append(myWalletList);
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

//下拉刷新
function pulldownRefresh() {
	setTimeout(function() {
		$("#myWalletContent").empty();
		MyWalletPageIndex = 1;
		myWalletData(1) //获取数据
		mui.toast("已为您更新到最新数据");
		mui('#pullrefresh').pullRefresh().endPulldownToRefresh(false);
		mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
		mui('#pullrefresh').pullRefresh().refresh(true);
	}, 500);
};

//上拉加载
function pullupRefresh() {
	if(loading) {
		return;
	}
	loading = true;
	setTimeout(function() {
		myWalletData(MyWalletPageIndex) //获取数据
		loading = false;
		MyWalletPageIndex = parseInt(MyWalletPageIndex + 1);
		if(myWalletDataList.length < 10) {
			mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
		} else {
			mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
		}
	}, 500)

};


