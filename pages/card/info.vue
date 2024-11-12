<template>
	<view class="ibg">
		<uni-nav-bar class="uniNavBar" title="" :border="false" color="#000" backgroundColor="#fff"
					left-icon="left" @clickLeft="$tab.navigateBack()" />
		<!-- <image src="@/static/images/card/infobg.jpg" mode="widthFix" style="width:100%" /> -->
		<view class="itable">
			<view class="itableborder">
				<view class="title">人员档案</view>
				<view class="body">
					<view class="row">
						<span class="right">姓名</span>
						<span class="txt-eli2">{{ model.name }}</span>
					</view>
					<view class="row">
						<span class="right">电话</span>
						<span>{{ model.phone }}</span>
					</view>
					<view class="row">
						<span class="right">身份证</span>
						<span>{{ model.idCard }}</span>
					</view>
					<view class="row">
						<span class="right">贫困户号</span>
						<span>{{ model.uniqueNo }}</span>
					</view>
					
					<view class="row">
						<span class="right">贫困户评级</span>
						<span>{{ level[levelKey] }}</span>
					</view>
					<view class="row">
						<span class="right">年度救治金额</span>
						<span>{{ money[levelKey]  }}</span>
					</view>
				</view>
				<view class="info-wrap">
					<view class="info">
						<view class="alt">档案纪要：</view>
						<view class="desc">
							<p>家庭成员：{{model.affiliate}}</p>
							<p>身体状况：{{model.bodyH}}</p>
							<p>政治面貌：{{model.zhengzhi}}</p>
							<p>文化程度：{{model.wenhua}}</p>
							<p>住房情况：{{model.zhufang}}</p>
						</view>
					</view>
					<p class="tip">档案管理政策，接受相关监督</p>
				</view>	
				<view class="fly"><image src="@/static/images/card/ym.png"></image></view>
			</view>
		</view>
		<view class="ifooter"></view>
	</view>
</template>

<script>
	import { houseList } from "@/api/card/card.js"
	export default {
		data() {
			return {
				model:{
					name:"",
					uniqueNo:"",
					phone:"",
					idCard:"",
				},
				fuzai:['5万以下','5万-10万','10万-20万','20万-50万','50万-100万','100万以上'],
				level:['一级','二级','三级','四级','五级'],
				money:['五万','十万','二十万','三十万','五十万'],
				levelKey:0,
			}
		},
		onLoad() {
			this.checkIsApply()
		},
		methods: {
			checkIsApply(){
				houseList().then(res=>{
					console.log(res)
					let result = res.data
					if(result){
						this.model.name = result.name
						this.model.uniqueNo  = result.uniqueNo
						this.model.phone  = result.phone
						this.model.idCard  = result.idCard
						
						this.model.affiliate = result.affiliate
						this.model.bodyH = result.conditions
						this.model.wenhua = result.culture
						this.model.zhufang = result.dwelling
						this.model.fuzai = result.liabilities
						this.model.shouru  = result.money
						this.model.zhengzhi  = result.politics
						
						this.levelKey = this.fuzai.indexOf(this.model.fuzai)
						this.levelKey = this.levelKey > 4?4:this.levelKey
						console.log(this.levelKey,'levelKey')
					}
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.uniNavBar{position:absolute; top:0;left:0;width:76px}
	.ibg{
		background: url("@/static/images/card/body-bg.png") no-repeat;
		background-size: cover;
	}
	.itable{
		margin:30rpx;
		margin-top: 0;
		// position: absolute;
		// top:0;width:100%;
		background: url("@/static/images/card/bg-v1.png") no-repeat;
		background-size:130%;
		background-position:top;
		.itableborder{
			padding:30rpx;
		}
		.title{
			padding-top:90px;
			font-size: 60upx;
			text-align: center;
			font-weight: bold;
			color:#666;
		}
		.body{
			margin-top:30rpx;
			border:1px solid #ddd;
			.row{
				border-bottom:1px solid #ddd;
				display: flex;flex-direction: row;flex-wrap: nowrap;
				height: 40px;line-height: 40px;
				span{
					padding-left:20px;width:70%;
					&.right{text-align: right;padding-left: 0;width:30%;}
				}
				&:last-child{border:0;}
			}
		}
		.info-wrap{
			// min-height: 300px;
			background-color: #fefdfb;
			padding-bottom: 20px;
			.info{
				border:1px solid #ddd;
				.alt{
					font-size: 40upx;
					font-weight: bold;
					padding:30rpx;
					color:#666;
				}
				.desc{
					padding:30rpx;
					padding-top:0rpx;
					p{margin-bottom: 10px;}
				}
			}
			.tip{text-align: center;font-size:30upx;font-weight: bold;margin-top:20rpx;}
		}
		.ifooter{}
		.fly{position: absolute;right:0;bottom:0;width:30%}
	}
</style>
