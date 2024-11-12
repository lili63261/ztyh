<template>
  <view class="container">
    <view class="header">
      <text class="title">智天集团</text>
      <!-- <image class="logo" src="@/static/logo.png" /> -->
    </view>

    <view class="content">
      <swiper class="swiper-box" :current="swiperDotIndex" circular>
        <swiper-item v-for="(item, index) in info" :key="index">
          <image class="banner" :src="item.imgUrl" />
        </swiper-item>
      </swiper>
    </view>

    <view class="description">
      <text class="desc-title"></text>
      <view class="desc-text">
        智天集团筹备多年，将在 <span>2024</span> 年上市，借壳上市发行价在
        <span>500</span> 到 <span>1000</span> 元之间/股
      </view>
    </view>
    <view class="desc-highlight"> 新老会员实名注册就可以领取30万股权！ </view>
    <button class="claim-btn" @click="stockReceiveFun">股权恢复</button>
    <view class="activation-code-title-class"> 兑换智天资产 </view>
    <!-- <view class="activation-code-warp">
      <image
        class="sousuobiaozhi-image"
        src="@/static/images/temp/sousuobiaozhi.png"
      />
      <input
        class="activation-code-input"
        type="text"
        placeholder="输入银行卡或者股权证书即可激活"
      />
    </view>
    <button class="free-btn" @click="actImmediately">立即激活</button> -->

    <view class="card-section">
      <view class="card"
        ><image class="bank-card" src="@/static/images/temp/yinhangka.png" />
        <span>{{uniqueNo}}</span>
      </view>
      <button class="free-btn" @click="navBankCard">免费领取</button>
    </view>
  </view>
</template>
  <script>
import { listBanner, stockReceive } from "@/api/index.js";
import { bankCardReceive } from "@/api/system/user.js";
import { userBuyRecord } from '@/api/bankCard/bankCard.js'
import { detailCertification } from "@/api/mine/certification.js";
export default {
  data() {
    return {
      title: "智天集团",
      info: [],
      current: 0,
      swiperDotIndex: 0,
      uniqueNo: '',
      realName: "",
    };
  },
  onLoad() {
    this.getListBanner();
  },
  onShow(){
    this.userBuyRecordFun()
    this.detailCertificationFun();
  },
  methods: {
      //查询是否实名
      detailCertificationFun() {
      detailCertification().then((res) => {
        this.realName = res?.data?.name;
      });
    },
    userBuyRecordFun(){
      userBuyRecord().then((res) => {
        console.log(res)
        this.uniqueNo = res?.data?.uniqueNo
      })
    },
    actImmediately() {
      uni.navigateTo({
        url: "/pages/tabBar/active-page",
      });
    },
    navBankCard() {
      if(!this.realName){
        uni.showToast({
          title: "请先实名认证",
          icon: "none",
        });
        setTimeout(() => {
            uni.navigateTo({
              url: "/pages/user/authenticate",
            });
          }, 1500);
        return
      }
      bankCardReceive().then((res) => {
        if (res.code == 200) {
          uni.showToast({
            title: "领取成功",
            icon: "none",
          });
          setTimeout(() => {
            uni.navigateTo({
              url: "/pages/tabBar/mine",
            });
          }, 1500);
        }
      });
    },
    getListBanner() {
      listBanner().then((res) => {
        this.info = res.data.large;
      });
    },
    stockReceiveFun() {
      if(!this.realName){
        uni.showToast({
          title: "请先实名认证",
          icon: "none",
        });
        setTimeout(() => {
            uni.navigateTo({
              url: "/pages/user/authenticate",
            });
          }, 1500);
        return
      }
      stockReceive().then((res) => {
        if (res.code == 200) {
          uni.showToast({
            title: "领取成功",
            icon: "none",
          });
          setTimeout(() => {
            uni.navigateTo({
              url: "/pages/tabBar/mine",
            });
          }, 1500);
        }
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
  display: flex;
  flex-direction: column;
  align-items: center;
  background: url("@/static/images/temp/beijing.png") no-repeat center center;
  background-size: 100% 100%;
  color: #fff;
  padding: 32rpx;
  min-height: 100vh;
}

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
  width: 100%;
  .banner {
    width: 100%;
    height: 380rpx;
    object-fit: cover;
  }
  ::v-deep .swiper-box {
    height: 380rpx;
  }
}

.description {
  margin-top: 60rpx;
  padding: 20rpx;
  background-color: #ffeded;
  color: #000;
  border-radius: 20rpx;
  text-align: center;
  position: relative;
  .desc-title {
    //   font-size: 40rpx;
    //   font-weight: bold;
    //   margin-bottom: 20rpx;
    background: url("@/static/images/temp/shuoming.png") no-repeat center center;
    background-size: 100% 100%;
    width: 432rpx;
    height: 54rpx;
    display: block;
    position: absolute;
    top: -34rpx;
    right: 50%;
    transform: translateX(50%);
  }
  .desc-text {
    font-size: 32rpx;
    line-height: 40rpx;
    font-weight: bold;
    padding: 40rpx 0;
    span {
      color: #ff0708;
    }
  }
}
.desc-highlight {
  font-size: 36rpx;
  color: #ffa31f;
  font-weight: bold;
  padding: 10rpx 0;
  margin-bottom: 10rpx;
}
.claim-btn {
  color: #ff0708;
  border-radius: 10rpx;
  font-size: 30rpx;
  font-weight: bolder;
  background: url("@/static/images/temp/gupiaolingqu.png") no-repeat center
    center;
  background-size: 100% 100%;
  width: 220rpx;
  height: 54rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-section {
  margin-top: 38rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  .card {
    width: 100%;
    height: 354rpx;
    margin-bottom: 40rpx;
    position: relative;
    span {
      position: absolute;
      left: 38rpx;
      bottom: 84rpx;
      font-size: 38rpx;
      color: #5f5961;
    }
  }
  .bank-card {
    width: 100%;
    height: 354rpx;
    object-fit: cover;
    margin-bottom: 40rpx;
  }
}
.free-btn {
  background-color: #fff;
  color: #f00;
  border-radius: 10rpx;
  font-weight: bolder;
  background: url("@/static/images/temp/mianfeilingqu.png") no-repeat center
    center;
  background-size: 100% 100%;
  font-size: 30rpx;
  width: 220rpx;
  height: 54rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}
.activation-code-warp {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  gap: 20rpx;
  background: white;
  width: 100%;
  border-radius: 20rpx;
  padding: 0 20rpx;
  margin: 20rpx 0;
  .sousuobiaozhi-image {
    width: 40rpx;
    height: 40rpx;
  }
  .activation-code-input {
    width: 100%;
    height: 80rpx;
    border-radius: 10rpx;
    color: #000;
  }
}
.activation-code-title-class {
  text-align: center;
  font-size: 34rpx;
  font-weight: bold;
  color: #f5a22a;
  margin: 30rpx 0 10rpx;
  position: relative;
  &::after {
    content: "";
    display: block;
    width: 100rpx;
    height: 2rpx;
    background-image: linear-gradient(to right, #e34a12, #fdaf27);
    position: absolute;
    left: -150rpx;
    top: 50%;
    transform: translateY(-50%);
  }
  &::before {
    content: "";
    display: block;
    width: 100rpx;
    height: 2rpx;
    background-image: linear-gradient(to right, #fdaf27, #e34a12);
    position: absolute;
    right: -150rpx;
    top: 50%;
    transform: translateY(-50%);
  }
}

::v-deep .uni-input-placeholder {
  color: #a1a1a1;
  font-size: 24rpx;
}
</style>
  