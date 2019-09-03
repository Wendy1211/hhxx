<template>
    <div class="vsum">
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
          <el-autocomplete
          size="small"
          prefix-icon="el-icon-search"
          class="inline-input"
          v-model="state1"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
          @select="handleSelect"
        ></el-autocomplete>
        </span>
        <!-- 按钮 -->
        <span class="btn">
          <el-button size="small">刷新</el-button>
          <el-button size="small">导出</el-button>
          <el-button size="small">打印</el-button>
        </span>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        :header-cell-style="getRowClass"
        default-expand-all
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <el-table-column
          prop="date"
          label="科目编码"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="科目名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="借方金额">
        </el-table-column>
        <el-table-column
          prop="address"
          label="贷方金额">
        </el-table-column>
      </el-table>
    </div>
</template>
<script>
export default {
    name:'Vsum',
    data() {
      return {
      restaurants: [],
      state1: '',
      value: '',
      input:'',
      select:'',
      select1:'',
      tableData: [{
          id: 1,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id: 2,
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          id: 3,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          children: [{
              id: 31,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }, {
              id: 32,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
          }]
        }, {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
      }
    },
    methods: {
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll() {
        return [
          { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
          { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
          { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
          { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
          { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
          { "value": "贡茶", "address": "上海市长宁区金钟路633号" },
          { "value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号" },
          { "value": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号" },
          { "value": "十二泷町", "address": "上海市北翟路1444弄81号B幢-107" },
          { "value": "星移浓缩咖啡", "address": "上海市嘉定区新郁路817号" },
          { "value": "阿姨奶茶/豪大大", "address": "嘉定区曹安路1611号" },
            ];
      },
      handleSelect(item) {
        console.log(item);
      },
      // 表头颜色
      getRowClass({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === 0) {
          return "background: #F2F2F2;";
        } else {
          return "";
        }
      },
    },
    mounted() {
      this.restaurants = this.loadAll();
    }
}
</script>
<style lang="less" scoped>
.title{
  margin-top: 10px;
  .date{
    /deep/.el-input,.el-input__inner{
      width: 130px;
    }
  }
  .search{
    display: inline-block;
    margin-left: 40px;
    /deep/.el-input{
      width: 278px;
    }
  }
  .btn{
    margin-left: 600px;
    .el-button{
      color: #fff;
      background-color: #34A8FF;
    }
  }
}
.el-table{
  margin-top: 10px;
}
</style>
