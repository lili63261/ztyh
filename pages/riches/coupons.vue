<template>
	<view>
		<z-paging ref="paging" v-model="dataList" hide-no-more-inside @query="queryList">
			<view slot="top">
				<uni-nav-bar class="uniNavBar" title="我的代金券" :border="false" backgroundColor="#ffffff00" left-icon="left"
					@clickLeft="$tab.navigateBack()" />
				
				<view class="pagHhead">
					<view class="teamMoney">
						<view class="name">代金券总额 (元)</view>
						<view class="num">
							<u-count-to :endVal="totalMoney / 10000" autoplay :decimals="0" color="#fff" />
							<text v-if="totalMoney > 0" style="padding-left: 10rpx;">万</text>
						</view>
					</view>
					<view class="other">
						<view class="taked">
							<view class="name">可提现现金 (元)</view>
							<view class="num">
								<u-count-to :endVal="takeMoney / 10000" autoplay :decimals="0" color="#fff" />
								<text v-if="takeMoney > 0" style="padding-left: 10rpx;">万</text>
							</view>
						</view>
						<view class="btn" @click="$tab.navTo('/pages/riches/couponstake')">
							<view class="iconxy iconxy-tixianjilu"></view>
							<view>提现</view>
						</view>
					</view>
				</view>
				
			</view>
			
			<view class="list">
				
				<view v-for="item in dataList" :key="item.id" class="item">
					<view class="head">
						<view class="title">{{ item.name }}</view>
						<view class="orderNo">{{ item.orderNo }}</view>
					</view>
					<view class="pic">
						<image :src="item.cover" mode="widthFix" />
						<view class="originalMoney">{{ item.originalMoney / 10000 }}</view>
					</view>
					<view class="status">
						<u-tag v-if="item.status === 0" :text="item.statusDesc" type="warning" plain plainFill />
						<u-tag v-if="item.status === 1" :text="item.statusDesc" plain plainFill />
						<u-tag v-if="item.status === 2" :text="item.statusDesc" type="warning" plain plainFill />
						<u-tag v-if="item.status === 3" :text="item.statusDesc" type="success" plain plainFill />
					</view>
					<view class="foot">
						<view class="ctime">获取时间: {{ item.createTime }}</view>
						<view v-if="item.status === 1" class="btn" @click="doPay(item)">
							<view class="iconxy iconxy-jifenduihuan"></view>
							<view>兑换现金</view>
						</view>
					</view>
				</view>
				
			</view>
		
			<view slot="empty">
				<u-empty icon="/static/images/common/empty1.png" text="暂无数据" />
			</view>
		</z-paging>
	</view>
</template>

<script>
	import { userCoupons } from '@/api/bankCard/bankCard.js'
	import { totalByType }  from '@/api/mine/withdraw.js'
	
	export default {
		computed: {
			totalMoney() {
				let sum = 0
				this.dataList.forEach(item => {
					sum += parseFloat(item.originalMoney || 0)
				})
				
				return sum
			},
			takeMoney() {
				let sum = 0
				this.dataList.forEach(item => {
					if (item.status === 2) {
						sum += parseFloat(item.originalMoney || 0)
					}
				})
				
				return sum - this.takedMoney
			}
		},
		data() {
			return {
				takedMoney: 0,
				dataList: []
			}
		},
		onShow() {
			this.getTakedMoney()
		},
		methods: {
			doPay(row) {
				this.$refs.uToast.loading('加载中...')
				
				const payParams = {
					id: row.id,
					money: 300,
					busiType: 46,
					title: row.name || '代金券' + ' 兑换现金',
					fee: '系统兑换服务费'
				}
				this.$tab.navTo(`/pages/common/defray?info=${JSON.stringify(payParams)}`)
			},
			getTakedMoney() {
				totalByType(100).then(res => {
					this.takedMoney = res.data * 10000
				})
			},
			async queryList(pageNo, pageSize) {
				this.$refs.uToast.loading('加载中...')
				
				const params = {
					pageNum: pageNo,
					pageSize: pageSize
				}
				
				const res = await userCoupons(params)
				
				this.$refs.uToast.hide()
				
				const list = res.data
				this.$refs.paging.complete(list)
			}
		}
	}
</script>

<style lang="scss" scoped>

.pagHhead {
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
		margin-bottom: 20rpx;
		padding: 20rpx 0;
		border-radius: 16rpx;
		background: #fff;
		.head{
			 display: flex;
			 align-items: center;
			 justify-content: space-between;
			 margin-bottom: 20rpx;
			 padding: 0 20rpx 20rpx 20rpx;
			 border-bottom: 1px solid #efefef;
			.title {
				 font-size: 32rpx;
				 font-weight: bold;
				 color: #ffcc6d;
				 text-shadow: 1px 1px 1px #6f4b00;
			}
			.orderNo {
				color: #666;
			}
		}
		.pic {
			position: relative;
			padding: 0 20rpx;
			image {
				display: block;
				width: 100%;
				border-radius: 16rpx;
			}
			.originalMoney {
				position: absolute;
				top: calc(50% - 40rpx);
				left: 52%;
				width: 80rpx;
				font-size: 70rpx;
				font-weight: bold;
				text-align: center;
				color: #f7d493;
				text-shadow: 1px 1px 2px #a0311a;
			}
		}
		.status {
			margin: 20rpx;
			::v-deep {
				.u-tag {
					justify-content: center;
				}
			}
		}
		.foot {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 20rpx;
			padding: 20rpx 20rpx 0 20rpx;
			border-top: 1px solid #efefef;
			.ctime {
				color: #666;
			}
			.btn {
				padding: 15rpx 30rpx;
				text-align: center;
				border-radius: 20rpx;
				font-weight: bold;
				font-size: 30rpx;
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
}
</style>
