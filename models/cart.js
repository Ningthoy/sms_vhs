module.exports = function Cart(oldCart){
    this.items = oldCart.items || {};   
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;
    this.add = function(item, id){
        var storedItem = this.items[id];
        if(!storedItem){
            storedItem = this.items[id]={item: item, price:0,qty:0};
        }
        storedItem.qty++;
        storedItem.price = storedItem.item.price * storedItem.qty;
        this.totalQty++;
        this.totalPrice += storedItem.item.price;
    };
    this.generateArray = function(){
        var err = [];
            for(var id in this.items){
                err.push(this.items[id]);
            }
        return err;
    }

}