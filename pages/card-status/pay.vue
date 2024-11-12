<template>
  <view class="container">
    <!-- 订单提示 -->
    <view class="order-message">
      订单提交成功 - 请于
      <u-count-down
        ref="countDown"
        autoStart
        :time="timestamp"
        @change="onChange"
      >
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
      <!-- <template v-if="FormData.status == 1"> -->
      <!-- <view class="product-item">收货人：{{ address.name }}</view>
      <view class="product-item">收货人电话：{{ address.phone }}</view>
      <view class="product-item"
        >收货地址：{{ address.provinceCityRegion }}</view
      >
      <view class="product-item">详情地址：{{ address.address }}</view> -->
      <!-- </template> -->
      <view class="product-item">持&nbsp;&nbsp;卡&nbsp;&nbsp;人：{{ formData.username }}</view>
      <view class="product-item">身&nbsp;&nbsp;份&nbsp;&nbsp;证：{{ idCard }}</view>
      <view class="product-item">银行卡号：{{ formData.uniqueNo }}</view>
      <!-- <view class="product-item">目前账户余额：{{ formData.money }}</view> -->
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
      {{ `确认支付 ￥${money}` }}
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
import { detailCertification } from "@/api/mine/certification.js";
import { listAddress } from "@/api/mine/address.js";

export default {
  data() {
    return {
      isLoading: true,
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
      idCard: "",
      busiType: "42",
      remarkList: [],
      //   address: {
      //     id: undefined,
      //     phone: "",
      //     name: "",
      //     province: "",
      //     city: "",
      //     region: "",
      //     provinceCityRegion: "",
      //     address: "",
      //     isDefault: undefined,
      //     createTime: "",
      //   },
    };
  },
  async onLoad(e) {
    // const res = await listAddress();
    // if (res.data.length > 0) {
    //   this.address = {
    //     ...this.address,
    //     ...res.data[0],
    //   };
    // }
    this.userBuyRecordFun();
    this.detailCertificationFun();
    uni.showLoading({
      title: "加载中",
    });
  },
  onShow() {
    this.checkPay();
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
      