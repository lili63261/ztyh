<template>
	<view>
		<uni-nav-bar class="uniNavBar" title="收银台" :border="false" backgroundColor="#ffffff00" left-icon="left"
			@clickLeft="$tab.navigateBack()" />

		<view class="head">
			<view class="left">
				<view class="title">{{ params.actionName || '请付款' }}</view>
				<view class="countdown">
					<view class="txt">付款剩余时间</view>
					<u-count-down ref="countDown" :time="900000" format="mm:ss" @finish="countTimeEnd" />
				</view>
			</view>
			<view class="icon">
				<view class="iconxy iconxy-countDown"></view>
			</view>
		</view>

		<view class="info">
			<view class="hd">
				<view class="iconxy iconxy-fukuan"></view>
				<view>{{ params.title }}</view>
			</view>
			<view class="bd">
				<view class="item">
					<view class="lable">{{ params.moneyLable || '付款金额' }}</view>
					<view class="value">
						<u--text mode="price" :text="params.money" />
					</view>
				</view>
				<view v-if="params.busiType === 100 || params.busiType === 101" class="item">
					<view class="lable">数量</view>
					<view class="value">{{ params.busiParam }} 枚</view>
				</view>
				<view class="item">
					<view class="lable">费用明细</view>
					<view v-if="params.busiType === 38" class="value">
						<view style="text-align: right;">{{ params.fee }}</view>
						<view style="text-align: right;">{{ params.fee2 }}</view>
					</view>
					<view v-else class="value">{{ params.fee }}</view>
				</view>
				<view v-if="params.charge" class="item">
					<view class="lable">收取单位</view>
					<view class="value">{{ params.charge }}</view>
				</view>
			</view>
		</view>
		
		<view v-if="params.busiType === 34" class="tips">
			<view class="iconxy iconxy-jinggao"></view>
			<view class="txt">因爱心房名额有限, 为预防恶意申请, 黄牛申请, 每次申请均需保证金, 房屋一经入住则原路退还, 若申请不入住造成名额浪费则保证金不退还</view>
		</view>
		
		<view v-if="params.busiType === 1" class="tips">
			<view class="iconxy iconxy-jinggao"></view>
			<view class="txt">投资金额将会在3-5天内原路返回</view>
		</view>
		
		<view v-if="params.busiType === 100" class="tips">
			<view class="iconxy iconxy-jinggao1"></view>
			<view class="txt">保价费是指在邮寄贵重物品时的费用，寄件方选择此项服务时，应确定保价金额与每个邮件内件实际价值一致，快递件如发生丢失、损毁或短少，快递方按实际损失价值赔偿，但最高不超过相关邮件的保价金额</view>
		</view>
		
		<view v-if="params.busiType === 101" class="tips">
			<view class="iconxy iconxy-jinggao1"></view>
			<view class="txt">结兑流程完成后, 3个工作日内到账</view>
		</view>
		
		<view class="payType">
			<view class="hd">
				<view class="iconxy iconxy-zhifufangshiyinxingqiazhifu"></view>
				<view>支付方式</view>
			</view>
			<view class="bd">
				<radio-group @change="radioChange" class="radioGroup">
					<label>
						<view class="item" :class="{ 'checked' : type === 'zfb' }">
							<view class="left">
								<image src="/static/images/user/zfb.png" mode="widthFix"></image>
								<view class="name">支付宝支付</view>
							</view>
							<view class="right">
								<radio value="zfb" color="#2979ff" :checked="type === 'zfb'"
									style="transform:scale(0.7)" />
							</view>
						</view>
					</label>
					<label>
						<view class="item" :class="{ 'checked' : type === 'wx' }">
							<view class="left">
								<image src="/static/images/user/wx.png" mode="widthFix"></image>
								<view class="name">微信支付</view>
							</view>
							<view class="right">
								<radio value="wx" color="#2979ff" :checked="type === 'wx'"
									style="transform:scale(0.7)" />
							</view>
						</view>
					</label>
					<label>
						<view class="item" :class="{ 'checked' : type === 'bank' }">
							<view class="left">
								<image src="/static/images/user/bank.png" mode="widthFix"></image>
								<view class="name">银联支付</view>
							</view>
							<view class="right">
								<radio value="bank" color="#2979ff" :checked="type === 'bank'"
									style="transform:scale(0.7)" />
							</view>
						</view>
					</label>
				</radio-group>
			</view>
		</view>

		<view class="btn" @click="doPayment">
			<view class="iconxy iconxy-bg-quit"></view>
			<view>去付款</view>
		</view>

		<iupop ref="checkPayPopup" ititle="系统提示" icontent="请确认是否完成付款" icancel="还未付款" iconfirm="完成付款"
			@closed="hideCheckPop" @confd="$tab.switchTab('/pages/user/index')" />

	</view>
</template>

<script>
	import { createOrder } from '@/api/payOrder/payOrder.js'

	export default {
		data() {
			return {
				type: 'bank',
				params: {}
			}
		},
		onLoad(e) {
			if (e) {
				const {
					info
				} = e
				const params = JSON.parse(info)
				this.type = params.type ? params.type : 'bank'
				this.params = params
			}
		},
		onShow() {
			this.checkPay()
		},
		methods: {
			async doPayment() {
				// 支付
				this.$refs.uToast.loading('加载中...')

				const pData = {
					busiType: this.params.busiType,
					money: this.params.money,
					payType: this.type,
				}
				if (this.params.id) {
					pData.id = this.params.id
				}
				if (this.params.busiParam) {
					pData.busiParam = this.params.busiParam
				}

				createOrder(pData).then(res => {
					this.$refs.uToast.loading('正在前往付款')

					uni.setStorageSync('isPay', 1)
					window.location.href = res.data
				})
			},
			checkPay() {
				if (uni.getStorageSync('isPay') == 1) {
					
					this.$nextTick(() => {
						this.$refs.checkPayPopup.open()
					})
					
					uni.setStorageSync('isPay', 0)
				}
			},
			hideCheckPop() {
				this.$refs.countDown.reset()
			},
			radioChange(e) {
				this.type = e.detail.value
			},
			// 倒计时结束弹出
			countTimeEnd() {
				console.log('end')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 0 16rpx 16rpx 16rpx;
		padding: 40rpx;
		border-radius: 16rpx;
		background: url('/static/images/common/tbg.jpg') center bottom no-repeat;
		background-size: cover;
		color: #fff;

		.left {
			.title {
				font-size: 50rpx;
				font-weight: bold;
			}

			.countdown {
				display: flex;
				align-items: center;
				margin-top: 10rpx;

				.txt {
					margin-right: 20rpx;
				}

				::v-deep {
					.u-count-down__text {
						color: #fff;
						font-size: 32rpx;
						font-weight: bold;
					}
				}
			}
		}

		.icon {
			.iconxy {
				font-size: 90rpx;
			}
		}
	}

	.info {
		margin: 0 20rpx;
		padding: 20rpx;
		border-radius: 16rpx;
		background: #fff;

		.hd {
			display: flex;
			align-items: center;
			padding: 10rpx 0;
			font-size: 32rpx;
			font-weight: bold;

			.iconxy {
				margin-right: 10rpx;
				font-size: 40rpx;
				color: #2979ff;
			}
		}

		.bd {
			.item {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 20rpx 0;
			}

			::v-deep {

				.u-text__price,
				.u-text__value {
					font-size: 40rpx !important;
					font-weight: bold !important;
					color: $pbc !important;
				}
			}
		}
	}
	
	.tips {
		display: flex;
		align-items: center;
		margin: 20rpx;
		padding: 10rpx;
		border-radius: 10rpx;
		border: 1px solid #f56c6c;
		background-color: #fef0f0;
		color: #f56c6c;
		.iconxy {
			margin: 0 10rpx;
		}
	}

	.payType {
		margin: 20rpx 20rpx 0 20rpx;
		padding: 20rpx;
		border-radius: 16rpx;
		background: #fff;

		.hd {
			display: flex;
			align-items: center;
			padding: 20rpx 0;
			font-size: 32rpx;
			font-weight: bold;

			.iconxy {
				margin-right: 10rpx;
				font-size: 40rpx;
				color: #2979ff;
			}
		}

		.bd {
			.radioGroup {
				width: 100%;
			}

			.item {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 20rpx;
				border-radius: 16rpx;
				border: 1px solid transparent;

				&.checked {
					border: 1px solid #2979ff;
					background: #ffe5e6;
				}
			}

			.left {
				display: flex;
				align-items: center;

				image {
					width: 80rpx;
				}

				.name {
					padding-left: 20rpx;
				}
			}
		}
	}

	.btn {
		margin: 20rpx;
		padding: 25rpx 0;
		text-align: center;
		border-radius: 30rpx;
		font-weight: bold;
		font-size: 30rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background-image: linear-gradient(45deg, #2979ff 50%, #609cff);
		color: #fff;

		.iconxy {
			margin-right: 10rpx;
			font-size: 40rpx;
		}
	}
</style>