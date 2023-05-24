const Cart = require('../models/Cart');

class CartService {
  async getCart(userId) {
    let cart = await Cart.findOne({ user: userId });
    return cart;
  }

  async addProduct(userId, productId, quantity) {
    let cart = await this.getCart(userId);
    if (!cart) {
      cart = new Cart({ user: userId });
    }
    const index = cart.products.findIndex(p => p.product.toString() === productId.toString());
    if (index >= 0) {
      cart.products[index].quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity: quantity });
    }
    return await cart.save();
  }

  async removeProduct(userId, productId) {
    let cart = await this.getCart(userId);
    if (!cart) {
      throw new Error('Cart not found');
    }
    cart.products = cart.products.filter(p => p.product.toString() !== productId.toString());
    return await cart.save();
  }
}

module.exports = new CartService();