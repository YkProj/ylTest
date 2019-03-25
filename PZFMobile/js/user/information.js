mui.init();

//加载界面设置内容
mui.plusReady(function() {
	if(hasLogin()) {
		//IsSetUserName
		var isSetUserName = getUserData('IsSetUserName');
		console.log(isSetUserName);
		if(isSetUserName == 'true') {
			//mui.alert('ffff');
			$('#txtUserName').attr("disabled", "disabled");
		}
		//if(getUserData('Gravatar')!='')

		$('#imgGravatarImg').attr('src', getUserData('Gravatar'));
		$('#txtUserName').val(getUserData('UserName'));
		$('#txtNickName').val(getUserData('NickName'));
	} else {
		clearData();
		saveStorageData('isLogin', false);

		//验证成功，跳转到重新登录界面
		mui.openWindow({
			url: "/htmls/user/sign-in.html"
		});
	}
});

//选择头像图片
function CheckHeadImg() {

	var a = [{
		title: "拍照"
	}, {
		title: "从手机相册选择"
	}];

	plus.nativeUI.actionSheet({
		cancel: "取消",
		buttons: a
	}, function(b) { /*actionSheet 按钮点击事件*/
		switch(b.index) {
			case 0:
				break;
			case 1:
				getImage(); /*拍照*/
				break;
			case 2:
				galleryImg(); /*打开相册*/
				break;
			default:
				break;
		}
	});
}

//点击拍摄使用照相机的方法
function getImage() {
	var cmr = plus.camera.getCamera();
	cmr.captureImage(function(p) {
		plus.io.resolveLocalFileSystemURL(p, function(entry) {
			var localurl = entry.toLocalURL(); //
			SetLoadHeadImg(localurl, 1); /*设置图片*/
		});
	}, function(s) {
		console.log("error" + s);
	});
}

// 从相册选择头像图片
function galleryImg() {
	plus.gallery.pick(function(p) {
		SetLoadHeadImg(p, 2); /*设置图片*/
	}, function(e) {
		console.log("取消选择图片");
	}, {
		filter: "image",
		multiple: false
	});
}

//上传图片,把图片加载到哦对应的控件
function SetLoadHeadImg(imgPath, checkType) {
	console.log("imgPath = " + imgPath);

	var image = new Image();
	image.src = imgPath;

	imgGravatarImg.src = imgPath;
	//imgGravatarImg.realUrl=imgPath;
	imgGravatarImg.style.width = "100px";
	imgGravatarImg.style.height = "100px";

	//装载图片数据
	image.onload = function() {
		$("#hidCheckType").val(checkType);
		$("#hidIsUpload").val(1);
		$("#hidGravatarImg").val(getBase64Image(image));
	}
}

//将图片压缩转成base64 
function getBase64Image(img) {
	var canvas = document.createElement("canvas");
	var width = img.width;
	var height = img.height;
	// calculate the width and height, constraining the proportions 
	if(width > height) {
		if(width > 100) {
			height = Math.round(height *= 100 / width);
			width = 100;
		}
	} else {
		if(height > 100) {
			width = Math.round(width *= 100 / height);
			height = 100;
		}
	}
	canvas.width = width; /*设置新的图片的宽度*/
	canvas.height = height; /*设置新的图片的长度*/
	var ctx = canvas.getContext("2d");
	ctx.drawImage(img, 0, 0, width, height); /*绘图*/
	var dataURL = canvas.toDataURL("image/jpeg", 1 || 0.8);
	return dataURL.replace("data:image/jpeg;base64,", "");
}

//提交用户修改信息
function SubmitUserInfo() {
	var userName = $('#txtUserName').val();
	if(userName == '') {
		//		mui.toast('请输入用户名');
		layer.open({
			content: '请输入用户名',
			skin: 'msg',
			time: 2 //2秒后自动关闭
		});
		return;
	}

	var nickName = $('#txtNickName').val();
	if(nickName == '') {
//		mui.toast('请输入昵称');
		layer.open({
			content: '请输入昵称',
			skin: 'msg',
			time: 2 //2秒后自动关闭
		});
		return;
	}

	//获取发布内容参数
	var DATA = new Object();
	DATA.MSGID = "1037";
	DATA.UserID = getUserData('UserID'); //创建用户ID
	DATA.UserName = userName; //发布一条消息
	DATA.NickName = nickName; //发布图片数量
	DATA.CheckType = $('#hidCheckType').val();
	DATA.IsUpload = $('#hidIsUpload').val();
	DATA.GravatarImg = $('#hidGravatarImg').val();

	getWebData(BIZ_BASE, METHOD_POST, DATA, function(data) {
		console.log("打印修改结果" + JSON.stringify(data));
		//		mui.toast(data.returnMsg);
		layer.open({
			content: data.returnMsg,
			skin: 'msg',
			time: 2 //2秒后自动关闭
		});
		//如果修改成功，退出到登录界面
		if(data.boolResult) {
			clearData();
			saveStorageData('isLogin', false);

			//验证成功，跳转到重新登录界面
			mui.openWindow({
				url: "/htmls/user/sign-in.html"
			});
		}

	});
}