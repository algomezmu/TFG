var schedule = require('node-schedule');
const exec = require('child_process').exec;
var eventsModel = require('./../models/Events.js');
var config = require('./../config/config.js');

const logConfig = require('../config/log-conf');
const logger = require('js-logging').dailyFile([logConfig.getLogSettings()]);

var fcm = require('fcm-node');

var  key = require('../config/key.json');
var FCM = new fcm(key);
/*
var admin = require('firebase-admin');
var serviceAccount = require('../config/key.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://tfg-uni.firebaseio.com"
});
*/
var listEventsTimer = [];
var listEventsStatus = [];

function returnFCM(id){
    if(listEventsStatus[id] && listEventsStatus[id].fcm) {
        return listEventsStatus[id].fcm;
    }else{
        return undefined;
    }
}

function createEvent(id, command, lauchType, lauchTime, fcm, interfaceNet,interInOut) {
    var time = false;
    var oneTime = false;
    var cron;
    var typesOfLaunch = ["cpu>","cpu<","mem>","mem<","net>","net<"];

    if (lauchType == "EveryDay") {
        time = true;
        lauchTime = lauchTime.split(":");
        cron = lauchTime[1] + " " + lauchTime[0] + " * * *"
    }

    if (lauchType == "date" && new Date(lauchTime) > new Date()) {
        oneTime = true;
        time = true;
        cron = new Date(lauchTime);
    }

    if (lauchType == "cron") {
        time = true;
        cron = lauchTime;
    }

    if (time == true){
        eventTimerProgramed(id, command, lauchType, lauchTime, cron, oneTime, fcm)
    }else if(typesOfLaunch.find(function(element) { return element == lauchType;}) != undefined ){
        logger.info('Create command: ' + command + ' // lauchType:' + lauchType + ' // lauchTime:' + lauchTime);
        listEventsStatus[id]= {command, lauchType, lauchTime, fcm, interfaceNet, interInOut};
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

function eventTimerProgramed(id, command, lauchType, lauchTime, cron, oneTime, fcm){
    logger.info('Create command: ' + command + ' // lauchType:' + lauchType + ' // lauchTime:' + lauchTime);
    if(listEventsTimer[id]){
        listEventsTimer[id].cancel();
    }
    listEventsTimer[id] = schedule.scheduleJob(cron, function () {
        logger.info('Launch ' + command + ' ' + id);
        if(command) {
            launchCommand(command);
        }
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

            //Check Notify
            if(fcm && fcm.length != 0){
                let tokens = fcm.split(",");
                tokens.forEach(element => {
                    if(element){
                        var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
                            to: element,

                            notification: {
                                title: "ServCM: " + lauchType + " " + lauchTime
                            }
                        };

                        FCM.send(message, function(err, response){
                            if (err) {
                                console.log("Something has gone wrong!");
                                logger.info("Event: Something has gone wrong!:" + err )
                            } else {
                                console.log("All correct");
                                logger.info("Event: sended");
                            }
                        });
                    }
                });
            }
        }
    }.bind(command, id,  oneTime, listEventsTimer, fcm));
}

function checkEventStatus(type, limit, interfaceNet = null){
    /*
    for (const key in listEventsTimer) {
        console.log(listEventsTimer[key]);
        console.log(listEventsTimer[key].nextInvocation());
    }
    */
    for(var k in listEventsStatus){
        var launch = false;

        if(type == 'net'){
            if(listEventsStatus[k].interfaceNet == interfaceNet){
                let dataInOut = 0;
                if(listEventsStatus[k].interInOut == "out"){
                    dataInOut = 1;
                }

                if(listEventsStatus[k].lauchType == type+">" && Number(limit[dataInOut].replace(/,/g, '')) > Number(listEventsStatus[k].lauchTime*100)){
                    launch = true;
                }else if(listEventsStatus[k].lauchType == type+"<" && Number(limit[dataInOut].replace(/,/g, '')) < Number(listEventsStatus[k].lauchTime*100)){
                    launch = true;
                }
            }
        }else{
            if(listEventsStatus[k].lauchType == type+">" && limit > listEventsStatus[k].lauchTime){
                launch = true;
            }else if(listEventsStatus[k].lauchType == type+"<" && limit < listEventsStatus[k].lauchTime){
                launch = true;
            }
        }

        if(launch == true && listEventsStatus[k].command){
            launchCommand(listEventsStatus[k].command);
        }

        if(listEventsStatus[k].fcm && listEventsStatus[k].fcm.split(",").length > 0  && launch) {
            let tokens = listEventsStatus[k].fcm.split(",");
            tokens.forEach(element => {
                if(element){
                    var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
                        to: element,

                        notification: {
                            title: "ServCM: " + listEventsStatus[k].lauchType + " " + listEventsStatus[k].lauchTime
                        }
                    };

                    FCM.send(message, function(err, response){
                        if (err) {
                            console.log("Something has gone wrong!");
                            logger.info("Event: Something has gone wrong!:" + err )
                        } else {
                            console.log("All correct");
                            logger.info("Event: sended");
                        }
                    });
                }
            });
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

exports.returnFCM = returnFCM;
exports.launchCommand = launchCommand;
exports.createEvent = createEvent;
exports.deleteEvent = deleteEvent;
exports.checkEventStatus = checkEventStatus;