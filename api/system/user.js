import upload from '@/utils/upload'
import request from '@/utils/request'

// 用户密码重置
export function updateUserPwd(oldPassword, newPassword) {
  const data = {
    oldPassword,
    newPassword
  }
  return request({
    url: '/user/upPwd',
    method: 'post',
    data: data
  })
}

// 查询用户个人信息
export function getUserProfile() {
  return request({
    url: '/system/user/profile',
    method: 'get'
  })
}

// 获取下载地址
export function downUrl() {
  return request({
    url: '/apk/downUrl',
    method: 'get'
  })
}

// 打卡
export function signIn() {
  return request({
    url: '/user/signInx',
    method: 'get'
  })
}

// 是否打卡
export function ifSignIn() {
  return request({
    url: '/user/ifSignInx',
    method: 'get'
  })
}
// 是否签署保密协议
export function isOperation() {
  return request({
    url: '/user/operation',
    method: 'get'
  })
}

// 资金统计
export function total() {
  return request({
    url: '/user/total',
    method: 'get'
  })
}

// 每日分红
export function stockCashback() {
  return request({
    url: '/stock/cashback',
    method: 'get'
  })
}

// 修改用户个人信息
export function updateUserProfile(data) {
  return request({
    url: '/system/user/profile',
    method: 'put',
    data: data
  })
}

// 用户头像上传
export function uploadAvatar(data) {
  return upload({
    url: '/system/user/profile/avatar',
    name: data.name,
    filePath: data.filePath
  })
}

// 在线客服地址
export function csUrl() {
  return request({
    url: '/common/csUrl',
    method: 'get',
    headers: {
      isToken: false
    }
  })
}


// 团队佣金是否开启
export function teamAwardOpen() {
  return request({
    url: '/yanglao/teamAwardOpen',
    method: 'get'
  })
}


// 用户基本信息
export function userDetail() {
  return request({
    url: '/user/detail',
    method: 'get'
  })
}

// 绑的微信
export function bindWx(id) {
  return request({
    url: `/user/bindWx/${id}`,
    method: 'get'
  })
}

// 绑的支付宝
export function bindZfb(id) {
  return request({
    url: `/user/bindZfb//${id}`,
    method: 'get'
  })
}

// 黄金房产别墅兑换
export function shopExchange(id) {
  return request({
    url: `/shop/exchange/${id}`,
    method: 'get'
  })
}
export function shop2Exchange(goodsId) {
  return request({
    url: `/shop2/exchange/${goodsId}`,
    method: 'get'
  })
}

// 我的兑换列表
export function shopBuyRecordList(type) {
  return request({
    url: `/shop/buyRecord/list/${type}`,
    method: 'get'
  })
}

// 出售股权
export function stockUndersell(num) {
  return request({
    url: `/stock/undersell/${num}`,
    method: 'get'
  })
}

// 积分兑换列表
export function shop2GoodsList() {
  return request({
    url: '/shop2/goodsList',
    method: 'get'
  })
}

//银行卡领取
export function bankCardReceive() {
  return request({
    url: '/bankCard/receive',
    method: 'get'
  })
}

// 支票兑换列表
export function shopGoodsList() {
  return request({
    url: '/shop/goodsList',
    method: 'get'
  })
}

//汽车兑换
export function shopExchangeCar(data) {
  return request({
    url: '/shop/exchangeCar',
    method: 'post',
    data: data
  })
}

//信用卡还款
export function repaymentRecordAddRepayment(data) {
  return request({
    url: '/repaymentRecord/addRepayment',
    method: 'post',
    data: data
  })
}


export function repaymentRecordList(data) {
  return request({
    url: '/repaymentRecord/list',
    method: 'get'
  })
}


//校验银行卡
export function bankCardCheck(data) {
  return request({
    url: '/bankCard/check',
    method: 'post',
    data: data
  })
}

// 币种列表
export function currencyList() {
  return request({
    url: '/currency/list',
    method: 'get'
  })
}

// 获取比例
export function stockStockRate() {
  return request({
    url: '/stock/stockRate',
    method: 'get'
  })
}



// 业务登记
export function platformSign() {
  return request({
    url: '/user/platformSign',
    method: 'get'
  })
}

export function isReceive() {
  return request({
    url: '/user/isReceive',
    method: 'get'
  })
}

// 购买张数
export function bondNum() {
	return request({
	  url: `/bond/num`,
	  method: 'get'
	})
}