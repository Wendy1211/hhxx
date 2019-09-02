<template>
    <div class="tableList">
        <el-table
            :data="tableData"
            :span-method="objectSpanMethod" 
            border
            ref="multipleTable"
            tooltip-effect="dark"
            show-summary
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
            type="selection"
            label="全选"
            width="55">
            </el-table-column>
            <el-table-column
            prop="id"
            label="摘要"
            width="180">
            </el-table-column>
            <el-table-column
            prop="name"
            label="科目">
            </el-table-column>
            <el-table-column
            prop="amount1"
            label="借方金额">
            </el-table-column>
            <el-table-column
            prop="amount2"
            label="贷方金额">
            </el-table-column>
        </el-table>
    </div>
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
            }, {
                id: '12987123',
                name: '王小虎',
                amount1: '165',
                amount2: '4.43',
            },  {
                id: '12987125',
                name: '王小虎',
                amount1: '621',
                amount2: '2.2',
            }],
            multipleSelection: []

        }
    },
    methods:{
        // 合并行
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
          if (rowIndex=== 0) {
            return {
              rowspan: 3,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      },
        getSummaries(param) {
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
            if (index === 0) {
                sums[index] = '总价';
                return;
            }
            const values = data.map(item => Number(item[column.property]));
            if (!values.every(value => isNaN(value))) {
                sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                    return prev + curr;
                } else {
                    return prev;
                }
                }, 0);
                sums[index] += ' 元';
            } else {
                sums[index] = 'N/A';
            }
            });

            return sums;
        },
        toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    
    }
}
</script>
<style scoped>
.tableList{
    margin-top: 10px;
}
</style>