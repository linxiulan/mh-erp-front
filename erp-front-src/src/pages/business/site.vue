<style type="text/scss" lang="scss" scoped>
  .branchSite-title {
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

  .branchSite-main {
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

  #popUp-editCostItems {
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

  #popUp-addPrice {
    width: 354px;
    margin-left: -177px;
    margin-top: -102px;
    .popBox {
      padding-top: 15px;
    }
    .submenu {
      width: 100%;
      height: 35px;
      margin-bottom: 20px;
      a {
        display: block;
        width: 50%;
        float: left;
        height: 35px;
        border: 1px solid #fff;
        border-bottom: 1px solid #336699;
        font-size: 12px;
        color: #333;
        line-height: 35px;
        text-align: center;
      }
      a:hover {
        color: #336699;
      }
      .current {
        border: 1px solid #336699;
        border-bottom: 1px solid #fff;
      }
    }
    .inputItem {
      height: 35px;
      padding-left: 45px;
      position: relative;
      margin-bottom: 10px;
      label {
        position: absolute;
        top: 0;
        left: 0;
        line-height: 35px;
        font-size: 12px;
        color: #333;
      }
      input {
        width: 100%;
        height: 35px;
        border: 1px solid #dddee1;
        line-height: 1.5;
        font-size: 12px;
        border-radius: 4px;
        color: #495060;
        padding: 4px 7px;
      }
    }
    p {
      font-size: 12px;
      color: #333;
      margin-bottom: 10px;
    }
    input::-webkit-input-placeholder {
      color: #999;
    }
    input::-moz-placeholder { /* Mozilla Firefox 19+ */
      color: #999;
    }
    input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
      color: #999;
    }
    input:-ms-input-placeholder { /* Internet Explorer 10-11 */
      color: #999;
    }
  }
</style>
<template>
  <div class="mian">
    <div class="breadCrumbs"><span>经营管理</span> &gt;
      <router-link :to="{ path: '/business' }">经营数据</router-link> &gt; <span>成本设置</span></div>
    <div class="searchMain">
      <ul class="searchList clearfix">
        <li>
          <span class="title">时间段：</span>
          <div class="clearfix">
            <div class="doubleRow-left">
              <template>
                <Row>
                  <Col span="12">
                  <DatePicker :value="searchData.minDate" type="month" placeholder="请选择日期" style="width: 124px"
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
                  <DatePicker :value="searchData.maxDate" type="month" placeholder="请选择日期" style="width: 124px"
                              @on-change="setMaxDate"></DatePicker>
                  </Col>
                </Row>
              </template>
            </div>
          </div>
        </li>
      </ul>
      <div class="searchBtn clearfix">
        <a class="searchBtn-left" href="javascript:;" @click="search">{{isLoading?'搜索中':'搜索'}}</a>
      </div>
    </div>
    <div class="branchSite-main">
      <div class="branchSite-title">全部成本
        <router-link :to="{ path: '/business/siteItem' }">编辑成本项</router-link>
        <router-link :to="{ path: '/business/siteAdd' }">添加成本</router-link>
      </div>
      <table>
        <tr>
          <th width="25%">时间</th>
          <th width="25%">网点</th>
          <th >成本</th>
          <th width="25%">操作</th>
        </tr>
        <template v-if="listData.length>0">
          <tr v-for="(item,index) in listData">
            <td>{{getYearAndMonth(item.month)}}</td>
            <td>{{item.station?item.station.name:'公司总体'}}</td>
            <td>{{item.totalAmount/100}}</td>
            <td>
              <a href="javascript:;" @click="openCostDetail(item.month,item.station,item.totalAmount)">明细</a>
            </td>
          </tr>
          <tr>
            <td colspan="4">
              <template>
                <Page :total="listTotal" :current="getCurrentPage(searchData.index,searchData.size)"
                      :page-size="searchData.size"
                      @on-change="pageChange"></Page>
              </template>
            </td>
          </tr>
        </template>
        <template v-else-if="listData!==''">
          <tr>
            <td colspan="4" class="table-noDate">
              还没有相关成本项，您可以添加成本项。
            </td>
          </tr>
        </template>
      </table>
    </div>
    <!--查看成本明细-->
    <template v-if="isShowCostDetailPop">
      <div class="popUp-bg"></div>
      <div class="popUp" id="popUp-editCostItems" :style="{marginTop:(0-172-editcostItems.length*45)/2+'px'}">
        <div class="popTitle">编辑成本项<span @click="closePop"></span></div>
        <div class="popBox">
          <p style="color:#333;">设置您的企业的成本项目，方便管理成本（最多5项）</p>
          <ul>
            <li v-for="(item,key) in editcostItems"><input type="text" v-model="editcostItems[key]"><a
              href="javascript:;" @click="operateMobile(key)"></a></li>
          </ul>
          <a class="saveBtn" href="javascript:;" @click="saveCostItems">{{isSaving?'保存中':'保存'}}</a>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
  import { serviceApi } from '../../assets/js/serviceApi'
  import { getNowDay, getLastMonthTime, getMonthDifference } from '../../assets/js/common'
  export default {
    mounted(){
      let _this = this,
        _callback = function () {
          _this.search()
        }
      this.getCostItem(_callback)

    },
    data(){
      return {
        searchData: {
          minDate: '',
          maxDate: '',
          index:0,
          size:20
        },
        page:'',
        listTotal:'',
        listData:'',
        costItems: '',
        price: '',
        isLoading: false,
        isSaving: false,
        isShowCostDetailPop: false,

      }
    },
    methods: {
      getYearAndMonth(date){
        let _date = date.split("-");
        return _date[0]+'年'+_date[1]+'月'
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
        this.search()
      },
      priceStatistics(arr){
        var num = 0
        for (var i = 0; i < arr.length; i++) {
          num += arr[i].amount
        }
        return num
      },
      setMinDate(date){
        this.searchData.minDate = date
      },
      setMaxDate(date){
        this.searchData.maxDate = date
      },
      setAddPriceDate(date){
        this.addPrice.date = date
      },
      getCostItem(callback){
        this.$get(serviceApi.getgetCostItem).then(res => {
          if (res.code == 'SUCCESS') {
            this.costItems = res.data
            if (callback) {
              callback()
            }
          } else {
            this.$Message.error(res.msg)
          }
        }).catch(err => {
          this.$Message.error('获取成本项失败，请刷新页面')
        })
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
          _minDate = getLastMonthTime(_maxDate, true)
          $searchData.minDate = _minDate
        }
        if (_minDate != '' && _maxDate != '') {
          if (getMonthDifference(_minDate, _maxDate) > 23) {
            this.$Modal.confirm({
              title: '提示',
              content: '<p>筛选的时间段间隔最大为24个月，请重新选择筛选时间段</p>',
            })
            return false
          }
        }
        this.isLoading = true
        this.getExpendList()
      },
      //获取成本列表数据
      getExpendList(){
        let $searchData = this.searchData,
          _index=$searchData.index,
          _size=$searchData.size,
          _minDate = $searchData.minDate,
          _maxDate = $searchData.maxDate;
        this.$get(serviceApi.getExpendList, {
          minDate: _minDate.substr(0, 7) + '-01',
          maxDate: _maxDate.substr(0, 7) + '-01',
          index:_index,
          size:_size
        }).then(res => {
          this.isLoading = false;
          if (res.code == 'SUCCESS') {
            let _data = res.data;
            this.listTotal = res.pageInfo.total;
            /*for (let i = 0; i < _data.length; i++) {
              let item = _data[i],
                prices = item.prices
              for (let k = 0; k < prices.length; k++) {
                let p_item = prices[k]
                _data[i].prices[k].amount = p_item.amount / 100
              }
            }*/
            this.listData=_data;
            //this.price = _data
          } else {
            this.$Message.error(res.msg)
          }
        }).catch(err => {
          this.isLoading = false
          this.$Message.error('获取数据失败，请重试')
        })
      },
      closePop(){
        if (this.isSaving) {
          this.$Message.warning('正在执行其他操作，请稍后重试')
          return false
        }
        this.isShowEditCostItemsPop = false
        this.isShowAddPricePop = false
      },
      //成本明细
      openCostDetail(date,station,totalAmount){
        this.$Message.error('该功能暂不能用');
        return false
        let _date = date.split("-"),
          _year=_date[0],
          _month=_date[1],
          _stationName=station?station.name:'公司总体',
          _totalAmount=totalAmount||0;
        this.$get('/api/admin/prices/'+_year+'/'+_month+'/'+station.stationId, {

        }).then(res => {
          this.isLoading = false;
          if (res.code == 'SUCCESS') {
            let _data = res.data;
            this.listData=_data;
          } else {
            this.$Message.error(res.msg)
          }
        }).catch(err => {
          this.isLoading = false
          this.$Message.error('获取数据失败，请重试')
        })
      },
    }
  }
</script>
