<template>
	<view class="ibg">
		<!-- <uni-nav-bar class="uniNavBar" fixed :border="false" color="#ffffff" backgroundColor="#ffffff00" left-icon="left"
			@clickLeft="$tab.navigateBack()" /> -->
		<view class="btnBox">
			<view class="btn" @click="$tab.navTo('/pages/life/form')">
				<view class="iconxy iconxy-heart"></view>
				<view class="txt">申请安置房</view>
			</view>
			
			<!-- <view class="btn" @click="$tab.navTo('/pages/life/house')">
				<view class="iconxy iconxy-heart"></view>
				<view class="txt">房屋申报</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
.ibg {
	position: relative;
	min-height: calc(100vh - 44px);
	background: url('/static/images/life/hbg.jpg') top center no-repeat;
	background-size: cover;
}
.btnBox {
	position: absolute;
	left: 0;
	bottom: 30rpx;
	width: 100%;
	.btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 80%;
		margin: 50rpx auto;
		padding: 25rpx 0;
		text-align: center;
		border-radius: 30rpx;
		font-weight: bold;
		font-size: 30rpx;
		background-image: linear-gradient(to top, #e0b18b 50%, #fff7dc 100%);
		color: #714800;
		.iconxy {
			margin-right: 10rpx;
			font-size: 40rpx;
		}
	}
}
</style>
