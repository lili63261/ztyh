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
        label-width="164rpx"
      >
        <!-- <view class="card"
            ><image class="bank-card" src="@/static/images/temp/yinhangka.png" />
            <span>{{ formData.uniqueNo }}</span>
          </view> -->
        <uni-forms-item label="养老金金额" name="annuity">
          <uni-easyinput
            type="number"
            disabled
            v-model="formData.annuity"
            placeholder="请输入养老金金额"
          />
        </uni-forms-item>
        <uni-forms-item label="到账卡号" name="bankNo">
          <uni-easyinput
            type="number"
            disabled
            v-model="formData.bankNo"
            placeholder="请输入到账卡号"
          />
        </uni-forms-item>
        <uni-forms-item label="所属银行" name="bankName">
          <uni-easyinput
            type="text"
            disabled
            v-model="formData.bankName"
            placeholder="请输入所属银行"
          />
        </uni-forms-item>

        <uni-forms-item label="用户名" name="name">
          <uni-easyinput
            type="text"
            disabled
            v-model="formData.name"
            placeholder="请输入用户名"
          />
        </uni-forms-item>

        <uni-forms-item label="提现金额" name="money">
          <uni-easyinput
            type="text"
            v-model="formData.money"
            placeholder="请输入提现金额"
          >
          <template #right>
            <span class="unit">元</span>
          </template>
          </uni-easyinput>
        </uni-forms-item>

        <!-- <uni-forms-item label="取款密码" name="tradePwd">
          <uni-easyinput
            type="password"
            v-model="formData.tradePwd"
            placeholder="请输入取款密码"
          />
        </uni-forms-item> -->
      </uni-forms>
      <!-- 提交按钮 -->
      <view class="submit-btn" @click="submit">立即提现</view>

      <view v-if="list.length > 0">
        <view class="withdrawal-record">提现记录</view>

        <view class="record-list">
          <view class="record-item" v-for="(item, index) in list" :key="index">
            <view class="record-item-left"><span class="label">订单单号：</span>{{item.orderNo}}</view>
            <view class="record-item-left"><span class="label">到账卡号：</span>{{formData.bankNo}}</view>
            <view class="record-item-left"><span class="label">所属银行：</span>{{formData.bankName}}</view>
            <view class="record-item-left"><span class="label"><span>用</span><span>户</span><span>名：</span></span>{{formData.name}}</view>
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
import { apply, withdrawWithdrawRecord } from "@/api/mine/withdraw.js";
import { detailCertification } from "@/api/mine/certification.js";

export default {
  data() {
    return {
      list: [],
      // 表单数据
      formData: {
        bankName: "",
        bankNo: "",
        id: 0,
        idCard: "",
        name: "",
        type: 2,
        annuity: 0,
        money: undefined,
      },
      rules: {
        annuity: {
          rules: [
            {
              required: true,
              errorMessage: "请输入账户余额",
            },
            // {
            //   minimum: 1,
            //   errorMessage: "养老金额不能小于1",
            // },
          ],
        },
        bankNo: {
          rules: [
            {
              required: true,
              errorMessage: "请输入到账卡号",
            },
          ],
        },
        username: {
          rules: [
            {
              required: true,
              errorMessage: "请输入用户名",
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
              minimum: 100,
              errorMessage: "提现金额不能小于100",
            },
          ],
        },
        // tradePwd: {
        //   rules: [
        //     {
        //       required: true,
        //       errorMessage: "请输入取款密码",
        //     },
        //   ],
        // },
      },
    };
  },
  onLoad(e) {
    if (e.annuity) {
      this.formData.annuity = e.annuity;
    }
    this.detailCertificationFun();
    this.withdrawWithdrawRecordFun();
  },
  methods: {
    //提现记录
    withdrawWithdrawRecordFun() {
      withdrawWithdrawRecord(2).then((res) => {
        this.list = res.data;
      });
    },
    //实名认证信息
    detailCertificationFun() {
      detailCertification().then((res) => {
        this.formData = {
          ...this.formData,
          ...res.data,
        };
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
          };
          apply(params).then((res) => {
            this.formData.annuity = this.formData.annuity - this.formData.money;
            this.formData.money = undefined;

            uni.showToast({
              title: "申请成功",
              icon: "success",
              duration: 2000,
            });
            this.withdrawWithdrawRecordFun();
            // setTimeout(() => {
            //   uni.navigateBack();
            // }, 2000);
          });
        })
        .catch((err) => {
          console.log("表单错误信息：", err);
        });
    },
    navActImmediately() {
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
.unit{
  color: #0099D6;
  padding: 0 10rpx;
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
.status-desc{
  color: #f00;
}
.nav-act-immediately-btn {
  background-color: #fdaf29;
  color: #ffffff;
}
</style>
      