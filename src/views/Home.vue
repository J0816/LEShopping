<template>
	<div id="box">
		<div class="home">
			<div class="home_a">
				<img src="../../public/img/home/LE_logo_2.png" />
			</div>
			<div class="home_a1">
				<van-search placeholder="请输入搜索关键词"  @click='sosuo()'/>
			</div>
		</div>

		<div class="home_a2">
			<div class="home_a2_a">
				<van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
					<van-swipe-item v-for="(ys,index) in Rotationlist" :key='index' class="home_lu">
						<img :src="ys.slide_show_imgUrl"></img>
					</van-swipe-item>
				</van-swipe>
			</div>
			<div class="home_a2_b">

				<div v-for="(ys,index) in rtxlist " :key="index" class="home_a2_b1">
					<img :src="ys.sp_home_ico" width="60px"></img>
					<p>{{ys.sp_home_title}}</p>
				</div>

			</div>
			<van-sticky :offset-top="120">
				<div class="home_a2_c">
					<div v-for="(ys,index) in data" :key='index' @click="ontk(index)" :class="cont==index? 'h':'h1'">
						{{ys.title}}
					</div>
				</div>
			</van-sticky>

			<div class="home_a2_t">
				<div class="home_a2_xtp" v-for="(ys,index) in xylist" :key='index' @click="onkey(ys.goodsId)">
					<img v-lazy="ys.goodsLogo"></img>
					<div>{{ys.goodsName}}</div>
					<p style="color: red;">{{ys.goodsOldPrice}}</p>
				</div>
			</div>


		</div>
	</div>
</template>

<script>
	import {
		Xq
	} from '../api/api.js'

	export default {

		data() {
			return {
				data: [

					{
						title: '流行'
					},
					{
						title: '新款'
					},
					{
						title: '精选'
					}
				],
				cont: 0,
				// Rotationlist:this.$store.state.Rotationlist,


			};
		},

		mounted() {
			// 轮播图
			this.$store.dispatch('Rotation')

			// 轮播 下图
			this.$store.dispatch('rtx')

			// home页最下图片
			this.$store.dispatch('rtxt')
		},


		methods: {
			// 点击变换内容
			ontk(index) {
				// var个变量把数据内容中必传的参数附给ct ct就相当于点击谁就是谁
				// 当index等于0时 ct是第一个参数 然后依次类推 
				// 最后再把ct传到vuex中
				var ct = 'syn'
				switch (index) {
					case 0:
						ct = 'syn'
						break;
					case 1:
						ct = 'new'
						break;
					case 2:
						ct = 'sell'
						break;
				}
				console.log(ct)
				this.cont = index
				this.$store.dispatch('xy', ct)
			},

			onkey(id) {
				console.log(id)
				this.$router.push({
					path: '/Xq',
					query: {
						id: id,
					},


				})
			},
			
			// 点击进入搜索页
			sosuo(){
				this.$router.push({
					path:'/Search'
				})
			}


		},



		computed: {
			Rotationlist: function() {
				return this.$store.state.Rotationlist
			},

			rtxlist: function() {
				return this.$store.state.rtxlist
			},

			rtxtlist: function() {
				return this.$store.state.rtxtlist
			},
			xylist: function() {
				return this.$store.state.xylist
			}
		},

	};
</script>
<style scoped>
	#box {
		width: 100%;
	}

	.home {
		width: 100%;
		height: 185px;
		position: fixed;
		top: 0px;
		z-index: 10000;
		background-color: white;
	}

	.home_a {
		width: 100%;
		height: 100px;

	}

	.home_a img {
		width: 50%;
		margin: 10px 140px;
	}

	.home_a1 {
		width: 100%;
	}

	.home_a2 {
		width: 100%;
		margin-top: 185px;
		margin-bottom: 100px;

	}

	.home_a2_a {
		width: 100%;
		height: 370px;
	}

	.my-swipe .van-swipe-item {
		color: #fff;
		height: 370px;
		font-size: 20px;
		line-height: 150px;
		text-align: center;

	}

	.home_lu {
		width: 100%;
		height: 370px;
	}

	.home_lu img {
		width: 100%;
	}

	.home_a2_b {
		width: 100%;
		height: 300px;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.home_a2_b1 {
		width: 20%;
		height: 150px;
		text-align: center;
	}

	.home_a2_c {
		width: 100%;
		height: 60px;
		line-height: 60px;
		display: flex;
		justify-content: space-around;

		background-color: white;
	}

	.h {
		color: #FF5777;
		border-bottom: 5px solid #FF5777;
	}

	.h1 {
		color: black;
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

	.home_a2_xtp div {
		width: 100%;
		white-space: nowrap;
		/*一行显示*/

		overflow: hidden;
		/*超出部分隐藏*/

		text-overflow: ellipsis;
		/*用...代替超出部分*/
	}

	.home_a2_xtp img {
		width: 350px;
	}
</style>
