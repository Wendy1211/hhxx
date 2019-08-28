<template>
    <div class="content-item">
          <div class="digest">
              <!-- 带建议的下拉框 -->
              <el-autocomplete
              class="inline-input"
              v-model="state1"
              :fetch-suggestions="querySearch"
              placeholder=""
              @select="handleSelect"
            ></el-autocomplete>
          </div>
          <div class="subject">
              <el-autocomplete
              class="inline-input"
              v-model="state2"
              :fetch-suggestions="querySearch"
              placeholder=""
              @select="handleSelect"
            ></el-autocomplete>
          </div>
          <div class="borrow">
            <div class="borrow-bottom">
              <div v-for="(item,index) in 13" :key="index"></div>
            </div>
          </div>
          <div class="loan">
            <div class="loan-bottom">
              <div v-for="(item,index) in 13" :key="index"></div>
            </div>
          </div>
        </div>
</template>
<script>
export default {
  data() {
    return {
        restaurants: [],
        state1: '',
        state2: '',
    }
  },
  methods:{
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
          { "value": "提现" },
          { "value": "提现" },
          { "value": "提现" },
          { "value": "利息收入" },
          { "value": "利息收入" },
          { "value": "利息收入" },
          { "value": "支付工资" },
          { "value": "支付工资" },
          { "value": "支付工资" },
          { "value": "支付工资" },
           ];
      },
      handleSelect(item) {
        console.log(item);
      }
    },
    mounted() {
      this.restaurants = this.loadAll();
    }
}
</script>
<style lang="less" scoped>
// 带建议 输入框
.el-autocomplete /deep/.el-input /deep/.el-input__inner{
    padding-left: 10px !important;
    padding-right: 0px !important;
    width: 253px !important;
    height: 55px !important;
    border: none !important;
    // outline: 2px solid rgb(138, 204, 243);
    box-sizing: border-box !important;
}
.content-item {
      height: 60px;
      display: flex;
      .digest {
        flex: 1;
        text-align: center;
        border:1px solid #666666;
        line-height: 60px;
        /deep/
        .el-select{
          width: 303px;
          height: 60px;
          margin-left:0 !important;
            .el-input__inner{
              width: 303px;
              height: 58px;
            }
          }
      }
      .subject {
        flex: 1;
        text-align: center;
        border: 1px solid #666666;
        line-height: 60px;
      }
      .total{
        flex:2;
        display: flex;
        padding-left: 2px;
        box-sizing: border-box;
        align-items: center;
        border: 1px solid #666666;
      }
      .borrow {
        flex: 1;
        text-align: center;
        border: 1px solid #666666;
        .borrow-bottom {
          height: 60px;
          display: flex;
          justify-content: center;
          align-items: center;
          div {
            flex: 1;
            height: 59px;
            border-right: 1px solid #666666;
            box-sizing: border-box;
          }
          div:last-child {
            border-right: none;

          }
        }
      }
      .loan {
        flex: 1;
        text-align: center;
        border: 1px solid #666666;
        .loan-bottom {
          height: 60px;
          display: flex;
          justify-content: center;
          align-items: center;
          div {
            flex: 1;
            height: 59px;
            border-right: 1px solid #666666;
            box-sizing: border-box;
          }
          div:last-child {
            border-right: none;
          }
        }
      }
    }
</style>