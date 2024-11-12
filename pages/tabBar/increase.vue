<template>
  <view class="container">
    <!-- 货币列表 -->
    <view class="currency-list">
      <!-- 列表头 -->
      <view class="list-header">
        <view class="header-item">市值</view>
        <view class="header-item">现价</view>
        <view class="header-item">涨跌幅</view>
      </view>
      <view
        class="currency-item"
        v-for="(currency, index) in currencies"
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
            <view class="currency-market">市值{{ currency.market }}亿</view>
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
</template>
  
  <script>
import { currencyList } from "@/api/system/user.js";
export default {
  data() {
    return {
      currencies: [
        // {
        //   rank: 1,
        //   name: "ZTCNY 智天数字人民币",
        //   marketCap: "市值35500.55亿",
        //   price: "10.38",
        //   change: 4.94,
        // },
      ],
    };
  },
  onShow() {
    this.getCurrencyList();
  },
  methods: {
    //获取列表
    getCurrencyList() {
      currencyList().then((res) => {
        this.currencies = res.data;
      });
    },
    //跳转售卖
    sellItem(currency) {
      uni.navigateTo({
        url:
          "/pages/tabBar/transactionMonetization?currency=" +
          JSON.stringify(currency),
      });
    },
  },
};
</script>
  
  <style lang="scss" scoped>
page {
  background: #ba0015;
}

.container {
  padding: 40rpx;
  background: url("@/static/images/temp/beijing.png") no-repeat center center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 100%;
  min-height: calc(100vh - 44px);
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
.list-header {
  display: grid;
  grid-template-columns: 53% 24.5% 24.5%;
  font-weight: bold;
  color: #000;
  height: 88rpx;
  line-height: 88rpx;
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
</style>
  