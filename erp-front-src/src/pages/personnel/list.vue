<script src="../../assets/js/common.js"></script>
<style type="text/scss" lang="scss" scoped>
  .personnelList-title {
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

  .personnelList-main {
    table {
      border-collapse: collapse;
      border-spacing: 0;
      width: 100%;
      a {
        color: #336699;
        padding: 0 10px;
      }
      a:hover {
        color: #f60;
      }
    }
    th {
      padding: 13px 10px;
      line-height: 16px;
      font-size: 12px;
      color: #283949;
      background: #F7F8FC;
      border: 1px solid #F1F2F1;
    }
    td {
      padding: 15px 10px;
      background: #fff;
      border: 1px solid #F1F2F1;
      text-align: center;
      color: #283949;
      font-size: 12px;
      line-height: 22px;
      font-weight: 400;
    }
  }

  #popUp-editBranch {
    width: 600px;
    margin-left: -300px;
    margin-top: -85px;
    ul {
      width: 100%;
    }
    .editBranch-row {
      padding-left: 60px;
      position: relative;
      min-height: 35px;
      margin-bottom: 20px;
      h3 {
        position: absolute;
        top: 0;
        left: 0;
        line-height: 35px;
        font-size: 12px;
        color: #333;
        font-weight: 400;
      }
    }
    .saveBtn {
      margin-left: 60px;
    }
  }

  #popUp-untie {
    width: 418px;
    margin-left: -209px;
    margin-top: -77px;
    p {
      line-height: 18px;
      font-size: 12px;
      font-weight: 400;
      color: #333;
    }
  }

  #popUp-addEmployees {
    width: 600px;
    margin-left: -300px;
    margin-top: -240px;
    p {
      line-height: 18px;
      font-size: 14px;
      font-weight: 400;
      color: #333;
      margin-bottom: 30px;
      text-align: center;
    }
    .QRCodeBox {
      width: 320px;
      height: 320px;
      margin: 0 auto;
      position: relative;
      //padding: 20px
    }
    .prompt {
      color: #999;
      margin-top: 10px;
      margin-bottom: 0;
    }
  }
</style>
<template>
  <div class="mian">
    <div class="breadCrumbs"><span>公司管理</span> &gt; <span>订单列表</span></div>
    <div class="searchMain">
      <ul class="searchList clearfix">
        <li>
          <span class="title">员工姓名：</span>
          <input type="text" placeholder="请输入员工姓名" v-model="searchData.name"/>
        </li>
        <li>
          <span class="title">手机号码：</span>
          <input type="text" placeholder="请输入手机号码" v-model="searchData.mobile"/>
        </li>
        <li style="margin-right: 0;">
          <span class="title">所属网点：</span>
          <Select v-model="searchData.stationId" clearable placeholder="请选择所在网点">
            <Option v-for="item in stationList" :value="item.stationId" :key="item.stationId">{{ item.name }}
            </Option>
          </Select>
        </li>
      </ul>
      <div class="searchBtn clearfix">
        <a class="searchBtn-left" href="javascript:;" @click="search">搜索</a>
        <a class="searchBtn-right" href="javascript:;" @click="emptySearchCondition">清空</a>
      </div>
    </div>
    <div class="personnelList-main">
      <div class="personnelList-title">所有员工<a href="javascript:;" @click="openAddEmployeesPop">添加员工</a></div>
      <table>
        <tr>
          <th width="125">员工姓名</th>
          <th width="220">手机号码</th>
          <th width="">所属网点</th>
          <th width="175">绑定的微信</th>
          <th width="200">绑定时间</th>
          <th width="220">操作</th>
        </tr>
        <template v-if="personnels.length>0">
          <tr v-for="item in personnels">
            <td>{{item.name}}</td>
            <td>{{item.mobile}}</td>
            <td>{{item.station ? item.station.name:''}}</td>
            <td>{{item.wxOpenId}}</td>
            <td>{{item.gmtBind}}</td>
            <td>
              <a href="javascript:;" @click="openEditBranchPop(item.id,item.station?item.station.stationId:'')">编辑资料</a>
              <a href="javascript:;" @click="openUntiePop(item.id,item.name)">解绑</a>
            </td>
          </tr>
          <tr>
            <td colspan="6">
              <template>
                <Page :total="total" :current="search.page" :page-size="pageSize"></Page>
              </template>
            </td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td colspan="10" class="table-noDate">
              没有找到任何员工，您可以<a href="javascript:;" @click="openAddEmployeesPop">添加员工</a>
            </td>
          </tr>
        </template>
      </table>
    </div>
    <template v-if="isShowEditBranchPop">
      <div class="popUp-bg"></div>
      <div class="popUp" id="popUp-editBranch">
        <div class="popTitle">编辑员工归属网点<span @click="closePop"></span></div>
        <div class="popBox">
          <ul class="editBranch-main">
            <li class="editBranch-row"><h3>所在网点:</h3>
              <Select v-model="editBranch.stationId" placeholder="请选择所在网点">
                <Option v-for="item in stationList" :value="item.stationId" :key="item.stationId">{{ item.name }}
                </Option>
              </Select>
            </li>
          </ul>
          <a class="saveBtn" href="javascript:;" @click="saveEditBranch">{{isSaving?'保存中':'保存'}}</a>
        </div>
      </div>
    </template>
    <template v-if="isShowUntiePop">
      <div class="popUp-bg"></div>
      <div class="popUp" id="popUp-untie">
        <div class="popTitle">解绑<span @click="closePop"></span></div>
        <div class="popBox">
          <p>确定要解除与“{{untieData.name}}”的员工绑定吗？</p>
          <a class="saveBtn" href="javascript:;" @click="untieUser">{{isSaving?'解除中':'确定'}}</a>
        </div>
      </div>
    </template>
    <template v-if="isShowAddEmployeesPop">
      <div class="popUp-bg"></div>
      <div class="popUp" id="popUp-addEmployees">
        <div class="popTitle">添加员工<span @click="closePop"></span></div>
        <div class="popBox">
          <p>可通过截图发送、直接扫描等方式，让员工用微信扫描此二维码进行绑定</p>
          <div class="QRCodeBox">
            <img :src="addEmployees.url" v-if="!addEmployees.isLoading" width="320"/>
            <Spin size="large" fix v-else></Spin>
          </div>
          <p class="prompt">此二维码有效期至{{addEmployees.date}}</p>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
  import { getCookie, getLocalStorage, setLocalStorage } from '../../assets/js/common'
  import { serviceApi } from '../../assets/js/serviceApi'
  export default {
    mounted(){
      let _this = this,
        callback = function () {
          _this.getListData()
        }
      _this.getStationList(callback)
    },
    data(){
      let _query = this.$router.history.current.query
      return {
        searchData: {
          'name': _query.name || '',
          'mobile': _query.mobile || '',
          'stationId': _query.stationId || '',
          'size': _query.size ? parseInt(_query.size) : 20,
          'index': _query.index ? parseInt(_query.index) : 0
        },
        stationList: getLocalStorage('stationListData') || '',
        personnels: [],
        pageSize: 20,
        total: 100,
        editBranch: {
          id: '',
          stationId: ''
        },
        untieData: {
          id: '',
          name: ''
        },
        addEmployees: {
          isLoading: true,
          text: '',
          url: 'http://oa.tgnet.com/Images/code.png',
          date: '2018-02-05'
        },
        isShowEditBranchPop: false,
        isShowUntiePop: false,
        isShowAddEmployeesPop: false,
        isSaving: false
      }
    },
    methods: {
      getListData(){
        this.$get(serviceApi.userList, this.searchData).then(res => {
          if (res.code == 'SUCCESS') {
            this.personnels = res.data
            this.pageSize = res.pageInfo.size
            this.total = res.pageInfo.total
          } else {
            this.$Message.error(res.msg)
          }
        })
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
      search(){
        this.$router.push({
          path: this.$router.history.current.path,
          query: this.searchData
        })
        this.getListData()
      },
      emptySearchCondition(){
        let _parameter = {
          'name': '',
          'mobile': '',
          'stationId': '',
          'page': 1
        }
        this.searchData = _parameter
      },
      //编辑员工资料
      openEditBranchPop(id, stationId){
        let _this = this
        if (_this.stationList == '') {
          let _callback = function () {
            _this.openEditBranchPop(id, stationId)
          }
          _this.getStation(_callback)
          return false
        }
        _this.editBranch.id = id || ''
        _this.editBranch.stationId = stationId || ''
        _this.isShowEditBranchPop = true
      },
      saveEditBranch(){
        let _id = this.editBranch.id,
          _stationId = this.editBranch.stationId
        if (_stationId == '') {
          this.$Message.warning('请选择所在网点')
          return false
        }
        this.isSaving = true
        this.$post(serviceApi.userUpdata + '/' + _id, {
          'stationId': _stationId
        }).then(res => {
          this.isSaving = false
          if (res.code == 'SUCCESS') {
            this.$Message.success('编辑成功')
            this.isShowEditBranchPop = false
            this.setListData(_id, _stationId)
          } else {
            this.$Message.error(res.msg)
          }
        }).catch(err => {
          this.isSaving = false
          this.$Message.error('操作失败')
        })
      },
      setListData(id, stationId){
        let _personnels = this.personnels
        for (let i = 0; i < _personnels.length; i++) {
          let item = _personnels[i]
          if (item.id == id) {
            if (item.station) {
              item.station.stationId = stationId
            } else {
              item.station = {'stationId': stationId}
            }
          }
        }
      },
      //解绑用户
      openUntiePop(id, name){
        this.untieData.id = id || ''
        this.untieData.name = name || ''
        this.isShowUntiePop = true
      },
      untieUser(){
        if (this.saving) {
          return false
        }
        let _this = this,
          _id = _this.untieData.id || ''
        if (_id == '') {
          _this.$Message.error('操作失败,没有获取到ID')
          return false
        }

        _this.isSaving = true
        _this.$post(serviceApi.userDel + '/' + _id).then(res => {
          _this.isSaving = false
          if (res.code == 'SUCCESS') {
            _this.$Message.success('删除成功')
            _this.isShowUntiePop = false
            let _personnels = _this.personnels
            for (let i = 0; i < _personnels.length; i++) {
              let item = _personnels[i]
              if (item.id == _id) {
                _personnels.splice(i, 1)
              }
            }
          } else {
            this.$Message.error(res.msg)
          }
        }).catch(err => {
          this.isSaving = false
          this.$Message.error('操作失败')
        })
      },
      getExpiredTime(time){
        let _date = new Date(),
          expiredTime = _date.setTime(_date.getTime() + time * 1000),
          newDate = new Date(expiredTime),
          _Month = newDate.getMonth() + 1,
          _text = newDate.getFullYear() + '-' + _Month + '-'
            + newDate.getDate() + ' ' + newDate.getHours() + ':'
            + newDate.getMinutes() + ':' + newDate.getSeconds()
        return _text
      },
      openAddEmployeesPop(){
        this.isShowAddEmployeesPop = true
        this.obtainQRCode()
      },
      obtainQRCode(){
        this.addEmployees.isLoading = true
        this.$get(serviceApi.addEmployeesQRC).then(res => {
          if (res.code == 'SUCCESS') {
            this.addEmployees.isLoading = false
            let _data = res.data
            this.addEmployees.url = _data.token
            this.addEmployees.date = this.getExpiredTime(_data.expired)
          } else {
            this.$Message.error(res.msg)
            this.isShowAddEmployeesPop = false
          }
        })
      },
      closePop(){
        if (this.isSaving) {
          this.$Message.warning('正在执行其他操作，请稍后重试')
          return false
        }
        this.isShowEditBranchPop = false
        this.isShowUntiePop = false
        this.isShowAddEmployeesPop = false
      },
    }
  }
</script>
