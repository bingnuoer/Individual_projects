import { getCartList } from '@/api/cart'
// 构建 购物车的vuex
export default {
  namespaced: true,
  state () {
    return {
      cartList: []
    }
  },
  mutations: {
    // 提供一个设置 cartList 的 mutation
    setCartList (state, newList) {
      state.cartList = newList
    },
    // 购物车小复选框
    toggleCheck (state, goodsId) {
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      // 复选框选中状态取反
      goods.isChecked = !goods.isChecked
    },
    // 大复选框 控制 小复选框
    toggleAllCheck (state, flag) {
      // 大复选框 的状态 设置给每个小复选框
      state.cartList.forEach(item => {
        item.isChecked = flag
      })
    }
  },
  actions: {
    async getCartAction (context) {
      const { data } = await getCartList()
      // 后台返回的数据中，不包含复选框的选中状态，为了实现将来的功能
      // 需要手动维护数据，给每一项，添加一个 isChecked 状态（标记当前商品是否选中）
      data.list.forEach(item => {
        item.isChecked = true
      })
      context.commit('setCartList', data.list)
    }

  },
  getters: {
    // 封装 计算属性：商品总数  / 选中的商品列表  /   选中的商品总数  /   选中的商品总价
    // 商品总数
    cartTotal (state) {
      return state.cartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 选中的商品列表
    selCartList (state) {
      return state.cartList.filter(item => item.isChecked)
    },
    // 选中的商品总数
    selCount (state, getters) {
      return getters.selCartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 选中的商品总价
    selPrice (state, getters) {
      return getters.selCartList.reduce((sum, item) => {
        return sum + item.goods_num * item.goods.goods_price_min
      }, 0).toFixed(2)
    },
    // 计算属性-购物车选了几个小复选框-控制大复选框状态
    isAllChecked (state) {
      return state.cartList.every(item => item.isChecked)
    }
  }
}
