<template>
  <div>
    <!-- 二级路由展示的区域 -->
    <!-- 主页底部导航区域 -->
    <!-- 匹配二级路由出口：这样切换layout主页的导航栏，才能展示二级路由页面 -->
    <router-view></router-view>
    <van-tabbar route active-color="#ee0a24" inactive-color="#000">
      <van-tabbar-item to="/home" icon="wap-home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/category" icon="apps-o">分类页</van-tabbar-item>
      <van-tabbar-item to="/cart" icon="shopping-cart-o"
        >购物车</van-tabbar-item
      >
      <van-tabbar-item to="/user" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  // 多个单词命名
  name: 'LayoutIndex',
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style>
</style>
