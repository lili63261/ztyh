<template>
	<view class="ibg">
		<view class="head">
			<view class="sign" @click="doSign">
				<uni-icons type="calendar"></uni-icons>
				<view class="txt">{{ isSignIn === 0 ? '每日打卡' : '已打卡' }}</view>
			</view>
			<view class="profile">
				<view class="userInfo">
					<view class="left">
						<view class="name">
							{{ isAcc ? acc.name : '暂未实名' }}
						</view>
						<view class="inviteCode" @click="doCopy">
							<text>邀请码: {{ inviteCode }}</text>
							<view class="iconxy iconxy-fuzhiwenjian"></view>
						</view>
					</view>
					<view class="avatar">
						<image src="/static/images/common/avatar.jpg" mode="widthFix" />
					</view>
				</view>
				<!-- 正式 -->
				<!-- #ifdef !IS-PORD -->
				<view class="total">
					<view class="item">
						<view class="num">
							<u-count-to :endVal="total.cashback" autoplay :decimals="0" bold color="#000" fontSize="18" />
						</view>
						<view class="name">基金收益</view>
						<view class="btn" @click.stop="$tab.navTo('/pages/user/take?type=cashback')">提现</view>
					</view>
					<view class="item">
						<view class="num">
							<u-count-to :endVal="total.subsidy" autoplay :decimals="0" bold color="#000" fontSize="18" />
						</view>
						<view class="name">五行币</view>
						<view class="btn" @click.stop="$tab.navTo('/pages/fund/graph')">详情</view>
					</view>
					<view class="item" style="position: relative;padding: 0 10rpx;">
						<view class="num">
							<u-count-to :endVal="total.provident" autoplay :decimals="0" bold color="#000" fontSize="18" />
							<text style="padding-left: 5rpx;font-size: 30rpx;">万</text>
						</view>
						<view class="name">共富基金</view>
						<view class="btn" @click.stop="$tab.navTo('/pages/life/take')">提现</view>
					</view>
					<view class="item">
						<view class="num">
							<u-count-to :endVal="total.teamAward" autoplay :decimals="0" bold color="#000" fontSize="18" />
						</view>
						<view class="name">团队佣金</view>
						<view class="btn" @click.stop="$tab.navTo('/pages/user/take?type=teamAward')">提现</view>
					</view>
				</view>
				<!-- #endif -->
				
				<!-- #ifdef IS-PORD -->
				<view class="graphBox">
					<view class="graphBoxIner">
						<view class="count">
							<view class="name">
								我的五行币 (枚)
							</view>
							<view class="num">
								<u-count-to :endVal="total.subsidy" autoplay :decimals="0" bold color="#fff" fontSize="18" />
							</view>
						</view>
						<view class="btn" @click="$tab.navTo('/pages/fund/graph')">
							<view class="iconxy iconxy-yundanmingxitongji"></view>
							<view>详情</view>
						</view>
					</view>
				</view>
				<!-- #endif -->
				
			</view>
		</view>
		
		<view class="main">
			<!-- 正式 -->
			<!-- #ifdef !IS-PORD -->
			<view class="capital">
				<view class="hd">我的资产</view>
				<view class="bd">
					<view class="item fund" @click="$tab.navTo('/pages/fund/list')">
						<view>我的基金</view>
						<view class="icon">
							<view class="iconxy iconxy-jijin"></view>
						</view>
					</view>
					<view class="item coupon" @click="$tab.navTo('/pages/riches/coupons')">
						<view>我的代金券</view>
						<view class="icon">
							<view class="iconxy iconxy-daijinquan"></view>
						</view>
					</view>
					<view class="item house" @click="$tab.navTo('/pages/life/list')">
						<view>我的房产</view>
						<view class="icon">
							<view class="iconxy iconxy-fangchanxinxibuchong"></view>
						</view>
					</view>
					<view class="item car" @click="$tab.navTo('/pages/life/cars')">
						<view>我的汽车</view>
						<view class="icon">
							<view class="iconxy iconxy-yongchegongche"></view>
						</view>
					</view>
					<view class="item graph" @click="$tab.navTo('/pages/fund/graph')">
						<view>我的五行币</view>
						<view class="icon">
							<view class="iconxy iconxy-huobi"></view>
						</view>
					</view>
					<view class="item riches" @click="$tab.navTo('/pages/riches/list')">
						<view>壹号财富</view>
						<view class="icon">
							<view class="iconxy iconxy-kapian"></view>
						</view>
					</view>
				</view>
			</view>
			<!-- #endif -->
			
			<view class="menu">
				<view class="hd">
					快捷服务
				</view>
				<view class="bd">
					
					<view class="item" @click="$tab.navTo('/pages/user/authenticate')">
						<view class="left">
							<view class="iconxy iconxy-fuwu-shiming"></view>
							<view class="name">实名认证</view>
						</view>
						<view class="right">
							<view class="tips" :class="{ 'end' : isAcc }">
								{{ isAcc ? '已认证' : '去认证' }}
							</view>
							<uni-icons type="right"></uni-icons>
						</view>
					</view>
					<view class="item" @click="$tab.navTo('/pages/user/address')">
						<view class="left">
							<view class="iconxy iconxy-dizhi"></view>
							<view class="name">收货地址</view>
						</view>
						<view class="right">
							<view class="tips" :class="{ 'end' : isAdr }">
								{{ isAdr ? '已添加' : '去添加' }}
							</view>
							<uni-icons type="right"></uni-icons>
						</view>
					</view>
					<view class="item" @click="$tab.navTo('/pages/user/team/index')">
						<view class="left">
							<view class="iconxy iconxy-tuandui"></view>
							<view class="name">我的团队</view>
						</view>
						<uni-icons type="right"></uni-icons>
					</view>
					<!-- #ifdef IS-PORD -->
					<view class="item" @click="$tab.switchTab('/pages/user/team/poster')">
						<view class="left">
							<view class="iconxy iconxy-yaoqing"></view>
							<view class="name">邀请好友</view>
						</view>
						<uni-icons type="right"></uni-icons>
					</view>
					<!-- #endif -->
					<!-- #ifdef !IS-PORD -->
					<view class="item" @click="$tab.navTo('/pages/user/team/poster')">
						<view class="left">
							<view class="iconxy iconxy-yaoqing"></view>
							<view class="name">邀请好友</view>
						</view>
						<uni-icons type="right"></uni-icons>
					</view>
					<!-- #endif -->
					<view class="item" @click="$tab.navTo('/pages/common/online')">
						<view class="left">
							<view class="iconxy iconxy-kefu"></view>
							<view class="name">客服中心</view>
						</view>
						<uni-icons type="right"></uni-icons>
					</view>
					<view class="item" @click="$tab.navTo('/pages/chat')">
						<view class="left">
							<view class="iconxy iconxy-liaotianqingqiu"></view>
							<view class="name">官方群聊</view>
						</view>
						<uni-icons type="right"></uni-icons>
					</view>
					<view class="item" @click="$refs.downloadApp.open()">
						<view class="left">
							<view class="iconxy iconxy-app"></view>
							<view class="name">APP下载</view>
						</view>
						<uni-icons type="right"></uni-icons>
					</view>
					<view class="item" @click="$tab.navTo('/pages/user/password')">
						<view class="left">
							<view class="iconxy iconxy-mima"></view>
							<view class="name">修改密码</view>
						</view>
						<uni-icons type="right"></uni-icons>
					</view>
				</view>
				
			</view>
			
			<view class="logout" @click="$refs.pop1.open()">退出当前账号</view>
			
		</view>
		
		<iupop ref="pop1" icontent="确定要退出当前账号吗?" @confd="logout" />
		
		<download-app ref="downloadApp" />
		
		<u-notify ref="takeNotify" />
	</view>
</template>

<script>
	import { total } from '@/api/system/user.js'
	import { ifSignIn, signIn } from '@/api/system/signReward.js'
	import { detailCertification } from '@/api/mine/certification.js'
	import { listAddress } from '@/api/mine/address.js'
	import { getAssessList } from '@/api/index.js'
	import { minWithdraw, apply, totalByType, ortherApply } from '@/api/mine/withdraw.js'
	
	export default {
		data() {
			return {
				inviteCode: this.$store.getters.inviteCode,
				total: {},
				isSignIn: 0, //是否打卡 0否，1是
				houses: [
					{ id: 1, area: 138, name: '两室一厅', money: 193, gfjj: 20 },
					{ id: 2, area: 218, name: '两室两厅', money: 293, gfjj: 30 },
					{ id: 3, area: 329, name: '三室两厅', money: 393, gfjj: 40 },
					{ id: 4, area: 458, name: '四室三厅', money: 593, gfjj: 60 },
					{ id: 5, area: 580, name: '豪华别墅', money: 893, gfjj: 90 }
				],
				takedGfjjMoney: 0
			}
		},
		onShow() {
			this.$nextTick(() => {
				// 正式
				// #ifdef !IS-PORD
					this.getTakedGgjjTotal()
				// #endif
				this.ifSignIn()
				this.getTotal()
				this.checkUser()
			})
		},
		methods: {
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
					
					// `可提现基金${h.gfjj}万`
					// this.$refs.uToast.success(`可提现基金${h.gfjj}万`)
					const activeMoney = num - this.takedGfjjMoney
					if (activeMoney > 0) {
						this.$refs.takeNotify.show({
							top: 1,
							type: 'error',
							message: `可提现基金${activeMoney}万`,
							safeAreaInsetTop:true
						})
					}
					
				})
			},
			// 资金统计
			getTotal() {
				total().then((res) => {
					this.total = res.data
				})
			},
			getTakedGgjjTotal() {
				totalByType(7).then(res => {
					this.takedGfjjMoney = res.data
					this.getAssessList()
				})
			},
			async doSign() {
				// 签到
				try {
					this.$refs.uToast.loading('打卡中')
					
					const signInData = await ifSignIn()
					if (signInData.data == 0) {
						const res = await signIn()
						this.$refs.uToast.success('打卡成功, 1枚五行币已到账')
						this.isSignIn = true
						
						await this.getTotal()
					} else if (signInData.data == 1) {
						this.$refs.uToast.error('今日已打卡, 请勿重复打卡')
					}
				} catch (error) {
					console.log(error)
				}
			},
			// 是否打卡
			ifSignIn() {
				ifSignIn().then((res) => {
					this.isSignIn = res.data
				})
			},
			doCopy() {
				let text = this.inviteCode
				uni.setClipboardData({
					data: text,
					showToast: false,
					success: () => {
						this.$refs.uToast.success('邀请码复制成功')
					}
				})
			},
			logout() {
				this.$refs.uToast.loading('正在退出...')
				
				this.$store.dispatch('LogOut').then(() => {
					this.$tab.reLaunch('/pages/login');
				})
			},
			async checkUser() {
				if (Object.keys(this.acc).length <= 0) {
					const { data: acc } = await detailCertification()
					if (acc && Object.keys(acc).length > 0) {
						this.SET_ACC(acc)
					}
				}
				
				if (Object.keys(this.adr).length <= 0) {
					const { data: adrs } = await listAddress()
					if (adrs.length > 0) {
						this.SET_ADR(adrs[0])
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.ibg {
	background: url('/static/images/common/bg.jpg') top center no-repeat;
	background-size: cover;
}

.graphBox {
	padding: 20rpx;
	.graphBoxIner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-right: 20rpx;
		border-radius: 16rpx;
		background: url('/static/images/user/team.jpg') center bottom no-repeat;
		background-size: cover;
		color: #fff;
	}
	.count {
		padding: 40rpx;
		text-align: center;
		.num {
			margin-top: 20rpx;
			.u-count-num {
				font-size: 60rpx !important;
			}
		}
	}
	.btn {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 20rpx 50rpx;
		border-radius: 50rpx;
		background-image: linear-gradient(to top, #db0003 50%, #ffb199 100%);
		.iconxy {
			margin-right: 10rpx;
		}
	}
}

.head {
	padding: 20rpx 20rpx 0 20rpx;
	.sign {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 70rpx;
		width: 200rpx;
		border-radius: 25rpx;
		// background: linear-gradient(220deg, rgba(255,255,255,.7), rgba(255,255,255,.4));
		background: linear-gradient(220deg, #ed3445, #ffcba9);
		box-shadow: 0 0 5px rgba(0, 0, 0, .2);
		color: #fff;
		.uni-icons {
			color: #fff !important;
			font-size: 50rpx !important;
			margin-right: 10rpx;
		}
	}
	.profile {
		margin: 30rpx 0 0 0;
		// padding: 20rpx;
		border-radius: 20rpx 20rpx 0 0;
		background: rgba(255, 255, 255, .9);
	}
	.userInfo {
		position: relative;
		padding: 20rpx 20rpx 0 20rpx;
		.left {
			.name {
				font-size: 36rpx;
				font-weight: bold;
			}
			.inviteCode {
				display: flex;
				align-items: center;
				margin-top: 10rpx;
				color: #333;
				.iconxy {
					margin-left: 10rpx;
				}
			}
		}
		.avatar {
			position: absolute;
			right: 20rpx;
			top: -70rpx;
			image {
				width: 150rpx;
				height: 150rpx;
				border-radius: 50%;
			}
		}
	}
	.total {
		display: flex;
		align-items: stretch;
		justify-content: space-between;
		padding: 40rpx 0;
		.item {
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			border-left: 1px solid #e9b5b9;
			&:first-child {
				border-left: 0;
			}
		}
		.num {
			font-size: 36rpx;
			font-weight: bold;
		}
		.name {
			margin: 10rpx 0;
			font-size: 26rpx;
			color: #976930;
		}
		.btn {
			height: 50rpx;
			line-height: 50rpx;
			padding: 0 30rpx;
			border-radius: 50rpx;
			background: #ef2932;
			color: #fff;
		}
		
		.tips {
			position: absolute;
			left: 0;
			bottom: -70rpx;
			padding: 6rpx 20rpx;
			border-radius: 30rpx;
			background: #ef3c34;
			&::before {
				content: '';
				position: absolute;
				left: calc(50% - 15rpx);
				top: -8rpx;
				width: 30rpx;
				height: 30rpx;
				transform: rotate(45deg);
				background: #ef3c34;
			}
			view {
				position: relative;
				z-index: 2;
				white-space:nowrap;
				color: #fff;
			}
		}
	}
}

.main {
	padding-bottom: 20rpx;
	background: #f4f8fb;
	box-shadow: 0px -5px 5px rgba(0, 0, 0, 0.05);
}
.service {
	padding: 20rpx;
	background: #fff;
	.hd {
		padding-bottom: 20rpx;
		font-size: 32rpx;
		font-weight: bold;
	}
	.bd {
		display: flex;
		align-items: center;
		justify-content: space-around;
		.item {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			padding: 15rpx 0 20rpx 0;
		}
		.icon {
			display: flex;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			width: 70rpx;
			height: 70rpx;
			margin-bottom: 15rpx;
		}
		.iconxy {
			font-size: 60rpx;
			background: linear-gradient(39deg, #ff7d7d, #ef2932);
			background-clip: text;
			-webkit-text-fill-color: transparent;
			color: #ef2932;
		}
		.iconxy-shangpu {
			font-size: 65rpx;
		}
		.iconxy-kapian {
			font-size: 70rpx;
		}
	}
}

.capital {
	padding: 20rpx;
	background: #fff;
	.hd {
		padding-bottom: 20rpx;
		font-size: 32rpx;
		font-weight: bold;
	}
	.bd {
		display: flex;
		align-items: center;
		justify-content: space-around;
		flex-wrap: wrap;
		.item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 45%;
			margin-bottom: 20rpx;
			padding: 30rpx 20rpx;
			border-radius: 30rpx;
			>view:first-child{
				flex: 1;
				font-size: 32rpx;
				text-align: center;
			}
			.icon {
				display: flex;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				width: 70rpx;
				height: 70rpx;
			}
			.iconxy {
				font-size: 60rpx;
				background: linear-gradient(39deg, #ff7d7d, #ef2932);
				background-clip: text;
				-webkit-text-fill-color: transparent;
				color: #ef2932;
			}
		}
		.fund {
			background: linear-gradient(39deg, #fffafa, #ffcec4);
		}
		.house {
			background: linear-gradient(39deg, #fffafa, #c4eaff);
			.iconxy {
				background: linear-gradient(39deg, #a3a6f9, #294eef);
				background-clip: text;
				-webkit-text-fill-color: transparent;
				color: #294eef;
			}
		}
		.car {
			background: linear-gradient(39deg, #fffafa, #c4ffe8);
			.iconxy {
				background: linear-gradient(39deg, #a3f9c9, #04b370);
				background-clip: text;
				-webkit-text-fill-color: transparent;
				color: #04b370;
				font-size: 66rpx;
			}
		}
		.coupon {
			background: linear-gradient(39deg, #fffafa, #cdc4ff);
			.iconxy {
				background: linear-gradient(39deg, #f9a3f5, #b304b1);
				background-clip: text;
				-webkit-text-fill-color: transparent;
				color: #b304b1;
			}
		}
		.graph {
			background: linear-gradient(39deg, #fffafa, #ffc4e4);
			.iconxy {
				background: linear-gradient(39deg, #f9d000, #ff0000);
				background-clip: text;
				-webkit-text-fill-color: transparent;
				color: #ff0000;
			}
		}
		.riches {
			background: linear-gradient(39deg, #fffafa, #ffddc4);
			.iconxy {
				background: linear-gradient(39deg, #ffe149, #ff7914);
				background-clip: text;
				-webkit-text-fill-color: transparent;
				color: #ff7914;
				font-size: 76rpx;
			}
		}
	}
}

.menu {
	// 正式
	// #ifdef !IS-PORD
		margin-top: 20rpx;
	// #endif
	padding: 20rpx;
	background: #fff;
	.hd {
		padding-bottom: 20rpx;
		font-size: 32rpx;
		font-weight: bold;
	}
	.bd {
		.item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 30rpx 0;
			border-bottom: 1px solid #eee;
			&:last-child {
				border-bottom: 0;
			}
		}
		.left {
			display: flex;
			align-items: center;
			.iconxy {
				margin-right: 20rpx;
				font-size: 50rpx;
				color: #ff6766;
			}
			// .iconxy-fuwu-shiming {
			// 	color: #fe0100;
			// }
			// .iconxy-tuandui {
			// 	color: #ff6766;
			// }
			// .iconxy-yaoqing {
			// 	color: #fea500;
			// }
			// .iconxy-dizhi {
			// 	color: #ffc965;
			// }
			// .iconxy-kefu {
			// 	color: #37ca42;
			// }
			// .iconxy-liaotianqingqiu {
			// 	color: #909;
			// }
			// .iconxy-app {
			// 	color: #434dbc;
			// }
			// .iconxy-mima {
			// 	color: #f36;
			// }
		}
		.right {
			display: flex;
			align-items: center;
			justify-content: space-between;
			.tips{
				margin-right: 10rpx;
				color: $pbc;
				&.end {
					color: #71d5a1;
				}
			}
		}
	}
}

.logout {
	margin: 20rpx 20rpx 0 20rpx;
	padding: 25rpx 0;
	border-radius: 16rpx;
	background-image: linear-gradient(45deg, #2979ff 50%, #609cff 100%);
	text-align: center;
	color: #fff;
}
</style>