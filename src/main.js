import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App'
import store from './store'
import router from './router'
import '@/custom-component' // 注册自定义组件
import '@/assets/iconfont/iconfont.css'
import '@/styles/animate.scss'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/reset.css'
import '@/styles/global.scss'
import './components/iconSvg' // iconSvg
import dataV from '@jiaminghi/data-view'
import * as echarts from 'echarts'
import { debounce, throttle } from '@/utils/debounce.js'
import './utils/dialog'

Vue.prototype.$echarts = echarts
Vue.prototype.$debounce = debounce // 函数防抖
Vue.prototype.$throttle = throttle // 函数节流
Vue.use(dataV)
Vue.use(ElementUI, { size: 'small' })

Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    store,
    render: (h) => h(App),
})
