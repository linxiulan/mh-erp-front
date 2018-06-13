<style type="text/scss" lang="scss" scoped>
  .branchSiteAdd-title {
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

  .branchSiteAdd-main {
    background: #fff;
    padding: 20px;
    .title{
      font-size: 14px; color: #333;
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
    .branchSiteAdd-cost li{
      width: 360px; margin-top: 10px;
      padding-left: 200px;
      padding-right: 30px;
      box-sizing: border-box;
      border:1px solid #E4E4E4;
      position: relative;
      font-size: 14px;
      color: #333;
      line-height: 33px;
      label{ position: absolute; top: 0; left: 10px; }
      i{position: absolute;right: 10px; top: 0; font-style: normal;}
      input{ border: 0; text-align: right; display: block; width: 100%; height: 33px;}
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

  .saveBtn {
    display: block;
    width: 120px;
    height: 34px;
    line-height: 34px;
    text-align: center;
    border: 1px solid #949494;
    background: #949494;
    margin-right: 10px;
    font-size: 14px;
    color: #FFF;
    margin-top: 20px;
  }

  .saveBtn:hover {
    background: #57607C;
    color: #fff;
    border: 1px solid #57607C;
  }

</style>
<template>
  <div class="mian">
    <div class="breadCrumbs">
      <router-link :to="{ path: '/business' }">经营数据</router-link> &gt;
      <router-link :to="{ path: '/business/site' }">成本管理</router-link>
      >
      <span>添加成本</span></div>
    <div class="branchSiteAdd">
      <div class="branchSiteAdd-title">添加成本</div>
      <div class="branchSiteAdd-main" v-show="isShow">
        <div class="branchSiteAdd-branch">
          <span class="title">选择网点：</span><Select  v-model="stationId" style="width:280px" placeholder="请选择公司网点" clearable>
          <Option v-for="item in stationList" :value="item.stationId" :key="item.stationId">{{
            item.name }}
          </Option>
        </Select>
        </div>
        <div class="branchSiteAdd-date">
          <p class="title" style="margin-top: 20px">编辑的时间段：</p>
          <RadioGroup v-model="dateType">
            <Radio label="month">按月编辑</Radio>
            <Radio label="year">按年编辑</Radio>
          </RadioGroup>
          <div style="margin-top: 20px;">
            <DatePicker style="width:280px" :disabled="isSaving" :value="date" :type="dateType"
                        placeholder="请选择时间" @on-change="setAddPriceDate"></DatePicker>
          </div>
        </div>
        <div class="branchSiteAdd-cost">
          <p class="title" style="margin-top: 20px">设置对应的成本：</p>
          <p v-if="items.length<1">没有获取到任何成本项，请先添加成本项</p>
          <ul>
            <li v-for="(item,index) in items">
              <label>{{item.name}}：</label>
              <input type="text" placeholder="0.00" v-model="prices[index]" @keyup="inputKeyup">
              <i>元</i>
            </li>
          </ul>
        </div>
        <a class="saveBtn" href="javascript:;" @click="savePrices">{{isSaving?'保存中':'保存'}}</a>
      </div>
    </div>
  </div>
</template>
<script>
  import { serviceApi } from '../../assets/js/serviceApi'
  import { getNowDay, getLastMonthTime, getMonthDifference,getLocalStorage,setLocalStorage } from '../../assets/js/common'
  export default {
    mounted(){
      let _this=this;
      let _callback=function(){
        _this.isShow=true;
        _this.getExpendItems();
        };
      this.getStationList(_callback)
    },
    data(){
      return {
        isShow:false,
        stationId:'',
        stationList:'',
        items:'',
        dateType: 'month',  //month
        date: '',
        prices: [],
        isEdit: false,
        isSaving: false
      }
    },
    methods: {
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
      //获取成本项
      getExpendItems(){
        this.$get(serviceApi.addExpendItem).then(res => {
          if (res.code == 'SUCCESS') {
            let _data = res.data;
            this.items = _data
          } else {
            this.$Message.error(res.msg)
          }
        }).catch(err => {
          this.isLoading = false
          this.$Message.error('获取数据失败，请重试')
        })
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
      setAddPriceDate(date){
        this.date = date
      },
      savePrices(){
        let $date=this.date,
          $addPrice = this.prices,
          $costItems = this.items,
          stationId=this.stationId;
        if ($date == '') {
          this.$Message.warning('请选择时间')
          return false
        }
        let _prices = [],
          _params = '',
          dateType=this.dateType;
        for (let i = 0; i < $costItems.length; i++) {
          let item = $costItems[i],
            price = $addPrice[i]
          _prices.push({
            itemId: item.itemId,
            amount: price ? price * 100 : 0,
          })
        }
        if (dateType == 'year') {
          _params = $date.substr(0, 4)
        } else {
          _params = $date.substr(0, 4) + '/' + Number($date.substr(5, 2))
        }
        this.isSaving = true
        this.$post(serviceApi.addPrices + _params, {
          stationId:stationId,
          prices: _prices,
        }).then(res => {
          this.isSaving = false
          if (res.code == 'SUCCESS') {
            this.$Message.success('成本添加成功')
            this.$router.push('/business/site')
          } else {
            this.$Message.error(res.msg)
          }
        }).catch(err => {
          this.isSaving = false
          this.$Message.error('请求失败，请重试')
        })
      },
    }
  }
</script>
