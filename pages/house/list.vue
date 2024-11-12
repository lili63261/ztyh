<template>
	<view class="ibg">
		<z-paging ref="paging" v-model="dataList" hide-no-more-inside @query="queryList">
			<view slot="top">
				<uni-nav-bar class="uniNavBar" title="我的申报" :border="false" color="#000000"  left-icon="left"
				@clickLeft="$tab.navigateBack()" />
				<view class="head">
					<view class="teamMoney">
						<view class="name">
							申报总数
						</view>
						<view class="num">
							<u-count-to :endVal="dataList.length" autoplay :decimals="0" color="#fff" />
							<text style="padding-left: 10rpx;">套</text>
						</view>
					</view>
					<view class="taked">
						<view class="name">
							申报审核中
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
					<view class="box">
						<view class="pic" :title="item.houseInfo.id">
							<!-- <image :src="`/static/images/life/room/${item.houseInfo.id}.jpg`" /> -->
							<image src="/static/images/house/vimg.png" />
						</view>
						<view>
							<view class="ls">
								<view class="li">
									<view>房屋编号: {{ item.uniqueNo }}</view>
								</view>
								<view class="li">
									<view>房屋坐落: {{ item.houseRegion }}</view>
								</view>
								<view class="li">
									<view>房屋面积: {{ item.area }}㎡</view>
								</view>
								<view class="li">
									<view>申请时间: {{ item.createTime }}</view>
								</view>
								<view class="li">
									<view v-if="item.status > 2">房屋状态: 已解冻</view>
									<view v-if="item.status == 2">房屋状态: 冻结中</view>
								</view>
							</view>
						</view>
					</view>
					<view v-if="item.status === 0 || item.status === 1 || item.status === 3" class="ft">
						<u-tag :text="item.statusDesc" type="warning" plain plainFill />
						<view class="btn" @click="dellevyHouse(item.id)" v-if="item.status === 0">
							<view class="iconxy iconxy-Icon-shenqinghuizhen"></view>
							<view class="txt">删除申报</view>
						</view>
					</view>
					<view v-if="item.status === 2" class="ft statusBox">
						<u-tag :text="item.statusDesc + item.uniqueNo" type="warning" plain plainFill />
						<!-- <view class="btn" @click="doPay1(item)">
							<view class="iconxy iconxy-Icon-shenqinghuizhen"></view>
							<view class="txt">申请解冻</view>
						</view> -->
						<view class="btn view-btn" @click="viewProcess(item)">
							<view class="txt">查看申报进度</view>
						</view>
					</view>
					<view v-if="item.status === 4" class="ft statusBox">
						<u-tag :text="item.statusDesc" plain plainFill />
						<!-- <view class="btn" @click="doPay2(item)">
							<view class="iconxy iconxy-yiweixiu"></view>
							<view class="txt">补全{{getTag(item.id)}}</view>
						</view> -->
						<view class="btn view-btn" @click="viewProcess(item)">
							<view class="txt">查看申报进度</view>
						</view>
					</view>
					<view v-if="item.status === 5" class="ft statusBox">
						<u-tag :text="item.statusDesc" type="success" plain plainFill />
						<view v-if="item.isHouseCard==0" class="btn" @click="doPay3(item)">
							<view class="iconxy iconxy-yiweixiu"></view>
							<view class="txt">补办房屋产权证</view>
						</view>
						<view class="btn view-btn" @click="viewProcess(item)">
							<view class="txt">查看申报进度</view>
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
	import { enrollInList, levyDetaile, delLevy } from "@/api/house/house.js"
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
					{ id: 2, area: 227, name: '两室两厅' },
					{ id: 3, area: 329, name: '三室两厅' },
					{ id: 4, area: 580, name: '豪华别墅' }
				],
				dataList: [],
				onRow: {},
				show: false,
				tagList:[
					'房屋维修基金',
					'律师合同费',
					'国有土地契税',
					'房屋购置税',
				]
			}
		},
		onShow() {
		},
		methods: {
			getTag(id){
				let num = id.toString().substring(0,1)
				if(num<=3){
					return this.tagList[0]
				}
				if(num>3 && num<=5){
					return this.tagList[1]
				}
				if(num>5 && num<=7){
					return this.tagList[2]
				}
				if(num>7 && num<=9){
					return this.tagList[3]
				}
			},
			dellevyHouse(id){
				let that = this
				this.$modal.confirm('是否删除？','').then(res=>{
					delLevy(id).then(res=>{
						that.$refs.uToast.hide()
						that.queryList(1,10)
					})
				})
			},
			viewProcess(row){
				return this.$tab.navTo("/pages/house/process?id="+row.id)
			},
			doPay1(row) {
				this.$refs.uToast.loading('加载中...')
				
				const payParams = {
					id: row.id,
					money: 300,
					busiType: 200,
					actionName: '房屋申报',
					title: '房屋申报（房产解冻）',
					fee: '房产解冻',
					charge: '国房壹号物业部'
				}
				this.$tab.navTo(`/pages/common/defray?info=${JSON.stringify(payParams)}`)
			},
			doPay2(row) {
				this.$refs.uToast.loading('加载中...')
				let tag = this.getTag(row.id)
				const payParams = {
					id: row.id,
					money: 500,
					busiType: 201,
					actionName: '房屋申报',
					title: '房屋申报（'+tag+'）',
					fee: tag,
					charge: '国房壹号物业部'
				}
				this.$tab.navTo(`/pages/common/defray?info=${JSON.stringify(payParams)}`)
			},
			doPay3(row) {
				this.$refs.uToast.loading('加载中...')
				
				const payParams = {
					id: row.id,
					money: 500,
					busiType: 202,
					actionName: '房屋申报',
					title: '房屋申报（房屋产权费）',
					fee: '房屋产权费',
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
				
				const res = await enrollInList(params)
				
				this.$refs.uToast.hide()
				
				res.data.forEach(item => {
					item.houseInfo = this.houses.find(x => item.area == x.area) || {}
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
			.btn{
				margin-top:20rpx;
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
			&.view-btn{
				// background-image: linear-gradient(to top, #299ddb 50%, #58c5ff 100%);	
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
