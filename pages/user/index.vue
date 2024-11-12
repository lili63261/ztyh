<template>
	<view class="ibg">

		<view
			style="display: flex; flex-direction: row;padding:50rpx 0 0 50rpx; width: 100%;height:250rpx;background: url('/static/images/user/tbg.jpg');background-size:  100% 100%; background-repeat: no-repeat;">
			<image style="width: 150rpx;height: 150rpx;border-radius: 20rpx;" src="/static/images/common/logo.jpg"
				mode="widthFix"></image>

			<view
				style="display: flex;flex-direction: column; flex-grow: 1; align-items:flex-start;justify-content:flex-start;padding: 15rpx 0 0 35rpx;">
				<text style="color: white;font-size: 35rpx;font-weight: bold"> {{ isAcc ? acc.name : '暂未实名' }}</text>
				<view class="inviteCode" @click="doCopy"
					style="display: flex; flex-direction: row;margin-top: 20rpx;align-items: center;">
					<view class="iconxy iconxy-yaoqingma"></view>
					<text style="color: white;font-size: 30rpx;">邀请码: {{ inviteCode }}</text>
					<view class="copyBtn">复制</view>
				</view>
			</view>
		</view>

		<view style="display: flex; flex-direction: row; align-items:center;background-color: white;padding: 20rpx;">
			<image src="/static/images/user/sign.png" style="width: 60rpx;height: 60rpx;" />
			<view style="display: flex;flex-direction: column;flex-grow: 1;margin-left: 30rpx;">
				<view style="font-weight: bold; font-size: 30rpx;">{{ isSignIn === 0 ? '今日未签到' : '今日已签到' }}</view>
				<!--        <view style=" font-size: 27rpx;">{{ isSignIn === 0 ? '每日签到可获得一枚五行币' : '1枚五行币已到账' }}</view>-->
				<view style=" font-size: 27rpx;color:#9a0e0e">{{ isSignIn === 0 ? '每日签到可获得100爱心值' : '已签到，当前爱心值（' + total.subsidy
         +"）" }}</view>
			</view>
			<view @click="doSign"
				style="display:flex;align-items: center;height: 70rpx; background-color: #0b67fc;border-radius: 15rpx;padding: 15rpx 30rpx 15rpx 30rpx">
				<view class="iconxy iconxy-apply" />
				<text style="color: white;font-size: 27rpx;">{{ isSignIn === 0 ? '立即签到' : '已签到' }}</text>
			</view>
		</view>


		<view class="itemContainer"><text style="color: black;font-size:35rpx; font-weight: bold">资产统计</text>
			<view class="flexRow">
				<view class="assetsItem">
					<view class="flexColumn">
						<view class="flexRow">
							<view>国债收益 (元)</view>
							<view class="iconxy iconxy-xiangyou"
								@click.stop="$tab.navTo('/pages/user/take?type=cashback')"
								style="font-size:50rpx;color:#c4e1fe;background: transparent;margin-left: auto; margin-right: 20rpx;" />
						</view>
						<view class="flexRow" style="margin-top: 25rpx;">
							<view>
								<u-count-to :endVal="total.cashback" autoplay :decimals="0" bold color="#000"
									fontSize="22" />
							</view>
							<view class="btnWithdraw" @click.stop="$tab.navTo('/pages/user/take?type=cashback')">提现
							</view>
						</view>
					</view>
				</view>
				<!--        <view class="assetsItem">-->
				<!--          <view class="flexColumn">-->
				<!--            <view class="flexRow">-->
				<!--              <view>五行币 (枚)</view>-->
				<!--              <view class="iconxy iconxy-xiangyou"  @click.stop="$tab.navTo('/pages/fund/graph')"-->
				<!--                    style="font-size:50rpx;color:#c4e1fe;background: transparent;margin-left: auto; margin-right: 20rpx;"/>-->
				<!--            </view>-->
				<!--            <view class="flexRow" style="margin-top: 25rpx;">-->
				<!--              <view>-->
				<!--                <u-count-to :endVal="total.subsidy" autoplay :decimals="0" bold color="#000" fontSize="22"/>-->
				<!--              </view>-->
				<!--              <view class="btnWithdraw" @click.stop="$tab.navTo('/pages/fund/graph')">详情</view>-->
				<!--            </view>-->
				<!--          </view>-->
				<!--        </view>-->
				<view class="assetsItem">
					<view class="flexColumn">
						<view class="flexRow">
							<view>生活保障金 (元)</view>
							<view class="iconxy iconxy-xiangyou" @click.stop="$tab.navTo('/pages/life/take')"
								style="font-size:50rpx;color:#c4e1fe;background: transparent;margin-left: auto; margin-right: 20rpx;" />
						</view>
						<view class="flexRow" style="margin-top: 25rpx;">
							<view>
								<u-count-to :endVal="total.provident" autoplay :decimals="0" bold color="#000"
									fontSize="22" />
								<text style="padding-left: 5rpx;font-size: 30rpx;">万</text>
							</view>
							<view class="btnWithdraw" @click.stop="$tab.navTo('/pages/life/take')">提现</view>
						</view>
					</view>
				</view>

			</view>
			<view class="flexRow">

				<view class="assetsItem">
					<view class="flexColumn">
						<view class="flexRow">
							<view>团队佣金 (元)</view>
							<view class="iconxy iconxy-xiangyou"
								@click.stop="$tab.navTo('/pages/user/take?type=teamAward')"
								style="font-size:50rpx;color:#c4e1fe;background: transparent;margin-left: auto; margin-right: 20rpx;" />
						</view>
						<view class="flexRow" style="margin-top: 25rpx;">
							<view>
								<u-count-to :endVal="total.teamAward" autoplay :decimals="0" bold color="#000"
									fontSize="22" />
							</view>
							<view class="btnWithdraw" @click.stop="$tab.navTo('/pages/user/take?type=teamAward')">提现
							</view>
						</view>
					</view>
				</view>
				
				<view class="assetsItem">
					<view class="flexColumn">
						<view class="flexRow">
							<view>生活补助金 (元)</view>
							<view class="iconxy iconxy-xiangyou"
								@click.stop="$tab.navTo('/pages/card/deposit')"
								style="font-size:50rpx;color:#c4e1fe;background: transparent;margin-left: auto; margin-right: 20rpx;" />
						</view>
						<view class="flexRow" style="margin-top: 25rpx;">
							<view>
								<u-count-to :endVal="total.deposit" autoplay :decimals="0" bold color="#000"
									fontSize="22" />
							</view>
							<view class="btnWithdraw" @click.stop="$tab.navTo('/pages/card/deposit')">提现
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>


		<!--    <view class="sign" @click="doSign">-->
		<!--      <uni-icons type="calendar"></uni-icons>-->
		<!--      <view class="txt">{{ isSignIn === 0 ? '每日打卡' : '已打卡' }}</view>-->
		<!--    </view>-->


		<view class="main">
			<!-- 正式 -->
			<view class="capital">
				<view class="hd">我的资产</view>
				<view class="bd">
					<view class="item fund" @click="$tab.navTo('/pages/fund/list')">
						<view>我的国债</view>
						<view class="icon">
							<view class="iconxy iconxy-jijin"></view>
						</view>
					</view>
					<!--          <view class="item coupon" @click="$tab.navTo('/pages/riches/coupons')">-->
					<!--            <view>我的代金券</view>-->
					<!--            <view class="icon">-->
					<!--              <view class="iconxy iconxy-daijinquan"></view>-->
					<!--            </view>-->
					<!--          </view>-->
					<view class="item house" @click="$tab.navTo('/pages/life/list')">
						<view>国房安置</view>
						<view class="icon">
							<view class="iconxy iconxy-fangchanxinxibuchong"></view>
						</view>
					</view>
					
					<!--          <view class="item graph" @click="$tab.navTo('/pages/fund/graph')">-->
					<!--            <view>我的五行币</view>-->
					<!--            <view class="icon">-->
					<!--              <view class="iconxy iconxy-huobi"></view>-->
					<!--            </view>-->
					<!--          </view>-->
					<view class="item riches" @click="$tab.navTo('/pages/riches/list')">
						<view>壹号财富</view>
						<view class="icon">
							<view class="iconxy iconxy-kapian"></view>
						</view>
					</view>
					
					<view class="item car" @click="$tab.navTo('/pages/life/cars')">
						<view>我的汽车</view>
						<view class="icon">
							<view class="iconxy iconxy-yongchegongche"></view>
						</view>
					</view>
					
					<view class="item graph" @click="$tab.navTo('/pages/house/list')">
					   <view>我的房产</view>
					   <view class="icon">
						 <view class="iconxy iconxy-huobi"></view>
					   </view>
					</view>
					
					<view class="item coupon"  @click="$tab.switchTab('/pages/card/index')">
						<view>我的档案</view>
						<view class="icon">
							<view class="iconxy iconxy-daijinquan"></view>
						</view>
					</view>
				</view>
			</view>

			<view class="itemContainer">
				<text style="color: black;font-size:35rpx; font-weight: bold">管理与工具</text>
				<view class="flexRow">
					<view class="manageToolsItem" style="padding-top:20rpx;">
						<view @click="$tab.navTo('/pages/user/authenticate')" class="flexColumn"
							style=" align-items: center;">
							<view class="iconxy iconxy-fuwu-shiming"
								style="background: transparent;color: #c79081;font-size: 60rpx;width: 80rpx;height: 80rpx;" />
							<view style="font-size: 28rpx;">实名认证</view>
						</view>
					</view>
					<view class="manageToolsItem" style="padding-top:20rpx;">
						<view @click="$tab.navTo('/pages/user/address')" class="flexColumn"
							style=" align-items: center;">
							<view class="iconxy iconxy-dizhi"
								style="background: transparent;color: #2979ff;font-size: 60rpx;width: 80rpx;height: 80rpx;" />
							<view style="font-size: 28rpx;">收货地址</view>
						</view>
					</view>
					<view class="manageToolsItem" style="padding-top:20rpx;">
						<view @click="$tab.navTo('/pages/user/team/index')" class="flexColumn"
							style=" align-items: center;">
							<view class="iconxy iconxy-tuandui"
								style="background: transparent;color: #1e3c72;font-size: 60rpx;width: 80rpx;height: 80rpx;" />
							<view style="font-size: 28rpx;">我的团队</view>
						</view>
					</view>
					 <view class="manageToolsItem" style="padding-top:20rpx;">
						<view @click="$tab.navTo('/pages/user/team/poster')" class="flexColumn"
							style=" align-items: center;">
							<view class="iconxy iconxy-yaoqing"
								style="background: transparent;color: #66a6ff;font-size: 60rpx;width: 80rpx;height: 80rpx;" />
							<view style="font-size: 28rpx;">邀请好友</view>
						</view>
					</view>
					
				</view>

				<view class="flexRow">
					
					<view class="manageToolsItem" style="padding-top:20rpx;">
						<view @click="$tab.navTo('/pages/common/online')" class="flexColumn"
							style=" align-items: center;">
							<view class="iconxy iconxy-kefu"
								style="background: transparent;color: #6a85b6;font-size: 60rpx;width: 80rpx;height: 80rpx;" />
							<view style="font-size: 28rpx;">平台客服</view>
						</view>
					</view>
					
					<view class="manageToolsItem" style="padding-top:20rpx;">
						<view @click="$tab.navTo('/pages/chat')" class="flexColumn" style=" align-items: center;">
							<view class="iconxy iconxy-liaotianqingqiu"
								style="background: transparent;color: #d19f55;font-size: 60rpx;width: 80rpx;height: 80rpx;" />
							<view style="font-size: 28rpx;">官方群聊</view>
						</view>
					</view>
					<view class="manageToolsItem" style="padding-top:20rpx;">
						<view @click="$refs.downloadApp.open()" class="flexColumn" style=" align-items: center;">
							<view class="iconxy iconxy-app"
								style="background: transparent;color: #4481eb;font-size: 60rpx;width: 80rpx;height: 80rpx;" />
							<view style="font-size: 28rpx;">APP下载</view>
						</view>
					</view>
					<view class="manageToolsItem" style="padding-top:20rpx;">
						<view @click="$tab.navTo('/pages/user/password')" class="flexColumn"
							style=" align-items: center;">
							<view class="iconxy iconxy-mima"
								style="background: transparent;color: #a2b6df;font-size: 60rpx;width: 80rpx;height: 80rpx;" />
							<view style="font-size: 28rpx;">修改密码</view>
						</view>
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
	import {
		total
	} from '@/api/system/user.js'
	import {
		ifSignIn,
		signIn
	} from '@/api/system/signReward.js'
	import {
		detailCertification
	} from '@/api/mine/certification.js'
	import {
		listAddress
	} from '@/api/mine/address.js'
	import {
		getAssessList
	} from '@/api/index.js'
	import {
		minWithdraw,
		apply,
		totalByType,
		ortherApply
	} from '@/api/mine/withdraw.js'
	import UButton from "../../uni_modules/uview-ui/components/u-button/u-button.vue";

	export default {
		components: {
			UButton
		},
		data() {
			return {
				inviteCode: this.$store.getters.inviteCode,
				total: {},
				isSignIn: 0, //是否打卡 0否，1是
				houses: [{
						id: 1,
						area: 138,
						name: '两室一厅',
						money: 193,
						gfjj: 20
					},
					{
						id: 2,
						area: 218,
						name: '两室两厅',
						money: 293,
						gfjj: 30
					},
					{
						id: 3,
						area: 329,
						name: '三室两厅',
						money: 393,
						gfjj: 40
					},
					{
						id: 4,
						area: 458,
						name: '四室三厅',
						money: 593,
						gfjj: 60
					},
					{
						id: 5,
						area: 580,
						name: '豪华别墅',
						money: 893,
						gfjj: 90
					}
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

					// `可提现国债${h.gfjj}万`
					// this.$refs.uToast.success(`可提现国债${h.gfjj}万`)
					const activeMoney = num - this.takedGfjjMoney
					if (activeMoney > 0) {
						this.$refs.takeNotify.show({
							top: 1,
							type: 'error',
							message: `可提现国债${activeMoney}万`,
							safeAreaInsetTop: true
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
						// this.$refs.uToast.success('打卡成功, 1枚五行币已到账')
						this.$refs.uToast.success('打卡成功, 1个爱心值已到账')
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
					const {
						data: acc
					} = await detailCertification()
					if (acc && Object.keys(acc).length > 0) {
						this.SET_ACC(acc)
					}
				}

				if (Object.keys(this.adr).length <= 0) {
					const {
						data: adrs
					} = await listAddress()
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
		background: url('/static/images/common/bg.png') top center no-repeat;
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
					width: 100%;
					flex-direction: row;
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
					white-space: nowrap;
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

				>view:first-child {
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

				//margin-right: auto;
				//margin-left: 20rpx;
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

				.tips {
					margin-right: 10rpx;
					color: $pbc;

					&.end {
						color: #71d5a1;
					}
				}
			}
		}
	}

	.copyBtn {
		font-size: 27rpx;
		margin-top: -3rpx;
		color: white;
		margin-left: 20rpx;
		padding: 4rpx 20rpx;
		border-radius: 10rpx;
		border: 2rpx solid #fff;
	}

	.iconxy {
		width: 40rpx;
		height: 40rpx;
		font-size: 18px;
		/* 图标大小 */
		color: white;
		/* 修改图标颜色为红色 */
		background-color: transparent;
	}


	.logout {
		margin: 20rpx 20rpx 0 20rpx;
		padding: 25rpx 0;
		border-radius: 16rpx;
		background-image: linear-gradient(45deg, #2979ff 50%, #609cff 100%);
		text-align: center;
		color: #fff;
	}

	.assetsItem {
		background: linear-gradient(45deg, #f0f6ff, #f5faff);
		width: 48%;
		border-radius: 20rpx;
		padding: 30rpx;
		margin: 10rpx;
	}

	.flexRow {
		display: flex;
		align-items: center;
		flex-direction: row;
	}

	.flexColumn {
		display: flex;
		justify-items: center;
		flex-direction: column;
	}

	.btnWithdraw {
		padding: 5rpx 15rpx 5rpx 15rpx;
		background: #2979ff;
		color: #fff;
		border-radius: 15rpx;
		margin-left: auto;
	}

	.itemContainer {
		padding: 30rpx 20rpx 25rpx 20rpx;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
		background-color: white;
		display: flex;
		flex-direction: column;
		justify-items: center;
	}

	.manageToolsItem {
		width: 25%;
		margin: 10rpx;
		padding: 10rpx;
	}
</style>