//全局变量
//导航栏标题全局变量
var auctionTitle = "";
//倒计时全局变量
var auctionDetailEndTime = "";
//经纬度变量
var auctionLongitude = "";
var auctionLantitude = "";

//订单状态全局变量
var auctionHouseDataStatus = "";

$(function() {
	document.querySelector('.mui-slider').addEventListener('slide', function(event) {　
		var current_num = event.detail.slideNumber + 1;　
		$("#auctionNumbers").html(current_num);
	}, {
		passive: true
	});

})

//透明渐变导航栏Start
window.onscroll = function() {
	var h = document.documentElement.scrollTop || document.body.scrollTop;
	console.log(h * 2.5); //控制台查看监听滚动  
	var headerTop = document.getElementById("header");
	if(h >= 40) { //header的高度是40px;     
		headerTop.style.background = "#fff";
		headerTop.style.color = "rgba(66,65,66,1)";
	} else {
		if(h < 10) {
			//40*2.5=100;这样透明度就可以由0渐变到100%；
			headerTop.style.background = "rgba(255,255,255,0.0" + h * 2.5 + ")";
			headerTop.style.color = "rgba(66,66,66,0.0" + h * 2.5 + ")";
		} else if(h > 10 && h <= 40) {
			headerTop.style.background = "rgba(255,255,255,0." + h * 2.5 + ")";
			headerTop.style.color = "rgba(66,66,66,0." + h * 2.5 + ")";

		}

	}
};
//透明渐变导航栏End

//取ID
const auctionListId = localStorage.getItem('AuctionListId');
auctionDetail(auctionListId)
console.log(auctionListId)

//交报名保证金
document.getElementById("Bond").addEventListener('tap', function(e) {
	//当在文本框输入内容的时候隐藏底部导航栏
	$("#auctionBottomEnd").css('display', 'none')
	if(auctionHouseDataStatus == 0 || auctionHouseDataStatus == 2) {
		e.detail.gesture.preventDefault(); //修复iOS 8.x平台存在的bug，使用plus.nativeUI.prompt会造成输入法闪一下又没了
		var btnArray = ['取消', '确定'];
		mui.prompt('参与竞拍需要交300元保证金', '请输入支付密码', '报名交保证金', btnArray, function(e) {
			if(e.index == 1) {
				$("#auctionBottomEnd").css('display', 'block')
				layer.open({
					content: "点击了确定按钮",
					skin: 'msg',
					time: 2 //2秒后自动关闭
				});
			} else {
				$("#auctionBottomEnd").css('display', 'block')
				layer.open({
					content: "点击了取消按钮",
					skin: 'msg',
					time: 2 //2秒后自动关闭
				});
			}
		})
	} else {
		layer.open({
			content: "竞拍已结束",
			skin: 'msg',
			time: 2 //2秒后自动关闭
		});
	}
});

//出价
var auctionMarkup = $("#auctionMarkup").html();
var auctionMarkupContent = "加价幅度" + auctionMarkup;

function offer() {
	if(auctionHouseDataStatus == 0 || auctionHouseDataStatus == 2) {
		var btnArray = ['取消', '确认'];
		mui.confirm(auctionMarkupContent, '确认出价', btnArray, function(e) {
			if(e.index == 1) {
				mui.toast("你点击了确认按钮");
			} else {
				mui.toast("你点击了取消按钮");
			}
		})
	} else {
		layer.open({
			content: "竞拍已结束",
			skin: 'msg',
			time: 2 //2秒后自动关闭
		});

	}
}

var auctionLogsHtml =""
var auctionlantitude =""
var auctionlontitude = ""
function auctionDetail(auctionListId) {
	var auctionHouseId = auctionListId;
	var DATA = new Object();
	DATA.houseId = auctionHouseId;
	getWebData("landlord", "findAuctionHouseInfDetail", METHOD_POST, DATA, function(data) {
		if(data.code == 200) {
			var auctionData = data.data;
			var auctionSliderPicture = auctionData.loopImg;
			var auctionHouseData = auctionData.house;
			auctionlantitude = auctionHouseData.lantitude;
			auctionlontitude = auctionHouseData.longitude;
			if(auctionSliderPicture.length > 0) {
				$("#auctionSliderPicture").empty();
				var auctionPictureHtml = '';
				var auctionSliderPictureLength = auctionSliderPicture.length;
				$("#auctionPictureNumbers").html(auctionSliderPictureLength);
				for(var i = 0; i < auctionSliderPicture.length; i++) {
					auctionPictureHtml += '<div class="mui-slider-item">';
					auctionPictureHtml += '<a href="#">';
					auctionPictureHtml += '<img class="bannerimg" src="' + auctionSliderPicture[i] + '" data-preview-src="" data-preview-group="1" />';
					auctionPictureHtml += '</a>';
					auctionPictureHtml += '</div>';
				}
				$("#auctionSliderPicture").append(auctionPictureHtml);
			}
			$("#auctionHouseTitle").html(auctionHouseData.title);
			$("#header").append(auctionHouseData.title);
			$("#auctionLabel").empty();
			var auctionRantType = "";
			if(auctionHouseData.rantType == 1) {
				auctionRantType = '<button type="button" class="mui-btn-grey">' + "简单装修" + '</button>';
			} else if(auctionHouseData.rantType == 2) {
				auctionRantType = '<button type="button" class="mui-btn-grey">' + "精装修" + '</button>';
			} else {
				auctionRantType = '<button type="button" class="mui-btn-grey">' + "豪华装修" + '</button>';
			}
			$("#auctionLabel").append(auctionRantType);
			$("#auctionNumber").html(auctionHouseData.currentSignUpCount + "人");
			var auctionStatus = "";
			auctionHouseDataStatus = auctionHouseData.status;
			if(auctionHouseData.status == 1) {
				auctionStatus = "审核中";
				$("#auctionBottomEnd").addClass('auctionBottomEnd');
				$("#auctionBottomEndSecond").addClass('auctionBottomEnd');
				$("#auctionBottomEndThird").addClass('auctionBottomEnd');
			} else if(auctionHouseData.status == 0) {
				auctionStatus = "报名中";
			} else if(auctionHouseData.status == 2) {
				auctionStatus = "正在拍卖";
			} else if(auctionHouseData.status == 3) {
				auctionStatus = "已结束";
				$("#auctionBottomEnd").addClass('auctionBottomEnd');
				$("#auctionBottomEndSecond").addClass('auctionBottomEnd');
				$("#auctionBottomEndThird").addClass('auctionBottomEnd');
			}else if(auctionHouseData.status == 4){
				auctionStatus = "流拍";
				$("#auctionBottomEnd").addClass('auctionBottomEnd');
				$("#auctionBottomEndSecond").addClass('auctionBottomEnd');
				$("#auctionBottomEndThird").addClass('auctionBottomEnd');
			}
			$("#auctionStatus").html(auctionStatus);
			if(auctionHouseData.status !== 2) {
				$("#specialTime").empty();
			}
			auctionDetailEndTime = auctionHouseData.endTime;
			$("#auctionCurrentPrice").html(auctionHouseData.nowPrice + "元/月"); //当前价
			$("#auctionStartPrice").html(auctionHouseData.staringPrice + "元/月"); //起拍价
			var AuctionStartPrice = auctionHouseData.staringPrice;
			var AuctionProfile = parseInt(AuctionStartPrice) * 1 / 10;
			$("#auctionProfile").html(AuctionProfile + "元"); //保证金
			$("#auctionMarkup").html(auctionHouseData.priceInterval + "元");
			$("#auctionApartment").html(auctionHouseData.bedroomNum + "室" + auctionHouseData.hallNum + "厅" + auctionHouseData.toiletNum + "卫");
			$("#auctionArea").html(auctionHouseData.area + "面积");
			var auctionRanType = "";
			if(auctionHouseData.decorationType == 1) {
				auctionRanType = "毛坯房";
			} else if(auctionHouseData.decorationType == 2) {
				auctionRanType = "简单装修";
			} else if(auctionHouseData.decorationType == 3) {
				auctionRanType = "精装修";
			} else if(auctionHouseData.decorationType == 4) {
				auctionRanType = "豪华装修";
			} else {
				auctionRanType = "其他";
			}
			$("#auctionRanType").html(auctionRanType);
			$("#auctionFloor").html(auctionHouseData.floor);
			if(auctionHouseData.address == null) {
				$("#auctionAddress").html("小区:" + "(" + auctionHouseData.district + "," + auctionHouseData.place + ")");
			} else {
				$("#auctionAddress").html("小区:" + auctionHouseData.address + "(" + auctionHouseData.district + "," + auctionHouseData.place + ")");
			}
			var auctionAddress = $("#auctionAddress").html();
			auctionLongitude = auctionHouseData.longitude;
			auctionLantitude = auctionHouseData.lantitude;
			map(auctionLongitude, auctionLantitude, auctionAddress);
			const icons = {
				'Bed': 'icon-chuang',
				'Washer': 'icon-xiyiji',
				'AirConditioner': 'icon-kongtiao',
				'Balcony': 'icon-yangtai',
				'IceBox': 'icon-bingxiang2',
				'Cook': 'icon-kezuofan',
				'Television': 'icon-dianshi',
				'Heater': 'icon-reshuiqi',
				'Internet': 'icon-kuandai',
				'Sofa': 'icon-shafa',
				'CentralHeating': 'icon-nuanqi',
				'Toilet': 'icon-weishengjian',
				'Wardrobe': 'icon-shimuyigui'
			}
			var supFacilities = auctionHouseData.supFacilities.split(",");
			if(supFacilities.length > 0) {
				var supFacilitiesHtml = '';
				for(var i = 0; i < supFacilities.length; i++) {
					const supFacilitie = supFacilities[i];
					if(supFacilitie) {
						$(`.${icons[supFacilitie]}`).addClass("spanActive");
					}
				}
			}
			$("#auctionHoseDescribe").html(auctionHouseData.description);

			var auctionLogs = auctionData.auctionLogs;
			$("#auctionLogsContent").empty();
			if(auctionLogs.length > 0) {
				auctionLogsHtml = "";
				for(var j = 0; j < auctionLogs.length; i++) {
					auctionLogsHtml += '<div class="auctionListContentList">';
					if(auctionLogs[i].status == 1) {
						auctionLogsHtml += '<span style="color:#FF3734">领先</span>';
					} else if(auctionLogs[i].status == 0) {
						auctionLogsHtml += '<span style="color:#02BB9A">出局</span>';
					}
					auctionLogsHtml += '<span>' + auctionLogs[i].userId + '</span>';
					auctionLogsHtml += '<span>' + auctionLogs[i].auctionPrice + "元" + '</span>';
					auctionLogsHtml += '<span>' + auctionLogs[i].createTime + '</span>';
					auctionLogsHtml += '</div>';
				}
				//				$("#auctionLogsContent").append(auctionLogsHtml);
			}
		} else {
			layer.open({
				content: data.code + data.msg,
				skin: 'msg',
				time: 2 //2秒后自动关闭
			});
		}
	});

};

//地图
function map(Longitude, Lantitude, homeIndextSubTitle) {
	var SubhomeIndextSubTitle = homeIndextSubTitle.substr(0, 18) + "...";
	var map = new BMap.Map("allmap");  //创建地图实例
	var point = new BMap.Point(Longitude, Lantitude);
	map.centerAndZoom(point, 13); //初始化地图设置中心点坐标和地图级别
	var marker = new BMap.Marker(point); // 创建标注
	map.addOverlay(marker); // 将标注添加到地图中
	var opts = {
		width: 100, // 信息窗口宽度
		height: 50, // 信息窗口高度
		title: SubhomeIndextSubTitle, // 信息窗口标题
	}
	console.log(auctionlantitude , auctionlontitude)
	var baiduApp = '<a href="http://api.map.baidu.com/geocoder?location=auctionlantitude,auctionlontitude&coord_type=gcj02&output=html&src=webapp.lj.render">打开百度地图查看详情</a>';
	var infoWindow = new BMap.InfoWindow(baiduApp, opts); // 创建信息窗口对象 
	marker.addEventListener("click", function() {
		map.openInfoWindow(infoWindow, point); //开启信息窗口
	});
}

var timer = null;
window.onload = function() {
	//开启定时器
	timer = setInterval(showTime, 1500);
	//回调函数
	function showTime() {
		var stringTime = auctionDetailEndTime;
		var timestamp2 = Date.parse(new Date(stringTime));
		var timestamp = Date.parse(new Date());
		var endTamp = timestamp2 - timestamp;
		var auctionDate = parseInt(endTamp / (3600 * 24 * 1000)); //天
		var auctionHours = parseInt((endTamp % (3600 * 24 * 1000)) / (3600 * 1000)); //1小时=3600s
		var auctionMinutes = parseInt((endTamp % (3600 * 1000)) / (60 * 1000)); //分钟
		var auctionSeconds = parseInt((endTamp % (60 * 1000)) / 1000); //秒
		var auctionDetailTime = "距结束" + auctionHours + "时" + auctionMinutes + "分" + auctionSeconds + "秒";
		var haveEnd = '<span style="color:#FF5350">已结束</span>'
		if(endTamp > 0) {
			$("#specialTime").html(auctionDetailTime);
		} else {
			$("#specialTime").html(haveEnd);
		}
	}
}

function houseDescribe() {
	$(this).prop('href', '#item1');
	$("#item1").addClass('mui-active');
	$("#item2").removeClass('mui-active');
	$("#item3").removeClass('mui-active');
}

function signUp() {
	$(this).prop('href', '#item2');
	$("#item2").addClass('mui-active');
	$("#item1").removeClass('mui-active');
	$("#item3").removeClass('mui-active');
	if(auctionLogsHtml.length > 0) {
		$("#auctionLogsContent").append(auctionLogsHtml);
	} else {
		layer.open({
			content: "暂无出价记录",
			skin: 'msg',
			time: 2 //2秒后自动关闭
		});
	}
}


function notice() {
	$(this).prop('href', '#item3');
	$("#item3").addClass('mui-active');
	$("#item1").removeClass('mui-active');
	$("#item2").removeClass('mui-active');
}
