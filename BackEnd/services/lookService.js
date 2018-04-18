const si = require('systeminformation');

var lookMessages = require('./../messages/lookMessages.js');


function getCPUHistory(response) {

    // callback style
    si.cpu(function(cpuInfo) {
        console.log('CPU-Information:');
        console.log(cpuInfo);
        si.cpuCurrentspeed(function(cpuActualInfo){
            si.cpuTemperature(function(cpuTempInfo){


                var result = Object.assign(cpuInfo, cpuActualInfo, cpuTempInfo);
                lookMessages.dataResponse(response, result);
            });
        });
    });
};


exports.getCPUHistory = getCPUHistory;