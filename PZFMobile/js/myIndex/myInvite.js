//蒙版js
function Poster(){
//	$("#popover").empty();
//	var liHtml='';
//	liHtml +='<div class="mui-popover-arrow"></div>';
//	liHtml +='<div class="mui-content-padded set-content-padded">';
//	liHtml +='<div class="invitePoster">';
//	liHtml +='<img onclick="inviteImg();" src="../../images/myIndex/invitePoster.png" />';
//	liHtml +='</div>';
//	liHtml +='</div>';
//	liHtml +='<div class="mui-content">';
//	liHtml +='<img id="pic" src="../../images/myIndex/invitePoster.png" style="display: none;" />';
//	liHtml +='</div>';
//	liHtml +='<footer id="posterFooter" style="position: absolute;bottom: 0px; width:100%;background: white;">';
//	liHtml +='<ul class="mui-table-view mui-grid-view mui-grid-9">';
//	liHtml +='<li onclick="shareHref(1);" class="mui-table-view-cell mui-media mui-col-xs-6 wx-img">';
//	liHtml +='<img class="mui-media-object" src="../../images/myIndex/wx.png">';
//	liHtml +='<div class="mui-media-body">微信</div>';
//	liHtml +='</li>';
//	liHtml +='<li onclick="shareHref(0);" class="mui-table-view-cell mui-media mui-col-xs-6 wx-img">';
//	liHtml +='<img class="mui-media-object" src="../../images/myIndex/CircleOfFriends.png">';
//	liHtml +='<div class="mui-media-body">朋友圈</div>';
//	liHtml +='</li>';
//	liHtml +='</ul>';
//	liHtml +='</footer>';
//	liHtml +='<input id="sharehref" style="display: none;" class="sharehref" type="url" value="" placeholder="请输入要分享的链接地址" />';
//	liHtml +='<input id="sharehrefTitle" style="display: none;" class="sharehref" type="text" value="" placeholder="请输入要分享的链接标题" />';
//	liHtml +='<input id="sharehrefDes" style="display: none;" class="sharehref" type="text" value="" placeholder="请输入要分享的链接描述" />';
//	$("#popover").append(liHtml);
//	mui("#popover").popover("toggle");
//	$("#poster").val(1);
//	poster=$("#poster").val();
//	$("#popverLink").css('display','none');
mui("#popover").popover("toggle");
}
$("#popover").click(function(){
	mui("#popover").popover("toggle");
})

setTimeout(popoverLink(),500);
function popoverLink(){
	$("#popverLink").empty();
	var liHtml='';
	liHtml += '<footer style="position: absolute;bottom: 0px; width:100%;background: white;">';
	liHtml += '<ul class="mui-table-view mui-grid-view mui-grid-9">';
	liHtml += '<li onclick="shareHref(1);" class="mui-table-view-cell mui-media mui-col-xs-6 wx-img">';
	liHtml += '<img class="mui-media-object" src="../../images/myIndex/wx.png">';
	liHtml += '<div class="mui-media-body">微信</div>';
	liHtml += '</li>';
	liHtml += '<li onclick="shareHref(0);" class="mui-table-view-cell mui-media mui-col-xs-6 wx-img">';
	liHtml += '<img class="mui-media-object" src="../../images/myIndex/CircleOfFriends.png">';
	liHtml += '<div class="mui-media-body">朋友圈</div>';
	liHtml += '</li>';
	liHtml += '</ul>';
	liHtml += '</footer>';
	liHtml += '<input id="sharehref" style="display: none;" class="sharehref" type="url" value="www.baidu.com" placeholder="请输入要分享的链接地址" />';
	liHtml += '<input id="sharehrefTitle" style="display: none;" class="sharehref" type="text" value="拍租房链接" placeholder="请输入要分享的链接标题" />';
	liHtml += '<input id="sharehrefDes" style="display: none;" class="sharehref" type="text" value="我正在使用拍租房" placeholder="请输入要分享的链接描述" />';
	$("#popverLink").append(liHtml);
	$("#popverLink").toggle();
	$("#poster").val(2);
	poster=$("#poster").val();
}
var shares = null;
var Intent = null,
	File = null,
	Uri = null,
	main = null;
var poster = $("#poster").val();
// H5 plus事件处理
//分享海报
function plusReady() {
	updateSerivces();
	if(plus.os.name == "Android") {
		main = plus.android.runtimeMainActivity();
		Intent = plus.android.importClass("android.content.Intent");
		File = plus.android.importClass("java.io.File");
		Uri = plus.android.importClass("android.net.Uri");
		main = plus.android.runtimeMainActivity();
	}
	var shareInfo = plus.webview.currentWebview().shareInfo;
	sharehref.value = shareInfo.href;
	sharehrefTitle.value = shareInfo.title;
	shareLinkTitle.value = shareInfo.title;
	sharehrefDes.value = shareInfo.content;
	pic.value = shareInfo.content;
	pageSourceId = shareInfo.pageSourceId;
	console.log("pageSource:" + pageSourceId);
}
if(window.plus) {
	plusReady();
} else {
	document.addEventListener("plusready", plusReady, false);
}

/**
 * 
 * 更新分享服务
 */
function updateSerivces() {
	plus.share.getServices(function(s) {
		shares = {};
		for(var i in s) {
			var t = s[i];
			shares[t.id] = t;
		}
	}, function(e) {
		outSet("获取分享服务列表失败：" + e.message);
	});
}

/**
 * 分享操作
 * @param {JSON} sb 分享操作对象s.s为分享通道对象(plus.share.ShareService)
 * @param {Boolean} bh 是否分享链接
 */


function shareAction(sb, bh) {
		if(!sb || !sb.s) {
			console.log("无效的分享服务！");
			return;
		}
		if(plus.os.name !== "Android") {
			plus.nativeUI.alert("此平台暂不支持系统分享功能!");
			return;
		}

		var msg = {
			content: sharehrefDes.value,
			extra: {
				scene: sb.x
			}
		};
		if(bh) {
			msg.href = sharehref.value;
			if(sharehrefTitle && sharehrefTitle.value != "") {
				msg.title = sharehrefTitle.value;
			}
			if(sharehrefDes && sharehrefDes.value != "") {
				msg.content = sharehrefDes.value;
			}
			msg.thumbs = ["../../images/myIndex/invitePoster.png"];
			msg.pictures = ["../../images/myIndex/invitePoster.png"];
		} else {
			if(pic && pic.realUrl) {
				msg.pictures = [pic.realUrl];
			}
		}
		// 发送分享
		if(sb.s.authenticated) {
			console.log("---已授权---");
			shareMessage(msg, sb.s);
		} else {
			console.log("---未授权---");
			sb.s.authorize(function() {
				shareMessage(msg, sb.s);
			}, function(e) {
				console.log("认证授权失败：" + e.code + " - " + e.message);

			});
		}

}


/**
 * 发送分享消息
 * @param {JSON} msg
 * @param {plus.share.ShareService} s
 */
function shareMessage(msg, s) {

	console.log(JSON.stringify(msg));
	s.send(msg, function() {
		console.log("分享到\"" + s.description + "\"成功！ ");

	}, function(e) {
		console.log("分享到\"" + s.description + "\"失败: " + JSON.stringify(e));

	});
}
// 分析链接
function shareHref(index) {
	var shareBts = [];
	// 更新分享列表
	var ss = shares['weixin'];
	ss && ss.nativeClient && (shareBts.push({
			title: '微信朋友圈',
			s: ss,
			x: 'WXSceneTimeline'
		}),
		shareBts.push({
			title: '微信好友',
			s: ss,
			x: 'WXSceneSession'
		}));
	ss = shares['qq'];
	ss && ss.nativeClient && shareBts.push({
		title: 'QQ',
		s: ss
	});

	shareAction(shareBts[index], true);
}

//mui.back = function() {
//	var sourcePage = plus.webview.getWebviewById(pageSourceId);
//	if(sourcePage) {
//		sourcePage.evalJS("closeMask()");
//	}
//}

//function closeShare() {
//	console.log("e:" + event.target.name);
//}

//获取我的邀请数据
function myInviteData(){
	var DATA = new Object();
	DATA.userid = 1;
	getWebData("landlord", "findAuctionHouseInfDetail", METHOD_POST, DATA, function(data) {
		if(data.code == 200){
			
		}else{
			layer.open({
				content: data.code + data.msg,
				skin: 'msg',
				time: 2 //2秒后自动关闭
			});
		}
	});
}

function myTeam(){
	$(this).attr('href','#item1');
	$("#item1").addClass('mui-active');
	$("#item2").removeClass('mui-active');
}
function myInviteProfile(){
	$(this).attr('href','#item2'); 
	$("#item2").addClass('mui-active');
	$("#item1").removeClass('mui-active');
}

function myInviteShare(Isposter){
	getWebData("landlord", "findAuctionHouseInfDetail", METHOD_POST, DATA, function(data) {
		if(data.code == 200){
			if (data.header.code == 200) {
                var wx_info = data.body.result.wx_info;
                if (wx_info.signature != null) {
                    // 配置
                    wx.config({
                        debug: false,   // 测试阶段，可以写为true，主要是为了测试是否配置成功
                        appId: wx_info.appId,
                        timestamp: wx_info.timestamp,
                        nonceStr: wx_info.nonceStr,
                        signature: wx_info.signature,
                        jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 
                            'onMenuShareQZone']
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
                    	if(Isposter == true){
                    		 wx.onMenuShareTimeline(shareDataPoster);
                        	 wx.onMenuShareAppMessage(shareToTimelinePoster);
                    	}else{
                    		 wx.onMenuShareTimeline(shareDataLink);
                        	 wx.onMenuShareAppMessage(shareDataLink);
                    	}
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
		}else{
			layer.open({
				content: data.code + data.msg,
				skin: 'msg',
				time: 2 //2秒后自动关闭
			});
		}
	});
}



