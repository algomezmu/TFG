// Configurations
var config = require('../config/config.js');

// Components
var crypto = require('crypto');

// Database
var userMessages = require('./../messages/userMessages.js');
var userModel = require('./../models/User.js');

function getUsers(request, response) {
	
};

function createUser(request, response) {

    var username = request.body.username;
    var password = request.body.password;
    var description = request.body.description;

    if (username &&
        password &&
        description) {

        var hash = crypto.createHmac('sha512', config.crypt_secret)
        hash.update(password)
        password = hash.digest('hex');

        var newUser = userModel({
            username: username,
            password: password,
            description: description,
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