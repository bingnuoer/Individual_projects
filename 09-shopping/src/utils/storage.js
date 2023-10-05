// 这里封装本地存储(键值对) 请求回来数据 的方法——持久化管理
// 约定一个通用的键名
const INFO_KEY = 'shopping_info'
const HISTORY_KEY = 'history_key'

// 获取个人信息
export const getInfo = () => {
  // 给res.data携带的个人信息 一个初始值
  const defaultObj = { token: '', userId: '' }
  //   获取res.data携带的个人信息
  const result = localStorage.getItem(INFO_KEY)
  //   存储到本地
  return result ? JSON.parse(result) : defaultObj
}

// 设置个人信息
export const setInfo = (info) => {
  localStorage.setItem(INFO_KEY, JSON.stringify(info))
}

// 移除个人信息
export const removeInfo = () => {
  localStorage.removeItem(INFO_KEY)
}

// 获取搜索历史
export const getHistoryList = () => {
  const result = localStorage.getItem(HISTORY_KEY)
  return result ? JSON.parse(result) : []
}

// 设置搜索历史
// this.history === arr
export const setHistoryList = (arr) => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(arr))
}
