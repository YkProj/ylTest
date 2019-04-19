<template>
	<view>
		<view class="banner">
			<view class="userLogo">
				<image src="../../static/myIndex/registered.png" mode=""></image>
				<text>包小图</text>
			</view>
		</view>
		<view style="height: 114px;"></view>
		<view class="wrapMargin myIndexWrap">
			<view class="uni-card myIndexCard">
				<view class="uni-list myIndexList">
					<view class="uni-list-cell myIndexListCell" hover-class="uni-list-cell-hover">
						<view class="myIndexImage">
							<image src="../../static/myIndex/myWallet.png" mode=""></image>
						</view>
						<view class="uni-list-cell-navigate uni-navigate-right uni-navigate-badge clear-padding">
							我的钱包
							<uni-badge text="123" type="success"></uni-badge>
						</view>
					</view>
					<view class="uni-list-cell myIndexListCell" hover-class="uni-list-cell-hover">
						<view class="myIndexImage">
							<image src="../../static/myIndex/MessageNotification.png" mode=""></image>
						</view>
						<view class="uni-list-cell-navigate uni-navigate-right uni-navigate-badge clear-padding">
							消息通知
							<uni-badge text="123" type="success"></uni-badge>
						</view>
					</view>
					<view class="uni-list-cell myIndexListCell" hover-class="uni-list-cell-hover">
						<view class="myIndexImage">
							<image src="../../static/myIndex/PersonalSettings.png" mode=""></image>
						</view>
						<view class="uni-list-cell-navigate uni-navigate-right uni-navigate-badge clear-padding">
							个人设置
						</view>
					</view>
					<view class="uni-list-cell myIndexListCell" hover-class="uni-list-cell-hover">
						<view class="myIndexImage">
							<image src="../../static/myIndex/EntryRecord.png" mode=""></image>
						</view>
						<view class="uni-list-cell-navigate uni-navigate-right uni-navigate-badge clear-padding">
							报名记录
						</view>
					</view>
					<view class="uni-list-cell myIndexListCell" hover-class="uni-list-cell-hover">
						<view class="myIndexImage">
							<image src="../../static/myIndex/MyCollection.png" mode=""></image>
						</view>
						<view class="uni-list-cell-navigate uni-navigate-right uni-navigate-badge clear-padding">
							我的收藏
						</view>
					</view>
					<view class="uni-list-cell myIndexListCell" hover-class="uni-list-cell-hover">
						<view class="myIndexImage">
							<image src="../../static/myIndex/MyInvitation.png" mode=""></image>
						</view>
						<view class="uni-list-cell-navigate uni-navigate-right uni-navigate-badge clear-padding">
							我的邀请
						</view>
					</view>
					<view class="uni-list-cell myIndexListCell" hover-class="uni-list-cell-hover">
						<view class="myIndexImage">
							<image src="../../static/myIndex/landlord.png" mode=""></image>
						</view>
						<view class="uni-list-cell-navigate uni-navigate-right uni-navigate-badge clear-padding">
							我是房东
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniBadge from '../../components/uni-badge.vue'
	export default {
		components: {
			uniBadge
		},
		data() {
			return {
				
			}
		},
		methods: {

		}
	}
</script>

<style>
	@import url("../myIndex/myIndex.css");
</style>
