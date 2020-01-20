const actions = {
  addCart(context,payload) {
    return new Promise((resolve,reject) => {
      //payload 新添加的商品
      //查找之前数组中是否有该商品
      let oldCartInfo = null
      for(let item of context.state.cartList){
        if (item.iid === payload.iid){
          oldCartInfo = item
        }
      }
      /**
       * 或者使用 let oldCartInfo = state.cartList.find((function(item){
       *   return item.iid === payload.iid
       *   }
       * }))
       * */
      //判断oldCartInfo
      if(oldCartInfo){
        oldCartInfo.count += 1
        resolve('成功加入购物车~')
      }
      else{
        payload.count = 1
        payload.checked = true
        context.state.cartList.push(payload)
        resolve('成功加入购物车~')
      }
    })
  }
}

export default actions
