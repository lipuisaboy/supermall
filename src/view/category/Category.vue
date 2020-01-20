<template>
  <div id="category">
    <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
    <scroll class="cate-scroll">
      <div class="header">
        <category-title :titles="titles" @tabClick="tabClick" ref="left"/>
        <category-right :list="imgs[currentMaiKey].lists" class="right"/>
      </div>
    </scroll>
  </div>
</template>

<script>
  import CategoryRight from "./childComps/CategoryRight";
  import Scroll from "../../components/common/scroll/Scroll";
  import CategoryTitle from "./childComps/CategoryTitle";
  import NavBar from "../../components/common/navbar/NavBar";

  import {getCategoryData,getSubcategoryData} from "../../network/category";

  export default {
    name: "Category",
    components:{
      Scroll,
      NavBar,
      CategoryTitle,
      CategoryRight
    },
    data(){
      return{
        titles:null,
        imgs:{
          '3627':{lists:[]},
          '582':{lists:[]},
          '596':{lists:[]},
          '595':{lists:[]},
          '598':{lists:[]},
          '597':{lists:[]},
          '599':{lists:[]},
          '600':{lists:[]},
          '5253':{lists:[]},
          '609':{lists:[]},
          '594':{lists:[]},
          '602':{lists:[]},
          '606':{lists:[]},
          '603':{lists:[]},
          '605':{lists:[]},
        },
        currentMaiKey:'3627'
      }
    },
    created() {
      this._getCategoryTitle()
      this._getSubcategoryData(this.currentMaiKey)
    },
    methods:{
      _getCategoryTitle(){
        getCategoryData().then(res => {
          this.titles = res.data.category.list
        })
      },
      _getSubcategoryData(maitKey){
        getSubcategoryData(maitKey).then(res => {
          this.imgs[maitKey].lists.push(...res.data.list)
        })
      },
      /**
       * 事件监听方法
       * */
      tabClick(index){
        window.console.log(index)
        switch (index){
          case 0:
            this.currentMaiKey = '3627';
            window.console.log(this.currentMaiKey)
            break;
          case 1:
            this.currentMaiKey = '582';
            window.console.log(this.currentMaiKey)
            break;
          case 2:
            this.currentMaiKey = '596';
            break;
          case 3:
            this.currentMaiKey = '595';
            break;
          case 4:
            this.currentMaiKey = '598';
            break;
          case 5:
            this.currentMaiKey = '597';
            break;
          case 6:
            this.currentMaiKey = '599';
            break;
          case 7:
            this.currentMaiKey = '600';
            break;
          case 8:
            this.currentMaiKey = '5253';
            break;
          case 9:
            this.currentMaiKey = '609';
            break;
          case 10:
            this.currentMaiKey = '594';
            break;
          case 11:
            this.currentMaiKey = '830';
            break;
          case 12:
            this.currentMaiKey = '602';
            break;
          case 13:
            this.currentMaiKey = '606';
            break;
          case 14:
            this.currentMaiKey = '603';
            break;
          case 15:
            this.currentMaiKey = '605';
            break;
        }
        this.$refs.left.currentIndex = index
        this._getSubcategoryData(this.currentMaiKey)
      }
    }
  }
</script>

<style scoped>
  .nav-bar{
    background: var(--color-high-text);
    color: #fff;
  }
  .cate-scroll{
    position: absolute;
    left: 0;
    right: 0;
    top:44px;
    bottom: 49px;
    overflow: hidden;
  }
  .header{
    display: flex;
  }
</style>
