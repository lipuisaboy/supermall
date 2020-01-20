<template>
  <div class="cart">
    <nav-bar class="nav-bar"><div slot="center">购物车({{cartLength}})</div></nav-bar>
    <cart-list/>
    <cart-bottom-bar/>
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import CartList from "./childComps/CartList";
  import CartBottomBar from "./childComps/CartBottomBar";

  import Scroll from "../../components/common/scroll/Scroll";

  //可以将getter中的函数转化为计算属性
  import {mapGetters} from 'vuex'

  export default {
    name: "Cart",
    components:{
      NavBar,
      CartList,
      CartBottomBar
    },
    computed:{
      ...mapGetters([
        'cartLength'
      ])
    }
  }
</script>

<style scoped>
  .nav-bar{
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
