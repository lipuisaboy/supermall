<template>
  <div class="check-button" :class="{check: isCheck}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
  export default {
    name: "CheckButton",
    props:{
      isCheck:{
        type:Boolean,
        default:true
      }
    }
  }
</script>

<style scoped>
 .check-button{
   background-color: #ffffff;
   border-radius: 50%;
   border: 2px solid #aaa;
 }
  .check{
    background-color: var(--color-high-text);
    border-color: var(--color-high-text);
  }
</style>
