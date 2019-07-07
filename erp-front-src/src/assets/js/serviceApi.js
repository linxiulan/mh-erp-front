/**
 * Created by linxiulan on 2018/3/28.
 */
let serviceApi = {
  login: '/api/user/token',//登录
  password: '/api/user/password',//修改密码
  countBusinessData:'/api/admin/statistics/order/amount/sum', //获取经营概况
  countOrdersData:'/api/admin/statistics/order/persontime/count', //下单人次
  countClientsData:'/api/admin/statistics/customer/active/count', //客户分析
  lineRouteOrders:'/api/admin/statistics/order/top/line', //路线订单量排序
  lineClientOrders:'/api/admin/statistics/order/top/customer', //客户订单量排序
  getgetCostItem:'/api/admin/expend/items',  //获取成本项
  getExpendList:'/api/admin/expend/prices',//获取支出费用列表
  addExpendItem:'/api/admin/expend/items',//添加成本项
  addPrices:'/api/admin/expend/prices/',//添加成本
  monthlyList:'/api/admin/monthly/list',//月结列表
  monthlyOrderList:'/api/admin/monthly/order/list',//月结订单列表
  monthlyContactUpdate:'/api/admin/monthly/update', //修改月结用户联系人
  monthlyAdd:'/api/admin/monthly',//添加月结账号
  monthlyDel:'/api/admin/monthly/del',//删除月结账号
  monthlyAddAssociatedPhone:'/api/admin/monthly',  //绑定月结账号关联手机
  monthlyDelAssociatedPhone:'/api/admin/monthly/del',  //解绑月结账号关联手机
  monthlyOrderListExport:'/api/admin/monthly/order/list/export',//导出月结列表
  monthlyOrderPay:'/api/admin/monthly/order/pay',  //更新月结用户订单状态
  monthlyOrderSumAmount:'/api/admin/monthly/order/sum/amount',//月结账号欠款总额
  addEmployeesQRC:'/api/admin/token',//添加员工二维码
  userList:'/api/admin/user/list', //员工列表
  userUpdata:'/api/admin/user', //更新员工资料
  userDel:'/api/admin/user/del', //删除员工
  carList:'/api/car/list', //车辆列表
  addCar:'/api/admin/car', //添加车辆
  delCar:'/api/admin/car/del', //删除车辆
  stationList:'/api/station/list',//站点列表
  addStation:'/api/admin/station',//添加站点
  delStation:'/api/admin/station/del', //删除站点
  customerList:'/api/admin/customer/list',  //获取客户/用户列表
  addCustomer:'/api/customer',  //创建/添加客户信息
  getOrderList:'/api/admin/order/list',//订单列表查询
  getOrderDetail:'/api/order/', //获取订单详情
  orderListExport:'/api/admin/order/list/export',//导出订单列表
  addOrderTrace:'/api/admin/order/trace',//添加订单更近记录
  getPriceList:'/api/price/list', //获取收费项目
  addPriceItem:'/api/admin/price', //添加收费项目
  delPriceItem:'/api/admin/price/del/', //删除收费项目
  upDataCompanyInfo:'/api/admin/company',//修改公司资料
  getReceivableList:'/api/admin/receivable/list', //获取代收货款列表
  upDataReceivable:'/api/admin/receivable',//修改代收货款
  exportReceivableList:'/api/admin/receivable/list/export',//导出代收货款列表
}

export { serviceApi }
