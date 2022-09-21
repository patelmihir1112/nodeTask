var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roleSchema = new Schema({
	roleName: String,
	moduleList: [{ type: String, unique: true }],
	active: Boolean,
},{timestamps: true});

roleSchema.index({'$**': 'text'});

module.exports = mongoose.model('Role', roleSchema);