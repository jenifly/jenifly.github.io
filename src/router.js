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
      meta: {title: 'Home', color: '#76a5af'},
      component: () => import('./views/Home.vue')
    },
    {
      path: '/yiyan',
      name: 'yiyan',
      meta: {title: 'YiYan', color: '#a39896'},
      component: () => import('./views/YiYan.vue')
    },
    {
      path: '/notebook',
      name: 'notebook',
      meta: {title: 'NoteBook', color: '#6fb475'},
      component: () => import('./views/NoteBook.vue')
    },
    {
      path: '/editor',
      name: 'editor',
      meta: {title: 'Editor', color: '#a39896'},
      component: () => import('./views/Editor.vue')
    },
  ]
})
