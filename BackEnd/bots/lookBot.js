//Modulos propios
var lookFunctions = require('./../utils/lookFunctions.js');
var config = require('./../config/config.js');
var schedule = require('node-schedule');

var lookCPU;
var lookMemory;
var lookNetwork;

function lookBot() {
    if(lookCPU) lookCPU.cancel();
    if(lookMemory) lookMemory.cancel();
    if(lookNetwork) lookNetwork.cancel();

    if(config.lookCPU) {
        lookCPU = schedule.scheduleJob(scheduleTime(config.lookCPUTimer), function () {
            lookFunctions.cpuFunction(true, false, null);
        });
    }

    if(config.lookMemory) {
        lookMemory = schedule.scheduleJob(scheduleTime(config.lookMemoryTimer), function () {
            lookFunctions.memFunction(true, false, null);
        });
    }

    if(config.lookNetwork) {
        lookNetwork = schedule.scheduleJob(scheduleTime(config.lookNetworkTimer), function () {
            lookFunctions.networkFunction(true, false, null);
        });
    }

    //setTimeout(lookBot, config.time_boot_look);
}

function scheduleTime(time){

    var time = time.split(" ");

    if(time[1] === "h"){
        return Number(time[0]) <= 60 ? ("0 */" + time[0] + "* * *") : (" 0 */24 * * *");
    }else if(time[1] === "m"){
        return Number(time[0]) <= 60 ? ("*/" + time[0] + " * * * *") : ("*/60 * * * *");
    }else if(time[1] === "s"){
        return Number(time[0]) <= 60 ? ("*/" + time[0] + " * * * * *") : ("*/60 * * * * *");
    }else{
        //Default 5 min
        return " */5 * * * *"
    }
}

exports.lookBot = lookBot;