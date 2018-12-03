import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'
import User from '@/components/user/user.vue'
import Rights from '@/components/rights/rights.vue'
import Role from '@/components/rights/roles.vue'
import Goods from '@/components/goods/goods.vue'
import Goodsadd from '@/components/goods/goodsadd.vue'
import Goodscate from '@/components/goods/goodscate.vue'
import Orders from '@/components/order/order.vue'
import Reports from '@/components/reports/reports.vue'
import Params from '@/components/goods/cateparams.vue'
import { Message } from 'element-ui'
Vue.use(Router)

const router = new Router({
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
          name: 'rights',
          path: '/rights',
          component: Rights
        },
        {
          name: 'roles',
          path: '/roles',
          component: Role
        },
        {
          name: 'goods',
          path: '/goods',
          component: Goods
        },
        {
          name: 'goodsadd',
          path: '/goodsadd',
          component: Goodsadd
        },
        {
          name: 'params',
          path: '/params',
          component: Params
        },
        {
          name: 'categories',
          path: '/categories',
          component: Goodscate
        },{
          name: 'orders',
          path: '/orders',
          component: Orders
        },{
          name: 'reports',
          path: '/reports',
          component: Reports
        }
        
        
      ]
    }
  ]
})
// 路由前置守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push({name: 'login'})
      Message.warning('请先登录')
      return
    }
    next()
  }
})
export default router
