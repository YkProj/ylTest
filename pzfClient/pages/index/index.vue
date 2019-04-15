<template>
	<view>
		<view class="navBarAll">
			<view class="navBarLeft">
				<span class="indexLogo">
					<img src="../../static/index/homeIndexLogo.png" alt="">
				</span>
				<view class="city">
					<text>{{city}}</text>
					<text class="iconfont icon-xiala"></text>
				</view>
			</view>
			<view class="navBarRight">
				<text>{{house}}</text>
				<text class="iconfont icon-caidan"></text>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from '../../components/uni-nav-bar.vue'
	import uniIcon from '../../components/uni-icon.vue'
	export default {
		components: {
			uniNavBar,
			uniIcon
		},
		data() {
			return {
				city: '深圳',
				house:'住宅'
			}
		},
		onLoad() {

		},
		methods: {
			
		},
		onPullDownRefresh() {
			console.log('onPullDownRefresh')
			setTimeout(function() {
				uni.stopPullDownRefresh()
				console.log('stopPullDownRefresh')
			}, 1000)
		}
	}
</script>

<style>
	@import url("../index/index.css");
	text{
		color: #fff;
	}
	.city {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 100%;
		margin-left:8px;
	}
	.uni-navbar-header-btns{
		width: 100px;
	}
</style>
