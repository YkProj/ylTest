//手机软键盘设置
//var bodyHeight=document.body.clientHeight;
//document.body.Height == bodyHeight;
function hideNavBar() {
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
};
getData(1);
//$("input").focus(function(){
//	$("#bottomBar").css('display','none')
//});
//$("input").blur(function(){
//	$("#bottomBar").css('display','block')
//});

var loding = false;

function getData(HomePageIndex) {
	if(loding) {
		return false;
	}

	loding = true;
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

				setTimeout(function() {
					loding = false;
					homePageIndex = parseInt(homePageIndex) + 1;
					if(homePageIndex <= homePageCount) {
						mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
					} else {
						mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
						homePageIndex = 1;
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
};
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
		getData(homePageIndex); //ajax
	}, 500)

};

//下拉刷新
function pulldownRefresh() {
	setTimeout(function() {
		$("#list").empty();
		getData(1);
		mui.toast("已为您更新到最新数据");
		mui('#pullrefresh').pullRefresh().endPulldownToRefresh(false);
		mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
		mui('#pullrefresh').pullRefresh().refresh(true);
	}, 500);
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