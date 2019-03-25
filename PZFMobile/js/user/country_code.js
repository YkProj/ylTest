mui.init({
	beforeback: function() {
		//获得列表界面的webview
		var i = mui.currentWebview.opener();
		if(i) {
			//触发列表界面的自定义事件（refresh）,从而进行数据刷新
			i.evalJS("refreshData()");
		}
		return true;
	}
});

//静态数据加下面代码后，可以支持搜索，动态加载数据，不能搜索，动态需要在数据加载完成后增加下面代码
//mui.ready(function() {
//	var header = document.querySelector('header.mui-bar');
//	var list = document.getElementById('list');
//	//calc hieght
//	list.style.height = (document.body.offsetHeight - header.offsetHeight) + 'px';
//	//create
//	window.indexedList = new mui.IndexedList(list);
//});

function setText(countrys) {
	var countryJson = JSON.parse(countrys);
	console.log(countryJson);
}

mui.plusReady(function() {
	getCode();
});

function getCode() {
	//获取地区信息
	var DATA = new Object();
	DATA.MSGID = "999";
	var localAreaVersion = window.localStorage.getItem("AreaVersion");
	if(localAreaVersion == 'undefined' || localAreaVersion == null || localAreaVersion.length < 1) {
		localAreaVersion = 0;
		console.log('version is:' + localAreaVersion);
	}
	console.log(localAreaVersion);
	DATA.AreaVersion = localAreaVersion;
	DATA.YesGetArea = false;
	console.log('get country code');
	getWebData(BIZ_USER, METHOD_GET, DATA, function(data) {
		console.log(JSON.stringify(data));
		//如果需要获取地区，把服务器的版本号存到本地
		if(data.boolResult && data.returnData.length > 0) {
			//保存版本号到本地
			window.localStorage.setItem("AreaVersion", data.returnData[0].ServerAreaVersion);
			DATA.YesGetArea = true;
			getWebData(BIZ_USER, METHOD_GET, DATA, function(data) {
				//获取地区信息后，把地区信息替换到本地地区信息
				if(data.boolResult) {
					window.localStorage.setItem('country_code', JSON.stringify(data.returnData));
					setData(data.returnData);
				} else //如果不需要获取，加载本地地区信息
				{
					//mui.toast('获取国家代码出错');
					layer.open({
						content: '获取国家代码出错',
						skin: 'msg',
						time: 2 //2秒后自动关闭
					});
				}
			});
		} else //如果不需要获取，加载本地地区信息
		{
			var arrayObj = JSON.parse(window.localStorage.getItem('country_code'));
			setData(arrayObj);
		}
	});
}

function setData(arrayObj) {
	$.each(arrayObj, function(index, data) {
		var liStr;
		
		if(data.YesGroup)
		{
			liStr = '<li data-group="'+data.AreaLnitials+'" class="mui-table-view-divider mui-indexed-list-group goup-style">';
			liStr += data.AreaLnitials + '</li>';
		}
		else
		{
			liStr = '<li data-code="' + data.AreaCode + '" data-tags="' + data.CNName + '" data-id="' + data.AreaID + '" class="mui-table-view-cell mui-indexed-list-item">';
			liStr += data.CNName + '</li>';
		}
		
		$('#country_ul').append(liStr);
		//console.log(liStr);
	});

	var header = document.querySelector('header.mui-bar');
	var list = document.getElementById('list');
	//calc hieght
	list.style.height = (document.body.offsetHeight - header.offsetHeight) + 'px';
	//create
	window.indexedList = new mui.IndexedList(list);

	mui("#country_ul").on('tap', '.mui-table-view-cell', function() {
		window.localStorage.setItem('select_country_name', this.innerText);
		window.localStorage.setItem('select_country_code', this.getAttribute('data-code'));
		window.localStorage.setItem('select_country_id', this.getAttribute('data-id'));
		window.localStorage.setItem('select_country_tags', this.getAttribute('data-tags'));
		mui.back();
	});
}