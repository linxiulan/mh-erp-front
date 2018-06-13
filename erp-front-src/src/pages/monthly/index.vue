<style type="text/scss" lang="scss" scoped>
  .monthlyIndex-title {
    padding: 15px 0px 5px 0px;
    font-size: 16px;
    line-height: 34px;
    color: #6F7B91;
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
      float: right;
      margin-left: 10px;
    }
    a:hover {
      background: #57607C;
      color: #fff;
      border: 1px solid #57607C;
    }
  }

  .monthlyIndex-main {
    table {
      border-collapse: collapse;
      border-spacing: 0;
      width: 100%;
      a {
        color: #336699;
        padding: 0 6px;
      }
      a:hover {
        color: #f60;
      }
    }
    th {
      padding: 13px 0;
      line-height: 16px;
      font-size: 12px;
      color: #283949;
      background: #F7F8FC;
      border: 1px solid #F1F2F1;
    }
    td {
      padding: 15px 0;
      background: #fff;
      border: 1px solid #F1F2F1;
      text-align: center;
      color: #283949;
      font-size: 12px;
      line-height: 22px;
      font-weight: 400;
    }
  }

  #popUp-editClient {
    width: 354px;
    margin-left: -177px;
    margin-top: -140.5px;
    ul {
      width: 100%;
    }
    li {
      padding-left: 60px;
      position: relative;
      min-height: 35px;
      margin-bottom: 20px;
    }
    h3 {
      position: absolute;
      top: 0;
      left: 0;
      line-height: 35px;
      font-size: 12px;
      color: #333;
      font-weight: 400;
    }
    input[type='text'] {
      display: block;
      width: 100%;
      height: 35px;
      border: 1px solid #E4E4E4;
      padding: 0 10px;
      box-sizing: border-box;
    }
    .saveBtn {
      margin-left: 60px;
    }
  }

  #popUp-editContact {
    width: 354px;
    margin-left: -177px;
    margin-top: -85.5px;
    ul {
      width: 100%;
    }
    li {
      padding-left: 60px;
      position: relative;
      min-height: 35px;
      margin-bottom: 20px;
    }
    h3 {
      position: absolute;
      top: 0;
      left: 0;
      line-height: 35px;
      font-size: 12px;
      color: #333;
      font-weight: 400;
    }
    input[type='text'] {
      display: block;
      width: 100%;
      height: 35px;
      border: 1px solid #E4E4E4;
      padding: 0 10px;
      box-sizing: border-box;
    }
    .saveBtn {
      margin-left: 60px;
    }
  }

  #popUp-deleteClient {
    width: 354px;
    margin-left: -177px;
    margin-top: -82px;
    p {
      line-height: 18px;
      font-size: 14px;
      font-weight: 400;
      color: #333;
      margin-bottom: 30px;
    }
  }

  #popUp-untieMobile {
    width: 330px;
    margin-left: -165px;
    .popBox {
      padding: 0;
    }
    li {
      line-height: 60px;
      font-size: 12px;
      color: #333;
      border-bottom: 1px dashed #EFEFEF;
      padding: 0 20px;
      &:last-child {
        border-bottom: 0px;
      }
    }
    a {
      color: #336699;
      float: right;
      &:hover {
        color: #f60;
      }
    }
    p {
      line-height: 60px;
      text-align: center;
      color: #999;
    }
  }

  #popUp-addMobilePop {
    width: 354px;
    margin-left: -177px;
    margin-top: -90px;
    p {
      line-height: 18px;
      font-size: 12px;
      font-weight: 400;
      color: #999;
    }
    li {
      margin-top: 10px;
      padding-right: 45px;
      position: relative;
      a {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        width: 35px;
        height: 35px;
        border: 1px solid #30649A;
        font-size: 20px;
        font-weight: 400;
        line-height: 30px;
        text-align: center;
        color: #30649A;
      }
      a:after {
        content: "-";
      }
      a:hover {
        opacity: 0.7;
      }
    }
    li:last-child {
      a:after {
        content: "+";
      }
    }
    input[type='text'] {
      display: block;
      width: 100%;
      height: 35px;
      border: 1px solid #E4E4E4;
      padding: 0 10px;
      box-sizing: border-box;
    }
  }
</style>
<template>
  <div class="mian">
    <div class="breadCrumbs"><span>经营管理</span> &gt; <span>月结收账</span></div>
    <div class="searchMain">
      <ul class="searchList clearfix">
        <li>
          <span class="title">账户名称：</span>
          <input type="text" placeholder="请输入账户/联系人/联系手机" v-model="searchData.userName"/>
        </li>
        <li>
          <span class="title">关联手机：</span>
          <input type="text" placeholder="请输入手机号码" v-model="searchData.mobile"/>
        </li>
        <li style="margin-right: 0; display: none;">
          <span class="title">下单时间：</span>
          <div class="clearfix">
            <div class="doubleRow-left">
              <template>
                <Row>
                  <Col span="12">
                  <DatePicker :value="searchData.minDate" type="date" placeholder="请选择时间" style="width: 124px"
                              @on-change="setMinDate(date)"></DatePicker>
                  </Col>
                </Row>
              </template>
            </div>
            <div class="doubleRow-span">到</div>
            <div class="doubleRow-right">
              <template>
                <Row>
                  <Col span="12">
                  <DatePicker :value="searchData.maxDate" type="date" placeholder="请选择时间" style="width: 124px"
                              @on-change="setMaxDate(date)"></DatePicker>
                  </Col>
                </Row>
              </template>
            </div>
          </div>
        </li>
      </ul>
      <div class="searchBtn clearfix">
        <a class="searchBtn-left" href="javascript:;" @click="search">搜索</a>
        <a class="searchBtn-right" href="javascript:;">清空</a>
      </div>
    </div>
    <div class="monthlyIndex-main">
      <div class="monthlyIndex-title">全部月结账户<a href="javascript:;" @click="openEditClientPop()">添加账户</a></div>
      <table>
        <tr>
          <th width="125">账户名称</th>
          <th width="200">联系人</th>
          <th colspan="2">关联手机</th>
          <th width="145">结算状态</th>
          <th width="130">操作</th>
        </tr>
        <template v-if="monthlyData.length>0">
          <tr v-for="item in monthlyData">
            <td>{{item.name}}</td>
            <td>{{item.username?item.username:'暂无'}} | {{item.mobile}}</td>
            <td>{{item.mobiles?item.mobiles.join('；'):''}}</td>
            <td width="160">
              <a href="javascript:;" v-if="item.mobiles && item.mobiles.length>0"
                 @click="openUntieMobilePop(item.customerId)">解绑</a>
              <a href="javascript:;" @click="openAddMobilePop(item.customerId,item.name)">添加</a>
            </td>
            <td>
              <span :class="item.allPaid?'c-333':'c-f00'">{{item.allPaid?'已结清':'未结清'}}</span>
              <router-link :to="{ path: '/monthly/orderList', query: { customerId: item.customerId,userName: item.name}}">收账</router-link>
            </td>
            <td>
              <a href="javascript:;" @click="openEditContactPop(item.customerId,item.username)">编辑</a>
              <a href="javascript:;" @click="openDeleteClientPop(item.customerId,item.name)">删除</a>
            </td>
          </tr>
        </template>
        <template v-else-if="monthlyData!==''">
          <tr>
            <td colspan="6" class="table-noDate">
              没有找到任何订单，您可以<a href="javascript:;" @click="openEditClientPop()">添加订单</a>
            </td>
          </tr>
        </template>
      </table>
    </div>
    <!--添加/编辑月结账户-->
    <template v-if="isShowEditClientPop">
      <div class="popUp-bg"></div>
      <div class="popUp" id="popUp-editClient">
        <div class="popTitle">月结账户<span @click="closePop"></span></div>
        <div class="popBox">
          <ul class="editClient-main">
            <li><h3>账户名称：</h3><input type="text" v-model="editClientData.name" placeholder="请输入账户名称"/></li>
            <li><h3>联系人：</h3><input type="text" v-model="editClientData.contact" placeholder="请输入姓名"/></li>
            <li><h3>手机：</h3><input type="text" v-model="editClientData.mobile" placeholder="请输入手机号码"/></li>
          </ul>
          <a class="saveBtn" href="javascript:;" @click="verificationClient">{{isSaving?'保存中':'保存'}}</a>
        </div>
      </div>
    </template>

    <!--编辑联系人-->
    <template v-if="isShowEditContactPop">
      <div class="popUp-bg"></div>
      <div class="popUp" id="popUp-editContact">
        <div class="popTitle">编辑联系人<span @click="closePop"></span></div>
        <div class="popBox">
          <ul>
            <li><h3>联系人：</h3><input type="text" v-model="editContactData.contact" placeholder="请输入姓名"/></li>
          </ul>
          <a class="saveBtn" href="javascript:;" @click="saveContact">{{isSaving?'保存中':'保存'}}</a>
        </div>
      </div>
    </template>

    <!--删除客户-->
    <template v-if="isShowDeleteClientPop">
      <div class="popUp-bg"></div>
      <div class="popUp" id="popUp-deleteClient">
        <div class="popTitle">添加员工<span @click="closePop"></span></div>
        <div class="popBox">
          <p>确认要删除月结账户“{{deleteClientData.name}}”吗？</p>
          <a class="saveBtn" href="javascript:;" @click="deleteClient">{{isSaving?'删除中':'确定'}}</a>
        </div>
      </div>
    </template>

    <!--删除关联手机-->
    <template v-if="isShowUntieMobilePop">
      <div class="popUp-bg"></div>
      <div class="popUp" id="popUp-untieMobile"
           :style="{ 'margin-top':untieMobileData.mobiles.length>0?0-(40+60*untieMobileData.mobiles.length)/2:-50+'px' }">
        <div class="popTitle">全部关联手机({{untieMobileData.mobiles.length}}个)<span @click="closePop"></span></div>
        <div class="popBox">
          <ul v-if="untieMobileData.mobiles.length>0">
            <li v-for="item in untieMobileData.mobiles">
              {{item}} <a href="javascript:;" @click="relieveAssociatedPhone($event,item)">解除绑定</a>
            </li>
          </ul>
          <p v-else>没有任何关联手机</p>
        </div>
      </div>
    </template>

    <!--添加关联手机-->
    <template v-if="isShowAddMobilePop">
      <div class="popUp-bg"></div>
      <div class="popUp" id="popUp-addMobilePop" :style="{marginTop:(0-172-addMobileData.mobiles.length*45)/2+'px'}">
        <div class="popTitle">添加手机号码<span @click="closePop"></span></div>
        <div class="popBox">
          <p style="color:#333;">为{{addMobileData.name}}添加关联客户的号码</p>
          <ul>
            <li v-for="(item,key) in addMobileData.mobiles"><input type="text" v-model="addMobileData.mobiles[key]"><a
              href="javascript:;" @click="operateMobile(key)"></a></li>
          </ul>
          <a class="saveBtn" href="javascript:;" @click="verificationAssociatedPhone">{{isSaving?'保存中':'保存'}}</a>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
  import {getCookie, delCookie, trim, verificationName, verificationPone} from '../../assets/js/common'
  import {serviceApi} from '../../assets/js/serviceApi'
  export default {
    mounted(){
      this.getListDate()
    },
    data(){
      let _query = this.$router.history.current.query
      return {
        searchData: {
          'userName': _query.userName || '',
          'mobile': _query.mobile || '',
          //'minDate': _query.minDate || '',
          //'maxDate': _query.maxDate || ''
        },
        monthlyData: '',
        editClientData: {
          id: '',
          name: '',
          contact: '',
          mobile: ''
        },
        editContactData: {
          id: '',
          contact: '',
        },
        deleteClientData: {
          id: '',
          name: ''
        },
        untieMobileData: {
          id: '',
          mobiles: ''
        },
        addMobileData: {
          id: '',
          name: '',
          mobiles: [],
          currentProgress: 0
        },
        isShowEditClientPop: false,
        isShowEditContactPop: false,
        isShowDeleteClientPop: false,
        isShowUntieMobilePop: false,
        isShowAddMobilePop: false,
        isSaving: false
      }
    },
    methods: {
      setMinDate(date){
        this.searchData.minDate = date
      },
      setMaxDate(date){
        this.searchData.maxDate = date
      },
      search(){
        this.$router.push({
          path: this.$router.history.current.path,
          query: this.searchData
        })
      },
      emptySearchCondition(){
        let _parameter = {
          'mobile': '',
          'minDate': '',
          'maxDate': ''
        }
        this.searchData = _parameter
      },
      getListDate(){
        this.$get(serviceApi.monthlyList, {
          isWithDetail: true
        }).then(res => {
          if (res.code == 'SUCCESS') {
            this.setListDate(res.data)
          } else {
            this.$Message.error(res.msg)
          }
        }).catch(err => {
          this.$Message.error("操作失败")
        })
      },
      setListDate(data){
        let _data = data || []
        this.monthlyData = _data
      },
      //开启编辑账户弹框
      openEditClientPop(id, name, contact, mobile){
        this.editClientData = {
          id: id || '',
          name: name || '',
          contact: contact || '',
          mobile: mobile || ''
        }
        this.isShowEditClientPop = true
      },
      //开启编辑账户联系人弹框
      openEditContactPop(id, contact){
        this.editContactData = {
          id: id || '',
          contact: contact || ''
        }
        this.isShowEditContactPop = true
      },
      //开启删除账户弹框
      openDeleteClientPop(id, name){
        this.deleteClientData = {
          id: id || '',
          name: name || ''
        }
        this.isShowDeleteClientPop = true
      },
      //开启添加关联手机弹框
      openAddMobilePop(id, name){
        this.addMobileData = {
          id: id || '',
          name: name || '',
          mobiles: [''],
          currentProgress: 0
        }
        this.isShowAddMobilePop = true
      },
      //开启解绑手机弹框
      openUntieMobilePop(id){
        let _monthlyData = this.monthlyData,
          _len = _monthlyData.length,
          _mobiles = []
        for (let i = 0; i < _len; i++) {
          let _item = _monthlyData[i]
          if (_item.customerId == id) {
            if (_item.mobiles) {
              _mobiles = _mobiles.concat(_item.mobiles)
            }
            break
          }
        }
        this.untieMobileData.id = id
        this.untieMobileData.mobiles = _mobiles
        this.isShowUntieMobilePop = true
      },
      operateMobile(key){
        let _data = this.addMobileData.mobiles,
          _len = _data.length,
          _num = key + 1
        if (_num == _len) {
          this.addMobileData.mobiles.push('')
        } else {
          this.addMobileData.mobiles.splice(key, 1)
        }
      },
      closePop(){
        if (this.isSaving) {
          this.$Message.warning('正在执行其他操作，请稍后重试')
          return false
        }
        this.isShowEditClientPop = false
        this.isShowEditContactPop = false
        this.isShowDeleteClientPop = false
        this.isShowUntieMobilePop = false
        this.isShowAddMobilePop = false
      },
      //解除手机绑定
      relieveAssociatedPhone(e, mobile){
        let _element = e.target,
          _text = _element.innerHTML,
          _id = this.untieMobileData.id || ''
        if (_text != '解除绑定') {
          return false
        } else if (_id == '') {
          this.$Message.warning('操作失败，没有所需id')
          this.isShowUntieMobilePop = false
          return false
        }
        _element.innerHTML = '解绑中'
        this.$post(serviceApi.monthlyDel + '/' + _id + '/' + mobile).then(res => {
          this.isSaving = false
          if (res.code == 'SUCCESS') {
            this.$Message.success('解除成功')
            this.relieveSuccess(_id, mobile)
          } else {
            this.$Message.error(res.msg)
            _element.innerHTML = '解除绑定'
          }
        }).catch(err => {
          this.$Message.error("操作失败")
          _element.innerHTML = '解除绑定'
        })
      },
      //解除成功
      relieveSuccess(id, mobile){
        let mobiles = this.untieMobileData.mobiles
        for (let i = 0; i < mobiles.length; i++) {
          if (mobiles[i] == mobile) {
            mobiles.splice(i, 1)
            break
          }
        }
        let _monthlyData = this.monthlyData,
          _len = _monthlyData.length
        for (let i = 0; i < _len; i++) {
          let _item = _monthlyData[i]
          if (_item.customerId == id) {
            let item_mobiles = _item.mobiles
            for (let x = 0; x < item_mobiles.length; x++) {
              if (item_mobiles[x] == mobile) {
                _item.mobiles.splice(x, 1)
              }
              break
            }
            break
          }
        }
      },
      //添加关联手机的验证
      verificationAssociatedPhone(){
        if (this.isSaving) {
          return false
        } else {
          let mobiles = this.addMobileData.mobiles,
            isApproved = true
          for (let i = 0; i < mobiles.length; i++) {
            let _item = trim(mobiles[i])
            if (!verificationPone(_item)) {
              isApproved = false
              break
            }
          }
          if (isApproved) {
            this.addAssociatedPhone()
          } else {
            this.$Message.warning('请输入真实的手机号码')
          }
        }
      },
      //添加关联手机
      addAssociatedPhone(){
        let _id = this.addMobileData.id,
          mobiles = this.addMobileData.mobiles,
          len = mobiles.length
        if (_id) {
          this.isSaving = true
          for (let i = 0; i < len; i++) {
            let _item = mobiles[i]
            this.$post(serviceApi.monthlyAddAssociatedPhone + '/' + _id, {
              'mobile': _item
            }).then(res => {
              this.isSaving = false
              if (res.code == 'SUCCESS') {
                this.$Message.success('关联成功')
                this.successAssociatedPhone(_id, _item)
                this.completeAssociatedPhone(len)
              } else {
                this.$Message.error(res.msg)
                this.completeAssociatedPhone(len)
              }
            }).catch(err => {
              this.$Message.error("操作失败")
              this.completeAssociatedPhone(len)
            })
          }
        } else {
          this.$Message.warning('操作失败，没有所需id')
          this.isShowAddMobilePop = false
        }
      },
      //成功关联手机
      successAssociatedPhone(id, mobile){
        let _monthlyData = this.monthlyData,
          _len = _monthlyData.length
        for (let i = 0; i < _len; i++) {
          let _item = _monthlyData[i]
          if (_item.customerId == id) {
            if (_item.mobiles) {
              _item.mobiles.push(mobile)
            } else {
              _item.mobiles = [mobile]
            }
            break
          }
        }
      },
      //完成关联手机
      completeAssociatedPhone(total){
        let currentProgress = this.addMobileData.currentProgress
        currentProgress += 1
        if (total == currentProgress) {
          this.isSaving = false
          this.isShowAddMobilePop = false
        } else {
          this.addMobileData.currentProgress = currentProgress
        }
      },
      //验证账户
      verificationClient(){
        if (this.isSaving) {
          return false
        } else {
          let _client = this.editClientData,
            _id = _client.id || '',
            _name = _client.name ? trim(_client.name) : '',
            _contact = _client.contact ? trim(_client.contact) : '',
            _mobile = _client.mobile ? trim(_client.mobile) : ''
          if (_name == '') {
            this.$Message.warning('账户名称不能为空')
            return false
          } else if (!verificationName(_contact)) {
            this.$Message.warning('请输入联系人的真实姓名')
            return false
          } else if (!verificationPone(_mobile)) {
            this.$Message.warning('请输入真实的手机号码')
            return false
          }
          this.saveClient(_id, _name, _contact, _mobile)
        }
      },
      //保存账户
      saveClient(id, name, contact, mobile){
        let _id = id
        this.isSaving = true
        this.$post(serviceApi.monthlyAdd, {
          'id': id,
          'name': name,
          'username': contact,
          'mobile': mobile
        }).then(res => {
          this.isSaving = false
          if (res.code == 'SUCCESS') {
            this.$Message.success('添加成功')
            this.isShowEditClientPop = false
            this.getListDate()
          } else {
            this.$Message.error(res.msg)
          }
        }).catch(err => {
          this.isSaving = false
          this.$Message.error("操作失败")
        })
      },
      //保存联系人
      saveContact(){
        if (this.isSaving) {
          return false
        } else {
          let _contact = this.editContactData,
            _id = _contact.id,
            _name = _contact.contact ? trim(_contact.contact) : ''
          if (_name=="") {
            this.$Message.warning('请输入联系人')
            return false
          }
          this.isSaving = true
          this.$post(serviceApi.monthlyContactUpdate + '/' + _id, {
            'username': _name
          }).then(res => {
            this.isSaving = false
            if (res.code == 'SUCCESS') {
              this.$Message.success('添加成功')
              this.isShowEditContactPop = false
              let _monthlyData = this.monthlyData,
                _len = _monthlyData.length
              for (let i = 0; i < _len; i++) {
                let _item = _monthlyData[i]
                if (_item.customerId == _id) {
                  _item.username = _name
                  break
                }
              }
            } else {
              this.$Message.error(res.msg)
            }
          }).catch(err => {
            this.isSaving = false
            this.$Message.error("操作失败")
          })
        }
      },
      //删除账户
      deleteClient(){
        let _id = this.deleteClientData.id || ''
        if (_id) {
          this.isSaving = true
          this.post(serviceApi.monthlyDel + '/' + _id).then(res => {
            this.isSaving = false
            if (res.code == 'SUCCESS') {
              this.isShowDeleteClientPop = false
              this.$Message.success('删除成功')
              this.deleteClientSuccess()
            } else {
              this.$Message.error(res.msg)
            }
          }).catch(err => {
            this.isSaving = false
            this.$Message.error("操作失败")
          })
        } else {
          this.$Message.warning('操作失败，没有所需id')
          this.isShowDeleteClientPop = false
        }
      },
      //删除账户成功
      deleteClientSuccess(id){
        let _monthlyData = this.monthlyData,
          _len = _monthlyData.length
        if (_len < 2) {
          this.$router.go(0)
        } else {
          for (let i = 0; i < _len; i++) {
            let _item = _monthlyData[i]
            if (_item.customerId == id) {
              _monthlyData.splice(i, 1)
              break
            }
          }
        }
      }
    }
  }
</script>
