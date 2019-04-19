<template>
	<view>
		<view class="navBarAll">
			<view class="navBarLeft">
				<span class="indexLogo">
					<img src="../../static/index/homeIndexLogo.png" alt="">
				</span>
				<view class="city">
					<text class="navBarTextMargin navBarTextColor">{{city}}</text>
					<text class="iconfont icon-xiala iconfontStyle"></text>
				</view>
			</view>
			<view class="navBarRight" @click="showTopPopup">
				<text class="navBarTextMargin navBarTextColor">{{houseTypeList.name}}</text>
				<text class="iconfont icon-caidan iconfontStyle menu-style"></text>
			</view>
		</view>
		<uni-popup :show="showPopupTop" :type="popType" v-on:hidePopup="hidePopup">
			<view class="popup-rectangle"></view>
			<view data-v-2fcc5cca="" class="index-popup-top" style="">
				<view class="popupList" v-for="(houseTypeList,index) in houseTypeLists" :key="index" v-model="houseTypeList.name">
					<text :class="houseTypeList.class"></text>
					<text>{{houseTypeList.name}}</text>
				</view>
			</view>
		</uni-popup>
		<view class="subNav">
			<view class="subNavStyle">
				<view class="input-view">
					<uni-icon type="search" size="22" color="#666666"></uni-icon>
					<input confirm-type="search" @confirm="confirm" class="input" type="text" placeholder="位置地标" />
				</view>
				<view class="uni-flex uni-row row-margin">
					<view class="flex-item flex-item-active-color">
						<text class="navBarTextMargin subNavTextColor">区域</text>
						<text class="iconfont icon-xiala subNavColor"></text>
					</view>
					<view class="flex-item">
						<text class="navBarTextMargin subNavTextColor">起拍价</text>
						<text class="iconfont icon-xiala subNavColor"></text>
					</view>
					<view class="flex-item">
						<text class="navBarTextMargin subNavTextColor">户型</text>
						<text class="iconfont icon-xiala subNavColor"></text>
					</view>
					<view class="flex-item">
						<text class="navBarTextMargin subNavTextColor">更多</text>
						<text class="iconfont icon-xiala subNavColor"></text>
					</view>
				</view>
			</view>
		</view>
		<view style="height: 148px;"></view>
		<view class="wrapMargin">
			<view v-for="indexList in indexLists" class="indexList">
				<view class="indexListLeft indexListLogo">
					<image :src="indexList.src"></image>
				</view>
				<view class="indexListRight">
					<view class="indexListTitle">
						<h3>{{indexList.title}}</h3>
					</view>
					<view class="indexListHouseHall">{{indexList.hall}}</view>
					<view class="indexListHousePosition">
						<text class="iconfont icon-dingwei icon-dingwei-style">{{indexList.position}}</text>
						<text></text>
					</view>
					<view class="indexListHouseLabel">
						<button type="default" size="mini" class="public-btn index-btn index-btn-simple">{{indexList.decrationType[0]}}</button>
						<button type="default" size="mini" class="public-btn index-btn index-btn-fine">{{indexList.decrationType[1]}}</button>
						<button type="default" size="mini" class="public-btn index-btn index-btn-luxury">{{indexList.decrationType[2]}}</button>
					</view>
				</view>
				<view class="indexListHousePrice">{{indexList.price}}</view>
			</view>
			<view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from '../../components/uni-nav-bar.vue'
	import uniIcon from '../../components/uni-icon.vue'
	import uniLoad from '../../components/uni-load-more.vue'
	import uniPopup from '../../components/uni-popup.vue'
	export default {
		components: {
			uniNavBar,
			uniIcon,
			uniLoad,
			uniPopup
		},
		data() {
			return {
				city: '深圳',
				popType: 'middle',
				showPopupTop: false,
				showLoadMore: true,
				loadMoreText: "加载中...",
				indexLists: [{
						src: 'http://192.168.1.100:8080/static/index/homIndexList.png',
						title: '桃源村 桃源村三期 次卧 朝东',
						hall: '3室2厅 约87㎡',
						position: '宝安-新安 香珠花园',
						decrationType: ['简单装修', '精装修', '豪华装修'],
						price: '￥3500元/月'
					},
					{
						src: 'http://192.168.1.100:8080/static/index/homIndexList.png',
						title: '桃源村 桃源村三期 次卧 朝东',
						hall: '3室2厅 约87㎡',
						position: '宝安-新安 香珠花园',
						decrationType: ['简单装修', '精装修', '豪华装修'],
						price: '￥3500元/月'
					},
					{
						src: 'http://192.168.1.100:8080/static/index/homIndexList.png',
						title: '桃源村 桃源村三期 次卧 朝东',
						hall: '3室2厅 约87㎡',
						position: '宝安-新安 香珠花园',
						decrationType: ['简单装修', '精装修', '豪华装修'],
						price: '￥3500元/月'
					},
					{
						src: 'http://192.168.1.100:8080/static/index/homIndexList.png',
						title: '桃源村 桃源村三期 次卧 朝东',
						hall: '3室2厅 约87㎡',
						position: '宝安-新安 香珠花园',
						decrationType: ['简单装修', '精装修', '豪华装修'],
						price: '￥3500元/月'
					}
				],
				houseTypeLists:[
					{class:'iconfont icon-fangzu',name:'住宅'},
					{class:'iconfont icon-xiezilou',name:'写字楼'},
					{class:'iconfont icon--shangpu',name:'商铺'},
				]
			}
		},
		onLoad() {

		},
		methods: {
			confirm() {
				uni.showToast({
					title: '搜索'
				})
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
			clickText:function(e){
				console.log(e)
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
	@import url("../index/index.css");
</style>
