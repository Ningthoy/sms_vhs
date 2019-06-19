var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var classOb = new Schema({
    className: {},
    roomNo: {type:Number, required:true},
    subjects: [{
        type:mongoose.SchemaType.ObjectId,
        ref: "Subject"
    }],
    classTeacher: {
        type:mongoose.SchemaType.ObjectId,
        ref:"Teaacher"
    },
    routine:{
        type:mongoose.SchemaType.ObjectId,
        ref:"Routine"
    }
});
var address = new Schema({
    email: { type: String, required: true },
    phone: {type: Number, required: true},
    pin: {type: Number, required: true},
    location: {type:String, required: true},
    name:{type: String, required: true}
});
var item = new Schema({
    title: {type: String, required:true},
    price: {type:Number},
    stockNo:{type:String}
    
});
var school = new Schema({
    name: {type: String, required: true},
    regNo: {type: String, required: true},
    address: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Address"
    },
    class: [{
        type:mongoose.Types.ObjectId,
        ref:"Class"
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
       ref:'Teacher'
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
)
module.exports = mongoose.model('Subject', subjects);
module.exports=mongoose.model('Exam',exam);
module.exports=mongoose.model('Routine',routine);
module.exports = mongoose.model('Class', classOb);
module.exports = mongoose.model('Item', item);
module.exports = mongoose.model('Address', address);
module.exports = mongoose.model('School', school);