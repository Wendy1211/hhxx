<template>
  <el-table
    :data="tableData"
    border
    show-summary
    :show-header='false'
    style="width: 100%">
    
    <el-table-column
      prop="name"
      label="摘要">
    </el-table-column>
    <el-table-column
      prop="name"
      label="科目">
    </el-table-column>
    <el-table-column
      prop="amount1"
      sortable
      label="借方金额">
    </el-table-column>
    <el-table-column
      prop="amount2"
      sortable
      label="贷方金额">
    </el-table-column>
    
  </el-table>
</template>
<script>
export default {
    data() {
        return {
          tableData: [{
          id: '12987122',
          name: '王小虎',
          amount1: '234',
          amount2: '3.2',
          amount3: 10
        }, {
          id: '12987123',
          name: '王小虎',
          amount1: '165',
          amount2: '4.43',
          amount3: 12
        }, {
          id: '12987124',
          name: '王小虎',
          amount1: '324',
          amount2: '1.9',
          amount3: 9
        }]

        }
    },
    methods:{
     
          
    }
}
</script>
<style scoped>
</style>