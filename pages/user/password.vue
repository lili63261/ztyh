<template>
  <view class="ibg">
    <uni-nav-bar class="uniNavBar" title="" :border="false" color="#ffffff" backgroundColor="#ffffff00" left-icon="left"
                 @clickLeft="$tab.navigateBack()" />
    <view class="head">
      <view class="title">轻松一步，安全加倍</view>
      <view class="desc">保护您的账户安全</view>
    </view>
    <view class="main">
      <view class="hd">
        <view class="iconxy iconxy-jinggao1"></view>
        <view>请您定期修改登录密码，确保信息无忧</view>
      </view>
      <view class="bd">
        <view class="iform">
          <uni-forms ref="valiForm" :rules="rules" :model="valiFormData" label-align="left" border>
            <uni-forms-item label="旧 密 码" required name="name">
              <uni-easyinput placeholderStyle="font-size: 28rpx;" primaryColor="#ef2932"
                             :maxlength="11" type="text" v-model="valiFormData.oldPassword" placeholder="请输入旧密码" />
            </uni-forms-item>
            <uni-forms-item label="新 密 码" required name="phone">
              <uni-easyinput placeholderStyle="font-size: 28rpx;" primaryColor="#ef2932"
                             :maxlength="11" type="tel" v-model="valiFormData.newPassword" placeholder="请输入新密码" />
            </uni-forms-item>
            <uni-forms-item label="确认新密码" required name="phone">
              <uni-easyinput placeholderStyle="font-size: 28rpx;" primaryColor="#ef2932"
                             :maxlength="11" type="tel" v-model="valiFormData.confirmPassword" placeholder="请输入确认新密码" />
            </uni-forms-item>
          </uni-forms>
        </view>
        <view class="btn" @click="submit('valiForm')">
          <view class="iconxy iconxy-baocun"></view>
          <view>确定</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
	import { updateUserPwd } from '@/api/system/user'

	export default {
		data() {
			return {
				valiFormData: {
					oldPassword: undefined,
					newPassword: undefined,
					confirmPassword: undefined
				},
				rules: {
					oldPassword: {
						rules: [{
							required: true,
							errorMessage: "旧密码不能为空",
						}, ],
					},
					newPassword: {
						rules: [{
								required: true,
								errorMessage: "新密码不能为空",
							},
							{
								minLength: 6,
								maxLength: 20,
								errorMessage: "长度在 6 到 20 个字符",
							},
						],
					},
					confirmPassword: {
						rules: [{
								required: true,
								errorMessage: "确认密码不能为空",
							},
							{
								validateFunction: (rule, value, data) => data.newPassword === value, errorMessage: "两次输入的密码不一致",
							},
						],
					}
				}
			}
		},
		onReady() {
			this.$refs.valiForm.setRules(this.rules);
		},
		methods: {
			// 表单提交
			submit(ref) {
				this.$refs[ref].validate().then(res => {
					updateUserPwd(this.valiFormData.oldPassword, this.valiFormData.newPassword).then((response) => {
						this.$refs.uToast.show({
							type: 'success',
							message: '修改成功',
							complete: () => {
								this.$tab.switchTab('/pages/user/index')
							}
						})
					})
				}).catch((err) => {
					console.log(err)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
::v-deep {
  .is-required {
    opacity: 0;
  }
  .uni-forms-item__label {
    width: 180rpx !important;
  }
  .uni-forms-item--border {
    border: 0;
  }
}
.formRegions {
  padding-left: 20rpx;
  line-height: 35px;
  height: 35px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  .null {
    font-size: 28rpx;
    color: #999;
  }
}

.ibg {
  position: relative;
  min-height: 100vh;
  background: linear-gradient(to bottom, $pbc, #fff 50%);
  &::before {
    content: '';
    position: absolute;
    right: 20rpx;
    top: 0;
    width: 300rpx;
    height: 500rpx;
    background: url('/static/images/user/pwdt.png') right center no-repeat;
    background-size: contain;
  }
}
.head {
  padding: 80rpx 0 80rpx 40rpx;
  color: #fff;
  .title {
    font-size: 40rpx;
    font-weight: 500;
  }
  .desc {
    margin-top: 20rpx;
    font-size: 32rpx;
  }
}
.main {
  position: relative;
  z-index: 2;
  margin: 20rpx;
  border-radius: 16rpx;
  box-shadow: 0 0 6px 0px rgba(0,0,0,.17);
  .hd {
    display: flex;
    align-items: center;
    padding: 30rpx;
    border-radius: 16rpx 16rpx 0 0;
    background: linear-gradient(45deg, #dae8ff, #d3d7ff);
    font-weight: 500;
    .iconxy {
      margin-right: 10rpx;
    }
  }
  .bd {
    padding: 30rpx 20rpx;
    border-radius: 0 0 16rpx 16rpx;
    background: #fff;
  }
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20rpx 0;
    padding: 25rpx 0;
    border-radius: 16rpx;
    font-weight: 500;
    font-size: 30rpx;
    background-image: linear-gradient(45deg, #2979ff 50%, #609cff 100%);
    text-align: center;
    color: #fff;
    .iconxy {
      margin-right: 10rpx;
      font-size: 40rpx;
      font-weight: normal;
    }
  }
}
</style>