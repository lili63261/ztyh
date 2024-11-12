<template>
	<view>
		<uni-nav-bar class="uniNavBar" title="提现" :border="false" backgroundColor="#ffffff00"
			left-icon="left" @clickLeft="$tab.navigateBack()" />
		<view class="head">
			<view class="teamMoney">
				<view class="name">
					可提现{{ typeName }} (元)
				</view>
				<view class="num">
					<u-count-to :endVal="activeMoney" autoplay :decimals="2" color="#fff" />
					<text v-if="type === 'provident'" style="padding-left: 10rpx;">万</text>
				</view>
			</view>
			<view class="other">
				<view class="taked">
					<view class="name">
						累计已提现 (元)
					</view>
					<view class="num">
						<u-count-to :endVal="takedMoney" autoplay :decimals="2" color="#fff" />
						<text v-if="type === 'provident'" style="padding-left: 10rpx;">万</text>
					</view>
				</view>
				<view class="btn" @click="$tab.navTo('/pages/user/log?type=' + type)">
					<view class="iconxy iconxy-yundanmingxitongji"></view>
					<view>{{ typeName }}明细</view>
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
			<view class="item" v-show="type=='deposit'">
				<view class="label" @click="tips()">
					<span class="tip iconxy iconxy-jinggao1"></span>贫困户号
				</view>
				<view class="value">
					{{ pNum }}
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
							<text style="font-size: 40rpx;">{{ type === 'provident' ? '万元' : '元' }}</text>
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
	import { total } from '@/api/system/user.js'
	import { minWithdraw, apply, totalByType, ortherApply } from '@/api/mine/withdraw.js'
	import { houseList } from "@/api/card/card.js"
	export default {
		data() {
			return {
				type: '',
				typeName: '',
				typeNum: 0,
				activeMoney: 0,
				takedMoney: 0,
				min: 0,
				placeholder: '',
				money: undefined,
				//如果是申请提现生活补助金
				pNum: '',
				isAudit:0,
			}
		},
		onLoad(e) {
			const { type,pNo } = e
			if(pNo){
				this.pNum = pNo
			}
			this.type = type
			switch(type) {
				case 'subsidy':
					this.typeName = '五行币'
					this.typeNum = 1
				break
				case 'provident':
					this.typeName = '共富基金'
					this.typeNum = 7
				break
				case 'cashback':
					this.typeName = '基金收益'
					this.typeNum = 4
				break
				case 'deposit':
					this.typeName = '生活补助金'
					this.typeNum = 8
					this.checkIsApply()
				break
				default:
					this.typeName = '团队佣金'
					this.typeNum = 5
			}
			
			this.getTakedTotal()
			this.getTotal(type)
			this.getMin()
		},
		methods: {
			tips(){
				return this.$refs.uToast.warning('建档立卡审核过后分配贫困户号！')
			},
			doTake() {
				this.$refs.uToast.loading('加载中...')
				
				if(this.type == 'deposit'  && this.isAudit != 2){
					return this.$refs.uToast.warning('建档立卡审核过后分配贫困户号，才可以提现生活补助金！')
				}
				
				if (this.type == 'deposit'  && !this.pNum) {
					this.$refs.uToast.hide()
					return this.$refs.uToast.error('请输入贫困户号')
				}
			

				if (!this.money) {
					this.$refs.uToast.hide()
					return this.$refs.uToast.error('请输入提现金额')
				}

				if (parseInt(this.money) > this.activeMoney) {
					this.$refs.uToast.hide()
					return this.$refs.uToast.error('已超出当前账户可提现金额')
				}
				
				if (parseInt(this.money) < this.min) {
					this.$refs.uToast.hide()
					let msg = '最低提现金额为: ' + this.min + '元'
				
					return this.$refs.uToast.error(msg)
				}
				
				// if (this.type === 'provident') {
				// 	const payParams = {
				// 		busiParam: this.money,
				// 		money: 300,
				// 		busiType: 32,
				// 		title: '共富基金提现',
				// 		fee: '共富基金提现手续费'
				// 	}
				// 	this.$tab.navTo(`/pages/common/defray?info=${JSON.stringify(payParams)}`)
					
				// 	return false
				// }
				
				let applyOpt = {
					type: this.typeNum,
					money: this.money,
					pNum:""
				}
				
				if (this.type === 'deposit') {
					applyOpt.pNum = this.pNum
				}
				
				apply(applyOpt).then(res => {
					this.$refs.uToast.hide()
					
					this.$refs.uToast.show({
						type: 'success',
						message: '操作成功',
						complete: () => {
							this.$tab.switchTab('/pages/user/index')
						}
					})
				})
			},
			getMin() {
				minWithdraw().then(res => {
					this.min = res.data
					// if (this.type === 'provident') {
					// 	this.min = 0
					// 	this.placeholder = '请输入提现金额'
					// }
					
					this.placeholder = `最低提现金额 ${this.min} 元`
				})
			},
			onTakeAll() {
				this.money = this.activeMoney
			},
			getTakedTotal() {
				totalByType(this.typeNum).then(res => {
					this.takedMoney = res.data
				})
			},
			getTotal(type) {
				total().then(res => {
					this.activeMoney = res.data[type]
				})
			},
			checkIsApply(){
				houseList().then(res=>{
					console.log(res)
					let result = res.data
					if(result){
						this.isAudit = result.realState
						if(this.isAudit == 2){
							this.pNum = result.uniqueNo
						}
						else{
							return this.$tab.navTo('/pages/card/deposit')
						}
					}
					else{
						return this.$refs.uToast.warning('建档立卡审核过后分配贫困户号，才可以提现生活补助金！')
					}
				})
			},
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
		background: hsla(0,0%,100%,.03);
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
			.tip{color:orange}
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
