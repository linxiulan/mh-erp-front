<style type="text/scss" lang="scss" scoped>
  .branchIndex-title {
    padding: 15px 0px 5px 0px;
    font-size: 16px;
    height: 52px;
    line-height: 32px;
    color: #6F7B91;
    margin-bottom: 20px;
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
      overflow: hidden;
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
      width: 580px;
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
        <a class="determineBtn" href="javascript:;" @click="search($event)">{{isLoading?'查询中':'查询'}}</a>
      </div>
      <div class="branchIndex-statistical">
        <ul class="clearfix">
          <li>
            <p>总净利润</p>
            <span><em>{{netProfitTotal}}</em><i>元</i></span>
          </li>
          <li>
            <p>总下单金额</p>
            <span><em>{{amountTotal}}</em><i>元</i></span>
          </li>
          <li>
            <p>总订单数</p>
            <span><em>{{orderTotal}}</em><i>次</i></span>
          </li>
          <li>
            <p>总货物件数</p>
            <span><em>{{itemTotal}}</em><i>件</i></span>
          </li>
        </ul>
      </div>
      <div class="branchIndex-incomeReports">
        <div ref="incomeReports" style="width: 100%; height: 100%;"></div>
      </div>
      <div class="branchIndex-incomeReports">
        <div ref="ordersReports" style="width: 100%; height: 100%;"></div>
      </div>
      <div class="branchIndex-incomeReports">
        <div ref="goodsReports" style="width: 100%; height: 100%;"></div>
      </div>
      <div class="clearfix">
      </div>
    </div>
  </div>
</template>
<script>
  import { serviceApi } from '../../assets/js/serviceApi'
  import { getTimeDifference, getNowDay, getLastMonthTime } from '../../assets/js/common'
  let echarts = require('echarts')
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
        itemTotal: 0,
        orderTotal: 0,
        netProfitTotal: 0,
        amountTotal: 0,
        isLoading: false
      }
    },
    methods: {
      setMinDate(date){
        this.searchData.minDate = date
      },
      setMaxDate(date){
        this.searchData.maxDate = date
      },
      incomeReport(_date, _sumAmount, _profits){
        let incomeReports = echarts.init(this.$refs.incomeReports)
        incomeReports.setOption({
          title: {
            text: '收入统计',
            textStyle: {
              fontSize: 14,
              color: '#333'
            }
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['净利润', '下单金额'],
            x: 'right'

          },
          grid: {
            left: '0%',   //图表距边框的距离
            right: '3%',
            bottom: '0%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: _date,
            scale: true,
            //坐标轴颜色
            axisLine: {
              lineStyle: {
                color: '#D7D7D7'
              }
            },
            axisTick: {
              show: false
            },
            //x轴文字旋转
            axisLabel: {
              //rotate:30,
              //interval: 0,
              margin: 20,
              textStyle: {
                color: '#333'
              }
            },
          },
          yAxis: {
            type: 'value',
            splitLine: {
              lineStyle: {
                color: ['#d7d7d7'],
                width: 1,
                type: 'dashed'
              }
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#666666',
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              formatter: '{value}/元',
              textStyle: {
                color: '#333'
              }
            }
          },
          series: [
            //虚线
            {
              name: '下单金额',
              type: 'line',
              symbolSize: 8,   //拐点圆的大小
              color: '#386FFE',  //折线条的颜色
              smooth: false,   //关键点，为true是不支持虚线的，实线就用true
              itemStyle: {
                normal: {
                  lineStyle: {
                    width: 2,
                    //type:'dotted'  //'dotted'虚线 'solid'实线
                  }
                }
              },
              data: _sumAmount
            },
            //实线
            {
              name: '净利润',
              type: 'line',
              symbol: 'circle',
              symbolSize: 8,   //拐点圆的大小
              color: '#8B58F0',
              itemStyle: {
                normal: {
                  lineStyle: {
                    width: 2,
                    //type:'dotted'  //'dotted'虚线 'solid'实线
                  }
                }
              },
              data: _profits
            }
          ]
        })
      },
      ordersReports(_date, _orderCount){
        let ordersReports = echarts.init(this.$refs.ordersReports)
        ordersReports.setOption({
          title: {
            text: '订单数',
            textStyle: {
              fontSize: 14,
              color: '#333'
            }
          },
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            left: '0%',   //图表距边框的距离
            right: '3%',
            bottom: '0%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: _date,
            //坐标轴颜色
            axisLine: {
              lineStyle: {
                color: '#D7D7D7'
              }
            },
            axisTick: {
              show: false
            },
            //x轴文字旋转
            axisLabel: {
              //interval: 0,
              margin: 20,
              textStyle: {
                color: '#333'
              }
            },
          },
          yAxis: {
            type: 'value',
            splitLine: {
              lineStyle: {
                color: ['#d7d7d7'],
                width: 1,
                type: 'dashed'
              }
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#f60',
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              formatter: '{value}',
              textStyle: {
                color: '#333'
              }
            }
          },
          series: [
            //虚线
            {
              name: '下单人次',
              type: 'line',
              //smooth: true,
              symbolSize: 8,
              color: '#4FA8F8',  //折线条的颜色
              itemStyle: {
                /*normal: {
                 areaStyle: {
                 color: '#E4F1FD',
                 type: 'default',
                 }
                 }*/
              },
              data: _orderCount
            }
          ]
        })
      },
      goodsReports(_date, _itemCount){
        let goodsReports = echarts.init(this.$refs.goodsReports)
        goodsReports.setOption({
          title: {
            text: '货物件数',
            textStyle: {
              fontSize: 14,
              color: '#333'
            }
          },
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            left: '0%',   //图表距边框的距离
            right: '3%',
            bottom: '0%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: _date,
            //坐标轴颜色
            axisLine: {
              lineStyle: {
                color: '#D7D7D7'
              }
            },
            axisTick: {
              show: false
            },
            //x轴文字旋转
            axisLabel: {
              //interval: 0,
              margin: 20,
              textStyle: {
                color: '#333'
              }
            },
          },
          yAxis: {
            type: 'value',
            splitLine: {
              lineStyle: {
                color: ['#d7d7d7'],
                width: 1,
                type: 'dashed'
              }
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#666666',
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              formatter: '{value}',
              textStyle: {
                color: '#333'
              }
            }
          },
          series: [
            //虚线
            {
              name: '下单人次',
              type: 'line',
              symbolSize: 8,
              //smooth: true,
              color: '#4FA8F8',  //折线条的颜色
              itemStyle: {
                /*normal: {
                 areaStyle: {
                 color: '#E4F1FD',
                 type: 'default',
                 }
                 }*/
              },
              data: _itemCount
            }
          ]
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
        this.$get(serviceApi.countBusinessData, {
          minDate: _minDate,
          maxDate: _maxDate
        }).then(res => {
          this.isLoading = false
          if (res.code == 'SUCCESS') {
            this.searchSuccess(res.data)
          } else {
            this.$Message.error(res.msg)
          }
        }).catch(err => {
          this.isLoading = false
          this.$Message.error('获取数据失败，请重试')
        })
      },
      searchSuccess(_data){
        let _date = [],
          _itemCount = [],
          _orderCount = [],
          _profits = [],
          _sumAmount = [],
          _itemTotal = 0,
          _orderTotal = 0,
          _netProfitTotal = 0,
          _amountTotal = 0
        for (let i = 0; i < _data.length; i++) {
          let item = _data[i]
          _date.push(item.date.substr(0, 10))
          _itemCount.push(item.itemCount)   //货物件数
          _orderCount.push(item.orderCount) //订单数
          _profits.push(item.profits/100)       //净利润
          _sumAmount.push(item.sumAmount/100)   //下单金额
          _itemTotal += item.itemCount
          _orderTotal += item.orderCount
          _netProfitTotal += item.profits/100
          _amountTotal += item.sumAmount/100
        }
        this.itemTotal = _itemTotal
        this.orderTotal = _orderTotal
        this.netProfitTotal = _netProfitTotal.toFixed(2)
        this.amountTotal = _amountTotal.toFixed(2)
        this.incomeReport(_date, _sumAmount, _profits)
        this.ordersReports(_date, _orderCount)
        this.goodsReports(_date, _itemCount)
      }
    }
  }
</script>
