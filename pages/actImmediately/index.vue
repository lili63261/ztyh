<template>
  <view class="container">
    <!-- 订单提示 -->
    <view class="order-message">
      订单提交成功 - 请于
      <u-count-down ref="countDown" autoStart :time="timestamp" @change="onChange">
        <view class="time">
          <text class="time__item">{{ timeData.minutes }}&nbsp;分</text>
          <text class="time__item">{{ timeData.seconds }}&nbsp;秒</text>
        </view> </u-count-down
      >内完成支付
    </view>

    <!-- 订单金额 -->
    <view class="order-amount"> ￥{{ money }} </view>

    <!-- 商品信息 -->
    <view class="product-info">
      <view class="product-item name-class">智天集团专属银行卡</view>
      <view class="product-item">卡&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：{{ formData.uniqueNo }}</view>
      <view class="product-item">持&nbsp;&nbsp;卡&nbsp;&nbsp;人：{{ formData.username }}</view>
      <view class="product-item">账户余额：{{ formData.money }}</view>
    </view>
    <!-- 支付方式选择 -->
    <view class="payment-section">
      <view
        class="payment-option"
        v-for="(option, index) in paymentOptions"
        :key="index"
        @click="selectPayment(index)"
      >
        <image class="payment-icon" :src="option.icon" />
        <view class="payment-label">{{ option.label }}</view>
        <view
          class="payment-radio"
          :class="{ selected: selectedPayment === index }"
        ></view>
      </view>
    </view>

    <!-- 确认支付按钮 -->
    <button class="pay-btn" @click="createOrderFun">
      确认支付 ￥{{ money }}
    </button>
    <iupop
      ref="checkPayPopup"
      ititle="系统提示"
      icontent="请确认是否完成付款"
      icancel="还未付款"
      iconfirm="完成付款"
      @closed="hideCheckPop"
      @confd="$tab.switchTab('/pages/tabBar/mine')"
    />
  </view>
</template>
  
  <script>
import { createOrder } from "@/api/payOrder/payOrder.js";
import { userBuyRecord } from "@/api/bankCard/bankCard.js";
export default {
  data() {
    return {
      timeData: {},
      selectedPayment: 0, // 默认选择第一个支付方式
      timestamp: 5 * 60 * 60 * 100, //
      paymentOptions: [
        {
          label: "银行卡(云闪付)",
          icon: require("@/static/images/temp/8.png"),
          value: "bank",
        },
        {
          label: "支付宝支付",
          icon: require("@/static/images/temp/7.png"),
          value: "zfb",
        },
        {
          label: "微信支付",
          icon: require("@/static/images/temp/6.png"),
          value: "wx",
        },
      ],
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
      busiType: "7",
      remarkList: [],
    };
  },
  onLoad(e) {
    this.userBuyRecordFun();
  },
  onShow() {
    this.checkPay();
  },
  methods: {
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
      userBuyRecord().then((res) => {
        this.formData = {
          ...this.formData,
          ...res.data,
        };
      });
    },
    onChange(e) {
      this.timeData = e;
    },
    selectPayment(index) {
      this.selectedPayment = index;
    },
    createOrderFun() {
      createOrder({
        id: this.formData.id,
        money: this.money,
        busiType: this.busiType,
        payType: this.paymentOptions[this.selectedPayment].value,
        busiParam: "",
      }).then((res) => {
        if (res.code == 200) {
          uni.showLoading({
            title: "正在前往付款",
          });
          // uni.navigateBack({
          //    delta: 1,
          //    success(){
          //     window.location.href = res.data;
          //    }
          // });
          uni.setStorageSync("isPay", 1);
          window.location.href = res.data;
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
  padding: 20px;
  background-color: #f8f8f8;
  display: flex;
  flex-direction: column;
  background: url("@/static/images/temp/beijing.png") no-repeat center center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 100%;
  min-height: calc(100vh - 44px);
}

.order-message {
  text-align: center;
  font-size: 14px;
  color: #fff;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.time {
  color: yellow;
}

.order-amount {
  text-align: center;
  font-size: 24px;
  color: #fff;
  margin-bottom: 20px;
  font-weight: bold;
}

.product-info {
  background-color: #fff;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 10px;
  background: url("@/static/images/temp/dhfangkuang.png") no-repeat center
    center;
  background-size: 100% 100%;
}

.product-item {
  font-size: 14px;
  color: #333;
  margin-bottom: 10px;
}
.name-class {
  font-size: 16px;
  font-weight: bold;
  color: #de0017;
}
.payment-section {
  background-color: #fff;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 20px;
}

.payment-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #e0e0e0;
}

.payment-option:last-child {
  border-bottom: none;
}

.payment-icon {
  width: 30px;
  height: 30px;
}

.payment-label {
  flex: 1;
  margin-left: 10px;
  font-size: 14px;
  color: #333;
}

.payment-radio {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #ccc;
}

.selected {
  border-color: #f60;
  background-color: #f60;
}

.pay-btn {
  width: 100%;
  padding: 15px;
  background-color: #f60;
  color: #fff;
  text-align: center;
  font-size: 16px;
  border-radius: 5px;
}
</style>
  