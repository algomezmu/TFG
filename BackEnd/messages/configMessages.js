
var configCorrectResponse = function (response, type) {
    response.statusCode = 200;
    response.set({
        'Content-Type': 'application/json'
    });

    if(type == 0) {
        return response.send({"status": "ok", "message": "Config Update"});
    }
};

var configCorrectResponseInfo = function (response, message) {
    response.statusCode = 200;
    response.set({
        'Content-Type': 'application/json'
    });

    return response.send({"status": "ok", "message": message});
};


var errorMessage = function (response, type) {
    response.statusCode = 200;
    response.set({
        'Content-Type': 'application/json'
    });

    if(type == 0) {
        return response.send({"status": "error", "message": "Incorrect input"});
    }
};

exports.configCorrectResponseInfo = configCorrectResponseInfo;
exports.errorMessage = errorMessage;
exports.configCorrectResponse = configCorrectResponse;