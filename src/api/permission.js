import { post, get } from '../assets/global/js/axios'

// 登录接口
export function login() {
    return get('/static/login.json')
}

// 路由表配置
export function fetchPermission() {
    return get('/static/permission.json')
} 

