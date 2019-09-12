import { post, get } from '../assets/global/js/axios'

// 设置模块
export const set = {}


// 会计科目列表
set['subList'] = function(data){
   return post('/apis/subject/subList',data)
}


 