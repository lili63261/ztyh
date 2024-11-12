<template>
  <view class="container">
    <!-- 页面标题 -->
    <view class="header">
      <!-- <text class="header-subtitle">完成实名认证后才可以进行股权交易</text> -->
      <uni-notice-bar
        showIcon
        type="line"
        single
        scrollable
        :speed="25"
        text="交易之前请先领取智天银行卡，抛售后的收益到智天银行卡中查看"
      ></uni-notice-bar>
    </view>

    <!-- 资产统计，左右结构 -->
    <view class="asset-summary card">
      <view class="total-asset">
        <text class="label">总币种资产折合</text>
        <text class="asset-value">≈{{ totalAsset }} 元</text>
      </view>
      <!-- <view class="detail-button" @click="goToDetail">明细</view> -->
    </view>

    <image
      src="@/static/images/temp/1.jpg"
      class="detail-image"
      @click="goIncrease"
    ></image>

    <!-- 我的账户资产列表，左右结构 -->
    <view class="account-assets">
      <view
        v-for="(item, index) in accountList"
        :key="index"
        class="asset-item card"
      >
        <view class="asset-info">
          <view class="asset-name"
            >{{ item.code }}/
            <span class="name-class">{{ item.name }}</span></view
          >
          <view class="asset-amount"
            >{{ item.balance }}枚≈{{ item.total}}元</view
          >
        </view>
        <view class="right">
          <view class="sell-button2" @click="navDetail(item.code)">查看明细</view>
          <view class="sell-button" @click="sellNow(item)">立即抛售</view>
        </view>
      </view>
    </view>
  </view>
</template>
  
  <script>
import { currencyAccountList, currencySell } from "@/api/mine/withdraw.js";
import { currencyList } from "@/api/system/user.js";
import BigNumber from "bignumber.js";
export default {
  data() {
    return {
      totalAsset: "", // 示例数据
      accountList: [],
      currencyDataList: [],
    };
  },
  async onLoad() {
    await this.getCurrencyList();
    this.getCurrencyAccountList();
  },
  methods: {
    navDetail(code) {
      uni.navigateTo({
        url: "/pages/tabBar/increase-Details?code="+code,
      });
    },
    getItemTotal(balance, code) {
      const list = this.currencyDataList.filter((item) => item.code == code);
      if (list.length > 0) {
        const currency = list[0];
        return new BigNumber(balance).multipliedBy(currency.money).toFixed(2);
        // return (balance * currency.money).toFixed(2);
      } else {
        return 0;
      }
    },
    goToDetail() {
      uni.navigateTo({
        url: "/pages/detail/detail",
      });
    },
    sell(asset) {
      console.log(`抛售 ${asset.name}`);
    },
    sellNow(item) {
      const code = item.code;
      const list = this.currencyDataList.filter((item) => item.code == code);
      if (list.length > 0) {
        const currency = list[0];
        uni.navigateTo({
          url:
            "/pages/tabBar/transactionMonetization?currency=" +
            JSON.stringify(currency),
        });
      }
    },
    goIncrease() {
      uni.switchTab({
        url: "/pages/tabBar/increase",
      });
    },
    //获取所有币种
    async getCurrencyList() {
      const res = await currencyList();
      this.currencyDataList = res.data;
    },
    // 获取自己的币种
    getCurrencyAccountList() {
      currencyAccountList().then((res) => {
        this.accountList = res.data.map((item) => {
          const list = this.currencyDataList.filter(
            (_item) => _item.code == item.code
          );
          var total = 0;
          if (list.length > 0) {
            const currency = list[0];
            const itemBalance = new BigNumber(item.balance); // 假设 item.balance 是一个数值
            const currencyMoney = new BigNumber(currency.money); // 假设 currency.money 是一个数值
            // 计算 item.balance * currency.money，并将结果保留两位小数
            total = itemBalance.multipliedBy(currencyMoney).toNumber();
          } else {
            total = 0;
          }
          return {
            ...item,
            total,
          }
        });
        this.totalAsset = this.accountList.reduce((total, item) => {
          return new BigNumber(total).plus(item.total).toNumber();
        },0)

        // this.totalAsset = res.data.reduce((total, item) => {
        //   const list = this.currencyDataList.filter(
        //     (_item) => _item.code == item.code
        //   );
        //   if (list.length > 0) {
        //     const currency = list[0];
        //     const itemBalance = new BigNumber(item.balance); // 假设 item.balance 是一个数值
        //     const currencyMoney = new BigNumber(currency.money); // 假设 currency.money 是一个数值
        //     // 计算 item.balance * currency.money，并将结果保留两位小数
        //     const calculatedAmount = itemBalance.multipliedBy(currencyMoney);
        //     // 计算 total + calculatedAmount
        //     const newTotal = new BigNumber(total)
        //       .plus(new BigNumber(calculatedAmount))
        //       .toNumber();
        //     return newTotal;
        //     // return total + (item.balance * currency.money).toFixed(2);
        //   } else {
        //     return new BigNumber(total).plus(0).toNumber();
        //   }
        // }, 0);
      });
    },
  },
};
</script>
  
  <style scoped lang="scss">
::v-deep {
  .uni-noticebar__content-text {
    text-align: left;
  }
}
/* 全局容器 */
.container {
  display: flex;
  flex-direction: column;
  padding: 40rpx;
  background: url("@/static/images/temp/beijing.png") no-repeat center center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 100%;
  min-height: calc(100vh - 88rpx);
}

.asset-summary {
  background: url("@/static/images/temp/dhfangkuang.png") no-repeat center
    center;
  background-size: 100% 100%;
}
/* 页面标题部分 */
.header {
  text-align: center;
  margin-bottom: 10rpx;
}

.header-title {
  font-size: 48rpx;
  font-weight: bold;
  color: #333;
}

.header-subtitle {
  font-size: 28rpx;
  color: #f1cd55;

  margin-top: 20rpx;
}

/* 资产统计卡片样式，左右结构 */
.card {
  background-color: #fff;
  /* border-radius: 20rpx; */
  padding: 40rpx;
  /* box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1); */
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  /* margin-bottom: 40rpx; */
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.total-asset {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
}

.label {
  font-size: 32rpx;
  color: #333;
}

.asset-value {
  font-size: 40rpx;
  font-weight: bold;
  color: #ff5722;
  margin-top: 20rpx;
}

/* 查看明细按钮 */
.detail-button {
  display: block;
  width: fit-content;
  text-align: center;
  background-color: #f4ca5c;
  color: #ff0022;
  padding: 10rpx 24rpx;
  border-radius: 16rpx;
  font-size: 32rpx;
  font-weight: bold;
  transition: background-color 0.3s ease;
}
.detail-image {
  height: 264rpx;
  width: 100%;
  margin-top: 20rpx;
  border-radius: 16rpx;
}
.detail-button:hover {
  background-color: #0056b3;
}

/* 账户资产列表，左右结构 */
.account-assets {
  margin-top: 20rpx;
  background-color: #fff;
  border-radius: 20rpx;
  padding: 0 40rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
}

.asset-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx 0;
  /* border-bottom: 2rpx solid #eaeaea; */
}

.asset-info {
  display: flex;
  flex-direction: column;
}

.asset-name {
  font-size: 32rpx;
  font-weight: bold;
  color: #000;
}

.name-class {
  font-size: 26rpx;
  color: #b8b5b5;
}

.asset-amount {
  font-size: 30rpx;
  color: green;
  margin-top: 20rpx;
}
.right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 10rpx;
}
/* 立即抛售按钮，左右结构 */
.sell-button,
.sell-button2 {
  display: block;
  width: fit-content;
  text-align: center;
  /* background-color: #f4ca5c; */
  color: #ff0022;
  padding: 10rpx 24rpx;
  border-radius: 16rpx;
  font-size: 26rpx;
  font-weight: bold;
  transition: background-color 0.3s ease;
  border: 1px solid #ff0022;
}

.sell-button2 {
  color: #ff9a43;
  border: 1px solid #ff9a43;
}
</style>
  