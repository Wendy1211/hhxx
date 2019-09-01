<template>
<div class="body">
    <el-card class="card">
      <!-- 左右切换按钮 -->
      <div class="left" @click="handleLeft">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="right" @click="handleRight">
        <i class="el-icon-arrow-right"></i>
      </div>
      <div class="title">记账凭证</div>
      <!-- 表头上 信息 -->
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
      <!-- 表内容 -->
      <div class="content">
        <!-- 表头 -->
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
        <div class="content-components">
          <voucherList></voucherList>
          <voucherList></voucherList>
          <voucherList></voucherList>
          <voucherList></voucherList>
        </div>
        <!-- 合计 -->
        <div class="content-footer">
          <div class="total">&nbsp;&nbsp;&nbsp;合计：</div>
          <div class="total-borrow">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div class="total-loan">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <!-- 审核信息 -->
        <div class="bottom">
          <span>制作人:</span>
          <span>制作时间:</span>
          <span>审核人:</span>
          <span>审核时间:</span>
        </div>
      </div>
    </el-card>
    <!-- 保存按钮 -->
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
      }
    },
    methods:{
      handleRight(){
        console.log('right')
      },
      handleLeft(){
        console.log('left')
      },
  },
  mounted() {
  }
}
</script>

<style lang="less" scoped>
.body{
  width: 1220px;
  padding: 10px;
  margin: 0 auto;
}
.card {
  position: relative;
  margin: 0px auto;
  width: 1200px;
  height: 562px;
  // 左右切换
  .left{
    position: absolute;
    top:40%;
    left:0;
    width: 20px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    border: 1px solid rgb(177, 174, 174);
    background-color: rgb(177, 174, 174);
    i{
      color: #fff;
      font-size: 22px;
    }
  }
  .right{
    position: absolute;
    right: 0;
    top:40%;
    width: 20px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    border: 1px solid rgb(177, 174, 174);
    background-color: rgb(177, 174, 174);
    i{
      color: #fff;
      font-size: 22px;

    }
  }
  // 表上信息
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
  // 表
  .content {
    width: 1110px;
    height: 560px;
    margin: 20px auto;
    // text-align: center;
    .content-components{
      width: 1110px;
    }
    .content-head,.content-footer{
      width: 1020px;
      display: flex;
      height: 60px;
      margin: 0 auto;
      .digest {
        flex: 1;
        text-align: center;
        line-height: 60px;
        border-left: 1.5px solid #666666;
        border-top: 1.5px solid #666666;
      }
      .subject {
        flex: 1;
        text-align: center;
        line-height: 60px;
        border-left: 1px solid #666666;
        border-top: 1.5px solid #666666;
      }
      .total{
        flex:2;
        padding-left: 1px;
        line-height: 60px;
        border-left: 1.5px solid #666666;
        border-bottom: 1.5px solid #666666;
        border-top: 1px solid #666666;
      }
      .total-borrow{
        flex: 1;
        width: 256px;
        display: flex;
        border: 1px solid #666;
        border-bottom: 1.5px solid #666666;
        div {
          flex: 1;
          border-right: 1px solid #ccc;
        }
        div:last-child {
          border-right: none;
        }
        div:nth-child(5),div:nth-child(8) {
          border-right: #82cef1 1px solid !important;
        }
        div:nth-child(11) {
          border-right: #f3a193 1px solid !important;
        }
      }
      .total-loan{
        flex: 1;
        display: flex;
        border-right: 1.5px solid #666666;
        border-bottom: 1.5px solid #666666;
        border-top: 1px solid #666666;
        div {
          flex: 1;
          border-right: 1px solid #ccc;
        }
        div:last-child {
          border-right: none;
        }
        div:nth-child(5),div:nth-child(8) {
          border-right: #82cef1 1px solid !important;
        }
        div:nth-child(11) {
          border-right: #f3a193 1px solid !important;
        }
      }
    }
    .borrow {
      flex: 1;
      text-align: center;
      border-left: 1px solid #666666;
      border-top: 1.5px solid #666666;
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
          flex: 1;
          border-right:1px solid #ccc;
        }
        div:last-child {
          border-right: none;
        }
        div:nth-child(5),div:nth-child(8) {
          border-right: #82cef1 1px solid !important;
        }
        div:nth-child(11) {
          border-right: #f3a193 1px solid !important;
        }
      }
    }
    .loan {
      flex: 1;
      text-align: center;
      border: 1px solid #666666;
      border-top:1.5px solid #666666;
      border-right:1.5px solid #666666;
      border-bottom: none;
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
          flex: 1;
          border-right:1px solid #ccc;
        }
        div:last-child {
          border-right: none;
        }
        div:nth-child(5),div:nth-child(8) {
          border-right: #82cef1 1px solid !important;
        }
        div:nth-child(11) {
          border-right: #f3a193 1px solid !important;
        }
      }
    }
  }
  // 审核信息
  .bottom{
    margin-left: 40px;
    margin-top: 20px;
    span{
      margin-right: 200px;
    }
  }
}
// 保存按钮
.footer{
  margin: 15px 1px 0px 0;
  width: 1120px;
  text-align: right;
  .el-button{
    color: #fff;
    background-color: #34A8FF ;
  }
}
</style>