/**
 * 配置别名
 * */
module.exports = {
  configureWebpack:{
    resolve:{
      alias:{
        'assets': '@/assets',
        'network': '@/network',
        'view': '@/view',
        'common': '@/common',
        'components': '@/components'
      }
    }
  }
}
