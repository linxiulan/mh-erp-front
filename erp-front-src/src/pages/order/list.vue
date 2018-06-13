<style type="text/scss" lang="scss" scoped>
  .orderList-title {
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

  .orderList-table {
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
      padding: 15px 0;
      background: #fff;
      border: 1px solid #F1F2F1;
      text-align: center;
      color: #283949;
      font-size: 12px;
      line-height: 22px;
      font-weight: 400;
    }
    .address {
      font-size: 14px;
      p {
        font-size: 12px;
        color: #999;
      }
    }
    .follow {
      font-size: 12px;
      p {
        color: #999;
      }
    }
    a {
      color: #336699;
    }
    a:hover {
      color: #f60;
    }
  }
</style>
<template>
  <div class="mian">
    <div class="breadCrumbs"><span>业务管理</span> &gt; <span>订单列表</span></div>
    <div class="searchMain">
      <ul class="searchList clearfix">
        <li>
          <span class="title">订单号码：</span>
          <input type="text" placeholder="请输入订单号" v-model="searchData.orderNo"/>
        </li>
        <li>
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
        <li style="margin-right: 0px;">
          <span class="title">订单金额：</span>
          <div class="clearfix">
            <div class="doubleRow-left"><input type="text" v-model="searchData.minAmount" placeholder="请输入金额"
                                               @keyup="moneyFormat"/><i class="doubleRow-unit">元</i></div>
            <div class="doubleRow-span">到</div>
            <div class="doubleRow-right"><input type="text" v-model="searchData.maxAmount" placeholder="请输入金额"
                                                @keyup="moneyFormat()"/><i class="doubleRow-unit">元</i></div>
          </div>
        </li>
      </ul>
      <ul class="searchList clearfix">
        <li>
          <span class="title">订单状态：</span>
          <template>
            <Select v-model="searchData.orderStatus" style="width:280px" placeholder="请选择订单的状态">
              <Option v-for="item in orderStatus" :value="item.value" :key="item.value">{{
                item.label }}
              </Option>
            </Select>
          </template>
        </li>
        <li>
          <span class="title">公司网点：</span>
          <template>
            <Select v-model="searchData.stationId" style="width:280px" placeholder="请选择公司网点">
              <Option v-for="item in stationList" :value="item.stationId" :key="item.stationId">{{
                item.name }}
              </Option>
            </Select>
          </template>
        </li>
        <li style="margin-right: 0px;">
          <span class="title">车辆信息：</span>
          <template>
            <Select v-model="searchData.carId" style="width:280px" placeholder="请选择车牌号码">
              <Option v-for="item in vehicleList" :value="item.carId" :key="item.carId">{{
                item.plateNumber }}
              </Option>
            </Select>
          </template>
        </li>
      </ul>
      <ul class="searchList clearfix">
        <li>
          <span class="title">跟进员工：</span>
          <input type="text" v-model="searchData.personnel" placeholder="请输入员工姓名"/>
        </li>
        <li>
          <span class="title">客户信息：</span>
          <input type="text" v-model="searchData.mobileOrName" placeholder="请输入用户的姓名或手机号码"/>
        </li>
      </ul>
      <div class="searchBtn clearfix">
        <a class="searchBtn-left" href="javascript:;" @click="search">搜索</a>
        <a class="searchBtn-right" @click="emptySearchCondition" href="javascript:;">清空</a>
      </div>
    </div>
    <div class="orderList-main">
      <div class="orderList-title">订单列表 <a href="javascript:;" @click="exportFile">导出订单列表</a></div>
      <div class="orderList-table">
        <table>
          <tr>
            <th>订单号</th>
            <th width="12%">发货</th>
            <th width="12%">收货</th>
            <th width="10%">货物</th>
            <th width="8%">订单费用</th>
            <th width="8%">代收货款</th>
            <th width="12%">最后跟进</th>
            <th width="8%">车辆</th>
            <th width="12%">订单状态</th>
            <th width="10%">操作</th>
          </tr>
          <template v-if="orders.length>0">
            <tr v-for="item in orders">
              <td>
                <p style="word-wrap:break-word; padding: 0px 10px;">
                  <router-link :to="{path: '/order/detail/'+item.tradeId}">{{item.tradeId}}</router-link>
                </p>
              </td>
              <td>
                <div class="address">{{item.senderInfo.station.name}}<p>{{item.senderInfo.name}}
                  {{item.senderInfo.mobile}}</p></div>
              </td>
              <td>
                <div class="address">{{item.receiverInfo.station.name}}<p>{{item.receiverInfo.name}}
                  {{item.receiverInfo.mobile}}</p></div>
              </td>
              <td><p v-for="items in item.items">{{items.name}} {{items.count}}{{items.unit}}</p></td>
              <td>{{statisticalFees(item.freightCharge,item.prices)}}</td>
              <td>{{item.receivable?item.receivable/100:''}}</td>
              <td>
                <div class="follow">{{item.modifyUser}}<p>{{item.gmtModify}}</p></div>
              </td>
              <td>{{item.car?item.car.plateNumber:''}}</td>
              <td>{{item.payType=='BY_SENDER'?'寄付':'到付'}}：{{getOrderStatus(item.orderStatus)}}</td>
              <td>
                <router-link :to="{path: '/order/detail/'+item.tradeId}">查看详情</router-link>
              </td>
            </tr>
            <tr>
              <td colspan="10">
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
              <td colspan="10" class="table-noDate">
                没有找到任何订单<!--，您可以<a href="javascript:;">添加订单</a>-->
              </td>
            </tr>
          </template>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
  import { serviceApi } from '../../assets/js/serviceApi'
  import { cloneObj, getLocalStorage, setLocalStorage } from '../../assets/js/common'
  export default {
    mounted(){
      let _this = this,
        s_callback = function () {
          _this.search()
        },
        c_callback = function () {
          _this.getCarList(s_callback)
        }
      _this.getStationList(c_callback)
    },
    data(){
      let _query = this.$router.history.current.query,
        orderStatus = [
          {'label': '全部类型', 'value': ''},
          //{'label': '寄付：待支付', 'value': 1},
          {'label': '待装车', 'value': 'COLLECTED'},
          {'label': '已装车', 'value': 'ONLOAD'},
          {'label': '已送达', 'value': 'DELIVERY'},
          //{'label': '已通知', 'value': 5},
          {'label': '已提货', 'value': 'COMPLETED'},
          {'label': '已取消', 'value': 'CANCEL'},
        ],
        orders = [];
      return {
        searchData: {
          'tradeId': _query.orderNo || '',
          'minGmtCreate': _query.minGmtCreate || '',  //最小下单时间
          'maxGmtCreate': _query.maxGmtCreate || '',  //最大下单时间
          'minAmount': _query.minAmount || '',  //最小金额
          'maxAmount': _query.maxAmount || '',  //最大金额
          'orderStatus': _query.orderStatus || '',  //订单状态
          'stationId': _query.stationId || '',   //站点ID
          'carId': _query.carId || '',         //车辆ID
          'uid': _query.uid || '',             //用户ID
          'mobileOrName': _query.mobileOrName || '',  ///客户信息
          'size': _query.size ? parseInt(_query.size) : 20,
          'index': _query.index ? parseInt(_query.index) : 0
        },
        'orderStatus': orderStatus,
        'vehicleList': '',
        'stationList': '',
        'orders': orders,
        'total': 4,

      }
    },
    methods: {
      setMinDate(date){
        this.searchData.minDate = date
      },
      setMaxDate(date){
        this.searchData.maxDate = date
      },
      getCurrentPage(index, size){
        let _num = Number(index) / Number(size)
        _num = Math.ceil(_num)
        if (_num < 1) {
          _num = 1
        }
        return _num
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
      //获取车辆列表
      getCarList(callback){
        let _vehicleList = getLocalStorage('carListData') || ''
        if (_vehicleList != '') {
          this.vehicleList = _vehicleList
          if (callback) {
            callback()
          }
          return false
        }
        this.$get(serviceApi.carList).then(res => {
          if (res.code == 'SUCCESS') {
            let _data = res.data
            this.vehicleList = _data
            setLocalStorage('carListData', _data)
            if (callback) {
              callback()
            }
          } else {
            this.$Message.error(res.msg)
          }
        }).catch(err => {
          this.$Message.error('获取车辆列表失败，请刷新重试')
        })
      },
      moneyFormat(e){
        let _this = e.target,
          _value = _this.value,
          _reg = _value.match(/\d+\.?\d{0,2}/),
          _text = ''
        if (_reg != null) {
          _text = _reg[0]
        }
        _this.value = _text
      },
      search(){
        this.$router.push({
          path: this.$router.history.current.path,
          query: this.searchData
        })
        let _searchData = cloneObj(this.searchData)
        if (_searchData.minAmount != '') {
          _searchData.minAmount = _searchData.minAmount * 100
        }
        if (_searchData.maxAmount != '') {
          _searchData.maxAmount = _searchData.maxAmount * 100
        }
        this.$get(serviceApi.getOrderList, _searchData).then(res => {
          //this.isSaving = false
          if (res.code == 'SUCCESS') {
            this.orders = res.data
            this.total = res.pageInfo.total
          } else {
            this.$Message.error(res.msg)
          }
        })
      },
      pageChange(num){
        this.searchData.index = (num - 1) * this.searchData.size
        this.search()
      },
      //统计费用
      statisticalFees(freightCharge, prices){
        let _num = 0
        if (prices != null) {
          for (let i = 0; i < prices.length; i++) {
            let _amount = prices[i].amount / 100
            _num += Number(_amount)
          }
        }
        if (freightCharge != null) {
          _num += Number(freightCharge / 100)
        }
        return _num
      },
      //获取费用名称
      getOrderStatus(_no){
        let _name = ''
        if (_no == 'COLLECTED') {
          _name = '待装车'
        } else if (_no == 'ONLOAD') {
          _name = '已装车'
        } else if (_no == 'DELIVERY') {
          _name = '已送达'
        } else if (_no == 'COMPLETED') {
          _name = '已提货'
        } else if (_no == 'CANCEL') {
          _name = '已取消'
        }
        return _name
      },
      emptySearchCondition(){
        let _parameter = {
          'tradeId': '',
          'minGmtCreate': '',  //最小下单时间
          'maxGmtCreate': '',  //最大下单时间
          'minAmount': '',  //最小金额
          'maxAmount': '',  //最大金额
          'orderStatus': '',  //订单状态
          'stationId': '',   //站点ID
          'carId': '',         //车辆ID
          'uid': '',             //用户ID
          'mobileOrName': '',  ///客户信息
          'index': this.searchData.index || 0
        }
        this.searchData = _parameter
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
          _searchData = cloneObj(this.searchData);
        if (_searchData.minAmount != '') {
          _searchData.minAmount = _searchData.minAmount * 100
        }
        if (_searchData.maxAmount != '') {
          _searchData.maxAmount = _searchData.maxAmount * 100
        }
        _this.$get(serviceApi.orderListExport, _searchData).then(res => {
          if (res.code == 'SUCCESS') {
            let _url = res.data.uri || res.data.url,
              _filename = '订单列表'
            _this.funDownload(_url, _filename)
          } else {
            _this.$Message.error(res.msg)
          }
        })
      }
    },
  }
</script>
