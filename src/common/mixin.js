import {debounce} from "./untils";

export const itemImgLoadListener = {
  mounted(){
    const bounce = debounce(this.$refs.scroll.refresh,100)
    this.itemImgListener = () => {
      bounce()
    }
    this.$bus.$on('itemImgLoad',this.itemImgListener)
  }
}
