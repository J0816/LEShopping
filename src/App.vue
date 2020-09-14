<template>
	<div>
		<router-view />
		<van-tabbar v-model="active" active-color='red' route v-if='this.$route.meta.isShow'>
			<van-tabbar-item to='/Home' name="home" icon="home-o">首页</van-tabbar-item>
			<van-tabbar-item to='/About' name="search" icon="search">商城</van-tabbar-item>
			<van-tabbar-item to='/Mai' name="friends" icon="friends-o">购物车</van-tabbar-item>
			<van-tabbar-item to='/Shopping' name="setting" icon="setting-o">我的</van-tabbar-item>
		</van-tabbar>
	</div>
</template>
<script>
	export default {
	  data() {
	    return {
	      active: 'home',
	    };
	  },
	};
	
	
</script>
	

<style>
</style>
