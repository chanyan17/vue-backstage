import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'babel-polyfill'

Vue.config.devtools = true
Vue.config.productionTip = false //开启debug模式

Vue.use(ElementUI, { size: 'small' })
axios.interceptors.response.use(
    response => {
        return response.data;
    }, error => {
        return Promise.reject(error)
    }
)
Vue.prototype.$axios = axios

export const eventBus = new Vue()

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
