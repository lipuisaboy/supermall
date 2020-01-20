import Vue from 'vue'
import Vuex from 'vuex'
import actions from "./actions";
import getters from "./getters";

//安装插件
Vue.use(Vuex)

//创建store对象
const state = {
  cartList: []
}
const store = new Vuex.Store({
  state,
  mutations: {
    //mutations唯一目的是为了修改state中的状态
    //mutations中的每个方法完成的事件最好比较单一
  },
  actions,
  getters
})


export default  store
