<template>
  <view class="container">
    <!-- <view class="header">
      <text class="title">交易变现</text>
    </view> -->

    <!-- 按数量交易 -->
    <view class="trade-section">
      <!-- 交易标题和货币选择 -->
      <view class="header1">
        <view class="title" @click="openPopup"
          >我要卖<span>(选择交易币种)</span></view
        >
        <view class="currency">人民币 (CNY)</view>
      </view>

      <!-- 货币切换选项 -->
      <view class="currency-tabs">
        <view class="tab" v-for="(item, index) in currencies" :key="index">
          {{ item }}
        </view>
      </view>

      <!-- 交易认证 -->
      <view class="trade-options">
        <view class="option">
          实名认证
          <image class="option-icon" src="@/static/images/temp/1.png" />
        </view>
        <view class="option">
          <image class="option-icon" src="@/static/images/temp/4.png" />
        </view>
        <view class="option">
          绑定银行卡
          <image class="option-icon" src="@/static/images/temp/2.png" />
        </view>
        <view class="option">
          <image class="option-icon" src="@/static/images/temp/4.png" />
        </view>
        <view class="option">
          开始交易
          <image class="option-icon" src="@/static/images/temp/3.png" />
        </view>
      </view>
      <view class="section-title">按数量交易</view>

      <view class="price-info">
        <view>参考价格：≈{{ currency.money }}元</view>
        <view class="price">当前价值：1枚/{{ currency.money }}元</view>
      </view>

      <!-- 数量输入框 -->
      <view class="input-section">
        <uni-easyinput
          type="number"
          class="input"
          v-model="formData.quantity"
          placeholder="请输入数量"
        />
        <!-- <view class="output">卖出金额：0元</view> -->
      </view>

      <!-- 持有数量 -->
      <view class="holding"> 拥有数量：{{ account.balance }}枚 </view>

      <!-- 确认卖出按钮 -->
      <view class="sell-btn" @click="showGoldFun">确认卖出</view>
      <!-- 交易记录 -->
      <!-- <view class="trade-record" @click="navDetail">交易记录</view> -->
    </view>

    <uni-popup ref="popup" type="bottom" border-radius="10px 10px 0 0">
      <scroll-view style="height: 70vh" scroll-y="true" scroll-left="120">
        <view class="popup-container">
          <view class="currency-list">
            <view class="list-header">
              <view class="header-item">市值</view>
              <view class="header-item">现价</view>
              <view class="header-item">涨跌幅</view>
            </view>
            <view
              class="currency-item"
              v-for="(currency, index) in currencyDataList"
              :key="index"
              @click="sellItem(currency)"
            >
              <view class="currency-info">
                <view class="name-market">
                  <view class="currency-name">
                    <span class="currency-rank">{{ index + 1 }}</span>
                    <span
                      ><span class="code">{{ currency.code }}</span
                      >/ <span class="name">{{ currency.name }}</span></span
                    >
                  </view>
                  <view class="currency-market"
                    >市值{{ currency.market }}亿</view
                  >
                </view>
              </view>
              <view class="currency-price">{{ currency.money }}</view>
              <view
                class="currency-change"
                :class="currency.floatRate <= 0 ? 'positive' : 'negative'"
              >
                {{ currency.floatRate }}%
              </view>
            </view>
          </view>
        </view>
      </scroll-view>
    </uni-popup>

    
    <u-modal
      :show="showGold"
      title="提示"
      showCancelButton
      confirmColor="#2979ff"
      @cancel="showGold = false"
      @confirm="confirmSell"
    >
      <view class="car-modal-content">
        <view class="car-modal-item">
          当前拥有：{{ account.balance}}
        </view>
        <view class="car-modal-item">
          抛售数量：{{ formData.quantity }}
        </view>
        <view class="car-modal-item">
          预计收益：{{ sellAmount }}元
        </view>

        <view class="car-modal-item">确认卖出后，收益可在智天银行卡中查看。</view>
        <view class="car-modal-item">确认是否卖出？</view>
      </view>
    </u-modal>


  </view>
</template>
  
  <script>
import { currencyAccountList, currencySell } from "@/api/mine/withdraw.js";
import { currencyList } from "@/api/system/user.js";
export default {
  data() {
    return {
      showGold:false,
      currencies: [],
      formData: {
        quantity: "",
      },
      currency: {
        id: undefined,
        code: "",
        name: "",
        money: 0,
        market: 0,
        floatRate: "0",
      },
      accountList: [],
      account: {
        code: "",
        name: "",
        balance: 0,
      },
      currencyDataList: [],
    };
  },
  computed: {
    // 计算卖出金额
    sellAmount() {
      return this.formData.quantity * this.currency.money;
    },
  },
  onLoad(e) {
    if (e.currency) {
      this.currency = JSON.parse(e.currency);
      this.currencies[0] = this.currency.code;
      this.currencies[1] = this.currency.market;
      this.currencies[2] = `${this.currency.floatRate}%`;
      this.currencies[3] = this.currency.money;
    }
    this.getCurrencyAccountList();
    this.getCurrencyList();
  },
  methods: {
    navDetail() {
      uni.navigateTo({
        url: "/pages/tabBar/increase-Details?code="+this.currency.code,
      });
    },
    // 获取账户列表
    getCurrencyAccountList() {
      currencyAccountList().then((res) => {
        this.accountList = res.data;
        this.account = this.accountList[0];
      });
    },
    // 获取货币列表
    getCurrencyList() {
    },
    //跳转售卖
    sellItem(currency) {
      uni.redirectTo({
        url:
          "/pages/tabBar/transactionMonetization?currency=" +
          JSON.stringify(currency),
      });
    },
    showGoldFun(){
       // TODO: 处理确认卖出逻辑
       if (!this.formData.quantity) {
        uni.showToast({
          title: "请输入卖出数量",
          icon: "none",
          duration: 2000,
        });
        return;
      }
      if (this.formData.quantity > this.account.balance) {
        uni.showToast({
          title: "卖出数量不能大于持有数量",
          icon: "none",
          duration: 2000,
        });
        return;
      }

      this.showGold = true;

    },
    // 确认卖出
    confirmSell() {
      // TODO: 处理确认卖出逻辑
      if (!this.formData.quantity) {
        uni.showToast({
          title: "请输入卖出数量",
          icon: "none",
          duration: 2000,
        });
        return;
      }
      if (this.formData.quantity > this.account.balance) {
        uni.showToast({
          title: "卖出数量不能大于持有数量",
          icon: "none",
          duration: 2000,
        });
        return;
      }
      const params = {
        code: this.currency.code,
        num: this.formData.quantity,
      };
      currencySell(params).then((res) => {
        if (res.code == 200) {
          uni.showToast({
            title: "卖出成功",
            icon: "success",
            duration: 2000,
          });
          // uni.navigateBack();
          this.showGold = false;
          setTimeout(() => {
            this.$tab.switchTab('/pages/tabBar/mine')
          },1500)
        }
      });
    },

    //打开弹框
    openPopup() {
      this.$refs.popup.open();
    },
    //关闭弹框
    closePopup() {
      this.$refs.popup.close();
    },
    //获取所有币种
    getCurrencyList() {
      currencyList().then((res) => {
        this.currencyDataList = res.data;
      });
    },
    // 获取自己的币种
    getCurrencyAccountList() {
      currencyAccountList().then((res) => {
        this.accountList = res.data;
        const list = this.accountList.filter(
          (item) => item.code == this.currency.code
        );
        if (list.length > 0) {
          this.account = {
            ...this.account,
            ...list[0],
          };
        }
        console.log(this.account);
      });
    },
  },
};
</script>
  
  <style lang="scss" scoped>
page {
  background: #fff;
}


.car-modal-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-items: flex-start;
  gap: 20rpx;
  color: #000;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  // background: url("@/static/images/temp/beijing.png") no-repeat center center;
  // background-size: 100% 100%;
  padding: 20rpx;
  min-height: calc(100vh - 88rpx);
  background: #fff;
  width: 100%;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 88rpx;
  width: 100%;
  color: white;
  .title {
    font-size: 32rpx;
    font-weight: bold;
  }
}

.header1 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40rpx;
  width: 100%;
  .title {
    font-size: 36rpx;
    font-weight: bold;
    span {
      font-size: 24rpx;
      font-weight: normal;
      color: #888;
    }
  }
}

.currency {
  font-size: 24rpx;
  color: #888;
}

.currency-tabs {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20rpx;
  width: 100%;
}

.tab {
  padding: 20rpx 0;
  background-color: #fff;
  border-radius: 10rpx;
  //   box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.1);
  font-size: 28rpx;
}

.trade-options {
  display: flex;
  justify-content: space-between;
  // margin-bottom: 40rpx;
  width: 100%;
  background: #eeeeef;
  padding: 20rpx 10rpx;
  margin-bottom: 20rpx;
}

.option {
  font-size: 28rpx;
  color: #888;
  display: flex;
  align-items: center;
  justify-content: center;
}
.option-icon {
  width: 30rpx;
  height: 30rpx;
  margin-left: 10rpx;
}
.trade-section {
  background-color: #fff;
  padding: 20rpx;
  // border-radius: 20rpx;
  // box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.1);
  width: 100%;
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
}

.price-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40rpx;
}

.price {
  font-size: 28rpx;
  color: #888;
}

.input-section {
  display: flex;
  flex-direction: column;
  //   margin-bottom: 40rpx;
}

.input {
  padding: 20rpx;
  //   border: 2rpx solid #ccc;
  border-radius: 10rpx;
  margin-bottom: 20rpx;
  padding: 0;
}

.output {
  font-size: 28rpx;
  color: #888;
}

.holding {
  font-size: 28rpx;
  color: #000;
  margin-bottom: 40rpx;
}

.sell-btn {
  width: 100%;
  padding: 20rpx;
  background-color: #45b79d;
  color: #fff;
  border-radius: 20rpx;
  font-size: 28rpx;
  text-align: center;
}

.trade-record {
  margin-top: 40rpx;
  font-size: 28rpx;
  color: #888;
  text-align: left;
  width: 100%;
}

.popup-container {
  position: relative;
  .list-header {
    display: grid;
    grid-template-columns: 53% 24.5% 24.5%;
    font-weight: bold;
    color: #000;
    height: 88rpx;
    line-height: 88rpx;
    position: sticky;
    top: 0;
    background: #fff;
  }

  .header-item {
    flex: 1;
    text-align: center;
  }

  .currency-list {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-radius: 16rpx;
  }

  .currency-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    padding: 20rpx;
    border-bottom: 2rpx solid #e0e0e0;
    margin-bottom: 20rpx;
    border-radius: 20rpx;
  }
  .name-market {
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: flex-start;
    gap: 10rpx;
  }
  .currency-info {
    flex: 2;
    display: flex;
    align-items: center;
  }

  .currency-rank {
    font-weight: bold;
    margin-right: 20rpx;
    background-color: #990000;
    color: #fff;
    width: 35rpx;
    height: 35rpx;
    display: block;
    display: flex;
    justify-content: center;
    align-items: center;

  }
  .code {
  font-size: 28rpx;
  font-weight: bold;
  color: #000;
}
.name {
  font-size: 24rpx;
  color: #888;
  margin-top: 20rpx;
}
  .currency-name {
    font-size: 28rpx;
    white-space: nowrap;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .currency-market {
    font-size: 24rpx;
    color: #888;
    margin-left: 10rpx;
  }

  .currency-price {
    flex: 1;
    text-align: center;
  }

  .currency-change {
    flex: 1;
    text-align: center;
    font-weight: bold;
    padding: 20rpx 0;
  }

  .positive {
    color: #fff;
    background-color: #4caf50;
  }

  .negative {
    color: #fff;
    background-color: #f44336;
  }
}
</style>
  