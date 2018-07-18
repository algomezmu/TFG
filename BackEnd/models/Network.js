var mongoose = require('mongoose');
var config = require('./../config/config.js');
var Schema = mongoose.Schema;


if (mongoose.connection.readyState === 0) {
    mongoose.connect(require('./connection-string'));
}

var NetworkSchema = new Schema({
    iface: {
        type: String,
        required: false
    },
    operstate: {
        type: String,
        required: true
    },
    rx: {
        type: Number,
        required: false
    },
    rx_sec: {
        type: Number,
        required: false
    },
    tx_sec: {
        type: Number,
        required: false
    },
    ms: {
        type: Number,
        required: false
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