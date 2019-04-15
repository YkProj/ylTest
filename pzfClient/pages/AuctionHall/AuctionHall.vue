<template>
	<view>
		<text class="title">{{title}}</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '拍卖大厅页面'
			};
		}
	}
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
	}

	.logo {
		height: 200upx;
		width: 200upx;
		margin-top: 200upx;
	}

	.title {
		font-size: 36upx;
		color: #8f8f94;
	}
</style>
