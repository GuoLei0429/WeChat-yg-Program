<template>
    <div class="">
        <button type="primary" open-type="getUserInfo" @getuserinfo="getuserinfo">登录</button>
    </div>
</template>
<script>
import request from '@/utils/request.js'
import login from '@/utils/login.js'
import getUserInfo from '@/utils/getuserinfo.js'
import getSetting from '@/utils/getsetting.js'
export default {
    methods:{
      async getuserinfo () {
          // 已授权，调用api 获取用户信息
        const {
            encryptedData,
            iv,
            rawData,
            signature
          } = await getUserInfo();
          //  调用login api 换取code  
        const {code} = await login();
        // 调用 request api 发送请求，换取token
        const {message} = await request({
          url:'/api/public/v1/users/wxlogin',
          method:'post',
          data:{
            encryptedData,
            iv,
            rawData,
            signature,
            code
          }
        });
        // 记录登录状态,存入 storage
        mpvue.setStorageSync('token',message.token);
        
        //  当用户拒绝或允许授权后调用该函数
        //  回退一步，返回
        mpvue.navigateBack({
            delta:1
        });
        }
    },
   async onShow () {
      // 授权情况
      const {authSetting} = await getSetting();
      if(authSetting['scope.userInfo']) {
        this.getUserInfo();
      }
    }
}
</script>
<style>
    button {
        position: absolute;
        left: 50%;
        top: 30%;

        transform: translate(-50%);
    }
</style>