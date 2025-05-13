const mongoose = require('mongoose');
const timestamps = require("mongoose-timestamp");

const comboProductSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
    },
    selectedProducts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    }],
    stockQuantity: {
      type: String,
    },
    gtin: {
      type: Number,
    },
    productType: {
      type: String,
    },
    shortDescription: {
      type: String,
    },
    longDescription: {
      type: String,
    },
    pricing: {
      actualPrice: {
        type: Number,
      },
      offerPrice: {
        type: Number,
      },
      currency: {
        type: String,
        enum: ['INR', 'USD', 'AED', 'GBP', 'EURO', 'SAR'],
        default: 'INR',
      },
    },
    weight: {
      itemWeight: {
        type: Number,
      },
      packageWeight: {
        type: Number,
      },
    },
  },
);

comboProductSchema.plugin(timestamps);
module.exports = mongoose.model('ComboProduct', comboProductSchema);
