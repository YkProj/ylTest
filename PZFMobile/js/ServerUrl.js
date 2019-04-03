/*
author: grofis
email: 1216226589@qq.com
createtime: 2017-11-19
summary: 服务调用方法
*/

//首页分页全局变量
var  homePageIndex = 1; //分页
   
var  homePageCount = ""; //总页码
var homPageSize = 6; //每页数据

//首页列表id
var homeIndexListId = 1;
//全局变量
var phone = null;

//地区选择全局变量
var area = "";

//筛选价格起拍价
var homIndexPriceLower = "";
var homeIndexPriceUpper = "";

//筛选户型
var homeIndexBedroomNum = "";
var homeIndexHallNum = "";

//筛选面积
var homeAreaLower = "";
var homeAreaUpper = "";

//筛选装修和出租类型
var homeDecorationType = "";
var homerantType = "";

//首页详细页全局变量
var indexHouseId = "";

//首页详细页title
var indexDetailTitle = "";

//拍卖大厅分页
var auctionPageIndex = 0;
var auctionPageCount = "";
var auctionPageSize = 6;

//拍卖大厅筛选
var collectionValue = -1;
var houseTypeValue = -1;

//我的收藏刷新,加载全局变量
var myCollectionPageIndex = 1;
var myCollectionPageCount = "";

//报名记录全局变量
var entryStatus = 1;
var entryPageIndex = "";
var entryPageIndex1 = 1;
var entryPageIndex0 = 1;
var entryPageIndex2 = 1;
var entryPageIndex3 = 1;

var BASIC_HOST = "http://47.112.115.82:8081/"; //外网生产服务器地址
//var BASIC_HOST = "http://192.168.1.169:8080/"; //内网服务器地址
//var URL_VERSION = 'http://www.galaxyotc.com/DownLoadFile/version.json';

var METHOD_GET = 1;
var METHOD_POST = 2;

function getWebData(conltroller, action, methodType, data, sucessCallback) {
	var METHOD_NAME = "Get";
	//数据请求类型
	if(methodType == METHOD_POST) {
		METHOD_NAME = "Post";
	}
	var webUrl = BASIC_HOST + conltroller + '/' + action; //拼接请求URL  
	console.log(webUrl);
	if(webUrl == null || webUrl.length < 1) {
		//		mui.toast('网址错误');
		//		alert(webUrl)
		layer.open({
			content: '网络错误',
			skin: 'msg',
			time: 2 //2秒后自动关闭
		});
		return;
	}

	//	plus.nativeUI.showWaiting();
	const postData = {
		//请求方式为get  
		type: METHOD_NAME,
		timeout: 10000,
		//			headers:{"Content-Type":"application/json"},
		async: true,
		data: data,
		url: webUrl,
		//返回数据格式为json  
		//		dataType: "json",
		//请求成功完成后要执行的方法  
		success: function(data) {
			console.log(JSON.stringify(data));
			//				data = JSON.parse(data);
			sucessCallback(data);
		},
		error: function(xhr, type, errorThrown) {
			//			plus.nativeUI.closeWaiting();
			//			mui.toast('网络错误：');
			console.log("网络错误")
			console.log(xhr.status);
			console.log(xhr.readyState);
			//异常处理；
			console.log(type);
		}
	};

	switch(METHOD_NAME) {
		case 'Post':
			{
				postData.headers = {
					"Content-Type": "application/json"
				};
				break;
			};

		default:
			{
				break;
			}
	}

	mui.ajax(postData);

}

function hasOwnProperty(target, key) {
	if(target) {
		return target.hasOwnProperty(key);
	}
	return false;
}

function nextPage(ele) {
	var page = ele.getAttribute("data-page");
	//	var current = plus.webview.currentWebview();
	var extras = ele.getAttribute('data-extras');
	console.log('next page is click:' + page);
	if(null != extras && extras.length > 0) {
		isLogin(current, page, extras);
	} else {
		isLogin(current, page, '');
	}
};

function nextPage(ele) {
	var page = ele.getAttribute("data-page");

	mui.openWindow({
		url: page
	});

};

function nextPageWithextras(ele) {
	var page = ele.getAttribute("data-page");
	var extraStr = ele.getAttribute('data-extras');

	mui.openWindow({
		url: page,
		show: {
			autoShow: true, //页面loaded事件发生后自动显示，默认为true  
			aniShow: 'fade-in', //页面显示动画，默认为”slide-in-right“；  
			duration: 1000 //页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；  
		},
		extras: {
			paras: extraStr
		}
	});
};

function logItem() {
	for(var i = window.localStorage.length - 1; i >= 0; i--) {
		console.log('第' + (i + 1) + '条数据的键值为：' + window.localStorage.key(i) + '，数据为：' + window.localStorage.getItem(window.localStorage.key(i)));
	}
}

function debugLog(str) {
	console.log(str);
}

function logAllView() {
	// 获取所有Webview窗口
	//	var wvs = plus.webview.all();
	for(var i = 0; i < wvs.length; i++) {
		console.log('webview' + i + ': ' + wvs[i].id + ", " + wvs[i].getURL());
	}
}

function getWebTest(conltroller, action, methodType, data, sucessCallback) {

	var METHOD_NAME = "Get";
	//数据请求类型
	if(methodType == METHOD_POST) {
		METHOD_NAME = "Post";
	}
	var webUrl = BASIC_HOST + conltroller + '/' + action; //拼接请求URL
	console.log(webUrl)
	if(webUrl == null || webUrl.length < 1) {
		//		mui.toast('网址错误');
		alert("网络错误")
		return;
	}

	var paras = new Object();
	paras.HEAD = HEAD;
	paras.DATA = data;
	console.log(JSON.stringify(paras));

	paras = JSON.stringify(paras);
	mui.ajax({
		type: "POST",
		url: webUrl,
		async: true,
		ContentType: "application/json",
		async: false,
		data: {
			RequestData: paras
		},
		//返回数据格式为json  
		dataType: "json",
		//请求成功完成后要执行的方法  
		timeout: 1000,
		success: function(data) {
			alert(data);
			var vData = JSON.stringify(data);
			alert(vData);
		},
		error: function(xhr, type, errorThrown) {
			//			plus.nativeUI.toast(errorThrown);
		}
	});
};
document.getElementById("homeTab").addEventListener('tap', function() {
	mui.openWindow('homeIndex.html', 'homeTab');
})
document.getElementById("auctionTab").addEventListener('tap', function() {
	mui.openWindow('auctionHall.html', 'auctionTab');
})
document.getElementById("myTab").addEventListener('tap', function() {
	if(hasLogin()) {
		mui.openWindow('myIndex.html', 'myTab');
	} else {
		mui.openWindow({
			url: '../myIndex/login.html'
		});
	}
})

//拍卖大厅跳转详细页
function auctionDetail(auctionListId) {
	console.log(auctionListId)
	//存ID
	localStorage.setItem('AuctionListId', auctionListId);
	mui.openWindow({
		//TODO 这里写正确的URL
		url: '../auctionHall/auctionHallDetail.html'
	});
};

//封装localstorage方法,存取用户信息,用于用户登录后使用
function saveUserData(array) {
	for(var item in array) {
		//		console.log(item);
		window.localStorage.setItem('local_user_' + item, array[item] + "");
	}
}

function getUserData(key) {
	//console.log('获取用户头像：' + key);
	var result = window.localStorage.getItem(key);
	if(null == result || result.length < 1) {
		result = window.localStorage.getItem('local_user_' + key) || 0; //如果获取的值不等于undefined和null，result就等于获取到的值，否则result为0；
	}
	return result;
}
//存取是否登录,以作后面判断
function saveStorageData(key, value) { //存储storage数据
	window.localStorage.setItem('temp_' + key, value);
}

function getStorageData(key) { //获取storage数据
	var result = window.localStorage.getItem('temp_' + key);
	if(!result || result == null || result.length < 1 || result == 'null' || result == 'undefined') {
		result = '';
	}
	return result;
}
//校验是否登录
function hasLogin() { //校验是否登录
	var isLogined = this.getStorageData("isLogin");
	if(isLogined && isLogined == "true") {
		return true;
	} else {
		return false;
	}
}


//清楚数据
function clearData() { //清空用户登录存储的数据
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
	//window.localStorage.clear();
}