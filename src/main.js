import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.doGet = (url, success, error) => {
  axios({method: "GET", url: url, timeout: 4000 })
  .then(res => success(res.data))
  .catch(err => error?error(err):console.log(err))
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
