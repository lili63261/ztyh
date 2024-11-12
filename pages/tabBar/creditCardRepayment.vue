<template>
  <view class="container">
    <!-- <view class="header">
      <text class="title">信用卡还款</text>
    </view> -->
    <!-- 信息录入表单 -->
    <view class="form-section">
      <!-- 股权账户信息 -->
      <uni-forms
        ref="form"
        :modelValue="formData"
        :rules="rules"
        label-position="top"
        label-width="auto"
      >
        <uni-forms-item label="信用卡号1:" name="bankNo">
          <uni-easyinput
            type="text"
            :disabled="formData.id?true:false"
            v-model="formData.bankNo"
            placeholder="请输入信用卡号1"
          />
        </uni-forms-item>
        <uni-forms-item label="卡1还款金额:" name="money">
          <uni-easyinput
            :disabled="formData.id?true:false"
            type="text"
            v-model="formData.money"
            placeholder="请输入卡1还款金额"
          >
          <template #right>
            <span class="unit">元</span>
          </template>
          </uni-easyinput>
        </uni-forms-item>


        <uni-forms-item label="信用卡号2:" name="bankNo2">
          <uni-easyinput
            type="text"
            :disabled="formData.id?true:false"
            v-model="formData.bankNo2"
            placeholder="请输入信用卡号2"
          />
        </uni-forms-item>
        <uni-forms-item label="卡2还款金额:" name="money2">
          <uni-easyinput
            :disabled="formData.id?true:false"
            type="text"
            v-model="formData.money2"
            placeholder="请输入卡2还款金额"
          >
          <template #right>
            <span class="unit">元</span>
          </template>
          </uni-easyinput>
        </uni-forms-item>


        <uni-forms-item label="信用卡号3:" name="bankNo3">
          <uni-easyinput
            type="text"
            :disabled="formData.id?true:false"
            v-model="formData.bankNo3"
            placeholder="请输入信用卡号3"
          />
        </uni-forms-item>
        <uni-forms-item label="卡3还款金额:" name="money3">
          <uni-easyinput
            :disabled="formData.id?true:false"
            type="text"
            v-model="formData.money3"
            placeholder="请输入卡3还款金额"
          >
          <template #right>
            <span class="unit">元</span>
          </template>
          </uni-easyinput>
        </uni-forms-item>

      
        <uni-forms-item label="姓名:" name="name">
          <uni-easyinput
            :disabled="formData.id?true:false"
            type="text"
            v-model="formData.name"
            placeholder="请输入姓名"
          />
        </uni-forms-item>
        <uni-forms-item label="预留手机号码:" name="phone">
          <uni-easyinput
            type="text"
           :disabled="formData.id?true:false"
            v-model="formData.phone"
            placeholder="请输入手机号码"
          />
        </uni-forms-item>
      </uni-forms>

      <!-- 提交按钮 -->
      <view class="submit-btn" @click="submit">{{
        formData.id ? formData.statusDesc : "立即提交"
      }}</view>
    </view>
    <view class="schedule" v-if="formData.id">
      <image
        src="@/static/images/temp/shenhezhong.png"
        class="shenhezhong-image"
      ></image>
    </view>
  </view>
</template>
      
      <script>
import {
  repaymentRecordAddRepayment,
  repaymentRecordList,
} from "@/api/system/user.js";
export default {
  data() {
    return {
      show: false,
      // 表单数据
      formData: {
        id: "",
        bankNo: "",
        bankNo2:'',
        bankNo3:'',
        money: "",
        money2: "",
        money3: "",
        name: "",
        phone: "",
        statusDesc: "",
      },
      rules: {
        bankNo: {
          rules: [
            {
              required: true,
              errorMessage: "请输入信用卡卡号",
            },
          ],
        },
        money: {
          rules: [
            {
              required: true,
              errorMessage: "请输入还款金额",
            },
          ],
        },
        name: {
          rules: [
            {
              required: true,
              errorMessage: "请输入姓名",
            },
          ],
        },
        phone: {
          rules: [
            {
              required: true,
              errorMessage: "请输入手机号码",
            },
          ],
        },
      },
      latestData: {
        statusDesc: "",
      },
    };
  },

  onLoad() {
    this.getRepaymentRecordList()
  },
  methods: {
    // 触发提交表单
    submit() {
      if(this.formData.id){
        return
      }
      this.$refs.form
        .validate()
        .then((res) => {
          const params=  {
            ...this.formData,
            bankNo2:this.formData.bankNo2?this.formData.bankNo2:'0',
            bankNo3:this.formData.bankNo2?this.formData.bankNo3:'0',
          }
          repaymentRecordAddRepayment(params).then((res) => {
            uni.showToast({
              title: "提交成功",
              icon: "success",
            });
            
             setTimeout(() => {
              // uni.navigateBack();
              this.$tab.switchTab('/pages/tabBar/mine')
             },1500)
            // this.getRepaymentRecordList()
          });
        })
        .catch((err) => {
          console.log("表单错误信息：", err);
        });
    },
    getRepaymentRecordList() {
      repaymentRecordList().then((res) => {
        this.formData ={
          ...this.formData,
          ... res.data
        };
      });
    },
  },
};
</script>
      
      <style lang="scss" scoped>
page {
  background: #ba0015;
}
.unit{
  color: #0099D6;
  padding: 0 10rpx;
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
.schedule {
  width: 100%;
  margin-top: 32rpx;
  .shenhezhong-image {
    width: 100%;
    height: 124rpx;
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

.form-section {
  width: 100%;
  background-color: #fff;
  padding: 40rpx;
  margin-top: 40rpx;
  border-radius: 20rpx;
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

.submit-btn {
  width: fit-content;
  padding: 10rpx 60rpx;
  background-color: #f00;
  color: #fff;
  border-radius: 10rpx;
  font-size: 32rpx;
  text-align: center;
  margin: 0 auto;
}
</style>
      