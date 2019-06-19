var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var exam=new Schema({
    title:{type:String,required:[true,'Please enter Exam Title']},
    examRoutine:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Routine'
    }
});
module.exports=mongoose.model('Exam',exam);