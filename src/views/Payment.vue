<template>
	<div>
		<div class="pay_box">
			<div class="pay_a1" style="font-size: 30px;" @click="otk()">←</div>
			<div class="pay_a2">确认订单</div>
		</div>


		<div class="bott">

			<div class="pay_b">

				<div class="pay_b1">
					<img src="../../public/img/cart/zhifubao.png"></img>
					<span>支付宝支付</span>
				</div>
				<div class="pay_b2">
					<van-checkbox v-model="checked1" class="pay_b2_t" @click="che1()"></van-checkbox>
				</div>
			</div>

			<div class="pay_b">
				<div class="pay_b1">
					<img src="../../public/img/cart/weixin.png"></img>
					<span>微信支付</span>
				</div>
				<div class="pay_b2">
					<van-checkbox v-model="checked2" class="pay_b2_t" @click="che2()"></van-checkbox>
				</div>
			</div>

			<div class="pay_b">
				<div class="pay_b1">
					<img src="../../public/img/cart/yuer.png"></img>
					<span>余额支付</span>
				</div>
				<div class="pay_b2">
					<van-checkbox v-model="checked3" class="pay_b2_t" @click="che3()"></van-checkbox>
				</div>
			</div>

		</div>

		<div class="pay_bottr" @click="onzf()">
			确认支付
		</div>


		<!-- 密码输入框 -->
		<van-password-input :value="value" info="密码为 6 位数字" :focused="showKeyboard" @focus="showKeyboard = false" />
		<!-- 数字键盘 -->
		<van-number-keyboard :show="showKeyboard" @input="onInput" @delete="onDelete" @blur="showKeyboard = false" />



	</div>
</template>

<script>
	import {
		Balance,
		zfb
	} from '../api/api.js'
	import md5 from 'js-md5'
	import {
		mber
	} from '../api/api.js'
	export default {

		data() {
			return {
				checked1: false,
				checked2: false,
				checked3: false,
				value: '',
				showKeyboard: false,

			}
		},


		methods: {
			// 支付宝事件
			che1() {
				this.checked2 = false
				this.checked3 = false
				console.log(this.checked1)
			},

			//微信事件 
			che2() {
				this.checked1 = false
				this.checked3 = false

			},

			// 余额事件
			che3() {
				this.checked2 = false
				this.checked1 = false
				console.log(this.checked3)
			},



			// 点击确认支付 出现键盘
			onzf() {
				// 当余额状态为true时才会触发键盘 
				if (this.checked3 == true) {
					this.showKeyboard = true
				};




				// 支付宝必选的参数封装一下
				var cs = {
					OutTradeNo: this.dts,
					ProductCode: 'QUICK_WAP_WAY',
					Subject :this.ktp1.kt1,
					TotalAmount :this.ktp1.kt2

				}
				//判断支付宝状态为选中的时候  然后请求支付宝的api
				if (this.checked1 == true) {
					zfb({
							cs
					}).then(res => {
						console.log(cs)
						console.log(res)
					})
				}


			},

			// Vant键盘事件
			onInput(key) {
				this.value = (this.value + key).slice(0, 6);
			},
			onDelete() {
				this.value = this.value.slice(0, this.value.length - 1);
			},


			// 点击返回
			otk() {
				this.$router.push({
					path: '/Order'
				})
			}
		},



		computed: {
			// vuex传来的订单号 
			dts: function() {
				console.log(this.$store.state.dts)
				return this.$store.state.dts
			},

			// 支付宝需要的参数
			ktp1: function() {
				console.log(this.$store.state.ktp1)
				return this.$store.state.ktp1
			}
		},



		watch: {
			value(sz) {
				console.log(sz)
				let tp = {
					value: this.value
				}
				tp.value = md5(tp.value)
				if (sz.length == 6) {
					// 当监听的数等于密码长度时直接请求api判断 
					Balance({
						paypwd: tp.value
					}).then(res => {
						console.log(res)
						// 当状态等于200时再触发下一个支付完成接口
						if (res.code == 200) {
							mber({
								orderNum: this.dts //订单号必传参数
							}).then(res => {
								console.log(res)
								// if (res.code == 201) {
								// 	this.$router.push({
								// 		path: '/mber'
								// 	})
								// }
							})

						}


					})

				}

			}


		},




	}
</script>

<style scoped="scoped">
	.pay_box {
		width: 100%;
		height: 85px;
		background-color: #009FE9;
		display: flex;
	}

	.pay_a1 {
		width: 20%;
		height: 85px;
		line-height: 85px;

	}

	.pay_a2 {
		width: 80%;
		height: 85px;
		line-height: 85px;
		text-align: center;
	}

	.bott {
		width: 100%;
		height: 600px;
		/* background-color: #FF5777; */
	}

	.pay_b {
		width: 100%;
		height: 100px;
		line-height: 100px;
		display: flex;
		/* background-color: #FF5777; */
		border-bottom: 3px solid #EEEEEE;

	}

	.pay_b1 {
		width: 80%;
		height: 100px;

		display: flex;
		align-items: center;
	}

	.pay_b1 span {
		margin-left: 15px;
	}

	.pay_b1 img {
		width: 70px;

	}

	.pay_b2 {
		width: 20%;
		height: 100px;
		/* background-color: aqua; */
	}

	.pay_b2_t {
		margin: 40px 50px;
	}

	.pay_bottr {
		width: 100%;
		height: 85px;
		line-height: 85px;
		background-color: #009FE9;
		color: white;
		text-align: center;
		position: fixed;
		bottom: 0;

	}
</style>
