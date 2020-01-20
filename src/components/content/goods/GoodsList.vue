<template>
  <div class="goods">
    <goods-item v-for="(item,index) in goods" :key="index" :goodsItem="item" class="item">
    </goods-item>
  </div>
</template>

<script>
  import GoodsItem from "./GoodsItem";
  export default {
    name: "GoodsList",
    props:{
      goods:{
        type:Array,
        default(){
          return []
        }
      }
    },
    components:{
      GoodsItem
    }
  }
</script>

<style scoped>
.goods {
    display: flex;
    flex-wrap: wrap;
    padding: 5px;
    justify-content: space-around;
  }

.goods .item {
  width: 48%;
}
</style>
