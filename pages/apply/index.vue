<template>
	<view class="ibg">
		<uni-nav-bar class="uniNavBar" :border="false" color="#fff" backgroundColor="#ffffff00" left-icon="left" @clickLeft="$tab.navigateBack" />
		<view class="head">
			<image src="/static/images/apply/title.jpg" mode="widthFix" />
		</view>
		<view class="list">
			<view class="item">
				<view class="left">
					<image src="/static/images/apply/heilongjiang.jpg" mode="widthFix" />
					<view class="adr">黑龙江</view>
				</view>
				<view class="right">
					<view class="title">
						<u--text :lines="2" text="黑龙江座谈会、哈尔滨站" />
					</view>
					<view class="info">
						<view>
							<text class="lable">座谈会议地点：</text>
							<text class="value">哈尔滨会展中心体育馆</text>
						</view>
						
						<view class="value">
							<text class="lable">座谈会议时间：</text>
							<text class="value">2024年11月1日 19:00-21:00</text>
						</view>
					</view>
					<view class="box">
						<u-tag text="即将召开" type="primary" plain />
						<view class="btn apply" @click="$tab.navTo('/pages/apply/form')">
							<view class="iconxy iconxy-apply"></view>
							<view v-if="Object.keys(travelTicketData).length > 0">参会信息</view>
							<view v-else>报名参加</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="item">
				<view class="left">
					<image src="/static/images/apply/haerbin.jpg" mode="widthFix" />
					<view class="adr">哈尔滨</view>
				</view>
				<view class="right">
					<view class="title">
						<u--text :lines="2" text="哈尔滨团队长专属座谈会" />
					</view>
					<view class="info">
						<view>
							<text class="lable">座谈会议地点：</text>
							<text class="value">哈尔滨会展中心体育馆</text>
						</view>
						
						<view class="value">
							<text class="lable">座谈会议时间：</text>
							<text class="value">2024年11月5日 19:00-21:00</text>
						</view>
					</view>
					<view class="box">
						<u-tag text="未开始报名，等待开放" type="warning" plain />
					</view>
				</view>
			</view>
			
			<view class="item">
				<view class="left">
					<image src="/static/images/apply/xinjiang.jpg" mode="widthFix" />
					<view class="adr">新疆</view>
				</view>
				<view class="right">
					<view class="title">
						<u--text :lines="2" text="新疆座谈会、乌鲁木齐站" />
					</view>
					<view class="info">
						<view>
							<text class="lable">座谈会议地点：</text>
							<text class="value">新疆人民会堂</text>
						</view>
						
						<view class="value">
							<text class="lable">座谈会议时间：</text>
							<text class="value">2024年3月1日</text>
						</view>
					</view>
					<view class="box">
						<u-tag text="已结束" type="info" plain />
						<view class="btn" @click="doOpenVideo()">
							<view class="iconxy iconxy-bofang"></view>
							<view>观看回放</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="item">
				<view class="left">
					<image src="/static/images/apply/xizang.jpg" mode="widthFix" />
					<view class="adr">西藏</view>
				</view>
				<view class="right">
					<view class="title">
						<u--text :lines="2" text="西藏座谈会、拉萨站" />
					</view>
					<view class="info">
						<view>
							<text class="lable">座谈会议地点：</text>
							<text class="value">香格里拉大酒店</text>
						</view>
						
						<view class="value">
							<text class="lable">座谈会议时间：</text>
							<text class="value">2024年5月1日</text>
						</view>
					</view>
					<view class="box">
						<u-tag text="已结束" type="info" plain />
						<view class="btn" @click="doOpenVideo()">
							<view class="iconxy iconxy-bofang"></view>
							<view>观看回放</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="item">
				<view class="left">
					<image src="/static/images/apply/jilin.jpg" mode="widthFix" />
					<view class="adr">吉林</view>
				</view>
				<view class="right">
					<view class="title">
						<u--text :lines="2" text="吉林座谈会、长春站" />
					</view>
					<view class="info">
						<view>
							<text class="lable">座谈会议地点：</text>
							<text class="value">长春国际中心</text>
						</view>
						
						<view class="value">
							<text class="lable">座谈会议时间：</text>
							<text class="value">2024年7月1日</text>
						</view>
					</view>
					<view class="box">
						<u-tag text="已结束" type="info" plain />
						<view class="btn" @click="doOpenVideo()">
							<view class="iconxy iconxy-bofang"></view>
							<view>观看回放</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="item">
				<view class="left">
					<image src="/static/images/apply/liaoning.jpg" mode="widthFix" />
					<view class="adr">辽宁</view>
				</view>
				<view class="right">
					<view class="title">
						<u--text :lines="2" text="辽宁座谈会、沈阳站" />
					</view>
					<view class="info">
						<view>
							<text class="lable">座谈会议地点：</text>
							<text class="value">北约客维景国际大酒店</text>
						</view>
						
						<view class="value">
							<text class="lable">座谈会议时间：</text>
							<text class="value">2024年9月1日</text>
						</view>
					</view>
					<view class="box">
						<u-tag text="已结束" type="info" plain />
						<view class="btn" @click="doOpenVideo()">
							<view class="iconxy iconxy-bofang"></view>
							<view>观看回放</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="item">
				<view class="left">
					<image src="/static/images/apply/guangdong.jpg" mode="widthFix" />
					<view class="adr">广东</view>
				</view>
				<view class="right">
					<view class="title">
						<u--text :lines="2" text="广东座谈会、广州站" />
					</view>
					<view class="info">
						<view>
							<text class="lable">座谈会议地点：</text>
							<text class="value">白云国际会议中心</text>
						</view>
						
						<view class="value">
							<text class="lable">座谈会议时间：</text>
							<text class="value">2024年12月9日</text>
						</view>
					</view>
					<view class="box">
						<u-tag text="未开始报名，等待开放" type="warning" plain />
					</view>
				</view>
			</view>
			
			<view class="item">
				<view class="left">
					<image src="/static/images/apply/shanghai.jpg" mode="widthFix" />
					<view class="adr">上海</view>
				</view>
				<view class="right">
					<view class="title">
						<u--text :lines="2" text="上海座谈会、上海站" />
					</view>
					<view class="info">
						<view>
							<text class="lable">座谈会议地点：</text>
							<text class="value">‌‌上海国际会议中心</text>
						</view>
						
						<view class="value">
							<text class="lable">座谈会议时间：</text>
							<text class="value">2025年1月20日</text>
						</view>
					</view>
					<view class="box">
						<u-tag text="未开始报名，等待开放" type="warning" plain />
					</view>
				</view>
			</view>
			
		</view>
		
		<u-popup :show="videoData.isShow" mode="center" closeable @close="videoClose">
			<mp-video ref="video" :src="videoData.src" :poster="videoData.poster" />
		</u-popup>
			
	</view>
</template>

<script>
	import { travelTicket } from '@/api/index.js'
	
	export default {
		data() {
			return {
				videoData: {
					isShow: false,
					src: 'https://muiplayer.js.org/media/media.mp4',
					poster: 'https://muiplayer.oss-cn-shanghai.aliyuncs.com/static/image/poster.jpg'
				},
				travelTicketData: {}
			}
		},
		onShow() {
			this.getTravelTicket()
		},
		methods: {
			getTravelTicket() {
				travelTicket().then(res => {
					this.travelTicketData = res.data || {}
				})
			},
			doOpenVideo() {
				this.$refs.uToast.warning('视频正在审核中')
				
				// 函数传参获取视频资源
				// this.videoData.src = ''
				// this.videoData.poster = ''
				
				// this.videoData.isShow = true
			},
			videoClose() {
				this.$refs.video.changePause()
				this.videoData.isShow = false
			}
		}
	}
</script>

<style lang="scss" scoped>
::v-deep {
	.u-popup {
		.u-popup__content__close {
			z-index: 9;
		}
	}
}
.ibg {
	background-image: linear-gradient(to bottom, #6e0617 24%, rgba(255,255,255,.0) 50%);
}
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
.list {
	margin: 0 20rpx 20rpx 20rpx;
	.item {
		display: flex;
		align-items: stretch;
		justify-content: space-between;
		margin-top: 20rpx;
		padding: 20rpx;
		background: #fff;
		.left {
			position: relative;
			width: 250rpx;
			margin-right: 20rpx;
			image {
				display: block;
				width: 100%;
			}
			.adr {
				position: absolute;
				left: calc(50% - 70rpx);
				top: calc(50% - 70rpx);
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				width: 150rpx;
				height: 150rpx;
				border-radius: 50%;
				background: rgba(255, 255, 255, .4);
				backdrop-filter: blur(.5px);
				font-size: 40rpx;
				font-weight: bold;
				color: #fff;
				text-shadow: 0 0 5px #000;
			}
		}
		.right {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.title {
				::v-deep {
					.u-text__value {
						font-size: 32rpx !important;
						font-weight: bold !important;
					}
				}
			}
			.info {
				&>view {
					margin-bottom: 10rpx;
				}
				.lable {
					color: #666;
				}
			}
			.box {
				display: flex;
				align-items: center;
				justify-content: space-between;
				::v-deep {
					.u-tag {
						justify-content: center;
					}
				}
				.btn {
					padding: 15rpx;
					text-align: center;
					border-radius: 20rpx;
					font-weight: bold;
					font-size: 30rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					background-image: linear-gradient(to top, #ff8a66 50%, #ffcc80 100%);
					color: #fff;
					.iconxy {
						margin-right: 10rpx;
						font-size: 40rpx;
					}
					&.apply {
						background-image: linear-gradient(to top, #db0003 50%, #ffb199 100%);
					}
				}
			}
		}
	}
	::v-deep {
		.u-tag__text--medium {
			font-size: 32rpx;
		}
	}
}
</style>
