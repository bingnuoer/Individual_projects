<template>
  <div class="prodetail">
    <van-nav-bar
      fixed
      title="商品详情页"
      left-arrow
      @click-left="$router.go(-1)"
    />

    <van-swipe :autoplay="3000" @change="onChange">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img :src="image.external_url" />
      </van-swipe-item>

      <template #indicator>
        <!-- 轮播图当前第几页 -->
        <div class="custom-indicator">
          {{ current + 1 }} / {{ images.length }}
        </div>
      </template>
    </van-swipe>

    <!-- 商品说明 -->
    <div class="info">
      <div class="title">
        <div class="price">
          <span class="now">￥{{ detail.goods_price_min }}</span>
          <span class="oldprice">￥{{ detail.line_price_max }}</span>
        </div>
        <div class="sellcount">已售{{ detail.goods_sales }}件</div>
      </div>
      <div class="msg text-ellipsis-2">
        {{ detail.goods_name }}
      </div>

      <div class="service">
        <div class="left-words">
          <span><van-icon name="passed" />七天无理由退货</span>
          <span><van-icon name="passed" />48小时发货</span>
        </div>
        <div class="right-icon">
          <van-icon name="arrow" />
        </div>
      </div>
    </div>

    <!-- 商品评价 -->
    <div class="comment">
      <div class="comment-title">
        <div class="left">商品评价 ({{ total }}条)</div>
        <div class="right">查看更多 <van-icon name="arrow" /></div>
      </div>
      <div class="comment-list">
        <div
          class="comment-item"
          v-for="item in commentList"
          :key="item.commit_id"
        >
          <div class="top">
            <img :src="item.user.avatar_url || defaultImg" alt="" />
            <div class="name">{{ item.user.nick_name }}</div>
            <van-rate
              :size="16"
              :value="item.score / 2"
              color="#ffd21e"
              void-icon="star"
              void-color="#eee"
            />
          </div>
          <div class="content">
            {{ item.content }}
          </div>
          <div class="time">
            {{ item.create_time }}
          </div>
        </div>
      </div>
    </div>

    <!-- 商品描述 -->
    <!-- detail.content是个标签，要用v-html解析 -->
    <div class="desc" v-html="detail.content"></div>

    <!-- 底部 -->
    <div class="footer">
      <div class="icon-home">
        <van-icon name="wap-home-o" />
        <span>首页</span>
      </div>
      <div class="icon-cart">
        <van-icon name="shopping-cart-o" />
        <span>购物车</span>
      </div>
      <div @click="addFn" class="btn-add">加入购物车</div>
      <div @click="buyFn" class="btn-buy">立刻购买</div>
    </div>

    <!-- 弹层 -->
    <van-action-sheet
      v-model="showPannel"
      :title="mode === 'cart' ? '加入购物车' : '立刻购买'"
    >
      <div class="product">
        <div class="product-title">
          <div class="left">
            <img :src="detail.goods_image" alt="" />
          </div>
          <div class="right">
            <div class="price">
              <span>¥</span>
              <span class="nowprice">{{ detail.goods_price_min }}</span>
            </div>
            <div class="count">
              <span>库存</span>
              <span>{{ detail.stock_total }}</span>
            </div>
          </div>
        </div>
        <div class="num-box">
          <span>数量</span>
          <!-- v-model绑定组件：父传子“:value”;子传父：“@input” -->
          <countBox v-model="addCount"></countBox>
        </div>
        <!-- 库存为>0,才能加购/购买 -->
        <div class="showbtn" v-if="detail.stock_total > 0">
          <div class="btn" v-if="mode === 'cart'" @click="addCart">
            加入购物车
          </div>
          <div class="btn now" v-if="mode === 'buyNow'">立刻购买</div>
        </div>
        <div class="btn-none" v-else>该商品已抢完</div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import { getProDetail, getProComments } from '@/api/product'
import defaultImg from '@/assets/default-avatar.png'
import countBox from '@/components/countBox.vue'
import { addCart } from '@/api/cart'
export default {
  name: 'ProDetail',
  data () {
    return {
      images: [],
      current: 0,
      detail: {}, // 存所有渲染的数据
      total: 0, // 评论总数
      commentList: [], // 评论列表
      defaultImg, // 默认头像
      showPannel: false, // 展示弹层面板
      mode: 'cart', // 加购物车 弹层标题
      addCount: 1, // 数量框绑定的数据
      cartTotal: 0 // 购物车商品数量
    }
  },
  // 组件
  components: {
    countBox
  },
  // 获取动态路由参数
  computed: {
    goodsId () {
      return this.$route.params.id
    }
  },
  created () {
    // 封装方法
    // 获取所有渲染的数据
    this.getdetail()
    // 获取商品评论的数据
    this.getComments()
  },
  methods: {
    // 轮播图
    onChange (index) {
      this.current = index
    },
    // 获取所有渲染的数据
    async getdetail () {
      const {
        data: { detail }
      } = await getProDetail(this.goodsId)
      this.detail = detail
      this.images = detail.goods_images
      // console.log(this.images)
      console.log(await getProDetail(this.goodsId))
    },
    // 获取商品评论的数据
    async getComments () {
      // 解构出想要的数据
      const {
        data: { list, total }
      } = await getProComments(this.goodsId, 3)
      this.total = total
      this.commentList = list
    },
    // 加入购物车
    addFn () {
      this.showPannel = true
      this.mode = 'cart'
    },
    // 立刻购买
    buyFn () {
      this.showPannel = true
      this.mode = 'buyNow' // 立刻购买
    },
    // 点击加入购物车按钮 触发事件
    async addCart () {
      // 判断 token 是否存在
      // 1.token不存在，弹出弹框
      if (!this.$store.getters.token) {
        // console.log('弹出弹框')
        this.$dialog
          .confirm({
            title: '温馨提示',
            message: '此时需要先登录才能继续操作哦',
            confirmButtonText: '去登录',
            cancelButtonText: '再逛逛'
          })
          .then(() => {
            // 确认，去登录
            // this.$router.push('/login')
            // 回跳效果：登录完直接跳转到当前页
            // this.$router.fallpush(包含路径参数)
            // 跳转-替换路径：replace
            // 跳转-新开一个页面：path
            this.$router.replace({
              path: '/login',
              query: {
                backUrl: this.$router.fallpath
              }
            })
          })
          .catch(() => {
            // 取消
          })
        return
      }
      // 2.token存在，正常请求_调用加入购物车接口
      const { data } = await addCart(this.goodsId, this.addCount, this.detail.skuList[0].goods_sku_id)
      this.cartTotal = data.cartTotal
      this.$toast('加入购物车成功')
      this.showPannel = false // 关闭弹窗

      console.log('正常请求')
    }
  }
}
</script>

<style lang="less" scoped>
.prodetail {
  padding-top: 46px;
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  img {
    display: block;
    width: 100%;
  }
  .custom-indicator {
    position: absolute;
    right: 10px;
    bottom: 10px;
    padding: 5px 10px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 15px;
  }
  .desc {
    width: 100%;
    overflow: scroll;
    ::v-deep img {
      display: block;
      width: 100% !important;
    }
  }
  .info {
    padding: 10px;
  }
  .title {
    display: flex;
    justify-content: space-between;
    .now {
      color: #fa2209;
      font-size: 20px;
    }
    .oldprice {
      color: #959595;
      font-size: 16px;
      text-decoration: line-through;
      margin-left: 5px;
    }
    .sellcount {
      color: #959595;
      font-size: 16px;
      position: relative;
      top: 4px;
    }
  }
  .msg {
    font-size: 16px;
    line-height: 24px;
    margin-top: 5px;
  }
  .service {
    display: flex;
    justify-content: space-between;
    line-height: 40px;
    margin-top: 10px;
    font-size: 16px;
    background-color: #fafafa;
    .left-words {
      span {
        margin-right: 10px;
      }
      .van-icon {
        margin-right: 4px;
        color: #fa2209;
      }
    }
  }

  .comment {
    padding: 10px;
  }
  .comment-title {
    display: flex;
    justify-content: space-between;
    .right {
      color: #959595;
    }
  }

  .comment-item {
    font-size: 16px;
    line-height: 30px;
    .top {
      height: 30px;
      display: flex;
      align-items: center;
      margin-top: 20px;
      img {
        width: 20px;
        height: 20px;
      }
      .name {
        margin: 0 10px;
      }
    }
    .time {
      color: #999;
    }
  }

  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 55px;
    background-color: #fff;
    border-top: 1px solid #ccc;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    .icon-home,
    .icon-cart {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      .van-icon {
        font-size: 24px;
      }
    }
    .btn-add,
    .btn-buy {
      height: 36px;
      line-height: 36px;
      width: 120px;
      border-radius: 18px;
      background-color: #ffa900;
      text-align: center;
      color: #fff;
      font-size: 14px;
    }
    .btn-buy {
      background-color: #fe5630;
    }
  }
}

.tips {
  padding: 10px;
}

.product {
  .product-title {
    display: flex;
    .left {
      img {
        width: 90px;
        height: 90px;
      }
      margin: 10px;
    }
    .right {
      flex: 1;
      padding: 10px;
      .price {
        font-size: 14px;
        color: #fe560a;
        .nowprice {
          font-size: 24px;
          margin: 0 5px;
        }
      }
    }
  }

  .num-box {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    align-items: center;
  }

  .btn,
  .btn-none {
    height: 40px;
    line-height: 40px;
    margin: 20px;
    border-radius: 20px;
    text-align: center;
    color: rgb(255, 255, 255);
    background-color: rgb(255, 148, 2);
  }
  .btn.now {
    background-color: #fe5630;
  }
  .btn-none {
    background-color: #cccccc;
  }
}
</style>
