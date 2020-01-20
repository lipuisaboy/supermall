<template>
  <swiper class="spe" v-if="list.length" :options="swiperOption">
    <swiper-slide v-for="(item,index) in list" :key="index" class="slide">
        <img :src="item" alt="">
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
  export default {
    name: "DetailSwiper",
    props:{
      list:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data(){
      return{
        swiperOption:{
          autoplay:{
            delay: 2000,
            stopOnLastSlide: false,
            /* 触摸滑动后是否继续轮播 */
            disableOnInteraction: false
          },
          speed:500,
          loop:true,
          pagination:{
            el:'.swiper-pagination',
            type:'bullets',
            clickable:true,
            bulletClass: 'my-bullet',
            bulletActiveClass: 'my-bullet-active'
          },
          grabCursor: true,
          setWrapperSize: true,
          autoHeight: true,
        },
      }
    }
  }
</script>

<style scoped>
  .spe{
    height: 300px;
    overflow: hidden;
  }
  .slide {
    width: 100%;
    flex-shrink: 0;
  }

  .slide img {
    width: 100%;
  }
  .swiper-pagination{
    height: 14px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }
  .swiper-pagination .my-bullet{
    border-radius: 50%;
    width: 10px;
    height: 10px;
    margin: 4px;
    background: white;
    display: block;
  }
  .swiper-pagination .my-bullet-active{
    border-radius: 50%;
    background: #ff5777;
    width: 10px;
    height: 10px;
  }
</style>
