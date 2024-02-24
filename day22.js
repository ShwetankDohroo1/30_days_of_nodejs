const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/mydatabase';
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000,
};
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number
});

const Product = mongoose.model('Product', productSchema);

async function createProduct(product) {
  try {
    const newProduct = new Product(product);
    const savedProduct = await newProduct.save();
    console.log('Product created:', savedProduct);
    return savedProduct;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
}
async function getAllProducts() {
  try {
    const products = await Product.find();
    console.log('All products retrieved:', products);
    return products;
  } catch (error) {
    console.error('Error retrieving products:', error);
    throw error;
  }
}
async function updateProduct(productId, updatedProduct) {
  try {
    const updated = await Product.findByIdAndUpdate(productId, updatedProduct, { new: true });
    console.log('Product updated:', updated);
    return updated;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
}
async function deleteProduct(productId) {
  try {
    const deleted = await Product.findByIdAndDelete(productId);
    console.log('Product deleted:', deleted);
    return deleted;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
}

mongoose.connect(mongoURI, mongooseOptions)
  .then(() => {
    console.log('Connected to MongoDB');
    (async () => {
      const createdProduct = await createProduct({ name: 'Laptop', price: 999, quantity: 10 });
      const products = await getAllProducts();
      const updatedProduct = await updateProduct(createdProduct._id, { price: 1099 });
      const deletedProduct = await deleteProduct(createdProduct._id);
    })();
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
