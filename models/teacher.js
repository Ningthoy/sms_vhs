var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var teachers = new Schema({
    name: { type:String, required:true},
    qualification: {type: String, required:true},
    address: {
        type:mongoose.Types.ObjectId,
        ref:"Address"
    },
    dob: {type: Date},
    experience: {
        type:mongoose.Types.ObjectId,
        ref:"Experience"
    },
    type:{type:Number,enum:[0,1,2]},
    
});
module.exports = mongoose.model('Teacher', teachers);