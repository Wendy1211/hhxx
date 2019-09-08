<template>
  <div class="subList">
    <div class="subcut">
        <a href="#asset" :class="active==0?'pitch':''" @click="addClass('0')">资产</a>
        <a href="#liabilities" :class="active==1?'pitch':''" @click="addClass('1')">负债</a>
        <a href="#equity" :class="active==2?'pitch':''" @click="addClass('2')">权益</a>
        <a href="#cost" :class="active==3?'pitch':''" @click="addClass('3')">成本</a>
        <a href="#profit" :class="active==4?'pitch':''" @click="addClass('4')">损益</a>
    </div>
    <el-table
      :data="tableData"
      :header-cell-style="getRowClass"
      row-key="id"
      border
      ref="table"
      default-expand-all
      :height="tableHeight"
      size="small"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="code" label="科目编号" width="180">
        <template slot-scope="scope">
            <span v-if="scope.row.code==1001" id="asset" class="type_title">{{scope.row.code}}</span>
            <span v-else-if="scope.row.code==2001" id="liabilities" class="type_title">{{scope.row.code}}</span>
            <span v-else-if="scope.row.code==3001" id="equity" class="type_title">{{scope.row.code}}</span>
            <span v-else-if="scope.row.code==4001" id="cost" class="type_title">{{scope.row.code}}</span>
            <span v-else-if="scope.row.code==5001" id="profit" class="type_title">{{scope.row.code}}</span>
            <span v-else>{{scope.row.code}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="科目名称" width="180"></el-table-column>
      <el-table-column prop="name" label="余额方向" width="180"></el-table-column>
      <el-table-column prop="menusstate" label="启用状态" width="180">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.menusstate"
            @change="change(scope.$index,scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作">
        <template slot-scope="scope">
           <el-button  class="tableBtn" @click="tabAddSub(scope.$index,scope.row)">新增</el-button>
          <el-button  class="tableBtn" @click="tabEditSub(scope.$index,scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData:[],
      tableHeight: 0,
      screenHeight: document.body.clientHeight,
      active:0,
      scrollTop:0,
    };
  },
  methods: {
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background: #F2F2F2;";
      } else {
        return "";
      }
    },
    change: function(index, row) {
      console.log(index, row);
    },
    tabAddSub(index,row){
        let data= {bool:1}
        this.$bus.$emit('subBool',data)
    },
    tabEditSub(index,row){
        let data= {bool:2}
        this.$bus.$emit('subBool',data)
    },
    addClass(val){
      this.active = val
    }
  },
  async mounted() {
    setTimeout(() => {
      //初始化列表的高度
      this.tableHeight =
        window.innerHeight - this.$refs.table.$el.offsetTop - 70;
    }, 100);
    // 监听屏幕高度
    const that = this;
    window.onresize = () => {
      return (() => {
        window.innerHeight = document.body.clientHeight;
        that.screenHeight = window.innerHeight;
        that.tableHeight =
          that.screenHeight - that.$refs.table.$el.offsetTop - 70;
      })();
    };
    this.$refs.table.bodyWrapper.addEventListener('scroll', () => {
        // 获取页面的总高度
        let zHeight = this.$refs.table.bodyWrapper.scrollTop;
        var rightTo_ = document.querySelectorAll('.type_title');
        for (var i = 0; i < rightTo_.length; i++) {
            if(zHeight - rightTo_[i].offsetParent.offsetTop > 10 ){
                this.active = i
            }
        };
    },true);
    await Promise.resolve(this.api.set['subList']()).then(res=>{
         if(res.code == 200){
            this.tableData = res.data.list;
         }
    })
    
  },
  activated(){
      console.log(this.$refs.table.bodyWrapper.scrollTop)
  }
};
</script>
<style lang="less" scoped>
    .subcut{
       height: 30px;
      a{
        color:#999;
        width: 60px;
        height: 26px;
        line-height: 26px;
        text-align: center;
        display: inline-block;
      }
    }
    .pitch{
      border-bottom: 3px solid @mainNavColor;
    }
</style>
