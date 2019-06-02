import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {title: 'Home', color: '#6fb475'},
      component: () => import('./views/Home.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    },
    {
      path: '/notebook',
      name: 'notebook',
      meta: {title: 'NoteBook', color: '#6fb475'},
      component: () => import('./views/NoteBook.vue')
    }
  ]
})
