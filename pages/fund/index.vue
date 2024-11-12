<template>
	<view class="ibg">
		<uni-nav-bar class="uniNavBar" :border="false" color="#fff" backgroundColor="#ffffff00" left-icon="left" @clickLeft="$tab.navigateBack" />
		<view class="head">
			<view class="site">
				储蓄国债来了!
			</view>
			<view class="title">
				2024年第二期、第三期储蓄国债(凭证式)
			</view>
			<view class="br">
				<view class="line"></view>
				<span>正式发行</span>
				<view class="line"></view>
			</view>
			<view class="items">
				<view class="item">
					<view class="iconxy iconxy-zhonglei"></view>
					<view class="txt">
						<view>国务监管</view>
						<view>合作战略</view>
					</view>
				</view>
				<view class="item">
					<view class="iconxy iconxy--shuju-jingzhun"></view>
					<view class="txt">
						<view>助资扶贫</view>
						<view>收益国债</view>
					</view>
				</view>
				<view class="item">
					<view class="iconxy iconxy-bangdanbodongfenxi"></view>
					<view class="txt">
						<view>推动市场</view>
						<view>持久分红</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="list">
			
			<view v-for="item in dataList" :key="item.id" class="item">
				<view class="title">{{ item.name }}</view>
				<view class="tags">
					<view class="tag">国有背景</view>
					<view class="tag">利国利民</view>
					<view class="tag">持久稳定</view>
					<view class="tag">长期收益</view>
				</view>
				<view class="number">
					<view class="col">
						<view class="count">
							<u--text mode="price" size="50rpx" color="#db0003" bold :text="item.cashback || 0" />
						</view>
						<view class="name">预计每日收益</view>
					</view>
					<view class="col">
						<view class="count">{{ item.quantity }}亿</view>
						<view class="name">发行额度</view>
					</view>
					<view class="col">
<!--						<view class="count">{{ item.subsidy }}枚</view>-->
						<view class="count" style="font-weight: normal;font-size: 35rpx;margin-bottom: 8rpx;padding-top: 20rpx;">2024-10-01</view>
						<view class="name" >发行时间</view>
					</view>
				</view>
				<view class="btn" @click="doPay(item)">
					<view class="iconxy iconxy-mairu"></view>
					<view class="txt">立即持有</view>
					<view class="tips">持有30天可无偿赎回资金</view>
				</view>
				<view class="days">最长可持有<text style="color:#db0003">720</text>天</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import { bondList } from '@/api/bond/bond.js'
	
	export default {
		data() {
			return {
				dataList: []
			}
		},
		onReady() {
			this.getBondList()
		},
		methods: {
			doPay(row) {
				this.$refs.uToast.loading('加载中...')
				
				const payParams = {
					id: row.id,
					money: row.money,
					busiType: 0,
					actionName: '财富马上到',
					title: '买入' + row.name,
					moneyLable: '投资金额',
					fee: '基金买入'
				}
				this.$tab.navTo(`/pages/common/defray?info=${JSON.stringify(payParams)}`)
			},
			getBondList() {
				this.$refs.uToast.loading('加载中...')
				
				bondList().then(res => {
					this.dataList = res.data
					
					this.$refs.uToast.hide()
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.ibg {
	min-height: 100vh;
	background: url('/static/images/common/bg2.png') top center no-repeat;
	background-size: 100% 90%;
}
.head {
	color: #ffe6c7;
	text-align: center;
	font-weight: bold;
	.site {
		font-size: 60rpx;
		text-shadow: 0 0 20rpx #500008;
	}
	.title {
		margin: 20rpx 0 0rpx 0;
		font-size: 40rpx;
		text-shadow: 0 0 20rpx #500008;
	}
	.br{
		width:90%;margin:30rpx auto;
		display:flex;
		flex-direction: row;
		align-items: center;
		span{
			width:30%;white-space: nowrap;
			font-size: 40rpx;
		}
		.line{
			width:35%;height:0px;
			border-bottom:2px solid #ffd79dad;
		}
	}
	.items {
		display: flex;
		align-items: center;
		justify-content: space-around;
		.item {
			display: flex;
			align-items: center;
			padding: 15rpx 20rpx 15rpx 15rpx;
			background: url('/static/images/common/fund1_2.png') center no-repeat;
			background-size: 100% 100%;
			color: #fff;
		}
		.iconxy {
			font-size: 50rpx;
		}
		.txt {
			margin-left: 15rpx;
			font-size: 24rpx;
			view {
				margin: 5rpx 0;
			}
		}
	}
}
.list {
	margin-top: 40rpx;
	.item {
		position: relative;
		margin: 20rpx;
		padding: 20rpx;
		border-radius: 20rpx;
		border: 1px solid #fff;
		background-image: linear-gradient(to bottom, #ffc6cf 0, #fff 200rpx);
	}
	.title {
		margin: 20rpx 0;
		text-align: center;
		font-size: 34rpx;
		font-weight: bold;
		color: #500008;
	}
	.tags {
		display: flex;
		align-items: center;
		justify-content: center;
		.tag {
			margin: 0 10rpx;
			padding: 5rpx 10rpx;
			border-radius: 10rpx;
			background: #ffc3cd;
			color: #e83e00;
		}
	}
	.number {
		display: flex;
		align-items: center;
		justify-content: space-around;
		margin: 20rpx 0;
		&>view {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
		}
		.name {
			color: #666;
		}
		.count {
			font-size: 50rpx;
			font-weight: bold;
		}
	}
	
	.btn {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 40rpx 30rpx 20rpx 30rpx;
		padding: 25rpx 0;
		text-align: center;
		border-radius: 30rpx;
		font-weight: bold;
		font-size: 30rpx;
		background-image: linear-gradient(to top, #db0003 50%, #ffb199 100%);
		color: #fff;
		.iconxy {
			margin-right: 10rpx;
			font-size: 40rpx;
		}
		.tips {
			position: absolute;
			right: -30rpx;
			top: -30rpx;
			padding: 5rpx 15rpx;
			border-radius: 30rpx 30rpx 30rpx 0;
			border: 1px solid #fff;
			background: $u-warning-disabled;
			color: #db0003;
		}
	}
	.days {
		padding: 10rpx 0;
		border-radius: 10rpx;
		text-align: center;
		background-image: linear-gradient(to right, #fff0f3 0, #ffffff 100%);
		color: #666;
	}
}
</style>
