import { fetchPermission } from '@/api/permission'
import router, { DynamicRoutes } from '@/router/index'
import { recursionRouter, setDefaultRoute } from '@/utils/recursion-router'
import dynamicRouter from '@/router/dynamic-router'

export default {
    namespaced: true,
    state: {
        permissionList: null /** 所有路由 */,
        sidebarMenu: [] /** 导航菜单 */,
        currentMenu: '' /** 当前active导航菜单 */
    },
    getters: {},
    mutations: {
        SET_PERMISSION(state, routes) {
            state.permissionList = routes
        },
        CLEAR_PERMISSION(state) {
            state.permissionList = null
        },
        SET_MENU(state, menu) {
            state.sidebarMenu = menu
        },
        CLEAR_MENU(state) {
            state.sidebarMenu = []
        },
        SET_CURRENT_MENU(state, currentMenu) {
            state.currentMenu = currentMenu
        }
    },
    actions: {
        async FETCH_PERMISSION({ commit, state }) {
            let permissionList = await Promise.resolve(fetchPermission()).then(res=>{
                return res.data;
            })
            /*  根据权限筛选出我们设置好的路由并加入到path=''的children */
            let routes = recursionRouter(permissionList, dynamicRouter)
            let MainContainer = DynamicRoutes.find(v => v.path === '')
            DynamicRoutes.push(...routes)
            /* 生成左侧导航菜单 */
            commit('SET_MENU', DynamicRoutes)
            /*
                为所有有children的菜单路由设置第一个children为默认路由
            */
            setDefaultRoute([MainContainer])

            /*  初始路由 */
            let initialRoutes = router.options.routes

            /*  动态添加路由 */
            router.addRoutes(DynamicRoutes)
            
            /* 完整的路由表 */
            commit('SET_PERMISSION', [...initialRoutes, ...DynamicRoutes])
        }
    }
}
