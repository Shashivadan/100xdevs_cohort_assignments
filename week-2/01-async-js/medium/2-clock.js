function convert_hours_12(hours){
    if(hours > 12){
        hours -= 12
    }else if(hours == 0){
        hours = 12 ;
    }
    return hours
}
function amORpm(hours){
    if (hours <= 12){
        return "AM"
    }else{
        return "PM"
    }
}
function currentTime(){
    const DATE = new Date()
    let hours = DATE.getHours()
    let hours_in_12 = convert_hours_12(hours)
    let min = DATE.getMinutes()
    let sec = DATE.getSeconds()
    console.clear()
    console.log(`${hours_in_12}:${min}:${sec} ${amORpm(hours)}`);
}
setInterval(currentTime,1000)