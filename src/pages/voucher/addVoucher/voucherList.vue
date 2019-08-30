<template>
  <div class="content-row">
    <div class="content-item">
      <div class="add" @click="handleAdd">
        <i class="el-icon-circle-plus-outline"></i>
      </div>
      <div class="delete" @click="handleDelete">
        <i class="el-icon-delete"></i>
      </div>
      <div class="digest">
          <!-- 带建议的下拉框 -->
          <el-autocomplete
          class="inline-input"
          v-model="state1"
          :fetch-suggestions="querySearch"
          placeholder=""
          :trigger-on-focus="false"
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
        <div class="borrow-bottom" @click="borrowClick">
          <div class="div-box" v-show="!borrowInput">
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
          <input type="text" ref="borrowgain" v-show="borrowInput" @change="borrowInputEvent" @blur="borrowBlurEvent">
        </div>
      </div>
      <div class="loan">
        <div class="loan-bottom" @click="loanClick">
          <div class="div-box" v-show="!loanInput">
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
          <input type="text" ref="loangain" v-show="loanInput" @input="loanInputEvent" @blur="loanBlurEvent">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      borrowInput: false,
      loanInput: false,
      restaurants: [],
      state1: '',
      state2: '',
      borrowCountArray: [],
      loanCountArray: []
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
      },
      // 借方
      borrowClick() {
        this.borrowInput = true;
        this.$nextTick(()=> {
          this.$refs.borrowgain.focus()
        })
      },
      borrowInputEvent() {
        let borrowValue = this.$refs.borrowgain.value + '';
        let hhh = '';
         if (!(/^[0-9]+$/.test(borrowValue))) {
           this.$message({
             type: 'primary',
             message: '必须全为数字！'
           })
           return
         }
        if(borrowValue.indexOf('.') == -1) {
          hhh = (borrowValue + '00').split('').reverse()
        } else{
          if (borrowValue.split('.')[1].length == 2) {
            hhh = borrowValue.split('.').join('').split('').reverse()
          } else if (borrowValue.split('.')[1].length == 1) {
            const middle = borrowValue + '0'
            hhh = middle.split('.').join('').split('').reverse()
          } else if (borrowValue.split('.')[1].length > 2) {

            // borrowValue.split('.')[0] + .join('').split('').reverse()
          }
        }
      },
      borrowBlurEvent() {
        // this.$refs.borrowgain.value = null
        this.borrowInput = false
      },
      // 贷方
      loanClick() {
        this.loanInput = true;
        this.$nextTick(()=> { // 点击 出现input 同时获得焦点
          this.$refs.loangain.focus()
        })
      },
      loanInputEvent() {
        let loanValue = this.$refs.loangain.value + '';
        if(loanValue.indexOf('.') == -1) {
          this.loanCountArray = (loanValue + '00').split('').reverse()
          console.log(this.loanCountArray)
        }
      },
      loanBlurEvent() {
        // this.$refs.loangain.value = null
        this.loanInput = false
      },
      handleAdd(){
        console.log(11)
      },
      handleDelete(){
        console.log(22)
      }
    },
    mounted() {
      this.restaurants = this.loadAll();
    }
}
</script>
<style lang="less" scoped>
// 带建议 输入框
.el-autocomplete /deep/.el-input .el-input__inner{
    padding-left: 10px !important;
    padding-right: 0px !important;
    width: 253px !important;
    height: 55px !important;
    border: none !important;
    box-sizing: border-box !important;
}
// 显示 加 删除 符号
.content-item:hover{
  .add{
    display: block;
  }
  .delete{
    display: block;
  }
}
.content-item {
  position: relative;
  height: 60px;
  display: flex;
  // 加
  .add{
    display: none;
    i{
      position: absolute;
      left: -30px;
      top: 40%;
      font-size: 20px;
    }
  }
  // 删除
  .delete{
    display: none;
    i{
      position: absolute;
      right: -30px;
      top: 40%;
      font-size: 20px;
    }
  }
  .digest {
    flex: 1;
    text-align: center;
    border-left:1.5px solid #666666;
    border-top:1px solid #666666;
    line-height: 60px;
  }
  .subject {
    flex: 1;
    text-align: center;
    border-left:1px solid #666666;
    border-top:1px solid #666666;
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
        div:nth-child(5),div:nth-child(8) {
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
        div:nth-child(5),div:nth-child(8) {
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
}
</style>