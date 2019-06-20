var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var classOb = new Schema({
    className: {type:String, required:[true,'please provide class Name']},
    roomNo: {type:Number, required:true},
    subjects: [{
        type:mongoose.SchemaType.ObjectId,
        ref: "Subject"
    }],
    classTeacher: {
        type:mongoose.SchemaType.ObjectId,
        ref:"Staff"
    },
    routine:{
        type:mongoose.SchemaType.ObjectId,
        ref:"Routine"
    },
    section:{type:String, enum:['A','B','C','D','E','F']},
});
var address = new Schema({
    email: { type: String, required: true },
    phone: {type: Number, required: true},
    pin: {type: Number, required: true},
    location: {type:String, required: true}
});
var school = new Schema({
    name: {type: String, required: true},
    regNo: {type: String, required: true},
    address: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Address"
    },
    class: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Class"
    }],
    teacher:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Staff'
    }]
});
var routine=new Schema({
    day:{type:Number, enum:[0,1,2,3,4,5,6]},
    fromTime:{type:Date},
    toTime:{type:Date},
    subject:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Subject'
    },
   teacher:{
       type:mongoose.SchemaTypes.ObjectId,
       ref:'Staff'
    },
});
var exam=new Schema({
    title:{type:String,required:[true,'Please enter Exam Title']},
    examRoutine:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Routine'
    },
    examDate:{type:Date},
});
var subjects = new Schema({
    title: {type:String, required:true},
    code: {type:String},
    syllabus:{
        type:mongoose.SchemaTypes.ObjectId,
        ref: "Syllabus"
    },
});
var syllabus=new Schema({
    fileName: {type:String} 
}
);
var experience = new Schema({
    fromDate: {type: Date},
    toDate: {type:Date},
    employer: {type: String},
    empAdd: {type: String}
 });
var staff = new Schema({
    name: { type:String, required:true},
    qualification: [{type: String, required:true}],
    permanentAddress: {
        type:mongoose.Types.ObjectId,
        ref:"Address"
    },
    presentAddress: {
        type:mongoose.Types.ObjectId,
        ref:"Address"
    },
    type: {type:Number,enum:[0,1]},//0:Teaching, 1:Non-Teaching
    dob: {type: Date},
    joiningDate: {type: Date, default: Date.now},
    emptype:{type:Number,enum:[0,1,2]}, //0:Temporary, 1:Permanent, 2:Deputation
    experience: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Experience"
    }],
    photo:{type: String},

});
module.exports = mongoose.model('Experience', experience);
module.exports = mongoose.model('Staff', staff);
module.exports=mongoose.model('Syllabus',syllabus);
module.exports = mongoose.model('Subject', subjects);
module.exports=mongoose.model('Exam',exam);
module.exports=mongoose.model('Routine',routine);
module.exports = mongoose.model('Class', classOb);
module.exports = mongoose.model('Address', address);
module.exports = mongoose.model('School', school);