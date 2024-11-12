<template>
  <view class="container">
    <!-- <view class="header">
      <text class="title">注册页面</text>
    </view> -->
    <!-- 图标和欢迎语 -->
    <view class="header1">
      <image class="logo" src="@/static/images/temp/logo.png" />
      <view class="welcome-text">您好，一键注册！</view>
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
        <uni-forms-item label="" name="code">
          <uni-easyinput
            type="text"
            v-model="formData.code"
            prefixIcon="font"
            placeholder="请输入验证码"
          >
            <template #right>
              <image
                @click="getCode"
                :src="codeUrl"
                mode="scaleToFill"
                v-if="codeUrl"
                class="code-img"
              ></image>
              <view v-else @click="getCode" class="code-text">点击获取验证码</view>
            </template>
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
        <uni-forms-item label="" name="confirmPassword">
          <uni-easyinput
            type="password"
            prefixIcon="locked"
            v-model="formData.confirmPassword"
            placeholder="请再次输入密码"
          ></uni-easyinput>
        </uni-forms-item>
        <uni-forms-item label="" name="inviteCode">
          <uni-easyinput
            type="password"
            prefixIcon="link"
            v-model="formData.inviteCode"
            placeholder="请输入您的邀请码"
          ></uni-easyinput>
        </uni-forms-item>
      </uni-forms>

      <!-- 登录按钮 -->
      <view class="login-btn" @click="submit">立即注册</view>
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
import { getCodeImg, register } from "@/api/login";
export default {
  data() {
    return {
      codeUrl: "",
      checked: false,
      // 表单数据
      formData: {
        code: "",
        inviteCode: "",
        password: "",
        phone: "",
        platform: "",
        uuid: "",
        confirmPassword: "",
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
        code: {
          rules: [
            {
              required: true,
              errorMessage: "请输入验证码",
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
        confirmPassword: {
          rules: [
            {
              required: true,
              errorMessage: "请再次输入密码",
            },
            {
              validateFunction: function (rule, value, data, callback) {
                if (value != data.password) {
                  callback("两次密码不一致");
                }
                return true;
              },
            },
          ],
        },
        inviteCode: {
          rules: [
            {
              required: true,
              errorMessage: "请输入您的邀请码",
            },
          ],
        },
      },
    };
  },
  onLoad(e) {
    // this.getCode();
    if (e.inviteCode) {
      this.formData.inviteCode = e.inviteCode;
    }
  },
  methods: {
    // 触发提交表单uni-forms-item__error
    submit() {
      this.$refs.form
        .validate()
        .then((res) => {
          console.log("表单数据信息：", res);
          register(this.formData).then((res) => {
            uni.showToast({
              title: "恭喜注册完成，正在前往登录",
              icon: "success",
              duration: 2000,
              complete: () => {
                setTimeout(() => {
                  uni.navigateTo({
                    url: "/pages/login/index",
                  });
                }, 2000);
              },
            });
          }).catch((err) => {
            this.getCode();
          })
          ;
        })
        .catch((err) => {
          console.log("表单错误信息：", err);
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
    getCode() {
      getCodeImg().then((res) => {
        const captchaEnabled =
          res.captchaEnabled === undefined ? true : res.captchaEnabled;
        if (captchaEnabled) {
          this.codeUrl = "data:image/gif;base64," + res.img;
          this.formData.uuid = res.uuid;
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
::v-deep .u-checkbox__icon-wrap {
  background: none !important;
  border-color: white !important;
}
.code-img {
  width: 80rpx;
  height: 35rpx;
  margin: 0 20rpx;
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
.code-text{
  padding: 10rpx;
  background-color: #feefdc;
  color: #d83842;
  font-size: 24rpx;
  text-align: center;
}
</style>