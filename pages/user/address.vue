<template>
	<view class="ibg">
		<!-- <uni-nav-bar class="uniNavBar" title="" :border="false" color="#ffffff" backgroundColor="#ffffff00" left-icon="left"
			@clickLeft="$tab.navigateBack()" /> -->
		<view class="head">
			<view class="title">确保收货地址的准确性</view>
			<view class="desc">以防错误地址导致货物无法正确送达带来的经济损失，后果自负！</view>
		</view>
		<view class="main">
			<view class="hd">
				<view class="iconxy iconxy-jinggao1"></view>
				<view>请您填写真实有效的收货地址</view>
			</view>
			<view class="bd">
				<view class="iform">
					<uni-forms ref="valiForm" :rules="rules" :model="valiFormData" label-position="top" border>
						<uni-forms-item label="收货人姓名" required name="name">
							<uni-easyinput placeholderStyle="font-size: 28rpx;" primaryColor="#ef2932"
								:maxlength="6" type="text" v-model="valiFormData.name" placeholder="请输入收货人姓名" />
						</uni-forms-item>
						<uni-forms-item label="收货人电话" required name="phone">
							<uni-easyinput placeholderStyle="font-size: 28rpx;" primaryColor="#ef2932"
								:maxlength="11" type="tel" v-model="valiFormData.phone" placeholder="请输入收货人电话" />
						</uni-forms-item>
						<uni-forms-item label="收 货 地 址" required name="province">
							<view class="formRegions">
								<pick-regions :defaultRegion="this.valiFormData.region" @getRegion="handleGetRegion">
									<view v-if="regionName" class="default">
										<view>{{ regionName }}</view>
										<view class="uni-icons content-clear-icon uniui-clear" @click.stop="clearRegions">
										</view>
									</view>
									<view v-else class="null">请选择收货地址</view>
								</pick-regions>
							</view>
						</uni-forms-item>
						<uni-forms-item label="详 细 地 址" required name="address">
							<uni-easyinput placeholderStyle="font-size: 28rpx;" primaryColor="#ef2932"
								v-model="valiFormData.address" placeholder="请输入详细地址" />
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
import { addAddressn, editAddress, detailAddress, listAddress } from '@/api/mine/address.js'
	
export default {
	computed: {
		regionName() {
			if (this.valiFormData.provinceCityRegion) {
				return this.valiFormData.provinceCityRegion
			}
			// 转为字符串
			return this.regionArr.map((item) => item.name).join(" ")
		}
	},
	data() {
		return {
			valiFormData: {
				province: "",
				region: "",
			},
			regionArr: [],
			rules: {
				name: {
					rules: [{
						required: true,
						errorMessage: "收货人姓名不能为空",
					}]
				},
				phone: {
					rules: [
						{ required: true, errorMessage: "收货人电话不能为空" },
						{ format: "number", errorMessage: "收货人电话只能输入数字" },
						{ pattern: /^1(3|4|5|6|7|8|9)\d{9}$/, errorMessage: "手机号格式错误", trigger: "blur" }
					],
				},
				province: {
					rules: [{ required: true, errorMessage: "请选择收货地址" }]
				},
				address: {
					rules: [{ required: true, errorMessage: "详细地址不能为空" }]
				}
			}
		}
	},
	async onShow() {
		// if (this.isAdr) {
		// 	this.valiFormData = this.adr
		// }
		const res = await listAddress();
		if(res.data.length > 0) {
			this.valiFormData = {
				...this.valiFormData,
				...res.data[0],
			}
		}
	},
	methods: {
		// 表单提交
		submit(ref) {
			this.$refs[ref].validate().then(res => {
				this.valiFormData.isDefault = 1
				this.valiFormData.provinceCityRegion = this.regionName
				
				if (this.valiFormData.id) {
					editAddress(this.valiFormData).then((res) => {
						this.SET_ADR({})
						// this.$refs.uToast.show({
						// 	type: 'success',
						// 	message: '修改成功',
						// 	complete: () => {
						// 		this.$tab.switchTab('/pages/user/index')
						// 	}
						// })
						uni.showToast({
							title: '修改成功',
							icon: 'success',
							duration: 2000,
							complete: () => {
								setTimeout(() =>{
									this.$tab.switchTab('/pages/tabBar/mine')
								}, 1000)
							}
						});
					})
				} else {
					addAddressn(this.valiFormData).then((res) => {
						this.SET_ADR({})
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
		},
		// 获取选择的地区
		handleGetRegion(region) {
			this.valiFormData.province = region[0].code
			this.valiFormData.city = region[1].code
			this.valiFormData.region = region[2].code
			this.regionArr = region
			this.valiFormData.provinceCityRegion = ''
		},
		clearRegions(event) {
			event.stopPropagation()
			this.regionArr = []
			this.valiFormData.region = ''
			this.valiFormData.province = ''
			this.valiFormData.provinceCityRegion = ''
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
	.is-input-border{
		border:none;
		border-bottom: 1px solid rgb(229, 229, 229);
		border-radius: 0;
	}
}
.formRegions {
	padding-left: 20rpx;
	line-height: 35px;
	height: 35px;
	// border: 1px solid #dcdfe6;
	border-bottom: 1px solid rgb(229, 229, 229);
	border-radius: 0;
	.null {
		font-size: 28rpx;
		color: #999;
	}
}

.ibg {
	position: relative;
	min-height: 100vh;
	background: linear-gradient(to bottom, #FF0022, #fff 50%);
	// &::before {
	// 	content: '';
	// 	position: absolute;
	// 	right: 20rpx;
	// 	top: 0;
	// 	width: 300rpx;
	// 	height: 500rpx;
	// 	background: url('/static/images/user/adrt.png') right center no-repeat;
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