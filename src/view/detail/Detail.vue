<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @navTitleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :list="topImage"></detail-swiper>
      <detail-name :goods="goods"></detail-name>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-all-info :detail-info="detailInfo" @imgIsLoad="imgLoad"/>
      <detail-goods-params :goods-params="goodsParams" ref="params"/>
      <detail-comment-info :comment-info="commentInfo" ref="comment"/>
      <goods-list :goods="recommend" ref="recommend"/>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"/>
    <back-top @click.native="backTopClick" v-if="isShowBackTop"/>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailName from "./childComps/DetailName";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailAllInfo from "./childComps/DetailAllInfo";
  import DetailGoodsParams from "./childComps/DetailGoodsParams";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import DetailBottomBar from "./childComps/DetailBottomBar";

  import Scroll from "../../components/common/scroll/Scroll";
  import GoodsList from "../../components/content/goods/GoodsList";
  import BackTop from "../../components/common/backtop/BackTop";

  import {getDetailData,getRecommend,Goods,Shop,GoodsParams} from "../../network/detail";
  import {itemImgLoadListener} from "../../common/mixin";
  import {debounce} from "../../common/untils";

  export default {
    name: "Detail",
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailName,
      DetailShopInfo,
      Scroll,
      DetailAllInfo,
      DetailGoodsParams,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar,
      BackTop
    },
    mixins:[itemImgLoadListener],
    data(){
      return{
        iid:null,
        topImage:[],
        goods:{},
        shop:{},
        detailInfo:{},
        goodsParams:{},
        commentInfo:{},
        recommend:[],
        itemImgListener:null,
        themeYs:[],
        getThemeYs:null,
        currentIndex:0,
        isShowBackTop:false
      }
    },
    created() {
      //1.将数据的iid保存下来
      this.iid = this.$route.params.iid
      //2.根据iid请求详情数据
      this._getDetailData(this.iid)
      //3.获取商品信息
      this._getGoodsInfo(this.iid)
      //4.获取店铺信息
      this._getShopInfo(this.iid)
      //5.保存商品详情数据
      this._getGoodsView(this.iid)
      //6.保存商品尺码数据
      this._getGoodsParams(this.iid)
      //7.获取评论信息
      this._getCommentInfo(this.iid)
      //8.获取推荐数据
      this._getRecommend()
      this.getThemeYs = debounce(() => {
        this.themeYs = []
        this.themeYs.push(0)
        this.themeYs.push(this.$refs.params.$el.offsetTop)
        this.themeYs.push(this.$refs.comment.$el.offsetTop)
        this.themeYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeYs.push(Number.MAX_VALUE)
        console.log(this.themeYs)
      },100)
    },
    mounted() {
    },
    updated() {
      this.getThemeYs()
    },
    //因为没有在keep-alive中做缓存 因此不能用deactivated做取消 得用destroyed
    destroyed() {
      this.$bus.$off('itemImgLoad',this.itemImgListener)
    },
    methods:{
      /**
       * 网络请求
       * */
      _getDetailData(iid){
        getDetailData(iid).then(res => {
          //1.获取顶部轮播图数据
          this.topImage = res.result.itemInfo.topImages
        })
      },
      _getGoodsInfo(iid){
        getDetailData(iid).then(res => {
          //获取商品信息
          this.goods = new Goods(res.result.itemInfo,res.result.columns,res.result.shopInfo.services)
        })
      },
      _getShopInfo(iid){
        getDetailData(iid).then(res => {
          //获取店铺信息
          this.shop = new Shop(res.result.shopInfo)
        })
      },
      _getGoodsView(iid){
        getDetailData(iid).then(res => {
          this.detailInfo = res.result.detailInfo
        })
      },
      _getGoodsParams(iid){
        getDetailData(iid).then(res => {
          this.goodsParams = new GoodsParams(res.result.itemParams.info,res.result.itemParams.rule)
        })
      },
      _getCommentInfo(iid){
        getDetailData(iid).then(res => {
          if (res.result.rate.cRate !== 0){
            this.commentInfo = res.result.rate.list[0]
          }
          //在渲染完DOM 获取最新的数据后才会回调此函数 但是图片不一定加载出来
           //       this.$nextTick(() => {
           //       })
        })
      },
      _getRecommend(){
        getRecommend().then(res => {
          this.recommend = res.data.list
        })
      },
      /**
       * 事件监听
       * */
      imgLoad(){
        this.$refs.scroll.refresh()
      },
      titleClick(index){
        this.$refs.scroll.scrollTo(0,-this.themeYs[index],200)
      },
      backTopClick(){
        this.$refs.scroll.scrollTo(0,0,200)
      },
      contentScroll(position){
        //1.获取y值
        const positionY = -position.y
        //2.positionY和主题中的值进行对比
        //[0,xxxx,xxxx,xxxx]
        let length = this.themeYs.length
       /* for(let i in this.themeYs){
          //此时获取的i是字符串  不是数字 可以用parseInt(i)将他转换为数字类型
          if(this.currentIndex !== i && (parseInt(i) < length-1 && positionY >= this.themeYs[parseInt(i)] && positionY < this.themeYs[parseInt(i)+1] )
            || (parseInt(i) === length-1 && positionY >= this.themeYs[parseInt(i)])){
            console.log(i);
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }*/
       /**
        * 在themeYs中 加入一个最大值 Number.MAX_VALLE
        * */
       for(let i = 0; i < length-1; i++){
         if (this.currentIndex !== i && (positionY > this.themeYs[i] && positionY < this.themeYs[i+1])){
           this.currentIndex = i
           this.$refs.nav.currentIndex = this.currentIndex
         }
       }
        //是否显示回到顶部
        const backTop = 1000
        this.isShowBackTop = -position.y > backTop
      },
      addToCart(){
        //1.获取购物车需要展示的信息
        const cartInfo = {}
        cartInfo.img = this.topImage[0]
        cartInfo.title = this.goods.title
        cartInfo.desc = this.goods.desc
        cartInfo.price = this.goods.realPrice
        cartInfo.iid = this.iid
        //将商品添加到购物车
        //this.$store.commit('addCart',cartInfo)
        //vuex中actions函数可以返回promise 并且可以和getters一样 进行映射
        //方法为 import{mapActions} from 'vuex' 然后在methods中 ...mapActions(['你要映射的方法'])
        this.$store.dispatch('addCart',cartInfo).then(res => {
          this.$toast.show(res,2000)
        })
      }
    }
  }
</script>

<style scoped>
  #detail{
    height: 100vh;
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content{
    /*设置高度 可以用定位(如home)  可以用以下*/
    height: calc(100% - 44px - 49px);
  }
  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #ffffff;
  }
</style>
