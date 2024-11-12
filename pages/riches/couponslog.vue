<template>
	<view class="ibg">
		<z-paging ref="paging" v-model="dataList" @query="queryList" hide-no-more-inside>
			<view slot="top">
				<uni-nav-bar class="uniNavBar" title="代金券提现明细" :border="false" color="#000" backgroundColor="#ffffff00" left-icon="left" @clickLeft="$tab.navigateBack" />
			</view>
			
			<view class="list">
				<view v-for="item in dataList" :key="item.id" class="item">
					<view class="left">
						<view class="icon">
							<image src="/static/images/user/sr.png" mode="widthFix" />
						</view>
						<view class="info">
							<view class="title">代金券提现</view>
							<view class="ctime">{{ item.createTime }}</view>
						</view>
					</view>
					<view class="right">
						<view class="afterMoney">
							{{ item.money }}万
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
	import { withdrawRecord } from '@/api/mine/withdraw.js'
	
	export default {
		data() {
			return {
				dataList: []
			}
		},
		// onLoad(e) {
		// },
		methods: {
			async queryList(pageNo, pageSize) {
				this.$refs.uToast.loading('加载中...')
				
				// const params = {
				// 	pageNum: pageNo,
				// 	pageSize: pageSize,
				// 	type: 8
				// }
				
				const res = await withdrawRecord(100)
				const list = res.data
				
				this.$refs.uToast.hide()
				
				this.$refs.paging.complete(list)
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
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 20rpx;
		padding: 20rpx;
		border-radius: 16rpx;
		background: #fff;
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
				font-size: 40rpx;
				font-weight: bold;
				text-align: center;
				color: $pbc;
			}
		}
	}
}
</style>
