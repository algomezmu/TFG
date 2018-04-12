var userCreated = function (response) {
    response.statusCode = 200;
    response.set({
        'Content-Type': 'application/json'
    });
    return response.send({"status": "ok", "message": "User Created."});
};

var errorMessage = function (response, type) {
    response.statusCode = 200;
    response.set({
        'Content-Type': 'application/json'
    });

    return response.send({"status": "error", "message": "User can not be created"});
};


exports.errorMessage = errorMessage;
exports.userCreated = userCreated;