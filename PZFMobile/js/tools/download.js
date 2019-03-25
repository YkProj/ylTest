//初始化下载对象
var dtask = null;

function createDownload(url, filename) {
	if(null == filename || filename.length < 1) {
		var index = url.lastIndexOf("/") + 1;
		filename = url.substring(index);
	} else {}
	//判断文件是否已经下载
	plus.io.resolveLocalFileSystemURL(
		filename,
		function(entry) {
			if(entry.isFile) {
				//				mui.toast('已经下载');
				layer.open({
					content: '已经下载',
					skin: 'msg',
					time: 2 //2秒后自动关闭
				});
			}
		},
		function(e) {
			dBase(url);
		}
	);
}

function dBase(url) {
	if(dtask) {
		//		mui.toast('下载任务已经存在');
		layer.open({
			content: '下载任务已经存在',
			skin: 'msg',
			time: 2 //2秒后自动关闭
		});
		return;
	}
	dtask = plus.downloader.createDownload(url, {
			method: "GET"
		},
		//下载完成执行的回调函数
		function(d, status) {
			//mui.toast(d.filename);
		}
	);

	var progresstemp;
	dtask.addEventListener("statechanged", function(task, status) {
		if(!dtask) {
			return;
		}
		switch(task.state) {
			case 1: // 开始
				//				mui.toast("开始下载...");
				layer.open({
					content: '开始下载...',
					skin: 'msg',
					time: 2 //2秒后自动关闭
				});
				break;
			case 2: // 已连接到服务器
				//				mui.toast("连接到服务器...");
				layer.open({
					content: '连接到服务器...',
					skin: 'msg',
					time: 2 //2秒后自动关闭
				});
				mui('body').progressbar({
					progress: 0
				}).show();
				break;
			case 3: // 已接收到数据
				var progressVal = (task.downloadedSize / task.totalSize) * 100;
				progressVal = parseInt(progressVal);
				if(progressVal !== progresstemp) {
					progresstemp = progressVal;
					mui('body').progressbar().setProgress(progressVal);
					if(progresstemp == 15) {
						//						mui.toast("正在下载");
						layer.open({
							content: '正在下载',
							skin: 'msg',
							time: 2 //2秒后自动关闭
						});
					}
					if(progresstemp == 35) {
						//						mui.toast('下载需要一段时间，请耐心等待');
						layer.open({
							content: '下载需要一段时间，请耐心等待',
							skin: 'msg',
							time: 2 //2秒后自动关闭
						});
					}

				}
				break;
			case 4: // 下载完成
				mui('body').progressbar().hide();
				var path = dtask.filename + "";
				//以.apk结尾的文件
				var index = path.indexOf('.apk') + (".apk".length);
				if(index != -1 && (index == path.length)) {
					plus.runtime.install(dtask.filename);
				}
				break;
		}
	});
	dtask.start();
}

function cDownload() {
	if(!dtask) {
//		mui.toast('请先开始下载');
		layer.open({
			content: '请先开始下载',
			skin: 'msg',
			time: 2 //2秒后自动关闭
		});
		return;
	}
	dtask.abort();
	dtask = null;
}

function checkUpdate(deep) {
	//获取本地的配置文件
	mui.getJSON("../../../manifest.json", null, function(data) {
		var localversion = 'V' + data.version.name;
		$('#version_name').text(localversion);
	});

	if(plus.os.name == "Android") {
		androidUpdate(deep);
	}
}

//更新安卓下载文件
function androidUpdate(deep) {
	mui.ajax({
		//请求方式为get  
		type: 'GET',
		//json文件位置  
		url: URL_VERSION,
		//返回数据格式为json  
		dataType: "json",
		//请求成功完成后要执行的方法  
		success: function(data) {
			var netVersion = data.version;
			var netName = data.versioname;
			var downUrl = data.url;
			var filename = data.filename;
			var isForce = data.isforce;

			var sum = data.updatesum;
			//var title = data.title;
			console.log("更新信息：" + JSON.stringify(data));

			var relative = '';
			if(deep == 2) {
				relative = "../../";
			} else if(deep == 3) {
				relative = "../../../";
			} else {
				relative = "../";
			}

			//获取本地的配置文件
			mui.getJSON(relative + "manifest.json", null, function(data) {
				var localversion = data.version.code;
				console.log("版本: " + localversion + ", net:" + netVersion);
				if((Number(localversion) < Number(netVersion) && (isForce == 1))) {
					$('#version_info').html('有更新的版本' + netName);
					$('#version_info').css('color', 'orange');
					plus.nativeUI.confirm('服务器上有更新的版本' + netName, function(event) {
						if(0 == event.index) {
							createDownload(downUrl, filename);
						}
					}, '请更新版本', ["确定更新", "取　　消"]);
				}
				if(Number(localversion) == Number(netVersion)) {
					$('#version_info').html('已是最新版');
					$('#version_info').css('color', 'white');
				}
			});
		},
		error: function(xhr, type, errorThrown) {
			console.log(xhr.status);
			console.log(xhr.readyState);
			//异常处理；
			console.log(type);
//			mui.toast('网络错误...');
			layer.open({
			content: '网络错误...',
			skin: 'msg',
			time: 2 //2秒后自动关闭
		});
		}
	});
}