import Vue from 'vue'
// 按需导入组件（推荐） —— 封装到一个专门的组件文件中：utils/vant-ui.js
import { Button, Switch, Rate, Tabbar, TabbarItem, NavBar } from 'vant'

Vue.use(NavBar)
Vue.use(Tabbar)
Vue.use(TabbarItem)
// 按需注册使用组件
Vue.use(Button)
Vue.use(Switch)
Vue.use(Rate)
