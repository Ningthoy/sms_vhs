var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var student = new Schema({
    name:{type:String, required:true},
    gender:{type:Number, required:true},
    address:{
        type:mongoose.Types.ObjectId,
        ref:"Address"
    }
});
module.exports = mongoose.model('Student', student);