// Configurations
var config = require('../config/config.js');

// Components
var crypto = require('crypto');
var jwt    = require('jsonwebtoken');

// Database
var userModel = require('./../models/User.js');
var loginMessages = require('./../messages/loginMessages.js');

/*
 {
 "username": "admin",
 "password": "admin"
 }
 */
function login(request, response) {
    var username = request.body.username;
    var password = request.body.password;

    //Check entry
    if(username && password){

        // create hahs
        var hash = crypto.createHmac('sha512', config.crypt_secret);
        hash.update(password);
        password = hash.digest('hex');
        userModel.findOne({username: username, password: password}, function(err,obj) {
            if(err){
                loginMessages.databaseError(response);
            }else if (obj){
                var tokenData = {
                    username: username
                };

                // create a token
                var token = jwt.sign(tokenData, config.jwt_secret, {
                    expiresIn: "1 days" // expires in 24 hours
                });

                loginMessages.loginCorrect(response, token);
            }else{
                loginMessages.loginIncorrect(response);
            }
        });
    }else{
        loginMessages.loginIncorrect(response);
    }
};

exports.login = login;
