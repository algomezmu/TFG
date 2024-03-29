var mongoose = require('mongoose');
var config = require('./../config/config.js');
var Schema = mongoose.Schema;


if (mongoose.connection.readyState === 0) {
    mongoose.connect(require('./connection-string'));
}

var CpuSchema = new Schema({
    cpuIDE: {
        type: Number,
        required: true
    },
    cpuWORK: {
        type: Number,
        required: true
    },
    cpuMin: {
        type: Number,
        required: true
    },
    cpuMax: {
        type: Number,
        required: true
    },
    cpuAvg: {
        type: Number,
        required: false
    },
    cpuTempMain: {
        type: Number,
        required: false
    },
    cpuTemp: {
        type: Array,
        required: false
    },
    cpuMax: {
        type: Number,
        required: false
    },
    created_at: {
        type: Date,
        expires: 60*60*24*config.dLookROThan,
        required: false
    }
});

CpuSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();

    // change the updated_at field to current date
    this.created_at = currentDate;

    next();
});

var Cpu = mongoose.model('cpu', CpuSchema);

module.exports = Cpu;