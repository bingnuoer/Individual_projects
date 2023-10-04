<template>
  <div class="login">
    <!-- 头部 -->
    <!-- $router.go(-1):跳转到首页 -->
    <van-nav-bar title="会员登录" left-arrow @click-left="$router.go(-1)" />

    <!-- 主体 -->
    <div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>

      <div class="form">
        <div class="form-item">
          <input
          v-model="mobile"
            class="inp"
            maxlength="11"
            placeholder="请输入手机号码"
            type="text"
          />
        </div>
        <div class="form-item">
          <input
            v-model="picCode"
            class="inp"
            maxlength="5"
            placeholder="请输入图形验证码"
            type="text"
          />
          <img v-if="picUrl" :src="picUrl" @click="getPicCode" alt="" />
        </div>
        <div class="form-item">
          <input v-model="msgCode" class="inp" placeholder="请输入短信验证码" type="text" />
          <button @click="getCode">
            {{
              totalSecond === second
                ? "获取验证码"
                : second + "秒后再获取验证码"
            }}
          </button>
        </div>
      </div>

      <div @click="login" class="login-btn">登录</div>
    </div>
  </div>
</template>

<script>
// 按需导入axios请求接口方法
// 全局方法
import { getPicCode, getMsgCode, codeLogin } from '@/api/login'
// import { Toast } from 'vant'

export default {
  // 多个单词命名
  name: 'LoginIndex',
  data () {
    return {
      picKey: '', // 将来请求传递的图形验证码唯一标识
      picUrl: '', // 存储请求渲染的图片地址
      totalSecond: 60, // 总秒数
      second: 60, // 当前秒数
      timer: null, // 定时器id,方便开关定时器
      mobile: '', // 手机号
      picCode: '', // 用户输入的图形验证码
      msgCode: '' // 短信验证码
    }
  },
  // 测试接口,在created中发送请求
  created () {
    // 获取图形验证码 方法封装起来
    // 带 this 是局部方法
    this.getPicCode()
  },
  methods: {
    // 获取图形验证码
    async getPicCode () {
      const {
        data: { base64, key }
      } = await getPicCode()
      this.picUrl = base64 // 图形验证码
      this.picKey = key // 唯一标识

      // Toast('验证码获取成功')
      // this.$toast('验证码获取成功')
      // this.$toast.loading({
      //   message: '加载中...',
      //   forbidClick: true
      // })
    },

    // 校验 手机号 和 图形验证码 是否合法
    vaildFn () {
      if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
        this.$toast('请输入正确的手机号')
        return false
      }
      if (!/^\w{4}$/.test(this.picCode)) {
        this.$toast('请输入正确的图形验证码')
        return false
      }
      return true
    },

    // 获取短信验证码
    async getCode () {
      // 请求倒计时前进行校验
      if (!this.vaildFn()) {
        // 没必要往下走了
        return
      }
      // 当没有开定时器，且总秒数=当前秒数时，才开定时器
      if (!this.timer && this.second === this.totalSecond) {
        // 发送请求 获取验证码
        // 预期：希望如果响应的status非200,最好抛出一个promise错误，await只会等待成功的promise
        await getMsgCode(this.picCode, this.picKey, this.mobile)
        // console.log(res)
        this.$toast('发送成功,请注意查收')

        // 开启倒计时
        this.timer = setInterval(() => {
          // console.log('开始倒计时')
          this.second--

          if (this.second <= 0) {
            // 清空定时器
            clearInterval(this.timer)
            this.timer = null // 重置
            this.second = this.totalSecond // 归位
          }
        }, 1000)
      }
    },

    // 短信验证码登录功能
    async login () {
      // 校验 手机号 和 图形验证码 是否合法
      if (!this.vaildFn()) {
        return
      }
      // 校验短信验证码
      if (!/^\d{6}$/.test(this.msgCode)) {
        this.$toast('请输入正确的短信验证码')
      }
      const res = await codeLogin(this.mobile, this.msgCode)
      // console.log(res)
      // 请求的res携带回来的data信息存到仓库中
      this.$store.commit('user/setUserInfo', res.data)
      // 跳转到首页
      this.$router.push('/')
      this.$toast('登录成功')
    }
  },
  // 修改bug:离开页面，关闭定时器
  destroyed () {
    clearInterval(this.timer)
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;
    h3 {
      font-size: 26px;
      font-weight: normal;
    }
    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }
    img {
      width: 94px;
      height: 31px;
    }
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg, #ecb53c, #ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
