// 封装 mpvue.request为支持 Promise
export default function (obj) {
    //  处理默认参数的值
    let url = obj.url || '';
    let method = obj.method || 'get';
    let data = obj.data || {};
    let header = obj.header || {};
    //  配置基础路径
    let baseUrl = 'https://www.zhengzhicheng.cn';
    url = baseUrl + url ;
  return new Promise((resolve,reject) => {
      mpvue.showLoading({
          //  开始加载状态
          title:'正在加载......'
      }),
    mpvue.request({
        url,
        method,
        data,
        header,
        success(info) {
            resolve(info.data);
            //  结束加载状态
            mpvue.hideLoading()
        }
    });
    
}) 
}
