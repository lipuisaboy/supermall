import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import VueAwesomeSwiper from 'vue-awesome-swiper'
import store from "./store";
import toast from 'components/common/toast'
import FastClick from 'fastclick'
import VueLazyLoad from "vue-lazyload";

Vue.config.productionTip = false
//在Vue原型中设置$bus  设置为一个vue实例
Vue.prototype.$bus = new Vue()
//轮播图
Vue.use(VueAwesomeSwiper)
//弹出自己封装的组件
Vue.use(toast)
//解决移动端300ms延迟
FastClick.attach(document.body)
//使用lazy-load
Vue.use(VueLazyLoad,{
  loading: require('./assets/img/common/placeholder.png')
})
import 'swiper/dist/css/swiper.css'

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
