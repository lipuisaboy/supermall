import Vue from 'vue'
import VueRouter from "vue-router";
import Home from "../view/home/Home";
import Category from "../view/category/Category";
import Cart from "../view/cart/Cart";
import Profile from "../view/profile/Profile";
import Detail from "../view/detail/Detail";


//安装插件
Vue.use(VueRouter)

const routes = [
  {
    path:'',
    redirect:'/home'
  },
  {
    path:'/home',
    component:Home
  },
  {
    path:'/category',
    component:Category
  },
  {
    path:'/cart',
    component:Cart
  },
  {
    path:'/profile',
    component:Profile
  },
  {
    path:'/detail/:iid',
    component:Detail
  }
]
//创建路由对象
const router = new VueRouter({
  routes,
  mode:'history'
})

//导出路由对象
export default router
