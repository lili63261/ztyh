<template>
  <view class="bond-wallet">
    <view class="heard-warp-class">
      <view class="heard-title-class"> 每张债券价值100万 </view>
      <view class="heard-class">
        <view class="item-class">
          <view class="title-class"> 我的债券 </view>
          <view class="value-class">
            <view>{{ bondNumSize }}张</view>
          </view>
        </view>
        <view class="item-class">
          <view class="title-class"> 债券总价值 </view>
          <view class="value-class">
            <view>{{ bondNumSize * 100 }}万</view>
            <view class="bt-class">申请提现</view>
          </view>
        </view>
        <view class="item-class">
          <view class="title-class"> 已提现金额 </view>
          <view class="value-class">
            <view>{{totalMoney}}万</view>
            <view class="bt2-class">提现记录</view>
          </view>
        </view>
      </view>
    </view>

    <view class="content-class">
      <view class="item-class" v-for="item in recordList" :key="item.id">
        <view class="title-class"> 债券张数：{{ item.bond }}张 </view>
        <view class="title-class"> 面额总值：{{ item.bond * 100 }}万元 </view>
        <view class="title-class"> 所获渠道：债券买入 </view>
        <view class="title-class"> 获得时间：{{ item.createTime }} </view>
      </view>
    </view>
  </view>
</template>

<script>
import { bondNum } from "@/api/system/user.js";
import { userBuyRecordList } from "@/api/bond/bond.js";
import { totalByType } from "@/api/mine/withdraw.js";

export default {
  data() {
    return {
      totalMoney: 0,
      bondNumSize: 0,
      recordList: [],
    };
  },
  onLoad() {
    this.getBondNum();
    this.getUserBuyRecordList();
    this.getTotalByType();
  },
  methods: {
    //我的债券
    getBondNum() {
      bondNum().then((res) => {
        this.bondNumSize = res.data;
      });
    },
    //所有债券收益明细
    getUserBuyRecordList() {
      userBuyRecordList().then((res) => {
        this.recordList = res.data;
      });
    },
    //提现总金额
    getTotalByType() {
      totalByType(103).then((res) => {
        this.totalMoney = res.data;
      });
    },
  },
};
</script>



<style scoped lang="scss">
.bond-wallet {
  background: linear-gradient(to bottom, #ff0022, #fff 50%);
  min-height: calc(100vh - 88rpx);
  padding: 16rpx;
  position: relative;
  .tx-class {
    position: fixed;
    top: 20rpx;
    right: 20rpx;
    color: #fff;
    font-weight: bold;
    font-size: 30rpx;
    z-index: 999999;
  }
  .heard-warp-class {
    width: 100%;
    height: 300rpx;
    background: linear-gradient(to bottom, #fee799, #fff 50%);
    border-radius: 20rpx;
    padding: 20rpx;

    .heard-title-class {
      font-size: 30rpx;
      color: #ff0022;
      font-weight: bold;
      text-align: left;
      margin-bottom: 20rpx;
    }
  }
  .heard-class {
    display: flex;
    justify-content: space-around;
    align-items: stretch;
    gap: 20rpx;

    .item-class {
      display: flex;
      flex-direction: column;
      align-items: center;
      border-radius: 20rpx;
      background: #ffffff;
      padding: 30rpx 20rpx;
      gap: 20rpx;
      .title-class {
        font-size: 30rpx;
        color: #999;
        font-weight: bolder;
      }
      .value-class {
        font-size: 26rpx;
        color: #ff0022;
        font-weight: bold;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .bt-class {
          margin-top: 10rpx;
          background: #ff0022;
          color: #fff;
          border-radius: 20rpx;
          padding: 10rpx 20rpx;
        }
        .bt2-class {
          margin-top: 10rpx;
          background: #0586fb;
          //   background: #fdaf27;
          color: #fff;
          border-radius: 20rpx;
          padding: 10rpx 20rpx;
        }
      }
    }
  }

  .content-class {
    background: #fff;
    margin-top: 20rpx;
    border-radius: 20rpx;
    padding: 32rpx;
    .item-class {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 20rpx;
      padding: 40rpx 20rpx;
      // border-bottom: 2rpx solid #afacac;
      background: url("@/static/images/temp/dhfangkuang.png") no-repeat center
        center;
      background-size: 100% 100%;
      margin-bottom: 20rpx;
      .title-class {
        font-size: 30rpx;
        color: #ff0022;
        font-weight: bold;
      }
      .value-class {
        font-size: 26rpx;
        color: #ff0022;
      }
    }
  }
}
</style>