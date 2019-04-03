//调用函数
myCollectionList(1);
var myCollectionData = "";
var MyCollectionPageIndex = 1;
var loading = false;

function myCollectionList(myCollectionPageIndex) {
	if(loading) {
		loading = false;
	}
	loading = true;
	var DATA = new Object();
	DATA.userId = getUserData("id");
	DATA.pageNo = myCollectionPageIndex;
	getWebData("landlord", "findZeroCollectionHouse", METHOD_POST, DATA, function(data) {
		if(data.code == 200) {
			myCollectionData = data.data;
			if(myCollectionData.length > 0) {
				var myCollectionHtml = "";
				for(var i = 0; i < myCollectionData.length; i++) {
					myCollectionHtml += '<div class="homeIndexList" onclick="auctionDetail(' + myCollectionData[i].id + ')">';
					myCollectionHtml += '<div class="homeIndexListLeft">';
					myCollectionHtml += '<img src="' + myCollectionData[i].surfaceImgUrl + '" />';
					myCollectionHtml += '</div>';
					myCollectionHtml += '<div class="homeIndexListRight">';
					myCollectionHtml += '<h5>' + myCollectionData[i].title + '</h5>';
					myCollectionHtml += '<p class="areaSize">';
					myCollectionHtml += '<span>' + myCollectionData[i].bedRoomNum + "室" + myCollectionData[i].hallNum + "厅" + '</span>';
					myCollectionHtml += '<span>' + myCollectionData[i].area + "㎡" + '</span>';
					myCollectionHtml += '</p>';
					myCollectionHtml += '<p class="positionLabel">';
					myCollectionHtml += '<span class="iconfont icon-dingwei"></span>';
					myCollectionHtml += '<span>' + myCollectionData[i].district + "-" + myCollectionData[i].city + '</span>';
					myCollectionHtml += '<span>' + myCollectionData[i].address + '</span>';
					myCollectionHtml += '</p>';
					var mydecorationType = "";
					if(myCollectionData[i].decorationType == 1) {
						mydecorationType = "毛坯房";
					} else if(myCollectionData[i].decorationType == 2) {
						mydecorationType = "简单装修";
					} else if(myCollectionData[i].decorationType == 3) {
						mydecorationType = "精装修";
					} else if(myCollectionData[i].decorationType == 4) {
						mydecorationType = "豪华装修";
					} else {
						mydecorationType = "其他";
					}
					myCollectionHtml += '<p class="decorationLabel">';
					myCollectionHtml += '<button type="button" class="LabelBtn">' + mydecorationType + '</button>';
					myCollectionHtml += '</p>';
					myCollectionHtml += '<p class="homeIndexListRightPrice">';
					myCollectionHtml += myCollectionData[i].staringPrice + "/月";
					if(myCollectionData[i].status == 0) {
						myCollectionHtml += '<span class="Enrolment">报名中</span>';
					} else if(myCollectionData[i].status == 1) {
						myCollectionHtml += '<span class="Enrolment">审核中</span>';
					} else if(myCollectionData[i].status == 2) {
						myCollectionHtml += '<span class="Enrolment Filming">正在拍</span>';
					} else if(myCollectionData[i].status == 3) {
						myCollectionHtml += '<span class="Enrolment hasEnded">已成功</span>';
					} else if(myCollectionData[i].status == 4) {
						myCollectionHtml += '<span class="Enrolment Filming">流拍</span>';
					}

					myCollectionHtml += '</p>';
					myCollectionHtml += '</div>';
					myCollectionHtml += '</div>';
				}
				$("#myCollectionList").append(myCollectionHtml);
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

mui("#myCollectionList").on("tap", ".homeIndexList", function() {
	this.click();
});

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
		loading = false;
		MyCollectionPageIndex = parseInt(MyCollectionPageIndex + 1);
		if(myCollectionData.length < 10) {
			mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
			MyCollectionPageIndex = 1;
		} else {
			mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
		}
	}, 500);
};

//下拉刷新
function pulldownRefresh() {
	setTimeout(function() {
		$("#myCollectionList").empty();
		myCollectionList(1);
		mui.toast("已为您更新至最新数据");
		mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
		mui('#pullrefresh').pullRefresh().enablePullupToRefresh(false);
	}, 500);
};