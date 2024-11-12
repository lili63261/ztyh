<template>
  <view class="shop-container">
    <!-- 顶部部分 -->
    <view class="top-section">
      <view class="header">
        <text class="shop-title">智天商城</text>
      </view>
      <view class="sub-title">
        <span>智天支票商城</span>
        <view class="sub-title-right">
          <image class="car-image" src="@/static/images/temp/biaoshi.png" />
          <span>1亿+人逛过</span></view
        >
      </view>

      <!-- 商品展示部分 -->
      <view class="product-list">
        <view
          class="product-item"
          v-for="(item, index) in products"
          :key="index"
        >
          <image :src="item.cover" class="product-image" />
          <view class="product-warp-info">
            <view class="product-info">
              <view class="product-label-name">
                <text class="product-label">Au999.99</text>
                <text class="product-name">{{ item.name }}</text>
              </view>
              <view class="product-label-name">
                <image
                  class="xingxing-image"
                  src="@/static/images/temp/xingxing.png"
                />
                <text class="product-price"
                  >月销售{{ item.originalMoney }}</text
                >
              </view>
              <text class="product-note">{{
                `只需${item.subsidy}万智天支票`
              }}</text>
            </view>
            <view class="product-progress">
              <progress
                :percent="item.quantity"
                activeColor="#E62131"
                stroke-width="5"
                class="uni-progress"
              />
              <button class="buy-btn" @click="handleProductClick(item,0)">
                立即抢购
              </button>
            </view>
          </view>
          <image
            class="xianliangbaokuang-image"
            src="@/static/images/temp/xianliangbaokuang.png"
          />
        </view>
      </view>

      <view class="grid-container">
        <view
          class="grid-item"
          v-for="(item, index) in ordinaryRealEstate"
          :key="item.id"
        >
          <image :src="item.cover" class="grid-item-image"></image>
          <view class="grid-item-name">
            <view class="product-name">{{ item.name }}</view>
            <image
              class="baokuang-image"
              src="@/static/images/temp/baokuang.png"
            />
          </view>
          <view class="grid-product-label-name">
            <image
              class="xingxing-image"
              src="@/static/images/temp/xingxing.png"
            />
            <text class="product-price">月销售{{ item.originalMoney }}</text>
          </view>

          <view class="grid-product-progress">
            <view class="grid-product-progress-text">
              <span>{{ item.subsidy }}万智天支票</span>
            </view>
            <view class="grid-product-progress-bar">
              <progress
                :percent="item.quantity"
                activeColor="#E62131"
                stroke-width="5"
                class="uni-progress"
              />
              <button class="grid-buy-btn" @click="handleProductClick(item,1)">
                立即抢购
              </button>
            </view>
          </view>
        </view>
        <view
          class="grid-item full-width"
          v-for="(item, index) in villa"
          :key="item.id"
        >
          <image :src="item.cover" class="full-item-image"></image>
          <view class="right-class">
            <view class="product-name">
              {{ item.name }}
              <image
                class="chaodijia-image"
                src="@/static/images/temp/chaodijia.png"
              />
            </view>
            <view class="grid-product-label-name">
              <image
                class="xingxing-image"
                src="@/static/images/temp/xingxing.png"
              />
              <text class="product-price">月销售{{ item.originalMoney }}</text>
            </view>
            <view class="grid-product-progress">
              <view class="grid-product-progress-text">
                <span>只需{{ item.subsidy }}万智天支票</span>
              </view>
              <view class="grid-product-progress-bar">
                <progress
                  :percent="item.quantity"
                  activeColor="#E62131"
                  stroke-width="5"
                  class="uni-progress"
                />
                <button class="grid-buy-btn" @click="handleProductClick(item,2)">
                  立即抢购
                </button>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 表单区域 -->
      <view class="form-section" v-for="(item, index) in car" :key="item.id">
        <view class="form-title">{{ item.name }}</view>
        <image class="form-car-image" :src="item.cover" />
        <image
          class="car-jingbaojia-image"
          src="@/static/images/temp/jingbaojia.png"
        />

        <view class="form">
          <view class="form-item">
            <view class="label justify"><span>姓</span> <span>名：</span></view>
            <input
              v-model="item.userName"
              class="input-field"
              placeholder="请输入真实姓名"
            />
          </view>
          <view class="form-item">
            <view class="label justify"
              ><span>身</span><span>份</span><span>证</span><span>号</span
              ><span>码：</span></view
            >
            <input
              v-model="item.idCard"
              class="input-field"
              placeholder="请输入身份证号码"
            />
          </view>
          <view class="form-item">
            <view class="label justify"
              ><span>联</span><span>系</span><span>电</span
              ><span>话：</span></view
            >
            <input
              v-model="item.phone"
              class="input-field"
              placeholder="请输入联系电话"
            />
          </view>
          <button class="submit-btn" @click="handleCarSubmit(item)">
            立即提交
          </button>
        </view>
      </view>
    </view>

    <!-- 兑换区域 -->
    <view class="exchange-section">
      <view class="form-title">智天积分兑换</view>
      <view
        class="exchange-item"
        v-for="(item, index) in exchanges"
        :key="index"
        @click="handleExchangeClick(item)"
      >
        <image :src="item.cover" class="exchange-image" />
        <view class="exchange-info">
          <view class="exchange-name-value">
            <text class="exchange-name">{{ item.integral }}智天积分兑换</text>
            <text class="exchange-value">{{ item.stock }}万智天股权</text>
          </view>
          <view class="exchange-btn">立即兑换</view>
        </view>
      </view>
    </view>

    <u-modal
      :show="showCard"
      title="提示"
      showCancelButton
      confirmColor="#2979ff"
      @cancel="showCard = false"
      @confirm="confirmCard"
    >
      <view class="car-modal-content">
        <view class="car-modal-item">姓名：{{ card.name }}</view>
        <view class="car-modal-item">身份证号：{{ card.idCard }}</view>
        <view class="car-modal-item">联系电话：{{ card.phone }}</view>
        <view class="car-modal-item tip-class">
          请核实所填信息是否有误，点击确认即可进行支票兑换
        </view>
      </view>
    </u-modal>

    <u-modal
      :show="showGold"
      title="提示"
      showCancelButton
      confirmColor="#2979ff"
      @cancel="showGold = false"
      @confirm="confirmGold"
    >
      <view class="car-modal-content">
        <view class="car-modal-item"
          >目前拥有智天支票：{{ gold.balance }}万</view
        >
        <view class="car-modal-item"
          >兑换{{ gold.name }}所需：{{ gold.subsidy }}万</view
        >
        <view class="car-modal-item">是否确认立即兑换？</view>
      </view>
    </u-modal>

    <u-modal
      :show="showPoints"
      title="提示"
      showCancelButton
      confirmColor="#2979ff"
      @cancel="showPoints = false"
      @confirm="confirmPoints"
    >
      <view class="car-modal-content">
        <view class="car-modal-item"
          >目前拥有智天积分：{{ points.balance }}积分</view
        >
        <view class="car-modal-item"
          >兑换{{ points.name }}所需：{{ points.integral }}积分</view
        >
        <view class="car-modal-item">是否确认立即兑换？</view>
      </view>
    </u-modal>
  </view>
</template>
  
  <script>
import {
  shop2Exchange,
  shopExchange,
  total,
  shop2GoodsList,
  shopGoodsList,
  shopExchangeCar,
} from "@/api/system/user.js";
import { listAddress } from "@/api/mine/address.js";
export default {
  data() {
    return {
      showGold: false,
      showCard: false,
      showPoints: false,
      ordinaryRealEstate: [],
      villa: [],
      car: [],
      products: [
        // {
        //   image: require("@/static/images/temp/huangjin.png"),
        //   label: "Au999.99",
        //   name: "2公斤智天黄金",
        //   price: "月销售8888",
        //   note: "只需100万智天支票",
        //   buttonText: "立即抢购",
        // },
        // {
        //   image: require("@/static/images/temp/huangjin.png"),
        //   label: "Au999.99",
        //   name: "4公斤智天黄金",
        //   price: "月销售18888",
        //   note: "只需200万智天支票",
        //   buttonText: "立即抢购",
        // },
        // {
        //   image: require("@/static/images/temp/bajingongjin.png"),
        //   label: "Au999.99",
        //   name: "8公斤智天黄金",
        //   price: "月销售28888",
        //   note: "只需400万智天支票",
        //   buttonText: "立即抢购",
        // },
      ],
      exchanges: [],
      card: {
        id: "",
        idCard: "",
        name: "",
        phone: "",
      },
      gold: {
        id: "",
        balance: 0,
        subsidy: 0,
        name: "",
      },
      points: {
        id: "",
        balance: 0,
        integral: 0,
        name: "",
      },
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
      type:''
    };
  },
  onLoad() {
    this.getShopGoodsList();
    // this.getShopExchangeCar()
    this.getShop2GoodsList();
  },
  onShow() {
    this.listAddressFun();
  },
  methods: {
    //获取收货地址
    async listAddressFun() {
      const res = await listAddress();
      if (res.data.length > 0) {
        this.address = {
          ...this.address,
          ...res.data[0],
        };
      }
    },
    async getTotal() {
      const res = await total();
      this.gold.balance = res.data.subsidy;
      this.points.balance = res.data.integral;
    },
    // 汽车兑换
    getShopExchangeCar() {
      //     "idCard": "",
      // "name": "",
      // "phone": ""
      shopExchangeCar().then((res) => {
        console.log(res);
      });
    },
    // 积分兑换列表
    getShop2GoodsList() {
      shop2GoodsList().then((res) => {
        this.exchanges = res.data;
      });
    },
    // 支票兑换列表
    getShopGoodsList() {
      shopGoodsList().then((res) => {
        // 1-黄金,2-普通房产,3-别墅,4-汽车
        this.products = res.data.filter((item) => item.type == 1);
        this.ordinaryRealEstate = res.data.filter((item) => item.type == 2);
        this.villa = res.data.filter((item) => item.type == 3);
        this.car = res.data.filter((item) => item.type == 4);
        // console.log(this.products);
        // console.log(this.ordinaryRealEstate);
        // console.log(this.villa);
        // console.log(this.car);
      });
    },
    handleCarSubmit(item) {
      // 处理车提交事件

      if (!this.address.id) {
            uni.showToast({
              title: "请填写收货地址",
              icon: "none",
            });
            setTimeout(() => {
              this.navigateTo("/pages/user/address");
            }, 1000);
            return;
          }
      if (
        !item.userName ||
        !item.idCard ||
        !item.phone ||
        item.userName == "" ||
        item.idCard == "" ||
        item.phone == ""
      ) {
        uni.showToast({
          title: "请填写完整信息",
          icon: "none",
        });
        return;
      }

      this.card.id = item.id;
      this.card.idCard = item.idCard;
      this.card.name = item.userName;
      this.card.phone = item.phone;
      this.showCard = true;
    },
    async confirmCard() {
      const params = {
        id: this.card.id,
        idCard: this.card.idCard,
        name: this.card.name,
        phone: this.card.phone,
      };
      const res = await shopExchangeCar(params);
      if (res.code == 200) {
        uni.showToast({
          title: "提交成功",
          icon: "success",
        });
        this.showCard = false;
        setTimeout(() => {
          uni.navigateTo({
            url: "/pages/myMallAndGift/index?type=3",
          });
        }, 2000);
      }
    },
    async confirmGold() {
      const res = await shopExchange(this.gold.id);
      if (res.code == 200) {
        uni.showToast({
          title: "提交成功",
          icon: "success",
        });
        this.showGold = false;
        setTimeout(() => {
          uni.navigateTo({
            url: "/pages/myMallAndGift/index?type=" + this.type,
          });
        }, 2000);
      }
    },
    async confirmPoints() {
      const res = await shop2Exchange(this.points.id);
      if (res.code == 200) {
        uni.showToast({
          title: "提交成功",
          icon: "success",
        });
        this.showPoints = false;
        // setTimeout(() => {
        //   uni.navigateTo({
        //     url: "/pages/myMallAndGift/index",
        //   });
        // }, 2000);
      }
    },
    async handleProductClick(product,type) {
      this.type = type;
      // 处理产品点击事件
      console.log("Product clicked:", product);
      // const id = product.id;
      this.gold.id = product.id;
      this.gold.name = product.name;
      this.gold.subsidy = product.subsidy;
      await this.getTotal();
      this.showGold = true;

      // uni.showModal({
      //   title: "提示",
      //   content: "是否确认购买",
      //   cancelText: "取消",
      //   confirmText: "确认",
      //   success: async function (res) {
      //     if (res.confirm) {
      //       const res = await shopExchange(id);
      //       if (res.code == 200) {
      //         uni.showToast({
      //           title: "提交成功",
      //           icon: "success",
      //         });
      //         setTimeout(() => {
      //           uni.navigateTo({
      //             url: "/pages/myMallAndGift/index",
      //           });
      //         }, 2000);
      //       }
      //     } else if (res.cancel) {
      //       console.log("用户点击取消");
      //     }
      //   },
      // });
    },
    async handleExchangeClick(exchange) {
      this.points.id = exchange.id;
      this.points.name = exchange.name;
      this.points.integral = exchange.integral;
      await this.getTotal();
      this.showPoints = true;

      // 处理兑换点击事件
      // uni.showModal({
      //   title: "提示",
      //   content: "是否确认购买",
      //   cancelText: "取消",
      //   confirmText: "确认",
      //   success: async function (res) {
      //     if (res.confirm) {
      //       const res = await shopExchangeCar(id);
      //       if (res.code == 200) {
      //         uni.showToast({
      //           title: "提交成功",
      //           icon: "success",
      //         });
      //         setTimeout(() => {
      //           uni.navigateTo({
      //             url: "/pages/myMallAndGift/index",
      //           });
      //         }, 2000);
      //       }
      //     } else if (res.cancel) {
      //       console.log("用户点击取消");
      //     }
      //   },
      // });
    },
  },
};
</script>
  
  <style lang="scss" scoped>
page {
  background: #ba0015;
}
::v-deep {
  .uni-progress-inner-bar {
    border-radius: 20rpx;
  }
  .uni-input-placeholder {
    color: #b6b6b7;
    font-size: 24rpx;
  }
  .u-modal__content {
    // justify-content:flex-start;
  }
}
.car-modal-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-items: flex-start;
  gap: 20rpx;
  color: #000;
}
.shop-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: url("@/static/images/temp/beijing.png") no-repeat center center;
  background-size: 100% 100%;
  color: #fff;
  min-height: 100vh;
}
.top-section {
  padding: 32rpx;
}
.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 88rpx;
}

.shop-title {
  font-size: 32rpx;
  font-weight: bold;
}

.sub-title {
  font-size: 38rpx;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.product-list {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20rpx;
}

.product-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  margin-bottom: 20rpx;
  padding: 20rpx;
  border-radius: 20rpx;
  gap: 30rpx;
  position: relative;
}
.xianliangbaokuang-image {
  width: 100rpx;
  height: 70rpx;
  position: absolute;
  right: 5rpx;
  top: 5rpx;
}
.product-warp-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  // gap: 20rpx;
}
.product-image {
  width: 200rpx;
  height: 120rpx;
}
.product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10rpx;
  // margin-left: 20rpx;
}
.product-progress {
  display: flex;
  justify-content: flex-start;
  gap: 20rpx;
}
.uni-progress {
  // width: 63%;
  flex: 0.8;
  ::v-deep .uni-progress-bar {
    border-radius: 20rpx;
  }
}
.product-label-name {
  display: flex;
  align-items: center;
  gap: 10rpx;
}
.product-label {
  font-size: 18rpx;
  color: #fff;
  padding: 10rpx;
  border-radius: 10rpx;
  background-color: #000;
}
.right-class {
  height: 100%;
  flex: 0.8;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 10rpx 0;
  box-sizing: border-box;
}
.product-name {
  font-size: 28rpx;
  color: #000;
}
.xingxing-image {
  width: 108rpx;
  height: 16rpx;
}
.product-price {
  font-size: 18rpx;
  color: #888;
}

.product-note {
  font-size: 22rpx;
  color: #e62129;
  font-weight: bold;
}

.buy-btn {
  background-color: #e62129;
  color: #fff;
  border-radius: 10rpx;
  font-size: 19rpx;
  white-space: nowrap;
  // transform: scale(0.8);
  height: 44rpx;
  padding: 0 20rpx;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20rpx;
  width: 100%;
}

.grid-item {
  background-color: white;
  border-radius: 10rpx;
  box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.1);
  padding: 20rpx;
  text-align: center;
  position: relative;
}
.grid-item-image {
  width: 100%;
  height: 180rpx;
  object-fit: cover;
  border-radius: 10rpx 10rpx 0 0;
}
.grid-item-name {
  display: flex;
  justify-items: flex-start;
  padding: 10rpx 0;
  position: relative;
}
.grid-product-progress {
  display: flex;
  justify-items: self-start;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
}
.grid-product-progress-text {
  font-size: 20rpx;
  font-weight: bold;
  color: #e62129;
  padding-bottom: 10rpx;
}
.full-width {
  grid-column: span 2; /* 让第三个元素占据两列 */
  display: flex;
  justify-items: flex-start;
  align-items: center;
  gap: 20rpx;
}
.grid-product-label-name {
  display: flex;
  justify-items: flex-start;
  align-items: center;
  gap: 10rpx;
  // padding: 10rpx 0;
}
.grid-product-progress-bar {
  width: 100%;
  display: flex;
  justify-items: self-start;
  align-items: center;
  gap: 20rpx;
  .uni-progress {
    flex: 1;
  }
}
.item-image {
  width: 100%;
  height: auto;
  border-radius: 10rpx 10rpx 0 0;
}
.baokuang-image {
  width: 128rpx;
  height: 94rpx;
  position: absolute;
  right: -20rpx;
  top: -40rpx;
}
.chaodijia-image {
  width: 108rpx;
  height: 98rpx;
  position: absolute;
  right: 0;
  top: 0;
}

.grid-buy-btn {
  background-color: #e62129;
  color: #fff;
  border-radius: 10rpx;
  font-size: 19rpx;
  white-space: nowrap;
  // transform: scale(0.8);
  height: 44rpx;
  padding: 0 20rpx;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.buy-button {
  background-color: #ff4500;
  color: white;
  border: none;
  padding: 10rpx 20rpx;
  border-radius: 5rpx;
  cursor: pointer;
}

.buy-button:hover {
  background-color: #e03a00;
}
.full-item-image {
  width: 250rpx;
  height: 160rpx;
  min-width: 250rpx;
  max-height: 160rpx;
}
.form-section {
  margin-top: 60rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: url("@/static/images/temp/jifenkuang.png") no-repeat;
  background-size: 100% 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 30rpx;
  position: relative;
}
.form-title {
  font-size: 40rpx;
  color: #e62129;
  background-color: #feac22;
  border-radius: 10rpx;
  padding: 10rpx 60rpx;
  font-weight: bolder;
  position: absolute;
  top: -30rpx;
  z-index: 1;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
}
.sub-title-right {
  font-size: 26rpx;
  display: flex;
  align-items: flex-end;
  align-items: center;
  gap: 10rpx;
}
.car-image {
  width: 128rpx;
  height: 40rpx;
  object-fit: cover;
}

.form-car-image {
  width: 100%;
  height: 300rpx;
  object-fit: cover;
}
.car-jingbaojia-image {
  width: 134rpx;
  height: 100rpx;
  position: absolute;
  right: 0;
  top: 0;
}
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 30rpx;
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

.submit-btn {
  background-color: #e62131;
  color: #fff;
  padding: 0 60rpx;
  border-radius: 10rpx;
  font-size: 24rpx;
  height: 44rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.exchange-section {
  margin-top: 60rpx;
  display: grid;
  // flex-wrap: wrap;
  // justify-content: space-between;
  grid-template-columns: repeat(2, 1fr);
  gap: 20rpx;
  width: 100%;
  position: relative;
  background-color: #f7e4c3;
  padding: 80rpx 32rpx 32rpx 32rpx;
  box-sizing: border-box;
  border-radius: 20rpx;
  margin-bottom: 88rpx;
}

.exchange-item {
  background-color: #fff;
  // margin-bottom: 40rpx;
  // padding: 20rpx;
  border-radius: 20rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.exchange-image {
  width: 100%;
  height: 180rpx;
}

.exchange-info {
  text-align: center;
  background-color: #e62129;
  display: flex;
  width: 100%;
  padding: 10rpx 8rpx;
  align-items: center;
}
.exchange-name-value {
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: center;
}
.exchange-name {
  font-size: 20rpx;
}

.exchange-value {
  font-size: 24rpx;
  font-weight: bold;
}

.exchange-btn {
  background-color: #fdaf27;
  color: #e62129;
  border-radius: 10rpx;
  font-size: 24rpx;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10rpx;
  font-weight: bold;
  height: 38rpx;
}
</style>
  