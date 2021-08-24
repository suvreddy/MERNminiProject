async function getTime() {
    const date = new Date()
    month = date.getMonth() + 1
    hour = date.getHours()
    dt = date.getDate()
    min = date.getMinutes()
    sec = date.getSeconds()

    if (month < 10) {
        month = '0' + month
    }
    if (dt < 10) {
        dt = '0' + dt
    }
    if (hour < 10) {
        hour = '0' + hour
    }
    if (min < 10) {
        min = '0' + min
    }
    if (sec < 10) {
        sec = '0' + sec
    }
    const time = {
        year: (date.getFullYear()).toString(),
        month: month.toString(),
        dt: dt.toString(),
        hour: hour.toString(),
        min: min.toString(),
        sec: sec.toString()
    }
    return time

}

module.exports={
    getTime
}