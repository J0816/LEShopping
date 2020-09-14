<template>
	<!-- ---- 更换收货地址页面 ----- -->
	<div>
		<div class="add_box">
			<div style="font-size: 30px;" @click="teo()">←</div>
			<div>更换收货地址</div>
			<div @click="ontpo()">新增</div>
		</div>


		<div class="add_a">
			<div v-for="(ys,index) in list" :key="index" class="add_a1">
				<van-row>
					<van-col span="2">
						<van-checkbox v-model="ys.checked" class="Add_checkbox" @click='onkwt(ys,index)'></van-checkbox>
					</van-col>

					<van-col span="22">
						<p>
							{{ys.name}}
							<span>{{ys.phone}}</span>
						</p>
						<p>
							<span>{{ys.province}}</span>
							<span>{{ys.city}}</span>
							<span> {{ys.district}}</span>
						</p>
					</van-col>

				</van-row>


			</div>
		</div>



		<div @click="xiugai()" class="gdz">选择改地址</div>

	</div>
</template>

<script>
	import {
		NewAccess
	} from '../api/api.js'
	export default {
		data() {
			return {
				list: [],
				ZT:[],
				
			}
		},



		methods: {
			teo() {
				this.$router.push({
					path: '/Order'
				})
			},


			ontpo() {
				this.$router.push({
					path: '/New'
				})
			},
			
			onkwt(ys,index){
				console.log(ys)
				this.list.map(ele=>{
					ele.checked=false
				})
				console.log(index)
				this.list[index].checked=true
				this.ZT =ys
				console.log(this.ZT)
				
			},
			xiugai(){
				this.$store.dispatch('xg',this.ZT)
				this.$router.push({
					path:'/Order'
				})
				
				
				
			}


		},

		created() {

			NewAccess({

			}).then(res => {
				console.log(res)
				this.list = res.data
				console.log(this.list)
				// 当数组里面没有checked属性可以手动添加一个进去 
				// 再循环数组-- 让数组每一条数据都添加进去checked
				// var i={
				// 	checked:false
				// };
				// this.list.map((ele,index)=>{
				// 			this.newlist.push([this.list[index],i])

				// })
				// console.log(this.newlist)
				
				// 	var li =this.list
					
				// for (var i = 0;i < li.length; i++) {
				// 	this.checkedlist.push({
				// 		checked: false
				// 	})
				// }
				// console.log(this.checkedlist)

			})


		}
	}
</script>

<style scoped="scoped">
	.add_box {
		width: 100%;
		border-bottom: 3px solid #EEEEEE;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.add_a {
		width: 100%;
		/* height: 800px; */
		/* background-color: mediumseagreen; */
	}

	.add_a1 {
		width: 100%;
		height: 200px;
		background-color: #FF69B4;
		margin-bottom: 20px;
	}

	/* 	.Add_checkbox{
		margin-top: 50px;
	} */
	
	.gdz{
		width: 90%;
		height: 80px;
		line-height: 80px;
		/* margin: 0 auto; */
		text-align: center;
		background-color: red;
		position: fixed;
		bottom: 0;
		left: 50px;
		border-radius: 10px 10px 10px 10px;
		color:white;
		
	}
</style>
