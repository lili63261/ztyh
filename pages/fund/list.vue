<template>
	<view>
		<z-paging ref="paging" v-model="dataList" hide-no-more-inside @query="queryList">
			<view slot="top">
				<uni-nav-bar class="uniNavBar" title="我的国债" :border="false" backgroundColor="#ffffff00"
					left-icon="left" @clickLeft="$tab.navigateBack()" />
				<view class="head">
					<view class="teamMoney">
						<view class="name">可提现收益 (元)</view>
						<view class="num">
							<u-count-to :endVal="takeEarn" autoplay :decimals="2" color="#fff" />
						</view>
					</view>
					<view class="other">
						<view class="taked">
							<view class="name">累计收益 (元)</view>
							<view class="num">
								<u-count-to :endVal="earnTotal" autoplay :decimals="2" color="#fff" />
							</view>
						</view>
						<view class="btn" @click="$tab.navTo('/pages/user/log?type=cashback')">
							<view class="iconxy iconxy-yundanmingxitongji"></view>
							<view>收益明细</view>
						</view>
					</view>
				</view>
			</view>
		
			<view class="list">
				
				<view v-for="item in dataList" :key="item.id" class="item">
					<view class="title">
						<view class="name">{{ item.name }}</view>
						<view class="ctime">买入时间: {{ item.createTime }}</view>
					</view>
					<view class="cols">
						<view class="col">
							<view class="name">每日收益</view>
							<view class="value">
								<u--text mode="price" size="40rpx" color="#2979ff" bold :text="item.stock === 1 ? item.cashback * 10 : item.cashback" />
							</view>
						</view>
						<view class="col">
							<view class="name">累计收益</view>
							<view class="value">
								<u--text mode="price" size="40rpx" bold :text="item.earn" />
							</view>
						</view>
						<view class="col">
							<view class="name">持有天数</view>
							<view class="value">{{ item.earn / item.cashback }}</view>
						</view>
					</view>
					<view class="status">
						<u-tag :type="item.status === 0 ? 'success' : 'warning'" plain plainFill :text="item.statusDesc" />
					</view>
					<view v-if="item.status != 2" class="btns">
						<view v-if="item.stock === 0" class="btn" @click="doUp(item)">
							<view class="iconxy iconxy-qianbaoshengji"></view>
							<view class="txt">国债升级</view>
						</view>
						<view class="btn warning" :class="{'max': item.stock === 1}" @click="redeem(item)">
							<view class="iconxy iconxy-tixianjilu"></view>
							<view class="txt">赎回资金</view>
						</view>
					</view>
				</view>
				
			</view>
		
			<view slot="empty">
				<u-empty icon="/static/images/common/empty1.png" text="暂无数据" />
			</view>
		</z-paging>
		
		<u-popup :show="showRedeem" round="16rpx">
			<view class="redeemBox">
				<view class="title">
					<u--text type="error" align="center" prefixIcon="error-circle" iconStyle="padding-right:10rpx;font-size: 40rpx;color: #f56c6c;" text="资金持有不足30天，赎回需100元手续费" />
				</view>
				<view class="btns">
					<view  class="btn cancel" @click="showRedeem = false;onRow = {}">取消</view>
					<view class="btn confirm" @click="doRedeem()">
						<view class="iconxy iconxy-tixianjilu"></view>
						<view>确定赎回</view>
					</view>
				</view>
			</view>
		</u-popup>
		
	</view>
</template>

<script>
	import { total } from '@/api/system/user.js'
	import { userBuyRecordList } from '@/api/bond/bond.js'
	
	export default {
		computed: {
			earnTotal() {
				let num = 0
				this.dataList.forEach(item => {
					num += parseFloat(item.earn)
				})
				
				return num
			}
		},
		data() {
			return {
				showRedeem: false,
				onRow: {},
				takeEarn: 0,
				dataList: []
			}
		},
		onShow() {
			this.getTotal()
		},
		methods: {
			doUp(row) {
				this.$refs.uToast.loading('加载中...')
				
				const payParams = {
					id: row.id,
					money: 300,
					busiType: 2,
					title: row.name + '升级',
					fee: '国债收益10倍升级'
				}
				this.$tab.navTo(`/pages/common/defray?info=${JSON.stringify(payParams)}`)
			},
			doRedeem() {
				this.$refs.uToast.loading('加载中...')
				
				const payParams = {
					id: this.onRow.id,
					money: 100,
					busiType: 1,
					title: this.onRow.name + '赎回',
					fee: '资金赎回手续费'
				}
				
				this.onRow = {}
				this.showRedeem = false
				
				this.$tab.navTo(`/pages/common/defray?info=${JSON.stringify(payParams)}`)
			},
			redeem(row) {
				// return this.$refs.uToast.warning('持有30天方可赎回')
				this.onRow = row
				this.showRedeem = true
			},
			async queryList(pageNo, pageSize) {
				this.$refs.uToast.loading('加载中...')
				
				const params = {
					pageNum: pageNo,
					pageSize: pageSize
				}
				
				const res = await userBuyRecordList(params)
				
				this.$refs.uToast.hide()
				
				const list = res.data
				this.$refs.paging.complete(list)
			},
			// 资金统计
			getTotal() {
				total().then((res) => {
					this.takeEarn = res.data.cashback
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
			background-image: linear-gradient(45deg, #2979ff 50%, #609cff);
			.iconxy {
				margin-right: 10rpx;
			}
		}
	}
}

.list {
	margin: 0 20rpx 20rpx 20rpx;
	.item {
		padding: 20rpx;
		margin-bottom: 20rpx;
		border-radius: 16rpx;
		background: #fff;
		.title {
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 32rpx;
			font-weight: bold;
			.ctime {
				font-size: 26rpx;
				color: #666;
			}
		}
		.cols {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin: 30rpx 0;
			.col {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				.name {
					margin-bottom: 10rpx;
					color: #666;
				}
				.value {
					font-size: 40rpx;
				}
			}
		}
		.status {
			::v-deep {
				.u-tag {
					justify-content: center;
				}
			}
		}
		.btns {
			display: flex;
			align-items: center;
			justify-content: space-between;
			.btn {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 45%;
				margin-top: 20rpx;
				padding: 20rpx 30rpx;
				border-radius: 50rpx;
				color: #fff;
				background-image: linear-gradient(45deg, #2979ff 50%, #609cff);
				&.warning {
					background-image: linear-gradient(45deg, #2979ff 50%, #609cff);
				}
				&.max {
					width: 100%;
				}
				.iconxy {
					margin-right: 10rpx;
				}
			}
		}
	}
}

.redeemBox {
	padding: 20rpx;
	.title {
		padding: 20rpx 0 40rpx 0;
		text-align: center;
		font-size: 32rpx;
		font-weight: bold;
		color: #2979ff;
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
				background-image: linear-gradient(to top, #2979ff 50%, #ffb199 100%);
				color: #fff;
				.iconxy {
					margin-right: 10rpx;
					font-size: 40rpx;
					font-weight: normal;
				}
			}
		}
	}
}
</style>
