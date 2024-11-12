<template>
  <view class="container">
    <image src="@/static/images/temp/zhitianguquan.png" class="title-class" />
    <image src="@/static/images/temp/tixianwenzi.png" class="title-sub-class" />
    <!-- 每个股权卡片 -->
    <view class="stock-card" v-for="(item, index) in stocks" :key="index">
      <view class="stock-header">
        <view class="stock-title"
          >{{ item.name }}

          <span class="round"></span>
          <span class="round1"></span>
          <span class="round2"></span>
        </view>
      </view>

      <view class="stock-content">
        <view class="stock-details">
          <view class="stock-info">
            <view class="stock-count">持股数：<span>{{ item.stock }}</span>万股</view>
            <view class="stock-price"
              >价格：{{ item.money }}元 | 可分红{{ item.subsidy }}万元</view
            >
          </view>
        </view>

        <view class="stock-bonus">
          <view class="bonus-description"
            >每日提现{{ item.cashback }}元（{{
              item.integral
            }}智天积分）</view
          >
          <view class="bonus-stage"
            >第一阶段分红可提现{{ item.subsidy }}元</view
          >
        </view>
      </view>
      <view class="buy-btn" @click="navPayOrder(item)">立即购买</view>
    </view>
  </view>
</template>
  
  <script>
  	import { stockList } from '@/api/bond/bond.js'
export default {
  data() {
    return {
      stocks: [
        // {
        //   title: "智天商城股权",
        //   shares: "3",
        //   price: "500",
        //   bonus: "300万",
        //   dailyWithdrawal: "1",
        //   dailyPoints: "500智天积分",
        //   stageBonus: "300万",
        //   icon: "@/static/stock1.png",
        // },
        // {
        //   title: "智天数字人民币股权",
        //   shares: "6",
        //   price: "1000",
        //   bonus: "600万",
        //   dailyWithdrawal: "1",
        //   dailyPoints: "1000智天积分",
        //   stageBonus: "600万",
        //   icon: "@/static/stock2.png",
        // },
        // {
        //   title: "智天数字货币股权",
        //   shares: "24",
        //   price: "4000",
        //   bonus: "2400万",
        //   dailyWithdrawal: "1",
        //   dailyPoints: "4000智天积分",
        //   stageBonus: "2400万",
        //   icon: "@/static/stock3.png",
        // },
        // {
        //   title: "智天比特币股权",
        //   shares: "36",
        //   price: "6000",
        //   bonus: "3600万",
        //   dailyWithdrawal: "1",
        //   dailyPoints: "6000智天积分",
        //   stageBonus: "3600万",
        //   icon: "@/static/stock4.png",
        // },
      ],
    };
  },
  onLoad(){
    this.getStockList()
  },
  methods: {
    goToStockDetail(stock) {
      uni.navigateTo({
        url: `/pages/tabBar/equityApplication?id=${123}`,
      });
    },
    navPayOrder(item) {
      const name = `${item.name}`;
      const id = item.id;
      // 业务订单类型,0-债券买入，210-股权买入
      const busiType = 210 ;
      var remarkList = [];
      remarkList.push(`持股数${item.stock}万股`);
      remarkList.push(`可分红${item.subsidy}万元`);
      remarkList.push(`每日提现${item.cashback}万元(${item.integral}智天积分)`);
      remarkList.push(`第一阶段分红可提现${item.subsidy}元`);
      uni.navigateTo({
        url: `/pages/orderPayment/index?money=${item.money}&name=${name}&id=${id}&busiType=${busiType}&remarkList=${JSON.stringify(remarkList)}`,
      });
    },
    getStockList(){
      stockList().then(res=>{
        this.stocks = res.data;
      })
    }
  },
};
</script>
  
  <style lang="scss" scoped>
page {
  background: #ba0015;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: url("@/static/images/temp/beijing.png") no-repeat center center;
  background-size: 100% 100%;
  color: #fff;
  padding: 32rpx;
  min-height: 100vh;
}
.title-class {
  width: 286rpx;
  height: 102rpx;
  padding-top: 32rpx;
}
.title-sub-class {
  height: 88rpx;
  width: 543rpx;
  margin-top: 24rpx;
  margin-bottom: 20rpx;
}

.stock-card {
  width: 100%;
  //   background: url("@/static/images/temp/baikuang.png") no-repeat center center;
  background-size: 100% 100%;
  border-radius: 20rpx;
  margin-bottom: 20rpx;
  background-color: #fbf5e9;
  position: relative;
}

.stock-header {
}

.stock-title {
  font-size: 26rpx;
  font-weight: bold;
  color: #fff;

  background: url("@/static/images/temp/biankuang.png") no-repeat center center;
  background-size: 100% 100%;
  width: fit-content;
  padding-right: 220rpx;
  padding-left: 20rpx;
  height: 66rpx;
  line-height: 66rpx;
  display: flex;
  justify-items: center;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10rpx;
}
.round {
  width: 18rpx;
  height: 18rpx;
  background-color: #fff;
  border-radius: 50%;
}

.round1 {
  width: 12rpx;
  height: 12rpx;
  background-color: #fff;
  border-radius: 50%;
}

.round2 {
  width: 6rpx;
  height: 6rpx;
  background-color: #fff;
  border-radius: 50%;
}

.stock-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: url("@/static/images/temp/baikuang.png") no-repeat center center;
  background-size: 100% 100%;
  padding:62rpx 62rpx 0rpx 62rpx;
}

.stock-details {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
}

.stock-icon {
  width: 100rpx;
  height: 100rpx;
  margin-right: 20rpx;
}

.stock-info {
  display: flex;
  flex-direction: column;
}

.stock-count {
  font-size: 28rpx;
  font-weight: bold;
  margin-bottom: 10rpx;
  color: #D11E2B;
  text-align: center;
  span{
    font-size: 44rpx;
  }
}

.stock-price {
  font-size: 28rpx;
  color: #4a4443;
}

.stock-bonus {
  text-align: center;
  margin-bottom: 50rpx;
}

.bonus-description {
  font-size: 24rpx;
  color: #FE001C;
  margin-bottom: 10rpx;
  border-radius: 10rpx;
  border: 1px solid #FE001C;
  padding: 5rpx 30rpx;
}

.bonus-stage {
  font-size: 24rpx;
  color: #fff;
  padding: 5rpx 30rpx;
  border-radius: 10rpx;
 background-image: linear-gradient(to right, #FE001C, #FF6F00);
}

.buy-btn {
  background-color: #FDAF27;
  color: #FE001C;
  padding: 10rpx 40rpx;
  border-radius: 10rpx;
  font-size: 24rpx;
  width: fit-content;
  font-weight: bold;
  margin: 0 auto;
  margin-bottom: 20rpx;
}
</style>
  