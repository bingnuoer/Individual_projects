// 这里封装本地存储 请求回来数据 的方法
// 约定一个通用的键名
const INFO_KEY = 'shopping_info'

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
