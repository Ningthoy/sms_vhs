var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var classOb = new Schema({
    className: {},
    roomNo: {type:Number, required:true},
    subjects: {
        type:mongoose.Types.ObjectId,
        ref: "Subject"
    },
    classTeacher: {
        type:mongoose.Types.ObjectId,
        ref:"Teaacher"
    },
    routine:{
        type:mongoose.Types.ObjectId,
        ref:"Routine"
    }
});
var address = new Schema({
    email: { type: String, required: true },
    phone: {type: Number, required: true},
    pin: {type: Number, required: true},
    location: {type:String, required: true},
    name:{type: String}
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
    class: {
        type:mongoose.Types.ObjectId,
        ref:"Class"
    }
});
module.exports = mongoose.model('Class', classOb);
module.exports = mongoose.model('Item', item);
module.exports = mongoose.model('Address', address);
module.exports = mongoose.model('School', school);