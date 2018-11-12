var schedule = require('node-schedule');
const exec = require('child_process').exec;
var eventsModel = require('./../models/Events.js');
var config = require('./../config/config.js');

const logConfig = require('../config/log-conf');
const logger = require('js-logging').dailyFile([logConfig.getLogSettings()]);

var listEventsTimer = [];
var listEventsStatus = [];

function createEvent(id, command, lauchType, lauchTime, notify) {
    var time = false;
    var oneTime = false;
    var cron;
    var typesOfLaunch = ["cpu>","cpu<","mem>","mem<"];

    if (lauchType == "EveryDay") {
        time = true;
        lauchTime = lauchTime.split(":");
        cron = lauchTime[1] + " " + lauchTime[0] + " * * *"
    }

    if (lauchType == "date" && new Date(lauchTime) > new Date()) {
        oneTime = true;
        time = true;
        console.log(lauchTime);
        cron = new Date(lauchTime);
    }

    if (lauchType == "cron") {
        time = true;
        cron = lauchTime;
    }

    if (time == true){
        eventTimerProgramed(id, command, lauchType, lauchTime, cron, oneTime, notify)
    }else if(typesOfLaunch.find(function(element) { return element == lauchType;}) != undefined ){
        logger.info('Create command: ' + command + ' // lauchType:' + lauchType + ' // lauchTime:' + lauchTime);
        listEventsStatus[id]= {command, lauchType, lauchTime, notify};
    }
}

function deleteEvent(id){
    if(listEventsTimer[id] != undefined ){
        listEventsTimer[id].cancel();
        delete listEventsTimer[id];
    }else if(listEventsStatus[id]!=undefined){
        delete listEventsStatus[id];
    }
}

function eventTimerProgramed(id, command, lauchType, lauchTime, cron, oneTime, notify){
    logger.info('Create command: ' + command + ' // lauchType:' + lauchType + ' // lauchTime:' + lauchTime);
    listEventsTimer[id] = schedule.scheduleJob(cron, function () {
        logger.info('Launch ' + command + ' ' + id);
        launchCommand(command);
        if(oneTime == true) {
            listEventsTimer[id].cancel();
            delete listEventsTimer[id];

            eventsModel.remove({_id: id}, function (err) {
                if (err) {
                    console.log("Error delete");
                }
                else {
                    console.log("Deleted");
                }
            });

        }
    }.bind(command, id,  oneTime, listEventsTimer, notify));
}

function checkEventStatus(type, limit){
    console.log(listEventsTimer);
    /*
    for (const key in listEventsTimer) {
        console.log(listEventsTimer[key]);
        console.log(listEventsTimer[key].nextInvocation());
    }
    */
    for(var k in listEventsStatus){
        var launch = false;
        if(listEventsStatus[k].lauchType == type+">" && limit > listEventsStatus[k].lauchTime){
            launch = true;
        }else if(listEventsStatus[k].lauchType == type+"<" && limit < listEventsStatus[k].lauchTime){
            launch = true;
        }

        if(launch == true && listEventsStatus[k].command){
            launchCommand(listEventsStatus[k].command);
        }

        if(listEventsStatus[k].notify && launch){
            console.log("Notify Me");
        }
    }
}

function launchCommand(command){
    exec(command, {
        cwd: config.userDirectory
    }, function (error, stdout) {
        if (!error) {
            logger.info('All ok with the command');
        } else {
            logger.info('Error with the command');
        }
    });
}

exports.launchCommand = launchCommand;
exports.createEvent = createEvent;
exports.deleteEvent = deleteEvent;
exports.checkEventStatus = checkEventStatus;