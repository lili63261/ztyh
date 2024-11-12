<template>
  <view class="ibg">
    <z-paging
      ref="paging"
      v-model="dataList"
      hide-no-more-inside
      @query="queryList"
    >
      <view slot="top">
        <!-- <uni-nav-bar class="uniNavBar" title="我的团队" :border="false" backgroundColor="#ffffff00"
					left-icon="left" @clickLeft="$tab.navigateBack()" /> -->
        <!-- 正式 -->
        <!-- #ifdef !IS-PORD -->
        <!-- <view class="head">
					<view class="teamMoney">
						<view class="name">
							团队佣金 (元)
						</view>
						<view class="num">
							<u-count-to :endVal="teamMoney" autoplay :decimals="2" color="#fff" />
						</view>
					</view>
					<view class="btn" @click="$tab.switchTab('/pages/user/team/poster')">
						<view class="iconxy iconxy-dianzan"></view>
						<view class="txt">邀请好友</view>
						<u-icon name="arrow-right" color="#fff" />
					</view>
				</view>
				
				<view class="btns">
					<view class="btn" @click="onTake()">
						<view class="iconxy iconxy-tixianjilu"></view>
						<view>佣金提现</view>
					</view>
					<view class="btn" @click="$tab.navTo('/pages/user/log?type=teamAward')">
						<view class="iconxy iconxy-yundanmingxitongji"></view>
						<view>佣金明细</view>
					</view>
				</view> -->
        <!-- #endif -->

        <view class="iTab">
          <!-- <z-tabs :list="tabList" :current="tabCurrent" :bar-width="tabBarWidth" @change="changeTab" /> -->
          <uni-segmented-control
		  class="segmented-control"
		  activeColor="#FF0022"
            :current="tabCurrent"
            :values="tabList"
            @clickItem="changeTab"
          />
        </view>
      </view>

      <view class="list">
        <view v-for="(item, index) in dataList" :key="index" class="item">
          <view class="userinfo">
            <view class="name">
              {{ item.name }}
            </view>
            <view class="phone">
              <!-- <view class="iconxy iconxy-shouji"></view> -->
			  <image src="/static/images/temp/12.png" mode="widthFix" class="img12-class"></image>
              <view class="txt">{{ item.phone }}</view>
            </view>
          </view>
          <view class="acc">
            <image
              :src="
                item.name !== '未实名'
                  ? '/static/images/temp/11.png'
                  : '/static/images/temp/10.png'
              "
              mode="widthFix"
            />
          </view>
        </view>
      </view>

      <view slot="empty">
        <u-empty icon="/static/images/common/empty1.png" text="暂无数据" />
      </view>
    </z-paging>
  </view>
</template>

<script>
import { total } from "@/api/system/user.js";
import { myInviteList, inviteNum, receiveList } from "@/api/reward/reward.js";

export default {
  data() {
    return {
      teamMoney: 0,
      regCount: 0,
      accCount: 0,
      tabList: ["一级邀请", "二级邀请", "三级邀请"],
      tabCurrent: 0,
      tabBarWidth: 88,
      dataList: [],
    };
  },
  onReady() {
    // this.$u.getRect('.iTab').then(res => {
    // 	this.tabBarWidth = res.width / 3 - 20 + 'px'
    // })
  },
  onShow() {
    this.getTotal();
    // this.getInviteNum()
  },
  methods: {
    onTake() {
      if (!this.isAcc) {
        this.checkAuth("acc");
        return false;
      }

      if (!this.isAdr) {
        this.checkAuth("adr");
        return false;
      }

      if (this.teamMoney <= 0) {
        this.$refs.uToast.error("暂无可提现佣金");
        return false;
      }

      this.$tab.navTo("/pages/user/take?type=teamAward");
    },
    getInviteNum() {
      inviteNum().then((res) => {
        this.regCount = res.data.inviteNum;
        this.accCount = res.data.certificationNum;
      });
    },
    // 资金统计
    getTotal() {
      total().then((res) => {
        this.teamMoney = res.data.teamAward;
      });
    },
    changeTab(idx) {
      this.tabCurrent = idx.currentIndex;
      this.$refs.paging.reload();
    },
    async queryList(pageNo, pageSize) {
      // this.$refs.uToast.loading('加载中...')
      uni.showLoading({
        title: "加载中...",
      });

      // const params = {
      // 	pageNum: pageNo,
      // 	pageSize: pageSize,
      // 	type: this.tabCurrent + 1
      // }

      const res = await receiveList(this.tabCurrent + 1);

      const list = res.data;
      this.$refs.paging.complete(list);

      // this.$refs.uToast.hide()
      uni.hideLoading();
    },
  },
};
</script>

<style lang="scss" scoped>
.segmented-control{
	margin: 32rpx;
}
.ibg {
  // min-height: 100vh;
  // background: url('/static/images/common/bg.png') top center no-repeat;
  // background-size: contain;
}
.head {
  position: relative;
  margin: 0 16rpx 16rpx 16rpx;
  padding: 40rpx;
  border-radius: 16rpx;
  background: url("/static/images/common/tbg.jpg") center bottom no-repeat;
  background-size: cover;
  color: #fff;
  .teamMoney {
    .num {
      margin-top: 10rpx;
      .u-count-num {
        font-size: 60rpx !important;
      }
    }
  }
  .count {
    display: flex;
    align-items: center;
    margin-top: 40rpx;
    view {
      display: flex;
      align-items: center;
      &:first-child {
        margin-right: 40rpx;
      }
      .name {
        padding-right: 10rpx;
      }
      .u-count-num {
        font-size: 40rpx !important;
      }
    }
  }
  .btn {
    position: absolute;
    top: calc(50% - 30rpx);
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 20rpx 0 30rpx;
    height: 60rpx;
    line-height: 60rpx;
    border-radius: 30rpx 0 0 30rpx;
    background-image: linear-gradient(45deg, #2979ff 50%, #609cff 100%);
    .txt {
      margin: 0 10rpx;
    }
  }
}

.btns {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20rpx;
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 45%;
    padding: 25rpx 0;
    text-align: center;
    border-radius: 30rpx;
    font-weight: bold;
    font-size: 30rpx;
    background-image: linear-gradient(45deg, #2979ff 50%, #609cff 100%);
    color: #fff;
    .iconxy {
      margin-right: 10rpx;
      font-size: 40rpx;
    }
  }
}
// .iTab {
// 	margin: 0 20rpx;
// 	border-radius: 16rpx 16rpx 0 0;
// 	overflow: hidden;
// }
.list {
  // margin: 0 20rpx 20rpx 20rpx;
  // padding-top: 20rpx;
  // border-radius: 0 0 16rpx 16rpx;
  // background: #fff;
  padding: 0 32rpx;
  border-radius: 32rpx;
  box-sizing: border-box;
  .item {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding: 10rpx 40rpx;
    border-bottom: 2rpx solid #efefef;
    background: white;
    &:last-child {
      border-bottom: 0;
    }
  }

  .userinfo {
    .name {
      padding-bottom: 15rpx;
      font-size: 32rpx;
      font-weight: 500;
    }
    .phone {
      display: flex;
      align-items: center;
      .iconxy {
        padding-right: 6rpx;
        color: $pbc;
      }
	  .img12-class{
		width: 40rpx;
		height: 40rpx;
		border-radius: 50%;
		margin-right: 10rpx;
	  }
    }
  }
  .acc {
    width: 160rpx;
    image {
      display: block;
      width: 100%;
    }
  }
}
</style>
