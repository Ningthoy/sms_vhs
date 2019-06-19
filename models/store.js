var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var item = new Schema({
    title: {type: String, required:[true,' Item title is required']},
    price: {type:Number, default: 0.0, min: [0, 'Invalid item price']},
    stockNo:{type:String, unique: true},
    barcode:{type: String}
    
});
var stock = new Schema({
        totalquantity : {type: Number, required: true, default: 0, min: [0,'Stock quantity should not be less than zero']},
        availableQuantity: {type: Number, required: true, default: 0, min: [0,'Stock quantity should not be less than zero']},
        item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Item"
        },
        totalPrice:{
            type: Number,
            default: function(){
                return this.totalquantity * this.item.price;
            }      
        },
        entryDate: {type: Date, default: Date.now},
        enterdBy : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
});
var transfer = new Schema({
    stock : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stock'
    },
    issueQty: {
        type: Number,
        min: [1, 'Issued quantity should not be less than one']
    },
    issuedTo:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    issuedDate:{
        type: Date, default: Date.now
    },
    returnDate:{
        type: Date
    },
    penalty: {
        type: {type: Number, default: 0}
    }
});
module.exports = mongoose.model('Item', item);
module.exports = mongoose.model('Stock', stock);
module.exports = mongoose.model('Transfer', transfer);
