<template>
  <div class="search">
    <van-nav-bar title="商品搜索" left-arrow @click-left="$router.go(-1)" />
     <!-- 拿到搜索关键字 -->
    <van-search v-model="search" show-action placeholder="请输入搜索关键词" clearable>
      <template #action>
        <!-- 点击按钮 拿到搜索关键字 -->
        <div @click="goSearch(search)">搜索</div>
      </template>
    </van-search>

    <!-- 搜索历史 v-if="history.length>0"才有搜索历史 -->
    <div class="search-history" v-if = "history.length>0">
      <div class="title">
        <span>最近搜索</span>
        <van-icon @click="clear" name="delete-o" size="16" />
      </div>
      <div class="list">
        <div v-for="item in history" :key="item" class="list-item" @click="goSearch(item)">{{ item }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHistoryList, setHistoryList } from '@/utils/storage'
export default {
  name: 'SearchIndex',
  data () {
    return {
      // history: [
      //   '手机',
      //   '白酒',
      //   '电视'
      // ],
      // 获取搜索历史
      history: getHistoryList(),
      search: '' // 搜索框值
    }
  },
  methods: {
    goSearch (key) {
      // console.log('搜索了历史商品', key)
      // 判断key在不在history数组内(搜索历史内)，在就移除且追加到数组最前面，不在就直接追加到数组最前面
      // 查key在数组的下标
      const index = this.history.indexOf(key)
      // 在数组内
      if (index !== -1) {
        // 移除该搜索项,通过下标移除
        // splice(从哪开始移除，移除几个)
        this.history.splice(index, 1)
      }
      // 追加到数组最前面
      this.history.unshift(key)
      // 设置搜索历史
      setHistoryList(this.history)
      // 跳转到搜索商品详情页,携带参数
      this.$router.push(`/searchlist/search=${key}`)
    },
    clear () {
      this.history = []
      setHistoryList([])
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  .searchBtn {
    background-color: #fa2209;
    color: #fff;
  }
  ::v-deep .van-search__action {
    background-color: #c21401;
    color: #fff;
    padding: 0 20px;
    border-radius: 0 5px 5px 0;
    margin-right: 10px;
  }
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  .title {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
  }
  .list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 10px;
    gap: 5%;
  }
  .list-item {
    width: 30%;
    text-align: center;
    padding: 7px;
    line-height: 15px;
    border-radius: 50px;
    background: #fff;
    font-size: 13px;
    border: 1px solid #efefef;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 10px;
  }
}
</style>
