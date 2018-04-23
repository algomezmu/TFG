//Librerias
const si = require('systeminformation');
//Modulos propios
var cpuModel = require('./../models/Cpu.js');
var memModel = require('./../models/Mem.js');
var networkModel = require('./../models/Network.js');
var config = require('./../config/config.js');
var lookMessages = require('./../messages/lookMessages.js');

function cpuFunction(saveData, returnData, response) {
    si.cpuCurrentspeed(function(cpuActualInfo){
        si.cpuTemperature(function(cpuTempInfo){

            var newCPUData = cpuModel({
                cpuMin: cpuActualInfo.min,
                cpuMax: cpuActualInfo.max,
                cpuAvg: cpuActualInfo.avg,
                cpuTempMain: cpuTempInfo.main,
                cpuTemp: cpuTempInfo.cores,
                cpuMax: cpuTempInfo.max
            });
            if(saveData){
                newCPUData.save(function (err, data) {
                    if (err) {
                        if(returnData){
                            lookMessages.errorMessage(response,0);
                        }else{
                            console.log("Error");
                        }
                    } else {
                        if(returnData){
                            lookMessages.dataResponse(response, data);
                        }else {
                            console.log("Saved CPU");
                        }
                    }
                });
            }else{
                lookMessages.dataResponse(response, newCPUData);
            }
        });
    });
}


function memFunction(saveData, returnData, response){
    si.mem(function(memInfo){
        var newMemData = memModel({
            memTotal: memInfo.total,
            memFree: memInfo.free,
            memSwaptotal : memInfo.swaptotal,
            memSwapfree: memInfo.swapfree
        });
        if(saveData){
            newMemData.save(function (err, data) {
                if (err) {
                    if(returnData){
                        lookMessages.errorMessage(response,0);
                    }else{
                        console.log("Error");
                    }
                } else {
                    if(returnData){
                        lookMessages.dataResponse(response, data);
                    }else {
                        console.log("Saved Mem");
                    }
                }
            });
        }else{
            lookMessages.dataResponse(response, newMemData);
        }
    });
}


function networkFunction(saveData, returnData, response){
    si.networkStats(function(networkInfo){
        var newNetworkData = networkModel({
            iface: networkInfo.iface,
            operstate: networkInfo.operstate,
            rx : networkInfo.rx,
            tx: networkInfo.tx,
            rx_sec : networkInfo.rx_sec,
            tx_sec : networkInfo.tx_sec,
            ms: networkInfo.ms
        });
        if(saveData){
            newNetworkData.save(function (err, data) {
                if (err) {
                    if(returnData){
                        lookMessages.errorMessage(response,0);
                    }else{
                        console.log("Error");
                    }
                } else {
                    if(returnData){
                        lookMessages.dataResponse(response, data);
                    }else {
                        console.log("Saved Network");
                    }
                }
            });
        }else{
            lookMessages.dataResponse(response, newNetworkData);
        }
    });
}

exports.networkFunction = networkFunction;
exports.cpuFunction = cpuFunction;
exports.memFunction = memFunction;