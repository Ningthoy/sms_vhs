var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var address = new Schema({
    email: { type: String, required: true },
    phone: {type: Number, required: true},
    pin: {type: Number, required: true},
    location: {type:String, required: true}
});
module.exports = mongoose.model('Address', address);