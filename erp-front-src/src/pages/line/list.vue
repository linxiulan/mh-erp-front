<style type="text/scss" lang="scss" scoped>
  .vehicleList-title {
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

  .vehicleList-main {
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

  #popUp-editVehicle {
    width: 600px;
    margin-left: -300px;
    margin-top: -113px;
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

  #popUp-vehicleQRCode {
    width: 600px;
    margin-left: -300px;
    margin-top: -226px;
    p {
      line-height: 18px;
      font-size: 14px;
      font-weight: 400;
      color: #333;
      margin-bottom: 30px;
      text-align: center;
    }
    img {
      display: block;
      width: 322px;
      height: 322px;
      margin: 0 auto;
    }
  }
</style>
<template>
  <div class="mian">
    <div class="breadCrumbs"><span>公司管理</span> &gt; <span>路线列表</span></div>
    <div class="searchMain">
      <ul class="searchList clearfix">
        <li>
          <span class="title">公司网点：</span>
          <template>
            <Select v-model="stationId" style="width:280px" placeholder="请选择公司网点">
              <Option v-for="item in stationList" :value="item.stationId" :key="item.stationId">{{
                item.name }}
              </Option>
            </Select>
          </template>
        </li>
      </ul>
      <div class="searchBtn clearfix">
        <a class="searchBtn-left" href="javascript:;" @click="search">搜索</a>
      </div>
    </div>
    <div class="vehicleList-main">
      <div class="vehicleList-title">所有路线<a href="javascript:;" @click="openAddLinePop()">添加路线</a></div>
      <table>
        <tr>
          <th width="330">路线名称</th>
          <th>归属站点</th>
          <th width="330">添加时间</th>
          <th width="330">操作</th>
        </tr>
        <template v-if="lines.length>0">
          <tr v-for="item in lines">
            <td>{{item.name}}</td>
            <td>{{getStationName(item.stationId)}}</td>
            <td>{{item.gmtCreate}}</td>
            <td>
              <a href="javascript:;" @click="removeLine($event,item.stationId,item.stationLineId)">删除</a>
            </td>
          </tr>
          <!--<tr>
            <td colspan="6">
              <template>
                <Page :total="total" :current="search.page" :page-size="pageSize"></Page>
              </template>
            </td>
          </tr>-->
        </template>
        <template v-else-if="lines!==''">
          <tr>
            <td colspan="10" class="table-noDate">
              没有找到任何路线，您可以<a href="javascript:;" @click="openEditVehiclePop()">添加路线</a>
            </td>
          </tr>
        </template>
      </table>
    </div>
    <template v-if="isShowAddLinePop">
      <div class="popUp-bg"></div>
      <div class="popUp" id="popUp-editVehicle">
        <div class="popTitle">添加路线<span @click="closePop"></span></div>
        <div class="popBox">
          <ul class="editBranch-main">
            <li class="editBranch-row"><h3>所在网点:</h3>
              <Select v-model="addLineData.stationId" placeholder="请选择所在网点">
                <Option v-for="item in stationList" :value="item.stationId" :key="item.stationId">{{ item.name }}
                </Option>
              </Select>
            </li>
            <li class="editBranch-row"><h3>路线:</h3><input style="border-radius: 4px;" type="text" v-model="addLineData.name" placeholder="请输入路线"/>
            </li>
          </ul>
          <a class="saveBtn" href="javascript:;" @click="verificationLine">{{isSaving?'保存中':'保存'}}</a>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
  import { setCookie, getCookie, trim, getLocalStorage, setLocalStorage } from '../../assets/js/common'
  import { serviceApi } from '../../assets/js/serviceApi'
  export default {
    mounted(){
      let _this = this,
        _callback = function () {
          _this.getLineList()
        }
      _this.getStationList(_callback)
    },
    data(){
      let _query = this.$router.history.current.query
      return {
        stationId: '',
        stationList: '',
        vehiclesData: {},
        lines: '',
        addLineData: {
          stationId: '',
          name: ''
        },
        isShowAddLinePop: false,
        isSaving: false
      }
    },
    methods: {
      //获取站点列表
      getStationList(callback){
        let _stationList = getLocalStorage('stationListData') || ''
        if (_stationList != '') {
          this.stationList = _stationList
          this.stationId = _stationList[0].stationId
          if (callback) {
            callback()
          }
          return false
        }
        this.$get(serviceApi.stationList).then(res => {
          if (res.code == 'SUCCESS') {
            let _data = res.data
            this.stationId = _data[0].stationId
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
      getLineList(){
        let _stationId = this.stationId
        this.$get('/api/admin/station/' + _stationId + '/line/list').then(res => {
          if (res.code == 'SUCCESS') {
            this.lines = res.data
            //this.vehiclesData = res.data
          } else {
            this.$Message.error(res.msg)
          }
        }).catch(err => {
          this.$Message.error('获取数据失败，请刷新重试')
        })
      },
      search(){
        this.getLineList();
      },
      openAddLinePop(){
        this.addLineData = {
          stationId: '',
          name: ''
        }
        this.isShowAddLinePop = true
      },
      closePop(){
        if (this.isSaving) {
          this.$Message.warning('正在执行其他操作，请稍后重试')
          return false
        }
        this.isShowAddLinePop = false
      },
      //删除线路
      removeLine(e,stationId,stationLineId){
        let _element = e.target,
          _text = _element.innerHTML
        if (_text != '删除') {
          return false
        } else if (stationLineId == '') {
          this.$Message.warning('操作失败，没有所需id')
          return false
        }
        _element.innerHTML = '删除中'
        this.$post('/api/admin/station/'+stationId+'/line/del/'+stationLineId).then(res => {
          _element.innerHTML = '删除'
          if (res.code == 'SUCCESS') {
            this.$Message.success('删除成功')
            this.removeLineSuccess(stationLineId)
          } else {
            this.$Message.error(res.msg)
          }
        })
      },
      removeLineSuccess(id){
        let lines = this.lines;
        for (let i = 0; i < lines.length; i++) {
          let _item = lines[i]
          if (_item.stationLineId == id) {
            lines.splice(i, 1)
            break
          }
        }
      },
      //验证路线信息
      verificationLine(){
        if (this.isSaving) {
          return false
        } else {
          let _line = this.addLineData,
            _name = _line.name ? trim(_line.name) : '',
            _stationId = _line.stationId
          if (_stationId == '') {
            this.$Message.warning('请选择网点')
            return false
          }
          if (_name == '') {
            this.$Message.warning('请输入路线')
            return false
          }
          this.saveLine(_stationId, _name)
        }
      },
      //保存路线
      saveLine(stationId, name){
        let _this=this;
        _this.isSaving = true;
        _this.$post('/api/admin/station/' + stationId + '/line', {
          'name': name
        }).then(res => {
          _this.isSaving = false;
          if (res.code == 'SUCCESS') {
            _this.$Message.success('添加成功')
            _this.stationId = stationId
            _this.getLineList()
            _this.isShowAddLinePop = false
          } else {
            _this.$Message.error(res.msg)
          }
        })
      },

    }
  }
</script>
