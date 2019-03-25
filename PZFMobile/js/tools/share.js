var isImage = false;
var imgUrl = '';
var isShare=false;
/**
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
		log("获取分享服务列表失败：" + e.message);
	});
}

/**
 * 分享操作
 * @param {JSON} sb 分享操作对象s.s为分享通道对象(plus.share.ShareService)
 * @param {Boolean} bh 是否分享链接
 */
function shareAction(sb, bh, href, title, content) {
	if(!sb || !sb.s) {
		log("无效的分享服务！");
		return;
	}

	if(sb.title == 'copy') {
		setCopy(href);
//		mui.toast('复制成功');
		layer.open({
			content: '复制成功',
			skin: 'msg',
			time: 2 //2秒后自动关闭
		});
		return;
	}

	var msg = {
		content: "分享内容",
		extra: {
			scene: sb.x
		}
	};

	var shop_id = window.localStorage.getItem('shop_id');
	if(bh) {
		
		msg.href = href;
		msg.title = title;
		msg.content = content;
		if(isImage) {
			msg.thumbs = [imgUrl];
			msg.pictures = [imgUrl];
		} else {
			msg.thumbs = ["../images/logo.png"];
			msg.pictures = ["../images/logo.png"];
		}
		

	}
	log("share action....");
	// 发送分享
	if(sb.s.authenticated) {
		log("---已授权---");
		shareMessage(msg, sb.s);
		
	} else {
		log("---未授权---");
		sb.s.authorize(function() {
			shareMessage(msg, sb.s);
		}, function(e) {
			log("认证授权失败：" + e.code + " - " + e.message);
		});
	}
}

function log(str) {
	console.log(str);
}

//复制到剪贴板
function setCopy(href) {
	if(plus.os.name == "Android") {
		var Context = plus.android.importClass("android.content.Context");
		var main = plus.android.runtimeMainActivity();
		var clip = main.getSystemService(Context.CLIPBOARD_SERVICE);
		plus.android.invoke(clip, "setText", href);
	} else {
		var UIPasteboard = plus.ios.importClass("UIPasteboard");
		//这步会有异常因为UIPasteboard是不允许init的，init的问题会在新版中修改 
		var generalPasteboard = UIPasteboard.generalPasteboard();
		// 设置/获取文本内容: www.bcty365.com
		generalPasteboard.setValueforPasteboardType("testValue", href);
	}
}

/**
 * 发送分享消息
 * @param {JSON} msg
 * @param {plus.share.ShareService} s
 */
function shareMessage(msg, s) {
	log(JSON.stringify(msg));
	s.send(msg, function() {
		log("分享到\"" + s.description + "\"成功！ ");
		isShare=true;
	}, function(e) {
		log("分享到\"" + s.description + "\"失败: " + JSON.stringify(e));
	});
}



var shareHrefWithImage = function(name, href, title, content, imageUrl) {
	imgUrl = imageUrl;
	isImage = true;
	shareHref(getIndex(name), href, title, content);
}

function getIndex(name) {
	var index = 0;
	switch(name) {
		case 'wechat':
			index = 0;
			break;
		case 'friends':
			index = 1;
			break;
		case 'copy':
			index = 2;
			break;
		default:
			index = 0;
			break;
	}
	return index;
}

// 分享链接
var shareHref = function(name, href, title, content) {
	console.log(name + ", " + href + ", " + title + ", " + content);
	var shareBts = [];
	// 更新分享列表
	var ss = shares['weixin'];
	ss && ss.nativeClient && (
		shareBts.push({
			title: '微信好友',
			s: ss,
			x: 'WXSceneSession'
		}), shareBts.push({
			title: '微信朋友圈',
			s: ss,
			x: 'WXSceneTimeline'
		}));
	shareBts.push({
		title: 'copy',
		s: 'copy url'
	});
	ss = shares['qq'];
	ss && ss.nativeClient && shareBts.push({
		title: 'QQ',
		s: ss
	});
	ss = shares['sinaweibo'];
	shareBts.push({
		title: 'weibo',
		s: ss
	});

	log(JSON.stringify(shareBts));
	log(shareBts[getIndex(name)]);
	shareAction(shareBts[getIndex(name)], true, href, title, content);
}

function logproperty(obj) {
	var array = new Array();
	// 开始遍历 
	for(var p in obj) {
		// 方法
		if(typeof(obj[p]) == " function ") {
			obj[p]();
		} else { // p 为属性名称，obj[p]为对应属性的值 
			var props = p + " = " + obj[p] + ", ";
			array.push(props);
		}
	}

	// 最后显示所有的属性
	array.sort(function(a, b) {
		return a.charAt(0) - b.charAt(0);
	});

	for(var b in array) {
		log(JSON.stringify(array[b]));
	}
}