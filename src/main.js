import Vue from 'vue'
import App from './App'
import router from './router'
import 'babel-polyfill' //兼容IE
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import bus from 'vue-bus'
import echarts from 'echarts'
import qs from 'qs'
import 'vue2-animate/dist/vue2-animate.min.css'
import popBox from './components/customComponents/popBox'
import fdBox from './components/customComponents/box'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$http = axios
Vue.prototype.$echarts = echarts
Vue.prototype.$qs = qs
Vue.prototype.$bus = bus
Vue.component('pop-box',popBox)
Vue.component("fd-box",fdBox);
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})