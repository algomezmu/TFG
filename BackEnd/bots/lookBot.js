//Librerias
var sleep = require('sleep');
const si = require('systeminformation');
//Modulos propios
var cpuModel = require('./../models/Cpu.js');
var config = require('./../config/config.js');


function lookBot() {
    console.log("Hola");
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
                newCPUData.save(function (err) {
                    if (err) {
                        console.log("Error");
                    } else {
                        console.log("Saved CPU");
                    }
                });

            });
        });

    setTimeout(lookBot, config.time_boot_look);
}

exports.lookBot = lookBot;