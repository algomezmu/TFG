var schedule = require('node-schedule');
const exec = require('child_process').exec;

var listEvents = [];

function createEvent(id, command, lauchType, lauchTime) {
    var time = false;
    var oneTime = false;
    var cron;

    console.log(listEvents);

    if (lauchType == "EveryDay") {
        time = true;
        lauchTime = lauchTime.split(":");
        cron = lauchTime[1] + " " + lauchTime[0] + " * * *"
    }

    if (lauchType == "date" && new Date(lauchTime) > new Date()) {
        oneTime = true;
        time = true;
        lauchTime = lauchTime.split(":");
        cron = new Date(lauchTime);
    }

    if (time == true){
        console.log("Created");
        listEvents[id] = schedule.scheduleJob(cron, function () {
            launchComand(command);
            if(oneTime == true) {
                listEvents[id].cancel();
                delete listEvents[id];
            }
        }.bind(command, id,  oneTime, listEvents));
    }
}

function launchComand(command){
    exec(command, function (error, stdout) {
        if (!error) {
            console.log("All ok with the command");
        } else {
            console.log("Error with the command");
        }
    });
}

exports.createEvent = createEvent;