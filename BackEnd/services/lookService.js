var lookMessages = require('./../messages/lookMessages.js');
var lookFunctions = require('./../utils/lookFunctions.js');
var cpuModel = require('./../models/Cpu.js');
var memModel = require('./../models/Mem.js');
var networkModel = require('./../models/Network.js');



function getCPUHistory(request, response) {

    if(!request.body.actualInfo) {
        var dateStart = new Date(request.body.dateStart);
        var dateEnd;

        if (!request.body.dateEnd)
            dateEnd = new Date();
        else
            dateEnd = new Date(request.body.dateEnd);
        if (!isNaN(dateStart) && !isNaN(dateEnd)) {
            cpuModel.find({"created_at": {"$gte": dateStart, "$lt": dateEnd}}, function (err, obj) {
                if (err) {
                    lookMessages.errorMessage(response, 0)
                } else if (obj) {
                    lookMessages.dataResponse(response, obj);
                } else {
                    lookMessages.errorMessage(response, 1);
                }
            });
        } else {
            lookMessages.errorMessage(response, 2);
        }
    }else{
        lookFunctions.cpuFunction(false, true, response);
    }
};

function getMemHistory(request, response) {
    if (request.body.actualInfo == false) {
        var dateStart = new Date(request.body.dateStart);
        var dateEnd;

        if (!request.body.dateEnd)
            dateEnd = new Date();
        else
            dateEnd = new Date(request.body.dateEnd);
        if (!isNaN(dateStart) && !isNaN(dateEnd)) {
            memModel.find({"created_at": {"$gte": dateStart, "$lt": dateEnd}}, function (err, obj) {
                if (err) {
                    lookMessages.errorMessage(response, 0)
                } else if (obj) {
                    lookMessages.dataResponse(response, obj);
                } else {
                    lookMessages.errorMessage(response, 1);
                }
            });
        } else {
            lookMessages.errorMessage(response, 2);
        }
    }
    else {
        lookFunctions.memFunction(false, true, response);
    }
}

function getNetworkHistory(request, response) {
    if (request.body.actualInfo == false) {
        var dateStart = new Date(request.body.dateStart);
        var dateEnd;

        if (!request.body.dateEnd)
            dateEnd = new Date();
        else
            dateEnd = new Date(request.body.dateEnd);
        if (!isNaN(dateStart) && !isNaN(dateEnd)) {
            networkModel.find({"created_at": {"$gte": dateStart, "$lt": dateEnd}}, function (err, obj) {
                if (err) {
                    lookMessages.errorMessage(response, 0)
                } else if (obj) {
                    lookMessages.dataResponse(response, obj);
                } else {
                    lookMessages.errorMessage(response, 1);
                }
            });
        } else {
            lookMessages.errorMessage(response, 2);
        }
    }
    else {
        lookFunctions.networkFunction(false, true, response);
    }
}


exports.getNetworkHistory = getNetworkHistory;
exports.getMemHistory = getMemHistory;
exports.getCPUHistory = getCPUHistory;