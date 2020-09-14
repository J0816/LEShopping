import Vue from 'vue'
import VueRouter from 'vue-router'
import Loding from '../views/Loding.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Loding',
    component: Loding,
	meta:{
		isShow:false
	}
  },
  {
    path: '/Home',
    name: 'Home',
    component: () => import( '../views/Home.vue'),
  	meta:{
  		isShow:true
  	}
  },
  {
    path: '/About',
    name: 'About',
    component: () => import( '../views/About.vue'),
	meta:{
		isShow:true
	}
  },
  {
    path: '/Mai',
    name: 'Mai',
    component: () => import( '../views/Mai.vue'),
	meta:{
		isShow:false
	}
  },
  {
    path: '/Shopping',
    name: 'Shopping',
    component: () => import( '../views/Shopping.vue'),
	meta:{
		isShow:true
	}
  },
  {
    path: '/Xq',
    name: 'Xq',
    component: () => import( '../views/Xq.vue'),
  	meta:{
  		isShow:false
  	}
  },
  {
    path: '/Order',
    name: 'Order',
    component: () => import( '../views/Order.vue'),
  	meta:{
  		isShow:false
  	}
  },
  {
    path: '/Address',
    name: 'Address',
    component: () => import( '../views/Address.vue'),
  	meta:{
  		isShow:false
  	}
  },
  {
    path: '/New',
    name: 'New',
    component: () => import( '../views/New.vue'),
  	meta:{
  		isShow:false
  	}
  },
  {
    path: '/Payment',
    name: 'Payment',
    component: () => import( '../views/Payment.vue'),
  	meta:{
  		isShow:false
  	}
  },
  {
    path: '/mber',
    name: 'mber',
    component: () => import( '../views/mber.vue'),
  	meta:{
  		isShow:false
  	}
  },
  {
    path: '/Search',
    name: 'Search',
    component: () => import( '../views/Search.vue'),
  	meta:{
  		isShow:false
  	}
  },
]

const router = new VueRouter({
  routes
})

export default router
