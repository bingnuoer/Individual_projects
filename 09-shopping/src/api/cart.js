// 封装 加入购物车接口
import request from '@/utils/request'
export const addCart = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/add', {
    goodsId, // 商品ID
    goodsNum, // 商品数量
    goodsSkuId // 商品SKUID 商品的一些属性：颜色/尺寸
  })
}

// 获取购物车列表数据
export const getCartList = () => {
  return request.get('/cart/list')
}

// 封装接口-购物车 数字框修改数量
// post请求要传递参数，向后台修改数据
export const changeCount = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/update', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}

// 购物车-删除购物车商品
export const delSelect = (cartIds) => {
  return request.post('/cart/clear', {
    cartIds// 购物车里一栏数据的id
  })
}
