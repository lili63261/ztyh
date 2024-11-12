<template>
  <view>

    <view class="flexColumn head">
      <view class="flexRow">
        <view class="ipv6">网站支持IPV6</view>
       <!-- <image @click="$refs.downloadApp.open()" src="/static/images/home/phone.png" mode="widthFix"
               style="width: 45rpx;margin-left: auto;"/> -->
		<span @click="$refs.downloadApp.open()" class="image iconxy iconxy-shouji" style="margin-left: auto;"></span>
        <view class="line"/>
        <image @click="navTo('/pages/chat')" src="/static/images/home/message.png" mode="widthFix"
               style="width: 50rpx;"/>
        <view class="line"/>
        <view style="color:#015293;">新版</view>
      </view>
      </view>
		
      <image style="width:100%" src="/static/images/home/top-banner.jpg" mode="widthFix"/>
     <view class="flexColumn head">
		 <image class="logo" src="/static/images/home/gh.png" mode="widthFix"/>
      <view class="flexRow" style="align-content: center;align-items: center;justify-content: center;margin: 10rpx 0;">
        <view style="font-size: 50rpx;color: #cd2323;font-weight: bold;"
        >国务联办·国房壹号
        </view>
        <image src="/static/images/common/logo.jpg" mode="widthFix"
               style="width: 50rpx;border-radius: 5rpx;margin-left: 10rpx;"/>
      </view>
      <view style="align-self: center;font-size: 25rpx;color: grey;margin-top: 2rpx;margin-bottom: 30rpx;"
      >Jointly handled by the State Council · State House No.1
      </view>

      <!--    <view class="flexRow" style="align-self: center;margin-top: 30rpx;">-->
      <!--      <input class="input" v-model="searchInput" placeholder="请输入搜索内容"/>-->
      <!--      <view class="searchBtn" @click="searchContent">搜索</view>-->
      <!--    </view>-->

      <!--    <view style="align-self: center;margin-top: 30rpx;color: grey">热点查询：政府工作报告 便民服务日历</view>-->
    </view>


    <view class="swiper" v-if="large && large.length > 0">
      <slide-img :list="large" :heightNumber="300"></slide-img>
    </view>

    <view class="flexRow img-link" style="padding: 30rpx 10rpx ;">
		<image @click="$tab.navTo('/pages/apply/form')"  src="/static/images/home/sw-v1.jpg?v=1" mode="heightFix"
             style="width:50%;border-radius: 5rpx;" />
		<image @click="$tab.navTo('/pages/user/team/poster')"  src="/static/images/home/sw-v2.jpg?v=1" mode="heightFix"
			        style="width:50%;border-radius: 5rpx;margin-left: 10rpx;"/>
    </view>


    <view class="news">
      <view>
        <view class="flexRow" style="align-items: center;">
          <view class="title">国房壹号新闻</view>
          <view style="margin-left: auto;margin-right: 30rpx;color: #999999">更多>></view>
        </view>
        <view style="position: relative;background-color:#dddddd; width: 100%;height:2rpx;"></view>
      </view>


          <view class="items">
            <view v-for="item in news" :key="item.noticeId" class="item">
              <view class="tit txt-eli2" @click="toNewShow(item.noticeId)">{{ item.noticeTitle }}</view>
            </view>
          </view>
    </view>


    <!--		<view class="head">-->
    <!--			<image src="/static/images/home/homeh.jpg" mode="widthFix" class="bg" />-->
    <!--&lt;!&ndash;			<view class="logo">&ndash;&gt;-->
    <!--&lt;!&ndash;				<image src="/static/images/common/logo.jpg" mode="widthFix" />&ndash;&gt;-->
    <!--&lt;!&ndash;				<view class="title">国务联办 · 国房壹号</view>&ndash;&gt;-->
    <!--&lt;!&ndash;			</view>&ndash;&gt;-->
    <!--			<view class="menu">-->
    <!--				<view class="menuBox">-->
    <!--					<view class="item" @click="navTo('/pages/common/online')">-->
    <!--						<view class="iconxy iconxy-wodekefu"></view>-->
    <!--						<view class="txt">平台客服</view>-->
    <!--					</view>-->
    <!--					<view class="item" @click="navTo('/pages/chat')">-->
    <!--						<view class="iconxy iconxy-shuyi_qunliao"></view>-->
    <!--						<view class="txt">官方群聊</view>-->
    <!--					</view>-->
    <!--					&lt;!&ndash; #ifdef !IS-PORD &ndash;&gt;-->
    <!--					<view class="item" @click="$tab.switchTab('/pages/user/team/poster')">-->
    <!--						<view class="iconxy iconxy-fenxiang3"></view>-->
    <!--						<view class="txt">邀请好友</view>-->
    <!--					</view>-->
    <!--					&lt;!&ndash; #endif &ndash;&gt;-->
    <!--					<view class="item" @click="$refs.downloadApp.open()">-->
    <!--						<view class="iconxy iconxy-xiazai"></view>-->
    <!--						<view class="txt">下载APP</view>-->
    <!--					</view>-->
    <!--				</view>-->
    <!--			</view>-->
    <!--			<view class="period">-->
    <!--				{{ period }}: {{ acc.name ? acc.name : '新用户' }}-->
    <!--			</view>-->
    <!--			<view class="gift">-->
    <!--				<image src="/static/images/home/gift.png" mode="widthFix" />-->
    <!--				<view class="txt">邀请好友, 享超级豪礼</view>-->
    <!--			</view>-->
    <!--		</view>-->

    <!--    <view class="mian">-->
    <!--      <view class="menu">-->
    <!--        <view class="item" @click="$tab.navTo('/pages/user/team/index')">-->
    <!--          <view class="icon team">-->
    <!--            <view class="iconxy iconxy-wodeduiwu"></view>-->
    <!--          </view>-->
    <!--          <view class="txt">我的团队</view>-->
    <!--        </view>-->
    <!--        <view class="item" @click="$tab.navTo('/pages/user/authenticate')">-->
    <!--          <view class="icon acc">-->
    <!--            <view class="iconxy iconxy-renzheng-tianchong1"></view>-->
    <!--          </view>-->
    <!--          <view class="txt">实名认证</view>-->
    <!--        </view>-->
    <!--        <view class="item" @click="$tab.navTo('/pages/user/address')">-->
    <!--          <view class="icon adr">-->
    <!--            <view class="iconxy iconxy-dizhi2"></view>-->
    <!--          </view>-->
    <!--          <view class="txt">收货地址</view>-->
    <!--        </view>-->
    <!--        <view class="item" @click="$tab.navTo('/pages/user/password')">-->
    <!--          <view class="icon pwd">-->
    <!--            <view class="iconxy iconxy-mima1"></view>-->
    <!--          </view>-->
    <!--          <view class="txt">修改密码</view>-->
    <!--        </view>-->
    <!--        <view class="item" @click="$tab.switchTab('/pages/apply/index')">-->
    <!--          <view class="icon travel">-->
    <!--            <view class="iconxy iconxy-chuhang"></view>-->
    <!--          </view>-->
    <!--          <view class="txt">出行登记</view>-->
    <!--        </view>-->
    <!--        <view class="item" @click="$tab.switchTab('/pages/fund/index')">-->
    <!--          <view class="icon fund">-->
    <!--            <view class="iconxy iconxy-jijin1"></view>-->
    <!--          </view>-->
    <!--          <view class="txt">壹号基金</view>-->
    <!--        </view>-->
    <!--        <view class="item">-->
    <!--          <view class="icon apply">-->
    <!--            <view class="iconxy iconxy-yongyan"></view>-->
    <!--          </view>-->
    <!--          <view class="txt">贫困申报</view>-->
    <!--        </view>-->
    <!--        <view class="item" @click="$tab.switchTab('/pages/user/index')">-->
    <!--          <view class="icon more">-->
    <!--            <view class="iconxy iconxy-gengduo"></view>-->
    <!--          </view>-->
    <!--          <view class="txt">更多</view>-->
    <!--        </view>-->
    <!--      </view>-->


    <!--    </view>-->
<!--    <view class="footer">-->
<!--      <view class="navs">-->
<!--        <view>电脑版</view>-->
<!--        <view @click="$refs.downloadApp.open()">客户端</view>-->
<!--        <view>小程序</view>-->
<!--        <view>微博</view>-->
<!--        <view @click="navTo('/pages/chat')">微信</view>-->
<!--        <view>邮箱</view>-->
<!--      </view>-->
<!--      <view class="box">-->
<!--        <view class="left">-->
<!--          <image src="/static/images/home/ft.png" mode="widthFix"/>-->
<!--        </view>-->
<!--        <view class="right">-->
<!--          <view>主办单位：国务院办公厅</view>-->
<!--          <view>运行维护单位：中国政府网运行中心</view>-->
<!--          <view>版权所有：中国政府网</view>-->
<!--          <view>网站标识码bm01000001</view>-->
<!--          <view>京ICP备05070218号　京公网安备11010202000001号</view>-->
<!--        </view>-->
<!--      </view>-->
<!--    </view>-->


    <view class="foot1 flexColumn" style="align-content: center;align-items: center; padding: 30rpx;">
      <view class="content">主办单位：国务院办公厅</view>
      <view class="content">运行维护单位：中国政府网运行中心</view>
      <view class="content">版权所有：中国政府网</view>
      <view class="content">网站标识码bm01000001</view>
      <view class="content">京ICP备05070218号　京公网安备11010202000001号</view>
      <view class="flexRow" style="align-content: center;margin-top: 50rpx;">
        <image src="/static/images/home/sc_home_1.png" mode="widthFix" style="width: 180rpx;"/>
        <image src="/static/images/home/sc_home_2.png" mode="widthFix" style="width: 100rpx;margin: 0 80rpx;"/>
        <image src="/static/images/home/sc_home_3.png" mode="widthFix" style="width: 180rpx;"/>
      </view>
    </view>

    <!-- 公告弹窗 -->
    <uni-popup ref="popupNotice" background-color="transparent" type="center" :is-mask-click="false"
               @maskClick="closeNotice()" style="z-index: 99999">
      <view class="pop">
        <view class="pop_box notice">
          <view class="pop_head">
            <view class="pop_head_box">
              <view>{{ notice.noticeTitle }}</view>
            </view>
          </view>
          <view class="pop_main">
            <scroll-view scroll-y="true" style="height:600rpx;">
              <mp-html :content="notice.noticeContent"/>
            </scroll-view>
          </view>
          <view class="pop_foot" @click="closeNotice()">
            <view>关闭</view>
          </view>
        </view>
      </view>
    </uni-popup>
    <!-- 客服弹窗 -->
    <uni-popup ref="popupContact" background-color="transparent" type="center" :is-mask-click="false"
               @maskClick="closeContact()" style="z-index: 99999">
      <view class="pop">
        <view class="pop_box service">
          <view class="pop_head">{{ contact.noticeTitle }}</view>
          <view class="pop_main">
            <scroll-view scroll-y="true" style="height:600rpx;">
              <mp-html :content="contact.noticeContent"/>
            </scroll-view>
          </view>
          <view class="pop_foot" @click="closeContact()">
            <view>关闭</view>
          </view>
        </view>
      </view>
    </uni-popup>

    <download-app ref="downloadApp"/>

    <!-- 微信展示浏览器打开 -->
    <view v-if="iswx" class="wxPop">
      <view class="iconfont icon-dajiantou arrow"></view>
      <view class="popText">
        <text class="num">1</text>
        点击右上角的
        <text class="iconfont icon-gengduo"></text>
        按钮
      </view>
      <view class="popText">
        <text class="num">2</text>
        选择
        <text class="iconfont icon-liulangqi"></text>
        浏览器中打开
      </view>
    </view>
  </view>
</template>

<script>
import {listBanner, listNotice, getVideo} from '@/api/index.js'
import {inviteNum} from '@/api/reward/reward.js'
import {detailCertification} from '@/api/mine/certification.js'

import mpHtml from 'mp-html/dist/uni-app/components/mp-html/mp-html'
import {getHtmlImgUrl} from '@/utils/common.js'

export default {
  filters: {
    filterHTML(html) {
      return html.replace(/&nbsp;/g, '').replace(/(<([^>]+)>)/gi, '')
    }
  },
  computed: {
    period() {
      let date = (new Date()).getHours()
      let hoursTip = ''
      if (date >= 0 && date < 12) {
        hoursTip = '上午好'
      } else if (date >= 12 && date < 18) {
        hoursTip = '下午好'
      } else {
        hoursTip = '晚上好'
      }
      return hoursTip
    }
  },
  components: {
    mpHtml
  },
  data() {
    return {
      iswx: false,
      isApp: false,
      large: [],
      swiperHeight: 0,
      videoData: {},
      isPlay: false,
      news: [
		  // {noticeId:1,noticeTitle:"习近平会见出席中国国际友好大会暨中国人民对外友好协会成立70周年纪念活动外方嘉宾"},
		  // {noticeId:2,noticeTitle:"中共四川省委关于深入贯彻党的二十届三中全会精神 进一步全面深化改革奋力谱写中国式现代化四川新篇章的决定"},
		  // {noticeId:3,noticeTitle:"从税收数据透视前三季度经济运行亮点"},
		  // {noticeId:4,noticeTitle:"从税收数据透视前三季度经济运行亮点"},
		  // {noticeId:5,noticeTitle:"从税收数据透视前三季度经济运行亮点"},
		  // {noticeId:6,noticeTitle:"从税收数据透视前三季度经济运行亮点"},
		  // {noticeId:7,noticeTitle:"从税收数据透视前三季度经济运行亮点"}
	  ],
      noticeArray: [],
      notice: {},
      contactArray: [],
      contact: {},
      csUrl: '',
      inviteCount: 0,
      certificationCount: 0,
      superior: '无推荐人',
      searchInput: ""
    }
  },
  onLoad() {
    this.isWx()
    this.getHomeAcc()
    this.initIsApp()
    this.getBannerList()
    this.getVideo()
  },
  onShow() {
    // // 1 新闻
    this.getNote(1)
    // // // 2 公告
    // this.getNote(2)
    // // // 3 联系方式
    // this.getNote(3)
  },
  methods: {
    getVideo() {
      getVideo(1).then(res => {
        this.videoData = res.data
      })
    },
    async getHomeAcc() {
      const {data: acc} = await detailCertification()
      if (acc && Object.keys(acc).length > 0) {
        this.SET_ACC(acc)
      }
    },
    getNote(e) {
      listNotice(e).then((res) => {
        if (res.data.length > 0) {
          switch (e) {
              // 4 新闻
            case 1:
              this.news = res.data
              break
            case 2:
              this.noticeArray = res.data
              this.notice = this.noticeArray[0]
              this.$refs.popupNotice.open()
              break
            case 3:
              this.contactArray = res.data
              this.contact = this.contactArray[0]
              break
          }
        }
      })
    },
    // 关闭公告
    closeNotice() {
      this.noticeArray = this.noticeArray.filter(item => item.noticeId !== this.notice.noticeId)
      if (this.noticeArray.length > 0) {
        this.notice = this.noticeArray[0]
      } else {
        this.$refs.popupNotice.close()
        this.$refs.popupContact.open()
      }
    },
    //关闭客服
    closeContact() {
      this.contactArray = this.contactArray.filter(item => item.noticeId !== this.contact.noticeId)

      if (this.contactArray.length > 0) {
        this.contact = this.contactArray[0]
      } else {
        this.$refs.popupContact.close()
      }
    },
    // 新闻详情
    toNewShow(id) {
      this.$tab.navigateTo(`/pages/news/show?id=${id}`)
    },
    // 轮播
    getBannerList() {
      listBanner().then((res) => {
        // 大轮播图
        this.large = res?.data?.large
        // this.large.push({
        // 	imgUrl: '/static/images/demo/swzj.jpg'
        // })
      })
      // this.large = [
      //   {imgUrl: "/static/images/home/sw1.jpg"},
      //   {imgUrl: "/static/images/home/sw2.jpg"}
      // ]
    },
    initIsApp() {
      let hostName = location.hostname;
      //判断域名内是否有app
      if (hostName.indexOf('app') > -1) {
        this.isApp = true
      } else {
        this.isApp = false
      }
    },
    // 是否安卓
    isAndorid() {
      return uni.getSystemInfoSync().platform === 'android'
    },
    // 判断是否为微信
    isWx() {
      if (!this.isAndorid()) {
        var ua = navigator.userAgent;
        if (ua.match(/windowswechat/i) == 'windowswechat') {
          return false
        } else {
          this.iswx = false
        }
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
          this.iswx = true
        }
      }
      return false
    },
    // 获取团队信息
    getTeamCount() {
      inviteNum().then(res => {
        this.inviteCount = res.data.inviteNum
        this.certificationCount = res.data.certificationNum
        this.superior = res.data.mySuperior === '官方' || !res.data.mySuperior ? '无推荐人' : res.data
            .mySuperior
      })
    },
    // 跳转
    navTo(url) {
      this.$tab.navigateTo(url)
    },
    loadImg() {
      let query = uni.createSelectorQuery().in(this)
      query.selectAll('.swiper_img').boundingClientRect()
      query.exec(res => {
        this.swiperHeight = res[0][0].height
      })
    },
    searchContent() {
      let that = this;
      if (this.searchInput) {
        this.$modal.loading('搜索中...')
        setTimeout(function () {
              that.$modal.loading('未找到内容')
              setTimeout(function () {
                that.$modal.closeLoading()
              }, 2000)
            }, 2000
        )
      } else {
        this.$modal.loading('搜索内容不能为空')
        setTimeout(function () {
          that.$modal.closeLoading()
        }, 2000)
      }

    }
  }
}
</script>

<style lang="scss" scoped>
.head {
  //position: relative;
  //.bg {
  //	display: block;
  //	width: 100%;
  //}
  //.logo {
  //	position: absolute;
  //	top: 20rpx;
  //	width: 100%;
  //	display: flex;
  //	align-items: center;
  //	justify-content: center;
  //	image {
  //		width: 150rpx;
  //		border-radius: 20rpx;
  //	}
  //	.title {
  //		margin-left: 20rpx;
  //		font-size: 50rpx;
  //		font-weight: bold;
  //		color: #00548e;
  //	}

  background-image: url('/static/images/home/scindex_top2.png'); /* 设置背景图片 */
  background-size: cover; /* 背景图片自适应容器大小，并覆盖整个容器 */
  background-position: center; /* 图片居中显示 */
  background-repeat: no-repeat; /* 禁止图片重复 */
  padding: 20rpx 20rpx;

  .ipv6 {
    background: #015293;
    color: white;
    padding: 10rpx 20rpx;
    border-radius: 50rpx;
    font-size: 25rpx;
  }
  .image{
	  color:#015293;
	  font-size:40upx;
  }
  .logo {
    align-self: center;
    width: 150rpx;
    border-radius: 20rpx;
    margin-top: 30rpx;
  }

  .searchBtn {
    background: #015293;
    color: white;
    padding: 10rpx 20rpx;
    border-radius: 0 10rpx 10rpx 0;
    font-size: 35rpx;
  }

  .input {
    border: 3rpx solid #dfdfdf;
    border-right: none; /* 移除右边的边线 */
    height: 68rpx;
    width: 350rpx;
    padding: 10rpx;
    font-size: 25rpx;
    background-color: white;
  }

}

.line {
  width: 3rpx;
  height: 35rpx;
  background-color: #015293;
  margin: 0 15rpx;
}

.menu {
  position: absolute;
  top: 20rpx;
  left: 0;
  width: 100%;

  .menuBox {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-shadow: 0 1px 1px $pbc;

    .iconxy {
      font-size: 60rpx;
      color: #fff;
    }

    .txt {
      margin-top: 10rpx;
      color: #fff;
      font-weight: 500;
    }
  }
}

.period {
  position: absolute;
  left: 50rpx;
  top: calc(50% - 25rpx);
  color: #fff;
  font-size: 50rpx;
  font-weight: bold;
  text-shadow: 0 1px 1px $pbc;
}

.gift {
  position: absolute;
  right: 0;
  bottom: -20rpx;
  height: 70rpx;
  line-height: 70rpx;
  background-image: linear-gradient(100deg, #e6b980 0%, #eacda3 100%);

  image {
    position: absolute;
    top: -25rpx;
    left: -50rpx;
    width: 100rpx;
    filter: drop-shadow(rgb(249, 254, 184) 0px 0px 8px);
  }

  .txt {
    padding: 0 100rpx;
    text-align: center;
    color: #fff;
    font-size: 32rpx;
  }
}

.mian {
  background: #fff;

  .menu {
    display: flex;
    flex-wrap: wrap;
    padding: 50rpx 0;

    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 25%;
      margin-top: 30rpx;
    }

    .icon {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 70rpx;
      height: 70rpx;
      border-radius: 50%;
      color: #fff;

      &.team {
        background-image: linear-gradient(to top, #c79081 0%, #dfa579 100%);
      }

      &.acc {
        background-image: linear-gradient(to top, #4481eb 0%, #04befe 100%);
      }

      &.adr {
        background-image: linear-gradient(to top, #1e3c72 0%, #1e3c72 1%, #2a5298 100%);
      }

      &.pwd {
        background-image: linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%);
      }

      &.travel {
        background-image: linear-gradient(to top, #6a85b6 0%, #bac8e0 100%);
      }

      &.fund {
        background-image: linear-gradient(to top, #d19f55 0%, #eed1a4 100%);
      }

      &.apply {
        background-image: linear-gradient(to top, #4481eb 0%, #04befe 100%);
      }

      &.more {
        background-image: linear-gradient(to top, #0c3483 0%, #a2b6df 100%, #6b8cce 100%, #a2b6df 100%);
      }
    }

    .txt {
      margin-top: 10rpx;
      font-weight: 500;
    }
  }

  .swiper {
    margin: 0 20rpx;
    border-radius: 8rpx;
    overflow: hidden;

    ::v-deep {
      .indicator-item-active {
        width: 20rpx;
      }
    }
  }

}

.img-link{
	image{
		height:100px;
	}
	view{
		height:100px;
	}
}
.news {
    margin: 40rpx 0;
	margin-top:0;
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 500;
	margin: 0 20rpx;
	line-height: 40px;
    font-size: 36rpx;
    color: #cc2728;
    display: inline-block; /* 确保阴影只作用于文字内容 */
    // box-shadow: 0 2px 0 #cc2728; /* 设置阴影，2px 是距离，blue 是颜色 */
    border-bottom:2px solid #cc2728; /* 设置阴影，2px 是距离，blue 是颜色 */
  }


  .items {
	  
    // display: flex;
    // flex-wrap: wrap;
    // align-items: center;
    margin: 0 20rpx;
	margin-top: 20rpx;
    .item {
		  
      .pic {
        width: 100%;
        height: 200rpx;

        image {
          display: block;
          width: 100%;
          height: 200rpx;
        }
      }

      .tit {
        flex: 1;
        display: -webkit-box;
        // margin: 15rpx 0 30rpx 0;
        font-size: 30rpx;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
		width: 100%;display: block;
		padding-left: 20px;
		height: 40px;
		line-height: 40px;
		position: relative;
		&:before {  
			content: '•'; /* 自定义项目符号，可以是任何字符或图标 */  
			position: absolute;  
			top: 0px;  font-size: 50upx;
			left: 0px;  
			color: #999; /* 项目符号的颜色 */
			  display: flex;
			  flex-wrap: wrap;
			  align-items: center;
		}
      }
    }
  }
}


.footer {
  background: #fff;
  border-top: #2e5586 1px solid;

  .navs {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20rpx 0;
    border-bottom: 1px solid #efefef;

    view {
      padding: 0 15rpx;
      border-right: 1px solid #efefef;
      color: #21518e;

      &:last-child {
        border-right: 0;
      }
    }
  }
  .box {
    display: flex;
    align-items: center;
    padding: 20rpx 0;

    .left {
      width: 100rpx;

      image {
        display: block;
        width: 100%;
      }
    }

    .right {
      margin-left: 20rpx;
      font-size: 24rpx;

      view {
        margin: 10rpx 0;
      }
    }
  }
}


.foot1 {
  min-height: 300rpx;
  background-color: #015293;
  .content{
    color: white;
    margin: 6rpx 0;
    font-size: 28rpx;
  }
}

.pop {
  position: relative;
  width: 80vw;
  max-height: 80vh;

  .pop_box {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 30rpx;
    background-image: linear-gradient(to bottom, #c1d6f4 0%, #fff 30%);

    &.notice {
      &::after {
        position: absolute;
        content: '';
        top: -20rpx;
        left: calc(50% - 130rpx);
        width: 200rpx;
        height: 200rpx;
        background: url('/static/images/home/n.png') center no-repeat;
        background-size: contain;
        opacity: .3;
      }
    }

    &.service {
      &::after {
        position: absolute;
        content: '';
        top: -20rpx;
        left: calc(50% - 130rpx);
        width: 200rpx;
        height: 200rpx;
        background: url('/static/images/home/k.png') center no-repeat;
        background-size: contain;
        opacity: .3;
      }
    }
  }

  .pop_head {
    padding: 50rpx 0 10rpx 0;
    text-align: center;
    font-size: 32rpx;
    font-weight: 500;
  }

  .pop_main {
    position: relative;
    z-index: 2;
    padding: 20rpx 30rpx;
  }

  .pop_foot {
    padding: 20rpx;

    view {
      padding: 20rpx 0;
      border-radius: 16rpx;
      background-image: linear-gradient(45deg, #2979ff 50%, #609cff 100%);
      font-size: 34rpx;
      color: #fff;
      text-align: center;
      box-shadow: 0 0 10rpx rgba(0, 0, 0, .06);
    }
  }
}

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
      background: #b60005;
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
</style>