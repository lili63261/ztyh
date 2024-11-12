<template>
  <view class="container">
    <!-- <view class="header">
      <text class="title">股权申请</text>
    </view> -->
    <!-- 页面头部通知 -->
    <view class="header1">
      <view class="notice">
        智天支付智天银行上市通知<br />
        原会员人人可领30万智天股权！股东证书！
      </view>
    </view>

    <!-- 信息录入表单 -->
    <view class="form-section">
      <!-- 股权账户信息 -->
      <view class="account-section">
        <view class="account-info">
          <view class="account-title">股权账户(元)</view>
          <view class="account-balance">30000股</view>
          <view class="account-price">目前每股120元</view>
        </view>
      </view>

      <uni-forms ref="form" :modelValue="formData" :rules="rules" label-position="top" label-width="auto">
        <uni-forms-item label="智天银行会员信息登记:" name="name">
          <uni-easyinput
            type="text"
            v-model="formData.name"
            placeholder="请输入会员信息"
          />
        </uni-forms-item>

        <uni-forms-item label="姓名:" name="name">
          <uni-easyinput
            type="text"
            v-model="formData.name"
            placeholder="请输入名字"
          />
        </uni-forms-item>

        <uni-forms-item label="身份证:" name="name">
          <uni-easyinput
            type="text"
            v-model="formData.name"
            placeholder="请输入身份证号码"
          />
        </uni-forms-item>

        <uni-forms-item label="原智天会员账号:" name="name">
          <uni-easyinput
            type="text"
            v-model="formData.name"
            placeholder="请输入会员账号"
          />
        </uni-forms-item>

        <uni-forms-item label="参与智天年限:" name="name">
          <uni-easyinput
            type="text"
            v-model="formData.name"
            placeholder="请输入年限"
          />
        </uni-forms-item>
      </uni-forms>

      <!-- 提示信息 -->
      <view class="form-tip">
        温馨提示：请如实填写智天个人会员信息，审核通过后可以领取三十万智天股权！并领取智天股东证书！
      </view>

      <!-- 提交按钮 -->
      <view class="submit-btn">申请</view>
    </view>
  </view>
</template>
  
  <script>
export default {
  data() {
    return {
      // 表单数据
      formData: {
        name: "LiMing",
        email: "dcloud@email.com",
      },
      rules: {
        // 对name字段进行必填验证
        // name: {
        //   rules: [
        //     {
        //       required: true,
        //       errorMessage: "请输入姓名",
        //     },
        //     {
        //       minLength: 3,
        //       maxLength: 5,
        //       errorMessage: "姓名长度在 {minLength} 到 {maxLength} 个字符",
        //     },
        //   ],
        // },
        // 对email字段进行必填验证
        email: {
          rules: [
            {
              format: "email",
              errorMessage: "请输入正确的邮箱地址",
            },
          ],
        },
      },
    };
  },
  methods: {
    // 触发提交表单
    submit() {
      this.$refs.form
        .validate()
        .then((res) => {
          console.log("表单数据信息：", res);
        })
        .catch((err) => {
          console.log("表单错误信息：", err);
        });
    },
  },
};
</script>
  
  <style lang="scss" scoped>
page {
  background: #ba0015;
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
  min-height: 100vh;
}

.header1 {
  background-color: #f00;
  padding: 20rpx;
  text-align: center;
}

.notice {
  font-size: 32rpx;
  color: #fff;
}

.account-section {
  margin-bottom: 40rpx;
  background-color: #f8f8f8;
  padding: 10rpx 20rpx;
  border-radius: 10rpx;
  position: relative;
  background: url("@/static/images/temp/zhanghu.png") no-repeat center center;
  background-size: 100% 100%;
  width: 100%;
  box-sizing: border-box;
}

.account-info {
  text-align: center;
}

.account-title {
  font-size: 32rpx;
  color: #000;
  text-align: left;
}

.account-balance {
  font-size: 64rpx;
  color: #f00;
  font-weight: bold;
  margin: 30rpx 0;
}

.account-price {
  font-size: 28rpx;
  color: #000;
  text-align: left;
}

.account-image {
  position: absolute;
  top: 20rpx;
  right: 20rpx;
  width: 120rpx;
  height: 120rpx;
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

.form-tip {
  font-size: 24rpx;
  color: #f00;
  margin-bottom: 40rpx;
  text-align: center;
}

.submit-btn {
  width: fit-content;
  padding:10rpx 60rpx;
  background-color: #f00;
  color: #fff;
  border-radius: 10rpx;
  font-size: 32rpx;
  text-align: center;
  margin: 0 auto;
}
</style>
  