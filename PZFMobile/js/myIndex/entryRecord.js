//entryLog(1,1,0,1);
//定义报名记录全局变量
var fragment = "";
const indexValue = {
	'0': 'item1mobile',
	'1': 'item2mobile',
	'2': 'item3mobile',
	'3': 'item4mobile'
}
mui.init();
(function($) {
	//阻尼系数
	var deceleration = mui.os.ios ? 0.003 : 0.0009;
	$('.mui-scroll-wrapper').scroll({
		bounce: false,
		indicators: true, //是否显示滚动条
		deceleration: deceleration
	});
	$.ready(function() {
		//循环初始化所有下拉刷新，上拉加载。
		$.each(document.querySelectorAll('.mui-slider-group .mui-scroll'), function(index, pullRefreshEl) {
			$(pullRefreshEl).pullToRefresh({
				down: {
					callback: function() {
						var self = this;
						var ul = self.element.querySelector('.entryContent');
						setTimeout(function() {

							//							const father = $("#" + indexValue[index]);
							//							var fatherall = father.childNodes.childNodes.childNodes();
							var testContainer = document.querySelector('#' + indexValue[index]);
							var fourChildNode = testContainer.querySelector('.entryContent');
							//						   	var fatherall = father.find('ul');
							fourChildNode.innerHTML = "";
							//							ul.slice(1000);
							var fragment = entryLog(self, ul, index, 1);
							layer.open({
								content: "已为您更新到最新数据",
								skin: 'msg',
								time: 2 //2秒后自动关闭
							});
							//                          ul.appendChild(fragment);  
							self.endPullDownToRefresh();
							self.endPullUpToRefresh();
						}, 1000);

					}
				},
				up: {
					auto: true, //自动执行一次上拉加载，可选；
					show: true, //显示底部上拉加载提示信息，可选；      
					contentrefresh: '正在加载...', //上拉进行中提示信息
					contentnomore: '没有更多数据了', //上拉无更多信息时提示信息
					callback: function() {
						var self = this;
						var ul = self.element.querySelector('.entryContent');
						setTimeout(function() {
							if(index == 0) {
								entryPageIndex = entryPageIndex1++;
								var fragment = entryLog(self, ul, index, entryPageIndex);
								if(fragment == null) {
									self.endPullUpToRefresh(true);
								} else {
									ul.appendChild(fragment);
									self.endPullUpToRefresh();
								}

								//																ul.appendChild(entryLog(self,ul, index, entryPageIndex)); 
								//																if(entryData.length<=10){
								//																	self.endPullUpToRefresh(true);
								//																}
							} else if(index == 1) {
								entryPageIndex = entryPageIndex0++;
								var fragment = entryLog(self, ul, index, entryPageIndex);
								if(fragment == null) {
									self.endPullUpToRefresh(true);
								} else {
									ul.appendChild(fragment);
									self.endPullUpToRefresh();
								}
								//								ul.appendChild(entryLog(self,ul, index, entryPageIndex)); 
								//								if(entryData.length<=10){
								//									self.endPullUpToRefresh(true);
								//								}
							} else if(index == 2) {
								entryPageIndex = entryPageIndex2++;
								var fragment = entryLog(self, ul, index, entryPageIndex);
								if(fragment == null) {
									self.endPullUpToRefresh(true);
								} else {
									ul.appendChild(fragment);
									self.endPullUpToRefresh();
								}
								//								ul.appendChild(entryLog(self,ul, index, entryPageIndex)); 
								//								if(entryData.length<=10){
								//									self.endPullUpToRefresh(true);
								//								}
							} else if(index == 3) {
								entryPageIndex = entryPageIndex3++;
								var fragment = entryLog(self, ul, index, entryPageIndex);
								if(fragment == null) {
									self.endPullUpToRefresh(true);
								} else {
									ul.appendChild(fragment);
									self.endPullUpToRefresh();
								}
								//								ul.appendChild(entryLog(self,ul, index, entryPageIndex)); 
								//								if(entryData.length<=10){
								//									self.endPullUpToRefresh(true);
								//								}
							}
						}, 1000);
					}
				}
			});
		});
	});
})(mui);
var entryData = "";

function entryLog(self, ul, index, entryPageIndex) { //self表示当前处于选项卡；ul表示请求当前选项卡的内容；index选项卡的索引；entryPageIndex当前选项卡请求页数
	fragment = document.createDocumentFragment();
	var li;
	li = document.createElement('li');
	if(index == 0) {
		entryStatus = 1; //index为0表示全部
	} else if(index == 1) { //index为0表示报名中
		entryStatus = 0;
	} else if(index == 2) { //index为0表示正在拍
		entryStatus = 2;
	} else if(index == 3) { //index为0表示已结束
		entryStatus = 3;
	}
	var DATA = new Object();
	DATA.userId = getUserData("id");
	DATA.pageNo = entryPageIndex;
	DATA.status = entryStatus;
	getWebData("landlord", "findOneCollectionHouse", METHOD_POST, DATA, function(data) {
		if(data.code == 200) {
			entryData = data.data;
			if(entryData.length > 0) {
				//				$("#entryList").empty();
				var entryListHtml = "";
				for(var i = 0; i < entryData.length; i++) {
					entryListHtml += '<div class="homeIndexList" onclick="auctionDetail(' + entryData[i].id + ')">';
					entryListHtml += '<div class="homeIndexListLeft">';
					entryListHtml += '<img src="' + entryData[i].surfaceImgUrl + '" />';
					entryListHtml += '</div>';
					entryListHtml += '<div class="homeIndexListRight">';
					entryListHtml += '<h5>' + entryData[i].title + '</h5>';
					entryListHtml += '<p class="areaSize">';
					entryListHtml += '<span>' + entryData[i].bedRoomNum + "室" + entryData[i].hallNum + "厅" + '</span>';
					entryListHtml += '<span>' + entryData[i].area + "㎡" + '</span>';
					entryListHtml += '</p>';
					entryListHtml += '<p class="positionLabel">';
					entryListHtml += '<span class="iconfont icon-dingwei"></span>';
					entryListHtml += '<span>' + entryData[i].district + "-" + entryData[i].city + '</span>';
					entryListHtml += '<span>' + entryData[i].address + '</span>';
					entryListHtml += '</p>';
					var myentryType = "";
					if(entryData[i].decorationType == 1) {
						myentryType = "毛坯房";
					} else if(entryData[i].decorationType == 2) {
						myentryType = "简单装修";
					} else if(entryData[i].decorationType == 3) {
						myentryType = "精装修";
					} else if(entryData[i].decorationType == 4) {
						myentryType = "豪华装修";
					} else {
						myentryType = "其他";
					}
					entryListHtml += '<p class="decorationLabel">';
					entryListHtml += '<button type="button" class="LabelBtn">' + myentryType + '</button>';
					entryListHtml += '</p>';
					entryListHtml += '<p class="homeIndexListRightPrice">';
					entryListHtml += entryData[i].staringPrice + "/月";
					if(entryData[i].status == 0) {
						entryListHtml += '<span class="Enrolment">报名中</span>';
					} else if(entryData[i].status == 1) {
						entryListHtml += '<span class="Enrolment">审核中</span>';
					} else if(entryData[i].status == 2) {
						entryListHtml += '<span class="Enrolment Filming">正在拍</span>';
					} else if(entryData[i].status == 3) {
						entryListHtml += '<span class="Enrolment hasEnded">已成功</span>';
					} else if(entryData[i].status == 4) {
						entryListHtml += '<span class="Enrolment Filming">流拍</span>';
					}
					entryListHtml += '</p>';
					entryListHtml += '</div>';
					entryListHtml += '</div>';
					li.innerHTML = entryListHtml;
					fragment.appendChild(li);
				}
				//				$("#entryList").append(entryListHtml);
				ul.appendChild(fragment);
				self.endPullUpToRefresh();
				if(entryData.length < 10) {
					//					$(".mui-pull-bottom-tips").css('display','none');
					self.endPullUpToRefresh(true);
				}
			} else {
				layer.open({
					content: "没有更多数据了",
					skin: 'msg',
					time: 2 //2秒后自动关闭
				});
				//				self.endPullUpToRefresh(true);
			}
		} else {
			layer.open({
				content: data.code + data.msg,
				skin: 'msg',
				time: 2 //2秒后自动关闭
			});
		}
	});
}

mui("#entryList").on("tap", ".homeIndexList", function() {
	this.click();
});