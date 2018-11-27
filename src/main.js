// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import '@/assets/css/style.css'
import MyHttpServer from '@/plugins/http.js'
import moment from 'moment'
Vue.use(ElementUI)
Vue.use(MyHttpServer)
Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.filter('fmtDate',function(v){
  return moment(v).format('YYYY-MM-DD')
})
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

