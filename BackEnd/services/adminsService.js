// Database
var adminMessages = require('./../messages/adminMessages.js');
var eventsModel = require('./../models/Events.js');
var eventsUtils = require('./../utils/events.js');
var scriptsModel = require('./../models/Scripts.js');
var config = require('./../config/config.js');
const exec = require('child_process').exec;
const ObjectId = require('mongodb').ObjectID;

//region Events
function getEvents(request, response) {
    eventsModel.find({}, function (err, obj) {
        if (err) {
            adminMessages.errorMessage(response, 0)
        } else if (obj && obj.length != 0) {
            var fcm = request.body.fcm;
            let aux = false;
            for (let i = 0; i < obj.length; i++){
                if(obj[i].fcm && fcm && obj[i].fcm.indexOf(fcm)){
                    obj[i].notify = true;
                    aux = true;
                }else if(aux != true){
                    obj[i].notify = false;
                }
            }
            adminMessages.adminCorrectResponseInfo(response, obj);
        } else {
            adminMessages.errorMessage(response, 2);
        }
    })
};

function createEvent(request, response) {

    var id = request.body.id;
    var command = request.body.command;
    var launchType = request.body.launchType;
    var launchTime = request.body.launchTime;
    var description = request.body.description;
    var notify = request.body.notify;
    var fcm = request.body.fcm;
    var interfaceNet = request.body.interfaceNet;
    var interInOut = request.body.interInOut;

    if ((notify || command) &&
        launchType &&
        launchTime && checkLaunchTime(launchType, launchTime)) {

        if (!id) {
            id = new ObjectId();
        }

        if(id){
            let fcmIds = eventsUtils.returnFCM(id);
            if(fcmIds){
                let tokens = fcmIds.split(",");
                let check = false;
                tokens.forEach(element => {
                    if(check != true && element == fcm){
                        check = true;
                    }
                });
                if(check == false){
                    fcm = fcm + "," + eventsUtils.returnFCM(id);
                }else{
                    if(notify == false){
                        fcm = fcm.replace(","+fcm, "")
                    }
                }
            }
        }

        var newEvent = {
            command: command,
            launchType: launchType,
            launchTime: launchTime,
            description: description,
            fcm: fcm,
            interfaceNet: interfaceNet,
            interInOut: interInOut
        };
        eventsModel.findOneAndUpdate({
            _id: id
        }, newEvent, {
            upsert: true,
            new: true,
            runValidators: true
        }, function (err, event) {
            if (err) {
                console.log(err);
                adminMessages.errorMessage(response, 0);
            } else {
                eventsUtils.createEvent(event.id, event.command, event.launchType, event.launchTime, event.fcm, event.interfaceNet, event.interInOut);
                adminMessages.adminEventCorrectResponse(response, 0);
            }
        });
    } else {
        adminMessages.errorMessage(response, 4);
    }
};

function checkLaunchTime(launchType, launchTime) {
    if (launchType === "EveryDay") {
        var lt = launchTime.split(":");
        if ((lt.length != 2 && lt.length != 3)  || isNaN(Number(lt[0])) || isNaN(Number(lt[1]))) {
            return false;
        } else {
            return true;
        }
    } else if (launchType === "date") {
        return (new Date(launchTime) !== "Invalid Date") && !isNaN(new Date(launchTime));
    } else {
        return true;
    }
};

function deleteEvent(request, response) {
    var id = request.params.id;
    if (id) {
        eventsModel.remove({
            _id: id
        }, function (err) {
            if (err) {
                adminMessages.errorMessage(response, 3);
            } else {
                eventsUtils.deleteEvent(id);
                adminMessages.adminEventCorrectResponse(response, 1);
            }
        });
    } else {
        adminMessages.errorMessage(response, 5);
    }
};

//endregion


//region Scripts
function getScripts(response) {
    scriptsModel.find({}, function (err, obj) {
        if (err) {
            adminMessages.errorMessage(response, 0)
        } else if (obj && obj.length != 0) {
            adminMessages.adminCorrectResponseInfo(response, obj);
        } else {
            adminMessages.errorMessage(response, 5);
        }
    })
};

function createScripts(request, response) {

    var id = request.body.id;
    var command = request.body.command;
    var description = request.body.description;
    var perm = request.body.perm;

    if (command && perm != undefined) {
        if (!id) {
            id = new ObjectId();
        }

        var newScript = {
            command: command,
            description: description,
            perm: perm
        };
        scriptsModel.findOneAndUpdate({
            _id: id
        }, newScript, {
            upsert: true,
            new: true,
            runValidators: true
        }, function (err, event) {
            if (err) {
                adminMessages.errorMessage(response, 0);
            } else {
                adminMessages.adminScriptCorrectResponse(response, 0);
            }
        });
    } else {
        adminMessages.errorMessage(response, 4);
    }
};

function launchScript(request, response) {
    var command = request.body.command;

    if (command) {
        exec(command, {
            cwd: config.userDirectory
        }, function (error, stdout) {
            if (error) {
                adminMessages.adminCorrectResponseInfo(response, error.toString());
            } else {
                adminMessages.adminCorrectResponseInfo(response, stdout);
            }
        });
    } else {
        adminMessages.errorMessage(response, 4);
    }
};

function launchScriptPerm(request, response) {
    var command = request.body.command.command;
    var auth = request.body.perm;

    if (command) {

        if(auth != config.authentificatePerm){
            adminMessages.errorMessage(response, 6);
        }else
        {
            var line = " sh -c 'sleep 1; echo " + config.permPassword + "' | script -qc 'su " + config.permUser + " -c \"" + command + "\"'"
            exec(line, {
                cwd: config.userDirectory
            }, function (error, stdout) {
                if (error) {
                    adminMessages.adminCorrectResponseInfo(response, error.toString());
                } else {
                    stdout = stdout.substring(14);
                    adminMessages.adminCorrectResponseInfo(response, stdout);
                }
            });
        }
    } else {
        adminMessages.errorMessage(response, 4);
    }
};

function deleteScripts(request, response) {
    var id = request.params.id;
    if (id) {
        scriptsModel.remove({
            _id: id
        }, function (err) {
            if (err) {
                adminMessages.errorMessage(response, 3);
            } else {
                adminMessages.adminScriptCorrectResponse(response, 1);
            }
        });
    } else {
        adminMessages.errorMessage(response, 5);
    }
};
//endregion



exports.getEvents = getEvents;
exports.createEvent = createEvent;
exports.deleteEvent = deleteEvent;

exports.getScripts = getScripts;
exports.createScripts = createScripts;
exports.deleteScripts = deleteScripts;
exports.launchScript = launchScript;
exports.launchScriptPerm = launchScriptPerm;