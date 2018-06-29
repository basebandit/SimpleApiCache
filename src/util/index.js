const moment = require("moment")

module.exports = {
  keyRoot: "braiven",
  convertDateToTimeStamp: (date, format) => {
    let formatDate = format || "YYYY-MM-DD"
    return String(moment(date, formatDate).unix())
  },
  keyRootPair: (...keyArgs) => {
    keyArgs.slice().join(":")
  }
}
