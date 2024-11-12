<template>
  <view :class="Object.keys(travelTicketData).length > 0 && travelTicketData.status > 0 ? 'ibgw' : 'ibg'">
    <uni-nav-bar class="uniNavBar" :border="false" color="#fff" backgroundColor="#ffffff00" left-icon="left" @clickLeft="$tab.navigateBack" />
    <view class="head">
      <block  v-if="Object.keys(travelTicketData).length > 0">
        <image src="/static/images/apply/quanv6.png" mode="widthFix" />
        <view class="no"  v-if="travelTicketData.status === 1">参会识别码.{{ travelTicketData.busiParam.no }}</view>
      </block>
      <image v-else src="/static/images/apply/title-v3.png" mode="widthFix" />
    </view>

    <block v-if="Object.keys(travelTicketData).length > 0">
      <view class="travel" :class="{'travelTopv':travelTicketData.status === 0}">
        <view class="travelBd">
          <view class="steps">
            <view class="item">
              <view class="left">
                <view class="lable">出发城市</view>
                <view class="value">{{ travelTicketData.startCity }}</view>
              </view>
              <view class="iconxy iconxy-chufa" style="padding-right: 25rpx;"></view>
            </view>
            <view class="item">
              <view class="left">
                <view class="lable">会议地点</view>
                <view class="value">雄安商务服务中心1号门</view>
              </view>
              <view class="iconxy iconxy-querendaoda"></view>
            </view>
            <view class="arrow">
              <view class="iconxy iconxy-congwodeweizhichufa_moren"></view>
            </view>
          </view>
          <view class="dataInfo">
            <view class="item">
              <view class="name">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名:</view>
              <view class="value">{{ travelTicketData.name }}</view>
            </view>
            <view class="item">
              <view class="name">手机号码:</view>
              <view class="value">{{ travelTicketData.phone }}</view>
            </view>
            <view class="item">
              <view class="name">身份证号:</view>
              <view class="value">{{ travelTicketData.idCard }}</view>
            </view>
            <view class="item">
              <view class="name">出行方式:</view>
              <view class="value">{{ travelTicketData.trip }}</view>
            </view>
            <view class="item">
              <view class="name">出发日期:</view>
              <view class="value"><uni-dateformat :date="travelTicketData.tripDate" format="yyyy-MM-dd" /></view>
            </view>
            <view v-if="travelTicketData.status >= 0" class="item">
              <view class="name">是否委托:</view>
              <view v-if="travelTicketData.pet.indexOf('自行前往') > -1" class="value trustItem">
                <view class="pet">自行前往</view>
                <u-upload  v-if="travelTicketData.status > 0"
                    :fileList="fileList"
                    name="piaogen"
                    :maxCount="1"
                    @afterRead="afterRead"
                >
                  <view class="mBtn">已抵达？上传票根报销</view>
                </u-upload>
              </view>
              <view v-else class="value trustItem">
                <view class="pet">委托办理出行</view>
                <view style="color: #f56c6c;font-size: 26rpx;">( 将由公司统一办理票务出行 )</view>
              </view>
            </view>
          </view>
        </view>
        <view class="travelHd">
          <view class="status" :class="'status' + travelTicketData.status">{{ travelTicketData.statusDesc }}</view>
        </view>
      </view>

      <view class="travelBtns">
        <view v-if="travelTicketData.status === 0" class="btn btn0" @click="doDel()">
          <view class="iconxy iconxy-apply"></view>
          <view>重新报名参会</view>
        </view>
        <view v-else class="btns">
          <view class="btn" @click="showTips = true">
            <view class="iconxy iconxy-apply"></view>
            <view>修改参会信息</view>
          </view>
          <!-- <view class="btn btn2" @click="$tab.navTo('/pages/apply/vote')">
            <view class="iconxy iconxy-18"></view>
            <view>点击查看入场券</view>
          </view> -->
        </view>
      </view>
	  <!-- <view class="foot-bg" v-show="travelTicketData.status === 0"></view> -->
    </block>

    <block v-else>
		<view class="formbox">
			<view class="formtitle">第一届国务联合入住大会</view>
      <u--form
          ref="uForm"
          labelPosition="top"
          labelWidth="30%"
          :model="model"
          :rules="rules"
      >
        
        <view class="box info">
          <view class="hd">个人信息</view>
          <view class="bd">
            <u-form-item
                label="姓名"
                prop="name"
                borderBottom
				labelPosition="left"
            >
              <u--input v-model="model.name" placeholder="请填写参会人姓名" border="none"/>
            </u-form-item>
            <u-form-item
                label="身份证号"
                prop="idCard"
                borderBottom
				labelPosition="left"
            >
              <u--input v-model="model.idCard" type="idcard" placeholder="请填写参会人身份证号" border="none"/>
            </u-form-item>
            <u-form-item
                label="手机号"
                prop="phone"
                borderBottom
				labelPosition="left"
            >
              <u--input v-model="model.phone" type="number" placeholder="请填写参会人手机号" border="none"/>
            </u-form-item>
          </view>
        </view>
		<view class="box info">
		  <view class="hd">参会信息</view>
		  <view class="bd">
		    <u-form-item
		        label="会议地点"
		        prop="point"
		        borderBottom
				labelPosition="left"
		    >
		      <u--input
		          v-model="model.point"
		          disabled
		          disabledColor="#ffffff"
		          placeholder="请选择会议地点"
		          border="none"
		          style="pointer-events:none"
		      />
		      <u-icon slot="right" name="map" />
		    </u-form-item>
		    <u-form-item
		        label="出发地点"
		        prop="startCity"
		        borderBottom
				labelPosition="left"
		    >
		      <u--input v-model="model.startCity" placeholder="请填写出发地点" border="none"/>
		    </u-form-item>
		    <u-form-item
		        label="出发时间"
		        prop="tripDate"
		        borderBottom
				labelPosition="left"
		        @click="showCalendar = true; hideKeyboard()"
		    >
		      <u--input
		          v-model="model.tripDate"
		          disabled
		          disabledColor="#ffffff"
		          placeholder="请选择出发时间"
		          border="none"
		          style="pointer-events:none"
		      />
		      <u-icon slot="right" name="calendar" />
		    </u-form-item>
		    <u-form-item
		        label="出行方式"
		        prop="trip"
		        borderBottom
				labelPosition="left"
		        @click="showTrip = true; hideKeyboard()"
		    >
		      <u--input
		          v-model="model.trip"
		          disabled
		          disabledColor="#ffffff"
		          placeholder="请选择出行方式"
		          border="none"
		          style="pointer-events:none"
		      />
		      <u-icon slot="right" name="arrow-right" />
		    </u-form-item>
		    <u-form-item
		        label="是否委托办理"
		    >
				<u-radio-group
					v-model="isTrust"
					class="itabGroup"
					placement="column"
				>
					<u-radio
					  :customStyle="{marginBottom: '18px'}"
					  v-for="(name, index) in ['自行前往( 抵达凭票根报销费用 )','委托办理出行']"
					  :key="index"
					  :label="name"
					  :name="name"
					  activeColor="#49cc90"
					>
					</u-radio>
				</u-radio-group>
		      <!-- <view class="itab">
		        <view :class="{ 'on': isTrust === 0 }" @click="isTrust = 0">
		          <text>自行前往</text>
		          <text style="font-size: 26rpx;padding-top: 10rpx;">( 抵达凭票根报销费用 )</text>
		        </view>
		        <view :class="{ 'on': isTrust === 1 }" @click="isTrust = 1">委托办理出行</view>
		      </view> -->
		    </u-form-item>
		  </view>
		</view>
      </u--form>

      <view class="btn" @click="onSub()">
        <!-- <view class="iconxy iconxy-baocun"></view> -->
        <view>确认并保存</view>
      </view>
      </view>
	  <view class="foot-bg"></view>
    </block>
    <u-picker
        :show="showPoint"
        :columns="pointColumns"
        keyName="text"
        confirmColor="#49cc90"
        @cancel="cancelPoint"
        @confirm="confirmPoint"
    />
    <u-calendar
        :show="showCalendar"
        color="#49cc90"
        round="16rpx"
        minDate="2024-11-08"
        maxDate="2024-11-11"
        @close="closeCalendar"
        @confirm="confirmCalendar"
    />
    <u-picker
        :show="showTrip"
        :columns="tripColumns"
        keyName="text"
        confirmColor="#49cc90"
        @cancel="cancelTrip"
        @confirm="confirmTrip"
    />

    <u-popup :show="showTips" round="16rpx">
      <view class="tipsBox">
        <view class="title">
          <u--text type="error" prefixIcon="warning" iconStyle="margin-right:20rpx;font-size: 40rpx;color:#49cc90;" text="若确认修改出行信息, 您的座次可能会发生变化, 是否确认修改?" />
        </view>
        <view class="btns">
          <view  class="btn cancel" @click="showTips = false">取消</view>
          <view class="btn confirm" @click="doDel(); showTips = false">
            <!-- <view class="iconxy iconxy-queren"></view> -->
            <view>确认</view>
          </view>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
import { addTravelTicket, travelTicket, delTravelTicket } from '@/api/index.js'

export default {
  data() {
    return {
      isReady: false,
      showTips: false,
      showPoint: false,
      pointColumns: [[
        { value: 1, text: '新疆' },
        { value: 2, text: '西藏' },
        { value: 3, text: '东三省' },
        { value: 4, text: '广东' },
        { value: 5, text: '北京' }
      ]],
      showTrip: false,
      tripColumns: [[
        { text: '高铁' },
        { text: '飞机' },
        { text: '汽车' }
      ]],
      showCalendar: false,
      model: {
        point: '雄安商务服务中心1号门',
        startCity: '',
        tripDate: '',
        trip: '',
        name: '',
        idCard: '',
        phone: this.$store.getters.phone
      },
      rules: {
        point: {
          type: 'string',
          required: true,
          message: '请选择会议地点',
          trigger: ['change']
        },
        startCity: {
          type: 'string',
          required: true,
          message: '请填写出发地点',
          trigger: ['blur', 'change']
        },
        tripDate: {
          type: 'string',
          required: true,
          message: '请选择出发时间',
          trigger: ['change']
        },
        trip: {
          type: 'string',
          required: true,
          message: '请选择出行方式',
          trigger: ['change']
        },
        name: [
          {
            type: 'string',
            required: true,
            message: '请填写参会人姓名',
            trigger: ['blur', 'change']
          },
          {
            validator: (rule, value, callback) => {
              return this.$u.test.chinese(value)
            },
            message: '请正确填写参会人姓名',
            trigger: ['blur', 'change']
          },
        ],
        idCard: [
          {
            type: 'string',
            required: true,
            message: '请填写参会人身份证号',
            trigger: ['blur', 'change']
          },
          {
            validator: (rule, value, callback) => {
              return this.$u.test.idCard(value)
            },
            message: '请正确填写参会人身份证号',
            trigger: ['blur', 'change']
          },
        ],
        phone: [
          {
            type: 'string',
            required: true,
            message: '请填写参会人手机号',
            trigger: ['blur', 'change']
          },
          {
            validator: (rule, value, callback) => {
              return this.$u.test.mobile(value)
            },
            message: '请正确填写参会人手机号',
            trigger: ['blur', 'change']
          },
        ]
      },
      travelTicketData: {},
      isTrust: 0,
      fileList: []
    }
  },
  onShow() {
    if (this.isAcc) {
      this.model.name = this.acc.name
      this.model.idCard = this.acc.idCard
    }

    this.$nextTick(() => {
      this.getTravelTicket()
    })
  },
  onHide() {
    // this.$refs.uForm.resetFields()
  },
  methods: {
    afterRead() {
      this.$refs.uToast.show({
        type: 'success',
        message: '上传成功'
      })
    },
    doDel() {
      this.$refs.uToast.loading('正在加载...')

      delTravelTicket(this.travelTicketData.id).then(res => {
        this.$refs.uToast.hide()
        this.travelTicketData = {}
      })
    },
    getTravelTicket() {
      this.$refs.uToast.loading('正在加载...')
      travelTicket().then(res => {
        // if (!res.data) {
        // 	this.$refs.uForm.resetFields()
        // }

        this.travelTicketData = res.data || {}
        if (this.travelTicketData.busiParam) {
          this.travelTicketData.busiParam = JSON.parse(this.travelTicketData.busiParam)
        }

        this.$refs.uToast.hide()
      })
    },
    doSub() {
      this.$refs.uToast.loading('正在加载...')

      const pData = {
        ...this.model,
        pet: this.isTrust
      }

      // 提交表单
      addTravelTicket(pData).then(res => {
        this.$refs.uToast.hide()

        this.$refs.uToast.show({
          type: 'success',
          message: '操作成功',
          complete: () => {
            this.getTravelTicket()
          }
        })
      })
    },
    async onSub() {
      try {
        const uRes = await this.$refs.uForm.validate()
        if (uRes) {
          this.doSub()
        }
      } catch (e) {
        const ibgRect = await this.$u.getRect('.ibg')
        const errRect = await this.$u.getRect('.u-form-item__body__right__message')

        uni.pageScrollTo({
          scrollTop: errRect.top - ibgRect.top - 120
        })
      }
    },
    cancelTrip() {
      this.showTrip = false
      this.$refs.uForm.validateField('trip')
    },
    confirmTrip(e) {
      this.model.trip = e.value[0].text
      this.showTrip = false
    },
    closeCalendar() {
      this.showCalendar = false
      this.$refs.uForm.validateField('tripDate')
    },
    confirmCalendar(e) {
      this.model.tripDate = e[0]
      this.showCalendar = false
    },
    cancelPoint() {
      this.showPoint = false
      this.$refs.uForm.validateField('point')
    },
    confirmPoint(e) {
      this.model.point = e.value[0].text
      this.showPoint = false
    },
    hideKeyboard() {
      uni.hideKeyboard()
    }
  }
}
</script>

<style lang="scss" scoped>
.ibg {
  min-height: 100vh;
  // background: url('/static/images/common/bg2.png') top center no-repeat;
  // background-size: 100% 50%;
  // background-image: linear-gradient(to bottom, #8b0001 15%, rgba(255,255,255,.0) 100%);
  // background-image: linear-gradient(to bottom, green 500rpx, rgba(255,255,255,.0) 100%);
}
.ibgw {
  background: #fff;
  min-height: 100vh;
}
.uniNavBar {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
}
.head {
  position: relative;
  image {
    display: block;
    width: 100%;
  }
  .no {
    position: absolute;
    right: 50rpx;
    bottom: 25rpx;
    font-size: 26upx;
    color: #f9ce66;
  }
}

.travel {
  margin: 15rpx;
  position: relative;
  border-radius: 16rpx;
  background: #fff;
  box-shadow: 0 0 6px rgba(0,0,0,.17);
  .travelBd {
    padding: 15rpx;

	.dataInfo{
		background: url('/static/images/apply/cardBgv2.png') right bottom no-repeat;
		background-size: cover;
	}
    .steps {
      position: relative;
      .item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 15rpx;
        border: 1px solid #efefef;
        border-radius: 16rpx;
        margin-bottom: 20rpx;
        .lable {
          padding-bottom: 10rpx;
          color: #666;
        }
        .value {
          font-size: 32rpx;
          font-weight: bold;
        }
        .iconxy {
          color: #999;
        }
      }
      .arrow {
        position: absolute;
        top: calc(50% - 30rpx);
        right: 30rpx;
        width: 50rpx;
        height: 50rpx;
        border-radius: 50%;
        background: #fff;
        transform: rotate(90deg);
        .iconxy {
          font-size: 50rpx;
        }
      }
    }
  }
  .dataInfo {
    padding: 15rpx;
    border: 1px solid #efefef;
    border-radius: 16rpx;
    .item {
      display: flex;
      align-items: center;
      margin: 20rpx 0;
      .name {
        margin-right: 10rpx;
        color: #666;
      }
      .value {
        flex: 1;
      }
      .trustItem {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .mBtn {
          margin-left: 20rpx;
          padding: 10rpx 20rpx;
          border-radius: 20rpx;
          background-image: linear-gradient(to top, #ff8a66 50%, #ffcc80 100%);
          color: #fff;
        }
      }
    }
  }
  .travelHd {
    .status {
      padding: 15rpx 0;
      border-radius: 0 0 16rpx 16rpx;
      text-align: center;
    }
    .status0 {
      background: #fdf6ec;
      color: #ff9900;
    }
    .status1 {
      background: #ecf5ff;
      color: #2979ff;
    }
    .status2 {
      background: #dbf1e1;
      color: #19be6b;
    }
  }
}
.travelTop{
	margin-top: -90rpx;
}

.travelBtns {
  margin: 0 20rpx;
  padding-bottom: 60rpx;
  position: relative;
}

.formbox{
	margin: 20rpx;
	margin-top: -60rpx;
	border-radius: 16rpx;
	padding: 0 20rpx;
	border-radius: 30rpx;
	background: #fff;
	padding-bottom:60rpx;
	position: relative;
	.formtitle{
		text-align: center;
		padding: 50rpx;
		padding-bottom: 0;
		font-size:40upx;
		color:#3bbc89;
		font-weight: bold;
	}
	.box {
		padding-top:20rpx;
		
	  .hd {
		position: relative;
		margin:20rpx;
		margin-left: 0;
		padding-left:20rpx;
		font-size: 32rpx;font-weight: bold;
		color: #49cc90;
		border-left: 3px solid #49cc90;
	  }
		.itabGroup{
			margin-top: 30rpx;
		}
	  .itab {
		display: flex;
		align-items: stretch;
		justify-content: space-between;
		width: 100%;
		padding: 6rpx;
		font-size: 30rpx;
		border-radius: 10rpx;
		background: #f4f8fb;
		view {
		  display: flex;
		  flex-direction: column;
		  align-items: center;
		  justify-content: center;
		  width: 50%;
		  padding: 10rpx 0;
		  text-align: center;
		  &.on {
			color: #fff;
			border-radius: 10rpx;
			background: #49cc90;
		  }
		}
	  }
	  &.info {
		.bd {
		  padding-bottom: 20rpx;
		}
	  }
	}
}
.foot-bg{
	margin-top: -50px;
	height:100px;width:100%;
	background: url("@/static/images/apply/footer-bg-v1.png") no-repeat bottom center;
	background-color: rgba(184, 239, 218, 0.3);
}
.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20rpx;
  padding: 25rpx 0;
  text-align: center;
  border-radius: 30rpx;
  font-weight: bold;
  font-size: 30rpx;
  background-image: linear-gradient(to top, #04c57e 50%, #07fba2 100%);
  color: #fff;
  &.btn0 {
    margin: 20rpx 0 0 0;
    // background-image: linear-gradient(to top, #ff8a66 50%, #ffcc80 100%);
    // background-image: linear-gradient(to top, #00aa00 50%, #00ff00 100%);
	background-image: linear-gradient(to top, #04c57e 50%, #07fba2 100%);
  }
  &.btn2 {
    margin: 20rpx 0 0 0;
    background-image: linear-gradient(to top, #2196f3 50%, #64b5f6 100%);
  }
  .iconxy {
    margin-right: 10rpx;
    font-size: 40rpx;
    font-weight: normal;
  }
}
.btns {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .btn {
    // width: 48%;
    width: 100%;
    margin: 20rpx 0;
  }
}


.tipsBox {
  padding: 20rpx;
  .title {
    padding: 20rpx 20rpx 40rpx 20rpx;
  }
  .btns {
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-top: 20rpx solid #f4f8fb;
    background: #fff;
    .btn {
      width: 40%;
      margin: 20rpx 0;
      padding: 25rpx 0;
      text-align: center;
      border-radius: 30rpx;
      font-weight: bold;
      font-size: 30rpx;
      &.cancel {
        background-image: linear-gradient(to bottom, #fdfbfb 0%, #ebedee 100%);
        color: #333;
      }
      &.confirm {
        display: flex;
        align-items: center;
        justify-content: center;
        background-image: linear-gradient(to top, #2979ff 50%, #609cff 100%);
        color: #fff;
        .iconxy {
          margin-right: 10rpx;
          font-size: 40rpx;
        }
      }
    }
  }
}
</style>
