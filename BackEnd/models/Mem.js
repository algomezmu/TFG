var mongoose = require('mongoose');
var Schema = mongoose.Schema;


if (mongoose.connection.readyState === 0) {
    mongoose.connect(require('./connection-string'));
}

var MemSchema = new Schema({
    memTotal: {
        type: Number,
        required: true
    },
    memFree: {
        type: Number,
        required: true
    },
    memSwaptotal: {
        type: Number,
        required: false
    },
    memSwapfree: {
        type: Number,
        required: false
    },
    created_at: {
        type: Date,
        required: false
    }
});

MemSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();

    // change the updated_at field to current date
    this.created_at = currentDate;

    next();
});

var Mem = mongoose.model('memory', MemSchema);

module.exports = Mem;