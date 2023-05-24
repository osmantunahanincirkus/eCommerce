const Cart = require('../models/Cart');

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate('products.product');
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Error in Fetching cart' });
  }
};

exports.addItem = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      cart = new Cart({ user: req.user.id });
    }

    const productIndex = cart.products.findIndex((p) => p.product == productId);

    if (productIndex > -1) {
      // Product exists in the cart, update the quantity
      const productItem = cart.products[productIndex];
      productItem.quantity += quantity;
      cart.products[productIndex] = productItem;
    } else {
      // Product does not exists in cart, add new item
      cart.products.push({ product: productId, quantity });
    }

    await cart.save();

    res.status(201).json(cart.products);
  } catch (err) {
    res.status(500).json({ message: 'Error in Adding to cart' });
  }
};

exports.removeItem = async (req, res) => {
  const { productId } = req.params;

  try {
    const cart = await Cart.findOne({ user: req.user.id });

    const productIndex = cart.products.findIndex((p) => p.product == productId);

    if (productIndex > -1) {
      // Product exists in the cart, remove item
      cart.products.splice(productIndex, 1);
      await cart.save();
      res.status(200).json(cart.products);
    } else {
      res.status(404).json({ message: 'Product not found in cart' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error in Removing from cart' });
  }
};

exports.updateItem = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ user: req.user.id });

    const productIndex = cart.products.findIndex((p) => p.product == productId);

    if (productIndex > -1) {
      // Product exists in the cart, update the item
      const productItem = cart.products[productIndex];
      productItem.quantity = quantity;
      cart.products[productIndex] = productItem;
      await cart.save();
      res.status(200).json(cart.products);
    } else {
      res.status(404).json({ message: 'Product not found in cart' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error in Updating cart' });
  }
};