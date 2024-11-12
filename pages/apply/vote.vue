<template>
	<view>
		<view v-if="Object.keys(vote).length > 0" class="box">
			<img src="/static/images/apply/quan.jpg" />
			<view class="txt no1">{{ vote.no }}</view>
			<view class="txt no2">{{ vote.no }}</view>
			<view class="txt pai">{{ vote.pai }}</view>
			<view class="txt hao">{{ vote.hao }}</view>
		</view>
	</view>
</template>

<script>
	import { travelTicket } from '@/api/index.js'
	
	export default {
		data() {
			return {
				vote: {}
			}
		},
		onReady() {
			this.getTravelTicket()
		},
		methods: {
			getTravelTicket() {
				this.$refs.uToast.loading('正在加载...')
				
				travelTicket().then(res => {
					if (res.data.busiParam) {
						this.vote = JSON.parse(res.data.busiParam)
					}
					
					this.$refs.uToast.hide()
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.box {
	position: relative;
	margin: 20rpx;
	img {
		display: block;
		width: 100%;
	}
	.txt {
		position: absolute;
		writing-mode: vertical-rl;
	}
	.no1 {
		top: 1390rpx;
		right: 40rpx;
		font-size: 44rpx;
		font-weight: 300;
		color: #f4c283;
	}
	.no2 {
		bottom: 88rpx;
		right: 110rpx;
		font-size: 36rpx;
		font-weight: 300;
		color: #e6d397;
	}
	.pai {
		left: 125rpx;
		bottom: 310rpx;
		font-size: 40rpx;
		color: #f7da62;
	}
	.hao {
		left: 125rpx;
		bottom: 146rpx;
		font-size: 40rpx;
		color: #f7da62;
	}
}
</style>
