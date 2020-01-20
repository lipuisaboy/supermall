<template>
<div class="goods-item" @click="itemClick">
<!--  vue: @load 监听图片加载完成 原生: img.onload-->
  <img v-lazy="showImg" alt="" @load="imgLoad">
  <div class="goods-info">
    <p>{{goodsItem.title}}</p>
    <span class="price">{{goodsItem.price}}</span>
    <span class="cfav">{{goodsItem.cfav}}</span>
  </div>
</div>
</template>

<script>
  export default {
    name: "GoodsItem",
    props:{
      goodsItem:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    computed:{
     //判断用哪个数据
      showImg(){
        //先从goodsItem.image找数据 找不到再从goodsItem.show.img找数据
        return this.goodsItem.image || this.goodsItem.show.img
      }
   },
    methods:{
      imgLoad(){
        //发射事件 保存在事件总线中  首页可以监听事件总线中的事件
        this.$bus.$emit('itemImgLoad')
      },
      itemClick(){
        this.$router.push('/detail/'+this.goodsItem.iid)
      }
    }
  }
</script>

<style scoped>
  .goods-item{
    position: relative;
    padding-bottom: 40px;
  }
  .goods-item img{
    width:100%;
    border-radius: 5px;
  }
  .goods-info{
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }
  .goods-info p{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }
  .goods-info .price{
    color: var(--color-high-text);
    margin-right: 20px;
  }
  .goods-info .cfav{
    position: relative;
  }
  /*伪元素*/
  .goods-info .cfav::before{
    content:'';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
