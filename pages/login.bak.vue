<template>
	<view class="wrap">
		<!-- 微信展示浏览器打开 -->
		<view v-if="iswx" class="wxPop">
			<view class="iconfont icon-dajiantou arrow"></view>
			<view class="popText"><text class="num">1</text>点击右上角的<text class="iconfont icon-gengduo"></text>按钮</view>
			<view class="popText"><text class="num">2</text>选择<text class="iconfont icon-liulangqi"></text>浏览器中打开</view>
		</view>
		<template v-else>
			<view class="wrapper">
				<view class="layout">
					<view class="logo">
						<image src="/static/images/common/logo2.png" mode="widthFix"></image>
					</view>
					<!-- <view class="site">
						应用描述
					</view> -->
					<view class="main">
						<view class="iform">
							<view class="ipt">
								<view class="lable">
									手机号码
								</view>
								<input 
									v-model="loginForm.username"
									type="number" 
									maxlength="11" 
									placeholder="请输入手机号"
									placeholder-class="ph" />
							</view>
							<view class="ipt">
								<view class="lable">
									登录密码
								</view>
								<input 
									type="password"
									v-model="loginForm.password"
									maxlength="18"
									placeholder="请输入登录密码" 
									placeholder-class="ph" />
							</view>
							<view class="router">
								<text @click="$tab.navigateTo('/pages/common/online')">忘记密码? 点击联系客服</text>
							</view>
							<view class="login" @click="handleLogin()">登&nbsp;&nbsp;&nbsp;&nbsp;录</view>
							<view class="reg" @click="$tab.navigateTo('/pages/register')">注&nbsp;&nbsp;&nbsp;&nbsp;册</view>
						</view>
						<view class="other">
							<u-divider text="快捷入口" textColor="#fff" lineColor="#fff"></u-divider>
							<view class="btns">
								<view class="btn" @click="$tab.navigateTo('/pages/common/online')">
									<view class="icon">
										<view class="iconxy iconxy-kefu"></view>
									</view>
									<view class="name">客服</view>
								</view>
								<view class="btn" @click="$refs.downloadApp.open()">
									<view class="icon">
										<view class="iconxy iconxy-app"></view>
									</view>
									<view class="name">APP</view>
								</view>
								<view class="btn" @click="$tab.navigateTo('/pages/chat')">
									<view class="icon">
										<view class="iconxy iconxy-liaotianqingqiu"></view>
									</view>
									<view class="name">群聊</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</template>
		
		<download-app ref="downloadApp" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isApp: false,
				iswx: false,
				loginForm: {
					username: '',
					password: ''
				}
			}
		},
		onLoad() {
			this.isWx();
			this.initIsApp();
			try {
				const value = uni.getStorageSync('LoginData')
				if (value) {
					this.loginForm = value
				}
			} catch (e) {
				console.log(95, e)
			}
		},
		methods: {
			async handleLogin() {
				if (this.loginForm.username === '') {
					this.$refs.uToast.error('请输入您的手机号')
				} else if (this.loginForm.password === '') {
					this.$refs.uToast.error('请输入您的密码')
				} else {
					this.$refs.uToast.loading('正在登录...')
					this.pwdLogin()
				}
			},
			async pwdLogin() {
				this.$store.dispatch('Login', {
					password: this.loginForm.password,
					phone: this.loginForm.username,
				}).then(() => {
					try {
						uni.setStorageSync('LoginData', this.loginForm)
					} catch (e) { console.log(143, e) }

					this.loginSuccess()
				}).catch(() => {})
			},
			loginSuccess(result) {
				// 设置用户信息
				this.$store.dispatch('GetInfo').then((res) => {
					this.$tab.reLaunch('/pages/home')
				})
			},
			initIsApp() {
				let hostName = location.hostname
				// 判断域名内是否有app
				if (hostName.indexOf('app') > -1) {
					this.isApp = true
				} else {
					this.isApp = false
				}
			},
			isAndorid() {
				return uni.getSystemInfoSync().platform === 'android'
			},
			//判断是否为微信
			isWx() {
				if (!this.isAndorid()) {
					var ua = navigator.userAgent.toLowerCase();
					if (ua.match(/windowswechat/i) === 'windowswechat') {
						return false
					} else {
						this.iswx = false
					}
					if (ua.match(/MicroMessenger/i) == 'micromessenger') {
						this.iswx = true
					}
				}
				return false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wxPop {
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		padding: 50rpx;
		background: rgba(0, 0, 0, .8);
		color: #fff;
		z-index: 9999;

		.arrow {
			text-align: right;
			font-size: 100rpx;
		}

		.popText {
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 50rpx;

			.num {
				width: 50rpx;
				height: 50rpx;
				margin-right: 20rpx;
				background: #ef2932;
				border-radius: 50%;
				font-size: 40rpx;
				text-align: center;
			}

			.iconfont {
				margin: 0 10rpx;
				font-size: 50rpx;
			}
		}
	}

	.wrap {
		width: 100%;
		height: 100vh;
		background: url('/static/images/common/bg.jpg') center no-repeat;
		background-size: cover;
	}

	.wrapper {
		position: relative;
		display: table;
		table-layout: fixed;
		width: 100%;
		height: 100%;
		text-align: center;
		box-sizing: border-box;

		.layout {
			display: table-cell;
			vertical-align: middle;
			width: 100%;
			height: 100%;
		}
	}
	
	.logo {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 auto;
		width: 300rpx;
		image {
			width: 100%;
		}
	}
	
	.site {
		color: #fff;
		font-size: 40rpx;
		font-weight: bold;
	}
	
	.main {
		position: relative;
		margin: 0 50rpx;
		padding-top: 50rpx;
	}
	
	.iform {
		text-align: left;
		.ipt {
			display: flex;
			align-items: center;
			margin-bottom: 20rpx;
			border-bottom: 1px solid #efefef;
			border-radius: 20rpx;
			background: #fff;
			.lable {
				padding: 30rpx;
			}
			input {
				flex: 1;
				font-size: 28rpx;
			}
			
			.ph {
				color: #666;
			}
		}
		
		.router {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			margin-top: 30rpx;
			color: #fff;
		}

		.login {
			padding: 30rpx 0;
			margin: 40rpx 0 0 0;
			border-radius: 20rpx;
			text-align: center;
			background: linear-gradient(90deg, #feedbb, #fffdee);
			color: #ef2932;
			font-weight: bold;
			font-size: 30rpx;
		}
		.reg {
			padding: 30rpx 0;
			text-align: center;
			color: #feedbb;
			font-weight: bold;
			font-size: 30rpx;
		}
	}

	.other {
		margin-top: 50rpx;
		.btns {
			display: flex;
			align-items: center;
			justify-content: space-around;
			color: #ef2932;
			.icon {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				border-radius: 50%;
				background: #fff;
				width: 64rpx;
				height: 64rpx;
				.iconxy {
					font-size: 60rpx;
				}
			}
			.name {
				padding-top: 20rpx;
				color: #fff;
			}
		}
	}
</style>