const Product = require('../models/Product');
const Redis = require('ioredis');

const redis = new Redis({
  port: 6379, // Host port where Redis is running
  host: '127.0.0.1', // The host address where Redis is running
});

exports.getAllProducts = async (req, res) => {
  try {
    const cachedProducts = await redis.get('products');

    if (cachedProducts) {
      return res.status(200).json({ products: JSON.parse(cachedProducts), source: 'cache' });
    }

    const products = await Product.find({});
    await redis.set('products', JSON.stringify(products), 'EX', 3600);

    res.status(200).json({ products, source: 'database' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const cachedProduct = await redis.get(`product:${id}`);

    if (cachedProduct) {
      return res.status(200).json({ product: JSON.parse(cachedProduct), source: 'cache' });
    }

    const product = await Product.findById(id);
    await redis.set(`product:${id}`, JSON.stringify(product), 'EX', 3600);

    res.status(200).json({ product, source: 'database' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
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
