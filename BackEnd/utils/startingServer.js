var config = require('./../config/config.js');
var userModel = require('./../models/User.js');
var crypto = require('crypto');

const logConfig = require('../config/log-conf');
const logger = require('js-logging').dailyFile([logConfig.getLogSettings()]);

const exec = require('child_process').exec;
var fs = require('fs');

function loadPasswordFile() {
    fs.readFile("config/key", 'utf8', function (err, data) {
        if (err) {
            fs.writeFile("config/key", Math.random().toString(36).slice(-15), function (err) {
                if (err) {
                    logger.info('Error Create File');
                }
            });
        } else {
            config.crypt_secret = data;
        }
    });
}

function userDirectory() {
    exec("cd;pwd", function (error, stdout) {
        config.userDirectory = stdout.substring(0, stdout.length - 1);;
    });
}

function firstUser() {
    userModel.find({}, function (err, obj) {
        if (err) {
            logger.info('Error First User: DataBase mongo');
        } else if (obj.length == 0) {
            logger.info('Trying to create first user');

            var hash = crypto.createHmac('sha512', config.crypt_secret);
            hash.update(config.first_user_password);
            var password = hash.digest('hex');

            var newUser = userModel({
                username: config.first_user_name,
                password: password,
                description: "First User",
                rol: "Administrator"
            });
            newUser.save(function (err) {
                if (err) {
                    logger.info('Error creating First User: DataBase mongo');
                } else {
                    logger.info('Created first user');
                }
            });
        }
    }).select("-password");
}

exports.loadPasswordFile = loadPasswordFile;
exports.userDirectory = userDirectory;
exports.firstUser = firstUser;