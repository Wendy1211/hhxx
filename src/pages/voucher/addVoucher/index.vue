<template>
<div class="body">
    <el-card class="card">
      <div class="title">记账凭证</div>
      <div class="title-item">
        <span >记-
          <input class="title-one">号
        </span>
        <span class="title-a">日期：
            <el-date-picker
              v-model="value1"
              type="date"
              suffix-icon="el-icon-date"
              placeholder="选择日期">
            </el-date-picker>
        </span>
        <span class="title-b">2019年第5期</span>
        <span class="title-c">附单据<input class="title-four">张</span>
      </div>
      <div class="content">
        <div class="content-head">
          <div class="digest">摘要</div>
          <div class="subject">会计科目</div>
          <div class="borrow">
            <div class="borrow-top">借方金额</div>
            <div class="borrow-bottom">
              <div>百</div>
              <div>十</div>
              <div>亿</div>
              <div>千</div>
              <div>百</div>
              <div>十</div>
              <div>万</div>
              <div>千</div>
              <div>百</div>
              <div>十</div>
              <div>元</div>
              <div>角</div>
              <div>分</div>
            </div>
          </div>
          <div class="loan">
            <div class="loan-top">贷方金额</div>
            <div class="loan-bottom">
              <div>百</div>
              <div>十</div>
              <div>亿</div>
              <div>千</div>
              <div>百</div>
              <div>十</div>
              <div>万</div>
              <div>千</div>
              <div>百</div>
              <div>十</div>
              <div>元</div>
              <div>角</div>
              <div>分</div>
            </div>
          </div>
        </div>
        <!-- 一行 组件 -->
        <voucherList></voucherList>
        <voucherList></voucherList>
        <voucherList></voucherList>
        <voucherList></voucherList>
        
        <div class="bottom">
          <span>制作人:</span>
          <span>制作时间:</span>
          <span>审核人:</span>
          <span>审核时间:</span>
        </div>
      </div>
    </el-card>
    <div class="footer">
        <el-button size="small">保存并新增(F12)</el-button>
        <el-button size="small">保存(Ctrl+S)</el-button>
    </div>
</div>
    
</template>
<script>
import voucherList from './voucherList'
export default {
    name:'AddVoucher',
    components:{
      voucherList
    },
    data() {
        return {
          value1: '',//日期
          restaurants: [],
          state1: '',
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
          { "value": "利息收入" },
          { "value": "利息收入" },
          { "value": "利息收入" },
          { "value": "利息收入" },
          { "value": "支付工资" },
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
    box-sizing: border-box !important;
}
.body{
  width: 1220px;
  padding: 10px;
  margin: 0 auto;
}
.card {
  margin: 0px auto;
  width: 1200px;
  height: 562px;
  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 144px;
    height: 36px;
    padding-bottom: 4px;
    border-bottom: 3px double #000;
    margin: 0 auto;
    font: 600 34px/36px 'PingFangSC'
  }
  .title-item{
    width: 1020px;
    height: 28px;
    font-size: 14px;
    margin-left: 80px;
    line-height: 28px;
    margin-top: 10px;
    .title-a{
      margin-left: 60px;
      /deep/
      .el-date-editor{
        width: 140px;
      }
      .el-input__inner{
        padding-right: 0px;

      }
    }
    .title-b{
      margin-left: 120px;
    }
    .title-c{
      margin-left: 340px;
    }
    .title-one{
      width: 40px;
      height: 28px;
      margin: 0 4px;
      padding-left: 10px;
      box-sizing: border-box;
    }
    .title-four{
      width: 32px;
      height: 28px;
      margin: 0 4px;
      padding-left: 10px;
      box-sizing: border-box;
    }
  }
  .content {
    width: 1020px;
    height: 560px;
    margin: 20px auto;
    .content-head {
      display: flex;
      height: 60px;
      .digest {
        flex: 1;
        text-align: center;
        line-height: 60px;
        border: 1px solid #666666;
      }
      .subject {
        flex: 1;
        text-align: center;
        line-height: 60px;
        border: 1px solid #666666;
      }
      .borrow {
        flex: 1;
        text-align: center;
        border: 1px solid #666666;
        .borrow-top {
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          border-bottom: 1px solid #666666;
        }
        .borrow-bottom {
          height: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          div {
            flex: 1
          }
        }
      }
      .loan {
        flex: 1;
        text-align: center;
        border: 1px solid #666666;
        .loan-top {
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 1px solid #666666;
          box-sizing: border-box;
        }
        .loan-bottom {
          height: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          div {
            flex: 1
          }
        }
      }
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
    .bottom{
      margin-left: 40px;
      margin-top: 20px;
      span{
        margin-right: 200px;
      }
    }
  }
}
.footer{
  margin: 15px 1px 0px 0;
  width: 1120px;
  text-align: right;
  .el-button{
    color: #fff;
    background-color: #668CFF ;
  }
}
</style>