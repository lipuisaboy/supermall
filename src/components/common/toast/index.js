import Toast from "./Toast";
const obj = {}

obj.install = function(Vue){
  /**
   * 创建组件构造器
   * */
  const toastConstructor = Vue.extend(Toast)
  /**
   * 通过组件构造器创造组件
   * */
  const toast = new toastConstructor()
  /**
   * 将组件对象手动挂载到 某一个元素上
   * */
  toast.$mount(document.createElement('div'))
  /**
   * 此时toast.$el就是上边的div  将他添加到body中
   * */
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast
}

export default obj
