<template>
  <div>
    <!-- 搜索 -->
    <search></search>
    <!-- 分类 -->
    <div class="category" v-if="topCategory.length">
      <!-- 顶级分类 -->
      <ul class="sup">
        <scroll-view scroll-y>
          <!-- <li class="active">大家电</li> -->
          <li :class="{active:topIndex == currentIndex}" @click="changeIndex(topIndex)" :key="topIndex" v-for="(top,topIndex) in topCategory" >{{top.cat_name}}</li>
          
        </scroll-view>
      </ul>
      <!-- 子级分类 -->
      <div class="sub">
        <scroll-view scroll-y>
          <!-- 封面图 -->
          <image src="https://guolei0429.github.io/yg/uploads/category.png" class="thumb"></image>
          <div class="children" :key="childIndex" v-for="(child,childIndex) in childCategory.children" >
            <div class="title">{{child.cat_name}}</div>
            <!-- 品牌 -->
            <div class="brands">
              <navigator :url="'/pages/list/main?' + product.cat_name" :key="productIndex" v-for="(product,productIndex) in child.children">
                <image :src="product.cat_icon"></image>
                <span>{{product.cat_name}}</span>
              </navigator>
            </div>
          </div>
        </scroll-view>
      </div>
    </div>
    <!-- <div class="" style="text-align:center" >正在加载....</div> -->
  </div>
</template>

<style scoped lang="less">

  scroll-view {
    height: 100%;
  }

  .category {
    display: flex;
    width: 100%;
    position: absolute;
    top: 100rpx;
    bottom: 0;

    .sup {
      width: 196rpx;
      background-color: #f4f4f4;

      li {
        height: 100rpx;
        text-align: center;
        line-height: 100rpx;
        font-size: 27rpx;
        color: #333;
        border-bottom: 1rpx solid #eee;

        &:last-child {
          border-bottom: none;
        }
        
        &.active {
          background-color: #FFF;
          color: #ea4451;
          position: relative;

          &::before {
            content: '';
            display: block;
            width: 8rpx;
            height: 60rpx;
            transform: translateY(-50%);
            background-color: #ea4451;

            position: absolute;
            left: 0;
            top: 50%;
          }
        }
      }
    }

    .sub {
      flex: 1;
      padding: 20rpx 18rpx;

      .thumb {
        width: 100%;
        height: 180rpx;
      }

      .children {
        text-align: center;
        color: #333;

        .title {
          display: inline-block;
          margin: 40rpx 0 20rpx;
          font-size: 30rpx;

          &::before {
            content: '/';
            margin-right: 20rpx;
            color: #666;
          }

          &::after {
            content: '/';
            margin-left: 20rpx;
            color: #666;
          }
        }
      }

      .brands {
        display: flex;
        flex-wrap: wrap;

        navigator {
          width: 33%;
          margin-bottom: 20rpx;
        }

        image {
          width: 120rpx;
          height: 120rpx;
        }

        span {
          display: block;
          font-size: 24rpx;
        }
      }
    }
  }
</style>

<script>

  import search from '@/components/search';
  import request from '@/utils/request.js'

  export default {
    data() {
          return {
              // 顶级分类
              topCategory:[],
              // 当前顶级分类的索引
              currentIndex:0
          }
      },
    computed: {
        //  获取子分类属性
          childCategory () {
              //  对数据校验处理
              return this.topCategory.length && this.topCategory[this.currentIndex]
          }
      },
    components: {
      search
    },
    mounted() {
        this.getCategoryList()
    },
    methods: {
        // 分类接口
      async getCategoryList() {
           const {message} = await request({url:'/api/public/v1/categories'}) 
        //    console.log(message)
           this.topCategory = message
        },
        changeIndex(index) {
            // console.log(index,'77')
            // 将顶级分类的索引值进行动态的改变
            // 以达到计算属性childCategory 的变化
            this.currentIndex =  index
        }
    },
  }
</script>