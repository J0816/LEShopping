<template>
	<div id="box">
		<div class="loding_a">
			<img src="../../public/img/home/LE_logo_2.png"></img>
		</div>
		<div class="loding_b">
			<div v-for="(ys,index) in data" :key="index" :class="cet==index?'k':'k1'" @click="ontk(index)">
				<div>{{ys.title}}</div>
			</div>
		</div>

		<!-- 登录页面 -->
		<div class="loding_c" v-show="isF">
			<div class="loding_c1">
				<p>账号</p>
				<p><input type="text" placeholder="请输入登录账号" v-model="nt1" /></p>
			</div>
			<div class="loding_c1">
				<p>密码</p>
				<p><input type="password" placeholder="请输入登录密码" v-model="nt2" /></p>
			</div>
			<p class="loding_c2"><input type="checkbox" />记住密码</p>
			<div class="dl" @click="onck()">登录</div>
			<div class="loding_t">
				<div>找回密码|</div>
				<div>还没有注册账号？</div>
				<div>立即注册</div>
			</div>
		</div>


		<!-- 注册页面 -->
		<div class="loding_d" v-show="isT">
			<div class="loding_c3">
				<p>手机号</p>
				<p><input type="text" placeholder="注册手机为找回密码的唯一凭证" @blur="sjh()" 
				v-model="vt1"
				 :class="{'tys':fei}" /></p>
				<div>{{msg}}</div>
			</div>

			<div class="loding_c3">
				<p>登录名</p>
				<p><input type="text" placeholder="中,英文均可,不可超过12个字符串" @blur="dlm()" 
				v-model="vt2" 
				:class="{'tys':fei1}" /></p>
				<div>{{tei}}</div>
			</div>

			<div class="loding_c3">
				<p>密码</p>
				<p><input type="password" placeholder="3-18位英文,数字,符号,区分大小写" 
				v-model="vt3" /></p>
			</div>
			<div class="lodi">
				<p>短信验证码</p>
				<div class="lidt">
					<input type="text" placeholder="请输入验证码" />
					<div @click="ontr()">发送验证码</div>
				</div>
			</div>
			<div class="dl" style="height: 50px;line-height: 50px;" @click="onzc()">注册</div>
			<p style="text-align: center;margin-top: 10px;"> 湘ICP备19027633号</p>
		</div>


	</div>
</template>


<script>
	import qs from 'qs'
	import md5 from 'js-md5'
	import axios from 'axios'
	import {
		zhuce,	//引过来的手机号的接口
		denglu,	//引过来的登录名的接口
		dxyz,	//引过来的短信验证的接口
	} from '../api/api.js'
	export default {
		data() {
			return {
				data: [{
						title: '登录'
					},
					{
						title: '注册'
					}
				],

				cet: 0,
				isT: false,
				isF: true,
				// vt1, vt2,vt3 都是注册页的
				vt1: '',
				vt2: '',
				vt3: '',
				fei:false,
				msg:'',//提示字体
				
				fei1:false,
				tei:'',
				
				fei2:false,
				
				
				// 登录页
				nt1: '',
				nt2: '',


			}
		},

		methods: {
			// 点击切换登录和注册页面
			ontk(index) {
				this.cet = index
				// console.log(this.cet)

				if (index == 0) {
					this.isT = false
					this.isF = true
				} else {
					this.isT = true
					this.isF = false
				}
			},


			// 注册页面:
			// 验证手机号是否注册
			sjh(){
			zhuce({
			phone:this.vt1,
			}
				
			).then(res=>{
				console.log(res)
				var le1=res.code
				this.msg= res.msg 
				if(le1==415){
					this.fei=true
					
				}else if(le1==200){
					this.fei=false
				}
			})
			},

			// 验证用户名
			dlm() {
				denglu({
					LoginName:this.vt2
				}).then(res=>{
					console.log(res)
					var xy_t=res.code
					this.tei=res.msg
					if(xy_t==415){
						this.fei1=true
					}else if(xy_t==404){
						this.fei1=false
					}
				})
			},

			// 短信验证
			ontr() {
				dxyz({
					phone:this.vt1,
					codeType:0,
				}).then(res=>{
					console.log(res)
					var xy_y =res.code
					if(xy_y==415){
						this.fei2=true
					}else if(xy_y==404){
						this.fei2=false
					}
				})
			},



			// 点击实现注册功能
			onzc() {
				var ten = {
					phone: this.vt1,
					LoginName: this.vt2,
					LoginPassword: this.vt3
				};
				ten.LoginPassword = md5(ten.LoginPassword)
				axios.post(
					`http://www.hj0819.top:44369/api/LoginPage/AddLogin`, qs.stringify(ten)
				).then(res => {
					console.log(res.data)
					var ti= res.data
					if(ti.code==201){
						this.$dialog.alert({
						  message: '注册成功',
						}).then(() => {
						  // on close
						});
					}else if(ti.code==415){
						this.$dialog.alert({
						  message: '注册失败',
						}).then(() => {
						  // on close
						});
					}
				})
			},


			// 登录页面:
			onck() {
				var tec = {
					LoginName: this.nt1,
					LoginPassword: this.nt2,
					isPassing:'yes',	//是否验证通过，通过为‘yes'
				};
				
				tec.LoginPassword = md5(tec.LoginPassword) //给密码加密

		axios.post(`http://www.hj0819.top:44369/api/LoginPage/Login`,
		qs.stringify(tec) //解析模块  不解析不能用
				).then(res => {
					// console.log(res.data.tnToken.tokenStr)
					var dl = res.data
					if (dl.code == 404) {
						this.$dialog.alert({
							message: '登陆失败',
						}).then(() => {
							// on close
						});
					} else if (dl.code == 200) {
						this.$dialog.alert({
							message: '登陆成功',
						}).then(() => {
							// on close
						})
						this.$router.push({
							path: '/Home'
						})
					}
					var tok=res.data.tnToken.tokenStr
					console.log(tok)
					// 像Vuex中提交请求头事件
					this.$store.dispatch('Shooting',tok)
					})
			}
		},

		computed: {
			
		},
	}
</script>

<style scoped>
	#box {
		width: 100%;
	}

	.loding_a {
		width: 100%;
		height: 100px;
		/* background-color: aqua; */
	}

	.loding_a img {
		width: 60%;
		margin-left: 110px;
	}

	.loding_b {
		width: 100%;
		height: 100px;
		line-height: 100px;
		display: flex;
		text-align: center;

	}

	.loding_b_q {
		width: 50%;
		height: 100%;
		background-color: #FF5777;
	}

	.k {
		width: 50%;
		height: 100%;
		color: #BF00FF;
	}

	.k1 {
		width: 50%;
		height: 100%;
		background-color: gainsboro;
		color: #000000;
	}

	.loding_c1 {
		width: 100%;
		height: 200px;
		/* 		background-color: #BF00FF; */
	}

	.loding_c1 p {
		margin: 40px;

	}

	.loding_c1 input {
		width: 90%;
		height: 70px;
		border-radius: 10px 10px 10px 10px;
		border: 1px solid gray;
		padding-left: 20px;

	}

	.loding_c2 {
		width: 80%;
		margin: 20px 40px;
	}

	.dl {
		width: 90%;
		height: 100px;
		line-height: 100px;
		background: #409EFF;
		margin: 0 auto;
		text-align: center;
		color: white;
		border-radius: 10px 10px 10px 10px;
	}

	.loding_t {
		width: 100%;
		height: 70px;
		display: flex;
		margin-top: 20px;
		justify-content: center;
	}

	.loding_t div {
		margin-left: 10px;

	}

	.loding_c3 {
		width: 100%;
		height: 200px;
	}

	.loding_c3 p {
		margin: 30px;

	}

	.loding_c3 input {
		width: 90%;
		height: 60px;
		border-radius: 10px 10px 10px 10px;
		border: 1px solid gray;
		padding-left: 20px;
	}

	.loding_d {
		width: 100%;
		margin-bottom: 100px;
	}

	.lodi {
		width: 100%;
		margin-bottom: 20px;
	}

	.lodi p {
		margin: 20px 40px;
	}

	.lidt {
		width: 100%;
		height: 100%;
		display: flex;
		/* justify-content: space-around; */
	}

	.lidt input {
		width: 65%;
		height: 60px;
		margin-left: 40px;
		border-radius: 10px 10px 10px 10px;
		border: 1px solid gray;
	}

	.lidt div {
		width: 20%;
		height: 65px;
		background-color: #409EFF;
		color: white;
		text-align: center;
		line-height: 65px;
		border-radius: 7px 7px 7px 7px;
		margin-left: 10px;
		position: relative;
	}

	.loding_c3 .tys {
		border: 1px solid red;
	}
</style>
