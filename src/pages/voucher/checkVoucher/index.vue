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
        <el-input placeholder="请输入搜索内容" v-model="input" size="small" clearable class="input-with-select">
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
        <el-select v-model="select1" placeholder="更多" style="color:#fff" size="small">
          <el-option label="审核" value="1"></el-option>
          <el-option label="反审核" value="2"></el-option>
        </el-select>
      </span>
    </div>
    <!-- 凭证表 -->
    <div class="list">
      <el-table
        ref="multipleTable"
        height="250"
        :data="tableData"
        border
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="摘要"
          width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="科目"
          width="120">
        </el-table-column>
        <el-table-column
          prop="address"
          label="借方金额"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="address"
          label="贷方金额"
          show-overflow-tooltip>
        </el-table-column>
        <div class="qiantao">
          <tableList></tableList>
        </div>
      </el-table>
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
      select1:'',
      tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },]
    }
  },
  methods:{
    handleSelectionChange(val) {
        this.multipleSelection = val;
      }
  }
}
</script>
<style lang="less" scoped>
.title{
  margin: 10px 0;
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
    border: transparent solid;
    .el-button{
      color: #fff;
      background-color: @mainNavColor;
    }
    /deep/.el-select{
      margin-left: 10px;
      width: 100px;
      .el-input--small .el-input__inner{
        background-color: @mainNavColor;
        color: #fff;
      }
    }
  }
}





</style>
