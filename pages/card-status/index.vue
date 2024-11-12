<template>
  <view class="container" v-if="!isLoading">
    <!-- <view class="product-item name-class">智天集团专属银行卡</view> -->
    <view class="card-class">
      <view class="title-class">卡片信息</view>
      <view class="product-item"
        >持&nbsp;&nbsp;卡&nbsp;&nbsp;人：{{ formData.username }}</view
      >
      <view class="product-item"
        >身&nbsp;&nbsp;份&nbsp;&nbsp;证：{{ idCard }}</view
      >
      <view class="product-item">智天银行：{{ formData.uniqueNo }}</view>
      <view class="product-item">账户余额：{{ formData.money }}</view>
      <view class="product-item"
        >卡片状态：<span class="name-class">{{
          formData.statusDesc
        }}</span></view
      >
    </view>

    <!-- 商品信息 -->
    <view class="product-info">
      <!-- <template v-if="FormData.status == 1"> -->
      <view class="card-information">
        <view class="title-class">收货信息</view>
        <view class="product-item"
          >收&nbsp;&nbsp;货&nbsp;&nbsp;人：{{ address.name }}</view
        >
        <view class="product-item">联系电话：{{ address.phone }}</view>
        <view class="product-item"
          >联系地址：{{ address.provinceCityRegion }}</view
        >
        <view class="product-item">详情地址：{{ address.address }}</view>
      </view>
      <!-- </template> -->
    </view>

    <!-- 确认支付按钮 -->
    <button class="pay-btn" @click="createOrderFun" v-if="formData.status == 1">
      申请邮寄
    </button>
  </view>
</template>
    
    <script>
import { createOrder } from "@/api/payOrder/payOrder.js";
import { userBuyRecord } from "@/api/bankCard/bankCard.js";
import { detailCertification } from "@/api/mine/certification.js";
import { listAddress } from "@/api/mine/address.js";

export default {
  data() {
    return {
      isLoading: true,
      timeData: {},
      selectedPayment: 0, // 默认选择第一个支付方式
      formData: {
        activate: null,
        createTime: "",
        id: null,
        money: 0,
        status: 0,
        statusDesc: "",
        uniqueNo: "",
        username: "",
        wx: null,
        zfb: null,
      },
      money: 500,
      id: "",
      idCard: "",
      busiType: "42",
      remarkList: [],
      address: {
        id: undefined,
        phone: "",
        name: "",
        province: "",
        city: "",
        region: "",
        provinceCityRegion: "",
        address: "",
        isDefault: undefined,
        createTime: "",
      },
    };
  },
  async onLoad(e) {
    const res = await listAddress();
    if (res.data.length > 0) {
      this.address = {
        ...this.address,
        ...res.data[0],
      };
    }
    this.userBuyRecordFun();
    this.detailCertificationFun();
    uni.showLoading({
      title: "加载中",
    });
  },
  onShow() {
    // this.checkPay();
  },
  methods: {
    //查询是否实名
    detailCertificationFun() {
      detailCertification().then((res) => {
        this.idCard = res?.data?.idCard;
      });
    },
    checkPay() {
      if (uni.getStorageSync("isPay") == 1) {
        this.$nextTick(() => {
          this.$refs.checkPayPopup.open();
          uni.setStorageSync("isPay", 0);
        });
      }
    },
    hideCheckPop() {
      this.$refs.countDown.reset();
    },
    userBuyRecordFun() {
      this.isLoading = true;
      userBuyRecord()
        .then(async (res) => {
          this.formData = {
            ...this.formData,
            ...res.data,
          };
        })
        .finally(() => {
          this.isLoading = false;
          setTimeout(() => {
            uni.hideLoading();
          }, 200);
        });
    },
    onChange(e) {
      this.timeData = e;
    },
    selectPayment(index) {
      this.selectedPayment = index;
    },
    createOrderFun() {
      if (this.formData.status == 1) {
        uni.navigateTo({
          url: "/pages/card-status/pay",
        });
      }
    },
  },
};
</script>
    
    <style lang="scss" scoped>
page {
  background: #ba0015;
}
.card-class {
  background: url("@/static/images/temp/dhfangkuang.png") no-repeat center
    center;
  background-size: 100% 100%;
  padding:   30rpx;
  box-sizing: border-box;
  margin-top: 10rpx;
  border-radius: 20rpx;
  margin-bottom: 20rpx;
}
.card-information {
  // border: 1rpx solid #e0e0e0;
  padding: 10rpx;
  border-radius: 10rpx;
}
.container {
  padding: 40rpx;
  background-color: #f8f8f8;
  display: flex;
  flex-direction: column;
  background: url("@/static/images/temp/beijing.png") no-repeat center center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 100%;
  min-height: calc(100vh - 88rpx);
}

.order-message {
  text-align: center;
  font-size: 28rpx;
  color: #fff;
  margin-bottom: 40rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}

.time {
  color: yellow;
}

.order-amount {
  text-align: center;
  font-size: 48rpx;
  color: #fff;
  margin-bottom: 40rpx;
  font-weight: bold;
}

.product-info {
  background-color: #fff;
  padding: 30rpx;
  margin-bottom: 40rpx;
  border-radius: 20rpx;
}

.product-item {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 20rpx;
}
.name-class {
  font-size: 32rpx;
  font-weight: bold;
  color: #de0017;
}

.title-class {
  font-size: 32rpx;
  font-weight: bold;
  color: #000;
  margin-bottom: 10rpx;
}
.payment-section {
  background-color: #fff;
  padding: 30rpx;
  border-radius: 20rpx;
  margin-bottom: 40rpx;
}

.payment-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 0;
  border-bottom: 2rpx solid #e0e0e0;
}

.payment-option:last-child {
  border-bottom: none;
}

.payment-icon {
  width: 60rpx;
  height: 60rpx;
}

.payment-label {
  flex: 1;
  margin-left: 20rpx;
  font-size: 28rpx;
  color: #333;
}

.payment-radio {
  width: 40rpx;
  height: 40rpx;
  border-radius: 50%;
  border: 4rpx solid #ccc;
}

.selected {
  border-color: #f60;
  background-color: #f60;
}

.pay-btn {
  width: 100%;
  padding: 30rpx 60rpx;
  background-color: #f60;
  color: #fff;
  text-align: center;
  font-size: 32rpx;
  height: 44rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10rpx;
  width: fit-content;
}
</style>
    