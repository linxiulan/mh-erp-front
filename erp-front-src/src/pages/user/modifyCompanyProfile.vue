<style type="text/scss" lang="scss" scoped>
  .breadCrumbs {
    border-bottom: 1px dashed #E7E8E7;
  }

  .modifyCompanyProfile-title {
    padding: 15px 0px 5px 0px;
    font-size: 16px;
    line-height: 34px;
    color: #6F7B91;
  }

  .modifyCompanyProfile-main {
    ul {
      padding: 30px 20px 90px 20px;
      background: #fff;
    }
    li {
      padding-left: 70px;
      position: relative;
      margin-bottom: 20px;
      img {
        display: block;
        width: 140px;
        margin-bottom: 10px;
      }
      h3 {
        text-align: left;
        position: absolute;
        top: 0;
        left: 0;
        width: 80px;
        line-height: 35px;
      }
      input[type='text'] {
        display: block;
        width: 350px;
        height: 35px;
        border: 1px solid #E4E4E4;
        padding: 0 10px;
        box-sizing: border-box;
        border-radius: 4px;
      }
    }
    a {
      display: block;
      width: 120px;
      height: 34px;
      line-height: 34px;
      text-align: center;
      font-size: 14px;
      background: #949494;
      border: 1px solid #949494;
      color: #fff;
      margin-left: 80px;
      margin-top: 20px;
    }
    a:hover {
      background: #57607C;
      color: #fff;
      border: 1px solid #57607C;
    }
  }

  .upload__input {
    display: none;
  }
</style>
<template>
  <div class="mian">
    <div class="breadCrumbs"><span>公司管理</span> &gt; <span>公司资料</span></div>
    <div class="modifyCompanyProfile-main">
      <div class="modifyCompanyProfile-title">修改公司资料</div>
      <ul>
        <li>
          <h3>公司logo</h3>
          <div class="modifyCompanyProfile-logo">
            <img :src="image" v-if="image!='null'"/>
            <input type="file" name="file" ref="uploadImg" class="upload__input" @change="uploadChange"
                   accept="image/gif, image/jpeg, image/png, image/jpg">
            <Button type="ghost" icon="ios-cloud-upload-outline" @click="triggerButton">{{isUpload?'上传中...':'上传Logo'}}
            </Button>
          </div>
        </li>
        <li><h3>公司名称</h3><input type="text" v-model="name" placeholder="请输入公司名称" maxlength="30"/></li>
        <li><h3>联系方式</h3><input type="text" v-model="phone" placeholder="请输入公司联系方式" maxlength="20"/></li>
        <p style="font-size: 14px; ">员工数权限：最多可添加 {{maxUserCount}} 人，当前已有 {{userCount}} 人</p>
        <a href="javascript:;" @click="submitVerification">{{isSaving?'保存中':'保存'}}</a>
      </ul>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import { getCookie, delCookie, trim,setCookie } from '../../assets/js/common'
  import { serviceApi } from '../../assets/js/serviceApi'
  export default {
    data(){
      return {
        name: '',
        icon: '',
        image: '',
        phone:'',
        maxUserCount:0,
        userCount:0,
        isUpload: false,
        isSaving: false,
        imgData: {
          accept: 'image/gif, image/jpeg, image/png, image/jpg',
        }
      }
    },
    mounted(){
      this.getCompanyInfo()
    },
    methods: {
      getCompanyInfo(){
        let _this=this;
        this.$Spin.show()
        _this.$get(serviceApi.upDataCompanyInfo).then(res => {
          _this.isSaving=false;
          if (res.code == 'SUCCESS') {
            _this.name=res.data.name;
            _this.phone=res.data.phone;
            _this.image=res.data.icon;
            _this.maxUserCount=res.data.maxUserCount;
            _this.userCount=res.data.userCount;
          } else {
            this.$Message.error(res.msg)
          }
          this.$Spin.hide()
        }).catch(err => {
          _this.isSaving=false;
          _this.$Message.error('请求失败，请重试')
          this.$Spin.hide()
        })
      },
      triggerButton(){
        if (this.isUpload) {
          return false
        }
        this.$refs.uploadImg.click()
      },
      uploadChange(event){
        let _img = event.target.files[0],
          imgUrl = window.URL.createObjectURL(_img)
        let type = _img.type//文件的类型，判断是否是图片
        let size = _img.size//文件的大小，判断图片的大小
        if (this.imgData.accept.indexOf(type) == -1) {
          this.$Message.warning('请选择我们支持的图片格式！')
          return false
        }
        if (size > 3145728) {
          this.$Message.warning('请选择3M以内的图片！')
          return false
        }
        this.isUpload = true
        let param = new FormData()  // 创建form对象
        param.append('file', _img, _img.name)  // 通过append向form对象添加数据
        param.append('chunk', '0') // 添加form表单中其他数据
        console.log(param.get('file')) // FormData私有类对象，访问不到，可以通过get判断值是否传进去
        // 添加请求头
        axios.post('/api/file/temp/upload', param)
          .then(res => {
            this.isUpload = false
            let _data = res.data
            if (_data.code == 'SUCCESS') {
              this.image = imgUrl
              this.icon = _data.data.fileKey
            } else {
              this.$Message.error(_data.msg)
            }
          }).catch(err => {
          this.isUpload = false
          this.$Message.error('上传图片失败，请重试')
        })
      },
      submitVerification(){
        if (this.isSaving) {
          return false
        }
        if (this.isUpload) {
          this.$Message.warning('正在上传图片，请稍等')
          return false
        }
        let _name = this.name
        if (_name == '') {
          this.$Message.warning('请输入公司名称')
          return false
        }
        this.savaCompanyInfo()
      },
      //保存公司资料
      savaCompanyInfo(){
        let _this=this,
          _icon = _this.icon!='null'?_this.icon:'',
          _name = _this.name,
          _phone=_this.phone;
        _this.isSaving = true;
        _this.$post(serviceApi.upDataCompanyInfo, {
          name: _name,
          icon: _icon,
          phone:_phone
        }).then(res => {
          _this.isSaving=false;
          if (res.code == 'SUCCESS') {
            this.$Message.success('公司资料修改成功');
            setCookie('companyName', _name, 32 * 24 * 3600);
            //this.getCompanyInfo();
            location.reload()
          } else {
            this.$Message.error(res.msg)
          }
        }).catch(err => {
          _this.isSaving=false;
          _this.$Message.error('请求失败，请重试')
        })
      }
    }
  }
</script>
