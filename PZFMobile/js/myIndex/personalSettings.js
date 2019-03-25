function personnelPhone() {
	//获取问题列表参数对象
	var DATA = new Object();
	DATA.UserID=getUserData('UserID');

	getWebData(BIZ_NEWS, METHOD_GET, DATA, function(data) {
		if(data.boolResult) {
			$("#phoneNumber").empty();
		}
		
	});
}