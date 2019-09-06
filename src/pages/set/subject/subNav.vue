<template>
    <div class="subNav">
        <template>
            <el-select v-model="value" filterable placeholder="请输入科目编码或名称" clearable @change="inputChange">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </template>
        <div class="subRight">
            <el-button  class="smallBtn" @click="addSub">新增</el-button>
            <el-button  class="smallBtn">导入</el-button>
        </div>
        <add-sub></add-sub>
    </div>
</template>
<script>
import addSub from "./addSub"
export default {
    name:"subNav",
    components:{
        addSub
    },
    data() {
      return {
        options: [{
            value: '选项1',
            label: '黄金糕'
            }, {
            value: '选项2',
            label: '双皮奶'
            }, {
            value: '选项3',
            label: '蚵仔煎'
            }, {
            value: '选项4',
            label: '龙须面'
            }, {
            value: '选项5',
            label: '北京烤鸭'
        }],
        value: ''
      }
   },
   methods:{
        inputChange(){
            console.log(this.value);
        },
        addSub(){
            let data = { bool:0}
            this.$bus.$emit('subBool',data)
        }
   }
}
</script>
<style lang="less" scoped>
    .subNav{
        margin-bottom: 5px;
    }
    .subRight{
        float: right;
    }
    .el-select{
        width: 300px;
    }
    .el-select /deep/ .el-input__inner{
        height: @inputHeight;
        line-height: @inputHeight;
    }
    
    .el-select /deep/ .el-input__icon{
        line-height: @inputHeight;
    }
</style>
