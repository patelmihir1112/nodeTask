var mongoose = require('mongoose');

let db = `mongodb://localhost/${process.env.DB}`;
mongoose.connect(db, { useUnifiedTopology: true, useNewUrlParser: true });
const connection = mongoose.connection;
 
module.exports = connection;