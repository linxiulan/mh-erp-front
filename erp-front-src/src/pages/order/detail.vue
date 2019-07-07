<style type="text/scss" lang="scss" scoped>
  .breadCrumbs {
    border-bottom: 1px dashed #E7E8E7;
  }

  .orderDetail {
    background: #fff;
    padding-bottom: 30px;
  }

  .orderFollow {
    background: #fff;
    padding: 20px 20px 40px 20px;
  }

  .orderDetail-top {
    line-height: 55px;
    padding-left: 20px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    span {
      margin-right: 40px;
      font-weight: 600;
    }
  }

  .orderDetail-title {
    line-height: 20px;
    font-size: 14px;
    font-weight: 600;
    color: #333;
    margin-bottom: 10px;
  }

  .orderDetail-route {
    background: url("../../assets/transitionArrow.png") 45% 50%/64px 24px no-repeat;
    padding: 20px 40px 25px 40px;
    border-top: 1px dashed #E7E8E7;
    border-bottom: 1px dashed #E7E8E7;
    margin-bottom: 20px;
    li {
      width: 40%;
      padding-left: 40px;
      position: relative;
    }
    i {
      display: block;
      width: 24px;
      height: 24px;
      font-style: normal;
      background: #BBBCBB;
      border-radius: 24px;
      color: #fff;
      text-align: center;
      line-height: 24px;
      position: absolute;
      top: 0;
      left: 0;
    }
    p {
      font-size: 12px;
      line-height: 14px;
      color: #333;
    }
    .title {
      line-height: 24px;
      font-weight: 700;
      font-size: 16px;
      margin-bottom: 10px;
    }
  }

  .orderDetail-goods {
    padding: 0 20px;
    margin-bottom: 20px;
    table {
      border-collapse: collapse;
      border-spacing: 0;
    }
    th {
      padding: 9px 0;
      line-height: 22px;
      font-size: 12px;
      color: #333;
      background: #F5F6F5;
      border: 1px solid #F1F2F1;
    }
    td {
      padding: 9px 0;
      line-height: 22px;
      background: #fff;
      border: 1px solid #F1F2F1;
      text-align: center;
      color: #333;
      font-size: 12px;
      font-weight: 600;
    }
  }

  .orderDetail-cost {
    padding: 0 20px;
    margin-bottom: 20px;
    li {
      width: 48.5%;
      border: 1px solid #E5E6E5;
      padding: 10px 20px 20px 0;
      position: relative;
      min-height: 130px;
      vertical-align: top;
    }
    .status {
      display: inline-block;
      padding-left: 35px;
      line-height: 25px;
      position: relative;
      font-size: 12px;
      color: #339900;
      float: left;
      i {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 25px;
        height: 25px;
        border-radius: 0 25px 25px 0;
        background: #BBBCBB;
        color: #fff;
        line-height: 25px;
        text-align: center;
        font-size: 12px;
        font-style: normal;
      }
    }
    label {
      display: inline-block;
      padding: 0 5px;
      line-height: 18px;
      background: #BBBCBB;
      color: #fff;
    }
  }

  .costInventory {
    position: relative;
    float: right;
    p {
      font-size: 12px;
      font-weight: 400;
      line-height: 20px;
      width: 200px;
      padding-left: 50px;
      position: relative;
      text-align: right;
      color: #666;
      span {
        display: block;
        width: 65px;
        position: absolute;
        top: 0;
        left: 0;
      }
    }
    .cstatistics {
      margin-top: 10px;
      font-size: 14px;
      color: #333;
    }
  }

  .orderDetail-vehicle, .orderDetail-remark,.orderDetail-prove {
    margin-bottom: 20px;
    padding: 0 20px 0 60px;
    line-height: 20px;
    font-size: 12px;
    color: #666;
    position: relative;
    min-height: 20px;
    span {
      position: absolute;
      top: 0;
      left: 20px;
      font-size: 14px;
      color: #333;
      font-weight: 600;
    }
  }
  .orderDetail-prove{
    img{
      display: inline-block;
      max-width: 500px;
      max-height: 500px;
    }
  }

  .orderFollow-title {
    margin-bottom: 20px;
    line-height: 20px;
    font-size: 14px;
    font-weight: 600;
    color: #333;
  }

  .orderFollow {
    li {
      padding-left: 10px;
      padding-bottom: 10px;
      position: relative;
      &:after {
        content: "";
        display: block;
        width: 1px;
        height: 100%;
        background: #D6D7D6;
        position: absolute;
        top: 0;
        left: 4.5px;
        z-index: 1;
      }
      &:before {
        content: "";
        display: block;
        width: 10px;
        height: 10px;
        border-radius: 10px;
        background: #D6D7D6;
        position: absolute;
        top: 13px;
        left: 0px;
        z-index: 2;
      }
    }
    li:first-child {
      &:after {
        top: 13px;
      }
    }
    li:last-child {
      &:after {
        height: 14px;
      }
    }
    a {
      display: block;
      width: 95px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      border: 1px solid #D6D7D6;
      color: #666;
      background: #fff;
      font-size: 12px;
      color: #666666;
      margin: 10px 10px 0px 10px;
    }
    a:hover {
      background: #57607C;
      color: #fff;
      border: 1px solid #57607C;
    }
  }

  .orderFollow-list {
    position: relative;
    padding-left: 80px;
    span {
      display: block;
      width: 60px;
      position: absolute;
      top: 0;
      left: 10px;
      line-height: 18px;
      font-size: 12px;
      color: #999;
      font-weight: 400;
      text-align: center;
    }
    p {
      line-height: 18px;
      color: #999;
      font-size: 12px;
      font-weight: 400;
    }
  }

  #popUp-addRecord {
    width: 600px;
    margin-left: -300px;
    margin-top: -94px;
    textarea {
      display: block;
      width: 100%;
      min-height: 50px;
      line-height: 25px;
      padding: 0 5px;
      border: 1px solid #E3E4E3
    }
  }
</style>
<template>
  <div class="mian">
    <div class="breadCrumbs"><span>经营管理</span> &gt;
      <router-link to="/order/list">订单列表</router-link> &gt; <span>订单列表</span></div>
    <div class="mianTitle">订单详情</div>
    <div class="clearfix">
      <div class="fl w860 orderDetail">
        <div class="orderDetail-top">订单号：<span>{{tradeId}}</span>订单状态：<span>{{getOrderStatus(orderStatus)}}</span></div>
        <ul class="orderDetail-route clearfix">
          <li class="fl">
            <i>发</i>
            <p class="title">{{senderInfoStation.name}}</p>
            <p>{{senderInfo.name}}</p>
            <p>{{senderInfo.mobile}}</p>
          </li>
          <li class="fr">
            <i>收</i>
            <p class="title"> {{receiverInfoStation.name}}</p>
            <p>{{receiverInfo.name}}</p>
            <p>{{receiverInfo.mobile}}</p>
            <p>{{receiverInfo.address}}</p>
          </li>
        </ul>
        <div class="orderDetail-goods">
          <p class="orderDetail-title">货物信息</p>
          <table>
            <tr>
              <th width="135">类型</th>
              <th width="135">数量</th>
              <th width="135">单位</th>
            </tr>
            <tr v-for="item in detailData.items">
              <td>{{item.name}}</td>
              <td>{{item.count}}</td>
              <td>{{item.unit}}</td>
            </tr>
          </table>
        </div>
        <div class="orderDetail-cost">
          <p class="orderDetail-title">订单费用</p>
          <ul class="clearfix">
            <li class="fl">
              <div class="status">
                <i>发</i>{{detailData.payType=='BY_SENDER'?'已支付':''}}
              </div>
              <div class="costInventory" v-if="detailData.payType=='BY_SENDER'">
                <p><span>运费：</span>{{detailData.freightCharge/100}}元</p>
                <p v-for="item in detailData.prices"><span>{{item.name}}：</span>{{item.amount/100}}元</p>
                <p class="cstatistics"><span>合计：</span>{{statisticalFees(detailData.freightCharge,detailData.prices)}}元
                </p>
              </div>
            </li>
            <li class="fr">
              <div class="status">
                <i>收</i>未月结
                <label>{{detailData.receiverInfo?detailData.receiverInfo.monthly!=null?'月结':'':''}}</label>
              </div>

              <div class="costInventory">
                <template v-if="detailData.payType=='BY_RECEIVER'">
                  <p><span>运费：</span>{{detailData.freightCharge/100}}元</p>
                  <p v-for="item in detailData.prices"><span>{{item.name}}：</span>{{item.amount/100}}元</p>
                </template>
                <p><span>代收货款：</span>{{detailData.receivable/100}}元</p>
                <p class="cstatistics"><span>合计：</span>{{statisticalReceiverFees(detailData.freightCharge,detailData.prices,detailData.receivable)}}元
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div class="orderDetail-vehicle">
          <span>车辆：</span>{{detailData.car?detailData.car.plateNumber:''}}
        </div>
        <div class="orderDetail-remark">
          <span>备注：</span>{{detailData.remark}}
        </div>
        <div class="orderDetail-prove" v-if="detailData.sign">
          <span>证明：</span>
          <a :href="detailData.sign" target="_blank">
            <img alt="收货证明" :src="detailData.sign"/>
          </a>
        </div>
      </div>
      <div class="fr w300 orderFollow">
        <div class="orderFollow-title">订单跟进记录</div>
        <ul>
          <li v-for="traces in detailData.traces">
            <div class="orderFollow-list">
              <span>{{traces.gmtCreate}}</span>
              {{traces.content}}
              <p>{{traces.createUser}}</p>
            </div>
          </li>
        </ul>
        <a href="javascript:;" @click="openAddRecordPop">添加跟进记录</a>
      </div>
    </div>
    <template v-if="isShowAddRecordPop">
      <div class="popUp-bg"></div>
      <div class="popUp" id="popUp-addRecord">
        <div class="popTitle">添加跟进记录<span @click="closeAddRecordPop"></span></div>
        <div class="popBox">
          <textarea v-model="content"></textarea>
          <a class="saveBtn" href="javascript:;" @click="addRecord">{{isSaving?'保存中':'保存'}}</a>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
  import {trim} from '../../assets/js/common'
  import { serviceApi } from '../../assets/js/serviceApi'
  export default {
    mounted(){
      this.tradeId = this.$router.history.current.params.id
      this.getData()
    },
    data(){
      return {
        tradeId: '',
        orderStatus: '',
        senderInfo: '',
        senderInfoStation: '',
        receiverInfo: '',
        receiverInfoStation: '',
        detailData: '',
        isShowAddRecordPop: false,
        content:'',
        isSaving:false
      }
    },
    methods: {
      getData(){
        let _id = this.tradeId
        this.$get(serviceApi.getOrderDetail + _id).then(res => {
          if (res.code == 'SUCCESS') {
            let _data = res.data
            this.detailData = _data
            this.orderStatus = _data.orderStatus
            this.senderInfo = _data.senderInfo
            this.senderInfoStation = _data.senderInfo.station
            this.receiverInfo = _data.receiverInfo
            this.receiverInfoStation = _data.receiverInfo.station
          } else {
            this.$Message.error(res.msg)
          }
        })
      },
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
      //统计费用
      statisticalFees(freightCharge, prices){
        let _num = 0
        if (prices != null) {
          for (let i = 0; i < prices.length; i++) {
            let _amount = prices[i].amount
            _num += Number(_amount)
          }
        }
        if (freightCharge != null) {
          _num += Number(freightCharge)
        }
        return _num / 100
      },
      statisticalReceiverFees(freightCharge, prices, receivable){
        let _num = 0
        if (freightCharge != null && this.detailData.payType != 'BY_SENDER') {
          _num += Number(freightCharge)
        }
        if (prices != null) {
          for (let i = 0; i < prices.length; i++) {
            if (prices[i].payType != 'BY_SENDER') {
              let _amount = prices[i].amount
              _num += Number(_amount)
            }
          }
        }
        if (receivable) {
          _num += Number(receivable)
        }

        return _num / 100
      },
      openAddRecordPop(){
        this.content='';
        this.isShowAddRecordPop = true
      },
      closeAddRecordPop(){
        this.isShowAddRecordPop = false
      },
      addRecord(){
        let _this=this,
          _content = trim(_this.content);
        if (_this.isSaving) {
          return false
        }
        if (_content == '') {
          this.$Message.warning('请输入跟进记录')
          return false
        }
        _this.isSaving = true
        _this.$post(serviceApi.addOrderTrace+'/'+_this.tradeId, {
          'content': _content
        }).then(res => {
          _this.isSaving = false;
          if (res.code == 'SUCCESS') {
            _this.$Message.success('添加成功')
            _this.getData()
            _this.isShowAddRecordPop = false
          } else {
            _this.$Message.error(res.msg)
          }
        })
      }
    }
  }
</script>
