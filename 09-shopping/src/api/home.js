import request from '@/utils/request'
// 1.封装首页数据接口
export const getHomeData = () => {
  return request.get('/page/detail', {
    params: {
      pageId: 0
    }
  })
}
