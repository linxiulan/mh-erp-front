// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/common.css'
import VueWechatTitle from 'vue-wechat-title'
import iView from 'iview'
//import {Button,Modal,Message,TimePicker,DatePicker,Row,Col} from 'iview';
import VueQriously from 'vue-qriously'
import 'iview/dist/styles/iview.css'

import {post, get, patch, put, getStationName} from './assets/js/service'

Vue.use(VueWechatTitle)
Vue.use(iView)
/*Vue.component('Button', Button);
Vue.component('Modal', Modal);
Vue.component('Message', Message);
Vue.component('TimePicker', TimePicker);
Vue.component('DatePicker', DatePicker);
Vue.component('Row', Row);
Vue.component('Row', Col);*/
Vue.use(VueQriously)
Vue.config.productionTip = false
Vue.prototype.$post = post
Vue.prototype.$get = get
Vue.prototype.$patch = patch
Vue.prototype.$put = put
Vue.prototype.getStationName = getStationName;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
