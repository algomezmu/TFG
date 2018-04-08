var userCreated = function (response) {
    response.statusCode = 200;
    response.set({
        'Content-Type': 'application/json'
    });
    return response.send({"status": "ok", "message": "User Created."});
};

var errorMessage = function (response, type) {
    var responseInfo = {"status": "error", "message": "undefined"};
    response.set({
        'Content-Type': 'application/json'
    });


    //User can not be created
    if(type == 1){
        response.statusCode = 500;
        responseInfo = {"status": "error", "message": "User can not be created"};
    }

    return response.send(responseInfo);
};


exports.errorMessage = errorMessage;
exports.userCreated = userCreated;