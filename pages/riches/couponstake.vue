<template>
	<view>
		<uni-nav-bar class="uniNavBar" title="代金券提现" :border="false" backgroundColor="#ffffff00"
			left-icon="left" @clickLeft="$tab.navigateBack()" />
		<view class="head">
			<view class="teamMoney">
				<view class="name">
					可提现金额 (元)
				</view>
				<view class="num">
					<u-count-to :endVal="activeMoney / 10000" autoplay :decimals="0" color="#fff" />
					<text v-if="activeMoney > 0" style="padding-left: 10rpx;">万</text>
				</view>
			</view>
			<view class="other">
				<view class="taked">
					<view class="name">
						累计已提现 (元)
					</view>
					<view class="num">
						<u-count-to :endVal="takedMoney" autoplay :decimals="0" color="#fff" />
						<text v-if="takedMoney > 0" style="padding-left: 10rpx;">万</text>
					</view>
				</view>
				<view class="btn" @click="$tab.navTo('/pages/riches/couponslog')">
					<view class="iconxy iconxy-yundanmingxitongji"></view>
					<view>现金提现明细</view>
				</view>
			</view>
		</view>
		
		<view class="main">
			<view class="item">
				<view class="label">
					银行卡号
				</view>
				<view class="value">
					{{ acc.bankNo }}
				</view>
			</view>
			<view class="item">
				<view class="label">
					开 &nbsp;户&nbsp;行
				</view>
				<view class="value">
					{{ acc.bankName }}
				</view>
			</view>
			<view class="item">
				<view class="label">
					开 &nbsp;户&nbsp;人
				</view>
				<view class="value">
					{{ acc.name }}
				</view>
			</view>
			<view class="iptBox">
				<view class="label">
					提现金额
				</view>
				<view class="ipt">
					<u--input
					    :placeholder="placeholder"
						type="number"
					    border="bottom"
						bold
					    v-model="money"
					>
						<template slot="prefix">
							<u-icon name="rmb" size="60rpx" color="#000"></u-icon>
						</template>
						<template slot="suffix">
							<text style="font-size: 40rpx;">万元</text>
						</template>
					</u--input>
				</view>
				<view class="all" @click="onTakeAll()">全部提现</view>
			</view>
		</view>
		
		<view class="btn" @click="doTake">
			<view class="iconxy iconxy-tixianjilu"></view>
			<view>提现</view>
		</view>
		
	</view>
</template>

<script>
	import { userCoupons } from '@/api/bankCard/bankCard.js'
	import { minWithdraw, apply, totalByType, ortherApply } from '@/api/mine/withdraw.js'
	
	export default {
		computed: {
			activeMoney() {
				const taked = this.takedMoney * 10000
				return this.total - taked
			}
		},
		data() {
			return {
				total: 0,
				takedMoney: 0,
				min: 50,
				placeholder: '最低提现金额50万元',
				money: undefined
			}
		},
		onLoad() {
			this.getTotal()
			this.getTakedTotal()
		},
		methods: {
			doTake() {
				this.$refs.uToast.loading('加载中...')

				if (!this.money) {
					this.$refs.uToast.hide()
					return this.$refs.uToast.error('请输入提现金额')
				}

				if (parseInt(this.money) > this.activeMoney / 10000) {
					this.$refs.uToast.hide()
					return this.$refs.uToast.error('已超出当前账户可提现金额')
				}
				
				if (parseInt(this.money) < this.min) {
					this.$refs.uToast.hide()
					let msg = '最低提现金额为: ' + this.min + '万元'
				
					return this.$refs.uToast.error(msg)
				}
				
				const payParams = {
					busiParam: this.money,
					money: 300,
					busiType: 31,
					title: '代金券提现',
					fee: '代金券现金提现'
				}
				this.$tab.navTo(`/pages/common/defray?info=${JSON.stringify(payParams)}`)
			},
			onTakeAll() {
				this.money = this.activeMoney / 10000
			},
			getTotal() {
				userCoupons().then(res => {
					let sum = 0
					res.data.forEach(item => {
						if (item.status === 2) {
							sum += parseFloat(item.originalMoney || 0)
						}
					})
					
					this.total = sum
				})
			},
			getTakedTotal() {
				totalByType(100).then(res => {
					this.takedMoney = res.data
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.head {
	position: relative;
	margin: 0 16rpx 16rpx 16rpx;
	border-radius: 16rpx;
	background: url('/static/images/common/tbg.jpg') center bottom no-repeat;
	background-size: cover;
	color: #fff;
	.teamMoney {
		padding: 40rpx;
		.num {
			text-align: center;
			margin-top: 20rpx;
			.u-count-num {
				font-size: 60rpx !important;
			}
		}
	}
	.other {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20rpx 40rpx;
		border-radius: 0 0 16rpx 16rpx;
		background: hsla(0, 0%, 100%, .03);
		backdrop-filter: blur(3px);
		.taked {
			.name {
				margin-bottom: 10rpx;
			}
		}
		.btn {
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 20rpx 30rpx;
			border-radius: 50rpx;
			background-image: linear-gradient(45deg, #2979ff 50%, #609cff);;
			.iconxy {
				margin-right: 10rpx;
			}
		}
	}
}
.main {
	.item {
		display: flex;
		align-items: center;
		margin: 20rpx;
		padding: 30rpx;
		border-radius: 16rpx;
		background: #fff;
		.label {
			margin-right: 20rpx;
		}
		.value {
			font-weight: bold;
		}
	}
	.iptBox {
		margin: 20rpx;
		padding: 30rpx;
		border-radius: 16rpx;
		background: #fff;
		.ipt {
			margin: 20rpx 0;
		}
		.all {
			text-align: right;
			color: $pbc;
		}
	}
}
.btn {
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0 20rpx;
	padding: 25rpx 0;
	text-align: center;
	border-radius: 30rpx;
	font-weight: bold;
	font-size: 30rpx;
	background-image: linear-gradient(45deg, #2979ff 50%, #609cff);
	color: #fff;
	.iconxy {
		margin-right: 10rpx;
		font-size: 40rpx;
	}
}
</style>
