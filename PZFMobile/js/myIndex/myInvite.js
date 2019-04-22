//蒙版js
function Poster() { //点击分享海报
	mui("#popover").popover("toggle");
}
$("#popover").click(function() {
	mui("#popover").popover("toggle");
})

//function popoverLink() { //点击分享链接
//	$("#popverLink").toggle();
//}

//点击分享链接
function copyUrl() {
	var parentUserId = getUserData("id");
	var invitation = 'http://www.zukepai.com/zkpClient/PZFMobile/htmls/myIndex/update.html;
	$("#LinkUrl").val(invitation);
	var Url = document.getElementById("LinkUrl");
	Url.select(); // 选择对象
	document.execCommand("Copy"); // 执行浏览器复制命令
	mui.toast("已复制好，可贴粘。");
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

//分享
inviteShare();
function inviteShare() {
	var basePath = "<%=basePath%>";
	var nonce = ""; //生成签名的随机串
	var signature = ""; //签名
	var timestamp = ""; //时间戳
	var title = "恭喜你！中奖啦！快戳我查看吧！";
	var desc = "原来中奖的感觉是那么美好！";
	var sharLink = "http://www.zukepai.com/zkpClient/PZFMobile/htmls/myIndex/update.html";
	var imgUrl = "http://www.zukepai.com/zkpClient/PZFMobile/images/logo.png";
	$(document).ready(function() {
		var url = encodeURIComponent(window.location.href.split('#')[0]);
		console.log("url==" + url);
		$.ajax({
			url: "http://47.112.115.82:8081/weChatAuto/getEncryptJsapiTicket",
			type: "POST",
			data: {
				"url": url
			},
			dataType: "json",
			success: function(data) {
				console.log(data);
				nonce = data.noncestr;
				signature = data.signature;
				timestamp = data.timestamp;

				loadWx();
			},
			error: function(err) {
				alert("异常")
			}
		});
	});

	function loadWx() {
		wx.config({
			debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			appId: 'wxb17ce8f96907985a', // 必填，公众号的唯一标识
			timestamp: timestamp, // 必填，生成签名的时间戳
			nonceStr: nonce, // 必填，生成签名的随机串
			signature: signature, // 必填，签名
			jsApiList: ['updateAppMessageShareData', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表
		});
		wx.ready(function() {

			//分享到朋友
			wx.updateAppMessageShareData({
				title: title, // 分享标题
				desc: desc, // 分享描述
				link: sharLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
				imgUrl: imgUrl, // 分享图标
				type: '', // 分享类型,music、video或link，不填默认为link
				dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
				success: function() {
					console.log("设置成功");
					// 用户确认分享后执行的回调函数
				},
				cancel: function() {
					console.log("设置失败");
					// 用户取消分享后执行的回调函数
				}
			});

			wx.onMenuShareAppMessage({ //即将被废弃
				title: title, // 分享标题
				desc: desc, // 分享描述
				link: sharLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
				imgUrl: imgUrl, // 分享图标
				type: '', // 分享类型,music、video或link，不填默认为link
				dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
				success: function() {
					// 用户点击了分享后执行的回调函数
				}
			});

		});
		wx.error(function(res) {
			alert("验证失败了" + JSON.stringify(res));
		});

	}

	function share() {
		wx.onMenuShareAppMessage();
	}
}