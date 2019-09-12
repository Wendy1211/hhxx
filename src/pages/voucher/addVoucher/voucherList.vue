<template>
  <div class="content-row">
    <div class="content-item">
      <!-- 加一行 -->
      <div class="add" @click="handleAdd">
        <i class="el-icon-circle-plus-outline"></i>
      </div>
      <!-- 表 内容 -->
      <div class="item-box">
        <!-- 摘要 -->
        <div class="digest" ref="click1">
          <!-- 带建议的下拉框 -->
          <el-autocomplete
            v-focus="focusIndex === 1"
            @keydown.tab="nextFocus(1)"
            class="inline-input"
            v-model="state1"
            @focus="handleFocus"
            :fetch-suggestions="querySearch"
            :trigger-on-focus="false"
            @select="handleSelect"
            @click="handleDigestChilk"
          ></el-autocomplete>
        </div>
        <!-- 科目 -->
        <div class="subject">
          <el-autocomplete
            v-focus="focusIndex === 2"
            @keydown.tab="nextFocus(2)"
            class="inline-input"
            v-model="state2"
            :fetch-suggestions="querySearch"
            placeholder
            @select="handleSelect1"
          ></el-autocomplete>
        </div>
        <!-- 借 -->
        <div class="borrow">
          <div class="borrow-bottom" @click="borrowClick">
            <div class="div-box" v-show="!borrowInput" :class="borrowValue < 0 ? 'red' : ''">
              <div>{{borrowCountArray[12] == undefined ? '' : borrowCountArray[12]}}</div>
              <div>{{borrowCountArray[11] == undefined ? '' : borrowCountArray[11]}}</div>
              <div>{{borrowCountArray[10] == undefined ? '' : borrowCountArray[10]}}</div>
              <div>{{borrowCountArray[9] == undefined ? '' : borrowCountArray[9]}}</div>
              <div>{{borrowCountArray[8] == undefined ? '' : borrowCountArray[8]}}</div>
              <div>{{borrowCountArray[7] == undefined ? '' : borrowCountArray[7]}}</div>
              <div>{{borrowCountArray[6] == undefined ? '' : borrowCountArray[6]}}</div>
              <div>{{borrowCountArray[5] == undefined ? '' : borrowCountArray[5]}}</div>
              <div>{{borrowCountArray[4] == undefined ? '' : borrowCountArray[4]}}</div>
              <div>{{borrowCountArray[3] == undefined ? '' : borrowCountArray[3]}}</div>
              <div>{{borrowCountArray[2] == undefined ? '' : borrowCountArray[2]}}</div>
              <div>{{borrowCountArray[1] == undefined ? '' : borrowCountArray[1]}}</div>
              <div>{{borrowCountArray[0] == undefined ? '' : borrowCountArray[0]}}</div>
            </div>
            <!-- <input type="text" :disabled="Boolean(loanCountArray.length)" ref="borrowgain" v-show="borrowInput" @change="borrowInputEvent" @blur="borrowBlurEvent"> -->
            <input
              type="text"
              v-model="borrowValue"
              ref="borrowgain"
              v-show="borrowInput"
              @blur="borrowBlurEvent"
              v-focus="focusIndex === 3"
              @keydown.tab="nextFocus(3)"
            />
          </div>
        </div>
        <!-- 贷 -->
        <div class="loan">
          <div class="loan-bottom" @click="loanClick">
            <div class="div-box" v-show="!loanInput" :class="loanValue < 0 ? 'red' : ''">
              <div>{{loanCountArray[12] == undefined ? '' : loanCountArray[12]}}</div>
              <div>{{loanCountArray[11] == undefined ? '' : loanCountArray[11]}}</div>
              <div>{{loanCountArray[10] == undefined ? '' : loanCountArray[10]}}</div>
              <div>{{loanCountArray[9] == undefined ? '' : loanCountArray[9]}}</div>
              <div>{{loanCountArray[8] == undefined ? '' : loanCountArray[8]}}</div>
              <div>{{loanCountArray[7] == undefined ? '' : loanCountArray[7]}}</div>
              <div>{{loanCountArray[6] == undefined ? '' : loanCountArray[6]}}</div>
              <div>{{loanCountArray[5] == undefined ? '' : loanCountArray[5]}}</div>
              <div>{{loanCountArray[4] == undefined ? '' : loanCountArray[4]}}</div>
              <div>{{loanCountArray[3] == undefined ? '' : loanCountArray[3]}}</div>
              <div>{{loanCountArray[2] == undefined ? '' : loanCountArray[2]}}</div>
              <div>{{loanCountArray[1] == undefined ? '' : loanCountArray[1]}}</div>
              <div>{{loanCountArray[0] == undefined ? '' : loanCountArray[0]}}</div>
            </div>
            <input
              type="text"
              ref="loangain"
              v-model="loanValue"
              v-show="loanInput"
              @blur="loanBlurEvent"
              v-focus="focusIndex === 4"
              @keydown.tab="nextFocus(4)"
            />
          </div>
        </div>
      </div>
      <!-- 删一行 -->
      <div class="delete" @click="handleDelete">
        <i class="el-icon-delete"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    'index': {
      type: Number,
    },
    digest: {
      type: String
    }
  },
  data() {
    return {
      borrowInput: false,
      loanInput: false,
      borrowValue: "",
      loanValue: "",
      restaurants: [],
      state1: "",
      state2: "",
      borrowCountArray: [],
      loanCountArray: [],
      focusIndex: 1
    };
  },

  watch:{
    state1 : function(){
      this.$emit('sub',this.state1)
    }
  },
  methods: {
    
    // 下拉建议 组件
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    loadAll() {
      return [
        { value: "提现1" },
        { value: "提现2" },
        { value: "提现3" },
        { value: "利息收入4" },
        { value: "利息收入5" },
        { value: "利息收入6" },
        { value: "支付工资7" },
        { value: "支付工资8" },
        { value: "支付工资9" },
        { value: "支付工资0" }
      ];
    },
    // 科目下拉选择
    handleSelect1(item) {
      console.log(item);
    },
    // 摘要下拉选择
    handleSelect(item) {
      console.log(item);

    },
    // 摘要 默认第一行摘要
    handleFocus(item){
      console.log(item)
      if(this.state1 != this.digest) {
        this.state1 = this.digest
      }
    },
    // 借方
    borrowClick() {
      this.borrowInput = true;
      this.$nextTick(() => {
        this.$refs.borrowgain.focus();
        // this.borrowValue = ""
      });
    },
    borrowBlurEvent() {
      const array= this.typeFix(this.borrowValue)
      this.borrowCountArray = array
      console.log(this.borrowValue)
      if(this.borrowValue != ""){
        this.loanValue = "";
        this.loanCountArray = [];
      }
      this.borrowInput = false;
      this.$emit('flag',{ borrow: this.borrowValue,loan: this.loanValue,index: this.index })
    },
    // 贷方
    loanClick() {
      this.loanInput = true;
      this.$nextTick(() => {
        // 点击 出现input 同时获得焦点
        this.$refs.loangain.focus();
        // this.loanValue = ""
      });
    },
    loanBlurEvent() {
      const array = this.typeFix(this.loanValue)
      this.loanCountArray = array
      if(this.loanValue != ""){
        this.borrowValue = "";
        this.borrowCountArray = [];
      } 
      this.loanInput = false;
      this.$emit('flag',{borrow: this.borrowValue,loan: this.loanValue,index: this.index})
    },
    // 增/删行
    handleAdd() {
      this.$emit('addclick',{type:"add",index:this.index})
    },
    handleDelete() {
      this.$emit('deleteclick',{type:"delete",index:this.index})
    },
    handleDigestChilk() {
      if(this.state1 != this.digest) {
        this.state1 = this.digest
      }
    },
    nextFocus(index) {
      this.focusIndex = index + 1;
      console.log(this.focusIndex)
    }
  },
  mounted() {
    this.restaurants = this.loadAll();
  }
};
</script>

<style lang="less" scoped>
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
  
  .total {
    flex: 2;
    display: flex;
    padding-left: 2px;
    box-sizing: border-box;
    align-items: center;
    border: 1px solid #666666;
  }
  .borrow {
    flex: 1;
    text-align: center;
    border-left: 1px solid #666666;
    border-top: 1px solid #666666;
    .borrow-bottom {
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
    .loan-bottom {
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
    color: red
  }
}
</style>