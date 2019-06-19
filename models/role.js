var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var activity=new Schema({
    title:{type:String,required:[true,'Please enter title']},
    activityDesc:{type:String,max:[100,'Cannot exceed more than 100 characters']},
       
});
var role=new Schema({
    title:{type:String,required:[true,'Please enter title']},
    roleDesc:{type:String,max:[100,'Cannot exceed more than 100 characters']},
    activities: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Activity"
        }
    ]    
});

module.exports=mongoose.Model('Activity',activity);
module.exports=mongoose,Model('Role',role);
