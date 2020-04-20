
<template>
  <div>
    <!-- 筛选 -->
    <div class="filter">
      <span class="active">综合</span>
      <span>销量</span>
      <span>价格</span>
    </div>
    <!-- 商品列表 -->
    <scroll-view class="goods" scroll-y @scrolltolower="getMoreItems">
      <div @click="goDetail(item.goods_id)" class="item" v-for="item in items" :key="item.goods_id">
        <!-- 商品图片 -->
        <image class="pic" :src="item.goods_small_logo"></image>
        <!-- 商品信息 -->
        <div class="meta">
          <p class="name">{{item.goods_name}}</p>
          <p class="price"><span>￥</span>{{item.goods_price}}<span>.00</span></p>
        </div>
      </div>
    </scroll-view>
  </div>
</template>

<style scoped lang="less">

  .filter {
    display: flex;
    height: 96rpx;
    line-height: 96rpx;
    border-bottom: 1rpx solid #ddd;

    span {
      flex: 1;
      text-align: center;
      font-size: 30rpx;
      color: #333;

      &.active {
        color: #ea4451;
      }
    }
  }
  
  .goods {
    position: absolute;
    width: 100%;
    top: 97rpx;
    bottom: 0;
  }

  .item {
    display: flex;
    padding: 30rpx 20rpx 30rpx 0;
    margin-left: 20rpx;
    border-bottom: 1rpx solid #eee;

    &:last-child {
      border-bottom: none;
    }

    .pic {
      width: 200rpx;
      height: 200rpx;
      margin-right: 30rpx;
    }

    .meta {
      flex: 1;
      font-size: 27rpx;
      color: #333;
      position: relative;
    }

    .name {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .price {
      position: absolute;
      bottom: 0;

      color: #ea4451;
      font-size: 33rpx;

      span {
        font-size: 22rpx;
      }
    }
  }

</style>

<script>
import request from '@/utils/request.js'
  export default {
      data() {
          return {
              items:[],
              page:1,
              size:8,
              keywords:'',
              locked:false
          }
      },
      async onLoad (qs) {
        //   console.log(qs)
        //  将地址参数，记录下来
        this.keywords = qs.query;
        // 分页相关参数
        qs.pagenum = this.page;
        qs.pagesize = this.size;

        // 发送请求，获取商品列表
        const {message} = await request({
            url:'/api/public/v1/goods/search',
            method:'get',
            data:qs
        })
        // console.log(message)
        this.items = message.goods
      },
      //  监听页面的触底回调
    //   onReachBottom () {
    //       console.log('我是有底线的')
    //   },
     methods: {
         //  跳转到商品详情
        goDetail (id) {
            mpvue.navigateTo({
                url:'/pages/goods/main?id=' + id
            })
        },
        async getMoreItems () {
            // console.log(111)
            // 检测是否有更多数据
            if(this.locked) return
            const {message} = await request({
                url:'/api/public/v1/goods/search',
                method:'get',
                data:{
                    query:this.keywords,
                    pagenum: ++this.page,
                    pagesize:this.size
                }
            });
            // 更新列表数据
            this.items = this.items.concat(message.goods);
            if(this.items.length == message.total) {
                this.locked = true
            }
        }
    },
  }
</script>