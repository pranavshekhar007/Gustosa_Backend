const express = require("express");
const { sendResponse } = require("../utils/common");
const ComboProduct = require("../model/comboProduct.Schema");
const comboProductController = express.Router();

// Create Combo Product
comboProductController.post("/create", async (req, res) => {
  try {
    const comboProductData = {
      ...req.body,
    };

    const comboProductCreated = await ComboProduct.create(comboProductData);
    sendResponse(res, 200, "Success", {
      message: "Combo product created successfully!",
      data: comboProductCreated,
      statusCode: 200,
    });
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, "Failed", {
      message: error.message || "Internal server error",
      statusCode: 500,
    });
  }
});

// List Combo Products
comboProductController.post("/list", async (req, res) => {
  try {
    const {
      searchKey = "",
      productType,
      pageNo = 1,
      pageCount = 10,
      sortByField,
      sortByOrder,
    } = req.body;

    const query = {};
    if (productType) query.productType = productType;
    if (searchKey) query.itemName = { $regex: searchKey, $options: "i" };

    // Construct sorting object
    const sortField = sortByField || "createdAt";
    const sortOrder = sortByOrder === "asc" ? 1 : -1;
    const sortOption = { [sortField]: sortOrder };

    // Fetch the combo product list
    const comboProductList = await ComboProduct.find(query)
      .sort(sortOption)
      .limit(parseInt(pageCount))
      .skip(parseInt(pageNo - 1) * parseInt(pageCount));
    const totalCount = await ComboProduct.countDocuments({});
    const activeCount = await ComboProduct.countDocuments({ status: true });
    sendResponse(res, 200, "Success", {
      message: "Combo product list retrieved successfully!",
      data: comboProductList,
      documentCount: {
        totalCount,
        activeCount,
        inactiveCount: totalCount - activeCount,
      },
      statusCode: 200,
    });
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, "Failed", {
      message: error.message || "Internal server error",
    });
  }
});

// Update Combo Product
comboProductController.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const comboProductData = req.body;

    const updatedComboProduct = await ComboProduct.findByIdAndUpdate(id, comboProductData, { new: true });
    if (!updatedComboProduct) {
      return sendResponse(res, 404, "Failed", {
        message: "Combo product not found",
        statusCode: 404,
      });
    }
    sendResponse(res, 200, "Success", {
      message: "Combo product updated successfully!",
      data: updatedComboProduct,
      statusCode: 200,
    });
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, "Failed", {
      message: error.message || "Internal server error",
    });
  }
});

// Delete Combo Product
comboProductController.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedComboProduct = await ComboProduct.findByIdAndDelete(id);
    if (!deletedComboProduct) {
      return sendResponse(res, 404, "Failed", {
        message: "Combo product not found",
        statusCode: 404,
      });
    }
    sendResponse(res, 200, "Success", {
      message: "Combo product deleted successfully!",
      statusCode: 200,
    });
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, "Failed", {
      message: error.message || "Internal server error",
    });
  }
});

module.exports = comboProductController;
