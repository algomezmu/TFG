// Database
var adminMessages = require('./../messages/adminMessages.js');
var eventsModel = require('./../models/Events.js');
var eventsUtils = require('./../utils/events.js');

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
        launchTime) {

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

function deleteEvent(request, response) {
    var id = request.body.id;
    if(id) {
        eventsModel.remove({_id: id}, function (err) {
            if (err) {
                adminMessages.errorMessage(response, 3);
            }
            else {
                adminMessages.adminEventCorrectResponse(response, 1);
            }
        });
    }else{
        adminMessages.errorMessage(response,5);
    }
};



exports.getEvents = getEvents;
exports.createEvent = createEvent;
exports.deleteEvent = deleteEvent;