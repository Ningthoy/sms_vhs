var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config=new Schema({
   question:{type:String,required:[true,'Please enter title']},
    answer:{type:String},
    type:{type:Number}
       
});

module.exports=mongoose.Model('Config',config);