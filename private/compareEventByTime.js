// Compare two events by their start date time

module.exports = function(a, b){
    if(a.eventdatestart > b.eventdatestart){
        return 0;
    } else {
        return 1;
    }
}