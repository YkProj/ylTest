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

var auctionLogsHtml = ""
var auctionlantitude = ""
var auctionlontitude = ""
var isSignUp = ""

function auctionDetail(auctionListId) {
	var auctionHouseId = auctionListId;
	var DATA = new Object();
	DATA.houseId = auctionHouseId;
	DATA.userId = getUserData("id");
	getWebData("landlord", "findAuctionHouseInfDetail", METHOD_POST, DATA, function(data) {
		if(data.code == 200) {
			var auctionData = data.data;
			isSignUp = auctionData.isSignUp;
			if(isSignUp == 0) {
				$("#isSignUp").html("交报名保证金");
			} else {
				$("#isSignUp").html("出价");
			}
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
				$("#controlIsSignUp").addClass('auctionBottomEnd');
			} else if(auctionHouseData.status == 0) {
				auctionStatus = "报名中";
			} else if(auctionHouseData.status == 2) {
				auctionStatus = "正在拍卖";
			} else if(auctionHouseData.status == 3) {
				auctionStatus = "已结束";
				$("#controlIsSignUp").addClass('auctionBottomEnd');
			} else if(auctionHouseData.status == 4) {
				auctionStatus = "流拍";
				$("#controlIsSignUp").addClass('auctionBottomEnd');
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
	var map = new BMap.Map("allmap"); //创建地图实例
	var point = new BMap.Point(Longitude, Lantitude);
	map.centerAndZoom(point, 13); //初始化地图设置中心点坐标和地图级别
	var marker = new BMap.Marker(point); // 创建标注
	map.addOverlay(marker); // 将标注添加到地图中
	var opts = {
		width: 100, // 信息窗口宽度
		height: 50, // 信息窗口高度
		title: SubhomeIndextSubTitle, // 信息窗口标题
	}
	console.log(auctionlantitude, auctionlontitude)
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
getSignUpRecord();
var offerRecordTopAmount = "";
var auctionLogs = "";

function getSignUpRecord() { //获取出价记录
	var DATA = new Object();
	DATA.pageNo = 1;
	DATA.houseId = auctionListId;
	getWebData("offerLog", "findOfferLogByHouse", METHOD_POST, DATA, function(data) {
		if(data.code == 200) {
			var offerRecordData = data.data;
			$("#auctionLogsContent").empty();
			auctionLogs = offerRecordData.offerLogList;
			$("#topAmount").html(offerRecordTopAmount);
			if(auctionLogs.length > 0) {
				offerRecordTopAmount = auctionLogs[0].amount;
				auctionLogsHtml = "";
				for(var i = 0; i < auctionLogs.length; i++) {
					auctionLogsHtml += '<div class="auctionListContentList">';
					if(i = 0) {
						auctionLogsHtml += '<span style="color:#FF3734">领先</span>';
					} else {
						auctionLogsHtml += '<span style="color:#02BB9A">出局</span>';
					}
					auctionLogsHtml += '<span userId="' + auctionLogs[i].userId + '">' + auctionLogs[i].nickName + '</span>';
					auctionLogsHtml += '<span>' + auctionLogs[i].amount + "元" + '</span>';
					auctionLogsHtml += '<span>' + auctionLogs[i].createTime + '</span>';
					auctionLogsHtml += '</div>';
				}
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

function signUp() {
	$(this).prop('href', '#item2');
	$("#item2").addClass('mui-active');
	$("#item1").removeClass('mui-active');
	$("#item3").removeClass('mui-active');
	if(auctionLogs > 0) {
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

//点击交报名保证金
function IsSignUp() {
	if(hasLogin()) {
		if(auctionHouseDataStatus == 0 || auctionHouseDataStatus == 2) {
			if(isSignUp == 0) {
				$("#deposit").css('display', 'block');
			} else {
				$("#offer").css('display', 'block');
			}
		} else {
			layer.open({
				content: "竞拍已结束",
				skin: 'msg',
				time: 2 //2秒后自动关闭
			});
		}
	} else {
		layer.open({
			content: "您还未设置账号,请先进行账号设置",
			skin: 'msg',
			time: 2 //2秒后自动关闭
		});
		setTimeout(function() {
			mui.openWindow({
				url: '../myIndex/login.html'
			});
		}, 1000)
	}
}

//点击出价确定按钮
function offerOk() {
	$("#offer").css('display', 'none');
	var PriceIncreaseRange = $("#addPrice").html();
	const openid = getUserData("openId");
	const totalFee = PriceIncreaseRange * 100;
	var twosign = "";
	var t = parseInt(new Date().getTime() / 1000);
	var addressIp = returnCitySN["cip"];
	console.log("ip：" + addressIp);

	function onBridgeReady() {

		$.ajax({
			"url": "http://www.zukepai.com/server/pay/weChatPay",
			"data": {
				"totalFee": totalFee, //支付的钱、单位是分
				"openId": getUserData("openId"), //用户的openid
				"addressIp": addressIp //当前设备的ip地址
			},
			"success": function(json) {
				out_trade_no = json.out_trade_no;
				getSign(json);

				//onBridgeReady();

				WeixinJSBridge.invoke(
					'getBrandWCPayRequest', {
						"appId": json.appid, //公众号名称，由商户传入     
						"timeStamp": t, //时间戳，自1970年以来的秒数     
						"nonceStr": json.nonce_str, //随机串     
						"package": "prepay_id=" + json.prepay_id,
						"signType": "MD5", //微信签名方式：   

						"paySign": twosign //微信签名 
					},
					function(res) {

						//							alert(JSON.stringify(res));
						if(res.err_msg == "get_brand_wcpay_request:ok") { //成功
							successOffer();
						} else { //失败
							layer.open({
								content: "付款失败",
								skin: 'msg',
								time: 5 //2秒后自动关闭
							})
						}
					});

			},
			"error": function() {
				console.log("出错了");
			}
		});

	}
	if(typeof WeixinJSBridge == "undefined") {
		if(document.addEventListener) {
			document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
		} else if(document.attachEvent) {
			document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
			document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
		}
	} else {
		onBridgeReady();
	}

	function get_client_ip() {
		$cip = "unknown";
		if($_SERVER['REMOTE_ADDR']) {
			$cip = $_SERVER['REMOTE_ADDR'];

		} else if(getenv("REMOTE_ADDR")) {
			$cip = getenv("REMOTE_ADDR");
		}
		return $cip;

	}

	function getSign(json) { //获取二次签名
		var str = "appId=" + json.appid + "&nonceStr=" + json.nonce_str + "&package=prepay_id=" + json.prepay_id + "&signType=MD5&timeStamp=" + t + "&key=38d59457da75037ce7e5c1999143a3e4";
		console.log(str);
		twosign = $.md5(str).toUpperCase();
		console.log(twosign);
	}
}

//出价成功之后调出价接口
function successOffer() {
	var topAmount = $("#topAmount").html();
	var DATA = new Object();
	DATA.userId = getUserData("id");
	DATA.amount = topAmount;
	DATA.payPwd = getUserData("payPwd");
	DATA.houseId = auctionListId;
	getWebData("landlord", "signUpHouse", METHOD_POST, DATA, function(data) {
		if(data.code == 200) {
			layer.open({
				content: "出价成功",
				skin: 'msg',
				time: 5 //2秒后自动关闭
			})
			document.getElementById("offerRecord").click();
		} else {
			layer.open({
				content: data.code + data.msg,
				skin: 'msg',
				time: 5 //2秒后自动关闭
			})
		}
	});
}
//取消按钮
function offerCancel() {
	$("#offer").css('display', 'none');
}