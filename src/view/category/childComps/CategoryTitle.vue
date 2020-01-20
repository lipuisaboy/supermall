<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" :key="index"
         class="tab-item"
         :class="{active: index === currentIndex}"
         @click="itemClick(index)">
      <span>{{item.title}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CategoryTitle",
    props:{
      titles:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data(){
      return{
        currentIndex:0
      }
    },
    methods:{
      itemClick(index){
        this.currentIndex = index;
        //将事件传到外面
        this.$emit('tabClick',index)
      }
    }
  }
</script>

<style scoped>
  .tab-control{
    display: flex;
    flex-direction: column;
    font-size: 15px;
    text-align: center;
    width: 110px;
    background: #eaeaea;
  }
  .tab-item{
    padding: 15px;
    height: 50px;
  }
  .tab-item span{
    padding: 5px;
  }
  .active{
    color: var(--color-high-text);
    border-left: 3px solid var(--color-high-text);
  }
</style>
