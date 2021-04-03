// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios';
//Vue.prototype.$axios = axios;
Vue.config.productionTip = false
import UserCalen from  '@/components/UserCalen'
Vue.component('usercalen',UserCalen)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
