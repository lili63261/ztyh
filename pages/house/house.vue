<template>
	<view class="ibg">
		<image src="@/static/images/house/top-banner.jpg" mode="widthFix" style="width:100%"></image>
		<view class="view-total-info">
			<view>我的房产申报：<font>{{totalrow}}</font> 套</view>
			<span @click='$tab.navTo("/pages/house/list")'>查看申报</span>
		</view>
		<view class="form-item">
			<view class="label">申报房屋地区(名下已购但尚未入住的房屋所在地区)</view>
			<view class="item-list">
				<block v-for="(name,index) in houseInfoList.dist">
					<span  @click="setModelValue('dist',index)" :class="{active:model.dist==index}">{{ name }}</span>
				</block>
			</view>
		</view>
		<view class="form-item">
			<view class="label">参与项目类别</view>
			<view class="item-list">
				<block v-for="(name,index) in houseInfoList.category">
					<span  @click="setModelValue('category',index)" :class="{active:model.category==index}">{{ name }}</span>
				</block>
			</view>
		</view>
		<view class="form-item">
			<view class="label">房屋面积</view>
			<view class="item-list">
				<block v-for="(item,index) in houseInfoList.area">
					<span  @click="setModelValue('area',index)" :class="{active:model.area==index}">{{ item.name }}</span>
				</block>
			</view>
		</view>
		<view class="form-item">
			<view class="label">是否取得房产证</view>
			<view class="item-list">
				<span :class="{active:model.ishaveHouseCert==1}" @click="setModelValue('ishaveHouseCert',1)">是</span>
				<span :class="{active:model.ishaveHouseCert==0}" @click="setModelValue('ishaveHouseCert',0)">否</span>
			</view>
		</view>
		
		<view class="btn" @click="onSub()">
		  <view class="iconxy iconxy-baocun"></view>
		  <view class="txt">提交申请</view>
		</view>
	</view>
</template>

<script>
	import { addHouse, enrollInList } from "@/api/house/house.js"
	export default {
		data() {
			return {
				houseInfoList: {
					dist:[
						"雄安新区(专办)","海南特区(专办)",'大湾区','华东地区','西北地区','华南地区'
					],
					category:[
						'云数贸系列','智天系列','华泰系列','其他系列'
					],
					area:[
						{name:'100 - 200m²',value:138},
						{name:'200 - 300m²',value:227},
						{name:'300 - 400m²',value:329},
						{name:'400 - 700m²',value:580}
					]
				},
				model:{
					dist:0,
					category:0,
					area:0,
					ishaveHouseCert:0,
				},
				totalrow:0,
			}
		},
		onLoad() {
			if (this.isAcc) {
				this.model.name = this.acc.name
				this.model.idCard = this.acc.idCard
			}
			this.model.phone = this.$store.getters.phone
		},
		onShow() {
			enrollInList(1,1000).then(res=>{
				this.totalrow = res.data.length
			})
		},
		methods: {
			setModelValue(key,value){
				this.model[key] = value
			},
			onSub(){
				this.$refs.uToast.loading('正在加载...')
				let paramData = {
					name:	this.model.name,
					phone:	this.model.phone,
					idCard:	this.model.idCard,
					houseRegion:	this.houseInfoList.dist[this.model.dist],
					type:	this.houseInfoList.category[this.model.category],
					area:	this.houseInfoList.area[this.model.area]['value'],
					isHouseCard:this.model.ishaveHouseCert,
				}
				
				let that = this
				addHouse(paramData).then(res=>{
					that.$refs.uToast.hide()
					that.$refs.uToast.show({
					  type: 'success',
					  message: '填报成功，平台审核中！',
					  complete: () => {
						  that.$tab.navTo("/pages/house/list")
					  }
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.ibg{
		padding-bottom: 60rpx;
		.view-total-info{
			background-color: #ffd79dad;
			font-weight: bold;
			padding:10px;
			display: flex;align-items: center;
			justify-content: space-between;
			font{
				color: #bf1f07;
			}
			span{
				color: #bf1f07;
				padding: 3px 10px;
				border-radius: 5px;
				border: 1px solid #bf1f07;
			}
		}
	}
	.form-item{
		.label{
			font-weight: bold;
			padding:10px;
		}
		.item-list{
			padding:0 10px;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			background-color: #fff;
			span{
				background-color:#f5f5f5;
				color:#333;border-radius: 20px;
				height: 35px;line-height: 35px;
				padding:0 20px;
				margin: 10px;
				&.active{
					background-color:#bf1f07;color:#fff;
				}
			}
		}
		
	}
	
	.btn {
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  margin:60rpx;
	  padding: 25rpx;
	  text-align: center;
	  border-radius: 30rpx;
	  font-weight: bold;
	  font-size: 30rpx;
	  background-image: linear-gradient(90deg, #bf1f07 50%, #fa2508);
	  color: #fff;
	
	  .iconxy {
	    margin-right: 10rpx;
	    font-size: 40rpx;
	  }
	}
</style>