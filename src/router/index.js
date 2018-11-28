import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'
import User from '@/components/user/user.vue'
import Rights from '@/components/rights/rights.vue'
import Role from '@/components/rights/role.vue'
Vue.use(Router)
export default new Router({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'home',
      path: '/',
      component: Home,
      children: [
        {
          name: 'user',
          path: '/user',
          component: User
        },
        {
          name:'rights',
          path:'/rights',
          component:Rights
        },
        {
          name:'role',
          path:'/role',
          component:Role
        }
      ]
    }
  ]
})
