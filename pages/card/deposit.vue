<template>
	<view class="ibg">
		<view class="header">
			<image src="@/static/images/card/htv-bg-1.png" mode="widthFix"></image>
			<view class="txt">
				1、由国务院牵头联合民政部、财政部向困难群众统一发放的生活补助。<br/>
				2、此款项为专款专用，不得用于其他投资，理财，转借他人等违规操作。<br/>
				3、平台客服及国务院工作人员务必严格审核使用者，规范资金使用去向！<br/>
				3、经核查资金使用如有违规者，没收已发补助金。一切解释权由国房壹号所有。
			</view>
		</view>
		<view class="formbox">
			<!-- <view class="formtitle">第一届国务联合入住大会</view> -->
			<view class="box info">
				<view class="hd">个人信息</view>
				<view class="bd">
					<u--form
					    ref="uForm"
					    labelPosition="top"
					    labelWidth="30%"
					    :model="model"
					>
					<u-form-item
					    label="姓名"
					    prop="name"
					    borderBottom
						labelPosition="left"
					>
					  <u--input v-model="model.name" :readonly="true" border="none"/>
					</u-form-item>
					<u-form-item
					    label="电话"
					    prop="phone"
					    borderBottom
						labelPosition="left"
					>
					  <u--input v-model="model.phone" type="number" :readonly="true" border="none"/>
					</u-form-item>
					<u-form-item
					    label="身份证号"
					    prop="idCard"
					    borderBottom
						labelPosition="left"
					>
					  <u--input v-model="model.idCard" type="idcard" :readonly="true" border="none"/>
					</u-form-item>
					<u-form-item
					    label="贫困户号"
					    prop="pNo"
					    borderBottom
						labelPosition="left"
					>
					  <u--input v-model="model.pNo" type="number" placeholder='请输入贫困户号' :readonly="realAudit==2" border="none"/>
					</u-form-item>
				</u--form>
				
					<button class="btn" @click="submitForm()" v-if="realAudit==0">确定</button>
					<button class="btn" @click="goTake()" v-if="realAudit==2">贫困档案校验通过，可提现补助金</button>
					<view class="watermark" v-if="realAudit == 0">未校验</view>
					<view class="watermark orange" v-if="realAudit == 1">校验中</view>
					<view class="watermark green" v-if="realAudit == 2">校验通过</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { houseList,checkLevyCard } from "@/api/card/card.js"
	export default {
		data() {
			return {
				model: {
				  name: '',
				  idCard: '',
				  phone: '',
				  pNo: '',
				},
				realAudit:0
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
						this.realAudit = result.realState
						this.model.name = result.name
						this.model.phone = result.phone
						this.model.idCard = result.idCard
						if(this.realAudit > 0){
							this.model.pNo = result.uniqueNo
						}
					}
				})
			},
			submitForm(){
				this.$refs.uToast.loading('正在加载...')
				if(!this.model.pNo){
					this.$refs.uToast.hide()
					return this.$refs.uToast.error('请输入贫困户号')
				}
				checkLevyCard(this.model.pNo).then(res=>{
					this.$refs.uToast.hide()
					this.$refs.uToast.show({
					  type: 'success',
					  message: '所填写信息正确，平台校验中！',
					  complete: () => {
					     // this.$tab.navTo('/pages/card/info')
						 this.checkIsApply()
					  }
					})
				})
			},
			goTake(){
				this.$tab.navTo('/pages/user/take?type=deposit')
			}
		}
	}
</script>

<style scoped lang="scss">
.ibg{
	width:100%;
	overflow-x: hidden;
	min-height: 500px;
	background: linear-gradient(180deg, #408BFB 0%, #54B8FF 99.99%);
	.header{
		width:100%;
		min-height: 300px;
		background-color:#408BFB;
		position: relative;
		image{
			width:100%
		}
		.txt{
			padding:60rpx 100rpx 60rpx 60rpx;
			color:#fff;
			font-size: 30upx;
			position: absolute;
			top:23%;
		}
	}
	
	.formbox{
		margin: 20rpx;
		border-radius: 16rpx;
		padding: 0 20rpx;
		border-radius: 30rpx;
		background: #fff;
		padding-bottom:60rpx;
		position: relative;
		.formtitle{
			text-align: center;
			padding: 50rpx;
			padding-bottom: 0;
			font-size:40upx;
			color: #408BFB;
			font-weight: bold;
		}
		.box {
			padding-top:20rpx;
			
		  .hd {
			position: relative;
			margin:20rpx;
			margin-left: 0;
			padding-left:20rpx;
			font-size: 32rpx;font-weight: bold;
			color: #408BFB;
			border-left: 3px solid #408BFB;
		  }
		  .btn{
		  	margin-top: 30rpx ;
		  	margin-top:60rpx;
		  	border:0;
		  	background: linear-gradient(180deg, #408BFB 0%, #54B8FF 99.99%);
		  	color:#fff;
		  	border-radius: 23px;
		  }
		}
		
		.watermark {  
			position: absolute;  
			top: 40%;  
			left: 39%;  
			transform: translate(-50%, -50%) rotate(-30deg);  
			opacity: 0.3;  
			font-size: 3rem;  
			font-weight: bold;  
			color: rgba(0, 0, 0, 0.5);  
			pointer-events: none; /* 使水印不影响其他元素的点击事件 */  
			user-select: none;    /* 防止水印文本被选中 */  
			&.orange{
				color: rgba(245, 108, 108, 0.7);
			}
			&.green{
				color: rgba(57, 181, 73, 0.7);
			}
		}  
	}
		
}
</style>
