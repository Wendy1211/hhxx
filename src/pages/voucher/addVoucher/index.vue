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
        <span class="pzh">
          记-
          <el-input-number
            size="mini"
            v-model="profile"
            controls-position="right"
            @change="handleChange"
            :min="1"
          ></el-input-number>号
        </span>
        <span class="title-a">
          日期：
          <el-date-picker
            v-model="voucher_date"
            type="date"
            @change="handleChangeDate"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          ></el-date-picker>
        </span>
        <span class="title-b">{{period?period.slice(0,4)+'年第'+period.slice(-2)+'期':'2019年第08期'}}</span>
        <span class="title-c">
          附单据
          <input class="title-four" v-model="fujian" @change="handleChangeNum" />张
        </span>
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
          <!-- <voucherList
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
          </voucherList>-->
          <div class="content-row" v-for="(item,index) in list" :key="index">
            <div class="content-item">
              <!-- 加一行 -->
              <div class="add" @click="handleAdd(index)">
                <i class="el-icon-circle-plus-outline"></i>
              </div>
              <!-- 表 内容 -->
              <div class="item-box">
                <!-- 摘要 -->
                <div class="digest" ref="click1">
                  <!-- 带建议的下拉框 -->
                  <el-autocomplete
                    v-focus="item.focusIndex === 1"
                    @keydown.tab="nextFocus(item,1)"
                    class="inline-input"
                    v-model="item.state1"
                    @focus="handleFocus(item)"
                    @input="handleInput(item)"
                    :fetch-suggestions="querySearch"
                    :trigger-on-focus="false"
                    @select="handleSelect"
                    @click="handleDigestChilk"
                  ></el-autocomplete>
                </div>
                <!-- 科目 -->
                <div class="subject">
                  <el-autocomplete
                    v-focus="item.focusIndex === 2"
                    @keydown.tab="nextFocus(item,2)"
                    class="inline-input"
                    v-model="item.state2"
                    @focus="handleFocus1(item)"
                    @input="handleinput1(item)"
                    :fetch-suggestions="querySearch1"
                    placeholder
                    @select="handleSelect1"
                  ></el-autocomplete>
                </div>
                <!-- 借 -->
                <div class="borrow">
                  <div class="borrow-bottom1" @click="item.borrowInput = !item.borrowInput">
                    <div class="div-box" v-show="!(item.borrowInput)" :class="item.borrowValue < 0 ? 'red' : ''">
                      <div>{{item.borrowCountArray[12] == undefined ? '' : item.borrowCountArray[12]}}</div>
                      <div>{{item.borrowCountArray[11] == undefined ? '' : item.borrowCountArray[11]}}</div>
                      <div>{{item.borrowCountArray[10] == undefined ? '' : item.borrowCountArray[10]}}</div>
                      <div>{{item.borrowCountArray[9] == undefined ? '' : item.borrowCountArray[9]}}</div>
                      <div>{{item.borrowCountArray[8] == undefined ? '' : item.borrowCountArray[8]}}</div>
                      <div>{{item.borrowCountArray[7] == undefined ? '' : item.borrowCountArray[7]}}</div>
                      <div>{{item.borrowCountArray[6] == undefined ? '' : item.borrowCountArray[6]}}</div>
                      <div>{{item.borrowCountArray[5] == undefined ? '' : item.borrowCountArray[5]}}</div>
                      <div>{{item.borrowCountArray[4] == undefined ? '' : item.borrowCountArray[4]}}</div>
                      <div>{{item.borrowCountArray[3] == undefined ? '' : item.borrowCountArray[3]}}</div>
                      <div>{{item.borrowCountArray[2] == undefined ? '' : item.borrowCountArray[2]}}</div>
                      <div>{{item.borrowCountArray[1] == undefined ? '' : item.borrowCountArray[1]}}</div>
                      <div>{{item.borrowCountArray[0] == undefined ? '' : item.borrowCountArray[0]}}</div>
                    </div>
                    <!-- <input type="text" :disabled="Boolean(loanCountArray.length)" ref="borrowgain" v-show="borrowInput" @change="borrowInputEvent" @blur="borrowBlurEvent"> -->
                    <input
                      type="text"
                      v-model="item.borrowValue"
                      ref="borrowgain"
                      v-show="item.borrowInput"
                      @blur="borrowBlurEvent(item)"
                      v-focus="item.focusIndex === 3"
                      @keydown.tab="nextFocus(item,3)"
                    />
                  </div>
                </div>
                <!-- 贷 -->
                <div class="loan">
                  <div class="loan-bottom1" @click="loanClick">
                    <div class="div-box" v-show="!item.loanInput" :class="item.loanValue < 0 ? 'red' : ''">
                      <div>{{item.loanCountArray[12] == undefined ? '' : item.loanCountArray[12]}}</div>
                      <div>{{item.loanCountArray[11] == undefined ? '' : item.loanCountArray[11]}}</div>
                      <div>{{item.loanCountArray[10] == undefined ? '' : item.loanCountArray[10]}}</div>
                      <div>{{item.loanCountArray[9] == undefined ? '' : item.loanCountArray[9]}}</div>
                      <div>{{item.loanCountArray[8] == undefined ? '' : item.loanCountArray[8]}}</div>
                      <div>{{item.loanCountArray[7] == undefined ? '' : item.loanCountArray[7]}}</div>
                      <div>{{item.loanCountArray[6] == undefined ? '' : item.loanCountArray[6]}}</div>
                      <div>{{item.loanCountArray[5] == undefined ? '' : item.loanCountArray[5]}}</div>
                      <div>{{item.loanCountArray[4] == undefined ? '' : item.loanCountArray[4]}}</div>
                      <div>{{item.loanCountArray[3] == undefined ? '' : item.loanCountArray[3]}}</div>
                      <div>{{item.loanCountArray[2] == undefined ? '' : item.loanCountArray[2]}}</div>
                      <div>{{item.loanCountArray[1] == undefined ? '' : item.loanCountArray[1]}}</div>
                      <div>{{item.loanCountArray[0] == undefined ? '' : item.loanCountArray[0]}}</div>
                    </div>
                    <input
                      type="text"
                      ref="loangain"
                      v-model="item.loanValue"
                      v-show="item.loanInput"
                      @blur="loanBlurEvent(item)"
                      v-focus="item.focusIndex === 4"
                      @keydown.tab="nextFocus(item,4)"
                    />
                  </div>
                </div>
              </div>
              <!-- 删一行 -->
              <div class="delete" @click="handleDelete(index)">
                <i class="el-icon-delete"></i>
              </div>
            </div>
          </div>
        </div>
        <!-- 合计 -->
        <div class="content-footer">
          <div class="total">
            &nbsp;&nbsp;&nbsp;合计：
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
          <span>制作人 : {{user_id}}</span>
          <span>制作时间 : {{create_at}}</span>
          <span>审核人 : {{audit_user}}</span>
          <span>审核时间 : {{audit_time}}</span>
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
      <el-button size="small" @click="newVoucher">新增</el-button>
      <el-button size="small" @click="saveS">保存(Ctrl+S)</el-button>
      <el-button size="small" @click="handleAudit">审核</el-button>
      <el-button size="small" class="danger" @click="dialogVisible = true">删除</el-button>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>
        您确定要删除凭证吗？
        <br />
        <br />删除后将不可恢复，并会产生断号。
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleDel">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 点击审核之后 -->
    <div class="footer" v-if="!auditShow">
      <el-button size="small">打印</el-button>
      <el-button size="small" @click="handleAudit2">反审核</el-button>
      <el-button size="small" @click="newVoucher">新增</el-button>
    </div>
    <div class="audit" v-if="!auditShow">
      <img src="./audit.png" alt />
    </div>
  </div>
</template>
<script>
// import voucherList from "./voucherList";
export default {
  name: "AddVoucher",
  // components: {
  //   voucherList
  // }
  created() {
    this.list.forEach(item => {
      item.borrow = "";
      item.loan = "";
      item.borrowCountArray= [];
      item.loanCountArray= [];
      item.borrowInput = false;
      item.loanInput = false;
      item.focusIndex = 1;
      item.borrowValue = '';
      item.loanValue = '';
    });
    this.subList()
  },
  data() {
    return {
      voucher_date: "", //日期
      // restaurants: [],
      user_id: "", //制作人
      create_at: "", //制作时间
      audit_user: "", //审核人
      audit_time: "", //审核时间
      state1: "",
      list: [{}, {}, {}, {}],
      borrowAll: "",
      loanAll: "",
      borrowAllArray: [],
      loanAllArray: [],
      profile: 1, //凭证号
      newProfile: 0, //新增的凭证号
      fujian: 0,
      borrowCount: 0,
      loanCount: 0,
      dxsz: "",
      auditShow: true,
      saveOnly: false,
      digest: "",
      update: 0,
      period: "", //期间
      heji: false,
      id: "", //凭证id
      dialogVisible: false, //删除弹框
      audit_status: "1", //审核状态
      restaurants: [],
      restaurants1: [],
      state2: '',
      focusIndex: 1
    };
  },
  watch: {
    borrowCount() {
      if (this.borrowCount == this.loanCount) {
        this.dxsz = this.daxie(this.borrowCount);
        this.heji = true;
      }
    },
    Count() {
      if (this.borrowCount == this.loanCount) {
        this.dxsz = this.daxie(this.borrowCount);
        this.heji = true;
      }
    }
    // this.dxsz = (this.borrowCount + '').split('')
    // this.dxsz = this.borrowCount
  },
  methods: {
    // 左右切换按钮
    async handleCut(value) {
      this.saveOnly = true;
      const id = Number(this.id) + value;
      if (id + 2 >= this.newProfile || id < 1) {
        this.$message({
          type: "warning",
          message: "未查询到凭证!"
        });
        return;
      }
      await Promise.resolve(
        this.api.voucher["voucherDetail"]({
          book_id: 1,
          period: 201908,
          id: id + 1
        })
      ).then(res => {
        console.log(res.data);
        this.profile = res.data.profile;
        this.id = Number(res.data.id) - 1;
        this.voucher_date = res.data.voucher_date;
        this.fujian = res.data.bills_num;
        this.user_id = res.data.user_id;
        this.list = res.data.detail;
        this.update = 1;
        this.period = res.data.period;
        this.create_at = res.data.create_at;
        this.borrowCount = Number(res.data.amount);
        this.loanCount = Number(res.data.amount);
        this.dxsz = this.daxie(Number(res.data.amount));
        const borrowArray = this.typeFix(this.borrowCount + "");
        const loanArray = this.typeFix(this.loanCount + "");
        if (borrowArray[2] == "0") {
          this.borrowAllArray = [];
        } else {
          this.borrowAllArray = borrowArray;
        }
        if (loanArray[2] == "0") {
          this.loanAllArray = [];
        } else {
          this.loanAllArray = loanArray;
        }
        // 金额大写
        if (this.borrowCount == this.loanCount) {
          console.log(this.borrowCount);
          this.dxsz = this.daxie(this.borrowCount);
          this.heji = true;
        }
      });
    },
    // 合计
    handleComponentsValue(val) {
      this.list[val.index].borrow = val.borrow;
      this.list[val.index].loan = val.loan;
      let borrowmiddle = 0;
      let loanmiddle = 0;
      this.list.forEach(item => {
        borrowmiddle += Number(item.borrow);
        loanmiddle += Number(item.loan);
      });
      this.borrowCount = borrowmiddle;
      this.loanCount = loanmiddle;
      const borrowArray = this.typeFix(this.borrowCount + "");
      const loanArray = this.typeFix(this.loanCount + "");
      if (borrowArray[2] == "0") {
        this.borrowAllArray = [];
      } else {
        this.borrowAllArray = borrowArray;
      }
      if (loanArray[2] == "0") {
        this.loanAllArray = [];
      } else {
        this.loanAllArray = loanArray;
      }
      // 金额大写
      if (borrowmiddle == loanmiddle) {
        this.dxsz = this.atoc(borrowmiddle);
        console.log(this.borrowCount);
      }
    },
    // 凭证号
    handleChange(value) {
      console.log(value);
      this.profile = value;
    },
    // 日期
    handleChangeDate(value) {
      console.log(value);
      this.value1 = value;
    },
    // 附件张数
    handleChangeNum(value) {
      console.log(value.target.value);
      this.fujian = value.target.value;
    },
    // 摘要 处理
    handlesub(item) {
      this.digest = item;
    },
    // 增加行
    handleAddRow(value) {
      const { type, index } = value;
      this.list.splice(index, 0, { borrow: 1, loan: "" });
      console.log(this.list);
    },
    // 删除行
    handleDeleteRow(value) {
      const { type, index } = value;
      if (this.list.length > 4) {
        this.list.splice(index, 1);
      }
    },
    // 保存并新增
    async saveNew() {
      console.log(this.list);
      let digestList = 0;
      this.list.forEach(item => {
        item.digest != "" ? digestList++ : digestList;
      });
      console.log(digestList);
      if (digestList < 2) {
        this.$message({
          type: "warning",
          message: "有效数据不能少于两行!"
        });
      } else {
        if (this.borrowCount != this.loanCount) {
          this.$message({
            type: "warning",
            message: "录入借贷不平衡!"
          });
          return;
        }
        // }
        await Promise.resolve(
          this.api.voucher["voucherAdd"]({
            user_id: 1,
            book_id: 1,
            period: 201908,
            profile: this.profile,
            bills_num: 0,
            voucher_date: "2019-08-23",
            detail: [
              // {amountDr:3,amountCr:0,subject_id:3,digest:'办公用品1',sequenceNum:1},
              {
                amountDr: 0,
                amountCr: 2,
                subject_id: 6,
                digest: "办公用品2",
                sequenceNum: 2
              }
              // {amountDr:2,amountCr:0,subject_id:7,digest:'办公用品3',sequenceNum:3},
              // {amountDr:0,amountCr:3,subject_id:8,digest:'办公用品4',sequenceNum:4},
            ],
            amount: 33
          })
        ).then(res => {
          // alert(res.msg)
        });
      }
    },
    // 仅保存
    saveS() {
      console.log(222);
      this.saveOnly = true;
    },
    // 新增
    async newVoucher() {
      this.saveOnly = false;
      this.auditShow = true;
      // this.$router.push({path:'/voucher/addVoucher'})
      this.list = [{}, {}, {}, {}];
      await Promise.resolve(
        this.api.voucher["initVoucher"]({ book_id: 1, period: 201908 })
      )
        .then(res => {
          console.log(res);
          this.id = res.data.v_id;
          this.profile = Number(res.data.profile) + 1;
          this.newProfile = Number(res.data.profile) + 1;
        })
        .catch(err => {
          console.log(err);
        });
      this.voucher_date = "";
      this.list = [{}, {}, {}, {}];
      this.fujian = 0;
      this.user_id = "";
      this.period = "";
      this.create_at = "";
      this.borrowCount = "";
      this.loanCount = "";
    },
    // 删除
    handleDel() {
      Promise.resolve(
        this.api.voucher["voucherDel"]({ ids: [12], status: 1 })
      ).then(res => {
        console.log(res);
        if (res.status == 200) {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        }
        this.dialogVisible = false;
      });
    },
    // 审核
    handleAudit() {
      Promise.resolve(
        this.api.voucher["voucherAudit"]({ ids: [this.id], audit: 2 })
      ).then(res => {
        console.log(res);
        if (res.status == 200) {
          this.$message({
            type: "success",
            message: "审核成功!"
          });
          // this.auditShow = false
          // this.audit_status = res.audit_status
          // this.audit_user = res.data.audit_user
          // this.audit_time = res.data.audit_time
        }
      });
    },
    // 反审核
    handleAudit2() {
      Promise.resolve(
        this.api.voucher["voucherAudit"]({ ids: [this.id], audit: 3 })
      ).then(res => {
        console.log(res);
        if (res.status == 200) {
          this.$message({
            type: "success",
            message: "反审核成功!"
          });
          Promise.resolve(
            this.api.voucher["voucherDetail"]({
              book_id: 1,
              period: 201908,
              id: id + 1
            })
          ).then(res => {
            console.log(res.data);
            this.profile = res.data.profile;
            this.id = Number(res.data.id) - 1;
            this.voucher_date = res.data.voucher_date;
            this.fujian = res.data.bills_num;
            this.user_id = res.data.user_id;
            this.list = res.data.detail;
            this.update = 1;
            this.period = res.data.period;
            this.create_at = res.data.create_at;
            this.borrowCount = Number(res.data.amount);
            this.loanCount = Number(res.data.amount);
            this.dxsz = this.daxie(Number(res.data.amount));
            const borrowArray = this.typeFix(this.borrowCount + "");
            const loanArray = this.typeFix(this.loanCount + "");
            if (borrowArray[2] == "0") {
              this.borrowAllArray = [];
            } else {
              this.borrowAllArray = borrowArray;
            }
            if (loanArray[2] == "0") {
              this.loanAllArray = [];
            } else {
              this.loanAllArray = loanArray;
            }
            // 金额大写
            if (this.borrowCount == this.loanCount) {
              console.log(this.borrowCount);
              this.dxsz = this.daxie(this.borrowCount);
              this.heji = true;
            }
          });
          // this.auditShow = true
          // this.audit_status = res.data.audit_status
          // this.audit_user = res.data.audit_user
          // this.audit_time = res.data.audit_time
        }
      });
    },
    handleAdd() {},
    // 摘要下拉建议 组件
    querySearch(queryString, cb) {
      console.log(this.restaurants);
      var results = this.restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) !==
          -1
        );
      };
    },
    loadAll() {
      return this.restaurants;
    },
    // 科目下拉
    querySearch1(queryString, cb) {
      var restaurants1 = this.restaurants1;
      var results = queryString
        ? restaurants1.filter(this.createFilter(queryString))
        : restaurants1;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter1(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) !==
          -1
        );
      };
    },
    loadAll1() {
      return this.restaurants1;
    },
    // 摘要下拉选择
    handleSelect(item) {
      console.log(item.value);
    },
    // 科目下拉选择
    handleSelect1(item) {
      console.log(item.value);
    },
    handleDigestChilk() {

    },
    handleFocus() {

    },
    borrowClick(item) {
      console.log(111)
      console.log(item)
      item.borrowInput = true;
      console.log(222);
      this.$set(item,item.borrowInput,true)
      // this.$nextTick(() => {
      //   item.$refs.borrowgain.focus()
      // })
    },
    borrowBlurEvent(item) {
      const array = this.typeFix(item.borrowValue);
      item.borrowCountArray = array;
      console.log(item.borrowValue);
      if (item.borrowValue != "") {
        item.loanValue = "";
        item.loanCountArray = [];
      }
      item.borrowInput = false;
      // this.$emit("flag", {
      //   borrow: this.borrowValue,
      //   loan: this.loanValue,
      //   index: this.index
      // });
    },
    loanClick(item) {
      item.loanInput = true;
      this.$nextTick(() => {
        // 点击 出现input 同时获得焦点
        this.$refs.loangain.focus();
      });
    },
    loanBlurEvent(item) {
      const array = this.typeFix(item.loanValue);
      item.loanCountArray = array;
      if (item.loanValue != "") {
        item.borrowValue = "";
        item.borrowCountArray = [];
      }
      item.loanInput = false;
      // this.$emit("flag", {
      //   borrow: this.borrowValue,
      //   loan: this.loanValue,
      //   index: this.index
      // });
    },
    // 摘要列表
    digestList(item){
      Promise.resolve(this.api.voucher['digestList']({name:item.state1}))
      .then(res=>{
        console.log(res)
        this.restaurants = []
        for(let i=0;i<res.data.list.length;i++){
          this.restaurants.push({'value':res.data.list[i].name})
        }
      })
    },
    // 科目列表
    subList(){
      Promise.resolve(this.api.set['subList']({company_id:1}))
      .then(res=>{
        console.log(res)
        this.restaurants1 = []
        for(let i=0;i<res.data.list.length;i++){
          this.restaurants1.push({'value':res.data.list[i].code+res.data.list[i].name})
        }
      })
    },
    // 摘要
    async handleInput(item){
      await this.digestList(item)
    },
    // 科目
    // async handleFocus1(){
    //   await this.subList()
    // },
    handleFocus1(){
      console.log('hhh')
    },
    // async handleinput1(item){
    //   await this.subList(item)
    // },
    nextFocus(index) {
      this.focusIndex = index + 1;
      console.log(this.focusIndex)
    }
  },
  async mounted() {
    await Promise.resolve(
      this.api.voucher["initVoucher"]({ book_id: 1, period: 201908 })
    )
      .then(res => {
        console.log(res);
        this.id = res.data.v_id;
        this.profile = Number(res.data.profile) + 1;
        this.newProfile = Number(res.data.profile) + 1;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style lang="less" scoped>
// 带建议 输入框
.el-autocomplete .el-input .el-input__inner {
  padding-left: 10px !important;
  padding-right: 0px !important;
  width: 253px !important;
  height: 55px !important;
  border: none !important;
  box-sizing: border-box !important;
}
.body {
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
  .left {
    position: absolute;
    top: 40%;
    left: 0;
    width: 20px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    border: 1px solid rgb(177, 174, 174);
    background-color: rgb(177, 174, 174);
    i {
      color: #fff;
      font-size: 22px;
    }
  }
  .right {
    position: absolute;
    right: 0;
    top: 40%;
    width: 20px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    border: 1px solid rgb(177, 174, 174);
    background-color: rgb(177, 174, 174);
    i {
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
    font: 600 34px/36px "PingFangSC";
  }
  .title-item {
    width: 1020px;
    height: 28px;
    font-size: 14px;
    margin-left: 80px;
    line-height: 28px;
    margin-top: 10px;
    .title-a {
      margin-left: 40px;
      /deep/.el-input {
        .el-input__inner {
          height: 28px !important;
          padding-right: 0px !important;
        }
        .el-input__icon {
          line-height: 28px;
        }
      }
      .el-date-editor {
        width: 130px;
        height: 28px;
      }
    }
    .title-b {
      margin-left: 100px;
    }
    .title-c {
      margin-left: 320px;
    }
    .pzh {
      /deep/.el-input-number {
        width: 90px;
      }
    }
    .title-four {
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
    .content-components {
      width: 1110px;
      // overflow: auto;
    }
    .content-head,
    .content-footer {
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
      .total {
        flex: 2;
        padding-left: 1px;
        line-height: 60px;
        border-left: 1.5px solid #666666;
        border-bottom: 1.5px solid #666666;
        border-top: 1px solid #666666;
      }
      .total-borrow {
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
        div:nth-child(5),
        div:nth-child(8) {
          border-right: #82cef1 1px solid !important;
        }
        div:nth-child(11) {
          border-right: #f3a193 1px solid !important;
        }
      }
      .total-loan {
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
        div:nth-child(5),
        div:nth-child(8) {
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
          border-right: 1px solid #ccc;
        }
        div:last-child {
          border-right: none;
        }
        div:nth-child(5),
        div:nth-child(8) {
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
      border-top: 1.5px solid #666666;
      border-right: 1.5px solid #666666;
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
          border-right: 1px solid #ccc;
        }
        div:last-child {
          border-right: none;
        }
        div:nth-child(5),
        div:nth-child(8) {
          border-right: #82cef1 1px solid !important;
        }
        div:nth-child(11) {
          border-right: #f3a193 1px solid !important;
        }
      }
    }
  }
  // 审核信息
  .bottom {
    margin-left: 50px;
    margin-top: 20px;
    margin-bottom: 20px;
    span {
      margin-right: 150px;
    }
  }
}
// 保存按钮
.footer,
.footer1 {
  margin: 15px 1px 0px 0;
  width: 1120px;
  text-align: right;
  .el-button {
    color: #fff;
    border: transparent;
    background-color: @mainNavColor;
  }
  .danger {
    color: #fff;
    border: transparent;
    background-color: #f07878;
  }
}
.redbox {
  color: red;
}
.audit {
  width: 196px;
  position: fixed;
  top: 80px;
  right: 350px;
  height: 117px;
  border: 1px solid transparent;
  img {
    width: 100%;
  }
}
// 带建议 输入框
.el-autocomplete /deep/.el-input .el-input__inner {
  padding-left: 10px !important;
  padding-right: 0px !important;
  width: 253px !important;
  height: 55px !important;
  border: none !important;
  box-sizing: border-box !important;
}
// 显示 加 删除 符号
.content-item:hover {
  .add {
    display: block;
  }
  .delete {
    display: block;
  }
}
.item-box {
  width: 1020px;
  margin: 0 auto;
  display: flex;
}
.content-item {
  // position: relative;
  height: 60px;
  display: flex;
  // 加
  .add {
    // width: 100px;
    flex: 1;
    display: none;
    text-align: center;
    line-height: 60px;
    // position: absolute;
    // left: 0px;
    // top: 40%;
    i {
      font-size: 20px;
    }
  }
  // 删除
  .delete {
    // width: 100px;
    flex: 1;
    display: none;
    text-align: center;
    line-height: 60px;
    i {
      // position: absolute;
      // right: -30px;
      // top: 40%;
      font-size: 20px;
      color: red;
    }
  }
  .digest {
    flex: 1;
    text-align: center;
    border-left: 1.5px solid #666666;
    border-top: 1px solid #666666;
    line-height: 60px;
  }
  .subject {
    flex: 1;
    text-align: center;
    border-left: 1px solid #666666;
    border-top: 1px solid #666666;
    line-height: 60px;
  }

  .borrow {
    flex: 1;
    text-align: center;
    border-left: 1px solid #666666;
    // border-bottom: 1px solid #666666;
    .borrow-bottom1 {
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      .div-box {
        flex: 1;
        display: flex;
        div {
          flex: 1;
          height: 60px;
          border-right: 1px solid #ccc;
          box-sizing: border-box;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        div:last-child {
          border-right: none;
        }
        div:nth-child(5),
        div:nth-child(8) {
          border-right: #82cef1 1px solid !important;
        }
        div:nth-child(11) {
          border-right: #f3a193 1px solid !important;
        }
      }
      input {
        flex: 1;
        width: 251px;
        height: 59px;
        padding-left: 20px;
        box-sizing: border-box;
        border: 1px solid #283837;
      }
    }
  }
  .loan {
    flex: 1;
    text-align: center;
    border-left: 1px solid #666666;
    border-top: 1px solid #666666;
    border-right: 1.5px solid #666666;
    .loan-bottom1 {
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      .div-box {
        flex: 1;
        display: flex;
        div {
          flex: 1;
          height: 60px;
          border-right: 1px solid #ccc;
          box-sizing: border-box;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        div:last-child {
          border-right: none;
        }
        div:nth-child(5),
        div:nth-child(8) {
          border-right: #82cef1 1px solid !important;
        }
        div:nth-child(11) {
          border-right: #f3a193 1px solid !important;
        }
      }
    }
    input {
      flex: 1;
      height: 59px;
      width: 251px;
      padding-left: 20px;
      box-sizing: border-box;
      border: 1px solid #202e30;
    }
  }
  .red {
    color: red;
  }
}
</style>