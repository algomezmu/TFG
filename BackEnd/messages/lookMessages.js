var dataResponse = function (response, data) {
    response.statusCode = 200;
    response.set({
        'Content-Type': 'application/json'
    });

    return response.send({"status": "ok", "message": data});

};


exports.dataResponse = dataResponse;