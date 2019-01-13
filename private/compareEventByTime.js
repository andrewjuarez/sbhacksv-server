// Compare two events by their start date time

module.exports = function(a, b){
    if(a.eventdatestart > b.eventdatestart){
        return 1;
    } else {
        return 0;
    }
}