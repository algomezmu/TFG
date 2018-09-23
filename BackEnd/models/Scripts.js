var mongoose = require('mongoose');
var Schema = mongoose.Schema;


if (mongoose.connection.readyState === 0) {
    mongoose.connect(require('./connection-string'));
}


var ScriptSchema = new Schema({
    command: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    perm: {
        type: Boolean,
        required: true
    }
});

ScriptSchema.pre('save', function(next) {
    next();
});

var Script = mongoose.model('Script', ScriptSchema);

module.exports = Script;