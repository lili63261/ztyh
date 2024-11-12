<template>
  <view class="active-page">
    <!-- <view class="header">
      <text class="title">智天集团</text>
    </view> -->
    <view class="content">
      <image
        src="@/static/images/temp/dui.png"
        mode="widthFix"
        class="dui-img-class"
      ></image>
      <view class="success">激活成功</view>
      <view class="fh-class" @click="returnNow">立即返回</view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {};
  },
  onLoad() {},
  methods: {
    returnNow() {
      uni.navigateBack({});
    },
  },
};
</script>
<style scoped lang="scss">
page {
  background: #ba0015;
}

.active-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: url("@/static/images/temp/beijing.png") no-repeat center center;
  background-size: 100% 100%;
  color: #fff;
  padding: 32rpx;
  min-height: calc(100vh - 88rpx);
  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 88rpx;
    .title {
      font-size: 32rpx;
      font-weight: bold;
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 60rpx;
    box-sizing: border-box;
    .dui-img-class {
      width: 238rpx;
      height: 238rpx;
    }
    .success {
      font-size: 46rpx;
      font-weight: bold;
      margin-top: 20rpx;
      color: #fdaf27;
    }
    .fh-class {
      font-size: 38rpx;
      font-weight: bold;
      margin-top: 20rpx;
    }
  }
}
</style>