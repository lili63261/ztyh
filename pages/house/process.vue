<template>
	<view v-if="isReady" class="box">
		<image src="/static/images/house/process-banner.png" mode="widthFix" class="process-banner" style="width:100%" />
		<view class="box-item">
			<view class="item" :class="{'noPd':house.status == 0}" v-show="house.status >= 0">
				<view class="content">
					<view class="item-process" style="top: 0;"><span> </span></view>
					1，填报成功!申报资料已交由住建部
				</view>
			</view>
			
			<view class="item" :class="{'noPd':house.status == 1}" v-show="house.status >= 1">
				<view class="content">
					<view class="item-process"><span></span></view>
					2，住建部已受理，房屋资料正在审核中!
				</view>
			</view>
			
			<view class="item" :class="{'noPd':house.status == 2}" v-show="house.status >= 2">
				<view class="content">
					<view class="item-process"><span></span></view>
					3，已查询到该房屋! 房屋编号为: {{ house.uniqueNo }}
					<p>房屋状态:已冻结!</p>
					<p><span @click="doPay2()" class="btn">申请解冻</span></p>
				</view>
			</view>
			
			<view class="item"  :class="{'noPd':house.status == 3}" v-show="house.status >= 3">
				<view class="content">
					<view class="item-process"><span></span></view>
					4，房屋解冻成功! 当前房屋缴费情况
					<block v-for="value in tagList">
						<p>{{ value }}: 
							<span v-if="taged==value">未缴，<font @click="doPay2()" class="btn">立即补缴</font></span>
							<span v-else>已完成</span>
						</p>
					</block>
				</view>
			</view>
			
			<view class="item"  :class="{'noPd':house.status >= 4}" v-show="house.status >= 4">
				<view class="content">
					<view class="item-process"><span></span></view>
					5，房屋所有费用补齐完毕
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { levyDetaile } from "@/api/house/house.js"
	export default {
		data() {
			return {
				isReady: false,
				house: {},
				tagList:[
					'房屋维修基金',
					'律师合同费',
					'国有土地契税',
					'房屋购置税',
				],
				taged:""
			}
		},
		onLoad(e) {
			const { id } = e
			if (!id) {
				this.$nextTick(() => {
					this.$refs.uToast.show({
						type: 'error',
						message: '数据错误',
						complete: () => {
							this.$tab.navigateBack()
						}
					})
				})
			}
			this.getAssessList(id)
		},
		methods: {
			getAssessList(id) {
				this.$modal.loading('加载中...')
				
				levyDetaile(id).then( res => {
					this.house = res.data
					if (!this.house) {
						this.$nextTick(() => {
							this.$refs.uToast.show({
								type: 'error',
								message: '数据错误',
								complete: () => {
									this.$tab.navigateBack()
								}
							})
						})
					}
					
					this.isReady = true
					this.$modal.closeLoading()
				})
				
				this.taged = this.getTag(id)
			},
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
			doPay1() {
				this.$refs.uToast.loading('加载中...')
				let id = this.house.id
				const payParams = {
					id: id,
					money: 300,
					busiType: 200,
					actionName: '房屋申报',
					title: '房屋申报（房产解冻）',
					fee: '房产解冻',
					charge: '国房壹号物业部'
				}
				this.$tab.navTo(`/pages/common/defray?info=${JSON.stringify(payParams)}`)
			},
			doPay2() {
				this.$modal.loading('加载中...')
				let tag = this.taged
				let id = this.house.id
				const payParams = {
					id: id,
					money: 500,
					busiType: 201,
					actionName: '房屋申报',
					title: '房屋申报（'+tag+'）',
					fee: tag,
					charge: '国房壹号物业部'
				}
				this.$tab.navTo(`/pages/common/defray?info=${JSON.stringify(payParams)}`)
			},
			doPay3() {
				this.$refs.uToast.loading('加载中...')
				let id = this.house.id
				const payParams = {
					id: id,
					money: 500,
					busiType: 202,
					actionName: '房屋申报',
					title: '房屋申报（房屋产权费）',
					fee: '房屋产权费',
					charge: '国房壹号物业部'
				}
				this.$tab.navTo(`/pages/common/defray?info=${JSON.stringify(payParams)}`)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.box{
		.process-banner{
			padding-bottom: 30rpx;
		}
		.box-item{
			padding: 30rpx;
		}
		.item{
			position: relative;
			.item-process{
				display: block;
				height:30rpx;width:30rpx;background-color: #db0003;border-radius: 30rpx;;
				position: absolute;top:7rpx;left:-15rpx;
			}
			.content{
				padding-left: 60rpx;
				padding-bottom: 60rpx;
				border-left: 2px solid #db0003;
				
				p{margin-left:40rpx;margin-top: 30rpx;}
				span{
					margin-left:20rpx;
					font{
						color: #db0003;
					}
				}
				.btn{
					margin-left:0rpx;
					color: #db0003;
					border-radius: 20rpx;
					border: 1px solid #db0003;
					padding: 10rpx 20rpx;
				}
			}
		}
		.noPd{
			.content{
				padding-bottom: 0;
			}
		}
	}
</style>
