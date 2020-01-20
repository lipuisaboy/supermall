<template>
  <div id="cart-item">
    <div class="item-selector">
      <!--@CheckButton="checkChange" :value="cartInfo.checked"-->
      <check-button :is-check="cartInfo.checked" @click.native="checkChange"></check-button>
    </div>
    <div class="item-img">
      <img :src="cartInfo.img" alt="商品图片">
    </div>
    <div class="item-info">
      <div class="info-title">{{cartInfo.title}}</div>
      <div class="info-desc">{{cartInfo.desc}}</div>
      <div class="info-bottom">
        <div class="info-price left">¥{{cartInfo.price}}</div>
        <div class="info-count right">x{{cartInfo.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import CheckButton from "../../../components/common/checkbutton/CheckButton";
  export default {
    name: "CartListItem",
    components:{
      CheckButton
    },
    props:{
      cartInfo:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    methods:{
      checkChange(){
        this.cartInfo.checked = !this.cartInfo.checked
      }
    }
  }
</script>

<style scoped>
  #cart-item{
    width: 100%;
    display: flex;
    font-size: 0;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }
  .item-selector{
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .info-title , .info-desc{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .item-img{
    padding: 5px;
  }
  .item-img img{
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }
  .item-info{
    font-size: 14px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }
  .item-info .info-desc{
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }
  .info-bottom{
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    right: 10px;
    width: 180px;
  }
  .info-bottom .info-price{
    color: orangered;
  }
  .info-bottom .info-price .left{
    float: left;
  }
  .info-bottom .info-price .right{
    float: right;
  }
</style>
