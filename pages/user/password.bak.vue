<template>
	<view class="ibg">
		<uni-nav-bar class="uniNavBar" title="" :border="false" color="#ffffff" backgroundColor="#ffffff00"
			left-icon="left" @clickLeft="$tab.navigateBack()" />
		<view class="main">
			<image src="/static/images/user/auth.png" mode="widthFix" class="headBg" />
			<view class="acc">
				<image src="/static/images/user/pwd.png" mode="widthFix" />
			</view>
			<view class="content">
				<view class="title">密码信息</view>
				<view class="iform">
					<uni-forms ref="valiForm" :rules="rules" :value="valiFormData" label-position="top" label-width="100%"
						label-align="left" border>
						<uni-forms-item label="旧密码" required name="oldPassword">
							<uni-easyinput placeholderStyle="font-size: 28rpx;" :inputBorder="false"
								primaryColor="#ef2932" type="password" v-model="valiFormData.oldPassword"
								placeholder="请输入旧密码" />
						</uni-forms-item>
						<uni-forms-item label="新密码" required name="newPassword">
							<uni-easyinput placeholderStyle="font-size: 28rpx;" :inputBorder="false"
								primaryColor="#ef2932" type="password" v-model="valiFormData.newPassword"
								placeholder="请输入新密码" />
						</uni-forms-item>
						<uni-forms-item label="确认新密码" required name="confirmPassword">
							<uni-easyinput placeholderStyle="font-size: 28rpx;" :inputBorder="false"
								primaryColor="#ef2932" type="password" v-model="valiFormData.confirmPassword"
								placeholder="请输入确认新密码" />
						</uni-forms-item>
					</uni-forms>
				</view>
			</view>
		</view>
		<view class="btns">
			<view class="btn cancel" @click="$tab.navigateBack()">返回上一步</view>
			<view class="btn confirm" @click="submit('valiForm')">
				<view class="iconxy iconxy-baocun"></view>
				<view>确定并保存</view>
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
	}

	.formRegions {
		padding-left: 20rpx;

		.null {
			font-size: 28rpx;
			color: #999;
		}
	}

	.ibg {
		width: 100%;
		background: url('/static/images/common/bg.jpg') #fff no-repeat;
		background-size: cover;
	}

	.main {
		position: relative;
		margin-top: 100rpx;

		.headBg {
			display: block;
			width: 100%;
		}

		.acc {
			position: absolute;
			left: calc(50vw - 100rpx);
			top: -120rpx;
			width: 200rpx;
			height: 200rpx;
			padding: 10rpx;
			border-radius: 50rpx;
			background: #fff;

			image {
				display: block;
				width: 100%;
			}
		}

		.content {
			padding: 0 50rpx 50rpx 50rpx;
			background: #fff;

			.title {
				margin-bottom: 20rpx;
				font-size: 32rpx;
			}
		}
	}

	.btns {
		display: flex;
		align-items: center;
		justify-content: space-around;
		border-top: 20rpx solid #f4f8fb;
		background: #fff;

		.btn {
			width: 40%;
			margin: 20rpx 0;
			padding: 25rpx 0;
			text-align: center;
			border-radius: 30rpx;
			font-weight: bold;
			font-size: 30rpx;

			&.cancel {
				background-image: linear-gradient(to bottom, #fdfbfb 0%, #ebedee 100%);
			}

			&.confirm {
				display: flex;
				align-items: center;
				justify-content: center;
				background-image: linear-gradient(to top, #db0003 50%, #ffb199 100%);
				color: #fff;

				.iconxy {
					margin-right: 10rpx;
					font-size: 40rpx;
				}
			}
		}
	}
</style>