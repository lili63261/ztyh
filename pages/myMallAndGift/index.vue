<!-- 基于z-paging封装个性化分页组件演示(vue) -->
<template>
  <view class="content">
    <!-- 这里就很整洁了，只要设置ref，绑定query事件，绑定list就可以了 -->
    <z-paging ref="paging" v-model="dataList" @query="queryList" :auto="false">
      <!-- 需要固定在顶部不滚动的view放在slot="top"的view中，如果需要跟着滚动，则不要设置slot="top" -->
      <template #top>
        <!-- 注意！此处的z-tabs为独立的组件，可替换为第三方的tabs，若需要使用z-tabs，请在插件市场搜索z-tabs并引入，否则会报插件找不到的错误 -->
        <z-tabs :list="tabList" @change="tabChange" :current="tabIndex" />
      </template>
      <!-- 如果希望其他view跟着页面滚动，可以放在z-paging标签内 -->
      <view class="item-list">
    <view v-for="item in dataList" :key="item.id" class="item" @click="itemClick(item.additionStr)">
      <view class="item-header">
        <image class="cover" :src="item.cover" alt="封面图" />
        <view class="item-info">
          <text class="name">{{ item.name }}</text>
          <text class="uniqueNo">兑换识别码: {{ item.uniqueNo }}</text>
          <text class="uniqueNo">抵扣支票: {{ item.subsidy }}</text>
          <!-- <text class="uniqueNo" v-if="item.additionStr">发动机编号: {{ item.additionStr }}</text> -->
          <text class="uniqueNo">兑换时间: {{ item.createTime }}</text>
          <view class="item-details">
      </view>
        </view>
      </view>
          <view class="uniqueNo view-driver-s-license" v-if="item.additionStr">查看行驶证</view>
    
    </view>
  </view>
    </z-paging>
  </view>
</template>

<script>
import { shopBuyRecordList } from "@/api/system/user.js";
export default {
  data() {
    return {
      // v-model绑定的这个变量不要在分页请求结束中自己赋值！！！
      dataList: [],
      // 1-黄金，2-房产，3-别墅，4汽车
      tabList: [
        {name:'黄金',value:1},
        {name:'房产',value:2},
        {name:'别墅',value:3},
        {name:'汽车',value:4},],
      tabIndex: 0,
      list: [
        // {
        //   imageUrl: require("@/static/images/temp/dianpu-1.png"),
        //   productName: "豪华型",
        //   ticket: "5",
        //   code: "ABC123",
        //   time: "2024-10-22",
        // },
        // {
        //   imageUrl: require("@/static/images/temp/dianpu-1.png"),
        //   productName: "舒适型",
        //   ticket: "3",
        //   code: "XYZ789",
        //   time: "2024-10-23",
        // },
      ],
    };
  },
  onLoad(e){
    if(e.type){
      this.tabIndex = e.type;
    }
  },
  onReady(){
    this.$refs.paging.reload(true);
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
     const type = this.tabList[this.tabIndex].value;
      // 1-黄金，2-房产，3-别墅，4汽车
      shopBuyRecordList(type).then(res => {
        this.$refs.paging.complete(res.data);
      }
      )
      // this.$request.queryList(params).then(res => {
      // 将请求的结果数组传递给z-paging
    
      // }).catch(res => {
      // 如果请求失败写this.$refs.paging.complete(false);
      // 注意，每次都需要在catch中写这句话很麻烦，z-paging提供了方案可以全局统一处理
      // 在底层的网络请求抛出异常时，写uni.$emit('z-paging-error-emit');即可
      // 	this.$refs.paging.complete(false);
      // })
    },
    itemClick(additionStr) {
      if(additionStr){
        uni.navigateTo({
           url: '/pages/myMallAndGift/driverSLicense?additionStr='+additionStr
        });
      }
      
    },
  },
};
</script>

<style>
.notice {
  background-color: red;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 12rpx 20rpx;
  font-size: 24rpx;
}

.list-item {
  display: flex;
  background-color: #fff;
  border-radius: 20rpx;
  padding: 30rpx;
  margin-bottom: 30rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.1);
}

.item-image {
  width: 200rpx;
  height: 200rpx;
  border-radius: 20rpx;
  margin-right: 30rpx;
}

.item-content {
  flex: 1;
}

.product-info {
  margin-bottom: 20rpx;
}

.product-name {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
}

.details {
  display: flex;
  flex-direction: column;
}

.detail-text {
  font-size: 28rpx;
  color: #666;
  margin-top: 8rpx;
}


.item-list {
  display: flex;
  flex-direction: column;
  padding: 20rpx;
}

.item {
  display: flex;
  flex-direction: column;
  border: 2rpx solid #e0e0e0;
  margin-bottom: 20rpx;
  padding: 20rpx;
}

.item-header {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.cover {
  width: 278rpx;
  height: 200rpx;
  margin-right: 20rpx;
}

.item-info {
  display: flex;
  flex-direction: column;
}

.name {
  font-weight: bold;
  margin-bottom: 10rpx;
}

.uniqueNo {
  color: #888;
  width: 100%;
  white-space: nowrap;
}
.view-driver-s-license{
  color: #E23C3E;
  border: 1rpx solid #E23C3E;
  border-radius: 10rpx;
  text-align: center;
  padding: 5rpx 0;
  margin-top: 10rpx;

}
.item-details {
  /* margin-top: 20rpx; */
}

.additionStr, .createTime {
  margin-top: 10rpx;
}
</style>
