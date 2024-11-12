<template>
	<view class="ibg">
		<z-paging ref="paging" v-model="dataList" hide-no-more-inside @query="queryList">
			<view slot="top">
				<uni-nav-bar class="uniNavBar" title="我的安置房" :border="false" color="#000000"  left-icon="left"
				@clickLeft="$tab.navigateBack()" />
				<view class="head">
					<view class="teamMoney">
						<view class="name">
							房产总数
						</view>
						<view class="num">
							<u-count-to :endVal="dataList.length" autoplay :decimals="0" color="#fff" />
							<text style="padding-left: 10rpx;">套</text>
						</view>
					</view>
					<view class="taked">
						<view class="name">
							合同未签署
						</view>
						<view class="num">
							<u-count-to :endVal="flterNum" autoplay :decimals="0" color="#fff" />
							<text style="padding-left: 10rpx;">套</text>
						</view>
					</view>
				</view>
			</view>
			
			<view class="list">
				
				<view v-for="item in dataList" :key="item.id" class="item">
					<view class="ribbon"><view class="ribbonBox">{{ item.type === '0' ? '本人房产' : '委托房产' }}</view></view>
					<view class="box">
						<view class="pic">
							<image :src="`/static/images/life/room/${item.houseInfo.id}.jpg`" />
						</view>
						<view>
							<view class="title">{{ item.houseInfo.name }}</view>
							<view class="desc">
								{{ item.houseRegion }} | {{ item.houseArea }}㎡
							</view>
							<view class="tags">
								<view class="tag">厅带阳台</view>
								<view class="tag">交通便利</view>
								<view class="tag">有电梯</view>
							</view>
							<view class="ls">
								<view class="li">
									<view class="iconxy iconxy-bianhaodanhao"></view>
									<view>房产编号: {{ item.uniqueNo }}</view>
								</view>
								<!-- <view class="li">
									<view class="iconxy iconxy-shijian"></view>
									<view>申请时间: {{ item.uniqueNo }}</view>
								</view> -->
							</view>
						</view>
					</view>
					<view v-if="item.status === 0 || item.status === 2 || item.status === 4" class="ft statusBox">
						<u-tag :text="item.statusDesc" type="warning" plain plainFill />
					</view>
					<view v-if="item.status === 1" class="ft">
						<u-tag :text="item.statusDesc" type="warning" plain plainFill />
						<!-- <view class="btn" @click="doPay2(item)"> -->
						<view class="btn" @click="onSign(item)">
							<view class="iconxy iconxy-Icon-shenqinghuizhen"></view>
							<view class="txt">签署合同</view>
						</view>
					</view>
					<view v-if="item.status === 3" class="ft">
						<u-tag :text="item.statusDesc" plain plainFill />
						<view class="btn" @click="doPay3(item)">
							<view class="iconxy iconxy-yiweixiu"></view>
							<view class="txt">维修基金</view>
						</view>
					</view>
					<view v-if="item.status === 5" class="ft">
						<u-tag :text="item.statusDesc" type="success" plain plainFill />
						<view class="btn" @click="$tab.navTo('/pages/life/letter?id=' + item.id)">
							<view class="iconxy iconxy-bianhaodanhao"></view>
							<view class="txt">入住通知书</view>
						</view>
					</view>
				</view>
				
			</view>
		
			<view slot="empty">
				<u-empty icon="/static/images/common/empty1.png" text="暂无数据" />
			</view>
		</z-paging>
		
		<u-modal :show="show" showCancelButton confirmColor="#db0003" @cancel="show = false" @confirm="modalConfirm">
			<scroll-view scroll-y="true" style="height:85vh;">
			<view class="modalBox">
				<view class="title">房产律师见证协议合同（修正版）</view>
				<view class="main">
					<view class="top">
						<view>甲方：云数贸公益律师所</view>
						<view class="flex">乙方：<u--text decoration="underline" size="28rpx" :text="acc.name" /></view>
					</view>
					<view>根据《中华人民共和国合同法》及相关法律法规，甲乙双方本着自愿、公平、公正的原则，就房产律师见证协议：</view>
					<view class="dl">
						<view class="dt">1. 房产信息  </view>
						<view class="flex dd">1.1 房产编号：<u--text decoration="underline" size="28rpx" :text="onRow.uniqueNo" /></view>
						<view class="dd">1.2 所在城市：{{ onRow.houseRegion }}</view>
						<view class="dd">1.3 房屋面积：{{ onRow.houseArea }}平方米</view>
					</view>
					<view class="dl">
						<view class="dt">2. 签署单位</view>
						<view class="dd">2.1 云数贸公益律师所 </view>
					</view>
					<view class="dl">
						<view class="dt">3. 权利与义务</view>
						<view class="dd">3.1 甲方保证该房产信息真实、合法，未设抵押，未涉诉讼。 </view>
						<view class="dd">3.2 本合同的所有相关文件和资料将通过云数贸平台进行存储与处理，确保安全、便捷。</view>
					</view>
					<view class="dl">
						<view class="dt">4. 争议解决</view>
						<view class="dd">4.1 若因合同引发争议，双方应协商解决，未果可向法院提起诉讼。</view>
					</view>
					<view class="t1">本合同自双方签字之日起生效，具有法律效力。 </view>
					<view class="bottom">
						<view>甲方签字：云数贸公益律师所</view>
						<view class="flex">乙方签字：<u--text decoration="underline" size="28rpx" :text="acc.name" /></view>
						<view class="flex">签署日期：<uni-dateformat :date="Date.now()" format="yyyy/MM/dd" class="dateformat" /></view>
					</view>
				</view>
			</view>
			</scroll-view>
		</u-modal>
	</view>
</template>

<script>
	import { getAssessList } from '@/api/index.js'
	
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
				houses: [
					{ id: 1, area: 138, name: '两室一厅' },
					{ id: 2, area: 218, name: '两室两厅' },
					{ id: 3, area: 329, name: '三室两厅' },
					{ id: 4, area: 458, name: '四室三厅' },
					{ id: 5, area: 580, name: '豪华别墅' }
				],
				dataList: [],
				onRow: {},
				show: false
			}
		},
		methods: {
			modalConfirm() {
				this.show = false
				this.doPay2(this.onRow)
			},
			onSign(row) {
				this.onRow = row
				this.show = true
			},
			doPay2(row) {
				this.$refs.uToast.loading('加载中...')
				
				const payParams = {
					id: row.id,
					money: 300,
					busiType: 35,
					actionName: '爱心房屋',
					title: '签署爱心房屋律师合同',
					fee: '律师合同费',
					charge: '云数贸公益律师所'
				}
				this.$tab.navTo(`/pages/common/defray?info=${JSON.stringify(payParams)}`)
			},
			doPay3(row) {
				this.$refs.uToast.loading('加载中...')
				
				const payParams = {
					id: row.id,
					money: 500,
					busiType: 36,
					actionName: '爱心房屋',
					title: '缴纳爱心房屋维修基金',
					fee: '住宅专项维修资金',
					charge: '国房壹号物业部'
				}
				this.$tab.navTo(`/pages/common/defray?info=${JSON.stringify(payParams)}`)
			},
			async queryList(pageNo, pageSize) {
				this.$refs.uToast.loading('加载中...')
				
				const params = {
					pageNum: pageNo,
					pageSize: pageSize
				}
				
				const res = await getAssessList(params)
				
				this.$refs.uToast.hide()
				
				res.data.forEach(item => {
					item.houseInfo = this.houses.find(x => item.houseArea === x.area) || {}
					
				})

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
			background-image: linear-gradient(to top, #db0003 50%, #ffb199 100%);
			.iconxy {
				margin-right: 10rpx;
			}
		}
	}
}
.list {
	margin: 0 20rpx 20rpx 20rpx;
	.item {
		position: relative;
		margin-top: 20rpx;
		padding: 20rpx;
		border-radius: 16rpx;
		background: #fff;
	}
	.ribbon {
		width: 200rpx;
		height: 200rpx;
		overflow: hidden;
		position: absolute;
		top: -2rpx;
		right: -2rpx;
		.ribbonBox {
			position: relative;
			right: 0;
			top: 26rpx;
			width: 300rpx;
			padding: 16rpx 0;
			background: goldenrod;
			color: white;
			line-height: 30rpx;
			text-align: center;
			transform: rotate(45deg);
		}
	}
	.box {
		display: flex;
		align-items: center;
		.pic {
			width: 220rpx;
			height: 220rpx;
			margin-right: 20rpx;
			image {
				display: block;
				width: 100%;
				height: 100%;
				border-radius: 10rpx;
			}
		}
		.title {
			font-size: 32rpx;
			font-weight: bold;
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
		.ls {
			.li {
				display: flex;
				align-items: center;
				margin-top: 6rpx;
				.iconxy {
					margin-right: 10rpx;
				}
			}
		}
	}
	.ft {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 20rpx;
		padding-top: 10rpx;
		border-top: 1px solid #efefef;
		&.statusBox {
			display: block;
			::v-deep {
				.u-tag {
					justify-content: center;
				}
			}
		}
		.btn {
			padding: 15rpx 20rpx;
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
				font-weight: normal;
			}
		}
	}
}

::v-deep {
	.u-modal {
		width: 100vw !important;
		.u-modal__content {
			padding: 20rpx;
			background: url('/static/images/life/sy.jpg') no-repeat;
			background-position: right 10rpx bottom 10rpx;
			background-size: 200rpx;
		}
	}
}
.modalBox {
	width: 100%;
	font-family: serif;
	::v-deep {
		// .u-text__value {
		// 	padding: 0 20rpx;
		// }
	}
	.title {
		padding-bottom: 30rpx;
		text-align: center;
		font-size: 36rpx;
		font-weight: bold;
	}
	.top {
		padding-bottom: 20rpx;
		line-height: 44rpx;
	}
	.dl {
		padding-left: 20rpx;
		line-height: 44rpx;
		.dd {
			padding-left: 20rpx;
		}
	}
	.t1 {
		padding: 20rpx 0;
	}
	.bottom {
		line-height: 44rpx;
		.dateformat {
			text-decoration: underline;
		}
	}
}
</style>
