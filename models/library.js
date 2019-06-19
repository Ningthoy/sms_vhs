var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var book = new Schema({
    title:{ type: String, required: [true,'Please enter title of the Book']},
    isbnNo:{type:String, required:[true,'Please enter ISBN Number of the book']},
    authors:[
        {
            name: {type: String}
        }
    ], required: [true,'Please enter Author name'],
    publisher:{type:String,required:[true,'Please enter Publisher details']},
    price:{type:Number, required:[true,'Please enter the Price of the Book'],min:[0,'Please enter a valid Price']},
    barcode:{type:String},
    bookType:{type:String,enum:['Academic','Reference Book','Dictionary','Novel'],}
})
var issueBook = new Schema({
    issuedTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    issuedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    issueDate:{type:Date, default:Date.now},
    returnDate:{type:Date},
    penalty:{type:Number},
    type:{type:Number,enum:[0,1]},
    
})
var newBooks = new newBooks({
    book:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    },
    qtyBooks:{type:Number,min:[1,'New Books should be atleast one']},
    entryDate:{type:Date,default:Date.now},
    entryBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
});
module.exports=mongoose.Model('Book',book);
module.exports=mongoose.Model('IssueBook',issueBook);
module.exports=mongoose.Model('NewBook',newBooks);