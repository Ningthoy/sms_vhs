var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var student = new Schema({
    studentName:{type:String, required:[true,'Student name is required']},
    photo:{type: String},
    father:{type:String, required:[true,'Father name is required']},
    mother:{tyoe:String,required:true},
    localGuardian:{type:String},
    occupation:{type: String},
    income:{type:Number},
    gender:{type:Number,enum:[1,2]},
    permanentAddress:{
        type:mongoose.Types.ObjectId,
        ref:"Address"
    },
    presentAddress:{
        type:mongoose.Types.ObjectId,
        ref:"Address"
    },
    age: {type:Number, required:[true,'Age on 1st January of the admission year']},
    nationality:{type:String},
    prevSchool: {type:String, maxlength:100},
    studentSign:{type:String},
    parentSign:{type: String},
    applyDate:{type:Date},
    
});
module.exports = mongoose.model('Student', student);