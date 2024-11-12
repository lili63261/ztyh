<template>
	<view class="ibg">
		<view class="header">
			<image src="@/static/images/card/htv3.png" mode="widthFix"></image>
		</view>
		<view class="formView">
			<view class="form">
				<view class="altform">
					<view class="alt">建档信息</view><span class="triangle"></span>
					<view class="statusDesc green" v-show="isAudit > 1">{{ statusDesc }}</view>
				</view>
				<view class="watermark" v-show="isAudit == 1">{{ statusDesc }}</view>
				<view class="formwrap">
					
					<view class="form-item" v-if="isAudit > 1">
						<view class="label">贫困户号：</view>
						<u--input :disabled="true" border="none" class="form-input" :value="pNo">
							<template slot="suffix">
								<!-- <u-icon name="file-text" @click="copytext" size="60rpx" color="#000"></u-icon> -->
								<span class="cp" style="padding-right: 10px;">复制</span>
							</template>
						</u--input>
					</view>
					
					<view class="form-item">
						<view class="label">家庭成员：</view>
						<input v-model="model.name" border="none" class="form-input" placeholder="请输入家庭成员信息" :disabled = "isAudit > 0" />
					</view>
					
					<view class="form-item">
						<view class="label">家庭年收入：</view>
						<view class="itemList">
							  <u-radio-group
								v-model="model.shouru"
								placement="column"
								name="shouru"
								:disabled="isAudit > 1"
							  >
								<u-radio
								  :customStyle="{marginBottom: '8px'}"
								  v-for="(name, index) in formList.shouru"
								  :key="index"
								  :label="name"
								  :name="index"
								  @change="radioChange"
								>
								</u-radio>
							  </u-radio-group>
						</view>
					</view>
					
					<view class="form-item">
						<view class="label">负债情况：</view>
						<view class="itemList">
							  <u-radio-group
								v-model="model.fuzai"
								placement="column"
								name="fuzai"
								:disabled="isAudit > 1"
							  >
								<u-radio
								  :customStyle="{marginBottom: '8px'}"
								  v-for="(name, index) in formList.fuzai"
								  :key="index"
								  :label="name"
								  :name="index"
								  @change="radioChange"
								>
								</u-radio>
							  </u-radio-group>
						</view>
					</view>
					
					<view class="form-item">
						<view class="label">身体状况：</view>
						<view class="itemList">
							  <u-radio-group
								v-model="model.bodyH"
								placement="column"
								name="bodyH"
								:disabled="isAudit > 1"
							  >
								<u-radio
								  :customStyle="{marginBottom: '8px'}"
								  v-for="(name, index) in formList.bodyH"
								  :key="index"
								  :label="name"
								  :name="index"
								  @change="radioChange"
								>
								</u-radio>
							  </u-radio-group>
						</view>
					</view>
					<!-- :disabled = "isAudit > 0" -->
					<view class="form-item">
						<view class="label">政治面貌：</view>
						<view class="itemList">
							  <u-radio-group
								v-model="model.zhengzhi"
								placement="column"
								name="zhengzhi"
								:disabled="isAudit > 1"
							  >
								<u-radio
								  :customStyle="{marginBottom: '8px'}"
								  v-for="(name, index) in formList.zhengzhi"
								  :key="index"
								  :label="name"
								  :name="index"
								  @change="radioChange"
								>
								</u-radio>
							  </u-radio-group>
						</view>
					</view>
					
					<view class="form-item">
						<view class="label">文化程度：</view>
						<view class="itemList">
							  <u-radio-group
								v-model="model.wenhua"
								placement="column"
								@change="radioChange"
								name="wenhua"
								:disabled="isAudit > 1"
							  >
								<u-radio
								  :customStyle="{marginBottom: '8px'}"
								  v-for="(name, index) in formList.wenhua"
								  :key="index"
								  :label="name"
								  :name="index"
								  @change="radioChange"
								>
								</u-radio>
							  </u-radio-group>
						</view>
					</view>
					
					<view class="form-item">
						<view class="label">住房情况：</view>
						<view class="itemList">
							  <u-radio-group
								v-model="model.zhufang"
								placement="column"
								name="zhufang[]"
								@change="groupChange"
								:disabled="isAudit > 1"
							  >
								<u-radio
								  :customStyle="{marginBottom: '8px'}"
								  v-for="(name, index) in formList.zhufang"
								  :key="index"
								  :label="name"
								  :name="index"
								  @change="radioChange"
								>
								</u-radio>
							  </u-radio-group>
						</view>
					</view>
					
					<button class="btn" @click="submitForm()" v-if="isAudit==0">立即提交</button>
					
					<view class="btn-group" v-if="pId > 0">
						<button class="btn orange-btn" @click="delTake()" v-show="isAudit==1 && pId > 0">重新编辑档案信息</button>
						<button class="iconxy iconxy-zhonglei btn view-btn" @click="toInfo()"  v-show="isAudit==2">查看档案信息</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { addLevyCard , houseList, delLevyCard } from "@/api/card/card.js"
	
	export default {
		data() {
			return {
				model:{
					name:"",
					shouru:0,
					fuzai:0,
					bodyH:0,
					zhengzhi:0,
					wenhua:0,
					zhufang:0,
					truename:"",
					idCard:"",
				},
				formList:{
					shouru:['5万以下','5万-10万','10万-20万','20万以上'],
					fuzai:['5万以下','5万-10万','10万-20万','20万-50万','50万-100万','100万以上'],
					bodyH:['健康','基本健康','慢性病','重大疾病'],
					zhengzhi:['共青团员','群众','民主党派成员','无党派人士'],
					wenhua:['小学','初中','高中','大学'],
					zhufang:['租房','宅基地自建房','商品房']
				},
				pId:0,  // 0 未提交 1 审核中 2 已通过
				isAudit:0,  // 0 未提交 1 审核中 2 已通过
				statusDesc:"",
				pNo:""
			}
		},
		onLoad(e) {
			// console.log(this.$store.getters.phone)
			if (this.isAcc) {
				this.model.truename = this.acc.name
				this.model.idCard = this.acc.idCard
			}
		},
		onShow() {
			this.checkIsApply()
		},
		methods: {
			checkIsApply(){
				let that = this
				houseList().then(res=>{
					console.log(res)
					let result = res.data
					if(result){
						that.statusDesc = result.statusDesc
						that.pId = result.id
						that.pNo = result.uniqueNo
						
						that.model.name = result.affiliate
						that.model.bodyH = that.formList.bodyH.indexOf(result.conditions)
						that.model.wenhua = that.formList.wenhua.indexOf(result.culture)
						that.model.zhufang = that.formList.zhufang.indexOf(result.dwelling)
						that.model.fuzai = that.formList.fuzai.indexOf(result.liabilities)
						that.model.shouru  = that.formList.shouru.indexOf(result.money)
						that.model.zhengzhi  = that.formList.zhengzhi.indexOf(result.politics)
						
						that.isAudit = result.status + 1
						console.log("model",that.model)
					}
				})
			},
			resetApply(){
				this.model.name = ""
				this.model.shouru = 0
				this.model.fuzai = 0
				this.model.bodyH = 0
				this.model.zhengzhi = 0
				this.model.wenhua = 0
				this.model.zhufang = 0
				
				this.pId = 0  // 0 未提交 1 审核中 2 已通过
				this.isAudit = 0   // 0 未提交 1 审核中 2 已通过
				this.statusDesc = ""
				this.pNo = ""
			},
			groupChange(e){
				console.log("groupChange",e)
			},
			radioChange(e){
				console.log("radioChange",e)
			},
			submitForm(){
				this.$refs.uToast.loading('正在加载...')
				if (!this.model.name) {
					this.$refs.uToast.hide()
					return this.$refs.uToast.error('请输入家庭成员信息')
				}
				let param = {
					affiliate:this.model.name,
					conditions:this.formList.bodyH[this.model.bodyH],
					culture:this.formList.wenhua[this.model.wenhua],
					dwelling:this.formList.zhufang[this.model.zhufang],
					liabilities:this.formList.fuzai[this.model.fuzai],
					money:this.formList.shouru[this.model.shouru],
					politics:this.formList.zhengzhi[this.model.zhengzhi],
					name:this.model.truename,
					phone:this.$store.getters.phone,
					idCard: this.model.idCard,
				}
				let that = this
				addLevyCard(param).then(res=>{
					that.$refs.uToast.hide()
					
					that.$refs.uToast.show({
					  type: 'success',
					  message: '所填写信息正确，平台审核中！',
					  complete: () => {
					     // this.$tab.navTo('/pages/card/info')
						 that.isAudit = 1
						 that.checkIsApply()
					  }
					})
				})				
			},
			toInfo(){
				this.$tab.navTo('/pages/card/info')
			},
			delTake(){
				// this.$tab.navTo('/pages/card/deposit')
				let that = this
				this.$modal.confirm('是否重新编辑档案信息','').then(res=>{
					delLevyCard(that.pId).then(res=>{
						that.$refs.uToast.hide()
						that.resetApply()
					})
				})
			},
			copytext(){
				console.log("复制")
				let text = this.pNo
				uni.setClipboardData({
					data: text,
					showToast: false,
					success: () => {
						this.$refs.uToast.success('贫困户号复制成功')
					}
				})
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
			
			image{
				width:100%
			}
			.txt{
				
				padding:40rpx;
				color:#fff;
			}
		}
		.formView{
			background-image: url('@/static/images/card/f-bg.png');
			background-position: left bottom;
			padding-bottom: 100rpx;
		}
		
		.watermark {
			position: absolute;  
			top: 70%;  
			left: 39%;  
			transform: translate(-50%, -50%) rotate(-30deg);  
			opacity: 0.3;  
			font-size: 2rem;  
			font-weight: bold;  
			color: rgba(255, 0, 0, 0.7);  
			pointer-events: none; /* 使水印不影响其他元素的点击事件 */  
			user-select: none;    /* 防止水印文本被选中 */
			&.green{
				color:rgba(0,128,0, 0.7)
			}
			
		}  
	}
	
	.form{
		padding:0 40rpx;
		.altform{
			display: flex;
			justify-content: flex-start;
			.alt{
				background-color: #fff;
				display:inline-block;
				height:50px;line-height: 50px;;
				border-top-left-radius: 30rpx;
				border-top-right-radius: 1rpx;
				padding:0 30rpx;
				font-size:40upx;
				font-weight: bold;
			}
			.triangle {
				position: relative;
				width: 0;  
				height: 0;  
				border-bottom: 51px solid #fff; /* 高度和颜色 */  
				border-right: 50px solid transparent; /* 右边框透明，形成直角 */  
				border-left:1px solid #fff; /* 可选，但有助于明确左边框不被使用 */ 
			}
			
			.statusDesc{
				line-height: 50px;
				font-size:40upx;
				color:red;
				padding-left:30rpx;
			}
			.green{
				color:green;
			}
		}
		.formwrap{
			padding:30rpx;
			margin: auto;
			width:100%;
			background-color: #fff;
			border-radius: 30rpx;
			border-top-left-radius: 0;
			.form-item{
				margin-bottom: 30rpx;
				.label{
					font-weight: bold;line-height: 40px;font-size:30upx;
				}
				.form-input{
					border: 1px solid #BBBBBB;
					gap: 0px;height:40px;line-height: 40px;;
					border-radius: 8px;text-indent:15px;;
				}
				
				.itemList{
					border: 1px solid #BBBBBB;
					border-radius: 8px;
					.u-radio{
						height:40px;line-height: 40px;padding-left:15px;;
						border-bottom: 1px solid #BBBBBB;font-weight: bold;
						&:last-child{
							border: none;
						}
					}
				}
			}
			.btn{
				margin: 30rpx auto;
				margin-top:60rpx;
				border:0;
				background: linear-gradient(180deg, #408BFB 0%, #54B8FF 99.99%);
				color:#fff;width:80%;
				border-radius: 23px;
			}
			.btn-group{
				.btn{
					position: fixed;bottom:60px;
				}
				width:100%;
				display: flex;
				flex-flow: row;
				justify-content: space-around;
				.orange-btn{
					background-image: linear-gradient(to top, #ff8a66 50%, #ffcc80 100%);
				}
			}
			.fixed-view-btn{
				position: fixed;right:3px;bottom:20%;
				width:30px;white-space: normal;text-align: center;color:#fff;
				padding:10px 0;
				line-height: 100%;
				background-color: #ffc579;
			}
		}
	}
</style>