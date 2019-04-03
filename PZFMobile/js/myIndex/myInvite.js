//蒙版js
function Poster() { //点击分享海报
	mui("#popover").popover("toggle");
}
$("#popover").click(function() {
	mui("#popover").popover("toggle");
})

function popoverLink() { //点击分享链接
	$("#popverLink").toggle();
}
profitRecord(1);
var MyTeamPageIndex = 1;
var ProfitPageIndex = 1;
var loading = false;

function profitRecord(profitPageIndex) { //获取我的收益记录
	if(loading) {
		loading = false;
	}
	loading = true;
	var DATA = new Object();
	DATA.userId = getUserData("id");
	DATA.pageNo = profitPageIndex;
	getWebData("profitLog", "findProfitLogByPage", METHOD_POST, DATA, function(data) {
		if(data.code == 200) {
			const profitData = data.data;
			const profitLog = profitData.profitLogs;
			const accumulatedIncomeChildren = $("#accumulatedIncome").children();
			$("#accumulatedIncome").empty().append(accumulatedIncomeChildren);
			$("#accumulatedIncome").append(profitData.sumProfit + "￥")
			if(profitLog.length > 0) {
				var profitList = "";
				for(var i = 0; i < profitLog.length; i++) {
					profitList += '<div class="publicList transactionRecordList">';
					profitList += '<div class="transactionRecordListLeft profitLeft">';
					profitList += '<span>';
					profitList += '<div>' + profitLog[i].content + '</div>';
					profitList += '<div>竞拍成功</div>';
					profitList += '</span>';
					profitList += '</div>';
					profitList += '<div class="transactionRecordListRight negative profitRight">';
					profitList += '<div>' + profitLog[i].value + "￥" + '</div>';
					profitList += '<div>' + profitLog[i].formatCreateTime + '</div>';
					profitList += '</div>';
					profitList += '</div>';
				}
				$("#transactionRecordContent").append(profitList);
				setTimeout(function() {
					loading = false;
					ProfitPageIndex = parseInt(ProfitPageIndex + 1);
					if(profitLog.length < 10) {
						mui('#profilePullrefresh').pullRefresh().endPullupToRefresh(true);
						ProfitPageIndex = 1;
					} else {
						mui('#profilePullrefresh').pullRefresh().endPullupToRefresh(false);
					}
				}, 500)
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

//调用函数
myteam(1);

function myteam(myTeamPageIndex) { //获取我的团队数据
	if(loading) {
		loading = false;
	}
	loading = true;
	var DATA = new Object();
	DATA.userId = getUserData("id");
	DATA.pageNo = myTeamPageIndex;
	getWebData("wuser", "findSubordinate", METHOD_POST, DATA, function(data) {
		if(data.code == 200) {
			const myTeamData = data.data.userList;
			if(myTeamData.length > 0) {
				var myTeamContentList = "";
				for(var i = 0; i < myTeamData.length; i++) {
					myTeamContentList += '<div class="publicList transactionRecordList">';
					myTeamContentList += '<div class="transactionRecordListLeft myInvite">';
					myTeamContentList += '<img src="' + myTeamData[i].headImgUrl + '" alt="" />';
					myTeamContentList += '<span>';
					var nickName = myTeamData[i].nickname;
					var nickNameStr = nickName.substring(0, 4);
					myTeamContentList += '<div>' + nickNameStr + '</div>';
					myTeamContentList += '</span>';
					myTeamContentList += '</div>';
					myTeamContentList += '<div class="transactionRecordListRight myInviteRight">';
					myTeamContentList += '<div>' + myTeamData[i].formatCreateTime + '</div>';
					myTeamContentList += '</div>';
					myTeamContentList += '</div>';
				}
				$("#myTeamContent").append(myTeamContentList);
				setTimeout(function() {
					loading = false;
					MyTeamPageIndex = parseInt(MyTeamPageIndex + 1);
					if(myTeamData.length < 10) {
						mui('#myteamPullrefresh').pullRefresh().endPullupToRefresh(true);
						MyTeamPageIndex = 1;
					} else {
						mui('#myteamPullrefresh').pullRefresh().endPullupToRefresh(false);
					}
				}, 500)
			}
		} else {
			layer.open({
				content: data.msg,
				skin: 'msg',
				time: 2 //2秒后自动关闭
			});
		}
	});
}

function myTeam() { //点击我的团队
	$(this).attr('href', '#item1');
	$("#item1").addClass('mui-active');
	$("#item2").removeClass('mui-active');
	$("#myTeamContent").empty();
	myteam(1);
}

function myInviteProfile() { //点击我的收益记录
	$(this).attr('href', '#item2');
	$("#item2").addClass('mui-active');
	$("#item1").removeClass('mui-active');
	$("#transactionRecordContent").empty();
	profitRecord(1);
}

//function getId() {//找到当前点击选项卡的下拉刷新容器的id，此方法暂时未用到
//	let myTeamId = $(".mui-active").find(".mui-scroll-wrapper").attr("id");
//	var currentId = `#${myTeamId}`;
//	alert(currentId)
//}
mui("#myteamPullrefresh").pullRefresh({ //两个选项卡实现下拉刷新和加载需要对每一个容器都设置
	down: {
		style: 'circle',
		callback: myTeampulldownRefresh
	},
	up: {
		auto: false,
		contentrefresh: '正在加载...',
		callback: myTeampullupRefresh
	}
});
//上拉加载
function myTeampullupRefresh() { //我的团队上拉加载
	setTimeout(function() {
		myteam(MyTeamPageIndex); //ajax
	}, 500)

};

//下拉刷新
function myTeampulldownRefresh() { //我的团队下拉刷新
	setTimeout(function() {
		$("#myTeamContent").empty();
		myteam(1);
		mui.toast("团队列表数据已更新至最新");
		mui('#myteamPullrefresh').pullRefresh().endPulldownToRefresh();
		mui('#myteamPullrefresh').pullRefresh().endPullupToRefresh(false);
	}, 500);
};
mui("#profilePullrefresh").pullRefresh({ //收益
	down: {
		style: 'circle',
		callback: profilepulldownRefresh
	},
	up: {
		auto: false,
		contentrefresh: '正在加载...',
		callback: profilepullupRefresh
	}
});
//上拉加载
function profilepullupRefresh() { //收益上拉加载
	setTimeout(function() {
		profitRecord(ProfitPageIndex); //获取数据
	}, 500)

};

//下拉刷新
function profilepulldownRefresh() { //收益下拉刷新
	setTimeout(function() {
		$("#transactionRecordContent").empty();
		profitRecord(1);
		mui.toast("收益列表已更新至最新");
		mui('#profilePullrefresh').pullRefresh().endPulldownToRefresh();
		mui('#profilePullrefresh').pullRefresh().endPullupToRefresh(false);
	}, 500);
};
//myInviteShare() //调用微信分享
function myInviteShare() { //分享海报和分享链接
	getWebData("landlord", "findAuctionHouseInfDetail", METHOD_POST, "", function(data) {
		if(data.code == 200) {
			if(data.header.code == 200) {
				var wx_info = data.body.result.wx_info;
				if(wx_info.signature != null) {
					// 配置
					wx.config({
						debug: false, // 测试阶段，可以写为true，主要是为了测试是否配置成功
						appId: wx_info.appId,
						timestamp: wx_info.timestamp,
						nonceStr: wx_info.nonceStr,
						signature: wx_info.signature,
						jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ',
							'onMenuShareQZone'
						]
					});

					var title = "";
					var desc = "";
					// 分享的图片，最好是正方形，不是也没关系，但是一定是http模式，即绝对路径，而不是服务器路劲
					var imgUrl = "";
					// 这里的地址可以写死，也可以动态获取，但是一定不能带有微信分享后的参数，不然分享也是失败的
					var link = "";

					// 分享给朋友、QQ、微博//海报
					var shareDataPoster = {
						"imgUrl": imgUrl,
						"title": title,
						"desc": desc,
						'link': link
					};
					// 分享给朋友、QQ、微博//链接
					var shareDataLink = {
						"imgUrl": imgUrl,
						"title": title,
						"desc": desc,
						'link': link
					};
					// 分享到朋友圈海报
					var shareToTimelinePoster = {
						"imgUrl": imgUrl,
						"title": title,
						'link': link,
						"desc": desc
					}
					//分享到朋友圈链接
					var shareToTimelineLink = {
						"imgUrl": imgUrl,
						"title": title,
						'link': link,
						"desc": desc
					}
					wx.ready(function() {
						wx.onMenuShareTimeline(shareDataPoster);
						wx.onMenuShareAppMessage(shareToTimelinePoster);
						wx.onMenuShareTimeline(shareDataLink);
						wx.onMenuShareAppMessage(shareDataLink);
						//                      wx.onMenuShareTimeline(shareToTimeline);
						//                      wx.onMenuShareAppMessage(shareData);
						//                      wx.onMenuShareQQ(shareData);
						//                      wx.onMenuShareQZone(shareData);

						wx.error(function(res) {
							alert(res.errMsg);
						});
					});
				}
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