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
        <span class="pzh">记-
          <el-input-number size="mini" v-model="num" controls-position="right" @change="handleChange" :min="1"></el-input-number>
          号
        </span>
        <span class="title-a">日期：
            <el-date-picker
              v-model="value1"
              type="date"
              @change="handleChangeDate"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
        </span>
        <span class="title-b">2019年第5期</span>
        <span class="title-c">附单据<input class="title-four" v-model="fujian" @change="handleChangeNum">张</span>
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
          <voucherList :digest='digest'
          v-for="(item,index) in list"
          :index="index"
          :key="index"
          @flag='handleComponentsValue'
          @addclick='handleAddRow'
          @deleteclick='handleDeleteRow'
          @sub="handlesub">
          </voucherList>
        </div>
        <!-- 合计 -->
        <div class="content-footer">
          <div class="total">&nbsp;&nbsp;&nbsp;合计：
            <span v-if="borrowCount == loanCount">{{dxsz}}</span>
          </div>
          <div class="total-borrow" :class="borrowCount < 0 ? 'redbox' : ''">
            <div>{{borrowAllArray[12] == undefined ? '' : borrowAllArray[12]}}</div>
            <div>{{borrowAllArray[11] == undefined ? '' : borrowAllArray[11]}}</div>
            <div>{{borrowAllArray[10] == undefined ? '' : borrowAllArray[10]}}</div>
            <div>{{borrowAllArray[9] == undefined ? '' : borrowAllArray[9]}}</div>
            <div>{{borrowAllArray[8] == undefined ? '' : borrowAllArray[8]}}</div>
            <div>{{borrowAllArray[7] == undefined ? '' : borrowAllArray[7]}}</div>
            <div>{{borrowAllArray[6] == undefined ? '' : borrowAllArray[6]}}</div>
            <div>{{borrowAllArray[5] == undefined ? '' : borrowAllArray[5]}}</div>
            <div>{{borrowAllArray[4] == undefined ? '' : borrowAllArray[4]}}</div>
            <div>{{borrowAllArray[3] == undefined ? '' : borrowAllArray[3]}}</div>
            <div>{{borrowAllArray[2] == undefined ? '' : borrowAllArray[2]}}</div>
            <div>{{borrowAllArray[1] == undefined ? '' : borrowAllArray[1]}}</div>
            <div>{{borrowAllArray[0] == undefined ? '' : borrowAllArray[0]}}</div>
          </div>
          <div class="total-loan" :class="loanCount < 0 ? 'redbox' : ''">
            <div>{{loanAllArray[12] == undefined ? '' : loanAllArray[12]}}</div>
            <div>{{loanAllArray[11] == undefined ? '' : loanAllArray[11]}}</div>
            <div>{{loanAllArray[10] == undefined ? '' : loanAllArray[10]}}</div>
            <div>{{loanAllArray[9] == undefined ? '' : loanAllArray[9]}}</div>
            <div>{{loanAllArray[8] == undefined ? '' : loanAllArray[8]}}</div>
            <div>{{loanAllArray[7] == undefined ? '' : loanAllArray[7]}}</div>
            <div>{{loanAllArray[6] == undefined ? '' : loanAllArray[6]}}</div>
            <div>{{loanAllArray[5] == undefined ? '' : loanAllArray[5]}}</div>
            <div>{{loanAllArray[4] == undefined ? '' : loanAllArray[4]}}</div>
            <div>{{loanAllArray[3] == undefined ? '' : loanAllArray[3]}}</div>
            <div>{{loanAllArray[2] == undefined ? '' : loanAllArray[2]}}</div>
            <div>{{loanAllArray[1] == undefined ? '' : loanAllArray[1]}}</div>
            <div>{{loanAllArray[0] == undefined ? '' : loanAllArray[0]}}</div>
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
    <div class="footer" v-if="!saveOnly">
      <el-button size="small" @click="saveNew">保存并新增(F12)</el-button>
      <el-button size="small" @click="saveS">保存(Ctrl+S)</el-button>
    </div>
    <!-- 点击保存之后 出现新的按钮 -->
    <div class="footer1" v-if="saveOnly">
      <el-button size="small">打印</el-button>
      <el-button size="small" @click='saveOnly=false'>新增</el-button>
      <el-button size="small">保存(Ctrl+S)</el-button>
      <el-button size="small">审核</el-button>
      <el-button size="small" class="danger">删除</el-button>
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
    created() {
      this.list.forEach(item => {
        item.borrow = ''
        item.loan = ''
      })
    },
    data() {
      return {
        value1: '',//日期
        restaurants: [],
        state1: '',
        list: [{},{},{},{}],
        borrowAll: '',
        loanAll: '',
        borrowAllArray: [],
        loanAllArray: [],
        num:1,
        fujian:0,
        borrowCount: 0,
        loanCount: 0,
        dxsz: '',
        saveOnly:false,
        digest: ''
      }
    },
    watch: {
      borrowCount() {
        this.dxsz = (this.borrowCount + '').split('')
        // this.dxsz = this.borrowCount
      }
    },
    methods:{
      // 下拉建议 组件
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
      // 左右按钮
      handleRight(){
        console.log('right')
      },
      handleLeft(){
        console.log('left')
      },
      // 合计
      handleComponentsValue(val) {
        this.list[val.index].borrow = val.borrow
        this.list[val.index].loan = val.loan
        let borrowmiddle = 0
        let loanmiddle = 0
        this.list.forEach(item => {
          borrowmiddle += Number(item.borrow)
          loanmiddle += Number(item.loan)
        })
        this.borrowCount = borrowmiddle
        this.loanCount = loanmiddle
        const borrowArray = this.typeFix(this.borrowCount + '')
        const loanArray = this.typeFix(this.loanCount + '')
        if(borrowArray[2] == "0") {
          this.borrowAllArray = []
        } else {
          this.borrowAllArray = borrowArray
        }
        if(loanArray[2] == "0") {
          this.loanAllArray = []
        } else {
          this.loanAllArray = loanArray
        }
        // 金额大写
        if(borrowmiddle == loanmiddle) {
          this.dxsz = this.atoc(borrowmiddle)
          console.log(this.borrowCount)
        }
      },
      // 凭证号
      handleChange(value) {
        console.log(value);
        this.num = value
      },
      // 日期
      handleChangeDate(value){
        console.log(value)
        this.value1 = value
      },
      // 附件张数
      handleChangeNum(value){
        console.log(value.target.value)
        this.fujian = value.target.value
      },
      // 增加行 
      handleAddRow(value){
        const {type,index} = value
        this.list.splice(index,0,{})
      },
      // 删除行
      handleDeleteRow(value){
        const {type,index} = value
        if(this.list.length > 4){
          this.list.splice(index,1)
        }
      },
      // 保存并新增
      saveNew(){
        console.log(111)
        const digestList = this.list.filter(function(item){
          item.digest != ''
        })
        console.log(digestList.length)
        if(digestList.length < 2){
          this.$message({
            type: 'warning',
            message: '有效数据不能少于两行!'
          })
        } else {
          if(this.borrowCount!=this.loanCount){
            this.$message({
              type: 'warning',
              message: '录入借贷不平衡!'
            })
          return;
          } 
        }
      },
      saveS(){
        console.log(222)
        this.saveOnly = true;
      },
      // 摘要 处理
      handlesub(item) {
        this.digest = item
      },
    },
    async mounted() {
      this.restaurants = this.loadAll();
      await Promise.resolve(this.api.voucher({book_id:1,period:201908}))
      .then(res=>{
        console.log(res)
      }).catch(err=>{
        console.log(err)
      })
    }
}
</script>
<style lang="less" scoped>
// 带建议 输入框
.el-autocomplete .el-input .el-input__inner{
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
  overflow-y: auto;
  position: relative;
  margin: 0px auto;
  width: 1200px;
  height: 542px;
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
      margin-left: 40px;
      /deep/.el-input{
        .el-input__inner{
          height: 28px !important;
          padding-right: 0px !important;
        }
        .el-input__icon{
          line-height: 28px;
        }
      }
      .el-date-editor{
        width: 130px;
        height: 28px;
      }
    }
    .title-b{
      margin-left: 100px;
    }
    .title-c{
      margin-left: 320px;
    }
    .pzh{
      /deep/.el-input-number{
        width: 90px;
      }
    }
    .title-four{
      width: 32px;
      height: 24px;
      margin: 0 4px;
      padding-left: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      box-sizing: border-box;
    }
  }
  // 表
  .content {
    width: 1110px;
    height: 360px;
    margin: 20px auto;
    // text-align: center;
    .content-components{
      width: 1110px;
      // overflow: auto;
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
        line-height: 60px;
        border: 1px solid #666;
        border-bottom: 1.5px solid #666666;
        div {
          flex: 1;
          line-height: 60px; 
          text-align: center;
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
          line-height: 60px; 
          text-align: center;
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
    margin-left: 50px;
    margin-top: 20px;
    margin-bottom: 20px;
    span{
      margin-right: 200px;
    }
  }
}
// 保存按钮
.footer,.footer1{
  margin: 15px 1px 0px 0;
  width: 1120px;
  text-align: right;
  .el-button{
    color: #fff;
    border: transparent;
    background-color: @mainNavColor;
  }
  .danger{
    color: #fff;
    border: transparent;
    background-color: #F07878;
  }
}
.redbox {
  color: red
}
</style>