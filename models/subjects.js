var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var subjects = new Schema({
    title: {type:String, required:true},
    code: {type:String},
    syllabus:{
        type:mongoose.Types.ObjectId,
        ref: "Syllabus"
    },
    
});
module.exports = mongoose.model('Subject', subjects);