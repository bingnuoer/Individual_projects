// 封装 加入购物车接口
import request from '@/utils/request'
export const addCart = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/add', {
    goodsId, // 商品ID
    goodsNum, // 商品数量
    goodsSkuId // 商品SKUID 商品的一些属性：颜色/尺寸
  })
}
