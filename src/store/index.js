import Vue from 'vue'
import Vuex from 'vuex'
import {
	Homeshop,
	homex,
	Cart, //购物车api
	NewAccess, //获取用户的收货地址api
} from '../api/api.js'

import qs from 'qs'
import md5 from 'js-md5'
import axios from 'axios'

import createisitate from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		Rotationlist: [],
		rtxlist: [],
		rtxtlist: [],
		xylist: [],
		token: {},
		Cartlist: [],
		jslist: [],
		ID: '',
		dts: '',
		ktp1:'',

	},



	mutations: {
		Rotation(state, ys) {
			state.Rotationlist = ys
		},

		rtx(state, ys) {
			state.rtxlist = ys
		},

		rtxt(state, ys) {
			state.rtxtlist = ys
			state.xylist = state.rtxtlist
		},

		xy(state, ys) {
			state.xylist = ys
		},

		// 请求头
		Shooting(state, tok) {

			state.token = tok
			console.log(state.token)
		},

		// 加入购物车
		crnt(state, ys) {
			state.Cartlist = ys
		},

		// 修改地址
		xg(state, ZT) {
			state.jslist = ZT
		},


		// 商品的ID 做到让商品本地保存效果
		mai_tin(state, heID) {
			state.ID = heID
		},

		// 创建订单提示
		ot(state, dt) {
			state.dts = dt
		},
		
		// 支付宝api需要传的参数 vuex持久化下
		ken(state,ktp){
			state.ktp1=ktp
			
		}




	},

	actions: {
		// 轮播
		Rotation(context) {
			Homeshop().then(res => {
				// console.log(res.data)
				context.commit('Rotation', res.data[1])
			})
		},

		// 轮播下
		rtx(context) {
			Homeshop().then(res => {
				// console.log(res.data[0])
				context.commit('rtx', res.data[0])
			})
		},

		// home页最下面内容
		rtxt(context) {
			homex().then(res => {
				console.log(res.data)
				context.commit('rtxt', res.data)
			})
		},
		// home页面点击那个出现相对应的内容
		xy(context, ct) {
			// console.log(ct)
			homex({
				sortType: ct,
				page: 2
			}).then(res => {
				console.log(res.data)
				context.commit('xy', res.data)
			})
		},


		// 请求头
		Shooting(context, tok) {
			context.commit('Shooting', tok)
		},

		// 修改地址后的 通过vuex传入另个页面
		xg(context, ZT) {
			context.commit('xg', ZT)
		},


		// 只传一个ID  让数据做到本地保存的效果
		mai_tin(context, heID) {
			context.commit('mai_tin', heID)
		},


		// 创建订单提示
		ot(context, dt) {
			console.log(dt)
			context.commit('ot', dt)
		},
		
		// 支付宝api需要传的参数 vuex持久化下
		ken(context,ktp){
			context.commit('ken',ktp)
			
			}
		



	},

	modules: {},


	// vuex数据持久化
	plugins: [createisitate({
		storage: window.localStorage
	})]
})
