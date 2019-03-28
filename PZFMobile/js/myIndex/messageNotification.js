var messageIndex = 1;
var messageLoading = false;
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
			contentnomore: '没有更多消息了',
			callback: pullupRefresh
		}
	}
});

//上拉加载
function pullupRefresh() {
	setTimeout(function() {
		messageInfo(messageIndex); //ajax
	}, 500)
};

//下拉刷新
function pulldownRefresh() {
	setTimeout(function() {
		$("#myCollectionList").empty();
		messageInfo(1);
		mui.toast("已为您更新到最新数据");
		mui('#pullrefresh').pullRefresh().endPulldownToRefresh(false);
		mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
		mui('#pullrefresh').pullRefresh().refresh(true);
	}, 500);
};
var messageData = "";
function messageInfo(messageIndex) {
	if(messageLmessageInfooading){
		messageLoading = false;
	}
	messageLoading = true;
	var ws = new WebSocket('ws://121.40.165.18:8800');

	// 建立 web socket 连接成功触发事件
	ws.onopen = function() {
		var DATA = new Object(); //给后台发送参数
		DATA.useid = 1;
		DATA.pageNo = messageIndex;
	};

	//接收到消息的回调方法
	ws.onmessage = function(event) {
		//      alert('数据回来了额'+event.data)
		console.log(event.data); //后台不间断发送数据，持续接收。
		if(event.data){
			alert("有最先数据")
		}
		if(event.data.code == 200) {
			messageData = event.data.data;
			if(messageData.length > 0) {
				$("#messageData").empty();
				var messageList = "";
				for (var i=0;i<messageData.length;i++) {
					messageList += '<div class="messageList">';
					messageList += '<div class="messageTitle">' + messageData[i].creatTime + '</div>';
					messageList += '<div class="publicList">';
					messageList += '<div class="messageListTitle">' + messageData[i].title + '</div>';
					messageList += '<div class="messageListContent">' + messageData[i].content + '</div>';
					messageList += '<div class="messageListBottom" onclick="auctionDetail(' + messageData[i].id + ')">去竞拍>></div>';
					messageList += '</div>';
					messageList += '</div>';
				}
				$("#messageData").append(messageList);
				setTimeout(function(){
					messageIndex = parseInt(messageIndex + 1);
					if(messageData.length <10){
						messageLoading = false;
						mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
						messageIndex = 1;
					}else{
						mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
					}
				},500)
			}
		} else {
			layer.open({
				content: data.code + data.msg,
				skin: 'msg',
				time: 2 //2秒后自动关闭
			});
		}
	}

	//断开 web socket 连接成功触发事件
	ws.onclose = function() {
		alert("连接已关闭...");
	};
}
function message(){
	alert("点击事件生效")
}
mui("#messageData").on("tap", "#messageClick", function() {
	this.click();
});
