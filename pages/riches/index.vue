<template>

  <view v-if="isReady" class="ibg flexColumn">
	<view class="tpimage">
		<image src="/static/images/riches/btext.png" mode="widthFix" style="margin: auto;"/>
		<image src="/static/images/riches/top-view.png" mode="widthFix" style="margin: auto;"/>
	</view>
    <view class="desc">
      {{ cardInfo.introduce }}
    </view>

    <view class="listBox">
      <view class="list">
        <view v-for="item,index in list" :key="item.id" class="item">
          <view class="box">
            <view class="hd">
              <view class="title">{{ item.name }}</view>
			  
              <!-- <view class="tag" :class="{'tag-right':k==0}" v-for="t,k in tag[index]">{{t}}</view> -->
              <!-- <view class="tag">便捷</view> -->
				<view class="quota tag-right">额度:
					<text>{{ item.quota }}万</text>
				</view>
				<view class="quantity" :class="{ 'red': item.quantity < 100 }">
					剩余: {{ item.quantity }}张
				</view>
            </view>
            <view class="pic">
              <image src="/static/images/riches/9.png" mode="widthFix"/>
            </view>
            <view class="bd">
              <view @click="doShare()" class="button-share"><em>new</em>邀请好友</view>
              <view @click="doPay(item)" class="button">立即领取</view>
            </view>
          </view>

        </view>
      </view>
    </view>
  </view>
</template>

<script>
import {bankCardList} from '@/api/bankCard/bankCard.js'

export default {
  data() {
    return {
      isReady: false,
      cardInfo: {},
      list: [],
	  tag:[['热门','快捷'],['精选','推荐'],['限时','经典'],['便捷','受欢迎']]
    }
  },
  onLoad() {
    this.getCardList()
  },
  methods: {
	doShare(){
		this.$tab.navTo("/pages/user/team/poster")
	},
    doPay(row) {
      this.$refs.uToast.loading('加载中...')

      const payParams = {
        id: row.id,
        money: row.money,
        busiType: 6,
        title: '持有' + row.name,
        fee: row.name + '开户费'
      }
      this.$tab.navTo(`/pages/common/defray?info=${JSON.stringify(payParams)}`)
    },
    getCardList() {
      bankCardList().then(res => {
        this.cardInfo.introduce = res.data[0].introduce
        this.list = res.data
        this.isReady = true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.ibg {
  background: #ffe3b1;
  background-image: linear-gradient(to bottom, #ffe3b1 0%, #fff 100%);
  .title-h1{
	  text-align: center;
	  font-size:40upx;
	  padding:30rpx;
	  padding-bottom: 0;
	  color:#fff;font-weight: bold;
  }
  .tpimage{
	  width: 90%;margin: auto;
	  padding-top: 30px;
	  text-align: center;
	  image{
		  width: 80%;
	  }
  }
}

.ibg {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: url('/static/images/riches/bg.png');
  background-size: 100%;
  background-repeat: no-repeat;

  .desc{
    color: #886E50;
	font-weight: bold;
    font-size: 35rpx;
    margin: 20rpx 20rpx 20rpx 20rpx;
    border-radius: 10px;
    padding:30rpx 20rpx;
	box-shadow: #999 0px 5px 10px;
	background-image: linear-gradient(180deg, #fedec1 0%, #f7ecd8 100%);
	// background: url('/static/images/riches/texxt-bg1.png') left top;
  }

}

.uniNavBar {
  // position: fixed;
  // z-index: 2;
}

.head {
  position: relative;

  .title {
    font-size: 50rpx;
    color: #ffe6c7;
    text-align: center;
    font-weight: bold;
  }

  .desc {
    position: absolute;
    left: 0;
    bottom: 0;
    margin: 0 20rpx 20rpx 20rpx;
    padding: 20rpx;
    border-radius: 16rpx;
    line-height: 50rpx;
    font-size: 34rpx;
    font-weight: bold;
    color: #fff;
    background: rgba(227, 0, 0, .5);
  }

  image {
    display: block;
    width: 100%;
  }
}

.listBox {
  position: relative;
  top: -20rpx;
}

.list {
  margin: 0 20rpx 20rpx 20rpx;

  .item {
    margin-top: 20rpx;
    padding-bottom: 2rpx;
    border-radius: 16rpx;
    background: #fff;
    // box-shadow: 0 0 5px 0px #cc8c52;
	box-shadow: #999 0px 5px 10px;
  }

  .box {
    padding-bottom: 10rpx;
	padding-left:30rpx;
	padding-right:30rpx;
    border-radius: 16rpx;
    // background-image: linear-gradient(to bottom, #e6b980 0%, #eacda3 100%);
    // background-image: linear-gradient(135deg, #f9d5b5 0%, #f7ecd8 100%);
	background: url('/static/images/riches/card-bg.png') no-repeat center;
    .hd {
      display: flex;
      align-items: center;
      //justify-content: space-between;
      padding: 20rpx;
      .tag{
        color: red;
        padding: 4rpx 10rpx;
        border: 3rpx solid red;
        font-size: 25rpx;
        border-radius: 3rpx;
        //background-image: linear-gradient(to left, #a0cfff 0, rgba(255, 255, 255, .2) 100%);
      }
      .tag-right{
        margin-left: auto;
        margin-right: 10rpx;
      }
      .title {
		color:#5F4016;
        font-size: 32rpx;
        font-weight: bold;
      }
      .logo{
        // width: 60rpx;
        width: 60rpx;
      height: 60rpx;
        // border-radius: 5rpx;
        border-radius: 30rpx;
        margin-right: 10rpx;
      }

		.quota {
			color: #886E50;
			font-weight: bold;
		}
		.quantity {
			display: flex;
			align-items: center;
			padding: 10rpx 10rpx 10rpx 50rpx;
			border-radius: 0 10rpx 10rpx 0;
			color: #886E50;
			font-weight: bold;
		}
    }

    .pic {
      padding: 0 10rpx;

      image {
        display: block;
        width: 100%;
        border-radius: 16rpx;
      }
    }

    .bd {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 10rpx 10rpx 0 10rpx;
      padding: 20rpx;
      border-radius: 16rpx;
      background: transparent;

      .quota {
        display: flex;
        align-items: center;

        text {
          padding-left: 20rpx;
          color: $pbc;
          font-size: 40rpx;
          font-weight: bold;
        }
      }

      .subjoinStr {
        color: #f09e00;
      }
    }
  }

  .btn {
    margin: 10rpx 10rpx 0 10rpx;
    padding: 15rpx 30rpx;
    text-align: center;
    border-radius: 20rpx;
    font-weight: bold;
    font-size: 30rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: linear-gradient(to top, #db0003 50%, #ffb199 100%);
    color: #fff;

    .iconxy {
      margin-right: 10rpx;
      font-size: 40rpx;
    }
  }
}


.button{
  color: white;
  font-size: 30rpx;
  padding: 25rpx 100rpx;
  border-radius: 30px;
  // border: 3rpx solid red;
  // background-image: linear-gradient(to right, rgba(246, 36, 61, 0.53) 0, rgba(243, 2, 2, 0.91) 100%);
  background: url("/static/images/riches/button.png") no-repeat center;
}

.button-share{
  color: white;
  font-size: 30rpx;
  padding: 25rpx 50rpx;
  border-radius: 30px;
  background: url("/static/images/riches/b-share.png") no-repeat center;
  position: relative;
  em{
	  width: 30px;line-height: 15px;;
	  font-size:12px;border-radius: 7px;
	  display: block;text-align: center;
	  position: absolute;
	  left:10px;top:-5px;
	  color:#fff;font-style: normal;
	  background:#c81010;
  }
}

</style>
