<style type="text/scss" lang="scss" scoped>
  .breadCrumbs{border-bottom: 1px dashed #E7E8E7;}
  .stationList-title {
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
  .stationList-main{
    table{border-collapse: collapse; border-spacing: 0; width: 100%;
      a{color: #336699; padding: 0 10px;}
      a:hover{ color: #f60;}
    }
    th{padding: 13px 10px; line-height: 16px; font-size: 12px; color: #283949;background:#F7F8FC; border:1px solid #F1F2F1;}
    td{padding: 15px 10px; background: #fff;border:1px solid #F1F2F1; text-align: center; color: #283949; font-size: 12px; line-height: 22px; font-weight: 400;}
  }
  #editStation{
    width: 600px; margin-left: -300px; margin-top: -85px;
    ul{width: 100%;}
    li{padding-left: 60px; position: relative; min-height: 35px; margin-bottom: 20px;}
    h3{position: absolute; top: 0; left: 0; line-height: 35px; font-size: 12px; color: #333; font-weight: 400;}
    input[type='text']{ display:block; width: 100%; height: 35px; border:1px solid #E4E4E4; padding:0 10px; box-sizing: border-box;}
    .saveBtn{margin-left: 60px;}
  }
  #popUp-editStation{
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
    }/**/
  }
</style>
<template>
  <div class="mian">
    <div class="breadCrumbs"><span>公司管理</span> &gt; <span>添加网点</span></div>
    <div class="stationList-main">
      <div class="stationList-title">全部网点<a href="javascript:;" @click="openEditStationPop">添加网点</a></div>
      <table>
        <tr>
          <th >网点名称</th>
          <th width="330">添加时间</th>
          <th width="330">操作</th>
        </tr>
        <template v-if="stations.length>0">
          <tr v-for="item in stations">
            <td>{{item.name}}</td>
            <td>{{item.gmtCreate}}</td>
            <td>
              <!--<a href="javascript:;" @click="openEditStationPop(item.stationId,item.name)">编辑</a>-->
              <a href="javascript:;" @click="removeStation($event,item.stationId)">删除</a>
            </td>
          </tr>
          <!--<tr>
            <td colspan="6">
              <template>
                <Page :total="total" :current="currentPage" :page-size="pageSize"></Page>
              </template>
            </td>
          </tr>-->
        </template>
        <template v-else-if="stations!==''">
          <tr>
            <td colspan="10" class="table-noDate">
              没有找到任何网点，您可以<a href="javascript:;" @click="openEditStationPop">添加网点</a>
            </td>
          </tr>
        </template>
      </table>
    </div>
    <template v-if="isShowEditStation">
      <div class="popUp-bg"></div>
      <div class="popUp" id="popUp-editStation">
        <div class="popTitle">添加网点<span @click="closePop"></span></div>
        <div class="popBox">
          <ul class="editStation-main">
            <li><h3>网点名称:</h3><input type="text" v-model="editStation.name" placeholder="请输入网点名称"  /></li>
          </ul>
          <a class="saveBtn" href="javascript:;" @click="saveVehicle">{{isSaving?'保存中':'保存'}}</a>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
  import { getCookie, getLocalStorage, setLocalStorage } from '../../assets/js/common'
  import { serviceApi } from '../../assets/js/serviceApi'
  export default {
    mounted(){
      this.getListData()
    },
    data(){
      let _query=this.$router.history.current.query
      return {
        currentPage:_query.page?parseInt(_query.page):1,
        pageSize:20,
        total:100,
        stations:"",
        editStation:{
          'id':'',
          'name':''
        },
        isShowEditStation:false,
        isSaving:false
      }
    },
    methods: {
      getListData(){
        this.$get(serviceApi.stationList).then(res => {
          if (res.code == 'SUCCESS') {
            let _data = res.data
            this.stations = _data
            setLocalStorage('stationListData', _data);
          } else {
            this.$Message.error(res.msg)
          }
        }).catch(err => {
          this.$Message.error('获取数据失败，请刷新重试')
        })
      },
      search(){
        this.$router.push({
          path: this.$router.history.current.path,
          query: this.searchData
        })
      },
      closePop(){
        if (this.isSaving) {
          this.$Message.warning('正在执行其他操作，请稍后重试')
          return false
        }
        this.isShowEditStation=false
      },
      //删除车辆
      removeStation(e, id){
        let _element = e.target,
          _text = _element.innerHTML
        if (_text != '删除') {
          return false
        } else if (id == '') {
          this.$Message.warning('操作失败，没有所需id')
          return false
        }
        _element.innerHTML = '删除中'
        this.$post(serviceApi.delStation + '/' + id).then(res => {
          _element.innerHTML = '删除'
          if (res.code == 'SUCCESS') {
            this.$Message.success('删除成功')
            this.removeStationSuccess(id)
          } else {
            this.$Message.error(res.msg)
          }
        })
      },
      removeStationSuccess(id){
        let stations = this.stations
        for (let i = 0; i < stations.length; i++) {
          let _item = stations[i]
          if (_item.stationId == id) {
            stations.splice(i, 1)
            break
          }
        }
      },
      openEditStationPop(){
        this.isShowEditStation = true
      },
      //保存网点
      saveVehicle(){
        let _name=this.editStation.name||''
        if(_name==''){
          return false
        }
        this.isSaving = true
        this.$post(serviceApi.addStation, {
          'name': _name
        }).then(res => {
          this.isSaving = false
          if (res.code == 'SUCCESS') {
            this.$Message.success('添加成功')
            this.getListData()
            this.isShowEditStation = false
          } else {
            this.$Message.error(res.msg)
          }
        })
      },
    }
  }
</script>
