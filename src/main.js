import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.baseUrl = 'https://api.github.com/repos/jenifly/jenifly.github.io/contents/'
Vue.prototype.doGet = (url, success, error) => {
  axios({method: "GET", url: url})
  .then(res => success(res.data))
  .catch(err => error?error(err):console.log(err))
}

router.beforeEach((to, from, next) => {
  document.documentElement.style.setProperty('--Primary', to.meta.color)
  document.getElementsByTagName('meta')[1].content = to.meta.color
  window.document.title = to.meta.title
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
