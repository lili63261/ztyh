<!-- 基于z-paging封装个性化分页组件演示(vue) -->
<template>
  <view>
    <!-- 这里就很整洁了，只要设置ref，绑定query事件，绑定list就可以了 -->
    <z-paging ref="paging" v-model="dataList" @query="queryList">
      <template #top>
        <view class="header">
          <view class="header-title">账户总额</view>
          <view class="header-line">{{ subsidy }}万</view>
        </view>
        <view class="time-class"
          ><uni-icons type="sound-filled" size="30" /><span>数据截止：</span
          >{{ time }}</view
        >
      </template>
      <view class="list-class">
        <view class="item" v-for="(item, index) in dataList" :key="index">
          <view class="left">
            <view class="item-title">{{ item.title }}</view>
            <view class="item-money">{{item.dp}}{{ item.money }}</view>

          </view>
          <view class="right">
            <view class="item-afterMoney">{{ item.afterMoney }}</view>

            <view class="item-createTime">{{ item.createTime }}</view>
          </view>
        </view>
      </view>
    </z-paging>
  </view>
</template>

<script>
import { accountLog } from "@/api/mine/cashback.js";
import dayjs from "dayjs";

export default {
  data() {
    return {
      // v-model绑定的这个变量不要在分页请求结束中自己赋值！！！
      dataList: [],
      // tabList: ['测试1','测试2','测试3','测试4'],
      tabIndex: 0,
      subsidy: 0,
      time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    };
  },
  onLoad(e) {
    if (e.subsidy) {
      this.subsidy = e.subsidy;
    }
  },
  methods: {
    tabChange(index) {
      this.tabIndex = index;
      // 当切换tab或搜索时请调用组件的reload方法，请勿直接调用：queryList方法！！
      this.$refs.paging.reload(true);
    },
    queryList(pageNo, pageSize) {
      // 组件加载时会自动触发此方法，因此默认页面加载时会自动触发，无需手动调用
      // 这里的pageNo和pageSize会自动计算好，直接传给服务器即可
      // 模拟请求服务器获取分页数据，请替换成自己的网络请求
      const params = {
        pageNum: pageNo,
        pageSize: pageSize,
        type: "subsidy",
      };
      accountLog(params).then((res) => {
        // console.log(res);
        this.$refs.paging.complete(res.data.list);
      });

      // this.$request.queryList(params).then(res => {
      // 将请求的结果数组传递给z-paging
      // this.$refs.paging.complete([]);
      // }).catch(res => {
      // 如果请求失败写this.$refs.paging.complete(false);
      // 注意，每次都需要在catch中写这句话很麻烦，z-paging提供了方案可以全局统一处理
      // 在底层的网络请求抛出异常时，写uni.$emit('z-paging-error-emit');即可
      // 	this.$refs.paging.complete(false);
      // })
    },
    itemClick(item) {
      console.log("点击了", item.title);
    },
  },
};
</script>

<style scope lang="scss">
.header {
  height: 300rpx;
  //   background: #ff6a6a;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #ef2028;

  background: url("@/static/images/temp/chanpinkuang.png") no-repeat center
    center;
  background-size: 108% 118%;
  background-repeat: no-repeat;
  position: relative;
  .header-title {
    font-size: 40rpx;
    font-weight: bold;
    position: absolute;
    left: 40rpx;
    top: 40rpx;
  }
  .header-line {
    font-size: 48rpx;
    font-weight: bold;
  }
}
.time-class {
  background: white;
  padding: 20rpx;
  border-radius: 20rpx;
  margin: 0 20rpx 20rpx 20rpx;
  font-size: 28rpx;
  color: #999999;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  span {
    color: #333333;
    font-size: 34rpx;
    font-weight: bold;
  }
}
.list-class {
  padding: 0 20rpx;
  box-sizing: border-box;
  border-radius: 20rpx;
  margin-top: 20rpx;
  .item {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    padding: 20rpx;
    border-bottom: 1rpx solid #f5f5f5;
    font-size: 28rpx;
    color: #333333;
    background: white;
    width: 100%;
    .left,.right{
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .item-title {
      /** 文本1 */
      font-size: 32rpx;
      font-weight: 700;
      letter-spacing: 1.4rpx;
      line-height: 46.34rpx;
      color: rgba(0, 0, 0, 1);
      text-align: left;
      vertical-align: top;
      white-space: nowrap;
    }
    .item-money {
     

      font-size: 32rpx;
      font-weight: 700;
      letter-spacing: 1.4rpx;
      line-height: 46.34rpx;
      color: #ef2028;
      text-align: right;
      vertical-align: top;
      margin-top: 4rpx;
    }
    .item-afterMoney {
      /** 文本1 */
      font-size: 32rpx;
      font-weight: 400;
      letter-spacing: 1.4rpx;
      line-height: 28.96rpx;
      color: rgba(166, 166, 166, 1);
      text-align: left;
      vertical-align: top;
      margin-top: 20rpx;
    }
    .item-createTime {
      /** 文本1 */
      font-size: 32rpx;
      font-weight: 400;
      letter-spacing: 1.4rpx;
      line-height: 28.96rpx;
      color: rgba(166, 166, 166, 1);
      text-align: right;
      vertical-align: top;
      margin-top: 20rpx;
      white-space: nowrap;
    }
  }
}
</style>
