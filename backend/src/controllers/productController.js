const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error occurred while fetching products' });
  }
};

exports.getProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error occurred while fetching the product' });
  }
};

exports.createProduct = async (req, res) => {
  const productData = req.body;

  try {
    const newProduct = new Product(productData);
    await newProduct.save();
    res.status(201).json({ message: 'Product created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error occurred while creating the product' });
  }
};

exports.updateProduct = async (req, res) => {
  const { productId } = req.params;
  const updateData = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product to be updated not found' });
    }

    Object.assign(product, updateData);
    await product.save();
    res.status(200).json({ message: 'Product updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error occurred while updating the product' });
  }
};

exports.deleteProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'The product to be deleted was not found' });
    }

    await product.remove();
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error occurred while deleting the product' });
  }
};
