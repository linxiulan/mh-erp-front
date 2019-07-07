<style type="text/scss" lang="scss" scoped>
  .receivableList-title {
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
    }
    a:hover {
      background: #57607C;
      color: #fff;
      border: 1px solid #57607C;
    }
  }

  .receivableList-statistics {
    padding: 0 10px;
    line-height: 34px;
    font-size: 12px;
    color: #333;
    i {
      color: #FF0000;
      font-weight: 600;
      font-style: normal;
    }
  }

  .receivableList-table {
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

  #popUp-editReceivable {
    width: 400px;
    margin-left: -200px;
    margin-top: -187px;
    ul {
      width: 100%;
    }
    li {
      padding-left: 60px;
      position: relative;
      min-height: 35px;
      margin-bottom: 20px;
    }
    i {
      position: absolute;
      right: 10px;
      line-height: 35px;
      top: 0;
      font-style: normal;
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
      padding: 0 30px 0 10px;

      box-sizing: border-box;
    }
    textarea {
      display: block;
      width: 100%;
      min-height: 50px;
      line-height: 25px;
      padding: 0 5px;
      border: 1px solid #E3E4E3
    }
    .ivu-radio-group {
      line-height: 35px;
    }
    .saveBtn {
      margin-left: 60px;
    }
  }
</style>
<template>
  <div class="mian">
    <div class="breadCrumbs"><span>经营管理</span> &gt; <span>代收货款</span></div>
    <div class="searchMain">
      <ul class="searchList clearfix">
        <li>
          <span class="title">订单号码：</span>
          <input type="text" placeholder="请输入订单号" v-model="searchData.tradeId"/>
        </li>
        <li>
          <span class="title">出发站点：</span>
          <template>
            <Select v-model="searchData.fromStationId"  placeholder="请选择公司网点" clearable>
              <Option v-for="item in stationList" :value="item.stationId" :key="item.stationId">{{
                item.name }}
              </Option>
            </Select>
          </template>
        </li>
        <li style="margin-right: 0px;">
          <span class="title">到达站点：</span>
          <template>
            <Select v-model="searchData.toStationId"  placeholder="请选择公司网点" clearable>
              <Option v-for="item in stationList" :value="item.stationId" :key="item.stationId">{{
                item.name }}
              </Option>
            </Select>
          </template>
        </li>
      </ul>
      <ul class="searchList clearfix">
        <li>
          <span class="title">提货时间：</span>
          <div class="clearfix">
            <div class="doubleRow-left">

                  <DatePicker :value="searchData.minGmtCompleted" type="date" placeholder="请选择时间"
                              @on-change="setMinDate"></DatePicker>

            </div>
            <div class="doubleRow-span">到</div>
            <div class="doubleRow-right">

                  <DatePicker :value="searchData.maxGmtCompleted" type="date" placeholder="请选择时间"
                              @on-change="setMaxDate"></DatePicker>
            </div>
          </div>
        </li>
        <li>
          <span class="title">订单状态：</span>
          <template>
            <Select v-model="searchData.status"  placeholder="请选择订单的状态" clearable>
              <Option v-for="item in orderStatus" :value="item.value" :key="item.value">{{
                item.label }}
              </Option>
            </Select>
          </template>
        </li>
        <li style="margin-right: 0px;">
          <span class="title">货款状态：</span>
          <template>
            <Select v-model="searchData.payStatus"  placeholder="请选择货款状态" clearable>
              <Option v-for="item in receiverPayStatus" :value="item.value" :key="item.value">{{
                item.label }}
              </Option>
            </Select>
          </template>
        </li>
      </ul>
      <ul class="searchList clearfix">
        <li>
          <span class="title">收件人：</span>
          <input type="text" placeholder="请输入收件人" v-model="searchData.senderName"/>
        </li>
      </ul>
      <div class="searchBtn clearfix">
        <a class="searchBtn-left" href="javascript:;" @click="search">{{isSearching?'搜索中':'搜索'}}</a>
        <a class="searchBtn-right" @click="emptySearchCondition" href="javascript:;">清空</a>
      </div>
    </div>
    <div class="receivableList-main">
      <div class="receivableList-title">货款列表<a href="javascript:;" @click="exportFile">导出货款列表</a></div>
      <div class="receivableList-table">
        <table>
          <tr>
            <th>订单ID</th>
            <th width="22%">基础信息</th>
            <th width="8%">订单状态</th>
            <th width="11%">代收货款总额<br />{{totalAmount}} 元</th>
            <th width="9%">已收款<br />{{totalReceiverPayAmount}} 元</th>
            <th width="9%">已付款<br />{{totalPaySenderAmount}} 元</th>
            <th width="8%">跟进人</th>
            <th width="13%">备注</th>
            <th width="7%">操作</th>
          </tr>
          <template v-if="receivable.length>0">
            <tr v-for="item in receivable">
              <td>{{item.tradeId}}</td>
              <td style="text-align: left;">
                {{item.from?item.from.name:'无法确定'}}&nbsp; &rarr;&nbsp;&nbsp;{{item.to?item.to.name:'无法确定'}}
                <p v-if="item.gmtCompleted">提货时间：{{item.gmtCompleted}}</p>
                <p v-if="item.senderName">收货人：{{item.senderName}}</p>
              </td>
              <td>{{getOrderStatus(item.status)}}</td>
              <td>{{item.amount/100}}</td>
              <td>{{item.receiverPayAmount/100}}</td>
              <td>{{item.paySenderAmount/100}}</td>
              <td>{{item.modifyUser}}</td>
              <td>{{item.remark}}</td>
              <td>
                <a href="javascript:;" v-if="item.status=='INIT'"
                   @click="openEditReceivablePop(item.tradeId,item.receiverPayAmount,item.paySenderAmount)">编辑</a>
              </td>
            </tr>
            <tr>
              <td colspan="9">
                <template>
                  <Page :total="total" :current="getCurrentPage(searchData.index,searchData.size)"
                        :page-size="searchData.size"
                        @on-change="pageChange"></Page>
                </template>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td colspan="9" class="table-noDate">
                没有找到任何数据
              </td>
            </tr>
          </template>
        </table>
      </div>
    </div>
    <template v-if="isShowEditReceivablePop">
      <div class="popUp-bg"></div>
      <div class="popUp" id="popUp-editReceivable">
        <div class="popTitle">编辑代收货款金额<span @click="closePop"></span></div>
        <div class="popBox">
          <ul class="editBranch-main">
            <li>
              <h3>发货人:</h3>
              <input type="text" v-model="editReceivableData.paySenderAmount" placeholder="请输入代收货款金额"
                     @keyup="inputKeyup"/>
              <i>元</i>
            </li>
            <li>
              <h3>提货人:</h3>
              <input type="text" v-model="editReceivableData.receiverPayAmount" placeholder="请输入代收货款金额"
                     @keyup="inputKeyup"/>
              <i>元</i>
            </li>
            <li>
              <h3>订单状态:</h3>
              <RadioGroup v-model="editReceivableData.status">
                <Radio label="INIT">未收齐</Radio>
                <Radio label="COMPLETED">已收齐</Radio>
                <Radio label="CLEANED">已结清</Radio>
              </RadioGroup>
            </li>
            <li>
              <h3>备注:</h3>
              <textarea v-model="editReceivableData.remark"></textarea>
            </li>
          </ul>
          <a class="saveBtn" href="javascript:;" @click="saveReceivable">{{isSaving?'保存中':'保存'}}</a>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
  import { cloneObj, getLocalStorage, setLocalStorage } from '../../assets/js/common'
  import { serviceApi } from '../../assets/js/serviceApi'
  export default {
    mounted(){
      let _this = this,
        _callback = function () {
          _this.getListData()
        }
      _this.getStationList(_callback)
      this.$Spin.show()
    },
    data(){
      let _query = this.$router.history.current.query,
        orderStatus = [
          {'label': '未完成', 'value': 'INIT'},
          {'label': '已结清', 'value': 'CLEANED'},
          {'label': '已收齐', 'value': 'COMPLETED'},
          {'label': '已取消', 'value': 'CANCEL'},
        ],
        receiverPayStatus = [
          {'label': '未收款', 'value': 'INIT'},
          {'label': '部分收款', 'value': 'PART'},
          {'label': '已收齐', 'value': 'COMPLETED'},
        ]
      return {
        searchData: {
          'tradeId': _query.tradeId || '',
          'minGmtCompleted': _query.minGmtCompleted || '',
          'maxGmtCompleted': _query.maxGmtCompleted || '',
          'payStatus': _query.payStatus || '',
          'status': _query.status || '',
          'fromStationId': _query.fromStationId || '',
          'toStationId': _query.toStationId || '',
          'senderName':_query.senderName||'',
          'size': _query.size || 20,
          'index': _query.index ? parseInt(_query.index) : 0
        },
        total: 0,
        stationList: '',
        receiverPayStatus: receiverPayStatus,
        orderStatus: orderStatus,
        receivable: '',
        totalAmount: '',
        totalPaySenderAmount: '',
        totalReceiverPayAmount: '',
        isSaving: false,
        isSearching: false,
        editReceivableData: {
          receiverPayAmount: '',
          paySenderAmount: '',
          status:'',
          tradeId: '',
          remark: ''
        },
        isShowEditReceivablePop: false
      }
    },
    methods: {
      setMinDate(date){
        this.searchData.minGmtCompleted = date
      },
      setMaxDate(date){
        this.searchData.maxGmtCompleted = date
      },
      search(){
        if (this.isSearching) {
          return false
        }
        this.isSearching = true
        this.searchData.index = 0
        this.getListData()
      },
      getCurrentPage(index, size){
        let _num = Number(index) / Number(size)
        _num = Math.ceil(_num)
        if (_num < 1) {
          _num = 1
        }
        return _num
      },
      pageChange(num){
        this.searchData.index = (num - 1) * this.searchData.size
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
      //获取货款状态
      getReceiverPayStatus(no){
        let _name = ''
        if (no == 'INIT') {
          _name = '未收款'
        } else if (no == 'PART') {
          _name = '部分收款'
        } else if (no == 'COMPLETED') {
          _name = '已收齐'
        }
        return _name
      },
      //获取订单状态
      getOrderStatus(_no){
        let _name = ''
        if (_no == 'INIT') {
          _name = '未收齐'
        } else if (_no == 'COMPLETED') {
          _name = '已收齐'
        } else if (_no == 'CLEANED') {
          _name = '已结清'
        }  else if (_no == 'CANCEL') {
          _name = '已取消'
        }
        return _name
      },
      emptySearchCondition(){
        let _parameter = {
          'tradeId': '',
          'minGmtCompleted': '',
          'maxGmtCompleted': '',
          'payStatus': '',
          'status': '',
          'fromStationId': '',
          'toStationId': '',
          'senderName':'',
          'size': this.searchData.size,
          'index': this.searchData.index
        }
        this.searchData = _parameter
      },
      getListData(){
        this.$Spin.show()
        this.$get(serviceApi.getReceivableList, this.searchData).then(res => {
          if (res.code == 'SUCCESS') {
            this.receivable = res.data || []
            this.total = res.pageInfo.total
            this.totalAmount = res.pageInfo.totalAmount / 100
            this.totalPaySenderAmount = res.pageInfo.totalPaySenderAmount / 100
            this.totalReceiverPayAmount = res.pageInfo.totalReceiverPayAmount / 100
            this.isSearching = false
            this.$Spin.hide()
          } else {
            this.$Message.error(res.msg)
            this.isSearching = false
            this.$Spin.hide()
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
      inputKeyup(e){
        let el = e.target,
          _value = el.value.match(/\d+\.?\d{0,2}/),
          txt = ''
        if (_value != null) {
          txt = _value[0]
        }
        el.value = txt
      },
      //开启客户资料编辑
      openEditReceivablePop(tradeId, receiverPayAmount, paySenderAmount){
        this.editReceivableData = {
          receiverPayAmount: receiverPayAmount / 100,
          paySenderAmount: paySenderAmount / 100,
          status: 'INIT',
          tradeId: tradeId,
          remark: ''
        }
        this.isShowEditReceivablePop = true
      },
      //保存
      saveReceivable(){
        if (this.isSaving) {
          return false
        } else {
          let _this = this,
            _editReceivableData = _this.editReceivableData,
            _tradeId = _editReceivableData.tradeId
          _this.isSaving = true
          _this.$post(serviceApi.upDataReceivable + '/' + _tradeId, {
            'receiverPayAmount': _editReceivableData.receiverPayAmount * 100,
            'paySenderAmount': _editReceivableData.paySenderAmount * 100,
            'cleaned': _editReceivableData.status == 'CLEANED' ? true : false,
            'completed': _editReceivableData.status == 'COMPLETED' ? true : false,
            'remark': _editReceivableData.remark || ''
          }).then(res => {
            _this.isSaving = false
            if (res.code == 'SUCCESS') {
              _this.$Message.success('操作成功')
              _this.getListData()
              _this.isShowEditReceivablePop = false
            } else {
              _this.isSaving = false
              _this.$Message.error(res.msg)
            }
          })
        }
      },
      closePop(){
        if (this.isSaving) {
          this.$Message.warning('正在执行其他操作，请稍后重试')
          return false
        }
        this.isShowEditReceivablePop = false
      },
      //文件下载
      funDownload(url, filename) {
        // 创建隐藏的可下载链接
        var eleLink = document.createElement('a')
        eleLink.download = filename
        eleLink.style.display = 'none'
        //var blob = new Blob([content]);
        eleLink.href = url
        // 触发点击
        document.body.appendChild(eleLink)
        eleLink.click()
        // 然后移除
        document.body.removeChild(eleLink)
      },
      //导出文件
      exportFile(){
        let _this = this,
          _searchData = cloneObj(_this.searchData)
        _this.$get(serviceApi.exportReceivableList, _searchData).then(res => {
          if (res.code == 'SUCCESS') {
            let _url = res.data.uri || res.data.url,
              _filename = '代收货款列表'
            _this.funDownload(_url, _filename)
          } else {
            _this.$Message.error(res.msg)
          }
        })
      }
    }
  }
</script>
