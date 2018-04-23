//Modulos propios
var lookFunctions = require('./../utils/lookFunctions.js');
var config = require('./../config/config.js');


function lookBot() {
    console.log("Bot");

    if(config.lookCPU)
        lookFunctions.cpuFunction(true, false, null);

    if(config.lookMemory)
        lookFunctions.memFunction(true, false, null);

    if(config.lookNetwork)
        lookFunctions.networkFunction(true, false, null);

    setTimeout(lookBot, config.time_boot_look);
}

exports.lookBot = lookBot;