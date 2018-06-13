<style type="text/scss" lang="scss" scoped>
header{background: #57607C; padding: 0 15px; height: 60px;font-size: 18px;color: #FFFFFF;line-height: 60px; z-index: 2;position: fixed; top: 0; left: 0; z-index: 3; width: 100%;}
.header-right{
  float: right; position: relative;
  span{color: #fff; padding-right: 20px; font-size: 14px; background: url("../assets/triangle-down-32.png") 100% 45%/16px 16px no-repeat;}
  ul{
    position: absolute; top: 40px; right: 0; background: #fff; width: 140px; border:1px solid #57607C; padding: 1px;
  }
  li{height: 30px; line-height: 30px;}
  a{display: block; padding: 0 20px; font-size:12px; text-align: right; color: #666;
    &:hover{background: #57607C; color: #fff;}
  }
}
</style>
<template lang="html">
  <header v-show="isShow">
    {{companyName}}ERP后台
    <div class="header-right" @mouseenter="showBullet" @mouseleave="hideBullet">
      <span>{{name}}</span>
      <ul v-if="isShowBullet">
        <li>
          <router-link to="/user/changePassword">修改密码</router-link>
        </li>
        <li>
          <a href="javascript:;" @click="quit">注销</a>
        </li>
      </ul>
    </div>
  </header>
</template>
<script>
  import {setCookie,getCookie,delCookie} from '../assets/js/common'
  export default {
    mounted(){
      /*页面挂载获取cookie，如果存在username的cookie，则跳转到主页，不需登录*/
      if(this.$router.history.current.name!=='login'){
        this.isShow=true;
        if(!getCookie('token')){
          this.$router.push('/user/login')
        }else{
          let username = getCookie('companyName')
          this.name = username
        }
      }
    },
    data () {
      return {
        name:'',
        companyName:getCookie('companyName')||'MH物流',
        isShow:false,
        isShowBullet:false
      }
    },
    methods:{
      quit(){
        /*删除cookie*/
        delCookie('token')
        this.$router.push('/user/login')
      },
      showBullet(){
        this.isShowBullet=true
      },
      hideBullet(){
        this.isShowBullet=false
      }
    }
  }
</script>
