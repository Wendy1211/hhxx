const typeFix = function(Value){
  let hhh = [];
  let Positive = "";
  if(Value.indexOf('-') != -1) {
    Positive = Value.split('-')[1]
  } else {
    Positive = Value
  }
  if (
    !/^[-]?\d+(\.\d+)?$/.test(Value) &&
    Value != ""
  ) {
    this.$message({
      type: "primary",
      message: "格式不正确！"
    });
    return;
  }
  if (Value.indexOf(".") == -1) {
    if (Value.length) {
      hhh = (Positive + "00").split("").reverse();
    }
  } else {
    if (Value.split(".")[1].length == 2) {
      hhh = Positive
        .split(".")
        .join("")
        .split("")
        .reverse();
    } else if (Value.split(".")[1].length == 1) {
      const middle = Positive + "0";
      hhh = middle
        .split(".")
        .join("")
        .split("")
        .reverse();
    } else if (Value.split(".")[1].length > 2) {
      if ((Value.split(".")[1] + "").split("")[2] >= 5) {
        let longnum =
          "" +
          (Value.split(".")[1] + "").split("")[0] +
          (Number((Value.split(".")[1] + "").split("")[1]) + 1);
        let longnummiddle = Positive.split(".")[0] + longnum;
        hhh = longnummiddle.split("").reverse();
      } else {
        hhh = (
          Positive.split(".")[0] +
          Value.split(".")[1].slice(0, 2) +
          ""
        )
          .split("")
          .reverse();
      }
    }
  }
  return hhh
}
export default typeFix