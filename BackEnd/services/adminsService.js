// Database
var adminMessages = require('./../messages/adminMessages.js');
var eventsModel = require('./../models/Events.js');
var eventsUtils = require('./../utils/events.js');
var scriptsModel = require('./../models/Scripts.js');

//region Events
function getEvents(response) {
    eventsModel.find({}, function(err,obj) {
        if(err){
            adminMessages.errorMessage(response, 0)
        }else if (obj && obj.length != 0){
            adminMessages.adminCorrectResponseInfo(response, obj);
        }else{
            adminMessages.errorMessage(response, 2);
        }
    })
};

function createEvent(request, response) {

    var command = request.body.command;
    var launchType = request.body.launchType;
    var launchTime = request.body.launchTime;
    var description = request.body.description;

    if (command &&
        launchType &&
        launchTime && checkLauchTime(launchType, launchTime)) {

        var newEvent = eventsModel({
            command: command,
            launchType: launchType,
            launchTime: launchTime,
            description: description
        });
        newEvent.save(function (err, event) {
            if (err) {
                adminMessages.errorMessage(response, 0);
            } else {
                eventsUtils.createEvent(event.id, event.command, event.launchType, event.launchTime);
                adminMessages.adminEventCorrectResponse(response,0);
            }
        });
    } else{
        adminMessages.errorMessage(response,4);
    }
};

function checkLauchTime(launchType, launchTime){
    if(launchType === "EveryDay"){
        var lt = launchTime.split(":");
        if(lt.length != 2 || isNaN(Number(lt[0])) || isNaN(Number(lt[1]))){
            return false;
        }else{
            return true;
        }
    }else if(launchType === "date"){
        return (new Date(launchTime) !== "Invalid Date") && !isNaN(new Date(launchTime));
    }else{
        return true;
    }
};

function deleteEvent(request, response) {
    var id = request.params.id;
    if(id) {
        eventsModel.remove({_id: id}, function (err) {
            if (err) {
                adminMessages.errorMessage(response, 3);
            }
            else {
                eventsUtils.deleteEvent(id);
                adminMessages.adminEventCorrectResponse(response, 1);
            }
        });
    }else{
        adminMessages.errorMessage(response,5);
    }
};

//endregion


//region Scripts
function getScripts(response) {
    scriptsModel.find({}, function(err,obj) {
        if(err){
            adminMessages.errorMessage(response, 0)
        }else if (obj && obj.length != 0){
            adminMessages.adminCorrectResponseInfo(response, obj);
        }else{
            adminMessages.errorMessage(response, 2);
        }
    })
};

function createScripts(request, response) {

    var command = request.body.command;
    var description = request.body.description;

    if (command) {

        var newScript = scriptsModel({
            command: command,
            description: description
        });
        newScript.save(function (err, event) {
            if (err) {
                adminMessages.errorMessage(response, 0);
            } else {
                adminMessages.adminScriptCorrectResponse(response,0);
            }
        });
    } else{
        adminMessages.errorMessage(response,4);
    }
};

function deleteScripts(request, response) {
    var id = request.body.id;
    if(id) {
        scriptsModel.remove({_id: id}, function (err) {
            if (err) {
                adminMessages.errorMessage(response, 3);
            }
            else {
                adminMessages.adminScriptCorrectResponse(response, 1);
            }
        });
    }else{
        adminMessages.errorMessage(response,5);
    }
};
//endregion



exports.getEvents = getEvents;
exports.createEvent = createEvent;
exports.deleteEvent = deleteEvent;

exports.getScripts = getScripts;
exports.createScripts = createScripts;
exports.deleteScripts = deleteScripts;