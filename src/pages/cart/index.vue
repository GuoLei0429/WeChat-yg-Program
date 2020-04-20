<template>
  <div class="wrapper">
    <!-- 收货信息 -->
    <dl class="shipment">
      <block v-if="address">
      <dt>收货人: </dt>
      <dd class="meta">
        <span class="name">{{address.userName}}</span>
        <span class="phone">{{address.telNumber}}</span>
      </dd>
      <dt>收货地址:{{address.provinceName}} {{address.cityName}} {{address.countyName}} {{address.detailInfo}}</dt>
      <dd>广东省广州市天河区一珠吉</dd>
      </block>
      <button v-else type="primary" @click="chooseAddress">添加收货地址</button>
    </dl>
    <div v-if="carts.length">
       <!-- 购物车 -->
      <div class="carts">
        <div class="item">
          <!-- 店铺名称 -->
          <div class="shopname">优购生活馆</div>
          <div class="goods" v-for="(cart,key) in carts" :key="key">
            <!-- 商品图片 -->
            <image class="pic" :src="cart.goods_pic"></image>
            <!-- 商品信息 -->
            <div class="meta">
              <p class="name">{{cart.goods_name}}</p>
              <p class="price"><span>￥</span>{{cart.goods_price}}<span>.00</span></p>
              <!-- 加减 -->
              <div class="amount">
                <span class="reduce" @click="changeNumber(-1,key)">-</span>
                <input type="number" :value="cart.goods_number" class="number">
                <span class="plus" @click="changeNumber(1,key)">+</span>
              </div>
            </div>
            <!-- 选框 -->
            <span class="checkbox" @click="checked(key)">
              <icon type="success" size="20" :color="cart.checked ? '#ea4451' : '#ccc'"></icon>
            </span>
          </div>
        </div>
      </div>
        <!-- 其它 -->
      <div class="extra">
        <label class="checkall" @click="checkAll">
          <icon type="success" :color="carts.length == checkedCarts.length ? 'red' :'#ccc'" size="20"></icon>
          全选
        </label>
        <div class="total">
          合计: <span>￥</span><label>{{amount}}</label><span>.00</span>
        </div>
        <div class="pay" @click="goPay">结算(3)</div>
      </div>
    </div>
    <div v-else style="text-align:center;margin-top:60rpx">还没有商品哦~</div>
  </div>
</template>

<style scoped lang="less">

  .shipment {
    height: 100rpx;
    line-height: 2;
    padding: 30rpx 30rpx 40rpx 30rpx;
    font-size: 27rpx;
    color: #333;
    background-color: #fff;
    // background-image: url(https://ugo2.oss-cn-hangzhou.aliyuncs.com/images/cart_border%402x.png);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: bottom;

    dt {
      width: 140rpx;
      float: left;
      clear: both;
    }

    dd {
      padding-left: 160rpx;
    }

    .meta {
      padding-right: 50rpx;
    }

    span.phone {
      float: right;
    }
  }

  .carts {
    background-color: #f4f4f4;
    padding-bottom: 110rpx;
    overflow: hidden;

    .item {
      margin-top: 20rpx;
    }
    
    .shopname {
      padding: 30rpx;
      font-size: 30rpx;
      color: #333;
      background-color: #fff;
      border-top: 1rpx solid #eee;
      border-bottom: 1rpx solid #eee;
    }

    .goods {
      display: flex;
      padding: 30rpx 20rpx 30rpx 0;
      margin-left: 100rpx;
      border-bottom: 1rpx solid #eee;
      background-color: #fff;
  
      position: relative;

      span.checkbox {
        display: block;
        width: 101rpx;
        height: 100%;
        background-color: #fff;

        display: flex;
        justify-content: center;
        align-items: center;

        position: absolute;
        left: -100rpx;
        top: 0;
      }

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

      .amount {
        position: absolute;
        bottom: 0;
        right: 20rpx;

        height: 48rpx;
        text-align: center;
        border: 1rpx solid #ddd;
        border-radius: 8rpx;

        display: flex;
        align-items: center;

        span {
          display: block;
          width: 60rpx;
          line-height: 48rpx;
          font-size: 36rpx;
          color: #ddd;
          text-align: center;
        }

        input {
          width: 60rpx;
          height: 48rpx;
          min-height: 48rpx;
          font-size: 27rpx;
          border-left: 1rpx solid #ddd;
          border-right: 1rpx solid #ddd;
        }
      }
    }
  }

  .extra {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 9;

    width: 750rpx;
    height: 96rpx;
    text-align: center;
    line-height: 96rpx;
    font-size: 36rpx;
    border-top: 1rpx solid #eee;
    background-color: #fff;
    color: #333;
    
    display: flex;

    .checkall {
      width: 140rpx;
      line-height: 1;
      margin-left: 25rpx;
      display: flex;
      align-items: center;

      icon {
        margin-right: 20rpx;
      }
    }

    .total {
      display: flex;
      justify-content: center;
      flex: 1;

      label, span {
        color: #ea4451;
        vertical-align: bottom;
        position: relative;
        bottom: -2rpx;
      }

      span {
        position: relative;
        bottom: -3rpx;
        font-size: 24rpx;

        &:first-child {
          margin-left: 10rpx;
        }
      }
    }

    .pay {
      width: 200rpx;
      background-color: #ea4451;
      color: #fff;
    }

  }
</style>

<script>
import request from '@/utils/request.js'
import chooseAddress from '@/utils/chooseaddress.js'
//引入 lodash
import _ from 'lodash'
  export default {
    data() {
        return {
            carts:[],
            //  收货地址
            address:null,
        }
    },
    methods: {
      //  选中取消商品
        checked(key) {
          this.carts[key].checked = !this.carts[key].checked;
        },
      //  全选
        checkAll() {
          this.carts.forEach((val) => {
            val.checked = true
          })
        },
        changeNumber(step,key) {
          // 当减少数量时，最少不能小于1
          if(step == -1 && this.carts[key].goods_number <=1) {
            return mpvue.showToast({
              title:'至少是一件'
            })
          }
          //  更改购物车中指定商品的数量 + - 
          this.carts[key].goods_number += step
        },
        //  获取用户收货地址
        async chooseAddress() {
          // 调用 api 获取用户地址
          const {info} = await chooseAddress();
          console.log(info)
          this.address = info
        },
        //  点击结算时验证是否登陆过
      async goPay() {
          // 1.是否登录
        // if(!mpvue.getStorageSync('token')) {
        //     // 授权
        //     // mpvue.login();
        //     // 显示按钮需要进行授权
        //     // 检测用户是否曾经授权过
        //     mpvue.getSetting({
        //       success(res) {
        //         // 如果authSetting信息为空（没有授权）
        //         //  未授权
        //         if(!res.authSetting['scope.userInfo']) {
        //           // 请求去点击按钮，进行授权
        //           mpvue.navigateTo({
        //             url:'/pages/auth/main'
        //           })
        //           return;
        //         }
        //         // 获取用户信息(如果已经授权直接进入这里)
        //         mpvue.getUserInfo({
        //           success(info) {
        //             console.log(info)
        //           }
        //         })
        //       }
        //     })
        //     // mpvue.getUserInfo();
        //     // 2.请求登录
        //     // request({
        //     //   url:'/api/public/v1/users/wxlogin',
        //     //   methos:'post',
        //     //   data:{

        //     //   }
        //     // })
        //   }
        // }

        //  同步方式处理
        if(!mpvue.getStorageSync('token')) {
          // 未登录跳转页
           return mpvue.navigateTo({url:'/pages/auth/main'});
        // 调用接口创建订单
        const {message,meta} = await request({
          url:'/api/public/v1/my/orders/create',
          method:'post',
          header:{
            //  登录认证信息
            Authorization:mpvue.getStorageSync('token')
          },
          data:{
            order_price:this.amount,
            consignee_addr:this.consignee_addr,
            goods:this.checkedCarts
          }
        })
        //  如果订单创建成功，跳转到订单页
        if(meta.status == 200) {
          //  将购物车中购买成功的商品移除
          let carts = mpvue.getStorageSync('carts');
          // 从全部购物车商品中将已购买的排除掉
          // 生成新的数组
          carts = _.differenceWith(carts,this.checkedCarts, _.isEqual)
          console.log(carts)
          // 重新存入购物车商品
          mpvue.setStorageSync('carts', carts);
          // mpvue.navigateTo({url:'/page/order/main'})
        }
        }
      }
    },
    computed: {
      //  从 this.carts 找到那些 checked 值为true
      //  商品（谁的 checked 值为 true ，就把谁取出来）
      //  全选
      checkedCarts() {
        return this.carts.filter((val) => {
          return val.checked;
        });
      },
      //  计算购买商品总金额
      amount() {
        let total = 0 ;
        this.checkedCarts.forEach((val) =>{
          //  求和， 单价 * 数量
        total += val.goods_number * val.goods_price
        });
        return total;
      },
      //  地址
      consignee_addr () {
       return this.address && this.address.provinceName + this.address.cityName + this.address.countyName + this.address.detailInfo
      }
    },
    onShow() {
      // 从本地读取购物车数据
     let carts = mpvue.getStorageSync('carts') || [];
    //  console.log(carts);
     this.carts = carts
    },
  }
</script>