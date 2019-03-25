function ajaxFile(file, callback) {
	mui.ajax({
		//请求方式为get  
		type: 'get',
		url: file,
		//返回数据格式为json  
		dataType: "text",
		//请求成功完成后要执行的方法  
		success: function(data) {
			//			console.log("file:" + data);
			callback(data);
		},
		error: function(xhr, type, errorThrown) {
			console.log(xhr.status);
			console.log(xhr.readyState);
			//异常处理；
			console.log(type);
		}
	});
}

//日期
function DateFormatter(value) {
	if(value == undefined||value==''||value==null) {
		return "";
	}
	/*json格式时间转js时间格式*/
	value = value.substr(1, value.length - 2);
	var obj = eval('(' + "{Date: new " + value + "}" + ')');
	var dateValue = obj["Date"];
	if(dateValue.getFullYear() < 1900) {
		return "";
	}

	return dateValue.toLocaleDateString();
}

//日期包含时分秒
function DateTimeFormatter(value) {
	if(value == undefined||value==''||value==null) {
		return "";
	}
	/*json格式时间转js时间格式*/
	value = value.substr(1, value.length - 2);
	var obj = eval('(' + "{Date: new " + value + "}" + ')');
	var dateValue = obj["Date"];
	if(dateValue.getFullYear() < 1900) {
		return "";
	}

	//	return dateValue.toLocaleString();
	return dateValue.toLocaleString('chinese', {
		hour12: false
	});
}

//毫秒转化成 时分秒
function mSecondToMinute(time) {
	if(time < 0) {
		return '00:00';
	}
	//转成秒
	time = time / 1000;
	var m = Math.floor((time / 60 % 60));
	var s = Math.floor((time % 60));
	if(m < 10) {
		m = '0' + m;
	}

	if(s < 10) {
		s = '0' + s;
	}
	return result = m + ':' + s;
}

//毫秒转化成天时分秒
function getTime(time) {
	if(time < 0) {
		return '0天0小时0分0秒';
	}
	//转成秒
	time = time / 1000;
	var d = Math.floor((time / 60 / 60 / 24));
	var h = Math.floor((time / 60 / 60 % 24));
	var m = Math.floor((time / 60 % 60));
	var s = Math.floor((time % 60));
	if(m < 10) {
		m = '0' + m;
	}

	if(s < 10) {
		s = '0' + s;
	}
	return result = d + '天' + h + '小时' + m + '分' + s + '秒';
}

//使数字1111111变成11,111,111方法
//function formatNum(str) {
//	var newStr = "";
//	var count = 0;
//
//	str+='.00';
//	if(str.indexOf(".") == -1) {
//		for(var i = str.length - 1; i >= 0; i--) {
//			if(count % 3 == 0 && count != 0) {
//				newStr = str.charAt(i) + "," + newStr;
//			} else {
//				newStr = str.charAt(i) + newStr;
//			}
//			count++;
//		}
//		//str = newStr + ".00"; //自动补小数点后两位
//		str = newStr;
//		console.log(str)
//	} else {
//		for(var i = str.indexOf(".") - 1; i >= 0; i--) {
//			if(count % 3 == 0 && count != 0) {
//				newStr = str.charAt(i) + "," + newStr;
//			} else {
//				newStr = str.charAt(i) + newStr; //逐个字符相接起来
//			}
//			count++;
//		}
//		str = newStr + (str + "00").substr((str + "00").indexOf("."), 3);
//		console.log(str)
//	}
//}

//$(function(){
////	mui.onwebkitcurrentplaybacktargetiswirelesschanged
//	var screenHeight = document.documentElement.clientHeight;
//	if (screenHeight<=580) {
//		$('.chat-sty').style.height(function(appHeight){
//			appHeight -= '50px';
//		}); 
//	}
//})