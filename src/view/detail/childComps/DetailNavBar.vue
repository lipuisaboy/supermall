<template>
  <div class="detail-nav-bar">
    <nav-bar>
      <div slot="left" class="back"  @click="imgClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="nav-bar-center">
        <div v-for="(item,index) in title"
             :key="index"
             class="center" :class="{active: currentIndex === index}"
             @click="titleClick(index)">
          {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "../../../components/common/navbar/NavBar";
  export default {
    name: "DetailNavBar",
    components:{
      NavBar
    },
    data(){
      return{
        title:['商品','参数','评论','推荐'],
        currentIndex: 0
      }
    },
    methods:{
      titleClick(index){
        this.currentIndex = index;
        this.$emit('navTitleClick' , index);
      },
      imgClick(){
        this.$router.back()//回到上一页
      }
    }
  }
</script>

<style scoped>
  .nav-bar-center{
    display: flex;
  }
  .center{
    flex: 1;
    font-size: 13px;
  }
  .active{
    color: var(--color-high-text);
  }
  .back img{
    margin-top: 10px;
  }
</style>
