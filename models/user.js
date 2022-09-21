var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	username: String,
    firstName : String,
    email: String,
    passWord: String,
    token : String,
    Role : { type: Schema.Types.ObjectId, ref: 'Role' },
}, {timestamps: true});

userSchema.index({'$**': 'text'});

module.exports = mongoose.model('User', userSchema);