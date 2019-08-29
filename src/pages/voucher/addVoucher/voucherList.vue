<template>
    <div class="content-item">
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
              <input type="text" ref="gain" v-show="borrowInput" @input="borrowInputEvent" @blur="borrowBlurEvent">
            </div>
          </div>
          <div class="loan">
            <div class="loan-bottom">
              <div class="div-box">
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
              <input type="text">
            </div>
          </div>
        </div>
</template>
<script>
export default {
  data() {
    return {
        borrowInput: false,
        restaurants: [],
        state1: '',
        state2: '',
        autocomplete: true,
        borrowCountArray: []
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
      borrowClick() {
        this.borrowInput = true;
        this.$nextTick(()=> {
          this.$refs.gain.focus()
        })
      },
      borrowInputEvent() {
        let borrowValue = this.$refs.gain.value + '';
        if(borrowValue.indexOf('.') == -1) {
          this.borrowCountArray = (borrowValue + '00').split('').reverse()
          console.log(this.borrowCountArray)
        }
      },
      borrowBlurEvent() {
        this.$refs.gain.value = null
        this.borrowInput = false
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
          .div-box {
            flex: 1;
            display: flex;
            div {
              flex: 1;
              height: 60px;
              border-right: 1px solid #666666;
              box-sizing: border-box;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            div:last-child {
              border-right: none;
            }
          }
          input {
            flex: 1;
            height: 58px;
            border: 1px solid #666666;
            outline: none
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