<template>
  <swiper class="spe" v-if="list.length" :options="swiperOption">
    <swiper-slide v-for="(item,index) in list" :key="index" class="slide">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imgLoad">
      </a>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
  export default {
    name: "Spe",
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
        isLoad:false
      }
    },
    methods:{
      imgLoad(){
        //当isLoad变为true的时候 发出事件 然后将默认的isLoad变为true  就不会再进入if循环中
        if(!this.isLoad){
          this.$emit('swiperImgLoad')
          this.isLoad = true
        }
      }
    }
  }
</script>

<style>
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
