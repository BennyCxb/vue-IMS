import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/Terminal'
    },
    {
      path: '/home',
      component: resolve => require(['../components/common/Home.vue'], resolve),
      children: [
        // {
        //   path: '/',
        //   component: resolve => require(['../components/page/Home.vue'], resolve)
        // },
        {
          path: '/Terminal',
          component: resolve => require(['../components/Terminal/Main.vue'], resolve)
        },
        {
          path: '/Playlist',
          component: resolve => require(['../components/Playlist/Main.vue'], resolve)
        },
        {
          path: '/Template',
          component: resolve => require(['../components/Template/Main.vue'], resolve)
        },
        {
          path: '/Resource',
          component: resolve => require(['../components/Resource/Main.vue'], resolve)
        },
        {
          path: '/Analysis',
          component: resolve => require(['../components/Analysis/Main.vue'], resolve)
        },
        {
          path: '/Log',
          component: resolve => require(['../components/Log/Main.vue'], resolve)
        },
      ]
    },
    {
      path: '/login',
      component: resolve => require(['../components/page/Login.vue'], resolve)
    },
    {
      path: '/Personal',
      redirect: '/Personal/Info'
    },
    {
      path: '/Personal',
      component: resolve => require(['../components/Personal/Main.vue'], resolve),
      children: [
        {
          path: '/Personal/Info',
          component: resolve => require(['../components/Personal/Info.vue'], resolve)
        },
        {
          path: '/Personal/Password',
          component: resolve => require(['../components/Personal/Password.vue'], resolve)
        }
      ]
    }
  ]
})
