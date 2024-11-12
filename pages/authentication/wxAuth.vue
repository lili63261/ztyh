<template>
  <view class="container">
    <!-- <view class="header">
      <text class="title">微信认证</text>
    </view> -->
    <!-- 顶部提示 -->
    <view class="header"> 绑定后可把资产转入 </view>

    <!-- 输入框和按钮 -->
    <view class="form-section">
      <view class="form-item">
        <view class="form-label">微信号</view>
        <input class="form-input" placeholder="请输入微信号" v-model="wx" :disabled="userInfo.wx"/>
        <view class="required" v-if="!userInfo.wx">*必填项*</view>
      </view>
      <view class="submit-btn" @click="bindWxFun" >{{ userInfo.wx?'绑定成功':'立即登记' }}</view>
    </view>
  </view>
</template>
  
  <script>
  import { userDetail,bindWx } from "@/api/system/user";
export default {
  data() {
    return {
      wx:'',
      userInfo: {
        id: '',
        phone: "",
        name: null,
        inviteCode: "",
        honor: null,
        idCard: null,
        wx: null,
        zhb: null
      },
    };
  },
  onLoad() {
    this.getUserInfo();
  },
  methods: {
    bindWxFun(){
      if(this.userInfo.wx){
        return
      }
      if(!this.wx){
        uni.showToast({
          title: '请输入微信号',
          icon: 'none',
        });
        return
      }
      bindWx(this.wx).then(res=>{
        if(res.code==200){
          uni.showToast({
            title: '绑定成功',
            icon: 'none',
          });
          this.getUserInfo();
        }
      })
    },
    getUserInfo() {
      userDetail().then((res) => {
        this.userInfo = {
          ...this.userInfo,
          ...res.data,
        }
        this.wx = this.userInfo.wx
      });
    },
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
  color: white;
  .title {
    font-size: 32rpx;
    font-weight: bold;
  }
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: url("@/static/images/temp/rzbeijing.png") no-repeat center center;
  background-size: 101% 101%;
  padding: 40rpx;
  min-height: calc(100vh - 88rpx);
}

.header {
  font-size: 36rpx;
  color: #fff;
  margin-bottom: 40rpx;
}

.form-section {
  background-color: #fff;
  padding: 40rpx;
  border-radius: 10rpx;
  width: 100%;
  max-width: 800rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
}

.form-item {
  position: relative;
  margin-bottom: 40rpx;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
  gap: 10rpx;
  border-bottom: 2rpx solid #adadad;
  padding: 32rpx 0;
}

.form-label {
  font-size: 32rpx;
  color: #333;
  font-weight: bold;
  margin-bottom: 10rpx;
}

.form-input {
  //   width: 100%;
  flex: 1;
  // padding: 20rpx;
  border: none;
}

.required {
  //   position: absolute;
  //   right: 20rpx;
  //   top: 70rpx;
  font-size: 24rpx;
  color: #f00;
}

.submit-btn {
  width: 100%;
  padding: 20rpx 30rpx;
  background-color: #e62131;
  color: #fff;
  border-radius: 20rpx;
  font-size: 32rpx;
  text-align: center;
}
</style>
  