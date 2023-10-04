import Vue from 'vue'
import VueRouter from 'vue-router'
// 配置一级路由
// 组件的名字，同时导入组件
import Layout from '@/views/layout'
import Login from '@/views/login'
import MyOrder from '@/views/myorder'
import Pay from '@/views/pay'
import ProDetail from '@/views/prodetail'
import Search from '@/views/search'
import SearchList from '@/views/search/list'

// 配置二级路由
import Home from '@/views/layout/home'
import Category from '@/views/layout/category'
import Cart from '@/views/layout/cart'
import User from '@/views/layout/user'

// 导入数据子模块
import store from '@/store'

Vue.use(VueRouter)

// path：搜索栏路径；component：自己起的组件名，存放组件页面，导入该组件路径即可
// 二级路由，嵌套在一级路由 主页layout中，children
// 路由：数组包对象 [{}]
const routes = [
  {
    path: '/',
    component: Layout,
    // 匹配路由重定向：访问主页“/”，跳转到首页"/home"
    redirect: '/home',
    children: [
      { path: '/home', component: Home },
      { path: '/category', component: Category },
      { path: 'cart', component: Cart },
      { path: 'user', component: User }
    ]
  },
  { path: '/login', component: Login },
  { path: '/myorder', component: MyOrder },
  { path: '/pay', component: Pay },
  // 商品详情，动态路由传参，将来是哪个商品，路由参数中携带id
  { path: '/prodetail/:id', component: ProDetail },
  { path: '/search', component: Search },
  { path: '/searchlist', component: SearchList }
]

const router = new VueRouter({
  routes
})

// 所有的路由在真正被访问到之前（解析渲染对应组件页面前），都会经过全局前置守卫
// 只有全局前置守卫放行了，才会到达对应的页面

// 全局前置守卫导航
// to： 到哪去，到哪去的完整路由信息对象（路径，参数）
// from: 从哪里来，从哪里来的完整路由信息对象（路径，参数）
// next():是否放行
// （1） next()      直接放行，放行到to要去的路径
//  (2) next(路径)   进行拦截，拦截到next里面配置的路径
// 需要拦截的页面放到一个数组中，数组可以随时变
const authUrls = ['/pay', 'myorder']
router.beforeEach((to, from, next) => {
  // console.log(to, from, next)
  // next('/home')
  // 看 to.path 是否在authUrls中出现过（是不是要拦截的页面）
  if (!authUrls.includes(to.path)) {
    // 非权限页面，
    next()
    return
  }

  // 是权限页面，需要判断token
  // 直接使用配置的全局数据属性方法
  const token = store.getters.token
  if (token) {
    // 已经注册过的用户-本地信息里有该用户 直接放行
    next()
  } else {
    // 全局前置守卫 拦截 到登录页面
    next('/login')
  }
})

export default router
