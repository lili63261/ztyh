<!-- 基于z-paging封装个性化分页组件演示(vue) -->
<template>
  <view class="content">
    <z-paging ref="paging" v-model="dataList" @query="queryList" :auto="false">
        <view class="list-class">
        <view class="item" v-for="(item, index) in dataList" :key="index">
          <view class="left">
            <view class="item-title">{{ item.title }}</view>
            <view class="item-afterMoney">{{ item.afterMoney }}</view>

          </view>
          <view class="rihght">
            <view class="item-money">{{item.dp}}{{ item.money }}</view>
            <view class="item-createTime">{{ item.createTime }}</view>
          </view>
        </view>
      </view>
    </z-paging>
  </view>
</template>

<script>
import { currencyAccountLog } from '@/api/mine/withdraw.js';
export default {
  data() {
    return {
      // v-model绑定的这个变量不要在分页请求结束中自己赋值！！！
      dataList: [],
      code: 0,
    };
  },
  onLoad(e){
    if(e.code){
      this.code = e.code;
      uni.setNavigationBarTitle({
        title: `${this.code }货币明细`
      });
    }
  },
  onReady(){
    if(this.code){
      this.$refs.paging.reload(true);
    }
  },
  
  methods: {
    tabChange(index) {
      this.tabIndex = index;
      // 当切换tab或搜索时请调用组件的reload方法，请勿直接调用：queryList方法！！
     
    },
    queryList(pageNo, pageSize) {
      // 组件加载时会自动触发此方法，因此默认页面加载时会自动触发，无需手动调用
      // 这里的pageNo和pageSize会自动计算好，直接传给服务器即可
      // 模拟请求服务器获取分页数据，请替换成自己的网络请求
      const params = {
        pageNum: pageNo,
        pageSize: pageSize,
        code: this.code
      };
      currencyAccountLog(params).then(res=>{
        this.$refs.paging.complete(res.data.list);
      })
      // this.$request.queryList(params).then(res => {
      // 将请求的结果数组传递给z-paging
      // }).catch(res => {
      // 如果请求失败写this.$refs.paging.complete(false);
      // 注意，每次都需要在catch中写这句话很麻烦，z-paging提供了方案可以全局统一处理
      // 在底层的网络请求抛出异常时，写uni.$emit('z-paging-error-emit');即可
      // 	this.$refs.paging.complete(false);
      // })
    },
  },
};
</script>

<style scoped lang="scss">
.list-class {
  padding: 0 20rpx;
  box-sizing: border-box;
  border-radius: 20rpx;
  margin-top: 20rpx;
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20rpx;
    border-bottom: 1rpx solid #f5f5f5;
    font-size: 28rpx;
    color: #333333;
    background: white;
    .item-title {
      /** 文本1 */
      font-size: 32rpx;
      font-weight: 700;
      letter-spacing: 1.4rpx;
      line-height: 46.34rpx;
      color: rgba(0, 0, 0, 1);
      text-align: left;
      vertical-align: top;
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
    }
  }
}
</style>
