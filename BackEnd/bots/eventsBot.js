var schedule = require('node-schedule');
var eventsModel = require('./../models/Events.js');
var eventsUtils = require('./../utils/events.js');

function loadEvents() {
    eventsModel.find({}, function(err,obj) {
        if(err){
            console.log("Data Base Error On Load Event");
        }else if (obj && obj.length != 0){
            //console.log(obj);
            obj.forEach(function(element) {
                eventsUtils.createEvent(element.id, element.command, element.launchType, element.launchTime, element.notify, element.interfaceNet, element.interInOut);
            });
        }else{
            console.log("No events");
        }
    })
}

exports.loadEvents = loadEvents;