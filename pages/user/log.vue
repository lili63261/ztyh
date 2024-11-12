<template>
	<view class="ibg">
		<z-paging ref="paging" v-model="dataList" @query="queryList" hide-no-more-inside>
			<view slot="top">
				<uni-nav-bar class="uniNavBar" :title="typeName + '明细'" :border="false" color="#000" backgroundColor="#ffffff00" left-icon="left" @clickLeft="$tab.navigateBack" />
			</view>
			
			<view class="list">
				<view v-for="item in dataList" :key="item.id" class="item">
					<view class="itemBox">
						<view class="left">
<!--							<view class="icon">-->
<!--								<image v-if="item.dp === '+'" src="/static/images/user/zc.png" mode="widthFix" />-->
<!--								<image v-else src="/static/images/user/sr.png" mode="widthFix" />-->
<!--							</view>-->
              <view class="iconxy iconxy-shouru icon-primary-large"></view>
							<view class="info">
								<view class="title">{{ item.title }}</view>
								<view class="ctime">{{ item.createTime }}</view>
							</view>
						</view>
						<view class="right">
							<view class="afterMoney">
								{{ type === 'subsidy' ? item.afterMoney : $u.priceFormat(item.afterMoney, 2) }}
								<text v-if="type === 'provident'">万</text>
							</view>
							<view class="flex">
								<u--text align="right" size="30rpx" :type="item.dp === '+' ? 'error' : 'warning'" :text="item.dp + item.money"></u--text>
								<text v-if="type === 'provident'" :style="item.dp === '+' ? 'color: #f56c6c;' : 'color: #f9ae3d;'">万</text>
							</view>
						</view>
					</view>
					<view v-if="type === 'subsidy'" class="mid">
						<view v-if="$u.test.contains(item.title, '线上')" class="subsidySp">
							<!-- <view class="iconxy iconxy-jifenduihuan"></view> -->
							<view class="name">结兑银行卡:</view>
							<view class="value">{{ acc.bankName }}-{{ acc.bankNo }}</view>
						</view>
						<view v-if="$u.test.contains(item.title, '线下')" class="subsidySp">
							<view class="name">快递订单号:</view>
							<view class="value">{{ item.createTime | ctTracking }}</view>
							
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
	import { generateTrackingNumber } from '@/utils/common.js'
	import { accountLog } from '@/api/mine/cashback.js'
	
	export default {
		filters: {
			ctTracking(val) {
				return 'SF' + generateTrackingNumber(val)
			}
		},
		data() {
			return {
				type: '',
				typeName: '',
				dataList: []
			}
		},
		onLoad(e) {
			const { type } = e
			switch(type) {
				case 'subsidy':
					this.typeName = '五行币'
				break
				case 'provident':
					this.typeName = '生活保障金'
				break
				case 'cashback':
					this.typeName = '国债收益'
				break
				case 'deposit':
					this.typeName = '生活补助金'
				break
				default:
					this.typeName = '团队佣金'
			}
			
			this.type = type || 'teamAward'
			
			// console.log(generateTrackingNumber('2024-09-22 09:16:23'))
		},
		methods: {
			async queryList(pageNo, pageSize) {
				this.$refs.uToast.loading('加载中...')
				
				const params = {
					pageNum: pageNo,
					pageSize: pageSize,
					type: this.type
				}
				
				const res = await accountLog(params)
				const list = res.data.list
				const total = res.data.total || 0
				
				this.$refs.uToast.hide()
				
				this.$refs.paging.completeByTotal(list, total)
			},
			doCopy(txt) {
				const ntxt = 'SF' + generateTrackingNumber(txt)
				uni.setClipboardData({
					data: ntxt,
					showToast: false,
					success: () => {
						this.$refs.uToast.success('复制成功')
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.ibg {
	min-height: 100vh;
	background: url('/static/images/common/bg.png') top center no-repeat;
	background-size: 100% 50%;
}
.list {
	margin: 0 20rpx;
	.item {
		margin-top: 10rpx;
		padding: 20rpx;
		border-radius: 16rpx;
		background: #fff;
		.itemBox {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		
		.left {
			display: flex;
			align-items: center;
			.icon {
				width: 100rpx;
				image {
					display: block;
					width: 100%;
				}
			}
			.info {
				margin-left: 20rpx;
				.title {
					margin-bottom: 20rpx;
					font-size: 32rpx;
					font-weight: bold;
				}
				.ctime {
					color: #666;
				}
			}
		}
		.right {
			.afterMoney {
				margin-bottom: 10rpx;
				font-size: 32rpx;
				font-weight: bold;
				text-align: center;
			}
		}
	}
	.subsidySp {
		display: flex;
		align-items: center;
		margin-top: 20rpx;
		padding-top: 20rpx;
		border-top: 1px solid #efefef;
		// padding: 6rpx 15rpx;
		// border-radius: 6rpx;
		// border: 1px solid #f56c6c;
		// background-color: #fef0f0;
		// color: #f56c6c;
		.iconxy {
			margin-right: 10rpx;
		}
		.value {
			padding-left: 10rpx;
		}
		&.xia {
			justify-content: space-between;
			.right {
				display: flex;
				align-items: center;
				padding: 6rpx 15rpx;
				border-radius: 6rpx;
				border: 1px solid #f56c6c;
				background-color: #fef0f0;
				color: #f56c6c;
			}
		}
	}
}
.icon-primary-large{
  font-size: 70rpx;
  color:#2979ff;
}
</style>
