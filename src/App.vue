<template>
  <div id="app">
<!--    让组件切换时不会销毁  将Detail组件排除在外-->
    <keep-alive exclude="Detail">
    <router-view/>
    </keep-alive>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
  import MainTabBar from "./components/content/mainTabbar/MainTabBar";
  export default {
    name: 'app',
    components: {
      MainTabBar
    }
  }
</script>

<style>
@import "assets/css/base.css";
</style>
