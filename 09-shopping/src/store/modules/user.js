import { getInfo, setInfo } from '@/utils/storage'

export default {
  // 开启命名空间
  namespaced: true,
  state () {
    return {
      // 获取个人权证相关信息
    //   userInfo: {
    //     token: '',
    //     userid: '' // 请求响应标识用户的信息
    //   }
      userInfo: getInfo() // 从本地获取存储的用户信息
    }
  },
  mutations: {
    // 提供一个方法，设置个人权证相关信息
    // 所有mutation的第一个参数，都是state
    setUserInfo (state, obj) {
      state.userInfo = obj
      //   设置个人权证相关信息
      setInfo(obj)
    }
  },
  actions: {},
  getters: {}
}
