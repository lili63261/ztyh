<template>
  <view class="container">
    <span class="addition-engineNum">{{ additionStr.engineNum }}</span>
    <span class="addition-carNum">{{ additionStr.carNum }}</span>
    <span class="addition-name">{{ additionStr.name }}</span>
    <span class="addition-address">{{ additionStr.address }}</span>
    <span class="addition-registerDate">{{ additionStr.registerDate }}</span>
    <span class="addition-grantDate">{{ additionStr.grantDate }}</span>
    <span class="addition-plateNum">{{ additionStr.plateNum }}</span>
  </view>
</template>
<script>
export default {
  data() {
    return {
      additionStr: {
        // 发动机
        engineNum: "",
        // 车辆识别
        carNum: "",
        name: "",
        address: "",
        registerDate: "",
        grantDate: "",
        plateNum: "",
      },
    };
  },
  onLoad(e) {
    if (e.additionStr) {
      this.additionStr = JSON.parse(e.additionStr);
      console.log(this.additionStr);
    }
  },
  methods: {},
};
</script>
<style scoped lang="scss">
.container {
  background: url("@/static/images/temp/2.jpg") no-repeat center center;
  background-size: 100% 100%;
  width: 750rpx;
  max-width: 750rpx;
  height: 1400rpx;
  position: relative;
  span{
    color: #545160;
    font-size: 40rpx;
    font-weight: bold;
}
.addition-engineNum {
    position: absolute;
    transform: rotate(90deg);
    top: 738rpx;
  }
  .addition-carNum {
    position: absolute;
    transform: rotate(90deg);
    top: 836rpx;
    right: 294rpx;
  }
  .addition-name {
    position: absolute;
    transform: rotate(90deg);
    top: 242rpx;
    right: 200rpx;
  }
  .addition-address {
    position: absolute;
    transform: rotate(90deg);
    top: 472rpx;
    right: 52rpx;
    white-space: nowrap;
  }
  .addition-registerDate {
    position: absolute;
    transform: rotate(90deg);
    bottom: 224rpx;
    right: 594rpx;
    white-space: nowrap;
  }
  .addition-grantDate {
    position: absolute;
    transform: rotate(90deg);
    bottom: 728rpx;
    right: 594rpx;
    white-space: nowrap;
  }
  .addition-plateNum {
    position: absolute;
    transform: rotate(90deg);
    top: 302rpx;
    right: 48rpx;
    white-space: nowrap;
  }
}
</style>