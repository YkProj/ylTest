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
			<view class="navBarRight" @click="showTopPopup(0)">
				<text class="navBarTextMargin navBarTextColor" :value="houseType">{{houseType}}</text>
				<text class="iconfont icon-caidan iconfontStyle menu-style"></text>
			</view>
		</view>
		<!-- 租房类型 -->
		<uni-popup :show="showPopupTop" :type="popType" v-on:hidePopup="hidePopup">
			<view class="popup-rectangle"></view>
			<view data-v-2fcc5cca="" class="index-popup-top" style="">
				<view class="popupList" v-for="(houseTypeList,index) in houseTypeLists" :key="houseTypeList.name" @click="clickText(houseTypeList.name)">
					<text :class="houseTypeList.class"></text>
					<text>{{houseTypeList.name}}</text>
				</view>
			</view>
		</uni-popup>
		<!-- 区域 -->
		<uni-popup :show="showAreaPopup" :type="popType" v-on:hidePopup="hidePopup" :current="subNavIndex">
			<view data-v-2fcc5cca="" class="index-area-popup-top" style="">
				<view class="areaList">
					<view class="areaListLeft">
						<view class="areaLeftList" :class="[areaIndex ==index?'areaActive':'']" v-for="(areaList,index) in areaLists" @click="areaIndexData">
							<text>{{areaList.district}}</text>
						</view>
					</view>
					<view class="areaListRight" :current="areaIndex">
						<view class="areaRightList" v-for="(placeName,index) in placeNames" :key="index">
							<text>桂圆</text>
						</view>
						<view class="areaRightList">
							<text>黄贝</text>
						</view>
						<view class="areaRightList">
							<text>东门</text>
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
		<!-- 起拍价 -->
		<uni-popup :show="showPricePopup" :type="popType" v-on:hidePopup="hidePopup" :current="subNavIndex">
			<view data-v-2fcc5cca="" class="index-area-popup-top" style="">
				<view class="popupList" v-for="(houseTypeList,index) in houseTypeLists" :key="houseTypeList.name" @click="clickText(houseTypeList.name)">
					<text :class="houseTypeList.class"></text>
					<text>{{houseTypeList.name}}</text>
				</view>
			</view>
		</uni-popup>
		<!-- 户型 -->
		<uni-popup :show="showApartPopup" :type="popType" v-on:hidePopup="hidePopup" :current="subNavIndex">
			<view data-v-2fcc5cca="" class="index-area-popup-top" style="">
				<view class="popupList" v-for="(houseTypeList,index) in houseTypeLists" :key="houseTypeList.name" @click="clickText(houseTypeList.name)">
					<text :class="houseTypeList.class"></text>
					<text>{{houseTypeList.name}}</text>
				</view>
			</view>
		</uni-popup>
		<!-- 更多 -->
		<uni-popup :show="showMorePopup" :type="popType" v-on:hidePopup="hidePopup" :current="subNavIndex">
			<view data-v-2fcc5cca="" class="index-area-popup-top" style="">
				<view class="popupList" v-for="(houseTypeList,index) in houseTypeLists" :key="houseTypeList.name" @click="clickText(houseTypeList.name)">
					<text :class="houseTypeList.class"></text>
					<text>{{houseTypeList.name}}</text>
				</view>
			</view>
		</uni-popup>
		<view class="subNav" :class="{isHideSubNav:isHide}">
			<view class="subNavStyle">
				<view class="input-view">
					<uni-icon type="search" size="22" color="#666666"></uni-icon>
					<input confirm-type="search" @confirm="confirm" class="input" type="text" placeholder="位置地标" />
				</view>
				<view class="uni-flex uni-row row-margin">
					<view class="flex-item" :class="[subNavIndex==index?'active':'']" @click="showTopPopup(index+1)" v-for="(subNavList,index) in subNavLists" :key="index">
						<text class="navBarTextMargin subNavTextColor">{{subNavList.title}}</text>
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
				isHide: false,
				showPopupTop: false,
				showAreaPopup:false,
				showPricePopup: false,
				showApartPopup: false,
				showMorePopup: false,
				showLoadMore: true,
				loadMoreText: "加载中...",
				houseType:'住宅',
				subNavIndex:0,
				areaIndex:0,
				indexLists: [{
						src: 'http://192.168.1.121:8080/static/index/homIndexList.png',
						title: '桃源村 桃源村三期 次卧 朝东',
						hall: '3室2厅 约87㎡',
						position: '宝安-新安 香珠花园',
						decrationType: ['简单装修', '精装修', '豪华装修'],
						price: '￥3500元/月'
					},
					{
						src: 'http://192.168.1.121:8080/static/index/homIndexList.png',
						title: '桃源村 桃源村三期 次卧 朝东',
						hall: '3室2厅 约87㎡',
						position: '宝安-新安 香珠花园',
						decrationType: ['简单装修', '精装修', '豪华装修'],
						price: '￥3500元/月'
					},
					{
						src: 'http://192.168.1.121:8080/static/index/homIndexList.png',
						title: '桃源村 桃源村三期 次卧 朝东',
						hall: '3室2厅 约87㎡',
						position: '宝安-新安 香珠花园',
						decrationType: ['简单装修', '精装修', '豪华装修'],
						price: '￥3500元/月'
					},
					{
						src: 'http://192.168.1.121:8080/static/index/homIndexList.png',
						title: '桃源村 桃源村三期 次卧 朝东',
						hall: '3室2厅 约87㎡',
						position: '宝安-新安 香珠花园',
						decrationType: ['简单装修', '精装修', '豪华装修'],
						price: '￥3500元/月'
					}
				],
				houseTypeLists: [{
						class: 'iconfont icon-fangzu',
						name: '住宅'
					},
					{
						class: 'iconfont icon-xiezilou',
						name: '写字楼'
					},
					{
						class: 'iconfont icon--shangpu',
						name: '商铺'
					},
				],
				subNavLists:[
					{title:'区域'},
					{title:'起拍价'},
					{title:'户型'},
					{title:'更多'},
				],
				areaLists:[
					{district:'罗湖区'},
					{district:'福田区'},
					{district:'南山区'},
					{district:'宝安区'},
					{district:'龙岗区'},
					{district:'盐田区'},
					{district:'龙华区'},
					{district:'坪山区'},
					{district:'光明区'}
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
				this.showAreaPopup = false;
				this.showPricePopup = false;
				this.showApartPopup = false;
				this.showMorePopup = false;
			},
			//展示顶部 popup
			showTopPopup: function(index) {
				this.hidePopup();
				this.popType = 'top';
				if(index == 0){
					this.hidePopup();
					this.popType = 'top';
					this.showPopupTop = true;
					this.isHide = true;
				}else if(index == 1){
					this.hidePopup();
					this.popType = 'top';
					this.showAreaPopup = true;
					this.isHide = false;
					this.subNavIndex = 0;
				}else if(index == 2){
					this.hidePopup();
					this.popType = 'top';
					this.showPricePopup = true;
					this.isHide = false;
					this.subNavIndex = 1;
				}else if(index == 3){
					this.hidePopup();
					this.popType = 'top';
					this.showApartPopup = true;
					this.isHide = false;
					this.subNavIndex = 2;
				}else if(index == 4){
					this.hidePopup();
					this.popType = 'top';
					this.showMorePopup = true;
					this.isHide = false;
					this.subNavIndex = 3;
				}
				
			},
			clickText: function(e) {
				console.log(e);
				this.houseType = e;
				this.showPopupTop = false;
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
