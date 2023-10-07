<template>
  <div class="cart">
    <van-nav-bar title="购物车" fixed />
    <!-- 登录 且 购物车商品不为空 -->
    <div v-if="isLogin && cartList.length > 0">
      <!-- 购物车开头 -->
      <div class="cart-title">
        <span class="all"
          >共<i>{{ cartTotal || 0 }}</i
          >件商品</span
        >
        <!-- 点击“编辑”按钮，编辑值取反 -->
        <span class="edit" @click="isEdit = !isEdit">
          <van-icon name="edit" />
          编辑
        </span>
      </div>

      <!-- 购物车列表 -->
      <div class="cart-list">
        <div class="cart-item" v-for="item in cartList" :key="item.goods_id">
          <!-- 控制小复选框 -->
          <van-checkbox
            @click="toggleCheck(item.goods_id)"
            :value="item.isChecked"
          ></van-checkbox>
          <div class="show">
            <img :src="item.goods.goods_image" alt="" />
          </div>
          <div class="info">
            <span class="tit text-ellipsis-2">{{ item.goods.goods_name }}</span>
            <span class="bottom">
              <div class="price">
                ¥ <span>{{ item.goods.goods_price_min }}</span>
              </div>
              <!-- 数量组件 -->
              <!-- <div class="count-box">
              <button class="minus">-</button>
              <input class="inp" :value="4" type="text" readonly />
              <button class="add">+</button>
            </div> -->
              <!-- 使用组件 -->
              <!-- 既希望保留原本的形参，又需要通过调用函数传参 => 箭头函数包装一层 -->
              <!-- CountBox所有事件都是@input -->
              <!-- 从仓库拿数据 -->
              <CountBox
                :value="item.goods_num"
                @input="
                  (value) =>
                    changeCount(value, item.goods_id, item.goods_sku_id)
                "
              ></CountBox>
            </span>
          </div>
        </div>
      </div>

      <!-- 购物车底部 -->
      <div class="footer-fixed">
        <div class="all-check" @click="toggleAllCheck">
          <van-checkbox :value="isAllChecked" icon-size="18"></van-checkbox>
          全选
        </div>

        <div class="all-total">
          <div class="price">
            <span>合计：</span>
            <span
              >¥ <i class="totalPrice">{{ selPrice }}</i></span
            >
          </div>
          <!-- "编辑"状态是删除，非编辑状态是结算 -->
          <div
            v-if="!isEdit"
            class="goPay"
            :class="{ disabled: selCount === 0 }"
          >
            结算({{ selCount }})
          </div>
          <div
            v-else
            @click="handleDel"
            class="delete"
            :class="{ disabled: selCount === 0 }"
          >
            删除
          </div>
        </div>
      </div>
    </div>

    <!-- 未登录/购物车商品为空 -->
    <div class="empty-cart" v-else>
      <img src="@/assets/empty.png" alt="" />
      <div class="tips">您的购物车是空的, 快去逛逛吧</div>
      <div class="btn" @click="$router.push('/')">去逛逛</div>
    </div>
  </div>
</template>

<script>
// 使用组件：3步
// 导入组件
import CountBox from '@/components/countBox.vue'
// 将数据映射到页面
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'CartPage',
  data () {
    return {
      // "编辑"按钮状态 布尔值
      isEdit: false
    }
  },
  // 注册组件
  components: {
    CountBox // 数量小组件
  },
  computed: {
    isLogin () {
      return this.$store.getters.token
    },
    ...mapState('cart', ['cartList']),
    ...mapGetters('cart', [
      'cartTotal',
      'selCount',
      'selPrice',
      'isAllChecked'
    ])
  },
  created () {
    if (this.isLogin) {
      this.$store.dispatch('cart/getCartAction')
    }
  },
  methods: {
    // 小复选框-大复选框
    toggleCheck (goodsId) {
      this.$store.commit('cart/toggleCheck', goodsId)
    },
    // 大复选框-小复选框
    toggleAllCheck () {
      // 对大复选框值取反 传去对应store
      this.$store.commit('cart/toggleAllCheck', !this.isAllChecked)
    },
    changeCount (value, goodsId, skuId) {
      // 调用vuex的action,进行数量修改
      // 从store拿数据
      this.$store.dispatch('cart/changeCountAction', {
        value,
        goodsId,
        skuId
      })
    },
    async handleDel () {
      if (this.selCount === 0) return
      // 调用接口
      await this.$store.dispatch('cart/delSelect')
      this.isEdit = false
    }
  },
  watch: {
    // 监视 “编辑”状态，设置两种状态下的小复选框
    isEdit (value) {
      // 删除状态，所有小复选框不选中
      if (value) {
        this.$store.commit('cart/toggleAllCheck', false)
      } else {
        // 结算状态，所有小复选框选中
        this.$store.commit('cart/toggleAllCheck', true)
      }
    }
  }
}
</script>

<style lang="less" scoped>
// 主题 padding
.cart {
  padding-top: 46px;
  padding-bottom: 100px;
  background-color: #f5f5f5;
  min-height: 100vh;
  .cart-title {
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    font-size: 14px;
    .all {
      i {
        font-style: normal;
        margin: 0 2px;
        color: #fa2209;
        font-size: 16px;
      }
    }
    .edit {
      .van-icon {
        font-size: 18px;
      }
    }
  }

  .cart-item {
    margin: 0 10px 10px 10px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    background-color: #ffffff;
    border-radius: 5px;

    .show img {
      width: 100px;
      height: 100px;
    }
    .info {
      width: 210px;
      padding: 10px 5px;
      font-size: 14px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .bottom {
        display: flex;
        justify-content: space-between;
        .price {
          display: flex;
          align-items: flex-end;
          color: #fa2209;
          font-size: 12px;
          span {
            font-size: 16px;
          }
        }
        .count-box {
          display: flex;
          width: 110px;
          .add,
          .minus {
            width: 30px;
            height: 30px;
            outline: none;
            border: none;
          }
          .inp {
            width: 40px;
            height: 30px;
            outline: none;
            border: none;
            background-color: #efefef;
            text-align: center;
            margin: 0 5px;
          }
        }
      }
    }
  }
}

.footer-fixed {
  position: fixed;
  left: 0;
  bottom: 50px;
  height: 50px;
  width: 100%;
  border-bottom: 1px solid #ccc;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;

  .all-check {
    display: flex;
    align-items: center;
    .van-checkbox {
      margin-right: 5px;
    }
  }

  .all-total {
    display: flex;
    line-height: 36px;
    .price {
      font-size: 14px;
      margin-right: 10px;
      .totalPrice {
        color: #fa2209;
        font-size: 18px;
        font-style: normal;
      }
    }

    .goPay,
    .delete {
      min-width: 100px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      background-color: #fa2f21;
      color: #fff;
      border-radius: 18px;
      &.disabled {
        background-color: #ff9779;
      }
    }
  }
}
.empty-cart {
  padding: 80px 30px;
  img {
    width: 140px;
    height: 92px;
    display: block;
    margin: 0 auto;
  }
  .tips {
    text-align: center;
    color: #666;
    margin: 30px;
  }
  .btn {
    width: 110px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    background-color: #fa2c20;
    border-radius: 16px;
    color: #fff;
    display: block;
    margin: 0 auto;
  }
}
</style>
