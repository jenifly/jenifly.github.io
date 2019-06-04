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
Vue.prototype.cookie = {
  set (key, val, time) {
    let date=new Date()
    date.setTime(date.getTime()+time*24*3600*1000)
    document.cookie=key + "=" + val +";expires="+date.toGMTString()
  },
  get (key) {
    var r = document.cookie.match("\\b" + key + "=([^;]*)\\b")
    return r ? r[1] : undefined
  },
  delete (key) {
    let date = new Date()
    date.setTime(date.getTime()-10000)
    document.cookie = key + "=v; expires =" +date.toGMTString()
  }
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
