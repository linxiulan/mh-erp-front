<template>
  <div id="app">
    <template v-if="isLogin">
      <common-header></common-header>
      <LeftNavtList></LeftNavtList>
    </template>
    <router-view v-wechat-title="$route.meta.title"></router-view>
  </div>
</template>

<script>
  import CommonHeader from './components/CommonHeader.vue'
  import LeftNavtList from './components/LeftNavtList.vue'
  export default {
    name: 'App',
    watch: {
      $route(){
        this.isLogin = this.$router.history.current.name == 'login' ? false : true
      }
    },
    data(){
      return {
        isLogin: this.$router.history.current.name == 'login' ? false : true
      }
    },
    components: {
      CommonHeader,
      LeftNavtList
    }
  }
</script>
