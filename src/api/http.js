import axios from 'axios'
import store from '../store/index.js'

export function request(config) {

    // 创建axios对象
    const service = axios.create({
        baseURL: 'http://www.hj0819.top:44369',  // 请求源地址
        timeout: 80000   // 请求过期时间
    })
    //请求拦截器
    service.interceptors.request.use((config) => {
		// console.log(config)	 规定的样式  每发送一次请求 都会触发一次接口
        // 在发送请求之前做些什么
		if(store.state.token){
			config.headers.token=store.state.token;
		}
				
        return config;
    }, err => {
        // 对请求错误做些什么
        console.log(err)
    })

    //响应拦截器
    service.interceptors.response.use(res => {
        // 对响应数据做点什么
        //  if(token过期){
        //       this.$router.push({path:'/login'})
        //  }
        return res.data
    }, err => {
        // 对响应错误做点什么
        console.log(err)
    })
    return service(config)
} 