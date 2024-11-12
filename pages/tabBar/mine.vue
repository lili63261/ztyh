<template>
  <view class="container">
    <view class="header">
      <text class="title">个人中心</text>
    </view>
    <!-- 用户信息部分 -->
    <view class="user-info">
      <view class="avatar"></view>
      <view class="user-details">
        <view
          >欢迎登录，
          <template v-if="realName">{{ realName }}！</template>
          <template v-else>
            <span @click="navigateTo('/pages/user/authenticate')"
              >请实名认证</span
            >
          </template>
        </view>
        <view>注册账号：{{ userInfo.phone }}</view>
        <view @click="copy">邀请码：{{ userInfo.inviteCode }}(点击复制)</view>
      </view>
      <image
        class="tag"
        src="@/static/images/temp/grzx/meiriqiandao.png"
        @click="setSignIn"
      >
      </image>
    </view>

    <!-- 账户余额部分 -->
    <view class="account-balance">
      <view
        class="balance-item"
        @click="
          navigateTo(
            `/pages/tabBar/creditPensionWithdrawal?annuity=${totalData.annuity}`
          )
        "
      >
        <view>信用养老金</view>
        <view class="amount">{{ totalData.annuity }}</view>
        <view class="withdraw-btn">提现</view>
      </view>
      <image
        class="shutiao-class"
        src="@/static/images/temp/grzx/shutiao.png"
      />
      <view
        class="balance-item"
        @click="navigateTo('/pages/tabBar/creditCardRepayment')"
      >
        <view>信用卡还款金</view>
        <view class="amount">{{ totalData.deposit }}</view>
        <view class="repay-btn">{{ realName ? "还款" : "实名领取" }}</view>
      </view>
    </view>

    <!-- 银行卡信息 -->
    <view class="bank-info">
      <view>信用卡免息还款额度查询进度</view>
      <!-- <image class="bank-card" src="@/static/bank-card.png" /> -->
    </view>

    <view class="card-section">
      <view class="card">
        <image class="bank-card" src="@/static/images/temp/yinhangka.png" />
        <template v-if="uniqueNo">
          <span class="card-uniqueNo">
            {{ uniqueNo }}
          </span>
        </template>
        <template v-if="money">
          <span class="card-money">
            {{ money }}元
          </span>
        </template>
        <template v-if="money==0">
          <span class="card-money">
            0000000
          </span>
        </template>
        <template v-if="username">
          <span class="card-username">
            {{ username }}
          </span>
        </template>
        <template v-else>
          <span class="uniqueNo-placeholder" @click="navBankCard"
            >立即免费领取</span
          >
        </template>
      </view>
    </view>

    <!-- 输入框 -->
    <view class="input-section">
      <view class="label-class">
        <image
          class="input-icon"
          src="@/static/images/temp/grzx/xingming.png"
        />
        <input
          class="input"
          placeholder="请输入姓名"
          v-model="loginForm.userName"
        />
      </view>
      <view class="label-class">
        <image
          class="input-icon"
          src="@/static/images/temp/grzx/shoujihaoma.png"
        />
        <input
          class="input"
          placeholder="请输入手机号码"
          v-model="loginForm.phone"
        />
      </view>
      <view class="label-class">
        <image
          class="input-icon"
          src="@/static/images/temp/grzx/yinhangka-2.png"
        />
        <input
          class="input"
          placeholder="请输入银行卡号"
          v-model="loginForm.uniqueNo"
        />
      </view>
      <view class="query-btn" @click="loginQuery">登录查询</view>
    </view>

    <!-- 图标菜单 -->
    <view class="icon-grid">
      <view class="icon-item" @click="navigateToMall()">
        <view class="name-class">智天积分</view>
        <view class="price-class">{{ totalData.integral }}</view>
        <view class="bt-class">立即兑换</view>
      </view>
      <view
        class="icon-item"
        @click="
          navigateTo(
            '/pages/tabBar/zhitianBookDetails?subsidy=' + totalData.subsidy
          )
        "
      >
        <view class="name-class">智天支票</view>
        <view class="price-class">{{ totalData.subsidy }}</view>
        <view class="bts-class">
          <view class="bt1-class" @click.stop="navigateToMall()">立即兑换</view>
          <view class="bt2-class">明细</view>
        </view>
      </view>
      <view class="icon-item">
        <view class="name-class">智天股权</view>
        <view class="price-class">{{ totalData.stock }}万</view>
        <view class="bts-class">
          <view class="bt1-class">明细</view>
          <view class="bt2-class" @click="showSellFun">抛售</view>
        </view>
      </view>
      <view class="icon-item"  @click="navigateTo('/pages/user/team/index')">
        <view class="name-class">团队奖励</view>
        <view class="price-class">{{ totalData.teamAward }}</view>
        <view class="bts-class">
          <view class="bt1-class">提现</view>
          <view class="bt2-class">明细</view>
        </view>
      </view>
      <view class="icon-item">
        <view class="name-class">每日分红</view>
        <view class="price-class">{{ cashback }}</view>
        <view class="bts-class">
          <view class="bt1-class">提现</view>
          <view class="bt2-class">明细</view>
        </view>
      </view>
      <view class="icon-item">
        <view class="name-class">可提现</view>
        <view class="price-class">{{ totalData.cashback }}</view>
        <view class="bts-class">
          <view class="bt1-class">提现</view>
          <view class="bt2-class">明细</view>
        </view>
      </view>
      <view class="icon-item icon-item2" @click="navigateTo('/pages/bondWallet/index')">
        <image src="@/static/images/temp/13.png" class="icon-class" />
        <view class="name-class">我的债券钱包</view>
        <view class="price-class">{{bondNumSize}}张</view>
        <!-- <view class="bts-class">
          <view class="bt1-class">提现</view>
          <view class="bt2-class">明细</view>
        </view> -->
      </view>
    </view>

    <view class="foot-class">
      <!-- 微信认证和支付宝认证 -->
      <view class="auth-section">
        <view
          class="auth-item vx-class"
          @click="navigateTo('/pages/authentication/wxAuth')"
        >
        </view>
        <view
          class="auth-item zfb-class"
          @click="navigateTo('/pages/authentication/zfbAuth')"
        >
        </view>
      </view>

      <!-- 功能区 -->
      <view class="function-section">
        <view class="title-class"> 生活功能 </view>
        <view class="function-grid">
          <view
            class="function-item"
            v-for="(item, index) in functions"
            :key="index"
            @click="lifeFunction"
          >
            <image :src="item.icon" class="function-icon" />
            <view class="function-name">{{ item.name }}</view>
          </view>
        </view>

        <view class="function-2grid">
          <view
            class="function-item"
            v-for="(item, index) in functions2"
            :key="index"
            @click="navigateTo(item.url)"
          >
            <view class="left">
              <image :src="item.icon" class="function-icon" />
              <view class="function-name">{{ item.name }}</view>
            </view>
            <image
              class="right-icon"
              src="@/static/images/temp/grzx/jiantou.png"
            />
          </view>
        </view>
      </view>
    </view>

    <!-- 退出登录按钮 -->
    <view class="logout-btn" @click="$refs.pop1.open()">退出登录</view>
    <iupop ref="pop1" icontent="确定要退出当前账号吗?" @confd="logout" />

    <u-modal
      :show="showSell"
      title="股权抛售"
      showCancelButton
      confirmColor="#2979ff"
      @cancel="showSell = false"
      @confirm="confirmshowSell"
    >
      <view class="car-modal-content">
        <uni-forms ref="sellForm" :modelValue="formSellData" :rules="sellRules">
          <view class="car-modal-item"
            >当前股权数量：<span class="stock-blue-class">{{
              totalData.stock
            }}</span></view
          >
          <view class="car-modal-item"
            >市场抛售比例：<span class="stock-rate-red-class"
              >1:{{ stockRate }}</span
            ></view
          >
          <uni-forms-item name="stock">
            <uni-easyinput
              prefixIcon="calendar"
              v-model="formSellData.stock"
              placeholder="抛售股权数量"
            >
            </uni-easyinput>
          </uni-forms-item>

          <!-- <view> 比例1:{{ stockRate }}</view> -->
        </uni-forms>
      </view>
      <template #confirmButton>
        <view class="show-sell-btn-class">
          <view class="confirm-button" @click="confirmshowSell">确认</view>
          <view class="cancel-button" @click="showSell = false">取消</view>
        </view>
      </template>
    </u-modal>

    <!-- <u-modal
      :show="showSellTip"
      title="提示"
      showCancelButton
      confirmColor="#2979ff"
      @cancel="showSellTip = false"
      @confirm="confirmSellTip"
    >
      <view class="car-modal-content2">

        <view class="car-modal-item">当前股权数量：{{ totalData.stock }}</view>
        <view class="car-modal-item">市场抛售比例 1:{{ stockRate }}</view>
        <view class="car-modal-item">抛售的数量：{{ formSellData.stock }}</view>
       
        <view class="car-modal-item">是否确认立即兑换？</view>
      </view>
    </u-modal> -->
  </view>
</template>
<script>
import { detailCertification } from "@/api/mine/certification.js";

import { ifSignIn, signIn } from "@/api/system/signReward.js";
import { userBuyRecord } from "@/api/bankCard/bankCard.js";
import {
  userDetail,
  stockCashback,
  total,
  bankCardReceive,
  bankCardCheck,
  stockStockRate,
  stockUndersell,
  bondNum,
} from "@/api/system/user.js";

import { listAddress } from "@/api/mine/address.js";

export default {
  data() {
    return {
      // menuItems: [
      //   { icon: require("@/static/images/temp/grzx/zhifubao.png"), name: "智天积分" },
      //   { icon: require("@/static/item2.png"), name: "智天支票" },
      //   { icon: require("@/static/item3.png"), name: "智天股权" },
      //   { icon: require("@/static/item4.png"), name: "团队奖励" },
      //   { icon: require("@/static/item5.png"), name: "每日分红" },
      //   { icon: require("@/static/item6.png"), name: "可提现" },
      // ],
      stockRate: 100,
      numberOfEquitySelling: 0,
      formSellData: {
        stock: undefined,
      },
      sellRules: {
        stock: {
          rules: [
            {
              required: true,
              errorMessage: "请输入抛售股权数量",
            },
          ],
        },
      },

      showSell: false,
      showSellTip: false,
      userInfo: {
        id: "",
        phone: "",
        name: null,
        inviteCode: "",
        honor: null,
        idCard: null,
      },
      loginForm: {
        phone: "",
        uniqueNo: "",
        userName: "",
      },
      functions: [
        {
          name: "生活常费",
          icon: require("@/static/images/temp/grzx/shenghujiaofei.png"),
          url: "/pages/life-cost/life-cost",
        },
        {
          name: "手机充值",
          icon: require("@/static/images/temp/grzx/shoujichongzhi.png"),
          url: "/pages/phone-recharge/phone-recharge",
        },
        {
          name: "燃气充值",
          icon: require("@/static/images/temp/grzx/ranqi.png"),
          url: "/pages/gas-recharge/gas-recharge",
        },
        {
          name: "社保缴费",
          icon: require("@/static/images/temp/grzx/shebao.png"),
          url: "/pages/social-insurance/social-insurance",
        },
      ],

      functions2: [
        {
          name: "我的商场礼品",
          icon: require("@/static/images/temp/5.png"),
          url: "/pages/myMallAndGift/index",
        },
        {
          name: "我的币种钱包",
          icon: require("@/static/tabBar/77.png"),
          url: "/pages/tabBar/myEquityAsset",
        },
        {
          name: "智天制卡进度",
          icon: require("@/static/images/temp/grzx/xiaotubiao/zhika.png"),
          url: "/pages/card-status/index",
        },
        {
          name: "智天账户存款",
          icon: require("@/static/images/temp/grzx/xiaotubiao/fangchan.png"),
          url: "/pages/account-deposit/account-deposit",
        },
        {
          name: "智天股权凭证",
          icon: require("@/static/images/temp/grzx/xiaotubiao/guquan.png"),
          url: "/pages/stock-certificate/stock-certificate",
        },
        // {
        //   name: "智天账户转账",
        //   icon: require("@/static/images/temp/grzx/xiaotubiao/duihuanjin.png"),
        //   url: "/pages/account-transfer/account-transfer",
        // },
        // {
        //   name: "智天账户金",
        //   icon: require("@/static/images/temp/grzx/xiaotubiao/huangjin.png"),
        //   url: "/pages/account-gold/account-gold",
        // },
        {
          name: "资金明细",
          icon: require("@/static/images/temp/grzx/xiaotubiao/zjin.png"),
          url: "/pages/fund-details/fund-details",
        },
        {
          name: "提现记录",
          icon: require("@/static/images/temp/grzx/xiaotubiao/tixian.png"),
          url: "/pages/withdraw-records/withdraw-records",
        },
        {
          name: "密码管理",
          icon: require("@/static/images/temp/grzx/xiaotubiao/tuandui.png"),
          url: "/pages/password-management/password-management",
        },
        {
          name: "实名认证",
          icon: require("@/static/images/temp/grzx/xiaotubiao/shimingrenzheng.png"),
          url: "/pages/user/authenticate",
        },
        {
          name: "收货地址",
          icon: require("@/static/images/temp/9.png"),
          url: "/pages/user/address",
        },
        // {
        //   name: "银行卡管理",
        //   icon: require("@/static/images/temp/grzx/xiaotubiao/yinhangka.png"),
        //   url: "/pages/bank-card-management/bank-card-management",
        // },
        {
          name: "邀请好友",
          icon: require("@/static/images/temp/grzx/xiaotubiao/yaoqing.png"),
          url: "/pages/invite-friends/index",
        },
      ],
      totalData: {
        allowance: 0,
        annuity: 0,
        cashback: 0,
        integral: 0,
        provident: 0,
        stock: 0,
        subsidy: 0,
        teamAward: 0,
        deposit: 500000,
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
      cashback: 0,
      uniqueNo: "",
      realName: "",
      username: "",
      money: "",
      bondNumSize: "",
    };
  },
  onLoad() {
    // this.getUserInfo();
  },
  onShow() {
    this.getUserInfo();
    this.getTotal();
    this.getStockCashback();
    this.userBuyRecordFun();
    this.stockStockRateFun();
    this.detailCertificationFun();
    this.listAddressFun();
    this.getBondNum();
  },
  methods: {
    //获取购买数量
    getBondNum(){
      bondNum().then((res) => {
        this.bondNumSize = res.data;
      });
    },
    showSellFun(){
      this.showSell = true;
      this.formSellData.stock = "";
    },
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

    //查询是否实名
    detailCertificationFun() {
      detailCertification().then((res) => {
        this.realName = res?.data?.name;
      });
    },
    copy() {
      uni.setClipboardData({
        data: this.userInfo.inviteCode,
        showToast: false,
        success: () => {
          uni.showToast({
            title: "复制成功",
            icon: "none",
          });
        },
      });
    },
    //确认抛售
    confirmSellTip() {
      stockUndersell(this.formSellData.stock).then((res) => {
        this.showSell = false;
        this.getTotal();
        uni.showToast({
          title: "抛售成功，请到智天银行卡查看余额！",
          icon: "none",
        });
        this.userBuyRecordFun();
        this.formSellData.stock = "";
      });
    },
    //获取比例
    stockStockRateFun() {
      stockStockRate().then((res) => {
        this.stockRate = res.data;
      });
    },
    // 抛售输入确认
    confirmshowSell() {
      this.$refs.sellForm
        .validate()
        .then((res) => {
          console.log("表单数据信息：", res);
          // this.showSell = false;
          // this.showSellTip = true;
          // confirmSellTip
          this.confirmSellTip();
        })
        .catch((err) => {
          console.log("表单错误信息：", err);
        });
    },
    //查银行卡
    loginQuery() {
      if (!this.loginForm.userName) {
        uni.showToast({
          title: "请输入姓名",
          icon: "none",
        });
        return;
      }

      if (!this.loginForm.phone) {
        uni.showToast({
          title: "请输入手机号码",
          icon: "none",
        });
        return;
      }

      if (!this.loginForm.uniqueNo) {
        uni.showToast({
          title: "请输入银行卡号",
          icon: "none",
        });
        return;
      }
      bankCardCheck(this.loginForm).then((res) => {
        uni.navigateTo({
          url: "/pages/tabBar/bankCard",
        });
      });
    },
    navBankCard() {
      if (!this.realName) {
        uni.showToast({
          title: "请先实名认证",
          icon: "none",
        });
        setTimeout(() => {
          this.navigateTo("/pages/user/authenticate");
        }, 1000);
        return;
      }
      bankCardReceive()
        .then((res) => {
          if (res.code == 200) {
            uni.showToast({
              title: "领取成功",
              icon: "none",
            });
            this.userBuyRecordFun();
            // setTimeout(()=>{
            //   //刷新页面
            //   window.location.reload();
            // }, 1000)
          }
        })
        .catch((err, res) => {
          if (err == 500) {
            setTimeout(() => {
              this.navigateTo("/pages/user/authenticate");
            }, 1000);
          }
        });
    },
    navigateToCard(url) {
      if (this.uniqueNo) {
        uni.navigateTo({
          url: url,
        });
      }
    },
    navigateToMall() {
      uni.switchTab({
        url: "/pages/tabBar/zhitianMall",
      });
    },
    userBuyRecordFun() {
      userBuyRecord().then((res) => {
        console.log(res);
        this.uniqueNo = res?.data?.uniqueNo;
        this.username = res?.data?.username;
        this.money = res?.data?.money;
      });
    },
    lifeFunction() {
      uni.showToast({
        title: "暂未开放，敬请期待！",
        icon: "none",
      });
    },
    getStockCashback() {
      stockCashback().then((res) => {
        this.cashback = res.data;
      });
    },
    getTotal() {
      total().then((res) => {
        this.totalData = {
          ...this.totalData,
          ...res.data,
        };
      });
    },
    getUserInfo() {
      userDetail().then((res) => {
        this.userInfo = {
          ...this.userInfo,
          ...res.data,
        };
      });
    },
    setSignIn() {
      signIn().then((res) => {
        if (res.code == 200) {
          uni.showToast({
            title: "签到成功，奖励已发放至钱包账户中！",
            icon: "none",
          });
          setTimeout(() => {
            this.navigateTo("/pages/tabBar/myEquityAsset");
          }, 1500);
        }
      });
    },
    navigateTo(url) {
      if (url) {
        if (url == "/pages/card-status/index") {
          if (!this.uniqueNo) {
            uni.showToast({
              title: "请先领取银行卡",
              icon: "none",
            });
            return;
          }

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
        }

        if (url == "/pages/tabBar/creditCardRepayment") {
          if (!this.realName) {
            uni.showToast({
              title: "请先实名认证",
              icon: "none",
            });
            setTimeout(() => {
              uni.navigateTo({
                url: "/pages/user/authenticate",
              });
            }, 1500);
            return;
          }
        }
        uni.navigateTo({
          url: url,
        });
      }
    },
    logout() {
      // this.$refs.uToast.loading('正在退出...')
      this.$store.dispatch("LogOut").then(() => {
        this.$tab.reLaunch("/pages/login/index");
      });
    },
  },
};
</script>
  
  <style lang="scss" scoped>
page {
  background: #ba0015;
}
.car-modal-content {
  width: 100%;
  .car-modal-item {
    margin-bottom: 10rpx;
  }
}
::v-deep .u-modal__content {
  padding-bottom: 0;
}

.stock-blue-class {
  color: #1a6bdb;
}
.stock-rate-red-class {
  color: #b83707;
}
.car-modal-content2 {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-items: flex-start;
  gap: 20rpx;
  color: #000;
}
.container {
  display: flex;
  flex-direction: column;
  padding: 40rpx;
  background: url("@/static/images/temp/beijing.png") no-repeat center center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 100%;
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
    color: white;
  }
}

.user-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  // background-color: #fff;
  padding: 20rpx 40rpx;
  border-radius: 20rpx;
  position: relative;
}

.avatar {
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
  background: url("@/static/images/temp/logo-1.png") no-repeat;
  background-size: 100% 100%;
}

.user-details {
  flex: 1;
  margin-left: 20rpx;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  font-weight: bold;
  gap: 10rpx;
}

.tag {
  width: 146rpx;
  height: 48rpx;
  position: absolute;
  top: 10rpx;
  right: 10rpx;
}

.account-balance {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20rpx;
  background: url("@/static/images/temp/grzx/qianbao.png") no-repeat center
    center;
  background-size: 100% 100%;
}
.shutiao-class {
  width: 2rpx;
  height: 70rpx;
}

.balance-item {
  display: flex;
  flex-direction: column;
  border-radius: 20rpx;
  padding: 30rpx 40rpx;
  width: 48%;
  text-align: center;
}

.amount {
  font-size: 45rpx;
  color: #f00;
  margin: 10rpx 0 20rpx 0;
}

.withdraw-btn,
.repay-btn {
  background-color: #e72432;
  color: #fff;
  border-radius: 10rpx;
  height: 50rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24rpx;
}

.bank-info {
  margin-top: 20rpx;
  text-align: center;
  background-color: #fff;
  padding: 30rpx 40rpx;
  border-radius: 10rpx;
  font-weight: bold;
}

.card-section {
  margin-top: 20rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  .card {
    width: 100%;
    height: 354rpx;
    position: relative;
    span {
      font-size: 38rpx;
      color: #5f5961;
    }
    .card-uniqueNo{
      position: absolute;
      left: 38rpx;
      bottom: 84rpx;
    }
    .card-money{
      position: absolute;
      right:  38rpx;
      top: 38rpx;
    }
    .card-username{
      position: absolute;
      left:  138rpx;
      bottom: 164rpx;
    }
    .uniqueNo-placeholder {
      border: 1px solid #bc484c;
      font-weight: bold;
      padding: 5rpx 32rpx;
      color: #fff;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 30rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #c3343a;
    }
  }
  .bank-card {
    width: 100%;
    height: 354rpx;
    object-fit: cover;
    margin-bottom: 40rpx;
  }
}
.input-section {
  display: flex;
  flex-direction: column;
  margin-top: 20rpx;
  background: #fff;
  padding: 30rpx 40rpx;
  border-radius: 10rpx;
  position: relative;
}

::v-deep {
  .uni-progress-inner-bar {
    border-radius: 20rpx;
  }
  .uni-input-placeholder {
    color: #b6b6b7;
    font-size: 24rpx;
  }
}

.input {
  height: 66rpx;
  line-height: 66rpx;
}
.label-class {
  display: flex;
  justify-items: self-start;
  align-items: center;
  border-bottom: 2rpx solid #d1d1d1;
  margin-bottom: 20rpx;

  .input-icon {
    width: 25rpx;
    height: 30rpx;
    margin-right: 20rpx;
  }
}

.query-btn {
  background-color: #fdaf27;
  color: #fff;
  padding: 20rpx 40rpx;
  border-radius: 50rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  position: absolute;
  right: 50%;
  bottom: -30rpx;
  transform: translateX(50%);
  height: 44rpx;
  font-size: 24rpx;
  padding: 0 60rpx;
}

.icon-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20rpx;
  margin-top: 60rpx;
}

.icon-item {
  width: 100%;
  height: 184rpx;
  text-align: left;
  // margin-bottom: 20rpx;
  padding: 20rpx;
  .name-class {
    font-size: 24rpx;
    font-weight: bold;
  }
  .price-class {
    font-size: 24rpx;
    font-weight: bold;
    padding: 10rpx 0;
    flex: 1;
    height: 68rpx;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .bt-class {
    height: 38rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50rpx;
    width: fit-content;
    font-size: 20rpx;
    color: white;
    padding: 10rpx 30rpx;
  }
  .bt1-class {
    @extend .bt-class;
  }

  .bt2-class {
    @extend .bt-class;
  }
}
.icon-item2{
  grid-column: span 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20rpx;
  width: 100%;
  position: relative;
  // 渐变
  background-image: linear-gradient(to right, #f9d7a1, #f06365);
  height: 140rpx;
  border-radius: 10rpx;
  color: #f7434c;
  font-size: 24rpx;
  font-weight: bold;
  .icon-class{
    position: absolute;
    right: 0;
    bottom: 0;
    width: 120rpx;
    height: 120rpx;
   
  }
  .price-class{
      font-size: 38rpx;
    }

}
.icon-item:nth-child(1) {
  background: url("@/static/images/temp/grzx/zhitianjifen.png") no-repeat;
  background-size: 100% 100%;
  color: #d66c33;
  .bt-class {
    background-image: linear-gradient(to right, #fb9540, #f86a2b);
    border-radius: 50rpx;
    width: fit-content;
    color: white;
    padding: 10rpx 30rpx;
  }
}
.icon-item:nth-child(2) {
  background: url("@/static/images/temp/grzx/zhitianjipiao.png") no-repeat;
  background-size: 100% 100%;
  color: #4e81c6;

  .bts-class {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10rpx;
    .bt1-class {
      background-image: linear-gradient(to right, #64acf7, #1a6bdb);
    }

    .bt2-class {
      border: 2rpx solid #1a6bdb;
      color: #1a6bdb;
    }
  }
}
.icon-item:nth-child(3) {
  background: url("@/static/images/temp/grzx/guquan.png") no-repeat;
  background-size: 100% 100%;
  color: #7271d3;
  .bts-class {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10rpx;
    .bt1-class {
      background: #7271d3;
      border-radius: 50rpx;
      width: fit-content;
      color: white;
      padding: 10rpx 30rpx;
    }

    .bt2-class {
      border: 2rpx solid #7271d3;
      color: #7271d3;
    }
  }
}
.icon-item:nth-child(4) {
  background: url("@/static/images/temp/grzx/tuanduijiehsao.png") no-repeat;
  background-size: 100% 100%;
  color: #bc484c;
  .bts-class {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10rpx;
    .bt1-class {
      background: #bc484c;
      border-radius: 50rpx;
      width: fit-content;
      color: white;
      padding: 10rpx 20rpx;
    }

    .bt2-class {
      border: 2rpx solid #bc484c;
      border-radius: 50rpx;
      width: fit-content;
      color: #bc484c;
      padding: 10rpx 20rpx;
    }
  }
}
.icon-item:nth-child(5) {
  background: url("@/static/images/temp/grzx/meirifenhong.png") no-repeat;
  background-size: 100% 100%;
  color: #b83707;
  .bts-class {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10rpx;
    .bt1-class {
      background: #b83707;
      border-radius: 50rpx;
      width: fit-content;
      color: white;
      padding: 10rpx 20rpx;
    }

    .bt2-class {
      border: 2rpx solid #b83707;
      border-radius: 50rpx;
      width: fit-content;
      color: white;
      padding: 10rpx 20rpx;
    }
  }
}
.icon-item:nth-child(6) {
  background: url("@/static/images/temp/grzx/ketixian.png") no-repeat;
  background-size: 100% 100%;
  color: #e42073;
  .bts-class {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10rpx;
    .bt1-class {
      background: #e42073;
      border-radius: 50rpx;
      width: fit-content;
      color: white;
      padding: 10rpx 20rpx;
    }

    .bt2-class {
      border: 2rpx solid #e42073;
      border-radius: 50rpx;
      width: fit-content;
      color: #e42073;
      padding: 10rpx 20rpx;
    }
  }
}

.icon-image {
  width: 100rpx;
  height: 100rpx;
  margin-bottom: 10rpx;
}

.auth-section {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20rpx;
}

.auth-item {
  width: 100%;
  text-align: center;
  height: 144rpx;
}
.vx-class {
  background: url("@/static/images/temp/grzx/weixinrenzheng.png") no-repeat;
  background-size: 100% 100%;
}
.zfb-class {
  background: url("@/static/images/temp/grzx/zhifubao.png") no-repeat;
  background-size: 100% 100%;
}
.auth-btn {
  // background-color: #f00;
  // color: #fff;
  // padding: 20rpx;
  // border-radius: 10rpx;
}
.foot-class {
  width: 100%;
  background: white;
  border-radius: 20rpx;
  box-sizing: border-box;
  padding: 20rpx;
  margin-top: 20rpx;
}

.function-section {
  display: flex;
  flex-direction: column;
  .title-class {
    font-weight: bold;
    font-size: 32rpx;
    margin: 20rpx 0;
  }
  .function-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    justify-items: center;
    align-items: center;
    gap: 20rpx;
    .function-icon {
      width: 80rpx;
      height: 80rpx;
      border-radius: 10rpx;
    }
  }
}

.function-item {
  // margin-bottom: 20rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20rpx;
}
.function-name {
  font-size: 22rpx;
}

.function-2grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  justify-items: center;
  align-items: center;
  gap: 20rpx;
  width: 100%;
  margin-top: 20rpx;
  .function-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20rpx;
    width: 100%;
    flex-direction: row;
    border-bottom: 2rpx solid #aba9a9;
    padding: 10rpx;
    &:last-child {
      border-bottom: none;
    }
    .function-icon {
      width: 40rpx;
      height: 40rpx;
    }
    .left {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 20rpx;
    }
    .right-icon {
      width: 15rpx;
      height: 20rpx;
    }
  }
}
.logout-btn {
  background-color: #fff;
  color: #000;
  padding: 20rpx 60rpx;
  border-radius: 10rpx;
  text-align: center;
  width: fit-content;
  margin: 0 auto;
  margin-top: 40rpx;
  height: 50rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}
.show-sell-btn-class {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .confirm-button {
    background: #fbb026;
    color: #fff;
    padding: 20rpx 40rpx;
  }
  .cancel-button {
    background: #f9001d;
    color: #fff;
    padding: 20rpx 40rpx;
  }
}
</style>
  