import { post, get } from '../assets/global/js/axios'

// 设置凭证模块
export const voucher = {}

// 一、新增凭证初始化
voucher['initVoucher'] = function(data){
    return post('/voucher/initVoucher',data)
}
// 切换上一张下一张
voucher['voucherDetail'] = function(data){
    return post('/voucher/voucherDetail',data)
}
// 摘要列表
voucher['digestList'] = function(data){
    return post('/voucher/digestList',data)
}
// 保存
voucher['voucherAdd'] = function(data){
    return post('/voucher/voucherAdd',data)
}
// 审核接口
voucher['voucherAudit'] = function(data){
    return post('/voucher/voucherAudit',data)
}
// 删除接口
voucher['voucherDel'] = function(data){
    return post('/voucher/voucherDel',data)
}

// 二、查看凭证列表
voucher['voucherList'] = function(data){
    return post('/voucher/voucherList',data)
}