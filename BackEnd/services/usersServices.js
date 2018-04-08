var userMessages = require('./../messages/userMessages.js');
var userModel = require('./../models/User.js');

function getUsers(request, response) {
	
};

function createUser(request, response) {
    if (request.body.username &&
        request.body.password &&
        request.body.description) {

        var newUser = userModel({
            username: request.body.username,
            password: request.body.password,
            description: request.body.description,
        });

        newUser.save(function (err) {
            if (err) {
                userMessages.errorMessage(response, 1);
            } else {
                userMessages.userCreated(response);
            }
        });
    }
};

exports.createUser = createUser;
exports.getUsers = getUsers;