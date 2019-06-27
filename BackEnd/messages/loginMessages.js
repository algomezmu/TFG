var loginCorrect = function (response, token, rol) {
    response.statusCode = 200;
    response.set({
        'Content-Type': 'application/json'
    });
    return response.send({"status": "ok", "message": "Correct Login", "token": token, "rol": rol });
};

var loginIncorrect = function (response) {
    response.statusCode = 200;
    response.set({
        'Content-Type': 'application/json'
    });
    return response.send({"status": "error", "message": "Incorrect Login"});
};

var databaseError = function (response) {
    response.statusCode = 200;
    response.set({
        'Content-Type': 'application/json'
    });
    return response.send({"status": "error", "message": "Error Database"});
};

exports.databaseError = databaseError;
exports.loginIncorrect = loginIncorrect;
exports.loginCorrect = loginCorrect;