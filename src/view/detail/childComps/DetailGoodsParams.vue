<template>
  <div class="goods-params" v-if="Object.keys(goodsParams).length !== 0">
    <table v-for="(table,index) in goodsParams.sizes"
           :key="index">
      <tr v-for="(tr,indey) in table" :key="indey">
        <td v-for="(td,indez) in tr" :key="indez">{{td}}</td>
      </tr>
    </table>
    <table class="info-params">
      <tr v-for="(info,index) in goodsParams.infos">
        <td class="info-params-key">{{info.key}}</td>
        <td class="info-params-value">{{info.value}}</td>
      </tr>
    </table>
    <div class="info-img" v-if="goodsParams.image.length !== 0">
      <img :src="goodsParams.image" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailGoodsParams",
    props:{
      goodsParams:{
        type:Object
      }
    }
  }
</script>

<style scoped>
  .goods-params{
    padding: 20px 15px;
    font-size: 14px;
    border-bottom: 5px solid #fff;
  }
  .goods-params table{
    width: 100%;
    border-collapse: collapse;
  }
  .goods-params table tr{
    height: 42px;
  }
  .goods-params table tr td{
    border-bottom: 1px solid rgba(100,100,100,0.1);
  }
  .info-params-key{
    /*当数据量大时  会挤到key 所以给一个固定宽度*/
    width: 95px;
  }
  .info-params{
    border-top: 1px solid rgba(0,0,0,0.1);
  }
  .info-params-value{
    color: #eb4868;
  }
  .info-img img{
    width: 100%;
  }
</style>
