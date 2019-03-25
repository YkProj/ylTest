function checkMobile(mobile_number) {
	/**
	 * <summary>验证手机号码合法性的函数</summary>
	 * <param name="mobile_number" type="String">手机号码</param> 
	 */
	/**
	 * <summary>验证手机号码合法性的函数</summary>
	 * <param name="mobile_number" type="String">手机号码</param> 
	 */
	var sMobile = mobile_number;
	if(!(/^1[3|4|5|7|8][0-9]\d{8}$/.test(sMobile))) {
		//alert("不是完整的11位手机号或者正确的手机号前七位");  
		return false;
	} else {
		return true;
	}
}