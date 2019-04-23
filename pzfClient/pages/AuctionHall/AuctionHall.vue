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
					<view class="auctionHallSearchRight auctionHallSearchStyle" @click="showTopPopup()">
						<text class="iconfont icon-shaixuan"></text>
						<text>筛选</text>
					</view>
					<!-- 筛选 -->
					<uni-popup :show="showPopupTop" :type="popType" v-on:hidePopup="hidePopup">
						<view data-v-2fcc5cca="" class="index-area-popup-top auction-popup-top" style="">
							<view class="moreList" v-for="(screenList,index) in screenLists">
								<h3>{{screenList.title}}</h3>
								<view class="moreListBtn">
									<button type="default" size="mini" class="public-btn more-btn" v-for="(screenBtn,index) in screenList.screenBtns"
									 :class="[screenIndex ==index?'screenActive':'']" :current="screenIndex" @click="screenClick(index)">{{screenBtn.title}}</button>
								</view>
							</view>
							<view class="more-two-btn">
								<button type="default" size="mini" class="public-btn index-btn reset-btn">重置</button>
								<button type="default" size="mini" class="public-btn index-btn more-ok-btn">确定</button>
							</view>
						</view>
					</uni-popup>
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
	import uniPopup from '../../components/uni-popup.vue'
	export default {
		components: {
			uniNavBar,
			uniIcon,
			uniLoad,
			uniCountdown,
			uniPopup
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
				endTime: "距结束:",
				currentPrice: "当前价:",
				showPopupTop: false,
				screenIndex: 0,
				popType: 'top',
				sliderPics: [{
						imgUrl: 'http://192.168.1.132:8081/static/auctionHall/auctionHallBanner.png'
					},
					{
						imgUrl: 'http://192.168.1.132:8081/static/auctionHall/shuijiao.jpg'
					},
					{
						imgUrl: 'http://192.168.1.132:8081/static/auctionHall/auctionHallBanner.png'
					},
				],
				msg: [
					'通知公告',
					'DCloud完成B2轮融资，uni-app震撼发布',
					'36氪热文榜推荐、CSDN公号推荐 DCloud CEO文章'
				],
				auctionLists: [{
						title: '桃源村 桃源村三期 次卧 朝东',
						price: '￥3500元/月',
						offerNum: '100次出价'
					},
					{
						title: '桃源村 桃源村三期 次卧 朝东',
						price: '￥3500元/月',
						offerNum: '100次出价'
					},
					{
						title: '桃源村 桃源村三期 次卧 朝东',
						price: '￥3500元/月',
						offerNum: '100次出价'
					},
					{
						title: '桃源村 桃源村三期 次卧 朝东',
						price: '￥3500元/月',
						offerNum: '100次出价'
					},
					{
						title: '桃源村 桃源村三期 次卧 朝东',
						price: '￥3500元/月',
						offerNum: '100次出价'
					}
				],
				screenLists: [{
						title: '类别',
						screenBtns: [{
								title: '全部'
							},
							{
								title: '我报名的'
							},
							{
								title: '我收藏的'
							}
						]
					},
					{
						title: '类型',
						screenBtns: [{
								title: '住宅'
							},
							{
								title: '写字楼'
							},
							{
								title: '商铺'
							}
						]
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
			},
			//统一的关闭popup方法
			hidePopup: function() {
				this.showPopupTop = false;
			},
			//展示顶部 popup
			showTopPopup: function() {
				this.hidePopup();
				this.popType = 'top';
				this.showPopupTop = true;
			},
			screenClick: function(index) {
				if (this.screenIndex === index) {
					return false;
				} else {
					this.screenIndex = index;
				}
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
	.moreList:nth-child(2) {
		border-bottom: 1px solid #fff;
	}

	.auction-popup-top {
		top: 229px;
	}
</style>
