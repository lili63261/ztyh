<template>
  <view class="ibg">

		<uni-nav-bar class="uniNavBar" title="" :border="false" color="#ffffff" backgroundColor="#ffffff00"
					left-icon="left" @clickLeft="$tab.navigateBack()" />

    <view class="head" >
<!--      <view class="title">格外关爱，传递爱心</view>-->
      <view class="content"> &nbsp; &nbsp;为深入贯彻落实习近平总书记关于对困难群众要格外关注、格外关爱、格外关心的重要指示精神。近日，经国务院同意，民政部、财政部联合部署在新中国成立75周年之际，向贫困人员、孤儿等困难群众发放一次性生活补助。民政部、财政部要求各地民政、财政部门要高度重视本次一次性生活补助发放工作，加强协同配合，认真组织实施，严格审核发放范围，规范发 放程序，做到资金专款专用，确保X月X日前将一次性生活补助发放到困难群众手中，及时传递党和政府对困难群众的关心关爰。
      </view>
    </view>

    <view class="inviteCode">
      <view class="title">我的邀请码：{{ inviteCode }}</view>
      <view class="content">
        <canvas canvas-id="qrcode" ref="qrcode" style="width: 230rpx;height:230rpx;margin-top: 30rpx;"/>

        <view class="flexColumn" >
          <view class="flexRow" >
              <view @click="doCopy(1)" class="flexRow inviteCode1">
                <view class="">复 制 邀 请 码 </view>
                <view class="iconxy iconxy-fuzhi"></view>
              </view>

          </view>

          <view class=" flexRow inviteLink" @click="doCopy" >
            <view class="txt">复制邀请链接</view>
            <view class="iconxy iconxy-fuzhi"></view>
          </view>
        </view>
      </view>
    </view>


    <view class="reward" >
      <view class="title">邀请好友并实名奖励</view>
      <view class="content">
        <view class="list">
          <view v-for="(item, index) in list" :key="item.id" class="item">
            <view class="left">
              <view class="pic">
                <image :src="'/static/images/user/y' + (index + 1) + '.png'" mode="widthFix"/>
                <!--            <image :src="'/static/images/user/110w.png'" mode="widthFix"/>-->
              </view>
            </view>
            <view class="right">
              <view class="hd">
                邀请满
                <text>{{ item.userNum }}</text>
                人并实名认证
              </view>
              <view class="bd">
                <!--            <view class="iconxy iconxy-daijinquan"></view>-->
                <text>发放</text>
                <text class="spt"><text style="font-size: 45rpx;">{{ item.subsidy }}</text>元补助金</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>







  </view>
</template>

<script>
import uQRCode from '@/utils/uqrcode.js'
import {listReward} from '@/api/reward/reward.js'
import UImage from "../../../uni_modules/uview-ui/components/u--image/u--image.vue";

export default {
  components: {UImage},
  data() {
    return {
      text: '',
      phone: this.$store.getters.phone,
      inviteCode: this.$store.state.user.inviteCode,
      codeurl: getApp().globalData.config.codeurl,
      list: []
    }
  },
  onReady() {
    this.text = this.codeurl + "#/pages/register/index?inviteCode=" + this.inviteCode
    this.qrFun()
    this.getList()
  },
  methods: {
    getList() {
      this.$refs.uToast.loading('加载中...')

      listReward().then((res) => {
        this.list = res.data
        this.$refs.uToast.hide()
      })
    },
    doCopy(e) {
      let text = e == 1 ? this.inviteCode : this.text
      let title = e == 1 ? '邀请码复制成功' : '邀请链接复制成功'
      uni.setClipboardData({
        data: text,
        showToast: false,
        success: () => {
          this.$refs.uToast.success(title)
        }
      })
    },
    qrFun() {
      uQRCode.make({
        canvasId: 'qrcode',
        componentInstance: this,
        text: this.text,
        size: 100,
        margin: 2, //8
        backgroundColor: '#ffffff',
        foregroundColor: '#000000',
        fileType: 'jpg',
        errorCorrectLevel: uQRCode.errorCorrectLevel.H
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.ibg {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: url('/static/images/user/poster_bg.png');
  background-size:contain;
  background-repeat:no-repeat;
  background-color: #305faf;
}

.poster {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 20rpx 20rpx 20rpx;
  border: 1px solid #fff;
  border-radius: 20rpx;
  background: linear-gradient(to bottom, #f0f8ff, #fff);

  .qrcode {
    margin: 60rpx 0;
    padding: 10rpx;
    border-radius: 15rpx;
    background: #fff;
  }

  .code {
    display: flex;
    align-items: center;
    justify-content: center;

    .inviteCode {
      margin-right: 30rpx;
      font-size: 40rpx;
      font-weight: 500;
    }

    .copyBtn {
      display: flex;
      align-items: center;
      justify-content: center;

      .iconxy {
        margin-left: 10rpx;
        font-size: 40rpx;
      }
    }
  }

  .linkBtn {
    display: flex;
    align-items: center;
    margin: 20rpx 0 60rpx 0;
    padding: 20rpx 70rpx;
    border-radius: 16rpx;
    background-image: linear-gradient(45deg, #2979ff 50%, #609cff 100%);
    color: #fff;

    .iconxy {
      margin-right: 10rpx;
      font-size: 40rpx;
    }
  }
}

.list {
  //margin: 0 20rpx;
  width: 100%;
  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20rpx;
    border: 1px solid #fff;
    border-radius: 20rpx;
    background: linear-gradient(to right, #8fc1ed, #d2e4f4);
  }

  .left {
    display: flex;
    align-items: center;
    justify-content: center;

    .pic {

      width: 200rpx;
      image {
        display: block;
        width: 100%;
      }
    }
  }

  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .hd {
      font-size: 32rpx;
      font-weight: 500;

      text {
        padding: 0 6rpx;
        color: $pbc;
        font-size: 36rpx;
      }
    }

    .bd {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 10rpx;
      padding: 6rpx 15rpx;
      border-radius: 40rpx;
      background: #f0f8ff;

      .iconxy {
        padding-right: 10rpx;
        color: #f7df32;
      }

      .spt {
        padding: 0 6rpx;
      }
    }
  }
}

.head {
  position: relative;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.71);
  border-radius: 20rpx;
  min-height: 300rpx;
  margin: 20rpx 20rpx;
  align-items: center;
  margin-top: 350rpx;


  .title {
    position: absolute; /* 子元素绝对定位 */
    top: -35rpx;
    left: 50%; /* 将左边界移动到父容器的50%处 */
    transform: translateX(-50%); /* 向左移动自身宽度的50% */
    color: white;
    padding: 15rpx 40rpx;
    font-size: 28rpx;
    font-weight: bold;
    border-radius: 20rpx;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    background: linear-gradient(to bottom, #e15d5d 0%, #fc6c5b 100%);
  }

  .content {
    //word-wrap: break-word;
    white-space: pre-wrap;
    padding: 10px; /* 添加左侧空白 */
    padding-top: 10rpx;
    text-indent: 20px; /* 首行缩进 */
    font-size: 30rpx;
    color: #d14242;
  }
}

.inviteCode{
  position: relative;
  flex-direction: column;
  background-color: white;
  border-radius: 20rpx;
  margin: 20rpx 20rpx;
  align-items: center;
  margin-top: 30rpx;


  .title {
    position: absolute; /* 子元素绝对定位 */
    top: -35rpx;
    left: 50%; /* 将左边界移动到父容器的50%处 */
    transform: translateX(-50%); /* 向左移动自身宽度的50% */
    color: white;
    padding: 15rpx 40rpx;
    font-size: 28rpx;
    font-weight: bold;
    border-radius: 20rpx;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    background: linear-gradient(to bottom, #e15d5d 0%, #fc6c5b 100%);
  }

  .content {
    margin-top: 10rpx;
    display: flex;
    padding: 10rpx;
    align-items: center;
    justify-content: center;
    .qrcode {
      margin-right: 70rpx;
      width: 200rpx; height: 200rpx;
      border-radius: 15rpx;
    }


    .inviteLink{
      color: white;
      padding: 15rpx 30rpx;
      border-radius: 50rpx;
      background-image: linear-gradient(45deg, #2979ff 50%, #609cff 100%);;
      margin-right: auto;
      margin-top: 30rpx;
    }
    .inviteCode1{
      color: white;
      padding: 15rpx 30rpx;
      border-radius: 50rpx;
      margin-right: auto;
      background-image: linear-gradient(45deg, #2979ff 50%, #609cff 100%);;
    }
  }
}

.reward {
  position: relative;
  flex-direction: column;
  background-color: white;
  border-radius: 20rpx;
  margin: 20rpx 20rpx;
  align-items: center;
  margin-top: 30rpx;


  .title {
    position: absolute; /* 子元素绝对定位 */
    top: -35rpx;
    left: 50%; /* 将左边界移动到父容器的50%处 */
    transform: translateX(-50%); /* 向左移动自身宽度的50% */
    color: white;
    padding: 15rpx 40rpx;
    font-size: 28rpx;
    font-weight: bold;
    border-radius: 20rpx;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    background: linear-gradient(to bottom, #e15d5d 0%, #fc6c5b 100%);
  }

  .content{
    margin-top: 10rpx;
    display: flex;
    padding: 10rpx;
    align-items: center;
    justify-content: center;
  }

}

</style>
