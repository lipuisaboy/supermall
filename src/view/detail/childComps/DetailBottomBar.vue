<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div :class="{like: isLike}" @click="iLike">
        <i class="icon select"></i>
        <div class="text">收藏</div>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addCart">加入购物车</div>
      <div class="buy" @click="buy">购买</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailBottomBar",
    data(){
      return{
        isLike:false
      }
    },
    methods:{
      addCart(){
        this.$emit('addCart')
      },
      buy(){
        this.$toast.show('请先加至购物车',1500)
      },
      iLike(){
        this.isLike = !this.isLike
        if(this.isLike){
          this.$toast.show('收藏成功',1500)
        }
        else{
          this.$toast.show('取消收藏成功',1500)
        }
      }
    }
  }
</script>

<style scoped>
 .bottom-bar{
   display: flex;
   height: 49px;
   background-color: #fff;
   position: fixed;
   left: 0;
   right: 0;
   bottom: 0;
   z-index: 1000;
   text-align: center;
 }
  .bar-left {
    flex: 1;
    display: flex;
  }
  .bar-item>div{
    flex: 1;
  }
  .bar-left .text{
    font-size: 13px;
  }
  .bar-left .icon{
    display: block;
    width: 22px;
    height: 22px;
    margin: 5px auto 3px;
    background: url("../../../assets/img/detail/detail_bottom.png") 0 0/100%;
  }
 .bar-left .service {
   background-position:0 -54px;
 }

 .bar-left .shop {
   background-position:0 -98px;
 }

 .bar-right {
   flex: 1;
   font-size: 15px;
   color: #fff;
   line-height: 49px;
   display: flex;
 }

 .bar-right .cart {
   background-color: #ffe817;
   color: #333;
 }

 .bar-right .buy {
   background-color: #f69;
 }
  .like{
    background-color: var(--color-high-text);
  }
</style>
