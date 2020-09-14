<template>
	<div id="box">
		<div class="ab_t">
			商品分类
		</div>
		<div>
			<van-search  placeholder="请输入搜索关键词" input-align="center" />
		</div>

		<div class="abo">
			<div class="ab_z">	
				<div v-for="(ys,index) in zlist" :key="index"
				 :class="yte==index?'t_1':'t_2'"
				 @click="onfb(ys.cat_id,index)"
				 >
					{{ys.cat_name}}
				</div>
			</div>
			
			
			<div class="ab_y">
				<div class="ab_1">
					<div v-for="(itme,index) in datas" :key="index"
					 @click="onzh(index)"
					 :class="ytt==index?'y_1':'y_2'"
					 >
							{{itme.title}}
					</div>
				</div>
				
				
				<div class="ab_2">
					<div class="ab_2a">
						<div v-for="(ys,index) in ylist" :kye="index" class="ab_2b">
							<img :src="ys.goodsLogo" ></img>
							<p>{{ys.goodsName}}</p>
							<p style="color: red;">{{ys.goodsOldPrice}}</p>
							
						</div>
					</div>
				</div>
				
				
			</div>
		</div>




	</div>
</template>

<script>
	import { fen1 , fen2 } from '../api/api.js'
	
	export default {
		data(){
			return{
				zlist:[],
				yte:'',
				datas:[
					{title:'综合'},
					{title:'销量'},
					{title:'新品'},
				],
				ytt:'',
				ylist:[],
				
				
				
				}
				
		},
		
		
	
		mounted() {
		// 右边数据
			fen1({
			}).then(res=>{
				// console.log(res.data)
				this.zlist=res.data
			}),
			
			
			// 左边数据
			fen2({
				cat_id:85 //85是数据里的第一个ID  我们来当做默认显示的ID
			}).then(res=>{
				console.log(res.data)
				this.ylist=res.data
			})
		},
		
		
		methods:{
			onfb(id,index){
				this.yte=index;
				// console.log(id)
				// 点击时再次发送一遍数据请求
				fen2({
					cat_id:id //85是数据里的第一个ID  我们来当做默认显示的ID
				}).then(res=>{
					console.log(res.data)
					this.ylist=res.data
				})
				
			},
			
	
			onzh(index){
				this.ytt= index
				console.log(this.ytt)
				
			}
		}
		


	
	}
</script>

<style scoped>
	#box {
		width: 100%;
	}

	.ab_t {
		width: 100%;
		height: 65px;
		line-height: 65px;
		text-align: center;
	}
	.abo{
		width: 100%;
		display: flex;
		justify-content: space-between;
		
	}
	.ab_z{
		width: 20%;
		border-left: 3px solid #EEEEEE;
	}
	.ab_z1{
		width: 100%;
		height: 85px;
		line-height: 85px;
		padding-left: 40px;
	}
	.t_1{
		width: 100%;
		height: 85px;
		line-height: 85px;
		padding-left: 40px;
		color: red;
	}
	.t_2{
		width: 100%;
		height: 85px;
		line-height: 85px;
		padding-left: 40px;
	}
		
	.ab_y{
		width: 80%;
		margin-bottom: 100px;
		/* height: 700px; */
		/* background-color:tan; */
	}
	.ab_1{
		width: 100%;
		height: 50px;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	.y_1{
		border-bottom: 3px solid red;
		color: red;
	}
	.y_2{
		color: #000000;
	}
	.ab_2{

		width: 100%;
		overflow: scroll;
		height: 800px;
	}
	.ab_2a{
		width: 100%;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	.ab_2b{
		width: 50%;
		text-align: center;
	}
	.ab_2b img{
		width: 220px;
	}
	.ab_2b p{
		white-space: nowrap;/*一行显示*/
		 
		overflow: hidden;/*超出部分隐藏*/
		 
		text-overflow: ellipsis;/*用...代替超出部分*/
	}
</style>
