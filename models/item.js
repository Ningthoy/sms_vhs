var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var item = new Schema({
    title: {type: String, required:true},
    price: {type:Number},
    stockNo:{type:String}
    
});
module.exports = mongoose.model('Item', item);