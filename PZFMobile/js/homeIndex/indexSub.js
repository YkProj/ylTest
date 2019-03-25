//经纬度变量
var Lantitude = "";
var Longitude = "";
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
const HomeIndexListId = localStorage.getItem('homeIndexListID');
console.log(HomeIndexListId)
indexInit(HomeIndexListId);
//轮播图显示总页数和当前页数js代码

document.querySelector('.mui-slider').addEventListener('slide', function(event) {　
	var current_num = event.detail.slideNumber + 1;　
	$("#indexSubNumber").html(current_num);
}, {
	passive: true
});

function indexInit(HomeIndexListId) {
	var HouseId = HomeIndexListId;
	var DATA = new Object();
	DATA.houseId = HouseId;
	getWebData("landlord", "houseInfDetail", METHOD_GET, DATA, function(data) {
		if(data.code == 200) {
			var indexDetailData = data.data;
			indexDetailTitle = indexDetailData.house.title;
			$("#header").append(indexDetailTitle)
			localStorage.setItem('NavBarTitle', indexDetailTitle);
			var indexSubHouse = indexDetailData.house;
			Lantitude = indexSubHouse.lantitude;
			Longitude = indexSubHouse.longitude;
			var indexDetailDataSliderImg = indexDetailData.loopImg;
			var indexDetailDataSliderImgLength = indexDetailDataSliderImg.length;
			var indexSubDectractionName = "";
			var imgHtml = '';
			if(indexDetailDataSliderImg.length > 0) {
				$("#sliderImgGroup").empty();
				for(var i = 0; i < indexDetailDataSliderImg.length; i++) {
					imgHtml += '<div class="mui-slider-item">';
					imgHtml += '<a href="#">';
					imgHtml += '<img class="bannerimg" src="' + indexDetailDataSliderImg[i] + '" data-preview-src="" data-preview-group="1" />';
					imgHtml += '</a>';
					imgHtml += '</div>';
				}
				$("#sliderImgGroup").append(imgHtml);
				$("#indexSubNumberCount").html(indexDetailDataSliderImgLength);
			}
			$("#indexSubH5").html(indexDetailTitle);
			$("#indexSubDetailTitleContentLeftPrice").html("￥" + indexSubHouse.staringPrice + "/月");
			$("#indexSubTitleTime").html(indexSubHouse.createTime);
			$("#indexSubApartment").html(indexSubHouse.bedroomNum + "室" + indexSubHouse.hallNum + "厅" + indexSubHouse.toiletNum + "卫");
			if(indexSubHouse.decorationType == 1) {
				indexSubDectractionName = "毛坯"
			} else if(indexSubHouse.decorationType == 2) {
				indexSubDectractionName = "简单装修"
			} else if(indexSubHouse.decorationType == 3) {
				indexSubDectractionName = "精装修"
			} else if(indexSubHouse.decorationType == 4) {
				indexSubDectractionName = "豪华装修"
			} else {
				indexSubDectractionName = "其他"
			}
			$("#indexSubDectraction").html(indexSubDectractionName);
			$("#indexSubarea").html(indexSubHouse.area + "平米");
			$("#indexSubFloor").html(indexSubHouse.floor + "楼");
			$("#indexSubSeeTime").html(indexSubHouse.visitStarTime + "至" + indexSubHouse.visitEndTime);
			$("#indexSubSignTime").html("截止" + indexSubHouse.endTime);
			var indexSubHeadImg = indexDetailData.headImgUrl;
			if(indexSubHeadImg.length > 0) {
				$("#signEdUp").html("已报名" + indexDetailData.AuctionNum + "人")
				$("#indexSubHeadImg").empty();
				var headImgLiHtml = "";
				for(var i = 0; i < indexSubHeadImg.length; i++) {
					headImgLiHtml += '<span>';
					headImgLiHtml += '<img src="' + indexSubHeadImg[i] + '" />';
					headImgLiHtml += '</span>';
				}
				$("#indexSubHeadImg").append(headImgLiHtml);
			} else {
				$("#HiddenHeadImg").css('display', 'none');
			}

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
			var supFacilities = indexSubHouse.supFacilities.split(",");
			if(supFacilities.length > 0) {
				var supFacilitiesHtml = '';
				for(var i = 0; i < supFacilities.length; i++) {
					const supFacilitie = supFacilities[i];
					if(supFacilitie) {
						$(`.${icons[supFacilitie]}`).addClass("spanActive");
					}
				}
			}
			if(indexSubHouse.address == null) {
				$("#indexSubArea").html("小区:   " + "(" + indexSubHouse.district + "," + indexSubHouse.district + indexSubHouse.place + ")");
			} else {
				$("#indexSubArea").html("小区:   " + indexSubHouse.address + "(" + indexSubHouse.district + "," + indexSubHouse.district + indexSubHouse.place + ")");
			}
			map(Longitude, Lantitude, indexDetailTitle, indexSubHouse.district);
			$("#indexSubHoseDescribe").html(indexSubHouse.description);
		}
	});

};
//地图
function map(Longitude, Lantitude, homeIndextSubTitle, homeIndexSubArea) {
	var indexTitleSub = homeIndextSubTitle.substr(0,18)+"...";
	var longitude =Longitude;
	var Lantitude =Lantitude;
	var map = new BMap.Map("allmap"); //创建地图实例
	var point = new BMap.Point(Longitude, Lantitude);
	map.centerAndZoom(point, 13); //初始化地图设置中心点坐标和地图级别
	var marker = new BMap.Marker(point); // 创建标注
	map.addOverlay(marker); // 将标注添加到地图中
	var latCurrent = "";
	var lngCurrent = "";
	
//	var geolocation = new BMap.Geolocation();
//  geolocation.getCurrentPosition(function(r){console.log(r.point)
//      if(this.getStatus() == BMAP_STATUS_SUCCESS){
//          var mk = new BMap.Marker(r.point);
//          map.addOverlay(mk);//标出所在地
//          map.panTo(r.point);//地图中心移动
//            alert('您的位置：'+r.point.lng+','+r.point.lat);
//          latCurrent = r.point.lat;
//          lngCurrent = r.point.lng;
//          var point = new BMap.Point(r.point.lng,r.point.lat);//用所定位的经纬度查找所在地省市街道等信息
//          var gc = new BMap.Geocoder();
//          gc.getLocation(point, function(rs){
//             var addComp = rs.addressComponents; console.log(rs.address);//地址信息
//             alert(rs.address);//弹出所在地址
//
//          });
//      }else {
//          alert('failed'+this.getStatus());
//      }        
//  },{enableHighAccuracy: true})
    
    
	var opts = {
		width: 120, // 信息窗口宽度
		height: 65, // 信息窗口高度
		title: indexTitleSub, // 信息窗口标题
	}
	var baiduApp = '<a href="http://api.map.baidu.com/marker?location=latCurrent,lngCurrent|name:我的位置&destination=latlng:116.404，39.915|name:目的地&title=所在位置名称&content=所在位置的简介（可选）&output=html">打开百度地图查看详情</a>';
	var infoWindow = new BMap.InfoWindow(baiduApp, opts); // 创建信息窗口对象 
	marker.addEventListener("click", function() {
		map.openInfoWindow(infoWindow, point); //开启信息窗口
	});

}

//点击收藏
function indexFavour() {
	var DATA = new Object();
	DATA.userId = 1;
	DATA.houseId = HomeIndexListId;
	getWebData("landlord", "collectionHouse", METHOD_POST, DATA, function(data) {
		if(data.code == 200) {
			layer.open({
				content: "收藏成功",
				skin: 'msg',
				time: 5 //2秒后自动关闭
			})
			setTimeout(function() {
				mui.openWindow({
					url: '../myIndex/myCollection.html'
				});
			}, 1500)
		} else {
			layer.open({
				content: data.code + data.msg,
				skin: 'msg',
				time: 2 //2秒后自动关闭
			});
		}
	});
}