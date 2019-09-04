import Vue from 'vue'
import App from './App'
import store from './store/index'
import { post, get } from './assets/global/js/axios.js'
import router from './router'
// 配置全局css
require('!style-loader!css-loader!less-loader!./assets/global/less/index.less')

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 全局过滤器
import * as globalFilter from './filters/filters';

// 全局字体图标
import './assets/global/icon/iconfont.css'
// 注册全局bus
import  bus from './assets/global/js/bus'
Vue.prototype.$bus = bus

// 全局请求方式
Vue.prototype.$post = post
Vue.prototype.$get = get

//全局函数=>格式化新增凭证的借贷、合计
import typeFix from './assets/global/js/typefix'
Vue.prototype.typeFix = typeFix

//人民币转大写
import  atoc from './assets/global/js/rmbtrans'
Vue.prototype.atoc = atoc

// 配置全局过滤器
Object.keys(globalFilter).forEach(key => {
    Vue.filter(key, globalFilter[key])
})

Vue.use(ElementUI);
Vue.config.productionTip = false

// 钩子函数判断路由
router.beforeEach((to, from, next) => {
    if (!store.state.UserToken) {
        if (
            to.matched.length > 0 &&
            !to.matched.some(record => record.meta.requiresAuth)
        ) {
            next()
        } else {
            next({ path: '/login' })
        }
  } else {
        if (!store.state.permission.permissionList) {
            store.dispatch('permission/FETCH_PERMISSION').then(() => {
                next({ path: to.path})
            })
        } else {
            if (to.path !== '/login') {
                next()
            } else {
                next(from.fullPath)
            }
        }
    }
})
//afterEach把当前路由的path赋值给el-menu default-active即可
router.afterEach((to, from, next) => {
    store.commit('permission/SET_CURRENT_MENU', to.path)
})

const sVue = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

export const $vue = sVue