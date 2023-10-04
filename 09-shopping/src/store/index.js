import Vue from 'vue'
import Vuex from 'vuex'
// 仓库子模块挂载到vuex上
import user from '@/store/modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  getters: {
    // 配置全局的属性 一个方法
    token (state) {
      return state.user.userInfo.token
    }
  },

  modules: {
    // 导入仓库子模块
    user
  }
})
