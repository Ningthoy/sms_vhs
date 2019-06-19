var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var experience = new Schema({
   fromDate: {type: Date},
   toDate: {type:Date},
   employer: {type: String},
   empAdd: {type: String}
});
module.exports = mongoose.model('Experience', experience);