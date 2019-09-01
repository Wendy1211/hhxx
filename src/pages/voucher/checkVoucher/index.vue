<template>
  <div class="checkVocher">
    <!-- 表上信息 -->
    <div class="title">
      <!-- 日期 -->
      <span style="padding-left:20px" class="date">
        <el-date-picker
          size="small"
          v-model="value"
          type="month"
          placeholder="选择月">
        </el-date-picker>
      </span>
      <!-- 复合搜索 -->
      <span class="search">
        <el-input placeholder="请输入搜索内容" v-model="input" size="small" class="input-with-select">
          <el-select v-model="select" slot="prepend">
            <el-option label="综合搜索" value="1"></el-option>
            <el-option label="科目" value="2"></el-option>
            <el-option label="摘要" value="3"></el-option>
            <el-option label="金额" value="4"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" size="small"></el-button>
        </el-input>
      </span>
      <!-- 按钮 -->
      <span class="btn">
        <el-button size="small">刷新</el-button>
        <el-button size="small">新增</el-button>
        <el-button size="small">删除</el-button>
        <el-button size="small">打印</el-button>
        <el-select v-model="select1" placeholder="更多" size="small">
          <el-option label="审核" value="1"></el-option>
          <el-option label="反审核" value="2"></el-option>
        </el-select>
      </span>
    </div>
    <!-- 凭证表 -->
    <div class="list">
      <table
        style="width: 100%">
        <tableList></tableList>
        <tableList></tableList>
        <tableList></tableList>
      </table>
    </div>
  </div>
</template>
<script>
import tableList from './tableList'
export default {
  name:'CheckVoucher',
  components:{
    tableList
  },
  data() {
    return {
      value: '',
      input:'',
      select:'',
      select1:''
    }
  },
}
</script>
<style lang="less" scoped>
.title{
  .date{
    /deep/.el-input,.el-input__inner{
      width: 130px;
    }
  }
  .search{
    display: inline-block;
    margin-left: 40px;
    .el-input{
      width: 530px;
    }
    /deep/.el-select  {
      width: 100px;
    }
    .input-with-select .el-input-group__prepend {
      background-color: #fff;
    }
  }
  .btn{
    margin-left: 170px;
    .el-button{
      color: #fff;
      background-color: #34A8FF;
    }
    /deep/.el-select{
      margin-left: 10px;
      width: 100px;
    }
  }
}





</style>
