<template>
	<div>
		<div class="xq_hbs">
			<div class="xq_hbs1" style="font-size: 40px;" @click="onjt()"> ← </div>
			<div class="xq_hbs2">
				<div v-for="(ys,index) in list" :key='index' @click="onxq(index)" :class="hs==index?'ks':'ks1'">
					{{ys.title}}

				</div>
			</div>
		</div>


		<div class="xq_t">
			<div id="tzt2">
				<div class="xq_t1">
					<img :src="tlist.goodsLogo"></img>
					<p class="xq_yh">{{tlist.goodsName}}</p>
					<div style="color: red; font-size: 20px; display: flex;">
						<span>{{tlist.goodsOldPrice}}</span>
						<s style="margin-left:30px;">{{tlist.goodsPrice}}</s>
					</div>
				</div>
			</div>


			<div id="tzt1">
				<div class="xq_t2">
					<div v-for="(ys,index) in tlist1" :key="index" class="xq_t3">
						<img :src="ys.icon"></img>
						{{ys.name}}
					</div>
				</div>
			</div>


			<div id="tzt">
				<div v-html="tlist.goodsIntroduce" class="xq_ten">

				</div>
			</div>

		</div>

		<!-- 最下面的vant -->
		<div>
			<van-goods-action>
				<van-goods-action-icon icon="chat-o" text="客服" color="#07c160" />
				<van-goods-action-icon icon="cart-o" text="购物车" @click='ongw()' />
				<van-goods-action-icon icon="star" text="已收藏" color="#ff5000" />
				<van-goods-action-button type="warning" text="加入购物车" @click='oncar()' />
				<van-goods-action-button type="danger" text="立即购买" />
			</van-goods-action>
		</div>

	</div>
</template>

<script>
	import {
		Xq,
		Carttips
	} from '../api/api.js'
	import axios from 'axios'
	import store from '../store/index.js'
	export default {
		data() {
			return {
				list: [{
						title: '商品'
					},
					{
						title: '评论'
					},
					{
						title: '详情'
					},
					{
						title: '推荐'
					}
				],
				tlist: {},
				tlist1: [],
				hs: '',
				goodsOldPrice: '',
				product_amount: ''

			}
		},

		methods: {
			onjt() {
				this.$router.push({
					path: '/Home'
				})
			},

			// 点击名字跳到相对应
			onxq(index) {
				this.hs = index
				if (index == 0) {
					document.getElementById('tzt1').scrollIntoView({
						behavior: 'smooth'
					})
				} else if (index == 1) {
					document.getElementById('tzt2').scrollIntoView({
						behavior: 'smooth',
					})
				} else if (index == 2) {
					document.getElementById('tzt').scrollIntoView({
						behavior: 'smooth',
					})
				}
			},

			// 点击添加购物车提示加入成功
			oncar() {
				var id = this.$route.query.id
				let ant = {
					product_id: id,
					product_amount: 1,
					price: this.product_amount
				}


				// 再加一个请求头  防止异步请求
				axios.interceptors.request.use(
					function(config) {
						config.headers.token = store.state.token;
						return config;
					},
					function(error) {
						// 对请求错误做些什么
						return Promise.reject(error);
					}
				);

				// 添加购物车时提示加入购物车成功信息
				axios
					.post(`http://www.hj0819.top:44369/api/Cart/addCart`, ant)
					.then((res) => {
						console.log(res.data);
						var tin = res.data.code
						if (tin == 201) {
							this.$dialog.alert({
								message: '添加购物车成功',
							}).then(() => {
								// on close
							});
						}
					});
			},


			ongw() {
				this.$router.push({
					path: '/Mai'
				})
			}


		},


		mounted() {
			// 点击传的id  详情获取id
			var id = this.$route.query.id
			console.log(id)
			Xq({
				goodsId: id,

			}).then(res => {
				console.log(res.data)
				this.tlist = res.data[0]
				this.tlist1 = res.data[2]
				this.goodsOldPrice = res.data[0].goodsOldPrice
				this.product_amount = res.data[0].product_amount

			})

		}

	}
</script>

<style scoped>
	.xq_hbs {
		width: 100%;
		height: 65px;
		background: white;
		position: fixed;
		top: 0;
		display: flex;
	}

	.xq_hbs1 {
		width: 20%;
		height: 65px;
		line-height: 65px;
		padding-left: 10px;
	}

	.xq_hbs2 {
		width: 80%;
		height: 65px;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.ks {
		color: red;
	}

	.ks1 {
		color: #000000;
	}

	.xq_t {
		width: 100%;
		margin-top: 65px;
	}

	.xq_t1 {
		width: 100%;
	}

	.xq_t1 img {
		width: 100%;
		height: 700px;
	}

	.xq_yh {
		white-space: nowrap;
		/*一行显示*/

		overflow: hidden;
		/*超出部分隐藏*/

		text-overflow: ellipsis;
		/*用...代替超出部分*/
	}

	.xq_t2 {
		width: 100%;
		background-color: hotpink;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.xq_t2 img {
		width: 30px;
	}

	.xq_ten>>>.lazy {
		width: 100%;
	}
</style>
