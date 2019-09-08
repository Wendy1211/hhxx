import { post, get } from '../assets/global/js/axios'

// 设置模块
export const voucher = function(data){
    return post('/voucher/initVoucher',data)
}



 