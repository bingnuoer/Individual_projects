import axios from 'axios'
import { Toast } from 'vant'
// 创建 axios 实例，将来对创建出来的实例，进行自定义配置
// 好处：不会污染原始的 axios 配置
const instance = axios.create({
  // 接口调用基础地址
  baseURL: 'http://cba.itlike.com/public/index.php?s=/api/',
  timeout: 5000 // 超时时间
})

// 自定义配置 - 请求/响应 拦截器
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 请求时，打开loading效果
  // 开启loading,禁止背景点击（节流处理，防止多次无效触发）
  Toast.loading({
    message: '加载中...',
    forbidClick: true, // 禁止背景点击
    loadingType: 'spinner', // 加载loading图标
    duration: 0 // 展示时长(ms)，值为 0 时，toast 不会消失
  })
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么(默认axios会多包装一层data,需要响应拦截器处理一下)
  const res = response.data
  // console.log(res)
  if (res.status !== 200) {
    // 给提示-注意用全局的toast
    Toast(res.message)
    // 抛出一个错误的promise
    return Promise.reject(res.message)
  } else {
    // 清除 loading 中的效果
    Toast.clear()
  }
  return res
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error)
})

// 导出实例
export default instance
