<style type="text/scss" lang="scss" scoped>
  .branchIndex-title {
    background: #fff;
    padding: 15px 0px 20px 20px;
    font-size: 16px;
    height: 72px;
    line-height: 32px;
    color: #6F7B91;
    margin-bottom: 10px;
    h2 {
      float: left;
      margin-right: 10px;
    }
    .determineBtn {
      display: block;
      width: 74px;
      height: 28px;
      line-height: 28px;
      text-align: center;
      font-size: 13px;
      background: #565F7D;
      border: 1px solid #565F7D;
      color: #fff;
      float: left;
      margin-left: 10px;
      margin-top: 4px;
      &:hover {
        background: #57607C;
        color: #fff;
        border: 1px solid #57607C;
      }
    }
    .doubleRow-left {
      float: left;
      width: 124px;
      position: relative;
    }
    .doubleRow-span {
      float: left;
      width: 30px;
      line-height: 32px;
      text-align: center;
      color: #333;
      font-size: 12px;
    }
    .doubleRow-right {
      float: left;
      width: 124px;
      position: relative;
    }
    .siteBtn {
      display: block;
      width: 80px;
      height: 28px;
      line-height: 28px;
      background: #fff url("../../assets/site-icon.png") 4px 50%/16px 16px no-repeat;
      padding-left: 25px;
      font-size: 12px;
      color: #333;
      font-weight: 400;
      float: right;
      margin-top: 4px;
      &:hover {
        opacity: 0.8;
      }
    }
  }

  .branchIndex-statistical {
    margin-bottom: 20px;
    li {
      float: left;
      width: calc(100% / 4 - 15px);
      margin-right: 20px;
      padding: 30px 0 25px 56px;
      background: #fff url("../../assets/book-icon.png") 12px 50%/32px 32px no-repeat;
      height: 120px;
      &:last-child {
        margin-right: 0;
      }
    }
    p {
      font-size: 12px;
      color: #333;
      font-weight: 400;
      margin-bottom: 5px;
    }
    span {
      position: relative;
      padding-right: 30px;
    }
    em {
      font-style: normal;
      font-size: 36px;
      line-height: 40px;
      color: #5A666B;
      font-weight: 400;
    }
    i {
      display: block;
      width: 16px;
      height: 16px;
      position: absolute;
      bottom: -4px;
      right: 0;
      font-size: 16px;
      color: #5A666B;
      font-style: normal;
      font-weight: 400;
    }
  }

  .branchIndex-incomeReports {
    background: #fff;
    height: 436px;
    padding: 20px;
    margin-bottom: 20px;
  }

  .branchIndex-reports {
    .reportsList {
      width: 580px;
      height: 400px;
      padding: 20px;
      float: left;
      margin-bottom: 20px;
      background: #fff;
      &:nth-child(even) {
        float: right;
      }
    }
  }

  .branchIndex-table {
    .tableList {
      width: 100%;
      padding: 20px;
      float: left;
      margin-bottom: 20px;
      background: #fff;
      &:nth-child(even) {
        float: right;
      }
    }
    p {
      font-size: 14px;
      color: #333;
      font-weight: 400;
      line-height: 20px;
      margin-bottom: 10px;
    }
    table {
      border-collapse: collapse;
      border-spacing: 0;
      width: 100%;
    }
    th {
      padding: 11px 0;
      line-height: 17px;
      font-size: 12px;
      color: #283949;
      background: #F7F8FC;
      border: 1px solid #F1F2F1;
    }
    td {
      padding: 9px 0;
      background: #fff;
      border: 1px solid #F1F2F1;
      text-align: center;
      color: #283949;
      font-size: 12px;
      line-height: 21px;
      font-weight: 400;
    }
  }
</style>
<template>
  <div class="mian">
    <div class="breadCrumbs"><span>经营管理</span> &gt; <span>经营数据</span></div>
    <div class="branchIndex-main">
      <div class="branchIndex-title">
        <h2>统计时间段</h2>
        <div class="doubleRow-left">
          <template>
            <Row>
              <Col span="12">
              <DatePicker :value="searchData.minDate" type="date" placeholder="请选择时间" style="width: 124px;"
                          @on-change="setMinDate"></DatePicker>
              </Col>
            </Row>
          </template>
        </div>
        <div class="doubleRow-span">到</div>
        <div class="doubleRow-right">
          <template>
            <Row>
              <Col span="12">
              <DatePicker :value="searchData.maxDate" type="date" placeholder="请选择时间" style="width: 124px;"
                          @on-change="setMaxDate"></DatePicker>
              </Col>
            </Row>
          </template>
        </div>
        <a class="determineBtn" href="javascript:;" @click="search">{{isLoading?'查询中':'查询'}}</a>
      </div>
      <template>
        <Tabs value="name1">
          <TabPane label="物流路线排行" name="name1">
            <div class="branchIndex-table">
              <div class="tableList">
                <p>订单量top20路线</p>
                <table>
                  <tr>
                    <th width="10%">排名</th>
                    <th>路线</th>
                    <th width="15%">订单次数</th>
                    <th width="15%">订单金额</th>
                  </tr>
                  <template v-if="orderQuantityTop.route.length>0">
                    <tr v-for="(item,index) in orderQuantityTop.route">
                      <td>{{index+1}}</td>
                      <td>{{item.from?item.from.name:''}} --> {{item.to?item.to.name:''}} </td>
                      <td>{{item.orderCount}}</td>
                      <td>{{item.totalAmount/100}}</td>
                    </tr>
                  </template>
                  <template v-else>
                    <tr>
                      <td colspan="4" class="table-noDate">
                        暂时没有数据
                      </td>
                    </tr>
                  </template>
                </table>
              </div>
            </div>
          </TabPane>
          <TabPane label="用户下单量排行" name="name2">
            <div class="branchIndex-table">
              <div class="tableList">
                <p>下单量top20用户</p>
                <table>
                  <tr>
                    <th width="10%">排名</th>
                    <th>用户</th>
                    <th width="20%">订单次数</th>
                    <th width="20%">订单金额</th>
                  </tr>
                  <template v-if="orderQuantityTop.user.length>0">
                    <tr v-for="(item,index) in orderQuantityTop.user">
                      <td>{{index+1}}</td>
                      <td>{{item.name}}</td>
                      <td>{{item.orderCount}}</td>
                      <td>{{item.totalAmount/100}}</td>
                    </tr>
                  </template>
                  <template v-else>
                    <tr>
                      <td colspan="4" class="table-noDate">
                        暂时没有数据
                      </td>
                    </tr>
                  </template>
                </table>
              </div>
            </div>
          </TabPane>
        </Tabs>
      </template>
    </div>
  </div>
</template>
<script>
  let echarts = require('echarts')
  import { serviceApi } from '../../assets/js/serviceApi'
  import { getTimeDifference, getNowDay, getLastMonthTime } from '../../assets/js/common'
  export default {
    mounted(){
      this.search()
    },
    data(){
      return {
        searchData: {
          minDate: '',
          maxDate: ''
        },
        isLoading: false,
        orderQuantityTop: {
          route: [],
          user: []
        }
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
        if (this.isLoading) {
          return false
        }
        let $searchData = this.searchData,
          _minDate = $searchData.minDate,
          _maxDate = $searchData.maxDate
        if (_maxDate == '') {
          _maxDate = getNowDay()
          $searchData.maxDate = _maxDate
        }
        if (_minDate == '') {
          _minDate = getLastMonthTime(_maxDate)
          $searchData.minDate = _minDate
        }
        if (_minDate != '' && _maxDate != '') {
          if (getTimeDifference(_minDate, _maxDate) > 365) {
            this.$Modal.confirm({
              title: '提示',
              content: '<p>统计数据筛选的时间段间隔最大为366天，请重新选择筛选时间段</p>',
            })
            return false
          }
        }
        this.isLoading = true
        this.searchLine(_minDate, _maxDate)
        this.serchCustomer(_minDate, _maxDate)
      },
      searchLine(_minDate, _maxDate){
        this.$get(serviceApi.lineRouteOrders, {
          minDate: _minDate,
          maxDate: _maxDate
        }).then(res => {
          this.isLoading = false
          if (res.code == 'SUCCESS') {
            this.orderQuantityTop.route = res.data
          } else {
            this.$Message.error(res.msg)
          }
        }).catch(err => {
          this.isLoading = false
          this.$Message.error('获取物流路线排行榜数据失败，请重试')
        })
      },
      serchCustomer(_minDate, _maxDate){
        this.$get(serviceApi.lineClientOrders, {
          minDate: _minDate,
          maxDate: _maxDate
        }).then(res => {
          this.isLoading = false
          if (res.code == 'SUCCESS') {
            this.orderQuantityTop.user = res.data
          } else {
            this.$Message.error(res.msg)
          }
        }).catch(err => {
          this.isLoading = false
          this.$Message.error('获取用户下单排行榜数据失败，请重试')
        })
      }
    }
  }
</script>
