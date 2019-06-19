var express = require('express');
var router = express.Router();
var Product = require('../models/products');
var Cart = require('../models/cart');
router.get('/', function(req, res, next) {
    if(req.isAuthenticated()){
      res.redirect('/user/home');
    }else{
      res.redirect('/user/signin');
    }
});
/* GET home page. 
router.get('/', function(req, res, next) {
  Product.find(function(err, docs){
        var pChunks = [];
        var size = 4;
        for(var i=0; i<docs.length;i+=size){
          pChunks.push(docs.slice(i,i+size));
        }
        res.render('/user/signin', { title: '' });
  });
});

router.get('/add-to-cart/:id', function(req, res, next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart? req.session.cart : {});
  Product.findById(productId,function(err, item){
    if(err){
        return res.redirect('/');
    }
     cart.add(item, item.id);
     req.session.cart = cart;
     console.log(cart);
     res.redirect('/');
  });
  
});
router.get('/mycartlist', function(req, res, next){
  var cart = new Cart(req.session.cart? req.session.cart : {});
  res.render('cartview',{cartitems: cart.generateArray(), total: cart.totalPrice, qty: cart.totalQty, shippingTotal: (parseInt(cart.totalPrice)+10)});
});
*/
module.exports = router;
