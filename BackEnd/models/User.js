var mongoose = require('mongoose');
var Schema = mongoose.Schema;


if (mongoose.connection.readyState === 0) {
    mongoose.connect(require('./connection-string'));
}


var UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    rol:{
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: false
    }
});

UserSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();

    // change the updated_at field to current date
    this.created_at = currentDate;

    next();
});

var User = mongoose.model('User', UserSchema);

module.exports = User;