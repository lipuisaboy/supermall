<template>
  <div id="home">
    <nav-bar class="home-nav-bar"><div slot="center">购物街</div></nav-bar>
    <tab-control :title="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabControl1" class="tab-control"
                 v-show="isControl"/>
    <scroll class="scroll" ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <spe :list="banners" @swiperImgLoad="speImgLoad"/>
      <recommend :recommends="recommends"/>
      <feature/>
      <!--监听自定义事件-->
      <tab-control :title="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="tabControl2"/>
      <goods-list :goods="goods[currentType].list"/>
    </scroll>
<!--    组件不能进行点击  如果想进行点击 需要加上native修饰符-->
    <back-top @click.native="backClick" v-show="isShow"/>
  </div>
</template>

<script>
  import Feature from "./childComps/Feature";
  import Recommend from "./childComps/Recommend";
  import NavBar from "../../components/common/navbar/NavBar";

  import Spe from "../../components/common/swiper/Swiper";
  import TabControl from "../../components/common/tabControl/TabControl";
  import GoodsList from "../../components/content/goods/GoodsList";
  import Scroll from "../../components/common/scroll/Scroll";
  import BackTop from "../../components/common/backtop/BackTop";

  import {getHomeMultiData,getGoodsData} from "../../network/home";
  import {debounce} from "../../common/untils";
  import {itemImgLoadListener} from "../../common/mixin";

  export default {
    name: "Home",
    components: {
      NavBar,
      Spe,
      Recommend,
      Feature,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    mixins:[itemImgLoadListener],
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        isShow: false,
        tabOffsetTop:0,
        isControl:false,
        saveY:0,
        itemImgListener:null
      }
    },
    created() {
      //请求多个数据
      this._getHomeMultiData()
      this._getGoodsData('pop')
      this._getGoodsData('new')
      this._getGoodsData('sell')
    },
    mounted() {
      //图片加载完成的事件监听
      //better-scroll滚动bug的修复
      //监听事件总线任务
      //监听图片加载完毕 然后执行scroll组件中的高度刷新
      //函数在mixin中进行了混入
    },
    //回来时执行
    activated() {
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.refresh()
    },
    //离开时执行
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY()
      //取消全局事件的监听
      this.$bus.$off('itemImgLoad',this.itemImgListener)
    },
    methods: {
      /**
       * 事件监听方法
       * */
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break;
          case 1:
            this.currentType = 'new'
            break;
          case 2:
            this.currentType = 'sell'
            break;
        }
        this.$refs.tabControl1.currentIndex  = index
        this.$refs.tabControl2.currentIndex  = index
      },
      backClick() {
        //通过refs拿到子组件对象中的内容
        //scroll组件中有一个scroll数据  有一个方法为scrollTo(x,y,time) 设置回到的位置和时间
        this.$refs.scroll.scrollTo(0, 0, 500)
      },
      loadMore(){
        //加载更多
        this._getGoodsData(this.currentType)
      },
      //监听轮播图的加载完成
      speImgLoad(){
        //获取tabControl的offSetTop  知道滚动到多少才有吸顶效果
        //所有组件都有一个属性 $el  用于获取组件中的元素
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },
    contentScroll(option) {
        //判断backTop是否显示
      if (-option.y >= 1000) {
        this.isShow = true
      }
      //判断tabControl是否吸顶
      if(-option.y >= this.tabOffsetTop){
        this.isControl = true
      }
      else{
        this.isShow = false
        this.isControl = false
      }
    },

    /**
     * 网络请求方法
     * */
    _getHomeMultiData() {
      getHomeMultiData().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    _getGoodsData(type) {
      const page = this.goods[type].page + 1
      getGoodsData(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        //完成上拉加载更多
        this.$refs.scroll.finishPullUp()
      })
    }
  }
}
</script>

<style scoped>
  #home{
    height: 100vh;
    position: relative;
  }
  .home-nav-bar{
    background-color: var(--color-tint);
    color: white;
    /*浏览器原生滚动需要设置以下*/
   /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;*/
  }
  .tab-control{
    position: relative;
    z-index: 9;
    background: #ffffff;
  }
  .scroll{
    position: absolute;
    left: 0;
    right: 0;
    top:44px;
    bottom: 49px;
    overflow: hidden;
  }
</style>
