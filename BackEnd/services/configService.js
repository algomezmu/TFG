var config = require('./../config/config');
var configMessages = require('./../messages/configMessages');

function getConfig(response) {
    var result = {
        lookCPU: config.lookCPU,
        lookCPUTimer: config.lookCPUTimer,
        lookMemory: config.lookMemory,
        lookMemoryTimer: config.lookMemoryTimer,
        lookNetwork: config.lookNetwork,
        lookNetworkTimer: config.lookNetworkTimer,
        dLookROThan: config.dLookROThan
    };

    configMessages.configCorrectResponseInfo(response, result);
}

function modifyConfig(request, response) {

    if (
        (request.body.lookMemory == true || request.body.lookMemory == false) &&
        (request.body.lookNetwork == true || request.body.lookNetwork == false) &&
        (request.body.lookCPU == true || request.body.lookCPU == false) &&
        (isNaN(Number(request.body.dLookROThan)))
    ) {
        configMessages.errorMessage(response, 0);
    } else {
        config.lookCPU = request.body.lookCPU;
        config.lookCPUTimer = request.body.lookCPUTimer;
        config.lookMemory = request.body.lookMemory;
        config.lookMemoryTimer = request.body.lookMemoryTimer;
        config.lookNetwork = request.body.lookNetwork;
        config.lookNetworkTimer = request.body.lookNetworkTimer;
        config.dLookROThan = request.body.dLookROThan;
        configMessages.configCorrectResponse(response);
    }

}

exports.getConfig = getConfig;
exports.modifyConfig = modifyConfig;