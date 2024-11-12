// 正式打包
const baseApiUrl = process.env.NODE_ENV === 'development' ? 'https://ztyh.yanshizhan.icu/prod-api' : '/prod-api'

module.exports = {
	test: 1,
	baseUrl: baseApiUrl,
	// 应用信息
	appInfo: {
		// 应用名称
		name: '智天银行',
		// 应用版本
		version: '1.0.0',
	},
	codeurl: 'https://ztyh.yanshizhan.icu/'
};