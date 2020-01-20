<template>
  <div class="category-right">
    <div v-for="(i,index) in list" :key="index" class="item" >
      <a :href="i.link">
        <img :src="i.image" alt="">
        <p>{{i.title}}</p>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CategoryRight",
    props:{
      list:{
        type:Array,
        default(){
          return []
        }
      }
    },
    methods:{

    }
  }
</script>

<style scoped>
  .category-right{
    background: #fff;
    display: flex;
    flex-wrap: wrap;
    width: 260px;
  }
  .category-right img{
    width: 65px;
    height: 65px;
  }
  .item{
    display: inline-block;
    margin-left: 25px;
    font-size: 12px;
  }
</style>
