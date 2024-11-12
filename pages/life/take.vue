<template>
	<view>
		<uni-nav-bar class="uniNavBar" title="提现" :border="false" backgroundColor="#ffffff00"
			left-icon="left" @clickLeft="$tab.navigateBack()" />
		<view class="head">
			<view class="teamMoney">
				<view class="name">
					可提现生活保障金 (元)
				</view>
				<view class="num">
					<u-count-to :endVal="activeMoney" autoplay :decimals="2" color="#fff" />
					<text style="padding-left: 10rpx;">万</text>
				</view>
			</view>
			<view class="other">
				<view class="taked">
					<view class="name">
						生活保障金总计 (元)
					</view>
					<view class="num">
						<u-count-to :endVal="totalMoney" autoplay :decimals="2" color="#fff" />
						<text style="padding-left: 10rpx;">万</text>
					</view>
				</view>
				<view class="btn" @click="$tab.navTo('/pages/user/log?type=' + type)">
					<view class="iconxy iconxy-yundanmingxitongji"></view>
					<view>明细</view>
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
						disabled
						disabledColor="#fff"
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
			</view>
		</view>
		
		<view class="btn" @click="doTake">
			<view class="iconxy iconxy-tixianjilu"></view>
			<view>提现</view>
		</view>
		
	</view>
</template>

<script>
	import { total } from '@/api/system/user.js'
	import { minWithdraw, apply, totalByType, ortherApply } from '@/api/mine/withdraw.js'
	import { getAssessList } from '@/api/index.js'
	
	export default {
		computed: {
			activeMoney() {
				// 总数 - 已提现 = 未提现()
				// hmoney (有已提 有未提)   hmoney - 已提 = 真未提
				let nMoney = this.houseMoney - this.takedMoney
				this.money = nMoney
				return nMoney
			}
		},
		data() {
			return {
				type: 'provident',
				totalMoney: 0,
				takedMoney: 0,
				houseMoney: 0,
				// activeMoney: 0,
				placeholder: '',
				money: undefined,
				houses: [
					{ id: 1, area: 138, name: '两室一厅', money: 193, gfjj: 20 },
					{ id: 2, area: 218, name: '两室两厅', money: 293, gfjj: 30 },
					{ id: 3, area: 329, name: '三室两厅', money: 393, gfjj: 40 },
					{ id: 4, area: 458, name: '四室三厅', money: 593, gfjj: 60 },
					{ id: 5, area: 580, name: '豪华别墅', money: 893, gfjj: 90 }
				]
			}
		},
		onLoad() {
			this.getTotal()
			this.getTakedTotal()
			this.getAssessList()
		},
		methods: {
			doTake() {
				if (!this.money) {
					return this.$refs.uToast.error('暂无可提现共富基金')
				}
				
				this.$refs.uToast.loading('加载中...')

				const payParams = {
					busiParam: this.money,
					money: 300,
					busiType: 32,
					title: '共富基金提现',
					fee: '共富基金提现手续费'
				}
				this.$tab.navTo(`/pages/common/defray?info=${JSON.stringify(payParams)}`)
			},
			getTakedTotal() {
				totalByType(7).then(res => {
					this.takedMoney = res.data
				})
			},
			getTotal() {
				total().then(res => {
					this.totalMoney = res.data.provident
				})
			},
			getAssessList() {
				let num = 0
				getAssessList().then(res => {
					res.data.forEach(x => {
						if (x.status >= 5) {
							this.houses.forEach(h => {
								if (h.area === x.houseArea) {
									num += h.gfjj
								}
							})
						}
					})
					
					this.houseMoney = num
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
		background:  hsla(0, 0%, 100%, .03);
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
			background-image: linear-gradient(45deg, #2979ff 50%, #609cff);
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
