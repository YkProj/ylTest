function login() {
	
	
	var DATA = new Object();
	

	getWebData(URL_USER, METHOD_GET, DATA, function(data) {
		if(data.boolResult) {
			$("#phoneNumber").empty();
		}
		
	});
}