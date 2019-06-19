var Product = require('../models/products');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shop', {useNewUrlParser: true});
function exit(){
    mongoose.disconnect();
}
var products = [
        new Product({
            imagePath: 'https://dummyimage.com/sqrpop',
            title: 'Counter-Strike Global',
            description: 'A Mission Game',
            price: 500
        }),
        new Product({
            imagePath: 'https://dummyimage.com/sqrpop',
            title: 'IGI -3 Global',
            description: 'A Mission Game',
            price: 7500
        }),
        new Product({
            imagePath: 'https://dummyimage.com/sqrpop',
            title: 'Fire Cry-II',
            description: 'A Mission Team Game',
            price: 200
        }),
        new Product({
            imagePath: 'https://dummyimage.com/sqrpop',
            title: 'Prince of Percia',
            description: 'A Solo Mission Game',
            price: 560
        }),
    ];
    var done = 0; 
    for(var i=0; i<products.length;i++){
        products[i].save(function(err){
                if(!err){
                    done++;
                    if(done == products.length-1){
                       exit();
                    }
                }
        });
    }
    
