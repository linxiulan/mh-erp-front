<style type="text/scss" lang="scss" scoped>
  .branchSiteItem-title {
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

  .branchSiteItem-list {
    background: #fff;
    padding: 20px;
    p {
      font-size: 14px;
      color: #333;
      font-weight: 400;
    }
    li {
      margin-top: 10px;
      width: 30%;
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
    .saveBtn {
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
    <div class="breadCrumbs">
      <router-link :to="{ path: '/business' }">经营数据</router-link> &gt;
      <router-link :to="{ path: '/business/site' }">成本管理</router-link>
      >
      <span>添加成本项</span></div>
    <div class="branchSiteItem-main">
      <div class="branchSiteItem-title">全部成本</div>
      <div class="branchSiteItem-list">
        <p>设置需要记录成本的项目：</p>
        <ul>
          <li v-for="(item,key) in items"><input type="text" v-model="items[key].name"><a
            href="javascript:;" @click="operateMobile(key)"></a></li>
        </ul>
        <a class="saveBtn" href="javascript:;" @click="saveCostItems">{{isSaving?'保存中':'保存'}}</a>
      </div>
    </div>
    <!--添加成本项-->
  </div>
</template>
<script>
  import { serviceApi } from '../../assets/js/serviceApi'
  import { getNowDay, getLastMonthTime, getMonthDifference } from '../../assets/js/common'
  export default {
    mounted(){
      this.getExpendItems()
    },
    data(){
      return {
        items: '',
        isSaving: false
      }
    },
    methods: {
      //获取成本项
      getExpendItems(){
        this.$get(serviceApi.addExpendItem).then(res => {
          if (res.code == 'SUCCESS') {
            let _data = res.data;
            if(_data.length<1){
              _data.push({
                name:'',
                itemId:''
              })
            }
            this.items = _data
          } else {
            this.$Message.error(res.msg)
          }
        }).catch(err => {
          this.isLoading = false
          this.$Message.error('获取数据失败，请重试')
        })
      },
      operateMobile(key){
        let _data = this.items,
          _len = _data.length,
          _num = key + 1
        if (_num == _len) {
          this.items.push({
            name:'',
            itemId:''
          })
        } else {
          this.items.splice(key, 1)
        }
      },
      //保存成本项
      saveCostItems(){
        let _data = this.items,
          _names = []
        for (let i = 0; i < _data.length; i++) {
          let item = _data[i],
            _name=item.name;
          if (_name != '') {
            _names.push(_name)
          }
        }
        if (_names.length < 1) {
          this.$Message.warning('请输入成本项,再保存')
          return false
        }
        this.isSaving = true
        this.$post(serviceApi.addExpendItem, {
          names: _names
        }).then(res => {
          this.isSaving = false
          if (res.code == 'SUCCESS') {
            this.getExpendItems()
            this.$Message.success('成本项修改成功')
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
