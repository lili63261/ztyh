<template>
	<view>
		<z-paging ref="paging" v-model="dataList" hide-no-more-inside @query="queryList">
			<view slot="top">
				<uni-nav-bar class="uniNavBar" title="我的壹号财富" :border="false" backgroundColor="#ffffff00"
					left-icon="left" @clickLeft="$tab.navigateBack()" />
				
				<view class="head">
					<view class="teamMoney">
						<view class="name">
							卡片总计 (张)
						</view>
						<view class="num">
							<u-count-to :endVal="dataList.length" autoplay :decimals="0" color="#fff" />
						</view>
					</view>
					<view class="taked">
						<view class="name">
							金额总计 (元)
						</view>
						<view class="num">
							<u-count-to :endVal="totalMoney" autoplay :decimals="2" color="#fff" />
							<text style="padding-left: 10rpx;">万</text>
						</view>
					</view>
					<!-- <view class="other">
						<view class="taked">
							<view class="name">
								金额总计 (元)
							</view>
							<view class="num">
								<u-count-to :endVal="totalMoney" autoplay :decimals="2" color="#fff" />
								<text style="padding-left: 10rpx;">万</text>
							</view>
						</view>
						<view class="btn">
							<view class="iconxy iconxy-tixianjilu"></view>
							<view>提现</view>
						</view>
					</view> -->
				</view>
			</view>
		
			<view class="list">
				<view v-for="item in dataList" :key="item.id" class="item">
					<view class="box">
						<view class="pic">
							<image :src="item.cover" mode="widthFix" />
						</view>
						<view class="top">
							<view class="avatar"><view>壹号</view><view>财富</view></view>
							<view class="mid">
								<view class="name">{{ item.name }}</view>
								<view class="ctime">办卡时间: {{ item.createTime }}</view>
							</view>
							<view class="money">
								<view class="value">{{ item.quota }}万</view>
								<view class="name">可用余额</view>
							</view>
						</view>
					</view>
					<view class="ft">
						<view class="status" :class="'status' + item.status">
							{{ item.statusDesc }}
						</view>
						<view v-if="item.status === 1" class="btns">
							<view v-if="item.wx" class="btn wx" @click="onShowNotify('已绑定微信账号: ' + item.wx, 'success')">
								<view class="iconxy iconxy-weixin"></view>
								<view class="txt">已绑定微信</view>
							</view>
							<view v-else class="btn wx" @click="doBind(item, 'wx')">
								<view class="iconxy iconxy-weixin"></view>
								<view class="txt">绑定微信</view>
							</view>
							
							<view v-if="item.zfb" class="btn zfb" @click="onShowNotify('已绑定支付宝账号: ' + item.zfb, 'primary')">
								<view class="iconxy iconxy-zhifubao"></view>
								<view class="txt">已绑定支付宝</view>
							</view>
							<view v-else class="btn zfb" @click="doBind(item, 'zfb')">
								<view class="iconxy iconxy-zhifubao"></view>
								<view class="txt">绑定支付宝</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		
			<view slot="empty">
				<u-empty icon="/static/images/common/empty1.png" text="暂无数据" />
			</view>
		</z-paging>
		
		<u-popup :show="show" round="16rpx">
			<view class="popBox">
				<view class="title">绑定线上支付</view>
				<view class="main">
					<view class="item">
						<view class="label">卡片名称:</view>
						<view class="value">{{ onRow.name }}</view>
					</view>
					<view class="item">
						<view class="label">卡&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号:</view>
						<view class="value">{{ onRow.uniqueNo }}</view>
					</view>
					<view class="item">
						<view class="label">卡号面额:</view>
						<view class="value" style="color: #db0002;font-size: 32rpx;">{{ onRow.quota }}万</view>
					</view>
					<view class="item">
						<view class="label">绑定方式:</view>
						<view class="value">
							<view v-if="activeType === 'wx'" class="col wx">
								<view class="iconxy iconxy-weixin"></view>
								<view class="txt">微信</view>
							</view>
							<view v-if="activeType === 'zfb'" class="col zfb">
								<view class="iconxy iconxy-zhifubao"></view>
								<view class="txt">支付宝</view>
							</view>
							<!-- <view class="typeBox">
								<view class="col" :class="{ 'on': activeType === 'wx' }" @click="activeType = 'wx'">
									<view class="iconxy iconxy-weixin"></view>
									<view class="txt">微信</view>
								</view>
								<view class="col" :class="{ 'on': activeType === 'zfb' }" @click="activeType = 'zfb'">
									<view class="iconxy iconxy-zhifubao"></view>
									<view class="txt">支付宝</view>
								</view>
							</view> -->
						</view>
					</view>
					<view class="item ipt">
						<view class="label">{{ activeType === 'wx' ? '微信' : '支付宝' }}账号:</view>
						<view class="value">
							<u--input
								v-model="account"
								border="bottom"
								:placeholder="`请输入${activeType === 'wx' ? '微信' : '支付宝'}账号`"
							/>
						</view>
					</view>
				</view>
				<view class="btns">
					<view  class="btn cancel" @click="cancelPop()">取消</view>
					<view class="btn confirm" @click="confirmPop()">
						<view class="iconxy iconxy-a-ziyuan6"></view>
						<view>确定绑定</view>
					</view>
				</view>
			</view>
		</u-popup>
		
		<u-notify ref="uNotify" />
	</view>
</template>

<script>
	import { userBuyRecord } from '@/api/bankCard/bankCard.js'
	import { totalByType }  from '@/api/mine/withdraw.js'
	
	export default {
		computed: {
			totalMoney() {
				let sum = 0
				this.dataList.forEach(item => {
					sum += parseFloat(item.quota || 0)
				})
				
				return sum
			}
		},
		data() {
			return {
				dataList: [],
				onRow: {},
				show: false,
				activeType: '',
				account: ''
			}
		},
		methods: {
			onShowNotify(msg, type) {
				this.$refs.uNotify.show({
					type: type,
					message: msg,
					safeAreaInsetTop:true
				})
			},
			confirmPop() {
				if (this.account === '') {
					this.$refs.uToast.show({
						type: 'error',
						position: 'top',
						message: `请输入${this.activeType === 'wx' ? '微信' : '支付宝'}账号`
					})
					return false
				}
				
				this.$refs.uToast.loading('加载中...')
				
				const bData = {
					type: this.activeType,
					account: this.account
				}
				
				const payParams = {
					id: this.onRow.id,
					busiParam: JSON.stringify(bData),
					money: 299,
					busiType: this.activeType === 'wx' ? 29 : 30,
					title: this.onRow.name + '绑定线上支付',
					fee: '线上支付授权费'
				}
				this.$tab.navTo(`/pages/common/defray?info=${JSON.stringify(payParams)}`)
				
				this.show = false
				this.onRow = {}
				this.activeType = 'wx'
				this.account = ''
			},
			doBind(row, type) {
				this.onRow = row
				this.activeType = type
				this.show = true
			},
			cancelPop() {
				this.show = false
				this.onRow = {}
				this.activeType = 'wx'
				this.account = ''
			},
			async queryList(pageNo, pageSize) {
				this.$refs.uToast.loading('加载中...')
				
				const params = {
					pageNum: pageNo,
					pageSize: pageSize
				}
				
				const res = await userBuyRecord(params)
				
				this.$refs.uToast.hide()
				
				const list = res.data
				this.$refs.paging.complete(list)
			}
		}
	}
</script>

<style lang="scss" scoped>
.head {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 0 16rpx 16rpx 16rpx;
	border-radius: 16rpx;
	background: url('/static/images/common/tbg.jpg') center bottom no-repeat;
	background-size: cover;
	color: #fff;
	.teamMoney {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 40rpx;
		.num {
			text-align: center;
			margin-top: 20rpx;
			.u-count-num {
				font-size: 60rpx !important;
			}
		}
	}
	.taked {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
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
			background-image: linear-gradient(to top, #2196f3 50%, #64b5f6 100%);
			.iconxy {
				margin-right: 10rpx;
			}
		}
	}
}

.list {
	margin: 0 20rpx 20rpx 20rpx;
	.item {
		margin-top: 20rpx;
		border-radius: 16rpx;
		background: #fff;
	}
	.box {
	}
	.pic {
		// width: 100%;
		padding: 20rpx;
		border-bottom: 1px solid #efefef;
		image {
			display: block;
			width: 100%;
			border-radius: 16rpx;
		}
	}
	.top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20rpx 20rpx 0 20rpx;
		.avatar {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			width: 100rpx;
			height: 100rpx;
			margin-right: 20rpx;
			border-radius: 50%;
			background: #db0003;
			color: #ffe6c7;
			font-weight: bold;
		}
		.name {
			margin-bottom: 10rpx;
			font-size: 32rpx;
			font-weight: bold;
		}
		.ctime {
			color: #666;
		}
	}
	.mid {
		flex: 1;
	}
	.money {
		display: flex;
		flex-direction: column;
		align-items: center;
		.value {
			font-size: 46rpx;
			font-weight: bold;
			color: $pbc;
		}
		.name {
			margin-top: 10rpx;
			font-size: 28rpx;
			font-weight: normal;
			color: #666;
		}
	}
	.ft {
		// display: flex;
		// align-items: center;
		// justify-content: space-between;
		// margin-top: 20rpx;
		padding: 20rpx;
		border-top: 1px solid #efefef;
		.status {
			display: flex;
			align-items: center;
			justify-content: center;
			margin-bottom: 20rpx;
			padding: 10rpx 20rpx;
			border-radius: 10rpx;
			background-image: linear-gradient(to right, #ffc6cf 0, #ffeeee 100%);
			color: #e83e00;
			&.status0 {
				background-image: linear-gradient(to right, #fcbd71 0, #f9d5ae 100%);
				color: #f29100;
			}
			&.status1 {
				background-image: linear-gradient(to right, #a0cfff 0, #dfe5ff 100%);
				color: #2b85e4;
			}
			.iconxy {
				margin: 0 10rpx;
			}
		}
		.btns {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.btn {
				width: 45%;
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
				&.wx {
					background-image: linear-gradient(to top, #27c446 50%, #11af2f 100%);
				}
				&.zfb {
					background-image: linear-gradient(to top, #06b4fd 50%, #0086ff 100%);
				}
				.iconxy {
					margin-right: 10rpx;
					font-size: 40rpx;
					font-weight: normal;
				}
			}
		}
	}
}
.popBox {
	padding: 20rpx;
	.title {
		padding: 0 20rpx 0 0;
		text-align: center;
		font-size: 32rpx;
		font-weight: bold;
	}
	.main {
		margin: 20rpx;
		padding: 20rpx 0;
		.item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin: 30rpx 0;
			padding-bottom: 30rpx;
			border-bottom: 1px solid #efefef;
			&:last-child {
				border-bottom: 0;
				margin-bottom: 0;
				padding-bottom: 0;
			}
			&.ipt {
				.value {
					flex: 1;
					margin-left: 20rpx;
				}
			}
		}
		.label {
			color: #666;
		}
		// .typeBox {
		// 	display: flex;
		// 	align-content: center;
		// 	justify-content: space-between;
		// 	width: 500rpx;
		// 	padding: 10rpx;
		// 	border-radius: 16rpx;
		// 	background: #ffe5e5;
		// 	.col {
		// 		display: flex;
		// 		align-content: center;
		// 		justify-content: center;
		// 		width: 48%;
		// 		padding: 10rpx 20rpx;
		// 		border-radius: 10rpx;
		// 		background: #ffffff;
		// 		color: #db0002;
		// 		&.on {
		// 			background: #db0002;
		// 			color: #fff;
		// 		}
		// 		.iconxy {
		// 			margin-right: 10rpx;
		// 			font-size: 36rpx;
		// 		}
		// 	}
		// }
		.col {
			display: flex;
			align-content: center;
			justify-content: center;
			&.wx {
				color: #27c446;
			}
			&.zfb {
				color: #06b4fd;
			}
			.iconxy {
				margin-right: 10rpx;
				font-size: 36rpx;
			}
		}
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
				background-image: linear-gradient(to top, #2196f3 50%, #64b5f6 100%);
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
