import Vue from 'vue'
const focus = Vue.directive('focus', {
  componentUpdated: function(el,obj) {
    console.log(obj.value)
    if(obj.value) {
      el.focus()        
    }
  }
  }
)
export {focus}