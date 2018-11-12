/**
 * User Correct Response function
 * @param {response} response - The title of the book.
 * @param {number} type - type = 0 - User Created, type = 1 - User Deleted.
 */
var adminEventCorrectResponse = function (response, type) {
    response.statusCode = 200;
    response.set({
        'Content-Type': 'application/json'
    });

    if(type == 0) {
        return response.send({"status": "ok", "message": "Event Created."});
    }else if(type == 1){
        return response.send({"status": "ok", "message": "Event Deleted."});
    }
};

/**
 * User Correct Response function
 * @param {response} response - The title of the book.
 * @param {number} type - type = 0 - User Created, type = 1 - User Deleted.
 */
var adminScriptCorrectResponse = function (response, type) {
    response.statusCode = 200;
    response.set({
        'Content-Type': 'application/json'
    });

    if(type == 0) {
        return response.send({"status": "ok", "message": "Script Created."});
    }else if(type == 1){
        return response.send({"status": "ok", "message": "Script Deleted."});
    }
};

/**
 * Admin Correct Response function
 * @param {response} response - The title of the book.
 * @param {number} message - JSON to send
 */
var adminCorrectResponseInfo = function (response, message) {
    response.statusCode = 200;
    response.set({
        'Content-Type': 'application/json'
    });

    return response.send({"status": "ok", "message": message});
};

/**
 * User Error Response function
 * @param {response} response - The title of the book.
 * @param {number} type - type = 0 - Error Database, type = 1 - User can not be created.,
 * type = 2 - No users., type = 3 - Can not be deleted., type = 4 - User already exist.
 */
var errorMessage = function (response, type) {
    response.statusCode = 200;
    response.set({
        'Content-Type': 'application/json'
    });

    if(type == 0) {
        return response.send({"status": "error", "message": "Error Database"});
    }else if(type == 1) {
        return response.send({"status": "error", "message": "Event can not be created"});
    }else if(type == 2) {
        return response.send({"status": "error", "message": "No events"});
    }else if(type == 3) {
        return response.send({"status": "error", "message": "Can not be deleted"});
    }else if(type == 4) {
        return response.send({"status": "error", "message": "Incorrect input"});
    }else if(type == 5) {
        return response.send({"status": "error", "message": "No Scripts"});
    }else if(type == 6) {
        return response.send({"status": "error", "message": "Error Password"});
    }
};

exports.adminScriptCorrectResponse = adminScriptCorrectResponse;
exports.adminEventCorrectResponse = adminEventCorrectResponse;
exports.errorMessage = errorMessage;
exports.adminCorrectResponseInfo = adminCorrectResponseInfo;