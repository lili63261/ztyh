<template>
  <view class="container">
    <!-- <view class="header">
      <text class="title">兑换中心</text>
    </view> -->
    <!-- 兑换卡片 -->
    <view class="exchange-card" v-for="(item, index) in exchanges" :key="index">
      <view class="exchange-header">{{ item.amount }}房产兑换金</view>
      <view class="exchange-product">{{ item.product }}</view>
      <view class="exchange-description">{{ item.description }}</view>
    </view>

    <!-- 输入表单 -->
    <view class="form">
      <view class="form-item">
        <view class="label justify"><span>姓</span> <span>名：</span></view>
        <input class="input-field" placeholder="请输入真实姓名" />
      </view>
      <view class="form-item">
        <view class="label justify"
          ><span>身</span><span>份</span><span>证</span><span>号</span
          ><span>码：</span></view
        >
        <input class="input-field" placeholder="请输入身份证号码" />
      </view>
      <view class="form-item">
        <view class="label justify"
          ><span>联</span><span>系</span><span>电</span><span>话：</span></view
        >
        <input class="input-field" placeholder="请输入联系电话" />
      </view>

      <view class="form-item">
        <view class="label justify"
          ><span>收</span><span>货</span><span>地</span><span>址：</span></view
        >
        <input class="input-field" placeholder="请输入收货地址" />
      </view>
    </view>
    <view class="exchange-btn">立即兑换</view>
  </view>
</template>
  
  <script>
export default {
  data() {
    return {
      exchanges: [
        {
          amount: "500万",
          product: "可兑商品",
          description: "150平北京恒大商品房",
        },
        {
          amount: "1000万",
          product: "可兑商品",
          description: "300平北京恒大大平层商品房",
        },
        {
          amount: "2000万",
          product: "可兑商品",
          description: "500平米北京恒大独栋别墅一栋",
        },
      ],
    };
  },
};
</script>
  
  <style lang="scss" scoped>
page {
  background: #ba0015;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 88rpx;
  .title {
    font-size: 32rpx;
    font-weight: bold;
    color: white;
  }
}
.container {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 40rpx;
  padding: 40rpx;
  background: url("@/static/images/temp/beijing.png") no-repeat center center;
  background-size: 100% 100%;
  min-height: 100vh;
}

.exchange-card {
  display: grid;
  grid-template-columns: 1fr;
  background-color: #fff;
  border-radius: 20rpx;
  padding: 40rpx;
  text-align: center;
  background: url("@/static/images/temp/dhfangkuang.png") no-repeat center
    center;
  background-size: 100% 100%;
}

.exchange-header {
  font-size: 56rpx;
  font-weight: bold;
  color: #8f6a40;
  margin-bottom: 20rpx;
}

.exchange-product {
  font-size: 32rpx;
  color: #b8312e;
  background-color: #f0ce53;
  font-weight: bold;
  width: fit-content;
  padding: 10rpx 30rpx;
  margin: 0 auto;
  margin-bottom: 20rpx;
  border-radius: 20rpx;
}

.exchange-description {
  font-size: 40rpx;
  color: #d82d3d;
  font-weight: bold;
  white-space: nowrap;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 30rpx;
  background: url("@/static/images/temp/xinxikuang.png") no-repeat;
  background-size: 100% 100%;
}
.form-item {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 20rpx;
  margin-bottom: 30rpx;
}

.label {
  width: 200rpx; /* 控制标签的宽度 */
  color: #333;
  padding-left: 30rpx;
}

.justify {
  // text-align: justify; /* 使"姓 名"中间有间距 */
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.input-field {
  flex: 1;
  // padding: 20rpx;
  // border: 2rpx solid #ccc;
  background-color: white;
  border-radius: 10rpx;
  text-align: center;
  color: #000;
  height: 60rpx;
}

.exchange-btn {
  font-size: 32rpx;
  color: #b8312e;
  background-color: #f0ce53;
  font-weight: bold;
  width: fit-content;
  padding: 10rpx 30rpx;
  margin: 0 auto;
  margin-bottom: 20rpx;
  border-radius: 20rpx;
}
</style>
  