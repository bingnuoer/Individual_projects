<template>
  <div class="count-box">
    <button @click="handleSub" class="minus">-</button>
    <!-- change事件-回车触发：修改输入框的值 -->
    <input :value="value" @change="handleChange" class="inp" type="text" name="" id="" />
    <button @click="handleAdd" class="add">+</button>
  </div>
</template>

<script>
export default {
  // 父传子 拿到数据 :value
  props: {
    value: {
      type: Number,
      default: 1 // 默认值
    }
  },
  methods: {
    handleSub () {
      if (this.value <= 1) {
        return
      }
      //   修改输入框的值
      this.$emit('input', this.value - 1)
    },
    handleAdd () {
      this.$emit('input', this.value + 1)
    },
    // 修改输入框的值
    handleChange (e) {
      // 获取输入框当前的值
      const num = +e.target.value // 转数字处理
      //   如果输入框输入值不合法，或者是负数；回车 回退到默认值
      if (isNaN(num) || num < 1) {
        e.target.value = this.value
        return
      }
      //   把输入的合法值 给输入框
      this.$emit('input', num)
    }
  }
}
</script>

<style lang="less" scoped>
.count-box{
    width: 110px;
    display: flex;

    .minus,.add{
        width: 30px;
        height: 30px;
        /* 清除按钮默认样式 */
        outline:none;
        border:none;
        background-color: #efefef;
    }
    .inp{
        width: 40px;
        height: 30px;
        outline: none;
        border: none;
        margin: 0,5px;
        text-align: center;
        background-color: #efefef;
    }
}
</style>
