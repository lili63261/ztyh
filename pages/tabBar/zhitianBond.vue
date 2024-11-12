<template>
  <view class="container">
    <view class="header">
      <text class="title">智天债券</text>
    </view>

    <!-- 每个卡片 -->
    <view class="bond-card" v-for="(item, index) in bonds" :key="index">
      <view class="bond-header">
        <view class="bond-title">智天债券</view>
      </view>
      <view class="bond-content">
        <view class="bond-details">
          <view class="bond-amount">{{ item.subsidy }}万信用养老金</view>
          <view class="bond-bonus">赠送{{ item.stock }}万股智天股权</view>
          <view class="bond-bonus-tip">赠送{{ item.bond }}张1000万债券</view>
        </view>

        <view class="bond-actions">
          <view class="bond-daily-release">
            <span>每日释放{{ item.cashback }}万信用养老金</span>
            <span class="apply-btn">{{ `申请名额${item.quantity}万名` }}</span>
          </view>
          <button class="request-btn" @click="navPayOrder(item)">立即申请</button>
        </view>
      </view>
    </view>
  </view>
</template>
  
  <script>
import { bondList } from "@/api/bond/bond.js";
export default {
  data() {
    return {
      bonds: [
        // {
        //   title: "智天债券",
        //   amount: "300万",
        //   bonus: "3万",
        //   dailyRelease: "三万",
        //   apply: "申请名额10万名",
        // },
        // {
        //   title: "智天债券",
        //   amount: "1000万",
        //   bonus: "10万",
        //   dailyRelease: "十万",
        //   apply: "申请名额60万名",
        // },
        // {
        //   title: "智天债券",
        //   amount: "3000万",
        //   bonus: "30万",
        //   dailyRelease: "三十万",
        //   apply: "申请名额60万名",
        // },
        // {
        //   title: "智天债券",
        //   amount: "6000万",
        //   bonus: "60万",
        //   dailyRelease: "六十万",
        //   apply: "申请名额40万名",
        // },
        // {
        //   title: "智天债券",
        //   amount: "1.0亿",
        //   bonus: "100万",
        //   dailyRelease: "100万",
        //   apply: "申请名额80万名",
        // },
        // {
        //   title: "智天债券",
        //   amount: "2.0亿",
        //   bonus: "300万",
        //   dailyRelease: "300万",
        //   apply: "申请名额60万名",
        // },
      ],
    };
  },
  onLoad(){
    this.getBondList()
  },
  methods: {
    getBondList() {
      bondList().then((res) => {
        console.log(res);
        this.bonds = res.data;
      });
    },
    navPayOrder(item) {
      const name = `${item.subsidy}万信用养老金`;
      const id = item.id;
      // 业务订单类型,0-债券买入，210-股权买入
      const busiType = 0 ;
      var remarkList = [];
      remarkList.push(`赠送${item.stock}万股智天股权`);
      remarkList.push(`每日释放${item.cashback}万信用养老金`);
      uni.navigateTo({
        url: `/pages/orderPayment/index?money=${item.money}&name=${name}&id=${id}&busiType=${busiType}&remarkList=${JSON.stringify(remarkList)}`,
      });
    }
  },
};
</script>
  
  <style lang="scss" scoped>
page {
  background: #ba0015;
}
.container {
  display: grid;
  grid-template-columns: 1fr;
  //   grid-gap: 40rpx;
  //   padding: 40rpx;
  background: url("@/static/images/temp/beijing.png") no-repeat center center;
  background-size: 100% 100%;
  color: #fff;
  min-height: 100vh;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 88rpx;
  //   line-height: 88rpx;
  padding-top: 34rpx;
  font-weight: bold;
  .title {
    font-size: 32rpx;
  }
}

.bond-card {
  display: grid;
  grid-template-columns: 1fr;
  background-color: #fff;
  border-radius: 20rpx;
  padding: 60rpx 80rpx;
  text-align: center;

  background: url("@/static/images/temp/chanpinkuang.png") no-repeat center
    center;
  background-size: 100% 100%;
}

.bond-header {
  // margin-bottom: 20rpx;
  text-align: left;
}

.bond-title {
  font-size: 30rpx;
  font-weight: bold;
  color: #8d673a;
}

.bond-content {
  display: grid;
  grid-template-columns: 1fr;
  // gap: 20rpx;
}

.bond-details {
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
}

.bond-amount {
  color: #ff2c50;
}

.bond-bonus {
  color: #eb2033;
  font-size: 42rpx;
}
.bond-bonus-tip{
  color: #907353;
  font-size: 38rpx;
}
.bond-daily-release {
  font-size: 24rpx;
  color: #907353;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
}

.bond-actions {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 20rpx;
  gap: 20rpx;
}

.apply-btn {
  color: #eb2033;
  border-radius: 30rpx;
  font-size: 24rpx;
  flex: 1;
  border: 1px solid #eb2033;
  padding: 0 10rpx;
  margin-top: 10rpx;
  box-sizing: border-box;
}
.request-btn {
  background-color: #f8ce82;
  color: #aa8245;
  border-radius: 30rpx;
  font-size: 24rpx;
  margin:0;
  padding: 0 60rpx;
  margin: 0 10rpx;
  width: fit-content;
  height: 40rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
  