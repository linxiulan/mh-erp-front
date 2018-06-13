<style type="text/scss" lang="scss" scoped>
  .breadCrumbs{border-bottom: 1px dashed #E7E8E7;}
  .changePassword-title{
    padding: 15px 0px 5px 0px;font-size: 16px; line-height:34px;color: #6F7B91;
  }
  .changePassword-main{
    ul{padding: 30px 20px 90px 20px; background: #fff;}
    li{ padding-left: 80px; position: relative; margin-bottom: 20px;
      h3{text-align: right; position: absolute;top: 0; left: 0; width: 80px; line-height: 35px;}
      input[type='password']{ display:block; width: 350px; height: 35px; border:1px solid #E4E4E4; padding:0 10px; box-sizing: border-box;}
    }
    a{
      display: block; width: 120px; height: 34px; line-height: 34px; text-align: center;font-size: 14px;  background: #949494; border: 1px solid #949494; color: #fff; margin-left: 80px;
    }
    a:hover{background: #57607C; color: #fff; border:1px solid #57607C;}
  }
</style>
<template>
  <div class="mian">
    <div class="breadCrumbs"><span>账号设置</span> &gt; <span>修改密码</span></div>
    <div class="changePassword-main">
      <div class="changePassword-title">修改密码</div>
      <ul>
        <li><h3>旧密码：</h3><input type="password" v-model="oldPassword" placeholder="请输入旧密码" /></li>
        <li><h3>新密码：</h3><input type="password" v-model="newPassword" placeholder="请输入新密码" /></li>
        <li><h3>确认密码：</h3><input type="password" v-model="confirmPassword" placeholder="请输入确认密码" /></li>
        <a href="javascript:;" @click="submitVerification">{{saving?'保存中':'保存'}}</a>
      </ul>
    </div>
  </div>
</template>
<script>
  import { getCookie,delCookie,trim} from '../../assets/js/common'
  import { serviceApi } from '../../assets/js/serviceApi'
  export default {
    data(){
      return {
        token:getCookie('token')||'',
        oldPassword:'',
        newPassword:'',
        confirmPassword:'',
        saving:false
      }
    },
    methods: {
      submitVerification(){
        if(this.oldPassword==''){
          alert('请输入旧密码')
          return false
        }else if(this.newPassword==''){
          alert('请输入新密码')
          return false
        }else if(this.confirmPassword==''){
          alert('请输入确认密码')
          return false
        } else if(this.newPassword!=this.confirmPassword){
          alert('新密码两次输入不一致')
          return false
        }
        var _data={"oldPassword":trim(this.oldPassword),"newPassword":trim(this.newPassword)}
        this.savePassword(_data);
      },
      savePassword(parameter){
        this.saving=true
        this.$post(serviceApi.password,parameter).then(res=>{
          this.saving=false
          if(res.code=='SUCCESS'){
            this.$Message.success(res.msg)
            delCookie('token')
            this.$router.push('/user/login')
          }else{
            this.$Message.error(res.msg)
          }
        }).catch(err=>{
          this.saving=false
          console.log(err.message)
        })
      }
    }
  }
</script>
