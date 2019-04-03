var messageIndex = 1;
var loading = false;
let firstDataLength = "";
let firstData = "";
let messageData = "";
//初始化调用函数
//messageInfo(1, true);
//setInterval(function() {
//	messageInfo(1, false)
//}, 10000)

function messageInfo(messageInfoIndex, isFirst) {
	if(loading) {
		return;
	}
	loading = true;
	var DATA = new Object();
	DATA.userId = getUserData("id");
	DATA.pageNo = messageInfoIndex;
	getWebData("message", "findMessagesByPage", METHOD_POST, DATA, function(data) {
		if(data.code == 200) {
			messageData = data.data;
			messageDataLength = messageData.length;
			if(isFirst) {
				firstData = data.data;
				firstDataLength = firstData.length;
				if(messageDataLength > 0) {
					let messageList = "";
					for(let i = 0; i < messageDataLength; i++) {
						messageList += '<div class="messageList" id="`${messageData[i].id}`">';
						messageList += '<div class="messageTitle">' + messageData[i].formatCreateTime + '</div>';
						messageList += '<div class="publicList">';
						messageList += '<div class="messageListTitle">' + messageData[i].title + '</div>';
						messageList += '<div class="messageListContent">' + messageData[i].content + '</div>';
						messageHoseId = messageData[i].houseId;
						messageList += '<div class="messageListBottom" id="messageClick" onclick="GoToAuction(' + messageData[i].houseId + ')">去竞拍>></div>';
						messageList += '</div>';
						messageList += '</div>';
					}
					$("#messageData").append(messageList);
					localStorage.setItem('firstDataLength', firstDataLength);
					//					setTimeout(function() {
					//							loading = false;
					//							messageIndex = parseInt(messageIndex + 1);
					//							if(messageData.length < 10) {
					//								messageLoading = false;
					//								mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
					//								messageIndex = 1;
					//							} else {
					//								mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
					//							}
					//						}, 500)
				}
			} else {
				if(messageData.length != firstData.length) {
					console.log("有新数据");
					if(messageDataLength > 0) {
						$("#messageData").empty();
						let messageList = "";
						for(let i = 0; i < messageDataLength; i++) {
							messageList += '<div class="messageList">';
							messageList += '<div class="messageTitle">' + messageData[i].formatCreateTime + '</div>';
							messageList += '<div class="publicList">';
							messageList += '<div class="messageListTitle">' + messageData[i].title + '</div>';
							messageList += '<div class="messageListContent">' + messageData[i].content + '</div>';
							messageHoseId = messageData[i].houseId;
							messageList += '<div class="messageListBottom" id="messageClick" onclick="GoToAuction(' + messageData[i].houseId + ')">去竞拍>></div>';
							messageList += '</div>';
							messageList += '</div>';
						}
						$("#messageData").append(messageList);
					}
					firstData = messageData;
					firstDataLength = firstData.length;
					localStorage.setItem('firstDataLength', firstDataLength);
				} else {
					let messageList = "";
					for(let j = 0; j < firstData.length; j++) {
							messageList += '<div class="messageList">';
							messageList += '<div class="messageTitle">' + messageData[j].formatCreateTime + '</div>';
							messageList += '<div class="publicList">';
							messageList += '<div class="messageListTitle">' + messageData[j].title + '</div>';
							messageList += '<div class="messageListContent">' + messageData[j].content + '</div>';
							messageHoseId = messageData[j].houseId;
							messageList += '<div class="messageListBottom" id="messageClick" onclick="GoToAuction(' + messageData[j].houseId + ')">去竞拍>></div>';
							messageList += '</div>';
							messageList += '</div>';
						if(messageData[j].id != firstData[j].id) {
							console.log("有最新数据");
							firstDataLength = firstDataLength + 1;
						}else if(j == firstData.length - 1){
							console.log("肯定没有最新数据");
						}
					}
					$("#messageData").empty();
					$("#messageData").append(messageList);
					firstData = messageData;
					firstDataLength = firstData.length;
					localStorage.setItem('firstDataLength', firstDataLength);
				}
			}
		}
		loading = false;
	});
}

mui.init({
	pullRefresh: {
		container: '#pullrefresh',
		down: {
			style: 'circle',
			contentrefresh: '正在加载...',
			callback: pulldownRefresh
		},
		up: {
			auto: false,
			contentrefresh: '正在加载...',
			contentnomore: '没有更多消息了',
			callback: pullupRefresh
		}
	}
});

//上拉加载
function pullupRefresh() {
//	setTimeout(function() {
//		loading = false;
//		messageIndex = parseInt(messageIndex + 1);
//		messageInfo(messageIndex, false);
//		if(messageData.length < 10) {
//			mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
//			messageIndex = 1;
//		} else {
//			mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
//		}
//	}, 500)
}

//下拉刷新
function pulldownRefresh() {
//	setTimeout(function() {
//		$("#messageData").empty();
//		messageInfo(1, true);
//		mui.toast("已为您更新到最新数据");
//		mui('#pullrefresh').pullRefresh().endPulldownToRefresh(false);
//		mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
//	}, 500);
}

function GoToAuction(houseId) {
	const messageHoseId = houseId;
	firstDataLength = firstDataLength - 1;
	localStorage.setItem('firstDataLength', firstDataLength);
	mui.openWindow({
		url: '../auctionHall/auctionHallDetail.html'
	});
	auctionDetail(messageHoseId);
}
mui("#messageData").on("tap", "#messageClick", function() {
	this.click();
});