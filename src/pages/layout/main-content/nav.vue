<template>
    <div class="nav">
        <p>上善若水财务办公系统</p>
        <div class="return">
            <el-button size="medium">返回工作台</el-button>
        </div>
    </div>
</template>
<script>
export default {
   data() {
      return {

      }
   }
}
</script>
<style lang="less" scoped>
    .nav{
        background-color: @mainNavColor;
        width: 100%;
        height: 60px;
        p{
            color: aliceblue;
            height: 60px;
            line-height: 60px;
            margin-left: 20px;
            display: inline-block;
            font-size: 22px;
        }
        .return{
            float: right;
            line-height: 60px;
            margin-right: 20px;
            .el-button{
                background-color: @assistColor;
                color: aliceblue;
                border: @assistColor;
            }
        }
    }
    
</style>
