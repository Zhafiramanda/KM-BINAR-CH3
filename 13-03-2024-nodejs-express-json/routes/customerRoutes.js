const express = require("express");
const fs = require('fs')

const router = express.Router();

const customerController = require("./controllers/customerController")

router.route("/").get(customerController.getCustomers).post(customerController.createCustomer);
router
  .route("/:id")
  .get(customerController.getCustomers)
  .patch(customerController.getCustomerById)
  .delete(customerController.deleteCustomer);

module.exports = router;
