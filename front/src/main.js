import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VueAnalytics from 'vue-analytics'
import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

const isProd = process.env.NODE_ENV === 'production'

Vue.config.productionTip = !isProd

Vue.use(BootstrapVue)

Vue.use(VueAnalytics, {
  id: 'UA-123456789-0',
  router,
  debug: {
    enabled: !isProd,
    sendHitTask: isProd
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
