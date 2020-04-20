<template>
  <div class="wrapper">
    <!-- 商品图片 -->
    <swiper class="pics" indicator-dots indicator-color="rgba(255, 255, 255, 0.6)" indicator-active-color="#fff">
      <swiper-item v-for="pic in goods.pics " :key="pic.pics_id">
        <image :src="pic.pics_big"></image>
      </swiper-item>
    </swiper>
    <!-- 基本信息 -->
    <div class="meta">
      <p class="price">￥{{goods.goods_price}}</p>
      <p class="name">{{goods.goods_name}}</p>
      <p class="shipment">快递: 免运费</p>
      <span class="collect">收藏</span>
    </div>
    <!-- 商品详情 -->
    <div class="detail">
      <rich-text v-html="goods.goods_introduce">
      </rich-text>
    </div>
    <!-- 操作 -->
    <div class="action">
      <button open-type="contact">联系客服</button>
      <span class="cart" @click="goCart">购物车</span>
      <span class="add" @click="addCart">加入购物车</span>
      <span class="buy">立即购买</span>
    </div>
  </div>
</template>

<style scoped lang="less">

  swiper {
    height: 340rpx;
  }
  swiper image {
    width: 750rpx;
    height: 100%;
  }
  .wrapper {
    margin-bottom: 100rpx;
    background-color: #f4f4f4;
  }

  .pics {
    height: 720rpx;
  }
  
  .meta {
    height: 270rpx;
    line-height: 1;
    padding: 30rpx 180rpx 30rpx 20rpx;
    box-sizing: border-box;
    background-color: #fff;
    position: relative;

    .price {
      font-size: 36rpx;
      color: #ea4451;
      margin-bottom: 30rpx;
    }

    .name {
      color: #333;
      line-height: 1.4;
      font-size: 33rpx;

      overflow: hidden;  //  溢出部分银行
      -webkit-line-clamp: 2;//  显示几行
      text-overflow: ellipsis;  // 溢出的部分显示....
      display: -webkit-box;
      -webkit-box-orient: vertical; // 伸缩盒子组合
    }

    .shipment {
      font-size: 27rpx;
      color: #999;
      position: absolute;
      bottom: 30rpx;
    }

    .collect {
      width: 140rpx;
      height: 88rpx;
      text-align: center;
      padding-top: 50rpx;
      box-sizing: border-box;
      border-left: 1rpx solid #ddd;
      font-size: 22rpx;
      color: #999;

      position: absolute;
      right: 20rpx;
      top: 91rpx;
    }
  }

  .detail image {
    width: 100%;
    height: 480rpx;
    margin-top: 20rpx;
  }

  .action {
    width: 100%;
    height: 98rpx;
    background-color: #fff;

    position: fixed;
    left: 0;
    bottom: 0;

    display: flex;

    span {
      display: block;
    }

    .add, .buy {
      width: 210rpx;
      text-align: center;
      line-height: 98rpx;
      font-size: 27rpx;
      color: #fff;
    }

    .add {
      background-color: #f4b73f;
    }

    .buy {
      background-color: #ea4451;
    }

    button {
      padding: 0;
      border-radius: 0;
      background-color: #fff;

      &::after {
        border: none;
      }
    }

    button, .cart {
      flex: 1;
      line-height: 1;
      color: #989898;
      font-size: 24rpx;
      box-sizing: border-box;
      padding-top: 56rpx;                         
    }
  }

</style>

<script>
import request from '@/utils/request.js'
import sleep from '@/utils/sleep.js'
  export default {
    data() {
      return {
        goods:{}
      }
    },
    methods: {
       async getColor(id) {
         const {message} = await request({
           url:'/api/public/v1/goods/detail',
           data:{goods_id:id}
         });
         this.goods = message
      },
      //  跳转到购物车页面方法
      goCart() {
        // 使用相应的 api 实现相应的跳转
        // 如果跳转的页面为TabBar中的页面
        // 需要使用的 api 为 wx.switchTab

        mpvue.switchTab({
          url:'/pages/cart/main'
        })
      },
      //  加入购物车方法
     async addCart() {
        // 本地存储
        // 1.先取出原有购物车数据
        let carts = mpvue.getStorageSync('carts') || [];
        // 2.在原有购物车数据基础上添加新商品
        // 判断购物车中有没有商品，没有的话添加，有的话数量加1

        // 定义变量，记录购物车中是否包含了某商品
        let flag = false
        carts.forEach((val) => {
          if(val.goods_id == this.goods.goods_id) {
            // 购物车中包含了某商品
            flag = true;
           return val.goods_number += 1;
          }
        });
        //如果购物车中不包含某商品  push到购物车中
        if(!flag) {
        carts.push({
            goods_name: this.goods.goods_name,
            goods_id: this.goods.goods_id,
            goods_price: this.goods.goods_price,
            goods_pic: this.goods.goods_small_logo,
            goods_number: 1,
            checked: true
      })
        }
        
       
        // 3.将添加了新商品的购物车数据，重新存入本地存储
        mpvue.setStorageSync('carts',carts)
        // 添加成功之后给用户提示信息
        mpvue.showToast({
          title:'加入成功！'
        });
        //  再次延迟一会
       await sleep(2);
        //  非分要求，跳转到购物车列表
        mpvue.switchTab({
          url:'/pages/cart/main'
        })
      }
    },
    onLoad(query) {
      // console.log(query.id)
      this.getColor(query.id)
    }
  }
</script>