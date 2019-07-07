<style type="text/scss" lang="scss" scoped>
  .billList-title {
    padding: 15px 0px 5px 0px;
    font-size: 16px;
    line-height: 34px;
    color: #6F7B91;
    span {
      font-weight: 600;
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
      float: right;
      margin-left: 10px;
    }
    a:hover {
      background: #57607C;
      color: #fff;
      border: 1px solid #57607C;
    }
  }

  .billList-statistics {
    background: #F7F8FC;
    padding: 0 10px;
    line-height: 43px;
    font-size: 12px;
    color: #333;
    i {
      color: #FF0000;
      font-weight: 600;
      font-style: normal;
    }
  }

  .billList-main {
    table {
      border-collapse: collapse;
      border-spacing: 0;
      width: 100%;
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
    th:first-child {
      text-align: left;
    }
    td:first-child {
      text-align: left;
      vertical-align: middle;
    }
    .ivu-checkbox-wrapper {
      margin-right: 0;
    }
    .address {
      font-size: 14px;
      p {
        font-size: 12px;
        color: #999;
      }
    }
    .price, .count {
      margin: 0 30px;
      font-size: 12px;
      font-weight: 400;
      color: #333;
      padding-left: 60px;
      text-align: right;
      position: relative;
      span {
        position: absolute;
        top: 0;
        left: 0;
        text-align: left;
      }
    }
    .count {
      margin-top: 20px;
      border-top: 1px dashed #333;
    }
  }
</style>
<template>
  <div class="mian">
    <div class="breadCrumbs"><span>业务管理</span> &gt; <span>月结收账</span></div>
    <div class="searchMain">
      <ul class="searchList clearfix">
        <!--<li >
          <span class="title">收账用户：</span>
          <input type="text" placeholder="请输入收账用户" v-model="searchData.userName"/>
        </li>-->
        <li>
          <span class="title">下单时间：</span>
          <div class="clearfix">
            <div class="doubleRow-left">
                  <DatePicker :value="startDate" type="date" placeholder="请选择时间"
                              @on-change="setMinDate"></DatePicker>
            </div>
            <div class="doubleRow-span">到</div>
            <div class="doubleRow-right">

                  <DatePicker :value="endDate" type="date" placeholder="请选择时间"
                              @on-change="setMaxDate"></DatePicker>
            </div>
          </div>
        </li>
      </ul>
      <div class="searchBtn clearfix">
        <a class="searchBtn-left" href="javascript:;" @click="search">搜索</a>
        <a class="searchBtn-right" href="javascript:;" @click="emptySearchCondition">清空</a>
      </div>
    </div>
    <div class="billList-main">
      <div class="billList-title">
        <span>{{userName}}</span>的未支付订单
        <a href="javascript:;" @click="exportFile">导出全部</a>
        <!--<a>导出选中</a>-->
        <!--<a>全部已支付</a>-->
        <a href="javascript:;" @click="modifyPayStatusBtn">标记为已支付</a>
      </div>
      <div class="billList-statistics"><span>已选中 {{selects.length}}</span><span
        class="fr">已选中订单费用：<i>{{selectedOrderAmount}}</i> 元；&nbsp;全部订单费用：<i>{{sumAmount}}</i> 元</span></div>
      <table>
        <tr>
          <th width="7%">
            <template>
              <Checkbox :value="selectAll" @click.prevent.native="selectAllFun">&nbsp;全选</Checkbox>
            </template>
          </th>
          <th width="17%">订单号</th>
          <th width="15%">下单时间</th>
          <th width="16%">发货</th>
          <th width="16%">收货</th>
          <th width="15%">货物</th>
          <!--<th width="190">寄方费用</th>-->
          <th>{{userName}}需支付</th>
        </tr>

        <template v-if="orders.length>0">
          <tr v-for="(item,index) in orders">
            <td>
              <template>
                <Checkbox :value="judgingSelected(item.tradeId)"
                          @click.prevent.native="singleItemFun(item.tradeId)">&nbsp;&nbsp;{{index+1}}
                </Checkbox>
              </template>
            </td>
            <td>{{item.tradeId}}</td>
            <td>{{item.gmtCreate}}</td>
            <td>
              <div class="address">{{item.senderInfo.station.name}}<p>{{item.senderInfo.name}}
                {{item.senderInfo.mobile}}</p></div>
            </td>
            <td>
              <div class="address">{{item.receiverInfo.station.name}}<p>{{item.receiverInfo.name}}
                {{item.receiverInfo.mobile}}</p></div>
            </td>
            <td>
              <p v-for="i_item in item.items" v-if="item.items.length>0">{{i_item.name}}
                {{i_item.count}}{{i_item.unit}}</p>
            </td>
            <!--<td>
              <div class="price"><span>运费：</span>{{item.freightCharge/100}}元</div>
              <div class="price" v-for="p_item in item.prices"><span>{{p_item.name}}：</span>{{p_item.amount}}元</div>
              <div class="price"><span>代收货款：</span>{{item.receivable/100}}元</div>
            </td>-->
            <td>
              <!--<div class="price"><span>落地费：</span>2元</div>
              <div class="price"><span>代收货款：</span>5000元</div>
              <div class="count"><span>合计：</span>5002元</div>-->
              {{item.amount/100}}元
            </td>
          </tr>
          <tr>
            <td colspan="8" style="text-align: center">
              <template>
                <Page :total="pageInfo.total" :current="getCurrentPage(pageInfo.index,pageInfo.size)"
                      :page-size="pageInfo.size"
                      @on-change="pageChange"></Page>
              </template>
            </td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td colspan="10" class="table-noDate" style="text-align: center">
              没有找到任何订单<!--，您可以<a href="javascript:;">添加订单</a>-->
            </td>
          </tr>
        </template>
      </table>
    </div>
  </div>
</template>
<script>
  import { serviceApi } from '../../assets/js/serviceApi'
  export default {
    mounted(){
      this.getListData()
      this.getOrderSumAmount()
    },
    data(){
      let _query = this.$router.history.current.query
      return {
        customerId: _query.customerId || '',
        userName: _query.userName || '',
        stationId:_query.stationId || '',
        startDate: _query.startDate || '',
        endDate: _query.endDate || '',
        sumAmount:0,
        orders: '',
        selects: [],
        selectedOrderAmount:0,
        selectAll: false,
        modifying:false,
        pageInfo: {
          index: 0,
          size: 20,
          total: 1
        },
      }
    },
    methods: {
      setMinDate(date){
        this.startDate = date
      },
      setMaxDate(date){
        this.endDate = date
      },
      getCurrentPage(index, size){
        let _num = Number(index) / Number(size)
        _num = Math.ceil(_num)
        if (_num < 1) {
          _num = 1
        }
        return _num
      },
      search(){
        this.pageInfo.index = 0
        this.getListData()
      },
      emptySearchCondition(){
        this.startDate = ''
        this.endDate = ''
      },
      getListData(){
        let _this = this;
        this.$get(serviceApi.monthlyOrderList, {
          customerId: _this.customerId,
          startDate: _this.startDate || '',
          endDate: _this.endDate || '',
          index: _this.pageInfo.index || 0,
          size: _this.pageInfo.size || 0
        }).then(res => {
          if (res.code == 'SUCCESS') {
            this.orders = res.data
            this.pageInfo = res.pageInfo
          } else {
            this.$Message.error(res.msg)
          }
        })
      },
      //验证选中
      verifySelected(){
        let _this = this,
          _selects = _this.selects,
          _orders = _this.orders
        this.selectAll = _selects.length == _orders.length ? true : false
      },
      //单选
      singleItemFun(tradeId){
        let _this = this,
          _exist = false,
          _selects = _this.selects
        for (let i = 0; i < _selects.length; i++) {
          let _item = _selects[i]
          if (_item == tradeId) {
            _selects.splice(i, 1)
            _exist = true
            break
          }
        }
        if (!_exist) {
          _selects.push(tradeId)
        }
        _this.getSelectedOrderAmount();
        _this.verifySelected()
      },
      //校验选中
      judgingSelected(tradeId){
        let _this = this,
          _isSelected = false,
          _selects = _this.selects
        for (let i = 0; i < _selects.length; i++) {
          let _item = _selects[i]
          if (_item == tradeId) {
            _isSelected = true
            break
          }
        }
        return _isSelected
      },
      //全选
      selectAllFun(){
        let _this = this,
          _selectAll = _this.selectAll,
          _orders = _this.orders,
          _selectArr = []
        if (_selectAll) {
          _this.selects = []
        } else {
          for (let i = 0; i < _orders.length; i++) {
            let _tradeId = _orders[i].tradeId
            _selectArr.push(_tradeId)
          }
          _this.selects = _selectArr
        }
        _this.selectAll = _selectAll ? false : true
        _this.getSelectedOrderAmount();
      },
      pageChange(num){
        this.pageInfo.index = (num - 1) * this.pageInfo.size
        this.getListData()
      },

      //弹出框
      confirm () {
        this.$Modal.confirm({
          title: '提示',
          content: '确定将选中的订单标记为已支付吗？',
          onOk: () => {
            this.modifyPayStatus();
          },
          onCancel: () => {
            //this.$Message.info('Clicked cancel');
          }
        });
      },
      //修改订单状态
      modifyPayStatus(){
        let _this=this,
          _selects=_this.selects;
        _this.modifying=true;
          _this.$post(serviceApi.monthlyOrderPay, {
            stationId:_this.stationId,
          customerId: _this.customerId,
            tradeIds:_selects||[]
        }).then(res => {
          if (res.code == 'SUCCESS') {
            _this.modifying=false;
            _this.$Message.success('修改成功');
            _this.getListData();
          } else {
            _this.modifying=false;
            _this.$Message.error(res.msg)
          }
        })
      },
      //修改订单状态按钮
      modifyPayStatusBtn(){
        let _this=this,
          _selects=_this.selects;
        if(_this.modifying){
          return false;
        }
        if(_selects.length<1){
          _this.$Message.error('请先选中您需要修改的订单')
          return false;
        }
        _this.confirm();
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
        let _this = this;
        _this.$get(serviceApi.monthlyOrderListExport, {
          customerId: _this.customerId,
          startDate: _this.startDate || '',
          endDate: _this.endDate || '',
          index: _this.pageInfo.index || 0,
          size: _this.pageInfo.size || 0
        }).then(res => {
          if (res.code == 'SUCCESS') {
            let _url = res.data.uri || res.data.url,
              _filename = _this.userName + '的月结账单'
            _this.funDownload(_url, _filename)
          } else {
            _this.$Message.error(res.msg)
          }
        })
      },
      //获取选中订单总金额
      getSelectedOrderAmount(){
        let _this=this,
          _amount=0,
          _selects=_this.selects,
          _orders = _this.orders;
        for(let i=0;i<_selects.length;i++){
          let _id=_selects[i];
          for (let x=0;x<_orders.length;x++){
            let _item=_orders[x];
            if(_item.tradeId==_id){
              _amount+=_item.amount/100;
              break;
            }
          }
        }
        this.selectedOrderAmount=_amount;
      },
      //获取欠款总额
      getOrderSumAmount(){
        let _this = this;
        _this.$get(serviceApi.monthlyOrderSumAmount, {
          customerId: _this.customerId
        }).then(res => {
          if (res.code == 'SUCCESS') {
            _this.sumAmount=res.data.sumAmount/100;
          } else {
            _this.$Message.error(res.msg)
          }
        })
      }
    }
  }
</script>
