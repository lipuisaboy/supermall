<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" :is-check="isAllCheck" @click.native="allCheck"/>
      <span>全选</span>
    </div>
    <div class="all-price">
      合计: ¥{{allPrice}}
    </div>
    <div class="go-money" @click="goMoney">
      去付款:{{checkLength}}
    </div>
  </div>
</template>

<script>
  import CheckButton from "../../../components/common/checkbutton/CheckButton";

  export default {
    name: "CartBottomBar",
    components:{
      CheckButton
    },
    computed:{
      allPrice(){
        //当item的checked为true 才会返回item 然后调用reduce函数 初始化为0
        return this.$store.state.cartList.filter(item => {
          return item.checked
        }).reduce((preValue,item) => {
          return preValue + item.price * item.count
        },0).toFixed(2)//保留两位小数
      },
      checkLength(){
        return this.$store.state.cartList.filter(item => {
          return item.checked
        }).length
      },
      isAllCheck(){
        /**
        *用过滤方法 检测非选中的长度  然后取反 并返回 如果为0  取反为true  其他为false
        */
        //if(this.$store.state.cartList.length === 0){
        //  return false
        // }
        //return !this.$store.state.cartList.filter(item => !item.checked).length
        /**
         * 用find方法 此方法如果找到就会停止 性能会好一些 查找是否有非选中的 如果有 则返回true 此时取反 则会返回false
         * */
        if(this.$store.state.cartList.length === 0){
          return false
        }
        return !this.$store.state.cartList.find(item => !item.checked)
      }
    },
    methods:{
      allCheck(){
        if(this.isAllCheck){//此时全部选中 此时让所有的item变为不选中
          this.$store.state.cartList.forEach(item => item.checked = false)
        }
        else{
          this.$store.state.cartList.forEach(item => item.checked = true)
        }
        //此时这样做不行 isAllCheck会影响
        //this.$store.state.cartList.forEach(item => item.checked = !this.isAllCheck)
      },
      //付款
      goMoney(){
        //如果全是非选中
        if(!this.isAllCheck){
          this.$toast.show('请添加商品~',1500)
        }
        else{
          this.$toast.show('请先付款哦',5000)
        }
      }
    }
  }
</script>

<style scoped>
 .bottom-bar{
   height: 40px;
   position: fixed;
   bottom: 49px;
   left: 0;
   right: 0;
   background-color: #f6f6f6;
   line-height: 40px;
   display: flex;
 }
 .check-content{
   display: flex;
   align-items: center;
   margin-left: 10px;
 }
  .check-button{
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 10px;
  }
  .all-price{
    font-size: 14px;
    margin-left: 20px;
    flex: 1;
  }
  .go-money{
    text-align: center;
    width: 90px;
    font-size: 14px;
    background-color: orangered;
    color: #333;
  }
</style>
