import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home'
import Login from '@/pages/user/login'
import modifyCompanyProfile from '@/pages/user/modifyCompanyProfile'
import changePassword from '@/pages/user/changePassword'
import business from '@/pages/business/index'
import trendAnalysis from '@/pages/business/trendAnalysis'
import rankingAnalysis from '@/pages/business/rankingAnalysis'
import businessSite from '@/pages/business/site'
import businessSiteItem from '@/pages/business/siteItem'
import businessSiteAdd from '@/pages/business/siteAdd'
import orderDetail from '@/pages/order/detail'
import orderList from '@/pages/order/list'
import clientList from '@/pages/client/list'
import monthlyIndex from '@/pages/monthly/index'
import monthlyOrderList from '@/pages/monthly/orderlist'
import vehicleList from '@/pages/vehicle/list'
import lineList from '@/pages/line/list'
import stationList from '@/pages/station/list'
import personnelList from '@/pages/personnel/list'
import orderSite from '@/pages/order/site'
import notFound from '@/pages/404'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'business',
      component: business,
      //component: resolve => require(['@/pages/business/index.vue'], resolve),
      meta: {
        title: '经营概况'
      }
    },
    {
      path: '/business',
      name: 'business',
      component: business,
      //component: resolve => require(['@/pages/business/index.vue'], resolve),
      meta: {
        title: '经营概况'
      }
    },
    {
      path: '/business/trendAnalysis',
      name: 'businessTrendAnalysis',
      component: trendAnalysis,
      //component: resolve => require(['@/pages/business/trendAnalysis.vue'], resolve),
      meta: {
        title: '趋势分析'
      }
    },
    {
      path: '/business/rankingAnalysis',
      name: 'rankingAnalysis',
      component: rankingAnalysis,
      //component: resolve => require(['@/pages/business/rankingAnalysis.vue'], resolve),
      meta: {
        title: '排行分析'
      }
    },
    {
      path: '/business/site',
      name: 'businessSite',
      component: businessSite,
      //component: resolve => require(['@/pages/business/site.vue'], resolve),
      meta: {
        title: '成本管理'
      }
    },
    {
      path: '/business/siteItem',
      name: 'businessSiteItem',
      component: businessSiteItem,
      //component: resolve => require(['@/pages/business/site.vue'], resolve),
      meta: {
        title: '添加成本项'
      }
    },
    {
      path: '/business/siteAdd',
      name: 'businessSiteAdd',
      component: businessSiteAdd,
      //component: resolve => require(['@/pages/business/site.vue'], resolve),
      meta: {
        title: '添加成本'
      }
    },
    {
      path: '/user/login',
      name: 'login',
      component: Login,
      //component: resolve => require(['@/pages/user/login.vue'], resolve),
      meta: {
        title: '登录'
      }
    },
    {
      path: '/user/changePassword',
      name: 'changePassword',
      component: changePassword,
      //component: resolve => require(['@/pages/user/changePassword.vue'], resolve),
      meta: {
        title: '修改密码'
      }
    },
    {
      path: '/user/modifyCompanyProfile',
      name: 'modifyCompanyProfile',
      component: modifyCompanyProfile,
      //component: resolve => require(['@/pages/user/changePassword.vue'], resolve),
      meta: {
        title: '修改公司资料'
      }
    },

    {
      path: '/order',
      name: 'orderList',
      component: orderList,
      //component: resolve => require(['@/pages/order/list.vue'], resolve),
      meta: {
        title: '订单列表'
      }
    },
    {
      path: '/order/list',
      name: 'orderList',
      component: orderList,
      //component: resolve => require(['@/pages/order/list.vue'], resolve),
      meta: {
        title: '订单列表'
      }
    },
    {
      path: '/order/detail/:id',
      name: 'orderDetail',
      component: orderDetail,
      //component: resolve => require(['@/pages/order/detail.vue'], resolve),
      meta: {
        title: '订单详情'
      }
    },
    {
      path: '/client',
      name: 'clientList',
      component: clientList,
      //component: resolve => require(['@/pages/client/list.vue'], resolve),
      meta: {
        title: '客户列表'
      }
    },
    {
      path: '/client/list',
      name: 'clientList',
      component: clientList,
      //component: resolve => require(['@/pages/client/list.vue'], resolve),
      meta: {
        title: '客户列表'
      }
    },
    {
      path: '/monthly',
      name: 'monthlyIndex',
      component: monthlyIndex,
      //component: resolve => require(['@/pages/monthly/index.vue'], resolve),
      meta: {
        title: '月结收账'
      }
    },
    {
      path: '/monthly/index',
      name: 'monthlyIndex',
      component: monthlyIndex,
      //component: resolve => require(['@/pages/monthly/index.vue'], resolve),
      meta: {
        title: '月结收账'
      }
    },
    {
      path: '/monthly/orderList',
      name: 'monthlyOrderList',
      component: monthlyOrderList,
      //component: resolve => require(['@/pages/monthly/orderlist.vue'], resolve),
      meta: {
        title: '月结收账'
      }
    },
    {
      path: '/personne',
      name: 'personnelList',
      component: personnelList,
      //component: resolve => require(['@/pages/personnel/list.vue'], resolve),
      meta: {
        title: '员工列表'
      }
    },
    {
      path: '/personnel/list',
      name: 'personnelList',
      component: personnelList,
      //component: resolve => require(['@/pages/personnel/list.vue'], resolve),
      meta: {
        title: '员工列表'
      }
    },
    {
      path: '/vehicle',
      name: 'vehicleList',
      component: vehicleList,
      //component: resolve => require(['@/pages/vehicle/list.vue'], resolve),
      meta: {
        title: '车辆列表'
      }
    },
    {
      path: '/vehicle/list',
      name: 'vehicleList',
      component: vehicleList,
      //component: resolve => require(['@/pages/vehicle/list.vue'], resolve),
      meta: {
        title: '车辆列表'
      }
    },
    {
      path: '/line',
      name: 'lineList',
      component: lineList,
      //component: resolve => require(['@/pages/line/list.vue'], resolve),
      meta: {
        title: '线路列表'
      }
    },
    {
      path: '/line/list',
      name: 'lineList',
      component: lineList,
      //component: resolve => require(['@/pages/line/list.vue'], resolve),
      meta: {
        title: '线路列表'
      }
    },
    {
      path: '/station',
      name: 'stationList',
      component: stationList,
      //component: resolve => require(['@/pages/station/list.vue'], resolve),
      meta: {
        title: '网点列表'
      }
    },
    {
      path: '/station/list',
      name: 'stationList',
      component: stationList,
      //component: resolve => require(['@/pages/station/list.vue'], resolve),
      meta: {
        title: '网点列表'
      }
    },
    {
      path: '/order/site',
      name: 'orderSite',
      component: orderSite,
      //component: resolve => require(['@/pages/order/site.vue'], resolve),
      meta: {
        title: '订单设置'
      }
    },
    {
      path: '*',
      name: 'NotFound',
      component: notFound,
      //component: resolve => require(['@/pages/404.vue'], resolve),
      meta: {
        title: '找不到页面'
      }
    }
  ]
})
