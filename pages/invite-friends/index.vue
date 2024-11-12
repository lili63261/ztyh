<template>
  <view class="container">
    <!-- 邀请卡片 -->
    <view class="invite-card" v-for="(invite, index) in invites" :key="index">
      <view class="invite-header">邀请{{ invite.userNum }}人实名认证</view>
      <view class="invite-body">
        <view class="left">
          <view class="bonus">领取{{ invite.subsidy }}万智天支票</view>
          <view class="property">（{{ invite.provident }}万房产兑换金）</view>
        </view>
        <view class="right">
          <view class="invite-desc"><span class="level">{{invite.honor}}</span><span>智天商场消费{{invite.allowance}}万额度</span></view>
          <view class="apply-btn" @click="inviteNow">立即邀请</view>
        </view>
      </view>
    </view>
  </view>
</template>

  <script>
  import {listReward} from '@/api/reward/reward.js'

export default {
  data() {
    return {
      codeurl: getApp().globalData.config.codeurl,
      inviteCode: this.$store.state.user.inviteCode,
      text:'',
      invites: [
        // {
        //   people: 10,
        //   bonus: "领取150万智天支票",
        //   property: "（100万房产兑换金）",
        // },
        // {
        //   people: 20,
        //   bonus: "领取300万智天支票",
        //   property: "（200万房产兑换金）",
        // },
        // {
        //   people: 40,
        //   bonus: "领取600万智天支票",
        //   property: "（400万房产兑换金）",
        // },
        // {
        //   people: 60,
        //   bonus: "领取800万智天支票",
        //   property: "（600万房产兑换金）",
        // },
        // {
        //   people: 100,
        //   bonus: "领取1000万智天支票",
        //   property: "（1000万房产兑换金）",
        // },
      ],
    };
  },
  onLoad(){
    this.text = this.codeurl + "#/pages/register/index?inviteCode=" + this.inviteCode
    console.log(this.text)
    console.log(this.inviteCode)
    this.getRewardList()
  },
  methods: {
    // 获取奖励列表
    getRewardList() {
      listReward().then((res) => {
        this.invites = res.data;
      });
    },
    inviteNow(){
      uni.setClipboardData({
        data: this.text,
        success: function () {
          uni.showToast({
            title: '邀请地址复制成功，发送好友即可完成邀请！',
            icon: 'none'
          })
        }
      })
    }
  }
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
  height: 100vh;
}

.invite-card {
  background-color: #fff;
  border-radius: 20rpx;
  margin-bottom: 40rpx;
  padding: 30rpx;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
  position: relative;
  background: url("@/static/images/temp/zhipiaokuang.png") no-repeat center center;
  background-size: 100% 100%;
  box-sizing: border-box;
  padding: 40rpx;
}

.invite-header {
  text-align: center;
  font-size: 28rpx;
  font-weight: bold;
  padding: 20rpx;
  border-radius: 10rpx;
  margin-bottom: 20rpx;
  background: url("@/static/images/temp/biankuang1.png") no-repeat center center;
  background-size: 100% 100%;
  color: #fff;
  width: 80%;
  height: 64rpx;
  position: absolute;
  top: -10rpx;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
}

.invite-body {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 40rpx 40rpx 10rpx 40rpx;
}

.left {
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10rpx;
  margin-bottom: 10rpx;
}

.bonus {
  font-size: 36rpx;
  color: #f00;
  font-weight: bold;
}

.property {
  font-size: 28rpx;
  color: #f00;
  font-weight: bold;
}

.right {
  flex: 1;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.invite-desc {
  font-size: 24rpx;
  color: #A49173;
  text-align: left;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  .level{
    color: #EC3247;
  }
}

.apply-btn {
  background-color: #f00;
  color: #fff;
  padding:10rpx 40rpx;
  border-radius: 30rpx;
  font-size: 24rpx;
}
</style>
  