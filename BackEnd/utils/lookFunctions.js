//Librerias
const si = require('systeminformation');
//Modulos propios
var cpuModel = require('./../models/Cpu.js');
var memModel = require('./../models/Mem.js');
var networkModel = require('./../models/Network.js');
var config = require('./../config/config.js');
var lookMessages = require('./../messages/lookMessages.js');
var events = require('./events');

const {exec} = require('child_process');

function cpuFunction(saveData, returnData, response) {
    si.cpuCurrentspeed(function (cpuActualInfo) {
        si.cpuTemperature(function (cpuTempInfo) {
            events.checkEventStatus("cpu", cpuActualInfo.avg);
            exec('mpstat 1 1 |tail -1|awk \'{print $NF}\'', (err, stdout, stderr) => {
                if (err) {
                    lookMessages.errorMessage(response, 0);
                } else {
                    stdout = stdout.replace(/[\r\n]/g, '');
                    stdout = stdout.replace(",", ".");
                    var newCPUData = cpuModel({
                        cpuIDE: stdout,
                        cpuWORK: 100 - stdout,
                        cpuMin: cpuActualInfo.min,
                        cpuMax: cpuActualInfo.max,
                        cpuAvg: cpuActualInfo.avg,
                        cpuTempMain: cpuTempInfo.main,
                        cpuTemp: cpuTempInfo.cores,
                        cpuMax: cpuTempInfo.max
                    });
                    if (saveData) {
                        newCPUData.save(function (err, data) {
                            if (err) {
                                if (returnData) {
                                    lookMessages.errorMessage(response, 0);
                                } else {
                                    console.log(err);
                                    console.log("Error");
                                }
                            } else {
                                if (returnData) {
                                    lookMessages.dataResponse(response, data);
                                } else {
                                    console.log("Saved CPU");
                                }
                            }
                        });
                    } else {
                        lookMessages.dataResponse(response, newCPUData);
                    }
                }
            });
        });
    });
}


function memFunction(saveData, returnData, response) {
    si.mem(function (memInfo) {

        var limiitMb = Number(((memInfo.total - memInfo.free) / 1048576).toFixed(2));
        events.checkEventStatus("mem", limiitMb);

        var newMemData = memModel({
            memTotal: memInfo.total,
            memFree: memInfo.free,
            memSwaptotal: memInfo.swaptotal,
            memSwapfree: memInfo.swapfree
        });
        if (saveData) {
            newMemData.save(function (err, data) {
                if (err) {
                    if (returnData) {
                        lookMessages.errorMessage(response, 0);
                    } else {
                        console.log(err);
                        console.log("Error");
                    }
                } else {
                    if (returnData) {
                        lookMessages.dataResponse(response, data);
                    } else {
                        console.log("Saved Mem");
                    }
                }
            });
        } else {
            lookMessages.dataResponse(response, newMemData);
        }
    });
}

async function getNetwork(interfac) {
    const {stdout, stderr} = await exec('sar -n DEV 1 3 | grep ' + interfac + ' | tail -n1 | awk \'{print $5, $6}\'');

    if (stderr) {
        console.error(stderr);
    }
    console.log(stdout);
    return stdout;
}

function networkFunction(saveData, returnData, response) {
    si.networkInterfaces(function (interf) {
        let interfacesNames = [];
        interf.forEach(function (element) {
            interfacesNames.push(element.iface);
        });

        exec('sar -n DEV 1 3 | grep "Media" | tail -n +2 | awk \'{print $2, $5, $6}\'', (err, stdout, stderr) => {
            if(!stdout){
                if (returnData) {
                    lookMessages.errorMessage(response, 0);
                } else {
                    console.log(err);
                    console.log("Error");
                }
            }else {
                let lines = [];

                stdout.split("\n").forEach(function (element) {
                    let aux = element.split(" ");
                    if (aux.length > 0 && interfacesNames.includes(aux[0])) {
                        let auxInter = aux[0];
                        aux.shift();
                        lines.push({interface: auxInter, data: aux});
                    }
                });

                var newNetworkData = networkModel({
                    ifaces: lines
                });
                if (saveData) {
                    newNetworkData.save(function (err, data) {
                        if (err) {
                            if (returnData) {
                                lookMessages.errorMessage(response, 0);
                            } else {
                                console.log(err);
                                console.log("Error");
                            }
                        } else {
                            if (returnData) {
                                lookMessages.dataResponse(response, data);
                            } else {
                                console.log("Saved Network");
                            }
                        }
                    });
                } else {
                    lookMessages.dataResponse(response, lines);
                }
            }
        });
    });

}

function processFunction(response, order, nProcess) {
    si.processes(function (processInfo) {
        if (nProcess < 0) {
            lookMessages.dataResponse(response, processInfo);
        } else {
            lookMessages.dataResponse(response, processInfo.list.sort((a, b) => {
                if (order == "c")
                    return b.pcpu - a.pcpu;
                if (order == "m")
                    return b.pmem - a.pmem;
            }).slice(0, nProcess));
        }
    });
}

function usersFunction(response) {
    si.users(function (usersInfo) {
        lookMessages.dataResponse(response, usersInfo);
    });
}

function diskFunction(response) {
    si.fsSize(function (diskInfo) {
        lookMessages.dataResponse(response, diskInfo);
    });
}

function uptimeFunction(response) {
    lookMessages.dataResponse(response, si.time());
}

function networkConsFunction(response) {
    si.networkConnections(function (netInfo) {
        lookMessages.dataResponse(response, netInfo);
    });
}

function statusFunction(response) {
    /*
    si.cpuCurrentspeed(function(cpuActualInfo){
        si.mem(function(memInfo){
        lookMessages.dataResponse(response, si.time());
        });
    });
    */
    si.getStaticData(function (all) {
        si.cpuCurrentspeed(function (cpuActualInfo) {
            si.mem(function (memInfo) {
                lookMessages.dataResponse(response, [all, si.time(), cpuActualInfo, memInfo]);
            });
        });
    });
}

exports.statusFunction = statusFunction;
exports.networkConsFunction = networkConsFunction;
exports.uptimeFunction = uptimeFunction;
exports.diskFunction = diskFunction;
exports.usersFunction = usersFunction;
exports.processFunction = processFunction;
exports.networkFunction = networkFunction;
exports.cpuFunction = cpuFunction;
exports.memFunction = memFunction;