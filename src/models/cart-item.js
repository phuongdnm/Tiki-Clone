
class CartItem {
    constructor(quantity, productPrice, discountedPrice, product, productId, sum_discounted, sum) {
        this.quantity = quantity;
        this.productPrice = productPrice;
        this.discountedPrice = discountedPrice;
        this.product = product;
        this.productId = productId;
        this.sum_discounted = sum_discounted;
        this.sum = sum;
    }
}

export default CartItem

