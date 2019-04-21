var mongoose = require('mongoose');
var config = require('./../config/config.js');
var Schema = mongoose.Schema;


if (mongoose.connection.readyState === 0) {
    mongoose.connect(require('./connection-string'));
}

var NetworkSchema = new Schema({
    ifaces: {
        type: String,
        get: function(data) {
            try {
                return JSON.parse(data);
            } catch(err) {
                return err;
            }
        },
        set: function(data) {
            return JSON.stringify(data);
        },
        required: true
    },
    created_at: {
        type: Date,
        expires: 60*60*24*config.dLookROThan,
        required: false
    }
});

NetworkSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();

    // change the updated_at field to current date
    this.created_at = currentDate;

    next();
});

var Net = mongoose.model('net', NetworkSchema);

module.exports = Net;