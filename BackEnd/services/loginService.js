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
                
                var key;
                if( obj.rol == "Administrator" ){
                    key = config.jwt_secret_admin;
                }else{
                    key = config.jwt_secret_monitor;
                }
                // create a token
                var token = jwt.sign(tokenData, key, {
                    //expiresIn: "10m" // expires in 24 hours
                    expiresIn: "24h"
                });

                loginMessages.loginCorrect(response, token, obj.rol);
            }else{
                loginMessages.loginIncorrect(response);
            }
        });
    }else{
        loginMessages.loginIncorrect(response);
    }
};

exports.login = login;
