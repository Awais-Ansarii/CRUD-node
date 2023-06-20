const User = require("../Models/userModel");
const Product = require("../Models/productModel");
const ObjectId = require("mongoose").Types.ObjectId;

exports.addProduct = async (req, res) => {
  try {
    const { title, price, description } = req.body;
    const existingProduct = await Product.findOne({ title });

    if (existingProduct)
      return res
        .status(400)
        .send({ message: "Product Already exists with the same title" });

    const product = await Product.create({
      title,
      price,
      description,
    });
    return res.status(201).send({ message: "New Product Created", product });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "Failed To create product", error: error.message });
  }
};

exports.getOneProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!productId)
      return res.status(402).send({ message: "Product ID is required" });
    const product = await Product.findById(new ObjectId(productId));
    if (!product) return res.status(404).send({ message: "Product not found" });
    return res.status(200).json(product);
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Failed To fetch product", error: error.message });
  }
};

// function to get all products from the products
//collection and send it back as json in response body
exports.getAllProducts = async (req, res) => {
  try {
    const { page, itemPerPage } = req.query;
    let pageNumber = parseInt(page) || 1; // page number
    var limit = parseInt(itemPerPage) || 3; // items per page
    var skip = (pageNumber - 1) * limit;
    const totalCount = await Product.countDocuments();
    const result = await Product.find().skip(skip).limit(limit);
    return res.status(200).json({ total: totalCount, products: result });
  } catch (err) {
    console.log("Error while fetching data");
    return res.status(500).send({
      message: "failed to fetch data",
    });
  }
};

// function to update existing product by product id
// with new values passed through request params
exports.updateOneProduct = async (req, res) => {
  //console.log('request', req.body);
  const { productId } = req.params;
  const { title, price, description } = req.body;

  try {
    const updateOptions = {};

    if (title) updateOptions.title = title;
    if (price) updateOptions.price = price;
    if (description) updateOptions.description = description;

    console.log(updateOptions);
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: productId },
      updateOptions,
      { new: true }
    );
    if (!updatedProduct)
      return res.status(404).send({ message: "Product Not Found" });
    return res
      .status(202)
      .json({ message: "Product Updated Successfully", updatedProduct });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "failed to update product",
    });
  }
};

exports.deleteOneProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct)
      return res.status(404).send({ message: "Product not found" });
    // deledted product
    return res
      .status(201)
      .json({ message: `${deletedProduct._id} has been successfully removed` });
  } catch (err) {
    return res.status(403).json({ message: "Failed To Delete" });
  }
};
