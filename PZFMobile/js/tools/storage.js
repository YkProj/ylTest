/**
 * 说明:app本地存储工具
 * 可用于本地数据的存取和是否登录的判断，以及退出时用于清空数据缓存
 * author:grofis
 * email:1216226589@qq.com
 * createtime:2017-12-2 10:55
 * */
//用于保存用户数据 登录成功后使用
function saveUserData(array) {
	for(var item in array) {
		//console.log(item);
		window.localStorage.setItem('local_user_' + item, array[item] + "");
	}
}

function getUserData(key) {
	//console.log('获取用户头像：' + key);
	var result = window.localStorage.getItem(key);
	if(null == result || result.length < 1) {
		result = window.localStorage.getItem('local_user_' + key);
	}
	return result;
}

function saveStorageData(key, value) {
	window.localStorage.setItem('temp_' + key, value);
}

function getStorageData(key) {
	var result = window.localStorage.getItem('temp_' + key);
	if(null == result || result.length < 1 || result == 'null') {
		result = '';
	}
	return result;
}

function removeStorageData(key) {
	window.localStorage.removeItem('temp_' + key);
}

function hasLogin() {
	var isLogined = getStorageData('isLogin');
	if(isLogined && isLogined == 'true') {
		return true;
	} else {
		return false;
	}
}

//跳转到登录页面
function isLogin(currentPage, targetPage, extrasName, extrasStr) {
	var urlStr;
	if(!hasLogin()) {
		urlStr = '/htmls/user/sign-in.html';
	} else {
		urlStr = targetPage;
	}
	mui.openWindow({
		url: urlStr,
		extras: {
			paras: extrasStr,
			target: targetPage
		}
	});
}

function isLoginWithExtras(currentPage, targetPage, extrasName, extrasStr){
	var urlStr;
	if(!hasLogin()) {
		urlStr = '/htmls/user/sign-in.html';
	} else {
		urlStr = targetPage;
	}
	mui.openWindow({
		url: urlStr,
		extras: {
			extrasName:extrasStr,
			target: targetPage
		}
	});
}

function clearData() {

	for(var i = window.localStorage.length - 1; i >= 0; i--) {
		var key = window.localStorage.key(i);
		//以local_user_开头
		var start = key.indexOf("local_user_");
		if(start == 0) {
			window.localStorage.removeItem(key);
		}
		//console.log('第' + (i + 1) + '条数据的键值为：' + window.localStorage.key(i) + '，数据为：' + window.localStorage.getItem(window.localStorage.key(i)));
	}
	//清空数据
	window.localStorage.clear();
}

//后台关闭登录页面 防止登录成功后点击返回时出错
function closeLoginPage() {
	var self = plus.webview.currentWebview();
	var opener = mui.currentWebview.opener();
	//如果是登录界面跳转过来 则关闭登录界面
	if(opener.id.indexOf('sign-in') != -1) {
		if(self.closeid) {
			console.log('close id：' + self.closeid);
			plus.webview.close(self.closeid, 'none');
		}
	}
}

//获取对应的页面
function getPage(name) {
	var wvs = plus.webview.all();
	for(var i = 0; i < wvs.length; i++) {
		//console.log('webview' + i + ': ' + wvs[i].id + ", " + wvs[i].getURL());
		if(wvs[i].getURL()!=null)
		{
			var web = wvs[i];
			if(null != web && web.getURL().indexOf(name) != -1) {
				return web;
			}
		}
	}
	return null;
}

function closePage(name) {
	var wvs = plus.webview.all();
	for(var i = 0; i < wvs.length; i++) {
		console.log('webview' + i + ': ' + wvs[i].id + ", " + wvs[i].getURL());
		if(wvs[i].getURL()!=null)
		{
			var web = wvs[i];
			if(null != web && web.getURL().indexOf(name) != -1) {
				plus.webview.close(web.id);
			}
		}
	}
}