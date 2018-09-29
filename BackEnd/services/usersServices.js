// Configurations
var config = require('../config/config.js');

// Components
var crypto = require('crypto');

// Database
var userMessages = require('./../messages/userMessages.js');
var userModel = require('./../models/User.js');

function getUsers(response) {
    userModel.find({}, function(err,obj) {
        if(err){
            userMessages.errorMessage(response, 0)
        }else if (obj){
            userMessages.userCorrectResponseInfo(response, obj);
        }else{
            userMessages.errorMessage(response, 2);
        }
    }).select("-password");
};

function createUser(request, response) {

    var username = request.body.username;
    var password = request.body.password;
    var description = request.body.description;
    var rol = request.body.rol;

    if (username &&
        password &&
        rol) {
        var hash = crypto.createHmac('sha512', config.crypt_secret)
        hash.update(password)
        password = hash.digest('hex');

        var newUser = userModel({
            username: username,
            password: password,
            description: description,
            rol: rol
        });
        newUser.save(function (err) {
            if (err) {
                userMessages.errorMessage(response, 4);
            } else {
                userMessages.userCorrectResponse(response,0);
            }
        });
    } else{
        userMessages.errorMessage(response,5);
    }
};

function deleteUsers(request, response) {
    var id = request.params.id;
    if(id) {
        userModel.count({}, function( err, count){
            console.log( "Number of users:", count );
            if(count == 1){
                userMessages.errorMessage(response, 6);
            }
            else{
                userModel.remove({_id: id}, function (err) {
                    if (err) {
                        userMessages.errorMessage(response, 3);
                    }
                    else {
                        userMessages.userCorrectResponse(response, 1);
                    }
                });
            }
        })

    }else{
        userMessages.errorMessage(response,5);
    }
};

exports.deleteUsers = deleteUsers;
exports.createUser = createUser;
exports.getUsers = getUsers;