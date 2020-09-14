import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// rem
import 'lib-flexible/flexible'


// vant
import 'vant/lib/index.css';

// 全局引入按需引入UI库 vant
import '@/plugins/vant'

// 全局axios
import axios from 'axios'
Vue.prototype.axios=axios


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
