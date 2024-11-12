<template>
	<view v-if="isReady" class="box">
		<image src="/static/images/life/tzs.jpg" mode="widthFix" />
		<view class="pa name">
			{{ house.name }}
		</view>
		<view class="pa project">
			{{ house.project }}
		</view>
		<view class="pa dong">
			{{ num[0] }}
		</view>
		<view class="pa dan">
			{{ num[1] }}
		</view>
		<view class="pa fang">
			{{ num[2] }}
		</view>
		<view class="pa uniqueNo">
			{{ house.uniqueNo }}
		</view>
	</view>
</template>

<script>
	import { getAssessList } from '@/api/index.js'
	
	export default {
		data() {
			return {
				isReady: false,
				house: {},
				num: {}
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
				
				getAssessList().then( res => {
					this.house = res.data.find(x => x.id === parseInt(id))
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
					
					this.num = this.house.replenish.split('-')
					
					this.isReady = true
					this.$modal.closeLoading()
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.box {
	position: relative;
	margin: 20rpx;
	image {
		display: block;
		width: 100%;
	}
	.pa{
		position: absolute;
		text-align: center;
		color: #f7edc0;
		font-size: 30rpx;
		font-weight: bold;
	}
	.name {
		right: 190rpx;
		top: 586rpx;
		width: 120rpx;
	}
	.project {
		right: 206rpx;
		top: 694rpx;
		width: 240rpx;
		font-size: 28rpx;
	}
	.dong {
		right: 320rpx;
		top: 748rpx;
		width: 66rpx;
		font-size: 28rpx;
	}
	.dan {
		right: 214rpx;
		top: 748rpx;
		width: 66rpx;
		font-size: 28rpx;
	}
	.fang {
		right: 89rpx;
		top: 748rpx;
		width: 58rpx;
		font-size: 28rpx;
	}
	.uniqueNo {
		right: 90rpx;
		bottom: 56rpx;
	}
}
</style>
