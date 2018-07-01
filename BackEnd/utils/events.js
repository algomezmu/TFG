var schedule = require('node-schedule');
const exec = require('child_process').exec;

const logConfig = require('../config/log-conf');
const logger = require('js-logging').dailyFile([logConfig.getLogSettings()]);

var listEvents = [];

function createEvent(id, command, lauchType, lauchTime) {
    var time = false;
    var oneTime = false;
    var cron;

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

    if (lauchType == "cron") {
        time = true;
        cron = lauchTime;
    }

    if (time == true){
        logger.info('Create command: ' + command + ' // lauchType:' + lauchType + ' // lauchTime:' + lauchTime);
        listEvents[id] = schedule.scheduleJob(cron, function () {
            logger.info('Launch ' + command + ' ' + id);
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
            logger.info('All ok with the command');
            console.log("All ok with the command");
        } else {
            logger.info('Error with the command');
            console.log("Error with the command");
        }
    });
}

exports.createEvent = createEvent;