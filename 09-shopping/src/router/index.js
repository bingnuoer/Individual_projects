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

export default router
