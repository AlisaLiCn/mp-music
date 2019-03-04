let Fly = require('flyio/dist/npm/wx')
/* eslint-disable-next-line */
let fly = new Fly

// 添加拦截器
fly.interceptors.request.use((config, promise) => {
  // 给所有请求添加自定义header
  // config.headers['X-Tag'] = 'flyio'
  return config
})
// 配置请求基地址
fly.config.baseURL = 'https://music-api.alisali.cn/'

// 添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
  (response) => {
    // 只将请求结果的data字段返回
    console.log(response)
    return response
  },
  (err) => {
    // 发生网络错误后会走到这里
    // return Promise.resolve("ssss")
    console.log(err)
  },
)

export default fly
