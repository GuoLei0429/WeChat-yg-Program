<template>
  <div class="wrapper">
    <!-- 订单状态 -->
    <div class="tabs">
      <span class="active">全部</span>
      <span>待付款</span>
      <span>已付款</span>
      <span>退款/退货</span>
    </div>
    <!-- 订单 -->
    <scroll-view class="orders" scroll-y>
      <div class="item" v-for="order in orders" :key="order.order_id">
        <!-- 商品图片 -->
        <image class="pic" :src="order.goods[0].goods_small_logo"></image>
        <!-- 商品信息 -->
        <div class="meta">
          <p class="name">{{order.goods[0].goods_name}}</p>
          <p class="price"><span>￥</span>{{order.goods[0].goods_price}}<span>.00</span></p>
          <p class="num">{{order.goods[0].goods_number}}</p>
        </div>
        <!-- 总价 -->
        <div class="amount">
          共{{order.total_count}}件商品 总计: ￥{{order.total_price}}(含运费0.00)
        </div>
        <!-- 其它 -->
        <div class="extra">
          订单号: {{order.order_number}}
          <button size="mini" type="primary" @click="payment(order.order_number)" v-if="order.pay_status == 0">支付</button>
          <button v-else size="mini">已付款</button>
        </div>
      </div>
    </scroll-view>
  </div>
</template>

<style scoped lang="less"> 
  .tabs {
    display: flex;
    height: 96rpx;
    line-height: 96rpx;
    background-color: #fff;
    box-shadow: 0 4rpx 10rpx #ccc;

    span {
      flex: 1;
      text-align: center;
      font-size: 27rpx;
      color: #333;

      &.active {
        color: #ea4451;
      }
    }
  }

  
  .orders {
    width: 100%;
    background-color: #f4f4f4;

    position: absolute;
    top: 97rpx;
    bottom: 0;
  }

  .item {
    padding: 30rpx 20rpx;
    margin-top: 27rpx;
    background-color: #fff;

    .pic {
      width: 200rpx;
      height: 200rpx;
      float: left;
    }

    .meta {
      height: 200rpx;
      margin-left: 230rpx;
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

    .num {
      position: absolute;
      bottom: 0;
      right: 20rpx;
      color: #333;
    }

    .amount {
      text-align: right;
      padding: 20rpx;
      font-size: 24rpx;
      border-top: 1rpx solid #eee;
      border-bottom: 1rpx solid #eee;
      margin-top: 20rpx;
      color: #999;
    }

    .extra {
      padding: 30rpx;
      font-size: 24rpx;
      color: #999;

      position: relative;

      button {
        position: absolute;
        right: 20rpx;
        font-size: 24rpx;
        margin-top: -10rpx;
      }
    }
  }

</style>

<script>
  import request from '@/utils/request.js'
  export default {
      data() {
          return {
              orders:[]
          }
      },
      methods: {
        async payment (order_number) {
              // 1.当用户点击支付时，需要弹出支付窗口，提示用户相关支付信息
              // 窗口可以通过小程序 api 实现
              // 2.请求后算接口，获取相关参数
              const {message} = await request({
                  url:'/api/public/v1/my/orders/req_unifiedorder',
                  method:'post',
                  header:{
                    //  登录认证信息
                    Authorization:mpvue.getStorageSync('token')
                    },
                  data:{order_number}
              })
              //  调用支付窗口
            mpvue.requestPayment(message.pay)
          }
      },
    async onShow () {
            // 发送请求
        const {message} = await request({
                url:'/api/public/v1/my/orders/all',
                method:'get',
                header:{
                //  登录认证信息
                Authorization:mpvue.getStorageSync('token')
            },
                data:{type:1}
            })
            this.orders = message.orders;
        }
    }

</script>