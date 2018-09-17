// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/iconfont/iconfont.css'
import api from './api/'
import _ from 'lodash'
// 引入cookie
import VueCookies from 'vue-cookies'

Vue.use(ElementUI, { size: 'small', zIndex: 3000 })
Vue.use(VueCookies)

Vue.config.productionTip = false
// Vue.prototype.$axios.defaults.baseURL = process.env.API_ROOT

Vue.prototype.$api = api
Vue.prototype._ = _

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
