<template>
	<div>
		<div class="new_box">
			<div class="new1" style="font-size: 30px; " @click="onth()">←</div>
			<div class="new2">新增收货地址</div>
		</div>
		
		
		<div class="new_3">
			<div class="new_3_a">
				<div class="new_3_a1">收件人:</div>
				<input type="text" v-model='input1'  />
				</div>
				
				
				
			<div class="new_3_a"> 
			<div class="new_3_a1">联系电话:</div>
			<input type="text" v-model='input2' />
			</div>
			
			
			
			<div class="new_3_a">
				<div class="new_3_a1">省份:</div>
				<input type="text" v-model='input3' />
				</div>
				
				
				
			<div class="new_3_a">
				<div class="new_3_a1">地级市:</div>
				<input type="text" v-model='input4' />
				</div>
				
				
				
			<div class="new_3_a"> 
			<div class="new_3_a1">市、县级市:</div> 
			<input type="text" v-model='input5' />
			</div>
			
			
			
		<div>详情地址:<textarea v-model='input6'/>
		
		
		
		</div>
		</div>
		
		<div class="new_4" style="font-size: 20px;" @click="onclk()">
			立即创建
		</div>
		
		
		
		
		
	</div>
</template>

<script>
	import {NewTian} from '../api/api.js'
	export default{
		data(){
			return{
				input1:'',
				input2:'',
				input3:'',
				input4:'',
				input5:'',
				input6:'',
			}
		},
		
		
		// 测试监听事件  瞎写的监听inpu1
		// watch:{
		// 		input1(){
		// 			console.log(this.input1)
		// 		}
		// },
		
	
		 methods:{
			 onth(){
				 this.$router.push({
					 path:'/Address'
				 })
			 },
			 onclk(){
				 var zh ={
				 	Name:this.input1,
				 	Phone:this.input2,
				 	Province:this.input3,
				 	City:this.input4,
				 	District:this.input5,
				 	Address:this.input6,
				 };
				 
				 NewTian({
				 	zh
				 }).then(res=>{
				 	console.log(res)
					if(res.code==201){
					this.$dialog.alert({
					  message: '添加收货地址成功',
					}).then(() => {
					  // on close
					});
					}
				 })
			 }
			 
			
		
		}
		
		
	
	}
</script>

<style scoped="scoped">
	.new_box{
		width: 100%;
		height: 65px;
		display: flex;
		background-color: white;
		align-items: center;
		background-color: #409EFF;
		margin-bottom: 30px;
		
	}
	.new1{
		width: 20%;
		height: 65px;
		margin-left: 30px;
	}
	.new2{
		width: 80%;
		height: 65px;
		line-height: 65px;;
		text-align: center;
	}
	.new_3{
		width: 100%;
		
		
	}
		
	.new_3_a{
		width: 100%;
		display: flex;
	
		
	}
	.new_3_a input{
		
		width:65% ;
		height: 50px;
		border-radius: 6px 6px 6px 6px ;
		border: 1px solid #000000;
		margin-bottom: 30px;
	}
	.new_3_a1{
		width: 25%;
		height: 52px;
		margin-left: 20px;
	}
	.new_4{
		margin: 0 auto;
		margin-top: 100px;
		width: 90%;
		height: 60px;
		line-height: 60px;
		background-color: #409EFF;
		color: white;
		text-align: center;
		border-radius: 6px 6px 6px 6px ;
	}
</style>
