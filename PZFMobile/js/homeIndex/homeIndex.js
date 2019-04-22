//手机软键盘设置
//var bodyHeight=document.body.clientHeight;
//document.body.Height == bodyHeight;
//function hideNavBar() {
//	var originalHeight = document.documentElement.clientHeight || document.body.clientHeight;
//
//	window.onresize = function() {
//
//		//软键盘弹起与隐藏  都会引起窗口的高度发生变化
//		var resizeHeight = document.documentElement.clientHeight || document.body.clientHeight;
//
//		if(resizeHeight * 1 < originalHeight * 1) { //resizeHeight<originalHeight证明窗口被挤压了
//
//			plus.webview.currentWebview().setStyle({
//				height: originalHeight
//			});
//
//		}
//	}
//};
//点击跳转至相应页面
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
getData(1);
$("input").focus(function() {
	$("#bottomBar").css('display', 'none')
});

function searchInput(e) {
	//	landmarkSearch = e.value;
	//	console.log(e.value);
	$("#bottomBar").css('display', 'block')
	$("#list").empty();
	getData(1)
}

var loading = false;

function getData(HomePageIndex) {
	var areaCity = $("#homeIndexArea").html();
	var homeKeword = "";
	var district = "";
	var place = "";
	var priceLower = "";
	var priceUpper = "";
	var bedroomNum = "";
	var hallNum = "";
	var areaLower = "";
	var areaUpper = "";
	var decorationType = "";
	var rantType = "";
	district = area;
	var barPlace = $("#endArea").text();
	var landmarkSearch = $("input[name='homeIndexSearch']").val();
	if(landmarkSearch == "") {
		homeKeword = "";
	} else {
		homeKeword = landmarkSearch;
	}
	if(barPlace == "区域") {
		district = "";
		place = "";
	} else {
		place = barPlace;
		district = area;
	}

	var startingPrice = $("#startingPriceWrapInfo").html();
	if(startingPrice == "起拍价") {
		priceLower = "";
		priceUpper = "";
	} else {
		priceLower = homIndexPriceLower;
		priceUpper = homeIndexPriceUpper;
	}
	var Apartment = $("#ApartmentWrapInfo").html();
	if(Apartment == "户型") {
		bedroomNum = "";
		hallNum = "";
	} else {
		bedroomNum = bedroomNum;
		hallNum = hallNum;
	}
	areaLower = homeAreaLower;
	areaUpper = homeAreaUpper;
	if(homeDecorationType == "") {
		decorationType = "";
	} else {
		decorationType = homeDecorationType;
	}
	if(homerantType == "") {
		rantType = "";
	} else {
		rantType = homerantType;
	}
	var DATA = new Object();
	DATA.page = HomePageIndex;
	DATA.city = areaCity;
	DATA.keyword = homeKeword;
	DATA.place = place;
	DATA.district = district;
	DATA.priceLower = priceLower;
	DATA.priceUpper = priceUpper;
	DATA.bedroomNum == bedroomNum;
	DATA.hallNum == hallNum;
	DATA.areaLower = areaLower;
	DATA.areaUpper = areaUpper;
	DATA.decorationType = decorationType;
	DATA.rantType = rantType;
	getWebData("landlord", "allHouseInfByPage", METHOD_GET, DATA, function(data) {
		if(data.code == 200) {
			var  returnData = data.data.content;
			if(returnData.length > 0) {
				homePageCount = data.data.totalPages;
				var liHtml = '';
				for(var i = 0; i < returnData.length; i++) {
					liHtml += '<div class="homeIndexList" id="' + i + '" value="' + returnData[i] + '"onclick="indexDetail(' + returnData[i].id + ')">';
					liHtml += '<div class="homeIndexListLeft">';
					liHtml += '<img src="' + returnData[i].surfaceImgUrl + '" />';
					liHtml += '</div>';
					liHtml += '<div class="homeIndexListRight">';
					liHtml += '<h5>' + returnData[i].title + '</h5>';
					liHtml += '<p class="areaSize">';
					liHtml += '<span>' + returnData[i].bedroomNum + "室" + returnData[i].hallNum + "厅" + '</span>';
					liHtml += '<span>' + returnData[i].area + "㎡" + '</span>';
					liHtml += '</p>';
					liHtml += '<p class="positionLabel">';
					liHtml += '<span class="iconfont icon-dingwei"></span>';
					liHtml += '<span>' + returnData[i].district + "-" + returnData[i].place + '</span>';
					liHtml += '<span>香珠花园</span>';
					liHtml += '</p>';
					liHtml += '<p class="decorationLabel">';
					var rangeType = returnData[i].rantType;
					if(rangeType == 1) {
						liHtml += '<button type="button" class="LabelBtn">整租</button>';
					} else {
						liHtml += '<button type="button" class="LabelBtn">合租</button>';
					}
					var decorationType = returnData[i].decorationType;
					if(decorationType == 1) {
						liHtml += '<button type="button" class="LabelBtn">毛坯</button>';
					} else if(decorationType == 2) {
						liHtml += '<button type="button" class="LabelBtn">简单装修</button>';
					} else if(decorationType == 3) {
						liHtml += '<button type="button" class="LabelBtn">精装修</button>';
					} else if(decorationType == 4) {
						liHtml += '<button type="button" class="LabelBtn">豪华装修</button>';
					} else if(decorationType == 5) {
						liHtml += '<button type="button" class="LabelBtn">其他</button>';
					}
					var mortgPayType = returnData[i].mortgPayType;
					if(mortgPayType == 1) {
						liHtml += '<button type="button" class="LabelBtn">押一付一</button>';
					} else {
						liHtml += '<button type="button" class="LabelBtn">押二付一</button>';
					}
					liHtml += '</p>';
					liHtml += '<p class="homeIndexListRightPrice">';
					liHtml += "￥" + returnData[i].staringPrice + "/月";
					liHtml += '</p>';
					liHtml += '</div>';
					liHtml += '</div>';
				}
				$("#list").append(liHtml);
			}else{
				layer.open({
					content: "没有更多数据",
					skin: 'msg',
					time: 2 //2秒后自动关闭
				});
			}
		} else {
			layer.open({
				content: data.msg,
				skin: 'msg',
				time: 2 //2秒后自动关闭
			});
		}

	});
};
mui.init({
	pullRefresh: {
		container: '#pullrefresh',
		down: {
			auto: false,
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
		$("#list").empty();
		homePageIndex = 1;
		getData(1);
		mui.toast("已为您更新到最新数据");
		mui('#pullrefresh').pullRefresh().endPulldownToRefresh(false);
		mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
		mui('#pullrefresh').pullRefresh().refresh(true);
	}, 1100);
};

//上拉加载
function pullupRefresh() {
	setTimeout(function() {
		if(loading) {
			return;
		}
		loading = true;
		getData(homePageIndex); //ajax
		loading = false;
		homePageIndex = parseInt(homePageIndex) + 1;
		if(homePageIndex <= homePageCount) {
			mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
		} else {
			mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
		}
	}, 1000)

};

//首页详情页动态导航栏
//首页详细页透明渐变导航栏
mui("#list").on("tap", ".homeIndexList", function() {
	this.click();
});

function HomeIndexDetailPage(ele) {
	var page = ele.getAttribute("data-page");

	mui.openWindow({
		url: page
	});

};

function indexDetail(HomeIndexListId) {
	console.log(HomeIndexListId)
	//存ID
	localStorage.setItem('homeIndexListID', HomeIndexListId);
	mui.openWindow({
		//TODO 这里写正确的URL
		url: '../homeIndex/indexSub.html'
	});
};
useInfo(); //调用获取用户信息
//window.localStorage.setItem("nickName",nickName);
//window.localStorage.setItem("headImgUrl",headImgUrl);
function useInfo() { //获取用户信息
	var href = window.location.href;

	var data = href.split("?")[1].split("&");
	var userId = data[0].split("=")[1];
	//var nickName = decodeURI(data[1].split("=")[1]);
	//var headImgUrl = data[2].split("=")[1];
	window.localStorage.setItem("userId", userId);
	var userId = window.localStorage.getItem("userId");
	window.lo
	var DATA = new Object();
	DATA.userId = userId;
	getWebData("wuser", "findUserById", METHOD_POST, DATA, function(data) {
		if(data.code == 200) {
			var userData = data.data;
			if(userData != null) {
				saveUserData(userData);
				var UserPhone = getUserData("phone");
				if(UserPhone == "null") {
					saveStorageData("isLogin", false);
				} else {
					saveStorageData("isLogin", true);
				}
			} else {
				saveStorageData("isLogin", false);
				clearData();
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