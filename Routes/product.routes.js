const {
  getAllProducts,
  addProduct,
  getOneProduct,
  updateOneProduct,
  deleteOneProduct,
} = require("../Controllers/productControllers"); // Importing the product controller functions

const router = require("express").Router(); // Creating an instance of an Express router

router
  .route("/")
  .get(getAllProducts) // Handling HTTP GET requests to get all products using the getAllProducts controller function
  .post(addProduct); // Handling HTTP POST requests to add a product using the addProduct controller function

router
  .route("/:productId")
  .get(getOneProduct) // Handling HTTP GET requests to get a specific product using the getOneProduct controller function
  .put(updateOneProduct) // Handling HTTP PUT requests to update a specific product using the updateOneProduct controller function
  .delete(deleteOneProduct); // Handling HTTP DELETE requests to delete a specific product using the deleteOneProduct controller function

module.exports = router; // Exporting the Express router configuration as a module
