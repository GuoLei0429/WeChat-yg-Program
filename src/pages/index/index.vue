<template>
  <div :style="{height:pageHeight ,overflow:'hidden'}">
    <!-- 自定义的搜索组件 -->
    <search @search="disableScroll"></search>
    <!-- 轮播图 -->
    <swiper class="banner" indicator-dots indicator-color='rgba(255,255,255,.6)'
     indicator-active-color="#fff" autoplay interval="3000" circular>
      <swiper-item v-for="banner in bannerList" :key="banner.goods_id">
        <a :href="'/pages/goods/main?id=' + banner.goods_id">
          <img :src="banner.image_src" alt="">
        </a>
      </swiper-item>
    </swiper>
    <!-- <button type="primary" @getuserinfo="getinfo" open-type="getUserInfo" style="margin:40rpx">获取用户授权</button> -->
    <!-- 导航 -->
    <!-- 地图 -->
    <!-- <map name="" latitude="38" longitude="116" scale="5" radius=""></map> -->

    <div class="navs">
      <a :href="navigator_url || '/pages/list/main?query=' + nav.name"
       v-for="nav in navsList" :key="nav.name" :open-type="nav.open-type || 'navigate'" >
        <img :src="nav.image_src" alt="">
      </a>
        
    </div>
        <!-- 楼层 -->
    <div class="floors">
      <div class="floor" v-for="(floor,key) in floorList" :key="key">
        <div class="title">
          <image :src="floor.floor_title.image_src"></image>
        </div>
        <div class="items">
          <image :key="product.name" v-for="product in floor.product_list" :src="product.image_src"></image>
        </div>
      </div>

    </div>
    <!-- 回到顶部 -->
    <span class="gotop" v-show="scrollTop > 200" @click="goTop"></span>
  </div>
</template>

<script>
// 引入封装的promise
import request from '@/utils/request.js'

import search from '@/components/search.vue'
export default {
  data() {
    return {
      pageHeight:'auto',
      // 轮播图数据
      bannerList:[],
      // 导航数据
      navsList:[],
      // 楼层数据
      floorList:[],
      scrollTop:0
    }
  },
  components:{
    search
  },

    // vue的生命周期和小程序的生命周期可以同时使用
    // 如果含义一致，推荐使用vue的生命周期
    // 在mpvue中使用API时，要讲命名空间改成mpvue
    // 即 wx.request → mpvue.request
  mounted() {
        this.getBannerList();
        this.getNavList();
        this.getFloorList();
    },
    // 监听用户下拉操作
    async onPullDownRefresh() {
      // console.log('有人下拉了')
      // 重新发起请求，获取最新信息
      await this.getBannerList();
      await this.getNavList();
      await this.getFloorList();
        // 当处理完数据刷新后，wx.stopPullDownRefresh可以停止当前页面的下拉刷新
        mpvue.stopPullDownRefresh()
    },
    
  methods:{
    disableScroll(ev) {
      this.pageHeight = ev.pageHeight + 'px';
    },
    // 轮播图接口 
    async getBannerList () {
      const {message} =await request({url:'/api/public/v1/home/swiperdata'});
          console.log(message)
          this.bannerList = message
      },
      // 导航接口  
    async getNavList () {
          const {message} =await request({url:'/api/public/v1/home/catitems'});
          this.navsList = message
      },
      // 楼层接口
    async getFloorList () {
          const {message} =await request({url:'/api/public/v1/home/floordata'});
          // console.log(message,'77')
          this.floorList = message
      },
      getinfo(ev) {
        console.log(ev)
      },     
      // 调用小程序 api 可以快速滚动到页面指定位置
      // 如果指定页面滚动到0 即是回到顶部
      goTop() {
        mpvue.pageScrollTo({
          scrollTop:0,
        })
      }
    },
    created() {
      mpvue.login({
        success (res) {
          console.log(res)
          // 获取用户信息
          mpvue.getUserInfo({
            success(info) {
              console.log(info)
            }
          })      
          }
      })
    },
// 当页面发生滚动式，触发该回调
  onPageScroll(ev) {
    // console.log(ev);
    this.scrollTop = ev.scrollTop;
  } ,
  onReachBottom() {
    console.log('页面快到底部了')
    // 距离底部50px会被触发
    // 可以通过page进行修改
  },

  // 监听用户分享操作，实现自定义分享

  onShareAppMessage() {
    // return一个对象，对象中的内容即为自定义的内容
    return {
      title:'快来和我一起玩游戏吧！！',
      path:'pages/index/main?id=123',
      imageUrl:'https://www.zhengzhicheng.cn/pyg/pic_floor01_1@2x.png'
    }
  }

  // created() {
  //   //  1.小程序提供了获取用户位置的能力
  //   //  获取用户所谓位置的经纬度
  //   // mpvue.getLocation({
  //   //   success(res) {
  //   //     console.log(res)
  //   //   }
  //   // })

  //   //  2.根据用户的 经纬度  找到相应的地理位置
  //   // mpvue.openLocation({
  //   //   latitude:38,
  //   //   longitude:116,
  //   //   success(res) {
  //   //     console.log(res)
  //   //   }
  //   // })
  //   //  3.基于当前位置，选择一个具体位置
  //   // mpvue.chooseLocation({
  //   //   success(res) {
  //   //     console.log(res)
  //   //   }
  //   // })
  // }

  }

</script>

<style scoped>

  swiper {
    height: 340rpx;
  }
  swiper img {
    width: 750rpx;
    height: 340rpx;
  }
  .navs {
    display: flex;
    height: 194rpx;
    padding: 30rpx 45rpx;
    box-sizing: border-box;
    justify-content: space-between;
  }
  .navs img {
    width: 128rpx;
  }
  .floors .floor .title {
    width: 750rpx;
    height: 60rpx;
    padding-top: 20rpx;
    background-color: #f4f4f4;
  }
  .floors .floor .title image {
    display: inline;
  }
  .floors .floor .items {
    padding: 20rpx 16rpx;
    overflow: hidden;
  }
  .floors .items image {
    width: 232rpx;
    height: 188rpx;
    margin-right: 10rpx;
    margin-bottom: 10rpx;
    float: left;
  }
  .floors .items image:nth-child(2n+1) {
    margin-right: 0;
  }
  .floors .items image:first-child {
    height: 386rpx;
    margin-right: 10rpx;
  }
  .gotop {
    position: fixed;
    right: 40rpx;
    bottom: 40rpx;

    width: 80rpx;
    height: 80rpx;
    background-color: pink;
    border-radius: 50%;
  }
</style>
