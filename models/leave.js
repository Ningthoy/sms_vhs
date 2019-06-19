var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var leaveType=new Schema({
    title:{type:String,required:[true,'Please enter title']},
    maxLeave:{type:Number,required:[true,'']},
    creditLeave:{type:String,enum:['Yearly','Monthly','Quaterly','Half Yearly','Manual Credit']},
    availavleLeave: {type:Number,required:[true,'']},
});
var leave=new Schema({
    user:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"User"
    },
    leaveType: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'LeaveType'
    }    
});
var leaveApplication=new Schema({
    user:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"User"
    },
    leave: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Leave'
    }],
    status: {
        type: Number, default: 0    //0=Applied, 1: Approved, 2: Rejected
    },
    leaveApplyDate: { 
        type: Date, default: Date.now
    },
    leaveApproveDate:{
        type: Date
    },
    leaveApproveBy: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    }  

});

module.exports=mongoose.Model('Leave',leave);
module.exports=mongoose.Model('LeaveApplication',leaveApplication);
module.exports=mongoose.Model('LeaveType',leaveType);