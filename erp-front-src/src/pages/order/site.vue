<style type="text/scss" lang="scss" scoped>
  .breadCrumbs {
    border-bottom: 1px dashed #E7E8E7;
  }

  .orderSite-title {
    padding: 15px 0px 5px 0px;
    font-size: 16px;
    line-height: 34px;
    color: #6F7B91;
  }

  .orderSite-listTitle {
    font-size: 14px;
    font-weight: 600;
    color: #333;
    margin-bottom: 10px;
  }

  .orderSite-list {
    padding: 20px;
    background: #fff;
    .addBtn {
      display: block;
      width: 120px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      font-size: 12px;
      background: #949494;
      border: 1px solid #949494;
      color: #fff;
      margin-right: 10px;
    }
    .addBtn:hover {
      background: #57607C;
      color: #fff;
      border: 1px solid #57607C;
    }
  }

  .orderSite-toll {
    label {
      display: block;
      padding: 0 20px;
      height: 30px;
      line-height: 30px;
      border: 1px solid #D6D7D6;
      margin-bottom: 10px;
      margin-right: 10px;
      float: left;
      min-width: 87px;
      font-size: 12px;
      font-weight: 400;
      color: #333;
      text-align: center;
      position: relative;
    }
    i {
      display: block;
      width: 14px;
      height: 14px;
      position: absolute;
      top: -7px;
      right: -7px;
      background: url("../../assets/delete-icon.png") 50% 50%/100% 100% no-repeat;
      cursor: pointer;
    }
  }

  #popUp-addDirectory {
    width: 600px;
    margin-left: -300px;
    margin-top: -100px;
    ul {
      width: 100%;
    }
    li {
      position: relative;
      min-height: 35px;
      margin-bottom: 20px;
    }
    p {
      line-height: 18px;
      font-size: 12px;
      font-weight: 400;
      color: #333;
      margin-bottom: 10px;
    }
    input[type='text'] {
      display: block;
      width: 100%;
      height: 35px;
      border: 1px solid #E4E4E4;
      padding: 0 10px;
      box-sizing: border-box;
    }
    //.saveBtn{margin-left: 60px;}
  }
</style>
<template>
  <div class="mian">
    <div class="breadCrumbs"><span>公司管理</span> &gt; <span>设置</span></div>
    <div class="orderSite-main">
      <div class="orderSite-title">设置</div>
      <div class="orderSite-list">
        <div class="orderSite-listTitle">订单收费的项目设置</div>
        <div class="orderSite-toll">
          <div class="fixed clearfix">
            <label v-for="item in fixedDirectorys">{{item}}</label>
          </div>
          <div class="customize clearfix">
            <label v-for="(itme,index) in customizeDirectorys">
              {{itme.name}}
              <i @click="deleteFeeItem(itme.pcId)"></i>
            </label>
          </div>
          <a class="addBtn" href="javascript:;" @click="openAddDirectoryPop">添加收费项目</a>
        </div>
      </div>
    </div>
    <template v-if="isShowAddDirectoryPop">
      <div class="popUp-bg"></div>
      <div class="popUp" id="popUp-addDirectory">
        <div class="popTitle">添加收费名目<span @click="closePop"></span></div>
        <div class="popBox">
          <p>不同项之间用顿号"、"隔开</p>
          <ul class="addDirectory-main">
            <li><input type="text" v-model="addDirectory" placeholder="请输入收费名目"/></li>
          </ul>
          <a class="saveBtn" href="javascript:;" @click="verificationFeeItem">{{isSaving?'添加中':'添加'}}</a>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
  import { serviceApi } from '../../assets/js/serviceApi'
  import { arrayMerging, trim } from '../../assets/js/common'
  export default {
    mounted(){
      this.getListData()
    },
    data(){
      return {
        fixedDirectorys: ['运费'],
        customizeDirectorys: '',
        addDirectory: '',
        requestAddItemNum: 0,
        isShowAddDirectoryPop: false,
        isSaving: false
      }
    },
    methods: {
      getListData(){
        this.$get(serviceApi.getPriceList).then(res => {
          if (res.code == 'SUCCESS') {
            this.customizeDirectorys = res.data
          } else {
            this.$Message.error(res.msg)
          }
        }).catch(err => {
          this.$Message.error('获取数据失败，请刷新重试')
        })
      },
      openAddDirectoryPop(){
        this.isShowAddDirectoryPop = true
        this.addDirectory = ''
      },
      deleteDirectory(index){
        let $customizeDirectorys = this.customizeDirectorys
        $customizeDirectorys.splice(index, 1)
        let _names = []
        for (let i = 0; i < $customizeDirectorys.length; i++) {
          _names.push($customizeDirectorys[i].name)
        }
        this.operateExpendItem(_names, 'del')
      },
      closePop(){
        if (this.isSaving) {
          this.$Message.warning('正在执行其他操作，请稍后重试')
          return false
        }
        this.isShowAddDirectoryPop = false
      },
      verificationFeeItem(){
        let _addDirectory = trim(this.addDirectory)
        if (_addDirectory == '') {
          this.$Message.warning('请先输入收费名目')
          return false
        }
        let addDirectoryArr = _addDirectory.split('、'),
          arr = [],
          _customizeDirectorys = this.customizeDirectorys
        for (let i = 0; i < addDirectoryArr.length; i++) {
          let item = addDirectoryArr[i],
            isExist = false
          for (let k = 0; k < _customizeDirectorys.length; k++) {
            let k_item = _customizeDirectorys[i].name
            if (k_item == item) {
              isExist = true
              break
            }
          }
          if (!isExist) {
            arr.push(item)
          }
        }
        this.saveFeeItem(arr)
      },
      saveFeeItem(items){
        let _len = items.length
        if (_len < 1) {
          this.$Message.success('添加成功')
          this.isShowAddDirectoryPop = false
          return false
        }
        this.requestAddItemNum = _len
        this.isSaving = true
        for (let i = 0; i < _len; i++) {
          let _name = items[i]
          this.$post(serviceApi.addPriceItem, {
            name: _name,
            sortNum: 4
          }).then(res => {
            if (res.code == 'SUCCESS') {
              this.saveFeeItemPerfection()
              this.$Message.success('项目"' + _name + '"添加成功')
            } else {
              this.saveFeeItemPerfection()
              this.$Message.error('项目"' + _name + '"添加失败，原因:' + res.msg)
            }
          }).catch(err => {
            this.saveFeeItemPerfection()
            this.$Message.error('项目"' + _name + '"添加失败')
          })
        }
      },
      saveFeeItemPerfection(){
        let _num = this.requestAddItemNum
        _num -= 1
        this.requestAddItemNum = _num
        if (_num == 0) {
          this.isSaving = false
          this.isShowAddDirectoryPop = false
          this.getListData()
        }
      },
      deleteFeeItem(id){
        let _id = id
        if (_id == '') {
          this.$Message.warning('该收费项可能不存在，请重新刷新界面')
          return false
        }
        let _customizeDirectorys = this.customizeDirectorys
        for (let i = 0; i < _customizeDirectorys.length; i++) {
          let itme = _customizeDirectorys[i]
          if (itme.pcId == _id) {
            _customizeDirectorys.splice(i, 1)
            this.$post(serviceApi.delPriceItem + _id).then(res => {
              this.getListData()
              if (res.code == 'SUCCESS') {
                this.$Message.success('删除成功')
              } else {
                this.$Message.error(res.msg)
              }
            }).catch(err => {
              this.getListData()
              this.$Message.error('请求失败，请重试')
            })
            break
          }
        }
      }
    }
  }
</script>
