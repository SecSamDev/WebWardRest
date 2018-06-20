var days = node.getProperty('_DAYS');
var start_hour = node.getProperty('_START_HOUR');
var end_hour = node.getProperty('_END_HOUR');
var today = new Date();
var last_date = new Date(node.getProperty('_LAST_ACTIVATION').value);
if (days && days.value && days.value.length === 7) {
    if (days.value[(today.getDay() + 6) % 7] === true) {
        if (hourBetween(today,start_hour,end_hour)
            && !hourBetween(last_date,start_hour,end_hour)
        ) {
            let prop = {
                "nickname": "Last Activation",
                "name": "_LAST_ACTIVATION",
                "type": "DATE",
                "value": today,
                "optional": false
            };
            node.addOutParameters([
                prop
            ]);
            node.addProperty(prop)
            node.endButStarted();
        }
    }
} else {
    //Rewrite properties
    node.addProperties([{
        "nickname": "Days of Week",
        "name": "_DAYS",
        "type": "DAYS_PICKER",
        "value": "false,false,false,false,false,false,false",
        "optional": false
    },
    {
        "nickname": "Start Hour",
        "name": "_START_HOUR",
        "type": "TIME",
        "value": "00:00",
        "optional": false
    },
    {
        "nickname": "End Hour",
        "name": "_END_HOUR",
        "type": "TIME",
        "value": "00:00",
        "optional": false
    },
    {
        "name": "_SHOW",
        "type": "ARRAY",
        "value": "_DAYS,_START_HOUR,_END_HOUR,_LAST_ACTIVATION",
        "optional": false
    },
    {
        "nickname": "Last Activation",
        "name": "_LAST_ACTIVATION",
        "type": "DATE",
        "value": "1994/08/17",
        "optional": false
    }]);
    node.endCycle();
}

function hourBetween(d,sh,eh) {
    if (sh.value.length === 2
        && eh.value.length === 2
        && (sh.value[0] < d.getHours()
            || (
                (sh.value[0] == d.getHours())
                && (sh.value[1] <= d.getMinutes() 
                    || (d.getMinutes() == 0 && sh.value[1] <= 60)
                )
            )
        )
        && (eh.value[0] > d.getHours()
            || (
                eh.value[0] == d.getHours()
                && (eh.value[1] >= d.getMinutes() 
                || (d.getMinutes() == 0 && eh.value[1] <= 60)
            )
            )
        )) {
        return true;
    }
    return false;
}