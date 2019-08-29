import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/pages/login/index'
import NotFound from '@/pages/errorPage/404'
import Forbidden from '@/pages/errorPage/403'

import Layout from '@/pages/layout/index'
import Home from '@/pages/Home/index'

Vue.use(Router)

/* 初始路由 */
export default new Router({
  routes: [
      {
          path: '/login',
          component: Login
      },
  ],
  mode: 'history'
})

/* 准备动态添加的路由 */
export const DynamicRoutes = [
    {
        path: '',
        component: Layout,
        name: 'container',
        redirect: 'home',
        hidden: true,
    },
    {
		path: '',
		name: 'index',
		component: Layout,
		meta: {
            name: '首页',
            icon:''
		},
		noDropdown: true,
		children: [
			{
                path: 'home',
                component: Home,
                name: 'home',
                meta: {
                    name: '首页',
                    icon: 'el-icon-house',
                    requiresAuth: true,
                }
            }
		]
	},
    {
        path: '/403',
        component: Forbidden,
        hidden: true 
    },
    {
        path: '*',
        component: NotFound,
        hidden: true 
    }
]

