// Remove all passed events from the array passed in. 

// Date object to get current date/time
var dateTime = new Date();

function getCorrectMonth(){
    var month = dateTime.getMonth() + 1;
    if(month < 10){
        month = "0" + month;
    }
    return month;
}

function getCorrectHour(){
    var hour = dateTime.getHours();
    if(hour < 10){
        hour = "0" + hour;
    }
    return hour;
}


function getCorrectMinute(){
    var minute = dateTime.getMinutes();
    if(minute < 10){
        minute = "0" + minute;
    }
    return minute;
}

function getCorrectSecond(){
    var second = dateTime.getSeconds();
    if(second < 10){
        second = "0" + second;
    }
    return second;
}

var currentDateTime = dateTime.getFullYear() + "-" + getCorrectMonth() + "-" + dateTime.getDate() + " " + getCorrectHour() + ":" + getCorrectMinute() + ":" + getCorrectSecond();
// console.log("Generated: " + currentDateTime);

module.exports = function(events){

    var counter = 0;
    var nums = [];

    var eventsToReturn = [];
    events.forEach(event => {
        if(event.eventdateend > currentDateTime){
            eventsToReturn.push(event);
        }
    });
    

    return eventsToReturn;
};