<template>
	<div>
		<div class="box">
			<div class="box1" @click="ont()">←</div>
			<div class="box2">支付完成</div>
		</div>
		
		<div class="mber">
			<img src="../../public/h1.png" ></img>
			
		</div>
		
		
	</div>
</template>

<script>
	import {mber} from '../api/api.js'
	export default{
		
		
			// created(){
			// 	mber({
			// 		orderId:this.dts
			// 	}).then(res=>{
			// 		console.log(res)
			// 	})
			// },
			methods:{
				ont(){
					this.$router.push({
						path:'/Payment'
					})
				}
			},
		
		
		
	}
</script>

<style scoped="scoped">
	
	.box{
		width: 100%;
		height: 85px;
		background-color: #009FE9;
		display: flex;
	}
	.box1{
		width: 20%;
		height: 85px;
		line-height: 85px;
	}
	.box2{
		width: 80%;
		height: 85px;
		line-height: 85px;
		text-align: center;
	}
	
	.mber{
		width: 100%;
		background-color: #409EFF;
	}
	.mber img{
		width: 100%;
	}
	
</style>
