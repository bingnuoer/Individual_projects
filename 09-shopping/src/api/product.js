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

// 获取商品详情的接口
// post请求 第二个直接写参数，get请求写params
export const getProDetail = (goodsId) => {
  return request.get('/goods/detail', {
    params: {
      goodsId
    }
  })
}

// 获取商品评论的接口
export const getProComments = (goodsId, limit) => {
  return request.get('/comment/listRows', {
    params: {
      goodsId, // 商品id
      limit // 获取评论数量
    }
  })
}
