import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/Home'
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
          component: resolve => require(['../components/Terminal/Terminal.vue'], resolve)
        }
      ]
    },
    {
      path: '/login',
      component: resolve => require(['../components/page/Login.vue'], resolve)
    }
  ]
})
