mui.init({
	swipeBack: true //启用右滑关闭功能【一旦取值为false，左右触控滑动将会失效！】
});
var slider = mui("#slider");
slider.slider({
	interval: 1000
});

function hideShow() {
	$("#screenWrap").toggle();
}
//调用函数
auctionData(1);
info();
auctionSlider();

//时间戳全局变量
var auctionDate = "";
var hours = "";
var minutes = "";
var auctionEndTime = "";
//拍卖大厅首页返回数据条数
var auctionListData ="";
//手机软键盘设置
//var bodyHeight=document.body.clientHeight;
//document.body.Height == bodyHeight;
function auctionHallhideNavBar() {
	var originalHeight = document.documentElement.clientHeight || document.body.clientHeight;

	window.onresize = function() {

		//软键盘弹起与隐藏  都会引起窗口的高度发生变化
		var resizeHeight = document.documentElement.clientHeight || document.body.clientHeight;

		if(resizeHeight * 1 < originalHeight * 1) { //resizeHeight<originalHeight证明窗口被挤压了

			plus.webview.currentWebview().setStyle({
				height: originalHeight
			});

		}
	}
}

//$("input").focus(function(){
//	$("#bottomBar").css('display','none')
//});
//$("input").blur(function(){
//	$("#bottomBar").css('display','block')
//});

//获取首页前三条公告信息
function info() {
	var DATA = new Object();
	DATA.pageNo = 1;
	getWebData("notice", "findLastNotice", METHOD_POST, DATA, function(data) {
		if(data.code == 200) {
			var marData = data.data;
			if(marData.length > 0) {
				$("#Marquee").empty();
				var MarHtml = '';
				for(var i = 0; i < marData.length; i++) {
					MarHtml += '<div class="marqueeClass">';
					MarHtml += '<span class="iconfont icon-tongzhi">  ';
					MarHtml += '<span>' + marData[i].title + '</span>';
					MarHtml += '</span>';
					MarHtml += '</div>';
				}
				$("#Marquee").append(MarHtml);
			}
		}
	});
}

//获取拍卖大厅轮播图
function auctionSlider() {
	getWebData("notice", "findRotationImg", METHOD_POST, '', function(data) {
		if(data.code == 200) {
			var auctionHallSliderPicture = data.data;

			$('.mui-slider-group').empty();
			$('.mui-slider-indicator').empty();
			var auctionHallSliderPictureLength = auctionHallSliderPicture.length;
			var auctionPictureLast = auctionHallSliderPictureLength - 1;
			if(auctionHallSliderPictureLength == 1) {
				$('.mui-slider-group').append('<div class="mui-slider-item"><img class="lunbo-img" src="' + auctionHallSliderPicture[0].address + '" /></div>');
			} else {
				$('.mui-slider-group').append('<div class="mui-slider-item mui-slider-item-duplicate"><img class="lunbo-img" src="' + auctionHallSliderPicture[auctionPictureLast].address + '" /></div>');
				$('.mui-slider-indicator').append('<div class="mui-indicator mui-active"></div>');
				for(var i = 0; i < auctionHallSliderPictureLength; i++) {
					$('.mui-slider-group').append('<div class="mui-slider-item"><img class="lunbo-img" src="' + auctionHallSliderPicture[i].address + '" /></div>');
				}
				$('.mui-slider-group').append('<div class="mui-slider-item mui-slider-item-duplicate"><img class="lunbo-img" src="' + auctionHallSliderPicture[0].address + '" /></div>');
				for(var i = 0; i < auctionHallSliderPictureLength - 1; i++) {
					$('.mui-slider-indicator').append('<div class="mui-indicator"></div>');
				}
			}
			var gallery = mui('.mui-slider');
			gallery.slider({
				interval: 1500 //自动轮播周期，若为0则不自动播放，默认为0；
			});
		}
	});
};


//搜索
var auctionSearch = document.getElementById('auctionInput');
var clickBtn = document.getElementsByClassName('.mui-search');
auctionSearch.addEventListener('keydown', function(e) {
	if(e.keyCode == 13) {
		var keyWord = $("#auctionInput").val();
		$("#auctionListData").empty();
		auctionData(1)
	}
}, false);
var cpLock = false;
$('#auctionInput').on('compositionstart', function() {
	cpLock = true;
	console.log("不搜索")
});
$('#auctionInput').on('compositionend', function() {
	cpLock = false;
	console.log("汉字搜索");
	var keyWord = $("#auctionInput").val();
	$("#auctionListData").empty();
	auctionData(1)
});
$('#auctionInput').on('input', function() {
	setTimeout(function(){
		if(!cpLock) {
		console.log("字母搜索")
		var keyWord = $("#auctionInput").val();
		$("#auctionListData").empty();
		auctionData(1)
	}
	},500)
});

	var auctionTimeNew = [];//定义数组

	function formateTime(time) {//转换时间
		var timestamp2 = time;
//		var timestamp2 = Date.parse(new Date(stringTime));	
		var timestamp = Date.parse(new Date());
		var endTamp = timestamp2 - timestamp;
		
		var auctionDate = parseInt(endTamp / (3600 * 24 * 1000)); //天
		var hours = parseInt((endTamp % (3600 * 24 * 1000)) / (3600 * 1000)); //1小时=3600s
		var minutes = parseInt((endTamp % (3600 * 1000)) / (60 * 1000)); //分钟
		var seconds = parseInt((endTamp%(60*1000))/1000);//秒
		var haveEnd = '<span style="color:#FF5350">已结束</span>';
		if(endTamp>=0){
			return "距结束："+auctionDate+"天"+hours+"时"+minutes+"分" + seconds+"秒";
		}else{
			return haveEnd;
		}
	}
	
	const interval = setInterval(customInterval, 100);
	
	function customInterval() {
		const newActionTime = auctionTimeNew.map((item, i) => {//更新当前列表的时间和数组
			$(`#auctionEndTime${i}`).html(formateTime(auctionTimeNew[i]));
			return item;
		});
		
		auctionTimeNew = newActionTime;
	}

//获取拍卖大厅数据
function auctionData(auctionPageIndex) {
	var auctionKerWord = "";
	var auctionSearch = $("#auctionInput").val();
	if(auctionSearch == ""){
		auctionKerWord = "";
	}else{
		auctionKerWord =  auctionSearch;
	}
	var auctionCollection = -1;
	var auctionHouseType = -1;
	auctionCollection = collectionValue;
	auctionHouseType = houseTypeValue;
	var DATA = new Object();
	DATA.collection = auctionCollection;
	DATA.houseType = auctionHouseType;
	DATA.userId = 1;
	DATA.title = auctionKerWord;
	DATA.pageNo = auctionPageIndex;
	getWebData("landlord", "findAuctionByPage", METHOD_POST, DATA, function(data) {
		if(data.code == 200) {
			auctionListData = data.data;
			if(auctionListData.length > 0) {
				$("#auctionListData").empty();
				var auctionListHtml = '';
				auctionListData.map(item => auctionTimeNew.push(new Date(item.endTime).getTime()));//往数组里填当前列表的结束时间
				for(var i = 0; i < auctionListData.length; i++) {
					auctionEndTime = auctionListData[i].endTime;
					console.log(auctionEndTime)
					auctionListHtml += '<div class="auctionHallList" onclick="auctionDetail(' + auctionListData[i].id + ')">';
					auctionListHtml += '<div class="auctionHallListLeft">';
					auctionListHtml += '<img src="' + auctionListData[i].surfaceImgUrl + '" />';
					auctionListHtml += '</div>';
					auctionListHtml += '<div class="auctionHallListRight">';
					auctionListHtml += '<h5>' + auctionListData[i].title + '</h5>';
					auctionListHtml += '<div class="auctionHallListRightEndTime" id="auctionEndTime'+i+'">' + formateTime(auctionTimeNew[i]) + '</div>';
					auctionListHtml += '<div class="auctionHallListRightDescribe">';
					auctionListHtml += '<span>当前价:</span>';
					auctionListHtml += '<span>' + "￥" + auctionListData[i].nowPrice + "元/月" + '</span>';
					auctionListHtml += '<span class="offerBtn">';
					auctionListHtml += '<span class="offerStyle">' + auctionListData[i].salesNumber + "次出价" + '</span>';
					auctionListHtml += '</span>';
					auctionListHtml += '</div>';
					auctionListHtml += '</div>';
					auctionListHtml += '</div>';
				}
				$("#auctionListData").append(auctionListHtml);
				if(auctionListData.length<10){
					mui('#pullrefresh').pullRefresh().disablePullupToRefresh();
				}
			} else {
				layer.open({
					content: "没有更多数据",
					skin: 'msg',
					time: 2 //2秒后自动关闭
				});
			}
		}
	})
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
		auctionPageIndex = parseInt(auctionPageIndex) + 1;
		mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
		auctionData(auctionPageIndex); //ajax
		if(auctionListData.length<=10){
			mui('#pullrefresh').pullRefresh().disablePullupToRefresh();
			myCollectionPageIndex = 1;
		}
	}, 500)

};

//下拉刷新
function pulldownRefresh() {
	setTimeout(function() {
		$("#auctionListData").empty();
		auctionData(1);
		mui.toast("已为您更新了最新的10条数据")
		mui('#pullrefresh').pullRefresh().endPulldownToRefresh(false);
		mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
		mui('#pullrefresh').pullRefresh().enablePullupToRefresh();
	}, 500);
};

//筛选
var CollectionValue = "";
mui('#screen1').on('tap', 'button', function() { //获取装修类型的值
	$(this).addClass("mui-active").siblings().removeClass("mui-active");
	CollectionValue = $(this).attr("value"); // $(this)表示获取当前被点击元素的value值
});
var HouseTypeValue = "";
mui('#screen2').on('tap', 'button', function() { //获取装修类型的值
	$(this).addClass("mui-active").siblings().removeClass("mui-active");
	HouseTypeValue = $(this).attr("value"); // $(this)表示获取当前被点击元素的value值
	if(HouseTypeValue == 1) {
		layer.open({
			content: "写字楼暂未开放",
			skin: 'msg',
			time: 2 //2秒后自动关闭
		});
	} else if(HouseTypeValue == 2) {
		layer.open({
			content: "商铺暂未开放",
			skin: 'msg',
			time: 2 //2秒后自动关闭
		});
	}
});
mui('#screenWrap').on('tap', '#auctionResetBtn', function() {
	$("#screenWrap button").removeClass("mui-active");
});
mui('#screenWrap').on('tap', '#auctionOkBtn', function() {
	collectionValue = CollectionValue;
	houseTypeValue = HouseTypeValue;
	auctionData(1);
	$("#screenWrap").css('display', 'none');
});


//拍卖大厅详细页
mui("#auctionListData").on("tap", ".auctionHallList", function() {
	this.click();
});

