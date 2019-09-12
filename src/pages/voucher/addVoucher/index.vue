<template>
<div class="body">
    <el-card class="card">
      <!-- 左右切换按钮 -->
      <div class="left" @click="handleCut(-1)">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="right" @click="handleCut(1)">
        <i class="el-icon-arrow-right"></i>
      </div>
      <div class="title">记账凭证</div>
      <!-- 表头上 信息 -->
      <div class="title-item">
        <span class="pzh">记-
          <el-input-number size="mini" v-model="profile" controls-position="right" @change="handleChange" :min="1"></el-input-number>
          号
        </span>
        <span class="title-a">日期：
            <el-date-picker
              v-model="voucher_date"
              type="date"
              @change="handleChangeDate"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
        </span>
        <span class="title-b">{{period?period.slice(0,4)+'年第'+period.slice(-2)+'期':'2019年第08期'}}</span>
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
          <voucherList
          :updateover='update' 
          :digest='item.digest'
          v-for="(item,index) in list"
          :index="index"
          :key="index"
          :itemValue="item"
          @flag='handleComponentsValue'
          @addclick='handleAddRow'
          @deleteclick='handleDeleteRow'
          @sub="handlesub"
          >
          </voucherList>
        </div>
        <!-- 合计 -->
        <div class="content-footer">
          <div class="total">&nbsp;&nbsp;&nbsp;合计：
            <span v-if="heji">{{dxsz}}</span>
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
          <span>制作人 :   {{user_id}}</span>
          <span>制作时间 :    {{create_at}}</span>
          <span class="auditp">审核人 :  {{audit_user}}</span>
          <span>审核时间 :  {{audit_time}}</span>
        </div>
      </div>
    </el-card>
    <!-- 保存按钮 -->
    <div class="footer" v-if="!saveOnly">
      <el-button size="small" @click="saveNew">保存并新增(F12)</el-button>
      <el-button size="small" @click="saveS">保存(Ctrl+S)</el-button>
    </div>
    <!-- 点击保存之后 出现新的按钮 -->
    <div class="footer1" v-if="saveOnly && auditShow">
      <el-button size="small">打印</el-button>
      <el-button size="small" @click='newVoucher'>新增</el-button>
      <el-button size="small" @click="saveS">保存(Ctrl+S)</el-button>
      <el-button size="small" @click="handleAudit">审核</el-button>
      <el-button size="small" class="danger" @click="dialogVisible = true">删除</el-button>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      >
      <span>
        您确定要删除凭证吗？<br>
        <br>
        删除后将不可恢复，并会产生断号。
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"  @click="handleDel">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 点击审核之后 -->
    <div class="footer" v-if="!auditShow&& this.audit_status == '2'">
      <el-button size="small">打印</el-button>
      <el-button size="small" @click="handleAudit2">反审核</el-button>
      <el-button size="small" @click='newVoucher'>新增</el-button>
    </div>
    <div class="audit" v-if="!auditShow && this.audit_status == '2'">
      <img src="./审核.svg" alt="">
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
        voucher_date: '',//日期
        // restaurants: [],
        user_id:'',//制作人
        create_at:"",//制作时间
        audit_user:'',//审核人
        audit_time:'',//审核时间
        audit_status:'1',//审核状态
        state1: '',
        list: [{},{},{},{}],
        borrowAll: '',
        loanAll: '',
        borrowAllArray: [],
        loanAllArray: [],
        profile:1,//凭证号
        newProfile:0,//新增的凭证号
        fujian:0,
        borrowCount: 0,
        loanCount: 0,
        dxsz: '',
        auditShow:true,
        saveOnly:false,
        digest: '',
        update: 0,
        period: '',//期间
        heji: false,
        id:"",//凭证id
        dialogVisible: false, //删除弹框
      }
    },
    watch: {
      borrowCount() {
        this.dxsz = (this.borrowCount + '').split('')
        // this.dxsz = this.borrowCount
      }
    },
    methods:{
      // 左右切换按钮
      async handleCut(value){
        this.saveOnly = true
        const id = Number(this.id)+value
        if(id+2 >=this.newProfile || id<1){
          this.$message({
            type: 'warning',
            message: '未查询到凭证!'
          })
          return
        }
        await Promise.resolve(this.api.voucher['voucherDetail']({book_id:1,period:201908,id:id+1}))
        .then(res=>{
          console.log(res.data)
          this.audit_status==res.data.audit_status
          this.audit_user = ''
          this.audit_time = ''
          this.auditShow = true
          
          this.profile = res.data.profile
          this.id = Number(res.data.id)-1
          this.voucher_date = res.data.voucher_date
          this.fujian = res.data.bills_num
          this.user_id = res.data.user_id
          this.list = res.data.detail
          this.update = 1
          this.period = res.data.period
          this.create_at = res.data.create_at
          this.borrowCount = Number(res.data.amount)
          this.loanCount = Number(res.data.amount)
          this.dxsz = this.daxie(Number(res.data.amount))
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
        if(this.borrowCount == this.loanCount) {
          console.log(this.borrowCount)
          this.dxsz = this.daxie(this.borrowCount)
          this.heji = true
        }
        })
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
        this.profile = value
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
      // 摘要 处理
      handlesub(item) {
        this.digest = item
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
      async saveNew(){
        console.log(this.list)
        let digestList = 0; 
        this.list.forEach(item=>{
          item.digest != '' ? digestList++ : digestList
        })
        console.log(digestList)
        if(digestList < 2){
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
        // } 
        await Promise.resolve(this.api.voucher['voucherAdd']({
          user_id:1,
          book_id:1,
          period:201908,
          profile:this.profile,
          bills_num:0,
          voucher_date:'2019-08-23',
          detail:[
            // {amountDr:3,amountCr:0,subject_id:3,digest:'办公用品1',sequenceNum:1},
            {amountDr:0,amountCr:2,subject_id:6,digest:'办公用品2',sequenceNum:2},
            // {amountDr:2,amountCr:0,subject_id:7,digest:'办公用品3',sequenceNum:3},
            // {amountDr:0,amountCr:3,subject_id:8,digest:'办公用品4',sequenceNum:4},
            ],
          amount:33
          }))
        .then(res=>{
          // alert(res.msg)
        })
        }
      },
      // 仅保存
      saveS(){
        console.log(222)
        this.saveOnly = true;
      },
      // 新增
      async newVoucher(){
        this.saveOnly=false
        this.auditShow = true
        // this.$router.push({path:'/voucher/addVoucher'})
        this.list = [{},{},{},{}]
        await Promise.resolve(this.api.voucher['initVoucher']({book_id:1,period:201908}))
        .then(res=>{
          console.log(res)
          this.id = res.data.v_id
          this.profile = Number(res.data.profile)+1
          this.newProfile = Number(res.data.profile)+1
        }).catch(err=>{
          console.log(err)
        })
          this.voucher_date = ''
          this.list = [{},{},{},{}]
          this.fujian = 0
          this.user_id = ''
          this.period = ''
          this.create_at = ''
          this.borrowCount = ''
          this.loanCount = ''
      },
      // 删除
      handleDel(){
        Promise.resolve(this.api.voucher['voucherDel']({ids:[this.id],status:1}))
        .then(res=>{
          console.log(res)
          if(res.status == 200){
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }
          this.dialogVisible = false
        })
      },
      // 审核
      handleAudit(){
        Promise.resolve(this.api.voucher['voucherAudit']({ids:[this.id],audit:2,is_batch:2}))
        .then(res=>{
          console.log(res)
          if(res.status == 200){
            this.$message({
              type: 'success',
              message: '审核成功!'
            })
            this.auditShow = false
            this.audit_status = res.data.audit_status
            this.audit_user = res.data.audit_user
            this.audit_time = res.data.audit_time
          }
        })
      },
      // 反审核
      handleAudit2(){
        Promise.resolve(this.api.voucher['voucherAudit']({ids:[this.id],audit:3,is_batch:2}))
        .then(res=>{
          console.log(res)
          if(res.status == 200){
            this.$message({
              type: 'success',
              message: '反审核成功!'
            })
          this.auditShow = true
          this.audit_status = res.data.audit_status
          this.audit_user = res.data.audit_user
          this.audit_time = res.data.audit_time
          }
        })
      }
    },
    async mounted() {
      await Promise.resolve(this.api.voucher['initVoucher']({book_id:1,period:201908}))
      .then(res=>{
        console.log(res)
        this.id = res.data.v_id
        this.profile = Number(res.data.profile)+1
        this.newProfile = Number(res.data.profile)+1
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
      margin-right: 150px;
    }
    .auditp{
      margin-right: 80px;
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
.audit{
  width: 146px;
  position:fixed;
  top:100px;
  right: 370px;
  height: 50px;
  border: 1px solid transparent;
  img{
    width: 100%;
  }
}
</style>