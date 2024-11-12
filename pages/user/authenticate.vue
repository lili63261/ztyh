<template>
	<view class="ibg">
		<!-- <uni-nav-bar class="uniNavBar" :border="false" color="#ffffff" backgroundColor="#ffffff00" left-icon="left"
			@clickLeft="$tab.navigateBack()" /> -->
		<view class="head">
			<view class="title">即刻实名认证</view>
			<view class="desc">为您的资金安全保驾护航</view>
		</view>
		<view class="main">
			<view class="hd">
				<view class="iconxy iconxy-jinggao1"></view>
				<view>请您使用有效身份证信息认证</view>
			</view>
			<view class="bd">
				<view class="iform">
					<uni-forms ref="valiForm" :rules="rules" :model="valiFormData" label-position="top" border>
						<uni-forms-item label="真实姓名" required name="name">
							<uni-easyinput placeholderStyle="font-size: 28rpx;" primaryColor="#ef2932" :maxlength="40" type="text" v-model="valiFormData.name"
								placeholder="请输入真实姓名" />
						</uni-forms-item>
						<uni-forms-item label="身份证号" required name="idCard">
							<uni-easyinput placeholderStyle="font-size: 28rpx;" primaryColor="#ef2932" :maxlength="18" type="idcard" v-model="valiFormData.idCard"
								placeholder="请输入身份证号" />
						</uni-forms-item>
						<uni-forms-item label="开  户  行" required name="bankName">
							<uni-easyinput placeholderStyle="font-size: 28rpx;" primaryColor="#ef2932" v-model="valiFormData.bankName" placeholder="请输入开户行" />
						</uni-forms-item>
						<uni-forms-item label="银行卡号" required name="bankNo">
							<uni-easyinput placeholderStyle="font-size: 28rpx;" primaryColor="#ef2932" :maxlength="19" type="number" v-model="valiFormData.bankNo"
								placeholder="请输入银行卡号" />
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
import { addCertification, editCertification, detailCertification } from '@/api/mine/certification.js'
	
export default {
	data() {
		return {
			valiFormData: {
				bankNo: ''
			},
			rules: {
				name: {
					rules: [{
						required: true,
						errorMessage: "真实姓名不能为空",
					}, ],
				},
				idCard: {
					rules: [{
						required: true,
						errorMessage: "身份证号不能为空",
					}, ],
				},
				bankName: {
					rules: [{
						required: true,
						errorMessage: "开户行不能为空",
					}, ],
				},
				bankNo: {
					rules: [{
						required: true,
						errorMessage: "银行卡号不能为空",
					}, ],
				},
			}
		}
	},
	onShow() {
		if (this.isAcc) {
			this.valiFormData = this.acc
		}
	},
	methods: {
		// 表单提交
		submit(ref) {
			this.$refs[ref].validate().then(res => {
				if (this.valiFormData.id) {
					this.$refs.uToast.error('若需修改实名认证信息请联系在线客服')
					
					// editCertification(this.valiFormData).then((resp) => {
					// 	this.SET_ACC({})
						
					// 	this.$refs.uToast.show({
					// 		type: 'success',
					// 		message: '修改成功',
					// 		complete: () => {
					// 			this.$tab.switchTab('/pages/user/index')
					// 		}
					// 	})
					// })
				} else {
					addCertification(this.valiFormData).then((resp) => {
						this.SET_ACC({})
						
						// this.$refs.uToast.show({
						// 	type: 'success',
						// 	message: '提交成功',
						// 	complete: () => {
						// 		this.$tab.switchTab('/pages/user/index')
						// 	}
						// })

						uni.showToast({
							title: '提交成功',
							icon: 'success',
							duration: 2000,
							complete: () => {
								setTimeout(() =>{
									this.$tab.switchTab('/pages/tabBar/mine')
								}, 1000)
							}
						});
					})
				}
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
		width: 150rpx !important;
	}
	.uni-forms-item--border {
		border: 0;
	}
	.uni-forms-item__error{
		color: rgba(228, 61, 51,.5);
	}
}
.ibg {
	position: relative;
	min-height: 100vh;
	background: linear-gradient(to bottom, #FF0022, #fff 50%);
	// background: url("@/static/images/temp/beijing.png") no-repeat center center;
//   background-size: 100% 100%;
//   background-repeat: no-repeat;
	width: 100%;
	min-height: 100vh;
	// &::before {
	// 	content: '';
	// 	position: absolute;
	// 	right: 20rpx;
	// 	top: 0;
	// 	width: 300rpx;
	// 	height: 500rpx;
	// 	background: url('/static/images/user/acct.png') right center no-repeat;
	// 	background-size: contain;
	// }
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
		background: linear-gradient(45deg, #eb2943, #eb2943);
		font-weight: 500;
		margin-top: 44px;
		color: white;

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
		background-image: linear-gradient(45deg, #FF0022 50%, #FF0022 100%);
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