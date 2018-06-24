var mongoose = require('mongoose');
var Schema = mongoose.Schema;


if (mongoose.connection.readyState === 0) {
    mongoose.connect(require('./connection-string'));
}


var EventSchema = new Schema({
    command: {
        type: String,
        required: true
    },
    launchType: {
        type: String,
        required: true
    },
    launchTime: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    }
});

EventSchema.pre('save', function(next) {
    next();
});

var Event = mongoose.model('Event', EventSchema);

module.exports = Event;