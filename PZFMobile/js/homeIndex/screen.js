var areaLeftId;

var homeIndexSearch = document.getElementById('homeIndexSearch');
var clickBtn = document.getElementsByClassName('.mui-search');
homeIndexSearch.addEventListener('keydown', function(e) {
	if(e.keyCode == 13) {
		var keyWord = $("#homeIndexSearch").val();
		$("#bottomBar").css('display','block')
		$("#list").empty();
		getData(1)
	}
}, false);
var cpLock = false;
$('#homeIndexSearch').on('compositionstart', function() {
	cpLock = true;
	console.log("不搜索")
});
$('#homeIndexSearch').on('compositionend', function() {
	cpLock = false;
	console.log("汉字搜索");
	var keyWord = $("#homeIndexSearch").val();
	$("#bottomBar").css('display','block')
	$("#list").empty();
	getData(1);
});
$('#homeIndexSearch').on('input', function() {
	setTimeout(function(){
		if(!cpLock) {
		console.log("字母搜索")
		var keyWord = $("#homeIndexSearch").val();
		getData(1);
	}
	},500)
});



function moreWrapControl() {
	$("#moreWrap").toggle(); //更多
	$("#ApartmentWrap").css('display', 'none');
	$("#areaWrap").css('display', 'none');
	$("#startingPriceWrap").css('display', 'none');
	$("#selectWrap").css('display', 'none');
	getWebData("screen", "screenAreaType", METHOD_GET, '', function(data) {
		if(data.code == 200) {
			var area = data.data;
			const areaItem = area[i];
			$("#areaBtn").empty();
			var lihtml = '';
			for(var i = 0; i < area.length; i++) {
				localStorage.setItem(`button${i}`, JSON.stringify(area[i]));
				if(area[i].areaLower == "-") {
					lihtml += '<button type="button" class="mui-btn-grey" value="' + area[i] + '" id="' + area[i].id + '">' + area[i].areaUpper + "以下" + '</button>';
				} else if(area[i].areaLower !== "-" && area[i].areaUpper !== "-") {
					lihtml += '<button type="button" class="mui-btn-grey" value="' + area[i] + '" id="' + area[i].id + '">' + area[i].areaLower + "-" + area[i].areaUpper + "元" + '</button>';
				} else if(area[i].areaUpper == "-") {
					lihtml += '<button type="button" class="mui-btn-grey" value="' + area[i] + '" id="' + area[i].id + '">' + area[i].areaLower + "以上" + '</button>';
				}
			}
			$("#areaBtn").append(lihtml)
		}
	})

	mui('#moreWrap').on('tap', '#resetBtn', function() {
		$("#moreWrap button").removeClass("mui-active");
	});
	var sceenAreaLower;
	var sceenAreaUpper;
	mui('#areaBtn').on('tap', 'button', function() { //获取面积的值
		$(this).addClass("mui-active");
		const areaData = localStorage.getItem(`button${this.id-1}`);
		const areaMore = JSON.parse(areaData);
		sceenAreaLower = areaMore.areaLower;
		sceenAreaUpper = areaMore.areaUpper;
	});
	var sceenDecorationType;
	mui('#decorationType').on('tap', 'button', function() { //获取装修类型的值
		$(this).addClass("mui-active");
		var decorationTypeValue = $(this).attr("value"); // $(this)表示获取当前被点击元素的value值
		sceenDecorationType = decorationTypeValue;
	})
	var sceenRantType;
	mui('#rantType').on('tap', 'button', function() { //获取出租类型的值
		$(this).addClass("mui-active");
		var rantTypeValue = $(this).attr("value"); // $(this)表示获取当前被点击元素的value值
		sceenRantType = rantTypeValue;
	})
	mui('#moreWrap').on('tap', '#okBtn', function() {
		homeAreaLower = sceenAreaLower;
		homeAreaUpper = sceenAreaUpper;
		homeDecorationType = sceenDecorationType;
		homerantType = sceenRantType;
		$("#list").empty();
		getData(1);
		$("#moreWrap").css('display', 'none');
	});
}

function ApartmentWrapControl() {
	$("#ApartmentWrap").toggle(); //户型
	$("#moreWrap").css('display', 'none');
	$("#areaWrap").css('display', 'none');
	$("#startingPriceWrap").css('display', 'none');
	$("#selectWrap").css('display', 'none');
	getWebData("screen", "screenRoomType", METHOD_GET, '', function(data) {
		if(data.code == 200) {
			var Apartment = data.data;
			const startPriceItem = Apartment[i];
			$("#ApartmentBtn").empty();
			var lihtml = '';
			for(var i = 0; i < Apartment.length; i++) {
				localStorage.setItem(`button${i}`, JSON.stringify(Apartment[i]));
				lihtml += '<button type="button" class="mui-btn-grey" value="' + Apartment[i] + '" id="' + Apartment[i].id + '">' + Apartment[i].bedroomNum + "室" + Apartment[i].hallNum + "厅" + '</button>';
			}
			$("#ApartmentBtn").append(lihtml)
		}
	})
	mui('#ApartmentWrap').on('tap', 'button', function() {
		$("#ApartmentWrap").css('display', 'none');
		$("#ApartmentWrapInfo").html(this.innerHTML);
		const apartmentData = localStorage.getItem(`button${this.id-1}`);
		const apart = JSON.parse(apartmentData);
		homeIndexBedroomNum = apart.bedroomNum;
		homeIndexBedroomNum = apart.hallNum;
		$("#list").empty();
		getData(1); 
	});
}

function areaWrapControl() {
	$("#areaWrap").toggle(); //地区
	$("#moreWrap").css('display', 'none');
	$("#ApartmentWrap").css('display', 'none');
	$("#startingPriceWrap").css('display', 'none');
	$("#selectWrap").css('display', 'none');

	var DATA = new Object();
	DATA.cityId = 1;
	getWebData("screen", "screenDistrict", METHOD_GET, DATA, function(data) {
		if(data.code == 200) {
			var areaData = data.data;
			var areaLength = areaData.length;
			$("#areaLeft").empty();
			var lihtml = '';
			for(var i = 0; i < areaLength; i++) {
				lihtml += `<div class="mui-table-view-cell" id=${areaLeftId} onclick="leftChild(${areaData[i].id});">`;
				lihtml += '<span>' + areaData[i].districtName + '</span>';
				lihtml += '</div>';
				localStorage.setItem(`currentArea${areaData[i].id}`, areaData[i].districtName);
			}
			$("#areaLeft").append(lihtml);
			leftChild(1);
			$("#areaLeft").children(":first").addClass("leftActive");
			$("#areaLeft").children().click(function() {
				$(this).addClass("leftActive").siblings().removeClass("leftActive");
			})
		}
	});
}

function leftChild(areaLeftId) {
	var DATA = new Object();
	DATA.districtId = areaLeftId;
	getWebData("screen", "screenPlace", METHOD_GET, DATA, function(data) {
		if(data.code == 200) {
			var countryData = data.data;
			var countryDataLength = countryData.length;
			$("#areaRight").empty();
			var lihtml = '';
			for(var i = 0; i < countryDataLength; i++) {
				lihtml += '<div class="mui-table-view-cell" id="' + countryData[i].id + '">';
				lihtml += '<span>' + countryData[i].placeName + '</span>';
				lihtml += '</div>';
			}
			$("#areaRight").append(lihtml);
			$("#areaRight").children().click(function() {
				$("#endArea").html(this.innerHTML);
				area = localStorage.getItem(`currentArea${areaLeftId}`);
				$("#list").empty();
				getData(1);
				$("#areaWrap").css('display', 'none');
			})
		}
	});

}

function startingPriceWrapControl() {
	$("#startingPriceWrap").toggle(); //起拍价
	$("#moreWrap").css('display', 'none');
	$("#ApartmentWrap").css('display', 'none');
	$("#areaWrap").css('display', 'none');
	$("#selectWrap").css('display', 'none');

	getWebData("screen", "screenPriceInterval", METHOD_GET, '', function(data) {
		if(data.code == 200) {
			var startingPrice = data.data;
			$("#startingPriceBtn").empty();
			var lihtml = '';
			for(var i = 0; i < startingPrice.length; i++) {
				localStorage.setItem(`button${i}`, JSON.stringify(startingPrice[i]));
				const startPriceItem = startingPrice[i];
				if(startingPrice[i].priceLower == "-") {
					lihtml += `<button type="button" class="mui-btn-grey" value="${startingPrice[i]}" id=${startingPrice[i].id}>${startingPrice[i].priceUpper}以下</button>`;
				} else if(startingPrice[i].priceLower !== "-" && startingPrice[i].priceUpper !== "-") {
					lihtml += '<button type="button" class="mui-btn-grey" value="' + startingPrice[i] + '" id="' + startingPrice[i].id + '">' + startingPrice[i].priceLower + "-" + startingPrice[i].priceUpper + "元" + '</button>';
				} else if(startingPrice[i].priceUpper == "-") {
					lihtml += '<button type="button" class="mui-btn-grey" value="' + startingPrice[i] + '" id="' + startingPrice[i].id + '">' + startingPrice[i].priceLower + "以上" + '</button>';
				}
			}
			$("#startingPriceBtn").append(lihtml)
		}
	})
	mui('#startingPriceWrap').on('tap', 'button', function(e) {
		$("#startingPriceWrap").css('display', 'none');
		$("#startingPriceWrapInfo").html(this.innerHTML);
		const startingPrice = localStorage.getItem(`button${this.id-1}`);
		const st = JSON.parse(startingPrice);
		homIndexPriceLower = st.priceLower;
		homeIndexPriceUpper = st.priceUpper;
		$("#list").empty();
		getData(1); 
	});

}

function selectWrapControl() { //租住宅
	$("#selectWrap").toggle();
	$("#moreWrap").css('display', 'none');
	$("#ApartmentWrap").css('display', 'none');
	$("#areaWrap").css('display', 'none');
	$("#startingPriceWrap").css('display', 'none');
	mui('#selectWrap').on('tap', 'a', function() {
		$("#selectWrap").css('display', 'none');
		$("#selectWrapInfo").html($(this).text());
	});
}