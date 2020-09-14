<template>
	<div>
		<div class="mai_a">
			<div style="font-size: 30px;" @click='ontuk'>←</div>
			<div>购物车</div>
			<div>管理</div>
		</div>

		<!-- -------购物车页面---------------- -->

		<div class="mai">
			<div class="mai_b1" v-for="(ys,index) in lists" :key='index'>
				<van-row>
					<van-col span="2">
						<van-checkbox v-model="ys.ischecked" class="chebox_1" @click='ondx(ys)'></van-checkbox>
					</van-col>
					<van-col span="22">
						<van-swipe-cell>
							<van-card num="1" :price="ys.price" :title="ys.title" :thumb="ys.image" />
							<template #right>
								<van-button square text="删除" type="danger" class="delete-button" @click="onsd(ys.cart_id,index)" />
							</template>
						</van-swipe-cell>
					</van-col>
				</van-row>

			</div>
			
			
			
			
			
			<div>
				<van-submit-bar :price="zjg" button-text="提交订单" @submit="onrk()">
					<van-checkbox v-model="xqzt" @click='qx()'>全选</van-checkbox>
					<template #tip>
						你的收货地址不支持同城送, <span @click="">修改地址</span>
					</template>
				</van-submit-bar>
			</div>
			
			
			
		</div>

		


	</div>
</template>

<script>
	import {
		Cart, //购物车
		Delete, //购物车删除
		
		
	} from '../api/api.js'
	import axios from 'axios'
	export default {
		data() {
			return {
				checked: '',
				lists: [],
				xqzt: false,
			}
		},


		methods: {
			
			
			// 跳转页面
			ontuk() {
				this.$router.push({
					path: '/Home'
				})
			},
			
			
			
			
			// 跳转订单页面 并传入ID
			onrk() {
				//这里声明的数组是用来接受 多个商品的ID 
				// 如果要买多条商品 ID需要拼接的方法来传  join()方法
				var li=[]
				this.lists.map(ele=>{
					if(ele.ischecked ==true){
						// console.log(ele.ischecked)
						// console.log(ele.cart_id)
						li.push(ele.cart_id)//当商品多的时候一起添加到数组里
					}
				})
				var heID=li.join(' ')//jion再拼接一起
					console.log(heID)
			
				this.$store.dispatch('mai_tin',heID)
				
				this.$router.push({
					path: '/Order',
					// query:{
					// 	id:heID
					// }
					
				})
			},


			// 点击全选业务
			qx() {
				if (this.xqzt) {
					this.lists.map(ele => {
						ele.ischecked = true
					});
				} else {

					this.lists.map(ele => {
						ele.ischecked = false
					})
				}

			},
			
			// 点击单选
					ondx(ys){
						let i=0//用i来表示点击选中的数量
						this.lists.map(ele=>{
				// ischecked：为true,false 当点击时  被点击的商品都增加一次 i++
							if(ele.ischecked){
								i++;
							}
						})
						// 当点击选中的数量等于数据的内容时 让全选按钮选中
						if(this.lists.length==i){
							this.xqzt=true
						}
						},
			

			// 删除业务
			onsd(id, index) {
				Delete({
					carid: id
				}).then(res => {
					console.log(res)
					this.lists.splice(index, 1)
				})

			}


		},

		// 创建  比 挂载先执行
		created() {
			Cart({
				
			}).then(res => {
				console.log(res)
				// 判断当数组中最后一条数据为null空的时候让业务判断自动消除null
				// 注意的就是这样写容易改变数组 所以最后得再从新附一个新的lists数组
				if (res.code == 200) {
					var lists = res.data
					if (lists[lists.length - 1] && lists.length != 0) {
						// 如果list最后一项不为null,并且长度不等于0，然后跳过
					} else {
						if (lists.length == 0) {
							// 长度是0的时候，跳过
						} else {
							lists.pop();
							// list长度不为0 最后一项是null，移除null 
							// pop 方法 ：  删除最后一项
						}
					}
				}
				this.lists = lists;

				//当数组中数据大于0的时候再做判断  小于0不做
				//ischecked：单选框 --- 最一开始的时候有的单选框为true 
				// 渲染出来直接是选中的样子 遍历数组 让他们都先等false
				if(this.lists.length>0){
					this.lists.map(ele => {
						ele.ischecked = false
					})
				}
				
			})



		},


		//计算属性计算价格 可以实时监听价格 每时每刻都在监听着 点上就算钱 下点就不算钱
		computed: {
			zjg: function() { //在计算属性中声明zjg直接就声明成  但是下面不能直获取调用它
				var shu = 0
				this.lists.map(ele => {
					if (ele.ischecked) {
						shu = shu + ele.price * ele.product_amount * 100
					}
				})
				return shu //现在这个return shu  就直接返回给zjg  
			}
		},
	}
</script>

<style scoped>
	.goods-card {
		margin: 0;
		background-color: @white;
	}

	.delete-button {
		height: 100%;
	}

	.mai_a {
		width: 100%;
		height: 65px;
		background-color: #409EFF;
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: fixed;
		top: 0;
		z-index: 10000;
	}

	.mai_b {
		margin-top: 65px;
	}

	.chebox_1 {
		margin-top: 60px;
	}

	.mai_b1 {
		width: 100%;
		height: 200px;
	}

	.mai {
		margin-top: 65px;
		margin-bottom: 200px;
		overflow: scroll;
	}

	.van-row .van-card__bottom .van-card__price {
		color: red;
	}
</style>
