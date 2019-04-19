<template>
	<view>
		<view class="wrapFixed">
			<view class="wrapMargin">
				<view class="page-section swiper">
					<view class="page-section-spacing">
						<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
							<swiper-item v-for="sliderPic in sliderPics">
								<view class="swiper-item">
									<image :src="sliderPic.imgUrl"></image>
								</view>
							</swiper-item>
						</swiper>
					</view>
				</view>
				<view class="uni-swiper-msg swiper-msg-align-item">
					<view class="uni-swiper-msg-icon">
						<text class="iconfont icon-tongzhi auctionAllSize"></text>
					</view>
					<swiper vertical="true" autoplay="true" circular="true" interval="3000">
						<swiper-item v-for="(item, index) in msg" :key="index" class="swiper-item-color">
							<navigator>{{item}}</navigator>
						</swiper-item>
					</swiper>
				</view>
				<view class="auctionHallSearch">
					<view class="auctionHallSearchLeft">
						<view class="input-view auction-input-view">
							<uni-icon type="search" size="22" color="#666666"></uni-icon>
							<input confirm-type="search" @confirm="confirm" class="input" type="text" placeholder="位置地标" />
						</view>
					</view>
					<view class="auctionHallSearchRight auctionHallSearchStyle">
						<text class="iconfont icon-shaixuan"></text>
						<text>筛选</text>
					</view>
				</view>
			</view>
		</view>
		<view style="height: 229px"></view>
		<view class="wrapMargin auctionHallWrap">
			<view v-for="auctionList in auctionLists" class="indexList auctionHallList">
				<view class="indexListLeft indexListLogo">
					<image src="../../static/index/homIndexList.png" mode=""></image>
				</view>
				<view class="indexListRight auctionHallListRight">
					<view class="indexListTitle auctionTitle">
						<h3>{{auctionList.title}}</h3>
					</view>
					<view class="indexListHouseHall">
						<view class="auctionBottom">
							<text>{{endTime}}</text>
							<uni-countdown :timer="timer1" class="countDownDisplay"></uni-countdown>
						</view>
					</view>
					<view class="auctionHallListRightDescribe">
						<span>{{currentPrice}}</span>
						<span>{{auctionList.price}}</span>
						<span class="offerBtn">
							<span class="offerStyle">{{auctionList.offerNum}}</span>
						</span>
					</view>
				</view>
			</view>
			<view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from '../../components/uni-nav-bar.vue'
	import uniIcon from '../../components/uni-icon.vue'
	import uniLoad from '../../components/uni-load-more.vue'
	import uniCountdown from '../../components/uni-countdown.vue'
	export default {
		components: {
			uniNavBar,
			uniIcon,
			uniLoad,
			uniCountdown
		},
		data() {
			var dateObj = new Date();
			var currentTime = dateObj.getTime();
			var timer1 = this.formatDateTime((currentTime + 1000 * 2000));
			return {
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				showLoadMore: true,
				loadMoreText: "加载中...",
				timer1: timer1,
				endTime:"距结束:",
				currentPrice:"当前价:",
				sliderPics: [{
						imgUrl: 'http://192.168.1.198:8080/static/auctionHall/auctionHallBanner.png'
					},
					{
						imgUrl: 'http://192.168.1.198:8080/static/auctionHall/shuijiao.jpg'
					},
					{
						imgUrl: 'http://192.168.1.198:8080/static/auctionHall/auctionHallBanner.png'
					},
				],
				msg: [
					'通知公告',
					'DCloud完成B2轮融资，uni-app震撼发布',
					'36氪热文榜推荐、CSDN公号推荐 DCloud CEO文章'
				],
				auctionLists:[
					{
						title:'桃源村 桃源村三期 次卧 朝东',
						price:'￥3500元/月',
						offerNum:'100次出价'
					},
					{
						title:'桃源村 桃源村三期 次卧 朝东',
						price:'￥3500元/月',
						offerNum:'100次出价'
					},
					{
						title:'桃源村 桃源村三期 次卧 朝东',
						price:'￥3500元/月',
						offerNum:'100次出价'
					},
					{
						title:'桃源村 桃源村三期 次卧 朝东',
						price:'￥3500元/月',
						offerNum:'100次出价'
					},
					{
						title:'桃源村 桃源村三期 次卧 朝东',
						price:'￥3500元/月',
						offerNum:'100次出价'
					}
				]
			}
		},
		methods: {
			confirm() {
				uni.showToast({
					title: '搜索'
				})
			},
			formatDateTime(inputTime) { //时间戳 转 YY-mm-dd HH:ii:ss 
				var date = new Date(inputTime);
				var y = date.getFullYear();
				var m = date.getMonth() + 1;
				m = m < 10 ? ('0' + m) : m;
				var d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				var h = date.getHours();
				h = h < 10 ? ('0' + h) : h;
				var minute = date.getMinutes();
				var second = date.getSeconds();
				minute = minute < 10 ? ('0' + minute) : minute;
				second = second < 10 ? ('0' + second) : second;
				return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
			}
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
	@import url("../auctionHall/auctionHall.css");
	@import url("../index/index.css");
</style>
