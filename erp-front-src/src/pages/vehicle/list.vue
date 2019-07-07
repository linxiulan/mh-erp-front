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
    margin-top: -85px;
    ul {
      width: 100%;
    }
    li {
      padding-left: 60px;
      position: relative;
      min-height: 35px;
      margin-bottom: 20px;
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
    <div class="breadCrumbs"><span>公司管理</span> &gt; <span>车辆列表</span></div>
    <div class="searchMain">
      <ul class="searchList clearfix">
        <li>
          <span class="title">车牌查询：</span>
          <input type="text" placeholder="请输入关键字" v-model="searchData.licensePlate"/>
        </li>
        <!--<li style="padding:8px 0px 8px 74px;">
          <span class="title">车辆状态：</span>
          <RadioGroup v-model="searchData.vehicleStatus">
            <Radio label='0'><span>全部</span></Radio>
            <Radio label='1'><span>待装车</span></Radio>
            <Radio label='2'><span>运送中</span></Radio>
          </RadioGroup>
        </li>-->
      </ul>
      <div class="searchBtn clearfix">
        <a class="searchBtn-left" href="javascript:;" @click="search">搜索</a>
      </div>
    </div>
    <div class="vehicleList-main">
      <div class="vehicleList-title">所有车辆<a href="javascript:;" @click="openEditVehiclePop()">添加车辆</a></div>
      <table>
        <tr>
          <th width="300">车牌号</th>
          <th width="300">添加时间</th>
          <th>操作</th>
        </tr>
        <template v-if="vehicles.length>0">
          <tr v-for="item in vehicles">
            <td>{{item.plateNumber}}</td>
            <td>{{item.gmtCreate}}</td>
            <td>
              <a href="javascript:;" @click="openQRCode">二维码</a>
              <!--<a href="javascript:;" @click="openEditVehiclePop(item.carId,item.plateNumber)">编辑</a>-->
              <a href="javascript:;" @click="removeVehicle($event,item.carId)">删除</a>
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
        <template v-else-if="vehicles!==''">
          <tr>
            <td colspan="10" class="table-noDate">
              没有找到任何车辆，您可以<a href="javascript:;" @click="openEditVehiclePop()">添加车辆</a>
            </td>
          </tr>
        </template>
      </table>
    </div>
    <template v-if="isShowEditVehiclePop">
      <div class="popUp-bg"></div>
      <div class="popUp" id="popUp-editVehicle">
        <div class="popTitle">编辑车辆资料<span @click="closePop"></span></div>
        <div class="popBox">
          <ul class="editBranch-main">
            <li><h3>车牌号码:</h3><input type="text" v-model="editVehicleData.licensePlate" placeholder="请输入车牌号码"/></li>
          </ul>
          <a class="saveBtn" href="javascript:;" @click="verificationVehicle">{{isSaving?'保存中':'保存'}}</a>
        </div>
      </div>
    </template>
    <template v-if="isShowVehicleQRCodePop">
      <div class="popUp-bg"></div>
      <div class="popUp" id="popUp-vehicleQRCode">
        <div class="popTitle">车辆二维码<span @click="closePop"></span></div>
        <div class="popBox">
          <p>打印车辆二维码，贴在车身上</p>
          <img :src="vehicleQRCode"/>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
  import { setCookie, getCookie, trim, verificationPlateNumber } from '../../assets/js/common'
  import { serviceApi } from '../../assets/js/serviceApi'
  export default {
    mounted(){
      this.getCarList()
    },
    data(){
      let _query = this.$router.history.current.query
      return {
        searchData: {
          'licensePlate': _query.licensePlate || '',
          //'vehicleStatus':_query.vehicleStatus||'',
          //'page':_query.page?parseInt(_query.page):1
        },
        vehiclesData: {},
        vehicles: '',
        //pageSize:20,
        //total:100,
        editVehicleData: {
          id: '',
          licensePlate: '粤A40462'
        },
        vehicleQRCode: 'http://oa.tgnet.com/Images/code.png',
        isShowEditVehiclePop: false,
        isShowVehicleQRCodePop: false,
        isSaving: false
      }
    },
    methods: {
      getCarList(){
        this.$get(serviceApi.carList).then(res => {
          if (res.code == 'SUCCESS') {
            this.vehicles = res.data
            this.vehiclesData = res.data
          } else {
            this.$Message.error(res.msg)
          }
        }).catch(err => {
          this.$Message.error('获取数据失败，请刷新重试')
        })
      },
      search(){
        let keyWord = this.searchData.licensePlate,
          vehiclesData = this.vehiclesData,
          reg = new RegExp(keyWord, 'i'),
          arr = []
        if (keyWord == '') {
          this.vehicles = vehiclesData
          return false
        }
        for (var i = 0; i < vehiclesData.length; i++) {
          //如果字符串中不包含目标字符会返回-1
          if (vehiclesData[i].plateNumber.match(reg)) {
            arr.push(vehiclesData[i])
          }
        }
        this.vehicles = arr
      },
      openEditVehiclePop(id, licensePlate){
        this.editVehicleData = {
          id: id || '',
          licensePlate: licensePlate || ''
        }
        this.isShowEditVehiclePop = true
      },
      closePop(){
        if (this.isSaving) {
          this.$Message.warning('正在执行其他操作，请稍后重试')
          return false
        }
        this.isShowEditVehiclePop = false
        this.isShowVehicleQRCodePop = false
      },
      //删除车辆
      removeVehicle(e, id){
        let _element = e.target,
          _text = _element.innerHTML
        if (_text != '删除') {
          return false
        } else if (id == '') {
          this.$Message.warning('操作失败，没有所需id')
          return false
        }
        _element.innerHTML = '删除中'
        this.$post(serviceApi.delCar + '/' + id).then(res => {
          _element.innerHTML = '删除'
          if (res.code == 'SUCCESS') {
            this.$Message.success('删除成功')
            this.removeVehicleSuccess(id)
          } else {
            this.$Message.error(res.msg)
          }
        })
      },
      removeVehicleSuccess(id){
        let vehicles = this.vehicles,
          vehicleData = this.vehiclesData
        for (let i = 0; i < vehicles.length; i++) {
          let _item = vehicles[i]
          if (_item.carId == id) {
            vehicles.splice(i, 1)
            break
          }
        }
        for (let x = 0; x < vehicleData.length; x++) {
          let _item = vehicleData[x]
          if (_item.carId == id) {
            vehicleData.splice(x, 1)
            break
          }
        }
      },
      //验证添加/编辑车辆信息
      verificationVehicle(){
        if (this.isSaving) {
          return false
        } else {
          let _vehicle = this.editVehicleData,
            _licensePlate = _vehicle.licensePlate ? trim(_vehicle.licensePlate) : ''
          if (_licensePlate == '') {
            this.$Message.warning('车牌号码不能为空')
            return false
          } else if (!verificationPlateNumber(_licensePlate)) {
            this.$Message.warning('请输入正确的车牌号码')
            return false
          }
          this.saveVehicle(_licensePlate)
        }
      },
      //保存车辆
      saveVehicle(licensePlate){
        let _this=this;
        _this.isSaving = true
        _this.$post(serviceApi.addCar, {
          'plateNumber': licensePlate
        }).then(res => {
          _this.isSaving = false;
          if (res.code == 'SUCCESS') {
            _this.$Message.success('添加成功')
            _this.getCarList()
            _this.isShowEditVehiclePop = false
          } else {
            _this.$Message.error(res.msg)
          }
        })
      },
      //编辑车辆
      editVehicle(){

      },
      //打开二维码
      openQRCode(){
        alert("暂无次功能")
      }
    }
  }
</script>
