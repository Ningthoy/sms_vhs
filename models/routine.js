var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
    date:{type:Date}
});
module.exports=mongoose.model('Routine',routine);
