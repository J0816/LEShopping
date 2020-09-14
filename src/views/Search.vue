<template>
	<div>
		<div class="ord_a">
			<div class="ord_a1" style="font-size: 30px;" @click="fht()">←</div>
			<div class="ord_a2">商品搜索</div>
		</div>


		<div class="sea_bt">
			<van-search v-model="value" show-action label="商品名" placeholder="请输入商品关键词" @search="onSearch">
				<template #action>
					<div @click="onSearch()">搜索</div>
				</template>
			</van-search>


		</div>

		<p style="color: #808080; margin: 15px 30px;">全网热搜:</p>
		<div class="Seat_ov">

			<div v-for="(ys,index) in Sealist " :key='index' class="sear_to" @click="otk(ys)">
				{{ys}}

			</div>

		</div>

		<div>
			<van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">
				搜索历史
			</van-divider>
		</div>

		
		<div>
			<div v-for="(ys,index) in list" :key='index'>
				{{ys}}
			</div>
		</div>
		
		
		
		
		<div class="home_a2_t" >
		<div class="home_a2_xtp" v-for="(ys,index) in lists" :key='index'>
			<img :src="ys.goodsLogo" ></img>
			<p>{{ys.goodsName}}</p>
			<p style="color: red;">{{ys.goodsOldPrice}}</p>
		</div>
		</div>
	</div>
</template>

<script>
	import {
		Sear,
		Tks
	} from '../api/api.js'
	import jieliu from '../plugins/jieliu.js'
	export default {
		data() {
			return {
				value: '',
				Sealist: '',
				list: [],
				lists:[],

			}
		},


		methods: {
			fht() {
				this.$router.push({
					path: '/Home'
				})
			},


			// 点击搜索 添加到下面的div
			onSearch() {
				var tn = this.list.findIndex((ele) => {
					// this.indexs =index
					return ele === this.value
				})
				if (tn !== -1) {
					this.list.splice(tn, 1) //数据为-1的时候删除一个 不能添加相同的
				}
				this.list.unshift(this.value) //unshift:从数组的第一行添加  不从下面添加
				
				var cansu = {
						goodsName:this.value,
						page:1,
						pageSize:20,
						sortType:'syn',
				}
				
				Tks(
					cansu
				).then(res => {
					console.log(res.data)
					this.lists=res.data
				})



			},

			// 点击出现对应的商品
			otk(ys){
				this.value=ys
				this.onSearch() //把搜索方法直接调用过来 点击词语直接搜索
				// console.log(ys)
				// this.value.push(ys)
				// console.log(this.value)
			

			}


		},



		created() {
			Sear({

			}).then(res => {
				console.log(res.data)
				this.Sealist = res.data
			})

		}





	}
</script>

<style scoped="scoped">
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

	.sea_bt {
		margin-top: 65px;

	}

	.Seat_ov {
		width: 100%;
		height: 200px;
		/* background-color: #009FE9; */
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
		text-align: center;
	}

	.sear_to {
		width: 30%;
		height: 40px;
		border: 2px solid #EEEEEE;
		border-radius: 6px 6px 6px 6px;
		color: #BEBFC2;
	}
	.home_a2_t {
		width: 100%;
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
	}
	
	.home_a2_xtp {
		width: 50%;
	
	}
	.home_a2_xtp p{
		white-space: nowrap;
		/*一行显示*/
		
		overflow: hidden;
		/*超出部分隐藏*/
		
		text-overflow: ellipsis;
		/*用...代替超出部分*/
	}
	.home_a2_xtp img{
		width: 370px;
	}
	
</style>
