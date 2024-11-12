<template>
	<view class="ibg">
		<uni-nav-bar class="uniNavBar" title="我的五行币" :border="false" backgroundColor="#ffffff00" left-icon="left" @clickLeft="$tab.navigateBack" />
		
		<view class="head">
			<view class="teamMoney">
				<view class="name">
					我的五行币 (枚)
				</view>
				<view class="num">
					<u-count-to :endVal="num" autoplay :decimals="0" color="#fff" />
				</view>
			</view>
			<view class="other">
				<view class="taked">
					<view class="name">
						总价值 (元)
					</view>
					<view class="num">
						<u-count-to :endVal="totalMoney" autoplay :decimals="2" color="#fff" />
						<text style="padding-left: 10rpx;">万</text>
					</view>
				</view>
				<view class="btn" @click="$tab.navTo('/pages/user/log?type=subsidy')">
					<view class="iconxy iconxy-yundanmingxitongji" style="color:#5489e4"></view>
					<view style="color:#5489e4 ">明细</view>
				</view>
			</view>
		</view>
		
		<!-- 正式 -->
		<!-- #ifdef !IS-PORD -->
		<view class="mainBtns">
			<view class="btn" @click="onNum(0)">
				<view class="iconxy iconxy-jifenduihuan"></view>
				<view>线上结兑</view>
			</view>
			<view class="btn" @click="onNum(1)">
				<view class="iconxy iconxy-youji"></view>
				<view>线下邮寄</view>
			</view>
		</view>
		<!-- #endif -->
		
		<view class="echart">
			<view class="title">
				<view>实时走势图</view>
				<view class="price">（ 目前最新价值：<u--text :text="price" bold color="#db0003" />万元 ）</view>
			</view>
			<view>
				<view style="height: 550rpx;">
					<echarts-uniapp ref="echarts" :option="option" canvasId="echarts" />
				</view>
				<view class="itable">
					<view class="hd">
						<view class="data">更新日期</view>
						<view class="money">价值</view>
					</view>
					<view class="bd">
						<view v-for="(item, index) in list" :key="index" class="item">
							<view class="data">{{ item.date }}</view>
							<view v-if="item.line === 'down'" class="money down">
								<view class="num">{{ item.money + '万' }}</view>
								<view class="iconxy iconxy-arrdown"></view>
							</view>
							<view v-if="item.line === 'up'" class="money up">
								<view class="num">{{ item.money + '万' }}</view>
								<view class="iconxy iconxy-up1"></view>
							</view>
							<view v-if="item.line === 'none' || !item.line" class="money none">
								<view class="num">{{ item.money + '万' }}</view>
								<view class="iconxy iconxy-ai36"></view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<u-popup :show="showStepNum" round="16rpx">
			<view class="stepNumBox">
				<view class="title">请设置{{ eType === 0 ? '兑换' : '邮寄' }}五行币数量</view>
				<view class="stepNum">
					<u-number-box v-model="eNum" :min="1" :max="maxNum" button-size="100rpx" bg-color="#2979ff" color="#fff" iconStyle="color: #fff" :disablePlus="isDisablePlus" integer disabledInput @overlimit="onLimit" />
				</view>
				<view class="eMoney">
					<text>价值: </text>
					<u--text mode="price" size="32rpx" :text="eMoney" />万元
				</view>
				<view class="btns">
					<view  class="btn cancel" @click="cancelStepNum()">取消</view>
					<view class="btn confirm" @click="confirmStepNum()">
						<view class="iconxy iconxy-Icon-shenqinghuizhen"></view>
						<view>确定</view>
					</view>
				</view>
			</view>
		</u-popup>
		
		<u-modal :show="showBank"
			title="请确认银行卡信息" 
			showCancelButton 
			asyncClose
			confirmColor="#2979ff"
			@cancel="showBank = false" 
			@confirm="confirmBank"
		>
			<view class="bankBox">
				<view class="item">
					<view class="name">开户人姓名:</view>
					<view class="value">{{ acc.name }}</view>
				</view>
				<view class="item">
					<view class="name">手 机&nbsp;&nbsp;号 码:</view>
					<view class="value">{{ adr.phone }}</view>
				</view>
				<view class="item">
					<view class="name">开&nbsp;&nbsp;&nbsp;户&nbsp;&nbsp;&nbsp;&nbsp;行:</view>
					<view class="value">{{ acc.bankName }}</view>
				</view>
				<view class="item">
					<view class="name">银 行&nbsp;&nbsp;卡 号:</view>
					<view class="value">{{ acc.bankNo }}</view>
				</view>
			</view>
		</u-modal>
		
		<u-modal :show="showAdr" 
			title="请确认收货地址" 
			showCancelButton 
			asyncClose
			confirmColor="#2979ff"
			@cancel="showAdr = false" 
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
	</view>
</template>

<script>
import { total } from '@/api/system/user.js'
import { getKline } from '@/api/bond/bond.js'

export default {
	computed: {
		totalMoney() {
			return this.num * this.price
		},
		eMoney() {
			return this.eNum * this.price
		}
	},
	data() {
		return {
			list: [],
			option: {},
			num: 0,
			price: 0,
			showStepNum: false,
			maxNum: 10,
			isDisablePlus: false,
			eType: 0,
			eNum: 1,
			showAdr: false,
			showBank: false
		}
	},
	onShow() {
		this.$nextTick(() => {
			this.getTotal()
			this.getKline()
		})
	},
	methods: {
		confirmStepNum() {
			this.showStepNum = false
			if (this.eType === 0) {
				this.onBank()
			} else {
				this.onAdr()
			}
		},
		cancelStepNum() {
			this.showStepNum = false
			this.eType = 0
			this.eNum = 1
		},
		onLimit(type) {
			const eType = this.eType === 0 ? '兑换' : '邮寄'
			if (type === 'minus') {
				return this.$refs.uToast.warning('最少可' + eType + this.eNum + '枚五行币')
			}
			if (type === 'plus') {
				return this.$refs.uToast.warning('最多可' + eType + this.eNum + '枚五行币')
			}
		},
		onNum(type) {
			if (this.num <= 0) {
				return this.$refs.uToast.warning('当前账户暂无五行币可兑换')
			}
			
			this.eType = type
			this.showStepNum = true
		},
		confirmAdr() {
			this.$refs.uToast.loading('加载中...')
			this.showAdr = false
			
			const payParams = {
				busiParam: this.eNum,
				money: this.eNum * 300,
				busiType: 100,
				title: '五行币邮寄',
				fee: '贵重物品保价费'
			}
			this.$tab.navTo(`/pages/common/defray?info=${JSON.stringify(payParams)}`)
		},
		confirmBank() {
			this.$refs.uToast.loading('加载中...')
			this.showBank = false
			
			const payParams = {
				busiParam: this.eNum,
				money: this.eNum * 300,
				busiType: 101,
				title: '五行币兑换',
				fee: '线上结兑手续费'
			}
			this.$tab.navTo(`/pages/common/defray?info=${JSON.stringify(payParams)}`)
		},
		onAdr() {
			this.showAdr = true
		},
		onBank() {
			this.showBank = true
		},
		getTotal() {
			total().then((res) => {
				this.num = res.data.subsidy

				if (this.num < 10) {
					this.maxNum = this.num
				}
			})
		},
		getKline() {
			this.$refs.uToast.loading()
			
			getKline().then(res => {
				this.price = parseFloat(res.data.at(-1).money)
				this.list = this.$u.deepClone(res.data)
				
				this.list.forEach((x, i) => {
					if (i > 0) {
						const previousMoney = parseFloat(this.list[i - 1].money)
						const currentMoney = parseFloat(x.money)
						
						if (currentMoney > previousMoney) {
							x.line = 'up'
						} else if (currentMoney < previousMoney) {
							x.line = 'down'
						} else {
							x.line = 'none'
						}
					}
				})
				
				this.list = this.list.reverse()
				
				let uData = this.$u.deepClone(res.data)
				this.initKline(uData)
			})
		},
		initKline(data) {
			const yData = data.map(item => parseFloat(item.money))
			const xData = data.map(item => item.date)
			const option = {
				xAxis: {
					type: 'category',
					data: xData,
					boundaryGap: false,
				},
				yAxis: {
					type: 'value',
					axisLine: {
						show: true
					},
					min: 28, // 设置 Y 轴最小值
					interval: 0.6, // 设置 Y 轴间隔为小数
					data: yData,
				},
				series: [{
					type: 'line',
					smooth: true,
					itemStyle: { color: '#2979ff' },
					areaStyle: {
						color: {
							type: 'linear',
							x: 0,
							y: 0,
							x2: 0,
							y2: 1,
							colorStops: [
								{ offset: 0, color: '#4a88f6' },
								{ offset: 1, color: '#cee0fb' },
							],
							global: false
						}
					},
					data: data.map(item => [item.date, item.money])
				}]
			}

			this.option = option
			this.$refs.uToast.hide()
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
		text-align: center;
		.num {
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
			border-radius: 20rpx;
			background-color: white;
			.iconxy {
				margin-right: 10rpx;
			}
		}
	}
}
.mainBtns {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 20rpx;
	.btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 45%;
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
}
.echart {
	margin: 20rpx;
	padding: 20rpx;
	border-radius: 16rpx;
	background: #fff;
	.title {
		display: flex;
		align-items: center;
		font-size: 32rpx;
		font-weight: bold;
		.price {
			display: flex;
			align-items: center;
			font-weight: normal;
			font-size: 28rpx;
		}
	}
}

::v-deep {
	.u-modal {
		width: 96vw !important;
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
.bankBox {
	width: 100%;
	.item {
		display: flex;
		align-content: center;
		padding: 20rpx 0;
		font-size: 30rpx;
		.name {
			padding-right: 20rpx;
			color: #666;
		}
	}
}
.stepNumBox {
	padding: 20rpx;
	.title {
		padding: 0 20rpx 0 0;
		text-align: center;
		font-size: 32rpx;
		font-weight: bold;
	}
	.stepNum {
		display: flex;
		justify-content: center;
		padding: 40rpx 0;
		::v-deep {
			.u-number-box__plus, .u-number-box__minus {
				width: 100rpx;
        background: #2979ff !important;
			}
			.u-number-box__plus--hover, .u-number-box__minus--hover {
				background: #b8ccff !important;
			}
			.u-number-box__plus--disabled, .u-number-box__minus--disabled {
				background: #b8ccff !important;
			}
		}
	}
	.eMoney {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 40rpx;
		font-size: 32rpx;
		::v-deep {
			.u-text {
				flex: 0;
				width: auto;
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
				background-image: linear-gradient(45deg, #2979ff 50%, #609cff);
				color: #fff;
				.iconxy {
					margin-right: 10rpx;
					font-size: 40rpx;
				}
			}
		}
	}
}

.itable {
	.hd {
		display: flex;
		justify-content: space-between;
		padding: 10rpx 0;
		border-radius: 10rpx;
		border: 1px solid #5489e4;
		background: #dde7f4;
		color: #6d9be4;
		view {
			width: 50%;
			text-align: center;
			font-weight: bold;
		}
	}
	.bd {
		.item {
			display: flex;
			align-items: center;
			padding: 15rpx 0;
			border-bottom: 1px solid #efefef;
			.data {
        width: 50%;
				text-align: center;
			}
			.money {
        padding: 10rpx 20rpx 10rpx 20rpx;
        border-radius: 10rpx;
				display: flex;
				align-items: center;
				justify-content: center;
        align-content: center;
				width: auto;
        margin: auto;
				text-align: center;
        color:white;
				&.up {
					background-color: #3c9cff;
				}
				&.down {
          background-color: #f56c6c;
				}
				&.none {
          background-color: #5ac725;
				}
			}
		}
	}
}
</style>