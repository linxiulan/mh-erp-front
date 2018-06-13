<style type="text/scss" lang="scss" scoped>
  .clientList-title {
    padding: 15px 0px 5px 0px;
    font-size: 16px;
    line-height: 34px;
    color: #6F7B91;
  }

  .clientList-table {
    table {
      border-collapse: collapse;
      border-spacing: 0;
      width: 100%;
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
      padding: 15px 20px;
      background: #fff;
      border: 1px solid #F1F2F1;
      text-align: center;
      color: #283949;
      font-size: 12px;
      line-height: 22px;
      font-weight: 400;
    }
    .phoneList {
      padding: 0 0 0 0;
      position: relative;
      a {
        position: absolute;
        top: 50%;
        right: 0px;
        margin-top: -11px;
      }
    }
  }

  #popUp-editData {
    width: 600px;
    margin-left: -300px;
    margin-top: -113px;
    ul {
      width: 100%;
    }
    .editData-list {
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
      border-radius: 4px;
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
    <div class="breadCrumbs"><span>经营管理</span> &gt; <span>订单列表</span></div>
    <div class="searchMain">
      <ul class="searchList clearfix">
        <li>
          <span class="title">客户姓名：</span>
          <input type="text" placeholder="请输入用户的姓名" v-model="searchData.name"/>
        </li>
        <li>
          <span class="title">手机号码：</span>
          <input type="text" placeholder="请输入手机号码" v-model="searchData.mobile"/>
        </li>
        <li style="margin-right: 0px;">
          <span class="title">下单次数：</span>
          <div class="clearfix">
            <div class="doubleRow-left"><input type="text" v-model="searchData.minOrderNum" @keyup="numFormat"/><i
              class="doubleRow-unit">次</i></div>
            <div class="doubleRow-span">到</div>
            <div class="doubleRow-right"><input type="text" v-model="searchData.maxOrderNum" @keyup="numFormat"/><i
              class="doubleRow-unit">次</i></div>
          </div>
        </li>
      </ul>
      <!--<ul class="searchList clearfix">
        <li style="padding:8px 0px 8px 74px;">
          <span class="title">结算方式：</span>
          <RadioGroup v-model="searchData.billingMethod">
            <Radio label='0'><span>全部</span></Radio>
            <Radio label='1'><span>现结</span></Radio>
            <Radio label='2'><span>月结</span></Radio>
          </RadioGroup>
        </li>
      </ul>-->
      <div class="searchBtn clearfix">
        <a class="searchBtn-left" href="javascript:;" @click="search">搜索</a>
        <a class="searchBtn-right" @click="emptySearchCondition" href="javascript:;">清空</a>
      </div>
    </div>
    <div class="clientList-main">
      <div class="clientList-title">全部客户</div>
      <div class="clientList-table">
        <table>
          <tr>
            <th width="130">用户姓名</th>
            <th width="150">手机号码</th>
            <th width="170">最近网点</th>
            <th>收货地址</th>
            <th width="85">下单次数</th>
            <th width="113">操作</th>
          </tr>
          <template v-if="clients.length>0">
            <tr v-for="item in clients">
              <td>{{item.name}}</td>
              <td>
                <div class="phoneList">
                  <p>{{item.mobile}}</p>
                </div>
              </td>
              <td>{{item.station?item.station.name:''}}</td>
              <td>{{item.address}}</td>
              <td>
                <router-link :to="{path: '/order/list?mobileOrName='+item.mobile}">{{item.orderCount?item.orderCount:0}}次
                </router-link>
              </td>
              <td><a href="javascript:;"
                     @click="openEditDataPop(item.mobile,item.name,item.address,item.station?item.station.stationId:'')">编辑资料</a>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td colspan="10" class="table-noDate">
                没有找到任何客户
              </td>
            </tr>
          </template>
        </table>
      </div>
    </div>
    <template v-if="isShowEditDataPop">
      <div class="popUp-bg"></div>
      <div class="popUp" id="popUp-editData">
        <div class="popTitle">编辑用户资料<span @click="closePop"></span></div>
        <div class="popBox">
          <ul class="editData-main">
            <li class="editData-list"><h3>用户姓名:</h3><input type="text" v-model="editData.name" placeholder="请输入用户的姓名"/></li>
            <li class="editData-list"><h3>最近站点:</h3>
              <template>
                <Select v-model="editData.stationId" placeholder="请选择最近站点">
                  <Option v-for="item in stationList" :value="item.stationId" :key="item.stationId"
                          >{{item.name }}
                  </Option>
                </Select>
              </template>
            </li>
            <li class="editData-list"><h3>收货地址:</h3><input type="text" v-model="editData.address" placeholder="请输入收货地址"/></li>
          </ul>
          <a class="saveBtn" href="javascript:;" @click="verificationCustomerData">{{isSaving?'保存中':'保存'}}</a>
        </div>
      </div>
    </template>
    <template v-if="isShowAddMobilePop">
      <div class="popUp-bg"></div>
      <div class="popUp" id="popUp-addMobilePop" :style="{marginTop:(0-172-addMobile.data.length*45)/2+'px'}">
        <div class="popTitle">添加手机号码<span @click="closeAddMobilePop"></span></div>
        <div class="popBox">
          <p style="color:#333;">为{{addMobile.name}}添加手机号码</p>
          <p>（新号码对应的数据会合并到{{addMobile.name}}账户下）</p>
          <ul>
            <li v-for="(item,key) in addMobile.data"><input type="text" v-model="addMobile.data[key]"><a
              href="javascript:;" @click="operateMobile(key)"></a></li>
          </ul>
          <a class="saveBtn" href="javascript:;">保存</a>

        </div>
      </div>
    </template>
  </div>
</template>
<script>
  import { trim, verificationName, verificationPone, getLocalStorage, setLocalStorage } from '../../assets/js/common'
  import { serviceApi } from '../../assets/js/serviceApi'
  export default {
    mounted(){
      let _this = this,
        _callback = function () {
          _this.getListData()
        }
      _this.getStationList(_callback)

    },
    data(){
      let _query = this.$router.history.current.query
      return {
        searchData: {
          'name': _query.name || '',
          'mobile': _query.mobile || '',
          'minOrderCount': _query.minOrderCount || '',
          'maxOrderCount': _query.maxOrderCount || '',
          'monthly': _query.maxOrderCount === true ? true : _query.maxOrderCount === false ? false : '',
          'size': _query.size || '',
          'index': _query.index ? parseInt(_query.index) : 1
        },
        total: 0,
        stationList: '',
        editData: {
          'mobile': '',
          'name': '',
          'address': '',
          'stationId': ''
        },
        addMobile: {
          'data': ['159522121212', '', '159522121212'],
          'name': '袁金红'
        },
        isShowEditDataPop: false,
        isShowAddMobilePop: false,
        isSaving: false,
        clients: []
      }
    },
    methods: {
      numFormat(e){
        let _this = e.target,
          _value = _this.value,
          _reg = _value.replace(/[^1-9]/g, '')
        _this.value = _reg
      },
      search(){
        this.searchData.page = 1
        this.getListData()
      },
      //获取站点列表
      getStationList(callback){
        let _stationList = getLocalStorage('stationListData') || ''
        if (_stationList != '') {
          this.stationList = _stationList
          if (callback) {
            callback()
          }
          return false
        }
        this.$get(serviceApi.stationList).then(res => {
          if (res.code == 'SUCCESS') {
            let _data = res.data
            this.stationList = _data
            setLocalStorage('stationListData', _data)
            if (callback) {
              callback()
            }
          } else {
            this.$Message.error(res.msg)
          }
        }).catch(err => {
          this.$Message.error('获取站点列表，请刷新重试')
        })
      },
      emptySearchCondition(){
        let _parameter = {
          'name': '',
          'mobile': '',
          'minOrderCount': '',
          'maxOrderCount': '',
          'type': '',
          'size': '',
          'index': this.searchData.index
        }
        this.searchData = _parameter
      },
      getListData(){
        this.$get(serviceApi.customerList, this.searchData).then(res => {
          if (res.code == 'SUCCESS') {
            this.clients = res.data
            this.total = res.pageInfo.total
          } else {
            this.$Message.error(res.msg)
          }
        })
      },
      operateMobile(key){
        let _data = this.addMobile.data,
          _len = _data.length,
          _num = key + 1
        if (_num == _len) {
          this.addMobile.data.push('')
        } else {
          this.addMobile.data.splice(key, 1)
        }
      },
      //开启客户资料编辑
      openEditDataPop(mobile, name, address, stationId){
        this.editData = {
          'mobile': mobile || '',
          'name': name || '',
          'address': address || '',
          'stationId': stationId || ''
        }
        this.isShowEditDataPop = true
      },
      closePop(){
        if (this.isSaving) {
          this.$Message.warning('正在执行其他操作，请稍后重试')
          return false
        }
        this.isShowEditDataPop = false
      },
      //开启手机编辑
      /*openAddMobilePop(){
       this.isShowAddMobilePop=true;
       },
       closeAddMobilePop(){
       this.isShowAddMobilePop=false;
       }*/
      //验证客户资料
      verificationCustomerData(){
        if (this.isSaving) {
          return false
        } else {
          let _mobile = this.editData.mobile,
            _name = trim(this.editData.name),
            _address = trim(this.editData.address),
            _stationId = this.editData.stationId
          if (_name == '') {
            this.$Message.warning('请输入联系人')
            return false
          }if (_mobile == '' ) {
            this.$Message.warning('操作失败，请重试')
            this.isShowEditDataPop = false
            return false
          }
          this.saveCustomerData(_mobile, _name, _address, _stationId)
        }
      },
      //保存客户资料
      saveCustomerData(mobile, name, address, stationId){
        this.$post(serviceApi.addCustomer + '/' + mobile, {
          'name': name,
          'address': address,
          'stationId': stationId
        }).then(res => {
          if (res.code == 'SUCCESS') {
            this.getListData()
            this.isShowEditDataPop = false
          } else {
            this.$Message.error(res.msg)
          }
        })
      }
    }
  }
</script>
