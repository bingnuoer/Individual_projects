// 封装接口，获取搜索商品
import request from '@/utils/request'

// 获取搜索商品列表的数据
export const getProList = (obj) => {
  const { categoryId, goodsName, page } = obj
  return request.get('/goods/list', {
    params: {
      categoryId, // 默认值
      goodsName, // 商品名称
      page // 页码
    }
  })
}
