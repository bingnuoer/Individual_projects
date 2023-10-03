import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入 组件文件夹
import '@/utils/vant-ui'
// 导入common.less公共样式
import '@/styles/common.less'

// // 导入所有组件
// import Vant from 'vant'
// import 'vant/lib/index.css'
// // 插件安装初始化：会导入注册所有vant组件
// Vue.use(Vant)

// 按需导入组件（推荐） —— 封装到一个专门的组件文件中：utils/vant-ui.js
// import { Button, Switch } from 'vant'
// // 按需注册使用组件
// Vue.use(Button)
// Vue.use(Switch)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
