// 获取分类数据
import request from '@/utils/request'

export const getCategoryData = () => {
  return request.get('/category/list')
}
