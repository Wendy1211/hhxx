import Axios from 'axios'
import { $vue } from '@/main.js'
import QS from 'qs'
import router from '@/router';

Axios.defaults.baseURL = process.env.API_ROOT;

// 统一状态码处理
let statusJson = {
    400: '请求错误',
    401: '未授权，请登录',
    403: '拒绝访问',
    404: '请求地址出错',
    408: '请求超时',
    500: '服务器正在维护, 请稍后再试',
    501: '服务未实现',
    502: '网关错误',
    503: '服务不可用',
    504: '网关超时',
    505: 'HTTP版本不受支持'
}

function sStateManagementErr(status) {
    status = status - 0
    let errTip = statusJson[status] ? statusJson[status] : 'concatUs';
    // 提示
    $vue.$message(errTip);
}

// loading配置
let options = {
    lock: true,
    text: '正在加载...',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
}

// loading显示判断
let loadingFlag
Axios.defaults.timeout = 50000;
// application/json;charset=UTF-8
// application/x-www-form-urlencoded;charset=UTF-8
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// Axios.defaults.headers.common['Authorization'] = localStorage.token?localStorage.token:'';
Axios.defaults.headers.common['TAX-WEB']="v1"
// 请求拦截
Axios.interceptors.request.use(config => {
    if (localStorage.token) {
        config.headers.Authorization = localStorage.token
    }
    loadingFlag = $vue.$loading(options)
    return config
}, err => {
    loadingFlag.close()
    sStateManagementErr(err)
    return Promise.resolve(err)
})

// 响应拦截
Axios.interceptors.response.use(response => {
    if(response.data.code === 401){
        localStorage.token=''; //清除token
        router.replace({
            path: '/login' // 到登录页重新获取token
        })
    }
    if (loadingFlag) {
        loadingFlag.close()
        return Promise.resolve(response)
    }
}, err => {
    loadingFlag.close()
    sStateManagementErr(err.response.status)
    Promise.resolve(err.response)
})

/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
//  QS.stringify(params)
// JSON.stringify(params)
export function post(url, params) {
    return new Promise((resolve, reject) => {
        Axios.post(url, QS.stringify(params))
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                reject(err.data)
            })
    })
}

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */

export function get(url, params) {
    return new Promise((resolve, reject) => {
        Axios.get(url, params)
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                reject(err.data)
            })
    })
}