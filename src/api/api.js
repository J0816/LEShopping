import { request } from '../api/http.js'
import qs from 'qs'


export function Homeshop(params) {
    return request({
        url: '/api/Home/getHomeREC',
        method: 'get',
        params
    })
}


export function homex(params) {
    return request({
        url: '/api/Home/getHomeShowGoods',
        method: 'get',
        params
    })
}

export function zhuce(params) {
    return request({
        url: '/api/Verify/GetPhone',
        method: 'get',
        params
    })
}

export function denglu(params) {
    return request({
        url: '/api/Verify/LoginName',
        method: 'get',
        params
    })
}

export function dxyz(params) {
    return request({
        url: '/api/SMSCode/GetCode',
        method: 'get',
        params
    })
}

export function Xq(params) {
    return request({
        url: '/api/Goods/GetGoodsInfo',
        method: 'get',
        params
    })
}


export function fen1(params) {
    return request({
        url: '/api/Goods/getCatsTree',
        method: 'get',
        params
    })
}

export function fen2(params) {
    return request({
        url: '/api/Goods/getCadGoods',
        method: 'get',
        params
    })
}


// 添加购物车信息api
export function Cart (params) {
    return request({
        url: '/api/Cart/getCart',
        method: 'get',
        params
    })
}

// 订单页信息
export function Order (params) {
    return request({
        url: '/api/Order/getOrderInfo',
        method: 'get',
        params
    })
}


// 删除购物车商品
export function Delete (params) {
    return request({
        url: '/api/Cart/DeleteCart',
        method: 'patch',
        params
    })
}


// 添加用户地址
export function NewTian (params) {
    return request({
        url: '/api/UserInfo/addArea',
        method: 'post',
        params
    })
}


// 获取添加后的地址
export function NewAccess (params) {
    return request({
        url: '/api/UserInfo/getArea',
        method: 'get',
        params
    })
}



// 支付时创建订单成功
export function NteOrder (params) {
    return request({
        url: '/api/Order/getOrderById',
        method: 'get',
        params
    })
}


// 验证密码输入成功的api
export function Balance (params) {
    return request({
        url: '/api/Order/verifyPayPWD',
        method: 'post',
        params
    })
}

// 输入密码后支付成功后的api
export function mber (params) {
	// console.log(params)
    return request({
        url: '/api/Order/payOrder',
        method: 'post',
		data:qs.stringify(params)
		
    })
}



// 连接支付宝api
export function zfb (params) {
	// console.log(params)
    return request({
        url: '/api/Alipay/appWebPay',
        method: 'post',
		data:qs.stringify(params)//post解析模块
		
    })
}

// 搜索热词
export function Sear (params) {
	// console.log(params)
    return request({
        url: '/api/Goods/getSearchHot',
        method: 'get',
		params
		
    })
}

export function Tks (params) {
    return request({
        url: '/api/Goods/getGoods',
        method: 'get',
        params
    })
}
