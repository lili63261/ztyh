<template>
	<view >
		<uni-nav-bar class="uniNavBar" fixed :border="false" color="#ffffff" backgroundColor="#ffffff00" left-icon="left"
			@clickLeft="$tab.navigateBack()" />
		
		<view class="head">
			<image src="/static/images/life/title.jpg" mode="widthFix" />
		</view>
		
		<view class="main">
			<view class="box">
				<view class="hd">申请意向城市</view>
				<view class="bd" @click="regionShow = true; hideKeyboard()">
					<view class="left">
						<view class="iconxy iconxy-dizhi1"></view>
						<view v-if="region" class="pickerValue">
							<u--text :lines="1" :text="region" />
						</view>
						<view v-else class="pickerEmpty">请选择城市</view>
					</view>
					<view class="right">
						<u--text suffixIcon="arrow-right" align="right" size="28rpx" color="#db0002" iconStyle="color: #db0002;" text="更改城市" />
					</view>
				</view>
			</view>
			
			<view class="box">
				<view class="hd">申请意向开发商</view>
				<view class="bd" @click="brandShow = true; hideKeyboard()">
					<view class="left">
						<view class="iconxy iconxy-pinpaiguanli" style="font-size: 40rpx;"></view>
						<view v-if="brand" class="pickerValue">
							<u--text :lines="1" :text="brand" />
						</view>
						<view v-else class="pickerEmpty">请选择开发商</view>
					</view>
					<view class="right">
						<u--text suffixIcon="arrow-right" align="right" size="28rpx" color="#db0002" iconStyle="color: #db0002;" text="更改开发商" />
					</view>
				</view>
			</view>
			
			<view class="box">
				<view class="hd">申请模式</view>
				<view class="bd type">
					<view class="pickerBtn" @click="typeShow = true; hideKeyboard()">
						<view class="left">
							<view class="iconxy iconxy-leixing1" style="font-size: 34rpx;"></view>
							<view v-if="typeName" class="pickerValue">
								<u--text :lines="1" :text="typeName" />
							</view>
							<view v-else class="pickerEmpty">请选择申请模式</view>
						</view>
						<view class="right">
							<u--text suffixIcon="arrow-right" align="right" size="28rpx" color="#db0002" iconStyle="color: #db0002;" text="更改申请模式" />
						</view>
					</view>
					<view v-if="typeName" class="profile">
						<view class="profileTitle">{{ typeLabel }}身份信息</view>
						<view class="profileBox">
							<view class="item">
								<u--input
									v-model="profile.name"
									prefixIcon="account"
									:maxlength="6"
									:placeholder="`请输入${typeLabel}姓名`"
								/>
							</view>
							<view class="item">
								<u--input
									v-model="profile.idCard"
									prefixIcon="integral"
									type="idcard"
									:maxlength="18"
									:placeholder="`请输入${typeLabel}身份证号`"
								/>
							</view>
							<view class="item">
								<u--input
									v-model="profile.phone"
									prefixIcon="phone"
									type="number"
									:maxlength="11"
									:placeholder="`请输入${typeLabel}手机号`"
								/>
							</view>
						</view>
						<block v-if="typeOwnerShow">
							<view class="profileTitle">共同所有人身份信息</view>
							<view class="profileBox">
								<view class="item">
									<u--input
										v-model="ownerProfile.name"
										prefixIcon="account"
										:maxlength="6"
										placeholder="请输入共同所有人姓名"
									/>
								</view>
								<view class="item">
									<u--input
										v-model="ownerProfile.idCard"
										prefixIcon="integral"
										type="idcard"
										:maxlength="18"
										placeholder="请输入共同所有人身份证号"
									/>
								</view>
								<view class="item">
									<u--input
										v-model="ownerProfile.phone"
										prefixIcon="phone"
										type="number"
										:maxlength="11"
										placeholder="请输入共同所有人手机号"
									/>
								</view>
							</view>
						</block>
					</view>
				</view>
			</view>
			
			<view class="box">
				<view class="hd">申请意向户型</view>
				<view class="bd hx">
					
					<view v-for="item in houses" :key="item.id" class="item" :class="{ 'on': hxActive === item.id }" @click="changeHx(item)">
						<view class="inbox">
							<img :src="`/static/images/life/hx/${item.id}.jpg`" />
							<view v-if="hxActive === item.id" class="point">已选</view>
						</view>
					</view>
					
				</view>
			</view>
			
			<view v-if="hxActive" class="box">
				<view class="hd">已选户型</view>
				<view class="bd showPic">
					<image :src="`/static/images/life/room/${hxActive}.jpg`" mode="widthFix" />
					<view class="title">
						{{ region }} {{ houseName }} {{ houseArea }}㎡
					</view>
				</view>
			</view>
			
			<view v-if="hxActive > 3" class="box">
				<view class="hd">赠送代步小汽车</view>
				<view class="bd car">
					
					<view v-for="(item, index) in cars" :key="item.id" class="item" :class="{ 'on': carActive === index }" @click="changeCar(index)">
						<view class="inbox">
							<image :src="item.cover" mode="heightFix" :class="'pic' + index" />
							<view class="title">{{ item.title }}</view>
							<view v-if="carActive === index" class="point">已选</view>
						</view>
					</view>
					
				</view>
			</view>
			
			<view class="btn" @click="onSub()">
				<view class="iconxy iconxy-baocun"></view>
				<view class="txt">提交申请</view>
			</view>
			
		</view>
		
		<u-picker
			ref="regionPicker" 
			:show="regionShow" 
			:columns="columns" 
			keyName="name"
			confirmColor="#db0002"
			@cancel="regionShow = false"
			@confirm="regionConfirm" 
			@change="regionChange"
		/>
		 
		<u-picker
			:show="brandShow" 
			:columns="brandColumns" 
			confirmColor="#db0002"
			@cancel="brandShow = false"
			@confirm="brandConfirm"
		/>
		
		<u-picker
			ref="typePicker" 
			:show="typeShow" 
			:columns="typeColumns" 
			keyName="name"
			confirmColor="#db0002"
			@cancel="typeShow = false"
			@confirm="typeConfirm" 
			@change="typeChange"
		/>
		
	</view>
</template>

<script>
const regions = require('@/components/pick-regions/regions.json')
import { formatInt } from '@/utils/common.js'
import { cars } from '@/api/index.js'

export default {
	data() {
		return {
			regionShow: false,
			columns: [],
			columnData: [],
			region: '',
			brandShow: false,
			brandColumns: [['vanke万科','碧桂园','恒大地产','Greenland绿地地产','保利发展','SUNAC融创','华润置地','CFLD华夏幸福']],
			brand: '',
			typeShow: false,
			typeColumns: [[{ value: 0, name: '本人申请' }, { value: 1, name: '委托申请' }], [{ value: 0, name: '单独所有' }, { value: 1, name: '共同所有' }]],
			typeColumnData: [[{ value: 0, name: '单独所有' }, { value: 1, name: '共同所有' }], []],
			typeName: '',
			typeLabel: '本人',
			typeOwnerShow: false,
			type: undefined,
			houses: [
				{ id: 1, area: 138, name: '两室一厅', money: 199 },
				{ id: 2, area: 218, name: '两室两厅', money: 299 },
				{ id: 3, area: 329, name: '三室两厅', money: 399 },
				{ id: 4, area: 458, name: '四室三厅', money: 599 },
				{ id: 5, area: 580, name: '豪华别墅', money: 888 }
			],
			cars: [],
			hxActive: 0,
			houseArea: 0,
			houseName: '',
			houseMoney: 0,
			carActive: 0,
			carId: 0,
			profile: {
				name: '',
				idCard: '',
				phone: ''
			},
			ownerProfile: {
				name: '',
				idCard: '',
				phone: ''
			}
		}
	},
	onLoad() {
		cars().then(res => {
			this.cars = res.data
		})
	},
	onReady() {
		this.changeHx(this.houses[0])
		
		const provinces = []
		const citys = []
		
		regions.forEach((item, index) => {
			provinces.push(item.name)
			if (item.childs.length > 2) {
				citys.push(item.childs)
			} else {
				citys.push([])
			}
		})
		
		this.columns.push(provinces, [])
		this.columnData = citys
	},
	methods: {
		onSub() {
			if (!this.region) {
				return this.$refs.uToast.error('请选择申请意向城市')
			}
			if (!this.brand) {
				return this.$refs.uToast.error('请选择申请意向开发商')
			}
			if (this.type === undefined) {
				return this.$refs.uToast.error('请选择申请模式')
			}
			if (this.type === 1) {
				if (!this.profile.name) {
					return this.$refs.uToast.error('请输入委托人姓名')
				}
				if (!this.profile.idCard) {
					return this.$refs.uToast.error('请输入委托人身份证号')
				}
				if (!this.$u.test.idCard(this.profile.idCard)) {
					return this.$refs.uToast.error('请输入正确的身份证号')
				}
				if (!this.profile.phone) {
					return this.$refs.uToast.error('请输入委托人手机号')
				}
				if (!this.$u.test.mobile(this.profile.phone)) {
					return this.$refs.uToast.error('请输入正确的手机号')
				}
			}
			if (this.typeOwnerShow) {
				if (!this.ownerProfile.name) {
					return this.$refs.uToast.error('请输入共同所有人姓名')
				}
				if (!this.ownerProfile.idCard) {
					return this.$refs.uToast.error('请输入共同所有人身份证号')
				}
				if (!this.$u.test.idCard(this.ownerProfile.idCard)) {
					return this.$refs.uToast.error('请输入正确的身份证号')
				}
				if (!this.ownerProfile.phone) {
					return this.$refs.uToast.error('请输入共同所有人手机号')
				}
				if (!this.$u.test.mobile(this.ownerProfile.phone)) {
					return this.$refs.uToast.error('请输入正确的手机号')
				}
			}
			
			let pData = {
				houseArea: this.houseArea,
				houseRegion: this.region,
				type: this.type,
				name: this.profile.name,
				idCard: this.profile.idCard,
				phone: this.profile.phone,
				model: this.carId,
				money: formatInt(this.houseMoney, 2, true)
			}
			if (this.typeOwnerShow) {
				pData.busiParam = this.ownerProfile
			}

			this.$refs.uToast.loading('加载中...')
			const payParams = {
				busiParam: JSON.stringify(pData),
				money: this.houseMoney,
				busiType: 34,
				actionName: '爱心房屋',
				title: '我的爱心房屋申请',
				moneyLable: '申请保证金',
				fee: '爱心房屋申请保证金',
				charge: '成龙爱心基金会'
			}
			this.$tab.navTo(`/pages/common/defray?info=${JSON.stringify(payParams)}`)
			// this.$tab.redirectTo(`/pages/common/defray?info=${JSON.stringify(payParams)}`)
		},
		changeHx(row) {
			if (row.id > 3 && this.carActive === 0) {
				this.changeCar(0)
			}
			this.hxActive = row.id
			this.houseArea = row.area
			this.houseName = row.name
			this.houseMoney = row.money
		},
		changeCar(idx) {
			this.carId = this.cars[idx].id
			
			this.carActive = idx
			
			// this.$u.getRect('.pic0').then(res => {
			// 	console.log(res);
			// })
		},
		regionChange(e) {
			const {
				columnIndex,
				value,
				values, // values为当前变化列的数组内容
				index,
				// 微信小程序无法将picker实例传出来，只能通过ref操作
				picker = this.$refs.regionPicker
			} = e
			// 当第一列值发生变化时，变化第二列(后一列)对应的选项
			if (columnIndex === 0) {
				// picker为选择器this实例，变化第二列对应的选项
				picker.setColumnValues(1, this.columnData[index])
			}
		},
		regionConfirm(e) {
			this.region = e.value[0] + ' ' + (e.value[1] ? e.value[1].name : '')
			this.regionShow = false
		},
		brandConfirm(e) {
			this.brand = e.value[0]
			this.brandShow = false
		},
		typeChange(e) {
			const {
				columnIndex,
				value,
				values, // values为当前变化列的数组内容
				index,
				// 微信小程序无法将picker实例传出来，只能通过ref操作
				picker = this.$refs.typePicker
			} = e
			// 当第一列值发生变化时，变化第二列(后一列)对应的选项
			if (columnIndex === 0) {
				// picker为选择器this实例，变化第二列对应的选项
				picker.setColumnValues(1, this.typeColumnData[index])
			}
		},
		typeConfirm(e) {
			this.type = e.value[0].value
			let type = e.value[0].name
			if (e.value[0].value === 1) {
				this.typeLabel = '委托人'
				this.profile =  {
					name: '',
					idCard: '',
					phone: ''
				}
				this.typeOwnerShow = false
			} else {
				this.typeLabel = '本人'
				this.profile = {
					name: this.acc.name,
					idCard: this.acc.idCard,
					phone: this.adr.phone
				}
			}

			if (e.value[1]) {
				type += ' ' + e.value[1].name
				this.typeOwnerShow = e.value[1].value === 1 ? true : false
			}
			this.typeName = type
			this.typeShow = false
		},
		hideKeyboard() {
			uni.hideKeyboard()
		}
	}
}
</script>

<style lang="scss" scoped>
.uniNavBar {
	position: absolute;
	left: 0;
	top: 0;
	z-index: 2;
}
.head {
	image {
		display: block;
		width: 100%;
	}
}

.main {
	.box {
		margin: 20rpx 20rpx 40rpx 20rpx;
		.hd {
			padding-left: 20rpx;
			font-size: 32rpx;
			font-weight: bold;
		}
		.bd {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin: 20rpx 0;
			padding: 30rpx;
			border-radius: 30rpx;
			background: #fff;
			&.type {
				display: block;
				.profileTitle {
					margin-top: 30rpx;
					font-size: 30rpx;
				}
				.item {
					margin-top: 20rpx;
				}
			}
			.pickerBtn {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
			.left {
				display: flex;
				align-items: center;
			}
			.iconxy {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 50rpx;
				margin-right: 10rpx;
				font-size: 50rpx;
				color: #db0002;
			}
			.right {
				flex-basis: 200rpx;
			}
			&.hx {
				flex-wrap: wrap;
				justify-content: flex-start;
				margin-top: 10rpx;
				padding: 0;
				background: none;
				.item {
					width: 33%;
					.inbox {
						position: relative;
						margin: 10rpx;
						border-radius: 20rpx;
						border: 3px solid #fff;
						background: #fff;
						overflow: hidden;
						box-sizing: border-box;
						.point {
							position: absolute;
							top: 0;
							right: 0;
							padding: 6rpx 10rpx;
							border-radius: 0 0 0 15rpx;
							background: #db0002;
							color: #fff;
						}
					}
					img {
						display: block;
						max-width: 100%;
						max-height: 200rpx;
						margin: 0 auto;
						box-sizing: border-box;
					}
					&.on {
						.inbox {
							border: 3px solid #db0002;
						}
					}
				}
			}
			&.car {
				flex-wrap: wrap;
				justify-content: space-between;
				margin-top: 10rpx;
				padding: 0;
				background: none;
				.item {
					width: 49%;
					.inbox {
						position: relative;
						border-radius: 20rpx;
						border: 3px solid #fff;
						background: #fff;
						overflow: hidden;
						box-sizing: border-box;
						.point {
							position: absolute;
							top: 0;
							right: 0;
							padding: 6rpx 10rpx;
							border-radius: 0 0 0 15rpx;
							background: #db0002;
							color: #fff;
						}
						image {
							display: block;
							width: 100%;
							height: 240rpx;
						}
						.title {
							position: absolute;
							left: 0;
							bottom: 0;
							width: 100%;
							padding: 10rpx;
							text-align: center;
							background: rgba(255, 255, 255, .6);
							// font-size: 32rpx;
							font-weight: bold;
						}
					}
					&.on {
						.inbox {
							border: 3px solid #db0002;
						}
					}
				}
			}
			&.showPic {
				position: relative;
				.title {
					position: absolute;
					left: 30rpx;
					bottom: 30rpx;
					width: calc(100% - 60rpx);
					padding: 40rpx;
					background: rgba(255, 255, 255, .6);
					font-size: 32rpx;
					line-height: 45rpx;
				}
				image {
					display: block;
					width: 100%;
					border-radius: 20rpx;
				}
			}
		}
	}
	
	.btn {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 20rpx 20rpx 20rpx;
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
	}
}
</style>
