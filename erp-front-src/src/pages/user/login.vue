<template lang="html">
  <div class="loginBG">
    <div class="loginMain">
      <div class="top">
        <span>MIHUAN&nbsp; </span><span style="font-size:13px;">丨</span><span>&nbsp; 物流管理系统</span>
      </div>
      <ul class="middle">
        <!--<li class="middle-list">
          <span class="title">公司</span>
          <template>
            <Select v-model="companyId" style="width:280px">
              <Option v-for="item in companys" :value="item.value" placeholder="请选择公司">{{ item.name }}</Option>
            </Select>
          </template>
        </li>-->
        <li class="middle-list"><span class="title">用户名</span>
          <input type="text" placeholder="请输入您的用户名" v-model="username" @keyup.enter="verifyMessage"/>
        </li>
        <li class="middle-list">
          <span class="title">密码</span>
          <input type="password" placeholder="请输入密码" v-model="password" @keyup.enter="verifyMessage" />
        </li>
        <li class="middle-list" v-show="false">
          <span>验证码</span><input type="text" placeholder="请输入验证码" v-model="code" @keyup.enter="verifyMessage"/>
          <img alt="点击更换验证码" @click="replaceCode" :scr="codeUrl"/>
        </li>
      </ul>
      <div class="bottom">
        <a href="javascript:;" @click="verifyMessage">{{logging?'登录中':'登录'}}</a>
      </div>
    </div>
    <div class="loginFooter">
      <p><span>联系客服：020-11351245</span></p>
      <p><span>© 2017 MH物流ERP 版权所有</span></p>
    </div>
  </div>
</template>
<script>
  import { setCookie, getCookie,trim,clearCookie } from '../../assets/js/common'
  import { serviceApi } from '../../assets/js/serviceApi'
  export default {
    name: 'Login',
    data () {
      return {
        companys: [
          {'name': '广州穗时达物流有限公司', 'value': 1},
          {'name': '广州穗时达物流有限公司1', 'value': 2},
          {'name': '广州穗时达物流有限公司2', 'value': 3}
        ],
        companyId: 1,
        companyName: '',
        username: '',
        password: '',
        code: '1234',
        codeUrl: 'http://user.tgnet.com/ProjectRegister/ValidCode.aspx',
        logging:false
      }
    },
    methods: {
      verifyMessage(){
        if (this.username == '' || this.password == '') {
          alert('请输入用户名或密码')
        } else if (this.code == '') {
          alert('请输入验证码')
        } else if(!this.logging) {
          let data = {'mobile': trim(this.username), 'password': trim(this.password),'companyId':this.companyId}
          this.login(data)
        }
      },
      login(parameter){
        this.logging=true;
        clearCookie();  //清空全部cookie
        localStorage.clear();//清除本地存储
        this.$post(serviceApi.login,parameter).then(res=>{
          this.logging=false
          if(res.code=='SUCCESS'){
            let _data=res.data
            if(_data.role=="ADMIN" || _data.role=="MANAGER"){
              this.$Message.success(res.msg)
              setCookie('token', _data.token, 32 * 24 * 3600)
              setCookie('role', _data.role, 32 * 24 * 3600)
              setCookie('companyId', _data.companyId, 32 * 24 * 3600)
              setCookie('companyName', _data.companyName, 32 * 24 * 3600)
              setCookie('stationId', _data.stationId, 32 * 24 * 3600)
              this.$router.push('/business')
            }else{
              this.$Message.success("权限不足，无法登陆")
            }
          }else{
            this.$Message.error(res.msg)
          }
        }).catch(err=>{
          this.logging=false
          console.log(err.status)
        })
      },
      //更换验证码
      replaceCode(){
        let _data = new Date() - 1,
          _url = 'http://user.tgnet.com/ProjectRegister/ValidCode.aspx?v=' + _data
        this.codeUrl = _url
      }
    }
  }
</script>
<style type="text/scss" lang="scss">
  .loginBG {
    width: 100%;
    height: 100%;
    background: url("../../assets/bg.jpg") 100% 100%/100% 100% no-repeat;
  }

  .loginMain {
    position: absolute;
    top: 50%;
    left: 50%;
    padding: 40px;
    margin-top: -250px;
    margin-left: -190px;
    background: #fff;

    .top {
      font-size: 24px;
      line-height: 34px;
      color: #333;
    }

    .middle {
      margin-top: 10px;

      .middle-list {
        padding-top: 30px;
        position: relative;
        border-bottom: 1px solid #e4e4e4;
      }

      .title {
        position: absolute;
        top: 12px;
        left: 0;
        line-height: 18px;
        font-size: 12px;
        color: #999;
      }

      img {
        display: block;
        width: 100px;
        height: 35px;
        position: absolute;
        right: 0;
        top: 30px;
      }

      input {
        display: block;
        width: 100%;
        height: 35px;
        color: #333;
        font-size: 13px;
        padding: 0;
        margin: 0;
        border: 0;
      }

    }
    .bottom {
      margin-top: 20px;

      a {
        display: block;
        width: 100%;
        height: 40px;
        line-height: 40px;
        border-radius: 2px;
        background-color: rgba(161, 161, 161, 1);
        color: #fff;
        font-size: 14px;
        text-align: center;
      }

      a:hover {
        background-color: rgba(1, 137, 24, 1);
      }

    }
  }

  .loginFooter {
    position: fixed;
    left: 0;
    bottom: 20px;
    width: 100%;

    p {
      line-height: 17px;
      text-align: center;
      font-size: 12px;
      margin-top: 10px;
    }

    span {
      color: #fff;
    }
  }
  .loginMain{
    .ivu-select-selection {
      border: 0;
      input,input:active,input:focus{
        border: none !important;
        outline: none;
        box-shadow: none;
        width: 100%;
      }
    }
    .ivu-select-visible .ivu-select-selection {
      border: 0;
    }
    .ivu-select-single .ivu-select-selection .ivu-select-placeholder, .ivu-select-single .ivu-select-selection .ivu-select-selected-value{
      padding-left: 0px;
    }
  }
</style>
