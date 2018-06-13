<style type="text/scss" lang="scss" scoped>
.leftNavList{
  width: 200px; background: #fff;position:fixed;height: 100%;top:0px; left:0;box-shadow: 2px 0px 3px rgba(188, 188, 188, 0.2); z-index: 1;padding-top: 60px; box-sizing: border-box;overflow-y: auto;
  ul{ width: 100%; border-bottom: 1px solid #F2F2F2;}
  p{ font-size: 16px; font-weight: 700; height: 60px; line-height: 60px; color: #333; padding-left: 60px;position: relative}
  i{display: block; width: 22px; height: 22px; position: absolute;top:50%; left: 28px;margin-top: -11px;}
  .business-icon{ background: url("../assets/business-icon.png") 50% 50%/100% 100% no-repeat;}
  .company-icon{ background: url("../assets/company-icon.png") 50% 50%/100% 100% no-repeat;}
  a{display:block; height: 40px; line-height: 40px;padding-left: 60px; border-right:4px solid #fff; color: #333; font-weight: 400;}
  a:hover{ background: rgba(240, 242, 247, 1); border-right: 4px solid #A2AECD; color: #57607C;}
  .current{background: rgba(240, 242, 247, 1); border-right: 4px solid #A2AECD; color: #57607C;}
}
</style>
<template lang="html">
  <div class="leftNavList" v-show="isShow">
    <ul v-for="menu in menus">
      <li>
        <p><i :class="menu.icon"></i>{{menu.title}}</p>
      </li>
      <li v-for="item in menu.items" >
        <router-link :to="item.router" active-class="current" :exact="item.isStrict">{{item.title}}</router-link>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    mounted(){
      if(this.$router.history.current.name!=='login'){
        this.isShow=true;
      }
    },
    data () {
      let menus=[
        {
          title:'经营管理',
          icon:'business-icon',
          items:[
            {
              title:'经营概况',
              name:'business',
              router:'/business',
              isStrict:true
            },
            {
              title:'趋势分析',
              name:'trendAnalysis',
              router:'/business/trendAnalysis',
              isStrict:false
            },
            {
              title:'排行分析',
              name:'rankingAnalysis',
              router:'/business/rankingAnalysis',
              isStrict:false
            },
            {
              title:'成本管理',
              name:'business',
              router:'/business/site',
              isStrict:false
            }
          ]
        },
        {
          title:'业务管理',
          icon:'company-icon',
          items:[
            {
              title:'订单列表',
              name:'orderList',
              router:'/order/list',
              isStrict:false
            },
            {
              title:'客户列表',
              name:'clientList',
              router:'/client/list',
              isStrict:false
            },
            {
              title:'月结收账',
              name:'monthlyIndex',
              router:'/monthly/index',
              isStrict:false
            }
          ]
        },
        {
          title:'公司管理',
          icon:'company-icon',
          items:[
            {
              title:'员工列表',
              name:'personnelList',
              router:'/personnel/list',
              isStrict:false
            },
            {
              title:'车辆列表',
              name:'vehicleList',
              router:'/vehicle/list',
              isStrict:false
            },
            {
              title:'网点列表',
              name:'stationList',
              router:'/station/list',
              isStrict:false
            },
            {
              title:'线路列表',
              name:'lineList',
              router:'/line/list',
              isStrict:false
            },
            {
              title:'设置',
              name:'orderSite',
              router:'/order/site',
              isStrict:false
            },
            {
              title:'公司资料',
              name:'modifyCompanyProfile',
              router:'/user/modifyCompanyProfile',
              isStrict:false
            }
          ]
        }
      ]
      return {
        isShow:false,
        menus:menus,
        activeName:''
      }
    },
    methods:{
    }
  }
</script>
