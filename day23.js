const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: String,
  description: String,
});
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }
});
const ProductWithCategory = mongoose.model('ProductWithCategory', productSchema);
const Category = mongoose.model('Category', categorySchema);

mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

/**
 * Retrieves all products with populated category details from MongoDB
 * @returns {Array} - Array of product objects with populated category details
 */
async function getProductsPopulatedWithCategory() {
  try {
    const products = await ProductWithCategory.find().populate('category');
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}
async function main() {
  const category = new Category({
    name: 'Electronics',
    description: 'Products related to electronics.'
  });
  await category.save();
  const product = new ProductWithCategory({
    name: 'Laptop',
    price: 1200,
    category: category._id
  });
  await product.save();

  const productsWithCategory = await getProductsPopulatedWithCategory();
  console.log(productsWithCategory);
}

main();
