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
    <div class="breadCrumbs"><span>经营管理</span> &gt; <span>趋势分析</span></div>
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
          <TabPane label="下单人次" name="name1">
            <div class="branchIndex-incomeReports">
              <div ref="peopleReports" style="width: 100%; height: 100%;"></div>
            </div>
          </TabPane>
          <TabPane label="客户分析" name="name2">
            <div class="branchIndex-incomeReports">
              <div ref="clientReports" style="width: 100%; height: 100%;"></div>
            </div>
          </TabPane>
        </Tabs>
      </template>


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
      peopleReports(_date, _count){
        let peopleReports = echarts.init(this.$refs.peopleReports)
        peopleReports.setOption({
          title: {
            text: '下单人次',
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
              //smooth: true,
              symbolSize: 8,   //拐点圆的大小
              color: '#477BFB',  //折线条的颜色
              itemStyle: {
                /*normal: {
                 areaStyle: {
                 color: '#E4F1FD',
                 type: 'default',
                 }
                 }*/
              },
              data: _count
            }
          ]
        })
      },
      clientReports(_date, _newData, _active){
        let clientReports = echarts.init(this.$refs.clientReports)
        clientReports.setOption({
          title: {
            text: '新客户/活跃客户',
            textStyle: {
              fontSize: 14,
              color: '#333'
            }
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['新客户', '活跃客户'],
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
              name: '新客户',
              type: 'line',
              //smooth: true,
              symbolSize: 8,   //拐点圆的大小
              color: '#A781FA',  //折线条的颜色
              itemStyle: {
                /*normal: {
                 areaStyle: {
                 type: 'default',
                 }
                 }*/
              },
              data: _newData
            },
            {
              name: '活跃客户',
              type: 'line',
              //smooth: true,
              symbolSize: 8,   //拐点圆的大小
              color: '#3D74FB',  //折线条的颜色
              itemStyle: {
                /*normal: {
                 areaStyle: {
                 type: 'default',
                 }
                 }*/
              },
              data: _active
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
        this.searchOrder(_minDate, _maxDate)
        this.serchClient(_minDate, _maxDate)
      },
      searchOrder(_minDate, _maxDate){
        this.$get(serviceApi.countOrdersData, {
          minDate: _minDate,
          maxDate: _maxDate
        }).then(res => {
          this.isLoading = false
          if (res.code == 'SUCCESS') {
            this.searchOrderSuccess(res.data)
          } else {
            this.$Message.error(res.msg)
          }
        }).catch(err => {
          this.isLoading = false
          this.$Message.error('获取下单人次数据失败，请重试')
        })
      },
      serchClient(_minDate, _maxDate){
        this.$get(serviceApi.countClientsData, {
          minDate: _minDate,
          maxDate: _maxDate
        }).then(res => {
          this.isLoading = false
          if (res.code == 'SUCCESS') {
            this.serchClientSuccess(res.data)
          } else {
            this.$Message.error(res.msg)
          }
        }).catch(err => {
          this.isLoading = false
          this.$Message.error('获取客户分析数据失败，请重试')
        })
      },
      searchOrderSuccess(_data){
        let _date = [],
          _count = []
        for (let i = 0; i < _data.length; i++) {
          let item = _data[i]
          _date.push(item.date.substr(0, 10))
          _count.push(item.personTime)
        }
        this.peopleReports(_date, _count)
      },
      serchClientSuccess(_data){
        let _date = [],
          _newData = [],
          _active = []
        for (let i = 0; i < _data.length; i++) {
          let item = _data[i]
          _date.push(item.date.substr(0, 10))
          _newData.push(item.newPersonCount)
          _active.push(item.activePersonCount)
        }
        this.clientReports(_date, _newData, _active)
      }
    }
  }
</script>
