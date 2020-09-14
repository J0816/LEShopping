<template>
	<div>
		<div class="ord_a">
			<div class="ord_a1" style="font-size: 30px;" @click="onmai()">←</div>
			<div class="ord_a2">确认订单</div>
		</div>

		<div @click="ontoy()" class="ord_box">
			<div>
				<p>
					{{jslist.name}}
					<span>{{jslist.phone}}</span>
				</p>
				<p>
					<span>{{jslist.province}}</span>
					<span>{{jslist.city}}</span>
					<span> {{jslist.district}}</span>
				</p>


			</div>
		</div>


		<div class="ore_e">

			<div v-for="(ys,index) in list" :key='index'>
				店铺信息：
				<div class="yhmc">
					<van-card :desc="ys[1].shopCpy" :title="ys[1].shopName" :thumb="ys[1].shopLogo" />
				</div>


				<div class="ore_e1">
					商品信息：
					<van-card num="1" :price="ys[0].goodsPrice" :desc="ys[0].goodsName" :title="ys[0].goodsAre" :thumb="ys[0].goodsLogo" />
					<div class="ord_t">
						<div>
							  工艺宝贝
							 <span class="ord_bx" style="font-size: 14px;">成交后卖家将捐献1.00元给公益宝</span>
							 </div>
						<div>
							 配送方式
							 <span class="ord_bx" style="font-size: 14px;">成交后卖家将捐献1.00元给公益宝</span>
							 </div>
						<div>
							运费险
							 &nbsp;&nbsp;
							<span class="ord_bx" style="font-size: 14px;">成交后卖家将捐献1.00元给公益宝</span>
						</div>
						<div>
							 订单备注
							<span class="ord_bx" style="font-size: 14px;">选填，请先跟商家协商一致</span>
							 </div>
					</div>
				</div>
				<div class="order_bott">
					<div>应付金额:<span style="color: red;">{{ys[0].goodsPrice}}</span></div>
					<div>共计:x1件</div>
					<div class="zhifu" @click="ZFs(ys)">去支付</div>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import {
		Order,
		NteOrder
	} from '../api/api.js'
	export default {
		data() {
			return {
				list: [],


			}
		},



		methods: {
			onmai() {
				this.$router.push({
					path: '/Mai'
				})
			},


			// 点击进入收货地址
			ontoy() {
				this.$router.push({
					path: '/Address'
				})
			},


			// 点击到支付页面  并传入相应的内容
			ZFs(ys) {
				console.log(ys)
					var ktp={
						kt1:ys[0].goodsName,
						kt2:ys[0].goodsPrice
					}
					
					this.$store.dispatch('ken',ktp)
					
				// 提示创建订单成功api
				NteOrder({
					order_id: this.ID,

				}).then(res => {
					console.log(res)
					if (res.code == 200) {
						this.$dialog.alert({
							message: '获取订单成功',
						}).then(() => {
							// on close
						});
					}
					// // 订单号传到vuex 其他页面要用
					var dt = res.data.order_number
					this.$store.dispatch('ot',dt)
						console.log(dt)
				})
				this.$router.push({
					path: '/Payment'
				})
			}

		},


		created() {
			// let id = this.$route.query.id
			Order({
				goodsid: this.ID, //从vuex传过来的ID 为了让数据可以持续保存不消失

			}).then(res => {
				console.log(res.data)
				this.list = res.data
				// this.lists=res.data
				// console.log(this.lists)
			})
		},


		computed: {
			// 修改地址传过来的list
			jslist: function() {
				// console.log(this.$store.state.jslist)
				return this.$store.state.jslist

			},
			// 商品信息从vuex中传来的
			ID: function() {
				// console.log(this.$store.state.ID)
				return this.$store.state.ID
			}

		}

	}
</script>

<style scoped>
	.ord_a {
		width: 100%;
		height: 65px;
		line-height: 65px;
		position: fixed;
		top: 0px;
		background-color: #409EFF;
		display: flex;

	}

	.ord_a1 {
		width: 10%;
		height: 100%;
		margin-left: 30px;

	}

	.ord_a2 {
		width: 90%;
		height: 100%;
		text-align: center;
	}

	.ord_box {
		width: 100%;
		height: 100px;
		margin-top: 65px;
		background-color: #FF5777;

	}

	.van-card__price {
		color: red;
	}

	.ord_ent {
		width: 100%;
		height: 100px;
		background-color: #FF69B4;

	}

	.yhmc {
		margin-bottom: 100px;
	}

	.ore_e {
		margin-bottom: 50px;
		/* background-color: #EEEEEE; */
	}

	.ore_e1 {
		width: 100%;
		background-color: #EEEEEE;
		border-radius: 20px 20px 20px 20px;
	}

	.ord_t {
		width: 100%;
	}

	.ord_bx {
		color: red;
		margin-left: 200px;
	}

	.order_bott {
		width: 100%;
		height: 85px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: fixed;
		bottom: 0;
		background-color: #409EFF;

	}

	.zhifu {
		width: 150px;
		height: 85px;
		line-height: 85px;
		text-align: center;
		background-color: deeppink;
		color: white;
	}
</style>
