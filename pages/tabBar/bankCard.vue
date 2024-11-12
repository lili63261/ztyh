<template>
  <view class="container">
    <!-- <view class="header">
      <text class="title">银行卡</text>
    </view> -->
    <!-- 信息录入表单 -->
    <view class="form-section">
      <!-- 股权账户信息 -->
      <uni-forms
        ref="form"
        :modelValue="formData"
        :rules="rules"
        label-width="144rpx"
      >
        <view class="card"
          ><image class="bank-card" src="@/static/images/temp/yinhangka.png" />
          <span>{{ formData.uniqueNo }}</span>
        </view>
        <uni-forms-item label="持卡人" name="username">
          <uni-easyinput
            type="text"
            disabled
            v-model="formData.username"
            placeholder="请输入持卡人"
          />
        </uni-forms-item>
        <uni-forms-item label="账户余额" name="money">
          <uni-easyinput
            type="text"
            disabled
            v-model="formData.money"
            placeholder="请输入账户余额"
          />
        </uni-forms-item>
        <view class="tip-class" v-if="showInput">为保障您的资金安全请设置取款密码</view>
        <uni-forms-item label="取款密码" name="tradePwd" v-if="showInput">
          <uni-easyinput
            type="password"
            v-model="formData.tradePwd"
            placeholder="请输入取款密码"
          />
        </uni-forms-item>
      </uni-forms>

      <!-- 提交按钮 -->
      <view class="btns-class">
        <view class="submit-btn" @click="submit">立即提现</view>
        <view class="nav-act-immediately-btn" @click="navActImmediately" v-if="formData.activate == 0">
          立即激活
        </view>
      </view>

      <view v-if="list.length > 0">
        <view class="withdrawal-record">提现记录</view>

        <view class="record-list">
          <view class="record-item" v-for="(item, index) in list" :key="index">
            <view class="record-item-left"><span class="label">订单单号：</span>{{item.orderNo}}</view>
            <view class="record-item-left"><span class="label">到账卡号：</span>{{formData.uniqueNo}}</view>
            <!-- <view class="record-item-left"><span class="label">所属银行：</span>{{formData.bankName}}</view> -->
            <view class="record-item-left"><span class="label"><span>用</span><span>户</span><span>名：</span></span>{{formData.username}}</view>
            <view class="record-item-left"><span class="label">提现金额：</span>{{ item.money }}</view>
            <view class="record-item-left"><span class="label">提现时间：</span>{{ item.createTime }}</view>
            <view class="record-item-left"><span class="label">提现状态：</span><span class="status-desc">{{item.statusDesc}}</span></view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
    
    <script>
import { userBuyRecord } from "@/api/bankCard/bankCard.js";
import { ortherApply } from "@/api/mine/withdraw.js";
import { apply, withdrawWithdrawRecord } from "@/api/mine/withdraw.js";
export default {
  data() {
    return {
      list: [],
      showInput:true,
      // 表单数据
      formData: {
        createTime: "",
        id: 0,
        money: 0,
        name: "",
        status: 0,
        statusDesc: "",
        uniqueNo: "",
        wx: "",
        zfb: "",
        money: 0,
        type: 9,
      },
      rules: {
        username: {
          rules: [
            {
              required: true,
              errorMessage: "请输入持卡人",
            },
          ],
        },
        money: {
          rules: [
            {
              required: true,
              errorMessage: "请输入账户余额",
            },
            {
              minimum: 1,
              errorMessage: "提现金额不能小于1",
            },
          ],
        },
        tradePwd: {
          rules: [
            {
              required: true,
              errorMessage: "请输入取款密码",
            },
            {
                minLength: 6,
                maxLength: 6,
                errorMessage: '取款密码必须是{maxLength}位数字',
            },
            {
              validateFunction: (rule, value, data, callback) => {
							// 异步需要返回 Promise 对象
							return new Promise((resolve, reject) => {
								setTimeout(() => {
									if (/^\d+$/.test(value) ) {
										// 通过返回 resolve
										resolve()
									} else {
										// 不通过返回 reject(new Error('错误信息'))
										reject(new Error('取款密码必须由6位数字组成'))
									}
								}, 2000)
							})
						}
						}
          ],
        },
      },
    };
  },
  onLoad(e) {
    this.userBuyRecordFun();
    this.withdrawWithdrawRecordFun();
  },
  methods: {
      //提现记录
      withdrawWithdrawRecordFun() {
      withdrawWithdrawRecord(9).then((res) => {
        this.list = res.data;
      });
    },
    userBuyRecordFun() {
      userBuyRecord().then((res) => {
        this.formData = {
          ...this.formData,
          ...res.data,
        };
        if(this.formData.tradePwd){
          this.showInput = false
        }else {
          this.showInput = true
        }
      });
    },
    // 触发提交表单
    submit() {
      this.$refs.form
        .validate()
        .then((res) => {
          console.log("表单数据信息：", res);
          const params = {
            money: this.formData.money,
            type: this.formData.type,
            tradePwd: this.formData.tradePwd,
          };
          ortherApply(params).then((res) => {
            uni.showToast({
              title: "提现成功",
              icon: "success",
              duration: 2000,
            });
            this.withdrawWithdrawRecordFun();
            this.userBuyRecordFun();
            // this.showInput = false;
            // setTimeout(() => {
            //   uni.navigateBack();
            // }, 2000);
          }).catch((err) => {
            
          })
        })
        .catch((err) => {
          console.log("表单错误信息：", err);
        });
    },
    navActImmediately() {
      if(this.formData.activate==1) {
        uni.showToast({
          title: "您已经激活了",
          icon: "error",
          duration: 2000,
        })
        return
      }
      uni.navigateTo({
        url: "/pages/actImmediately/index",
      });
    },
  },
};
</script>
    
    <style lang="scss" scoped>
    ::v-deep .is-disabled{
  background: none !important;
  color:#333 !important;
}
page {
  background: #ba0015;
}
.status-desc{
  color: #f00;
}
.record-list {
  display: flex;
  gap: 10rpx;
  flex-direction: column;
  margin-top: 10rpx;
  .record-item {
    display: flex;
    flex-direction: column;
    gap: 10rpx;
    padding: 20rpx;
    background-color: #fff;
    border-bottom: 1px solid #eee;

    background: url("@/static/images/temp/dhfangkuang.png") no-repeat center center;
    background-size: 100% 100%;
    .record-item-left{
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    .label{
      width: 140rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
.withdrawal-record {
  text-align: center;
  height: 88rpx;
  display: flex;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32rpx;
  border-bottom: 1rpx solid #ccc;
  // border-top: 1rpx solid #ccc;
  margin-top: 38rpx;
  font-weight: bold;
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
  background: url("@/static/images/temp/beijing.png") no-repeat center center;
  background-size: 100% 100%;
  padding: 40rpx;
  min-height: calc(100vh - 88rpx);
}
.tip-class {
  background-color: #f8d8db;
  color: #e62132;
  border-radius: 10rpx;
  text-align: center;
  padding: 20rpx 0;
  margin-bottom: 44rpx;
}
.form-section {
  width: 100%;
  background-color: #fff;
  padding: 40rpx;
  margin-top: 40rpx;
  border-radius: 20rpx;
}
.card {
  width: 100%;
  position: relative;
  span {
    position: absolute;
    left: 38rpx;
    bottom: 138rpx;
    font-size: 38rpx;
    color: #5f5961;
  }
}
.bank-card {
  width: 100%;
  height: 340rpx;
  object-fit: cover;
  margin-bottom: 40rpx;
}
.form-item {
  margin-bottom: 40rpx;
  display: flex;
  flex-direction: column;
}

.form-label {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 10rpx;
}

.form-input {
  padding: 20rpx;
  border: 2rpx solid #ccc;
  border-radius: 10rpx;
  width: 100%;
}
.btns-class {
  display: flex;
  justify-content: center;
  gap: 20rpx;
}
.submit-btn,
.nav-act-immediately-btn {
  width: fit-content;
  padding: 10rpx 60rpx;
  background-color: #f00;
  color: #fff;
  border-radius: 10rpx;
  font-size: 32rpx;
  text-align: center;
  margin: 0 auto;
}
.nav-act-immediately-btn {
  background-color: #fdaf29;
  color: #ffffff;
}
</style>
    