var dataResponse = function (response, data) {
    response.statusCode = 200;
    response.set({
        'Content-Type': 'application/json'
    });

    return response.send({"status": "ok", "message": data});

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
        return response.send({"status": "error", "message": "No data"});
    }else if(type == 2) {
        return response.send({"status": "error", "message": "Incorrect input"});
    }
};


exports.errorMessage = errorMessage;
exports.dataResponse = dataResponse;