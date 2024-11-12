<template>
	<view class="ibg">
		<z-paging ref="paging" v-model="dataList" hide-no-more-inside @query="queryList">
			<view slot="top">
				<uni-nav-bar class="uniNavBar" title="我的汽车" :border="false" color="#000" backgroundColor="#ffffff00" left-icon="left"
					@clickLeft="$tab.navigateBack()" />
				<view class="head">
					<view class="teamMoney">
						<view class="name">
							汽车总数
						</view>
						<view class="num">
							<u-count-to :endVal="dataList.length" autoplay :decimals="0" color="#fff" />
							<text style="padding-left: 10rpx;">台</text>
						</view>
					</view>
					<view class="taked">
						<view class="name">
							手续未办理
						</view>
						<view class="num">
							<u-count-to :endVal="flterNum" autoplay :decimals="0" color="#fff" />
							<text style="padding-left: 10rpx;">台</text>
						</view>
					</view>
				</view>
			</view>
			
			<view class="list">
				
				<view v-for="item in dataList" :key="item.id" class="item">
					<view class="pic">
						<image :src="item.cover" mode="widthFix" />
					</view>
					<view class="info">
						<view class="title">{{ item.title }}</view>
						<view class="flex flex-bt">
							<view class="taxMoney">
								市场价: <u--text type="error" size="32rpx" bold :text="item.taxMoney + '万'" />
							</view>
							<view v-if="item.status >= 2" class="plateNumber" :class="{ 'blue': item.plateNumber.length === 7 }">
								<view class="plateNumberBox">
									{{ item.plateNumber }}
								</view>
							</view>
						</view>
					</view>					

					<view class="ft">
						<u-tag v-if="item.status === 0" :text="item.statusDesc" plain plainFill />
						<u-tag v-if="item.status === 2" :text="item.statusDesc" plain plainFill />
						<u-tag v-if="item.status === 1 || item.status === 3 || item.status === 4 || item.status === 5" type="warning" :text="item.statusDesc" plain plainFill />
						<u-tag v-if="item.status === 6" :text="item.statusDesc" plain plainFill />
						<u-tag v-if="item.status === 7" type="success" :text="item.statusDesc" plain plainFill />
						
						<view v-if="item.status === 1" class="btn" @click="toPay(item, 38, 700)">
							<view class="iconxy iconxy-chezhongxinweishangpai"></view>
							<view class="txt">手续办理</view>
						</view>
						
						<view v-if="item.status === 3" class="btns">
							<view class="btn takeBtn" @click="onTakeCar(item)">
								<view class="iconxy iconxy-daitiche"></view>
								<view class="txt">自行提车</view>
							</view>
							<view class="btn" @click="onShowAdr(item)">
								<view class="iconxy iconxy-weituoyunshuguanli"></view>
								<view class="txt">板车托运到家</view>
							</view>
						</view>
					</view>
				</view>
				
			</view>
			
			<view slot="empty">
				<u-empty icon="/static/images/common/empty1.png" text="暂无数据" />
			</view>
		</z-paging>
		
		<u-modal :show="showAdr"
			title="请确认收货地址" 
			showCancelButton 
			asyncClose
			confirmColor="#db0003" 
			@cancel="cancelAdr" 
			@confirm="confirmAdr"
		>
			<view class="adrBox">
				<view class="row">
					<view class="username">
						<view class="name">收货人:</view>
						<view class="value">
							{{ adr.name }}
						</view>
					</view>
					<view class="phone">
						( {{ adr.phone }} )
					</view>
				</view>
				<view class="adrs">
					{{ adr.provinceCityRegion + ' ' + adr.address  }}
				</view>
			</view>
		</u-modal>
		
		<u-modal :show="takeModal"
			title="请带齐身份证等相关证件"
			confirmColor="#db0003"
			@confirm="takeModal = false"
		>
			<view v-if="takeType" class="takeCar">
				提车地址: 上海临港梅赛德斯-奔驰制造工厂
			</view>
			<view v-else class="takeCar">
				提车地址: 吉林省长春市长春高新技术产业开发区蔚山路4888号
			</view>
		</u-modal>
		
	</view>
</template>

<script>
	import { myCars } from '@/api/index.js'
	
	export default {
		computed: {
			flterNum() {
				let sum = 0
				this.dataList.forEach(item => {
					if (item.status < 2) {
						sum ++
					}
				})
				
				return sum
			}
		},
		data() {
			return {
				dataList: [],
				showAdr: false,
				onRow: {},
				takeModal: false,
				takeType: true
			}
		},
		onLoad() {},
		methods: {
			onTakeCar(row) {
				if (this.$u.test.contains(row.title, '奔驰')) {
					this.takeType = true
				} else {
					this.takeType = false
				}
				
				this.takeModal = true
			},
			confirmAdr() {
				this.showAdr = false
				this.toPay(this.onRow, 40, 500)
			},
			cancelAdr() {
				this.showAdr = false
				this.onRow = {}
			},
			onShowAdr(row) {
				this.onRow = row
				this.showAdr = true
			},
			toPay(row, type, money) {
				this.$refs.uToast.loading('加载中...')
				
				let title = ''
				let fee = ''
				let fee2 = ''
				if (type === 38) {
					title = '汽车手续办理'
					fee = '上牌费 200元'
					fee2 = '整车保险（三者200万）   500元'
				}
				if (type === 40) {
					title = '汽车拖运'
					fee = '汽车拖运费'
				}
				
				let payParams = {
					id: row.id,
					money: money,
					busiType: type,
					actionName: row.title,
					title: title,
					fee: fee
				}
				
				if (type === 38) {
					payParams.fee2 = fee2
				}
				
				this.$tab.navTo(`/pages/common/defray?info=${JSON.stringify(payParams)}`)
			},
			async queryList(pageNo, pageSize) {
				this.$refs.uToast.loading('加载中...')
				
				const params = {
					pageNum: pageNo,
					pageSize: pageSize
				}
				
				const res = await myCars(params)
			
				this.$refs.uToast.hide()
			
				const list = res.data
				this.$refs.paging.complete(list)
			}
		}
	}
</script>

<style lang="scss" scoped>
.ibg {
	min-height: 100vh;
	background: url('/static/images/common/bg.png') top right no-repeat;
	background-size: cover;
}
.uniNavBar {
	::v-deep {
		.uni-nav-bar-text {
			font-size: 32rpx;
			// font-weight: bold;
			// text-shadow: 0 0 5px $pbc;
		}
	}
}
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
		padding: 20rpx;
		border-radius: 16rpx;
		background: #fff;
		.pic {
			image {
				display: block;
				width: 100%;
				border-radius: 10rpx;
			}
		}
		.info {
			// display: flex;
			// align-items: center;
			// justify-content: space-between;
			// margin: 15rpx 0;
			.title {
				margin: 15rpx 0;
				font-size: 32rpx;
				font-weight: bold;
			}
			.taxMoney {
				display: flex;
				align-items: center;
			}
			
			.plateNumber {
				border-radius: 4rpx;
				background-image: linear-gradient(to top, #3ee75f 0%, #e9e9e9 100%);
				.plateNumberBox {
					margin: 4rpx;
					padding: 6rpx;
					border-radius: 4rpx;
					border: 1rpx solid #000;
					font-weight: bold;
				}
				&.blue {
					background: #0b67fc;
					color: #ffffff;
					.plateNumberBox {
						border: 1rpx solid #ffffff;
					}
				}
			}
		}
		
		.tags {
			display: flex;
			align-items: center;
			margin: 10rpx 0;
			.tag {
				margin-right: 10rpx;
				padding: 6rpx 10rpx;
				font-size: 24rpx;
				border-radius: 5px;
				border: 1px solid #ffc3cd;
				color: #e83e00;
			}
		}
	}
	.ft {
		margin-top: 20rpx;
		::v-deep {
			.u-tag {
				justify-content: center;
			}
		}
	}
	.btn {
		margin-top: 20rpx;
		padding: 15rpx 30rpx;
		text-align: center;
		border-radius: 20rpx;
		font-weight: bold;
		font-size: 30rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background-image: linear-gradient(to top, #2196f3 50%, #64b5f6 100%);
		color: #fff;
		.iconxy {
			margin-right: 10rpx;
			font-size: 40rpx;
		}
	}
	.btns {
		display: flex;
		align-items: center;
		justify-content: space-between;
		.btn {
			width: 48%;
			&.takeBtn {
				background-image: linear-gradient(to top, #2196f3 50%, #64b5f6 100%);
			}
		}
	}
}

.adrBox {
	width: 100%;
	.row {
		display: flex;
		align-items: center;
		// justify-content: space-between;
		margin-bottom: 20rpx;
		font-size: 32rpx;
		.username {
			display: flex;
			align-items: center;
			.value {
				margin-left: 10rpx;
			}
		}
		.phone {
			margin-left: 20rpx;
			font-weight: bold;
		}
	}
}
</style>
