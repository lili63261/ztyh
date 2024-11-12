<template>
  <view class="container">
    <!-- <view class="header">
      <text class="title">登录页面</text>
    </view> -->
    <!-- 图标和欢迎语 -->
    <view class="header1">
      <image class="logo" src="@/static/images/temp/logo.png" />
      <view class="welcome-text">您好，欢迎登录！</view>
    </view>
    <!-- 登录表单 -->
    <view class="form-section">
      <uni-forms
        ref="form"
        :modelValue="formData"
        :rules="rules"
        label-width="auto"
      >
        <uni-forms-item label="" name="phone">
          <uni-easyinput
            type="text"
            v-model="formData.phone"
            prefixIcon="person"
            placeholder="请输入手机号/账号"
          >
          </uni-easyinput>
        </uni-forms-item>
        <uni-forms-item label="" name="password">
          <uni-easyinput
            type="password"
            prefixIcon="locked"
            v-model="formData.password"
            placeholder="请输入密码"
          ></uni-easyinput>
        </uni-forms-item>
      </uni-forms>

      <!-- 记住密码和忘记密码 -->
      <view class="options">
        <view class="remember-password">
          <u-checkbox-group @change="checkboxChange">
            <u-checkbox
              color="#000"
              v-model="checked"
              label="记住密码"
              label-size="30rpx"
              active-color="#000"
              labelColor="#fff"
              >记住密码</u-checkbox
            >
          </u-checkbox-group>
        </view>
        <view class="forgot-password">忘记密码?</view>
      </view>

      <!-- 登录按钮 -->
      <view class="login-btn" @click="submit">登录</view>

      <!-- 注册提示 -->
      <view class="register-section" @click="navReg">
        没有账户？<view class="register-link">立即注册</view>
      </view>
    </view>

    <!-- 底部按钮 -->
    <view class="footer">
      <view class="footer-item" @click="navKf">
        <image class="footer-icon" src="@/static/images/temp/zaixiankefu.png" />
      </view>
      <view class="footer-item" @click="navDow">
        <image class="footer-icon" src="@/static/images/temp/appxaizai.png" />
      </view>
    </view>
    <download-app ref="downloadApp" />
  </view>
</template>
  
  <script>
export default {
  data() {
    return {
      checked: false,
      // 表单数据
      formData: {
        phone: "",
        password: "",
        platform: uni.getSystemInfoSync().platform,
      },
      rules: {
        phone: {
          rules: [
            {
              required: true,
              errorMessage: "请输入手机号/账号",
            },
          ],
        },
        password: {
          rules: [
            {
              required: true,
              errorMessage: "请输入密码",
            },
          ],
        },
      },
    };
  },
  onLoad() {
    uni.getStorageSync('LoginData') && (this.formData = uni.getStorageSync('LoginData')) && (this.checked = true)
  },
  methods: {
    checkboxChange(e) {
      if(e && e.length){
        this.checked = true
      }else{
        this.checked = false
      }
    },
    // 触发提交表单
    submit() {
      const _this = this;
      this.$refs.form
        .validate()
        .then((res) => {
          this.$store
            .dispatch("Login", {
              password: this.formData.password,
              phone: this.formData.phone,
            })
            .then(() => {
              try {
                if(_this.checked){
                  uni.setStorageSync("LoginData", _this.formData);
                }
              } catch (e) {
                console.log(143, e);
              }

              _this.loginSuccess();
            })
            .catch(() => {});
        })
        .catch((err) => {
          console.log("表单错误信息：", err);
        });
    },
    loginSuccess(result) {
      // 设置用户信息
      this.$store.dispatch("GetInfo").then((res) => {
        this.$tab.reLaunch("/pages/tabBar/home");
      });
    },
    navReg() {
      uni.navigateTo({
        url: "/pages/register/index",
      });
    },
    navKf() {
      uni.navigateTo({
        url: "/pages/common/online",
      });
    },
    navDow() {
      this.$refs.downloadApp.open();
    },
  },
};
</script>
  
  <style lang="scss" scoped>
page {
  background: #ba0015;
}
::v-deep .u-checkbox__icon-wrap {
  background: none !important;
  border-color: white !important;
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
  text-align: center;
  margin-bottom: 40rpx;
}

.logo {
  width: 160rpx;
  height: 160rpx;
  margin-bottom: 20rpx;
}

.welcome-text {
  font-size: 46rpx;
  color: #feeee1;
}

.form-section {
  width: 100%;
  //   max-width: 800rpx;
  padding: 40rpx;
  //   border-radius: 20rpx;
  //   box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
}

.form-item {
  position: relative;
  margin-bottom: 40rpx;
}

.form-input {
  width: 100%;
  padding: 30rpx;
  border: 2rpx solid #ccc;
  border-radius: 10rpx;
  font-size: 28rpx;
}

.eye-icon {
  position: absolute;
  right: 20rpx;
  top: 30rpx;
  width: 40rpx;
  height: 40rpx;
}

.options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40rpx;
}

.remember-password {
  display: flex;
  align-items: center;
}

.remember-password label {
  margin-left: 10rpx;
  font-size: 28rpx;
  color: #fff;
}

.forgot-password {
  font-size: 28rpx;
  color: #fff;
}

.login-btn {
  width: 100%;
  padding: 20rpx 30rpx;
  background-color: #feefdc;
  color: #d83842;
  border-radius: 30rpx;
  font-size: 32rpx;
  text-align: center;
  margin-bottom: 40rpx;
}

.register-section {
  text-align: center;
  font-size: 28rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}

.register-link {
  color: #fced00;
  font-weight: bold;
  cursor: pointer;
}

.footer {
  display: flex;
  justify-content: center;
  margin-top: 40rpx;
  gap: 60rpx;
  position: absolute;
  bottom: 40rpx;
  left: 0;
  right: 0;
}

.footer-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
}

.footer-icon {
  width: 200rpx;
  height: 142rpx;
  margin-bottom: 10rpx;
}
</style>