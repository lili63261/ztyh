<template>

  <view v-if="isReady" class="ibg flexColumn">
<!--    <view class="head">-->
<!--      <image src="/static/images/common/cf3.jpg" mode="widthFix"/>-->
<!--      <view class="desc">-->
<!--        {{ cardInfo.introduce }}-->
<!--      </view>-->
<!--    </view>-->
	<div class="title-h1">财富共享 · 喜迎新生</div>
    <view class="desc">
      {{ cardInfo.introduce }}
    </view>

    <view class="listBox">
      <view class="list">
        <view v-for="item,index in list" :key="item.id" class="item">
          <view class="box">
            <view class="hd">
              <image class="logo" :src="item.cover" />
              <view class="title">{{ item.name }}</view>
			  
              <view class="tag" :class="{'tag-right':k==0}" v-for="t,k in tag[index]">{{t}}</view>
              <!-- <view class="tag">便捷</view> -->

              <view class="quantity" :class="{ 'red': item.quantity < 100 }">
                剩余: {{ item.quantity }}张
              </view>
            </view>
            <view class="pic">
              <image :src="item.cover" mode="widthFix"/>
            </view>
            <view class="bd">
              <view class="quota">额度:
                <text>{{ item.quota }}万</text>
              </view>
<!--              <view class="subjoinStr">赠送{{ item.subjoinStr }}</view>-->
              <view @click="doPay(item)" class="button">立即领取</view>
            </view>
          </view>
<!--          <view class="btn" @click="doPay(item)">-->
<!--            <view class="iconxy iconxy-Icon-shenqinghuizhen"></view>-->
<!--            <view class="txt">立即领取</view>-->
<!--          </view>-->
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
    box-shadow: 0 0 5px 0px #cc8c52;
  }

  .box {
    padding-bottom: 10rpx;
    border-radius: 16rpx;
    // background-image: linear-gradient(to bottom, #e6b980 0%, #eacda3 100%);
    background-image: linear-gradient(135deg, #fffedf 0%, #ffdd98 100%);

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


      .quantity {
        display: flex;
        align-items: center;
        padding: 10rpx 10rpx 10rpx 50rpx;
        border-radius: 0 10rpx 10rpx 0;
        background-image: linear-gradient(to left, #a0cfff 0, rgba(255, 255, 255, .2) 100%);
        color: #2b85e4;

        &.red {
          background-image: linear-gradient(to left, #ffc6cf 0, rgba(255, 255, 255, .2) 100%);
          color: #e83e00;
        }

        .iconxy {
          margin: 0 10rpx;
        }
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

.ibg {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: url('/static/images/life/bg2.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-color: #ffec58;

  .desc{
    color: #2b85e4;
	font-weight: bold;
	// color: #e4842b;
    font-size: 35rpx;
    margin: 20rpx 20rpx 20rpx 20rpx;
    background-color: rgba(238, 247, 251, 0.68);
    border-radius: 10rpx;
    padding:30rpx 20rpx;

  }

}

.button{
  color: white;
  font-size: 30rpx;
  padding: 15rpx 50rpx;
  border-radius: 20rpx;
  border: 3rpx solid red;
  background-image: linear-gradient(to right, rgba(246, 36, 61, 0.53) 0, rgba(243, 2, 2, 0.91) 100%);
}

</style>
